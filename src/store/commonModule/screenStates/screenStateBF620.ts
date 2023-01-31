import dayjs from "dayjs";
let statesBF620 = {
  filterBF620: {
    beforeProduction: true,
    productionStatuses: [],
    companyCode: "",
    companyName: "",
    manageUserId: 0,
    salesRepresentativeId: 0,
    excludeCancel: true,
    imputedYear: dayjs().format("YYYY"),
    imputedMonth: dayjs().format("MM"),
    paymentYear: dayjs().format("YYYY"),
    paymentMonth: dayjs().format("DD"),
    reportType: 0,
    withholdingTaxType: 0,
  },
};

export default statesBF620;
