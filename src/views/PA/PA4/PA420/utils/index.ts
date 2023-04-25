interface Origindata {
  page: number,
  rows: number,
  statuses: number[],
  grade: null | number,
  name: string,
  code: string,
}

export const origindata: Origindata = {
  page: 1,
  rows: 10,
  statuses: [1],
  grade: null,
  name: "",
  code: "",
}

import {companyId} from "@/helpers/commonFunction";
import dayjs from "dayjs";

export const dataActionUtils = {
  companyId: companyId,
  processKey: {
    imputedYear: dayjs().format("YYYY"),
    imputedMonth: dayjs().format("MM"),
    paymentYear: dayjs().format("YYYY"),
    paymentMonth: dayjs().format("MM"),
  },
  input: {
    paymentDay: null,
    employeeId: 0,
    incomeTypeCode: "",
    paymentAmount: 0,
    taxRate: 3,
    withholdingIncomeTax: 0,
    withholdingLocalIncomeTax: 0,
  }
}
export const initialFormState = {
  checkBoxCallApi: false,
  companyId: companyId,
  processKey: {
    imputedYear: parseInt(dayjs().format("YYYY")),
    imputedMonth: parseInt(dayjs().format("MM")),
    paymentYear: parseInt(dayjs().format("YYYY")),
    paymentMonth: parseInt(dayjs().format("MM")),
  },
  input: {
    paymentDay: null,
    employeeId: null,
    employeeType: null,
    retirementType: 1,
    executive: false,
    retirementReason: null,
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
      retirementBenefits: '',
      nonTaxableRetirementBenefits: '',
      taxableRetirementBenefits: '',
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
  }
}

// state input api fincomeCalculationInput
export const INPUT_FORM_TAB_1 = {
  employeeId: null,
  employeeType: null,
  retirementType: 1,
  executive: false,
  retirementReason: null,
}
export const Prev_Retired_Years_Of_Service = {
  settlementStartDate: null,
  settlementFinishDate: null,
  paymentDate: null,
  exclusionDays: 0,
  additionalDays: 0,
}
// state taxCalculationInput
export const FORM_STATE_TAB_1 = {
  prevRetiredYearsOfService: {...Prev_Retired_Years_Of_Service},
  lastRetiredYearsOfService: {
    settlementStartDate: null,
    settlementFinishDate: null,
    paymentDate: null,
    exclusionDays: 0,
    additionalDays: 0,
  },
  prevRetirementBenefitStatus: {
    retirementBenefits: null,
    nonTaxableRetirementBenefits: null,
    taxableRetirementBenefits: null,
  },
  incomeCalculationInput: {
    settlementStartDate: null,
    settlementFinishDate: null,
    exclusionDays: 0,
    additionalDays: 0,
  },
  //
  inputFormTab1: {...INPUT_FORM_TAB_1}
}
export const FORM_STATE_TAB_3 = {
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
  },
  nonTaxableRetirementBenefits: 0,
  taxCredit: 0,
  prePaidDelayedTaxPaymentTaxAmount: 0
}

export const initialIncomeRetirementTax = {
  taxBaseCalculation: {
    retirementIncome: null,
    deductionForYearsOfService: null,
    conversionBenefit: null,
    deductionByConversionBenefit: null,
    taxBaseForRetirementIncome: null,
  },
  taxAmountCalculation: {
    convertedTaxAmount: null,
    taxAmountCalculatedForRetirementIncome: null,
    taxCredit: null,
    prePaidDelayedTaxPaymentTaxAmount: null,
    taxAmountSubjectToReporting: null,
  },
  calculationOfDeferredRetirementIncomeTax: {
    totalAmount: null,
    retirementIncomeTax: null,
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
  },
  deductibleWithholdingTax: {
    incomeTax: null,
    localIncomeTax: null,
  },
  taxAmountToBeReported: {
    incomeTax: null,
    localIncomeTax: null,
  },
  retirementIncomeTax: {
    incomeTax: null,
    localIncomeTax: null,
  }
}


export const dataAddTableBigUtils = [
  {
    id: 1,
    name: "인원",
  },
  {
    id: 2,
    name: "퇴직급여",
  },
  {
    id: 3,
    name: "비과세퇴직급여",

  },
  {
    id: 4,
    name: "과세대상퇴직급여",

  },
  {
    id: 5,
    name: "소득세",

  },
  {
    id: 6,
    name: "지방소득세",
  },
  {
    id: 7,
    name: "공제총액",
  },
  {
    id: 8,
    name: "차인지급액",
  },
]

export const arrayReasonResignationUtils = [
  {
    label: "정년퇴직",
    value: 1
  },
  {
    label: "정리해고",
    value: 2
  },
  {
    label: "자발적퇴직",
    value: 3
  },
  {
    label: "임원퇴직",
    value: 4
  },
  {
    label: "중간정산",
    value: 5
  },
  {
    label: "기타",
    value: 99
  },
]

export const dataDefaultDetailUtils = {
  active: true,
  incomeId: 0,
  paymentDay: 0,
  retirementType: 0,
  imputedMonth: 0,
  paymentYear: 0,
  paymentMonth: 0,
  employeeType: 0,
  employeeId: 0,
  incomeTypeCode: "",
  createdAt: 0,
  incomePayment: 0,
  nonTaxableRetirementBenefits: 0,
  taxableRetirementBenefits: 0,
  retirementBenefits: 0,
  withholdingIncomeTax: 0,
  withholdingLocalIncomeTax: 0,
  withholdingRuralSpecialTax: null,
  prevPaymentDay: null,
  actualPayment: 0,
  employee: {
    joinedAt: 0,
    leavedAt: 0,
    totalPay: 0,
    name: "",
    employeeId: 0,
    incomeTypeCode: "",
    residentId: "",
    status: 0,
    foreigner: false,
    // nationalPensionDeduction: true,
    // healthInsuranceDeduction: false,
    // employeementInsuranceDeduction: false,
    // nationalPensionSupportPercent: null,
    // employeementInsuranceSupportPercent: null,
    // employeementReductionRatePercent: null,
    // incomeTaxMagnification: 0
  },
  totalDeduction: 0,
  specification: {
    executive: false,
    retirementReason: 0,
    specificationDetail: {
      calculationOfDeferredRetirementIncomeTax: {
        totalAmount: 0,
        retirementIncomeTax: 0,
        statements: [
          {
            pensionAccountHolder: "",
            bizNumber: "",
            bankAccountNumber: "",
            depositDate: 0,
            accountDepositAmount: 0
          }
        ]
      },
      deductibleWithholdingTax: {
        incomeTax: 0,
        localIncomeTax: 0
      },
      lastRetiredYearsOfService: {
        settlementStartDate: 0,
        settlementFinishDate: 0,
        paymentDate: 0,
        exclusionDays: 0,
        additionalDays: 0
      },
      "lastRetirementBenefitStatus": {
        "retirementBenefits": 10,
        "nonTaxableRetirementBenefits": 10,
        "taxableRetirementBenefits": 10
      },
      "prevRetiredYearsOfService": {
        "settlementStartDate": 0,
        "settlementFinishDate": 0,
        "paymentDate": 0,
        "exclusionDays": 0,
        "additionalDays": 0,
      },
      "prevRetirementBenefitStatus": {
        "retirementBenefits": 0,
        "nonTaxableRetirementBenefits": 0,
        "taxableRetirementBenefits": 0
      },
      "retirementIncomeTax": {
        "incomeTax": 0,
        "localIncomeTax": 0
      },
      "settlementRetiredYearsOfService": {
        "settlementStartDate": 0,
        "settlementFinishDate": 0,
        "paymentDate": 0,
        "exclusionDays": 0,
        "additionalDays": 0
      },

      "taxAmountCalculation": {
        "taxCredit": 0,
        "prePaidDelayedTaxPaymentTaxAmount": 0,
        "convertedTaxAmount": 0,
        "taxAmountCalculatedForRetirementIncome": 0,
        "taxAmountSubjectToReporting": 0
      },
      "taxBaseCalculation": {
        "retirementIncome": 0,
        "deductionForYearsOfService": 0,
        "conversionBenefit": 0,
        "taxBaseForRetirementIncome": 0,
        "deductionByConversionBenefit": 0
      },
      "taxAmountToBeReported": {
        "incomeTax": 0,
        "localIncomeTax": 0
      },
    },
    "totalPay3Month": 0,
    "totalAnualBonus": 0,
    "annualLeaveAllowance": 0,
    "expectedRetirementBenefits": 0,
    "definedRetirementBenefits": 0,
    "nonTaxableRetirementBenefits": 0,
    "taxableRetirementBenefits": 0,
  }
}
