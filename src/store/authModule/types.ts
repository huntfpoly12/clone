import {JwtObject} from "@bankda/jangbuda-common";

export interface UserInfo {
  id: string;
  type: string;
  username: string;
  name: string;
  mobilePhone: string;
  email: string;
  president: string;
  managerGrade?: boolean;
  accountingRole?: boolean;
  withholdingRole?: boolean;
  active: boolean;
  groupCode: string;
  groupName: string;

}
export interface AuthState {
  userInfor: UserInfo | null;
  authData: string | null
  token: string
  tokenInfo: JwtObject | {}
}
