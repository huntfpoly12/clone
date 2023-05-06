import getAccountingProcesses from '../AC110/getAccountingProcesses';
import getAccountingDocuments from './getAccountingDocuments'
import searchSpendingAccountingDocuments from './searchSpendingAccountingDocuments'
import getAccountingDocumentProofs from './getAccountingDocumentProofs'
import getMyCompany from "@/graphql/queries/common/getMycompany";
import searchStatementOfGoodsItems from '../AC110/searchStatementOfGoodsItems';
import searchStatementOfGoodsStandards from '../AC110/searchStatementOfGoodsStandards';
import searchStatementOfGoodsUnits from '../AC110/searchStatementOfGoodsUnits';
const queries = {
    getAccountingProcesses,
    getAccountingDocuments,
    searchSpendingAccountingDocuments,
    getAccountingDocumentProofs,
    getMyCompany,
    searchStatementOfGoodsItems,
    searchStatementOfGoodsStandards,
    searchStatementOfGoodsUnits
 };
 
 export default queries;