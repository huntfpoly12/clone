import { JwtObject, UserType, getJwtObject } from "@bankda/jangbuda-common";
export default function useCheckPermission(roles: string[] | null, token: string | null = sessionStorage.getItem("token") ) {
  // get JwtObject from token
  if (!token || !roles || roles.length === 0) {
    return { read: false, write: false }
  } else {
    const jwtObject: JwtObject = getJwtObject(token);
    // get roles from JwtObject
    const readWorkScreenRoles = jwtObject.readWotkScreenRoles?.map((i: any) => i.enumKey)
    const writeWorkScreenRoles = jwtObject.writeWorkScreenRoles?.map((i: any) => i.enumKey)
    const readAdminScreenRoles = jwtObject.readAdminScreenRoles?.map((i: any) => i.enumKey)
    const writeAdminScreenRoles = jwtObject.writeAdminScreenRoles?.map((i: any) => i.enumKey)
    // get user type from JwtObject
    const userType = jwtObject.userType
    // return read and write permission
    if (userType === UserType.CUSTOMER) {

      return {
        read: roles.some((item) => readWorkScreenRoles?.includes(item)),
        write: roles.some((item) => writeWorkScreenRoles?.includes(item))
      }
    } else {
      if (jwtObject.additionalUserType === UserType.CUSTOMER) {
        // 일반사용자의 권한을 위임받은 경우
        return {
          read: roles.some((item) => readWorkScreenRoles?.includes(item)) || roles.some((item) => readAdminScreenRoles?.includes(item)),
          write: roles.some((item) => writeWorkScreenRoles?.includes(item)) || roles.some((item) => writeAdminScreenRoles?.includes(item))
        }
      } else {
        return {
          read: roles.some((item) => readAdminScreenRoles?.includes(item)),
          write: roles.some((item) => writeAdminScreenRoles?.includes(item))
        }
      }
    }
  };

}
