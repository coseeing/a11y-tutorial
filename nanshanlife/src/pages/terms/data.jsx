// 服務條款頁的文字內容。A、B 兩版讀同一份資料，確保文字完全一致。

export const TERMS_PDF = {
  href: '../../files/服務條款全文.pdf',
  fileName: '服務條款全文.pdf',
  description: '服務條款全文.pdf，100KB',
}

// 第三條：個人資料保護法（開新分頁）。兩版連結文字相同，B 版沒有告知開新分頁。
export const PDPA_URL = 'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=I0050021'

// 第五條：消費者保護法（同一分頁開啟）。B 版的連結文字是完整網址。
// 兩個連結刻意放在不相鄰的條文，學員要逐條展開才找得到。
export const CPA_URL = 'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=J0170001'

/**
 * 第一條至第八條。body 是函式：A、B 兩版傳入各自的「下載」按鈕、個資法連結與消保法連結，
 * 其餘文字共用。
 */
export const CLAUSES = [
  {
    key: 'c1',
    title: '第一條 總則',
    body: ({ download }) => (
      <>
        <p className="typography-body1 m-0">
          歡迎使用好好學線上課程平台（以下簡稱本平台）。當你註冊或使用本平台的服務，即表示你已閱讀、了解並同意本條款的全部內容。
        </p>
        <p className="typography-body1 m-0">本條款如有修改，將公告於本平台，不另行個別通知。</p>
        <div>{download}</div>
      </>
    ),
  },
  {
    key: 'c2',
    title: '第二條 會員註冊',
    body: () => (
      <p className="typography-body1 m-0">
        註冊時請提供真實、正確的資料，並妥善保管帳號與密碼。因帳號密碼保管不當造成的損失，由會員自行負責。
      </p>
    ),
  },
  {
    key: 'c3',
    title: '第三條 個人資料保護',
    body: ({ pdpaLink }) => (
      <>
        <p className="typography-body1 m-0">
          本平台依照個人資料保護法蒐集、處理及利用你的個人資料，僅用於提供課程服務、寄送通知與改善服務品質，不會提供給第三方。
        </p>
        <p className="typography-body1 m-0">你可以隨時要求查詢、更正或刪除你的個人資料。相關規定請參考{pdpaLink}。</p>
      </>
    ),
  },
  {
    key: 'c4',
    title: '第四條 課程使用',
    body: () => (
      <p className="typography-body1 m-0">
        購買的課程僅供會員本人觀看，不得錄製、轉售或公開播放。課程內容的著作權屬於原講師與本平台所有。
      </p>
    ),
  },
  {
    key: 'c5',
    title: '第五條 付款與退費',
    body: ({ cpaLink }) => (
      <>
        <p className="typography-body1 m-0">
          購買課程後七天內，且觀看進度未超過百分之二十，可以申請全額退費。超過期限或進度者，恕不受理退費。
        </p>
        <p className="typography-body1 m-0">退費的相關規定請參考{cpaLink}。</p>
      </>
    ),
  },
  {
    key: 'c6',
    title: '第六條 服務變更與終止',
    body: () => (
      <p className="typography-body1 m-0">
        本平台得因系統維護或其他因素暫停或變更服務。會員如違反本條款，本平台得暫停或終止其帳號。
      </p>
    ),
  },
  {
    key: 'c7',
    title: '第七條 免責聲明',
    body: () => (
      <>
        <p className="typography-body1 m-0">
          課程內容僅供學習參考，講師的觀點不代表本平台立場。會員依課程內容所做的決定，應自行判斷並承擔結果。
        </p>
        <p className="typography-body1 m-0">因不可抗力或第三方服務中斷造成的損失，本平台不負賠償責任。</p>
      </>
    ),
  },
  {
    key: 'c8',
    title: '第八條 準據法與管轄法院',
    body: () => (
      <p className="typography-body1 m-0">
        本條款的解釋與適用，以中華民國法律為準據法。因本條款發生的爭議，以臺灣臺北地方法院為第一審管轄法院。
      </p>
    ),
  },
]
