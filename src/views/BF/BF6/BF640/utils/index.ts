export const checkBoxSearchStep1 = [
    { id: 1, text: '상반기' },
    { id: 2, text: '하반기' },
]
import dayjs from "dayjs";
export const dataSearchUtils = {
    "beforeProduction": true,
    "productionStatuses": [],
    "companyCode": '',
    "companyName": '',
    "manageUserId": null,
    "salesRepresentativeId": null,
    "excludeCancel": true,
    "paymentYear": parseInt(dayjs().format('YYYY')),
    "paymentHalfYear": 1
}
export const dataSearchStep2Utils = {
    "beforeProduction": true,
    "productionStatuses": [],
    "companyCode": '',
    "companyName": '',
    "manageUserId": null,
    "salesRepresentativeId": null,
    "excludeCancel": true,
    "paymentYear": parseInt(dayjs().format('YYYY')),
    "paymentMonth": parseInt(dayjs().format('MM'))
}
export const dataSearchStep3Utils = {
    "type": 0,
    "requesteStartDate": parseInt(dayjs().format('YYYYMMDD')) - 10000,
    "requesteFinishDate": parseInt(dayjs().format('YYYYMMDD')),
    "productionStatuses": [2, -1,],
    "manageUserId": null
}
