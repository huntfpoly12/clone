interface Origindata {
    page: number,
    rows: number,
    statuses: number[],
    grade: null | number,
    name: string,
    code: string,
}
export const origindata: Origindata = {
    page: 1,
    rows: 10,
    statuses: [1],
    grade: null,
    name: "",
    code: "",
}

import { companyId } from "@/helpers/commonFunction";
export const dataActionUtils = {
    companyId: companyId,
    processKey: {
        imputedYear: 2022,
        imputedMonth: 1,
        paymentYear: 2022,
        paymentMonth: 1,
    },
    input: {
        paymentDay: null,
        employeeId: 0,
        incomeTypeCode: "",
        paymentAmount: 0,
        taxRate: 3,
        withholdingIncomeTax: 0,
        withholdingLocalIncomeTax: 0,
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

export const dataCallApiCreated = {
    retirementIncome: '',
}