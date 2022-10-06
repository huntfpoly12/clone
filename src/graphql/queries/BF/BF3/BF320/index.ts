import getCompany from "./getCompany"; 
import searchCompanies from "./getData"; 
import getCompanyManageMemos from "./getCompanyManageMemos"; 


const queries = {
    searchCompanies: searchCompanies,
    getCompany: getCompany,
    getCompanyManageMemos:getCompanyManageMemos
};

export default queries;