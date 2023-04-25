export type Maybe<T> = T | null;
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AccountingAdditionalServiceTypeScalar: any;
  AdminScreenRoleScalar: any;
  BankTypeScalar: any;
  BizTypeScalar: any;
  DateScalar: any;
  FacilityBizTypeScalar: any;
  ProcessStatusScalar: any;
  WithholdingAdditionalServiceTypeScalar: any;
  WorkScreenRoleScalar: any;
};

/** Deduction item of wage income earner (근로소득자 공제항목) */
export type EmployeeWageDeductionItem = {
  __typename?: 'EmployeeWageDeductionItem';
  amount: Scalars['Int'];
  itemCode: Scalars['Int'];
};

/** Dependent of wage income earner (근로소득자의 부양가족) */
export type EmployeeWageDependent = {
  __typename?: 'EmployeeWageDependent';
  basicDeduction: Scalars['Int'];
  consignmentRelationship?: Maybe<Scalars['String']>;
  descendant?: Maybe<Scalars['Boolean']>;
  disabled?: Maybe<Scalars['Int']>;
  employeeId: Scalars['Int'];
  foreigner: Scalars['Boolean'];
  householder?: Maybe<Scalars['Boolean']>;
  incomeTypeCode: Scalars['String'];
  index: Scalars['Int'];
  maternityAdoption?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  relation: Scalars['Int'];
  residentId: Scalars['String'];
  residentIdValidity: Scalars['Boolean'];
  senior?: Maybe<Scalars['Boolean']>;
  singleParent?: Maybe<Scalars['Boolean']>;
  women?: Maybe<Scalars['Boolean']>;
};

/** Pay item of wage income earner (근로소득자 소득항목) */
export type EmployeeWagePayItem = {
  __typename?: 'EmployeeWagePayItem';
  amount: Scalars['Int'];
  itemCode: Scalars['Int'];
};

/** Wage income earner (근로소득자) */
export type EmployeeWage = {
  __typename?: 'EmployeeWage';
  employeeId: Scalars['Int'];
  foreigner: Scalars['Boolean'];
  incomeTypeCode: Scalars['String'];
  joinedAt: Scalars['Int'];
  leavedAt?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  residentId: Scalars['String'];
  status: Scalars['Int'];
  totalPay: Scalars['Int'];
};
/** Deduction item of daily wage income earner (일용직근로소득자 공제항목) */
export type EmployeeWageDailyDeductionItem = {
  __typename?: 'EmployeeWageDailyDeductionItem';
  amount: Scalars['Int'];
  itemCode: Scalars['Int'];
};


/** Daily wage income earner (일용직근로소득자) */
export type EmployeeWageDaily = {
  __typename?: 'EmployeeWageDaily';
  active: Scalars['Boolean'];
  addressExtend?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateScalar'];
  createdBy: Scalars['String'];
  dailyWage: Scalars['Int'];
  deductionItems?: Maybe<Array<EmployeeWageDailyDeductionItem>>;
  deletable: Scalars['Boolean'];
  department?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  employeeId: Scalars['Int'];
  employeementInsuranceDeduction: Scalars['Boolean'];
  employeementInsuranceSupportPercent?: Maybe<Scalars['Int']>;
  foreigner: Scalars['Boolean'];
  healthInsuranceDeduction: Scalars['Boolean'];
  incomeTypeCode: Scalars['String'];
  insuranceSupport: Scalars['Boolean'];
  ip: Scalars['String'];
  joinedAt: Scalars['Int'];
  leavedAt?: Maybe<Scalars['Int']>;
  longTermCareInsuranceDeduction: Scalars['Boolean'];
  monthlyPaycheck: Scalars['Boolean'];
  monthlyWage: Scalars['Int'];
  name: Scalars['String'];
  nationalPensionDeduction: Scalars['Boolean'];
  nationalPensionSupportPercent?: Maybe<Scalars['Int']>;
  nationality?: Maybe<Scalars['String']>;
  nationalityCode?: Maybe<Scalars['String']>;
  residentId: Scalars['String'];
  residentIdValidity: Scalars['Boolean'];
  responsibility?: Maybe<Scalars['String']>;
  retirementIncome: Scalars['Boolean'];
  roadAddress?: Maybe<Scalars['String']>;
  status: Scalars['Int'];
  stayQualification?: Maybe<Scalars['String']>;
  totalDeduction: Scalars['Int'];
  type: Scalars['Int'];
  updatedAt: Scalars['DateScalar'];
  updatedBy: Scalars['String'];
  weeklyWorkingHours: Scalars['Int'];
  withholdingIncomeTax?: Maybe<Scalars['Int']>;
  withholdingLocalIncomeTax?: Maybe<Scalars['Int']>;
  withholdingRuralSpecialTax?: Maybe<Scalars['Int']>;
  workingDays: Scalars['Int'];
};

export type EmployeeRetirement = EmployeeWage | EmployeeWageDaily;

export type StatementOfPensionAccountDeposit = {
  __typename?: 'StatementOfPensionAccountDeposit';
  accountDepositAmount: Scalars['Int'];
  bankAccountNumber: Scalars['String'];
  bizNumber: Scalars['String'];
  depositDate: Scalars['Int'];
  pensionAccountHolder: Scalars['String'];
};
/** Calculation of deferred retirement income tax amount (이연퇴직소득세액계산) */
export type CalculationOfDeferredRetirementIncomeTax = {
  __typename?: 'CalculationOfDeferredRetirementIncomeTax';
  retirementIncomeTax: Scalars['Int'];
  statements: Array<StatementOfPensionAccountDeposit>;
  totalAmount: Scalars['Int'];
};

/** Payment details / deductible source tax amount (납부명세/차감원천징수세액) */
export type DeductibleWithholdingTax = {
  __typename?: 'DeductibleWithholdingTax';
  incomeTax: Scalars['Int'];
  localIncomeTax: Scalars['Int'];
};

/** Retired years of service (퇴직근속연수) */
export type RetiredYearsOfService = {
  __typename?: 'RetiredYearsOfService';
  additionalDays: Scalars['Int'];
  exclusionDays: Scalars['Int'];
  paymentDate: Scalars['Int'];
  settlementFinishDate: Scalars['Int'];
  settlementStartDate: Scalars['Int'];
};

/** Retired years of service input (퇴직근속연수 입력) */
export type RetiredYearsOfServiceInput = {
  additionalDays: Scalars['Int'];
  exclusionDays: Scalars['Int'];
  paymentDate: Scalars['Int'];
  settlementFinishDate: Scalars['Int'];
  settlementStartDate: Scalars['Int'];
};

/** Retirement benefit status (퇴직급여현황) */
export type RetirementBenefitStatus = {
  __typename?: 'RetirementBenefitStatus';
  nonTaxableRetirementBenefits: Scalars['Int'];
  retirementBenefits: Scalars['Int'];
  taxableRetirementBenefits: Scalars['Int'];
};

/** Retirement benefit status input (퇴직급여현황 입력) */
export type RetirementBenefitStatusInput = {
  nonTaxableRetirementBenefits: Scalars['Int'];
  retirementBenefits: Scalars['Int'];
  taxableRetirementBenefits: Scalars['Int'];
};

/** Deferred retirement income tax (이연퇴직소득세) */
export type RetirementIncomeTax = {
  __typename?: 'RetirementIncomeTax';
  incomeTax: Scalars['Int'];
  localIncomeTax: Scalars['Int'];
};
/** Tax amount calculation (세액계산) */
export type TaxAmountCalculation = {
  __typename?: 'TaxAmountCalculation';
  convertedTaxAmount: Scalars['Int'];
  prePaidDelayedTaxPaymentTaxAmount: Scalars['Int'];
  taxAmountCalculatedForRetirementIncome: Scalars['Int'];
  taxAmountSubjectToReporting: Scalars['Int'];
  taxCredit: Scalars['Int'];
};

/** Tax amount to be reported (신고대상세액) */
export type TaxAmountToBeReported = {
  __typename?: 'TaxAmountToBeReported';
  incomeTax: Scalars['Int'];
  localIncomeTax: Scalars['Int'];
};

/** Tax base calculation (과세표준계산) */
export type TaxBaseCalculation = {
  __typename?: 'TaxBaseCalculation';
  conversionBenefit: Scalars['Int'];
  deductionByConversionBenefit: Scalars['Int'];
  deductionForYearsOfService: Scalars['Int'];
  retirementIncome: Scalars['Int'];
  taxBaseForRetirementIncome: Scalars['Int'];
};


/** Retirement income details (퇴직소득명세 상세) */
export type IncomeRetirementSpecificationDetail = {
  __typename?: 'IncomeRetirementSpecificationDetail';
  calculationOfDeferredRetirementIncomeTax: CalculationOfDeferredRetirementIncomeTax;
  deductibleWithholdingTax: DeductibleWithholdingTax;
  lastRetiredYearsOfService: RetiredYearsOfService;
  lastRetirementBenefitStatus: RetirementBenefitStatus;
  prevRetiredYearsOfService?: Maybe<RetiredYearsOfService>;
  prevRetirementBenefitStatus?: Maybe<RetirementBenefitStatus>;
  retirementIncomeTax: RetirementIncomeTax;
  settlementRetiredYearsOfService: RetiredYearsOfService;
  taxAmountCalculation: TaxAmountCalculation;
  taxAmountToBeReported: TaxAmountToBeReported;
  taxBaseCalculation: TaxBaseCalculation;
};


/** Retirement income statement (퇴직소득명세) */
export type IncomeRetirementSpecification = {
  executive: Scalars['Boolean'];
  retirementReason: Scalars['Float'];
  specificationDetail: IncomeRetirementSpecificationDetail;
  totalPay3Month: Scalars['Int'];
  totalAnualBonus: Scalars['Int'];
  annualLeaveAllowance: Scalars['Int'];
  expectedRetirementBenefits: Scalars['Int'];
  definedRetirementBenefits: Scalars['Int'];
  nonTaxableRetirementBenefits: Scalars['Int'];
  taxableRetirementBenefits: Scalars['Int'];
};

export type IncomeRetirement = {
  // __typename?: 'IncomeRetirement';
  active: Scalars['Boolean'];
  actualPayment: Scalars['Int'];
  createdAt: Scalars['DateScalar'];
  employee?: Maybe<EmployeeRetirement>;
  employeeId: Scalars['Int'];
  employeeType: Scalars['Int'];
  imputedMonth: Scalars['Int'];
  incomeId: Scalars['Int'];
  incomePayment: Scalars['Int'];
  incomeTypeCode: Scalars['String'];
  nonTaxableRetirementBenefits: Scalars['Int'];
  paymentDay: Scalars['Int'];
  paymentMonth: Scalars['Int'];
  paymentYear: Scalars['Int'];
  prevPaymentDay?: Maybe<Scalars['Int']>;
  retirementBenefits: Scalars['Int'];
  retirementType: Scalars['Int'];
  specification?: Maybe<IncomeRetirementSpecification>;
  taxableRetirementBenefits: Scalars['Int'];
  totalDeduction: Scalars['Int'];
  withholdingIncomeTax: Scalars['Int'];
  withholdingLocalIncomeTax: Scalars['Int'];
  withholdingRuralSpecialTax?: Maybe<Scalars['Int']>;
};
