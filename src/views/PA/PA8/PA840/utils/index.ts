import dayjs from "dayjs";

export const EmploymentStatus = [
  { id: 4, text: "휴직" },
  { id: 5, text: "복직" },
];
export const PaymentDesire = [
  { id: true, text: "희망" },
  { id: false, text: "미희망" },
];
export const INITIAL_FORM_PA840 = {
  employeeType: 10,
  employeeId: null,
  nationalPensionReport: true,
  healthInsuranceReport: true,
  employeementInsuranceReport: true,
  industrialAccidentInsuranceReport: true,
  typeOfLeave: 1,
  startDateOfLeave: +dayjs().format("YYYYMMDD"),
  endDateOfLeave: +dayjs().format("YYYYMMDD"),
  pensionPaymentExceptionReasonCode: "",
  healthInsurancePaymentExceptionReasonCode: "",
  employeementInsuranceLeaveReasonCode: "",
  leaveOfAbsenceRequestFileStorageId: NaN,
  
  paymentDesire: 1,
  dependentsEvidenceFileStorageId: 0,
  healthSalaryPaymentYearDuringLeaveOfAbsence: [
    { year: dayjs().year(), totalSalary: 0 },
  ],
  returnDate: +dayjs().format("YYYYMMDD"),
  salaryAfterReturn: 0,
  pensionPaymentAtReturnMonth: false,
  heathInstallmentPaymentCount: null,
};
const LeaveOfAbsenceDocument = [
  { name: "휴직", id: 1 },
  { name: "육아휴직", id: 2 },
  { name: "휴가", id: 3 },
  { name: "출산휴가", id: 4 },
];
const NationalPensionPaymentExemptionCode = [
  { name: "산전후휴가,육아휴직", id: "1" },
  { name: "병역의무수행", id: "2" },
  { name: "재학", id: "3" },
  { name: "3개월이상입원", id: "7" },
  { name: "재해.사고등으로 기초생활곤란", id: "11" },
  { name: "무보수 대표이사", id: "12" },
  { name: "무급 근로자", id: "13" },
  { name: "산재요양", id: "21" },
  { name: "무급 노조전임자", id: "22" },
];
const ReasonForDeferringHealthInsurancePayments = [
  { name: "휴직", id: "81" },
  { name: "육아휴직", id: "82" },
  { name: "질병휴직", id: "83" },
  { name: "무급노조전입자휴직", id: "84" },
  { name: "기타의 사유", id: "89" },
];
const TypeOfWorkersCompensationInsurance = [
  { name: "산재보험", id: "1" },
  { name: "고용보험", id: "3" },
  { name: "산재 + 고용보험", id: "5" },
];

const EmploymentInjuryLeaveReasonCode = [
  { name: "휴업.휴직(사업장사정)", id: '01' },
  { name: "휴직(병가등 근로자사정)", id: '02' },
  { name: "근로기준법에따른 보호휴가", id: '03' },
  { name: "노조전임자", id: '04' },
  { name: "기타", id: '05' },
];
const employeeFashionArr = [
  { id: 10, text: "사원" },
  { id: 20, text: "일용직사원" },
];
export default {
  INITIAL_FORM_PA840,
  LeaveOfAbsenceDocument,
  NationalPensionPaymentExemptionCode,
  ReasonForDeferringHealthInsurancePayments,
  TypeOfWorkersCompensationInsurance,
  EmploymentInjuryLeaveReasonCode,
  employeeFashionArr,
};
