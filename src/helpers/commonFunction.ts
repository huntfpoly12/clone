import { getJwtObject } from "@bankda/jangbuda-common";
import dayjs from 'dayjs';
// common export data 
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";
import store from "@/store";
import Router from '../router'; 

let companyId: any = null
let userType: any = null
let userId: any = null
let screenRoleInfo: any = null;
// store.dispatch('auth/setToke');
// const token = store.state.auth.token;
// const store = store;
let token = sessionStorage.getItem("token");
const setToken = () => {
  token = sessionStorage.getItem("token");
}
if(token) {
  console.log(`output->token`,token)
  token = sessionStorage.getItem("token");
}
console.log(`output->token`,token)
if (token) {
    const jwtObject = getJwtObject(token);
    userType = jwtObject.userType
    userId = jwtObject.userId
    screenRoleInfo = jwtObject.screenRoleInfo
    // if (userType === 'c') {
    //     companyId = jwtObject.companyId
    // }
}

const openTab = (objTab :  any) => {
    store.state.common.activeTab = objTab
    /**
     * If you already have a tab, don't add a new tab
     */
    if (store.state.common.menuTab.filter((item : any )=> item.id === objTab.id).length == 0) {
        store.state.common.menuTab.push(objTab)
    }
    Router.push(objTab.url);
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
    if(idCart.split("-").length>1){
        let birthDay = idCart.split("-")[0]
        let typeYear = idCart.split("-")[1].charAt(0);
        if (typeYear == 1 || typeYear == 2 || typeYear == 5 || typeYear == 6) {
        const bdDate1 = '19' + birthDay.slice(0, 2) + '-' + birthDay.slice(2, 4) + '-' + birthDay.slice(4, 6);
        const date1 = dayjs(bdDate1);
        const date2 = dayjs();
        return date2.diff(date1, 'year')
        }
        
        else if (typeYear == 3 || typeYear == 4 || typeYear == 7 || typeYear == 8) {
            const bdDate2 = '20' + birthDay.slice(0, 2) + '-' + birthDay.slice(2, 4) + '-' + birthDay.slice(4, 6);
            const date1 = dayjs(bdDate2);
            const date2 = dayjs();
            return date2.diff(date1, 'year')
        }
    }else {
        return 0;
    }
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

export {
    companyId,
    openTab,
    userType,
    userId,
    screenRoleInfo,
    onExportingCommon,
    convertAge,
    calculateNationalPensionEmployee,
    calculateHealthInsuranceEmployee,
    calculateLongTermCareInsurance,
    calculateEmployeementInsuranceEmployee,
    setToken
}

