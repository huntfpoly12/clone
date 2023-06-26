import { getJwtObject } from "@bankda/jangbuda-common";
import dayjs from 'dayjs';
// common export data
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";
import store from "@/store";
import Router from '../router';
import filters from "./filters";

type CheckBonus = ('arr' | 'num')[];

let companyId: any = null
let startYearMonth: any = null
let userType: any = null
let userId: any = null
let managerGrade: any = null
let screenRoleInfo: any = null;
let accountSubject: any = Array()
let token = sessionStorage.getItem("token");
let dataAccountSubject = sessionStorage.getItem("accountSubject")
if (dataAccountSubject) {
  accountSubject =JSON.parse(dataAccountSubject)
}
if (token) {
    const jwtObject = getJwtObject(token);
    userType = jwtObject.userType
    userId = jwtObject.userId
    managerGrade = jwtObject.managerGrade
    screenRoleInfo = jwtObject.screenRoleInfo
  // if (userType === 'c') {
      companyId = jwtObject?.companyId || null;
      startYearMonth = jwtObject.withholding?.startYearMonth
  // }
}

const openTab = (objTab :  any) => {
  store.state.common.activeTab = objTab
  Router.push(objTab.url);
  if(store.state.common.menuTab.some((tab: any) => tab.id === objTab.id)) return
    store.state.common.menuTab.push(objTab)
    /**
     * If you already have a tab, don't add a new tab
     */
    // if (store.state.common.menuTab.filter((item : any )=> item.id === objTab.id).length == 0) {
    // }
}

const setMenuTab = (menu: any) => {
  store.state.common.menuTab = menu
}


const onExportingCommon = (component: any, cancel: boolean, name: String) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("employees");
    exportDataGrid({
        component: component,
        worksheet,
        autoFilterEnabled: true,
    }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(
                new Blob([buffer], { type: "application/octet-stream" }),
                name + ".xlsx"
            );
        });
    });
    cancel = true;
}


const convertAge = (idCart: any) => {
    if(idCart.length == 13 || idCart.split("-").length>1){
        let typeParam = idCart.length == 13 ? 1 : 2;
        let birthDay = typeParam == 1 ? idCart.toString().slice(0,6) : idCart.split("-")[0]
        let typeYear = typeParam == 1 ? idCart.toString().slice(6,13).charAt(0) : idCart.split("-")[1].charAt(0);
        if (typeYear == 1 || typeYear == 2 || typeYear == 5 || typeYear == 6) {
            const bdDate1 = '19' + birthDay.slice(0, 2) + '-' + birthDay.slice(2, 4) + '-' + birthDay.slice(4, 6);
            const date1 = dayjs(bdDate1);
            const date2 = dayjs();
            return date2.diff(date1, 'year') > 0 ? date2.diff(date1, 'year') : 0;
        }else if (typeYear == 3 || typeYear == 4 || typeYear == 7 || typeYear == 8) {
            const bdDate2 = '20' + birthDay.slice(0, 2) + '-' + birthDay.slice(2, 4) + '-' + birthDay.slice(4, 6);
            const date1 = dayjs(bdDate2);
            const date2 = dayjs();
            return date2.diff(date1, 'year') > 0 ? date2.diff(date1, 'year') : 0;
        }else if (typeYear == 0 || typeYear == 9) {
            const bdDate2 = '18' + birthDay.slice(0, 2) + '-' + birthDay.slice(2, 4) + '-' + birthDay.slice(4, 6);
            const date1 = dayjs(bdDate2);
            const date2 = dayjs();
            return date2.diff(date1, 'year') > 0 ? date2.diff(date1, 'year') : 0;
        }

    }else {
        return 0;
    }
}

const makeDataClean = (obj: any, excluded: any=[], checkBonus: CheckBonus=[]) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  Object.keys(obj).forEach((key) => {
    if(excluded.findIndex((item:any) => {return item == key}) > - 1 ){
      return;
    }
    if (typeof obj[key] === "string" && obj[key].trim() === "") {
      obj[key] = null;
    }
    checkBonus.forEach((item: any)=>{
      if(item == 'arr' && Array.isArray(obj[key]) && obj[key].length === 0){
        obj[key] = null;
      }
      if(item == 'num' && typeof obj[key] === "number" && obj[key] == null){
        obj[key] = 0;
      }
    })
    if (typeof obj[key] === "object") {
      obj[key] = makeDataClean(obj[key], excluded, checkBonus);
    }
  });

  return obj;
};

const convertBirthDayKorea = (residentId: string) => {
  const birthYear = residentId.slice(0, 2);
  const birthMonth = residentId.slice(2, 4);
  const birthDay = residentId.slice(4, 6);
  let century = '';

  // check length of residentId
  if (residentId.length !== 13 && residentId.length !== 14) {
    return null;
  }
  // check birthMonth and birthDay is valid
  if (parseInt(birthMonth) > 12 || parseInt(birthDay) > 31) {
    return null;
  }
  const genderCode = residentId.length === 13 ? residentId.slice(6, 7) : residentId.slice(7, 8)

  if (genderCode === '1' || genderCode === '2' || genderCode === '5' || genderCode === '6') {
    century = '19';
  } else if (genderCode === '3' || genderCode === '4' || genderCode === '7' || genderCode === '8') {
    century = '20';
  } else {
    return null;
  }

  return century + birthYear + '-' + birthMonth + '-' + birthDay;
}

//국민연금 사용자 부담금 계산
const calculateNationalPensionEmployee = (totalTaxPay: any, insuranceSupportPercent: number = 0) => {
    const nationalPensionEmloyeePercent = 0.045 //국민연금 근로자 부담율
    const nationalPensionUpperLimit = 248850 // 국민연금 상한액
    const nationalPensionLowerLimit = 15750 // 국민연금 하한액
    let nationalPensionEmployee = Math.floor(totalTaxPay / 1000) * 1000 * nationalPensionEmloyeePercent;
    if (insuranceSupportPercent != 0) {
        nationalPensionEmployee = nationalPensionEmployee * (100 - insuranceSupportPercent) / 100;
        nationalPensionEmployee = Math.floor(nationalPensionEmployee / 10) * 10
    }
    // 상한액 적용
    if (nationalPensionEmployee > nationalPensionUpperLimit) {
        nationalPensionEmployee = nationalPensionUpperLimit;
    }
    // 하한액 적용
    if (nationalPensionEmployee < nationalPensionLowerLimit) {
        nationalPensionEmployee = nationalPensionLowerLimit;
    }
    return nationalPensionEmployee
}

/** 건강보험 근로자 부담금 계산 **/
const calculateHealthInsuranceEmployee = (totaltaxpay: any) => {
    const healthInsuranceEmployeePercent = 0.03495 //건강보험 근로자 부담율
    const healthInsuranceUpperLimit = 3653550
    const healthInsuranceLowerLimit = 9750
    let healthinsuranceemployee = Math.floor(totaltaxpay * healthInsuranceEmployeePercent / 10) * 10 //계산후 원단위 절사
    // 상한액 적용
    if (healthinsuranceemployee > healthInsuranceUpperLimit) {
        healthinsuranceemployee = healthInsuranceUpperLimit
    }
    // 하한액 적용
    if (healthinsuranceemployee < healthInsuranceLowerLimit) {
        healthinsuranceemployee = healthInsuranceLowerLimit
    }
    return healthinsuranceemployee
}

/**장기요양보험 근로자 부담금 계산**/
const calculateLongTermCareInsurance = (totaltaxpay: any) => {
    const longTermCareInsurancePercent = 0.1227
    let longtermcareinsurance = calculateHealthInsuranceEmployee(totaltaxpay) // 건강보험료 계산결과 가져옴
    longtermcareinsurance = Math.floor(longtermcareinsurance * longTermCareInsurancePercent / 10) * 10 // 계산 후 원단위 절사
    return longtermcareinsurance
}

/** 고용보험 근로자 부담금 계산 **/
const calculateEmployeementInsuranceEmployee = (totalTaxPay: any, insurancesupportpercent: number = 0) => {
    const employeementInsuranceEmployeePercent = 0.009 //고용보험 근로자 부담율
    let employeementinsuranceemployee = Math.floor(totalTaxPay * employeementInsuranceEmployeePercent / 10) * 10  // 계산후 원단위 절사
    if (insurancesupportpercent != 0) {
        employeementinsuranceemployee = employeementinsuranceemployee * (100 - insurancesupportpercent) / 100 //두루누리적용
        employeementinsuranceemployee = Math.floor(employeementinsuranceemployee / 10) * 10 //원단위 절사
    }
    return employeementinsuranceemployee
}

const convertResidentId = (residentId: string) => {
  // add - to index 6
  return residentId.slice(0, 6) + '-' + residentId.slice(6);
}

const calcSummary = (arr: any[], property1: string,) => {
  let sum = arr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue[property1];
  }, 0)
  return filters.formatCurrency(sum);
}

const setNewUserToken = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const companyName:any = urlParams.get('companyName')||'';
    if (token) {
      // sessionStorage.setItem('token', token);
      sessionStorage.setItem('companyName', companyName);
      // sessionStorage.setItem('tabsCached', 'Example');
      const url = window.location.href;
      const baseUrl = url.split('?')[0];
      window.location.assign(baseUrl);
    }
}

export {
    companyId,
    openTab,
    setMenuTab,
    userType,
    userId,
    managerGrade,
    screenRoleInfo,
    onExportingCommon,
    convertAge,
    calculateNationalPensionEmployee,
    calculateHealthInsuranceEmployee,
    calculateLongTermCareInsurance,
    calculateEmployeementInsuranceEmployee,
    convertBirthDayKorea,
    makeDataClean,
    startYearMonth,
    convertResidentId,
    accountSubject,
    calcSummary,
    setNewUserToken,
}

