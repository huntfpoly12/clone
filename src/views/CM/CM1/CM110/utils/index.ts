export const initialFormState = {
    name: "",
    bizType: "",
    bizNumber: "",
    address: "",
    presidentMobilePhone: "",
    fax: "",
    직인인감:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    extendInfo: {
        president: {
            name: "",
            birthday: "",
            mobilePhone: "",
            email: "",
        },
        detail: {
            name: "",
            zipcode: "",
            roadAddress: "",
            jibunAddress: "",
            addressExtend: "",
            addressDetail: {},
            phone: "",
            fax: "",
            licenseFileStorageId: 0
        }
    },
    sealFileStorageId: null
}
export const initialState = {
    username: "",
    name: "",
    accountingRole: true,
    facilityBusinessIds: [],
    withholdingRole: true,
    mobilePhone: "",
    email: "",
};
export const initialOptionsRadio = [
    { id: 0, text: "있음" },
    { id: 1, text: "없음" },
];