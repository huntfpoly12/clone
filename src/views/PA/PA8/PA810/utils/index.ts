import filters from "@/helpers/filters";
export type InitialFormCreateType = {
  name: string;
  bizNumber: string;
  presidentName: string;
  adding: string;
  joinedAt: string;
  residentId: string;
  totalPay: string;
  president: boolean;
  nationalityNumber: string;
  stayQualification: string;
  nationalPensionReport: boolean;
  healthInsuranceReport: boolean;
  employeementInsuranceReport: boolean;
  industrialAccidentInsuranceReport: boolean;
  nationalPensionAcquisitionCode: string;
  acquisitionMonthPayment: boolean;
  healthInsuranceAcquisitionCode: string;
  includeDependents: boolean;
  jobTypeCode: string;
  contractWorker: boolean;
  contractExpiredDate?: Number;
  jobSecurityFundSupportApplication: boolean;
  weeklyWorkingHours: number;
  insuranceReductionCode?: number;
  insuranceReductionReasonCode?: number;
  dependentsEvidenceFileStorageId?: Number;
};
const InitialFormCreate: InitialFormCreateType = {
  name: "", // 2 - 6
  bizNumber: "", // 3 so dang ky cong ty (api not register)
  presidentName: "", // 4
  adding: "", // 5 api not register
  joinedAt: "", // 7 api not register
  residentId: "", // 8
  totalPay: "", // 9
  president: false, // 10 no
  nationalityNumber: "", // 11 field required number, but component return string value
  stayQualification: "", // 12 field required number, but component return string value
  nationalPensionReport: true, // 13
  healthInsuranceReport: true, // 14
  employeementInsuranceReport: true, // 15
  industrialAccidentInsuranceReport: true, // 16
  nationalPensionAcquisitionCode: "1", // 17
  acquisitionMonthPayment: false, // 18
  healthInsuranceAcquisitionCode: "00", // 19
  includeDependents: true, // 21
  jobTypeCode: "232", // 22
  contractWorker: false, // 23
  // contractExpiredDate: "", // 24
  jobSecurityFundSupportApplication: false, // 25
  weeklyWorkingHours: 40, // 26
  // insuranceReductionCode: "", // 27
  // insuranceReductionReasonCode: "", // 28
};

const initialEmployeeWage = {
  name: "",
  residentId: "",
  joinedAt: "",
  totalPay: "",
  president: "",
  nationalityNumber: "",
  nationalityCode: "",
  stayQualification: "",
  foreigner: false,
  dependents: [
    {
      disabledCode: "",
      disabledRegisteredDate: 0,
      name: "",
      nationalityNumber: "",
      relationCode: "",
      relationName: "",
      relation: -1,
      residentId: "",
      stayPeriodFrom: "",
      stayPeriodTo: "",
      stayQualification: "",
      contractExpiredDate: [
        filters.formatDateToInterger(new Date().getTime()),
        filters.formatDateToInterger(
          new Date().setDate(new Date().getDate() + 7)
        ),
      ],
    },
  ],
};

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
/** File Storage (파일저장소) */
export type FileStorage = {
  __typename?: "FileStorage";
  /** 활성여부 */
  active: Scalars["Boolean"];
  /** 생성일 */
  createdAt: Scalars["DateScalar"];
  /** 생성자 */
  createdBy: Scalars["String"];
  /** IP주소 */
  ip: Scalars["String"];
  /** file name (파일명) */
  name: Scalars["String"];
  /** 수정일 */
  updatedAt: Scalars["DateScalar"];
  /** 수정자 */
  updatedBy: Scalars["String"];
  /** URL */
  url: Scalars["String"];
};

export type CompanyPresident = {
  __typename?: "CompanyPresident";
  /** birthday / YYMMDD (생년월일) */
  birthday: Scalars["String"];
  /** email (이메일) */
  email: Scalars["String"];
  /** mobile phone number (휴대폰번호) */
  mobilePhone: Scalars["String"];
  /** name (성명) */
  name: Scalars["String"];
};
export type CompanyCmsBank = {
  __typename?: "CompanyCmsBank";
  /** withdrawal account number (출금계좌번호) */
  accountNumber: Scalars["String"];
  /** bank (은행) */
  bankType: Scalars["BankTypeScalar"];
  /** account business registration number (계좌사업자번호) */
  ownerBizNumber: Scalars["String"];
  /** withdrawal account holder name (출금계좌주명) */
  ownerName: Scalars["String"];
  /** withdrawal date (출금일) */
  withdrawDay: Scalars["String"];
};
/** Detailed address information (상세주소 정보) */
export type AddressDetail = {
  __typename?: "AddressDetail";
  /** administrative district code (행정구역코드) */
  bcode: Scalars["String"];
  /** name of administrative district (행정구역명) */
  bname: Scalars["String"];
  /** building code (건물코드) */
  buildingCode: Scalars["String"];
  /** building name (건물명) */
  buildingName: Scalars["String"];
  /** road name (도로명) */
  roadname: Scalars["String"];
  /** road name code (도로명코드) */
  roadnameCode: Scalars["String"];
  /** city and provincial names (시도명) */
  sido: Scalars["String"];
  /** name of city and county (시군구명) */
  sigungu: Scalars["String"];
  /** city, county, and district code (시군구코드) */
  sigunguCode: Scalars["String"];
  /** postal code (우편번호) */
  zonecode: Scalars["String"];
};
export type CompanyDetail = {
  __typename?: "CompanyDetail";
  /** detailed address (상세주소) */
  addressDetail: AddressDetail;
  /** extended address (확장주소) */
  addressExtend: Scalars["String"];
  /** fax (팩스) */
  fax?: Maybe<Scalars["String"]>;
  /** land number address (지번주소) */
  jibunAddress: Scalars["String"];
  /** Business license file (사업자등록증 파일) */
  license?: Maybe<FileStorage>;
  /** business license file storage serial number (사업자등록증 파일저장일련번호) */
  licenseFileStorageId?: Maybe<Scalars["Int"]>;
  /** company name (상호) */
  name: Scalars["String"];
  /** contact phone number (연락전화번호) */
  phone: Scalars["String"];
  /** road name address (도로명주소) */
  roadAddress: Scalars["String"];
  /** postal code (우편번호) */
  zipcode: Scalars["String"];
};
/** Company / Extend information (사업자/확장정보) */
export type CompanyExtendInfo = {
  __typename?: "CompanyExtendInfo";
  /** Company / CMS account information (사업자/CMS계좌정보) */
  cmsBank: CompanyCmsBank;
  /** Company / Details (사업자/상세정보) */
  detail: CompanyDetail;
  /** Company / Representative information (사업자/대표자정보) */
  president: CompanyPresident;
};
/** Company (사업자) */
export type Company = {
  __typename?: "Company";
  /** activation status (활성여부) */
  active: Scalars["Boolean"];
  /** company address (주소) */
  address: Scalars["String"];
  /** business registration number (사업자등록번호) */
  bizNumber: Scalars["String"];
  /** type of business (사업자유형) */
  bizType: Scalars["BizTypeScalar"];
  /** Cancellation date (해지일자) */
  canceledAt?: Maybe<Scalars["DateScalar"]>;
  /** company code (시업자코드) */
  code: Scalars["String"];
  /** generation date (생성일) */
  createdAt: Scalars["DateScalar"];
  /** generators (생성자) */
  createdBy: Scalars["String"];
  /** Company / Extend information (사업자/확장정보) */
  extendInfo: CompanyExtendInfo;
  /** company serial number (사업자일련번호) */
  id: Scalars["Int"];
  /** ip address (IP주소) */
  ip: Scalars["String"];
  /** company name (상호) */
  name: Scalars["String"];
  /** contact phone number (연락전화번호) */
  phone: Scalars["String"];
  /** representative mobile phone number (대표자 핸드폰번호) */
  presidentMobilePhone: Scalars["String"];
  /** representative name (대표자 이름) */
  presidentName: Scalars["String"];
  /** decrypted corporate registration number / resident registration number (법인등록번호/주민등록번호) */
  residentId: Scalars["String"];
  /** Seal file (직인 파일) */
  seal?: Maybe<FileStorage>;
  /** seal file storage serial number (직인 파일저장일련번호) */
  sealFileStorageId?: Maybe<Scalars["Int"]>;
  /** Number of months unpaid (미납월수) */
  unpaidMonths?: Maybe<Scalars["Int"]>;
  /** revised date (수정일) */
  updatedAt: Scalars["DateScalar"];
  /** modifiers (수정자) */
  updatedBy: Scalars["String"];
};

export default {
  InitialFormCreate,
  initialEmployeeWage,
};
