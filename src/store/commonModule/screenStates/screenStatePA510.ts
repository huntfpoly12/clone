import dayjs, { Dayjs } from 'dayjs';
const statesPA510 = {
    processKeyPA510 : {
        imputedYear: dayjs().year(),
        imputedMonth: dayjs().month() + 1,
        paymentYear: dayjs().year(),
        paymentMonth: dayjs().month() + 1,
    },
    dataRowOld: null,
    incomeId: null,
    employeeId: null,
    actionAddItem: false,
    statusChangeFormAdd: false,
    statusChangeFormEdit: false,
    loadingTableInfo: 0,
    focusedRowKey: 1,
    statusRowAdd: true,
    dataTaxPayInfo: [],
};
  
export default statesPA510;
  