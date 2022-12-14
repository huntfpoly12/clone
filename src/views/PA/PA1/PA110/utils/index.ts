import { employees } from "./../../../../CM/CM1/CM130/utils/data";
export const sampleFormIncomeWage = {
  companyId: 29,
  processKey: {
    imputedYear: 2022,
    imputedMonth: 12,
    paymentYear: 2022,
    paymentMonth: 12,
  },
  input: {
    paymentDay: 1,
    employeeId: 567567,
    dailyWage: 1,
    monthlyWage: 1,
    workingDays: 1,
    deductionItems: [],
  },
};
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
interface Origindata {
  page: number;
  rows: number;
  statuses: number[];
  grade: null | number;
  name: string;
  code: string;
}
export const origindata: Origindata = {
  page: 1,
  rows: 10,
  statuses: [1],
  grade: null,
  name: "",
  code: "",
};

export const ArrForeigner = [
  { id: false, text: "내국인" },
  { id: true, text: "외국인" },
];

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
