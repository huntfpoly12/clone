export const employees = [{
  ID: 1,
  관할세무서: '강서세무서',
  지방소득세납세지: '서울특별시 강서구',
  주소: '서울특별시 강서구 둔촌동',
  코드: '45',
  이용여부: '',
  과세구분: '과세',
  항목명: '기본급',
  비과세코드: 'S01',
  제출여부: 'X',
  유형: '',
  산출방법: ''
}, {
  ID: 2,
  관할세무서: '수원동세무서',
  지방소득세납세지: '서울특별시 강서구',
  주소: '서울특별시 송파구 거여동',
  코드: '12',
  이용여부: '',
  과세구분: '비과세',
  항목명: '식대',
  비과세코드: 'T03',
  제출여부: 'O',
  유형: '전직원',
  산출방법: '월 10만원',
}, {
  ID: 3,
  관할세무서: '송파세무서',
  지방소득세납세지: '경기도 수원시 팔달구',
  주소: '경기도 수원시 팔달구 소면동',
  코드: '20',
  이용여부: '이용중지',
  과세구분: '감면',
  항목명: '위험수당',
  비과세코드: 'A01',
  제출여부: 'X',
  유형: '생산직만 지급',
  산출방법: '기본급 x 18%',
}, {
  ID: 4,
  관할세무서: '남양주세무서',
  지방소득세납세지: '경기도 남양주시',
  주소: '경기도 남양주시 사패동',
  코드: '22',
  이용여부: '',
  과세구분: '공제',
  항목명: '초과근무수당',
  비과세코드: 'A02',
  제출여부: 'X',
  유형: '전직원',
  산출방법: '기본급 x 18%',

}];
export const optionsRadioReportType = [
  { id: 1, text: "매월" },
  { id: 6, text: "반기" },
];
export const optionsRadioPaymentType = [
  { id: 1, text: "당월지급 (당월 급여를 당월에 지급)" },
  { id: 2, text: "익월지급 (당월 급여를 다음월에 지급)" },
];
export const initialState = {
  itemCode: 0,
  taxPayCode: Array(),
  name: "",
  use: true,
  formula: "",
};
export const initialFormState = {
  reportType: 1,
  paymentType: 1,
  paymentDay: 1,
  insuranceSupport: false,
  competentTaxOfficeCode: '',
  localIncomeTaxArea: '',
  companyAddressInfoAddress: '',
  collectivePayment: false,
  taxForEachBusiness: false,
  bcode: "",
  taxOfficeName: "",
  undeclaredIncomeStatus: false,
}
export const initialFormStateDeduction = {
  itemCode: 0,
  taxPayCode: Array(),
  name: "",
  use: true,
  formula: "",

}