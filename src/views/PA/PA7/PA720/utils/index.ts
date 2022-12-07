export const radioCheckForeigner = [
    { id: false, text: '내국인' },
    { id: true, text: '외국인' }];
export const radioCheckHouseholder = [
    { id: 1, text: 'X' },
    { id: 2, text: 'O' }];
export const radioCheckPersenPension = [
    { id: 1, text: '0%' },
    { id: 2, text: '80%' }];
export const radioCheckReductioRate = [
    { id: 1, text: '50%' },
    { id: 2, text: '70%' },
    { id: 3, text: '90%' }
];
export const radioCheckReductionInput = [
    { id: 1, text: '급여입력' },
    { id: 2, text: '연말입력' },
];
export const IncomeTaxAppRate = [
    { id: 1, text: '100%' },
    { id: 2, text: '180%' },
    { id: 3, text: '510%' },
];

export const dataDemo = [
    { id: 1, text: '100%' },
    { id: 2, text: '180%' },
    { id: 3, text: '510%' },
];
export const getIncomeProcessExtrasFake = [
    {
        companyId: 1,
        type: 12,
        imputedYear: 12,
        imputedMonth: 12,
        paymentYear: 12,
        paymentMonth: 12,
        status: 12,
        statusUserId: 12,
        statusUpdatedAt: 12,
        createdAt: 12,
        createdBy: 12,
        updatedAt: 12,
        updatedBy: 12,
        ip: 12,
        active: 12,
        statusUpdateUser: {
            id: 12,
            type: 12,
            username: 12,
            name: 12,
            active: 12,
        },
        employeeStat: {
            type: 12,
            imputedYear: 12,
            imputedMonth: 12,
            paymentYear: 12,
            paymentMonth: 12,
            employeeCount: 12,
            retireEmployeeCount: 12,
        },
        incomeStatL: {
            imputedYear: 12,
            imputedMonth: 12,
            paymentYear: 12,
            paymentMonth: 12,
            incomePayment: 12,
            withholdingIncomeTax: 12,
            withholdingLocalIncomeTax: 12,
            withholdingRuralSpecialTax: 12,
            actualPayment: 12,
        }
    }
]
export const getIncomeExtrasFake = [{
    incomeId: 123,
    paymentDay: 123,
    employeeType: 123,
    employeeId: 123,
    incomeTypeCode: 123,
    incomePayment: 123,
    withholdingIncomeTax: 123,
    withholdingLocalIncomeTax: 123,
    withholdingRuralSpecialTaxprevPaymentDaycreatedAt: 123,
    createdBy: 123,
    updatedAt: 123,
    updatedBy: 123,
    ip: 123,
    active: 123,
    paymentAmount: 123,
    requiredExpenses: 123,
    taxRate: 123,
    actualPayment: 123,
    employee:{
        type:123,    
        employeeId:123,
        incomeTypeCode:123,
        name:123,
        foreigner:123,
        nationality:123,
        nationalityCode:123,
        stayQualification:123,
        residentIdValidity:123,
        roadAddress:123,
        addressExtend:123,
        email:123,
        department:123,
        responsibility:123,
        status:123,
        withholdingIncomeTax:123,
        withholdingLocalIncomeTax:123,
        withholdingRuralSpecialTax:123,
        createdAt:123,
        createdBy:123,
        updatedAt:123,
        updatedBy:123,
        ip:123,
        active:123,
        residentId:123,
        incomeTypeName:"nguyen pham hong bao",
        deletable:123,
    }
}
]


