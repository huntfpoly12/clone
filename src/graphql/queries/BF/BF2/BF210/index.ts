import searchUsers from "./searchUsers";
import getUser from "./getUser";
import isUserRegistableUsername from "./isUserRegistableUsername";
import searchScreenRoleGroups from "./searchScreenRoleGroups";
import getAuthentications from "./getAuthentications";
import findManagerUsers from "./findManagerUsers";
import findSalesRepresentatives from "./findSalesRepresentatives";
import findParters from "./findParters";
const queries = {
  searchUsers: searchUsers,
  getUser: getUser,
  isUserRegistableUsername: isUserRegistableUsername,
  searchScreenRoleGroups: searchScreenRoleGroups, 
  findSalesRepresentatives: findSalesRepresentatives, 
  getAuthentications: getAuthentications,
  findManagerUsers: findManagerUsers,
  findParters: findParters,

};

export default queries;
     