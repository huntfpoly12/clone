import {MutationTree} from "vuex";
import {ClickYearStatus, FormStatus, SettingState} from "@/store/settingModule/types";

const mutations: MutationTree<SettingState> = {
  setPopupVisible(state, isVisible: boolean) {
    state.isPopupVisible = isVisible
  },
  setFormStatus(state, status: FormStatus) {
    state.formStatus = status
  },
  setCurrentYear(state, year?: number) {
    state.globalYear = year ? year : state.newYear
    state.clickYearStatus = ClickYearStatus.none
    state.formStatus = FormStatus.none
  },
  setNewYear(state, year: number) {
    state.newYear = year
  },
  setClickYearStatus(state, clickYearStatus: ClickYearStatus) {
    state.clickYearStatus = clickYearStatus
  },
  setGlobalFacilityBizId(state, value: number) {
    state.globalFacilityBizId = value
  }
};

export default mutations;
