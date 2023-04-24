import getAccountingProcesses from '../AC110/getAccountingProcesses';
import getAccountingDocuments from './getAccountingDocuments'
import searchSpendingAccountingDocuments from './searchSpendingAccountingDocuments'
import getAccountingDocumentProofs from './getAccountingDocumentProofs'
import getMyCompany from "@/graphql/queries/common/getMycompany";
const queries = {
    getAccountingProcesses,
    getAccountingDocuments,
    searchSpendingAccountingDocuments,
    getAccountingDocumentProofs,
    getMyCompany,
 };
 
 export default queries;