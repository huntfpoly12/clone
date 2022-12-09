import dayjs, { Dayjs } from 'dayjs';
const statesPA510 = {
    processKeyPA510 : {
        imputedYear: dayjs().year(),
        imputedMonth: dayjs().month() + 1,
        paymentYear: dayjs().year(),
        paymentMonth: dayjs().month() + 1,
    }
};
  
export default statesPA510;
  