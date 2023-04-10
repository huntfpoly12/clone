import { companyId } from "@/helpers/commonFunction";
import dayjs from 'dayjs';
interface Origindata {
    page: number,
    rows: number,
    statuses: number[],
    grade: null | number,
    name: string,
    code: string,
}
export const monthNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
/**
 * It runs a series of functions in sequence, waiting for each one to finish before starting the next
 * one
 */
async function runFunctions() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  await new Promise(resolve => setTimeout(resolve, 1000));
  // add more functions here as needed
}

// runFunctions();
export const dataActionUtils = {
    companyId: companyId,
    processKey: {
        imputedYear: null,
        imputedMonth: null,
        paymentYear: null,
        paymentMonth: null,
    },
    input: {
        paymentDay: 1,
        employeeId: '',
        incomeTypeCode: "",
        paymentAmount: null,
        requiredExpenses: null,
        taxRate: null,
        withholdingIncomeTax: null,
        withholdingLocalIncomeTax: null,
        incomeId: "99axbzkk",
    }
}
export const dataGetDetailEdit = {
    companyId: companyId,
    processKey: {
        imputedYear: 2022,
        imputedMonth: 1,
        paymentYear: 2022,
        paymentMonth: 1,
    },
    incomeId: 0
}
export const taxDateIndex = {
    processKey: {
        imputedYear: dayjs().format('YYYY'),
        imputedMonth: dayjs().format('MM'),
        paymentYear: dayjs().format('YYYY'),
        paymentMonth: dayjs().format('MM'),
    },
}

export const formatMonth = (month: number) => {
  if (!month) {
    return 0;
  }
  return month < 10 ? '0' + month : month;
};