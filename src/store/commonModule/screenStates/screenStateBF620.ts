import dayjs from "dayjs";
let statesBF620 = {
  filterBF620: {
    beforeProduction: false,
    productionStatuses: [],
    companyCode: "",
    companyName: "",
    manageUserId: 0,
    salesRepresentativeId: 0,
    excludeCancel: true,
    paymentYear: +dayjs().format("YYYY"),
    paymentMonth: +dayjs().format("MM"),
    reportType: 0,
    withholdingTaxType: 1,
  },
};

export default statesBF620;
