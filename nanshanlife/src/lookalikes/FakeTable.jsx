// ⚠️ B 版專用：刻意做壞的「表格」。不要修好它。
//
// 外觀與 DS Table 完全相同（class 複製自 coseeing-ui/src/components/Table/Table.tsx），
// 但只是用 CSS grid 排出來的 <div>：
//   - 沒有 table / row / cell / columnheader 角色 → NVDA 按 T 找不到表格
//   - Ctrl＋Alt＋方向鍵無法逐格移動，也念不出表頭
//   - 按「,」無法跳出表格，只能一格一格往下聽
//
// 對應教材 4-3：「看起來像表格，但只是排版的格子」。
//
// columns 的 width 必須是百分比，A 版的 DS Table 也要給同樣的寬度，兩版欄寬才會一致。

export function FakeTable({ columns, rows }) {
  const gridTemplateColumns = columns.map((col) => col.width).join(' ')

  return (
    <div className="w-full overflow-x-auto rounded-[1.2rem] border border-neutral-light-gray bg-neutral-white px-20 py-16 desktop:px-32 desktop:py-24">
      {/* <table> 的 border-collapse 把表頭底線畫在 4rem 的表頭列之後，並和下一列重疊 1px。
          這裡用 -mb-px 模擬：底線位置和各列位置才會和 A 版一致。 */}
      <div className="-mb-px grid border-b border-neutral-light-gray" style={{ gridTemplateColumns }}>
        {columns.map((col) => (
          <div
            key={col.key}
            className="typography-strong1 flex h-[4rem] items-center pr-40 text-left text-teal-700 last:pr-0"
          >
            {col.label}
          </div>
        ))}
      </div>
      {rows.map((row, i) => (
        <div key={i} className="grid" style={{ gridTemplateColumns }}>
          {columns.map((col, c) => (
            <div
              key={col.key}
              className={
                'typography-body2 flex h-[3.8rem] items-center pr-40 last:pr-0 ' +
                (c === 0 ? 'text-teal-500' : 'text-teal-700')
              }
            >
              {row[col.key]}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
