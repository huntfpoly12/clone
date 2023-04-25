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
  /** amount (금액) */
  amount: Scalars['Int'];
  /** item code (항목코드) */
  itemCode: Scalars['Int'];
};

/** Dependent of wage income earner (근로소득자의 부양가족) */
export type EmployeeWageDependent = {
  __typename?: 'EmployeeWageDependent';
  /** basic deduction (기본공제) */
  basicDeduction: Scalars['Int'];
  /** a consignment relationship (위탁관계) */
  consignmentRelationship?: Maybe<Scalars['String']>;
  /** descendant (자녀) */
  descendant?: Maybe<Scalars['Boolean']>;
  /** Types of people with disabilities (장애인 유형) */
  disabled?: Maybe<Scalars['Int']>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** foreigner status (외국인여부) */
  foreigner: Scalars['Boolean'];
  /** householder status (세대주여부) */
  householder?: Maybe<Scalars['Boolean']>;
  /** income classification code (소득구분코드) */
  incomeTypeCode: Scalars['String'];
  /** the order of dependents (부양가족의 순번) */
  index: Scalars['Int'];
  /** Types of Childbirth Adoption (출산입양 유형) */
  maternityAdoption?: Maybe<Scalars['Int']>;
  /** name (이름) */
  name: Scalars['String'];
  /** dependent family relationship (부양가족관계) */
  relation: Scalars['Int'];
  /** resident registration number / foreigner number (주민등록번호 / 외국인번호) */
  residentId: Scalars['String'];
  /** resident registration number / Foreigner number validity (주민등록번호 / 외국인번호 유효성) */
  residentIdValidity: Scalars['Boolean'];
  /** preferential treatment for the elderly (경로우대) */
  senior?: Maybe<Scalars['Boolean']>;
  /** a single parent (한부모) */
  singleParent?: Maybe<Scalars['Boolean']>;
  /** women (부녀자) */
  women?: Maybe<Scalars['Boolean']>;
};

/** Pay item of wage income earner (근로소득자 소득항목) */
export type EmployeeWagePayItem = {
  __typename?: 'EmployeeWagePayItem';
  /** amount (금액) */
  amount: Scalars['Int'];
  /** item code (항목코드) */
  itemCode: Scalars['Int'];
};

/** Wage income earner (근로소득자) */
export type EmployeeWage = {
  __typename?: 'EmployeeWage';
  /** activation status (활성여부) */
  // active: Scalars['Boolean'];
  /** extended address (확장주소) */
  // addressExtend?: Maybe<Scalars['String']>;
  /** generation date (생성일) */
  // createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  // createdBy: Scalars['String'];
  /** number of families subject to deduction (공제대상 가족수) */
  // deductionDependentCount: Scalars['Int'];
  /** Deduction item list of wage income earner (근로소득자 공제항목 목록) */
  // deductionItems?: Maybe<Array<EmployeeWageDeductionItem>>;
  /** deletable status (삭제가능 여부) */
  // deletable: Scalars['Boolean'];
  /** department (부서) */
  // department?: Maybe<Scalars['String']>;
  /** List of dependents of wage income earner (근로소득자의 부양가족 목록) */
  // dependents?: Maybe<Array<EmployeeWageDependent>>;
  /** email (이메일) */
  // email?: Maybe<Scalars['String']>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employeement insurance deduction status (고용보험공제여부) */
  // employeementInsuranceDeduction: Scalars['Boolean'];
  /** employee insurance support percent (고용보험 두루누리 적용 퍼센트) */
  // employeementInsuranceSupportPercent?: Maybe<Scalars['Int']>;
  /** employeement reduction for SMEs status (중소기업취업감면여부) */
  // employeementReduction: Scalars['Boolean'];
  /** finish date of employeement reduction period for SMEs [YYYYMMDD] (중소기업취업감면기간 종료일) */
  // employeementReductionFinishDate?: Maybe<Scalars['Int']>;
  /** employeement reduction input type for SMEs (중소기업취업감면입력 유형) */
  // employeementReductionInput?: Maybe<Scalars['Int']>;
  /** employeement reduction rate for SMEs (중소기업취업감면율 퍼센트) */
  // employeementReductionRatePercent?: Maybe<Scalars['Int']>;
  /** start date of employeement reduction period for SMEs [YYYYMMDD] (중소기업취업감면기간 시작일) */
  // employeementReductionStartDate?: Maybe<Scalars['Int']>;
  /** foreigner status (외국인여부) */
  foreigner: Scalars['Boolean'];
  /** health insurance deduction status (건강보험공제여부) */
  // healthInsuranceDeduction: Scalars['Boolean'];
  /** householder status (세대주여부) */
  // householder: Scalars['Boolean'];
  /** income payments (소득지급액) */
  // incomePayment: Scalars['Int'];
  /** income tax magnification / % (소득세배율) */
  // incomeTaxMagnification: Scalars['Int'];
  /** income classification code (소득구분코드) */
  incomeTypeCode: Scalars['String'];
  /** insurance premium support usage status (두루누리사용여부) */
  // insuranceSupport: Scalars['Boolean'];
  /** ip address (IP주소) */
  // ip: Scalars['String'];
  /** date of joining the company [YYYYMMDD] (입사일) */
  joinedAt: Scalars['Int'];
  /** date of resignation [YYYYMMDD] (퇴사일) */
  leavedAt?: Maybe<Scalars['Int']>;
  /** long-term care insurance deduction status (장기요양보험공제여부) */
  // longTermCareInsuranceDeduction: Scalars['Boolean'];
  /** name (이름) */
  name: Scalars['String'];
  /** national pension deduction status (국민연금공제여부) */
  // nationalPensionDeduction: Scalars['Boolean'];
  /** national pension support percent (국민연금 두루누리 적용 퍼센트) */
  // nationalPensionSupportPercent?: Maybe<Scalars['Int']>;
  /** foreign nationality (외국인국적) */
  // nationality?: Maybe<Scalars['String']>;
  /** foreign nationality code (외국인국적코드) */
  // nationalityCode?: Maybe<Scalars['String']>;
  /** Pay item list of wage income earner (근로소득자 소득항목 목록) */
  // payItems?: Maybe<Array<EmployeeWagePayItem>>;
  /** representative status (대표자여부) */
  // president: Scalars['Boolean'];
  /** resident registration number / foreigner number (주민등록번호 / 외국인번호) */
  residentId: Scalars['String'];
  /** resident registration number / Foreigner number validity (주민등록번호 / 외국인번호 유효성) */
  // residentIdValidity: Scalars['Boolean'];
  /** position (직책) */
  // responsibility?: Maybe<Scalars['String']>;
  /** road name address (도로명주소) */
  // roadAddress?: Maybe<Scalars['String']>;
  /** status (상태) */
  status: Scalars['Int'];
  /** the qualifications required to stay (체류자격) */
  // stayQualification?: Maybe<Scalars['String']>;
  /** total deduction (공제합계) */
  // totalDeduction: Scalars['Int'];
  /** salary + reward total (급여+재수당합계) */
  totalPay: Scalars['Int'];
  /** employee type (직원유형) */
  // type: Scalars['Int'];
  /** revised date (수정일) */
  // updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  // updatedBy: Scalars['String'];
  /** weekly prescribed working hours (주간 규정 근무시간) */
  // weeklyWorkingHours: Scalars['Int'];
  /** withholding income tax (원천징수소득세) */
  // withholdingIncomeTax?: Maybe<Scalars['Int']>;
  /** withholding local income tax (원천징수지방소득세) */
  // withholdingLocalIncomeTax?: Maybe<Scalars['Int']>;
  /** withholding rural special tax (원천징수농어촌특별세) */
  // withholdingRuralSpecialTax?: Maybe<Scalars['Int']>;
};
/** Deduction item of daily wage income earner (일용직근로소득자 공제항목) */
export type EmployeeWageDailyDeductionItem = {
  __typename?: 'EmployeeWageDailyDeductionItem';
  /** amount (금액) */
  amount: Scalars['Int'];
  /** item code (항목코드) */
  itemCode: Scalars['Int'];
};


/** Daily wage income earner (일용직근로소득자) */
export type EmployeeWageDaily = {
  __typename?: 'EmployeeWageDaily';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** extended address (확장주소) */
  addressExtend?: Maybe<Scalars['String']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** daily wage (일급여) */
  dailyWage: Scalars['Int'];
  /** Deduction item list of daily wage income earner (일용직근로소득자 공제항목 목록) */
  deductionItems?: Maybe<Array<EmployeeWageDailyDeductionItem>>;
  /** deletable status (삭제가능 여부) */
  deletable: Scalars['Boolean'];
  /** department (부서) */
  department?: Maybe<Scalars['String']>;
  /** email (이메일) */
  email?: Maybe<Scalars['String']>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employeement insurance deduction status (고용보험공제여부) */
  employeementInsuranceDeduction: Scalars['Boolean'];
  /** employee insurance support percent (고용보험 두루누리 적용 퍼센트) */
  employeementInsuranceSupportPercent?: Maybe<Scalars['Int']>;
  /** foreigner status (외국인여부) */
  foreigner: Scalars['Boolean'];
  /** health insurance deduction status (건강보험공제여부) */
  healthInsuranceDeduction: Scalars['Boolean'];
  /** income classification code (소득구분코드) */
  incomeTypeCode: Scalars['String'];
  /** insurance premium support usage status (두루누리사용여부) */
  insuranceSupport: Scalars['Boolean'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** date of joining the company [YYYYMMDD] (입사일) */
  joinedAt: Scalars['Int'];
  /** date of resignation [YYYYMMDD] (퇴사일) */
  leavedAt?: Maybe<Scalars['Int']>;
  /** long-term care insurance deduction status (장기요양보험공제여부) */
  longTermCareInsuranceDeduction: Scalars['Boolean'];
  /** salary status (월급여부) */
  monthlyPaycheck: Scalars['Boolean'];
  /** monthly wage (월급여) */
  monthlyWage: Scalars['Int'];
  /** name (이름) */
  name: Scalars['String'];
  /** national pension deduction status (국민연금공제여부) */
  nationalPensionDeduction: Scalars['Boolean'];
  /** national pension support percent (국민연금 두루누리 적용 퍼센트) */
  nationalPensionSupportPercent?: Maybe<Scalars['Int']>;
  /** foreign nationality (외국인국적) */
  nationality?: Maybe<Scalars['String']>;
  /** foreign nationality code (외국인국적코드) */
  nationalityCode?: Maybe<Scalars['String']>;
  /** resident registration number / foreigner number (주민등록번호 / 외국인번호) */
  residentId: Scalars['String'];
  /** resident registration number / Foreigner number validity (주민등록번호 / 외국인번호 유효성) */
  residentIdValidity: Scalars['Boolean'];
  /** position (직책) */
  responsibility?: Maybe<Scalars['String']>;
  /** retirement benefit status (퇴직급여여부) */
  retirementIncome: Scalars['Boolean'];
  /** road name address (도로명주소) */
  roadAddress?: Maybe<Scalars['String']>;
  /** status (상태) */
  status: Scalars['Int'];
  /** the qualifications required to stay (체류자격) */
  stayQualification?: Maybe<Scalars['String']>;
  /** total deduction (공제합계) */
  totalDeduction: Scalars['Int'];
  /** employee type (직원유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** weekly prescribed working hours (주간 규정 근무시간) */
  weeklyWorkingHours: Scalars['Int'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax?: Maybe<Scalars['Int']>;
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax?: Maybe<Scalars['Int']>;
  /** withholding rural special tax (원천징수농어촌특별세) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Int']>;
  /** number of working days (근무일수) */
  workingDays: Scalars['Int'];
};

/** Retirement income earner (퇴직소득자 : 근로소득자 / 일용직근로소득자) */
export type EmployeeRetirement = EmployeeWage | EmployeeWageDaily;

/** Pension account deposit details (연금계좌입금명세) */
export type StatementOfPensionAccountDeposit = {
  __typename?: 'StatementOfPensionAccountDeposit';
  /** account deposit amount (계좌입금금액) */
  accountDepositAmount: Scalars['Int'];
  /** bank account number (계좌번호) */
  bankAccountNumber: Scalars['String'];
  /** business registration number (사업자등록번호) */
  bizNumber: Scalars['String'];
  /** deposit date [YYYYMMDD] (입금일) */
  depositDate: Scalars['Int'];
  /** pension account handler (연금계좌취급자) */
  pensionAccountHolder: Scalars['String'];
};
/** Calculation of deferred retirement income tax amount (이연퇴직소득세액계산) */
export type CalculationOfDeferredRetirementIncomeTax = {
  __typename?: 'CalculationOfDeferredRetirementIncomeTax';
  /** deferred retirement income tax (이연퇴직소득세) */
  retirementIncomeTax: Scalars['Int'];
  /** Pension account deposit details list (연금계좌입금명세목록) */
  statements: Array<StatementOfPensionAccountDeposit>;
  /** total account deposit amount (계좌입금금액합계) */
  totalAmount: Scalars['Int'];
};

/** Payment details / deductible source tax amount (납부명세/차감원천징수세액) */
export type DeductibleWithholdingTax = {
  __typename?: 'DeductibleWithholdingTax';
  /** income tax (소득세) */
  incomeTax: Scalars['Int'];
  /** local income tax (지방소득세) */
  localIncomeTax: Scalars['Int'];
};

/** Retired years of service (퇴직근속연수) */
export type RetiredYearsOfService = {
  // __typename?: 'RetiredYearsOfService';
  /** additional days (가산일수) */
  additionalDays: Scalars['Int'];
  /** number of days excluded (제외일수) */
  exclusionDays: Scalars['Int'];
  /** payment date [YYYYMMDD] (지급일자) */
  paymentDate: Scalars['Int'];
  /** date of resignation / settlement end [YYYYMMDD] (퇴사일/정산종료일) */
  settlementFinishDate: Scalars['Int'];
  /** date of joining / starting settlement [YYYYMMDD] (입사일/정산시작일) */
  settlementStartDate: Scalars['Int'];
};

/** Retired years of service input (퇴직근속연수 입력) */
export type RetiredYearsOfServiceInput = {
  /** additional days (가산일수) */
  additionalDays: Scalars['Int'];
  /** number of days excluded (제외일수) */
  exclusionDays: Scalars['Int'];
  /** payment date [YYYYMMDD] (지급일자) */
  paymentDate: Scalars['Int'];
  /** date of resignation / settlement end [YYYYMMDD] (퇴사일/정산종료일) */
  settlementFinishDate: Scalars['Int'];
  /** date of joining / starting settlement [YYYYMMDD] (입사일/정산시작일) */
  settlementStartDate: Scalars['Int'];
};

/** Retirement benefit status (퇴직급여현황) */
export type RetirementBenefitStatus = {
  __typename?: 'RetirementBenefitStatus';
  /** non-taxable retirement benefits (비과세퇴직급여) */
  nonTaxableRetirementBenefits: Scalars['Int'];
  /** retirement benefit (퇴직급여) */
  retirementBenefits: Scalars['Int'];
  /** taxable retirement benefits (과세대상퇴직급여) */
  taxableRetirementBenefits: Scalars['Int'];
};

/** Retirement benefit status input (퇴직급여현황 입력) */
export type RetirementBenefitStatusInput = {
  /** non-taxable retirement benefits (비과세퇴직급여) */
  nonTaxableRetirementBenefits: Scalars['Int'];
  /** retirement benefit (퇴직급여) */
  retirementBenefits: Scalars['Int'];
  /** taxable retirement benefits (과세대상퇴직급여) */
  taxableRetirementBenefits: Scalars['Int'];
};

/** Deferred retirement income tax (이연퇴직소득세) */
export type RetirementIncomeTax = {
  __typename?: 'RetirementIncomeTax';
  /** deferred retirement income tax / income tax (이연퇴직소득세/소득세) */
  incomeTax: Scalars['Int'];
  /** deferred retirement income tax / local income tax (이연퇴직소득세/지방소득세) */
  localIncomeTax: Scalars['Int'];
};
/** Tax amount calculation (세액계산) */
export type TaxAmountCalculation = {
  __typename?: 'TaxAmountCalculation';
  /** calculated tax amount converted (환산산출세액) */
  convertedTaxAmount: Scalars['Int'];
  /** previously paid / delayed tax amount (기납부/기과세이연세액) */
  prePaidDelayedTaxPaymentTaxAmount: Scalars['Int'];
  /** retirement income calculation tax amount (퇴직소득산출세액) */
  taxAmountCalculatedForRetirementIncome: Scalars['Int'];
  /** tax amount to be reported (신고대상세액) */
  taxAmountSubjectToReporting: Scalars['Int'];
  /** tax credit (세액공제) */
  taxCredit: Scalars['Int'];
};

/** Tax amount to be reported (신고대상세액) */
export type TaxAmountToBeReported = {
  __typename?: 'TaxAmountToBeReported';
  /** tax amount to be reported / income tax (신고대상세액/소득세) */
  incomeTax: Scalars['Int'];
  /** tax amount to be reported / local income tax (신고대상세액/지방소득세) */
  localIncomeTax: Scalars['Int'];
};

/** Tax base calculation (과세표준계산) */
export type TaxBaseCalculation = {
  __typename?: 'TaxBaseCalculation';
  /** conversion benefit (환산급여) */
  conversionBenefit: Scalars['Int'];
  /** deduction by conversion benefit (환산급여별공제) */
  deductionByConversionBenefit: Scalars['Int'];
  /** deduction for service training (근속연수공제) */
  deductionForYearsOfService: Scalars['Int'];
  /** retirement income (퇴직소득) */
  retirementIncome: Scalars['Int'];
  /** retirement income tax base (퇴직소득과세표준) */
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
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** differential payment (차인지급액) */
  actualPayment: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  // createdBy: Scalars['String'];
  /** Retirement income earner (퇴직소득자) */
  employee?: Maybe<EmployeeRetirement>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employee type (직원유형) */
  employeeType: Scalars['Int'];
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** income serial number (소득일련번호) */
  incomeId: Scalars['Int'];
  /** income payment (소득지급) */
  incomePayment: Scalars['Int'];
  /** income classification code (소득구분코드) */
  incomeTypeCode: Scalars['String'];
  /** ip address (IP주소) */
  // ip: Scalars['String'];
  /** non-taxable retirement benefits (비과세퇴직급여) */
  nonTaxableRetirementBenefits: Scalars['Int'];
  /** payment day (지급일) */
  paymentDay: Scalars['Int'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** previous payment day (이전지급일) */
  prevPaymentDay?: Maybe<Scalars['Int']>;
  /** retirement benefit (퇴직급여) */
  retirementBenefits: Scalars['Int'];
  /** Retirement income classification (퇴직소득구분) */
  retirementType: Scalars['Int'];
  /** date of resignation / settlement end [YYYYMMDD] (퇴사일/정산종료일) */
  // settlementFinishDate: Scalars['Int'];
  /** date of joining / starting settlement [YYYYMMDD] (입사일/정산시작일) */
  // settlementStartDate: Scalars['Int'];
  /** Retirement income specification (퇴직소득명세) */
  specification?: Maybe<IncomeRetirementSpecification>;
  /** retirement income specification serial number (퇴직소득명세일련번호) */
  // specificationId?: Maybe<Scalars['Int']>;
  /** taxable retirement benefits (과세대상퇴직급여) */
  taxableRetirementBenefits: Scalars['Int'];
  /** total deduction (공제합계) */
  totalDeduction: Scalars['Int'];
  /** revised date (수정일) */
  // updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  // updatedBy: Scalars['String'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax: Scalars['Int'];
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax: Scalars['Int'];
  /** withholding rural special tax (원천징수농어촌특별세) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Int']>;
};
