import { companyId } from "@/helpers/commonFunction";
import dayjs from "dayjs";
const screenGetterPA720 = {
  isErrorFormPA720: (state: any) => state.isErrorFormPA720,
  paymentDayPA720: (state: any) => state.paymentDayPA720,
  formPA720: (state: any) => state.formPA720,
  formEditPA720: (state: any) => state.formEditPA720,
  dataActionUtilsPA720: (state: any) => {
    let day = state.paymentDayPA720;
    const daysInMonth = +dayjs(`${state.processKeyPA720.processKey.paymentMonth}`).daysInMonth();
    let newDay = day > daysInMonth || day == 0 ? daysInMonth : day;
    return {
      input: {
        ...state.dataActionUtilsPA720.input,
        paymentDay: newDay,
      },
    };
  },
  processKeyPA720: (state: any) => {
    return {
      ...state.processKeyPA720,
      companyId: companyId,
    };
  },
};

export default screenGetterPA720;
