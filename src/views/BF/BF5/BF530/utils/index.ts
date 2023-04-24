export const reportTypeCheckbox = [
  { id: 1, text: "정기" },
  { id: 2, text: "수정" },
  { id: 3, text: "기한후" },
];
export const reportTypeTab2 = [
  { id: 1, text: "매월" },
  { id: 6, text: "반기" },
];
export const productionStatusesCheckbox = [
  { id: 0, text: "제작대기" },
  { id: 1, text: "제작중" },
  { id: 2, text: "제작성공" },
  { id: -1, text: "제작실패" },
];
export const formatMonth = (month: number) => {
  if (month < 10) {
    return "0" + month;
  }
  return month;
};
export const reportTypeSelectbox = [
  { id: 1, text: "가입" },
  { id: 2, text: "탈퇴" },
];
export const situationSelectbox = [
  { id: 1, text: "등록" },
  { id: 2, text: "접수" },
  { id: 10, text: "완료" },
  { id: -1, text: "오류" },
  { id: 0, text: "취소" },
];
export const acceptanceStatusSelectbox = [
  { id: 1, text: "신규" },
  { id: 2, text: "수임" },
  { id: 3, text: "타사수임" },
  { id: 10, text: "해지" },
];
export const healthSelectbox = [
  { id: 1, text: "신규" },
  { id: 10, text: "해지" },
  { id: 0, text: "신규" },
];
export const dataTableTab1 = [
  {
    id: 1,
    companyCode: "2",
    companyName: "2",
    inputYearMonth: "2",
    paymentYearMonth: "2",
    reportType: "2",
    afterDeadline: "20230202",
    totalCollectedTaxAmount: 2,
    statusUpdatedAt: 2,
    lastProductionRequestedAt: '2023/02/02',
    productionStatus: '2023/02/02',
    productionStatus1: 2,
    productionStatus2: 2,
    productionStatus3: 2,
    productionStatus4: 2,
  },
];
export const states1 = [
  {id: 1, name: 'truong'},
  {id: 2, name: 'truongnd'},
  {id: 3, name: 'truongnd001'},
]
export const reportTypeSelectbox2 = [
  { id: "all", text: "전체" },
  { id: -1, text: "오류" },
  { id: 2, text: "접수" },
  { id: 10, text: "완료" },
  { id: 0, text: "취소" },
];
