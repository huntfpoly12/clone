import getCompany from "./getCompany"; 
import searchCompanies from "./getData"; 
import getCompanyManageMemos from "./getCompanyManageMemos"; 
import getCompanyLogs from "./getCompanyLogs"; 

const queries = {
    searchCompanies: searchCompanies,
    getCompany: getCompany,
    getCompanyManageMemos:getCompanyManageMemos,
    getCompanyLogs:getCompanyLogs
};

export default queries;