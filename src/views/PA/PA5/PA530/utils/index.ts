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

export const arrCheckBox = {
    quarter1: {
        label: "1/4분기",
        value: true,
    },
    quarter2: {
        label: "2/4분기",
        value: true,
    },
    quarter3: {
        label: "3/4분기",
        value: true,
    },
    quarter4: {
        label: "4/4분기",
        value: true,
    },
    month1: {
        label: "01월",
        value: true,
    },
    month2: {
        label: "02월",
        value: true,
    },
    month3: {
        label: "03월",
        value: true,
    },
    month4: {
        label: "04월",
        value: true,
    },
    month5: {
        label: "05월",
        value: true,
    },
    month6: {
        label: "06월",
        value: true,
    },
    month7: {
        label: "07월",
        value: true,
    },
    month8: {
        label: "08월",
        value: true,
    },
    month9: {
        label: "09월",
        value: true,
    },
    month10: {
        label: "10월",
        value: true,
    },
    month11: {
        label: "11월",
        value: true,
    },
    month12: {
        label: "12월",
        value: true,
    },
}

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

export const dataDemo =
{
    totalTaxPay: "totalTaxPay",
    totalTaxfreePay: "totalTaxfreePay",
    withholdingIncomeTax: "221312",
    withholdingLocalIncomeTax: "22222",
    employee:
        [
            { 
                employeeId: 28,
                type: "2",
                incomeTypeCode: "940905",
                name: "An Tú",
                foreigner: true,
                nationality: "2",
                nationalityCode: "2",
                stayQualification: "2",
                residentIdValidity: "2",
                roadAddress: "2",
                addressExtend: "2",
                email: "phamantu123@gmail.com",
                department: "2",
                responsibility: "2",
                status: 10,
                withholdingIncomeTax: "withholdingIncomeTax",
                withholdingLocalIncomeTax: "withholdingLocalIncomeTax",
                withholdingRuralSpecialTax: "2",
                createdAt: "2",
                createdBy: "2",
                updatedAt: "2",
                updatedBy: "2",
                ip: "2",
                active: "2",
                residentId: "990128-4654",
                joinedAt: "2",
                leavedAt: "2",
                retirementIncome: "2",
                weeklyWorkingHours: "2",
                monthlyPaycheck: "2",
                workingDays: "2",
                dailyWage: "2",
                monthlyWage: "2",
                totalDeduction: "2",
                deletable: "2",
            }
        ],

}

