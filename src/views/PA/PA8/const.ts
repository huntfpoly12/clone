import dayjs from "dayjs";

const INITIAL_FORM_PA830 = {
  company_name: '',
  phone: '',
  fax: '',
  adding:'',
  address: '',
  employee_name: '',
  residentId: '',
  change_time: '',
  change_amount: '',
  boolean: true,
  boolean1: true,
  boolean2: true,
  radio: 2,
  radio1: 2,
}
export enum EmploymentStatus {
  LeaveOfAbsence = '휴직',
  ReturnToWork = '복직'
}
export enum PaymentDesire {
  No = '희망',
  Yes = '미희망'
}
const INITIAL_FORM_PA840 = {
  company_name: '',
  phone: '',
  fax: '',
  adding:'',
  address: '',
  employee_name: '',
  residentId: '',
  change_time: '',
  change_amount: '',
  boolean: true,
  radio: 2,
  radio1: 2,
  employmentStatus: EmploymentStatus.LeaveOfAbsence,
  money: '',
  contractExpiredDate: dayjs().format("YYYY-MM-DD"),
  leaveStartDate: dayjs().format("YYYY-MM-DD"),
  leaveOfAbsence: dayjs().format("YYYY-MM-DD"),
  paymentDesire: PaymentDesire.Yes,
  year: Number(dayjs().year()),
  totalRemuneration: '',
  numberOfInstallmentPayments: '',
  dependentsEvidenceFileStorageId: 0
}

const INITIAL_FORM_PA870 = {
  nationalPension: false,
  employmentInsurance: false
}

const LeaveOfAbsenceDocument = [
  {name: '휴직', id: 1},
  {name: '육아휴직', id: 2},
  {name: '휴가', id: 3},
  {name: '출산휴가', id: 4},
]
const NationalPensionPaymentExemptionCode = [
  {name: '산전후휴가', id: 0},
  {name: '육아휴직', id: 1},
  {name: '병역의무수행', id: 2},
  {name: '재학', id: 3},
  {name: '3개월이상입원', id: 4},
  {name: '재해.사고등으로 기초생활곤란', id: 5},
  {name: '무보수 대표이사', id: 6},
  {name: '무급 근로자', id: 7},
  {name: '산재요양', id: 8},
  {name: '무급 노조전임자', id: 9},
]
const ReasonForDeferringHealthInsurancePayments = [
  {name: '휴직', id: 0},
  {name: '육아휴직', id: 1},
  {name: '질병휴직', id: 2},
  {name: '무급노조전입자휴직', id: 3},
  {name: '기타의 사유', id: 4},
]
const TypeOfWorkersCompensationInsurance = [
  {name: '산재보험', id: 0},
  {name: '고용보험', id: 1},
  {name: '산재 + 고용보험', id: 2},
]

const EmploymentInjuryLeaveReasonCode = [
  {name: '휴업.휴직(사업장사정)', id: 0},
  {name: '휴직(병가등 근로자사정)', id: 1},
  {name: '근로기준법에따른 보호휴가', id: 2},
  {name: '노조전임자', id: 3},
  {name: '기타', id: 4},
]

export type FormCreatePA830 = typeof INITIAL_FORM_PA830
export default {
  INITIAL_FORM_PA830,
  INITIAL_FORM_PA840,
  INITIAL_FORM_PA870,
  LeaveOfAbsenceDocument,
  NationalPensionPaymentExemptionCode,
  ReasonForDeferringHealthInsurancePayments,
  TypeOfWorkersCompensationInsurance,
  EmploymentInjuryLeaveReasonCode
}
