import { getJwtObject } from "@bankda/jangbuda-common";
let companyId: any = null
let userType: any = null
let userId: any = null
let infoUser: any = null
const token = sessionStorage.getItem("token");
if (token) {
    const jwtObject = getJwtObject(token);
    userType = jwtObject.userType
    userId = jwtObject.userId
    infoUser = jwtObject.screenRoleInfo
    if (userType === 'c') {
        companyId = jwtObject.companyId
    }
}

export { companyId, userType, userId, infoUser }