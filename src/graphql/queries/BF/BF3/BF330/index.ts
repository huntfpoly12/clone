import getServiceContract from "./getServiceContract";
import searchServiceContract from "./searchServiceContract";
import getServiceContractManageMemos from "./getServiceContractManageMemos";
const queries = {
    getServiceContract: getServiceContract,
    searchServiceContract: searchServiceContract,
    getNote : getServiceContractManageMemos
};

export default queries;