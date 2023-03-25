import {ActionTree} from "vuex";
import {SettingState} from "@/store/settingModule/types";

const actions: ActionTree<SettingState, any> = {
  showPopupIfNeeded({ commit, state }): boolean {
    if (state.formStatus !== 'none') {
      // Khi trạng thái form khác none thì sẽ hiển thị popup
      // và set trạng thái form
      commit('setPopupVisible', true)
      return true
    } else {
      return false
    }
  }
}
export default actions
