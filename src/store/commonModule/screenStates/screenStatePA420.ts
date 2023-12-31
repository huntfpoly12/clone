import dayjs from 'dayjs';
import cloneDeep from "lodash/cloneDeep";
export const INITIAL_STATE = {
  incomeCalculationInputOld: {
    settlementStartDate: null,
    settlementFinishDate: null,
    exclusionDays: 0,
    additionalDays: 0,
    totalPay3Month: 0,
    totalAnualBonus: 0,
    annualLeaveAllowance: 0,
  },
  incomeCalculationInput: {
    settlementStartDate: null,
    settlementFinishDate: null,
    exclusionDays: 0,
    additionalDays: 0,
    totalPay3Month: 0,
    totalAnualBonus: 0,
    annualLeaveAllowance: 0,
  },
  taxCalculationInput: {
    prevRetirementBenefitStatus: {
      retirementBenefits: null,
      nonTaxableRetirementBenefits: null,
      taxableRetirementBenefits: null,
    },
    lastRetirementBenefitStatus: {
      retirementBenefits: 0,
      nonTaxableRetirementBenefits: 0,
      taxableRetirementBenefits: 0,
    },
    prevRetiredYearsOfService: {
      settlementStartDate: null,
      settlementFinishDate: null,
      paymentDate: null,
      exclusionDays: 0,
      additionalDays: 0,
    },
    lastRetiredYearsOfService: {
      settlementStartDate: null,
      settlementFinishDate: null,
      paymentDate: null,
      exclusionDays: 0,
      additionalDays: 0,
    },
    taxCredit: 0,
    prePaidDelayedTaxPaymentTaxAmount: 0,
    calculationOfDeferredRetirementIncomeTax: {
      totalAmount: 0,
      statements: [
        {
          pensionAccountHolder: '',
          bizNumber: '',
          bankAccountNumber: '',
          depositDate: null,
          accountDepositAmount: 0,
        },
        {
          pensionAccountHolder: '',
          bizNumber: '',
          bankAccountNumber: '',
          depositDate: null,
          accountDepositAmount: 0,
        }
      ]
    }
  },
  interimPaymentTab1: false,
  inputTab1: {
    paymentDay: null,
    employeeId: null,
    employeeType: null,
    retirementType: 1,
    executive: false,
    retirementReason: null,
  },
  // tab 2
  hasIncomeProcessRetirements: false,
  selectMonthColumn: {
    imputedYear: dayjs().year(),
    imputedMonth: dayjs().month() + 1,
    paymentYear: dayjs().year(),
    paymentMonth: dayjs().month() + 1,
  },
  paymentDate: 1,
  isDisableBtnTab2: true,
  definedRetirementBenefits: 0,

  // tab 3: create variable enable button form when tab 3 validation done
  isDisableBtnTab3: true,
  isDisableBtnTab1: false,

  // check form change
  isChangeForm: {
    tab1: false,
    tab2: false,
    tab3: false,
  },
  // Edit
  employee: {
    employeeId: null,
  }
}
const statesPA420 = {
  selectMonthColumnOld: {
    imputedYear: dayjs().year(),
    imputedMonth: dayjs().month() + 1,
    paymentYear: dayjs().year(),
    paymentMonth: dayjs().month() + 1,
  },
  // tab 1
  ...cloneDeep(INITIAL_STATE),
  employeeIdCreated: [],
  retirementStatus: 0,
  needToRecalculatePa420: false,
};

export default statesPA420;
