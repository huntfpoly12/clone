const screenMutatePA420 = {
  setFormStateEditPA420(state: any, data: any) {
    state.formStateEditPA420 = data
  },
  sethasIncProcRetirements(state: any, status: boolean) {
    state.hasIncomeProcessRetirements = status
  },
  setPaymentDay(state: any, date: number) {
    state.inputTab1.paymentDay = date
  },
  setSelectMonthColumn(state: any, data: any) {
    state.selectMonthColumn = { ...state.selectMonthColumn, ...data }
  },
  setIsDisableBtnTab2(state: any, status: boolean) {
    state.isDisableBtnTab2 = status
  },
  setIncomeCalculationInput(state: any, data: any) {
    state.incomeCalculationInput = { ...state.incomeCalculationInput, ...data }
  },
  setInterimPaymentTab1(state: any, status: boolean) {
    state.interimPaymentTab1 = status
  },
  setTaxCalculationInput(state: any, data: any) {
    state.taxCalculationInput = { ...state.taxCalculationInput, ...data }
  },
  setDefinedRetirementBenefits(state: any, data: any) {
    state.definedRetirementBenefits = data
  },
  setIsDisableBtnTab1(state: any, status: boolean) {
    state.isDisableBtnTab1 = status
  },
  setIsDisableBtnTab3(state: any, status: boolean) {
    state.isDisableBtnTab3 = status
  },
  setInputTab1(state: any, data: any) {
    state.inputTab1 = { ...state.inputTab1, ...data }
  },
  setIsChangeForm(state: any, status: any) {
    state.isChangeForm = { ...state.isChangeForm, ...status }
  },
  setEmployee(state: any, data: any) {
    state.employee = data
  }
};
export default screenMutatePA420;
