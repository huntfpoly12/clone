import dayjs from 'dayjs';
let statesPA720 = {
  isErrorFormPA720: false,
  isNewRowPA720:false,
  selectedRowKeysPA720:[],
  savePA710: 0,
  paymentDayPA720:1,
  formPA720: {
    input: {
      paymentDay: '',
      employeeId: 0,
      incomeTypeCode: "",
      paymentAmount: '',
      requiredExpenses: '',
      taxRate: 20,
      withholdingIncomeTax: '',
      withholdingLocalIncomeTax: '',
      incomeId: "99axbzkk",
      employee:{
        key:0
      }
    },
  },
  formEditPA720: {
    input: {
      paymentDay: '',
      employeeId: 0,
      incomeTypeCode: "",
      paymentAmount: '',
      requiredExpenses: '',
      taxRate: 20,
      withholdingIncomeTax: '',
      withholdingLocalIncomeTax: '',
      incomeId: "99axbzkk",
      employee:{
        key:0
      }
    },
  },
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
        employee:{
          key:0
        }
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
  },
  changeDayDataPA720: {
    prevPaymentDay: '',
    employeeId: '',
    incomeTypeCode: '',
  }
};

export default statesPA720;
