import dayjs from "dayjs";
export const dataSearchUtils = {
  beforeProduction: true,
  productionStatuses: [0, 1, 2, -1] as number[],
  companyCode: "",
  companyName: "",
  companyServiceContractManageUserId: null,
  companyServiceContractSalesRepresentativeId: null,
  companyServiceContractActive: true,
  paymentYear: parseInt(dayjs().format("YYYY")),
  paymentMonth: parseInt(dayjs().format("MM")),
};
export const dataSearchStep2Utils = {
  type: 9,
  requesteStartDate: parseInt(dayjs().format("YYYYMMDD")) - 10000,
  requesteFinishDate: parseInt(dayjs().format("YYYYMMDD")),
  productionStatuses: [2, -1],
  manageUserId: null,
};
