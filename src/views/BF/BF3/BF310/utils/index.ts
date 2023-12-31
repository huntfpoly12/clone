// Data Popup
export const bizTypeItems = [
  { id: 1, text: "법인사업자" },
  { id: 2, text: "개인사업자" },
];
export const initialFormState = {
  id: null,
  status: 10,
  code: "",
  companyName: "",
  companyBizNumber: "",
  companyAddress: "",
  presidentName: "",

  simpleAccountingInfos: {
    name: "",
    startYearMonth: "",
  },
  processedAt: "",
  approvedAt: "",
  rejectedAt: "",
  processedBy: "",
  rejectedBy: "",
  approvedBy: "",
  content: {
    agreements: {
      terms: true,
      personalInfo: true,
      accountingService: true,
      withholdingService: true,
    },
    company: {
      name: "",
      zipcode: "",
      roadAddress: "",
      jibunAddress: "",
      addressExtend: "",
      addressDetail: {
        bcode: "",
        bname: "",
        buildingCode: "",
        buildingName: "",
        roadname: "",
        roadnameCode: "",
        sido: "",
        sigungu: "",
        sigunguCode: "",
        zonecode: "",
      },
      phone: "",
      fax: "",
      licenseFileStorageId: "",
      bizType: 0,
      residentId: "",
      // license: "",
    },
    president: {
      name: "",
      birthday: "",
      mobilePhone: "",
      email: "",
    },
    accounting: {
      facilityBusinesses: [],
      accountingServiceTypes: [],
    },
    withholding: {
      startYearMonth: "",
      capacity: 1234,
      withholdingServiceTypes: [],
    },
    cmsBank: {
      financialCompany: "",
      accountNumber: "",
      ownerName: "",
      ownerBizNumber: "",
      withdrawDay: "",
    },

    extra: {
      salesRepresentativeId: 1,
      comment: "",
    },
  },
  compactSalesRepresentative: {
    id: "",
    code: "",
    name: "",
    active: "",
  },
  institutionNumber: "",

  memo: "",
  createdAt: "",
  createdBy: "",
  updatedBy: "",
  ip: "",
  active: "",
  usedAccounting: false,
  usedWithholding: false
};

/** Application (신청) - 10 */
/** Under examination (심사중) - 20 */
/** Approval (승인) - 30 */
/** Application rejected (반려) - 99 */
export const initialDataStatus = [
  { name: "승인", date: "2022-08-25", color: "green", value: 30 },
  { name: "신청", date: "2022-08-25", color: "red", value: 10 },
  { name: "심사중", date: "2022-08-25", color: "blue", value: 20 },
  { name: "반려", date: "2022-08-25", color: "grey", value: 99 },
];

export const inputInCollapse = [
  {
    key: 2,
    input_name: [
      "companyName",
      "companyBizNumber",
      "residentId",
      "company-phone",
    ],
  },
  {
    key: 3,
    input_name: ["president-name", "president-mobilePhone", "president-email"],
  },
  { key: 4, input_name: ["longTermCareInstitutionNumber"] },
  { key: 5, input_name: ["withholding-capacity"] },
  {
    key: 6,
    input_name: [
      "cmsBank-accountNumber",
      "cmsBank-ownerName",
      "cmsBank-ownerBizNumber",
    ],
  },
];

// Data index
// Data searching default
export const dataSearchIndex = {
  page: 1,
  salesRepresentativeId: 0,
  startDate: 0,
  finishDate: 0,
  useServiceTypes: [1, 2],
  companyName: null,
  presidentName: null,
  statuses: [10, 20, 30, 99],
};

export const initialArrayRadioWithdrawDay = [
  { id: '5일', text: '매월 5일' },
    { id: '12일', text: '매월 12일' },
    { id: '19일', text: '매월 19일' },
];
export const arrayUtilRadioCheckSourceServices = [
  { id: 1, text: '신청합니다' },
  { id: 2, text: '신청하지 않습니다' },
]
