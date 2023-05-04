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