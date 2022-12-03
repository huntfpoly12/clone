export const radioCheckForeigner = [
    { id: false, text: '내국인' },
    { id: true, text: '외국인' }];
export const radioCheckHouseholder = [
    { id: 1, text: 'X' },
    { id: 2, text: 'O' }];
export const radioCheckPersenPension = [
    { id: 0, text: '0%' },
    { id: 80, text: '80%' }];
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
    { id: 3, text: '520%' },
];
export const dataDemo = [
    { id: 1, text: '100%' },
    { id: 2, text: '180%' },
    { id: 3, text: '520%' },
];
import dayjs from 'dayjs';
export const DataCreated = {
    name: '',
    foreigner: false,
    nationality: '대한민국',
    nationalityCode: 'KR',
    stayQualification: 'C-4',
    residentId: '',
    zipcode: '',
    roadAddress: '',
    addressExtend: '',
    email: '',
    employeeId: null,
    joinedAt: dayjs().format('YYYY-MM-DD'),
    leavedAt: dayjs().format('YYYY-MM-DD'),
    retirementIncome: false,
    weeklyWorkingHours: null,
    department: '',
    responsibility: '',
};
export const DataEdit = {
    name: '',
    foreigner: false,
    nationality: '대한민국',
    nationalityCode: 'KR',
    stayQualification: 'C-4',
    residentId: '',
    roadAddress: '',
    addressExtend: '',
    email: '',
    employeeId: null,
    joinedAt: "",
    leavedAt: "",
    retirementIncome: false,
    weeklyWorkingHours: 0,
    department: '',
    responsibility: '',
}
export const originDataInputUpdate = {
    nationalPensionDeduction: false,
    healthInsuranceDeduction: false,
    longTermCareInsuranceDeduction: false,
    employeementInsuranceDeduction: false,
    insuranceSupport: false,
    nationalPensionSupportPercent: 0,
    employeementInsuranceSupportPercent: 0,
    monthlyPaycheck: false,
    workingDays: 0,
    dailyWage: 0,
    monthlyWage: 0,
    deductionItems: []
}
