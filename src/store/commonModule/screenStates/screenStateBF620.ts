import dayjs from "dayjs";
let statesBF620 = {
  filterBF620: {
    beforeProduction: false,
    productionStatuses: [1, 0, -1, 2],
    companyCode: "",
    companyName: "",
    manageUserId: null,
    salesRepresentativeId: null,
    // active: true,
    paymentYear: +dayjs().format("YYYY"),
    paymentMonth: +dayjs().format("MM"),
    reportType: null,
    // index: 0,
    // afterDeadline: false,
    excludeCancel: false,
    imputedYear: +dayjs().format("YYYY"),
    imputedMonth: +dayjs().format("MM"),
    withholdingTaxType: 1,
  },
  reportType: {
    checkbox1: true,
    checkbox2: true,
    checkbox3: true,
  },
};

export default statesBF620;
