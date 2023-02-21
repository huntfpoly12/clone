import dayjs from "dayjs";
const statesPA120 = {
  arrayRoweditedPA120: [],
  actionFormDonePA120: true,
  keyActivePA120: 0,
  resetTabPA120: '1',
  isForeignerPA120: false,
  presidentPA120: false,
  presidentEditPA120: false,
  initFormStateTabPA120: {
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
  },
  editRowPA120: {
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
  },
  initFormTab2PA120: {
    nationalPensionDeduction: false,
    healthInsuranceDeduction: false,
    longTermCareInsuranceDeduction: false,
    employeementInsuranceDeduction: false,
    insuranceSupport: false,
    employeementReduction: false,
    incomeTaxMagnification: 100,
    payItems: [],
    deductionItems: [],
  },
  editRowTab2PA120: {
    nationalPensionDeduction: false,
    healthInsuranceDeduction: false,
    longTermCareInsuranceDeduction: false,
    employeementInsuranceDeduction: false,
    insuranceSupport: false,
    employeementReduction: false,
    incomeTaxMagnification: 100,
    payItems: [],
    deductionItems: [],
  },

  isCompareEditPA120: true,
  isNewRowPA120: true,
  isAddFormErrorPA120: false,
  isChangeConfigPayItemsPA120: false,
  isCalculateEditPA120: true,
  rowKeyTab2PA120: 1,
};

export default statesPA120;
