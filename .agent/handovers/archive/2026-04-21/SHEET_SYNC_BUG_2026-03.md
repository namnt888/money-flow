# Sheet Sync Bug - Chỉ sync 1 transaction thay vì tất cả

## Issue Hiện Tại

**Mô tả:** Khi bấm sync cycle 2026-03 ở person Lâm (4wxl4cpp7u4adbb), chỉ có 1 transaction được tạo ra ở target sheet thay vì tất cả các transactions thuộc cycle 2026-03.

**Transaction được sync:**
- `1c0zp342njjpc0h` - Out - 11-03 - Bielende - 191.250

**URL:** http://localhost:3000/people/4wxl4cpp7u4adbb?tag=2026-03&year=2026

## Logs Phân Tích

```
[syncCycleTransactions] Mapped rows diagnostics: {
  total: 1,  // <--- CHỈ CÓ 1 TRANSACTION!
  sample: [{
    id: '1c0zp342njjpc0h',
    date: '2026-03-11 12:25:29.835Z',
    debt_cycle_tag: '2026-03',
    resolved_tag: '2026-03',
    amount: 191250
  }]
}

[syncCycleTransactions] Raw PB rows sample: [{
  id: '1c0zp342njjpc0h',
  occurred_at: '2026-03-11 12:25:29.835Z',
  debt_cycle_tag: '2026-03',  // <--- ĐÚNG LÀ 2026-03
  tag: '2026-03'
}]
```

## Query Filter Trong Code

File: `src/services/sheet.service.ts` - hàm `syncCycleTransactions`

```typescript
// Parse cycleTag to get filter
const yearMatch = cycleTag.match(/^(\d{4})$/)
const monthMatch = cycleTag.match(/^(\d{4})-(\d{2})$/)

if (monthMatch) {
  // Specific month like "2026-03"
  const legacyTag = yyyyMMToLegacyMMMYY(cycleTag)  // "2026-03" -> "MAR26"
  const tags = legacyTag ? [cycleTag, legacyTag] : [cycleTag]
  tagFilter = tags.map(t => `debt_cycle_tag = "${t}"`).join(' || ')
}
```

**Filter được tạo:**
```
debt_cycle_tag = "2026-03" || debt_cycle_tag = "MAR26"
```

## Nghi Vấn

1. **Vấn đề filter:** Query filter có thể không đúng, chỉ lấy được 1 transaction
2. **Vấn đề cycle tag:** Các transactions khác có thể có `debt_cycle_tag` khác (vd: null, empty, hoặc giá trị khác)
3. **Vấn đề mapping:** Logic mapping từ PB rows sang SheetSyncTransaction có thể bị lọc bớt

## Các Fix Đã Thử

1. Thêm `debt_cycle_tag?: string | null` vào type `SheetSyncTransaction`
2. Thêm `debt_cycle_tag` vào mapping trong `syncAllTransactions`
3. Đảm bảo `debt_cycle_tag` được truyền qua `buildPayload`

**Kết quả:** Vẫn chỉ sync 1 transaction.

## Hướng Nghiên Cứu Tiếp Theo

### 1. Kiểm tra trực tiếp PocketBase

Chạy query trực tiếp trên PocketBase để xem có bao nhiêu transactions thuộc person `4wxl4cpp7u4adbb` với `debt_cycle_tag = "2026-03"`:

```
Filter: person_id = "4wxl4cpp7u4adbb" && debt_cycle_tag = "2026-03" && status != "void"
```

### 2. Kiểm tra tất cả transactions của person

Xem tất cả transactions không void của person này để xem `debt_cycle_tag` thực sự là gì:

```
Filter: person_id = "4wxl4cpp7u4adbb" && status != "void"
Sort: occurred_at
```

### 3. Kiểm tra xem có transactions nào có `debt_cycle_tag` null hoặc empty không

Nếu có transactions mà không có `debt_cycle_tag`, chúng có thể bị filter out hoặc không được query đúng.

### 4. Kiểm tra xem có dateFilter ở đâu đó không

Logs có show `[DB:PB] account spending stats: transaction query attempt` với filter:
```
account_id='xxx' && (debt_cycle_tag='2026-03' || persisted_cycle_tag='2026-03' || tag='2026-03')
```

Có thể có dateFilter ở đâu đó gây ra vấn đề.

### 5. Kiểm tra logic sync ở phía Google Apps Script

Có thể vấn đề không phải ở Next.js mà ở phía Apps Script nhận payload và xử lý.

## Files Liên Quan

- `src/services/sheet.service.ts` - Hàm `syncCycleTransactions`
- `integrations/google-sheets/batch-sync/Code.js` - Apps Script xử lý sync
- `src/app/api/sheets/manage/route.ts` - API endpoint gọi sync

## Thông Tin Thêm

- Person ID: `4wxl4cpp7u4adbb`
- Cycle sync: `2026-03`
- Sheet link: `https://script.google.com/macros/s/AKfycbwI_Nvz5bd-qFROwgv5QPll5BgSCbrgm-aL2i4fXBGg-juKbliafo0ZVeNXBlvsNhC1/exec`
- Sheet ID: `1ZbrVMs4-HmDXpgrC6_NMicIwlVN5j5RLP4LqE-62y_Q`