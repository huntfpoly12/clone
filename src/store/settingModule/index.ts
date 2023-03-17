import dayjs from "dayjs";
import {ActionContext, Module} from "vuex";
export enum ClickYearStatus {
  none = 'none',
  increasing = 'increasing',
  decreasing = 'decreasing'
}
export enum FormStatus {
  none = 'none',
  adding = 'adding',
  editing = 'editing'
}
export interface GridConfig {
  per_page: Number;
  sort: boolean;
  move_column: boolean;
  colomn_resize: boolean;
  row_resize: boolean;
  isPopupVisible: boolean
  formStatus: FormStatus
  clickYearStatus: ClickYearStatus
  newYear: number,
  globalYear: number
}

const settingModule: Module<GridConfig, any>  = {
  namespaced: true,
  state: {
    per_page: 15,
    sort: true,
    move_column: false,
    colomn_resize: true,
    row_resize: true,
    globalYear: dayjs().year(),
    // year config
    isPopupVisible: false,
    formStatus: FormStatus.none,
    clickYearStatus: ClickYearStatus.none,
    newYear: 0
  },
  mutations: {
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
    }
  },
  actions: {
    showPopupIfNeeded(context: ActionContext<GridConfig, any>): boolean {
      if (context.state.formStatus !== 'none') {
        // Khi trạng thái form khác none thì sẽ hiển thị popup
        // và set trạng thái form
        context.commit('setPopupVisible', true)
        return true
      } else {
        return false
      }
    }
  },
  getters: {
    isPopupVisible(state: GridConfig): boolean {
      return state.isPopupVisible
    },
    formStatus(state: GridConfig): FormStatus {
      return state.formStatus
    },
    currentYear(state: GridConfig): number {
      return state.globalYear
    },
    newYear(state: GridConfig): number {
      return state.newYear
    },
    clickYearStatus(state: GridConfig): ClickYearStatus {
      return state.clickYearStatus
    }
  }
};

export default settingModule;
