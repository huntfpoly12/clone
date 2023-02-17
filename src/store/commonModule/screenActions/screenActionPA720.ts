const screenActionPA720 = {
  formPA720(context: any, payload:any) {
    context.commit('formPA720', {
      input: {
        ...payload.input,
        paymentDay: payload.input.paymentDay || context.state.common.paymentDayPA720,
      }
    });
  },
}

export default screenActionPA720;