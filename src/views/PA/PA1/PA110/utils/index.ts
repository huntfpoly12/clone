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
