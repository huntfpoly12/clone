import dayjs from 'dayjs';
let statesPA720 = {
  isErrorFormPA720: false,
  keyActivePA720: 1,
  actionSavePA720: 0,
  actionSaveTypePA720: 0,
  isNewRowPA720:false,
  selectedRowKeysPA720:[],
  formPA720: {
    input: {
      paymentDay: '',
      employeeId: 0,
      incomeTypeCode: "",
      paymentAmount: '',
      requiredExpenses: '',
      taxRate: '',
      withholdingIncomeTax: '',
      withholdingLocalIncomeTax: '',
      incomeId: "99axbzkk",
    },
  },
  formEditPA720: {
    input: {
      paymentDay: '',
      employeeId: 0,
      incomeTypeCode: "",
      paymentAmount: '',
      requiredExpenses: '',
      taxRate: '',
      withholdingIncomeTax: '',
      withholdingLocalIncomeTax: '',
      incomeId: "99axbzkk",
    },
  },
  paymentDayPA720:4,
  dataActionUtilsPA720 : {
    input: {
        paymentDay: 1,
        employeeId: null,
        incomeTypeCode: "",
        paymentAmount: null,
        requiredExpenses: null,
        taxRate: 20,
        withholdingIncomeTax: null,
        withholdingLocalIncomeTax: null,
        incomeId: "99axbzkk",
    }
  },
  processKeyPA720: {
    companyId: '',
    processKey: {
        imputedYear: null,
        imputedMonth: +dayjs().format('MM') ,
        paymentYear: null,
        paymentMonth: +dayjs().format('MM') ,
    }
  }
};

export default statesPA720;
