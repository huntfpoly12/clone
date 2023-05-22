import dayjs from "dayjs"

const INITIAL_FORM_PA870 = {
  nationalPensionReport: true,
  healthInsuranceReport: true,
  employeementInsuranceReport: true,
  industrialAccidentInsuranceReport: true,

  employeementInsuranceValidReport: false,
  industrialAccidentInsuranceValidReport: false,

  companyName: '',
  adding: '',
  companyType: '',
  companyAddress: '',
  companyBizNuber: '',
  companyCorpRegNuber: '',
  companyTel: '',
  companyMobile: '',
  companyPostNumber: '',
  companyFax: '',
  companyUptae: '',
  companyjongmok: '',
  companyRefundBankName: '',
  companyRefundAccountNumber: '',
  companyRefundAccountOwner: '',

  presidentName: '',
  presidentResidentNumber: '',
  presidentTel: '',
  presidentAddress: '',

  directDebitBankName: '',
  directDebitAccountNumber: '',
  directDebitAccountOwner: '',
  directDebitAccountOwnerResidentNumber: '',
  combinedDirectDebitStatus: true,
  directDebitDateType: 1,

  electronicNotificationEmail: true,
  electronicNotificationMobile: true,
  electronicNotificationEdoc: true,
  electronicNotificationWeb: true,
  electronicReceive: '',
  electronicReceiverName: '',
  electronicReceiverResidentNumber: '',

  constructionSiteWorkplace: true,
  constructionSiteBusinessPeriod: [
    parseInt(dayjs().subtract(1, "week").format("YYYYMMDD")),
    parseInt(dayjs().format("YYYYMMDD")),
  ],

  nationalPensionSupport: true,
  employeementInsuranceSupport: true,

  nationalPensionEmployeeCount: '',
  nationalPensionEmployeeTargetNumber: '',
  nationalPensionApplyDate: +dayjs().format('YYYYMMDD'),
  nationalPensionSeparatelySiteStatus: true,
  nationalPensionSeparatelySiteManageNumber: '',

  healthInsuranceEmployeeTargetNumber: '',
  healthInsuranceApplyDate: +dayjs().format('YYYYMMDD'),
  healthInsuranceHeadOfficeManageNumber: '',
  healthInsuranceSpecificCode: '',
  // electronicReceiverName: true,

  employeementInsuranceFulltimeWorkerCount: '',
  employeementInsuranceEmployeeTargetNumber: '',
  employeementInsuranceApplyDate: +dayjs().format('YYYYMMDD'),
  employeementInsuranceMainWorkplaceName: '',
  employeementInsuranceMainWorkplaceBizNumber: '',
  employeementInsuranceMainWorkplacePrioritySupport: true,
  employeementInsuranceMainWorkplaceManageNumber: '',

  industrialAccidentInsuranceFulltimeWokerCount: '',
  industrialAccidentInsuranceApplyDate: +dayjs().format('YYYYMMDD'),
  industrialAccidentInsuranceBusinessType: 1,
  industrialAccidentInsuranceOccurrence: true,
  industrialAccidentInsuranceMainWorkplace: true,
  industrialAccidentInsuranceMainWorkplaceBizNumber: '',
  industrialAccidentMainWorkplaceManageNumber: '',
  industrialAccidentInsuranceBusinessTypeCode: '',

  reportDate:+dayjs().format('YYYYMMDD'),
}
export const companyTypeArr = [
  { id: 1, text: "법인" },
  { id: 2, text: "개인" },
]
export const combinedDirectDebitStatusArr = [
  { id: true, text: "적용" },
  { id: false, text: "미적용" },
]
export const directDebitDateTypeArr = [
  { id: 1, text: "납기일" },
  { id: 2, text: "납기전월말일" },
]
export const constructionSiteWorkplaceArr = [
  { id: true, text: "해당" },
  { id: false, text: "미해당" },
]
export const nationalPensionSeparatelySiteStatusArr = [
  { id: true, text: "해당" },
  { id: false, text: "미해당" },
]
export const industrialAccidentInsuranceBusinessTypeArr = [
  { id: 1, text: "계속" },
  { id: 2, text: "기간이정해진사업" },
]
export const industrialAccidentInsuranceOccurrenceArr = [
  { id: true, text: "계속" },
  { id: false, text: "기간이정해진사업" },
]

export default {
  INITIAL_FORM_PA870
}
