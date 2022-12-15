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

export const dataAddTableBigUtils = [
    {
        id: 1,
        name: "인원",
    },
    {
        id: 2,
        name: "퇴직급여",
    },
    {
        id: 3,
        name: "비과세퇴직급여",

    },
    {
        id: 4,
        name: "과세대상퇴직급여",

    },
    {
        id: 5,
        name: "소득세",

    },
    {
        id: 6,
        name: "지방소득세",
    },
    {
        id: 7,
        name: "공제총액",
    },
    {
        id: 8,
        name: "차인지급액",
    },
]