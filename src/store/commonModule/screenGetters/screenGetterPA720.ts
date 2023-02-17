import { companyId } from "@/helpers/commonFunction";
const screenGetterPA720 = {
  isErrorFormPA720: (state: any) => state.isErrorFormPA720,
  actionSavePA720: (state: any) => state.actionSavePA720,
  keyActivePA720: (state: any) => state.keyActivePA720,
  paymentDayPA720: (state: any) => state.paymentDayPA720,
  formPA720: (state: any) => state.formPA720,
  formEditPA720: (state: any) => state.formEditPA720,
  dataActionUtilsPA720: (state: any) => {
    return {
      input: {
        ...state.dataActionUtilsPA720.input,
        paymentDay: state.paymentDayPA720,
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
