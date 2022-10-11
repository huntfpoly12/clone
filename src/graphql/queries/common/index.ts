import getListSale from "./getListSale";
import getListManager from "./getListManager";
import getListPartner from "./getListPartner";
import isUserRegistable from "./isUserRegistable";
import getCompanyLogs from "./getCompanyLogs"; 
import getUserLogs from "./getUserLogs"; 
import getSalesRepresentativeLogs from "./getSalesRepresentativeLogs"; 
import getServiceContractLogs from "./getServiceContractLogs"; 

const queries = {
  getListSale: getListSale,
  getUserLogs: getUserLogs,
  getListManager: getListManager,
  getListPartner: getListPartner,
  isUserRegistable: isUserRegistable,
  getCompanyLogs:getCompanyLogs,
  getServiceContractLogs:getServiceContractLogs,
  getSalesRepresentativeLogs:getSalesRepresentativeLogs
};

export default queries;