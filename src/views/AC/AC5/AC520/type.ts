export interface Budget {
  budget: boolean;
  status: number;
  employeeSalaryTable: number | null;
}

export enum StepCreateBudget {
  Step1 = 1,
  Step2 = 2,
  Step3 = 3,
}
export enum ComponentCreateBudget {
  EmployeeSalaryTable = "EmployeeSalaryTable",
  ExpenseAndRevenueBudget = "ExpenseAndRevenueBudget",
}
