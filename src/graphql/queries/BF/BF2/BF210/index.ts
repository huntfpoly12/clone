import searchUsers from "@/graphql/queries/common/searchUsers";
import getUser from "./getUser";
import isUserRegistableUsername from "./isUserRegistableUsername";
import searchScreenRoleGroups from "./searchScreenRoleGroups";
import getAuthentications from "./getAuthentications";
import findGroups from "./findGroups";
const queries = {
  searchUsers: searchUsers,
  getUser: getUser,
  isUserRegistableUsername: isUserRegistableUsername,
  searchScreenRoleGroups: searchScreenRoleGroups,  
  getAuthentications: getAuthentications,  
  findGroups: findGroups

};

export default queries;
     