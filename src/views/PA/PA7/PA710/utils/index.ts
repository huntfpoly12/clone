export const initialState = {
        name: "",
        foreigner: false,
        nationality: '대한민국',
        nationalityCode: 'KR',
        stayQualification: null,
        residentId: "",
        email: "",
        employeeId: null,
        residentIdHide: 'PA710',
        incomeTypeCode: null,
        incomeTypeName: null,
        deletable: false,
}
export const initialOptionsRadio = [
        { id: false, text: "내국인" },
        { id: true, text: "외국인" },
    ]