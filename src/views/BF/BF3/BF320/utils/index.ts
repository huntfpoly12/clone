// Data index

// Data searching default
export const dataSearchIndex = {
    page: 1,
    code: "",
    name: "",
    presidentName: "",
    address: "",
    manageUserId: null,
    salesRepresentativeId: null,
    excludeCancel: true
}
import dayjs from 'dayjs';
export const inputInCollapseUtils = [
    { key: 1, input_name: ['formState-name', 'formState-bizNumber', 'formState-extendInfoDetailZipcode', 'formState-extendInfoDetailRoadAddress', 'formState-extendInfoDetailPhone'] },
    { key: 2, input_name: ['formState-extendInfoPresidentBirthday', 'formState-extendInfoPresidentMobilePhone', 'formState-extendInfoPresidentEmail', 'formState-extendInfoPresidentName'] },
    { key: 3, input_name: ['formState-extendInfoCmsBankAccountNumber', 'formState-extendInfoCmsBankOwnerName', 'formState-extendInfoCmsBankOwnerBizNumber'] },
    { key: 4, input_name: ['withholding-capacity'] },
]
export const formStateMomesUtils = [
    {
        memoId: null,
        ownerUserId: 0,
        ownerName: "",
        ownerUsername: "",
        memo: "",
        createdAt: dayjs(new Date()).format('YYYY/MM/DD'),
        createdBy: "",
        updatedAt: dayjs(new Date()).format('YYYY/MM/DD'),
        updatedBy: "",
        ip: "",
        active: "",
    }
]

export const dataformStatePopup = {
    id: 0,
    code: "",
    name: "",
    bizNumber: "",
    bizType: 1,
    address: "",
    phone: "",
    residentId: '',
    presidentName: "",
    presidentMobilePhone: "",
    extendInfoDetailName: "",
    extendInfoDetailZipcode: "",
    extendInfoDetailRoadAddress: "",
    extendInfoDetailJibunAddress: "",
    extendInfoDetailAddressExtend: "",
    extendInfoDetailAddressDetailBcode: "",
    extendInfoDetailAddressDetailBname: "",
    extendInfoDetailAddressDetailBuildingCode: "",
    extendInfoDetailAddressDetailBuildingName: "",
    extendInfoDetailAddressDetailRoadname: "",
    extendInfoDetailAddressDetailRoadnameCode: "",
    extendInfoDetailAddressDetailSido: "",
    extendInfoDetailAddressDetailSigungu: "",
    extendInfoDetailAddressDetailSigunguCode: "",
    extendInfoDetailAddressDetailZonecode: "",
    extendInfoDetailPhone: "",
    extendInfoDetailFax: "",
    extendInfoDetailLicenseFileStorageId: "",
    extendInfoPresidentName: "",
    extendInfoPresidentBirthday: "",
    extendInfoPresidentMobilePhone: "",
    extendInfoPresidentEmail: "",
    extendInfoCmsBankBankType: "",
    extendInfoCmsBankAccountNumber: "",
    extendInfoCmsBankOwnerBizNumber: "",
    extendInfoCmsBankOwnerName: "",
    extendInfoCmsBankWithdrawDay: "",
    sealFileStorageId: null,
    createdAt: 0,
    createdBy: "",
    updatedAt: 0,
    updatedBy: "",
    ip: "",
    active: true,
    seal: null,
    canceledAt: null,
    unpaidMonths: 0
}

export const arrRadioTypeUtils = [
    { id: 1, text: '법인사업자' },
    { id: 2, text: '개인사업자' }
]

export const arrayRadioWithdrawDayUtils = [
    { id: '매월 5일', text: '매월 5일' },
    { id: '매월 12일', text: '매월 12일' },
    { id: '매월 19일', text: '매월 19일' },
]