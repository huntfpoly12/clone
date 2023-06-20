import getCompany from "./getCompany"; 
import searchCompanies from "./getData"; 
import getCompanyManageMemos from "./getCompanyManageMemos"; 
import getMyCompanyFacilityBusinesses from "./getMyCompanyFacilityBusinesses"; 


const queries = {
    searchCompanies: searchCompanies,
    getCompany: getCompany,
    getCompanyManageMemos:getCompanyManageMemos,
    getMyCompanyFacilityBusinesses,
};

export default queries;