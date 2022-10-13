import createUser from "./createUser";
import updateUser from "./updateUser";
import resetUserPassword from "./resetUserPassword";

const mutations = {
  createUser: createUser,
  updateUser: updateUser,
  resetUserPassword: resetUserPassword
};

export default mutations;
