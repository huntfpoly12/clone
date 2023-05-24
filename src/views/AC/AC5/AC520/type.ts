export interface Budget {
  index: number
  employeeSalaryTable: number | null;
  budgetType?: 4 | 5,
  revenueBudgetSum: number | null;
  action: ACTION;
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
export enum ACTION {
  ADD = "add",
  EDIT = "edit",
}
