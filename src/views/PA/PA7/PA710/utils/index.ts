export const initialState = {
        name: "",
        foreigner: false,
        nationality: '대한민국',
        nationalityCode: 'KR',
        stayQualification: null,
        residentId: "",
        email: "",
        employeeId: null,
        employeeIdHide: 'PA710',
        incomeTypeCode: "940100",
        incomeTypeName: "저술가",
        deletable: false,
}
export const initialOptionsRadio = [
        { id: false, text: "내국인" },
        { id: true, text: "외국인" },
    ]