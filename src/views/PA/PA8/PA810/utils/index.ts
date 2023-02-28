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
  nationalPensionAcquisitionCode: Number;
  acquisitionMonthPayment: boolean;
  healthInsuranceAcquisitionCode: string;
  includeDependents: boolean;
  jobTypeCode: string;
  contractWorker: boolean;
  contractExpiredDate?: Number;
  jobSecurityFundSupportApplication: boolean;
  weeklyWorkingHours: number;
  insuranceReductionCode: string;
  insuranceReductionReasonCode: string;
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
  nationalityNumber: "1", // 11 field required number, but component return string value
  stayQualification: "", // 12 field required number, but component return string value
  nationalPensionReport: true, // 13
  healthInsuranceReport: true, // 14
  employeementInsuranceReport: true, // 15
  industrialAccidentInsuranceReport: true, // 16
  nationalPensionAcquisitionCode: 1, // 17
  acquisitionMonthPayment: false, // 18
  healthInsuranceAcquisitionCode: "", // 19
  includeDependents: true, // 21
  jobTypeCode: "232", // 22
  contractWorker: true, // 23
  // contractExpiredDate: "", // 24
  jobSecurityFundSupportApplication: false, // 25
  weeklyWorkingHours: 40, // 26
  insuranceReductionCode: "", // 27
  insuranceReductionReasonCode: "", // 28
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
  disabledCode: "1", // no field
  dependents: [
    {
      name: "",
      nationalityNumber: "",
      relationCode: "",
      relationName: "",
      relation: -1,
      residentId: "",
      stayPeriodFrom: "",
      stayPeriodTo: "",
      stayQualification: "",
      contractExpiredDate: [],
    },
  ],
};
export default {
  InitialFormCreate,
  initialEmployeeWage,
};