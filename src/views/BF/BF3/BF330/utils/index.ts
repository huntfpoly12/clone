import dayjs from "dayjs";

export const initialState = {
  id: null,
  info: {
    totalPrice: 0,
    accountingPrice: 0,
    withholdingPrice: 0,
    accounting: [{
        longTermCareInstitutionNumber: null,
        facilityBizType: null,
        name: null,
        startYearMonth: null,
        capacity: null,
        registrationCardFileStorageId: null,
        facilityBusinessId: null,
        price: 0,
        options: [],
        registrationCard: {}
    }],
    withholding: {
        startYearMonth: null,
        capacity: null,
        price: 0,
        options: [{
            withholdingServiceType: null,
            price: 0,
        }]
    },
    usedAccounting: false,
    usedWithholding: false,
  },
  extra: {
    salesRepresentativeId: null,
    manageUserId: null,
  },
};
export const initialFormStateMomes = 
  {
    memoId: null,
    ownerUserId: 0,
    ownerName: "",
    ownerUsername: "",
    memo: "",
    createdAt: dayjs(new Date()).format("YYYY/MM/DD"),
    createdBy: "",
    updatedAt: dayjs(new Date()).format("YYYY/MM/DD"),
    updatedBy: "",
    ip: "",
    active: "",
  };
