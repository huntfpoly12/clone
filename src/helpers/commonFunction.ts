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

export { companyId, userType, userId, infoUser, onExportingCommon }