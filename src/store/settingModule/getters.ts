import {GetterTree} from "vuex";
import {ClickYearStatus, FormStatus, SettingState} from "@/store/settingModule/types";

const getters:  GetterTree<SettingState, any> = {
  isPopupVisible(state: SettingState): boolean {
    return state.isPopupVisible
  },
  formStatus(state: SettingState): FormStatus {
    return state.formStatus
  },
  currentYear(state: SettingState): number {
    return state.globalYear
  },
  newYear(state: SettingState): number {
    return state.newYear
  },
  clickYearStatus(state: SettingState): ClickYearStatus {
    return state.clickYearStatus
  },
  globalFacilityBizId: (state: any) => state.globalFacilityBizId,
  listFacilityBizTypeForUser: (state: any) => state.listFacilityBizTypeForUser,
  accountSubjects: (state: any) => state.accountSubject,
  clients: (state: any) => state.clients,
  acYear: (state: any) => state.acYear,
  paYear: (state: any) => state.paYear,
  changeFacilityBusiness: (state: any) => state.changeFacilityBusiness,
};

export default getters;
