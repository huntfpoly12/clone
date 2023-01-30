import dayjs, { Dayjs } from 'dayjs';
const statesPA620 = {
    processKeyPA620: {
        imputedYear: +dayjs().year(),
        imputedMonth: +dayjs().month() + 1,
        paymentYear: +dayjs().year(),
        paymentMonth: +dayjs().month() + 1,
    },
    actionAddRow: {
        dataSource: [],
        activeRowAdd: false, 
        incomeIdStore : 0
    },
};

export default statesPA620;
