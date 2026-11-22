// 活動 8 刻意把資料表的表頭做成 td；不要修正這個檢測目標。
// 正常的上午場仍使用 @coseeing/ui 的 Table。
export function PracticeLayoutTable({ columns, rows }) {
  return (
    <div className="w-full overflow-x-auto rounded-[1.2rem] border border-neutral-light-gray bg-neutral-white px-20 py-16 desktop:px-32 desktop:py-24">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-neutral-light-gray">
            {columns.map((column) => (
              <td key={column.key} className="typography-strong1 h-[4rem] pr-40 text-left align-middle text-teal-700 last:pr-0">
                {column.label}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map((column, columnIndex) => (
                <td key={column.key} className={`typography-body2 h-[3.8rem] pr-40 align-middle last:pr-0 ${columnIndex === 0 ? 'text-teal-500' : 'text-teal-700'}`}>
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
