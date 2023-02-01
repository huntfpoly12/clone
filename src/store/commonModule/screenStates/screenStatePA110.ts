import dayjs, { Dayjs } from "dayjs";
const statesPA110 = {
  processKeyPA110: {
    imputedYear: dayjs().year(),
    imputedMonth: dayjs().month() + 1,
    paymentYear: dayjs().year(),
    paymentMonth: dayjs().month() + 1,
  },
  focusedRowKey: 1,
  incomeId: null,
  actionAddItem: false,
  actionSubmit: 0,
  loadingTableInfo: 0,
  statusRowAdd: true,
  dataTaxPayInfo: [],
  statusChangeFormAdd: false,
  statusChangeFormEdit: false,
};

export default statesPA110;
