const screenActionPA410 = {
  setNextStep({ state}: any) {
    state.currentStepPA410++
  },
  setPrvStep({ state }: any) {
    state.currentStepPA410--
  },
  setResetStep({ state }: any) {
    state.currentStepPA410 = 0
    state.employeeIdPA410 = 0
    state.stateStep2PA410 = {}
  },
}

export default screenActionPA410;
