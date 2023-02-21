export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
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

/** Detailed address information (상세주소 정보) */
export type AddressDetail = {
  __typename?: 'AddressDetail';
  /** administrative district code (행정구역코드) */
  bcode: Scalars['String'];
  /** name of administrative district (행정구역명) */
  bname: Scalars['String'];
  /** building code (건물코드) */
  buildingCode: Scalars['String'];
  /** building name (건물명) */
  buildingName: Scalars['String'];
  /** road name (도로명) */
  roadname: Scalars['String'];
  /** road name code (도로명코드) */
  roadnameCode: Scalars['String'];
  /** city and provincial names (시도명) */
  sido: Scalars['String'];
  /** name of city and county (시군구명) */
  sigungu: Scalars['String'];
  /** city, county, and district code (시군구코드) */
  sigunguCode: Scalars['String'];
  /** postal code (우편번호) */
  zonecode: Scalars['String'];
};

/** Detailed address information input (상세주소 정보 입력) */
export type AddressDetailInput = {
  /** administrative district code (행정구역코드) */
  bcode: Scalars['String'];
  /** name of administrative district (행정구역명) */
  bname: Scalars['String'];
  /** building code (건물코드) */
  buildingCode: Scalars['String'];
  /** building name (건물명) */
  buildingName: Scalars['String'];
  /** road name (도로명) */
  roadname: Scalars['String'];
  /** road name code (도로명코드) */
  roadnameCode: Scalars['String'];
  /** city and provincial names (시도명) */
  sido: Scalars['String'];
  /** name of city and county (시군구명) */
  sigungu: Scalars['String'];
  /** city, county, and district code (시군구코드) */
  sigunguCode: Scalars['String'];
  /** postal code (우편번호) */
  zonecode: Scalars['String'];
};

/** Authentication (인증) */
export type Authentication = {
  __typename?: 'Authentication';
  /** system error message (시스템오류메시지) */
  cause?: Maybe<Scalars['String']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** error message (오류메시지) */
  message?: Maybe<Scalars['String']>;
  /** response status (응답상태) */
  status: Scalars['Int'];
  /** successful login status (로그인 성공여부) */
  success: Scalars['Boolean'];
};

/** Authentication paginated object (인증 페이징) */
export type AuthenticationPaginatedObject = {
  __typename?: 'AuthenticationPaginatedObject';
  /** Authentication list (인증 목록) */
  datas: Array<Authentication>;
  /** page number (페이지번호) */
  page: Scalars['Int'];
  /** number of page rows (페이지행수) */
  rows: Scalars['Int'];
  /** total list count (전체목록건수) */
  totalCount: Scalars['Int'];
};

/** Bankbook (통장) */
export type Bankbook = {
  __typename?: 'Bankbook';
  /** account code (계정코드) */
  accountCode: Scalars['String'];
  /** account name (계정과목명) */
  accountName: Scalars['String'];
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** bankbook serial number (통장일련번호) */
  bankbookId: Scalars['Int'];
  /** bankbook nickname (통장별명) */
  bankbookNickname: Scalars['String'];
  /** bankbook number (통장번호) */
  bankbookNumber: Scalars['String'];
  /** bankbook classification (통장구분:법인=C/개인=P) */
  classification: Scalars['String'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** facility business serial number (시설사업일련번호) */
  facilityBusinessId: Scalars['Int'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** last scraping status of bankbook (통장의 최종스크래핑현황) */
  lastScrapingStatus?: Maybe<LastScrapingStatus>;
  /** account owner (예금주) */
  owner: Scalars['String'];
  /** display order (표시순서) */
  sort: Scalars['Int'];
  /** bank type (은행유형/금융기관) */
  type: Scalars['BankTypeScalar'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** scraping use status (스크래핑 사용여부) */
  useScrap: Scalars['Boolean'];
  /** use of bankbook (통장용도) */
  useType: Scalars['Int'];
};

/** Bankbook registration input (통장 등록 입력) */
export type BankbookCreateInput = {
  /** account code (계정코드) */
  accountCode: Scalars['String'];
  /** account name (계정과목명) */
  accountName: Scalars['String'];
  /** bankbook nickname (통장별명) */
  bankbookNickname: Scalars['String'];
  /** bankbook number (통장번호) */
  bankbookNumber: Scalars['String'];
  /** bankbook classification (통장구분:법인=C/개인=P) */
  classification: Scalars['String'];
  /** account owner (예금주) */
  owner: Scalars['String'];
  /** display order (표시순서) */
  sort: Scalars['Int'];
  /** bank type (은행유형/금융기관) */
  type: Scalars['BankTypeScalar'];
  /** scraping use status (스크래핑 사용여부) */
  useScrap: Scalars['Boolean'];
  /** use of bankbook (통장용도) */
  useType: Scalars['Int'];
};

/** Bankbook change history (통장 변경이력) */
export type BankbookLog = {
  __typename?: 'BankbookLog';
  /** account code (계정코드) */
  accountCode: Scalars['String'];
  /** account name (계정과목명) */
  accountName: Scalars['String'];
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** bankbook serial number (통장일련번호) */
  bankbookId: Scalars['Int'];
  /** bankbook nickname (통장별명) */
  bankbookNickname: Scalars['String'];
  /** bankbook number (통장번호) */
  bankbookNumber: Scalars['String'];
  /** bankbook classification (통장구분:법인=C/개인=P) */
  classification: Scalars['String'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** encrypted scraping Information (암호화된 스크래핑정보) */
  encScrapInfo?: Maybe<Scalars['String']>;
  /** facility business serial number (시설사업일련번호) */
  facilityBusinessId: Scalars['Int'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** account owner (예금주) */
  owner: Scalars['String'];
  /** remarks (비고) */
  remark: Scalars['String'];
  /** display order (표시순서) */
  sort: Scalars['Int'];
  /** bank type (은행유형/금융기관) */
  type: Scalars['BankTypeScalar'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** use of bankbook (통장용도) */
  useType: Scalars['Int'];
};

/** Bankbook change display order (통장 순서변경) */
export type BankbookReorderInput = {
  /** bankbook serial number (통장일련번호) */
  bankbookId: Scalars['Int'];
  /** display order (표시순서) */
  sort: Scalars['Float'];
};

/** Bankbook correction input (통장 수정 입력) */
export type BankbookUpdateInput = {
  /** bankbook nickname (통장별명) */
  bankbookNickname: Scalars['String'];
  /** account owner (예금주) */
  owner: Scalars['String'];
  /** scraping use status (스크래핑 사용여부) */
  useScrap: Scalars['Boolean'];
  /** use of bankbook (통장용도) */
  useType: Scalars['Int'];
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

/** Calculation of deferred retirement income tax amount input (이연퇴직소득세액계산 입력) */
export type CalculationOfDeferredRetirementIncomeTaxInput = {
  /** Pension account deposit details list (연금계좌입금명세목록) */
  statements: Array<StatementOfPensionAccountDepositInput>;
  /** total account deposit amount (계좌입금금액합계) */
  totalAmount: Scalars['Int'];
};

/** Client (거래처) */
export type Client = {
  __typename?: 'Client';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** business registration number (사업자등록번호) */
  bizNumber?: Maybe<Scalars['String']>;
  /** client serial number (거래처일련번호) */
  clientId: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** client name (거러처명) */
  name: Scalars['String'];
  /** contact phone number (연락처) */
  phone?: Maybe<Scalars['String']>;
  /** representative name (대표자 이름) */
  presidentName?: Maybe<Scalars['String']>;
  /** decrypted resident registration number (주민등록번호) */
  residentId?: Maybe<Scalars['String']>;
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** use status (이용여부) */
  use: Scalars['Boolean'];
};

/** Client input (거래처 입력) */
export type ClientInput = {
  /** business registration number (사업자등록번호) */
  bizNumber?: InputMaybe<Scalars['String']>;
  /** client name (거러처명) */
  name: Scalars['String'];
  /** contact phone number (연락처) */
  phone?: InputMaybe<Scalars['String']>;
  /** representative name (대표자 이름) */
  presidentName?: InputMaybe<Scalars['String']>;
  /** resident registration number (주민등록번호) */
  residentId?: InputMaybe<Scalars['String']>;
  /** use status (이용여부) */
  use: Scalars['Boolean'];
};

/** Client change history (거래처 변경이력) */
export type ClientLog = {
  __typename?: 'ClientLog';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** business registration number (사업자등록번호) */
  bizNumber?: Maybe<Scalars['String']>;
  /** client serial number (거래처일련번호) */
  clientId: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** client name (거러처명) */
  name: Scalars['String'];
  /** contact phone number (연락처) */
  phone?: Maybe<Scalars['String']>;
  /** representative name (대표자 이름) */
  presidentName?: Maybe<Scalars['String']>;
  /** remarks (비고) */
  remark: Scalars['String'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** use status (이용여부) */
  use: Scalars['Boolean'];
};

/** Client paginated object (거래처 페이징) */
export type ClientPaginatedObject = {
  __typename?: 'ClientPaginatedObject';
  /** Client list (거래처 목록) */
  datas: Array<Client>;
  /** page number (페이지번호) */
  page: Scalars['Int'];
  /** number of page rows (페이지행수) */
  rows: Scalars['Int'];
  /** total list count (전체목록건수) */
  totalCount: Scalars['Int'];
};

/** Client search filter (거래처 검색 필터) */
export type ClientSearchFilter = {
  /** include non use (이용중지포함여부) */
  includeNonUse: Scalars['Boolean'];
  /** client name (거러처명) */
  name?: InputMaybe<Scalars['String']>;
  /** page number (페이지번호) */
  page?: InputMaybe<Scalars['Int']>;
  /** contact phone number (연락처) */
  phone?: InputMaybe<Scalars['String']>;
  /** representative name (대표자 이름) */
  presidentName?: InputMaybe<Scalars['String']>;
  /** number of page rows (페이지행수) */
  rows: Scalars['Int'];
};

/** Sales representative summary information (영업자요약정보) */
export type CompactSalesRepresentative = {
  __typename?: 'CompactSalesRepresentative';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** sales representative code (영업자코드) */
  code: Scalars['String'];
  /** sales representative serial number (영업자일련번호) */
  id: Scalars['Int'];
  /** sales representative name (영업자명) */
  name: Scalars['String'];
};

/** User summary information (회원요약정보) */
export type CompactUser = {
  __typename?: 'CompactUser';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** user serial number (회원일련번호) */
  id: Scalars['Int'];
  /** name (이름) */
  name: Scalars['String'];
  /** user type (사용자유형) */
  type: Scalars['String'];
  /** login ID (로그인아이디) */
  username: Scalars['String'];
};

/** Company (사업자) */
export type Company = {
  __typename?: 'Company';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company address (주소) */
  address: Scalars['String'];
  /** business registration number (사업자등록번호) */
  bizNumber: Scalars['String'];
  /** type of business (사업자유형) */
  bizType: Scalars['BizTypeScalar'];
  /** Cancellation date (해지일자) */
  canceledAt?: Maybe<Scalars['DateScalar']>;
  /** company code (시업자코드) */
  code: Scalars['String'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** Company / Extend information (사업자/확장정보) */
  extendInfo: CompanyExtendInfo;
  /** company serial number (사업자일련번호) */
  id: Scalars['Int'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** company name (상호) */
  name: Scalars['String'];
  /** contact phone number (연락전화번호) */
  phone: Scalars['String'];
  /** representative mobile phone number (대표자 핸드폰번호) */
  presidentMobilePhone: Scalars['String'];
  /** representative name (대표자 이름) */
  presidentName: Scalars['String'];
  /** decrypted corporate registration number / resident registration number (법인등록번호/주민등록번호) */
  residentId: Scalars['String'];
  /** Seal file (직인 파일) */
  seal?: Maybe<FileStorage>;
  /** seal file storage serial number (직인 파일저장일련번호) */
  sealFileStorageId?: Maybe<Scalars['Int']>;
  /** Number of months unpaid (미납월수) */
  unpaidMonths?: Maybe<Scalars['Int']>;
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Company / Accounting facility business (사업자/회계시설사업) */
export type CompanyAccountingFacilityBusiness = {
  __typename?: 'CompanyAccountingFacilityBusiness';
  /** the number of quota (정원수/명) */
  capacity: Scalars['Int'];
  /** Type of facility business (시설사업유형) */
  facilityBizType: Scalars['FacilityBizTypeScalar'];
  /** facility business serial number (시설사업일련번호) */
  facilityBusinessId: Scalars['Int'];
  /** long-term care institution number (장기요양기관번호) */
  longTermCareInstitutionNumber: Scalars['String'];
  /** facility business name (시설사업명) */
  name: Scalars['String'];
  /** Company / Withholding use service option list (사업자/원천이용서비스옵션 목록) */
  options: Array<CompanyAccountingUsedServiceOption>;
  /** basic fee (기본이용료) */
  price: Scalars['Int'];
  /** Long-term care institution registration certificate file (장기요양기관등록증 파일) */
  registrationCard?: Maybe<FileStorage>;
  /** long-term care institution registration certificate file storage serial number (장기요양기관등록증 파일저장일련번호) */
  registrationCardFileStorageId?: Maybe<Scalars['Int']>;
  /** start year/month / YYYYMM (시작연월) */
  startYearMonth: Scalars['Int'];
};

/** Company / Accounting use service options (사업자/회계이용서비스옵션) */
export type CompanyAccountingUsedServiceOption = {
  __typename?: 'CompanyAccountingUsedServiceOption';
  /** Accounting additional service (회계부가서비스) */
  accountingServiceType: Scalars['AccountingAdditionalServiceTypeScalar'];
  /** fee for use (이용료) */
  price: Scalars['Int'];
};

/** Company / Accounting use service options input (사업자/회계이용서비스옵션 입력) */
export type CompanyAccountingUsedServiceOptionInput = {
  /** Accounting additional service (회계부가서비스) */
  accountingServiceType: Scalars['AccountingAdditionalServiceTypeScalar'];
  /** fee for use (이용료) */
  price: Scalars['Int'];
};

/** Company address information (사업자주소정보) */
export type CompanyAddressInfo = {
  __typename?: 'CompanyAddressInfo';
  /** address (주소) */
  address: Scalars['String'];
  /** extended address (확장주소) */
  addressExtend: Scalars['String'];
  /** statutory dong code (법정동코드) */
  bcode: Scalars['String'];
  /** road name address (도로명주소) */
  roadAddress: Scalars['String'];
  /** postal code (우편번호) */
  zipcode: Scalars['String'];
};

/** Automatically create company seal preview (사업자 자동생성 직인 미리보기) */
export type CompanyAutoGeneratedSealPreview = {
  __typename?: 'CompanyAutoGeneratedSealPreview';
  /** company name (상호) */
  name: Scalars['String'];
  /** seal information expressed as base64 (base64로 표현된 직인정보) */
  seal: Scalars['String'];
  /** content type (유형) */
  type: Scalars['String'];
};

/** Company / CMS account information (사업자/CMS계좌정보) */
export type CompanyCmsBank = {
  __typename?: 'CompanyCmsBank';
  /** withdrawal account number (출금계좌번호) */
  accountNumber: Scalars['String'];
  /** bank (은행) */
  bankType: Scalars['BankTypeScalar'];
  /** account business registration number (계좌사업자번호) */
  ownerBizNumber: Scalars['String'];
  /** withdrawal account holder name (출금계좌주명) */
  ownerName: Scalars['String'];
  /** withdrawal date (출금일) */
  withdrawDay: Scalars['String'];
};

/** Company / CMS account information input (사업자/CMS계좌정보 입력) */
export type CompanyCmsBankInput = {
  /** withdrawal account number (출금계좌번호) */
  accountNumber: Scalars['String'];
  /** bank (은행) */
  bankType: Scalars['BankTypeScalar'];
  /** account business registration number (계좌사업자번호) */
  ownerBizNumber: Scalars['String'];
  /** withdrawal account holder name (출금계좌주명) */
  ownerName: Scalars['String'];
  /** withdrawal date (출금일) */
  withdrawDay: Scalars['String'];
};

/** Company / Details (사업자/상세정보) */
export type CompanyDetail = {
  __typename?: 'CompanyDetail';
  /** detailed address (상세주소) */
  addressDetail: AddressDetail;
  /** extended address (확장주소) */
  addressExtend: Scalars['String'];
  /** fax (팩스) */
  fax?: Maybe<Scalars['String']>;
  /** land number address (지번주소) */
  jibunAddress: Scalars['String'];
  /** Business license file (사업자등록증 파일) */
  license?: Maybe<FileStorage>;
  /** business license file storage serial number (사업자등록증 파일저장일련번호) */
  licenseFileStorageId?: Maybe<Scalars['Int']>;
  /** company name (상호) */
  name: Scalars['String'];
  /** contact phone number (연락전화번호) */
  phone: Scalars['String'];
  /** road name address (도로명주소) */
  roadAddress: Scalars['String'];
  /** postal code (우편번호) */
  zipcode: Scalars['String'];
};

/** Company / Details input (사업자/상세정보 입력) */
export type CompanyDetailInput = {
  /** detailed address (상세주소) */
  addressDetail: AddressDetailInput;
  /** extended address (확장주소) */
  addressExtend: Scalars['String'];
  /** fax (팩스) */
  fax?: InputMaybe<Scalars['String']>;
  /** land number address (지번주소) */
  jibunAddress: Scalars['String'];
  /** business license file storage serial number (사업자등록증 파일저장일련번호) */
  licenseFileStorageId?: InputMaybe<Scalars['Int']>;
  /** company name (상호) */
  name: Scalars['String'];
  /** contact phone number (연락전화번호) */
  phone: Scalars['String'];
  /** road name address (도로명주소) */
  roadAddress: Scalars['String'];
  /** postal code (우편번호) */
  zipcode: Scalars['String'];
};

/** Company / Extend information (사업자/확장정보) */
export type CompanyExtendInfo = {
  __typename?: 'CompanyExtendInfo';
  /** Company / CMS account information (사업자/CMS계좌정보) */
  cmsBank: CompanyCmsBank;
  /** Company / Details (사업자/상세정보) */
  detail: CompanyDetail;
  /** Company / Representative information (사업자/대표자정보) */
  president: CompanyPresident;
};

/** Company / Extra information input (사업자/기타정보 입력) */
export type CompanyExtraInput = {
  /** user serial number of the manager in charge (담당매니저 회원일련번호) */
  manageUserId?: InputMaybe<Scalars['Int']>;
  /** sales representative serial number (영업자일련번호) */
  salesRepresentativeId: Scalars['Int'];
};

/** Company / Accounting facility business input (사업자/회계시설사업 입력) */
export type CompanyFacilityBusinessInput = {
  /** the number of quota (정원수/명) */
  capacity: Scalars['Int'];
  /** Type of facility business (시설사업유형) */
  facilityBizType: Scalars['FacilityBizTypeScalar'];
  /** facility business serial number (시설사업일련번호) */
  facilityBusinessId: Scalars['Int'];
  /** long-term care institution number (장기요양기관번호) */
  longTermCareInstitutionNumber: Scalars['String'];
  /** facility business name (시설사업명) */
  name: Scalars['String'];
  /** Company / Withholding use service option list (사업자/원천이용서비스옵션 목록) */
  options: Array<CompanyAccountingUsedServiceOptionInput>;
  /** basic fee (기본이용료) */
  price: Scalars['Int'];
  /** long-term care institution registration certificate file storage serial number (장기요양기관등록증 파일저장일련번호) */
  registrationCardFileStorageId?: InputMaybe<Scalars['Int']>;
  /** start year/month / YYYYMM (시작연월) */
  startYearMonth: Scalars['Int'];
};

/** Company change history (사업자 변경이력) */
export type CompanyLog = {
  __typename?: 'CompanyLog';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company address (주소) */
  address: Scalars['String'];
  /** business registration number (사업자등록번호) */
  bizNumber: Scalars['String'];
  /** type of business (사업자유형) */
  bizType: Scalars['BizTypeScalar'];
  /** company code (시업자코드) */
  code: Scalars['String'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** Company / Extend information (사업자/확장정보) */
  extendInfo: CompanyExtendInfo;
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** company name (상호) */
  name: Scalars['String'];
  /** contact phone number (연락전화번호) */
  phone: Scalars['String'];
  /** representative mobile phone number (대표자 핸드폰번호) */
  presidentMobilePhone: Scalars['String'];
  /** representative name (대표자 이름) */
  presidentName: Scalars['String'];
  /** remarks (비고) */
  remark: Scalars['String'];
  /** seal file storage serial number (직인 파일저장일련번호) */
  sealFileStorageId?: Maybe<Scalars['Int']>;
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Company management memo (사업자관리메모) */
export type CompanyManageMemo = {
  __typename?: 'CompanyManageMemo';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** memo (메모글) */
  memo: Scalars['String'];
  /** memo serial number (메모일련번호) */
  memoId: Scalars['Int'];
  /** author name (작성자명) */
  ownerName: Scalars['String'];
  /** author's user serial number (작성자 회원일련번호) */
  ownerUserId: Scalars['Int'];
  /** author login ID (작성자 로그인아이디) */
  ownerUsername: Scalars['String'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Company / Representative information (사업자/대표자정보) */
export type CompanyPresident = {
  __typename?: 'CompanyPresident';
  /** birthday / YYMMDD (생년월일) */
  birthday: Scalars['String'];
  /** email (이메일) */
  email: Scalars['String'];
  /** mobile phone number (휴대폰번호) */
  mobilePhone: Scalars['String'];
  /** name (성명) */
  name: Scalars['String'];
};

/** Company / Representative information input (사업자/대표자정보 입력) */
export type CompanyPresidentInput = {
  /** birthday / YYMMDD (생년월일) */
  birthday: Scalars['String'];
  /** email (이메일) */
  email: Scalars['String'];
  /** mobile phone number (휴대폰번호) */
  mobilePhone: Scalars['String'];
  /** name (성명) */
  name: Scalars['String'];
};

/** Company service contract (사업자서비스계약) */
export type CompanyServiceContract = {
  __typename?: 'CompanyServiceContract';
  /** accounting service charge (회계서비스이용료) */
  accountingPrice: Scalars['Int'];
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** Sales representative summary information (영업자요약정보) */
  compactSalesRepresentative: CompactSalesRepresentative;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** Company / Accounting / Facility business list (사업자/회계/시설사업 목록) */
  facilityBusinesses: Array<FacilityBusiness>;
  /** company serial number (사업자일련번호) */
  id: Scalars['Int'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** User summary information of the manager in charge (담당매니저 회원요약정보) */
  manageCompactUser?: Maybe<CompactUser>;
  /** management start date / YYYYMMDD (관리사작일) */
  manageStartDate?: Maybe<Scalars['Int']>;
  /** user serial number of the manager in charge (담당매니저 회원일련번호) */
  manageUserId?: Maybe<Scalars['Int']>;
  /** sales representative serial number (영업자일련번호) */
  salesRepresentativeId: Scalars['Int'];
  /** service charge (서비스이용료) */
  servicePrice: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** use of accounting service (회계서비스 이용여부) */
  usedAccounting: Scalars['Boolean'];
  /** number of accounting service facility businesses in use (이용중인 회계서비스 시설사업수) */
  usedAccountingCount: Scalars['Int'];
  /** Company / Service information for use (사업자/이용서비스정보) */
  usedServiceInfo: CompanyUsedServiceInfo;
  /** use of withholding service (원천서비스 이용여부) */
  usedWithholding: Scalars['Boolean'];
  /** Company / Withholding (사업자/원천) */
  withholding?: Maybe<CompanyWithholding>;
  /** withholding service charge (원천서비스이용료) */
  withholdingPrice: Scalars['Int'];
};

/** Company service contract change history (사업자서비스계약 변경이력) */
export type CompanyServiceContractLog = {
  __typename?: 'CompanyServiceContractLog';
  /** accounting service charge (회계서비스이용료) */
  accountingPrice: Scalars['Int'];
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** management start date / YYYYMMDD (관리사작일) */
  manageStartDate?: Maybe<Scalars['Int']>;
  /** user serial number of the manager in charge (담당매니저 회원일련번호) */
  manageUserId?: Maybe<Scalars['Int']>;
  /** remarks (비고) */
  remark: Scalars['String'];
  /** sales representative serial number (영업자일련번호) */
  salesRepresentativeId: Scalars['Int'];
  /** service charge (서비스이용료) */
  servicePrice: Scalars['Int'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** number of accounting service facility businesses in use (이용중인 회계서비스 시설사업수) */
  usedAccountingCount: Scalars['Int'];
  /** Company / Service information for use (사업자/이용서비스정보) */
  usedServiceInfo: CompanyUsedServiceInfo;
  /** use of withholding service (원천서비스 이용여부) */
  usedWithholding: Scalars['Boolean'];
  /** withholding service charge (원천서비스이용료) */
  withholdingPrice: Scalars['Int'];
};

/** Company service contract management memo (사업자서비스계약관리메모) */
export type CompanyServiceContractManageMemo = {
  __typename?: 'CompanyServiceContractManageMemo';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** memo (메모글) */
  memo: Scalars['String'];
  /** memo serial number (메모일련번호) */
  memoId: Scalars['Int'];
  /** author name (작성자명) */
  ownerName: Scalars['String'];
  /** author's user serial number (작성자 회원일련번호) */
  ownerUserId: Scalars['Int'];
  /** author login ID (작성자 로그인아이디) */
  ownerUsername: Scalars['String'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Company / Service information for use (사업자/이용서비스정보) */
export type CompanyUsedServiceInfo = {
  __typename?: 'CompanyUsedServiceInfo';
  /** Company / Accounting facility business list (사업자/회계시설사업 목록) */
  accounting?: Maybe<Array<CompanyAccountingFacilityBusiness>>;
  /** accounting service fee (회계서비스이용료) */
  accountingPrice: Scalars['Int'];
  /** total fee (총이용료) */
  totalPrice: Scalars['Int'];
  /** Company / Withholding information (사업자/원천정보) */
  withholding?: Maybe<CompanyWithholdingInfo>;
  /** withholding service fee (원천서비스이용료) */
  withholdingPrice: Scalars['Int'];
};

/** Company / Service information for use input (사업자/이용서비스정보 입력) */
export type CompanyUsedServiceInfoInput = {
  /** Company / Accounting facility business list (사업자/회계시설사업 목록) */
  accounting?: InputMaybe<Array<CompanyFacilityBusinessInput>>;
  /** accounting service fee (회계서비스이용료) */
  accountingPrice: Scalars['Int'];
  /** total fee (총이용료) */
  totalPrice: Scalars['Int'];
  /** use of accounting service (회계서비스 이용여부) */
  usedAccounting: Scalars['Boolean'];
  /** use of withholding service (원천서비스 이용여부) */
  usedWithholding: Scalars['Boolean'];
  /** Company / Withholding information (사업자/원천정보) */
  withholding?: InputMaybe<CompanyWithholdingInfoInput>;
  /** withholding service fee (원천서비스이용료) */
  withholdingPrice: Scalars['Int'];
};

/** Company user generation input (이용자생성 입력) */
export type CompanyUserCreateInput = {
  /** presence of accounting role (회계업무역할 유무) */
  accountingRole: Scalars['Boolean'];
  /** email (이메일) */
  email: Scalars['String'];
  /** facility business serial number list (시설사업일련번호 목록) */
  facilityBusinessIds: Array<Scalars['Int']>;
  /** mobile phone number (휴대폰) */
  mobilePhone: Scalars['String'];
  /** name (이름) */
  name: Scalars['String'];
  /** login ID (로그인아이디) */
  username: Scalars['String'];
  /** presence of withholding role (원천업무역할 유무) */
  withholdingRole: Scalars['Boolean'];
};

/** Company user correction input (이용자수정 입력) */
export type CompanyUserUpdateInput = {
  /** presence of accounting role (회계업무역할 유무) */
  accountingRole: Scalars['Boolean'];
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** email (이메일) */
  email: Scalars['String'];
  /** facility business serial number list (시설사업일련번호 목록) */
  facilityBusinessIds: Array<Scalars['Int']>;
  /** mobile phone number (휴대폰) */
  mobilePhone: Scalars['String'];
  /** name (이름) */
  name: Scalars['String'];
  /** presence of withholding role (원천업무역할 유무) */
  withholdingRole: Scalars['Boolean'];
};

/** Company user view (사업자회원뷰) */
export type CompanyUserView = {
  __typename?: 'CompanyUserView';
  /** accounting role (회계업무역할) */
  accountingRole: Scalars['Boolean'];
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** 회계/시설사업목록 */
  facilityBusinesses: Array<FacilityBusiness>;
  /** user serial number (회원일련번호) */
  id: Scalars['Int'];
  /** name (이름) */
  name: Scalars['String'];
  /** login ID (로그인아이디) */
  username: Scalars['String'];
  /** withholding role (원천업무역할) */
  withholdingRole: Scalars['Boolean'];
};

/** Company user view paginated object (사업자회원뷰 페이징) */
export type CompanyUserViewPaginatedObject = {
  __typename?: 'CompanyUserViewPaginatedObject';
  /** Company user view list (사업자회원뷰 목록) */
  datas: Array<CompanyUserView>;
  /** page number (페이지번호) */
  page: Scalars['Int'];
  /** number of page rows (페이지행수) */
  rows: Scalars['Int'];
  /** total list count (전체목록건수) */
  totalCount: Scalars['Int'];
};

/** Company view (사업자뷰) */
export type CompanyView = {
  __typename?: 'CompanyView';
  /** use status (이용여부) */
  active: Scalars['Boolean'];
  /** company address (주소) */
  address: Scalars['String'];
  /** Cancellation date (해지일자) */
  canceledAt?: Maybe<Scalars['DateScalar']>;
  /** company code (사업자코드) */
  code: Scalars['String'];
  /** Sales representative summary information (영업자요약정보) */
  compactSalesRepresentative: CompactSalesRepresentative;
  /** company serial number (사업자일련번호) */
  id: Scalars['Int'];
  /** User summary information of the manager in charge (담당매니저 회원요약정보) */
  manageCompactUser?: Maybe<CompactUser>;
  /** management start date / YYYYMMDD (관리사작일) */
  manageStartDate?: Maybe<Scalars['Int']>;
  /** company name (상호) */
  name: Scalars['String'];
  /** contact phone number (연락처) */
  phone: Scalars['String'];
  /** representative's mobile phone (대표자휴대폰) */
  presidentMobilePhone: Scalars['String'];
  /** representative (대표자) */
  presidentName: Scalars['String'];
  /** service charge (서비스이용료) */
  servicePrice: Scalars['Int'];
  /** Number of months unpaid (미납월수) */
  unpaidMonths?: Maybe<Scalars['Int']>;
  /** use of accounting service (회계서비스 이용여부) */
  usedAccounting: Scalars['Boolean'];
  /** number of accounting service facility businesses in use (이용중인 회계서비스 시설사업수) */
  usedAccountingCount: Scalars['Int'];
  /** use of withholding service (원천서비스 이용여부) */
  usedWithholding: Scalars['Boolean'];
};

/** Company view paginated object (사업자뷰 페이징) */
export type CompanyViewPaginatedObject = {
  __typename?: 'CompanyViewPaginatedObject';
  /** Company view list (사업자뷰 목록) */
  datas: Array<CompanyView>;
  /** page number (페이지번호) */
  page: Scalars['Int'];
  /** number of page rows (페이지행수) */
  rows: Scalars['Int'];
  /** total list count (전체목록건수) */
  totalCount: Scalars['Int'];
};

/** Company view search filter (사업자뷰 검색 필터) */
export type CompanyViewSearchFilter = {
  /** company address (주소) */
  address?: InputMaybe<Scalars['String']>;
  /** company code (사업자코드) */
  code?: InputMaybe<Scalars['String']>;
  /** exclude termination (해지제외) */
  excludeCancel: Scalars['Boolean'];
  /** user serial number of the manager in charge (담당매니저 회원일련번호) */
  manageUserId?: InputMaybe<Scalars['Int']>;
  /** company name (상호) */
  name?: InputMaybe<Scalars['String']>;
  /** page number (페이지번호) */
  page?: InputMaybe<Scalars['Int']>;
  /** representative (대표자) */
  presidentName?: InputMaybe<Scalars['String']>;
  /** number of page rows (페이지행수) */
  rows: Scalars['Int'];
  /** sales representative serial number (영업자일련번호) */
  salesRepresentativeId?: InputMaybe<Scalars['Int']>;
  /** use of accounting service (회계서비스 이용여부) */
  usedAccounting?: InputMaybe<Scalars['Boolean']>;
  /** use of withholding service (원천서비스 이용여부) */
  usedWithholding?: InputMaybe<Scalars['Boolean']>;
};

/** Company / Withholding (사업자/원천) */
export type CompanyWithholding = {
  __typename?: 'CompanyWithholding';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** number of employees (직원수) */
  capacity: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** fee for use (이용료) */
  price: Scalars['Int'];
  /** start year/month / YYYYMM (시작연월) */
  startYearMonth: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Company / Withholding information (사업자/원천정보) */
export type CompanyWithholdingInfo = {
  __typename?: 'CompanyWithholdingInfo';
  /** number of employees (직원수) */
  capacity: Scalars['Int'];
  /** Company / Withholding use service option list (사업자/원천이용서비스옵션 목록) */
  options: Array<CompanyWithholdingUsedServiceOption>;
  /** basic fee (기본이용료) */
  price: Scalars['Int'];
  /** start year/month / YYYYMM (시작연월) */
  startYearMonth: Scalars['Int'];
};

/** Company / Withholding information input (사업자/원천정보 입력) */
export type CompanyWithholdingInfoInput = {
  /** number of employees (직원수) */
  capacity: Scalars['Int'];
  /** Company / Withholding use service option list (사업자/원천이용서비스옵션 목록) */
  options: Array<CompanyWithholdingUsedServiceOptionInput>;
  /** basic fee (기본이용료) */
  price: Scalars['Int'];
  /** start year/month / YYYYMM (시작연월) */
  startYearMonth: Scalars['Int'];
};

/** Company / Withholding use service options (사업자/원천이용서비스옵션) */
export type CompanyWithholdingUsedServiceOption = {
  __typename?: 'CompanyWithholdingUsedServiceOption';
  /** fee for use (이용료) */
  price: Scalars['Int'];
  /** Withholding additional service (원천부가서비스) */
  withholdingServiceType: Scalars['WithholdingAdditionalServiceTypeScalar'];
};

/** Company / Withholding use service options input (사업자/원천이용서비스옵션 입력) */
export type CompanyWithholdingUsedServiceOptionInput = {
  /** fee for use (이용료) */
  price: Scalars['Int'];
  /** Withholding additional service (원천부가서비스) */
  withholdingServiceType: Scalars['WithholdingAdditionalServiceTypeScalar'];
};

/** Statutory dong code - Tax office information (법정동코드-세무서정보) */
export type CompetentTaxOfficeLegalDong = {
  __typename?: 'CompetentTaxOfficeLegalDong';
  /** metropolitan city/province (광역시/도) */
  address1: Scalars['String'];
  /** city/district/county (시/구/군) */
  address2: Scalars['String'];
  /** town (읍/면/동) */
  address3: Scalars['String'];
  /** rural area (리) */
  address4?: Maybe<Scalars['String']>;
  /** statutory dong code (법정동코드) */
  bcode: Scalars['String'];
  /** local income tax payment area (지방소득납세지) */
  localIncomeTaxArea: Scalars['String'];
  /** tax office code (세무서코드) */
  taxOfficeCode: Scalars['String'];
  /** tax office name (세무서명) */
  taxOfficeName: Scalars['String'];
};

/** Payment details / deductible source tax amount (납부명세/차감원천징수세액) */
export type DeductibleWithholdingTax = {
  __typename?: 'DeductibleWithholdingTax';
  /** income tax (소득세) */
  incomeTax: Scalars['Int'];
  /** local income tax (지방소득세) */
  localIncomeTax: Scalars['Int'];
};

/** Deduction item input (공제항목 입력) */
export type DeductionItemInput = {
  /** amount (금액) */
  amount: Scalars['Int'];
  /** item code (항목코드) */
  itemCode: Scalars['Int'];
};

/** Electronic Filing (전자신고) */
export type ElectronicFiling = {
  __typename?: 'ElectronicFiling';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** cause of production failure (제작실패원인) */
  causeOfProductionFailure?: Maybe<Scalars['String']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** electronic filing serial number (전자신고일련번호) */
  electronicFilingId: Scalars['Int'];
  /** File Storage of electronic filing (전자신고 파일저장소) */
  fileStorage?: Maybe<FileStorage>;
  /** electronic filing file storage serial number (전자신고 파일저장일련번호) */
  fileStorageId?: Maybe<Scalars['Int']>;
  /** imputed month (귀속월) */
  imputedMonth?: Maybe<Scalars['Int']>;
  /** imputed year (귀속연도) */
  imputedYear?: Maybe<Scalars['Int']>;
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** payment half-year period (지급반기) : 상반기(1), 하반기(2) */
  paymentHalfYear?: Maybe<Scalars['Int']>;
  /** payment month (지급월) */
  paymentMonth?: Maybe<Scalars['Int']>;
  /** payment year (지급연도) */
  paymentYear?: Maybe<Scalars['Int']>;
  /** production complete date (제작완료일) */
  productionCompletedAt?: Maybe<Scalars['DateScalar']>;
  /** production request user serial number (제작요청 회원일련번호) */
  productionRequestUserId: Scalars['Int'];
  /** production request date (제작요청일) */
  productionRequestedAt: Scalars['DateScalar'];
  /** production start date (제작시작일) */
  productionStartedAt?: Maybe<Scalars['DateScalar']>;
  /** electronic filing production status (전자신고제작상태) */
  productionStatus: Scalars['Int'];
  /** reporting type (신고유형/주기) */
  reportType?: Maybe<Scalars['Int']>;
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** type of withholding tax electronic filing (원천세 전자신고 유형) : 정기(1), 수정(2), 기한후(3) */
  withholdingTaxType?: Maybe<Scalars['Int']>;
};

/** Electronic filing for company / imputed year key input (전자신고를 위한 사업자/귀속연도 키 입력) */
export type ElectronicFilingCompanyImputedYearKeyInput = {
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
};

/** Electronic filing for company / payment half-year key input (전자신고를 위한 사업자/지급반기 키 입력) */
export type ElectronicFilingCompanyPaymentHalfYearKeyInput = {
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** payment half-year period (지급반기) : 상반기(1), 하반기(2) */
  paymentHalfYear: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
};

/** Electronic filing for company / payment month key input (전자신고를 위한 사업자/지급월 키 입력) */
export type ElectronicFilingCompanyPaymentMonthKeyInput = {
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
};

/** Electronic filing file creation search filter (전자신고 파일제작 검색 필터) */
export type ElectronicFilingFileSearchFilter = {
  /** user serial number of the manager in charge (담당매니저 회원일련번호) */
  manageUserId?: InputMaybe<Scalars['Int']>;
  /** electronic filing production status list (전자신고제작상태 목록) */
  productionStatuses?: InputMaybe<Array<Scalars['Int']>>;
  /** production request finish date [YYYYMMDD] (제작요청종료일) */
  requesteFinishDate: Scalars['Int'];
  /** production request start date [YYYYMMDD] (제작요청시작일) */
  requesteStartDate: Scalars['Int'];
  /** electronic filing type (전자신고유형) */
  type: Scalars['Int'];
};

/** Business income payment statement electronic filing search filter (거주자사업소득지급명세서 전자신고 검색 필터) */
export type ElectronicFilingIncomeBusinessPaymentStatementSearchFilter = {
  /** before production (제작전) */
  beforeProduction: Scalars['Boolean'];
  /** company code (사업자코드) */
  companyCode?: InputMaybe<Scalars['String']>;
  /** company name (상호) */
  companyName?: InputMaybe<Scalars['String']>;
  /** exclude termination (해지제외) */
  excludeCancel: Scalars['Boolean'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** user serial number of the manager in charge (담당매니저 회원일련번호) */
  manageUserId?: InputMaybe<Scalars['Int']>;
  /** electronic filing production status list (전자신고제작상태 목록) */
  productionStatuses?: InputMaybe<Array<Scalars['Int']>>;
  /** sales representative serial number (영업자일련번호) */
  salesRepresentativeId?: InputMaybe<Scalars['Int']>;
};

/** Business income simplified payment statement electronic filing search filter (거주자사업소득간이지급명세서 전자신고 검색 필터) */
export type ElectronicFilingIncomeBusinessSimplifiedPaymentStatementSearchFilter = {
  /** before production (제작전) */
  beforeProduction: Scalars['Boolean'];
  /** company code (사업자코드) */
  companyCode?: InputMaybe<Scalars['String']>;
  /** company name (상호) */
  companyName?: InputMaybe<Scalars['String']>;
  /** exclude termination (해지제외) */
  excludeCancel: Scalars['Boolean'];
  /** user serial number of the manager in charge (담당매니저 회원일련번호) */
  manageUserId?: InputMaybe<Scalars['Int']>;
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** electronic filing production status list (전자신고제작상태 목록) */
  productionStatuses?: InputMaybe<Array<Scalars['Int']>>;
  /** sales representative serial number (영업자일련번호) */
  salesRepresentativeId?: InputMaybe<Scalars['Int']>;
};

/** Extra income payment statement electronic filing search filter (거주자기타소득지급명세서 전자신고 검색 필터) */
export type ElectronicFilingIncomeExtraPaymentStatementSearchFilter = {
  /** before production (제작전) */
  beforeProduction: Scalars['Boolean'];
  /** company code (사업자코드) */
  companyCode?: InputMaybe<Scalars['String']>;
  /** company name (상호) */
  companyName?: InputMaybe<Scalars['String']>;
  /** exclude termination (해지제외) */
  excludeCancel: Scalars['Boolean'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** user serial number of the manager in charge (담당매니저 회원일련번호) */
  manageUserId?: InputMaybe<Scalars['Int']>;
  /** electronic filing production status list (전자신고제작상태 목록) */
  productionStatuses?: InputMaybe<Array<Scalars['Int']>>;
  /** sales representative serial number (영업자일련번호) */
  salesRepresentativeId?: InputMaybe<Scalars['Int']>;
};

/** Retirement income payment statement electronic filing search filter (퇴직소득지급명세서 전자신고 검색 필터) */
export type ElectronicFilingIncomeRetirementPaymentStatementSearchFilter = {
  /** before production (제작전) */
  beforeProduction: Scalars['Boolean'];
  /** company code (사업자코드) */
  companyCode?: InputMaybe<Scalars['String']>;
  /** company name (상호) */
  companyName?: InputMaybe<Scalars['String']>;
  /** exclude termination (해지제외) */
  excludeCancel: Scalars['Boolean'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** user serial number of the manager in charge (담당매니저 회원일련번호) */
  manageUserId?: InputMaybe<Scalars['Int']>;
  /** electronic filing production status list (전자신고제작상태 목록) */
  productionStatuses?: InputMaybe<Array<Scalars['Int']>>;
  /** sales representative serial number (영업자일련번호) */
  salesRepresentativeId?: InputMaybe<Scalars['Int']>;
};

/** Daily wage income payment statement electronic filing search filter (일용근로소득지급명세서 전자신고 검색 필터) */
export type ElectronicFilingIncomeWageDailyPaymentStatementSearchFilter = {
  /** before production (제작전) */
  beforeProduction: Scalars['Boolean'];
  /** company code (사업자코드) */
  companyCode?: InputMaybe<Scalars['String']>;
  /** company name (상호) */
  companyName?: InputMaybe<Scalars['String']>;
  /** exclude termination (해지제외) */
  excludeCancel: Scalars['Boolean'];
  /** user serial number of the manager in charge (담당매니저 회원일련번호) */
  manageUserId?: InputMaybe<Scalars['Int']>;
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** electronic filing production status list (전자신고제작상태 목록) */
  productionStatuses?: InputMaybe<Array<Scalars['Int']>>;
  /** sales representative serial number (영업자일련번호) */
  salesRepresentativeId?: InputMaybe<Scalars['Int']>;
};

/** Wage income payment statement electronic filing search filter (근로소득지급명세서 전자신고 검색 필터) */
export type ElectronicFilingIncomeWagePaymentStatementSearchFilter = {
  /** before production (제작전) */
  beforeProduction: Scalars['Boolean'];
  /** company code (사업자코드) */
  companyCode?: InputMaybe<Scalars['String']>;
  /** company name (상호) */
  companyName?: InputMaybe<Scalars['String']>;
  /** exclude termination (해지제외) */
  excludeCancel: Scalars['Boolean'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** user serial number of the manager in charge (담당매니저 회원일련번호) */
  manageUserId?: InputMaybe<Scalars['Int']>;
  /** electronic filing production status list (전자신고제작상태 목록) */
  productionStatuses?: InputMaybe<Array<Scalars['Int']>>;
  /** sales representative serial number (영업자일련번호) */
  salesRepresentativeId?: InputMaybe<Scalars['Int']>;
};

/** Wage income simplified payment statement electronic filing search filter (근로소득간이지급명세서 전자신고 검색 필터) */
export type ElectronicFilingIncomeWageSimplifiedPaymentStatementSearchFilter = {
  /** before production (제작전) */
  beforeProduction: Scalars['Boolean'];
  /** company code (사업자코드) */
  companyCode?: InputMaybe<Scalars['String']>;
  /** company name (상호) */
  companyName?: InputMaybe<Scalars['String']>;
  /** exclude termination (해지제외) */
  excludeCancel: Scalars['Boolean'];
  /** user serial number of the manager in charge (담당매니저 회원일련번호) */
  manageUserId?: InputMaybe<Scalars['Int']>;
  /** payment half-year period (지급반기) : 상반기(1), 하반기(2) */
  paymentHalfYear: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** electronic filing production status list (전자신고제작상태 목록) */
  productionStatuses?: InputMaybe<Array<Scalars['Int']>>;
  /** sales representative serial number (영업자일련번호) */
  salesRepresentativeId?: InputMaybe<Scalars['Int']>;
};

/** Local income tax electronic filing search filter (지방소득세 전자신고 검색 필터) */
export type ElectronicFilingLocalIncomeTaxSearchFilter = {
  /** before production (제작전) */
  beforeProduction: Scalars['Boolean'];
  /** company code (사업자코드) */
  companyCode?: InputMaybe<Scalars['String']>;
  /** company name (상호) */
  companyName?: InputMaybe<Scalars['String']>;
  /** exclude termination (해지제외) */
  excludeCancel: Scalars['Boolean'];
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** user serial number of the manager in charge (담당매니저 회원일련번호) */
  manageUserId?: InputMaybe<Scalars['Int']>;
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** electronic filing production status list (전자신고제작상태 목록) */
  productionStatuses?: InputMaybe<Array<Scalars['Int']>>;
  /** reporting type (신고유형/주기) : 매월(1), 반기(6) */
  reportType: Scalars['Int'];
  /** sales representative serial number (영업자일련번호) */
  salesRepresentativeId?: InputMaybe<Scalars['Int']>;
};

/** Electronic filing for withholding tax performance report key input (전자신고를 위한 원천징수이행상황신고서 키 입력) */
export type ElectronicFilingReportKeyInput = {
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** withholding tax performance report serial number (원천징수이행상황신고서 일련번호) */
  reportId: Scalars['Int'];
};

/** Withholding tax electronic filing search filter (원천세 전자신고 검색 필터) */
export type ElectronicFilingWithholdingTaxSearchFilter = {
  /** before production (제작전) */
  beforeProduction: Scalars['Boolean'];
  /** company code (사업자코드) */
  companyCode?: InputMaybe<Scalars['String']>;
  /** company name (상호) */
  companyName?: InputMaybe<Scalars['String']>;
  /** exclude termination (해지제외) */
  excludeCancel: Scalars['Boolean'];
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** user serial number of the manager in charge (담당매니저 회원일련번호) */
  manageUserId?: InputMaybe<Scalars['Int']>;
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** electronic filing production status list (전자신고제작상태 목록) */
  productionStatuses?: InputMaybe<Array<Scalars['Int']>>;
  /** reporting type (신고유형/주기) */
  reportType?: InputMaybe<Scalars['Int']>;
  /** sales representative serial number (영업자일련번호) */
  salesRepresentativeId?: InputMaybe<Scalars['Int']>;
  /** type of withholding tax electronic filing (원천세 전자신고 유형) : 정기(1), 수정(2), 기한후(3) */
  withholdingTaxType: Scalars['Int'];
};

/** Business income earner (사업소득자) */
export type EmployeeBusiness = {
  __typename?: 'EmployeeBusiness';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** extended address (확장주소) */
  addressExtend?: Maybe<Scalars['String']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** deletable status (삭제가능 여부) */
  deletable: Scalars['Boolean'];
  /** department (부서) */
  department?: Maybe<Scalars['String']>;
  /** email (이메일) */
  email?: Maybe<Scalars['String']>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** foreigner status (외국인여부) */
  foreigner: Scalars['Boolean'];
  /** income classification code (소득구분코드) */
  incomeTypeCode: Scalars['String'];
  /** income classification name (소득구분명) */
  incomeTypeName: Scalars['String'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** name (이름) */
  name: Scalars['String'];
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
  /** road name address (도로명주소) */
  roadAddress?: Maybe<Scalars['String']>;
  /** status (상태) */
  status: Scalars['Int'];
  /** the qualifications required to stay (체류자격) */
  stayQualification?: Maybe<Scalars['String']>;
  /** employee type (직원유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax?: Maybe<Scalars['Int']>;
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax?: Maybe<Scalars['Int']>;
  /** withholding rural special tax (원천징수농어촌특별세) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Int']>;
};

/** Business income earner generation input (사업소득자생성 입력) */
export type EmployeeBusinessCreateInput = {
  /** extended address (확장주소) */
  addressExtend?: InputMaybe<Scalars['String']>;
  /** email (이메일) */
  email?: InputMaybe<Scalars['String']>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** foreigner status (외국인여부) */
  foreigner: Scalars['Boolean'];
  /** income classification code (소득구분코드) */
  incomeTypeCode: Scalars['String'];
  /** income classification name (소득구분명) */
  incomeTypeName: Scalars['String'];
  /** name (이름) */
  name: Scalars['String'];
  /** foreign nationality (외국인국적) */
  nationality?: InputMaybe<Scalars['String']>;
  /** foreign nationality code (외국인국적코드) */
  nationalityCode?: InputMaybe<Scalars['String']>;
  /** resident registration number / foreigner number (주민등록번호/외국인번호) / Format : [NNNNNN]-[NNNNNNN] */
  residentId: Scalars['String'];
  /** road name address (도로명주소) */
  roadAddress?: InputMaybe<Scalars['String']>;
  /** the qualifications required to stay (체류자격) */
  stayQualification?: InputMaybe<Scalars['String']>;
};

/** Business income earner change history (사업소득자 변경이력) */
export type EmployeeBusinessLog = {
  __typename?: 'EmployeeBusinessLog';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** extended address (확장주소) */
  addressExtend?: Maybe<Scalars['String']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** department (부서) */
  department?: Maybe<Scalars['String']>;
  /** email (이메일) */
  email?: Maybe<Scalars['String']>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** foreigner status (외국인여부) */
  foreigner: Scalars['Boolean'];
  /** income classification code (소득구분코드) */
  incomeTypeCode: Scalars['String'];
  /** income classification name (소득구분명) */
  incomeTypeName: Scalars['String'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** name (이름) */
  name: Scalars['String'];
  /** foreign nationality (외국인국적) */
  nationality?: Maybe<Scalars['String']>;
  /** foreign nationality code (외국인국적코드) */
  nationalityCode?: Maybe<Scalars['String']>;
  /** remarks (비고) */
  remark: Scalars['String'];
  /** resident registration number / Foreigner number validity (주민등록번호 / 외국인번호 유효성) */
  residentIdValidity: Scalars['Boolean'];
  /** position (직책) */
  responsibility?: Maybe<Scalars['String']>;
  /** road name address (도로명주소) */
  roadAddress?: Maybe<Scalars['String']>;
  /** status (상태) */
  status: Scalars['Int'];
  /** the qualifications required to stay (체류자격) */
  stayQualification?: Maybe<Scalars['String']>;
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax?: Maybe<Scalars['Int']>;
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax?: Maybe<Scalars['Int']>;
  /** withholding rural special tax (원천징수농어촌특별세) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Int']>;
};

/** Request to send business income earner email input (사업소득자 이메일발송요청 입력) */
export type EmployeeBusinessSendEmailRequestInput = {
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** income classification code (소득구분코드) */
  incomeTypeCode: Scalars['String'];
  /** recipient address (수신자주소) */
  receiverAddress: Scalars['String'];
  /** recipient name (수신자명) */
  receiverName: Scalars['String'];
  /** sender name (발신자명) */
  senderName: Scalars['String'];
};

/** Business income earner correction input (사업소득자수정 입력) */
export type EmployeeBusinessUpdateInput = {
  /** extended address (확장주소) */
  addressExtend?: InputMaybe<Scalars['String']>;
  /** email (이메일) */
  email?: InputMaybe<Scalars['String']>;
  /** foreigner status (외국인여부) */
  foreigner: Scalars['Boolean'];
  /** income classification name (소득구분명) */
  incomeTypeName: Scalars['String'];
  /** name (이름) */
  name: Scalars['String'];
  /** foreign nationality (외국인국적) */
  nationality?: InputMaybe<Scalars['String']>;
  /** foreign nationality code (외국인국적코드) */
  nationalityCode?: InputMaybe<Scalars['String']>;
  /** resident registration number / foreigner number (주민등록번호/외국인번호) / Format : [NNNNNN]-[NNNNNNN] */
  residentId: Scalars['String'];
  /** road name address (도로명주소) */
  roadAddress?: InputMaybe<Scalars['String']>;
  /** the qualifications required to stay (체류자격) */
  stayQualification?: InputMaybe<Scalars['String']>;
};

/** Department name view by company (사업자별 부서명 뷰) */
export type EmployeeDepartmentView = {
  __typename?: 'EmployeeDepartmentView';
  /** department (부서) */
  department: Scalars['String'];
  /** number of employees (직원수) */
  employeeCount: Scalars['Int'];
};

/** Extra income earner (기타소득자) */
export type EmployeeExtra = {
  __typename?: 'EmployeeExtra';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** extended address (확장주소) */
  addressExtend?: Maybe<Scalars['String']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** deletable status (삭제가능 여부) */
  deletable: Scalars['Boolean'];
  /** department (부서) */
  department?: Maybe<Scalars['String']>;
  /** email (이메일) */
  email?: Maybe<Scalars['String']>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** foreigner status (외국인여부) */
  foreigner: Scalars['Boolean'];
  /** income classification code (소득구분코드) */
  incomeTypeCode: Scalars['String'];
  /** 소득구분명 */
  incomeTypeName: Scalars['String'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** name (이름) */
  name: Scalars['String'];
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
  /** road name address (도로명주소) */
  roadAddress?: Maybe<Scalars['String']>;
  /** status (상태) */
  status: Scalars['Int'];
  /** the qualifications required to stay (체류자격) */
  stayQualification?: Maybe<Scalars['String']>;
  /** employee type (직원유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax?: Maybe<Scalars['Int']>;
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax?: Maybe<Scalars['Int']>;
  /** withholding rural special tax (원천징수농어촌특별세) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Int']>;
};

/** Extra income earner generation input (기타소득자생성 입력) */
export type EmployeeExtraCreateInput = {
  /** extended address (확장주소) */
  addressExtend?: InputMaybe<Scalars['String']>;
  /** email (이메일) */
  email?: InputMaybe<Scalars['String']>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** foreigner status (외국인여부) */
  foreigner: Scalars['Boolean'];
  /** income classification code (소득구분코드) */
  incomeTypeCode: Scalars['String'];
  /** income classification name (소득구분명) */
  incomeTypeName: Scalars['String'];
  /** name (이름) */
  name: Scalars['String'];
  /** foreign nationality (외국인국적) */
  nationality?: InputMaybe<Scalars['String']>;
  /** foreign nationality code (외국인국적코드) */
  nationalityCode?: InputMaybe<Scalars['String']>;
  /** resident registration number / foreigner number (주민등록번호/외국인번호) / Format : [NNNNNN]-[NNNNNNN] */
  residentId: Scalars['String'];
  /** road name address (도로명주소) */
  roadAddress?: InputMaybe<Scalars['String']>;
  /** the qualifications required to stay (체류자격) */
  stayQualification?: InputMaybe<Scalars['String']>;
};

/** Extra income earner change history (기타소득자 변경이력) */
export type EmployeeExtraLog = {
  __typename?: 'EmployeeExtraLog';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** extended address (확장주소) */
  addressExtend?: Maybe<Scalars['String']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** department (부서) */
  department?: Maybe<Scalars['String']>;
  /** email (이메일) */
  email?: Maybe<Scalars['String']>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** foreigner status (외국인여부) */
  foreigner: Scalars['Boolean'];
  /** income classification code (소득구분코드) */
  incomeTypeCode: Scalars['String'];
  /** 소득구분명 */
  incomeTypeName: Scalars['String'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** name (이름) */
  name: Scalars['String'];
  /** foreign nationality (외국인국적) */
  nationality?: Maybe<Scalars['String']>;
  /** foreign nationality code (외국인국적코드) */
  nationalityCode?: Maybe<Scalars['String']>;
  /** remarks (비고) */
  remark: Scalars['String'];
  /** resident registration number / Foreigner number validity (주민등록번호 / 외국인번호 유효성) */
  residentIdValidity: Scalars['Boolean'];
  /** position (직책) */
  responsibility?: Maybe<Scalars['String']>;
  /** road name address (도로명주소) */
  roadAddress?: Maybe<Scalars['String']>;
  /** status (상태) */
  status: Scalars['Int'];
  /** the qualifications required to stay (체류자격) */
  stayQualification?: Maybe<Scalars['String']>;
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax?: Maybe<Scalars['Int']>;
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax?: Maybe<Scalars['Int']>;
  /** withholding rural special tax (원천징수농어촌특별세) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Int']>;
};

/** Request to send extra income earner email input (기타소득자 이메일발송요청 입력) */
export type EmployeeExtraSendEmailRequestInput = {
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** income classification code (소득구분코드) */
  incomeTypeCode: Scalars['String'];
  /** recipient address (수신자주소) */
  receiverAddress: Scalars['String'];
  /** recipient name (수신자명) */
  receiverName: Scalars['String'];
  /** sender name (발신자명) */
  senderName: Scalars['String'];
};

/** Extra income earner correction input (기타소득자수정 입력) */
export type EmployeeExtraUpdateInput = {
  /** extended address (확장주소) */
  addressExtend?: InputMaybe<Scalars['String']>;
  /** email (이메일) */
  email?: InputMaybe<Scalars['String']>;
  /** foreigner status (외국인여부) */
  foreigner: Scalars['Boolean'];
  /** income classification name (소득구분명) */
  incomeTypeName: Scalars['String'];
  /** name (이름) */
  name: Scalars['String'];
  /** foreign nationality (외국인국적) */
  nationality?: InputMaybe<Scalars['String']>;
  /** foreign nationality code (외국인국적코드) */
  nationalityCode?: InputMaybe<Scalars['String']>;
  /** resident registration number / foreigner number (주민등록번호/외국인번호) / Format : [NNNNNN]-[NNNNNNN] */
  residentId: Scalars['String'];
  /** road name address (도로명주소) */
  roadAddress?: InputMaybe<Scalars['String']>;
  /** the qualifications required to stay (체류자격) */
  stayQualification?: InputMaybe<Scalars['String']>;
};

/** Position name view by company (사업자별 직책명 뷰) */
export type EmployeeResponsibilityView = {
  __typename?: 'EmployeeResponsibilityView';
  /** number of employees (직원수) */
  employeeCount: Scalars['Int'];
  /** position (직책) */
  responsibility: Scalars['String'];
};

/** Retirement income earner (퇴직소득자 : 근로소득자 / 일용직근로소득자) */
export type EmployeeRetirement = EmployeeWage | EmployeeWageDaily;

/** Request to send employee email input (직원 이메일발송요청 입력) */
export type EmployeeSendEmailRequestInput = {
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** recipient address (수신자주소) */
  receiverAddress: Scalars['String'];
  /** recipient name (수신자명) */
  receiverName: Scalars['String'];
  /** sender name (발신자명) */
  senderName: Scalars['String'];
};

/** Wage income earner (근로소득자) */
export type EmployeeWage = {
  __typename?: 'EmployeeWage';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** extended address (확장주소) */
  addressExtend?: Maybe<Scalars['String']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** number of families subject to deduction (공제대상 가족수) */
  deductionDependentCount: Scalars['Int'];
  /** Deduction item list of wage income earner (근로소득자 공제항목 목록) */
  deductionItems?: Maybe<Array<EmployeeWageDeductionItem>>;
  /** deletable status (삭제가능 여부) */
  deletable: Scalars['Boolean'];
  /** department (부서) */
  department?: Maybe<Scalars['String']>;
  /** List of dependents of wage income earner (근로소득자의 부양가족 목록) */
  dependents?: Maybe<Array<EmployeeWageDependent>>;
  /** email (이메일) */
  email?: Maybe<Scalars['String']>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employeement insurance deduction status (고용보험공제여부) */
  employeementInsuranceDeduction: Scalars['Boolean'];
  /** employee insurance support percent (고용보험 두루누리 적용 퍼센트) */
  employeementInsuranceSupportPercent?: Maybe<Scalars['Int']>;
  /** employeement reduction for SMEs status (중소기업취업감면여부) */
  employeementReduction: Scalars['Boolean'];
  /** finish date of employeement reduction period for SMEs [YYYYMMDD] (중소기업취업감면기간 종료일) */
  employeementReductionFinishDate?: Maybe<Scalars['Int']>;
  /** employeement reduction input type for SMEs (중소기업취업감면입력 유형) */
  employeementReductionInput?: Maybe<Scalars['Int']>;
  /** employeement reduction rate for SMEs (중소기업취업감면율 퍼센트) */
  employeementReductionRatePercent?: Maybe<Scalars['Int']>;
  /** start date of employeement reduction period for SMEs [YYYYMMDD] (중소기업취업감면기간 시작일) */
  employeementReductionStartDate?: Maybe<Scalars['Int']>;
  /** foreigner status (외국인여부) */
  foreigner: Scalars['Boolean'];
  /** health insurance deduction status (건강보험공제여부) */
  healthInsuranceDeduction: Scalars['Boolean'];
  /** householder status (세대주여부) */
  householder: Scalars['Boolean'];
  /** income payments (소득지급액) */
  incomePayment: Scalars['Int'];
  /** income tax magnification / % (소득세배율) */
  incomeTaxMagnification: Scalars['Int'];
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
  /** Pay item list of wage income earner (근로소득자 소득항목 목록) */
  payItems?: Maybe<Array<EmployeeWagePayItem>>;
  /** representative status (대표자여부) */
  president: Scalars['Boolean'];
  /** resident registration number / foreigner number (주민등록번호 / 외국인번호) */
  residentId: Scalars['String'];
  /** resident registration number / Foreigner number validity (주민등록번호 / 외국인번호 유효성) */
  residentIdValidity: Scalars['Boolean'];
  /** position (직책) */
  responsibility?: Maybe<Scalars['String']>;
  /** road name address (도로명주소) */
  roadAddress?: Maybe<Scalars['String']>;
  /** status (상태) */
  status: Scalars['Int'];
  /** the qualifications required to stay (체류자격) */
  stayQualification?: Maybe<Scalars['String']>;
  /** total deduction (공제합계) */
  totalDeduction: Scalars['Int'];
  /** salary + reward total (급여+재수당합계) */
  totalPay: Scalars['Int'];
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
};

/** Wage income earner generation input (근로소득자생성 입력) */
export type EmployeeWageCreateInput = {
  /** extended address (확장주소) */
  addressExtend?: InputMaybe<Scalars['String']>;
  /** department (부서) */
  department?: InputMaybe<Scalars['String']>;
  /** email (이메일) */
  email?: InputMaybe<Scalars['String']>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** foreigner status (외국인여부) */
  foreigner: Scalars['Boolean'];
  /** householder status (세대주여부) */
  householder: Scalars['Boolean'];
  /** date of joining the company [YYYYMMDD] (입사일) */
  joinedAt: Scalars['Int'];
  /** date of resignation [YYYYMMDD] (퇴사일) */
  leavedAt?: InputMaybe<Scalars['Int']>;
  /** name (이름) */
  name: Scalars['String'];
  /** foreign nationality (외국인국적) */
  nationality?: InputMaybe<Scalars['String']>;
  /** foreign nationality code (외국인국적코드) */
  nationalityCode?: InputMaybe<Scalars['String']>;
  /** representative status (대표자여부) */
  president: Scalars['Boolean'];
  /** resident registration number / foreigner number (주민등록번호/외국인번호) / Format : [NNNNNN]-[NNNNNNN] */
  residentId: Scalars['String'];
  /** position (직책) */
  responsibility?: InputMaybe<Scalars['String']>;
  /** road name address (도로명주소) */
  roadAddress?: InputMaybe<Scalars['String']>;
  /** the qualifications required to stay (체류자격) */
  stayQualification?: InputMaybe<Scalars['String']>;
  /** weekly prescribed working hours (주간 규정 근무시간) */
  weeklyWorkingHours: Scalars['Int'];
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

/** Daily wage income earner generation input (일용직근로소득자생성 입력) */
export type EmployeeWageDailyCreateInput = {
  /** extended address (확장주소) */
  addressExtend?: InputMaybe<Scalars['String']>;
  /** department (부서) */
  department?: InputMaybe<Scalars['String']>;
  /** email (이메일) */
  email?: InputMaybe<Scalars['String']>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** foreigner status (외국인여부) */
  foreigner: Scalars['Boolean'];
  /** date of joining the company [YYYYMMDD] (입사일) */
  joinedAt: Scalars['Int'];
  /** date of resignation [YYYYMMDD] (퇴사일) */
  leavedAt?: InputMaybe<Scalars['Int']>;
  /** name (이름) */
  name: Scalars['String'];
  /** foreign nationality (외국인국적) */
  nationality?: InputMaybe<Scalars['String']>;
  /** foreign nationality code (외국인국적코드) */
  nationalityCode?: InputMaybe<Scalars['String']>;
  /** resident registration number / foreigner number (주민등록번호/외국인번호) / Format : [NNNNNN]-[NNNNNNN] */
  residentId: Scalars['String'];
  /** position (직책) */
  responsibility?: InputMaybe<Scalars['String']>;
  /** retirement benefit status (퇴직급여여부) */
  retirementIncome: Scalars['Boolean'];
  /** road name address (도로명주소) */
  roadAddress?: InputMaybe<Scalars['String']>;
  /** the qualifications required to stay (체류자격) */
  stayQualification?: InputMaybe<Scalars['String']>;
  /** weekly prescribed working hours (주간 규정 근무시간) */
  weeklyWorkingHours: Scalars['Int'];
};

/** Deduction item of daily wage income earner (일용직근로소득자 공제항목) */
export type EmployeeWageDailyDeductionItem = {
  __typename?: 'EmployeeWageDailyDeductionItem';
  /** amount (금액) */
  amount: Scalars['Int'];
  /** item code (항목코드) */
  itemCode: Scalars['Int'];
};

/** Daily wage earner change history (일용직근로소득자 변경이력) */
export type EmployeeWageDailyLog = {
  __typename?: 'EmployeeWageDailyLog';
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
  /** deduction item list (공제항목목록) */
  deductionItems?: Maybe<Scalars['String']>;
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
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
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
  /** remarks (비고) */
  remark: Scalars['String'];
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
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
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

/** Pay/deduction for daily wage income earners input (일용직근로소득자 소득/공제 입력) */
export type EmployeeWageDailyPayDeductionInput = {
  /** daily wage (일급여) */
  dailyWage: Scalars['Int'];
  /** Deduction item input list (공제항목 입력 목록) */
  deductionItems: Array<DeductionItemInput>;
  /** employeement insurance deduction status (고용보험공제여부) */
  employeementInsuranceDeduction: Scalars['Boolean'];
  /** employee insurance support percent (고용보험 두루누리 적용 퍼센트) */
  employeementInsuranceSupportPercent?: InputMaybe<Scalars['Int']>;
  /** health insurance deduction status (건강보험공제여부) */
  healthInsuranceDeduction: Scalars['Boolean'];
  /** insurance premium support usage status (두루누리사용여부) */
  insuranceSupport: Scalars['Boolean'];
  /** long-term care insurance deduction status (장기요양보험공제여부) */
  longTermCareInsuranceDeduction: Scalars['Boolean'];
  /** salary status (월급여부) */
  monthlyPaycheck: Scalars['Boolean'];
  /** monthly wage (월급여) */
  monthlyWage: Scalars['Int'];
  /** national pension deduction status (국민연금공제여부) */
  nationalPensionDeduction: Scalars['Boolean'];
  /** national pension support percent (국민연금 두루누리 적용 퍼센트) */
  nationalPensionSupportPercent?: InputMaybe<Scalars['Int']>;
  /** number of working days (근무일수) */
  workingDays: Scalars['Int'];
};

/** Daily wage income earner correction input (일용직근로소득자수정 입력) */
export type EmployeeWageDailyUpdateInput = {
  /** extended address (확장주소) */
  addressExtend?: InputMaybe<Scalars['String']>;
  /** department (부서) */
  department?: InputMaybe<Scalars['String']>;
  /** email (이메일) */
  email?: InputMaybe<Scalars['String']>;
  /** foreigner status (외국인여부) */
  foreigner: Scalars['Boolean'];
  /** date of joining the company [YYYYMMDD] (입사일) */
  joinedAt: Scalars['Int'];
  /** date of resignation [YYYYMMDD] (퇴사일) */
  leavedAt?: InputMaybe<Scalars['Int']>;
  /** name (이름) */
  name: Scalars['String'];
  /** foreign nationality (외국인국적) */
  nationality?: InputMaybe<Scalars['String']>;
  /** foreign nationality code (외국인국적코드) */
  nationalityCode?: InputMaybe<Scalars['String']>;
  /** resident registration number / foreigner number (주민등록번호/외국인번호) / Format : [NNNNNN]-[NNNNNNN] */
  residentId: Scalars['String'];
  /** position (직책) */
  responsibility?: InputMaybe<Scalars['String']>;
  /** retirement benefit status (퇴직급여여부) */
  retirementIncome: Scalars['Boolean'];
  /** road name address (도로명주소) */
  roadAddress?: InputMaybe<Scalars['String']>;
  /** the qualifications required to stay (체류자격) */
  stayQualification?: InputMaybe<Scalars['String']>;
  /** weekly prescribed working hours (주간 규정 근무시간) */
  weeklyWorkingHours: Scalars['Int'];
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

/** Registration of dependents of earned income earners input (근로소득자의 부양가족 등록 입력) */
export type EmployeeWageDependentCreateInput = {
  /** basic deduction (기본공제) */
  basicDeduction: Scalars['Int'];
  /** a consignment relationship (위탁관계) */
  consignmentRelationship?: InputMaybe<Scalars['String']>;
  /** descendant (자녀) */
  descendant?: InputMaybe<Scalars['Boolean']>;
  /** Types of people with disabilities (장애인 유형) */
  disabled?: InputMaybe<Scalars['Int']>;
  /** foreigner status (외국인여부) */
  foreigner: Scalars['Boolean'];
  /** the order of dependents (부양가족의 순번) */
  index: Scalars['Int'];
  /** Types of Childbirth Adoption (출산입양 유형) */
  maternityAdoption?: InputMaybe<Scalars['Int']>;
  /** name (이름) */
  name: Scalars['String'];
  /** dependent family relationship (부양가족관계) */
  relation: Scalars['Int'];
  /** resident registration number / foreigner number (주민등록번호/외국인번호) / Format : [NNNNNN]-[NNNNNNN] */
  residentId: Scalars['String'];
  /** preferential treatment for the elderly (경로우대) */
  senior?: InputMaybe<Scalars['Boolean']>;
  /** a single parent (한부모) */
  singleParent?: InputMaybe<Scalars['Boolean']>;
  /** women (부녀자) */
  women?: InputMaybe<Scalars['Boolean']>;
};

/** Modification of dependents of earned income earners input (근로소득자의 부양가족 수정 입력) */
export type EmployeeWageDependentUpdateInput = {
  /** basic deduction (기본공제) */
  basicDeduction: Scalars['Int'];
  /** a consignment relationship (위탁관계) */
  consignmentRelationship?: InputMaybe<Scalars['String']>;
  /** descendant (자녀) */
  descendant?: InputMaybe<Scalars['Boolean']>;
  /** Types of people with disabilities (장애인 유형) */
  disabled?: InputMaybe<Scalars['Int']>;
  /** foreigner status (외국인여부) */
  foreigner: Scalars['Boolean'];
  /** Types of Childbirth Adoption (출산입양 유형) */
  maternityAdoption?: InputMaybe<Scalars['Int']>;
  /** name (이름) */
  name: Scalars['String'];
  /** dependent family relationship (부양가족관계) */
  relation: Scalars['Int'];
  /** resident registration number / foreigner number (주민등록번호/외국인번호) / Format : [NNNNNN]-[NNNNNNN] */
  residentId: Scalars['String'];
  /** preferential treatment for the elderly (경로우대) */
  senior?: InputMaybe<Scalars['Boolean']>;
  /** a single parent (한부모) */
  singleParent?: InputMaybe<Scalars['Boolean']>;
  /** women (부녀자) */
  women?: InputMaybe<Scalars['Boolean']>;
};

/** Wage income earner change history (근로소득자 변경이력) */
export type EmployeeWageLog = {
  __typename?: 'EmployeeWageLog';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** extended address (확장주소) */
  addressExtend?: Maybe<Scalars['String']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** number of families subject to deduction (공제대상 가족수) */
  deductionDependentCount: Scalars['Int'];
  /** deduction item list (공제항목목록) */
  deductionItems?: Maybe<Scalars['String']>;
  /** department (부서) */
  department?: Maybe<Scalars['String']>;
  /** dependents list (부양가족목록) */
  dependents?: Maybe<Scalars['String']>;
  /** email (이메일) */
  email?: Maybe<Scalars['String']>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employeement insurance deduction status (고용보험공제여부) */
  employeementInsuranceDeduction: Scalars['Boolean'];
  /** employee insurance support percent (고용보험 두루누리 적용 퍼센트) */
  employeementInsuranceSupportPercent?: Maybe<Scalars['Int']>;
  /** employeement reduction for SMEs status (중소기업취업감면여부) */
  employeementReduction: Scalars['Boolean'];
  /** finish date of employeement reduction period for SMEs (중소기업취업감면기간 종료일) */
  employeementReductionFinishDate?: Maybe<Scalars['DateScalar']>;
  /** employeement reduction input type for SMEs (중소기업취업감면입력 유형) */
  employeementReductionInput?: Maybe<Scalars['Int']>;
  /** employeement reduction rate for SMEs (중소기업취업감면율 퍼센트) */
  employeementReductionRatePercent?: Maybe<Scalars['Int']>;
  /** start date of employeement reduction period for SMEs (중소기업취업감면기간 시작일) */
  employeementReductionStartDate?: Maybe<Scalars['DateScalar']>;
  /** foreigner status (외국인여부) */
  foreigner: Scalars['Boolean'];
  /** health insurance deduction status (건강보험공제여부) */
  healthInsuranceDeduction: Scalars['Boolean'];
  /** householder status (세대주여부) */
  householder: Scalars['Boolean'];
  /** income payments (소득지급액) */
  incomePayment: Scalars['Int'];
  /** income tax magnification / % (소득세배율) */
  incomeTaxMagnification: Scalars['Int'];
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
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** long-term care insurance deduction status (장기요양보험공제여부) */
  longTermCareInsuranceDeduction: Scalars['Boolean'];
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
  /** pay item list (소득항목목록) */
  payItems?: Maybe<Scalars['String']>;
  /** representative status (대표자여부) */
  president: Scalars['Boolean'];
  /** reduction item list (감면항목목록) */
  reductionItems?: Maybe<Scalars['String']>;
  /** remarks (비고) */
  remark: Scalars['String'];
  /** resident registration number / Foreigner number validity (주민등록번호 / 외국인번호 유효성) */
  residentIdValidity: Scalars['Boolean'];
  /** position (직책) */
  responsibility?: Maybe<Scalars['String']>;
  /** road name address (도로명주소) */
  roadAddress?: Maybe<Scalars['String']>;
  /** status (상태) */
  status: Scalars['Int'];
  /** the qualifications required to stay (체류자격) */
  stayQualification?: Maybe<Scalars['String']>;
  /** total deduction (공제합계) */
  totalDeduction: Scalars['Int'];
  /** salary + reward total (급여+재수당합계) */
  totalPay: Scalars['Int'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
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
};

/** Pay/deduction/reduction for wage income earners input (근로소득자의 소득/공제/감면 입력) */
export type EmployeeWagePayDeductionReductionInput = {
  /** Deduction item input list (공제항목 입력 목록) */
  deductionItems: Array<DeductionItemInput>;
  /** employeement insurance deduction status (고용보험공제여부) */
  employeementInsuranceDeduction: Scalars['Boolean'];
  /** employee insurance support percent (고용보험 두루누리 적용 퍼센트) */
  employeementInsuranceSupportPercent?: InputMaybe<Scalars['Int']>;
  /** employeement reduction for SMEs status (중소기업취업감면여부) */
  employeementReduction: Scalars['Boolean'];
  /** finish date of employeement reduction period for SMEs [YYYYMMDD] (중소기업취업감면기간 종료일) */
  employeementReductionFinishDate?: InputMaybe<Scalars['Int']>;
  /** employeement reduction input type for SMEs (중소기업취업감면입력 유형) */
  employeementReductionInput?: InputMaybe<Scalars['Int']>;
  /** employeement reduction rate for SMEs (중소기업취업감면율 퍼센트) */
  employeementReductionRatePercent?: InputMaybe<Scalars['Int']>;
  /** start date of employeement reduction period for SMEs [YYYYMMDD] (중소기업취업감면기간 시작일) */
  employeementReductionStartDate?: InputMaybe<Scalars['Int']>;
  /** health insurance deduction status (건강보험공제여부) */
  healthInsuranceDeduction: Scalars['Boolean'];
  /** income tax magnification / % (소득세배율) */
  incomeTaxMagnification: Scalars['Int'];
  /** insurance premium support usage status (두루누리사용여부) */
  insuranceSupport: Scalars['Boolean'];
  /** long-term care insurance deduction status (장기요양보험공제여부) */
  longTermCareInsuranceDeduction: Scalars['Boolean'];
  /** national pension deduction status (국민연금공제여부) */
  nationalPensionDeduction: Scalars['Boolean'];
  /** national pension support percent (국민연금 두루누리 적용 퍼센트) */
  nationalPensionSupportPercent?: InputMaybe<Scalars['Int']>;
  /** Pay item input list (소득항목 입력 목록) */
  payItems: Array<PayItemInput>;
};

/** Pay item of wage income earner (근로소득자 소득항목) */
export type EmployeeWagePayItem = {
  __typename?: 'EmployeeWagePayItem';
  /** amount (금액) */
  amount: Scalars['Int'];
  /** item code (항목코드) */
  itemCode: Scalars['Int'];
};

/** Wage income earner correction input (근로소득자수정 입력) */
export type EmployeeWageUpdateInput = {
  /** extended address (확장주소) */
  addressExtend?: InputMaybe<Scalars['String']>;
  /** department (부서) */
  department?: InputMaybe<Scalars['String']>;
  /** email (이메일) */
  email?: InputMaybe<Scalars['String']>;
  /** foreigner status (외국인여부) */
  foreigner: Scalars['Boolean'];
  /** householder status (세대주여부) */
  householder: Scalars['Boolean'];
  /** date of joining the company [YYYYMMDD] (입사일) */
  joinedAt: Scalars['Int'];
  /** date of resignation [YYYYMMDD] (퇴사일) */
  leavedAt?: InputMaybe<Scalars['Int']>;
  /** name (이름) */
  name: Scalars['String'];
  /** foreign nationality (외국인국적) */
  nationality?: InputMaybe<Scalars['String']>;
  /** foreign nationality code (외국인국적코드) */
  nationalityCode?: InputMaybe<Scalars['String']>;
  /** representative status (대표자여부) */
  president: Scalars['Boolean'];
  /** resident registration number / foreigner number (주민등록번호/외국인번호) / Format : [NNNNNN]-[NNNNNNN] */
  residentId: Scalars['String'];
  /** position (직책) */
  responsibility?: InputMaybe<Scalars['String']>;
  /** road name address (도로명주소) */
  roadAddress?: InputMaybe<Scalars['String']>;
  /** the qualifications required to stay (체류자격) */
  stayQualification?: InputMaybe<Scalars['String']>;
  /** weekly prescribed working hours (주간 규정 근무시간) */
  weeklyWorkingHours: Scalars['Int'];
};

/** Employee list for retirement income (퇴직소득용 직원목록) */
export type EmployeesForIncomeRetirement = {
  __typename?: 'EmployeesForIncomeRetirement';
  /** List of daily wage income earners (일용직근로소득자 목록) */
  employeeWageDailies: Array<EmployeeWageDaily>;
  /** List of wage income earners (근로소득자 목록) */
  employeeWages: Array<EmployeeWage>;
};

/** Company / Accounting / Facility business (사업자/회계/시설사업) */
export type FacilityBusiness = {
  __typename?: 'FacilityBusiness';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** the number of quota (정원수/명) */
  capacity: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** facility business type (사업유형) */
  facilityBizType: Scalars['FacilityBizTypeScalar'];
  /** facility business serial number (시설사업일련번호) */
  facilityBusinessId: Scalars['Int'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** long-term care institution number (장기요양기관번호) */
  longTermCareInstitutionNumber: Scalars['String'];
  /** facility business name (시설사업명) */
  name: Scalars['String'];
  /** fee for use (이용료) */
  price: Scalars['Int'];
  /** long-term care institution registration certificate file storage serial number (장기요양기관등록증 파일저장일련번호) */
  registrationCardFileStorageId?: Maybe<Scalars['Int']>;
  /** start year/month / YYYYMM (시작연월) */
  startYearMonth: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** File Storage (파일저장소) */
export type FileStorage = {
  __typename?: 'FileStorage';
  /** 활성여부 */
  active: Scalars['Boolean'];
  /** 생성일 */
  createdAt: Scalars['DateScalar'];
  /** 생성자 */
  createdBy: Scalars['String'];
  /** IP주소 */
  ip: Scalars['String'];
  /** file name (파일명) */
  name: Scalars['String'];
  /** 수정일 */
  updatedAt: Scalars['DateScalar'];
  /** 수정자 */
  updatedBy: Scalars['String'];
  /** URL */
  url: Scalars['String'];
};

/** Income status statistics search filter (소득 업무상태 통계 검색필터) */
export type FindIncomeProcessStatFilter = {
  /** finish imputed year / month (종료귀속연월) */
  finishImputedYearMonth: Scalars['Int'];
  /** start imputed year / month (시작귀속연월) */
  startImputedYearMonth: Scalars['Int'];
};

/** Business income (사업소득) */
export type IncomeBusiness = {
  __typename?: 'IncomeBusiness';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** differential payment (차인지급액) */
  actualPayment: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** Business income earner (사업소득자) */
  employee?: Maybe<EmployeeBusiness>;
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
  ip: Scalars['String'];
  /** amount paid (지급액) */
  paymentAmount: Scalars['Int'];
  /** payment day (지급일) */
  paymentDay: Scalars['Int'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** previous payment day (이전지급일) */
  prevPaymentDay?: Maybe<Scalars['Int']>;
  /** tax rate x 100% (세율 x 100%) */
  taxRate: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax: Scalars['Int'];
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax: Scalars['Int'];
  /** withholding rural special tax (원천징수농어촌특별세) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Int']>;
};

/** Business income registration input (사업소득 등록 입력) */
export type IncomeBusinessCreateInput = {
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** income classification code (소득구분코드) */
  incomeTypeCode: Scalars['String'];
  /** amount paid (지급액) */
  paymentAmount: Scalars['Int'];
  /** payment day (지급일) */
  paymentDay: Scalars['Int'];
  /** tax rate x 100% (세율 x 100%) */
  taxRate: Scalars['Int'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax: Scalars['Int'];
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax: Scalars['Int'];
};

/** Business income change history (사업소득 변경이력) */
export type IncomeBusinessLog = {
  __typename?: 'IncomeBusinessLog';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employee type (직원유형) */
  employeeType: Scalars['Int'];
  /** income serial number (소득일련번호) */
  incomeId: Scalars['Int'];
  /** income payment (소득지급) */
  incomePayment: Scalars['Int'];
  /** income classification code (소득구분코드) */
  incomeTypeCode: Scalars['String'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** amount paid (지급액) */
  paymentAmount: Scalars['Int'];
  /** payment day (지급일) */
  paymentDay: Scalars['Int'];
  /** previous payment day (이전지급일) */
  prevPaymentDay?: Maybe<Scalars['Int']>;
  /** remarks (비고) */
  remark: Scalars['String'];
  /** tax rate x 100% (세율 x 100%) */
  taxRate: Scalars['Int'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax: Scalars['Int'];
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax: Scalars['Int'];
  /** withholding rural special tax (원천징수농어촌특별세) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Int']>;
};

/** Business income payment statement electronic filing (거주자사업소득지급명세서 전자신고) */
export type IncomeBusinessPaymentStatementElectronicFiling = {
  __typename?: 'IncomeBusinessPaymentStatementElectronicFiling';
  /** Company (사업자) */
  company: Company;
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** last production request date (최종제작요청일) */
  lastProductionRequestedAt?: Maybe<Scalars['DateScalar']>;
};

/** Business income simplified payment statement electronic filing (거주자사업소득간이지급명세서 전자신고) */
export type IncomeBusinessSimplifiedPaymentStatementElectronicFiling = {
  __typename?: 'IncomeBusinessSimplifiedPaymentStatementElectronicFiling';
  /** Company (사업자) */
  company: Company;
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** last production request date (최종제작요청일) */
  lastProductionRequestedAt?: Maybe<Scalars['DateScalar']>;
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
};

/** Business income statistics view (사업소득통계 뷰) */
export type IncomeBusinessStatView = {
  __typename?: 'IncomeBusinessStatView';
  /** total differential payment (차인지급액합계) */
  actualPayment: Scalars['Float'];
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** inputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** total income payment (소득지급합계) */
  incomePayment: Scalars['Float'];
  /** total amount paid (지급액합계) */
  paymentAmount: Scalars['Float'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** total withholding income tax (원천징수소득세합계) */
  withholdingIncomeTax: Scalars['Float'];
  /** total withholding local income tax (원천징수지방소득세합계) */
  withholdingLocalIncomeTax: Scalars['Float'];
  /** total withholding rural special tax (원천징수농어촌특별세합계) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Float']>;
};

/** Business income correction input (사업소득 수정 입력) */
export type IncomeBusinessUpdateInput = {
  /** amount paid (지급액) */
  paymentAmount: Scalars['Int'];
  /** tax rate x 100% (세율 x 100%) */
  taxRate: Scalars['Int'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax: Scalars['Int'];
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax: Scalars['Int'];
};

/** Business income withholding receipt input (사업소득 원천징수영수증 입력) */
export type IncomeBusinessWithholdingReceiptInput = {
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** date of receipt / YYYYMMDD (영수일) */
  receiptDate: Scalars['Int'];
  /** Business income withholding receipt type (사업소득 원천징수영수증 유형) / For keeping income earners (소득자 보관용) = 1, For keeping issuer (발행자 보관용) = 2 */
  type: Scalars['Int'];
};

/** Report on withholding receipt of business income summary by mmployees (사업소득 원천징수영수증 리포트 직원 별 요약) */
export type IncomeBusinessWithholdingReceiptReportSummariesByEmployee = {
  __typename?: 'IncomeBusinessWithholdingReceiptReportSummariesByEmployee';
  /** Business income earner (사업소득자) */
  employee?: Maybe<EmployeeBusiness>;
  /** amount paid (지급액) */
  paymentAmount: Scalars['Int'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax: Scalars['Int'];
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax: Scalars['Int'];
};

/** Extra income (기타소득) */
export type IncomeExtra = {
  __typename?: 'IncomeExtra';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** differential payment (차인지급액) */
  actualPayment: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** Extra income earner (기타소득자) */
  employee?: Maybe<EmployeeExtra>;
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
  ip: Scalars['String'];
  /** amount paid (지급액) */
  paymentAmount: Scalars['Int'];
  /** payment day (지급일) */
  paymentDay: Scalars['Int'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** previous payment day (이전지급일) */
  prevPaymentDay?: Maybe<Scalars['Int']>;
  /** necessary expenses (필요경비) */
  requiredExpenses: Scalars['Int'];
  /** tax rate x 100% (세율 x 100%) */
  taxRate: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax: Scalars['Int'];
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax: Scalars['Int'];
  /** withholding rural special tax (원천징수농어촌특별세) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Int']>;
};

/** Extra income registration input (기타소득 등록 입력) */
export type IncomeExtraCreateInput = {
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** income classification code (소득구분코드) */
  incomeTypeCode: Scalars['String'];
  /** amount paid (지급액) */
  paymentAmount: Scalars['Int'];
  /** payment day (지급일) */
  paymentDay: Scalars['Int'];
  /** necessary expenses (필요경비) */
  requiredExpenses: Scalars['Int'];
  /** tax rate x 100% (세율 x 100%) */
  taxRate: Scalars['Int'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax: Scalars['Int'];
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax: Scalars['Int'];
};

/** Extra income change history (기타소득 변경이력) */
export type IncomeExtraLog = {
  __typename?: 'IncomeExtraLog';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employee type (직원유형) */
  employeeType: Scalars['Int'];
  /** income serial number (소득일련번호) */
  incomeId: Scalars['Int'];
  /** income payment (소득지급) */
  incomePayment: Scalars['Int'];
  /** income classification code (소득구분코드) */
  incomeTypeCode: Scalars['String'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** amount paid (지급액) */
  paymentAmount: Scalars['Int'];
  /** payment day (지급일) */
  paymentDay: Scalars['Int'];
  /** previous payment day (이전지급일) */
  prevPaymentDay?: Maybe<Scalars['Int']>;
  /** remarks (비고) */
  remark: Scalars['String'];
  /** necessary expenses (필요경비) */
  requiredExpenses: Scalars['Int'];
  /** tax rate x 100% (세율 x 100%) */
  taxRate: Scalars['Int'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax: Scalars['Int'];
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax: Scalars['Int'];
  /** withholding rural special tax (원천징수농어촌특별세) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Int']>;
};

/** Extra income payment statement electronic filing (거주자기타소득지급명세서 전자신고) */
export type IncomeExtraPaymentStatementElectronicFiling = {
  __typename?: 'IncomeExtraPaymentStatementElectronicFiling';
  /** Company (사업자) */
  company: Company;
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** last production request date (최종제작요청일) */
  lastProductionRequestedAt?: Maybe<Scalars['DateScalar']>;
};

/** Extra income statistics view (기타소득통계 뷰) */
export type IncomeExtraStatView = {
  __typename?: 'IncomeExtraStatView';
  /** total differential payment (차인지급액합계) */
  actualPayment: Scalars['Float'];
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** inputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** total income payment (소득지급합계) */
  incomePayment: Scalars['Float'];
  /** total amount paid (지급액합계) */
  paymentAmount: Scalars['Float'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** total withholding income tax (원천징수소득세합계) */
  withholdingIncomeTax: Scalars['Float'];
  /** total withholding local income tax (원천징수지방소득세합계) */
  withholdingLocalIncomeTax: Scalars['Float'];
  /** total withholding rural special tax (원천징수농어촌특별세합계) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Float']>;
};

/** Extra income correction input (기타소득 수정 입력) */
export type IncomeExtraUpdateInput = {
  /** amount paid (지급액) */
  paymentAmount: Scalars['Int'];
  /** necessary expenses (필요경비) */
  requiredExpenses: Scalars['Int'];
  /** tax rate x 100% (세율 x 100%) */
  taxRate: Scalars['Int'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax: Scalars['Int'];
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax: Scalars['Int'];
};

/** Extra income withholding receipt input (기타소득 원천징수영수증 입력) */
export type IncomeExtraWithholdingReceiptInput = {
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** date of receipt / YYYYMMDD (영수일) */
  receiptDate: Scalars['Int'];
  /** Extra income withholding receipt type (기타소득 원천징수영수증 유형) / For keeping income earners (소득자 보관용) = 1, For keeping issuer (발행자 보관용) = 2 */
  type: Scalars['Int'];
};

/** Report on withholding receipt of extra income summary by mmployees (기타소득 원천징수영수증 리포트 직원 별 요약) */
export type IncomeExtraWithholdingReceiptReportSummariesByEmployee = {
  __typename?: 'IncomeExtraWithholdingReceiptReportSummariesByEmployee';
  /** Extra income earner (기타소득자) */
  employee?: Maybe<EmployeeExtra>;
  /** income payment (소득지급) */
  incomePayment: Scalars['Int'];
  /** amount paid (지급액) */
  paymentAmount: Scalars['Int'];
  /** necessary expenses (필요경비) */
  requiredExpenses: Scalars['Int'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax: Scalars['Int'];
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax: Scalars['Int'];
};

/** Income data for withholding tax performance report (원천징수이행상황신고서 소득 데이터) */
export type IncomeForTaxWithholdingStatusReport = {
  __typename?: 'IncomeForTaxWithholdingStatusReport';
  /** code (코드) */
  code: Scalars['String'];
  /** collected income tax (징수 소득세) */
  collectedIncomeTax: Scalars['Int'];
  /** number of people to pay income (소득지급 인원) */
  numberOfPeople: Scalars['Int'];
  /** total income payments (소득지급 총지급액) */
  totalPayment: Scalars['Int'];
};

/** Income business status (소득 업무상태) */
export type IncomeProcess = {
  __typename?: 'IncomeProcess';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** Income work status employee statistics view (소득업무상태직원통계 뷰) */
  employeeStat?: Maybe<IncomeProcessEmployeeStatView>;
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** work status (업무상태) */
  status: Scalars['ProcessStatusScalar'];
  /** Business status change user summary information (업무상태 변경 회원요약정보) */
  statusUpdateUser?: Maybe<CompactUser>;
  /** work status change date (업무상태변경일) */
  statusUpdatedAt: Scalars['DateScalar'];
  /** work status change user serial number (업무상태변경 회원일련번호) */
  statusUserId: Scalars['Int'];
  /** income type (소득유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Business income business status (사업소득 업무상태) */
export type IncomeProcessBusiness = {
  __typename?: 'IncomeProcessBusiness';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** Income work status employee statistics view (소득업무상태직원통계 뷰) */
  employeeStat?: Maybe<IncomeProcessEmployeeStatView>;
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** Business income statistics view (사업소득통계 뷰) */
  incomeStat?: Maybe<IncomeBusinessStatView>;
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** work status (업무상태) */
  status: Scalars['ProcessStatusScalar'];
  /** Business status change user summary information (업무상태 변경 회원요약정보) */
  statusUpdateUser?: Maybe<CompactUser>;
  /** work status change date (업무상태변경일) */
  statusUpdatedAt: Scalars['DateScalar'];
  /** work status change user serial number (업무상태변경 회원일련번호) */
  statusUserId: Scalars['Int'];
  /** income type (소득유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Statistics on the status of business income based on payment month (지급월 기준 사업소득 업무현황 통계) */
export type IncomeProcessBusinessStatView = {
  __typename?: 'IncomeProcessBusinessStatView';
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** imputed year/month (귀속연월) */
  imputedYearMonth: Scalars['Int'];
  /** number of income cases (소득건수) */
  incomeCount: Scalars['Int'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
};

/** Income work status employee statistics view (소득업무상태직원통계 뷰) */
export type IncomeProcessEmployeeStatView = {
  __typename?: 'IncomeProcessEmployeeStatView';
  /** number of employees (직원수) */
  employeeCount: Scalars['Int'];
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** inputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** number of employees who left the company (퇴사직원수) */
  retireEmployeeCount: Scalars['Int'];
  /** income type (소득유형) */
  type: Scalars['Int'];
};

/** Extra income business status (기타소득 업무상태) */
export type IncomeProcessExtra = {
  __typename?: 'IncomeProcessExtra';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** Income work status employee statistics view (소득업무상태직원통계 뷰) */
  employeeStat?: Maybe<IncomeProcessEmployeeStatView>;
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** Extra income statistics view (기타소득통계 뷰) */
  incomeStat?: Maybe<IncomeExtraStatView>;
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** work status (업무상태) */
  status: Scalars['ProcessStatusScalar'];
  /** Business status change user summary information (업무상태 변경 회원요약정보) */
  statusUpdateUser?: Maybe<CompactUser>;
  /** work status change date (업무상태변경일) */
  statusUpdatedAt: Scalars['DateScalar'];
  /** work status change user serial number (업무상태변경 회원일련번호) */
  statusUserId: Scalars['Int'];
  /** income type (소득유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Statistics on the status of other income based on payment month (지급월 기준 기타소득 업무현황 통계) */
export type IncomeProcessExtraStatView = {
  __typename?: 'IncomeProcessExtraStatView';
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** imputed year/month (귀속연월) */
  imputedYearMonth: Scalars['Int'];
  /** number of income cases (소득건수) */
  incomeCount: Scalars['Int'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
};

/** Income business status key input (소득 업무상태 키 입력) */
export type IncomeProcessKeyInput = {
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
};

/** Income business status change history (소득 업무상태 변경이력) */
export type IncomeProcessLog = {
  __typename?: 'IncomeProcessLog';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** remarks (비고) */
  remark: Scalars['String'];
  /** work status (업무상태) */
  status: Scalars['ProcessStatusScalar'];
  /** work status change date (업무상태변경일) */
  statusUpdatedAt: Scalars['DateScalar'];
  /** work status change user serial number (업무상태변경 회원일련번호) */
  statusUserId: Scalars['Int'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** income type (소득유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Retirement income business status (퇴직소득 업무상태) */
export type IncomeProcessRetirement = {
  __typename?: 'IncomeProcessRetirement';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** Income work status employee statistics view (소득업무상태직원통계 뷰) */
  employeeStat?: Maybe<IncomeProcessEmployeeStatView>;
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** Retirement income statistics view (퇴직소득통계 뷰) */
  incomeStat?: Maybe<IncomeRetirementStatView>;
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** work status (업무상태) */
  status: Scalars['ProcessStatusScalar'];
  /** Business status change user summary information (업무상태 변경 회원요약정보) */
  statusUpdateUser?: Maybe<CompactUser>;
  /** work status change date (업무상태변경일) */
  statusUpdatedAt: Scalars['DateScalar'];
  /** work status change user serial number (업무상태변경 회원일련번호) */
  statusUserId: Scalars['Int'];
  /** income type (소득유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Wage income business status (근로소득 업무상태) */
export type IncomeProcessWage = {
  __typename?: 'IncomeProcessWage';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** Income work status employee statistics view (소득업무상태직원통계 뷰) */
  employeeStat?: Maybe<IncomeProcessEmployeeStatView>;
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** Wage income statistics view (근로소득통계 뷰) */
  incomeStat?: Maybe<IncomeWageStatView>;
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** work status (업무상태) */
  status: Scalars['ProcessStatusScalar'];
  /** Business status change user summary information (업무상태 변경 회원요약정보) */
  statusUpdateUser?: Maybe<CompactUser>;
  /** work status change date (업무상태변경일) */
  statusUpdatedAt: Scalars['DateScalar'];
  /** work status change user serial number (업무상태변경 회원일련번호) */
  statusUserId: Scalars['Int'];
  /** income type (소득유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Daily wage income business status (일용직근로소득 업무상태) */
export type IncomeProcessWageDaily = {
  __typename?: 'IncomeProcessWageDaily';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** Income work status employee statistics view (소득업무상태직원통계 뷰) */
  employeeStat?: Maybe<IncomeProcessEmployeeStatView>;
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** Daily wage income statistics view (일용직근로소득통계 뷰) */
  incomeStat?: Maybe<IncomeWageDailyStatView>;
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** work status (업무상태) */
  status: Scalars['ProcessStatusScalar'];
  /** Business status change user summary information (업무상태 변경 회원요약정보) */
  statusUpdateUser?: Maybe<CompactUser>;
  /** work status change date (업무상태변경일) */
  statusUpdatedAt: Scalars['DateScalar'];
  /** work status change user serial number (업무상태변경 회원일련번호) */
  statusUserId: Scalars['Int'];
  /** income type (소득유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Statistics on the status of daily wage income based on payment month (지급월 기준 일용직근로소득 업무현황 통계) */
export type IncomeProcessWageDailyStatView = {
  __typename?: 'IncomeProcessWageDailyStatView';
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** imputed year/month (귀속연월) */
  imputedYearMonth: Scalars['Int'];
  /** number of income cases (소득건수) */
  incomeCount: Scalars['Int'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
};

/** Work status statistics of wage income based on month of payment (지급월 기준 근로소득 업무상태 통계) */
export type IncomeProcessWageStatView = {
  __typename?: 'IncomeProcessWageStatView';
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** imputed year/month (귀속연월) */
  imputedYearMonth: Scalars['Int'];
  /** number of income cases (소득건수) */
  incomeCount: Scalars['Int'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
};

/** Retirement income (퇴직소득) */
export type IncomeRetirement = {
  __typename?: 'IncomeRetirement';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** differential payment (차인지급액) */
  actualPayment: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
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
  ip: Scalars['String'];
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
  settlementFinishDate: Scalars['Int'];
  /** date of joining / starting settlement [YYYYMMDD] (입사일/정산시작일) */
  settlementStartDate: Scalars['Int'];
  /** Retirement income specification (퇴직소득명세) */
  specification?: Maybe<IncomeRetirementSpecification>;
  /** retirement income specification serial number (퇴직소득명세일련번호) */
  specificationId?: Maybe<Scalars['Int']>;
  /** taxable retirement benefits (과세대상퇴직급여) */
  taxableRetirementBenefits: Scalars['Int'];
  /** total deduction (공제합계) */
  totalDeduction: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax: Scalars['Int'];
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax: Scalars['Int'];
  /** withholding rural special tax (원천징수농어촌특별세) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Int']>;
};

/** Retirement income calculation input (퇴직소득계산 입력) */
export type IncomeRetirementCalculationInput = {
  /** additional days (가산일수) */
  additionalDays: Scalars['Int'];
  /** annual allowance (연차수당) */
  annualLeaveAllowance: Scalars['Int'];
  /** number of days excluded (제외일수) */
  exclusionDays: Scalars['Int'];
  /** date of resignation / settlement end [YYYYMMDD] (퇴사일/정산종료일) */
  settlementFinishDate: Scalars['Int'];
  /** date of joining / starting settlement [YYYYMMDD] (입사일/정산시작일) */
  settlementStartDate: Scalars['Int'];
  /** total annual bonus amount (연간 상여금 총액) */
  totalAnualBonus: Scalars['Int'];
  /** total wage for 3 months before retirement / pre-tax (퇴직전3개월임금총액/세전) */
  totalPay3Month: Scalars['Int'];
};

/** Retirement income registration input (퇴직소득 등록 입력) */
export type IncomeRetirementCreateInput = {
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employee type (직원유형) */
  employeeType: Scalars['Int'];
  /** executive status (임원여부) */
  executive: Scalars['Boolean'];
  /** payment day (지급일) */
  paymentDay: Scalars['Int'];
  /** reason for retirement (퇴직사유) */
  retirementReason: Scalars['Int'];
  /** Retirement income classification (퇴직소득구분) */
  retirementType: Scalars['Int'];
};

/** Retirement income change history (퇴직소득 변경이력) */
export type IncomeRetirementLog = {
  __typename?: 'IncomeRetirementLog';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** differential payment (차인지급액) */
  actualPayment: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employee type (직원유형) */
  employeeType: Scalars['Int'];
  /** income serial number (소득일련번호) */
  incomeId: Scalars['Int'];
  /** income payment (소득지급) */
  incomePayment: Scalars['Int'];
  /** income classification code (소득구분코드) */
  incomeTypeCode: Scalars['String'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** non-taxable retirement benefits (비과세퇴직급여) */
  nonTaxableRetirementBenefits: Scalars['Int'];
  /** payment day (지급일) */
  paymentDay: Scalars['Int'];
  /** previous payment day (이전지급일) */
  prevPaymentDay?: Maybe<Scalars['Int']>;
  /** remarks (비고) */
  remark: Scalars['String'];
  /** retirement benefit (퇴직급여) */
  retirementBenefits: Scalars['Int'];
  /** Retirement income classification (퇴직소득구분) */
  retirementType: Scalars['Int'];
  /** date of resignation / settlement end [YYYYMMDD] (퇴사일/정산종료일) */
  settlementFinishDate: Scalars['Int'];
  /** date of joining / starting settlement [YYYYMMDD] (입사일/정산시작일) */
  settlementStartDate: Scalars['Int'];
  /** retirement income specification serial number (퇴직소득명세일련번호) */
  specificationId?: Maybe<Scalars['Int']>;
  /** taxable retirement benefits (과세대상퇴직급여) */
  taxableRetirementBenefits: Scalars['Int'];
  /** total deduction (공제합계) */
  totalDeduction: Scalars['Int'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax: Scalars['Int'];
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax: Scalars['Int'];
  /** withholding rural special tax (원천징수농어촌특별세) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Int']>;
};

/** Retirement income payment statement electronic filing (퇴직소득지급명세서 전자신고) */
export type IncomeRetirementPaymentStatementElectronicFiling = {
  __typename?: 'IncomeRetirementPaymentStatementElectronicFiling';
  /** Company (사업자) */
  company: Company;
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** last production request date (최종제작요청일) */
  lastProductionRequestedAt?: Maybe<Scalars['DateScalar']>;
};

/** Retirement income statement (퇴직소득명세) */
export type IncomeRetirementSpecification = {
  __typename?: 'IncomeRetirementSpecification';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** annual allowance (연차수당) */
  annualLeaveAllowance: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** defined retirement benefits (확정퇴직급여) */
  definedRetirementBenefits: Scalars['Int'];
  /** executive status (임원여부) */
  executive: Scalars['Boolean'];
  /** estimated retirement benefits (예상퇴직급여) */
  expectedRetirementBenefits: Scalars['Int'];
  /** retirement income specification serial number (퇴직소득명세일련번호) */
  id: Scalars['Int'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** defined non-taxable retirement benefits (확정비과세퇴직급여) */
  nonTaxableRetirementBenefits: Scalars['Int'];
  /** reason for retirement (퇴직사유) */
  retirementReason: Scalars['Float'];
  /** Retirement income details (퇴직소득명세 상세) */
  specificationDetail: IncomeRetirementSpecificationDetail;
  /** determined taxable retirement benefits (확정과세대상퇴직급여) */
  taxableRetirementBenefits: Scalars['Int'];
  /** total annual bonus amount (연간 상여금 총액) */
  totalAnualBonus: Scalars['Int'];
  /** total wage for 3 months before retirement / pre-tax (퇴직전3개월임금총액/세전) */
  totalPay3Month: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Retirement income details (퇴직소득명세 상세) */
export type IncomeRetirementSpecificationDetail = {
  __typename?: 'IncomeRetirementSpecificationDetail';
  /** Calculation of deferred retirement income tax amount (이연퇴직소득세액계산) */
  calculationOfDeferredRetirementIncomeTax: CalculationOfDeferredRetirementIncomeTax;
  /** Payment details / deductible source tax amount (납부명세/차감원천징수세액) */
  deductibleWithholdingTax: DeductibleWithholdingTax;
  /** Last retired years of service (최종 퇴직근속연수) */
  lastRetiredYearsOfService: RetiredYearsOfService;
  /** Last retirement benefit status (최종 퇴직급여현황) */
  lastRetirementBenefitStatus: RetirementBenefitStatus;
  /** Previous retired years of service (이전 퇴직근속연수) */
  prevRetiredYearsOfService?: Maybe<RetiredYearsOfService>;
  /** Previous retirement benefit status (이전 퇴직급여현황) */
  prevRetirementBenefitStatus?: Maybe<RetirementBenefitStatus>;
  /** Deferred retirement income tax (이연퇴직소득세) */
  retirementIncomeTax: RetirementIncomeTax;
  /** Settlement retired years of service (정산 퇴직근속연수) */
  settlementRetiredYearsOfService: RetiredYearsOfService;
  /** Settlement retirement benefit status (정산 퇴직급여현황) */
  settlementRetirementBenefitStatus: RetirementBenefitStatus;
  /** Tax amount calculation (세액계산) */
  taxAmountCalculation: TaxAmountCalculation;
  /** Tax amount to be reported (신고대상세액) */
  taxAmountToBeReported: TaxAmountToBeReported;
  /** Tax base calculation (과세표준계산) */
  taxBaseCalculation: TaxBaseCalculation;
};

/** Retirement income statistics view (퇴직소득통계 뷰) */
export type IncomeRetirementStatView = {
  __typename?: 'IncomeRetirementStatView';
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** inputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** total income payment (소득지급합계) */
  incomePayment: Scalars['Float'];
  /** non-taxable retirement benefits (비과세퇴직급여) */
  nonTaxableRetirementBenefits: Scalars['Int'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** retirement benefit (퇴직급여) */
  retirementBenefits: Scalars['Int'];
  /** taxable retirement benefits (과세대상퇴직급여) */
  taxableRetirementBenefits: Scalars['Int'];
  /** total withholding income tax (원천징수소득세합계) */
  withholdingIncomeTax: Scalars['Float'];
  /** total withholding local income tax (원천징수지방소득세합계) */
  withholdingLocalIncomeTax: Scalars['Float'];
  /** total withholding rural special tax (원천징수농어촌특별세합계) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Float']>;
};

/** Retirement income tax calculation input (퇴직소득세 계산 입력) */
export type IncomeRetirementTaxCalculationInput = {
  /** Calculation of deferred retirement income tax amount input (이연퇴직소득세액계산 입력) */
  calculationOfDeferredRetirementIncomeTax: CalculationOfDeferredRetirementIncomeTaxInput;
  /** Last retired years of service (최종 퇴직근속연수) */
  lastRetiredYearsOfService: RetiredYearsOfServiceInput;
  /** Last retirement benefit status (최종 퇴직급여현황) */
  lastRetirementBenefitStatus: RetirementBenefitStatusInput;
  /** previously paid / delayed tax amount (기납부/기과세이연세액) */
  prePaidDelayedTaxPaymentTaxAmount: Scalars['Int'];
  /** Previous retired years of service (이전 퇴직근속연수) */
  prevRetiredYearsOfService?: InputMaybe<RetiredYearsOfServiceInput>;
  /** Previous retirement benefit status (이전 퇴직급여현황) */
  prevRetirementBenefitStatus?: InputMaybe<RetirementBenefitStatusInput>;
  /** tax credit (세액공제) */
  taxCredit: Scalars['Int'];
};

/** Retirement income correction input (퇴직소득 수정 입력) */
export type IncomeRetirementUpdateInput = {
  /** executive status (임원여부) */
  executive: Scalars['Boolean'];
  /** reason for retirement (퇴직사유) */
  retirementReason: Scalars['Int'];
  /** Retirement income classification (퇴직소득구분) */
  retirementType: Scalars['Int'];
};

/** Retirement income withholding receipt input (퇴직소득 원천징수영수증 입력) */
export type IncomeRetirementWithholdingReceiptInput = {
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** date of receipt / YYYYMMDD (영수일) */
  receiptDate: Scalars['Int'];
  /** Retirement income withholding receipt type (퇴직소득 원천징수영수증 유형) / For keeping income earners (소득자 보관용) = 1, For issuer storage (발행자 보관용) = 2, For issuer reporting (발행자 보고용) = 3 */
  type: Scalars['Int'];
};

/** Retirement income withholding receipt search filter (퇴직소득 원천징수영수증 검색 필터) */
export type IncomeRetirementWithholdingReceiptSearchFilter = {
  /** search finish month (검색종료월) */
  finishMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** search start month (검색시작월) */
  startMonth: Scalars['Int'];
  /** Retirement income classification (퇴직소득구분) : 퇴직(1), 중간(2) */
  type?: InputMaybe<Scalars['Int']>;
};

/** Request to send income email input (소득 이메일발송요청 입력) */
export type IncomeSendEmailRequestInput = {
  /** income serial number (소득일련번호) */
  incomeId: Scalars['Int'];
  /** recipient address (수신자주소) */
  receiverAddress: Scalars['String'];
  /** recipient name (수신자명) */
  receiverName: Scalars['String'];
  /** sender name (발신자명) */
  senderName: Scalars['String'];
};

/** Enquiry of income data in the withholding tax performance report input (원천징수이행상황신고서 소득자료 조회 입력) */
export type IncomeTaxWithholdingStatusReportInput = {
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** corrected order (수정차수) */
  index: Scalars['Int'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment type (지급유형) */
  paymentType: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** reporting type (신고유형) */
  reportType: Scalars['Int'];
  /** year-end tax adjustment included (연말정산 포함여부) */
  yearEndTaxAdjustment: Scalars['Boolean'];
};

/** Wage income (근로소득) */
export type IncomeWage = {
  __typename?: 'IncomeWage';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** differential payment (차인지급액) */
  actualPayment: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** Deduction item list of wage income (근로소득/공제항목 목록) */
  deductionItems?: Maybe<Array<IncomeWageDeductionItem>>;
  /** Wage income earner (근로소득자) */
  employee?: Maybe<EmployeeWage>;
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
  /** intermidiate retirement income tax (중도퇴사소득세) */
  intermidiateIncomeTax?: Maybe<Scalars['Int']>;
  /** intermidiate retirement local income tax (중도퇴사지방소득세) */
  intermidiateLocalIncomeTax?: Maybe<Scalars['Int']>;
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** Mid-Term Settlement status (중도정산 여부) */
  midTermSettlement?: Maybe<Scalars['Boolean']>;
  /** number of extended working hours (연장근로시간수) */
  overtimeWorkingHours: Scalars['Int'];
  /** Pay item list of wage income (근로소득/소득항목 목록) */
  payItems?: Maybe<Array<IncomeWagePayItem>>;
  /** payment day (지급일) */
  paymentDay: Scalars['Int'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** previous payment day (이전지급일) */
  prevPaymentDay?: Maybe<Scalars['Int']>;
  /** total deduction (공제합계) */
  totalDeduction: Scalars['Int'];
  /** total salary + allowance (급여+재수당합계) */
  totalPay: Scalars['Int'];
  /** total taxable benefits (과세급여헙계) */
  totalTaxPay: Scalars['Int'];
  /** total non-taxable benefits (비과세급여합계) */
  totalTaxfreePay: Scalars['Int'];
  /** total number of working hours (총근로시간수) */
  totalWorkingHours: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax: Scalars['Int'];
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax: Scalars['Int'];
  /** withholding rural special tax (원천징수농어촌특별세) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Int']>;
  /** number of working days (근무일수) */
  workingDays: Scalars['Int'];
  /** number of working hours at night (야간근로시간수) */
  workingHoursAtNight: Scalars['Int'];
  /** number of working hours on holidays (휴일근로시간수) */
  workingHoursOnHolidays: Scalars['Int'];
  /** year-end settlement income tax (연말정산소득세) */
  yearEndSettlementIncomeTax?: Maybe<Scalars['Int']>;
  /** year-end settlement local income tax (연말정산지방소득세) */
  yearEndSettlementLocalIncomeTax?: Maybe<Scalars['Int']>;
  /** year-end settlement rural special tax (연말정산농어촌특별세) */
  yearEndSettlementRuralSpecialTax?: Maybe<Scalars['Int']>;
};

/** Wage income registration input (근로소득 등록 입력) */
export type IncomeWageCreateInput = {
  /** Deduction item input list (공제항목 입력 목록) */
  deductionItems: Array<DeductionItemInput>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** number of extended working hours (연장근로시간수) */
  overtimeWorkingHours: Scalars['Int'];
  /** Pay item input list (급여항목 입력 목록) */
  payItems: Array<PayItemInput>;
  /** payment day (지급일) */
  paymentDay: Scalars['Int'];
  /** total number of working hours (총근로시간수) */
  totalWorkingHours: Scalars['Int'];
  /** number of working days (근무일수) */
  workingDays: Scalars['Int'];
  /** number of working hours at night (야간근로시간수) */
  workingHoursAtNight: Scalars['Int'];
  /** number of working hours on holidays (휴일근로시간수) */
  workingHoursOnHolidays: Scalars['Int'];
};

/** Daily wage income (일용직근로소득) */
export type IncomeWageDaily = {
  __typename?: 'IncomeWageDaily';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** differential payment (차인지급액) */
  actualPayment: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** daily wage (일급여) */
  dailyWage: Scalars['Int'];
  /** Deduction item list of daily wage income (일용직근로소득/공제항목 목록) */
  deductionItems?: Maybe<Array<IncomeWageDailyDeductionItem>>;
  /** Daily wage income earner (일용직근로소득자) */
  employee?: Maybe<EmployeeWageDaily>;
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
  ip: Scalars['String'];
  /** monthly wage (월급여) */
  monthlyWage: Scalars['Int'];
  /** payment day (지급일) */
  paymentDay: Scalars['Int'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** previous payment day (이전지급일) */
  prevPaymentDay?: Maybe<Scalars['Int']>;
  /** total deduction (공제합계) */
  totalDeduction: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax: Scalars['Int'];
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax: Scalars['Int'];
  /** withholding rural special tax (원천징수농어촌특별세) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Int']>;
  /** number of working days (근무일수) */
  workingDays: Scalars['Int'];
};

/** Daily wage income registration input (일용직근로소득 등록 입력) */
export type IncomeWageDailyCreateInput = {
  /** daily wage (일급여) */
  dailyWage: Scalars['Int'];
  /** Deduction item input list (공제항목 입력 목록) */
  deductionItems: Array<DeductionItemInput>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** monthly wage (월급여) */
  monthlyWage: Scalars['Int'];
  /** payment day (지급일) */
  paymentDay: Scalars['Int'];
  /** number of working days (근무일수) */
  workingDays: Scalars['Int'];
};

/** Deduction item of daily wage income (일용직근로소득/공제항목) */
export type IncomeWageDailyDeductionItem = {
  __typename?: 'IncomeWageDailyDeductionItem';
  /** amount (급액) */
  amount: Scalars['Int'];
  /** item code (항목코드) */
  itemCode: Scalars['Int'];
};

/** Daily wage income change history (일용직근로소득 변경이력) */
export type IncomeWageDailyLog = {
  __typename?: 'IncomeWageDailyLog';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** differential payment (차인지급액) */
  actualPayment: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** daily wage (일급여) */
  dailyWage: Scalars['Int'];
  /** Deduction item list information (공제항목 목록 정보) */
  deductionItemsInfo?: Maybe<Scalars['String']>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employee type (직원유형) */
  employeeType: Scalars['Int'];
  /** income serial number (소득일련번호) */
  incomeId: Scalars['Int'];
  /** income payment (소득지급) */
  incomePayment: Scalars['Int'];
  /** income classification code (소득구분코드) */
  incomeTypeCode: Scalars['String'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** monthly wage (월급여) */
  monthlyWage: Scalars['Int'];
  /** payment day (지급일) */
  paymentDay: Scalars['Int'];
  /** previous payment day (이전지급일) */
  prevPaymentDay?: Maybe<Scalars['Int']>;
  /** remarks (비고) */
  remark: Scalars['String'];
  /** total deduction (공제합계) */
  totalDeduction: Scalars['Int'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax: Scalars['Int'];
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax: Scalars['Int'];
  /** withholding rural special tax (원천징수농어촌특별세) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Int']>;
  /** number of working days (근무일수) */
  workingDays: Scalars['Int'];
};

/** Daily wage income payment statement electronic filing (일용근로소득지급명세서 전자신고) */
export type IncomeWageDailyPaymentStatementElectronicFiling = {
  __typename?: 'IncomeWageDailyPaymentStatementElectronicFiling';
  /** Company (사업자) */
  company: Company;
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** last production request date (최종제작요청일) */
  lastProductionRequestedAt?: Maybe<Scalars['DateScalar']>;
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
};

/** Daily wage income statistics view (일용직근로소득통계 뷰) */
export type IncomeWageDailyStatView = {
  __typename?: 'IncomeWageDailyStatView';
  /** total differential payment (차인지급액합계) */
  actualPayment: Scalars['Float'];
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** inputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** total income payment (소득지급합계) */
  incomePayment: Scalars['Float'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** total deduction (공제합계) */
  totalDeduction: Scalars['Float'];
  /** total withholding income tax (원천징수소득세합계) */
  withholdingIncomeTax: Scalars['Float'];
  /** total withholding local income tax (원천징수지방소득세합계) */
  withholdingLocalIncomeTax: Scalars['Float'];
  /** total withholding rural special tax (원천징수농어촌특별세합계) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Float']>;
};

/** Daily wage income correction input (일용직근로소득 수정 입력) */
export type IncomeWageDailyUpdateInput = {
  /** daily wage (일급여) */
  dailyWage: Scalars['Int'];
  /** Deduction item input list (공제항목 입력 목록) */
  deductionItems: Array<DeductionItemInput>;
  /** monthly wage (월급여) */
  monthlyWage: Scalars['Int'];
  /** number of working days (근무일수) */
  workingDays: Scalars['Int'];
};

/** Daily wage income withholding receipt input (일용직근로소득 원천징수영수증 입력) */
export type IncomeWageDailyWithholdingReceiptInput = {
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** payment year/month [YYYYMM] list (지급연/월 목록) */
  paymentYearMonths: Array<Scalars['Int']>;
  /** date of receipt / YYYYMMDD (영수일) */
  receiptDate: Scalars['Int'];
  /** Daily wage income withholding receipt type (일용직근로소득 원천징수영수증 유형) / For keeping income earners (소득자 보관용) = 1, For keeping payer (지급자 보관용) = 2 */
  type: Scalars['Int'];
};

/** Report on withholding receipt of daily wage income summary by employees (일용직근로소득 원천징수영수증 리포트 직원 별 요약) */
export type IncomeWageDailyWithholdingReceiptReportSummariesByEmployee = {
  __typename?: 'IncomeWageDailyWithholdingReceiptReportSummariesByEmployee';
  /** Daily wage income earner (일용직근로소득자) */
  employee?: Maybe<EmployeeWageDaily>;
  /** total taxable benefits (과세급여헙계) */
  totalTaxPay: Scalars['Int'];
  /** total non-taxable benefits (비과세급여합계) */
  totalTaxfreePay: Scalars['Int'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax: Scalars['Int'];
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax: Scalars['Int'];
};

/** Daily wage income withholding receipt search filter (일용직근로소득 원천징수영수증 검색 필터) */
export type IncomeWageDailyWithholdingReceiptSearchFilter = {
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** payment year/month [YYYYMM] list (지급연/월 목록) */
  paymentYearMonths: Array<Scalars['Int']>;
};

/** Deduction item of wage income (근로소득/공제항목) */
export type IncomeWageDeductionItem = {
  __typename?: 'IncomeWageDeductionItem';
  /** amount (급액) */
  amount: Scalars['Int'];
  /** item code (항목코드) */
  itemCode: Scalars['Int'];
};

/** Wage income change history (근로소득 변경이력) */
export type IncomeWageLog = {
  __typename?: 'IncomeWageLog';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** differential payment (차인지급액) */
  actualPayment: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** Deduction item list information (공제항목 목록 정보) */
  deductionItemsInfo?: Maybe<Scalars['String']>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employee type (직원유형) */
  employeeType: Scalars['Int'];
  /** income serial number (소득일련번호) */
  incomeId: Scalars['Int'];
  /** income payment (소득지급) */
  incomePayment: Scalars['Int'];
  /** income classification code (소득구분코드) */
  incomeTypeCode: Scalars['String'];
  /** intermidiate retirement income tax (중도퇴사소득세) */
  intermidiateIncomeTax?: Maybe<Scalars['Int']>;
  /** intermidiate retirement local income tax (중도퇴사지방소득세) */
  intermidiateLocalIncomeTax?: Maybe<Scalars['Int']>;
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** number of extended working hours (연장근로시간수) */
  overtimeWorkingHours: Scalars['Int'];
  /** Pay item list information (소득항목 목록 정보) */
  payItemsInfo?: Maybe<Scalars['String']>;
  /** payment day (지급일) */
  paymentDay: Scalars['Int'];
  /** previous payment day (이전지급일) */
  prevPaymentDay?: Maybe<Scalars['Int']>;
  /** remarks (비고) */
  remark: Scalars['String'];
  /** total deduction (공제합계) */
  totalDeduction: Scalars['Int'];
  /** total salary + allowance (급여+재수당합계) */
  totalPay: Scalars['Int'];
  /** total taxable benefits (과세급여헙계) */
  totalTaxPay: Scalars['Int'];
  /** total non-taxable benefits (비과세급여합계) */
  totalTaxfreePay: Scalars['Int'];
  /** total number of working hours (총근로시간수) */
  totalWorkingHours: Scalars['Int'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax: Scalars['Int'];
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax: Scalars['Int'];
  /** withholding rural special tax (원천징수농어촌특별세) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Int']>;
  /** number of working days (근무일수) */
  workingDays: Scalars['Int'];
  /** number of working hours at night (야간근로시간수) */
  workingHoursAtNight: Scalars['Int'];
  /** number of working hours on holidays (휴일근로시간수) */
  workingHoursOnHolidays: Scalars['Int'];
  /** year-end settlement income tax (연말정산소득세) */
  yearEndSettlementIncomeTax?: Maybe<Scalars['Int']>;
  /** year-end settlement local income tax (연말정산지방소득세) */
  yearEndSettlementLocalIncomeTax?: Maybe<Scalars['Int']>;
  /** year-end settlement rural special tax (연말정산농어촌특별세) */
  yearEndSettlementRuralSpecialTax?: Maybe<Scalars['Int']>;
};

/** Pay item of wage income (근로소득/소득항목) */
export type IncomeWagePayItem = {
  __typename?: 'IncomeWagePayItem';
  /** amount (급액) */
  amount: Scalars['Int'];
  /** item code (항목코드) */
  itemCode: Scalars['Int'];
};

/** Wage income payment statement electronic filing (근로소득지급명세서 전자신고) */
export type IncomeWagePaymentStatementElectronicFiling = {
  __typename?: 'IncomeWagePaymentStatementElectronicFiling';
  /** Company (사업자) */
  company: Company;
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** last production request date (최종제작요청일) */
  lastProductionRequestedAt?: Maybe<Scalars['DateScalar']>;
};

/** Wage income simplified payment statement electronic filing (근로소득간이지급명세서 전자신고) */
export type IncomeWageSimplifiedPaymentStatementElectronicFiling = {
  __typename?: 'IncomeWageSimplifiedPaymentStatementElectronicFiling';
  /** Company (사업자) */
  company: Company;
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** last production request date (최종제작요청일) */
  lastProductionRequestedAt?: Maybe<Scalars['DateScalar']>;
  /** payment half-year period (지급반기) : 상반기(1), 하반기(2) */
  paymentHalfYear: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
};

/** Wage income statistics view (근로소득통계 뷰) */
export type IncomeWageStatView = {
  __typename?: 'IncomeWageStatView';
  /** total differential payment (차인지급액합계) */
  actualPayment: Scalars['Float'];
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** inputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** total income payment (소득지급합계) */
  incomePayment: Scalars['Float'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** total deduction (공제합계) */
  totalDeduction: Scalars['Float'];
  /** total salary + allowance (급여+재수당합계) */
  totalPay: Scalars['Float'];
  /** total taxable benefits (과세급여헙계) */
  totalTaxPay: Scalars['Float'];
  /** total non-taxable benefits (비과세급여합계) */
  totalTaxfreePay: Scalars['Float'];
  /** total withholding income tax (원천징수소득세합계) */
  withholdingIncomeTax: Scalars['Float'];
  /** total withholding local income tax (원천징수지방소득세합계) */
  withholdingLocalIncomeTax: Scalars['Float'];
  /** total withholding rural special tax (원천징수농어촌특별세합계) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Float']>;
};

/** Wage income correction input (근로소득 수정 입력) */
export type IncomeWageUpdateInput = {
  /** Deduction item input list (공제항목 입력 목록) */
  deductionItems: Array<DeductionItemInput>;
  /** number of extended working hours (연장근로시간수) */
  overtimeWorkingHours: Scalars['Int'];
  /** Pay item input list (급여항목 입력 목록) */
  payItems: Array<PayItemInput>;
  /** total number of working hours (총근로시간수) */
  totalWorkingHours: Scalars['Int'];
  /** number of working days (근무일수) */
  workingDays: Scalars['Int'];
  /** number of working hours at night (야간근로시간수) */
  workingHoursAtNight: Scalars['Int'];
  /** number of working hours on holidays (휴일근로시간수) */
  workingHoursOnHolidays: Scalars['Int'];
};

/** Wage income withholding receipt input (근로소득 원천징수영수증 입력) */
export type IncomeWageWithholdingReceiptInput = {
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** date of receipt / YYYYMMDD (영수일) */
  receiptDate: Scalars['Int'];
  /** Wage income withholding receipt type (근로소득 원천징수영수증 유형) / For keeping income earners (소득자 보관용) = 1, For issuer storage (발행자 보관용) = 2, For issuer reporting (발행자 보고용) = 3 */
  type: Scalars['Int'];
};

/** Wage income withholding receipt search filter (근로소득 원천징수영수증 검색 필터) */
export type IncomeWageWithholdingReceiptSearchFilter = {
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** whether to leave the company in the middle (중도퇴사여부) */
  leaved?: InputMaybe<Scalars['Boolean']>;
  /** name (이름) */
  name?: InputMaybe<Scalars['String']>;
};

/** Wage income withholding tax by employee (소득자별 근로소득원천징수영수부) */
export type IncomeWageWithholdingTaxByEmployee = {
  __typename?: 'IncomeWageWithholdingTaxByEmployee';
  /** Wage income earner (근로소득자) */
  employee?: Maybe<EmployeeWage>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** total salary + allowance (급여+재수당합계) */
  totalPay: Scalars['Int'];
};

/** Wage income withholding tax by employee input (소득자별 근로소득원천징수영수부 입력) */
export type IncomeWageWithholdingTaxByEmployeeInput = {
  /** date of create / YYYYMMDD (작성일) */
  createDate?: InputMaybe<Scalars['Int']>;
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** print option (출력 옵션) / 근로소득지급명세서(1), 비과세소득(2), 근로소득원천징수액등(3) */
  printOption?: InputMaybe<Scalars['Int']>;
};

/** Wage income withholding tax by employee search filter (소득자별 근로소득원천징수영수부 검색 필터) */
export type IncomeWageWithholdingTaxByEmployeeSearchFilter = {
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** whether to leave the company in the middle (중도퇴사여부) */
  leaved?: InputMaybe<Scalars['Boolean']>;
};

/** Year-end tax adjustment (연말정산) */
export type IncomeYearEndTaxAdjustment = {
  __typename?: 'IncomeYearEndTaxAdjustment';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** annual earned income (연간근로소득) */
  annualEarnedIncome: Scalars['Int'];
  /** calculated tax amount (산출세액) */
  calculationTaxAmount: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** determined tax amount (결정세액) */
  decidedTaxAmount: Scalars['Int'];
  /** deductible tax amount (차감징수세액) */
  deductibleTaxAmount: Scalars['Int'];
  /** earned income amount (근로소득금액) */
  earnedIncomeAmount: Scalars['Int'];
  /** earned income deduction (근로소득공제) */
  earnedIncomeDeduction: Scalars['Int'];
  /** Wage income earner (근로소득자) */
  employee?: Maybe<EmployeeWage>;
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
  ip: Scalars['String'];
  /** whether to leave the company in the middle (중도퇴사여부) */
  leaved: Scalars['Boolean'];
  /** other income deductions (그밖의소득공제) */
  otherIncomeDeduction: Scalars['Int'];
  /** payment day (지급일) */
  paymentDay: Scalars['Int'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** pension premium deduction (연금보험료공제) */
  pensionPremiumDeduction: Scalars['Int'];
  /** personal deduction (인적공제) */
  personalDeduction: Scalars['Int'];
  /** previously paid tax amount (기납부세액) */
  prePaidTaxAmount: Scalars['Int'];
  /** previous payment day (이전지급일) */
  prevPaymentDay?: Maybe<Scalars['Int']>;
  /** special income deduction (특별소득공제) */
  specialIncomeDeduction: Scalars['Int'];
  /** tax credit (세액공제) */
  taxCredit: Scalars['Int'];
  /** tax-free income (비과세소득) */
  taxFreeIncome: Scalars['Int'];
  /** tax reduction (세액감면) */
  taxReduction: Scalars['Int'];
  /** tax base (과세표준) */
  taxStandard: Scalars['Int'];
  /** total salary amount (총급여액) */
  totalSalary: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** withholding income tax (원천징수소득세) */
  withholdingIncomeTax: Scalars['Int'];
  /** withholding local income tax (원천징수지방소득세) */
  withholdingLocalIncomeTax: Scalars['Int'];
  /** withholding rural special tax (원천징수농어촌특별세) */
  withholdingRuralSpecialTax?: Maybe<Scalars['Int']>;
};

/** Last scraping status of bankbook (통장의 최종 스크래핑현황) */
export type LastScrapingStatus = {
  __typename?: 'LastScrapingStatus';
  /** error message (에러메시지) */
  errorMessage?: Maybe<Scalars['String']>;
  /** last scraping date (최종스크래핑일자) */
  lastScrapingDate?: Maybe<Scalars['DateScalar']>;
  /** scraping status (스크래핑 상태) */
  scrapingStatus?: Maybe<Scalars['String']>;
};

/** Local income tax electronic filing (지방소득세 전자신고) */
export type LocalIncomeTaxElectronicFiling = {
  __typename?: 'LocalIncomeTaxElectronicFiling';
  /** status after expiration date (기한후 여부) */
  afterDeadline: Scalars['Boolean'];
  /** Company (사업자) */
  company: Company;
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** corrected order (수정차수) */
  index: Scalars['Int'];
  /** last production request date (최종제작요청일) */
  lastProductionRequestedAt?: Maybe<Scalars['DateScalar']>;
  /** local income tax amount (지방소득납부세액) */
  localIncomeTaxAmount: Scalars['Int'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** withholding tax performance report serial number (원천징수이행상황신고서 일련번호) */
  reportId: Scalars['Int'];
  /** reporting type (신고유형/주기) */
  reportType: Scalars['Int'];
  /** work status change date (업무상태변경일) */
  statusUpdatedAt: Scalars['DateScalar'];
};

/** Login response (로그인 응답) */
export type LoginResponse = {
  __typename?: 'LoginResponse';
  /** access token (억세스토큰) */
  accessToken: Scalars['String'];
  /** refresh token (리프레시토큰) */
  refreshToken: Scalars['String'];
};

/** Major insurance company employee acquisition (4대보험직원취득) */
export type MajorInsuranceCompanyEmployeeAcquisition = {
  __typename?: 'MajorInsuranceCompanyEmployeeAcquisition';
  /** acceptance number (접수번호) */
  accedpedNumber?: Maybe<Scalars['String']>;
  /** acceptance date (접수일) */
  acceptedAt?: Maybe<Scalars['DateScalar']>;
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** completion date (완료일) */
  completedAt?: Maybe<Scalars['DateScalar']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** dependents evidence file storage serial number (피부양자증빙 파일저장 일련번호) */
  dependentsEvidenceFileStorageId?: Maybe<Scalars['Int']>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employee type (직원유형) */
  employeeType: Scalars['Int'];
  /** employeement insurance report status (고용보험신고여부) */
  employeementInsuranceReport: Scalars['Boolean'];
  /** health insurance report status (건강보험신고여부) */
  healthInsuranceReport: Scalars['Boolean'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** whether dependents are included (피부양자포함여부) */
  includeDependents: Scalars['Boolean'];
  /** industrial accident insurance report status (산재보험신고여부) */
  industrialAccidentInsuranceReport: Scalars['Boolean'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** memo (메모) */
  memo?: Maybe<Scalars['String']>;
  /** name (이름) */
  name: Scalars['String'];
  /** national pension report status (국민연금신고여부) */
  nationalPensionReport: Scalars['Boolean'];
  /** registration date (등록일) */
  registeredAt: Scalars['DateScalar'];
  /** resident registration number / foreigner number (주민등록번호 / 외국인번호) */
  residentId: Scalars['String'];
  /** major insurance company employee type (4대보험직원 유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** major insurance company employee work serial number (4대보험직원업무 일련번호) */
  workId: Scalars['Int'];
  /** Major insurance working status (4대보험 업무상태) */
  workingStatus: Scalars['Int'];
};

/** Acquisition of major insurance employees dependents input (4대보험직원취득 피부양자 입력) */
export type MajorInsuranceCompanyEmployeeAcquisitionDependentInput = {
  /** name (이름) */
  name: Scalars['String'];
  /** foreign nationality number (외국인국적번호) */
  nationalityNumber?: InputMaybe<Scalars['Int']>;
  /** dependent relationship code (피부양자관계코드) */
  relationCode: Scalars['Int'];
  /** resident registration number / foreigner number (주민등록번호/외국인번호) / Format : 13자리 숫자 */
  residentId: Scalars['String'];
  /** period of stay [YYYYMMDD] (체류기간/외국인한정) */
  stayPeriod?: InputMaybe<Scalars['Int']>;
  /** the qualifications required to stay (체류자격/외국인한정) */
  stayQualification?: InputMaybe<Scalars['String']>;
};

/** Acquisition of major insurance employees input (4대보험직원취득 입력) */
export type MajorInsuranceCompanyEmployeeAcquisitionInput = {
  /** acquisition month payment status (취득월 납부희망여부) */
  acquisitionMonthPayment?: InputMaybe<Scalars['Boolean']>;
  /** expiration date of the contract (계약만료일) */
  contractExpiredDate?: InputMaybe<Scalars['Int']>;
  /** contract worker status (계약직여부) */
  contractWorker?: InputMaybe<Scalars['Boolean']>;
  /** Acquisition of major insurance employees dependents input list (4대보험직원취득 피부양자 입력 목록) */
  dependents?: InputMaybe<Array<MajorInsuranceCompanyEmployeeAcquisitionDependentInput>>;
  /** dependents evidence file storage serial number (피부양자증빙 파일저장 일련번호) */
  dependentsEvidenceFileStorageId?: InputMaybe<Scalars['Int']>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employee type (직원유형) */
  employeeType: Scalars['Int'];
  /** employeement insurance report status (고용보험신고여부) */
  employeementInsuranceReport: Scalars['Boolean'];
  /** health insurance acquisition code (건강보험 취득부호) */
  healthInsuranceAcquisitionCode?: InputMaybe<Scalars['Int']>;
  /** health insurance report status (건강보험신고여부) */
  healthInsuranceReport: Scalars['Boolean'];
  /** whether dependents are included (피부양자포함여부) */
  includeDependents?: InputMaybe<Scalars['Boolean']>;
  /** industrial accident insurance report status (산재보험신고여부) */
  industrialAccidentInsuranceReport: Scalars['Boolean'];
  /** insurance reduction code (보험료감면부호) */
  insuranceReductionCode?: InputMaybe<Scalars['Int']>;
  /** insurance reduction reason code (보험료감면사유코드) */
  insuranceReductionReasonCode?: InputMaybe<Scalars['Int']>;
  /** job security fund support application status (일자리안정자금지원신청여부) */
  jobSecurityFundSupportApplication?: InputMaybe<Scalars['Boolean']>;
  /** job type code (직종코드) */
  jobTypeCode?: InputMaybe<Scalars['Int']>;
  /** national pension acquisition code (국민연금 취득부호) */
  nationalPensionAcquisitionCode?: InputMaybe<Scalars['Int']>;
  /** national pension report status (국민연금신고여부) */
  nationalPensionReport: Scalars['Boolean'];
  /** foreign nationality number (외국인국적번호) */
  nationalityNumber?: InputMaybe<Scalars['Int']>;
  /** the qualifications required to stay (체류자격) */
  stayQualification?: InputMaybe<Scalars['Int']>;
  /** weekly prescribed working hours (주간 규정 근무시간) */
  weeklyWorkingHours?: InputMaybe<Scalars['Int']>;
};

/** Major insurance company employee acquisition change history (4대보험직원취득 변경이력) */
export type MajorInsuranceCompanyEmployeeAcquisitionLog = {
  __typename?: 'MajorInsuranceCompanyEmployeeAcquisitionLog';
  /** acceptance number (접수번호) */
  accedpedNumber?: Maybe<Scalars['String']>;
  /** acceptance date (접수일) */
  acceptedAt?: Maybe<Scalars['DateScalar']>;
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** completion date (완료일) */
  completedAt?: Maybe<Scalars['DateScalar']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** dependents evidence file storage serial number (피부양자증빙 파일저장 일련번호) */
  dependentsEvidenceFileStorageId?: Maybe<Scalars['Int']>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employee type (직원유형) */
  employeeType: Scalars['Int'];
  /** employeement insurance report status (고용보험신고여부) */
  employeementInsuranceReport: Scalars['Boolean'];
  /** health insurance report status (건강보험신고여부) */
  healthInsuranceReport: Scalars['Boolean'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** whether dependents are included (피부양자포함여부) */
  includeDependents: Scalars['Boolean'];
  /** industrial accident insurance report status (산재보험신고여부) */
  industrialAccidentInsuranceReport: Scalars['Boolean'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** memo (메모) */
  memo?: Maybe<Scalars['String']>;
  /** name (이름) */
  name: Scalars['String'];
  /** national pension report status (국민연금신고여부) */
  nationalPensionReport: Scalars['Boolean'];
  /** registration date (등록일) */
  registeredAt: Scalars['DateScalar'];
  /** remarks (비고) */
  remark: Scalars['String'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** major insurance company employee type (4대보험직원 유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** major insurance company employee work serial number (4대보험직원업무 일련번호) */
  workId: Scalars['Int'];
  /** Major insurance working status (4대보험 업무상태) */
  workingStatus: Scalars['Int'];
};

/** Major insurance company employee laeave of absence (4대보험직원휴직) */
export type MajorInsuranceCompanyEmployeeLeaveOfAbsence = {
  __typename?: 'MajorInsuranceCompanyEmployeeLeaveOfAbsence';
  /** acceptance number (접수번호) */
  accedpedNumber?: Maybe<Scalars['String']>;
  /** acceptance date (접수일) */
  acceptedAt?: Maybe<Scalars['DateScalar']>;
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** completion date (완료일) */
  completedAt?: Maybe<Scalars['DateScalar']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employee type (직원유형) */
  employeeType: Scalars['Int'];
  /** employeement insurance report status (고용보험신고여부) */
  employeementInsuranceReport: Scalars['Boolean'];
  /** health insurance report status (건강보험신고여부) */
  healthInsuranceReport: Scalars['Boolean'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** industrial accident insurance report status (산재보험신고여부) */
  industrialAccidentInsuranceReport: Scalars['Boolean'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** leave of absence request file storage serial number (휴직계 등 파일저장 일련번호) */
  leaveOfAbsenceRequestFileStorageId?: Maybe<Scalars['Int']>;
  /** memo (메모) */
  memo?: Maybe<Scalars['String']>;
  /** name (이름) */
  name: Scalars['String'];
  /** national pension report status (국민연금신고여부) */
  nationalPensionReport: Scalars['Boolean'];
  /** registration date (등록일) */
  registeredAt: Scalars['DateScalar'];
  /** resident registration number / foreigner number (주민등록번호 / 외국인번호) */
  residentId: Scalars['String'];
  /** major insurance company employee type (4대보험직원 유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** major insurance company employee work serial number (4대보험직원업무 일련번호) */
  workId: Scalars['Int'];
  /** Major insurance working status (4대보험 업무상태) */
  workingStatus: Scalars['Int'];
};

/** major insurance employees leave of absence input (4대보험직원휴직 입력) */
export type MajorInsuranceCompanyEmployeeLeaveOfAbsenceInput = {
  /** acquisition payment exception reason code (국민연금 납부예외사유부호) */
  acquisitionPaymentExceptionReasonCode?: InputMaybe<Scalars['String']>;
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employee type (직원유형) */
  employeeType: Scalars['Int'];
  /** employeement insurance code of leave (고용산재 휴직사유부호) */
  employeementInsuranceLeaveReasonCode?: InputMaybe<Scalars['String']>;
  /** employeement insurance report status (고용보험신고여부) */
  employeementInsuranceReport: Scalars['Boolean'];
  /** end date of leave (휴직종료예정일) */
  endDateOfLeave: Scalars['String'];
  /** health insurance payment exception code (건강보험 납부예외사유부호) */
  healthInsurancePaymentExceptionReasonCode?: InputMaybe<Scalars['String']>;
  /** health insurance report status (건강보험신고여부) */
  healthInsuranceReport: Scalars['Boolean'];
  /** industrial accident insurance report status (산재보험신고여부) */
  industrialAccidentInsuranceReport: Scalars['Boolean'];
  /** leave request file storage serial number (휴직계 등 파일저장 일련번호) */
  leaveOfAbsenceRequestFileStorageId?: InputMaybe<Scalars['Int']>;
  /** national pension report status (국민연금신고여부) */
  nationalPensionReport: Scalars['Boolean'];
  /** start date of leave (휴직시작일) */
  startDateOfLeave: Scalars['String'];
  /** type of leave ( 휴직유형 ) */
  typeOfLeave: Scalars['Float'];
};

/** Major insurance company employee laeave of absence change history (4대보험직원휴직 변경이력) */
export type MajorInsuranceCompanyEmployeeLeaveOfAbsenceLog = {
  __typename?: 'MajorInsuranceCompanyEmployeeLeaveOfAbsenceLog';
  /** acceptance number (접수번호) */
  accedpedNumber?: Maybe<Scalars['String']>;
  /** acceptance date (접수일) */
  acceptedAt?: Maybe<Scalars['DateScalar']>;
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** completion date (완료일) */
  completedAt?: Maybe<Scalars['DateScalar']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employee type (직원유형) */
  employeeType: Scalars['Int'];
  /** employeement insurance report status (고용보험신고여부) */
  employeementInsuranceReport: Scalars['Boolean'];
  /** health insurance report status (건강보험신고여부) */
  healthInsuranceReport: Scalars['Boolean'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** industrial accident insurance report status (산재보험신고여부) */
  industrialAccidentInsuranceReport: Scalars['Boolean'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** leave of absence request file storage serial number (휴직계 등 파일저장 일련번호) */
  leaveOfAbsenceRequestFileStorageId?: Maybe<Scalars['Int']>;
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** memo (메모) */
  memo?: Maybe<Scalars['String']>;
  /** name (이름) */
  name: Scalars['String'];
  /** national pension report status (국민연금신고여부) */
  nationalPensionReport: Scalars['Boolean'];
  /** registration date (등록일) */
  registeredAt: Scalars['DateScalar'];
  /** remarks (비고) */
  remark: Scalars['String'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** major insurance company employee type (4대보험직원 유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** major insurance company employee work serial number (4대보험직원업무 일련번호) */
  workId: Scalars['Int'];
  /** Major insurance working status (4대보험 업무상태) */
  workingStatus: Scalars['Int'];
};

/** Major insurance company employee loss (4대보험직원상실) */
export type MajorInsuranceCompanyEmployeeLoss = {
  __typename?: 'MajorInsuranceCompanyEmployeeLoss';
  /** acceptance number (접수번호) */
  accedpedNumber?: Maybe<Scalars['String']>;
  /** acceptance date (접수일) */
  acceptedAt?: Maybe<Scalars['DateScalar']>;
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** completion date (완료일) */
  completedAt?: Maybe<Scalars['DateScalar']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employee type (직원유형) */
  employeeType: Scalars['Int'];
  /** employeement insurance report status (고용보험신고여부) */
  employeementInsuranceReport: Scalars['Boolean'];
  /** health insurance report status (건강보험신고여부) */
  healthInsuranceReport: Scalars['Boolean'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** industrial accident insurance report status (산재보험신고여부) */
  industrialAccidentInsuranceReport: Scalars['Boolean'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** memo (메모) */
  memo?: Maybe<Scalars['String']>;
  /** name (이름) */
  name: Scalars['String'];
  /** national pension report status (국민연금신고여부) */
  nationalPensionReport: Scalars['Boolean'];
  /** registration date (등록일) */
  registeredAt: Scalars['DateScalar'];
  /** resident registration number / foreigner number (주민등록번호 / 외국인번호) */
  residentId: Scalars['String'];
  /** major insurance company employee type (4대보험직원 유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** major insurance company employee work serial number (4대보험직원업무 일련번호) */
  workId: Scalars['Int'];
  /** Major insurance working status (4대보험 업무상태) */
  workingStatus: Scalars['Int'];
};

/** Loss of major insurance employees input (4대보험직원상실 입력) */
export type MajorInsuranceCompanyEmployeeLossInput = {
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employee type (직원유형) */
  employeeType: Scalars['Int'];
  /** health insurance loss code (고용산재 이직확인서발급여부) */
  employeementInsuranceJobChangeReport?: InputMaybe<Scalars['Boolean']>;
  /** employeement insurance loss code (고용보험 상실코드) */
  employeementInsuranceLossCode?: InputMaybe<Scalars['Int']>;
  /** employeement insurance loss description (고용보험 상실사유) */
  employeementInsuranceLossDescription?: InputMaybe<Scalars['String']>;
  /** employeement insurance report status (고용보험신고여부) */
  employeementInsuranceReport: Scalars['Boolean'];
  /** health insurance loss code (건강보험 상실부호) */
  healthInsuranceLossCode?: InputMaybe<Scalars['String']>;
  /** health insurance report status (건강보험신고여부) */
  healthInsuranceReport: Scalars['Boolean'];
  /** industrial accident insurance report status (산재보험신고여부) */
  industrialAccidentInsuranceReport: Scalars['Boolean'];
  /** national pension loss code (국민연금 상실부호) */
  nationalPensionLossCode?: InputMaybe<Scalars['Int']>;
  /** national pension loss code (국민연금 초일취득당월상실납부여부) */
  nationalPensionPaymentCurrentMonthLoss?: InputMaybe<Scalars['Boolean']>;
  /** national pension report status (국민연금신고여부) */
  nationalPensionReport: Scalars['Boolean'];
  /** totalSalary of last tear (전년도 보수총액) */
  totalSalaryLastYear?: InputMaybe<Scalars['Int']>;
  /** totalSalary of this year (당해년도 보수총액) */
  totalSalaryThisYear?: InputMaybe<Scalars['Int']>;
  /** work month of last tear (전년도 근무월수) */
  workMonthLastYear?: InputMaybe<Scalars['Int']>;
  /** work month of this year (당해년도 근무월수) */
  workMonthThisYear?: InputMaybe<Scalars['Int']>;
};

/** Major insurance company employee loss change history (4대보험직원상실 변경이력) */
export type MajorInsuranceCompanyEmployeeLossLog = {
  __typename?: 'MajorInsuranceCompanyEmployeeLossLog';
  /** acceptance number (접수번호) */
  accedpedNumber?: Maybe<Scalars['String']>;
  /** acceptance date (접수일) */
  acceptedAt?: Maybe<Scalars['DateScalar']>;
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** completion date (완료일) */
  completedAt?: Maybe<Scalars['DateScalar']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employee type (직원유형) */
  employeeType: Scalars['Int'];
  /** employeement insurance report status (고용보험신고여부) */
  employeementInsuranceReport: Scalars['Boolean'];
  /** health insurance report status (건강보험신고여부) */
  healthInsuranceReport: Scalars['Boolean'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** industrial accident insurance report status (산재보험신고여부) */
  industrialAccidentInsuranceReport: Scalars['Boolean'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** memo (메모) */
  memo?: Maybe<Scalars['String']>;
  /** name (이름) */
  name: Scalars['String'];
  /** national pension report status (국민연금신고여부) */
  nationalPensionReport: Scalars['Boolean'];
  /** registration date (등록일) */
  registeredAt: Scalars['DateScalar'];
  /** remarks (비고) */
  remark: Scalars['String'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** major insurance company employee type (4대보험직원 유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** major insurance company employee work serial number (4대보험직원업무 일련번호) */
  workId: Scalars['Int'];
  /** Major insurance working status (4대보험 업무상태) */
  workingStatus: Scalars['Int'];
};

/** Major insurance company employee salarychange (4대보험 직원 보수변경) */
export type MajorInsuranceCompanyEmployeeSalaryChange = {
  __typename?: 'MajorInsuranceCompanyEmployeeSalaryChange';
  /** acceptance number (접수번호) */
  accedpedNumber?: Maybe<Scalars['String']>;
  /** acceptance date (접수일) */
  acceptedAt?: Maybe<Scalars['DateScalar']>;
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** completion date (완료일) */
  completedAt?: Maybe<Scalars['DateScalar']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employee type (직원유형) */
  employeeType: Scalars['Int'];
  /** employeement insurance report status (고용보험신고여부) */
  employeementInsuranceReport: Scalars['Boolean'];
  /** health insurance report status (건강보험신고여부) */
  healthInsuranceReport: Scalars['Boolean'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** industrial accident insurance report status (산재보험신고여부) */
  industrialAccidentInsuranceReport: Scalars['Boolean'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** memo (메모) */
  memo?: Maybe<Scalars['String']>;
  /** name (이름) */
  name: Scalars['String'];
  /** national pension report status (국민연금신고여부) */
  nationalPensionReport: Scalars['Boolean'];
  /** registration date (등록일) */
  registeredAt: Scalars['DateScalar'];
  /** resident registration number / foreigner number (주민등록번호 / 외국인번호) */
  residentId: Scalars['String'];
  /** major insurance company employee type (4대보험직원 유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** major insurance company employee work serial number (4대보험직원업무 일련번호) */
  workId: Scalars['Int'];
  /** Major insurance working status (4대보험 업무상태) */
  workingStatus: Scalars['Int'];
};

/** major insurance employees salary change input (보수변경 입력) */
export type MajorInsuranceCompanyEmployeeSalaryChangeInput = {
  /** after salary (변경후 소득액) */
  afterSalary: Scalars['Int'];
  /** before salary (변경전 소득액) */
  beforeSalary?: InputMaybe<Scalars['Int']>;
  /** change reason (소득 변경 사유) */
  changeReason?: InputMaybe<Scalars['Float']>;
  /** change yearmonth (소득 변경 연월) */
  changeYearmonth: Scalars['String'];
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employee type (직원유형) */
  employeeType: Scalars['Int'];
  /** employeement insurance & industrial accident insurance report status (고용산재보험신고여부) */
  employeementAndIndustrialAccidentInsuranceReport: Scalars['Boolean'];
  /** health insurance report status (건강보험신고여부) */
  healthInsuranceReport: Scalars['Boolean'];
  /** job stability fund support (일자리안정자금 신청여부) */
  jobStabilitySupport?: InputMaybe<Scalars['Boolean']>;
  /** national pension report status (국민연금신고여부) */
  nationalPensionReport: Scalars['Boolean'];
};

/** Major insurance company employee salarychange change history (4대보험 직원 보수변경 변경이력) */
export type MajorInsuranceCompanyEmployeeSalaryChangeLog = {
  __typename?: 'MajorInsuranceCompanyEmployeeSalaryChangeLog';
  /** acceptance number (접수번호) */
  accedpedNumber?: Maybe<Scalars['String']>;
  /** acceptance date (접수일) */
  acceptedAt?: Maybe<Scalars['DateScalar']>;
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** completion date (완료일) */
  completedAt?: Maybe<Scalars['DateScalar']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** employee type (직원유형) */
  employeeType: Scalars['Int'];
  /** employeement insurance report status (고용보험신고여부) */
  employeementInsuranceReport: Scalars['Boolean'];
  /** health insurance report status (건강보험신고여부) */
  healthInsuranceReport: Scalars['Boolean'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** industrial accident insurance report status (산재보험신고여부) */
  industrialAccidentInsuranceReport: Scalars['Boolean'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** memo (메모) */
  memo?: Maybe<Scalars['String']>;
  /** name (이름) */
  name: Scalars['String'];
  /** national pension report status (국민연금신고여부) */
  nationalPensionReport: Scalars['Boolean'];
  /** registration date (등록일) */
  registeredAt: Scalars['DateScalar'];
  /** remarks (비고) */
  remark: Scalars['String'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** major insurance company employee type (4대보험직원 유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** major insurance company employee work serial number (4대보험직원업무 일련번호) */
  workId: Scalars['Int'];
  /** Major insurance working status (4대보험 업무상태) */
  workingStatus: Scalars['Int'];
};

/** Major insurance company join (4대보험 사업장가입) */
export type MajorInsuranceCompanyJoin = {
  __typename?: 'MajorInsuranceCompanyJoin';
  /** acceptance number (접수번호) */
  accedpedNumber?: Maybe<Scalars['String']>;
  /** acceptance date (접수일) */
  acceptedAt?: Maybe<Scalars['DateScalar']>;
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** company type (사업장유형) */
  companyType: Scalars['Int'];
  /** completion date (완료일) */
  completedAt?: Maybe<Scalars['DateScalar']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** memo (메모) */
  memo?: Maybe<Scalars['String']>;
  /** registration date (등록일) */
  registeredAt: Scalars['DateScalar'];
  /** major insurance company type (4대보험 사업장신고 유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** major insurance company work serial number (4대보험사업장업무 일련번호) */
  workId: Scalars['Int'];
  /** Major insurance working status (4대보험 업무상태) */
  workingStatus: Scalars['Int'];
};

/** major insurance company join input (4대보험 사업장가입 입력) */
export type MajorInsuranceCompanyJoinInput = {
  /** combined direct debit status (보험료 합산 자동이체 여부) */
  combinedDirectDebitStatus?: InputMaybe<Scalars['Boolean']>;
  /** company address (사업장 주소) */
  companyAddress: Scalars['String'];
  /** company registration number (사업장 사업자등록번호) */
  companyBizNuber: Scalars['String'];
  /** company corporate registration number (사업장 법인등록번호) */
  companyCorpRegNuber?: InputMaybe<Scalars['String']>;
  /** company email (사업장 이메일) */
  companyEmail?: InputMaybe<Scalars['String']>;
  /** company fax (사업장 fax) */
  companyFax?: InputMaybe<Scalars['String']>;
  /** company indestry code (사업장 업종코드) */
  companyIndustryCode?: InputMaybe<Scalars['String']>;
  /** company mobile (사업장 휴대전화) */
  companyMobile?: InputMaybe<Scalars['String']>;
  /** company name (사업장명칭) */
  companyName: Scalars['String'];
  /** company post number (사업장 우편번호) */
  companyPostNumber?: InputMaybe<Scalars['String']>;
  /** company product (사업장 주생산품) */
  companyProduct?: InputMaybe<Scalars['String']>;
  /** company refund account number (사업장 환급계좌번호) */
  companyRefundAccountNumber?: InputMaybe<Scalars['String']>;
  /** company refund account owner (사업장 환급계좌주 이름) */
  companyRefundAccountOwner?: InputMaybe<Scalars['String']>;
  /** company refund bank name (사업장 환급계좌 은행명) */
  companyRefundBankName?: InputMaybe<Scalars['String']>;
  /** company tel (사업장 전화번호) */
  companyTel?: InputMaybe<Scalars['String']>;
  /** company type (사업장유형) */
  companyType: Scalars['Float'];
  /** company uptae (사업장 업태) */
  companyUptae?: InputMaybe<Scalars['String']>;
  /** company jongmok (사업장 종목) */
  companyjongmok?: InputMaybe<Scalars['String']>;
  /** construction site business period (건설현장사업장사업기간) */
  constructionSiteBusinessPeriod?: InputMaybe<Scalars['String']>;
  /** construction site workplace (건설현장사업장여부 : 해당 / 비해당) */
  constructionSiteWorkplace: Scalars['Boolean'];
  /** direct debit number (보험료 자동이체 계좌번호) */
  directDebitAccountNumber?: InputMaybe<Scalars['String']>;
  /** direct debit owner (보험료 자동이체 계좌주 이름) */
  directDebitAccountOwner?: InputMaybe<Scalars['String']>;
  /** direct debit owner residnet number (보험료 자동이체 계좌주 주민등록번호) */
  directDebitAccountOwnerResidentNumber?: InputMaybe<Scalars['String']>;
  /** direct debit bank name (보험료 자동이체 은행명) */
  directDebitBankName?: InputMaybe<Scalars['String']>;
  /** direct debit date type (보험료 자동이체 날자 유형 : 납기일 / 납기전월 말일) */
  directDebitDateType?: InputMaybe<Scalars['Float']>;
  /** electronic notification edoc (전자고지 전자문서 신청여부) */
  electronicNotificationEdoc?: InputMaybe<Scalars['Boolean']>;
  /** electronic notification email (전자고지 email 신청여부) */
  electronicNotificationEmail?: InputMaybe<Scalars['Boolean']>;
  /** electronic notification mobile (전자고지 휴대전화 신청여부) */
  electronicNotificationMobile?: InputMaybe<Scalars['Boolean']>;
  /** electronic notification web (전자고지 홈페이지 신청여부) */
  electronicNotificationWeb?: InputMaybe<Scalars['Boolean']>;
  /** electronic receive (전자고지수신처 : email주소 휴대전화번호 등) */
  electronicReceive?: InputMaybe<Scalars['String']>;
  /** electronic receiver name (전자고지수신자이름) */
  electronicReceiverName?: InputMaybe<Scalars['String']>;
  /** electronic receiver resident number (전자고지수신자 주민등록번호) */
  electronicReceiverResidentNumber?: InputMaybe<Scalars['String']>;
  /** employeement insurance apply date (고용보험 성립일) */
  employeementInsuranceApplyDate?: InputMaybe<Scalars['String']>;
  /** employeement insurance employee target number (고용보험 피보험자 수 ) */
  employeementInsuranceEmployeeTargetNumber?: InputMaybe<Scalars['Float']>;
  /** employeement insurance  fulltime worker count (고용보험 상시근로자 수) */
  employeementInsuranceFulltimeWorkerCount?: InputMaybe<Scalars['Float']>;
  /** employeement insurance main workplace registration number (고용보험 주된사업장 사업자등록번호) */
  employeementInsuranceMainWorkplaceBizNumber?: InputMaybe<Scalars['String']>;
  /** employeement insurance main workplace manage number (고용보험 주된사업장 사업장관리번호) */
  employeementInsuranceMainWorkplaceManageNumber?: InputMaybe<Scalars['String']>;
  /** employeement insurance main workplace name (고용보험 주된사업장 명칭) */
  employeementInsuranceMainWorkplaceName?: InputMaybe<Scalars['String']>;
  /** employeement insurance main workplace priority support (고용보험 주된사업장 우선지원대상여부) */
  employeementInsuranceMainWorkplacePrioritySupport?: InputMaybe<Scalars['Boolean']>;
  /** employeement insurance report status (고용보험신고여부) */
  employeementInsuranceReport: Scalars['Boolean'];
  /** employeement insurance support (고용보험료지원신청 여부) */
  employeementInsuranceSupport: Scalars['Boolean'];
  /** employeement insurance valid report status (고용보험성립신고여부) */
  employeementInsuranceValidReport: Scalars['Boolean'];
  /** health insurance account item 1 (건강보험 회계종목 1) */
  healthInsuranceAccountItem1?: InputMaybe<Scalars['String']>;
  /** health insurance account item 2 (건강보험 회계종목 2) */
  healthInsuranceAccountItem2?: InputMaybe<Scalars['String']>;
  /** health insurance account item 3 (건강보험 회계종목 3) */
  healthInsuranceAccountItem3?: InputMaybe<Scalars['String']>;
  /** health insurance apply date (건강보험 적용일) */
  healthInsuranceApplyDate?: InputMaybe<Scalars['String']>;
  /** health insurance employee target number (건강보험 가입대상자 수) */
  healthInsuranceEmployeeTargetNumber?: InputMaybe<Scalars['Float']>;
  /** health insurance haed office manage number (건강보험 본점 사업장관리번호) */
  healthInsuranceHeadOfficeManageNumber?: InputMaybe<Scalars['String']>;
  /** health insurance report status (건강보험신고여부) */
  healthInsuranceReport: Scalars['Boolean'];
  /** health insurance specific code (건강보험 사업장 특성부호) */
  healthInsuranceSpecificCode?: InputMaybe<Scalars['String']>;
  /** industrial accident insurance apply date (산재보험 성립일 ) */
  industrialAccidentInsuranceApplyDate?: InputMaybe<Scalars['String']>;
  /** industrial accident insurance business type (산재보험 사업의형태 ) */
  industrialAccidentInsuranceBusinessType?: InputMaybe<Scalars['Float']>;
  /** industrial accident insurance business type code (산재보험 사업종류코드 ) */
  industrialAccidentInsuranceBusinessTypeCode?: InputMaybe<Scalars['String']>;
  /** industrial accident insurance fulltime worker count (산재보험 상시근로자 수 ) */
  industrialAccidentInsuranceFulltimeWokerCount?: InputMaybe<Scalars['Float']>;
  /** industrial accident insurance occurrence (산재보험 주된사업장여부 ) */
  industrialAccidentInsuranceMainWorkplace?: InputMaybe<Scalars['Boolean']>;
  /** industrial accident insurance main workplace registration number (산재보험 주된사업장 사업자등록번호) */
  industrialAccidentInsuranceMainWorkplaceBizNumber?: InputMaybe<Scalars['String']>;
  /** industrial accident insurance occurrence (산재보험 산재발생여부 ) */
  industrialAccidentInsuranceOccurrence?: InputMaybe<Scalars['Boolean']>;
  /** industrial accident insurance report status (산재보험신고여부) */
  industrialAccidentInsuranceReport: Scalars['Boolean'];
  /** industrial accident insurance valid report status (산재보험성립신고여부) */
  industrialAccidentInsuranceValidReport: Scalars['Boolean'];
  /** industrial accident insurance main workplace manage number (산재보험 주된사업장 사업장관리번호) */
  industrialAccidentMainWorkplaceManageNumber?: InputMaybe<Scalars['String']>;
  /** national pension apply date (국민연금 적용일) */
  nationalPensionApplyDate?: InputMaybe<Scalars['String']>;
  /** national pension employee count (국민연금 근로자수) */
  nationalPensionEmployeeCount?: InputMaybe<Scalars['Float']>;
  /** national pension employee target number (국민연금 가입대상자 수) */
  nationalPensionEmployeeTargetNumber?: InputMaybe<Scalars['Float']>;
  /** national pension report status (국민연금신고여부) */
  nationalPensionReport: Scalars['Boolean'];
  /** national pension separately site registration number (국민연금 분리적용사업장 사업장관리번호) */
  nationalPensionSeparatelySiteManageNumber?: InputMaybe<Scalars['String']>;
  /** national pension separately site status (국민연금 분리적용사업장 여부) */
  nationalPensionSeparatelySiteStatus?: InputMaybe<Scalars['Boolean']>;
  /** national pension support (국민연금보험료지원신청 여부) */
  nationalPensionSupport: Scalars['Boolean'];
  /** president address (대표자 주소) */
  presidentAddress?: InputMaybe<Scalars['String']>;
  /** president name (대표자 이름) */
  presidentName: Scalars['String'];
  /** president name (대표자 주민등록번호) */
  presidentResidentNumber: Scalars['String'];
  /** president tel (대표자 전화번호) */
  presidentTel?: InputMaybe<Scalars['String']>;
  /** report date (신고일) */
  reportDate: Scalars['String'];
};

/** Major insurance company employee loss change history (4대보험 사업장가입 변경이력) */
export type MajorInsuranceCompanyJoinLog = {
  __typename?: 'MajorInsuranceCompanyJoinLog';
  /** acceptance number (접수번호) */
  accedpedNumber?: Maybe<Scalars['String']>;
  /** acceptance date (접수일) */
  acceptedAt?: Maybe<Scalars['DateScalar']>;
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** company type (사업장유형) */
  companyType: Scalars['Int'];
  /** completion date (완료일) */
  completedAt?: Maybe<Scalars['DateScalar']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** memo (메모) */
  memo?: Maybe<Scalars['String']>;
  /** registration date (등록일) */
  registeredAt: Scalars['DateScalar'];
  /** remarks (비고) */
  remark: Scalars['String'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** major insurance company type (4대보험 사업장신고 유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** major insurance company work serial number (4대보험사업장업무 일련번호) */
  workId: Scalars['Int'];
  /** Major insurance working status (4대보험 업무상태) */
  workingStatus: Scalars['Int'];
};

/** Major insurance company out (4대보험 사업장탈퇴) */
export type MajorInsuranceCompanyOut = {
  __typename?: 'MajorInsuranceCompanyOut';
  /** acceptance number (접수번호) */
  accedpedNumber?: Maybe<Scalars['String']>;
  /** acceptance date (접수일) */
  acceptedAt?: Maybe<Scalars['DateScalar']>;
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** company type (사업장유형) */
  companyType: Scalars['Int'];
  /** completion date (완료일) */
  completedAt?: Maybe<Scalars['DateScalar']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** memo (메모) */
  memo?: Maybe<Scalars['String']>;
  /** registration date (등록일) */
  registeredAt: Scalars['DateScalar'];
  /** major insurance company type (4대보험 사업장신고 유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** major insurance company work serial number (4대보험사업장업무 일련번호) */
  workId: Scalars['Int'];
  /** Major insurance working status (4대보험 업무상태) */
  workingStatus: Scalars['Int'];
};

/** major insurance company join input (4대보험 사업장탈퇴 입력) */
export type MajorInsuranceCompanyOutInput = {
  /** post address after report (탈퇴후 우편물 수령지) */
  afterReportPostAddress?: InputMaybe<Scalars['String']>;
  /** post number after report (탈퇴후 우편물 수령지 우편번호) */
  afterReportPostNumber?: InputMaybe<Scalars['String']>;
  /** company address (사업장 주소) */
  companyAddress: Scalars['String'];
  /** company registration number (사업장 사업자등록번호) */
  companyBizNuber: Scalars['String'];
  /** company corporate registration number (사업장 법인등록번호) */
  companyCorpRegNuber?: InputMaybe<Scalars['String']>;
  /** company name (사업장명칭) */
  companyName: Scalars['String'];
  /** company post number (사업장 우편번호) */
  companyPostNumber?: InputMaybe<Scalars['String']>;
  /** company refund account number (사업장 환급계좌번호) */
  companyRefundAccountNumber?: InputMaybe<Scalars['String']>;
  /** company refund account owner (사업장 환급계좌주 이름) */
  companyRefundAccountOwner?: InputMaybe<Scalars['String']>;
  /** company refund bank name (사업장 환급계좌 은행명) */
  companyRefundBankName?: InputMaybe<Scalars['String']>;
  /** company tel (사업장 전화번호) */
  companyTel?: InputMaybe<Scalars['String']>;
  /** employeement insurance  date of close (고용보험 소멸일) */
  employeementInsuranceCloseDate?: InputMaybe<Scalars['String']>;
  /** employeement insurance  number of employee (고용보험 근로자 수) */
  employeementInsuranceEmployeeNumber?: InputMaybe<Scalars['Float']>;
  /** employeement insurance report status (고용보험신고여부) */
  employeementInsuranceReport: Scalars['Boolean'];
  /** health insurance number of employee (건강보험 근로자 수) */
  healthInsuranceEmployeeNumber?: InputMaybe<Scalars['Float']>;
  /** health insurance report status (건강보험신고여부) */
  healthInsuranceReport: Scalars['Boolean'];
  /** industrial accident insurance date of close (산재보험 소멸일) */
  industrialAccidentInsuranceCloseDate?: InputMaybe<Scalars['String']>;
  /** industrial accident insurance  number of employee (산재보험 근로자 수) */
  industrialAccidentInsuranceEmployeeNumber?: InputMaybe<Scalars['Float']>;
  /** industrial accident insurance report status (산재보험신고여부) */
  industrialAccidentInsuranceReport: Scalars['Boolean'];
  /** report due to 1year without workers(신고사유 근로자없이 1년경과 여부) */
  is1YearWithoutWorker?: InputMaybe<Scalars['Boolean']>;
  /** report due to no workers(신고사유 근로자없음 여부) */
  isNoWorker?: InputMaybe<Scalars['Boolean']>;
  /** report due to business shutdown (신고사유 휴업여부) */
  isShutdown?: InputMaybe<Scalars['Boolean']>;
  /** issue date (사유발생일) */
  issueDate: Scalars['String'];
  /** national pension closing period (국민연금 휴업기간) */
  nationalPensionClosingPeriod?: InputMaybe<Scalars['String']>;
  /** national pension integration company address (국민연금 통폐합시 흡수하는 사업장 주소) */
  nationalPensionIntegrasionCompanyAddress?: InputMaybe<Scalars['String']>;
  /** national pension integration company biz number (국민연금 통폐합시 흡수하는 사업장 사업자등록번호) */
  nationalPensionIntegrasionCompanyBizNumber?: InputMaybe<Scalars['String']>;
  /** national pension integration company name (국민연금 통폐합시 흡수하는 사업장명) */
  nationalPensionIntegrasionCompanyName?: InputMaybe<Scalars['String']>;
  /** national pension report status (국민연금신고여부) */
  nationalPensionReport: Scalars['Boolean'];
  /** president address (대표자 주소) */
  presidentAddress?: InputMaybe<Scalars['String']>;
  /** president name (대표자 이름) */
  presidentName: Scalars['String'];
  /** president name (대표자 주민등록번호) */
  presidentResidentNumber: Scalars['String'];
  /** president tel (대표자 전화번호) */
  presidentTel?: InputMaybe<Scalars['String']>;
  /** report date (신고일) */
  reportDate: Scalars['String'];
  /** reason for report (신고사유) */
  reportReason: Scalars['Float'];
};

/** Major insurance company employee loss change history (4대보험 사업장탈퇴 변경이력) */
export type MajorInsuranceCompanyOutLog = {
  __typename?: 'MajorInsuranceCompanyOutLog';
  /** acceptance number (접수번호) */
  accedpedNumber?: Maybe<Scalars['String']>;
  /** acceptance date (접수일) */
  acceptedAt?: Maybe<Scalars['DateScalar']>;
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** company type (사업장유형) */
  companyType: Scalars['Int'];
  /** completion date (완료일) */
  completedAt?: Maybe<Scalars['DateScalar']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** memo (메모) */
  memo?: Maybe<Scalars['String']>;
  /** registration date (등록일) */
  registeredAt: Scalars['DateScalar'];
  /** remarks (비고) */
  remark: Scalars['String'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** major insurance company type (4대보험 사업장신고 유형) */
  type: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** major insurance company work serial number (4대보험사업장업무 일련번호) */
  workId: Scalars['Int'];
  /** Major insurance working status (4대보험 업무상태) */
  workingStatus: Scalars['Int'];
};

/** Major insurance consign status (4대보험사무대행) */
export type MajorInsuranceConsignStatus = {
  __typename?: 'MajorInsuranceConsignStatus';
  /** acceptance date (접수일) */
  acceptedAt?: Maybe<Scalars['DateScalar']>;
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** consign status (대행 상태) */
  companyConsignStatus: Scalars['Int'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** completion date (완료일) */
  completedAt?: Maybe<Scalars['DateScalar']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** employeement insurance branch name (고용지사명) */
  employeementInsuranceBranchName?: Maybe<Scalars['String']>;
  /** employeement insurance fax (고용지사 fax) */
  employeementInsuranceFax?: Maybe<Scalars['String']>;
  /** healthInsurance branch name (건보지사명) */
  healthInsuranceBranchName?: Maybe<Scalars['String']>;
  /** healthInsurance EDI Status (건강보험EDI상태) */
  healthInsuranceEDIStatus: Scalars['Int'];
  /** healthInsurance fax (건보지사 fax) */
  healthInsuranceFax?: Maybe<Scalars['String']>;
  /** industrial accident insurance branch name (산재지사명) */
  industrialAccidentInsuranceBranchName?: Maybe<Scalars['String']>;
  /** industrial accident insurance fax (산재지사 fax) */
  industrialAccidentInsuranceFax?: Maybe<Scalars['String']>;
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** manage id (사업장관리번호) */
  manageId: Scalars['String'];
  /** nationalPension branch name (연금지사명) */
  nationalPensionBranchName?: Maybe<Scalars['String']>;
  /** nationalPension EDI Status (국민연금EDI상태) */
  nationalPensionEDIStatus: Scalars['Int'];
  /** nationalPension fax (연금지사 fax) */
  nationalPensionFax?: Maybe<Scalars['String']>;
  /** partner serail number (파트너일련번호) */
  partnerId: Scalars['Int'];
  /** registration date (등록일) */
  registeredAt: Scalars['DateScalar'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Major insurance consign status input (4대보험대행상태 입력) */
export type MajorInsuranceConsignStatusInput = {
  /** company consign status (사업장 사무대행 상태) */
  companyConsignStatus: Scalars['Int'];
  /** health insurance EDI Status (건강보험EDI상태) */
  healthInsuranceEDIStatus: Scalars['Int'];
  /** national pension EDI Status (국민연금EDI상태) */
  nationalPensionEDIStatus: Scalars['Int'];
};

/** Major insurance consign status change history (4대보험사무대행 변경이력) */
export type MajorInsuranceConsignStatusLog = {
  __typename?: 'MajorInsuranceConsignStatusLog';
  /** acceptance date (접수일) */
  acceptedAt?: Maybe<Scalars['DateScalar']>;
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** consign status (대행 상태) */
  companyConsignStatus: Scalars['Int'];
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** completion date (완료일) */
  completedAt?: Maybe<Scalars['DateScalar']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** employeement insurance branch name (고용지사명) */
  employeementInsuranceBranchName?: Maybe<Scalars['String']>;
  /** employeement insurance fax (고용지사 fax) */
  employeementInsuranceFax?: Maybe<Scalars['String']>;
  /** healthInsurance branch name (건보지사명) */
  healthInsuranceBranchName?: Maybe<Scalars['String']>;
  /** healthInsurance EDI Status (건강보험EDI상태) */
  healthInsuranceEDIStatus: Scalars['Int'];
  /** healthInsurance fax (건보지사 fax) */
  healthInsuranceFax?: Maybe<Scalars['String']>;
  /** industrial accident insurance branch name (산재지사명) */
  industrialAccidentInsuranceBranchName?: Maybe<Scalars['String']>;
  /** industrial accident insurance fax (산재지사 fax) */
  industrialAccidentInsuranceFax?: Maybe<Scalars['String']>;
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** manage id (사업장관리번호) */
  manageId: Scalars['String'];
  /** nationalPension branch name (연금지사명) */
  nationalPensionBranchName?: Maybe<Scalars['String']>;
  /** nationalPension EDI Status (국민연금EDI상태) */
  nationalPensionEDIStatus: Scalars['Int'];
  /** nationalPension fax (연금지사 fax) */
  nationalPensionFax?: Maybe<Scalars['String']>;
  /** partner serail number (파트너일련번호) */
  partnerId: Scalars['Int'];
  /** registration date (등록일) */
  registeredAt: Scalars['DateScalar'];
  /** remarks (비고) */
  remark: Scalars['String'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** ajor insurance local office infomation (4대보험 지사 정보입력) */
export type MajorInsuranceLocalOfficeInfo = {
  /** employeement insurance branch name (고용지사명) */
  employeementInsuranceBranchName?: InputMaybe<Scalars['String']>;
  /** employeement insurance fax (고용지사 fax) */
  employeementInsuranceFax?: InputMaybe<Scalars['String']>;
  /** healthInsurance branch name (건보지사명) */
  healthInsuranceBranchName?: InputMaybe<Scalars['String']>;
  /** healthInsurance fax (건보지사 fax) */
  healthInsuranceFax?: InputMaybe<Scalars['String']>;
  /** industrial accident insurance branch name (산재지사명) */
  industrialAccidentInsuranceBranchName?: InputMaybe<Scalars['String']>;
  /** industrial accident insurance fax (산재지사 fax) */
  industrialAccidentInsuranceFax?: InputMaybe<Scalars['String']>;
  /** nationalPension branch name (연금지사명) */
  nationalPensionBranchName?: InputMaybe<Scalars['String']>;
  /** nationalPension fax (연금지사 fax) */
  nationalPensionFax?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * The acquisition of major insurance employees is canceled (4대보험직원취득을 취소한다).
   *
   * Return (반환) : Major insurance company employee acquisition (4대보험직원취득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 404 : If the acquisition of the major insurance employees does not exist (4대보험직원취득이 존재하지 않을 경우)
   *
   * Exception (예외) / 412 : Where major insurance work have already been accepted (4대보험업무가 이미 접수된 경우)
   */
  cancelMajorInsuranceCompanyEmployeeAcquisition: MajorInsuranceCompanyEmployeeAcquisition;
  /**
   * The major insurance employees leave of absence is canceled (4대보험직원휴직을 취소한다).
   *
   * Return (반환) : Major insurance company employee leave of absence (4대보험직원휴직)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 404 : If the major insurance employees leave of absence does not exist (4대보험직원휴직이 존재하지 않을 경우)
   *
   * Exception (예외) / 412 : Where major insurance work have already been accepted (4대보험업무가 이미 접수된 경우)
   */
  cancelMajorInsuranceCompanyEmployeeLeaveOfAbsence: MajorInsuranceCompanyEmployeeLeaveOfAbsence;
  /**
   * The loss of major insurance employees is canceled (4대보험직원상실을 취소한다).
   *
   * Return (반환) : Major insurance company employee loss (4대보험직원상실)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 404 : If the loss of the major insurance employees does not exist (4대보험직원상실이 존재하지 않을 경우)
   *
   * Exception (예외) / 412 : Where major insurance work have already been accepted (4대보험업무가 이미 접수된 경우)
   */
  cancelMajorInsuranceCompanyEmployeeLoss: MajorInsuranceCompanyEmployeeLoss;
  /**
   * The salary change of major insurance employees is canceled (4대보험직원상실을 취소한다).
   *
   * Return (반환) : Major insurance company employee salary change (4대보험직원보수변경)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 404 : If the salary change of the major insurance employees does not exist (4대보험직원상실이 존재하지 않을 경우)
   *
   * Exception (예외) / 412 : Where major insurance work have already been accepted (4대보험업무가 이미 접수된 경우)
   */
  cancelMajorInsuranceCompanyEmployeeSalaryChange: MajorInsuranceCompanyEmployeeSalaryChange;
  /**
   * The major insurance  company join is canceled (4대보험 사업장가입을 취소한다).
   *
   * Return (반환) : Major insurance company company join (4대보험 사업장가입)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 404 : If the the major insurance  company join does not exist (4대보험 사업장가입이 존재하지 않을 경우)
   *
   * Exception (예외) / 412 : Where major insurance work have already been accepted (4대보험업무가 이미 접수된 경우)
   */
  cancelMajorInsuranceCompanyJoin: MajorInsuranceCompanyJoin;
  /**
   * The major insurance  company out is canceled (4대보험 사업장탈퇴을 취소한다).
   *
   * Return (반환) : Major insurance company company out (4대보험 사업장탈퇴)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 404 : If the the major insurance  company out does not exist (4대보험 사업장탈퇴이 존재하지 않을 경우)
   *
   * Exception (예외) / 412 : Where major insurance work have already been accepted (4대보험업무가 이미 접수된 경우)
   */
  cancelMajorInsuranceCompanyOut: MajorInsuranceCompanyOut;
  /**
   * Change the business income payment day (사업소득 지급일을 변경한다).
   *
   * Return (반환) : Business income (사업소득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 404 : If business income does not exist (사업소득이 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If there is already a business income subject to the date of payment to be changed (변경될 지급일 대상 사업소득이 이미 존재할 경우)
   */
  changeIncomeBusinessPaymentDay: IncomeBusiness;
  /**
   * Change the extra income payment day (기타소득 지급일을 변경한다).
   *
   * Return (반환) : Extra income (기타소득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 404 : If extra income does not exist (기타소득이 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If there is already an extra income subject to the date of payment to be changed (변경될 지급일 대상 기타소득이 이미 존재할 경우)
   */
  changeIncomeExtraPaymentDay: IncomeExtra;
  /**
   * Change the working status of business income (사업소득 업무상태를 변경한다).
   *
   * Return (반환) : Business income business status (사업소득 업무상태)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If the status does not exists (업무상태가 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If the status you want to change is the same (변경하려는 상태가 동일할 경우)
   */
  changeIncomeProcessBusinessStatus: IncomeProcessBusiness;
  /**
   * Change the working status of extra income (기타소득 업무상태를 변경한다).
   *
   * Return (반환) : Extra income business status (기타소득 업무상태)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If the status does not exists (업무상태가 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If the status you want to change is the same (변경하려는 상태가 동일할 경우)
   */
  changeIncomeProcessExtraStatus: IncomeProcessExtra;
  /**
   * Change the working status of retirement income (퇴직소득 업무상태를 변경한다).
   *
   * Return (반환) : Retirement income business status (퇴직소득 업무상태)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If the status does not exists (업무상태가 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If the status you want to change is the same (변경하려는 상태가 동일할 경우)
   */
  changeIncomeProcessRetirementStatus: IncomeProcessRetirement;
  /**
   * Change the working status of income (소득 업무상태를 변경한다).
   *
   * Return (반환) : Income business status (소득 업무상태)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If the status does not exists (업무상태가 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If the status you want to change is the same (변경하려는 상태가 동일할 경우)
   */
  changeIncomeProcessStatus: IncomeProcess;
  /**
   * Change the working status of daily wage income (일용직근로소득 업무상태를 변경한다).
   *
   * Return (반환) : Daily wage income business status (일용직근로소득 업무상태)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If the status does not exists (업무상태가 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If the status you want to change is the same (변경하려는 상태가 동일할 경우)
   */
  changeIncomeProcessWageDailyStatus: IncomeProcessWageDaily;
  /**
   * Change the working status of wage income (근로소득 업무상태를 변경한다).
   *
   * Return (반환) : Wage income business status (근로소득 업무상태)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If the status does not exists (업무상태가 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If the status you want to change is the same (변경하려는 상태가 동일할 경우)
   */
  changeIncomeProcessWageStatus: IncomeProcessWage;
  /**
   * Change the retirement income payment day (퇴직소득 지급일을 변경한다).
   *
   * Return (반환) : Retirement income (퇴직소득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 404 : If retirement income does not exist (퇴직소득이 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If there is already an retirement income subject to the date of payment to be changed (변경될 지급일 대상 퇴직소득이 이미 존재할 경우)
   */
  changeIncomeRetirementPaymentDay: IncomeRetirement;
  /**
   * Change the daily wage income payment day (근로소득 지급일을 변경한다).
   *
   * Return (반환) : Daily wage income (근로소득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 404 : If daily wage income does not exist (근로소득이 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If there is already a business income subject to the date of payment to be changed (변경될 지급일 대상 사업소득이 이미 존재할 경우)
   */
  changeIncomeWageDailyPaymentDay: IncomeWageDaily;
  /**
   * Change the wage income payment day (근로소득 지급일을 변경한다).
   *
   * Return (반환) : Wage income (근로소득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 404 : If wage income does not exist (근로소득이 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If there is already a business income subject to the date of payment to be changed (변경될 지급일 대상 사업소득이 이미 존재할 경우)
   */
  changeIncomeWagePaymentDay: IncomeWage;
  /**
   * Change my password (내 비밀번호를 변경한다).
   *
   * Return (반환) : true
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : When user information is disabled (사용자 정보가 비활성화 된 경우)
   */
  changeMyPassword: Scalars['Boolean'];
  /**
   * Change the business status of the withholding tax performance report (원천징수이행상황신고서의 업무상태를 변경한다).
   *
   * Return (반환) : Withholding performance report (원천징수이행상황신고서)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If withholding performance report does not exist (원천징수이행상황신고서가 존재하지 않을 경우)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   */
  changeTaxWithholdingStatusReportStatus: TaxWithholdingStatusReport;
  /**
   * Copy the list of business income (사업소득 목록을 복사한다).
   *
   * Return (반환) : List of copied business income (복사된 사업소득 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 404 : Where there is no business income to be copied (복사할 사업소득이 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If the target business income already exists (대상 사업소득이 이미 존재할 경우)
   */
  copyIncomeBusinesses: Array<IncomeBusiness>;
  /**
   * Copy the list of extra income (기타소득 목록을 복사한다).
   *
   * Return (반환) : List of copied extra income (복사된 기타소득 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 404 : Where there is no extra income to be copied (복사할 기타소득이 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If the target extra income already exists (대상 기타소득이 이미 존재할 경우)
   */
  copyIncomeExtras: Array<IncomeExtra>;
  /**
   * Copy the list of daily wage income (일용직근로소득 목록을 복사한다).
   *
   * Return (반환) : List of copied daily wage income (복사된 일용직근로소득 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 404 : Where there is no daily wage income to be copied (복사할 일용직근로소득이 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If the target daily wage income already exists (대상 일용직근로소득이 이미 존재할 경우)
   */
  copyIncomeWageDailies: Array<IncomeWageDaily>;
  /**
   * Copy the list of wage income (근로소득 목록을 복사한다).
   *
   * Return (반환) : List of copied wage income (복사된 근로소득 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 404 : Where there is no wage income to be copied (복사할 근로소득이 존재하지 않을 경우)\n
   * Exception (예외) / 409 : If the target wage income already exists (대상 근로소득이 이미 존재할 경우)
   */
  copyIncomeWages: Array<IncomeWage>;
  /**
   * Register a bankbook (통장을 등록한다).
   *
   * Return (반환) : Bankbook (통장)
   *
   * Necessary Role (필요역할) : WorkScreenRole.ACCOUNTING_SETTINGS (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   *
   * Exception (예외) / 409 : If the same bankbook exists (동일한 통장이 존재할 경우)
   *
   * Exception (예외) / 406 : If the bankbook that cannot be registered at this time (지금은 등록할 수 없는 통장일 경우)
   */
  createBankbook: Bankbook;
  /**
   * Create a client (거래처를 생성한다).
   *
   * Return (반환) : Client (거래처)
   *
   * Necessary Role (필요역할) : WorkScreenRole.ACCOUNTING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   */
  createClient: Client;
  /**
   * Create company with approved service subscription application (승인된 서비스가입신청으로 사업자를 생성한다).
   *
   * Return (반환) : Company (사업자)
   *
   * Necessary Role (필요역할) : AdminScreenRole.CONTRACT_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : Service subscription application information does not exist (서비스가입신청 정보가 존재하지 않을 경우)
   *
   * Exception (예외) / 406 : Service subscription application status is not approved (서비스가입신청 상태가 승인이 아닌 경우)
   *
   * Exception (예외) / 409 : If a Company has already been created (이미 사업자가 생성된 경우)
   */
  createCompanyBySubscriptionRequest: Company;
  /**
   * Register company management memo (사업자 관리메모를 등록한다).
   *
   * Return (반환) : Company management memo (사업자 관리메모)
   *
   * Necessary Role (필요역할) : AdminScreenRole.COMPANY_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 406 : If company information does not exist (사업자 정보가 존재하지 않는 경우)
   */
  createCompanyManageMemo: CompanyManageMemo;
  /**
   * Register the business income earner (사업소득자를 등록한다).
   *
   * Return (반환) : Business income earner (사업소득자)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 409 : If the same business income earner exists (동일한 사업소득자가 존재할 경우)
   *
   * Exception (예외) / 409 : Where there is a business income earner with the same resident registration number / foreign number (동일한 주민등록번호 / 외국인번호의 사업소득자가 존재할 경우)
   */
  createEmployeeBusiness: EmployeeBusiness;
  /**
   * Register the extra income earner (기타소득자를 등록한다).
   *
   * Return (반환) : Extra income earner (기타소득자)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 409 : If the same extra income earner exists (동일한 기타소득자가 존재할 경우)
   *
   * Exception (예외) / 409 : Where there is an extra income earner with the same resident registration number / foreign number (동일한 주민등록번호 / 외국인번호의 기타소득자가 존재할 경우)
   */
  createEmployeeExtra: EmployeeExtra;
  /**
   * Register the wage income earner (근로소득자를 등록한다).
   *
   * Return (반환) : Wage income earner (근로소득자)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 409 : If the same wage income earner exists (동일한 근로소득자가 존재할 경우)
   *
   * Exception (예외) / 409 : Where there is a wage income earner with the same resident registration number / foreign number (동일한 주민등록번호 / 외국인번호의 근로소득자가 존재할 경우)
   */
  createEmployeeWage: EmployeeWage;
  /**
   * Register the daily wage income earner (일용직근로소득자를 등록한다).
   *
   * Return (반환) : Daily wage income earner (일용직근로소득자)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 409 : If the same daily wage income earner exists (동일한 일용직근로소득자가 존재할 경우)
   *
   * Exception (예외) / 409 : Where there is a daily wage income earner with the same resident registration number / foreign number (동일한 주민등록번호 / 외국인번호의 일용직근로소득자가 존재할 경우)
   */
  createEmployeeWageDaily: EmployeeWageDaily;
  /**
   * Register dependents of wage income earners (근로소득자의 부양가족을 등록한다).
   *
   * Return (반환) : Dependent of wage income earner (근로소득자의 부양가족)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 406 : Where there is no wage income earner (근로소득자가 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : For dependents already registered (이미 등록된 부양가족인 경우)
   */
  createEmployeeWageDependent: EmployeeWageDependent;
  /**
   * Register business income (사업소득을 등록한다).
   *
   * Return (반환) : Business income (사업소득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 406 : Where there is no business income earner (사업소득자가 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If business income already exists (이미 사업소득이 존재할 경우)
   */
  createIncomeBusiness: IncomeBusiness;
  /**
   * Register extra income (기타소득을 등록한다).
   *
   * Return (반환) : Extra income (기타소득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 406 : Where there is no extra income earner (기타소득자가 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If extra income already exists (이미 기타소득이 존재할 경우)
   */
  createIncomeExtra: IncomeExtra;
  /**
   * Register retirement income (퇴직소득을 등록한다).
   *
   * Return (반환) : Retirement income (퇴직소득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 406 : Where there is no employee (직원이 존재하지 않을 경우)
   *
   * Exception (예외) / 406 : If the employee has not left the company (직원이 퇴사한 상태가 아닌 경우)
   *
   * Exception (예외) / 406 : If the year/month of retirement and income are not the same (퇴사월과 소득의 귀속연/월이 동일하지 않을 경우)
   *
   * Exception (예외) / 409 : If extra income already exists (이미 퇴직소득이 존재할 경우)
   */
  createIncomeRetirement: IncomeRetirement;
  /**
   * Register wage income (근로소득을 등록한다).
   *
   * Return (반환) : Wage income (근로소득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 406 : Where there is no wage income earner (근로소득자가 존재하지 않을 경우)
   *
   * Exception (예외) / 406 : Where the year/month of wage income is after leaving the company (근로소득의 귀속연/월이 퇴사 이후일 경우)
   *
   * Exception (예외) / 409 : If wage income already exists (이미 근로소득이 존재할 경우)
   */
  createIncomeWage: IncomeWage;
  /**
   * Register daily wage income (일용직근로소득을 등록한다).
   *
   * Return (반환) : Daily wage income (일용직근로소득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 406 : Where there is no daily wage income earner (일용직근로소득자가 존재하지 않을 경우)
   *
   * Exception (예외) / 406 : Where the year/month of daily wage income is after leaving the company (일용직근로소득의 귀속연/월이 퇴사 이후일 경우)
   *
   * Exception (예외) / 409 : If daily wage income already exists (이미 일용직근로소득이 존재할 경우)
   */
  createIncomeWageDaily: IncomeWageDaily;
  /**
   * Register the acquisition of major insurance employees (4대보험직원취득을 등록한다).
   *
   * Return (반환) : Major insurance company employee acquisition (4대보험직원취득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 406 : Where there is no employee (직원이 존재하지 않을 경우)
   */
  createMajorInsuranceCompanyEmployeeAcquisition: MajorInsuranceCompanyEmployeeAcquisition;
  /**
   * Register the major insurance employees leave of absence (4대보험직원휴직을 등록한다).
   *
   * Return (반환) : Major insurance company employee leave of absence (4대보험직원휴직)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 406 : Where there is no employee (직원이 존재하지 않을 경우)
   */
  createMajorInsuranceCompanyEmployeeLeaveOfAbsence: MajorInsuranceCompanyEmployeeLeaveOfAbsence;
  /**
   * Register the loss of major insurance employees (4대보험직원상실을 등록한다).
   *
   * Return (반환) : Major insurance company employee loss (4대보험직원상실)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 406 : Where there is no employee (직원이 존재하지 않을 경우)
   */
  createMajorInsuranceCompanyEmployeeLoss: MajorInsuranceCompanyEmployeeLoss;
  /**
   * Register the salary change of major insurance employees (4대보험직원상실을 등록한다).
   *
   * Return (반환) : Major insurance company employee salary change (4대보험직원보수변경)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 406 : Where there is no employee (직원이 존재하지 않을 경우)
   */
  createMajorInsuranceCompanyEmployeeSalaryChange: MajorInsuranceCompanyEmployeeSalaryChange;
  /**
   * Register the major insurance  company join (4대보험 사업장가입을 등록한다).
   *
   * Return (반환) : Major insurance company company join (4대보험 사업장가입)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 406 : Where there is no employee (직원이 존재하지 않을 경우)
   */
  createMajorInsuranceCompanyJoin: MajorInsuranceCompanyJoin;
  /**
   * Register the major insurance  company out (4대보험 사업장탈퇴을 등록한다).
   *
   * Return (반환) : Major insurance company company out (4대보험 사업장탈퇴)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 406 : Where there is no employee (직원이 존재하지 않을 경우)
   */
  createMajorInsuranceCompanyOut: MajorInsuranceCompanyOut;
  /**
   * Register the major insurance consign status (4대보험업무대행을 등록한다).
   *
   * Return (반환) : Major insurance company consign status (4대보험업무대행)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 406 : Where there is no employee (직원이 존재하지 않을 경우)
   */
  createMajorInsuranceConsignStatus: MajorInsuranceConsignStatus;
  /**
   * Store automatically generated seal information of my company (내 사업자 자동생성 직인정보를 저장한다).
   *
   * Return (반환) : automatically generated seal file store serial number (자동생성 직인 파일저장일련번호)
   *
   * Necessary Role (필요역할) : WorkScreenRole.BASIC_SETTINGS (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   */
  createMyCompanyAutoGeneratedSeal: Scalars['Int'];
  /**
   * Register my company user (내 사업자 이용자를 등록한다).
   *
   * Return (반환) : User information (이용자정보)
   *
   * Necessary Role (필요역할) : WorkScreenRole.BASIC_SETTINGS (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   *
   * Exception (예외) / 400 : If the input data is not valid (입력 데이터가 유효하지 않을 경우)
   *
   * Exception (예외) / 409 : Duplicate login ID (로그인아이디가 중복될 경우)
   */
  createMyCompanyUser: User;
  /**
   * Register sales representative information (영업자 정보를 등록한다).
   *
   * Return (반환) : Sales representative information (영업자 정보)
   *
   * Necessary Role (필요역할) : AdminScreenRole.SALES_REPRESENTATIVE_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 409 : If the same sales representative name exists (동일한 영업자명이 존재하는 경우)
   */
  createSalesRepresentative: SalesRepresentative;
  /**
   * Register a screen role group (화면역할그룹을 등록한다).
   *
   * Return (반환) : Screen role group (화면역할그룹)
   *
   * Necessary Role (필요역할) : AdminScreenRole.ROLE_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 409 : If already registered (이미 등록되어 있는 경우)
   *
   * Exception (예외) / 409 : If the same name exists (동일한 이름이 존재하는 경우)
   */
  createScreenRoleGroup: ScreenRoleGroup;
  /**
   * Register company service contract management memo (사업자서비스계약 관리메모를 등록한다).
   *
   * Return (반환) : Company service contract management memo (사업자서비스계약 관리메모)
   *
   * Necessary Role (필요역할) : AdminScreenRole.COMPANY_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 406 : If company information does not exist (사업자 정보가 존재하지 않는 경우)
   */
  createServiceContractManageMemo: CompanyServiceContractManageMemo;
  /**
   * Register service subscription application (서비스가입신청을 등록한다).
   *
   * Return (반환) : Service subscription application (서비스가입신청)
   *
   * Exception (예외) / 406 : If any of the terms and conditions are not agreed (약관중 하나라도 동의하지 않은 경우)
   *
   * Exception (예외) / 406 : If you have not applied for both accounting and withholding services (회계, 원천 두 서비스 모두 신청하지 않은 경우)
   *
   * Exception (예외) / 409 : If the business registration number has already been applied (이미 신청한 사업자등록번호일 경우)
   */
  createSubscriptionRequest: SubscriptionRequest;
  /**
   * Generate a withholding performance report (원천징수이행상황신고서를 생성한다).
   *
   * Return (반환) : Withholding performance report (원천징수이행상황신고서)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 409 : If withholding performance report already exists (이미 원천징수이행상황신고서가 존재할 경우)
   */
  createTaxWithholdingStatusReport: TaxWithholdingStatusReport;
  /**
   * Register manager, sales representative, and partner types of user (매니저, 영업자, 파트너 유형의 회원을 등록한다).
   *
   * Return (반환) : User (회원)
   *
   * Necessary Role (필요역할) : AdminScreenRole.USER_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 409 : If the same login ID exists (동일한 로그인아이디가 존재하는 경우)
   *
   * Exception (예외) / 400 : If the data entered is not valid (입력된 데이터가 유효하지 않을 경우)
   */
  createUser: User;
  /**
   * Register withholding config pay item (원천설정 소득항목을 등록한다).
   *
   * Return (반환) : Withholding config pay item (원천설정 소득항목)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_SETTINGS (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 409 : If the same item code exists (동일한 항목코드가 존재하는 경우)
   *
   * Exception (예외) / 409 : If the same item name exists (동일한 항목명이 존재하는 경우)
   */
  createWithholdingConfigPayItem: WithholdingConfigPayItem;
  /**
   * The administrator issues additional tokens of the customer's business role (관리자가 고객업무 역할의 추가 토큰 발행한다).
   *
   * Return (반환) : Login response (로그인 응답)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception that should not occur (발생하면 안되는 예외) / 403 : User type is not a manager/sales representative member (사용자유형이 매니저/영업자회원이 아닐 경우)
   *
   * Exception that should not occur (발생하면 안되는 예외) / 404 : If company information does not exist (사업자 정보가 존재하지 않는 경우)
   *
   * Exception (예외) / 406 : If user information does not exist (사용자 정보가 존재하지 않을 경우)
   *
   * Exception (예외) / 406 : When user information is disabled (사용자 정보가 비활성화 된 경우)
   *
   * Exception (예외) / 406 : Contract termination is in progress (계약해지가 진행중인 경우)
   */
  customerWorkLogin: LoginResponse;
  /**
   * Delete a bankbook (통장을 삭제한다).
   *
   * Return (반환) : True
   *
   * Necessary Role (필요역할) : WorkScreenRole.ACCOUNTING_SETTINGS (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   *
   * Exception (예외) / 404 : If bankbook does not exist (통장이 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If already deleted (이미 삭제된 경우)
   */
  deleteBankbook: Scalars['Boolean'];
  /**
   * Delete company management memo (사업자 관리메모를 삭제한다).
   *
   * Return (반환) : true
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : If you do not have permission to delete it (삭제할 수 있는 권한이 없을 경우)
   *
   * Exception (예외) / 404 : If it does not exist (존재하지 않은 경우)
   *
   * Exception (예외) / 409 : If already deleted (이미 삭제된 경우)
   */
  deleteCompanyManageMemo: Scalars['Boolean'];
  /**
   * Delete the business income earner (사업소득자를 삭제한다).
   *
   * Return (반환) : true
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : Where there is no business income earner (사업소득자가 존재하지 않을 경우)
   *
   * Exception (예외) / 406 : If it is impossible to delete it because of the registered income (등록된 소득이 있어서 삭제가 불가능할 경우)
   *
   * Exception (예외) / 409 : If already deleted (이미 삭제된 경우)
   */
  deleteEmployeeBusiness: Scalars['Boolean'];
  /**
   * Delete the extra income earner (기타소득자를 삭제한다).
   *
   * Return (반환) : true
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : Where there is no extra income earner (기타소득자가 존재하지 않을 경우)
   *
   * Exception (예외) / 406 : If it is impossible to delete it because of the registered income (등록된 소득이 있어서 삭제가 불가능할 경우)
   *
   * Exception (예외) / 409 : If already deleted (이미 삭제된 경우)
   */
  deleteEmployeeExtra: Scalars['Boolean'];
  /**
   * Delete the wage income earner (근로소득자를 삭제한다).
   *
   * Return (반환) : true
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : Where there is no wage income earner (근로소득자가 존재하지 않을 경우)
   *
   * Exception (예외) / 406 : If it is impossible to delete it because of the registered income (등록된 소득이 있어서 삭제가 불가능할 경우)
   *
   * Exception (예외) / 409 : If already deleted (이미 삭제된 경우)
   */
  deleteEmployeeWage: Scalars['Boolean'];
  /**
   * Delete the daily wage income earner (일용직근로소득자를 삭제한다).
   *
   * Return (반환) : true
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : Where there is no daily wage income earner (일용직근로소득자가 존재하지 않을 경우)
   *
   * Exception (예외) / 406 : If it is impossible to delete it because of the registered income (등록된 소득이 있어서 삭제가 불가능할 경우)
   *
   * Exception (예외) / 409 : If already deleted (이미 삭제된 경우)
   */
  deleteEmployeeWageDaily: Scalars['Boolean'];
  /**
   * Delete dependents of wage income earners (근로소득자의 부양가족을 삭제한다).
   *
   * Return (반환) : true
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 406 : Where there is no wage income earner (근로소득자가 존재하지 않을 경우)
   *
   * Exception (예외) / 404 : Where a dependent of a wage income earner does not exist (근로소득자의 부양가족이 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If already deleted (이미 삭제된 경우)
   */
  deleteEmployeeWageDependent: Scalars['Boolean'];
  /**
   * Delete the list of business income (사업소득 목록을 삭제한다).
   *
   * Return (반환) : number of deletions (삭제건수)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 404 : If business income does not exist (사업소득이 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If business income has already been deleted (사업소득이 이미 삭제된 경우)
   */
  deleteIncomeBusinesses: Scalars['Int'];
  /**
   * Delete the list of extra income (기타소득 목록을 삭제한다).
   *
   * Return (반환) : number of deletions (삭제건수)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 404 : If extra income does not exist (기타소득이 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If extra income has already been deleted (기타소득이 이미 삭제된 경우)
   */
  deleteIncomeExtras: Scalars['Int'];
  /**
   * Delete the list of retirement income (퇴직소득 목록을 삭제한다).
   *
   * Return (반환) : number of deletions (삭제건수)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 404 : If retirement income does not exist (퇴직소득이 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If retirement income has already been deleted (퇴직소득이 이미 삭제된 경우)
   */
  deleteIncomeRetirements: Scalars['Int'];
  /**
   * Delete the list of daily wage income (일용직근로소득 목록을 삭제한다).
   *
   * Return (반환) : number of deletions (삭제건수)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 404 : If daily wage income does not exist (일용직근로소득이 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If daily wage income has already been deleted (일용직근로소득이 이미 삭제된 경우)
   */
  deleteIncomeWageDailies: Scalars['Int'];
  /**
   * Delete the list of wage income (근로소득 목록을 삭제한다).
   *
   * Return (반환) : number of deletions (삭제건수)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 404 : If wage income does not exist (근로소득이 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If wage income has already been deleted (근로소득이 이미 삭제된 경우)
   */
  deleteIncomeWages: Scalars['Int'];
  /**
   * Delete year-end tax adjustment for mid-term retirement (중도퇴사연말정산을 삭제한다).
   *
   * Return (반환) : True
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 404 : If year-end tax adjustment for mid-term retirement does not exist (중도퇴사연말정산이 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If year-end tax adjustment for mid-term retirement has already been deleted (중도퇴사연말정산이 이미 삭제된 경우)
   */
  deleteMidTermSettlement: Scalars['Boolean'];
  /**
   * Delete company service contract management memo (사업자서비스계약 관리메모를 삭제한다).
   *
   * Return (반환) : true
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : If you do not have permission to delete it (삭제할 수 있는 권한이 없을 경우)
   *
   * Exception (예외) / 404 : If it does not exist (존재하지 않은 경우)
   *
   * Exception (예외) / 409 : If already deleted (이미 삭제된 경우)
   */
  deleteServiceContractManageMemo: Scalars['Boolean'];
  /**
   * Delete a withholding performance report (원천징수이행상황신고서를 삭제한다).
   *
   * Return (반환) : true
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If withholding performance report does not exist (원천징수이행상황신고서가 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : If withholding performance report has already been deleted (원천징수이행상황신고서가 이미 삭제된 경우)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   */
  deleteTaxWithholdingStatusReport: Scalars['Boolean'];
  /**
   * Delete withholding config pay item (원천설정 소득항목을 삭제한다).
   *
   * Return (반환) : true
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_SETTINGS (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If no pay item exists (소득항목이 존재하지 않을 경우)
   *
   * Exception (예외) / 406 : In case of use by employees, income, etc (직원, 소득 등에서 사용중인 경우)
   */
  deleteWithholdingConfigPayItem: Scalars['Boolean'];
  /**
   * Log in and return the token (로그인을 해서 토큰을 반환한다).
   *
   * Return (반환) : Login response (로그인 응답)
   *
   * Exception (예외) / 404 : If the login ID does not exist (로그인 아이디가 존재하지 않을 경우)
   *
   * Exception (예외) / 404 : When user information is disabled (사용자 정보가 비활성화 된 경우)
   *
   * Exception (예외) / 412 : Password not set (패스워드 미설정)
   *
   * Exception (예외) / 401 : Password mismatch (패스워드 불일치)
   *
   * Exception that should not occur (발생하면 안되는 예외) / 403 : If you do not have permission - Contact an administrator (권한이 없는 경우 - 관리자 문의)
   *
   * Exception (예외) / 406 : Contract termination is in progress (계약해지가 진행중인 경우)
   */
  login: LoginResponse;
  /**
   * Log out to deactivate the token (로그아웃을 하여 토큰을 비활성시킨다).
   *
   * Return (반환) : true
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception that should not occur (발생하면 안되는 예외) / 404 : If the refresh token does not exist (리프레시토큰이 존재하지 않는 경우)
   *
   * Exception that should not occur (발생하면 안되는 예외) / 403 : Mismatch between Refresh Token User Information and Access Token User Information (리프레시토큰 사용자정보와 억세스토큰 사용자정보 불일치)
   *
   * Exception (예외) / 409 : Refresh token, has already disabled (이미 비활성화 된 리프레시 토큰)
   */
  logout: Scalars['Boolean'];
  /**
   * Renew token (토큰을 갱신한다).
   *
   * Return (반환) : Login response (로그인 응답)
   *
   * Exception that should not occur (발생하면 안되는 예외) / 403 : Signature verification of the access token fails (억세스토큰의 서명검증에 실패한 경우)
   *
   * Exception that should not occur (발생하면 안되는 예외) / 404 : If the refresh token does not exist (리프레시토큰이 존재하지 않는 경우)
   *
   * Exception that should not occur (발생하면 안되는 예외) / 403 : Mismatch between Refresh Token User Information and Access Token User Information (리프레시토큰 사용자정보와 억세스토큰 사용자정보 불일치)
   *
   * Exception (예외) / 406 : If the refresh token is disabled (리프레시토큰이 비활성화 된 경우)
   *
   * Exception (예외) / 406 : The refresh token has expired (리프레시토큰의 유효기간이 만료된 경우)
   *
   * Exception (예외) / 406 : If user information does not exist (사용자 정보가 존재하지 않을 경우)
   *
   * Exception (예외) / 406 : When user information is disabled (사용자 정보가 비활성화 된 경우)
   *
   * Exception that should not occur (발생하면 안되는 예외) / 403 : If you do not have permission - Contact an administrator (권한이 없는 경우 - 관리자 문의)
   *
   * Exception (예외) / 406 : Contract termination is in progress (계약해지가 진행중인 경우)
   */
  refreshLogin: LoginResponse;
  /**
   * Update the major insurance consign status (사용자가 사업장관리번호를 수정하거나, 재등록하여 4대보험 업무대행정보를 수정한다).
   *
   * Return (반환) : Major insurance company consign status (4대보험업무대행)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 406 : Where there is no employee (직원이 존재하지 않을 경우)
   */
  renewMajorInsuranceConsignStatus: MajorInsuranceConsignStatus;
  /**
   * Change the order of bankbooks (통장 순서를 변경한다).
   *
   * Return (반환) : number of changes (변경건수)
   *
   * Necessary Role (필요역할) : WorkScreenRole.ACCOUNTING_SETTINGS (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  reorderBankbooks: Scalars['Int'];
  /**
   * Change the order of withholding config pay items (원천설정 소득항목 순서를 변경한다).
   *
   * Return (반환) : number of changes (변경건수)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_SETTINGS (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  reorderWithholdingConfigPayItems: Scalars['Int'];
  /**
   * Request the creation of business income payment statement electronic filing file (거주자사업소득지급명세서 전자신고 파일제작을 요청한다).
   *
   * Return (반환) : Requested number of electronic filing production (요청된 전자신고 제작건수)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  requestCreationIncomeBusinessPaymentStatementElectronicFilingFile: Scalars['Int'];
  /**
   * Request the creation of business income simplified payment statement electronic filing file (거주자사업소득간이지급명세서 전자신고 파일제작을 요청한다).
   *
   * Return (반환) : Requested number of electronic filing production (요청된 전자신고 제작건수)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  requestCreationIncomeBusinessSimplifiedPaymentStatementElectronicFilingFile: Scalars['Int'];
  /**
   * Request the creation of extra income payment statement electronic filing file (거주자기타소득지급명세서 전자신고 파일제작을 요청한다).
   *
   * Return (반환) : Requested number of electronic filing production (요청된 전자신고 제작건수)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  requestCreationIncomeExtraPaymentStatementElectronicFilingFile: Scalars['Int'];
  /**
   * Request the creation of retirement income payment statement electronic filing file (퇴직소득지급명세서 전자신고 파일제작을 요청한다).
   *
   * Return (반환) : Requested number of electronic filing production (요청된 전자신고 제작건수)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  requestCreationIncomeRetirementPaymentStatementElectronicFilingFile: Scalars['Int'];
  /**
   * Request the creation of daily wage income payment statement electronic filing file (일용근로소득지급명세서 전자신고 파일제작을 요청한다).
   *
   * Return (반환) : Requested number of electronic filing production (요청된 전자신고 제작건수)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  requestCreationIncomeWageDailyPaymentStatementElectronicFilingFile: Scalars['Int'];
  /**
   * Request the creation of wage income payment statement electronic filing file (근로소득지급명세서 전자신고 파일제작을 요청한다).
   *
   * Return (반환) : Requested number of electronic filing production (요청된 전자신고 제작건수)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  requestCreationIncomeWagePaymentStatementElectronicFilingFile: Scalars['Int'];
  /**
   * Request the creation of wage income simplified payment statement electronic filing file (근로소득간이지급명세서 전자신고 파일제작을 요청한다).
   *
   * Return (반환) : Requested number of electronic filing production (요청된 전자신고 제작건수)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  requestCreationIncomeWageSimplifiedPaymentStatementElectronicFilingFile: Scalars['Int'];
  /**
   * Request the creation of local income tax electronic filing file (지방소득세 전자신고 파일제작을 요청한다).
   *
   * Return (반환) : Requested number of electronic filing production (요청된 전자신고 제작건수)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  requestCreationLocalIncomeTaxElectronicFilingFile: Scalars['Int'];
  /**
   * Request the creation of withholding tax electronic filing file (원천세 전자신고 파일제작을 요청한다).
   *
   * Return (반환) : Requested number of electronic filing production (요청된 전자신고 제작건수)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  requestCreationWithholdingTaxElectronicFilingFile: Scalars['Int'];
  /**
   * Reset the password through the password reset key (비밀번호 재설정 키를 통해 비밀번호를 리셋한다).
   *
   * Return (반환) : true
   *
   * Exception (예외) / 403 : When user information is disabled (사용자 정보가 비활성화 된 경우)
   *
   * Exception that should not occur (발생하면 안되는 예외) / 404 : If the key does not exist (키가 존재하지 않는 경우)
   *
   * Exception (예외) / 406 : The key has expired (키의 유효기간이 지난 경우)
   *
   * Exception (예외) / 409 : If the key is already used (이미 사용된 키인 경우)
   */
  resetPassword: Scalars['Boolean'];
  /**
   * Stores pay/deductions for daily wage income earners (일용직근로소득자의 소득/공제/감면을 저장한다).
   *
   * Return (반환) : Daily wage income earner (일용직근로소득자)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : Where there is no daily wage income earner (일용직근로소득자가 존재하지 않을 경우)
   */
  saveEmployeeWageDailyPayDeduction: EmployeeWageDaily;
  /**
   * Stores pay/deductions/reductions for wage income earners (근로소득자의 소득/공제/감면을 저장한다).
   *
   * Return (반환) : Wage income earner (근로소득자)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : Where there is no wage income earner (근로소득자가 존재하지 않을 경우)
   */
  saveEmployeeWagePayDeductionReduction: EmployeeWage;
  /**
   * Save year-end tax adjustment for mid-term retirement (중도퇴사연말정산을 저장한다).
   *
   * Return (반환) : Year-end tax adjustment for mid-term retirement (중도퇴사연말정산)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 406 : Where there is no wage income earner (근로소득자가 존재하지 않을 경우)
   *
   * Exception (예외) / 406 : Where the date of resignation of the wage income earner does not match the imputed year/month of year-end tax adjustment for mid-term retirement (근로소득자의 퇴사날짜가 중도퇴사연말정산의 귀속연월과 일치하지 않을 경우)
   *
   * Exception (예외) / 406 : If wage income does not exist until the end of employment (퇴사월까지 근로소득이 존재하지 않을 경우)
   *
   * Exception (예외) / 404 : If wage income does not exist (근로소득이 존재하지 않을 경우)
   */
  saveMidTermSettlement: IncomeYearEndTaxAdjustment;
  /**
   * Send an e-mail regarding the calculation of retirement income (퇴직소득 계산내역 이메일을 발송한다).
   *
   * Return (반환) : True
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  sendCalculateIncomeRetirementEmail: Scalars['Boolean'];
  /**
   * Send an e-mail to reset the password of my company user (내사업자 아용자의 비밀번호를 재설정하기 위해 이메일을 발송한다).
   *
   * Return (반환) : true
   *
   * Necessary Role (필요역할) : WorkScreenRole.USER_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If user information does not exist (회원 정보가 존재하지 않는 경우)
   *
   * Exception (예외) / 403 : If member user information is inactive (회원정보가 비활성인 경우)
   */
  sendEmailToResetMyCompanyUserPassword: Scalars['Boolean'];
  /**
   * Send an e-mail to reset a user's password (회원의 비밀번호를 재설정하기 위해 이메일을 발송한다).
   *
   * Return (반환) : true
   *
   * Necessary Role (필요역할) : AdminScreenRole.USER_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If user information does not exist (회원 정보가 존재하지 않는 경우)
   *
   * Exception (예외) / 403 : If member user information is inactive (회원정보가 비활성인 경우)
   */
  sendEmailToResetUserPassword: Scalars['Boolean'];
  /**
   * Send an e-mail for the report on the withholding receipt of business income (사업소득 원천징수영수증 리포트 이메일을 발송한다).
   *
   * Return (반환) : Report email delivery schedule task count (리포트 이메일 발송 예약 작업 건수)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  sendIncomeBusinessWithholdingReceiptReportEmail: Scalars['Int'];
  /**
   * Send an e-mail for the report on the withholding receipt of extra income (기타소득 원천징수영수증 리포트 이메일을 발송한다).
   *
   * Return (반환) : Report email delivery schedule task count (리포트 이메일 발송 예약 작업 건수)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  sendIncomeExtraWithholdingReceiptReportEmail: Scalars['Int'];
  /**
   * Send an e-mail for the report on the withholding receipt of retirement income (퇴직소득 원천징수영수증 리포트 이메일을 발송한다).
   *
   * Return (반환) : Report email delivery schedule task count (리포트 이메일 발송 예약 작업 건수)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 406 : If any of the selected retirement income does not exist (선택한 퇴직소득 중 존재하지 않는 정보가 있을 경우)
   */
  sendIncomeRetirementWithholdingReceiptReportEmail: Scalars['Int'];
  /**
   * Send an e-mail for the report on the daily wage income payroll register (일용직근로소득 급여대장 리포트 이메일을 발송한다).
   *
   * Return (반환) : True
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 406 : If daily wage income does not exist (일용직근로소득이 존재하지 않을 경우)
   */
  sendIncomeWageDailyPayrollRegisterReportEmail: Scalars['Boolean'];
  /**
   * Send an e-mail for the report on the daily wage income salary statement (일용직근로소득 급여명세서 리포트 이메일을 발송한다).
   *
   * Return (반환) : Report email delivery schedule task count (리포트 이메일 발송 예약 작업 건수)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 406 : If any of the selected daily wage income does not exist (선택한 일용직근로소득 중 존재하지 않는 정보가 있을 경우)
   */
  sendIncomeWageDailySalaryStatementReportEmail: Scalars['Int'];
  /**
   * Send an e-mail for the report on the withholding receipt of daily wage income (일용직근로소득 원천징수영수증 리포트 이메일을 발송한다).
   *
   * Return (반환) : Report email delivery schedule task count (리포트 이메일 발송 예약 작업 건수)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  sendIncomeWageDailyWithholdingReceiptReportEmail: Scalars['Int'];
  /**
   * Send an e-mail for the report on the wage income payroll register (근로소득 급여대장 리포트 이메일을 발송한다).
   *
   * Return (반환) : True
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 406 : If wage income does not exist (근로소득이 존재하지 않을 경우)
   */
  sendIncomeWagePayrollRegisterReportEmail: Scalars['Boolean'];
  /**
   * Send an e-mail for the report on the wage income salary statement (근로소득 급여명세서 리포트 이메일을 발송한다).
   *
   * Return (반환) : Report email delivery schedule task count (리포트 이메일 발송 예약 작업 건수)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 406 : If any of the selected wage income does not exist (선택한 근로소득 중 존재하지 않는 정보가 있을 경우)
   */
  sendIncomeWageSalaryStatementReportEmail: Scalars['Int'];
  /**
   * Send an e-mail for the report on the withholding receipt of wage income (근로소득 원천징수영수증 리포트 이메일을 발송한다).
   *
   * Return (반환) : Report email delivery schedule task count (리포트 이메일 발송 예약 작업 건수)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 406 : If any of the selected wage income receipt does not exist (선택한 근로소득원천징수영수증 중 존재하지 않는 정보가 있을 경우)
   */
  sendIncomeWageWithholdingReceiptReportEmail: Scalars['Int'];
  /**
   * Send an e-mail for the report on the wage income withholding tax by employee (소득자별 근로소득 원천징수영수부 리포트 이메일을 발송한다).
   *
   * Return (반환) : Report email delivery schedule task count (리포트 이메일 발송 예약 작업 건수)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 406 : If any of the selected wage income withholding tax by employee does not exist (선택한 소득자별 근로소득 원천징수영수부 중 존재하지 않는 정보가 있을 경우)
   */
  sendIncomeWageWithholdingTaxByEmployeeReportEmail: Scalars['Int'];
  /**
   * Send an e-mail withholding tax status report form (원천징수이행상황신고서 서식 이메일을 발송한다).
   *
   * Return (반환) : Form email delivery schedule task count (서식 이메일 발송 예약 작업 건수)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If a withholding tax performance report does not exist (원천징수이행상황신고서가 존재하지 않을 경우)
   */
  sendTaxWithholdingStatusReportEmail: Scalars['Int'];
  /**
   * Modify a bankbook (통장을 수정한다).
   *
   * Return (반환) : Bankbook (통장)
   *
   * Necessary Role (필요역할) : WorkScreenRole.ACCOUNTING_SETTINGS (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   *
   * Exception (예외) / 404 : If bankbook does not exist (통장이 존재하지 않을 경우)
   */
  updateBankbook: Bankbook;
  /**
   * Modify the client (거래처를 수정한다).
   *
   * Return (반환) : Client (거래처)
   *
   * Necessary Role (필요역할) : WorkScreenRole.ACCOUNTING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   *
   * Exception (예외) / 404 : If client does not exist (거래처가 존재하지 않을 경우)
   */
  updateClient: Client;
  /**
   * Modify company information (사업자 정보를 수정한다).
   *
   * Return (반환) : Company information (사업자 정보)
   *
   * Necessary Role (필요역할) : AdminScreenRole.COMPANY_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If company information does not exist (사업자 정보가 존재하지 않는 경우)
   *
   * Exception (예외) / 406 : If the data you want to modify is not valid (수정할 데이터가 유효하지 않는 경우)
   */
  updateCompany: Company;
  /**
   * Modify company management memo (사업자 관리메모를 수정한다).
   *
   * Return (반환) : Company management memo (사업자 관리메모)
   *
   * Necessary Role (필요역할) : AdminScreenRole.COMPANY_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : If you do not have permission to modify it (수정할 수 있는 권한이 없을 경우)
   *
   * Exception (예외) / 404 : If it does not exist (존재하지 않은 경우)
   *
   * Exception (예외) / 404 : If already deleted (이미 삭제된 경우)
   */
  updateCompanyManageMemo: CompanyManageMemo;
  /**
   * Modify the business income earner (사업소득자를 수정한다).
   *
   * Return (반환) : Business income earner (사업소득자)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : Where there is no business income earner (사업소득자가 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : Where there is a business income earner with the same resident registration number / foreign number to be changed (변경할 동일한 주민등록번호 / 외국인번호의 사업소득자가 존재할 경우)
   *
   * Exception (예외) / 406 : If it is impossible to modify the resident registration number/foreigner number due to registered income (등록된 소득이 있어서 주민등록번호 / 외국인번호 수정이 불가능할 경우)
   */
  updateEmployeeBusiness: EmployeeBusiness;
  /**
   * Modify the extra income earner (기타소득자를 수정한다).
   *
   * Return (반환) : Extra income earner (기타소득자)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : Where there is no extra income earner (기타소득자가 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : Where there is an extra income earner with the same resident registration number / foreign number to be changed (변경할 동일한 주민등록번호 / 외국인번호의 기타소득자가 존재할 경우)
   *
   * Exception (예외) / 406 : If it is impossible to modify the resident registration number/foreigner number due to registered income (등록된 소득이 있어서 주민등록번호 / 외국인번호 수정이 불가능할 경우)
   */
  updateEmployeeExtra: EmployeeExtra;
  /**
   * Modify the wage income earner (근로소득자를 수정한다).
   *
   * Return (반환) : Wage income earner (근로소득자)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : Where there is no wage income earner (근로소득자가 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : Where there is a wage income earner with the same resident registration number / foreign number to be changed (변경할 동일한 주민등록번호 / 외국인번호의 근로소득자가 존재할 경우)
   *
   * Exception (예외) / 406 : If it is impossible to modify the resident registration number/foreigner number due to registered income (등록된 소득이 있어서 주민등록번호 / 외국인번호 수정이 불가능할 경우)
   */
  updateEmployeeWage: EmployeeWage;
  /**
   * Modify the daily wage income earner (일용직근로소득자를 수정한다).
   *
   * Return (반환) : Daily wage income earner (일용직근로소득자)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : Where there is no daily wage income earner (일용직근로소득자가 존재하지 않을 경우)
   *
   * Exception (예외) / 409 : Where there is a daily wage income earner with the same resident registration number / foreign number to be changed (변경할 동일한 주민등록번호 / 외국인번호의 일용직근로소득자가 존재할 경우)
   *
   * Exception (예외) / 406 : If it is impossible to modify the resident registration number/foreigner number due to registered income (등록된 소득이 있어서 주민등록번호 / 외국인번호 수정이 불가능할 경우)
   */
  updateEmployeeWageDaily: EmployeeWageDaily;
  /**
   * Modify dependents of wage income earners (근로소득자의 부양가족을 수정한다).
   *
   * Return (반환) : Dependent of wage income earner (근로소득자의 부양가족)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 406 : Where there is no wage income earner (근로소득자가 존재하지 않을 경우)
   *
   * Exception (예외) / 404 : Where a dependent of a wage income earner does not exist (근로소득자의 부양가족이 존재하지 않을 경우)
   */
  updateEmployeeWageDependent: EmployeeWageDependent;
  /**
   * Modify business income (사업소득을 수정한다).
   *
   * Return (반환) : Business income (사업소득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 404 : If business income does not exist (사업소득이 존재하지 않을 경우)
   */
  updateIncomeBusiness: IncomeBusiness;
  /**
   * Modify extra income (기타소득을 수정한다).
   *
   * Return (반환) : Extra income (기타소득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 404 : If extra income does not exist (기타소득이 존재하지 않을 경우)
   */
  updateIncomeExtra: IncomeExtra;
  /**
   * Modify retirement income (퇴직소득을 수정한다).
   *
   * Return (반환) : Retirement income (퇴직소득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 404 : If retirement income does not exist (퇴직소득이 존재하지 않을 경우)
   */
  updateIncomeRetirement: IncomeRetirement;
  /**
   * Modify wage income (근로소득을 수정한다).
   *
   * Return (반환) : Wage income (근로소득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 404 : If wage income does not exist (근로소득이 존재하지 않을 경우)
   */
  updateIncomeWage: IncomeWage;
  /**
   * Modify daily wage income (일용직근로소득을 수정한다).
   *
   * Return (반환) : Daily wage income (일용직근로소득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 404 : If daily wage income does not exist (일용직근로소득이 존재하지 않을 경우)
   */
  updateIncomeWageDaily: IncomeWageDaily;
  /**
   * Update the major insurance consign status (관리자가 4대보험사무대행 상태정보를 수정한다.).
   *
   * Return (반환) : Major insurance company consign status (4대보험업무대행)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 406 : Where there is no employee (직원이 존재하지 않을 경우)
   */
  updateMajorInsuranceConsignStatus: MajorInsuranceConsignStatus;
  /**
   * Update the major insurance consign status (관리자가 4대보험사무대행 상태정보를 수정한다.).
   *
   * Return (반환) : Major insurance company consign status (4대보험업무대행)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 406 : Where there is no employee (직원이 존재하지 않을 경우)
   */
  updateMajorInsuranceLocalOfficeInfo: MajorInsuranceConsignStatus;
  /**
   * Modify my company information (내 사업자 정보를 수정한다).
   *
   * Return (반환) : Company information (사업자정보)
   *
   * Necessary Role (필요역할) : WorkScreenRole.BASIC_SETTINGS (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   */
  updateMyCompany: Company;
  /**
   * Modify my company user (내 사업자 이용자를 수정한다).
   *
   * Return (반환) : User information (이용자정보)
   *
   * Necessary Role (필요역할) : WorkScreenRole.BASIC_SETTINGS (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   *
   * Exception (예외) / 400 : If the input data is not valid (입력 데이터가 유효하지 않을 경우)
   *
   * Exception (예외) / 404 : If user information does not exist (이용자 정보가 존재하지 않을 경우)
   */
  updateMyCompanyUser: User;
  /**
   * Modify sales representative information (영업자 정보를 수정한다).
   *
   * Return (반환) : Sales representative information (영업자 정보)
   *
   * Necessary Role (필요역할) : AdminScreenRole.SALES_REPRESENTATIVE_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If sales representative information does not exist (영업자 정보가 존재하지 않는 경우)
   *
   * Exception (예외) / 406 : To change the status of the head office (본사의 상태를 변경할 경우)
   *
   * Exception (예외) / 406 : To change the name of the head office (본사의 이름을 변경할 경우)
   *
   * Exception (예외) / 406 : If you change to a termination state without a termination date (해지일자 없이 해지상태로 변경하는 경우)
   *
   * Exception (예외) / 409 : If the same sales representative name exists (동일한 영업자명이 존재하는 경우)
   */
  updateSalesRepresentative: SalesRepresentative;
  /**
   * Modify the screen role group (화면역할그룹을 수정한다).
   *
   * Return (반환) : Screen role group (화면역할그룹)
   *
   * Necessary Role (필요역할) : AdminScreenRole.ROLE_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If it does not exist (존재하지 않는 경우)
   *
   * Exception (예외) / 403 : For read-only (읽기전용인 경우)
   *
   * Exception (예외) / 409 : If the same name exists as the name you want to change (변경할 이름과 동일한 이름이 존재할 경우)
   *
   * Exception (예외) / 406 : If there is nothing to change (변경할 내용이 없는 경우)
   */
  updateScreenRoleGroup: ScreenRoleGroup;
  /**
   * Modify company service contract information (사업자서비스계약 정보를 수정한다).
   *
   * Return (반환) : Company service contract (사업자서비스계약)
   *
   * Necessary Role (필요역할) : AdminScreenRole.COMPANY_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If company information does not exist (사업자 정보가 존재하지 않는 경우)
   *
   * Exception (예외) / 406 : If the data you want to modify is not valid (수정할 데이터가 유효하지 않는 경우)
   */
  updateServiceContract: CompanyServiceContract;
  /**
   * Modify company service contract management memo (사업자서비스계약 관리메모를 수정한다).
   *
   * Return (반환) : Company service contract management memo (사업자서비스계약 관리메모)
   *
   * Necessary Role (필요역할) : AdminScreenRole.SERVICE_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : If you do not have permission to modify it (수정할 수 있는 권한이 없을 경우)
   *
   * Exception (예외) / 404 : If it does not exist (존재하지 않은 경우)
   *
   * Exception (예외) / 404 : If already deleted (이미 삭제된 경우)
   */
  updateServiceContractManageMemo: CompanyServiceContractManageMemo;
  /**
   * Modify service subscription application (서비스가입신청을 수정한다).
   *
   * Return (반환) : Service subscription application (서비스가입신청)
   *
   * Necessary Role (필요역할) : AdminScreenRole.CONTRACT_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : Service subscription application information does not exist (서비스가입신청 정보가 존재하지 않을 경우)
   *
   * Exception (예외) / 406 : When the examination is complete (심사가 완료된 상태인 경우)
   *
   * Exception (예외) / 406 : If you have not applied for any services (서비스를 하나도 신청하지 않은 경우)
   *
   * Exception (예외) / 409 : In case of duplicate when changing business registration number (사업자등록번호 변경을 할 때 중복인 경우)
   */
  updateSubscriptionRequest: SubscriptionRequest;
  /**
   * Modify a withholding performance report (원천징수이행상황신고서를 수정한다).
   *
   * Return (반환) : Withholding performance report (원천징수이행상황신고서)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If withholding performance report does not exist (원천징수이행상황신고서가 존재하지 않을 경우)
   *
   * Exception (예외) / 406 : If the key conditions of the withholding tax performance report do not match (원천징수이행상황신고서 키 조건이 일치하지 않을 경우)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   */
  updateTaxWithholdingStatusReport: TaxWithholdingStatusReport;
  /**
   * Modify users of manager, sales representative, and partner type (매니저, 영업대표, 파트너 유형의 회원을 수정한다).
   *
   * Return (반환) : User (회원)
   *
   * Necessary Role (필요역할) : AdminScreenRole.USER_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If user information does not exist (회원 정보가 존재하지 않는 경우)
   *
   * Exception (예외) / 400 : If the data entered is not valid (입력된 데이터가 유효하지 않을 경우)
   */
  updateUser: User;
  /**
   * Modify withholding config (원천설정을 수정한다).
   *
   * Return (반환) : Withholding config (원천설정)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_SETTINGS (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If the setting does not exist (설정이 존재하지 않을 경우)
   *
   * Exception (예외) / 406 : Where there is undeclared income data and the type of salary report or payment is intended to be changed (신고가 안된 소득자료가 있으며, 급여신고나 지급형태를 변경하려고 한 경우)
   */
  updateWithholdingConfig: WithholdingConfig;
  /**
   * Modify withholding config deduction item (원천설정 공제항목을 수정한다).
   *
   * Return (반환) : Withholding config deduction item (원천설정 공제항목)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_SETTINGS (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If no deduction item exists (공제항목이 존재하지 않을 경우)
   *
   * Exception (예외) / 406 : If there is nothing to change (변경할 내용이 없는 경우)
   */
  updateWithholdingConfigDeductionItem: WithholdingConfigDeductionItem;
  /**
   * Modify withholding config pay item (원천설정 소득항목을 수정한다).
   *
   * Return (반환) : Withholding config pay item (원천설정 소득항목)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_SETTINGS (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If no pay item exists (소득항목이 존재하지 않을 경우)
   *
   * Exception (예외) / 406 : In case of use by employees, income, etc (직원, 소득 등에서 사용중인 경우)
   *
   * Exception (예외) / 406 : If there is nothing to change (변경할 내용이 없는 경우)
   */
  updateWithholdingConfigPayItem: WithholdingConfigPayItem;
};


export type MutationCancelMajorInsuranceCompanyEmployeeAcquisitionArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type MutationCancelMajorInsuranceCompanyEmployeeLeaveOfAbsenceArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type MutationCancelMajorInsuranceCompanyEmployeeLossArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type MutationCancelMajorInsuranceCompanyEmployeeSalaryChangeArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type MutationCancelMajorInsuranceCompanyJoinArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type MutationCancelMajorInsuranceCompanyOutArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type MutationChangeIncomeBusinessPaymentDayArgs = {
  companyId: Scalars['Int'];
  day: Scalars['Int'];
  incomeId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type MutationChangeIncomeExtraPaymentDayArgs = {
  companyId: Scalars['Int'];
  day: Scalars['Int'];
  incomeId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type MutationChangeIncomeProcessBusinessStatusArgs = {
  companyId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
  status: Scalars['ProcessStatusScalar'];
};


export type MutationChangeIncomeProcessExtraStatusArgs = {
  companyId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
  status: Scalars['ProcessStatusScalar'];
};


export type MutationChangeIncomeProcessRetirementStatusArgs = {
  companyId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
  status: Scalars['ProcessStatusScalar'];
};


export type MutationChangeIncomeProcessStatusArgs = {
  companyId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
  status: Scalars['ProcessStatusScalar'];
  type: Scalars['Int'];
};


export type MutationChangeIncomeProcessWageDailyStatusArgs = {
  companyId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
  status: Scalars['ProcessStatusScalar'];
};


export type MutationChangeIncomeProcessWageStatusArgs = {
  companyId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
  status: Scalars['ProcessStatusScalar'];
};


export type MutationChangeIncomeRetirementPaymentDayArgs = {
  companyId: Scalars['Int'];
  day: Scalars['Int'];
  incomeId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type MutationChangeIncomeWageDailyPaymentDayArgs = {
  companyId: Scalars['Int'];
  day: Scalars['Int'];
  incomeId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type MutationChangeIncomeWagePaymentDayArgs = {
  companyId: Scalars['Int'];
  day: Scalars['Int'];
  incomeId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type MutationChangeMyPasswordArgs = {
  password: Scalars['String'];
};


export type MutationChangeTaxWithholdingStatusReportStatusArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  reportId: Scalars['Int'];
  status: Scalars['ProcessStatusScalar'];
};


export type MutationCopyIncomeBusinessesArgs = {
  companyId: Scalars['Int'];
  source: IncomeProcessKeyInput;
  target: IncomeProcessKeyInput;
};


export type MutationCopyIncomeExtrasArgs = {
  companyId: Scalars['Int'];
  source: IncomeProcessKeyInput;
  target: IncomeProcessKeyInput;
};


export type MutationCopyIncomeWageDailiesArgs = {
  companyId: Scalars['Int'];
  source: IncomeProcessKeyInput;
  target: IncomeProcessKeyInput;
};


export type MutationCopyIncomeWagesArgs = {
  companyId: Scalars['Int'];
  source: IncomeProcessKeyInput;
  target: IncomeProcessKeyInput;
};


export type MutationCreateBankbookArgs = {
  bankbookInput: BankbookCreateInput;
  companyId: Scalars['Int'];
  facilityBusinessId: Scalars['Int'];
  fiscalYear: Scalars['Int'];
  scrapingInfoInput?: InputMaybe<ScrapingInfoInput>;
};


export type MutationCreateClientArgs = {
  companyId: Scalars['Int'];
  input: ClientInput;
};


export type MutationCreateCompanyBySubscriptionRequestArgs = {
  id: Scalars['Int'];
};


export type MutationCreateCompanyManageMemoArgs = {
  companyId: Scalars['Int'];
  memo: Scalars['String'];
};


export type MutationCreateEmployeeBusinessArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  input: EmployeeBusinessCreateInput;
};


export type MutationCreateEmployeeExtraArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  input: EmployeeExtraCreateInput;
};


export type MutationCreateEmployeeWageArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  input: EmployeeWageCreateInput;
};


export type MutationCreateEmployeeWageDailyArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  input: EmployeeWageDailyCreateInput;
};


export type MutationCreateEmployeeWageDependentArgs = {
  companyId: Scalars['Int'];
  employeeId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  input: EmployeeWageDependentCreateInput;
};


export type MutationCreateIncomeBusinessArgs = {
  companyId: Scalars['Int'];
  input: IncomeBusinessCreateInput;
  processKey: IncomeProcessKeyInput;
};


export type MutationCreateIncomeExtraArgs = {
  companyId: Scalars['Int'];
  input: IncomeExtraCreateInput;
  processKey: IncomeProcessKeyInput;
};


export type MutationCreateIncomeRetirementArgs = {
  companyId: Scalars['Int'];
  incomeCalculationInput: IncomeRetirementCalculationInput;
  input: IncomeRetirementCreateInput;
  processKey: IncomeProcessKeyInput;
  taxCalculationInput: IncomeRetirementTaxCalculationInput;
};


export type MutationCreateIncomeWageArgs = {
  companyId: Scalars['Int'];
  input: IncomeWageCreateInput;
  processKey: IncomeProcessKeyInput;
};


export type MutationCreateIncomeWageDailyArgs = {
  companyId: Scalars['Int'];
  input: IncomeWageDailyCreateInput;
  processKey: IncomeProcessKeyInput;
};


export type MutationCreateMajorInsuranceCompanyEmployeeAcquisitionArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  input: MajorInsuranceCompanyEmployeeAcquisitionInput;
};


export type MutationCreateMajorInsuranceCompanyEmployeeLeaveOfAbsenceArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  input: MajorInsuranceCompanyEmployeeLeaveOfAbsenceInput;
};


export type MutationCreateMajorInsuranceCompanyEmployeeLossArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  input: MajorInsuranceCompanyEmployeeLossInput;
};


export type MutationCreateMajorInsuranceCompanyEmployeeSalaryChangeArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  input: MajorInsuranceCompanyEmployeeSalaryChangeInput;
};


export type MutationCreateMajorInsuranceCompanyJoinArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  input: MajorInsuranceCompanyJoinInput;
};


export type MutationCreateMajorInsuranceCompanyOutArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  input: MajorInsuranceCompanyOutInput;
};


export type MutationCreateMajorInsuranceConsignStatusArgs = {
  companyId: Scalars['Int'];
  manageId: Scalars['String'];
};


export type MutationCreateMyCompanyAutoGeneratedSealArgs = {
  companyId: Scalars['Int'];
  seal: Scalars['String'];
};


export type MutationCreateMyCompanyUserArgs = {
  companyId: Scalars['Int'];
  input: CompanyUserCreateInput;
};


export type MutationCreateSalesRepresentativeArgs = {
  input: SalesRepresentativeDetailInput;
};


export type MutationCreateScreenRoleGroupArgs = {
  input: ScreenRoleGroupInput;
};


export type MutationCreateServiceContractManageMemoArgs = {
  companyId: Scalars['Int'];
  memo: Scalars['String'];
};


export type MutationCreateSubscriptionRequestArgs = {
  content: SubscriptionRequestContentInput;
};


export type MutationCreateTaxWithholdingStatusReportArgs = {
  companyId: Scalars['Int'];
  input: TaxWithholdingStatusReportInput;
  key: TaxWithholdingStatusReportKeyInput;
};


export type MutationCreateUserArgs = {
  input: UserCreateInput;
};


export type MutationCreateWithholdingConfigPayItemArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  input: WithholdingConfigPayItemCreateInput;
};


export type MutationCustomerWorkLoginArgs = {
  companyId: Scalars['Int'];
};


export type MutationDeleteBankbookArgs = {
  bankbookId: Scalars['Int'];
  companyId: Scalars['Int'];
  facilityBusinessId: Scalars['Int'];
  fiscalYear: Scalars['Int'];
};


export type MutationDeleteCompanyManageMemoArgs = {
  companyId: Scalars['Int'];
  memoId: Scalars['Float'];
};


export type MutationDeleteEmployeeBusinessArgs = {
  companyId: Scalars['Int'];
  employeeId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  incomeTypeCode: Scalars['String'];
};


export type MutationDeleteEmployeeExtraArgs = {
  companyId: Scalars['Int'];
  employeeId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  incomeTypeCode: Scalars['String'];
};


export type MutationDeleteEmployeeWageArgs = {
  companyId: Scalars['Int'];
  employeeId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type MutationDeleteEmployeeWageDailyArgs = {
  companyId: Scalars['Int'];
  employeeId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type MutationDeleteEmployeeWageDependentArgs = {
  companyId: Scalars['Int'];
  employeeId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  index: Scalars['Int'];
};


export type MutationDeleteIncomeBusinessesArgs = {
  companyId: Scalars['Int'];
  incomeIds: Array<Scalars['Int']>;
  processKey: IncomeProcessKeyInput;
};


export type MutationDeleteIncomeExtrasArgs = {
  companyId: Scalars['Int'];
  incomeIds: Array<Scalars['Int']>;
  processKey: IncomeProcessKeyInput;
};


export type MutationDeleteIncomeRetirementsArgs = {
  companyId: Scalars['Int'];
  incomeIds: Array<Scalars['Int']>;
  processKey: IncomeProcessKeyInput;
};


export type MutationDeleteIncomeWageDailiesArgs = {
  companyId: Scalars['Int'];
  incomeIds: Array<Scalars['Int']>;
  processKey: IncomeProcessKeyInput;
};


export type MutationDeleteIncomeWagesArgs = {
  companyId: Scalars['Int'];
  incomeIds: Array<Scalars['Int']>;
  processKey: IncomeProcessKeyInput;
};


export type MutationDeleteMidTermSettlementArgs = {
  companyId: Scalars['Int'];
  employeeId: Scalars['Int'];
  paymentDay: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type MutationDeleteServiceContractManageMemoArgs = {
  companyId: Scalars['Int'];
  memoId: Scalars['Float'];
};


export type MutationDeleteTaxWithholdingStatusReportArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  reportId: Scalars['Int'];
};


export type MutationDeleteWithholdingConfigPayItemArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  itemCode: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLogoutArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRefreshLoginArgs = {
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};


export type MutationRenewMajorInsuranceConsignStatusArgs = {
  companyId: Scalars['Int'];
  manageId: Scalars['String'];
};


export type MutationReorderBankbooksArgs = {
  companyId: Scalars['Int'];
  facilityBusinessId: Scalars['Int'];
  fiscalYear: Scalars['Int'];
  inputs: Array<BankbookReorderInput>;
};


export type MutationReorderWithholdingConfigPayItemsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  inputs: Array<WithholdingConfigPayItemsReorderInput>;
};


export type MutationRequestCreationIncomeBusinessPaymentStatementElectronicFilingFileArgs = {
  companyIds: Array<Scalars['Int']>;
  emailInput: ReceiveEmailRequestInput;
  filter: ElectronicFilingIncomeBusinessPaymentStatementSearchFilter;
};


export type MutationRequestCreationIncomeBusinessSimplifiedPaymentStatementElectronicFilingFileArgs = {
  companyIds: Array<Scalars['Int']>;
  emailInput: ReceiveEmailRequestInput;
  filter: ElectronicFilingIncomeBusinessSimplifiedPaymentStatementSearchFilter;
};


export type MutationRequestCreationIncomeExtraPaymentStatementElectronicFilingFileArgs = {
  companyIds: Array<Scalars['Int']>;
  emailInput: ReceiveEmailRequestInput;
  filter: ElectronicFilingIncomeExtraPaymentStatementSearchFilter;
};


export type MutationRequestCreationIncomeRetirementPaymentStatementElectronicFilingFileArgs = {
  companyIds: Array<Scalars['Int']>;
  emailInput: ReceiveEmailRequestInput;
  filter: ElectronicFilingIncomeRetirementPaymentStatementSearchFilter;
};


export type MutationRequestCreationIncomeWageDailyPaymentStatementElectronicFilingFileArgs = {
  companyIds: Array<Scalars['Int']>;
  emailInput: ReceiveEmailRequestInput;
  filter: ElectronicFilingIncomeWageDailyPaymentStatementSearchFilter;
};


export type MutationRequestCreationIncomeWagePaymentStatementElectronicFilingFileArgs = {
  companyIds: Array<Scalars['Int']>;
  emailInput: ReceiveEmailRequestInput;
  filter: ElectronicFilingIncomeWagePaymentStatementSearchFilter;
};


export type MutationRequestCreationIncomeWageSimplifiedPaymentStatementElectronicFilingFileArgs = {
  companyIds: Array<Scalars['Int']>;
  emailInput: ReceiveEmailRequestInput;
  filter: ElectronicFilingIncomeWageSimplifiedPaymentStatementSearchFilter;
};


export type MutationRequestCreationLocalIncomeTaxElectronicFilingFileArgs = {
  emailInput: ReceiveEmailRequestInput;
  filter: ElectronicFilingLocalIncomeTaxSearchFilter;
  reportKeyInputs: Array<ElectronicFilingReportKeyInput>;
};


export type MutationRequestCreationWithholdingTaxElectronicFilingFileArgs = {
  emailInput: ReceiveEmailRequestInput;
  filter: ElectronicFilingWithholdingTaxSearchFilter;
  reportKeyInputs: Array<ElectronicFilingReportKeyInput>;
};


export type MutationResetPasswordArgs = {
  key: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSaveEmployeeWageDailyPayDeductionArgs = {
  companyId: Scalars['Int'];
  employeeId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  input: EmployeeWageDailyPayDeductionInput;
};


export type MutationSaveEmployeeWagePayDeductionReductionArgs = {
  companyId: Scalars['Int'];
  employeeId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  input: EmployeeWagePayDeductionReductionInput;
};


export type MutationSaveMidTermSettlementArgs = {
  companyId: Scalars['Int'];
  employeeId: Scalars['Int'];
  paymentDay: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type MutationSendCalculateIncomeRetirementEmailArgs = {
  companyId: Scalars['Int'];
  emailInput: SendEmailRequestInput;
  input: IncomeRetirementCalculationInput;
};


export type MutationSendEmailToResetMyCompanyUserPasswordArgs = {
  companyId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationSendEmailToResetUserPasswordArgs = {
  id: Scalars['Int'];
};


export type MutationSendIncomeBusinessWithholdingReceiptReportEmailArgs = {
  companyId: Scalars['Int'];
  employeeInputs: Array<EmployeeBusinessSendEmailRequestInput>;
  input: IncomeBusinessWithholdingReceiptInput;
};


export type MutationSendIncomeExtraWithholdingReceiptReportEmailArgs = {
  companyId: Scalars['Int'];
  employeeInputs: Array<EmployeeExtraSendEmailRequestInput>;
  input: IncomeExtraWithholdingReceiptInput;
};


export type MutationSendIncomeRetirementWithholdingReceiptReportEmailArgs = {
  companyId: Scalars['Int'];
  incomeInputs: Array<IncomeSendEmailRequestInput>;
  input: IncomeRetirementWithholdingReceiptInput;
};


export type MutationSendIncomeWageDailyPayrollRegisterReportEmailArgs = {
  companyId: Scalars['Int'];
  emailInput: SendEmailRequestInput;
  input: PayrollRegisterInput;
};


export type MutationSendIncomeWageDailySalaryStatementReportEmailArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  incomeInputs: Array<IncomeSendEmailRequestInput>;
};


export type MutationSendIncomeWageDailyWithholdingReceiptReportEmailArgs = {
  companyId: Scalars['Int'];
  employeeInputs: Array<EmployeeSendEmailRequestInput>;
  input: IncomeWageDailyWithholdingReceiptInput;
};


export type MutationSendIncomeWagePayrollRegisterReportEmailArgs = {
  companyId: Scalars['Int'];
  emailInput: SendEmailRequestInput;
  input: PayrollRegisterInput;
};


export type MutationSendIncomeWageSalaryStatementReportEmailArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  incomeInputs: Array<IncomeSendEmailRequestInput>;
};


export type MutationSendIncomeWageWithholdingReceiptReportEmailArgs = {
  companyId: Scalars['Int'];
  incomeInputs: Array<IncomeSendEmailRequestInput>;
  input: IncomeWageWithholdingReceiptInput;
};


export type MutationSendIncomeWageWithholdingTaxByEmployeeReportEmailArgs = {
  companyId: Scalars['Int'];
  employeeInputs: Array<EmployeeSendEmailRequestInput>;
  input: IncomeWageWithholdingTaxByEmployeeInput;
};


export type MutationSendTaxWithholdingStatusReportEmailArgs = {
  companyId: Scalars['Int'];
  emailInput: SendEmailRequestInput;
  formInputs: Array<TaxWithholdingStatusReportFormInput>;
  imputedYear: Scalars['Int'];
  reportId: Scalars['Int'];
};


export type MutationUpdateBankbookArgs = {
  bankbookId: Scalars['Int'];
  bankbookInput: BankbookUpdateInput;
  companyId: Scalars['Int'];
  facilityBusinessId: Scalars['Int'];
  fiscalYear: Scalars['Int'];
  scrapingInfoInput?: InputMaybe<ScrapingInfoInput>;
};


export type MutationUpdateClientArgs = {
  clientId: Scalars['Int'];
  companyId: Scalars['Int'];
  input: ClientInput;
};


export type MutationUpdateCompanyArgs = {
  cmsBank?: InputMaybe<CompanyCmsBankInput>;
  detail?: InputMaybe<CompanyDetailInput>;
  id: Scalars['Int'];
  president?: InputMaybe<CompanyPresidentInput>;
};


export type MutationUpdateCompanyManageMemoArgs = {
  companyId: Scalars['Int'];
  memo: Scalars['String'];
  memoId: Scalars['Float'];
};


export type MutationUpdateEmployeeBusinessArgs = {
  companyId: Scalars['Int'];
  employeeId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  incomeTypeCode: Scalars['String'];
  input: EmployeeBusinessUpdateInput;
};


export type MutationUpdateEmployeeExtraArgs = {
  companyId: Scalars['Int'];
  employeeId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  incomeTypeCode: Scalars['String'];
  input: EmployeeExtraUpdateInput;
};


export type MutationUpdateEmployeeWageArgs = {
  companyId: Scalars['Int'];
  employeeId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  input: EmployeeWageUpdateInput;
};


export type MutationUpdateEmployeeWageDailyArgs = {
  companyId: Scalars['Int'];
  employeeId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  input: EmployeeWageDailyUpdateInput;
};


export type MutationUpdateEmployeeWageDependentArgs = {
  companyId: Scalars['Int'];
  employeeId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  index: Scalars['Int'];
  input: EmployeeWageDependentUpdateInput;
};


export type MutationUpdateIncomeBusinessArgs = {
  companyId: Scalars['Int'];
  incomeId: Scalars['Int'];
  input: IncomeBusinessUpdateInput;
  processKey: IncomeProcessKeyInput;
};


export type MutationUpdateIncomeExtraArgs = {
  companyId: Scalars['Int'];
  incomeId: Scalars['Int'];
  input: IncomeExtraUpdateInput;
  processKey: IncomeProcessKeyInput;
};


export type MutationUpdateIncomeRetirementArgs = {
  companyId: Scalars['Int'];
  incomeCalculationInput: IncomeRetirementCalculationInput;
  incomeId: Scalars['Int'];
  input: IncomeRetirementUpdateInput;
  processKey: IncomeProcessKeyInput;
  taxCalculationInput: IncomeRetirementTaxCalculationInput;
};


export type MutationUpdateIncomeWageArgs = {
  companyId: Scalars['Int'];
  incomeId: Scalars['Int'];
  input: IncomeWageUpdateInput;
  processKey: IncomeProcessKeyInput;
};


export type MutationUpdateIncomeWageDailyArgs = {
  companyId: Scalars['Int'];
  incomeId: Scalars['Int'];
  input: IncomeWageDailyUpdateInput;
  processKey: IncomeProcessKeyInput;
};


export type MutationUpdateMajorInsuranceConsignStatusArgs = {
  companyId: Scalars['Int'];
  input: MajorInsuranceConsignStatusInput;
};


export type MutationUpdateMajorInsuranceLocalOfficeInfoArgs = {
  companyId: Scalars['Int'];
  input: MajorInsuranceLocalOfficeInfo;
};


export type MutationUpdateMyCompanyArgs = {
  companyId: Scalars['Int'];
  input: MyCompanyChangeInput;
};


export type MutationUpdateMyCompanyUserArgs = {
  companyId: Scalars['Int'];
  input: CompanyUserUpdateInput;
  userId: Scalars['Int'];
};


export type MutationUpdateSalesRepresentativeArgs = {
  id: Scalars['Int'];
  input: SalesRepresentativeDetailInput;
};


export type MutationUpdateScreenRoleGroupArgs = {
  input: ScreenRoleGroupInput;
};


export type MutationUpdateServiceContractArgs = {
  extra?: InputMaybe<CompanyExtraInput>;
  id: Scalars['Int'];
  info?: InputMaybe<CompanyUsedServiceInfoInput>;
};


export type MutationUpdateServiceContractManageMemoArgs = {
  companyId: Scalars['Int'];
  memo: Scalars['String'];
  memoId: Scalars['Float'];
};


export type MutationUpdateSubscriptionRequestArgs = {
  content: SubscriptionRequestContentInput;
  id: Scalars['Int'];
  memo?: InputMaybe<Scalars['String']>;
  status: Scalars['Int'];
};


export type MutationUpdateTaxWithholdingStatusReportArgs = {
  companyId: Scalars['Int'];
  input: TaxWithholdingStatusReportInput;
  key: TaxWithholdingStatusReportKeyInput;
  reportId: Scalars['Int'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  input: UserUpdateInput;
};


export type MutationUpdateWithholdingConfigArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  input: WithholdingConfigInput;
};


export type MutationUpdateWithholdingConfigDeductionItemArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  input: WithholdingConfigDeductionItemUpdateInput;
  itemCode: Scalars['Int'];
};


export type MutationUpdateWithholdingConfigPayItemArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  input: WithholdingConfigPayItemUpdateInput;
  itemCode: Scalars['Int'];
};

/** Change my company information input (내사업자정보 변경 입력) */
export type MyCompanyChangeInput = {
  /** fax number (팩스번호) */
  fax?: InputMaybe<Scalars['String']>;
  /** representative phone number (대표번호) */
  phone: Scalars['String'];
  /** representative birthday / YYMMDD (대표자 생년월일) */
  presidentBirthday: Scalars['String'];
  /** representative email (대표자 이메일) */
  presidentEmail: Scalars['String'];
  /** representative mobile phone number (대표자 핸드폰번호) */
  presidentMobilePhone: Scalars['String'];
  /** seal file storage serial number (직인 파일저장일련번호) */
  sealFileStorageId?: InputMaybe<Scalars['Int']>;
};

/** My user information (내회원정보) */
export type MyUserInfo = {
  __typename?: 'MyUserInfo';
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** email (이메일) */
  email: Scalars['String'];
  /** manager grade / Top manager: 1, Middle manager: 2, Responsible manager: 3 (매니저등급 / 최고매니저:1, 중간매니저:2, 담당매니저:3) */
  managerGrade?: Maybe<Scalars['Int']>;
  /** mobile phone number (휴대폰) */
  mobilePhone: Scalars['String'];
  /** name (이름) */
  name: Scalars['String'];
  /** representative status (대표자여부) */
  president: Scalars['Boolean'];
  /** user type (사용자유형) */
  type: Scalars['String'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** login ID (로그인아이디) */
  username: Scalars['String'];
};

/** 페이지 정보 */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** 다음 페이지가 있는지 여부 */
  hasNextPage: Scalars['Boolean'];
};

/** Paginated filter (페이징 필터) */
export type PaginatedFilter = {
  /** page number (페이지번호) */
  page?: InputMaybe<Scalars['Int']>;
  /** number of page rows (페이지행수) */
  rows: Scalars['Int'];
};

/** Partner (파트너) */
export type Partner = {
  __typename?: 'Partner';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** partner code (파트너코드) */
  code: Scalars['String'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** description (설명) */
  description: Scalars['String'];
  /** partner serial number (파트너일련번호) */
  id: Scalars['Int'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** partner name (파트너명) */
  name: Scalars['String'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Pay item input (소득항목 입력) */
export type PayItemInput = {
  /** amount (금액) */
  amount: Scalars['Int'];
  /** item code (항목코드) */
  itemCode: Scalars['Int'];
};

/** Payroll register input (급여대장 입력) */
export type PayrollRegisterInput = {
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** payroll register sort type (급여대장 정렬 유형) : 사번/부서/직위 */
  sortType: Scalars['String'];
};

/** Sales representative information for Public Screen (Public Screen 용 영업자정보) */
export type PublicSalesRepresentative = {
  __typename?: 'PublicSalesRepresentative';
  /** sales representative serial number (영업자일련번호) */
  id: Scalars['Int'];
  /** sales representative name (영업자명) */
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /**
   * Calculate retirement income (퇴직소득을 계산한다).
   *
   * Return (반환) : severance pay (퇴직금)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  calculateIncomeRetirement: Scalars['Int'];
  /**
   * Calculate the retirement income tax (퇴직소득세를 계산한다).
   *
   * Return (반환) : Retirement income details (퇴직소득명세 상세)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  calculateIncomeRetirementTax: IncomeRetirementSpecificationDetail;
  /**
   * Calculate the income tax of the wage income earner (근로소득자의 소득세를 계산한다).
   *
   * Return (반환) : calculated income tax (계산된 소득세)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : Where information is not found in the simplified tax table of wage income (근로소득 간이세액표에서 정보를 찾을 수 없을 경우)
   */
  calculateIncomeWageTax: Scalars['Int'];
  /**
   * Calculate year-end tax adjustment for mid-term retirement (중도퇴사연말정산을 계산한다).
   *
   * Return (반환) : withholding income tax (원천징수소득세)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 412 : If the work status is not allowed (업무상태가 허용되지 않을 경우)
   *
   * Exception (예외) / 406 : Where there is no wage income earner (근로소득자가 존재하지 않을 경우)
   *
   * Exception (예외) / 406 : Where the date of resignation of the wage income earner does not match the imputed year/month of year-end tax adjustment for mid-term retirement (근로소득자의 퇴사날짜가 중도퇴사연말정산의 귀속연월과 일치하지 않을 경우)
   *
   * Exception (예외) / 406 : If wage income does not exist until the end of employment (퇴사월까지 근로소득이 존재하지 않을 경우)
   *
   * Exception (예외) / 404 : If wage income does not exist (근로소득이 존재하지 않을 경우)
   */
  calculateMidTermSettlement: Scalars['Int'];
  /**
   * Returns the list of employees eligible for retirement income (퇴직소득 대상 직원목록을 반환한다).
   *
   * Return (반환) : Employee list for retirement income (퇴직소득용 직원목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  findEmployeesForIncomeRetirement: EmployeesForIncomeRetirement;
  /**
   * Return the list of user organization (회원의 소속 목록을 반환한다).
   *
   * Return (반환) : User organization list (회원의 소속 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.USER_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  findGroups: Array<UserGroup>;
  /**
   * Return the list of statistics on the work status of business income based on the month of payment as the search period (검색기간으로 지급월 기준 사업소득 업무상태 통계 목록을 반환한다).
   *
   * Return (반환) : Statistics list of work status of business income based on payment month (지급월 기준 사업소득 업무상태 통계 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  findIncomeProcessBusinessStatViews: Array<IncomeProcessBusinessStatView>;
  /**
   * Return the list of statistics on the work status of extra income based on the month of payment as the search period (검색기간으로 지급월 기준 기타소득 업무상태 통계 목록을 반환한다).
   *
   * Return (반환) : Statistics list of work status of extra income based on payment month (지급월 기준 기타소득 업무상태 통계 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  findIncomeProcessExtraStatViews: Array<IncomeProcessExtraStatView>;
  /**
   * Return the list of statistics on the work status of daily wage income based on the month of payment as the search period (검색기간으로 지급월 기준 일용직근로소득 업무상태 통계 목록을 반환한다).
   *
   * Return (반환) : Statistics list of work status of daily wage income based on payment month (지급월 기준 일용직근로소득 업무상태 통계 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  findIncomeProcessWageDailyStatViews: Array<IncomeProcessWageDailyStatView>;
  /**
   * Return the list of statistics on the work status of wage income based on the month of payment as the search period (검색기간으로 지급월 기준 근로소득 업무상태 통계 목록을 반환한다).
   *
   * Return (반환) : Work status statistics list of wage income based on month of payment (지급월 기준 근로소득 업무상태 통계 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  findIncomeProcessWageStatViews: Array<IncomeProcessWageStatView>;
  /**
   * Return the list of managers (매니저 목록을 반환한다).
   *
   * Return (반환) : User view list (회원뷰 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.COMPANY_MANAGE (read)
   *
   * Necessary Role (필요역할) : AdminScreenRole.SERVICE_MANAGE (read)
   *
   * Necessary Role (필요역할) : AdminScreenRole.USER_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  findManagerUsers: Array<UserView>;
  /**
   * Return the list of partners (파트너 목록을 반환한다).
   *
   * Return (반환) : Partner list (파트너 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.USER_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  findParters: Array<Partner>;
  /**
   * Find the password (비밀번호를 찾는다).
   *
   * 반환 : true
   *
   * Exception (예외) / 404 : If user information does not exist (회원정보가 존재하지 않을 경우)
   *
   * Exception (예외) / 403 : When user information is disabled (회원정보가 비활성화 된 경우)
   */
  findPassword: Scalars['Boolean'];
  /**
   * Return the list of sales representatives (영업자 목록을 반환한다).
   *
   * Return (반환) : Sales representative view list (영업자뷰 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.CONTRACT_MANAGE (read)
   *
   * Necessary Role (필요역할) : AdminScreenRole.COMPANY_MANAGE (read)
   *
   * Necessary Role (필요역할) : AdminScreenRole.SERVICE_MANAGE (read)
   *
   * Necessary Role (필요역할) : AdminScreenRole.USER_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  findSalesRepresentatives: Array<SalesRepresentativeView>;
  /**
   * Find the login ID (로그인아이디를 찾는다).
   *
   * Return (반환) : List of masked login IDs (마스킹 된 로그인아이디 목록)
   *
   * Exception (예외) / 404 : If user information cannot be found (회원정보를 찾을 수 없을 경우)
   */
  findUsername: Array<Scalars['String']>;
  /**
   * Returns the user authentication list (회원인증 목록을 반환한다).
   *
   * Return (반환) : User authentication list (회원인증 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.USER_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  getAuthentications: AuthenticationPaginatedObject;
  /**
   * Return the bankbook (통장을 반환한다).
   *
   * Return (반환) : Bankbook (통장)
   *
   * Necessary Role (필요역할) : WorkScreenRole.ACCOUNTING_SETTINGS (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   *
   * Exception (예외) / 404 : If bankbook does not exist (통장이 존재하지 않을 경우)
   */
  getBankbook: Bankbook;
  /**
   * Return the last scraping status of the bankbook (통장의 최신 스크래핑 상태를 반환한다).
   *
   * Return (반환) : Last scraping status of bankbook (통장의 최신 스크래핑 상태)
   *
   * Necessary Role (필요역할) : WorkScreenRole.ACCOUNTING_SETTINGS (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   *
   * Exception (예외) / 404 : If bankbook does not exist (통장이 존재하지 않을 경우)
   *
   * Exception (예외) / 404 : If bankbook does not use a scraping function (통장이 스크래핑 기능을 사용하지 않을 경우)
   */
  getBankbookScrapInfo: LastScrapingStatus;
  /**
   * Return the list of bankbooks (통장목록을 반환한다).
   *
   * Return (반환) : List of bankbooks (통장목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.ACCOUNTING_SETTINGS (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   */
  getBankbooks: Array<Bankbook>;
  /**
   * Returns the change history of the bankbook (통장의 변경이력을 반환한다).
   *
   * Return (반환) : change history of the bankbook (통장의 변경이력)
   *
   * Necessary Role (필요역할) : WorkScreenRole.ACCOUNTING_SETTINGS (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   */
  getBankbooksLogs: Array<BankbookLog>;
  /**
   * Return the client (거래처를 반환한다).
   *
   * Return (반환) : Client (거래처)
   *
   * Necessary Role (필요역할) : WorkScreenRole.ACCOUNTING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   *
   * Exception (예외) / 404 : If client does not exist (거래처가 존재하지 않을 경우)
   */
  getClient: Client;
  /**
   * Returns the change history of the client (거래처의 변경이력을 반환한다).
   *
   * Return (반환) : change history of the client (거래처의 변경이력)
   *
   * Necessary Role (필요역할) : WorkScreenRole.ACCOUNTING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   */
  getClientLogs: Array<ClientLog>;
  /**
   * Returns the list of companies in the electronic filing file (전자신고파일의 사업자 목록을 반환한다).
   *
   * Return (반환) : List of companies (사업자 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If no electronic filing exists (전자신고가 존재하지 않을 경우)
   */
  getCompaniesInElectronicFilingFile: Array<Company>;
  /**
   * Return company information (사업자 정보를 반환한다).
   *
   * Return (반환) : Company information (사업자 정보)
   *
   * Necessary Role (필요역할) : AdminScreenRole.COMPANY_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If company information does not exist (사업자 정보가 존재하지 않는 경우)
   */
  getCompany: Company;
  /**
   * Returns the list of company change history (사업자 변경이력 목록을 반환한다).
   *
   * Return (반환) : List of company change history (사업자 변경이력 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.COMPANY_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  getCompanyLogs: Array<CompanyLog>;
  /**
   * Return company management memo list (사업자 관리메모 목록을 반환한다).
   *
   * Return (반환) : Company management memo list (사업자 관리메모 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.COMPANY_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  getCompanyManageMemos: Array<CompanyManageMemo>;
  /**
   * Return the list of department name view (부서명 뷰 목록을 반환한다).
   *
   * Return (반환) : List of department name view (부서명 뷰 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getDepartments: Array<EmployeeDepartmentView>;
  /**
   * Returns the electronic filing list for the applicable business income payment statement (해당하는 거주자사업소득지급명세서에 대한 전자신고 목록을 반환한다).
   *
   * Return (반환) : Electronic filing list (전자신고 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If there is no electronic filing details (전자신고 내역이 없을 경우)
   */
  getElectronicFilingsByIncomeBusinessPaymentStatement: Array<ElectronicFiling>;
  /**
   * Returns the electronic filing list for the applicable business income simplified payment statement (해당하는 거주자사업소득간이지급명세서에 대한 전자신고 목록을 반환한다).
   *
   * Return (반환) : Electronic filing list (전자신고 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If there is no electronic filing details (전자신고 내역이 없을 경우)
   */
  getElectronicFilingsByIncomeBusinessSimplifiedPaymentStatement: Array<ElectronicFiling>;
  /**
   * Returns the electronic filing list for the applicable extra income payment statement (해당하는 거주자기타소득지급명세서에 대한 전자신고 목록을 반환한다).
   *
   * Return (반환) : Electronic filing list (전자신고 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If there is no electronic filing details (전자신고 내역이 없을 경우)
   */
  getElectronicFilingsByIncomeExtraPaymentStatement: Array<ElectronicFiling>;
  /**
   * Returns the electronic filing list for the applicable retirement income payment statement (해당하는 퇴직소득지급명세서에 대한 전자신고 목록을 반환한다).
   *
   * Return (반환) : Electronic filing list (전자신고 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If there is no electronic filing details (전자신고 내역이 없을 경우)
   */
  getElectronicFilingsByIncomeRetirementPaymentStatement: Array<ElectronicFiling>;
  /**
   * Returns the electronic filing list for the applicable daily wage income payment statement (해당하는 일용근로소득지급명세서에 대한 전자신고 목록을 반환한다).
   *
   * Return (반환) : Electronic filing list (전자신고 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If there is no electronic filing details (전자신고 내역이 없을 경우)
   */
  getElectronicFilingsByIncomeWageDailyPaymentStatement: Array<ElectronicFiling>;
  /**
   * Returns the electronic filing list for the applicable wage income payment statement (해당하는 근로소득지급명세서에 대한 전자신고 목록을 반환한다).
   *
   * Return (반환) : Electronic filing list (전자신고 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If there is no electronic filing details (전자신고 내역이 없을 경우)
   */
  getElectronicFilingsByIncomeWagePaymentStatement: Array<ElectronicFiling>;
  /**
   * Returns the electronic filing list for the applicable wage income simplified payment statement (해당하는 근로소득간이지급명세서에 대한 전자신고 목록을 반환한다).
   *
   * Return (반환) : Electronic filing list (전자신고 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If there is no electronic filing details (전자신고 내역이 없을 경우)
   */
  getElectronicFilingsByIncomeWageSimplifiedPaymentStatement: Array<ElectronicFiling>;
  /**
   * Returns the electronic filing list for the applicable local income tax (해당하는 지방소득세에 대한 전자신고 목록을 반환한다).
   *
   * Return (반환) : Electronic filing list (전자신고 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If there is no electronic filing details (전자신고 내역이 없을 경우)
   */
  getElectronicFilingsByLocalIncomeTax: Array<ElectronicFiling>;
  /**
   * Returns the electronic filing list for the applicable withholding tax (해당하는 원천세에 대한 전자신고 목록을 반환한다).
   *
   * Return (반환) : Electronic filing list (전자신고 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If there is no electronic filing details (전자신고 내역이 없을 경우)
   */
  getElectronicFilingsByWithholdingTax: Array<ElectronicFiling>;
  /**
   * Return business income earner (사업소득자를 반환한다).
   *
   * Return (반환) : Business income earner (사업소득자)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : Where there is no business income earner (사업소득자가 존재하지 않을 경우)
   */
  getEmployeeBusiness: EmployeeBusiness;
  /**
   * Return the list of business income earners (사업소득자 목록을 반환한다).
   *
   * Return (반환) : List of business income earners (사업소득자 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getEmployeeBusinesses: Array<EmployeeBusiness>;
  /**
   * Return the list of business income earner change history (사업소득자 변경이력 목록을 반환한다).
   *
   * Return (반환) : List of business income earner change history (사업소득자 변경이력 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getEmployeeBusinessesLogs: Array<EmployeeBusinessLog>;
  /**
   * Return extra income earner (기타소득자를 반환한다).
   *
   * Return (반환) : Extra income earner (기타소득자)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : Where there is no extra income earner (기타소득자가 존재하지 않을 경우)
   */
  getEmployeeExtra: EmployeeExtra;
  /**
   * Return the list of extra income earners (기타소득자 목록을 반환한다).
   *
   * Return (반환) : List of extra income earners (기타소득자 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getEmployeeExtras: Array<EmployeeExtra>;
  /**
   * Return the list of extra income earner change history (기타소득자 변경이력 목록을 반환한다).
   *
   * Return (반환) : List of extra income earner change history (기타소득자 변경이력 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getEmployeeExtrasLogs: Array<EmployeeExtraLog>;
  /**
   * Return wage income earner (근로소득자를 반환한다).
   *
   * Return (반환) : Wage income earner (근로소득자)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : Where there is no wage income earner (근로소득자가 존재하지 않을 경우)
   */
  getEmployeeWage: EmployeeWage;
  /**
   * Return the list of daily wage income earners (일용직근로소득자 목록을 반환한다).
   *
   * Return (반환) : List of daily wage income earners (일용직근로소득자 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getEmployeeWageDailies: Array<EmployeeWageDaily>;
  /**
   * Return the list of daily wage income earner change history (일용직근로소득자 변경이력 목록을 반환한다).
   *
   * Return (반환) : List of daily wage income earner change history (일용직근로소득자 변경이력 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getEmployeeWageDailiesLogs: Array<EmployeeWageDailyLog>;
  /**
   * Return daily wage income earner (일용직근로소득자를 반환한다).
   *
   * Return (반환) : Daily wage income earner (일용직근로소득자)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : Where there is no daily wage income earner (일용직근로소득자가 존재하지 않을 경우)
   */
  getEmployeeWageDaily: EmployeeWageDaily;
  /**
   * Return the list of wage income earners (근로소득자 목록을 반환한다).
   *
   * Return (반환) : List of wage income earners (근로소득자 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getEmployeeWages: Array<EmployeeWage>;
  /**
   * Return the list of wage income earner change history (근로소득자 변경이력 목록을 반환한다).
   *
   * Return (반환) : List of wage income earner change history (근로소득자 변경이력 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getEmployeeWagesLogs: Array<EmployeeWageLog>;
  /**
   * The list of income status included in the withholding performance status report is returned (원천징수이행상황신고서에 포함된 소득업무 상태목록을 반환한다).
   *
   * Return (반환) : List of income status included in the withholding performance status report (원천징수이행상황신고서에 포함된 소득업무 상태목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If a withholding tax performance report does not exist (원천징수이행상황신고서가 존재하지 않을 경우)
   */
  getIncomProcessesInTaxWithholdingStatusReport: Array<IncomeProcess>;
  /**
   * Return business income (사업소득을 반환한다).
   *
   * Return (반환) : Business income (사업소득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If business income does not exist (사업소득이 존재하지 않을 경우)
   */
  getIncomeBusiness: IncomeBusiness;
  /**
   * Returns the URL of the report viewer of the withholding receipt of business income (사업소득 원천징수영수증 리포트뷰어 URL을 반환한다).
   *
   * Return (반환) : Report Viewer URL for withholding receipt of business income (사업소득 원천징수영수증 리포트뷰어 URL)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeBusinessWithholdingReceiptReportViewUrl: Scalars['String'];
  /**
   * Returns the list of business income (사업소득 목록을 빈환한다).
   *
   * Return (반환) : List of business income (사업소득 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeBusinesses: Array<IncomeBusiness>;
  /**
   * Return the list of business income change history (사업소득 변경이력 목록을 반환한다).
   *
   * Return (반환) : Business income change history list (사업소득 변경이력 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeBusinessesLogs: Array<IncomeBusinessLog>;
  /**
   * Return extra income (기타소득을 반환한다).
   *
   * Return (반환) : Extra income (기타소득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If extra income does not exist (기타소득이 존재하지 않을 경우)
   */
  getIncomeExtra: IncomeExtra;
  /**
   * Returns the URL of the report viewer of the withholding receipt of extra income (기타소득 원천징수영수증 리포트뷰어 URL을 반환한다).
   *
   * Return (반환) : Report Viewer URL for withholding receipt of extra income (기타소득 원천징수영수증 리포트뷰어 URL)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeExtraWithholdingReceiptReportViewUrl: Scalars['String'];
  /**
   * Returns the list of extra income (기타소득 목록을 빈환한다).
   *
   * Return (반환) : List of extra income (기타소득 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeExtras: Array<IncomeExtra>;
  /**
   * Return the list of extra income change history (기타소득 변경이력 목록을 반환한다).
   *
   * Return (반환) : Extra income change history list (기타소득 변경이력 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeExtrasLogs: Array<IncomeExtraLog>;
  /**
   * Return the list of work status change history of business income (사업소득 업무상태 변경이력 목록을 반환한다).
   *
   * Return (반환) : List of business status change history of business income (사업소득 업무상태 변경이력 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeProcessBusinessLogs: Array<IncomeProcessLog>;
  /**
   * Return the work status list of business income (사업소득 업무상태 목록을 반환한다).
   *
   * Return (반환) : Work status list of business income (사업소득 업무상태 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeProcessBusinesses: Array<IncomeProcessBusiness>;
  /**
   * Return the list of work status change history of extra income (기타소득 업무상태 변경이력 목록을 반환한다).
   *
   * Return (반환) : List of business status change history of extra income (기타소득 업무상태 변경이력 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeProcessExtraLogs: Array<IncomeProcessLog>;
  /**
   * Return the work status list of extra income (기타소득 업무상태 목록을 반환한다).
   *
   * Return (반환) : Work status list of extra income (기타소득 업무상태 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeProcessExtras: Array<IncomeProcessExtra>;
  /**
   * Return the list of work status change history of retirement income (퇴직소득 업무상태 변경이력 목록을 반환한다).
   *
   * Return (반환) : List of business status change history of retirement income (퇴직소득 업무상태 변경이력 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeProcessRetirementLogs: Array<IncomeProcessLog>;
  /**
   * Return retirement income business status list (퇴직소득 업무상태 목록을 반환한다).
   *
   * Return (반환) : Retirement income business status list (퇴직소득 업무상태 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeProcessRetirements: Array<IncomeProcessRetirement>;
  /**
   * Return the work status list of daily wage income (일용직근로소득 업무상태 목록을 반환한다).
   *
   * Return (반환) : Work status list of daily wage income (일용직근로소득 업무상태 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeProcessWageDailies: Array<IncomeProcessWageDaily>;
  /**
   * Return the list of work status change history of daily wage income (일용직근로소득 업무상태 변경이력 목록을 반환한다).
   *
   * Return (반환) : List of business status change history of daily wage income (일용직근로소득 업무상태 변경이력 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeProcessWageDailyLogs: Array<IncomeProcessLog>;
  /**
   * Return the list of work status change history of wage income (근로소득 업무상태 변경이력 목록을 반환한다).
   *
   * Return (반환) : List of business status change history of wage income (근로소득 업무상태 변경이력 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeProcessWageLogs: Array<IncomeProcessLog>;
  /**
   * Return wage income business status list (근로소득 업무상태 목록을 반환한다).
   *
   * Return (반환) : Wage income business status list (근로소득 업무상태 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeProcessWages: Array<IncomeProcessWage>;
  /**
   * Return retirement income (퇴직소득을 반환한다).
   *
   * Return (반환) : Retirement income (퇴직소득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If retirement income does not exist (퇴직소득이 존재하지 않을 경우)
   */
  getIncomeRetirement: IncomeRetirement;
  /**
   * Return retirement income specification (퇴직소득명세를 반환한다).
   *
   * Return (반환) : Retirement income specification (퇴직소득명세)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If retirement income specification does not exist (퇴직소득명세가 존재하지 않을 경우)
   */
  getIncomeRetirementSpecification: IncomeRetirementSpecification;
  /**
   * Returns the URL of the report viewer of the withholding receipt of retirement income (퇴직소득 원천징수영수증 리포트뷰어 URL을 반환한다).
   *
   * Return (반환) : Report Viewer URL for withholding receipt of retirement income (퇴직소득 원천징수영수증 리포트뷰어 URL)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 406 : If any of the selected retirement income does not exist (선택한 퇴직소득 중 존재하지 않는 정보가 있을 경우)
   */
  getIncomeRetirementWithholdingReceiptReportViewUrl: Scalars['String'];
  /**
   * Returns the list of retirement income (퇴직소득 목록을 빈환한다).
   *
   * Return (반환) : List of retirement income (퇴직소득 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeRetirements: Array<IncomeRetirement>;
  /**
   * Return the list of retirement income change history (퇴직소득 변경이력 목록을 반환한다).
   *
   * Return (반환) : Retirement income change history list (퇴직소득 변경이력 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeRetirementsLogs: Array<IncomeRetirementLog>;
  /**
   * Return wage income (근로소득을 반환한다).
   *
   * Return (반환) : Wage income (근로소득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If wage income does not exist (근로소득이 존재하지 않을 경우)
   */
  getIncomeWage: IncomeWage;
  /**
   * Returns the list of daily wage income (일용직근로소득 목록을 빈환한다).
   *
   * Return (반환) : List of daily wage income (일용직근로소득 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeWageDailies: Array<IncomeWageDaily>;
  /**
   * Return the list of daily wage income change history (일용직근로소득 변경이력 목록을 반환한다).
   *
   * Return (반환) : Daily wage income change history list (일용직근로소득 변경이력 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeWageDailiesLogs: Array<IncomeWageDailyLog>;
  /**
   * Return daily wage income (일용직근로소득을 반환한다).
   *
   * Return (반환) : Daily wage income (일용직근로소득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If daily wage income does not exist (일용직근로소득이 존재하지 않을 경우)
   */
  getIncomeWageDaily: IncomeWageDaily;
  /**
   * Returns the URL of the report viewer of the daily wage income payroll register (일용직근로소득 급여대장 리포트뷰어 URL을 반환한다).
   *
   * Return (반환) : Report Viewer URL for daily wage income payroll register (일용직근로소득 급여대장 리포트뷰어 URL)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 406 : If daily wage income does not exist (일용직근로소득이 존재하지 않을 경우)
   */
  getIncomeWageDailyPayrollRegisterViewUrl: Scalars['String'];
  /**
   * Returns the URL of the report viewer of the daily wage income salary statement (일용직근로소득 급여명세서 리포트뷰어 URL을 반환한다).
   *
   * Return (반환) : Report Viewer URL for daily wage income salary statement (일용직근로소득 급여명세서 리포트뷰어 URL)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 406 : If any of the selected daily wage income does not exist (선택한 일용직근로소득 중 존재하지 않는 정보가 있을 경우)
   */
  getIncomeWageDailySalaryStatementViewUrl: Scalars['String'];
  /**
   * Returns the URL of the report viewer of the withholding receipt of daily wage income (일용직근로소득 원천징수영수증 리포트뷰어 URL을 반환한다).
   *
   * Return (반환) : Report Viewer URL for withholding receipt of daily wage income (일용직근로소득 원천징수영수증 리포트뷰어 URL)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeWageDailyWithholdingReceiptReportViewUrl: Scalars['String'];
  /**
   * Returns the URL of the report viewer of the wage income payroll register (근로소득 급여대장 리포트뷰어 URL을 반환한다).
   *
   * Return (반환) : Report Viewer URL for wage income payroll register (근로소득 급여대장 리포트뷰어 URL)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 406 : If wage income does not exist (근로소득이 존재하지 않을 경우)
   */
  getIncomeWagePayrollRegisterViewUrl: Scalars['String'];
  /**
   * Returns the URL of the report viewer of the wage income salary statement (근로소득 급여명세서 리포트뷰어 URL을 반환한다).
   *
   * Return (반환) : Report Viewer URL for wage income salary statement (근로소득 급여명세서 리포트뷰어 URL)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 406 : Report format does not exist (리포트 서식이 존재하지 않을 경우)
   *
   * Exception (예외) / 406 : If any of the selected wage income does not exist (선택한 근로소득 중 존재하지 않는 정보가 있을 경우)
   */
  getIncomeWageSalaryStatementViewUrl: Scalars['String'];
  /**
   * Returns the URL of the report viewer of the withholding receipt of wage income (근로소득 원천징수영수증 리포트뷰어 URL을 반환한다).
   *
   * Return (반환) : Report Viewer URL for withholding receipt of wage income (근로소득 원천징수영수증 리포트뷰어 URL)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 406 : If any of the selected wage income receipt does not exist (선택한 근로소득원천징수영수증 중 존재하지 않는 정보가 있을 경우)
   */
  getIncomeWageWithholdingReceiptReportViewUrl: Scalars['String'];
  /**
   * Returns the URL of the report viewer of the wage income withholding tax by employee (소득자별 근로소득 원천징수영수부 리포트뷰어 URL을 반환한다).
   *
   * Return (반환) : Report Viewer URL for wage income withholding tax by employee (소득자별 근로소득 원천징수영수부 리포트뷰어 URL)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 406 : If any of the selected wage income withholding tax by employee does not exist (선택한 소득자별 근로소득 원천징수영수부 중 존재하지 않는 정보가 있을 경우)
   */
  getIncomeWageWithholdingTaxByEmployeeReportViewUrl: Scalars['String'];
  /**
   * Returns the list of wage income (근로소득 목록을 반환한다).
   *
   * Return (반환) : List of wage income (근로소득 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeWages: Array<IncomeWage>;
  /**
   * Return the list of wage income change history (근로소득 변경이력 목록을 반환한다).
   *
   * Return (반환) : Wage income change history list (근로소득 변경이력 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomeWagesLogs: Array<IncomeWageLog>;
  /**
   * Return income information for withholding tax performance report (원천징수이행상황신고서를 위한 소득정보를 반환한다).
   *
   * Return (반환) : Income information for withholding tax performance report (원천징수이행상황신고서를 위한 소득정보)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getIncomesForTaxWithholdingStatusReport: Array<IncomeForTaxWithholdingStatusReport>;
  /**
   * Return the acquisition of the major insurance employees (4대보험직원취득을 반환한다).
   *
   * Return (반환) : Major insurance company employee acquisition (4대보험직원취득)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 404 : If the acquisition of the major insurance employees does not exist (4대보험직원취득이 존재하지 않을 경우)
   */
  getMajorInsuranceCompanyEmployeeAcquisition: MajorInsuranceCompanyEmployeeAcquisition;
  /**
   * Return the URL of the report viewer for faxing the acquisition of major insurance employees (4대보험직원취득 팩스신고용 리포트 뷰어 URL을 반환한다).
   *
   * Return (반환) : URL of the report viewer for faxing the acquisition of major insurance employees (4대보험직원취득 팩스신고용 리포트 뷰어 URL)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If the acquisition of the major insurance employees does not exist (4대보험직원취득이 존재하지 않을 경우)
   */
  getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl: Scalars['String'];
  /**
   * Return the acquisition of the major insurance employees change history (4대보험직원취득 변경이력을 반환한다).
   *
   * Return (반환) : Major insurance company employee acquisition change history (4대보험직원취득 변경이력)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 404 : If the acquisition of the major insurance employees does not exist (4대보험직원취득이 존재하지 않을 경우)
   */
  getMajorInsuranceCompanyEmployeeAcquisitionLogs: Array<MajorInsuranceCompanyEmployeeAcquisitionLog>;
  /**
   * Returns the list of acquisition of major insurance employees (4대보험직원취득 목록을 반환한다).
   *
   * Return (반환) : Major insurance company employee acquisition list (4대보험직원취득 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   */
  getMajorInsuranceCompanyEmployeeAcquisitions: Array<MajorInsuranceCompanyEmployeeAcquisition>;
  /**
   * Return the the major insurance employees leave of absence (4대보험직원휴직을 반환한다).
   *
   * Return (반환) : Major insurance company employee leave of absence (4대보험직원휴직)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 404 : If the major insurance employees leave of absence does not exist (4대보험직원휴직이 존재하지 않을 경우)
   */
  getMajorInsuranceCompanyEmployeeLeaveOfAbsence: MajorInsuranceCompanyEmployeeLeaveOfAbsence;
  /**
   * Return the URL of the report viewer for faxing the major insurance employees leave of absence (4대보험직원휴직 팩스신고용 리포트 뷰어 URL을 반환한다).
   *
   * Return (반환) : URL of the report viewer for faxing the major insurance employees leave of absence (4대보험직원휴직 팩스신고용 리포트 뷰어 URL)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If the major insurance employees leave of absence does not exist (4대보험직원휴직이 존재하지 않을 경우)
   */
  getMajorInsuranceCompanyEmployeeLeaveOfAbsenceFaxFilingReportViewUrl: Scalars['String'];
  /**
   * Return the major insurance employees leave of absence change history (4대보험직원휴직 변경이력을 반환한다).
   *
   * Return (반환) : Major insurance company employee leave of absence change history (4대보험직원휴직 변경이력)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 404 : If the major insurance employees leave of absence does not exist (4대보험직원휴직이 존재하지 않을 경우)
   */
  getMajorInsuranceCompanyEmployeeLeaveOfAbsenceLogs: Array<MajorInsuranceCompanyEmployeeLeaveOfAbsenceLog>;
  /**
   * Returns the list of major insurance employees leave of absence (4대보험직원휴직 목록을 반환한다).
   *
   * Return (반환) : Major insurance company employee leave of absence list (4대보험직원휴직 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   */
  getMajorInsuranceCompanyEmployeeLeaveOfAbsences: Array<MajorInsuranceCompanyEmployeeLeaveOfAbsence>;
  /**
   * Return the loss of the major insurance employees (4대보험직원상실을 반환한다).
   *
   * Return (반환) : Major insurance company employee loss (4대보험직원상실)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 404 : If the loss of the major insurance employees does not exist (4대보험직원상실이 존재하지 않을 경우)
   */
  getMajorInsuranceCompanyEmployeeLoss: MajorInsuranceCompanyEmployeeLoss;
  /**
   * Return the URL of the report viewer for faxing the loss of major insurance employees (4대보험직원상실 팩스신고용 리포트 뷰어 URL을 반환한다).
   *
   * Return (반환) : URL of the report viewer for faxing the loss of major insurance employees (4대보험직원상실 팩스신고용 리포트 뷰어 URL)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If the loss of the major insurance employees does not exist (4대보험직원상실이 존재하지 않을 경우)
   */
  getMajorInsuranceCompanyEmployeeLossFaxFilingReportViewUrl: Scalars['String'];
  /**
   * Return the loss of the major insurance employees change history (4대보험직원상실 변경이력을 반환한다).
   *
   * Return (반환) : Major insurance company employee loss change history (4대보험직원상실 변경이력)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 404 : If the loss of the major insurance employees does not exist (4대보험직원상실이 존재하지 않을 경우)
   */
  getMajorInsuranceCompanyEmployeeLossLogs: Array<MajorInsuranceCompanyEmployeeLossLog>;
  /**
   * Returns the list of loss of major insurance employees (4대보험직원상실 목록을 반환한다).
   *
   * Return (반환) : Major insurance company employee loss list (4대보험직원상실 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   */
  getMajorInsuranceCompanyEmployeeLosses: Array<MajorInsuranceCompanyEmployeeLoss>;
  /**
   * Return the salary change of the major insurance employees (4대보험직원상실을 반환한다).
   *
   * Return (반환) : Major insurance company employee salary change (4대보험직원보수변경)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 404 : If the salary change of the major insurance employees does not exist (4대보험직원상실이 존재하지 않을 경우)
   */
  getMajorInsuranceCompanyEmployeeSalaryChange: MajorInsuranceCompanyEmployeeSalaryChange;
  /**
   * Return the URL of the report viewer for faxing the salary change of major insurance employees (4대보험직원보수변경 팩스신고용 리포트 뷰어 URL을 반환한다).
   *
   * Return (반환) : URL of the report viewer for faxing the salary change of major insurance employees (4대보험직원보수변경 팩스신고용 리포트 뷰어 URL)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If the salary change of the major insurance employees does not exist (4대보험직원상실이 존재하지 않을 경우)
   */
  getMajorInsuranceCompanyEmployeeSalaryChangeFaxFilingReportViewUrl: Scalars['String'];
  /**
   * Return the salary change of the major insurance employees change history (4대보험직원보수변경 변경이력을 반환한다).
   *
   * Return (반환) : Major insurance company employee salary change change history (4대보험직원보수변경 변경이력)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 404 : If the salary change of the major insurance employees does not exist (4대보험직원상실이 존재하지 않을 경우)
   */
  getMajorInsuranceCompanyEmployeeSalaryChangeLogs: Array<MajorInsuranceCompanyEmployeeSalaryChangeLog>;
  /**
   * Returns the list of salary change of major insurance employees (4대보험직원보수변경 목록을 반환한다).
   *
   * Return (반환) : Major insurance company employee salary change list (4대보험직원보수변경 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   */
  getMajorInsuranceCompanyEmployeeSalaryChanges: Array<MajorInsuranceCompanyEmployeeSalaryChange>;
  /**
   * Return the the major insurance company join (4대보험 사업장가입을 반환한다).
   *
   * Return (반환) : Major insurance company company join (4대보험 사업장가입)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 404 : If the the major insurance company join does not exist (4대보험 사업장가입이 존재하지 않을 경우)
   */
  getMajorInsuranceCompanyJoin: MajorInsuranceCompanyJoin;
  /**
   * Return the URL of the report viewer for faxing the major insurance  company join (4대보험 사업장가입 팩스신고용 리포트 뷰어 URL을 반환한다).
   *
   * Return (반환) : URL of the report viewer for faxing the major insurance  company join (4대보험 사업장가입 팩스신고용 리포트 뷰어 URL)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If the the major insurance  company join does not exist (4대보험 사업장가입이 존재하지 않을 경우)
   */
  getMajorInsuranceCompanyJoinFaxFilingReportViewUrl: Scalars['String'];
  /**
   * Return the the major insurance  company join change history (4대보험 사업장가입 변경이력을 반환한다).
   *
   * Return (반환) : Major insurance company company join change history (4대보험 사업장가입 변경이력)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 404 : If the the major insurance  company join does not exist (4대보험 사업장가입이 존재하지 않을 경우)
   */
  getMajorInsuranceCompanyJoinLogs: Array<MajorInsuranceCompanyJoinLog>;
  /**
   * Returns the list of major insurance company join (4대보험 사업장가입 목록을 반환한다).
   *
   * Return (반환) : Major insurance company company join list (4대보험 사업장가입 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   */
  getMajorInsuranceCompanyJoins: Array<MajorInsuranceCompanyJoin>;
  /**
   * Return the the major insurance company out (4대보험 사업장탈퇴을 반환한다).
   *
   * Return (반환) : Major insurance company company out (4대보험 사업장탈퇴)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 404 : If the the major insurance company out does not exist (4대보험 사업장탈퇴이 존재하지 않을 경우)
   */
  getMajorInsuranceCompanyOut: MajorInsuranceCompanyOut;
  /**
   * Return the URL of the report viewer for faxing the major insurance  company out (4대보험 사업장탈퇴 팩스신고용 리포트 뷰어 URL을 반환한다).
   *
   * Return (반환) : URL of the report viewer for faxing the major insurance  company out (4대보험 사업장탈퇴 팩스신고용 리포트 뷰어 URL)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If the the major insurance  company out does not exist (4대보험 사업장탈퇴이 존재하지 않을 경우)
   */
  getMajorInsuranceCompanyOutFaxFilingReportViewUrl: Scalars['String'];
  /**
   * Return the the major insurance  company out change history (4대보험 사업장탈퇴 변경이력을 반환한다).
   *
   * Return (반환) : Major insurance company company out change history (4대보험 사업장탈퇴 변경이력)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 404 : If the the major insurance  company out does not exist (4대보험 사업장탈퇴이 존재하지 않을 경우)
   */
  getMajorInsuranceCompanyOutLogs: Array<MajorInsuranceCompanyOutLog>;
  /**
   * Returns the list of major insurance company out (4대보험 사업장탈퇴 목록을 반환한다).
   *
   * Return (반환) : Major insurance company company out list (4대보험 사업장탈퇴 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   */
  getMajorInsuranceCompanyOuts: Array<MajorInsuranceCompanyOut>;
  /**
   * Returns the list of major insurance consign status (4대보험 업무대행상태정보를 반환한다).
   *
   * Return (반환) : Major insurance status list (4대보험업무대행 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 404 : If the major insurance consign status  does not exist (4대보험 업무대행이 존재하지 않을 경우)
   */
  getMajorInsuranceConsignStatus: MajorInsuranceConsignStatus;
  /**
   * Return the URL of the report viewer for faxing the major insurance insurance consign  (4대보험업무대행 팩스신고용 리포트 뷰어 URL을 반환한다).
   *
   * Return (반환) : URL of the report viewer for faxing the major insurance insurance consign  (4대보험업무대행 팩스신고용 리포트 뷰어 URL)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If the the major insurance insurance consign  does not exist (4대보험업무대행이 존재하지 않을 경우)
   */
  getMajorInsuranceConsignStatusFaxFilingReportViewUrl: Scalars['String'];
  /**
   * Return the major insurance consign status change history (4대보험업무대행 변경이력을 반환한다).
   *
   * Return (반환) : Major insurance company consign status  change history (4대보험업무대행 변경이력)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Necessary Role (필요역할) : AdminScreenRole.MAJOR_INSURANCE_WORK_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 403 : Major insurance role exception (4대보험역할예외)
   *
   * Exception (예외) / 404 : If the the major insurance consign status  does not exist (4대보험업무대행이 존재하지 않을 경우)
   */
  getMajorInsuranceConsignStatusLogs: Array<MajorInsuranceConsignStatusLog>;
  /**
   * Return my company information (내 사업자정보를 반환한다).
   *
   * Return (반환) : Company information (사업자정보)
   *
   * Necessary Role (필요역할) : WorkScreenRole.BASIC_SETTINGS (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   */
  getMyCompany: Company;
  /**
   * Return my company user login history (내 사업자 이용자 로그인이력을 반환한다).
   *
   * Return (반환) : Authentication paginated object (인증 페이징)
   *
   * Necessary Role (필요역할) : WorkScreenRole.BASIC_SETTINGS (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   *
   * Exception (예외) / 404 : If user information does not exist (이용자 정보가 존재하지 않을 경우)
   */
  getMyCompanyAuthentications: AuthenticationPaginatedObject;
  /**
   * Return my company autogenerated seal information (내 사업자 자동생성 직인정보를 반환한다).
   *
   * Return (반환) : Automatically create company seal preview (사업자 자동생성 직인 미리보기)
   *
   * Necessary Role (필요역할) : WorkScreenRole.BASIC_SETTINGS (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  getMyCompanyAutoGeneratedSeal: CompanyAutoGeneratedSealPreview;
  /**
   * Return my company accounting facility business list (내 사업자 회계시설사업목록을 반환한다).
   *
   * Return (반환) : Company / Accounting / Facility business list (사업자/회계/시설사업 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.BASIC_SETTINGS (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   */
  getMyCompanyFacilityBusinesses: Array<FacilityBusiness>;
  /**
   * Return my company user information (내 사업자 이용자정보를 반환한다).
   *
   * Return (반환) : My company user information (내 사업자 이용자정보)
   *
   * Necessary Role (필요역할) : WorkScreenRole.BASIC_SETTINGS (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   *
   * Exception (예외) / 404 : If user information does not exist (이용자 정보가 존재하지 않을 경우)
   */
  getMyCompanyUser: User;
  /**
   * Return my company user change history (내 사업자 이용자 변경이력을 반환한다).
   *
   * Return (반환) : List of my company user change history (내 사업자 이용자 변경이력)
   *
   * Necessary Role (필요역할) : WorkScreenRole.BASIC_SETTINGS (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   *
   * Exception (예외) / 404 : If user information does not exist (이용자 정보가 존재하지 않을 경우)
   */
  getMyCompanyUserLogs: Array<UserLog>;
  /**
   * Return my list of company users (내 사업자 이용자목록을 반환한다).
   *
   * Return (반환) : Company user view paginated object (사업자회원뷰 페이징)
   *
   * Necessary Role (필요역할) : WorkScreenRole.BASIC_SETTINGS (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   */
  getMyCompanyUsers: CompanyUserViewPaginatedObject;
  /**
   * Return public institution information (공공기관정보를 반환한다).
   *
   * Return (반환) : Statutory dong code - Tax office information (법정동코드-세무서정보)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_SETTINGS (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : Where information on public institutions does not exist (공공기관 정보가 존재하지 않을 경우)
   */
  getPublicInstitution: CompetentTaxOfficeLegalDong;
  /**
   * Return the list of position name view (직책명 뷰 목록을 반환한다).
   *
   * Return (반환) : List of position name view (직책명 뷰 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getResponsibilities: Array<EmployeeResponsibilityView>;
  /**
   * Return sales representative information (영업자 정보를 반환한다).
   *
   * Return (반환) : Sales representative information (영업자 정보)
   *
   * Necessary Role (필요역할) : AdminScreenRole.SALES_REPRESENTATIVE_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If sales representative information does not exist (영업자 정보가 존재하지 않는 경우)
   */
  getSalesRepresentative: SalesRepresentative;
  /**
   * Returns the list of sales representative change history (영업자 변경이력 목록을 반환한다).
   *
   * Return (반환) : List of sales representative change history (영업자 변경이력 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.SALES_REPRESENTATIVE_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  getSalesRepresentativeLogs: Array<SalesRepresentativeLog>;
  /** Returns the list of sales representative for the Public Screen. (Public Screen 용 영업자 목록을 반환한다). */
  getSalesRepresentativesForPublicScreen: Array<PublicSalesRepresentative>;
  /**
   * Return the screen role group (화면역할그룹을 반환한다).
   *
   * Return (반환) : Screen role group (화면역할그룹)
   *
   * Necessary Role (필요역할) : AdminScreenRole.ROLE_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If screen role group does not exist (화면역할그룹이 존재하지 않을 경우)
   */
  getScreenRoleGroup: ScreenRoleGroup;
  /**
   * Returns a list of screen role group change history (화면역할그룹 변경이력 목록을 반환한다).
   *
   * Return (반환) : List of screen role group change history (화면역할그룹 변경이력 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.ROLE_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  getScreenRoleGroupLogs: Array<ScreenRoleGroupLog>;
  /**
   * Return company service contract information (사업자서비스계약 정보를 반환한다).
   *
   * Return (반환) : Company service contract (사업자서비스계약)
   *
   * Necessary Role (필요역할) : AdminScreenRole.COMPANY_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If company information does not exist (사업자 정보가 존재하지 않는 경우)
   */
  getServiceContract: CompanyServiceContract;
  /**
   * Returns the list of company service contract change history (사업자서비스계약 변경이력 목록을 반환한다).
   *
   * Return (반환) : List of company service contract change history (사업자서비스계약 변경이력 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.SERVICE_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  getServiceContractLogs: Array<CompanyServiceContractLog>;
  /**
   * Return company service contract management memo list (사업자서비스계약 관리메모 목록을 반환한다).
   *
   * Return (반환) : Company service contract management memo list (사업자서비스계약 관리메모 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.SERVICE_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  getServiceContractManageMemos: Array<CompanyServiceContractManageMemo>;
  /**
   * Returns service subscription application information (서비스가입신청 정보를 반환한다).
   *
   * Return (반환) : Service subscription application (서비스가입신청)
   *
   * Necessary Role (필요역할) : AdminScreenRole.CONTRACT_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : Service subscription application information does not exist (서비스가입신청 정보가 존재하지 않을 경우)
   */
  getSubscriptionRequest: SubscriptionRequest;
  /**
   * Returns the list of service subscription change history (서비스가입신청 변경이력 목록을 반환한다).
   *
   * Return (반환) : List of service subscription change history (서비스가입신청 변경이력 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.CONTRACT_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  getSubscriptionRequestLogs: Array<SubscriptionRequestLog>;
  /**
   * Returns withholding tax performance report (원천징수이행상황신고서를 반환한다).
   *
   * Return (반환) : Withholding tax performance report (원천징수이행상황신고서)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If a withholding tax performance report does not exist (원천징수이행상황신고서가 존재하지 않을 경우)
   */
  getTaxWithholdingStatusReport: TaxWithholdingStatusReport;
  /**
   * Returns withholding tax performance report detail (원천징수이행상황신고서 상세를 반환한다).
   *
   * Return (반환) : Withholding tax performance report detail (원천징수이행상황신고서 상세)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If a withholding tax performance report detail does not exist (원천징수이행상황신고서 상세가 존재하지 않을 경우)
   */
  getTaxWithholdingStatusReportDetail: TaxWithholdingStatusReportDetail;
  /**
   * Return the URL of the withholding performance report form viewer (원천징수이행상황신고서 서식뷰어 URL을 반환한다).
   *
   * Return (반환) : URL of the withholding performance report form viewer (원천징수이행상황신고서 서식뷰어 URL)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If a withholding tax performance report does not exist (원천징수이행상황신고서가 존재하지 않을 경우)
   */
  getTaxWithholdingStatusReportViewUrl: Scalars['String'];
  /**
   * Returns the list of withholding tax performance reports (원천징수이행상황신고서 목록을 반환한다).
   *
   * Return (반환) : List of withholding tax performance reports (원천징수이행상황신고서 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getTaxWithholdingStatusReports: Array<TaxWithholdingStatusReport>;
  /**
   * Return the withholding tax performance report change history (원천징수이행상황신고서 변경이력을 반환한다).
   *
   * Return (반환) : Withholding tax performance report change history (원천징수이행상황신고서 변경이력)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getTaxWithholdingStatusReportsLogs: Array<TaxWithholdingStatusReportLog>;
  /**
   * Return User information (회원 정보를 반환한다).
   *
   * Return (반환) : User information (회원 정보)
   *
   * Necessary Role (필요역할) : AdminScreenRole.USER_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If user information does not exist (회원 정보가 존재하지 않는 경우)
   */
  getUser: User;
  /**
   * Returns the list of user change history (회원 변경이력 목록을 반환한다).
   *
   * Return (반환) : List of user change history (회원 변경이력 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.USER_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  getUserLogs: Array<UserLog>;
  /**
   * Returns the withholding config (원천설정을 반환한다).
   *
   * Return (반환) : Withholding config (원천설정)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_SETTINGS (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If the setting does not exist (설정이 존재하지 않을 경우)
   */
  getWithholdingConfig: WithholdingConfig;
  /**
   * Return withholding config deduction item (원천설정 공제항목을 반환한다).
   *
   * Return (반환) : Withholding config deduction item (원천설정 공제항목)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_SETTINGS (read)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If no deduction item exists (공제항목이 존재하지 않을 경우)
   */
  getWithholdingConfigDeductionItem: WithholdingConfigDeductionItem;
  /**
   * Return withholding config deduction item list (원천설정 공제항목 목록을 반환한다).
   *
   * Return (반환) : Withholding config deduction item list (원천설정 공제항목 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_SETTINGS (read)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getWithholdingConfigDeductionItems: Array<WithholdingConfigDeductionItem>;
  /**
   * Return withholding config deduction item change history list (원천설정 공제항목 변경이력 목록을 반환한다).
   *
   * Return (반환) : Withholding config deduction item change history list (원천설정 공제항목 변경이력 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_SETTINGS (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getWithholdingConfigDeductionItemsLogs: Array<WithholdingConfigDeductionItemLog>;
  /**
   * Returns the withholding config change histiry list (원천설정 변경이력 목록을 반환한다).
   *
   * Return (반환) : Withholding config change history list (원천설정 변경이력 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_SETTINGS (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getWithholdingConfigLogs: Array<WithholdingConfigLog>;
  /**
   * Return withholding config pay item (원천설정 소득항목을 반환한다).
   *
   * Return (반환) : Withholding config pay item (원천설정 소득항목)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_SETTINGS (read)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   *
   * Exception (예외) / 404 : If no pay item exists (소득항목이 존재하지 않을 경우)
   */
  getWithholdingConfigPayItem: WithholdingConfigPayItem;
  /**
   * Return withholding config pay item list (원천설정 소득항목 목록을 반환한다).
   *
   * Return (반환) : Withholding config pay item list (원천설정 소득항목 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_SETTINGS (read)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getWithholdingConfigPayItems: Array<WithholdingConfigPayItem>;
  /**
   * Return withholding config pay item change history list (원천설정 소득항목 변경이력 목록을 반환한다).
   *
   * Return (반환) : Withholding config pay item change history list (원천설정 소득항목 변경이력 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_SETTINGS (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  getWithholdingConfigPayItemsLogs: Array<WithholdingConfigPayItemLog>;
  /**
   * Check whether the sales representative name is correctable (수정가능한 영업자명인지 검사한다).
   *
   * Return (반환) : true / false
   *
   * Necessary Role (필요역할) : AdminScreenRole.SALES_REPRESENTATIVE_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 404 : If sales representative information does not exist (영업자 정보가 존재하지 않는 경우)
   */
  isSalesRepresentativeChangableName: Scalars['Boolean'];
  /**
   * Check whether the sales representative name is registrable (등록가능한 영업자명인지 검사한다).
   *
   * Return (반환) : true / false
   *
   * Necessary Role (필요역할) : AdminScreenRole.SALES_REPRESENTATIVE_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  isSalesRepresentativeRegistableName: Scalars['Boolean'];
  /**
   * Returns whether the screen role group code is registrable (화면역할그룹코드가 등록가능한지 여부를 반환한다).
   *
   * Return (반환) : true / false
   *
   * Necessary Role (필요역할) : AdminScreenRole.ROLE_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  isScreenRoleGroupRegistableId: Scalars['Boolean'];
  /**
   * Returns whether the screen role group name is registrable (화면역할그룹명이 등록가능한지 여부를 반환한다).
   *
   * Return (반환) : true / false
   *
   * Necessary Role (필요역할) : AdminScreenRole.ROLE_MANAGE (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  isScreenRoleGroupRegistableName: Scalars['Boolean'];
  /**
   * Returns whether the business registration number registered in the service subscription application can be changed (서비스가입신청에 등록된 사업자등록번호의 변경 가능 여부를 반환한다).
   *
   * Return (반환) : true / false
   *
   * Necessary Role (필요역할) : AdminScreenRole.CONTRACT_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  isSubscriptionRequestChangeableBizNumber: Scalars['Boolean'];
  /**
   * Return the possibility of registering the business registration number in the service subscription application (서비스가입신청에서 사업자등록번호 등록 가능 여부를 반환한다).
   *
   * Return (반환) : true / false
   */
  isSubscriptionRequestRegistableBizNumber: Scalars['Boolean'];
  /**
   * Returns whether the login ID is registrable. (로그인아이디가 등록가능한지 여부를 반환한다).
   *
   * Return (반환) : true / false
   *
   * Necessary Role (필요역할) : AdminScreenRole.USER_MANAGE (write)
   *
   * Necessary Role (필요역할) : WorkScreenRole.BASIC_SETTINGS (write)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  isUserRegistableUsername: Scalars['Boolean'];
  /**
   * Return my user information (내회원정보를 반환한다).
   *
   * Return (반환) : My user information (내회원정보)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  me: MyUserInfo;
  /**
   * Return the list of clients (거래처목록을 반환한다).
   *
   * Return (반환) : Client paginated object (거래처 페이징)
   *
   * Necessary Role (필요역할) : WorkScreenRole.ACCOUNTING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Work role exception (업무역할예외)
   */
  searchClients: ClientPaginatedObject;
  /**
   * Search the list of company views (사업자뷰 목록을 검색한다).
   *
   * Return (반환) : Company view paginated object (사업자뷰 페이징)
   *
   * Necessary Role (필요역할) : AdminScreenRole.COMPANY_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  searchCompanies: CompanyViewPaginatedObject;
  /**
   * Search for electronic filing file production details (전자신고 파일제작 내역을 검색한다).
   *
   * Return (반환) : Electronic Filing list (전자신고 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  searchElectronicFilingFileProductions: Array<ElectronicFiling>;
  /**
   * Search for business income payment statement for electronic filing (전자신고를 위한 거주자사업소득지급명세서를 검색한다).
   *
   * Return (반환) : Business income payment statement filing list(거주자사업소득지급명세서 전자신고 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  searchIncomeBusinessPaymentStatementElectronicFilings: Array<IncomeBusinessPaymentStatementElectronicFiling>;
  /**
   * Search for business income simplified payment statement for electronic filing (전자신고를 위한 거주자사업소득간이지급명세서를 검색한다).
   *
   * Return (반환) : Business income simplified payment statement electronic filing list(거주자사업소득간이지급명세서 전자신고 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  searchIncomeBusinessSimplifiedPaymentStatementElectronicFilings: Array<IncomeBusinessSimplifiedPaymentStatementElectronicFiling>;
  /**
   * Returns a summary list of business income withholding receipts report by employee (사업소득 원천징수영수증 리포트 직원 별 요약 목록을 반환한다).
   *
   * Return (반환) : Summary list of business income withholding receipts report by employee (사업소득 원천징수영수증 리포트 직원 별 요약 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  searchIncomeBusinessWithholdingReceipts: Array<IncomeBusinessWithholdingReceiptReportSummariesByEmployee>;
  /**
   * Search for extra income payment statement for electronic filing (전자신고를 위한 거주자기타소득지급명세서를 검색한다).
   *
   * Return (반환) : Extra income payment statement filing list(거주자기타소득지급명세서 전자신고 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  searchIncomeExtraPaymentStatementElectronicFilings: Array<IncomeExtraPaymentStatementElectronicFiling>;
  /**
   * Returns a summary list of extra income withholding receipts report by employee (기타소득 원천징수영수증 리포트 직원 별 요약 목록을 반환한다).
   *
   * Return (반환) : Summary list of extra income withholding receipts report by employee (기타소득 원천징수영수증 리포트 직원 별 요약 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  searchIncomeExtraWithholdingReceipts: Array<IncomeExtraWithholdingReceiptReportSummariesByEmployee>;
  /**
   * Search for retirement income payment statement for electronic filing (전자신고를 위한 퇴직소득지급명세서를 검색한다).
   *
   * Return (반환) : Retirement income payment statement filing list(퇴직소득지급명세서 전자신고 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  searchIncomeRetirementPaymentStatementElectronicFilings: Array<IncomeRetirementPaymentStatementElectronicFiling>;
  /**
   * Returns the list of retirement income withholding receipts (퇴직소득 원천징수영수증 목록을 반환한다).
   *
   * Return (반환) : List of retirement income withholding receipts (퇴직소득 원천징수영수증 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  searchIncomeRetirementWithholdingReceipts: Array<IncomeRetirement>;
  /**
   * Search for daily wage income payment statement for electronic filing (전자신고를 위한 일용근로소득지급명세서를 검색한다).
   *
   * Return (반환) : Daily wage income payment statement electronic filing list(일용근로소득지급명세서 전자신고 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  searchIncomeWageDailyPaymentStatementElectronicFilings: Array<IncomeWageDailyPaymentStatementElectronicFiling>;
  /**
   * Returns a summary list of daily wage income withholding receipts report by employee (일용직근로소득 원천징수영수증 리포트 직원 별 요약 목록을 반환한다).
   *
   * Return (반환) : Summary list of daily wage income withholding receipts report by employee (일용직근로소득 원천징수영수증 리포트 직원 별 요약 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  searchIncomeWageDailyWithholdingReceipts: Array<IncomeWageDailyWithholdingReceiptReportSummariesByEmployee>;
  /**
   * Search for wage income payment statement for electronic filing (전자신고를 위한 근로소득지급명세서를 검색한다).
   *
   * Return (반환) : Wage income payment statement electronic filing list(근로소득지급명세서 전자신고 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  searchIncomeWagePaymentStatementElectronicFilings: Array<IncomeWagePaymentStatementElectronicFiling>;
  /**
   * Search for wage income simplified payment statement for electronic filing (전자신고를 위한 근로소득간이지급명세서를 검색한다).
   *
   * Return (반환) : Wage income simplified payment statement electronic filing list(근로소득간이지급명세서 전자신고 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  searchIncomeWageSimplifiedPaymentStatementElectronicFilings: Array<IncomeWageSimplifiedPaymentStatementElectronicFiling>;
  /**
   * Returns the list of wage income withholding receipts (근로소득 원천징수영수증 목록을 반환한다).
   *
   * Return (반환) : List of wage income withholding receipts (근로소득 원천징수영수증 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  searchIncomeWageWithholdingReceipts: Array<IncomeYearEndTaxAdjustment>;
  /**
   * Returns the list of wage income withholding tax by employee (소득자별 근로소득 원천징수영수부 목록을 반환한다).
   *
   * Return (반환) : List of wage income withholding receipts (근로소득 원천징수영수증 목록)
   *
   * Necessary Role (필요역할) : WorkScreenRole.WITHHOLDING_WORK (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   *
   * Exception (예외) / 403 : Withholding role exception (원천역할예외)
   */
  searchIncomeWageWithholdingTaxByEmployees: Array<IncomeWageWithholdingTaxByEmployee>;
  /**
   * Search for local income tax for electronic filing (전자신고를 위한 지방소득세를 검색한다).
   *
   * Return (반환) : Withholding tax performance report (원천징수이행상황신고서)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  searchLocalIncomeTaxElectronicFilings: Array<LocalIncomeTaxElectronicFiling>;
  /** Search public institution information (공공기관정보를 검색한다). */
  searchPublicInstitutions: Array<CompetentTaxOfficeLegalDong>;
  /**
   * Search the list of sales representative views (영업자뷰 목록을 검색한다).
   *
   * Return (반환) : Sales representative view paginated object (영업자뷰 페이징)
   *
   * Necessary Role (필요역할) : AdminScreenRole.SALES_REPRESENTATIVE_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  searchSalesRepresentatives: SalesRepresentativeViewPaginatedObject;
  /**
   * Search the list of screen role groups (화면역할그룹 목록을 검색한다).
   *
   * Return (반환) : Screen role group paginated object (화면역할그룹 페이징)
   *
   * Necessary Role (필요역할) : AdminScreenRole.ROLE_MANAGE (read)
   *
   * Necessary Role (필요역할) : AdminScreenRole.USER_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  searchScreenRoleGroups: ScreenRoleGroupPaginatedObject;
  /**
   * Search the list of company views (사업자뷰 목록을 검색한다).
   *
   * Return (반환) : Company view paginated object (사업자뷰 페이징)
   *
   * Necessary Role (필요역할) : AdminScreenRole.COMPANY_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  searchServiceContracts: CompanyViewPaginatedObject;
  /**
   * Search the service subscription application view list (서비스가입신청뷰 목록을 검색한다).
   *
   * Return (반환) : Service subscription application view paginated object (서비스가입신청뷰 페이징)
   *
   * Necessary Role (필요역할) : AdminScreenRole.CONTRACT_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  searchSubscriptionRequests: SubscriptionRequestViewPaginatedObject;
  /**
   * Search for a list of withholding performance reports (원천징수이행상황신고서 목록을 검색한다).
   *
   * Return (반환) : Withholding tax performance report paginated object (원천징수이행상황신고서 페이징)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  searchTaxWithholdingStatusReports: TaxWithholdingStatusReportPaginatedObject;
  /**
   * Search the list of user views (회원뷰 목록을 검색한다).
   *
   * Return (반환) : User view paginated object (회원뷰 페이징)
   *
   * Necessary Role (필요역할) : AdminScreenRole.USER_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  searchUsers: UserViewPaginatedObject;
  /**
   * Search for withholding tax for electronic filing (전자신고를 위한 원천세를 검색한다).
   *
   * Return (반환) : Withholding tax electronic filing list(원천세 전자신고 목록)
   *
   * Necessary Role (필요역할) : AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE (read)
   *
   * Exception (예외) / 400,401,403 : Certification common exception (인증공통예외)
   */
  searchWithholdingTaxElectronicFilings: Array<WithholdingTaxElectronicFiling>;
  /**
   * Check if password reset key is valid (비밀번호 재설정 키가 유효한지 검사한다).
   *
   * 반환 : true
   *
   * Exception that should not occur (발생하면 안되는 예외) / 404 : If the key does not exist (키가 존재하지 않는 경우)
   *
   * Exception (예외) / 406 : The key has expired (키의 유효기간이 지난 경우)
   *
   * Exception (예외) / 409 : If the key is already used (이미 사용된 키인 경우)
   */
  validateFindPasswordKey: Scalars['Boolean'];
};


export type QueryCalculateIncomeRetirementArgs = {
  companyId: Scalars['Int'];
  input: IncomeRetirementCalculationInput;
};


export type QueryCalculateIncomeRetirementTaxArgs = {
  companyId: Scalars['Int'];
  input: IncomeRetirementTaxCalculationInput;
};


export type QueryCalculateIncomeWageTaxArgs = {
  companyId: Scalars['Int'];
  dependentCount: Scalars['Int'];
  imputedYear: Scalars['Int'];
  totalTaxPay: Scalars['Int'];
};


export type QueryCalculateMidTermSettlementArgs = {
  companyId: Scalars['Int'];
  employeeId: Scalars['Int'];
  paymentDay: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type QueryFindEmployeesForIncomeRetirementArgs = {
  companyId: Scalars['Int'];
  imputedMonth: Scalars['Int'];
  imputedYear: Scalars['Int'];
  retirementType: Scalars['Int'];
};


export type QueryFindGroupsArgs = {
  name?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
};


export type QueryFindIncomeProcessBusinessStatViewsArgs = {
  companyId: Scalars['Int'];
  filter: FindIncomeProcessStatFilter;
};


export type QueryFindIncomeProcessExtraStatViewsArgs = {
  companyId: Scalars['Int'];
  filter: FindIncomeProcessStatFilter;
};


export type QueryFindIncomeProcessWageDailyStatViewsArgs = {
  companyId: Scalars['Int'];
  filter: FindIncomeProcessStatFilter;
};


export type QueryFindIncomeProcessWageStatViewsArgs = {
  companyId: Scalars['Int'];
  filter: FindIncomeProcessStatFilter;
};


export type QueryFindManagerUsersArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryFindPartersArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryFindPasswordArgs = {
  email: Scalars['String'];
  username: Scalars['String'];
};


export type QueryFindSalesRepresentativesArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryFindUsernameArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
};


export type QueryGetAuthenticationsArgs = {
  filter: PaginatedFilter;
  userId: Scalars['Int'];
};


export type QueryGetBankbookArgs = {
  bankbookId: Scalars['Int'];
  companyId: Scalars['Int'];
  facilityBusinessId: Scalars['Int'];
  fiscalYear: Scalars['Int'];
};


export type QueryGetBankbookScrapInfoArgs = {
  bankbookId: Scalars['Int'];
  companyId: Scalars['Int'];
  facilityBusinessId: Scalars['Int'];
  fiscalYear: Scalars['Int'];
};


export type QueryGetBankbooksArgs = {
  companyId: Scalars['Int'];
  facilityBusinessId: Scalars['Int'];
  fiscalYear: Scalars['Int'];
};


export type QueryGetBankbooksLogsArgs = {
  companyId: Scalars['Int'];
  facilityBusinessId: Scalars['Int'];
  fiscalYear: Scalars['Int'];
};


export type QueryGetClientArgs = {
  clientId: Scalars['Int'];
  companyId: Scalars['Int'];
};


export type QueryGetClientLogsArgs = {
  clientId: Scalars['Int'];
  companyId: Scalars['Int'];
};


export type QueryGetCompaniesInElectronicFilingFileArgs = {
  electronicFilingId: Scalars['Int'];
  type: Scalars['Int'];
};


export type QueryGetCompanyArgs = {
  id: Scalars['Int'];
};


export type QueryGetCompanyLogsArgs = {
  id: Scalars['Int'];
};


export type QueryGetCompanyManageMemosArgs = {
  companyId: Scalars['Int'];
};


export type QueryGetDepartmentsArgs = {
  companyId: Scalars['Int'];
};


export type QueryGetElectronicFilingsByIncomeBusinessPaymentStatementArgs = {
  input: ElectronicFilingCompanyImputedYearKeyInput;
};


export type QueryGetElectronicFilingsByIncomeBusinessSimplifiedPaymentStatementArgs = {
  input: ElectronicFilingCompanyPaymentMonthKeyInput;
};


export type QueryGetElectronicFilingsByIncomeExtraPaymentStatementArgs = {
  input: ElectronicFilingCompanyImputedYearKeyInput;
};


export type QueryGetElectronicFilingsByIncomeRetirementPaymentStatementArgs = {
  input: ElectronicFilingCompanyImputedYearKeyInput;
};


export type QueryGetElectronicFilingsByIncomeWageDailyPaymentStatementArgs = {
  input: ElectronicFilingCompanyPaymentMonthKeyInput;
};


export type QueryGetElectronicFilingsByIncomeWagePaymentStatementArgs = {
  input: ElectronicFilingCompanyImputedYearKeyInput;
};


export type QueryGetElectronicFilingsByIncomeWageSimplifiedPaymentStatementArgs = {
  input: ElectronicFilingCompanyPaymentHalfYearKeyInput;
};


export type QueryGetElectronicFilingsByLocalIncomeTaxArgs = {
  input: ElectronicFilingReportKeyInput;
};


export type QueryGetElectronicFilingsByWithholdingTaxArgs = {
  input: ElectronicFilingReportKeyInput;
};


export type QueryGetEmployeeBusinessArgs = {
  companyId: Scalars['Int'];
  employeeId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  incomeTypeCode: Scalars['String'];
};


export type QueryGetEmployeeBusinessesArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryGetEmployeeBusinessesLogsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryGetEmployeeExtraArgs = {
  companyId: Scalars['Int'];
  employeeId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  incomeTypeCode: Scalars['String'];
};


export type QueryGetEmployeeExtrasArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryGetEmployeeExtrasLogsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryGetEmployeeWageArgs = {
  companyId: Scalars['Int'];
  employeeId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryGetEmployeeWageDailiesArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryGetEmployeeWageDailiesLogsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryGetEmployeeWageDailyArgs = {
  companyId: Scalars['Int'];
  employeeId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryGetEmployeeWagesArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryGetEmployeeWagesLogsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryGetIncomProcessesInTaxWithholdingStatusReportArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  reportId: Scalars['Int'];
};


export type QueryGetIncomeBusinessArgs = {
  companyId: Scalars['Int'];
  incomeId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type QueryGetIncomeBusinessWithholdingReceiptReportViewUrlArgs = {
  companyId: Scalars['Int'];
  employeeKeys: Array<ReportEmployeeBusinessKeyInput>;
  input: IncomeBusinessWithholdingReceiptInput;
};


export type QueryGetIncomeBusinessesArgs = {
  companyId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type QueryGetIncomeBusinessesLogsArgs = {
  companyId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type QueryGetIncomeExtraArgs = {
  companyId: Scalars['Int'];
  incomeId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type QueryGetIncomeExtraWithholdingReceiptReportViewUrlArgs = {
  companyId: Scalars['Int'];
  employeeKeys: Array<ReportEmployeeExtraKeyInput>;
  input: IncomeExtraWithholdingReceiptInput;
};


export type QueryGetIncomeExtrasArgs = {
  companyId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type QueryGetIncomeExtrasLogsArgs = {
  companyId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type QueryGetIncomeProcessBusinessLogsArgs = {
  companyId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type QueryGetIncomeProcessBusinessesArgs = {
  companyId: Scalars['Int'];
  imputedMonth?: InputMaybe<Scalars['Int']>;
  imputedYear: Scalars['Int'];
};


export type QueryGetIncomeProcessExtraLogsArgs = {
  companyId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type QueryGetIncomeProcessExtrasArgs = {
  companyId: Scalars['Int'];
  imputedMonth?: InputMaybe<Scalars['Int']>;
  imputedYear: Scalars['Int'];
};


export type QueryGetIncomeProcessRetirementLogsArgs = {
  companyId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type QueryGetIncomeProcessRetirementsArgs = {
  companyId: Scalars['Int'];
  imputedMonth?: InputMaybe<Scalars['Int']>;
  imputedYear: Scalars['Int'];
};


export type QueryGetIncomeProcessWageDailiesArgs = {
  companyId: Scalars['Int'];
  imputedMonth?: InputMaybe<Scalars['Int']>;
  imputedYear: Scalars['Int'];
};


export type QueryGetIncomeProcessWageDailyLogsArgs = {
  companyId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type QueryGetIncomeProcessWageLogsArgs = {
  companyId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type QueryGetIncomeProcessWagesArgs = {
  companyId: Scalars['Int'];
  imputedMonth?: InputMaybe<Scalars['Int']>;
  imputedYear: Scalars['Int'];
};


export type QueryGetIncomeRetirementArgs = {
  companyId: Scalars['Int'];
  incomeId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type QueryGetIncomeRetirementSpecificationArgs = {
  companyId: Scalars['Int'];
  specificationId: Scalars['Int'];
};


export type QueryGetIncomeRetirementWithholdingReceiptReportViewUrlArgs = {
  companyId: Scalars['Int'];
  incomeIds: Array<Scalars['Int']>;
  input: IncomeRetirementWithholdingReceiptInput;
};


export type QueryGetIncomeRetirementsArgs = {
  companyId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type QueryGetIncomeRetirementsLogsArgs = {
  companyId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type QueryGetIncomeWageArgs = {
  companyId: Scalars['Int'];
  incomeId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type QueryGetIncomeWageDailiesArgs = {
  companyId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type QueryGetIncomeWageDailiesLogsArgs = {
  companyId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type QueryGetIncomeWageDailyArgs = {
  companyId: Scalars['Int'];
  incomeId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type QueryGetIncomeWageDailyPayrollRegisterViewUrlArgs = {
  companyId: Scalars['Int'];
  input: PayrollRegisterInput;
};


export type QueryGetIncomeWageDailySalaryStatementViewUrlArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  incomeIds: Array<Scalars['Int']>;
};


export type QueryGetIncomeWageDailyWithholdingReceiptReportViewUrlArgs = {
  companyId: Scalars['Int'];
  employeeIds: Array<Scalars['Int']>;
  input: IncomeWageDailyWithholdingReceiptInput;
};


export type QueryGetIncomeWagePayrollRegisterViewUrlArgs = {
  companyId: Scalars['Int'];
  input: PayrollRegisterInput;
};


export type QueryGetIncomeWageSalaryStatementViewUrlArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  incomeIds: Array<Scalars['Int']>;
};


export type QueryGetIncomeWageWithholdingReceiptReportViewUrlArgs = {
  companyId: Scalars['Int'];
  incomeIds: Array<Scalars['Int']>;
  input: IncomeWageWithholdingReceiptInput;
};


export type QueryGetIncomeWageWithholdingTaxByEmployeeReportViewUrlArgs = {
  companyId: Scalars['Int'];
  employeeIds: Array<Scalars['Int']>;
  input: IncomeWageWithholdingTaxByEmployeeInput;
};


export type QueryGetIncomeWagesArgs = {
  companyId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type QueryGetIncomeWagesLogsArgs = {
  companyId: Scalars['Int'];
  processKey: IncomeProcessKeyInput;
};


export type QueryGetIncomesForTaxWithholdingStatusReportArgs = {
  companyId: Scalars['Int'];
  input: IncomeTaxWithholdingStatusReportInput;
};


export type QueryGetMajorInsuranceCompanyEmployeeAcquisitionArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrlArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyEmployeeAcquisitionLogsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyEmployeeAcquisitionsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyEmployeeLeaveOfAbsenceArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyEmployeeLeaveOfAbsenceFaxFilingReportViewUrlArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyEmployeeLeaveOfAbsenceLogsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyEmployeeLeaveOfAbsencesArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyEmployeeLossArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyEmployeeLossFaxFilingReportViewUrlArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyEmployeeLossLogsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyEmployeeLossesArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyEmployeeSalaryChangeArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyEmployeeSalaryChangeFaxFilingReportViewUrlArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyEmployeeSalaryChangeLogsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyEmployeeSalaryChangesArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyJoinArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyJoinFaxFilingReportViewUrlArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyJoinLogsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyJoinsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyOutArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyOutFaxFilingReportViewUrlArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyOutLogsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type QueryGetMajorInsuranceCompanyOutsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryGetMajorInsuranceConsignStatusArgs = {
  companyId: Scalars['Int'];
};


export type QueryGetMajorInsuranceConsignStatusFaxFilingReportViewUrlArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  workId: Scalars['Int'];
};


export type QueryGetMajorInsuranceConsignStatusLogsArgs = {
  companyId: Scalars['Int'];
};


export type QueryGetMyCompanyArgs = {
  companyId: Scalars['Int'];
};


export type QueryGetMyCompanyAuthenticationsArgs = {
  companyId: Scalars['Int'];
  filter: PaginatedFilter;
  userId: Scalars['Int'];
};


export type QueryGetMyCompanyAutoGeneratedSealArgs = {
  name: Scalars['String'];
};


export type QueryGetMyCompanyFacilityBusinessesArgs = {
  companyId: Scalars['Int'];
};


export type QueryGetMyCompanyUserArgs = {
  companyId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type QueryGetMyCompanyUserLogsArgs = {
  companyId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type QueryGetMyCompanyUsersArgs = {
  companyId: Scalars['Int'];
  filter: PaginatedFilter;
};


export type QueryGetPublicInstitutionArgs = {
  bcode: Scalars['String'];
};


export type QueryGetResponsibilitiesArgs = {
  companyId: Scalars['Int'];
};


export type QueryGetSalesRepresentativeArgs = {
  id: Scalars['Int'];
};


export type QueryGetSalesRepresentativeLogsArgs = {
  id: Scalars['Int'];
};


export type QueryGetScreenRoleGroupArgs = {
  id: Scalars['String'];
};


export type QueryGetScreenRoleGroupLogsArgs = {
  id: Scalars['String'];
};


export type QueryGetServiceContractArgs = {
  id: Scalars['Int'];
};


export type QueryGetServiceContractLogsArgs = {
  id: Scalars['Int'];
};


export type QueryGetServiceContractManageMemosArgs = {
  companyId: Scalars['Int'];
};


export type QueryGetSubscriptionRequestArgs = {
  id: Scalars['Int'];
};


export type QueryGetSubscriptionRequestLogsArgs = {
  id: Scalars['Int'];
};


export type QueryGetTaxWithholdingStatusReportArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  reportId: Scalars['Int'];
};


export type QueryGetTaxWithholdingStatusReportDetailArgs = {
  companyId: Scalars['Int'];
  detailId: Scalars['Int'];
};


export type QueryGetTaxWithholdingStatusReportViewUrlArgs = {
  companyId: Scalars['Int'];
  formInputs: Array<TaxWithholdingStatusReportFormInput>;
  imputedYear: Scalars['Int'];
  reportId: Scalars['Int'];
};


export type QueryGetTaxWithholdingStatusReportsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryGetTaxWithholdingStatusReportsLogsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserLogsArgs = {
  id: Scalars['Int'];
};


export type QueryGetWithholdingConfigArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryGetWithholdingConfigDeductionItemArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  itemCode: Scalars['Int'];
};


export type QueryGetWithholdingConfigDeductionItemsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  useOnly?: InputMaybe<Scalars['Boolean']>;
};


export type QueryGetWithholdingConfigDeductionItemsLogsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryGetWithholdingConfigLogsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryGetWithholdingConfigPayItemArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  itemCode: Scalars['Int'];
};


export type QueryGetWithholdingConfigPayItemsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
  useOnly?: InputMaybe<Scalars['Boolean']>;
};


export type QueryGetWithholdingConfigPayItemsLogsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QueryIsSalesRepresentativeChangableNameArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
};


export type QueryIsSalesRepresentativeRegistableNameArgs = {
  name: Scalars['String'];
};


export type QueryIsScreenRoleGroupRegistableIdArgs = {
  id: Scalars['String'];
};


export type QueryIsScreenRoleGroupRegistableNameArgs = {
  name: Scalars['String'];
};


export type QueryIsSubscriptionRequestChangeableBizNumberArgs = {
  bizNumber: Scalars['String'];
  id: Scalars['Int'];
};


export type QueryIsSubscriptionRequestRegistableBizNumberArgs = {
  bizNumber: Scalars['String'];
};


export type QueryIsUserRegistableUsernameArgs = {
  username: Scalars['String'];
};


export type QuerySearchClientsArgs = {
  companyId: Scalars['Int'];
  filter: ClientSearchFilter;
};


export type QuerySearchCompaniesArgs = {
  filter: CompanyViewSearchFilter;
};


export type QuerySearchElectronicFilingFileProductionsArgs = {
  filter: ElectronicFilingFileSearchFilter;
};


export type QuerySearchIncomeBusinessPaymentStatementElectronicFilingsArgs = {
  filter: ElectronicFilingIncomeBusinessPaymentStatementSearchFilter;
};


export type QuerySearchIncomeBusinessSimplifiedPaymentStatementElectronicFilingsArgs = {
  filter: ElectronicFilingIncomeBusinessSimplifiedPaymentStatementSearchFilter;
};


export type QuerySearchIncomeBusinessWithholdingReceiptsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QuerySearchIncomeExtraPaymentStatementElectronicFilingsArgs = {
  filter: ElectronicFilingIncomeExtraPaymentStatementSearchFilter;
};


export type QuerySearchIncomeExtraWithholdingReceiptsArgs = {
  companyId: Scalars['Int'];
  imputedYear: Scalars['Int'];
};


export type QuerySearchIncomeRetirementPaymentStatementElectronicFilingsArgs = {
  filter: ElectronicFilingIncomeRetirementPaymentStatementSearchFilter;
};


export type QuerySearchIncomeRetirementWithholdingReceiptsArgs = {
  companyId: Scalars['Int'];
  filter: IncomeRetirementWithholdingReceiptSearchFilter;
};


export type QuerySearchIncomeWageDailyPaymentStatementElectronicFilingsArgs = {
  filter: ElectronicFilingIncomeWageDailyPaymentStatementSearchFilter;
};


export type QuerySearchIncomeWageDailyWithholdingReceiptsArgs = {
  companyId: Scalars['Int'];
  filter: IncomeWageDailyWithholdingReceiptSearchFilter;
};


export type QuerySearchIncomeWagePaymentStatementElectronicFilingsArgs = {
  filter: ElectronicFilingIncomeWagePaymentStatementSearchFilter;
};


export type QuerySearchIncomeWageSimplifiedPaymentStatementElectronicFilingsArgs = {
  filter: ElectronicFilingIncomeWageSimplifiedPaymentStatementSearchFilter;
};


export type QuerySearchIncomeWageWithholdingReceiptsArgs = {
  companyId: Scalars['Int'];
  filter: IncomeWageWithholdingReceiptSearchFilter;
};


export type QuerySearchIncomeWageWithholdingTaxByEmployeesArgs = {
  companyId: Scalars['Int'];
  filter: IncomeWageWithholdingTaxByEmployeeSearchFilter;
};


export type QuerySearchLocalIncomeTaxElectronicFilingsArgs = {
  filter: ElectronicFilingLocalIncomeTaxSearchFilter;
};


export type QuerySearchPublicInstitutionsArgs = {
  keyword: Scalars['String'];
};


export type QuerySearchSalesRepresentativesArgs = {
  filter: SalesRepresentativeViewSearchFilter;
};


export type QuerySearchScreenRoleGroupsArgs = {
  filter: ScreenRoleGroupSearchFilter;
};


export type QuerySearchServiceContractsArgs = {
  filter: CompanyViewSearchFilter;
};


export type QuerySearchSubscriptionRequestsArgs = {
  filter: SubscriptionRequestViewSearchFilter;
};


export type QuerySearchTaxWithholdingStatusReportsArgs = {
  filter: TaxWithholdingStatusReportSearchFilter;
};


export type QuerySearchUsersArgs = {
  filter: UserViewSearchFilter;
};


export type QuerySearchWithholdingTaxElectronicFilingsArgs = {
  filter: ElectronicFilingWithholdingTaxSearchFilter;
};


export type QueryValidateFindPasswordKeyArgs = {
  key: Scalars['String'];
};

/** Request to receive email input (이메일수신요청 입력) */
export type ReceiveEmailRequestInput = {
  /** recipient address (수신자주소) */
  receiverAddress: Scalars['String'];
  /** recipient name (수신자명) */
  receiverName: Scalars['String'];
};

/** Report business income earner key input (리포트 사업소득자 키 입력) */
export type ReportEmployeeBusinessKeyInput = {
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** income classification code (소득구분코드) */
  incomeTypeCode: Scalars['String'];
};

/** Report extra income earner key input (리포트 기타소득자 키 입력) */
export type ReportEmployeeExtraKeyInput = {
  /** employee number (사번) */
  employeeId: Scalars['Int'];
  /** income classification code (소득구분코드) */
  incomeTypeCode: Scalars['String'];
};

/** Retired years of service (퇴직근속연수) */
export type RetiredYearsOfService = {
  __typename?: 'RetiredYearsOfService';
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

/** Sales representative (영업자) */
export type SalesRepresentative = {
  __typename?: 'SalesRepresentative';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** sales representative address (주소) */
  address: Scalars['String'];
  /** termination date [YYYYMMDD] (해지일자) */
  cancelDate?: Maybe<Scalars['Int']>;
  /** sales representative code (영업자코드) */
  code: Scalars['String'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** Sales representative details (영업자 상세정보) */
  detail: SalesRepresentativeDetail;
  /** sales representative grade (영업자등급) */
  grade: Scalars['Int'];
  /** sales representative serial number (영업자일련번호) */
  id: Scalars['Int'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** mobile phone number (핸드폰) */
  mobilePhone: Scalars['String'];
  /** sales representative name (영업자명) */
  name: Scalars['String'];
  /** contact phone number (연락처) */
  phone: Scalars['String'];
  /** registration date [YYYYMMDD] (가입일자) */
  registerDate: Scalars['Int'];
  /** sales representative status (영업자상태) */
  status: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Sales representative details (영업자 상세정보) */
export type SalesRepresentativeDetail = {
  __typename?: 'SalesRepresentativeDetail';
  /** account number (계좌번호) */
  accountNumber?: Maybe<Scalars['String']>;
  /** depositor (예금주) */
  accountOwner?: Maybe<Scalars['String']>;
  /** Detailed address information (상세주소 정보) */
  addressDetail: AddressDetail;
  /** extended address (확장주소) */
  addressExtend: Scalars['String'];
  /** bank (은행) */
  bankType?: Maybe<Scalars['BankTypeScalar']>;
  /** business registration number (사업자등록번호) */
  bizNumber?: Maybe<Scalars['String']>;
  /** type of business (사업자유형) */
  bizType?: Maybe<Scalars['BizTypeScalar']>;
  /** termination date [YYYYMMDD] (해지일자) */
  cancelDate?: Maybe<Scalars['Int']>;
  /** email (이메일) */
  email: Scalars['String'];
  /** tax invoice receiving email (세금계산서 수신 이메일) */
  emailTaxInvoice?: Maybe<Scalars['String']>;
  /** fax (팩스) */
  fax?: Maybe<Scalars['String']>;
  /** sales representative grade (영업자등급) */
  grade: Scalars['Int'];
  /** land number address (지번주소) */
  jibunAddress: Scalars['String'];
  /** mobile phone number (핸드폰) */
  mobilePhone: Scalars['String'];
  /** sales representative name (영업자명) */
  name: Scalars['String'];
  /** contact phone number (연락처) */
  phone: Scalars['String'];
  /** registration date [YYYYMMDD] (가입일자) */
  registerDate: Scalars['Int'];
  /** remarks (비고) */
  remark?: Maybe<Scalars['String']>;
  /** corporate registration number / resident registration number (법인등록번호/주민등록번호) */
  residentId?: Maybe<Scalars['String']>;
  /** road name address (도로명주소) */
  roadAddress: Scalars['String'];
  /** sales representative status (영업자상태) */
  status: Scalars['Int'];
  /** whether to issue tax invoice (세금계산서 발행여부) */
  taxInvoice: Scalars['Boolean'];
  /** postal code (우편번호) */
  zipcode: Scalars['String'];
};

/** Sales representative details input (영업자 상세정보 입력) */
export type SalesRepresentativeDetailInput = {
  /** account number (계좌번호) */
  accountNumber?: InputMaybe<Scalars['String']>;
  /** depositor (예금주) */
  accountOwner?: InputMaybe<Scalars['String']>;
  /** Detailed address information (상세주소 정보) */
  addressDetail: AddressDetailInput;
  /** extended address (확장주소) */
  addressExtend: Scalars['String'];
  /** bank (은행) */
  bankType?: InputMaybe<Scalars['BankTypeScalar']>;
  /** business registration number (사업자등록번호) */
  bizNumber?: InputMaybe<Scalars['String']>;
  /** type of business (사업자유형) */
  bizType?: InputMaybe<Scalars['BizTypeScalar']>;
  /** termination date [YYYYMMDD] (해지일자) */
  cancelDate?: InputMaybe<Scalars['Int']>;
  /** email (이메일) */
  email: Scalars['String'];
  /** tax invoice receiving email (세금계산서 수신 이메일) */
  emailTaxInvoice?: InputMaybe<Scalars['String']>;
  /** fax (팩스) */
  fax?: InputMaybe<Scalars['String']>;
  /** sales representative grade (영업자등급) */
  grade: Scalars['Int'];
  /** land number address (지번주소) */
  jibunAddress: Scalars['String'];
  /** mobile phone number (핸드폰) */
  mobilePhone: Scalars['String'];
  /** sales representative name (영업자명) */
  name: Scalars['String'];
  /** contact phone number (연락처) */
  phone: Scalars['String'];
  /** registration date [YYYYMMDD] (가입일자) */
  registerDate: Scalars['Int'];
  /** remarks (비고) */
  remark?: InputMaybe<Scalars['String']>;
  /** corporate registration number / resident registration number (법인등록번호/주민등록번호) */
  residentId?: InputMaybe<Scalars['String']>;
  /** road name address (도로명주소) */
  roadAddress: Scalars['String'];
  /** sales representative status (영업자상태) */
  status: Scalars['Int'];
  /** whether to issue tax invoice (세금계산서 발행여부) */
  taxInvoice: Scalars['Boolean'];
  /** postal code (우편번호) */
  zipcode: Scalars['String'];
};

/** Sales representative change history (영업자 변경이력) */
export type SalesRepresentativeLog = {
  __typename?: 'SalesRepresentativeLog';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** sales representative address (주소) */
  address: Scalars['String'];
  /** termination date [YYYYMMDD] (해지일자) */
  cancelDate?: Maybe<Scalars['Int']>;
  /** sales representative code (영업자코드) */
  code: Scalars['String'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** Sales representative details (영업자 상세정보) */
  detail: SalesRepresentativeDetail;
  /** sales representative grade (영업자등급) */
  grade: Scalars['Int'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** mobile phone number (핸드폰) */
  mobilePhone: Scalars['String'];
  /** sales representative name (영업자명) */
  name: Scalars['String'];
  /** contact phone number (연락처) */
  phone: Scalars['String'];
  /** registration date [YYYYMMDD] (가입일자) */
  registerDate: Scalars['Int'];
  /** remarks (비고) */
  remark: Scalars['String'];
  /** sales representative serial number (영업자일련번호) */
  salesRepresentativeId: Scalars['Int'];
  /** sales representative status (영업자상태) */
  status: Scalars['Int'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Sales representative view (영업자뷰) */
export type SalesRepresentativeView = {
  __typename?: 'SalesRepresentativeView';
  /** sales representative address (주소) */
  address: Scalars['String'];
  /** termination date [YYYYMMDD] (해지일자) */
  cancelDate?: Maybe<Scalars['Int']>;
  /** sales representative code (영업자코드) */
  code: Scalars['String'];
  /** number of company held (보유 사업자수) */
  companyCount: Scalars['Int'];
  /** sales representative grade (영업자등급) */
  grade: Scalars['Int'];
  /** sales representative serial number (영업자일련번호) */
  id: Scalars['Int'];
  /** mobile phone number (핸드폰) */
  mobilePhone: Scalars['String'];
  /** sales representative name (영업자명) */
  name: Scalars['String'];
  /** contact phone number (연락처) */
  phone: Scalars['String'];
  /** registration date [YYYYMMDD] (가입일자) */
  registerDate: Scalars['Int'];
  /** sales representative status (영업자상태) */
  status: Scalars['Int'];
};

/** Sales representative view paginated object (영업자뷰 페이징) */
export type SalesRepresentativeViewPaginatedObject = {
  __typename?: 'SalesRepresentativeViewPaginatedObject';
  /** Sales representative view list (영업자뷰 목록) */
  datas: Array<SalesRepresentativeView>;
  /** page number (페이지번호) */
  page: Scalars['Int'];
  /** number of page rows (페이지행수) */
  rows: Scalars['Int'];
  /** total list count (전체목록건수) */
  totalCount: Scalars['Int'];
};

/** Sales representative view search filter (영업자뷰 검색 필터) */
export type SalesRepresentativeViewSearchFilter = {
  /** sales representative code (영업자코드) */
  code?: InputMaybe<Scalars['String']>;
  /** sales representative grade (영업자등급) */
  grade?: InputMaybe<Scalars['Int']>;
  /** sales representative name (영업자명) */
  name?: InputMaybe<Scalars['String']>;
  /** page number (페이지번호) */
  page?: InputMaybe<Scalars['Int']>;
  /** number of page rows (페이지행수) */
  rows: Scalars['Int'];
  /** sales representative status list (상태목록) */
  statuses: Array<Scalars['Int']>;
};

/** Scraping information input (스크래핑정보 입력) */
export type ScrapingInfoInput = {
  /** account password (계좌비밀번호) */
  accountPassword: Scalars['String'];
  /** birthday (생년월일) */
  birthday?: InputMaybe<Scalars['Int']>;
  /** business registration number (사업자등록번호) */
  bizNumber?: InputMaybe<Scalars['String']>;
  /** web id (웹아이디) */
  webId?: InputMaybe<Scalars['String']>;
  /** web password (웹패스워드) */
  webPassword?: InputMaybe<Scalars['String']>;
};

/** Screen role group (화면역할그룹) */
export type ScreenRoleGroup = {
  __typename?: 'ScreenRoleGroup';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** screen role group code (화면역할그룹코드) */
  id: Scalars['String'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** locked status (잠김여부) */
  lock: Scalars['Boolean'];
  /** memo (메모) */
  memo?: Maybe<Scalars['String']>;
  /** screen role group name (화면역할그룹명) */
  name: Scalars['String'];
  /** Administrator screen read role list (관리자 화면 읽기역할 목록) */
  readAdminScreenRoles?: Maybe<Array<Scalars['AdminScreenRoleScalar']>>;
  /** Work screen read role list (업무 화면 읽기역할 목록) */
  readWorkScreenRoles?: Maybe<Array<Scalars['WorkScreenRoleScalar']>>;
  /** user type (사용자유형) */
  type: Scalars['String'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** Administrator screen write role list (관리자 화면 쓰기역할 목록) */
  writeAdminScreenRoles?: Maybe<Array<Scalars['AdminScreenRoleScalar']>>;
  /** Work screen write role list (업무 화면 쓰기역할 목록) */
  writeWorkScreenRoles?: Maybe<Array<Scalars['WorkScreenRoleScalar']>>;
};

/** Screen role group input (화면역할그룹 입력) */
export type ScreenRoleGroupInput = {
  /** screen role group code (화면역할그룹코드) */
  id: Scalars['String'];
  /** memo (메모) */
  memo?: InputMaybe<Scalars['String']>;
  /** screen role group name (화면역할그룹명) */
  name: Scalars['String'];
  /** read screen roles (읽기화면역할 목록) */
  readAdminScreenRoles: Array<Scalars['AdminScreenRoleScalar']>;
  /** user type (사용자유형) */
  type: Scalars['String'];
  /** write screen roles (쓰기화면역할 목록) */
  writeAdminScreenRoles: Array<Scalars['AdminScreenRoleScalar']>;
};

/** Screen role group change history (화면역할그룹 변경이력) */
export type ScreenRoleGroupLog = {
  __typename?: 'ScreenRoleGroupLog';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** locked status (잠김여부) */
  lock: Scalars['Boolean'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** memo (메모) */
  memo?: Maybe<Scalars['String']>;
  /** screen role group name (화면역할그룹명) */
  name: Scalars['String'];
  /** remarks (비고) */
  remark: Scalars['String'];
  /** screen role group code (화면역할그룹코드) */
  screenRoleGroupId: Scalars['String'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** user type (사용자유형) */
  type: Scalars['String'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Screen role group paginated object (화면역할그룹 페이징) */
export type ScreenRoleGroupPaginatedObject = {
  __typename?: 'ScreenRoleGroupPaginatedObject';
  /** screen role group list (화면역할그룹 목록) */
  datas: Array<ScreenRoleGroup>;
  /** page number (페이지번호) */
  page: Scalars['Int'];
  /** number of page rows (페이지행수) */
  rows: Scalars['Int'];
  /** total list count (전체목록건수) */
  totalCount: Scalars['Int'];
};

/** Screen role group search filter (화면역할그룹 검색 필터) */
export type ScreenRoleGroupSearchFilter = {
  /** page number (페이지번호) */
  page?: InputMaybe<Scalars['Int']>;
  /** number of page rows (페이지행수) */
  rows: Scalars['Int'];
  /** user type list (사용자구분 목록) */
  types: Array<Scalars['String']>;
};

/** Request to send email input (이메일발송요청 입력) */
export type SendEmailRequestInput = {
  /** recipient address (수신자주소) */
  receiverAddress: Scalars['String'];
  /** recipient name (수신자명) */
  receiverName: Scalars['String'];
  /** sender name (발신자명) */
  senderName: Scalars['String'];
};

/** Service information summary (서비스정보요약) */
export type SimpleServiceInfo = {
  __typename?: 'SimpleServiceInfo';
  /** business name (사업명) */
  name?: Maybe<Scalars['String']>;
  /** start yaer/month / YYYYMM (시작연월) */
  startYearMonth: Scalars['Int'];
};

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

/** Pension account deposit details input (연금계좌입금명세 입력) */
export type StatementOfPensionAccountDepositInput = {
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

/** Service subscription application (서비스가입신청) */
export type SubscriptionRequest = {
  __typename?: 'SubscriptionRequest';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** approval date (승인일자) */
  approvedAt?: Maybe<Scalars['DateScalar']>;
  /** handler of approval (승인처리자) */
  approvedBy?: Maybe<Scalars['String']>;
  /** application code (신청코드) */
  code: Scalars['String'];
  /** Sales representative summary information (영업자요약정보) */
  compactSalesRepresentative: CompactSalesRepresentative;
  /** company address (주소) */
  companyAddress: Scalars['String'];
  /** business registration number (사업자등록번호) */
  companyBizNumber: Scalars['String'];
  /** company name (상호) */
  companyName: Scalars['String'];
  /** Service subscription application details (서비스가입신청 내용) */
  content: SubscriptionRequestContent;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** application serial number (신청일련번호) */
  id: Scalars['Int'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** memo (메모) */
  memo?: Maybe<Scalars['String']>;
  /** representative anme (대표자 이름) */
  presidentName: Scalars['String'];
  /** examination date (심사중일자) */
  processedAt?: Maybe<Scalars['DateScalar']>;
  /** handler of examination (심사중처리자) */
  processedBy?: Maybe<Scalars['String']>;
  /** reject date (반려일자) */
  rejectedAt?: Maybe<Scalars['DateScalar']>;
  /** handler of rejection (반려처리자) */
  rejectedBy?: Maybe<Scalars['String']>;
  /** Accounting Service Information Summary (회계서비스정보요약) */
  simpleAccountingInfos?: Maybe<Array<SimpleServiceInfo>>;
  /** Withholding Service Information Summary (원천서비스정보요약) 원천서비스정보요약 */
  simpleWithholdingInfo?: Maybe<SimpleServiceInfo>;
  /** service subscription application status (서비스가입신청상태) */
  status: Scalars['Int'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Service subscription application / Accounting service (서비스가입신청/회계서비스) */
export type SubscriptionRequestAccounting = {
  __typename?: 'SubscriptionRequestAccounting';
  /** Accounting additional service list (회계부가서비스목록) */
  accountingServiceTypes: Array<Scalars['AccountingAdditionalServiceTypeScalar']>;
  /** Facility business information list (시설사업정보목록) */
  facilityBusinesses: Array<SubscriptionRequestFacilityBusiness>;
};

/** Service subscription application / Accounting service input (서비스가입신청/회계서비스 입력) */
export type SubscriptionRequestAccountingInput = {
  /** Accounting additional service list (회계부가서비스목록) */
  accountingServiceTypes: Array<Scalars['AccountingAdditionalServiceTypeScalar']>;
  /** Facility business information list (시설사업정보목록) */
  facilityBusinesses: Array<SubscriptionRequestFacilityBusinessInput>;
};

/** Service subscription application / Agreement to the terms and conditions (서비스가입신청/약관동의) */
export type SubscriptionRequestAgreements = {
  __typename?: 'SubscriptionRequestAgreements';
  /** accounting service (회계서비스) */
  accountingService: Scalars['Boolean'];
  /** utilization of personal information provision (개인정보제공활용) */
  personalInfo: Scalars['Boolean'];
  /** terms of Service (서비스약관) */
  terms: Scalars['Boolean'];
  /** withholding service (원천서비스) */
  withholdingService: Scalars['Boolean'];
};

/** Service subscription application / Agreement to the terms and conditions input (서비스가입신청/약관동의 입력) */
export type SubscriptionRequestAgreementsInput = {
  /** accounting service (회계서비스) */
  accountingService: Scalars['Boolean'];
  /** utilization of personal information provision (개인정보제공활용) */
  personalInfo: Scalars['Boolean'];
  /** terms of Service (서비스약관) */
  terms: Scalars['Boolean'];
  /** withholding service (원천서비스) */
  withholdingService: Scalars['Boolean'];
};

/** Service subscription application / CMS account information (서비스가입신청/CMS계좌정보) */
export type SubscriptionRequestCmsBank = {
  __typename?: 'SubscriptionRequestCmsBank';
  /** withdrawal account number (출금계좌번호) */
  accountNumber: Scalars['String'];
  /** bank (은행) */
  bankType: Scalars['BankTypeScalar'];
  /** account business registration number (계좌사업자번호) */
  ownerBizNumber: Scalars['String'];
  /** withdrawal account holder name (출금계좌주명) */
  ownerName: Scalars['String'];
  /** withdrawal date (출금일) */
  withdrawDay: Scalars['String'];
};

/** Service subscription application / CMS account information input (서비스가입신청/CMS계좌정보 입력) */
export type SubscriptionRequestCmsBankInput = {
  /** withdrawal account number (출금계좌번호) */
  accountNumber: Scalars['String'];
  /** bank (은행) */
  bankType: Scalars['BankTypeScalar'];
  /** account business registration number (계좌사업자번호) */
  ownerBizNumber: Scalars['String'];
  /** withdrawal account holder name (출금계좌주명) */
  ownerName: Scalars['String'];
  /** withdrawal date (출금일) */
  withdrawDay: Scalars['String'];
};

/** Service subscription application / Company information (서비스가입신청/사업자정보) */
export type SubscriptionRequestCompany = {
  __typename?: 'SubscriptionRequestCompany';
  /** detailed address (상세주소) */
  addressDetail: AddressDetail;
  /** extended address (확장주소) */
  addressExtend: Scalars['String'];
  /** business registration number (사업자등록번호) */
  bizNumber: Scalars['String'];
  /** type of business (사업자유형) */
  bizType: Scalars['BizTypeScalar'];
  /** fax (팩스) */
  fax?: Maybe<Scalars['String']>;
  /** land number address (지번주소) */
  jibunAddress: Scalars['String'];
  /** Business license file (사업자등록증 파일) */
  license?: Maybe<FileStorage>;
  /** business license file storage serial number (사업자등록증 파일저장일련번호) */
  licenseFileStorageId?: Maybe<Scalars['Int']>;
  /** company name (상호) */
  name: Scalars['String'];
  /** contact phone number (연락전화번호) */
  phone: Scalars['String'];
  /** decrypted corporate registration number / resident registration number (법인등록번호/주민등록번호) */
  residentId?: Maybe<Scalars['String']>;
  /** road name address (도로명주소) */
  roadAddress: Scalars['String'];
  /** postal code (우편번호) */
  zipcode: Scalars['String'];
};

/** Service subscription application / Company information input (서비스가입신청/사업자정보 입력) */
export type SubscriptionRequestCompanyInput = {
  /** detailed address (상세주소) */
  addressDetail: AddressDetailInput;
  /** extended address (확장주소) */
  addressExtend: Scalars['String'];
  /** business registration number (사업자등록번호) */
  bizNumber: Scalars['String'];
  /** type of business (사업자유형) */
  bizType: Scalars['BizTypeScalar'];
  /** fax (팩스) */
  fax?: InputMaybe<Scalars['String']>;
  /** land number address (지번주소) */
  jibunAddress: Scalars['String'];
  /** business license file storage serial number (사업자등록증 파일저장일련번호) */
  licenseFileStorageId?: InputMaybe<Scalars['Int']>;
  /** company name (상호) */
  name: Scalars['String'];
  /** contact phone number (연락전화번호) */
  phone: Scalars['String'];
  /** corporate registration number / resident registration number (법인등록번호/주민등록번호) */
  residentId: Scalars['String'];
  /** road name address (도로명주소) */
  roadAddress: Scalars['String'];
  /** postal code (우편번호) */
  zipcode: Scalars['String'];
};

/** Service subscription application details (서비스가입신청 내용) */
export type SubscriptionRequestContent = {
  __typename?: 'SubscriptionRequestContent';
  /** Accounting service information (회계서비스정보) */
  accounting?: Maybe<SubscriptionRequestAccounting>;
  /** Agreement to the terms and conditions (약관동의) */
  agreements: SubscriptionRequestAgreements;
  /** CMS account information (CMS계좌정보) */
  cmsBank: SubscriptionRequestCmsBank;
  /** Company information (사업자정보) */
  company: SubscriptionRequestCompany;
  /** Extra (기타정보) */
  extra: SubscriptionRequestExtra;
  /** Representative information (대표자정보) */
  president: SubscriptionRequestPresident;
  /** Withholding service information (원천서비스정보) */
  withholding?: Maybe<SubscriptionRequestWithholding>;
};

/** Service subscription application details input (서비스가입신청 내용 입력) */
export type SubscriptionRequestContentInput = {
  /** Accounting service information input (회계서비스정보) */
  accounting?: InputMaybe<SubscriptionRequestAccountingInput>;
  /** Agreement to the terms and conditions input (약관동의) */
  agreements: SubscriptionRequestAgreementsInput;
  /** CMS account information input (CMS계좌정보) */
  cmsBank: SubscriptionRequestCmsBankInput;
  /** Company information input (사업자정보) */
  company: SubscriptionRequestCompanyInput;
  /** Extra input (기타정보) */
  extra: SubscriptionRequestExtraInput;
  /** Representative information input (대표자정보) */
  president: SubscriptionRequestPresidentInput;
  /** Withholding service information input (원천서비스정보) */
  withholding?: InputMaybe<SubscriptionRequestWithholdingInput>;
};

/** Service subscription application / Extra (서비스가입신청/기타) */
export type SubscriptionRequestExtra = {
  __typename?: 'SubscriptionRequestExtra';
  /** forwarding content (전달사항) */
  comment: Scalars['String'];
  /** sales representative serial number (영업자일련번호) */
  salesRepresentativeId: Scalars['Int'];
};

/** Service subscription application / Extra input (서비스가입신청/기타 입력) */
export type SubscriptionRequestExtraInput = {
  /** forwarding content (전달사항) */
  comment: Scalars['String'];
  /** sales representative serial number (영업자일련번호) */
  salesRepresentativeId: Scalars['Int'];
};

/** Service subscription application / Facility business information (서비스가입신청/시설사업정보) */
export type SubscriptionRequestFacilityBusiness = {
  __typename?: 'SubscriptionRequestFacilityBusiness';
  /** the number of quota (정원수/명) */
  capacity: Scalars['Int'];
  /** Type of facility business (시설사업유형) */
  facilityBizType: Scalars['FacilityBizTypeScalar'];
  /** long-term care institution number (장기요양기관번호) */
  longTermCareInstitutionNumber: Scalars['String'];
  /** facility business name (시설사업명) */
  name: Scalars['String'];
  /** Long-term care institution registration certificate file (장기요양기관등록증 파일) */
  registrationCard?: Maybe<FileStorage>;
  /** long-term care institution registration certificate file storage serial number (장기요양기관등록증 파일저장일련번호) */
  registrationCardFileStorageId?: Maybe<Scalars['Int']>;
  /** start year/month / YYYYMM (시작연월) */
  startYearMonth: Scalars['Int'];
};

/** Service subscription application / Facility business information input (서비스가입신청/시설사업정보 입력) */
export type SubscriptionRequestFacilityBusinessInput = {
  /** the number of quota (정원수/명) */
  capacity: Scalars['Int'];
  /** Type of facility business (시설사업유형) */
  facilityBizType: Scalars['FacilityBizTypeScalar'];
  /** long-term care institution number (장기요양기관번호) */
  longTermCareInstitutionNumber: Scalars['String'];
  /** facility business name (시설사업명) */
  name: Scalars['String'];
  /** long-term care institution registration certificate file storage serial number (장기요양기관등록증 파일저장일련번호) */
  registrationCardFileStorageId?: InputMaybe<Scalars['Int']>;
  /** start year/month / YYYYMM (시작연월) */
  startYearMonth: Scalars['Int'];
};

/** Service subscription application change history (서비스가입신청 변경이력) */
export type SubscriptionRequestLog = {
  __typename?: 'SubscriptionRequestLog';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** approval date (승인일자) */
  approvedAt?: Maybe<Scalars['DateScalar']>;
  /** handler of approval (승인처리자) */
  approvedBy?: Maybe<Scalars['String']>;
  /** application code (신청코드) */
  code: Scalars['String'];
  /** company address (주소) */
  companyAddress: Scalars['String'];
  /** business registration number (사업자등록번호) */
  companyBizNumber: Scalars['String'];
  /** company name (상호) */
  companyName: Scalars['String'];
  /** Service subscription application details (서비스가입신청 내용) */
  content: SubscriptionRequestContent;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** memo (메모) */
  memo?: Maybe<Scalars['String']>;
  /** representative anme (대표자 이름) */
  presidentName: Scalars['String'];
  /** examination date (심사중일자) */
  processedAt?: Maybe<Scalars['DateScalar']>;
  /** handler of examination (심사중처리자) */
  processedBy?: Maybe<Scalars['String']>;
  /** reject date (반려일자) */
  rejectedAt?: Maybe<Scalars['DateScalar']>;
  /** handler of rejection (반려처리자) */
  rejectedBy?: Maybe<Scalars['String']>;
  /** remarks (비고) */
  remark: Scalars['String'];
  /** Accounting Service Information Summary (회계서비스정보요약) */
  simpleAccountingInfos?: Maybe<Array<SimpleServiceInfo>>;
  /** Withholding Service Information Summary (원천서비스정보요약) 원천서비스정보요약 */
  simpleWithholdingInfo?: Maybe<SimpleServiceInfo>;
  /** service subscription application status (서비스가입신청상태) */
  status: Scalars['Int'];
  /** application serial number (신청일련번호) */
  subscriptionRequestId: Scalars['Int'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Service subscription application / Representative information (서비스가입신청/대표자정보) */
export type SubscriptionRequestPresident = {
  __typename?: 'SubscriptionRequestPresident';
  /** birthday / YYMMDD (생년월일) */
  birthday: Scalars['String'];
  /** email (이메일) */
  email: Scalars['String'];
  /** mobile phone number (휴대폰번호) */
  mobilePhone: Scalars['String'];
  /** name (성명) */
  name: Scalars['String'];
};

/** Service subscription application / Representative information input (서비스가입신청/대표자정보 입력) */
export type SubscriptionRequestPresidentInput = {
  /** birthday / YYMMDD (생년월일) */
  birthday: Scalars['String'];
  /** email (이메일) */
  email: Scalars['String'];
  /** mobile phone number (휴대폰번호) */
  mobilePhone: Scalars['String'];
  /** name (성명) */
  name: Scalars['String'];
};

/** Service subscription application view (서비스가입신청뷰) */
export type SubscriptionRequestView = {
  __typename?: 'SubscriptionRequestView';
  /** application code (신청코드) */
  code: Scalars['String'];
  /** Sales representative summary information (영업자요약정보) */
  compactSalesRepresentative: CompactSalesRepresentative;
  /** company address (주소) */
  companyAddress: Scalars['String'];
  /** company code (사업자코드) */
  companyCode?: Maybe<Scalars['String']>;
  /** company name (상호) */
  companyName: Scalars['String'];
  /** register date (신청일) */
  createdAt: Scalars['DateScalar'];
  /** application serial number (신청일련번호) */
  id: Scalars['Int'];
  /** representative (대표자) */
  presidentName: Scalars['String'];
  /** Accounting Service Information Summary (회계서비스정보요약) */
  simpleAccountingInfos?: Maybe<Array<SimpleServiceInfo>>;
  /** Withholding Service Information Summary (원천서비스정보요약) 원천서비스정보요약 */
  simpleWithholdingInfo?: Maybe<SimpleServiceInfo>;
  /** service subscription application status (서비스가입신청상태) */
  status: Scalars['Int'];
};

/** Service subscription application view paginated object (서비스가입신청뷰 페이징) */
export type SubscriptionRequestViewPaginatedObject = {
  __typename?: 'SubscriptionRequestViewPaginatedObject';
  /** Service subscription application view list (서비스가입신청뷰 목록) */
  datas: Array<SubscriptionRequestView>;
  /** page number (페이지번호) */
  page: Scalars['Int'];
  /** number of page rows (페이지행수) */
  rows: Scalars['Int'];
  /** total list count (전체목록건수) */
  totalCount: Scalars['Int'];
};

/** Service subscription application view search filter (서비스가입신청뷰 검색 필터) */
export type SubscriptionRequestViewSearchFilter = {
  /** Accounting service subscription status (회계서비스 가입 여부) */
  accounting?: InputMaybe<Scalars['Boolean']>;
  /** company name (상호) */
  companyName?: InputMaybe<Scalars['String']>;
  /** search finish application date / YYYYMMDD (검색 종료 신청일) */
  finishDate?: InputMaybe<Scalars['Int']>;
  /** page number (페이지번호) */
  page?: InputMaybe<Scalars['Int']>;
  /** representative (대표자) */
  presidentName?: InputMaybe<Scalars['String']>;
  /** number of page rows (페이지행수) */
  rows: Scalars['Int'];
  /** sales representative serial number (영업자일련번호) */
  salesRepresentativeId?: InputMaybe<Scalars['Int']>;
  /** search start application date / YYYYMMDD (검색 시작 신청일) */
  startDate?: InputMaybe<Scalars['Int']>;
  /** service subscription application status list (서비스가입신청상태 목록) */
  statuses?: InputMaybe<Array<Scalars['Int']>>;
  /** Withholding service subscription status (원천서비스 가입 여부) */
  withholding?: InputMaybe<Scalars['Boolean']>;
};

/** Service subscription application / Withholding service (서비스가입신청/원천서비스) */
export type SubscriptionRequestWithholding = {
  __typename?: 'SubscriptionRequestWithholding';
  /** number of employees (직원수) */
  capacity: Scalars['Int'];
  /** start year/month / YYYYMM (시작연월) */
  startYearMonth: Scalars['Int'];
  /** Withholding additional service list (원천부가서비스목록) */
  withholdingServiceTypes: Array<Scalars['WithholdingAdditionalServiceTypeScalar']>;
};

/** Service subscription application / Withholding service input (서비스가입신청/원천서비스 입력) */
export type SubscriptionRequestWithholdingInput = {
  /** number of employees (직원수) */
  capacity: Scalars['Int'];
  /** start year/month / YYYYMM (시작연월) */
  startYearMonth: Scalars['Int'];
  /** Withholding additional service list (원천부가서비스목록) */
  withholdingServiceTypes: Array<Scalars['WithholdingAdditionalServiceTypeScalar']>;
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

/** Withholding tax performance report (원천징수이행상황신고서) */
export type TaxWithholdingStatusReport = {
  __typename?: 'TaxWithholdingStatusReport';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** income disposition included (소득처분 포함여부) */
  additionalIncome: Scalars['Boolean'];
  /** status after expiration date (기한후 여부) */
  afterDeadline: Scalars['Boolean'];
  /** business income (사업소득) */
  businessIncome: Scalars['Float'];
  /** Company (사업자) */
  company: Company;
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** daily wage income (일용직근로소득) */
  dailyWageIncome: Scalars['Float'];
  /** Withholding tax performance report detail (원천징수이행상황신고서 상세) */
  detail: TaxWithholdingStatusReportDetail;
  /** withholding tax performance report detail serial number (원천징수이행상황신고서 상세 일련번호) */
  detailId: Scalars['Int'];
  /** extra income (기타소득) */
  extraIncome: Scalars['Float'];
  /** imputed finish year/month [YYYYMM] (귀속종료년월) */
  imputedFinishYearMonth: Scalars['Int'];
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** imputed starting year/month [YYYYMM] (귀속시작년월) */
  imputedStartYearMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** corrected order (수정차수) */
  index: Scalars['Int'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** the amount of tax returned over the next month (차월이월환급세액) */
  nextMonthRefundTaxAmount: Scalars['Int'];
  /** payment finish year/month [YYYYMM] (지급종료년월) */
  paymentFinishYearMonth: Scalars['Int'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment start year/month [YYYYMM] (지급시작년월) */
  paymentStartYearMonth: Scalars['Int'];
  /** payment type (지급유형) */
  paymentType: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** Pre-payment tax statement serial number (기납부세액명세서 일련번호) */
  prePaymentTaxStatementId?: Maybe<Scalars['Int']>;
  /** refund application included (환급신청 포함여부) */
  refund: Scalars['Boolean'];
  /** refund application amount (환급신청액) */
  refundApplicationAmount: Scalars['Int'];
  /** Application for refund of withholding tax amount serial number (원천징수세액환급신청서 일련번호) */
  refundApplicationId?: Maybe<Scalars['Int']>;
  /** report class code (리포트클래스코드) */
  reportClassCode?: Maybe<Scalars['String']>;
  /** withholding tax performance report serial number (원천징수이행상황신고서 일련번호) */
  reportId: Scalars['Int'];
  /** reporting type (신고유형/주기) */
  reportType: Scalars['Int'];
  /** retirement income (퇴직소득) */
  retirementIncome: Scalars['Float'];
  /** work status (업무상태) */
  status: Scalars['ProcessStatusScalar'];
  /** work status change date (업무상태변경일) */
  statusUpdatedAt: Scalars['DateScalar'];
  /** submission date [YYYYMMDD] (제출일) */
  submissionDate: Scalars['Int'];
  /** total amount of tax collected (총징수세액) */
  totalCollectedTaxAmount: Scalars['Int'];
  /** total amount paid (총지급액) */
  totalPayment: Scalars['Float'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** wage income simplified (근로소득/간이) */
  wageIncomeSimplified: Scalars['Float'];
  /** year-end tax adjustment for wage income (근로소득연말정산) */
  yearEndAdjustment: Scalars['Float'];
  /** year-end tax adjustment for mid-term retirement (중도퇴사연말정산) */
  yearEndAdjustmentRetirement: Scalars['Float'];
  /** year-end tax adjustment included (연말정산 포함여부) */
  yearEndTaxAdjustment: Scalars['Boolean'];
};

/** Adjustment of refund tax amount for withholding tax performance report (원천징수이행상황신고서 환급세액조정) */
export type TaxWithholdingStatusReportAdjustmentOfRefundTaxAmount = {
  __typename?: 'TaxWithholdingStatusReportAdjustmentOfRefundTaxAmount';
  /** balance of deduction (차감잔액) */
  deductibleBalance: Scalars['Int'];
  /** balance of deduction / modifications (차감잔액 / 수정) */
  deductibleBalanceModified?: Maybe<Scalars['Int']>;
  /** the amount of tax returned over the next month (차월이월환급세액) */
  nextMonthRefundTaxAmount: Scalars['Int'];
  /** the amount of tax returned over the next month / modifications (차월이월환급세액 / 수정) */
  nextMonthRefundTaxAmountModified?: Maybe<Scalars['Int']>;
  /** preliminary refund application tax amount (기환급신청세액) */
  preRefundApplicationTaxAmount: Scalars['Int'];
  /** preliminary refund application tax amount / modifications (기환급신청세액 / 수정) */
  preRefundApplicationTaxAmountModified?: Maybe<Scalars['Int']>;
  /** tax amount not refunded in the previous month (전월미환급세액) */
  prevMonthNonRefundableTaxAmount: Scalars['Int'];
  /** tax amount not refunded in the previous month / modifications (전월미환급세액 / 수정) */
  prevMonthNonRefundableTaxAmountModified?: Maybe<Scalars['Int']>;
  /** refund application amount (환급신청액) */
  refundApplicationAmount: Scalars['Int'];
  /** refund application amount / modifications (환급신청액 / 수정) */
  refundApplicationAmountModified?: Maybe<Scalars['Int']>;
  /** refund tax amount subject to adjustment (조정대상환급세액) */
  refundTaxSubjectToAdjustment: Scalars['Int'];
  /** refund tax amount subject to adjustment / modifications (조정대상환급세액 / 수정) */
  refundTaxSubjectToAdjustmentModified?: Maybe<Scalars['Int']>;
  /** place of the previous trust property tax refund (당월발생환급세액 신탁재산) */
  thisMonthRefundTaxFiduciaryEstates: Scalars['Int'];
  /** place of the previous trust property tax refund / modifications (당월발생환급세액 신탁재산 / 수정) */
  thisMonthRefundTaxFiduciaryEstatesModified?: Maybe<Scalars['Int']>;
  /** refunded tax amount any of the previous general (당월발생환급세액 일반) */
  thisMonthRefundTaxGeneral: Scalars['Int'];
  /** refunded tax amount any of the previous general / modifications (당월발생환급세액 일반 / 수정) */
  thisMonthRefundTaxGeneralModified?: Maybe<Scalars['Int']>;
  /** refunded tax amount refunded tax amount other, place of the previous financial companies, etc. (당월발생환급세액 그밖의환급세액,금융회사등) */
  thisMonthRefundTaxOtherFinancialCompany: Scalars['Int'];
  /** refunded tax amount refunded tax amount other, place of the previous financial companies, etc. / modifications (당월발생환급세액 그밖의환급세액,금융회사등 / 수정) */
  thisMonthRefundTaxOtherFinancialCompanyModified?: Maybe<Scalars['Int']>;
  /** refunded tax amount refunded tax amount other, place the merger, etc. (당월발생환급세액 그밖의환급세액,합병등) */
  thisMonthRefundTaxOtherMerge: Scalars['Int'];
  /** refunded tax amount refunded tax amount other, place the merger, etc. / modifications (당월발생환급세액 그밖의환급세액,합병등 / 수정) */
  thisMonthRefundTaxOtherMergeModified?: Maybe<Scalars['Int']>;
  /** adjusted refund tax amount for the month (당월조정환급세액계) */
  thisMonthTotalAdjustedRefundTaxAmount: Scalars['Int'];
  /** adjusted refund tax amount for the month / modifications (당월조정환급세액계 / 수정) */
  thisMonthTotalAdjustedRefundTaxAmountModified?: Maybe<Scalars['Int']>;
};

/** Adjustment of refund tax amount for withholding tax performance report input (원천징수이행상황신고서 환급세액조정 입력) */
export type TaxWithholdingStatusReportAdjustmentOfRefundTaxAmountInput = {
  /** balance of deduction (차감잔액) */
  deductibleBalance: Scalars['Int'];
  /** balance of deduction / modifications (차감잔액 / 수정) */
  deductibleBalanceModified?: InputMaybe<Scalars['Int']>;
  /** the amount of tax returned over the next month (차월이월환급세액) */
  nextMonthRefundTaxAmount: Scalars['Int'];
  /** the amount of tax returned over the next month / modifications (차월이월환급세액 / 수정) */
  nextMonthRefundTaxAmountModified?: InputMaybe<Scalars['Int']>;
  /** preliminary refund application tax amount (기환급신청세액) */
  preRefundApplicationTaxAmount: Scalars['Int'];
  /** preliminary refund application tax amount / modifications (기환급신청세액 / 수정) */
  preRefundApplicationTaxAmountModified?: InputMaybe<Scalars['Int']>;
  /** tax amount not refunded in the previous month (전월미환급세액) */
  prevMonthNonRefundableTaxAmount: Scalars['Int'];
  /** tax amount not refunded in the previous month / modifications (전월미환급세액 / 수정) */
  prevMonthNonRefundableTaxAmountModified?: InputMaybe<Scalars['Int']>;
  /** refund application amount (환급신청액) */
  refundApplicationAmount: Scalars['Int'];
  /** refund application amount / modifications (환급신청액 / 수정) */
  refundApplicationAmountModified?: InputMaybe<Scalars['Int']>;
  /** refund tax amount subject to adjustment (조정대상환급세액) */
  refundTaxSubjectToAdjustment: Scalars['Int'];
  /** refund tax amount subject to adjustment / modifications (조정대상환급세액 / 수정) */
  refundTaxSubjectToAdjustmentModified?: InputMaybe<Scalars['Int']>;
  /** place of the previous trust property tax refund (당월발생환급세액 신탁재산) */
  thisMonthRefundTaxFiduciaryEstates: Scalars['Int'];
  /** place of the previous trust property tax refund / modifications (당월발생환급세액 신탁재산 / 수정) */
  thisMonthRefundTaxFiduciaryEstatesModified?: InputMaybe<Scalars['Int']>;
  /** refunded tax amount any of the previous general (당월발생환급세액 일반) */
  thisMonthRefundTaxGeneral: Scalars['Int'];
  /** refunded tax amount any of the previous general / modifications (당월발생환급세액 일반 / 수정) */
  thisMonthRefundTaxGeneralModified?: InputMaybe<Scalars['Int']>;
  /** refunded tax amount refunded tax amount other, place of the previous financial companies, etc. (당월발생환급세액 그밖의환급세액,금융회사등) */
  thisMonthRefundTaxOtherFinancialCompany: Scalars['Int'];
  /** refunded tax amount refunded tax amount other, place of the previous financial companies, etc. / modifications (당월발생환급세액 그밖의환급세액,금융회사등 / 수정) */
  thisMonthRefundTaxOtherFinancialCompanyModified?: InputMaybe<Scalars['Int']>;
  /** refunded tax amount refunded tax amount other, place the merger, etc. (당월발생환급세액 그밖의환급세액,합병등) */
  thisMonthRefundTaxOtherMerge: Scalars['Int'];
  /** refunded tax amount refunded tax amount other, place the merger, etc. / modifications (당월발생환급세액 그밖의환급세액,합병등 / 수정) */
  thisMonthRefundTaxOtherMergeModified?: InputMaybe<Scalars['Int']>;
  /** adjusted refund tax amount for the month (당월조정환급세액계) */
  thisMonthTotalAdjustedRefundTaxAmount: Scalars['Int'];
  /** adjusted refund tax amount for the month / modifications (당월조정환급세액계 / 수정) */
  thisMonthTotalAdjustedRefundTaxAmountModified?: InputMaybe<Scalars['Int']>;
};

/** Withholding tax performance report detail (원천징수이행상황신고서 상세) */
export type TaxWithholdingStatusReportDetail = {
  __typename?: 'TaxWithholdingStatusReportDetail';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** Adjustment of refund tax amount for withholding tax performance report (원천징수이행상황신고서 환급세액조정) */
  adjustmentOfRefundTaxAmount: TaxWithholdingStatusReportAdjustmentOfRefundTaxAmount;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** Withholding tax performance report header (원천징수이행상황신고서 헤더) */
  header: TaxWithholdingStatusReportHeader;
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** List of statement of withholding performance status report and amount of tax paid (원천징수이행상황신고서 명세 및 납부세액 목록) */
  statementAndAmountOfTaxPaids: Array<TaxWithholdingStatusReportStatementAndAmountOfTaxPaid>;
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Withholding tax performance report form input (원천징수이행상황신고서 서식 입력) */
export type TaxWithholdingStatusReportFormInput = {
  /** date of create / YYYYMMDD (작성일) */
  createDate?: InputMaybe<Scalars['Int']>;
  /** Withholding tax performance report form type (원천징수이행상황신고서 서식 유형) : 원천징수이행상황신고서 - 1, 소득세납부서 - 2, 지방소득세납부서 - 3 */
  type: Scalars['Int'];
};

/** Withholding tax performance report header (원천징수이행상황신고서 헤더) */
export type TaxWithholdingStatusReportHeader = {
  __typename?: 'TaxWithholdingStatusReportHeader';
  /** refund account number (환급계좌번호) */
  nationalTaxRefundBankAccountNumber?: Maybe<Scalars['String']>;
  /** a place of deposit (예입처) */
  nationalTaxRefundBankCode?: Maybe<Scalars['String']>;
  /** tax agent business registration number (세무대리인 사업자등록번호) */
  taxAgentBizNumber?: Maybe<Scalars['String']>;
  /** name of tax agent (세무대리인 성명) */
  taxAgentName?: Maybe<Scalars['String']>;
  /** tax agent phone number (세무대리인 전화번호) */
  taxAgentTelephone?: Maybe<Scalars['String']>;
  /** location of business establishment (사업장소재지) */
  withholdingDutyAddress: Scalars['String'];
  /** business registration number (사업자등록번호) */
  withholdingDutyBizNumber: Scalars['String'];
  /** whether to pay in batches (일괄납부여부) */
  withholdingDutyCollectivePayment: Scalars['Boolean'];
  /** e-mail address (전자우편주소) */
  withholdingDutyEmail: Scalars['String'];
  /** corporate name (법인명/상호) */
  withholdingDutyName: Scalars['String'];
  /** representative name (대표자명) */
  withholdingDutyPresidentName: Scalars['String'];
  /** tax status per business unit (사업자단위과세여부) */
  withholdingDutyTaxForEachBusiness: Scalars['Boolean'];
  /** phone number (전화번호) */
  withholdingDutyTelephone: Scalars['String'];
};

/** Withholding tax performance report header input (원천징수이행상황신고서 헤더 입력) */
export type TaxWithholdingStatusReportHeaderInput = {
  /** refund account number (환급계좌번호) */
  nationalTaxRefundBankAccountNumber?: InputMaybe<Scalars['String']>;
  /** a place of deposit (예입처) */
  nationalTaxRefundBankCode?: InputMaybe<Scalars['String']>;
  /** tax agent business registration number (세무대리인 사업자등록번호) */
  taxAgentBizNumber?: InputMaybe<Scalars['String']>;
  /** name of tax agent (세무대리인 성명) */
  taxAgentName?: InputMaybe<Scalars['String']>;
  /** tax agent phone number (세무대리인 전화번호) */
  taxAgentTelephone?: InputMaybe<Scalars['String']>;
  /** location of business establishment (사업장소재지) */
  withholdingDutyAddress: Scalars['String'];
  /** business registration number (사업자등록번호) */
  withholdingDutyBizNumber: Scalars['String'];
  /** whether to pay in batches (일괄납부여부) */
  withholdingDutyCollectivePayment: Scalars['Boolean'];
  /** e-mail address (전자우편주소) */
  withholdingDutyEmail: Scalars['String'];
  /** corporate name (법인명/상호) */
  withholdingDutyName: Scalars['String'];
  /** representative name (대표자명) */
  withholdingDutyPresidentName: Scalars['String'];
  /** tax status per business unit (사업자단위과세여부) */
  withholdingDutyTaxForEachBusiness: Scalars['Boolean'];
  /** phone number (전화번호) */
  withholdingDutyTelephone: Scalars['String'];
};

/** Withholding tax performance report input (원천징수이행상황신고서 입력) */
export type TaxWithholdingStatusReportInput = {
  /** income disposition included (소득처분 포함여부) */
  additionalIncome: Scalars['Boolean'];
  /** Adjustment of refund tax amount for withholding tax performance report input (원천징수이행상황신고서 환급세액조정 입력) */
  adjustmentOfRefundTaxAmount: TaxWithholdingStatusReportAdjustmentOfRefundTaxAmountInput;
  /** status after expiration date (기한후 여부) */
  afterDeadline: Scalars['Boolean'];
  /** Withholding tax performance report header input (원천징수이행상황신고서 헤더 입력) */
  header: TaxWithholdingStatusReportHeaderInput;
  /** payment type (지급유형) */
  paymentType: Scalars['Int'];
  /** refund application included (환급신청 포함여부) */
  refund: Scalars['Boolean'];
  /** report class code (리포트클래스코드) */
  reportClassCode?: InputMaybe<Scalars['String']>;
  /** Details of the withholding tax performance report and the amount list of tax paid input (원천징수이행상황신고서 명세 및 납부세액 목록 입력) */
  statementAndAmountOfTaxPaids: Array<TaxWithholdingStatusReportStatementAndAmountOfTaxPaidInput>;
  /** submission date / YYYYMMDD (제출일) */
  submissionDate: Scalars['Int'];
  /** year-end tax adjustment included (연말정산 포함여부) */
  yearEndTaxAdjustment: Scalars['Boolean'];
};

/** Withholding tax performance report key input (원천징수이행상황신고서 키 입력) */
export type TaxWithholdingStatusReportKeyInput = {
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** corrected order (수정차수) */
  index: Scalars['Int'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** reporting type (신고유형) */
  reportType: Scalars['Int'];
};

/** Withholding tax performance report change history (원천징수이행상황신고서 변경이력) */
export type TaxWithholdingStatusReportLog = {
  __typename?: 'TaxWithholdingStatusReportLog';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** income disposition included (소득처분 포함여부) */
  additionalIncome: Scalars['Boolean'];
  /** status after expiration date (기한후 여부) */
  afterDeadline: Scalars['Boolean'];
  /** business income (사업소득) */
  businessIncome: Scalars['Float'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** daily wage income (일용직근로소득) */
  dailyWageIncome: Scalars['Float'];
  /** withholding tax performance report detail serial number (원천징수이행상황신고서 상세 일련번호) */
  detailId: Scalars['Int'];
  /** extra income (기타소득) */
  extraIncome: Scalars['Float'];
  /** imputed finish year/month (귀속종료년월) */
  imputedFinishYearMonth: Scalars['Int'];
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** imputed starting year/month (귀속시작년월) */
  imputedStartYearMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** corrected order (수정차수) */
  index: Scalars['Int'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** the amount of tax returned over the next month (차월이월환급세액) */
  nextMonthRefundTaxAmount: Scalars['Int'];
  /** payment finish year/month (지급종료년월) */
  paymentFinishYearMonth: Scalars['Int'];
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment start year/month (지급시작년월) */
  paymentStartYearMonth: Scalars['Int'];
  /** payment type (지급유형) */
  paymentType: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** Pre-payment tax statement serial number (기납부세액명세서 일련번호) */
  prePaymentTaxStatementId?: Maybe<Scalars['Int']>;
  /** refund application included (환급신청 포함여부) */
  refund: Scalars['Boolean'];
  /** refund application amount (환급신청액) */
  refundApplicationAmount: Scalars['Int'];
  /** Application for refund of withholding tax amount serial number (원천징수세액환급신청서 일련번호) */
  refundApplicationId?: Maybe<Scalars['Int']>;
  /** remarks (비고) */
  remark: Scalars['String'];
  /** report class code (리포트클래스코드) */
  reportClassCode?: Maybe<Scalars['String']>;
  /** withholding tax performance report serial number (원천징수이행상황신고서 일련번호) */
  reportId: Scalars['Int'];
  /** reporting type (신고유형/주기) */
  reportType: Scalars['Int'];
  /** retirement income (퇴직소득) */
  retirementIncome: Scalars['Float'];
  /** work status (업무상태) */
  status: Scalars['ProcessStatusScalar'];
  /** work status change date (업무상태변경일) */
  statusUpdatedAt: Scalars['DateScalar'];
  /** submission date [YYYYMMDD] (제출일) */
  submissionDate: Scalars['Int'];
  /** total amount of tax collected (총징수세액) */
  totalCollectedTaxAmount: Scalars['Int'];
  /** total amount paid (총지급액) */
  totalPayment: Scalars['Float'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** wage income simplified (근로소득/간이) */
  wageIncomeSimplified: Scalars['Float'];
  /** year-end tax adjustment for wage income (근로소득연말정산) */
  yearEndAdjustment: Scalars['Float'];
  /** year-end tax adjustment for mid-term retirement (중도퇴사연말정산) */
  yearEndAdjustmentRetirement: Scalars['Float'];
  /** year-end tax adjustment included (연말정산 포함여부) */
  yearEndTaxAdjustment: Scalars['Boolean'];
};

/** Withholding tax performance report paginated object (원천징수이행상황신고서 페이징) */
export type TaxWithholdingStatusReportPaginatedObject = {
  __typename?: 'TaxWithholdingStatusReportPaginatedObject';
  /** Withholding tax performance report list (원천징수이행상황신고서 목록) */
  datas: Array<TaxWithholdingStatusReport>;
  /** page number (페이지번호) */
  page: Scalars['Int'];
  /** number of page rows (페이지행수) */
  rows: Scalars['Int'];
  /** total list count (전체목록건수) */
  totalCount: Scalars['Int'];
};

/** Withholding performance report search filter (원천징수이행상황신고서 검색 필터) */
export type TaxWithholdingStatusReportSearchFilter = {
  /** status after expiration date (기한후 여부) */
  afterDeadline?: InputMaybe<Scalars['Boolean']>;
  /** company code (사업자코드) */
  companyCode?: InputMaybe<Scalars['String']>;
  /** company name (상호) */
  companyName?: InputMaybe<Scalars['String']>;
  /** exclude termination (해지제외) */
  excludeCancel: Scalars['Boolean'];
  /** user serial number of the manager in charge (담당매니저 회원일련번호) */
  manageUserId?: InputMaybe<Scalars['Int']>;
  /** page number (페이지번호) */
  page?: InputMaybe<Scalars['Int']>;
  /** payment year/month [YYYYMM] (지급년월) */
  paymentYearMonth: Scalars['Int'];
  /** regular report (정기신고) */
  regular?: InputMaybe<Scalars['Boolean']>;
  /** reporting type (신고유형/주기) */
  reportType?: InputMaybe<Scalars['Int']>;
  /** revised report (수정신고) */
  revised?: InputMaybe<Scalars['Boolean']>;
  /** number of page rows (페이지행수) */
  rows: Scalars['Int'];
  /** sales representative serial number (영업자일련번호) */
  salesRepresentativeId?: InputMaybe<Scalars['Int']>;
  /** Work process status list (업무상태 목록) */
  statuses?: InputMaybe<Array<Scalars['ProcessStatusScalar']>>;
};

/** Statement of withholding performance status report and amount of tax paid (원천징수이행상황신고서 명세 및 납부세액) */
export type TaxWithholdingStatusReportStatementAndAmountOfTaxPaid = {
  __typename?: 'TaxWithholdingStatusReportStatementAndAmountOfTaxPaid';
  /** code (코드) */
  code: Scalars['String'];
  /** collected additional tax (징수 가산세) */
  collectedExtraTax?: Maybe<Scalars['Int']>;
  /** collected additional tax / modifications (징수 가산세 / 수정) */
  collectedExtraTaxModified?: Maybe<Scalars['Int']>;
  /** collected income tax (징수 소득세) */
  collectedIncomeTax: Scalars['Int'];
  /** collected income tax / modifications (징수 소득세 / 수정) */
  collectedIncomeTaxModified?: Maybe<Scalars['Int']>;
  /** collected rural special tax (징수 농어촌특별세) */
  collectedRuralSpecialTax?: Maybe<Scalars['Int']>;
  /** collected rural special tax / modifications (징수 농어촌특별세 / 수정) */
  collectedRuralSpecialTaxModified?: Maybe<Scalars['Int']>;
  /** income tax paid (납부 소득세) */
  incomeTaxPaid?: Maybe<Scalars['Int']>;
  /** income tax paid / modifications (납부 소득세 / 수정) */
  incomeTaxPaidModified?: Maybe<Scalars['Int']>;
  /** number of people to pay income (소득지급 인원) */
  numberOfPeople: Scalars['Int'];
  /** number of people to pay income / modifications (소득지급 인원 / 수정) */
  numberOfPeopleModified?: Maybe<Scalars['Int']>;
  /** rural special tax paid (납부 농어촌특별세) */
  ruralSpecialTaxPaid?: Maybe<Scalars['Int']>;
  /** rural special tax paid / modifications (납부 농어촌특별세 / 수정) */
  ruralSpecialTaxPaidModified?: Maybe<Scalars['Int']>;
  /** adjusted refund tax amount for the current month (당월조정환급세액) */
  thisMonthAdjustedRefundTaxAmount?: Maybe<Scalars['Int']>;
  /** adjusted refund tax amount for the current month / modifications (당월조정환급세액 / 수정) */
  thisMonthAdjustedRefundTaxAmountModified?: Maybe<Scalars['Int']>;
  /** total income payments (소득지급 총지급액) */
  totalPayment: Scalars['Float'];
  /** total income payments / modifications (소득지급 총지급액 / 수정) */
  totalPaymentModified?: Maybe<Scalars['Float']>;
};

/** Statement of withholding performance status report and amount of tax paid input (원천징수이행상황신고서 명세 및 납부세액 입력) */
export type TaxWithholdingStatusReportStatementAndAmountOfTaxPaidInput = {
  /** code (코드) */
  code: Scalars['String'];
  /** collected additional tax (징수 가산세) */
  collectedExtraTax?: InputMaybe<Scalars['Int']>;
  /** collected additional tax / modifications (징수 가산세 / 수정) */
  collectedExtraTaxModified?: InputMaybe<Scalars['Int']>;
  /** collected income tax (징수 소득세) */
  collectedIncomeTax: Scalars['Int'];
  /** collected income tax / modifications (징수 소득세 / 수정) */
  collectedIncomeTaxModified?: InputMaybe<Scalars['Int']>;
  /** collected rural special tax (징수 농어촌특별세) */
  collectedRuralSpecialTax?: InputMaybe<Scalars['Int']>;
  /** collected rural special tax / modifications (징수 농어촌특별세 / 수정) */
  collectedRuralSpecialTaxModified?: InputMaybe<Scalars['Int']>;
  /** income tax paid (납부 소득세) */
  incomeTaxPaid?: InputMaybe<Scalars['Int']>;
  /** income tax paid / modifications (납부 소득세 / 수정) */
  incomeTaxPaidModified?: InputMaybe<Scalars['Int']>;
  /** number of people to pay income (소득지급 인원) */
  numberOfPeople: Scalars['Int'];
  /** number of people to pay income / modifications (소득지급 인원 / 수정) */
  numberOfPeopleModified?: InputMaybe<Scalars['Int']>;
  /** rural special tax paid (납부 농어촌특별세) */
  ruralSpecialTaxPaid?: InputMaybe<Scalars['Int']>;
  /** rural special tax paid / modifications (납부 농어촌특별세 / 수정) */
  ruralSpecialTaxPaidModified?: InputMaybe<Scalars['Int']>;
  /** adjusted refund tax amount for the current month (당월조정환급세액) */
  thisMonthAdjustedRefundTaxAmount?: InputMaybe<Scalars['Int']>;
  /** adjusted refund tax amount for the current month / modifications (당월조정환급세액 / 수정) */
  thisMonthAdjustedRefundTaxAmountModified?: InputMaybe<Scalars['Int']>;
  /** total income payments (소득지급 총지급액) */
  totalPayment: Scalars['Float'];
  /** total income payments / modifications (소득지급 총지급액 / 수정) */
  totalPaymentModified?: InputMaybe<Scalars['Float']>;
};

/** User (회원) */
export type User = {
  __typename?: 'User';
  /** accounting role (회계업무역할) */
  accountingRole?: Maybe<Scalars['Boolean']>;
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** email (이메일) */
  email: Scalars['String'];
  /** Company / Accounting / Facility business list (사업자/회계/시설사업 목록) */
  facilityBusinesses: Array<FacilityBusiness>;
  /** code of the organization (소속코드) */
  groupCode?: Maybe<Scalars['String']>;
  /** serial number of the organization (소속일련번호) */
  groupId?: Maybe<Scalars['Int']>;
  /** name of the organization (소속명) */
  groupName?: Maybe<Scalars['String']>;
  /** user serial number (회원일련번호) */
  id: Scalars['Int'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** manager grade / Top manager: 1, Middle manager: 2, Responsible manager: 3 (매니저등급 / 최고매니저:1, 중간매니저:2, 담당매니저:3) */
  managerGrade?: Maybe<Scalars['Int']>;
  /** mobile phone number (휴대폰) */
  mobilePhone: Scalars['String'];
  /** name (이름) */
  name: Scalars['String'];
  /** representative status (대표자여부) */
  president: Scalars['Boolean'];
  /** Screen role group list (화면역할그룹 목록) */
  screenRoleGroups: Array<ScreenRoleGroup>;
  /** user type (사용자유형) */
  type: Scalars['String'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** login ID (로그인아이디) */
  username: Scalars['String'];
  /** withholding role (원천업무역할) */
  withholdingRole?: Maybe<Scalars['Boolean']>;
};

/** User generation input (회원생성 입력) */
export type UserCreateInput = {
  /** email (이메일) */
  email: Scalars['String'];
  /** serial number of the organization (소속일련번호) */
  groupId: Scalars['Int'];
  /** manager grade / Top manager: 1, Middle manager: 2, Responsible manager: 3 (매니저등급 / 최고매니저:1, 중간매니저:2, 담당매니저:3) */
  managerGrade?: InputMaybe<Scalars['Int']>;
  /** mobile phone number (휴대폰) */
  mobilePhone: Scalars['String'];
  /** name (이름) */
  name: Scalars['String'];
  /** screen role group code list (화면역할그룹코드 목록) */
  screenRoleGroupIds: Array<Scalars['String']>;
  /** user type (사용자 유형) */
  type: Scalars['String'];
  /** login ID (로그인아이디) */
  username: Scalars['String'];
};

/** Organization of user (회원의 소속) */
export type UserGroup = {
  __typename?: 'UserGroup';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** code of the organization (소속코드) */
  groupCode: Scalars['String'];
  /** serial number of the organization (소속일련번호) */
  groupId: Scalars['Int'];
  /** name of the organization (소속명) */
  groupName: Scalars['String'];
};

/** User change history (회원 변경이력) */
export type UserLog = {
  __typename?: 'UserLog';
  /** accounting role (회계업무역할) */
  accountingRole?: Maybe<Scalars['Boolean']>;
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** email (이메일) */
  email: Scalars['String'];
  /** accounting facility business list (회계시설사업목록) */
  facilityBusinesses?: Maybe<Scalars['String']>;
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** manager grade / Top manager: 1, Middle manager: 2, Responsible manager: 3 (매니저등급 / 최고매니저:1, 중간매니저:2, 담당매니저:3) */
  managerGrade?: Maybe<Scalars['Int']>;
  /** mobile phone number (휴대폰) */
  mobilePhone: Scalars['String'];
  /** name (이름) */
  name: Scalars['String'];
  /** representative status (대표자여부) */
  president: Scalars['Boolean'];
  /** remarks (비고) */
  remark: Scalars['String'];
  /** screen fole group list (화면역할그룹목록) */
  screenRoleGroups: Scalars['String'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** user serial number (회원일련번호) */
  userId: Scalars['Int'];
  /** login ID (로그인아이디) */
  username: Scalars['String'];
  /** withholding role (원천업무역할) */
  withholdingRole?: Maybe<Scalars['Boolean']>;
};

/** User correction input (회원수정 입력) */
export type UserUpdateInput = {
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** email (이메일) */
  email: Scalars['String'];
  /** mobile phone number (휴대폰) */
  mobilePhone: Scalars['String'];
  /** name (이름) */
  name: Scalars['String'];
  /** screen role group code list (화면역할그룹코드 목록) */
  screenRoleGroupIds: Array<Scalars['String']>;
};

/** User view (회원뷰) */
export type UserView = {
  __typename?: 'UserView';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** code of the organization (소속코드) */
  groupCode: Scalars['String'];
  /** serial number of the organization (소속일련번호) */
  groupId: Scalars['Int'];
  /** name of the organization (소속명) */
  groupName: Scalars['String'];
  /** user serial number (회원일련번호) */
  id: Scalars['Int'];
  /** manager grade / Top manager: 1, Middle manager: 2, Responsible manager: 3 (매니저등급 / 최고매니저:1, 중간매니저:2, 담당매니저:3) */
  managerGrade?: Maybe<Scalars['Int']>;
  /** mobile phone number (휴대폰) */
  mobilePhone: Scalars['String'];
  /** name (이름) */
  name: Scalars['String'];
  /** user type (사용자유형) */
  type: Scalars['String'];
  /** login ID (로그인아이디) */
  username: Scalars['String'];
};

/** User view paginated object (회원뷰 페이징) */
export type UserViewPaginatedObject = {
  __typename?: 'UserViewPaginatedObject';
  /** User view list (회원뷰 목록) */
  datas: Array<UserView>;
  /** page number (페이지번호) */
  page: Scalars['Int'];
  /** number of page rows (페이지행수) */
  rows: Scalars['Int'];
  /** total list count (전체목록건수) */
  totalCount: Scalars['Int'];
};

/** User view search filter (회원뷰 검색 필터) */
export type UserViewSearchFilter = {
  /** activation status (활성여부) */
  active?: InputMaybe<Scalars['Boolean']>;
  /** code of the organization (소속코드) */
  groupCode?: InputMaybe<Scalars['String']>;
  /** name of the organization (소속명) */
  groupName?: InputMaybe<Scalars['String']>;
  /** name (이름) */
  name?: InputMaybe<Scalars['String']>;
  /** page number (페이지번호) */
  page?: InputMaybe<Scalars['Int']>;
  /** number of page rows (페이지행수) */
  rows: Scalars['Int'];
  /** user type (사용자유형) */
  type: Scalars['String'];
  /** login ID (로그인아이디) */
  username?: InputMaybe<Scalars['String']>;
};

/** Withholding config (원천설정) */
export type WithholdingConfig = {
  __typename?: 'WithholdingConfig';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** collective payment (일괄납부) */
  collectivePayment: Scalars['Boolean'];
  /** Company address information (사업자주소정보) */
  companyAddressInfo: CompanyAddressInfo;
  /** competent tax office code (관할세무서코드) */
  competentTaxOfficeCode?: Maybe<Scalars['String']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** insurance premium support usage status (두루누리사용여부) */
  insuranceSupport: Scalars['Boolean'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** a place of local income tax (지방소득납세지) */
  localIncomeTaxArea?: Maybe<Scalars['String']>;
  /** salary payment date (급여지급일자) */
  paymentDay?: Maybe<Scalars['Int']>;
  /** salary payment type (급여지급형태) */
  paymentType: Scalars['Int'];
  /** salary report type (급여신고형태) */
  reportType: Scalars['Int'];
  /** tax status per business unit (사업자단위 과세여부) */
  taxForEachBusiness: Scalars['Boolean'];
  /** Undeclared income status (신고 안 된 소득유무) */
  undeclaredIncomeStatus: Scalars['Boolean'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Withholding config deduction item (원천설정 공제항목) */
export type WithholdingConfigDeductionItem = {
  __typename?: 'WithholdingConfigDeductionItem';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** deduction item code (공제항목코드) */
  deductionItemCode: Scalars['Int'];
  /** calculation method (산출방법) */
  formula?: Maybe<Scalars['String']>;
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** item code (항목코드) */
  itemCode: Scalars['Int'];
  /** item name (항목명) */
  name: Scalars['String'];
  /** fixed status (고정여부) */
  static: Scalars['Boolean'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** use status (사용여부) */
  use: Scalars['Boolean'];
};

/** Withholding config deduction item change history (원천설정 공제항목 변경이력) */
export type WithholdingConfigDeductionItemLog = {
  __typename?: 'WithholdingConfigDeductionItemLog';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** deduction item code (공제항목코드) */
  deductionItemCode: Scalars['Int'];
  /** calculation method (산출방법) */
  formula?: Maybe<Scalars['String']>;
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** item code (항목코드) */
  itemCode: Scalars['Int'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** item name (항목명) */
  name: Scalars['String'];
  /** remarks (비고) */
  remark: Scalars['String'];
  /** fixed status (고정여부) */
  static: Scalars['Boolean'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** use status (사용여부) */
  use: Scalars['Boolean'];
};

/** Withholding config deduction item correction input (원천설정 공제항목수정 입력) */
export type WithholdingConfigDeductionItemUpdateInput = {
  /** calculation method (산출방법) */
  formula?: InputMaybe<Scalars['String']>;
};

/** Withholding config input (원천설정 입력) */
export type WithholdingConfigInput = {
  /** collective payment (일괄납부) */
  collectivePayment: Scalars['Boolean'];
  /** competent tax office code (관할세무서코드) */
  competentTaxOfficeCode?: InputMaybe<Scalars['String']>;
  /** insurance premium support usage status (두루누리사용여부) */
  insuranceSupport: Scalars['Boolean'];
  /** a place of local income tax (지방소득납세지) */
  localIncomeTaxArea?: InputMaybe<Scalars['String']>;
  /** salary payment date (급여지급일자) */
  paymentDay?: InputMaybe<Scalars['Int']>;
  /** salary payment type (급여지급형태) */
  paymentType: Scalars['Int'];
  /** salary report type (급여신고형태) */
  reportType: Scalars['Int'];
  /** tax status per business unit (사업자단위 과세여부) */
  taxForEachBusiness: Scalars['Boolean'];
};

/** Withholding config change history (원천설정 변경이력) */
export type WithholdingConfigLog = {
  __typename?: 'WithholdingConfigLog';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** collective payment (일괄납부) */
  collectivePayment: Scalars['Boolean'];
  /** competent tax office code (관할세무서코드) */
  competentTaxOfficeCode?: Maybe<Scalars['String']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** insurance premium support usage status (두루누리사용여부) */
  insuranceSupport: Scalars['Boolean'];
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** a place of local income tax (지방소득납세지) */
  localIncomeTaxArea?: Maybe<Scalars['String']>;
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** salary payment date (급여지급일자) */
  paymentDay?: Maybe<Scalars['Int']>;
  /** salary payment type (급여지급형태) */
  paymentType: Scalars['Int'];
  /** remarks (비고) */
  remark: Scalars['String'];
  /** salary report type (급여신고형태) */
  reportType: Scalars['Int'];
  /** tax status per business unit (사업자단위 과세여부) */
  taxForEachBusiness: Scalars['Boolean'];
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
};

/** Withholding config pay item (원천설정 소득항목) */
export type WithholdingConfigPayItem = {
  __typename?: 'WithholdingConfigPayItem';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** annual limit (연간한도) */
  annualLimit?: Maybe<Scalars['Int']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** editable status (수정가능 여부) */
  editable: Scalars['Boolean'];
  /** calculation method (산출방법) */
  formula?: Maybe<Scalars['String']>;
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** item code (항목코드) */
  itemCode: Scalars['Int'];
  /** monthly limit (월간한도) */
  monthlyLimit?: Maybe<Scalars['Int']>;
  /** item name (항목명) */
  name: Scalars['String'];
  /** display order (표시순서) */
  sort: Scalars['Int'];
  /** tax status (과세여부) */
  tax: Scalars['Boolean'];
  /** submission of tax exemption report (비과세신고제출여부) */
  taxFreeIncludeSubmission?: Maybe<Scalars['Boolean']>;
  /** taxable pay item code (과세소득항목코드) */
  taxPayItemCode?: Maybe<Scalars['Int']>;
  /** taxable pay item name (과세소득항목명) */
  taxPayItemName?: Maybe<Scalars['String']>;
  /** tax-free pay item code (비과세소득항목코드) */
  taxfreePayItemCode?: Maybe<Scalars['String']>;
  /** tax-free pay item name (비과세소득항목명) */
  taxfreePayItemName?: Maybe<Scalars['String']>;
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** use status (사용여부) */
  use: Scalars['Boolean'];
};

/** Withholding config pay item generation input (원천설정 소득항목생성 입력) */
export type WithholdingConfigPayItemCreateInput = {
  /** annual limit (연간한도) */
  annualLimit?: InputMaybe<Scalars['Int']>;
  /** calculation method (산출방법) */
  formula?: InputMaybe<Scalars['String']>;
  /** item code (항목코드) */
  itemCode: Scalars['Int'];
  /** monthly limit (월간한도) */
  monthlyLimit?: InputMaybe<Scalars['Int']>;
  /** item name (항목명) */
  name: Scalars['String'];
  /** display order (표시순서) */
  sort: Scalars['Float'];
  /** tax status (과세여부) */
  tax: Scalars['Boolean'];
  /** submission of tax exemption report (비과세신고제출여부) */
  taxFreeIncludeSubmission?: InputMaybe<Scalars['Boolean']>;
  /** taxable pay item code (과세소득항목코드) */
  taxPayItemCode?: InputMaybe<Scalars['Int']>;
  /** taxable pay item name (과세소득항목명) */
  taxPayItemName?: InputMaybe<Scalars['String']>;
  /** tax-free pay item code (비과세소득항목코드) */
  taxfreePayItemCode?: InputMaybe<Scalars['String']>;
  /** tax-free pay item name (비과세소득항목명) */
  taxfreePayItemName?: InputMaybe<Scalars['String']>;
  /** use status (사용여부) */
  use: Scalars['Boolean'];
};

/** Withholding config pay item change history (원천설정 소득항목 변경이력) */
export type WithholdingConfigPayItemLog = {
  __typename?: 'WithholdingConfigPayItemLog';
  /** activation status (활성여부) */
  active: Scalars['Boolean'];
  /** annual limit (연간한도) */
  annualLimit?: Maybe<Scalars['Int']>;
  /** generation date (생성일) */
  createdAt: Scalars['DateScalar'];
  /** generators (생성자) */
  createdBy: Scalars['String'];
  /** calculation method (산출방법) */
  formula?: Maybe<Scalars['String']>;
  /** ip address (IP주소) */
  ip: Scalars['String'];
  /** item code (항목코드) */
  itemCode: Scalars['Int'];
  /** recorded date (기록일) */
  loggedAt: Scalars['DateScalar'];
  /** monthly limit (월간한도) */
  monthlyLimit?: Maybe<Scalars['Int']>;
  /** item name (항목명) */
  name: Scalars['String'];
  /** remarks (비고) */
  remark: Scalars['String'];
  /** display order (표시순서) */
  sort: Scalars['Int'];
  /** tax status (과세여부) */
  tax: Scalars['Boolean'];
  /** submission of tax exemption report (비과세신고제출여부) */
  taxFreeIncludeSubmission?: Maybe<Scalars['Boolean']>;
  /** taxable pay item code (과세소득항목코드) */
  taxPayItemCode?: Maybe<Scalars['Int']>;
  /** taxable pay item name (과세소득항목명) */
  taxPayItemName?: Maybe<Scalars['String']>;
  /** tax-free pay item code (비과세소득항목코드) */
  taxfreePayItemCode?: Maybe<Scalars['String']>;
  /** tax-free pay item name (비과세소득항목명) */
  taxfreePayItemName?: Maybe<Scalars['String']>;
  /** timestamp (타임스탬프) */
  ts: Scalars['Float'];
  /** revised date (수정일) */
  updatedAt: Scalars['DateScalar'];
  /** modifiers (수정자) */
  updatedBy: Scalars['String'];
  /** use status (사용여부) */
  use: Scalars['Boolean'];
};

/** Withholding config pay item correction input (원천설정 소득항목수정 입력) */
export type WithholdingConfigPayItemUpdateInput = {
  /** calculation method (산출방법) */
  formula?: InputMaybe<Scalars['String']>;
  /** item name (항목명) */
  name: Scalars['String'];
  /** use status (사용여부) */
  use: Scalars['Boolean'];
};

/** Withholding config pay item change display order (원천설정 소득항목 순서변경) */
export type WithholdingConfigPayItemsReorderInput = {
  /** item code (항목코드) */
  itemCode: Scalars['Int'];
  /** display order (표시순서) */
  sort: Scalars['Float'];
};

/** Withholding tax electronic filing (원천세 전자신고) */
export type WithholdingTaxElectronicFiling = {
  __typename?: 'WithholdingTaxElectronicFiling';
  /** status after expiration date (기한후 여부) */
  afterDeadline: Scalars['Boolean'];
  /** Company (사업자) */
  company: Company;
  /** company serial number (사업자일련번호) */
  companyId: Scalars['Int'];
  /** imputed month (귀속월) */
  imputedMonth: Scalars['Int'];
  /** imputed year (귀속연도) */
  imputedYear: Scalars['Int'];
  /** corrected order (수정차수) */
  index: Scalars['Int'];
  /** last production request date (최종제작요청일) */
  lastProductionRequestedAt?: Maybe<Scalars['DateScalar']>;
  /** payment month (지급월) */
  paymentMonth: Scalars['Int'];
  /** payment year (지급연도) */
  paymentYear: Scalars['Int'];
  /** withholding tax performance report serial number (원천징수이행상황신고서 일련번호) */
  reportId: Scalars['Int'];
  /** reporting type (신고유형/주기) */
  reportType: Scalars['Int'];
  /** work status change date (업무상태변경일) */
  statusUpdatedAt: Scalars['DateScalar'];
  /** total amount of tax collected (총징수세액) */
  totalCollectedTaxAmount: Scalars['Int'];
};
