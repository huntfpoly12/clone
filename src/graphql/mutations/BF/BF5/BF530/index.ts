import cancelMajorInsuranceCompanyOut from "@/graphql/mutations/PA/PA8/PA880/cancelMajorInsuranceCompanyOut";
import cancelMajorInsuranceCompanyEmployeeAcquisition from "@/graphql/mutations/PA/PA8/PA810/cancelMajorInsuranceCompanyEmployeeAcquisition";
import cancelMajorInsuranceCompanyEmployeeLoss from "@/graphql/mutations/PA/PA8/PA820/cancelMajorInsuranceCompanyEmployeeLoss";
import cancelMajorInsuranceCompanyEmployeeSalaryChange from "@/graphql/mutations/PA/PA8/PA830/cancelMajorInsuranceCompanyEmployeeSalaryChange";
import cancelMajorInsuranceCompanyEmployeeLeaveOfAbsence from "@/graphql/mutations/PA/PA8/PA840/cancelMajorInsuranceCompanyEmployeeLeaveOfAbsence";
import cancelMajorInsuranceCompanyEmployeeReturnToWork from "@/graphql/mutations/PA/PA8/PA840/cancelMajorInsuranceCompanyEmployeeReturnToWork";
import updateMajorInsuranceConsignStatus from "./updateMajorInsuranceConsignStatus";
import updateMajorInsuranceLocalOfficeInfo from "./updateMajorInsuranceLocalOfficeInfo";
import updateMajorInsuranceConsignWorkingStatus from "./updateMajorInsuranceConsignWorkingStatus";
import updateMajorInsuranceConsignMemo from "./updateMajorInsuranceConsignMemo";
import cancelMajorInsuranceConsignStatus from "./cancelMajorInsuranceConsignStatus";
import cancelMajorInsuranceCompanyJoin from "./cancelMajorInsuranceCompanyJoin";
import updateMajorInsuranceCompanyJoinData from "./updateMajorInsuranceCompanyJoinData";
import updateMajorInsuranceCompanyOutData from "./updateMajorInsuranceCompanyOutData";
import updateMajorInsuranceCompanyEmployeeAcquisitionData from "./updateMajorInsuranceCompanyEmployeeAcquisitionData";
import updateMajorInsuranceCompanyEmployeeLossData from "./updateMajorInsuranceCompanyEmployeeLossData";
import updateMajorInsuranceCompanyEmployeeSalaryChangeData from "./updateMajorInsuranceCompanyEmployeeSalaryChangeData";
import updateMajorInsuranceCompanyEmployeeLeaveOfAbsenceData from "./updateMajorInsuranceCompanyEmployeeLeaveOfAbsenceData";
import updateMajorInsuranceCompanyEmployeeReturnToWorkData from "./updateMajorInsuranceCompanyEmployeeReturnToWorkData";

const mutations = {
  updateMajorInsuranceConsignMemo,
  updateMajorInsuranceLocalOfficeInfo,
  updateMajorInsuranceConsignWorkingStatus,
  updateMajorInsuranceConsignStatus,
  cancelMajorInsuranceConsignStatus,
  cancelMajorInsuranceCompanyJoin,
  updateMajorInsuranceCompanyJoinData,
  cancelMajorInsuranceCompanyOut,
  updateMajorInsuranceCompanyEmployeeAcquisitionData,
  cancelMajorInsuranceCompanyEmployeeAcquisition,
  updateMajorInsuranceCompanyOutData,
  cancelMajorInsuranceCompanyEmployeeLoss,
  updateMajorInsuranceCompanyEmployeeLossData,
  cancelMajorInsuranceCompanyEmployeeSalaryChange,
  updateMajorInsuranceCompanyEmployeeSalaryChangeData,
  cancelMajorInsuranceCompanyEmployeeLeaveOfAbsence,
  updateMajorInsuranceCompanyEmployeeLeaveOfAbsenceData,
  cancelMajorInsuranceCompanyEmployeeReturnToWork,
  updateMajorInsuranceCompanyEmployeeReturnToWorkData,
};

export default mutations;
