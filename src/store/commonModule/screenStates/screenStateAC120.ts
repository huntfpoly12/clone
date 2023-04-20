import dayjs from "dayjs";
import filters from "@/helpers/filters";
let statesAC120 = {
    ac120: {
        statusShowFull: false,
        formData: null,
        onAddRow: 0,
        onDeleteRowAdd: 0,
        // statementOfGoodsItems: [],
        // onDoneAdd: 0,
        resetDataTable: 0,
        resetDataAccountingProcesses: 0,
        statusFormAdd: true,
        // dataRowFocus: {},
        arrResolutionType: [],
        arrLetterOfApprovalType: [],
        transactionDetailDate: filters.formatDateToInterger(dayjs().startOf('month').toDate()),
        keyRefreshForm: 0,
        monthSelected: dayjs().month() + 1
    }
};

export default statesAC120;
