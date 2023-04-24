
import getDataDetail from "./getDataDetailUser";
import getListUserCompany from "./getListUserCompany";
import getDetailUserEdit from "./getDetailUserEdit";
import getMyCompanyFacilityBusinesses from "./getMyCompanyFacilityBusinesses";
import checkUserNameCompany from "./checkUserNameCompany";
import getSeal from "./getSeal";

const queries = {
    getDataDetail: getDataDetail,
    getListUserCompany: getListUserCompany,
    getDetailUser: getDetailUserEdit,
    getMyCompanyFacilityBusinesses: getMyCompanyFacilityBusinesses,
    checkUserNameCompany: checkUserNameCompany,
    getSeal: getSeal
};

export default queries;
