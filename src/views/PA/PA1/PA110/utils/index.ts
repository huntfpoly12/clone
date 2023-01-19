// import { employees } from "./../../../../CM/CM1/CM130/utils/data";
// export const sampleFormIncomeWage = {
//   companyId: 29,
//   processKey: {
//     imputedYear: 2022,
//     imputedMonth: 12,
//     paymentYear: 2022,
//     paymentMonth: 12,
//   },
//   input: {
//     paymentDay: 1,
//     employeeId: 567567,
//     dailyWage: 1,
//     monthlyWage: 1,
//     workingDays: 1,
//     deductionItems: [],
//   },
// };
export const sampleDataIncomeWage = {
  actualPayment: 0,
  monthlyWage: 0,
  dailyWage: 0,
  workingDays: 0,
  paymentDay: 0,
  deductionItems: [{ amount: 0 }],
  employee: {
    name: "",
    totalDeduction: 0,
    monthlyPaycheck: true,
  },
};
// interface Origindata {
//   page: number;
//   rows: number;
//   statuses: number[];
//   grade: null | number;
//   name: string;
//   code: string;
// }
// export const origindata: Origindata = {
//   page: 1,
//   rows: 10,
//   statuses: [1],
//   grade: null,
//   name: "",
//   code: "",
// };

// export const ArrForeigner = [
//   { id: false, text: "내국인" },
//   { id: true, text: "외국인" },
// ];
export const initDataCustomRes = [
  { id: 1, name: "재직(퇴사)" },
  { id: 2, name: "과세급여", },
  { id: 3, name: "비과세급여", },
  { id: 4, name: "급여총액", },
  { id: 5, name: "국민연금", },
  { id: 6, name: "건강보험", },
  { id: 7, name: "장기요양", },
  { id: 8, name: "고용보험", },
  { id: 9, name: "소득세", },
  { id: 10, name: "지방소득세", },
  { id: 11, name: "공제총액", },
  { id: 12, name: "차인지급액", },
]

export const initFormState2 = {
  nationalPensionDeduction: false,
  healthInsuranceDeduction: false,
  longTermCareInsuranceDeduction: false,
  employeementInsuranceDeduction: false,
  insuranceSupport: false,
  nationalPensionSupportPercent: 0,
  employeementInsuranceSupportPercent: 0,
  employeementReduction: false,
  employeementReductionStartDate: "",
  employeementReductionFinishDate: "",
  employeementReductionRatePercent: 50,
  employeementReductionInput: 1,
  incomeTaxMagnification: 100,
  payItems: [],
  deductionItems: [],
};
import { companyId } from "@/helpers/commonFunction";

export const initFormState1 = {
  companyId: companyId,
  processKey: {
    imputedYear: 2022,
    imputedMonth: 1,
    paymentYear: 2022,
    paymentMonth: 1,
  },
  input: {
    workingDays: 0,
    totalWorkingHours: 0,
    overtimeWorkingHours: 0,
    workingHoursAtNight: 0,
    workingHoursOnHolidays: 0,
    payItems: [],
    deductionItems: [],
  },
  paymentDay: null,
  employee: {
    employeeId: null,
  },
};
// export const initRefreshDeduction = [
//   {
//     itemCode: 1001,
//     name: "국민연금",
//     value: 0,
//   },
//   {
//     itemCode: 1002,
//     name: "건강보험",
//     value: 0,
//   },
//   {
//     itemCode: 1003,
//     name: "장기요양보험",
//     value: 0,
//   },
//   {
//     itemCode: 1004,
//     name: "고용보험",
//     value: 0,
//   },
//   {
//     itemCode: 10011,
//     name: "소득세",
//     value: 0,
//   },
//   {
//     itemCode: 10012,
//     name: "지방소득세",
//     value: 0,
//   },
//   {
//     itemCode: 10013,
//     name: "농어촌특별세",
//     value: 0,
//   },
//   {
//     itemCode: 10021,
//     name: "연말정산 소득세",
//     value: 0,
//   },
//   {
//     itemCode: 10022,
//     name: "연말정산 지방소득세",
//     value: 0,
//   },
//   {
//     itemCode: 10023,
//     name: "연말정산 농어촌특별세",
//     value: 0,
//   },
//   {
//     itemCode: 10031,
//     name: "중도정산 소득세",
//     value: 0,
//   },
//   {
//     itemCode: 10032,
//     name: "중도정산 지방소득세",
//     value: 0,
//   },
//   {
//     itemCode: 10033,
//     name: "학자금상환",
//     value: 0,
//   },
// ];
