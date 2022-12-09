export const sampleFormIncomeWageDaily = {
    companyId: 29,
    processKey: {
        imputedYear: 2022,
        imputedMonth: 12,
        paymentYear: 2022,
        paymentMonth: 12,
    },
    input: {
        paymentDay: 1,
        employeeId: 567567,
        dailyWage: 1,
        monthlyWage: 1,
        workingDays: 1,
        deductionItems: [],
    }

}
export const sampleDataIncomeWageDaily = {
    actualPayment: 0,
    monthlyWage: 0,
    dailyWage: 0,
    workingDays: 0,
    employee: {
        name: '',
        totalDeduction: 0,
        monthlyPaycheck: true,
    },
    paymentDay: 0,
    deductionItems: [{ amount: 0 }]
}



