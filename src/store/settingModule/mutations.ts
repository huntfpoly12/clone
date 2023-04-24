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
  },
  setListFacilityBizTypeForUser(state, value: any[]) {
    state.listFacilityBizTypeForUser = value
  },
  setAccoountSubjects(state, value: any) {
    state.accountSubject = value
  },
  setClients(state, value: any[]) {
    state.clients = value
  },
  setAcYear(state, value: any) {
    state.acYear = value
  },
  setPaYear(state, value: any) {
    state.paYear = value
  },
  setChangeFacilityBusiness(state) {
    state.changeFacilityBusiness++
  },
};

export default mutations;
