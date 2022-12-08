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

export const ArrForeigner = [{ id: false, text: '내국인' }, { id: true, text: '외국인' }]

export const valueDefaultAction = {
    employeeId: null,
    name: '',
    foreigner: false,
    nationality: '대한민국',
    nationalityCode: 'KR',
    stayQualification: 'C-4',
    residentId: '',
    incomeTypeCode: '940100',
    incomeTypeName: '저술가',
    email: '',
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
        paymentDay: 0,
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