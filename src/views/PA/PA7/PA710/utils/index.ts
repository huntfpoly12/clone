export const initialState = {
        name: "",
        foreigner: false,
        nationality: null,
        nationalityCode: null,
        stayQualification: null,
        residentId: "",
        email: "",
        employeeId: 0,
        incomeTypeCode: "940100",
        incomeTypeName: "저술가",
}
export const initialOptionsRadio = [
        { id: false, text: "내국인" },
        { id: true, text: "외국인" },
    ]