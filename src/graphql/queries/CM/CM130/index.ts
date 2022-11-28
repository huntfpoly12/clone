import getWithholdingConfig from "./getWithholdingConfig";
import getWithholdingConfigPayItems from "./getWithholdingConfigPayItems";
import getWithholdingConfigPayItem from "./getWithholdingConfigPayItem";
import getPublicInstitution from "./getPublicInstitution";
import getWithholdingConfigDeductionItems from "./getWithholdingConfigDeductionItems"
const queries = { 
    getWithholdingConfig : getWithholdingConfig,
    getWithholdingConfigPayItems:getWithholdingConfigPayItems,
    getWithholdingConfigPayItem:getWithholdingConfigPayItem,
    getPublicInstitution: getPublicInstitution,
    getWithholdingConfigDeductionItems: getWithholdingConfigDeductionItems,
};

export default queries;