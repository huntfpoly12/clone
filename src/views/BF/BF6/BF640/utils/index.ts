export const checkBoxSearchStep1 = [
    { id: 1, text: '상반기' },
    { id: 2, text: '하반기' },
]
import dayjs from "dayjs";
export const dataSearchUtils = {
    "beforeProduction": false,
    "productionStatuses": [0, 1, 2, -1],
    "companyCode": '',
    "manageUserId": null,
    "salesRepresentativeId": null,
    "active": true,
    "paymentYear": parseInt(dayjs().format('YYYY')),
    "paymentHalfYear": 1,
    "excludeCancel": false,

}
export const dataSearchStep2Utils = {
    "beforeProduction": false,
    "productionStatuses": [0, 1, 2, -1],
    "companyCode": '',
    "manageUserId": null,
    "salesRepresentativeId": null,
    "active": true,
    "paymentYear": parseInt(dayjs().format('YYYY')),
    "paymentMonth": parseInt(dayjs().format('MM')),
    "excludeCancel": false,
}
export const dataSearchStep3Utils = {
    "type": 7,
    "requesteStartDate": parseInt(dayjs().subtract(1,'week').format('YYYYMMDD')),
    "requesteFinishDate": parseInt(dayjs().format('YYYYMMDD')),
    "productionStatuses": [2, -1,],
    "productionRequestUserId": null
}
export const productionStatusesCheckbox = [
  { id: 0, text: "제작대기",  },
  { id: 1, text: "제작중",  },
  { id: 2, text: "제작성공",  },
  { id: -1, text: "제작실패",  },
]