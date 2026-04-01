
$envFile = ".env.local"
if (-Not (Test-Path $envFile)) {
    Write-Error "Missing .env.local file"
    exit
}

# Load .env.local
$config = @{}
Get-Content $envFile | ForEach-Object {
    if ($_ -match "^([^#=]+)=(.*)$") {
        $key = $matches[1].Trim()
        $val = $matches[2].Trim().Trim('"').Trim("'")
        $config[$key] = $val
    }
}

$url = $config["POCKETBASE_URL"]
if (-not $url) { $url = "https://api-db.reiwarden.io.vn" }
$url = $url.TrimEnd("/")

$email = $config["POCKETBASE_DB_EMAIL"]
$pass = $config["POCKETBASE_DB_PASSWORD"]

Write-Host "--- PocketBase Migration (PowerShell) ---" -ForegroundColor Cyan
Write-Host "URL: $url"
Write-Host "Email: $email"

# 1. Authenticate
$authResult = $null
$authEndpoints = @("/api/admins/auth-with-password", "/api/collections/_superusers/auth-with-password")

foreach ($ep in $authEndpoints) {
    try {
        Write-Host "Trying auth at $ep..."
        $body = @{ identity = $email; password = $pass } | ConvertTo-Json
        $res = Invoke-RestMethod -Uri "$url$ep" -Method Post -ContentType "application/json" -Body $body
        if ($res.token) {
            $authResult = $res
            break
        }
    } catch {
        $errMsg = $_.Exception.Message
        Write-Host "Failed $ep : $errMsg" -ForegroundColor Yellow
    }
}

if (-not $authResult) {
    Write-Host "Auth failed at all endpoints. Check your credentials." -ForegroundColor Red
    exit
}

$token = $authResult.token
$headers = @{ "Authorization" = $token }
Write-Host "Auth Successful!" -ForegroundColor Green

# 2. Helper to Update Collection
function Update-Collection($cName, $newFields) {
    try {
        Write-Host "Checking collection: $cName..."
        $coll = Invoke-RestMethod -Uri "$url/api/collections/$cName" -Headers $headers
        $existingNames = $coll.schema | ForEach-Object { $_.name }
        $newSchema = $coll.schema
        $changed = $false

        foreach ($f in $newFields) {
            $fName = $f.name
            if ($existingNames -notcontains $fName) {
                Write-Host "  + Adding field: $fName" -ForegroundColor DarkCyan
                $newSchema += $f
                $changed = $true
            }
        }

        if ($changed) {
            Write-Host "  Patching $cName schema..." -ForegroundColor Yellow
            $patchBody = @{ schema = $newSchema } | ConvertTo-Json -Depth 10
            $res = Invoke-RestMethod -Uri "$url/api/collections/$($coll.id)" -Method Patch -ContentType "application/json" -Headers $headers -Body $patchBody
            Write-Host "  Successfully updated $cName!" -ForegroundColor Green
        } else {
            Write-Host "  $cName is already up to date." -ForegroundColor Gray
        }
    } catch {
        $errMsg = $_.Exception.Message
        Write-Host "Failed to update $cName : $errMsg" -ForegroundColor Red
    }
}

# 3. Define Fields
$serviceFields = @(
    @{ name = "image_url"; type = "url" },
    @{ name = "max_slots"; type = "number" },
    @{ name = "price"; type = "number" },
    @{ name = "due_day"; type = "number" },
    @{ name = "shop_id"; type = "relation"; options = @{ collectionId = "shops"; cascadeDelete = $false; maxSelect = 1 } },
    @{ name = "note_template"; type = "text" },
    @{ name = "last_distribution_date"; type = "date" },
    @{ name = "next_distribution_date"; type = "date" },
    @{ name = "distribution_status"; type = "text" }
)

$memberFields = @(
    @{ name = "person_id"; type = "relation"; options = @{ collectionId = "people"; cascadeDelete = $true; maxSelect = 1 } },
    @{ name = "slots"; type = "number" },
    @{ name = "is_owner"; type = "bool" }
)

# 4. RUN
Update-Collection "services" $serviceFields
Update-Collection "service_members" $memberFields

Write-Host "--- Migration Finished ---" -ForegroundColor Cyan
