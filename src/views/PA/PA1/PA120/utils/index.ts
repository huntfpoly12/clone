export const radioCheckForeigner = [
  { id: 0, text: "내국인" },
  { id: 1, text: "외국인" },
];
export const radioCheckHouseholder = [
  { id: 1, text: "X" },
  { id: 2, text: "O" },
];
export const radioCheckPersenPension = [
  { id: 1, text: "0%" },
  { id: 2, text: "80%" },
];
export const radioCheckReductioRate = [
  { id: 1, text: "50%" },
  { id: 2, text: "70%" },
  { id: 3, text: "90%" },
];
export const radioCheckReductionInput = [
  { id: 1, text: "급여입력" },
  { id: 2, text: "연말입력" },
];
export const IncomeTaxAppRate = [
  { id: 1, text: "100%" },
  { id: 2, text: "180%" },
  { id: 3, text: "120%" },
];

export const initFormStateTab1 = {
  name: "",
  foreigner: false,
  nationality: "",
  nationalityCode: "KR",
  stayQualification: "C-4",
  residentId: "",
  roadAddress: "",
  addressExtend: "",
  email: "",
  employeeId: 0,
  joinedAt: "",
  leavedAt: "",
  president: false,
  householder: false,
  weeklyWorkingHours: 0,
  department: "",
  responsibility: "",
};

export const initFormStateTab2 = {
  incomeTaxMagnification: null,
  payItems: {
    itemCode: null,
    amount: null,
  },
  deductionItems: {
    itemCode: null,
    amount: null,
    supportAmount: null,
  },
  reductionItems: {
    temCode: null,
    reductionRate: null,
    reductionStartDate: "",
    reductionFinishDate: "",
    reductionInput: null,
  },
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
