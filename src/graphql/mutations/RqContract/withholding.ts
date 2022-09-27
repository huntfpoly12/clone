import { BaseType } from "./enum";

/**
 * Withholding Additional Service Type (원천부가서비스)
 * - MAJOR_INSURANCE : four major insurance (4대보험) - 1
 */
export class WithholdingAdditionalServiceType extends BaseType {
  /** four major insurance (4대보험) - 1 */
  public static MAJOR_INSURANCE = new WithholdingAdditionalServiceType("4대보험", 1);

  private static _ = WithholdingAdditionalServiceType.closeEnum();

  private constructor(
    n: string,
    private readonly v: number
  ) {
    super(n);
  }

  /**
   * Code (코드)
   * - Used for GraphQL integration (GraphQL 연동에 사용됨)
   */
  public get code() {
    return this.v;
  }

  /**
   * Returns WithholdingAdditionalServiceType constant from the code (코드로부터 WithholdingAdditionalServiceType 상수를 반환한다)
   * @param v Code (코드)
   * @returns WithholdingAdditionalServiceType
   */
  static fromCode(v: number) {
    const items = WithholdingAdditionalServiceType.all<WithholdingAdditionalServiceType>();
    return items.find((item) => item.code === v);
  }
}

/**
 * Types of taxable income (과세소득 유형)
 * - SALARY : salary (급여) - 1
 * - BONUS : bonus (상여) - 2
 * - CONSTRUCTIVE_BONUS : constructive bonus (인정상여) - 3
 * - STOCK_OPTION_PROFIT : profit from exercising stock options (주식매수선택권행사이익) - 4
 * - WITHDRAWAL_ESOS : withdrawal of employee's stock ownership association (우리사주조합인출금) - 5
 * - EXCEEDING_ERIL : exceeding executive retirement income limit (임원퇴직소득금액한도초과액) - 6
 */
export class TaxPayItem extends BaseType {
  private readonly c: number;

  constructor(c: number, n: string) {
    super(n);
    this.c = c;
  }

  /** salary (급여) - 1 */
  static SALARY = new TaxPayItem(1, "급여");
  /** bonus (상여) - 2 */
  static BONUS = new TaxPayItem(2, "상여");
  /** constructive bonus (인정상여) - 3 */
  static CONSTRUCTIVE_BONUS = new TaxPayItem(3, "인정상여");
  /** profit from exercising stock options (주식매수선택권행사이익) - 4 */
  static STOCK_OPTION_PROFIT = new TaxPayItem(4, "주식매수선택권행사이익");
  /** withdrawal of employee's stock ownership association (우리사주조합인출금) - 5 */
  static WITHDRAWAL_ESOS = new TaxPayItem(5, "우리사주조합인출금");
  /** exceeding executive retirement income limit (임원퇴직소득금액한도초과액) - 6 */
  static EXCEEDING_ERIL = new TaxPayItem(6, "임원퇴직소득금액한도초과액");

  private static _ = TaxPayItem.closeEnum();

  /**
   * Code (코드)
   * - Used for GraphQL integration (GraphQL 연동에 사용됨)
   */
  public get code() {
    return this.c;
  }

  /**
   * Returns TaxPayItem constant from the code (코드로부터 TaxPayItem 상수를 반환한다)
   * @param v Code (코드)
   * @returns TaxPayItem
   */
  static fromCode(v: number) {
    const items = TaxPayItem.all<TaxPayItem>();
    return items.find((item) => item.code === v);
  }
}

interface TaxFreePayItemProps {
  code: string;
  name: string;
  monthlyLimit?: number;
  annualLimit?: number;
  submission: boolean;
}

/**
 * Tax-free income type (비과세소득 유형)
 */
export class TaxFreePayItem extends BaseType {
  private readonly props: TaxFreePayItemProps;

  constructor(props: TaxFreePayItemProps) {
    super(props.name);
    this.props = props;
  }

  /** 복무병 급여 */
  static A01 = new TaxFreePayItem({ code: "A01", name: "복무병 급여", submission: false });
  /** 동원직장 급여 */
  static B01 = new TaxFreePayItem({ code: "B01", name: "동원직장 급여", submission: false });
  /** 산재요양 급여 */
  static C01 = new TaxFreePayItem({ code: "C01", name: "산재요양 급여", submission: false });
  /** 요양 보상금 등 */
  static D01 = new TaxFreePayItem({ code: "D01", name: "요양 보상금 등", submission: false });
  /** [고용보험]육아(산전후)휴가급여 */
  static E01 = new TaxFreePayItem({ code: "E01", name: "[고용보험]육아(산전후)휴가급여", submission: false });
  /** [공무원]육아휴직수당 등 */
  static E02 = new TaxFreePayItem({ code: "E02", name: "[공무원]육아휴직수당 등", submission: false });
  /** 반환(사망)일시금 */
  static E10 = new TaxFreePayItem({ code: "E10", name: "반환(사망)일시금", submission: false });
  /** [공무원]요양비 등 */
  static F01 = new TaxFreePayItem({ code: "F01", name: "[공무원]요양비 등", submission: false });
  /** 학자금 */
  static G01 = new TaxFreePayItem({ code: "G01", name: "학자금", annualLimit: 0, submission: true });
  /** 무보수위원수당 */
  static H01 = new TaxFreePayItem({ code: "H01", name: "무보수위원수당", submission: true });
  /** 일(숙)직료 및 여비 */
  static H02 = new TaxFreePayItem({ code: "H02", name: "일(숙)직료 및 여비", submission: false });
  /** 자가운전보조금 */
  static H03 = new TaxFreePayItem({ code: "H03", name: "자가운전보조금", monthlyLimit: 200000, submission: false });
  /** 법령에 의한 제복 등 */
  static H04 = new TaxFreePayItem({ code: "H04", name: "법령에 의한 제복 등", submission: false });
  /** 승선수당 */
  static H05 = new TaxFreePayItem({ code: "H05", name: "승선수당", monthlyLimit: 200000, submission: true });
  /** 입갱수당 및 발파수당 */
  static H051 = new TaxFreePayItem({ code: "H051", name: "입갱수당 및 발파수당", submission: false });
  /** (유아,초중등교육법) 연구보조비 */
  static H06 = new TaxFreePayItem({ code: "H06", name: "(유아,초중등교육법) 연구보조비", monthlyLimit: 200000, submission: true });
  /** [고등교육법] 연구보조비 */
  static H07 = new TaxFreePayItem({ code: "H07", name: "[고등교육법] 연구보조비", monthlyLimit: 200000, submission: true });
  /** [특별법]연구보조비 */
  static H08 = new TaxFreePayItem({ code: "H08", name: "[특별법]연구보조비", monthlyLimit: 200000, submission: true });
  /** [연구기관등]연구보조비 */
  static H09 = new TaxFreePayItem({ code: "H09", name: "[연구기관등]연구보조비", monthlyLimit: 200000, submission: true });
  /** [기업연구소]연구보조비 */
  static H10 = new TaxFreePayItem({ code: "H10", name: "[기업연구소]연구보조비", monthlyLimit: 200000, submission: true });
  /** 취재수당 */
  static H11 = new TaxFreePayItem({ code: "H11", name: "취재수당", monthlyLimit: 200000, submission: true });
  /** 벽지수당 */
  static H12 = new TaxFreePayItem({ code: "H12", name: "벽지수당", monthlyLimit: 200000, submission: true });
  /** 재해관련급여 */
  static H13 = new TaxFreePayItem({ code: "H13", name: "재해관련급여", submission: true });
  /** [영유아보육법시행령]보육교사 근무환경개선비 */
  static H14 = new TaxFreePayItem({ code: "H14", name: "[영유아보육법시행령]보육교사 근무환경개선비", submission: true });
  /** [유아보육법시행령]사립유치원 수석교사.교사의인건비 */
  static H15 = new TaxFreePayItem({ code: "H15", name: "[유아보육법시행령]사립유치원 수석교사.교사의인건비", submission: true });
  /** 정부.공공기관 중 지방이전기관 종사자 이주수당 */
  static H16 = new TaxFreePayItem({ code: "H16", name: "정부.공공기관 중 지방이전기관 종사자 이주수당", monthlyLimit: 200000, submission: true });
  /** 종교활동비 */
  static H17 = new TaxFreePayItem({ code: "H17", name: "종교활동비", submission: false });
  /** 외국정부등 근무자 */
  static I01 = new TaxFreePayItem({ code: "I01", name: "외국정부등 근무자", submission: true });
  /** 보훈급여금 등 */
  static J01 = new TaxFreePayItem({ code: "J01", name: "보훈급여금 등", submission: false });
  /** 전직 대통령 연금 */
  static J10 = new TaxFreePayItem({ code: "J10", name: "전직 대통령 연금", submission: false });
  /** 외국주둔군 등 급여 */
  static K01 = new TaxFreePayItem({ code: "K01", name: "외국주둔군 등 급여", submission: true });
  /** 종군한 군인의 전사시 급여 */
  static L01 = new TaxFreePayItem({ code: "L01", name: "종군한 군인의 전사시 급여", submission: false });
  /** 국외근로(일반) */
  static M01 = new TaxFreePayItem({ code: "M01", name: "국외근로(일반)", monthlyLimit: 1000000, submission: true });
  /** 국외근로(원양,외항 선원) */
  static M02 = new TaxFreePayItem({ code: "M02", name: "국외근로(원양,외항 선원)", monthlyLimit: 3000000, submission: true });
  /** 국외근로(전액) */
  static M03 = new TaxFreePayItem({ code: "M03", name: "국외근로(전액)", submission: true });
  /** 국외근로(건설 근로자) */
  static M04 = new TaxFreePayItem({ code: "M04", name: "국외근로(건설 근로자)", monthlyLimit: 3000000, submission: false });
  /** 국민연금 등 회사부담금 */
  static N01 = new TaxFreePayItem({ code: "N01", name: "국민연금 등 회사부담금", submission: false });
  /** 야간근로수당 */
  static O01 = new TaxFreePayItem({ code: "O01", name: "야간근로수당", annualLimit: 2400000, submission: true });
  /** 식대 */
  static P01 = new TaxFreePayItem({ code: "P01", name: "식대", monthlyLimit: 100000, submission: false });
  /** 현물급식 */
  static P02 = new TaxFreePayItem({ code: "P02", name: "현물급식", submission: false });
  /** 육아수당 */
  static Q01 = new TaxFreePayItem({ code: "Q01", name: "육아수당", monthlyLimit: 100000, submission: true });
  /** 국군포로가 받는 보수 등 */
  static R01 = new TaxFreePayItem({ code: "R01", name: "국군포로가 받는 보수 등", submission: false });
  /** 「교육기본법」제28조제1항에 따라 받는 장학금 */
  static R10 = new TaxFreePayItem({ code: "R10", name: "「교육기본법」제28조제1항에 따라 받는 장학금", submission: true });
  /** 직무발명보상금 */
  static R11 = new TaxFreePayItem({ code: "R11", name: "직무발명보상금", annualLimit: 3000000, submission: false });
  /** 주식매수선택권 */
  static S01 = new TaxFreePayItem({ code: "S01", name: "주식매수선택권", annualLimit: 30000000, submission: true });
  /** 외국인기술자 */
  static T01 = new TaxFreePayItem({ code: "T01", name: "외국인기술자", annualLimit: 0, submission: false });
  /** 벤처기업 주식매수 선택권 행사이익 */
  static U01 = new TaxFreePayItem({ code: "U01", name: "벤처기업 주식매수 선택권 행사이익", annualLimit: 20000000, submission: false });
  /** 우리사주조합인출금(50%) */
  static Y02 = new TaxFreePayItem({ code: "Y02", name: "우리사주조합인출금(50%)", submission: true });
  /** 우리사주조합인출금(75%) */
  static Y03 = new TaxFreePayItem({ code: "Y03", name: "우리사주조합인출금(75%)", submission: true });
  /** 우리사주조합인출금(100%) */
  static Y04 = new TaxFreePayItem({ code: "Y04", name: "우리사주조합인출금(100%)", submission: false });
  /** 국립병원 등의 기피과목 전공의에게 지급하는 수련보조수당 */
  static Y22 = new TaxFreePayItem({ code: "Y22", name: "국립병원 등의 기피과목 전공의에게 지급하는 수련보조수당", submission: true });

  private static _ = TaxFreePayItem.closeEnum();

  /**
   * Code (코드)
   * - Used for GraphQL integration (GraphQL 연동에 사용됨)
   */
  public get code() {
    return this.props.code;
  }

  /**
   * Monthly limit amount (월간한도금액)
   */
  public get monthlyLimit() {
    return this.props.monthlyLimit;
  }

  /**
   * Annual limit amount (연간한도금액)
   */
  public get annualLimit() {
    return this.props.annualLimit;
  }

  /**
   * Payment statement submission status (지급명세서 제출여부)
   */
  public get submission() {
    return this.props.submission;
  }

  /**
   * Returns TaxFreePayItem constant from the code (코드로부터 TaxFreePayItem 상수를 반환한다)
   * @param c Code (코드)
   * @returns TaxFreePayItem
   */
  static fromCode(c: string) {
    const items = TaxFreePayItem.all<TaxFreePayItem>();
    return items.find((item) => item.code === c);
  }
}

interface DeductionItemProps {
  code: number;
  name: string;
  static: boolean;
  use?: boolean;
}

/**
 * Deduction Type (공제 유형)
 * - NATIONAL_PENSION : National pension service (국민연금) - 1001
 * - HEALTH : Health insurance (건강보험) - 1002
 * - LONGTERM_CARE : Long-term care insurance (장기요양보험) - 1003
 * - EMPLOYEEMANT : Employment insurance (고용보험) - 1004
 * - INCOME_TAX : income tax (소득세) - 1011
 * - LOCAL_INCOME_TAX : Local income tax (지방소득세) - 1012
 * - YEAR_END_INCOME_TAX : Year-end settlement income tax (연말정산 소득세) - 1021
 * - YEAR_END_LOCAL_INCOME_TAX : Year-end settlement local income tax (연말정산 지방소득세) - 1022
 * - REPAYMENT_STUDENT : Repayment of student (학자금상환) - 1101
 */
export class DeductionItem extends BaseType {
  private readonly props: DeductionItemProps;

  constructor(props: DeductionItemProps) {
    super(props.name);
    this.props = props;
  }

  /** National pension service (국민연금) - 1001 */
  static NATIONAL_PENSION = new DeductionItem({ code: 1001, name: "국민연금", static: true, use: true });
  /** Health insurance (건강보험) - 1002 */
  static HEALTH = new DeductionItem({ code: 1002, name: "건강보험", static: true, use: true });
  /** Long-term care insurance (장기요양보험) - 1003 */
  static LONGTERM_CARE = new DeductionItem({ code: 1003, name: "장기요양보험", static: true, use: true });
  /** Employment insurance (고용보험) - 1004 */
  static EMPLOYEEMANT = new DeductionItem({ code: 1004, name: "고용보험", static: true, use: true });
  /** Income tax (소득세) - 1011 */
  static INCOME_TAX = new DeductionItem({ code: 1011, name: "소득세", static: true, use: true });
  /** Local income tax (지방소득세) - 1012 */
  static LOCAL_INCOME_TAX = new DeductionItem({ code: 1012, name: "지방소득세", static: true, use: true });
  /** Rural special tax (농어촌특별세) - 1013 */
  static RURAL_SPECIAL_TAX = new DeductionItem({ code: 1013, name: "농어촌특별세", static: true, use: true });
  /** Year-end settlement income tax (연말정산 소득세) - 1021 */
  static YEAR_END_INCOME_TAX = new DeductionItem({ code: 1021, name: "연말정산 소득세", static: true, use: true });
  /** Year-end settlement local income tax (연말정산 지방소득세) - 1022 */
  static YEAR_END_LOCAL_INCOME_TAX = new DeductionItem({ code: 1022, name: "연말정산 지방소득세", static: true, use: true });
  /** Year-end settlement rural special tax (연말정산 농어촌특별세) - 1023 */
  static YEAR_END_RURAL_SPECIAL_TAX = new DeductionItem({ code: 1023, name: "연말정산 농어촌특별세", static: true, use: true });
  /** Intermidiate settlement income tax (중도정산 소득세) - 1031 */
  static INTERMIDIATE_INCOME_TAX = new DeductionItem({ code: 1031, name: "중도정산 소득세", static: true, use: true });
  /** Intermidiate settlement local income tax (중도정산 지방소득세) - 1032 */
  static INTERMIDIATE_LOCAL_INCOME_TAX = new DeductionItem({ code: 1032, name: "중도정산 지방소득세", static: true, use: true });
  /** Repayment of student (학자금상환) - 1101 */
  static REPAYMENT_STUDENT = new DeductionItem({ code: 1101, name: "학자금상환", static: true, use: false });

  private static _ = DeductionItem.closeEnum();

  /**
   * Code (코드)
   * - Used for GraphQL integration (GraphQL 연동에 사용됨)
   */
  public get code() {
    return this.props.code;
  }

  /**
   * Fixed status (고정여부)
   */
  public get static() {
    return this.props.static;
  }

  /**
   * Use status (사용여부)
   */
  public get use() {
    return this.props.use;
  }

  /**
   * Returns DeductionItem constant from the code (코드로부터 DeductionItem 상수를 반환한다)
   * @param v Code (코드)
   * @returns DeductionItem
   */
  static fromCode(v: number) {
    const items = DeductionItem.all<DeductionItem>();
    return items.find((item) => item.code === v);
  }
}

interface ReductionItemProps {
  code: string;
  name: string;
  rate: number;
}

/**
 * Reduction Type (감면 유형)
 */
export class ReductionItem extends BaseType {
  private readonly props: ReductionItemProps;

  constructor(props: ReductionItemProps) {
    super(props.name);
    this.props = props;
  }

  /** (50%)중소기업에 취업하는 청년에 대한 소득세 감면 */
  static T11 = new ReductionItem({ code: "T11", name: "(50%)중소기업에 취업하는 청년에 대한 소득세 감면", rate: 50, });
  /** (70%)중소기업에 취업하는 청년에 대한 소득세 감면 */
  static T12 = new ReductionItem({ code: "T12", name: "(70%)중소기업에 취업하는 청년에 대한 소득세 감면", rate: 70, });
  /** (90%)중소기업에 취업하는 청년에 대한 소득세 감면 */
  static T13 = new ReductionItem({ code: "T13", name: "(90%)중소기업에 취업하는 청년에 대한 소득세 감면", rate: 90, });

  private static _ = ReductionItem.closeEnum();

  /**
   * Code (코드)
   * - Used for GraphQL integration (GraphQL 연동에 사용됨)
   */
  public get code() {
    return this.props.code;
  }

  /**
   * Reduction rate (감면율)
   */
  public get rate() {
    return this.props.rate;
  }
  
  /**
   * Returns ReductionItem constant from the code (코드로부터 ReductionItem 상수를 반환한다)
   * @param c Code (코드)
   * @returns ReductionItem
   */
   static fromCode(c: string) {
    const items = ReductionItem.all<ReductionItem>();
    return items.find((item) => item.code === c);
  }
}

/**
 * Employee type (직원유형)
 */
export enum EmployeeType {
  /** an earned income earner (근로소득자) */
  근로소득 = 10,
  /** a daily wage earner (일용직근로소득자) */
  일용직근로 = 20,
  /** business income earner (사업소득자) */
  사업소득 = 30,
  /** other income earner (기타소득자) */
  기타소득 = 40,
}

/**
 * the qualifications required to stay (체류자격)
 * - Use enum2Entries function for select box expression
 */
export enum StayQualification {
  단기취업 = "C-4",
  교수 = "E-1",
  회화지도 = "E-2",
  연구 = "E-3",
  기술지도 = "E-4",
  전문직업 = "E-5",
  예술흥행 = "E-6",
  특정활동 = "E-7",
  계절근로 = "E-8",
  비전문취업 = "E-9",
  선원취업 = "E-10",
  거주 = "F-2",
  재외동포 = "F-4",
  결혼이민 = "F-6",
  관광취업 = "H-1",
  방문취업 = "H-2",
}

/**
 * Employee Status (직원상태)
 */
export enum EmployeeStatus {
  /** normal (정상) - 10 */
  정상 = 10,
  /** leave of absence (휴직) - 20 */
  휴직 = 20,
  /** parental leave (육아휴직) - 21 */
  육아휴직 = 21,
  /** vacation (휴가) - 30 */
  휴가 = 30,
  /** maternity leave (출산휴가) - 31 */
  출산휴가 = 31,
  /** retirement (퇴사) - 0 */
  퇴사 = 0,
}

/**
 * a dependent family relationship (부양가족관계)
 * - Use enum2Entries function for select box expression
 */
export enum DependantsRelation {
  "0.본인" = 0,
  "1.소득자의 직계존속" = 1,
  "2.배우자의 직계존속" = 2,
  "3.배우자" = 3,
  "4.직계비속(자녀+입양자)" = 4,
  "5.진계비속(4제외)" = 5,
  "6.형제자매" = 6,
  "7.수급자(1~6제외)" = 7,
  "8.위탁아동(만 18세 미만, 보오기간 연장 시 20세 이하/직접선택)" = 8,
}

/**
 * Basic Deduction (기본공제)
 * - Use enum2Entries function for select box expression
 */
export enum BasicDeduction {
  해당없음 = 0,
  본인 = 1,
  배우자 = 2,
  "20세이하" = 3,
  "60세이상" = 4,
  장애인 = 5,
  기초생활대상 = 6,
  자녀장려금대상 = 7,
}

/**
 * Types of people with disabilities (장애인 유형)
 * - Use enum2Entries function for select box expression
 */
export enum DisabledType {
  해당없음 = 0,
  장애인복지법 = 1,
  국가유공자등 = 2,
  중증환자등 = 3,
}

/**
 * Types of Childbirth Adoption (출산입양 유형)
 * - Use enum2Entries function for select box expression
 */
export enum MaternityAndAdoption {
  해당없음 = 0,
  첫째 = 1,
  둘째 = 2,
  셋째 = 3,
}

/**
 * Income type (소득유형)
 */
export enum IncomeType {
  /** Earned income (근로소득) - 10 */
  근로소득 = 10,
  /** Daily work (일용직근로) - 20 */
  일용직근로 = 20,
  /** Business income (사업소득) - 30 */
  사업소득 = 30,
  /** Other income (기타소득) - 40 */
  기타소득 = 40,
  /** Retirement income (퇴직소득) - 100 */
  퇴직소득 = 100,
  /** Year-end settlement (연말정산) - 120 */
  연말정산 = 120,
}

/**
 * Retirement income classification (퇴직소득구분)
 */
export enum RetirementType {
  /** Retirement (퇴직) - 1*/
  퇴직 = 1,
  /** Medium (중간) - 2 */
  중간 = 2,
}

/**
 * Salary report type (급여 신고유형)
 */
export enum WageReportType {
  /** Monthly (매월) - 1 */
  매월 = 1,
  /** Half-year (반기) - 6 */
  반기 = 6,
}

/**
 * Salary payment type (급여지급형태)
 */
export enum WagePaymentType {
  /** Month of the day (당월) - 1 */
  당월 = 1,
  /** Next Month (익월) - 2 */
  익월 = 2,
}

/**
 * Reduction input type (감면 입력유형)
 */
export enum ReductionInputType {
  /** Salary input (급여입력) - 1 */
  급여입력 = 1,
  /** Year-end settlement input (연말입력) - 2 */
  연말입력 = 2,
}
