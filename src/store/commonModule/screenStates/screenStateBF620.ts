import dayjs from "dayjs";
let statesBF620 = {
  filterBF620: {
    beforeProduction: false,
    productionStatuses: [0],
    companyCode: "",
    companyName: "",
    manageUserId: 0,
    salesRepresentativeId: 0,
    excludeCancel: true,
    imputedYear: +dayjs().format("YYYY"),
    imputedMonth: +dayjs().format("MM"),
    paymentYear: +dayjs().format("YYYY"),
    paymentMonth: +dayjs().format("MM"),
    reportType: 0,
    withholdingTaxType: 1,
  },
};

export default statesBF620;
