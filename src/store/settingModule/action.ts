import {ActionTree} from "vuex";
import {ClickYearStatus, FormStatus, PayLoadAccSubject, SettingState} from "@/store/settingModule/types";
import { watch, ref } from 'vue'
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/common/index";
import { getJwtObject } from "@bankda/jangbuda-common";


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
    commit('setPopupVisible', false)
  },
  hidePopup({commit,state}){
    commit('setPopupVisible', false)
    commit('setCurrentYear', state.newYear)
    commit('setClickYearStatus', ClickYearStatus.none)
    commit('setFormStatus', FormStatus.none)
  },
  getAccountSubject: ({commit,state}, data: PayLoadAccSubject) => {
    const {
      onResult
    } = useQuery(queries.getAccoountSubjects,data, () => ({
        fetchPolicy: "no-cache",
    }));
    onResult((result) => {
      if (result.errors) {
        console.log(result.errors);
      } else {
        commit('setAccoountSubjects',result.data.getAccoountSubjects)
      }
    })

}
};

export default actions
