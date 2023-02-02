export const checkBoxSearchStep1 = [
    { id: 1, text: '상반기' },
    { id: 2, text: '하반기' },
]

import dayjs from "dayjs";
export const dataSearchUtils = {
    "beforeProduction": false,
    "productionStatuses": [],
    "companyCode": '',
    "companyName": '',
    "manageUserId": null,
    "salesRepresentativeId": null,
    "excludeCancel": false,
    "paymentYear": parseInt(dayjs().format('YYYY')),
    "paymentHalfYear": 1
}
export const dataSearchStep2Utils = {
    "beforeProduction": false,
    "productionStatuses": [],
    "companyCode": '',
    "companyName": '',
    "manageUserId": null,
    "salesRepresentativeId": null,
    "excludeCancel": false,
    "paymentYear": parseInt(dayjs().format('YYYY')),
    "paymentMonth": parseInt(dayjs().format('MM'))
}
export const dataSearchStep3Utils = {
    "type": 1,
    "requesteStartDate": 20220101,
    "requesteFinishDate": 20230505,
    "productionStatuses": [4, 5],
    "manageUserId": null
} 