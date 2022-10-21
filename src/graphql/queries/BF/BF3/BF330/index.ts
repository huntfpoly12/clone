import getServiceContract from "./getServiceContract";
import searchServiceContracts from "./searchServiceContracts";
import getServiceContractManageMemos from "./getServiceContractManageMemos";
const queries = {
    getServiceContract: getServiceContract,
    searchServiceContracts: searchServiceContracts,
    getServiceContractManageMemos : getServiceContractManageMemos
};

export default queries;