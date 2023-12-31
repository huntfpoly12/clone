import dayjs from "dayjs";
import {Module} from "vuex";
import {ClickYearStatus, FormStatus, SettingState} from "./types";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./action";

const settingModule: Module<SettingState, any>  = {
  namespaced: true,
  state: {
    per_page: 15,
    sort: true,
    move_column: false,
    colomn_resize: true,
    row_resize: true,
    globalYear: dayjs().year(),
    // year config
    isPopupVisible: false, // popup hiển thị khi click năm
    formStatus: FormStatus.none, // trạng thái form
    clickYearStatus: ClickYearStatus.none, // trạng thái click button nắm
    newYear: dayjs().year(), // lưu trữ năm mới khi click năm
    // globalFacilityBizId
    globalFacilityBizId: null,
    listFacilityBizTypeForUser: [],
    accountSubject: {},
    clients: [],
    acYear: null,
    paYear: null,
    changeFacilityBusiness: 0
  },
  mutations: mutations,
  actions: actions,
  getters: getters
};

export default settingModule;
