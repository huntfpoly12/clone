import createUser from "./createUser";
import updateUser from "./updateUser";
import sendEmailToResetUserPassword from "./sendEmailToResetUserPassword";

const mutations = {
  createUser: createUser,
  updateUser: updateUser,
  sendEmailToResetUserPassword: sendEmailToResetUserPassword
};

export default mutations;
