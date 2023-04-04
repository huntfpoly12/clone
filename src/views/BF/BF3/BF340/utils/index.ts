
export const initialFormState = {
    status: 1,
    name: null,
    grade: 1,
    bizType: 2,
    bizNumber: null,
    residentId: null,
    email: null,
    mobilePhone: null,
    phone: null,
    fax: null,
    zipcode: null,
    roadAddress: null,
    jibunAddress: null,
    addressExtend: "",
    addressDetail: {
        bname: null,
        buildingCode: null,
        buildingName: "",
        roadname: null,
        roadnameCode: null,
        sido: null,
        sigungu: null,
        sigunguCode: null,
        zonecode: null,
    },
    taxInvoice: false,
    emailTaxInvoice:null,
    bankType: "13",
    accountNumber: null,
    accountOwner: null,
    registerDate: null,
    cancelDate: null,
    remark: null,
};

interface Origindata {
    page: number,
    rows: number,
    statuses: number[],
    grade: null | number,
    name:  null | string,
    code:  null | string,
}
export const origindata : Origindata = {
    page: 1,
    rows: 10,
    statuses: [1],
    grade: null,
    name: null,
    code: null,
}
