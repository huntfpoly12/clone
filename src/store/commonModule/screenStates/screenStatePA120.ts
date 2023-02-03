import dayjs from "dayjs";
const statesPA120 = {
    arrayRoweditedPA120 : [],
    actionFormDonePA120 : true,
    keyActivePA120: 0,
    resetTabPA120:'1',
    isForeignerPA120:false,
    presidentPA120:false,
    initFormStateTabPA120 : {
        name: "",
        foreigner: false,
        nationality: "",
        nationalityCode: "KR",
        stayQualification: "C-4",
        residentId: "000000-0000000",
        roadAddress: "",
        addressExtend: "",
        email: "",
        employeeId: 0,
        president: false,
        householder: false,
        weeklyWorkingHours: 40,
        department: "",
        responsibility: "",
        joinedAt: dayjs().format("YYYYMMDD"),
        leavedAt: "",
    },
    editRowPA120: {
        name: "",
        foreigner: false,
        nationality: "",
        nationalityCode: "KR",
        stayQualification: "C-4",
        residentId: "000000-0000000",
        roadAddress: "",
        addressExtend: "",
        email: "",
        employeeId: 0,
        president: false,
        householder: false,
        weeklyWorkingHours: 40,
        department: "",
        responsibility: "",
        joinedAt: dayjs().format("YYYYMMDD"),
        leavedAt: "",
    },
    isCompareEditPA120: true,
    isNewRowPA120: false,
};
  
export default statesPA120;
  