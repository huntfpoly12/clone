const BASE_URL_SEARCH =
  "https://www.4insure.or.kr/ins4/ptl/ptcp/clnt/popup/ClntCommPopupSrchP.do?bascCdPtrn=";
const URL_NATIONALITY_NUMBER = BASE_URL_SEARCH + "A151"; // 11 nationalityNumber
const URL_STAY_QUALIFICATION_CODE = BASE_URL_SEARCH + "A152"; // 12 stayQualification
const URL_NATIONAL_PERSON_ACQUISITION_CODE = BASE_URL_SEARCH + "A101"; // 17 nationalPensionAcquisitionCode
const URL_HEALTH_INSURANCE_ACQUISITION_CODE_CODE = BASE_URL_SEARCH + "B101"; // 19 healthInsuranceAcquisitionCode
const URL_JOB_TYPE_CODE_CODE = BASE_URL_SEARCH + "D108"; // 22 jobTypeCode
const URL_INSURANCE_REDUCTION_REASON_CODE =
  "https://www.4insure.or.kr/ins4/ptl/clnt/memb/MembLicnGainDeclCDContP.do"; // 28 insuranceReductionReasonCode

const URL_DISABLED_CODE_DEPENDENT = BASE_URL_SEARCH + "B141"; // 4 of table dependents => disabledCode
const URL_NATIONALITY_NUMBER_DEPENDENT = BASE_URL_SEARCH + "A151"; // 5 of table dependents => nationalityNumber
const URL_STAY_QUALIFICATION_CODE_DEPENDENT = BASE_URL_SEARCH + "A151"; // 6 of table dependents => stayQualification

// export all constants
export default {
  URL_NATIONALITY_NUMBER,
  URL_STAY_QUALIFICATION_CODE,
  URL_NATIONAL_PERSON_ACQUISITION_CODE,
  URL_HEALTH_INSURANCE_ACQUISITION_CODE_CODE,
  URL_JOB_TYPE_CODE_CODE,
  URL_INSURANCE_REDUCTION_REASON_CODE,
  URL_DISABLED_CODE_DEPENDENT,
  URL_NATIONALITY_NUMBER_DEPENDENT,
  URL_STAY_QUALIFICATION_CODE_DEPENDENT,
};
