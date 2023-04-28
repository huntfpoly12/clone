import cloneDeep from "lodash/cloneDeep";
import { INITIAL_STATE } from "./../screenStates/screenStatePA420";

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
  },
  resetForm(state: any) {
    //   reset state to initial
    Object.assign(state, {
      ...state,
      ...cloneDeep({
        incomeCalculationInput: INITIAL_STATE.incomeCalculationInput,
        taxCalculationInput: INITIAL_STATE.taxCalculationInput,
        interimPaymentTab1: INITIAL_STATE.interimPaymentTab1,
        inputTab1: {
          ...INITIAL_STATE.inputTab1,
          paymentDay: state.inputTab1.paymentDay
        },
        isDisableBtnTab2: INITIAL_STATE.isDisableBtnTab2,
        definedRetirementBenefits: INITIAL_STATE.definedRetirementBenefits,
        isDisableBtnTab3: INITIAL_STATE.isDisableBtnTab3,
        isDisableBtnTab1: INITIAL_STATE.isDisableBtnTab1,
        isChangeForm: INITIAL_STATE.isChangeForm,
        employee: INITIAL_STATE.employee
      })
    })
  }
};
export default screenMutatePA420;
