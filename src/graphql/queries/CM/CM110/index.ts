
import getDataDetail from "./getDataDetailUser";
import getListUserCompany from "./getListUserCompany";
import getDetailUserEdit from "./getDetailUserEdit";
import getDataFacilityBusiness from "./getDataFacilityBusiness";
import checkUserNameCompany from "./checkUserNameCompany";

const queries = {
    getDataDetail: getDataDetail,
    getListUserCompany: getListUserCompany,
    getDetailUser: getDetailUserEdit,
    getDataFacilityBusiness: getDataFacilityBusiness
    checkUserNameCompany: checkUserNameCompany
};

export default queries;