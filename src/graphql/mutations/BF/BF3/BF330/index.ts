
import createServiceContractManageMemo from "./createServiceContractManageMemo";
import deleteServiceContractManageMemo from "./deleteServiceContractManageMemo";
import updateServiceContractManageMemo from "./updateServiceContractManageMemo";
import updateServiceContract from "./updateServiceContract";

const mutations = {
  createServiceContractManageMemo: createServiceContractManageMemo,
  deleteServiceContractManageMemo: deleteServiceContractManageMemo,
  updateServiceContractManageMemo: updateServiceContractManageMemo,
  updateServiceContract: updateServiceContract
};

export default mutations;