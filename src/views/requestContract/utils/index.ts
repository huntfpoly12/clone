import dayjs from "dayjs"

export const dataDefaultsUtil = {
    terms: false,
    personalInfo: false,
    accountingService: false,
    withholdingService: false,
    nameCompany: "",
    zipcode: "",
    roadAddress: "",
    jibunAddress: "",
    addressExtend: "",
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
    phone: "",
    fax: "",
    licenseFileStorageId: 0,
    bizNumber: "",
    financialCompany: "",
    residentId: "",
    namePresident: "",
    birthday: parseInt(dayjs().format('YYYYMMDD')),
    mobilePhone: "",
    email: "",
    longTermCareInstitutionNumber: "",
    facilityBizType: 1,
    accountingServiceTypes: 1,
    facilityBusinesses: [],
    startYearMonthHolding: parseInt(dayjs().format('YYYYMM')),
    capacityHolding: null,
    withholdingServiceTypes: 1,
    accountNumber: "",
    ownerBizNumber: "",
    withdrawDay: "5일",
    salesRepresentativeId: parseInt('1'),
    comment: "",
    ownerName: "",
    registrationCardFileStorageId: 0
}

export const plainOptionsUtil = [
    {
        text: "신청합니다",
        id: 1
    }, {
        text: "신청하지않습니다",
        id: 2
    }
]

export const arrayRadioCheckUtil = [
    { id: 1, text: '법인사업자' },
    { id: 2, text: '개인사업자' },
]
export const arrayRadioCheckUtilStep3 = [
    { id: 1, text: '신청합니다' },
    { id: 2, text: '신청하지 않습니다' },
]

export const arrayRadioWithdrawDayUtil = [
    { id: '5일', text: '매월 5일' },
    { id: '12일', text: '매월 12일' },
    { id: '19일', text: '매월 19일' },
]
