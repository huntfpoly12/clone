let statesPA720 = {
  isErrorFormPA720: false,
  keyActivePA720: 1,
  actionSavePA720: 0,
  actionSaveTypePA720: 0,
  isNewRowPA720:false,
  formInputInit: {
    paymentDay: '',
    employeeId: '',
    incomeTypeCode: '',
    paymentAmount: '',
    requiredExpenses: '',
    taxRate: '',
    withholdingIncomeTax: '',
    withholdingLocalIncomeTax: '',
  },
  formPA720: {
    companyId: '',
    processKey: {
      imputedYear: '',
      imputedMonth: '',
      paymentYear: '',
      paymentMonth: '',
    },
    input: {
      paymentDay: '',
      employeeId: 0,
      incomeTypeCode: "",
      paymentAmount: '',
      requiredExpenses: '',
      taxRate: '',
      withholdingIncomeTax: '',
      withholdingLocalIncomeTax: '',
    },
  },
  formEditPA720: {
    companyId: '',
    processKey: {
      imputedYear: '',
      imputedMonth: '',
      paymentYear: '',
      paymentMonth: '',
    },
    input: {
      paymentDay: '',
      employeeId: 0,
      incomeTypeCode: "",
      paymentAmount: '',
      requiredExpenses: '',
      taxRate: '',
      withholdingIncomeTax: '',
      withholdingLocalIncomeTax: '',
    },
  },
};

export default statesPA720;
