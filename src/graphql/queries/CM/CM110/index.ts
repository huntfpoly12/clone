
import getDataDetail from "./getDataDetailUser";
import getListUserCompany from "./getListUserCompany";
import getDetailUserEdit from "./getDetailUserEdit";
import getDataFacilityBusiness from "./getDataFacilityBusiness";
import checkUserNameCompany from "./checkUserNameCompany";
import getSeal from "./getSeal";

const queries = {
    getDataDetail: getDataDetail,
    getListUserCompany: getListUserCompany,
    getDetailUser: getDetailUserEdit,
    getDataFacilityBusiness: getDataFacilityBusiness,
    checkUserNameCompany: checkUserNameCompany,
    getSeal: getSeal
};

export default queries;