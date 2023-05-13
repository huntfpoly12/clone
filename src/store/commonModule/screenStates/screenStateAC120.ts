import dayjs from "dayjs";
import filters from "@/helpers/filters";
let statesAC120 = {
    ac120: {
        focusedRowKey: null,
        statusShowFull: true,
        formData: null,
        onAddRow: 0,
        onDeleteRowAdd: 0,
        onSubmitFormUpdate: 0,
        // statementOfGoodsItems: [],
        // onDoneAdd: 0,
        resetDataTable: 0,
        resetDataAccountingProcesses: 0,
        resetDataAccountingDocumentProofs: 0,

        statusFormAdd: false,
        // dataRowFocus: {},
        arrResolutionType: [],
        arrLetterOfApprovalType: [],
        arrResolutionClassification: [],
        arrFundingSource: [],
        arrayBankbooks: [],
        transactionDetailDate: filters.formatDateToInterger(dayjs().startOf('month').toDate()),
        keyRefreshForm: 0,
        monthSelected: dayjs().month() + 1,
        selectedRowKeys: [],
        statusKeppRow: false
    }
};

export default statesAC120;
