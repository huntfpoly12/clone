const screenGetterPA420 = {
  getSelectMonthColumnOld: (state: any) => state.selectMonthColumnOld,
  hasIncomeProcessRetirements: (state: any) => state.hasIncomeProcessRetirements,
  getSelectMonthColumn: (state: any) => state.selectMonthColumn,
  getPaymentDay: (state: any) => state.inputTab1.paymentDay,
  getIsDisableBtnTab2: (state: any) => state.isDisableBtnTab2,
  getIncomeCalculationInputOld: (state: any) => state.incomeCalculationInputOld,
  getIncomeCalculationInput: (state: any) => state.incomeCalculationInput,
  getInterimPaymentTab1: (state: any) => state.interimPaymentTab1,
  getTaxCalculationInput: (state: any) => state.taxCalculationInput,
  getDefinedRetirementBenefits: (state: any) => state.definedRetirementBenefits,
  getIsDisableCreate: (state: any) => state.isDisableBtnTab1 || state.isDisableBtnTab2 || state.isDisableBtnTab3,
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
  getEmployeeIdCreated: (state: any) => state.employeeIdCreated,
};

export default screenGetterPA420;
