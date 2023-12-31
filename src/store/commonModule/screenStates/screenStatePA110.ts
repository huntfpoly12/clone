import dayjs, { Dayjs } from "dayjs";
const statesPA110 = {
  pa110: {
    processKeyPA110: {
      imputedYear: dayjs().year(),
      imputedMonth: dayjs().month() + 1,
      paymentYear: dayjs().year(),
      paymentMonth: dayjs().month() + 1,
    },
    focusedRowKey: 1,
    incomeId: null,
    statusFormAdd: false,
    actionSubmit: 0,
    loadingTableInfo: 0,
    statusRowAdd: true,
    dataTaxPayInfo: [],
    statusChangeFormAdd: false,
    statusChangeFormEdit: false,
    // paymentDayCopy: 1,
    statusDisabledStatus: true,
    resetArrayEmploySelect: 1,
    statusChangeFormPrice: false,
    actionResetForm: 0,
    // actionCopy: 1,
    loadingFormData: 1,
    // selectionFilter: null,
    dataRowOnActive: null,
    statusClickButtonSave: true,
    addRow: 1,
    dataIncomeIdBackend: null,
    onEditItem: 1,
    statusClickEditItem: false,
    // checkClickYear: false,
    // dataYearNew: null,
    actionCallGetMonthDetail: 1,
    checkClickCopyMonth: false,
    openModalCopyMonth: 1,
    checkClickMonth: false,
    refreshDataGridRef: 1,
    onDoneEdit: false,
    selectedRowKeys: [],
  }
};

export default statesPA110;
