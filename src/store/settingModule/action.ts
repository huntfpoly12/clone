import {ActionTree} from "vuex";
import {ClickYearStatus, FormStatus, SettingState} from "@/store/settingModule/types";

const actions: ActionTree<SettingState, any> = {
  //showPopupIfNeeded({ commit, state }): boolean {
  checkFormStatus({ commit, state }): boolean {
    if (state.formStatus !== 'none') {
      // Khi trạng thái form khác none thì sẽ hiển thị popup
      // và set trạng thái form
      //commit('setPopupVisible', true)
      return true
    } else {
      return false
    }
  },
  resetYearStatus({commit,state}){
    commit('setPopupVisible', false)
    commit('setCurrentYear', state.globalYear)
    commit('setClickYearStatus', ClickYearStatus.none)
    commit('setFormStatus', FormStatus.none)
  },
  confirmPopup({commit,state}){
        commit('settings/setPopupVisible', false)
        commit('settings/setClickYearStatus', ClickYearStatus.increasing)
  }
}
export default actions
