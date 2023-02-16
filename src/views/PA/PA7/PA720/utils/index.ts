import { companyId } from "@/helpers/commonFunction";
import store from "@/store/index";
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
const paymentDay = async() => {
  let data ;
  await new Promise(resolve => setTimeout(resolve,1000));
  data = store.getters['common/paymentDayPA720'];
  console.log(`output-2`,)
  return data;
}
console.log(`output->paymentDay`,paymentDay())
async function runFunctions() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Function 1 has completed');
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Function 2 has completed');
  // add more functions here as needed
}

runFunctions();
export const dataActionUtils = {
    companyId: companyId,
    processKey: {
        imputedYear: null,
        imputedMonth: null,
        paymentYear: null,
        paymentMonth: null,
    },
    input: {
        paymentDay: async()=>await paymentDay(),
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


