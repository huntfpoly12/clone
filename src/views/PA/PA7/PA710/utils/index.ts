export const initialState = {
        name: "",
        foreigner: false,
        nationality: '대한민국',
        nationalityCode: 'KR',
        stayQualification: null,
        residentId: "",
        email: "",
        employeeId: null,
        incomeTypeCode: "940100",
        incomeTypeName: "저술가",
}
export const initialOptionsRadio = [
        { id: false, text: "내국인" },
        { id: true, text: "외국인" },
    ]