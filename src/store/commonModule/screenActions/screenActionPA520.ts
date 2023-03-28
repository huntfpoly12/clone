const screenActionPA520 = {
  formPA720(context: any, payload:any) {
    context.commit('formPA720', {
      input: {
        ...payload.input,
        paymentDay: payload.input.paymentDay || context.state.common.paymentDayPA720,
      }
    });
  },
  checkEditForm({getters,commit} : any) {
    if (getters.checkChangeValueEditTab1PA520 || getters.checkChangeValueEditTab2PA520) {
      commit('setModalChangeValueEditPA520',true)
    }
  },
  checkAddForm({getters,commit} : any){
    console.log(getters);
    
    if (getters.checkChangeValueAddPA520) {
      commit('setModalChangeValueAddPA520',true)
    }
  },
  resetStatusModal({getters,commit} : any){
    commit('setModalChangeValueEditPA520',false)
    commit('setModalChangeValueAddPA520',false)
  }
}

export default screenActionPA520;