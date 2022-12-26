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
export const  dataActionUtil = {
    employeeId: null,
    incomeTypeCode: '940100',
    companyId: companyId,
    input: {
        name: '',
        foreigner: false,
        nationality: '대한민국',
        nationalityCode: 'KR',
        stayQualification: 'C-4',
        residentId: '',
        incomeTypeName: '저술가',
        email: '',
    }
}