import dayjs, { Dayjs } from 'dayjs';
const statesPA420 = {
    storePagePA420: {
        checkMonthActive: false
    },
    paymentDayPA420: 0,
    processKeyPA420: {
        imputedYear: dayjs().year(),
        imputedMonth: dayjs().month() + 1,
        paymentYear: dayjs().year(),
        paymentMonth: dayjs().month() + 1,
    },
};

export default statesPA420;
