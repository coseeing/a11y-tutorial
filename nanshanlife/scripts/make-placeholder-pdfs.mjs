// 產生範例頁用的 PDF 佔位檔：講師招募簡章.pdf（約 100KB）、public/files/活動簡章.pdf（約 200KB）、服務條款全文.pdf（約 100KB）。
// 檔案大小接近頁面上描述的大小。內容只有一行英文說明（PDF 內建字型沒有中文）。
//
// 用法：node scripts/make-placeholder-pdfs.mjs

import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const outDir = join(fileURLToPath(new URL('..', import.meta.url)), 'public', 'files')
mkdirSync(outDir, { recursive: true })

function makePdf(text, targetBytes) {
  const content = `BT /F1 18 Tf 72 720 Td (${text}) Tj ET`
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
  ]

  const build = (padding) => {
    let pdf = '%PDF-1.4\n'
    const offsets = []
    objects.forEach((obj, i) => {
      offsets.push(pdf.length)
      pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`
    })
    // 補足大小用的註解行（PDF 閱讀器會忽略）
    pdf += padding
    const xref = pdf.length
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
    for (const off of offsets) pdf += `${String(off).padStart(10, '0')} 00000 n \n`
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`
    return pdf
  }

  const base = build('').length
  const line = `%${'0'.repeat(98)}\n` // 100 bytes
  const padding = line.repeat(Math.max(0, Math.floor((targetBytes - base) / line.length)))
  return build(padding)
}

const files = [
  ['講師招募簡章.pdf', '2027 instructor recruitment brochure (sample file)', 100 * 1024],
  ['活動簡章.pdf', 'Year-end lecture brochure (sample file)', 200 * 1024],
  ['服務條款全文.pdf', 'Terms of service (sample file)', 100 * 1024],
]

for (const [name, text, size] of files) {
  const pdf = makePdf(text, size)
  writeFileSync(join(outDir, name), pdf, 'latin1')
  console.log(`${name}: ${pdf.length} bytes`)
}
