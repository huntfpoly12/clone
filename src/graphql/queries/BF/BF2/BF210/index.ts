import searchUsers from "./searchUsers";
import getUser from "./getUser";
import isUserRegistableUsername from "./isUserRegistableUsername";
import searchScreenRoleGroups from "./searchScreenRoleGroups";
import getAuthentications from "./getAuthentications";
const queries = {
  searchUsers: searchUsers,
  getUser: getUser,
  isUserRegistableUsername: isUserRegistableUsername,
  searchScreenRoleGroups: searchScreenRoleGroups,  
  getAuthentications: getAuthentications,
};

export default queries;
     