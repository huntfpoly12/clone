import getListSale from "./getListSale";
import getListManager from "./getListManager";
import getListPartner from "./getListPartner";
import isUserRegistable from "./isUserRegistable";
import getCompanyLogs from "./getCompanyLogs";
import getUserLogs from "./getUserLogs";
import getUser from "./getUser";
import getIncomeWagesLogs from "./getIncomeWagesLogs";
import getSalesRepresentativeLogs from "./getSalesRepresentativeLogs";
import getServiceContractLogs from "./getServiceContractLogs";
import getMyCompanyUserLogs from "./getMyCompanyUserLogs";
import getMyCompanyAuthentications from "./getMyCompanyAuthentications";
import getWithholdingConfigPayItemsLogs from "./getWithholdingConfigPayItemsLogs";
import getScreenRoleGroupLogs from "./getScreenRoleGroupLogs";
import searchPublicInstitutions from "./searchPublicInstitutions";
import getSaleRequestContact from "./getSaleRequestContact";
import getEmployeeBusinessesLogs from "./getEmployeeBusinessesLogs";
import getEmployeeWageDailiesLogs from "./getEmployeeWageDailiesLogs";
import getResponsibilities from "./getResponsibilities";
import getDepartments from "./getDepartments";
import getEmployeeExtrasLogs from "./getEmployeeExtrasLogs";
import getEmployeeWagesLogs from "./getEmployeeWagesLogs";
import getWithholdingConfigDeductionItemsLogs from "./getWithholdingConfigDeductionItemsLogs";
import getIncomeWageDailiesLogs from "./getIncomeWageDailiesLogs";
import getIncomeProcessWageDailyLogs from "./getIncomeProcessWageDailyLogs";
import getIncomeBusinessesLogs from "./getIncomeBusinessesLogs";
import getIncomeProcessBusinessLogs from "./getIncomeProcessBusinessLogs";
import getIncomeProcessWageLogs from "./getIncomeProcessWageLogs";
import getIncomeProcessRetirementLogs from "./getIncomeProcessRetirementLogs";
import getIncomeRetirementsLogs from "./getIncomeRetirementsLogs";
import getIncomeExtrasLogs from "./getIncomeExtrasLogs";
import getIncomeProcessExtraLogs from "./getIncomeProcessExtraLogs";
import getSubscriptionRequestLogs from "./getSubscriptionRequestLogs";
import getTaxWithholdingStatusReportsLogs from "./getTaxWithholdingStatusReportsLogs";
import searchUsers from "./searchUsers";
import getClientLogs from "./getClientLogs";
import getBackerLogs from "./getBackerLogs";
import getMajorInsuranceCompanyEmployeeAcquisitionLogs from "./getMajorInsuranceCompanyEmployeeAcquisitionLogs";
import getBankbooksLogs from "./getBankbooksLogs";
import getBankbookDetailLogs from "./getBankbookDetailLogs";
import getAccoountSubjects from "./getAccoountSubjects";
import getAccountingProcessLogs from "./getAccountingProcessLogs";
import getAccountingDocumentsLogs from './getAccountingDocumentsLogs'
import getMe from "./getMe";
import getMajorInsuranceCompanyOutLogs from "./getMajorInsuranceCompanyOutLogs";
import getMajorInsuranceCompanyEmployeeLossLogs from "./getMajorInsuranceCompanyEmployeeLossLogs";
import findUsername from "./findUsername";
import getMajorInsuranceCompanyEmployeeLeaveOfAbsenceLogs from "./getMajorInsuranceCompanyEmployeeLeaveOfAbsenceLogs";
import getMajorInsuranceCompanyEmployeeReturnToWorkLogs from "./getMajorInsuranceCompanyEmployeeReturnToWorkLogs";
import getBudgetSubjectTransitionsLogs from './getBudgetSubjectTransitionsLogs';
import getMajorInsuranceCompanyEmployeeSalaryChangeLogs from './getMajorInsuranceCompanyEmployeeSalaryChangeLogs';
import getMajorInsuranceConsignStatusLogs from "./getMajorInsuranceConsignStatusLogs";
import getMajorInsuranceCompanyJoinLogs from "./getMajorInsuranceCompanyJoinLogs";
import getBudgetsLogs from "./getBudgetsLogs";
import getNotificationMessageLogs from "./getNotificationMessageLogs";
import getInquiryMessageLogs from "./getInquiryMessageLogs";
import getNoticeMessageLogs from "./getNoticeMessageLogs";
const queries = {
  getMe: getMe,
  getUser: getUser,
  findUsername: findUsername,
  getListSale: getListSale,
  getUserLogs: getUserLogs,
  getIncomeWagesLogs: getIncomeWagesLogs,
  getListManager: getListManager,
  getListPartner: getListPartner,
  isUserRegistable: isUserRegistable,
  getCompanyLogs: getCompanyLogs,
  getServiceContractLogs: getServiceContractLogs,
  getSalesRepresentativeLogs: getSalesRepresentativeLogs,
  getMyCompanyUserLogs: getMyCompanyUserLogs,
  getMyCompanyAuthentications: getMyCompanyAuthentications,
  getWithholdingConfigPayItemsLogs: getWithholdingConfigPayItemsLogs,
  getScreenRoleGroupLogs: getScreenRoleGroupLogs,
  searchPublicInstitutions: searchPublicInstitutions,
  getSaleRequestContact: getSaleRequestContact,
  getEmployeeBusinessesLogs: getEmployeeBusinessesLogs,
  getEmployeeExtrasLogs: getEmployeeExtrasLogs,
  getEmployeeWageDailiesLogs: getEmployeeWageDailiesLogs,
  getResponsibilities: getResponsibilities,
  getDepartments: getDepartments,
  getEmployeeWagesLogs: getEmployeeWagesLogs,
  getWithholdingConfigDeductionItemsLogs:
    getWithholdingConfigDeductionItemsLogs,
  getIncomeWageDailiesLogs: getIncomeWageDailiesLogs,
  getIncomeProcessWageDailyLogs: getIncomeProcessWageDailyLogs,
  getIncomeProcessWageLogs: getIncomeProcessWageLogs,
  getIncomeBusinessesLogs: getIncomeBusinessesLogs,
  getIncomeProcessBusinessLogs: getIncomeProcessBusinessLogs,
  getIncomeProcessRetirementLogs: getIncomeProcessRetirementLogs,
  getIncomeRetirementsLogs: getIncomeRetirementsLogs,
  getIncomeExtrasLogs: getIncomeExtrasLogs,
  getIncomeProcessExtraLogs: getIncomeProcessExtraLogs,
  getSubscriptionRequestLogs: getSubscriptionRequestLogs,
  searchUsers: searchUsers,
  getTaxWithholdingStatusReportsLogs: getTaxWithholdingStatusReportsLogs,
  getMajorInsuranceCompanyEmployeeAcquisitionLogs:
    getMajorInsuranceCompanyEmployeeAcquisitionLogs,
  getClientLogs: getClientLogs,
  getBankbooksLogs: getBankbooksLogs,
  getBackerLogs: getBackerLogs,
  getBankbookDetailLogs: getBankbookDetailLogs,
  getAccoountSubjects: getAccoountSubjects,
  getAccountingProcessLogs: getAccountingProcessLogs,
  getAccountingDocumentsLogs: getAccountingDocumentsLogs,
  getMajorInsuranceCompanyOutLogs: getMajorInsuranceCompanyOutLogs,
  getMajorInsuranceCompanyEmployeeLossLogs: getMajorInsuranceCompanyEmployeeLossLogs,
  getMajorInsuranceCompanyEmployeeLeaveOfAbsenceLogs: getMajorInsuranceCompanyEmployeeLeaveOfAbsenceLogs,
  getMajorInsuranceCompanyEmployeeReturnToWorkLogs: getMajorInsuranceCompanyEmployeeReturnToWorkLogs,
  getBudgetSubjectTransitionsLogs: getBudgetSubjectTransitionsLogs,
  getMajorInsuranceCompanyEmployeeSalaryChangeLogs: getMajorInsuranceCompanyEmployeeSalaryChangeLogs,
  getMajorInsuranceConsignStatusLogs: getMajorInsuranceConsignStatusLogs,
  getMajorInsuranceCompanyJoinLogs,
  getBudgetsLogs,
  getNotificationMessageLogs,
  getInquiryMessageLogs,
  getNoticeMessageLogs
};

export default queries;
