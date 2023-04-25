const screenGetterPA420 = {
  hasIncomeProcessRetirements: (state: any) => state.hasIncomeProcessRetirements,
  getSelectMonthColumn: (state: any) => state.selectMonthColumn,
  getPaymentDay: (state: any) => state.inputTab1.paymentDay,
  getIsDisableBtnTab2: (state: any) => state.isDisableBtnTab2,
  getIncomeCalculationInput: (state: any) => state.incomeCalculationInput,
  getInterimPaymentTab1: (state: any) => state.interimPaymentTab1,
  getTaxCalculationInput: (state: any) => state.taxCalculationInput,
  getDefinedRetirementBenefits: (state: any) => state.definedRetirementBenefits,
  getIsDisableBtnTab1: (state: any) => state.isDisableBtnTab1,
  getIsDisableBtnTab3: (state: any) => state.isDisableBtnTab3,
  getIsDisableCreate: (state: any) => state.isDisableBtnTab1 || state.isDisableBtnTab2 || state.isDisableBtnTab3,
  getInputTab1: (state: any) => state.inputTab1,
  getAllData: (state: any) => {
    return {
      processKey: state.selectMonthColumn,
      input: state.inputTab1,
      incomeCalculationInput: state.incomeCalculationInput,
      taxCalculationInput: state.taxCalculationInput,
    }
  },
  getAllDataUpdate: (state: any) => {
    return {
      processKey: state.selectMonthColumn,
      input: {
        retirementType: state.inputTab1.retirementType,
        executive: state.inputTab1.executive,
        retirementReason: state.inputTab1.retirementReason
      },
      incomeCalculationInput: state.incomeCalculationInput,
      taxCalculationInput: state.taxCalculationInput,
    }
  },
  getIsChangeForm: (state: any) => state.isChangeForm.tab1 || state.isChangeForm.tab2 || state.isChangeForm.tab3,
  getEmployeeEdit: (state: any) => state.employee,
};

export default screenGetterPA420;
