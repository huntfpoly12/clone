import filters from "@/helpers/filters";
import dayjs from "dayjs";

export const initialFormState = {
    status: 1,
    name: "",
    grade: 1,
    bizType: 2,
    bizNumber: "",
    residentId: "",
    email: "",
    mobilePhone: "",
    phone: "",
    fax: "",
    zipcode: "",
    roadAddress: "",
    jibunAddress: "",
    addressExtend: "",
    addressDetail: {
        bcode: "",
        bname: "",
        buildingCode: "",
        buildingName: "",
        roadname: "",
        roadnameCode: "",
        sido: "",
        sigungu: "",
        sigunguCode: "",
        zonecode: "",
    },
    taxInvoice: false,
    emailTaxInvoice: "",
    bankType: "13",
    accountNumber: "",
    accountOwner: "",
    registerDate: filters.formatDateToInterger(dayjs().format("YYYYMMDD")),
    cancelDate: null,
    remark: "",
};

interface Origindata {
    page: number,
    rows: number,
    statuses: number[],
    grade: null | number,
    name: string,
    code: string,
}
export const origindata : Origindata = {
    page: 1,
    rows: 10,
    statuses: [1],
    grade: null,
    name: "",
    code: "",
}