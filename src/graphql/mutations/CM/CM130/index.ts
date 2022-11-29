import updateWithholdingConfig from "./updateWithholdingConfig";
import updateWithholdingConfigPayItem from "./updateWithholdingConfigPayItem";
import createWithholdingConfigPayItem from "./createWithholdingConfigPayItem";
import deleteWithholdingConfigPayItem from "./deleteWithholdingConfigPayItem";
import updateWithholdingConfigDeductionItem from "./updateWithholdingConfigDeductionItem";
const mutations = {
    updateWithholdingConfig: updateWithholdingConfig,
    updateWithholdingConfigPayItem:updateWithholdingConfigPayItem,
    createWithholdingConfigPayItem:createWithholdingConfigPayItem,
    deleteWithholdingConfigPayItem:deleteWithholdingConfigPayItem,
    updateWithholdingConfigDeductionItem: updateWithholdingConfigDeductionItem,
};

export default mutations;
