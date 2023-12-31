import getEmployeeWageDailies from "@/graphql/queries/common/getEmployeeWageDailies";
import getDepartments from "../../../common/getDepartments";
import getResponsibilities from "../../../common/getResponsibilities";
import getEmployeeWageDaily from "@/graphql/queries/common/getEmployeeWageDaily";
import getWithholdingConfigPayItems from "./getWithholdingConfigPayItems";
import getWithholdingConfigDeductionItems from "./getWithholdingConfigDeductionItems";

const queries = {
    getEmployeeWageDailies: getEmployeeWageDailies,
    getDepartments: getDepartments,
    getResponsibilities: getResponsibilities,
    getEmployeeWageDaily: getEmployeeWageDaily,
    getWithholdingConfigPayItems: getWithholdingConfigPayItems,
    getWithholdingConfigDeductionItems: getWithholdingConfigDeductionItems,
};
export default queries;
