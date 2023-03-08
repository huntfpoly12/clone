import dayjs from "dayjs";
let statesBF620 = {
  filterBF620: {
    beforeProduction: false,
    productionStatuses: [],
    code: "",
    name: "",
    manageUserId: 0,
    salesRepresentativeId: 0,
    active: true,
    paymentYear: +dayjs().format("YYYY"),
    paymentMonth: +dayjs().format("MM"),
    reportType: 0,
    index: 0,
    afterDeadline: false,
  },
};

export default statesBF620;
