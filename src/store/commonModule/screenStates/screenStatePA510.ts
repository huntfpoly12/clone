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
    // employeeId: null,
    statusFormAdd: false,
    statusChangeFormAdd: false,
    statusChangeFormEdit: false,
    loadingTableInfo: 0,
    focusedRowKey: 1,
    statusRowAdd: true,
    dataTaxPayInfo: [],
    actionSubmit: 0,
    // paymentDayCopy: 1,
    statusDisabledStatus: true,
    resetArrayEmploySelect: 1,
    statusChangeFormPrice: false,
    actionResetForm: 0,
    // actionCopy: 1,
    loadingFormData: 1,
    selectionFilter: null,
    dataRowOnActive: null,
    statusClickButtonSave: true,
    statusClickButtonAdd: false,
    addRow: 1,
    onEditItem: 1,
    statusClickEditItem: false
};
  
export default statesPA510;
  