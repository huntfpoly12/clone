import { getJwtObject } from "@bankda/jangbuda-common";
import dayjs from 'dayjs';
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


// common export data 
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";

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


const convertAge = (idCart: any)=>{
    let birthDay = idCart.split("-")[0]
    let typeYear = idCart.split("-")[1].charAt(0)
    if (typeYear == 1 || typeYear == 2 || typeYear == 5 || typeYear == 6){
        const bdDate1 =  '19' + birthDay.slice(0, 2) + '-' + birthDay.slice(2, 4) + '-' + birthDay.slice(4, 6);
        const date1 = dayjs(bdDate1);
        const date2 = dayjs();
        return date2.diff(date1, 'year')
    }

    else if (typeYear == 3 || typeYear == 4 || typeYear == 7 || typeYear == 8){
        const bdDate2 = '20' + birthDay.slice(0, 2) + '-' + birthDay.slice(2, 4) + '-' + birthDay.slice(4, 6);
        const date1 = dayjs(bdDate2);
        const date2 = dayjs();
        return date2.diff(date1, 'year')
    }
}

export { companyId, userType, userId, infoUser, onExportingCommon ,convertAge}

