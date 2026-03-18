import net from 'node:net'
import { spawn, exec } from 'node:child_process'
import { promisify } from 'node:util'
import { rm } from 'node:fs/promises'

const execAsync = promisify(exec)

const PREFERRED_PORTS = [3000, 3001]

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer()

    server.once('error', () => {
      resolve(false)
    })

    server.once('listening', () => {
      server.close(() => resolve(true))
    })

    server.listen(port, '127.0.0.1')
  })
}

async function findPort() {
  // First try preferred ports in order
  for (const port of PREFERRED_PORTS) {
    if (await isPortFree(port)) {
      return port
    }
  }

  // If preferred ports are taken, find any free port
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.once('error', reject)
    server.once('listening', () => {
      const address = server.address()
      if (address && typeof address === 'object') {
        const { port } = address
        server.close(() => resolve(port))
      } else {
        server.close(() => reject(new Error('Unable to determine free port')))
      }
    })
    server.listen(0, '127.0.0.1')
  })
}

async function killProcessOnPort(port) {
  const isWindows = process.platform === 'win32'
  try {
    if (isWindows) {
      // Find PID on port using netstat
      const { stdout } = await execAsync(`netstat -ano | findstr :${port}`)
      const lines = stdout.split('\n')
      for (const line of lines) {
        const parts = line.trim().split(/\s+/)
        if (parts.length >= 5 && parts[1].includes(`:${port}`) && parts[3] === 'LISTENING') {
          const pid = parts[4]
          if (pid && pid !== '0') {
            console.log(`[dev-port] Killing process ${pid} on port ${port}...`)
            await execAsync(`taskkill /F /PID ${pid} /T 2>NUL || exit 0`, { shell: 'cmd.exe' })
          }
        }
      }
    } else {
      await execAsync(`lsof -t -i:${port} | xargs kill -9 2>/dev/null || true`)
    }
  } catch (err) {
    // Ignore errors
  }
}

async function main() {
  const isWindows = process.platform === 'win32'
  
  console.log('[dev-port] Checking for existing processes...')
  
  // Try to kill processes on our preferred ports first
  for (const port of PREFERRED_PORTS) {
    await killProcessOnPort(port)
  }

  // General cleanup for next dev processes
  try {
    if (isWindows) {
      await execAsync('taskkill /F /IM node.exe /FI "WINDOWTITLE eq next*" /T 2>NUL || exit 0', { shell: 'cmd.exe' })
    } else {
      await execAsync('pkill -f "next dev" 2>/dev/null || true')
    }
    await new Promise(resolve => setTimeout(resolve, 800))
  } catch (err) {
    // Ignore
  }

  // Clear dev cache
  try {
    const foldersToClear = ['.next/dev', '.next-dev/dev']
    for (const folder of foldersToClear) {
      await rm(folder, { recursive: true, force: true }).catch(() => {})
    }
  } catch (err) {
    // Ignore
  }

  const port = await findPort()
  console.log(`[dev-port] Starting Next.js on port ${port}`)

  const child = spawn('next', ['dev', '-p', String(port)], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, PORT: String(port) }
  })

  child.on('exit', (code) => {
    process.exit(code ?? 0)
  })
}

main().catch((error) => {
  console.error('[dev-port] Failed to start dev server:', error)
  process.exit(1)
})
