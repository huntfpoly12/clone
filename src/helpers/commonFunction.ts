import { getJwtObject } from "@bankda/jangbuda-common";
let companyId: any = null
const token = sessionStorage.getItem("token");
if (token) {
    const jwtObject = getJwtObject(token);
    if (jwtObject.userType === 'c') {
        companyId = jwtObject.companyId
    }
}
export { companyId }