import dayjs from "dayjs";

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
export const reportTypeSelectboxTab3 = [
  { id: 1, text: "취득" },
  { id: 2, text: "상실" },
  { id: 3, text: "급여변경" },
  { id: 4, text: "휴직" },
  { id: 5, text: "복직" },
];
export const workingStatusSelectbox = [
  { id: 1, text: "등록" },
  { id: 2, text: "접수" },
  { id: 10, text: "완료" },
  { id: -1, text: "오류" },
  { id: 0, text: "취소" },
];
export const companyConsignStatusSelectbox = [
  { id: 1, text: "신규" },
  { id: 2, text: "수임" },
  { id: 3, text: "타사수임" },
  { id: 10, text: "해지" },
];
export const EDIStatusSelectbox = [
  { id: 0, text: "신규" },
  { id: 1, text: "위임" },
  { id: 10, text: "해지" },
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
    lastProductionRequestedAt: "2023/02/02",
    productionStatus: "2023/02/02",
    productionStatus1: 2,
    productionStatus2: 2,
    productionStatus3: 2,
    productionStatus4: 2,
  },
];
export const states1 = [
  { id: 1, text: "truong" },
  { id: 2, text: "truongnd" },
  { id: 3, text: "truongnd001" },
];
export const reportTypeSelectbox2 = [
  { id: "all", text: "전체" },
  { id: -1, text: "오류" },
  { id: 2, text: "접수" },
  { id: 10, text: "완료" },
  { id: 0, text: "취소" },
];
export const convertText = (arr: any[], id: number | string) => {
  let text: string;
  if (id === undefined || id === null) {
    return "";
  }
  text = arr.filter((item: any) => item.id == id)[0].text;
  return text ? text : id;
};
export const workStatusText = (id: number | string) => {
  let text: string;
  if (id === undefined || id === null) {
    return "";
  }
  text = workingStatusSelectbox.filter((item: any) => item.id == id)[0]?.text;
  return text ? text : id;
};
export const consignStatusText = (id: number | string) => {
  let text: string;
  if (id === undefined || id === null) {
    return "";
  }
  text = companyConsignStatusSelectbox.filter((item: any) => item.id == id)[0]
    ?.text;
  return text ? text : id;
};
export const EDIStatusText = (id: number | string) => {
  let text: string;
  if (id === undefined || id === null) {
    return "";
  }
  text = EDIStatusSelectbox.filter((item: any) => item.id == id)[0]?.text;
  return text ? text : id;
};
export const reportTypeText = (id: number | string) => {
  let text: string;
  if (id === undefined || id === null) {
    return "";
  }
  text = reportTypeSelectbox.filter((item: any) => item.id == id)[0]?.text;
  return text ? text : id;
};
export const reportTypeTextTab3 = (id: number | string) => {
  let text: string;
  if (id === undefined || id === null) {
    return "";
  }
  text = reportTypeSelectboxTab3.filter((item: any) => item.id == id)[0]?.text;
  return text ? text : id;
};
export const completedAtFormat = (time: any, workingStatus: any) => {
  if(time === null || time === undefined){
    return '';
  }
  if([1,2,0,10,-1,].includes(workingStatus)){
    return dayjs(time).format('YYYY-MM-DD');
  }
  return '';
}