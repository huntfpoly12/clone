import updateWithholdingConfig from "./updateWithholdingConfig";
import updateWithholdingConfigPayItem from "./updateWithholdingConfigPayItem";
import createWithholdingConfigPayItem from "./createWithholdingConfigPayItem";
import deleteWithholdingConfigPayItem from "./deleteWithholdingConfigPayItem";

const mutations = {
    updateWithholdingConfig: updateWithholdingConfig,
    updateWithholdingConfigPayItem:updateWithholdingConfigPayItem,
    createWithholdingConfigPayItem:createWithholdingConfigPayItem,
    deleteWithholdingConfigPayItem:deleteWithholdingConfigPayItem
};

export default mutations;
