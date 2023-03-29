
const screenActionPA520 = {
  checkEditFormPA520({getters,commit} : any) {
    if (getters.checkChangeValueEditTab1PA520 || getters.checkChangeValueEditTab2PA520) {
      commit('setModalChangeValueEditPA520', true)
      return true
    }
    return false
  },
  checkAddFormPA520({getters,commit} : any){
    if (getters.checkChangeValueAddPA520) {
      commit('setModalChangeValueAddPA520', true)
      return true
    }
    return false
  },
  resetStatusModal({getters,commit} : any){
    commit('setModalChangeValueEditPA520',false)
    commit('setModalChangeValueAddPA520',false)
  },
  resetActionStatus({getters,commit} : any){
    commit('setIsClickRowPA520',false)
    commit('setIsClickDeletePA520',false)
    commit('setIsClickBtnSavePA520',false)
    commit('setAddBtOnclickPA520',false)
  },
  hasValidator({ getters, commit }: any) {
    if (getters.isTab1ValidateEditPA520 || getters.isTab2ValidateEditPA520 || getters.isValidateAddPA520) return true
    return false
  }
}

export default screenActionPA520;
