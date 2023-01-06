import dayjs, { Dayjs } from 'dayjs';
const statesPA510 = {
    processKeyPA510 : {
        imputedYear: dayjs().year(),
        imputedMonth: dayjs().month() + 1,
        paymentYear: dayjs().year(),
        paymentMonth: dayjs().month() + 1,
    },
    incomeId: null,
    employeeId: null,
    actionAddItem: false,
    statusChangeFormAdd: false,
    statusChangeFormEdit: false,
    loadingTableInfo: 0,
    focusedRowKey: 1,
};
  
export default statesPA510;
  