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
    "incomeId": 0,
    "paymentDay": 0,
    "retirementType": 0,
    "imputedMonth": 0,
    "paymentYear": 0,
    "paymentMonth": 0,
    "employeeType": 0,
    "employeeId": 0,
    "incomeTypeCode": "",
    "createdAt": 0,
    "incomePayment": 0,
    "withholdingIncomeTax": 0,
    "withholdingLocalIncomeTax": 0,
    "withholdingRuralSpecialTax": null,
    "prevPaymentDay": null,
    "actualPayment": 0,
    "employee": {
        "joinedAt": 0,
        "leavedAt": 0,
        "totalPay": 0,
        "name": "",
        "employeeId": 0,
        "incomeTypeCode": "",
        "residentId": "",
        "status": 0,
        "foreigner": false,
        "nationalPensionDeduction": true,
        "healthInsuranceDeduction": false,
        "employeementInsuranceDeduction": false,
        "nationalPensionSupportPercent": null,
        "employeementInsuranceSupportPercent": null,
        "employeementReductionRatePercent": null,
        "incomeTaxMagnification": 0
    },
    "totalDeduction": 0,
    "specification": {
        "executive": false,
        "retirementReason": 0,
        "specificationDetail": {
            "prevRetiredYearsOfService": {
                "settlementStartDate": 0,
                "settlementFinishDate": 0,
                "paymentDate": 0,
                "exclusionDays": 0,
                "additionalDays": 0,
            },
            "lastRetiredYearsOfService": {
                "settlementStartDate": 0,
                "settlementFinishDate": 0,
                "paymentDate": 0,
                "exclusionDays": 0,
                "additionalDays": 0
            },
            "prevRetirementBenefitStatus": {
                "retirementBenefits": 0,
                "nonTaxableRetirementBenefits": 0,
                "taxableRetirementBenefits": 0
            },
            "settlementRetiredYearsOfService": {
                "settlementStartDate": 0,
                "settlementFinishDate": 0,
                "paymentDate": 0,
                "exclusionDays": 0,
                "additionalDays": 0
            },
            "taxAmountCalculation": {
                "taxCredit": 0,
                "prePaidDelayedTaxPaymentTaxAmount" : 0
            }
        },
        "totalPay3Month": 0,
        "totalAnualBonus": 0,
        "annualLeaveAllowance": 0,
        "expectedRetirementBenefits": 0,
        "definedRetirementBenefits": 0,
        "nonTaxableRetirementBenefits": 0,
        "taxableRetirementBenefits": 0,

    }

}