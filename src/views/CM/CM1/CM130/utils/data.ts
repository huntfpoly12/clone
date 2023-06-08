import { TaxPayItem, TaxFreePayItem } from "@bankda/jangbuda-common";
import filters from '@/helpers/filters'
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

export const taxPayItem = Object.keys(TaxPayItem.all()).map((k, index) => ({
  value: TaxPayItem.all()[index].enumOrdinal + 1,
  label: TaxPayItem.all()[index].name,
}));

const arrLabel = Array();
TaxFreePayItem.all().forEach((k, index) => {
  let data = TaxFreePayItem.all()[index];
  let parseToStringData = JSON.parse(JSON.stringify(data)).props;
  if (parseToStringData.monthlyLimit) {
      arrLabel[index] = data.name + ' 월' + filters.formatCurrency(parseToStringData.monthlyLimit)
  } else if (parseToStringData.annualLimit) {
      arrLabel[index] = data.name + ' 년' + filters.formatCurrency(parseToStringData.annualLimit)
  } else {
      arrLabel[index] = data.name
  }
});

export const taxFreePayItem = Object.keys(TaxFreePayItem.all()).map((k, index) => ({
  value: TaxFreePayItem.all()[index].enumKey,
  label: arrLabel[index],
  submission: JSON.parse(JSON.stringify(TaxFreePayItem.all()[index])).props.submission,
}));