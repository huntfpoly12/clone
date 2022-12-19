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

export const arrayReasonResignationUtils = [
    {
        label: "정년퇴직",
        value: 1
    },
    {
        label: "정리해고",
        value: 2
    },
    {
        label: "자발적퇴직",
        value: 3
    },
    {
        label: "임원퇴직",
        value: 4
    },
    {
        label: "중간정산",
        value: 5
    },
    {
        label: "기타",
        value: 6
    },
]

export const dataDefaultDetailUtils = {

    "incomeId": 177,
    "paymentDay": 20,
    "retirementType": 1,
    "imputedMonth": 11,
    "paymentYear": 2022,
    "paymentMonth": 12,
    "employeeType": 10,
    "employeeId": 1222222,
    "incomeTypeCode": "___",
    "createdAt": 1671070490472,
    "incomePayment": 10,
    "withholdingIncomeTax": -20,
    "withholdingLocalIncomeTax": -10,
    "withholdingRuralSpecialTax": null,
    "prevPaymentDay": null,
    "actualPayment": 40,
    "employee": {
        "joinedAt": 1667260800000,
        "leavedAt": 1667260800000,
        "totalPay": 98800,
        "name": "Page-PA-120",
        "employeeId": 1222222,
        "incomeTypeCode": "___",
        "residentId": "122222-2222222",
        "status": 0,
        "foreigner": false,
        "nationalPensionDeduction": true,
        "healthInsuranceDeduction": false,
        "employeementInsuranceDeduction": false,
        "nationalPensionSupportPercent": null,
        "employeementInsuranceSupportPercent": null,
        "employeementReductionRatePercent": null,
        "incomeTaxMagnification": 100
    },
    "retirementBenefits": 10,
    "nonTaxableRetirementBenefits": 10,
    "taxableRetirementBenefits": 10,
    "totalDeduction": -30,
    "specification": {
        "executive": false,
        "retirementReason": 1,
        "specificationDetail": {
            "prevRetiredYearsOfService": {
                "settlementStartDate": 20221010,
                "settlementFinishDate": 20221110
            }
        }
    }

}