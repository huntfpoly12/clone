import dayjs from "dayjs";
export const radioCheckForeigner = [
  { id: 0, text: "내국인" },
  { id: 1, text: "외국인" },
];
export const radioCheckHouseholder = [
  { id: 1, text: "X" },
  { id: 2, text: "O" },
];
export const radioCheckPersenPension = [
  { id: 0, text: "0%" },
  { id: 80, text: "80%" },
];
export const radioCheckReductioRate = [
  { id: 50, text: "50%" },
  { id: 70, text: "70%" },
  { id: 90, text: "90%" },
];
export const radioCheckReductionInput = [
  { id: 1, text: "급여입력" },
  { id: 2, text: "연말입력" },
];
export const IncomeTaxAppRate = [
  { id: 100, text: "100%" },
  { id: 80, text: "80%" },
  { id: 120, text: "120%" },
];

export const initFormStateTab1 = {
  name: "",
  foreigner: false,
  nationality: "",
  nationalityCode: "KR",
  stayQualification: "C-4",
  residentId: "000000-0000000",
  roadAddress: "",
  addressExtend: "",
  email: "",
  employeeId: 0,
  president: false,
  householder: false,
  weeklyWorkingHours: 40,
  department: "",
  responsibility: "",
  joinedAt: dayjs().format("YYYYMMDD"),
  leavedAt: "",
};
export const initFormStateTab2 = {
  nationalPensionDeduction: false,
  healthInsuranceDeduction: false,
  longTermCareInsuranceDeduction: false,
  employeementInsuranceDeduction: false,
  insuranceSupport: false,
  employeementReduction: false,
  incomeTaxMagnification: 100,
  payItems: [],
  deductionItems: [],
  //   employeementReductionRatePercent:50,
};
export const initFormStateTab3 = {
  employeeId: 0,
  incomeTypeCode: "",
  index: 0,
  relation: 0,
  name: "",
  foreigner: false,
  residentIdValidity: false,
  basicDeduction: 0,
  women: false,
  singleParent: false,
  senior: false,
  disabled: 0,
  maternityAdoption: 0,
  descendant: false,
  consignmentRelationship: "",
  householder: false,
  residentId: "",
};
export const taxWaring = '부녀자공제와 한부모공제 중 하나만 선택할수 있습니다. 공제금액이 더 많은 한부모공제를 적용합니다';
export const newDataSource = {
  type: 10,
  employeeId: 0,
  name: "",
  residentId: "",
  status: "",
  foreigner: false,
  incomeTypeCode: "",
  nationalPensionDeduction: false,
  healthInsuranceDeduction: false,
  longTermCareInsuranceDeduction: false,
  employeementInsuranceDeduction: false,
  insuranceSupport: false,
  employeementReduction: false,
  incomeTaxMagnification: 100,
  payItems: [],
  deductionItems: [],
  nationalPensionSupportPercent: false,
  employeementInsuranceSupportPercent: false,
  employeementReductionRatePercent: 50,
  deletable: false,
}
import {
  BasicDeduction, DisabledType, MaternityAndAdoption,
  enum2Entries,
} from "@bankda/jangbuda-common";
export const basicDeduction = (idRelation: any) => {
  let bsDeduction: any = enum2Entries(BasicDeduction).map((value) => ({
    value: value[1],
    label: value[0],
  }));
  bsDeduction.unshift({ value: null, label: '전체' });
  const obj = bsDeduction.filter((item: any) => {
    let check = item.value == idRelation;
    return check;
  })
  return obj[0].label;
};
export const disabledType = (idRelation: any) => {
  if(!idRelation){
    return '';
  }
  let disType: any = enum2Entries(DisabledType).map((value) => ({
    id: value[1],
    text: value[0],
  }));
  const obj = disType.filter((item: any) => {
    let check = item.id == idRelation;
    return check;
  })
  return obj[0].text;
};
export const maternityAndAdoption = (idRelation: any) => {
  if(!idRelation){
    return '';
  }
  let mtAndAdoption: any = enum2Entries(MaternityAndAdoption).map((value) => ({
    id: value[1],
    text: value[0],
  }));
  const obj = mtAndAdoption.filter((item: any) => {
    let check = item.id == idRelation;
    return check;
  })
  return obj[0].text;
};