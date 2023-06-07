export interface Budget {
  index: number
  employeeSalaryTable: number | null;
  budgetType?: 4 | 5,
  revenueBudgetSum: number | null;
  employeePaySum: number | null;
  action: ACTION;
  columnName?: string;
  expenditureBudgetSum: number | null;
  type: ComponentCreateBudget
  status: 10 | 20 | 30 | 40
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
export enum TypeMail {
  BudgetSummaryTable,
  Budget,
  EmployeePayTable
}
