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
    "paymentYear": dayjs().format('YYYY'),
    "paymentHalfYear": null
} 