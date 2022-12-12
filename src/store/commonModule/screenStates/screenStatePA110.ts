import dayjs, { Dayjs } from "dayjs";
const statesPA110 = {
  processKeyPA110: {
    imputedYear: dayjs().year(),
    imputedMonth: dayjs().month() + 1,
    paymentYear: dayjs().year(),
    paymentMonth: dayjs().month() + 1,
  },
};

export default statesPA110;
