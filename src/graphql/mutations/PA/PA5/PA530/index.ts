import sendEmail from "./sendIncomeWageDailyWithholdingReceiptReportEmail"; 
import printFile from "./getIncomeWageDailyWithholdingReceiptReportViewUrl"; 
const mutations = {
    sendEmail: sendEmail, 
    printFile: printFile, 
};

export default mutations;