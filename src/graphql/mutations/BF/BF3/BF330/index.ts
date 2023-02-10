
import createServiceContractManageMemo from "./createServiceContractManageMemo";
import deleteServiceContractManageMemo from "./deleteServiceContractManageMemo";
import updateServiceContractManageMemo from "./updateServiceContractManageMemo";
import updateServiceContract from "./updateServiceContract";

const mutations = {
  createServiceContractManageMemo: createServiceContractManageMemo,
  deleteServiceContractManageMemo: deleteServiceContractManageMemo,
  updateServiceContractManageMemo: updateServiceContractManageMemo,
  updateServiceContractInfo: updateServiceContract,
  updateServiceContractExtra: updateServiceContract
};

export default mutations;