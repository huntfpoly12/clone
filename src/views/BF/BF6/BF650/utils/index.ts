
import dayjs from "dayjs";
export const dataSearchUtils = {
    "beforeProduction": true,
    "productionStatuses": [],
    "companyCode": '',
    "companyName": '',
    "manageUserId": null,
    "salesRepresentativeId": null,
    "excludeCancel": false,
    "paymentYear": parseInt(dayjs().format('YYYY')),
    "paymentMonth": parseInt(dayjs().format('MM')),
}
export const dataSearchStep3Utils = {
    "type": 1,
    "requesteStartDate": parseInt(dayjs().format('YYYYMMDD')) - 10000,
    "requesteFinishDate": parseInt(dayjs().format('YYYYMMDD')),
    "productionStatuses": [2, -1],
    "manageUserId": null
} 