import reorderAccountingDocuments from './reorderAccountingDocuments'
import unregisterAccountingDocument from './unregisterAccountingDocument'
import initializeTransactionDetails from './initializeTransactionDetails'
import createAccountingDocument from './createAccountingDocument'
import updateAccountingDocument from './updateAccountingDocument'
import saveStatementOfGoods from '../AC110/saveStatementOfGoods'
import deleteStatementOfGoods from '../AC110/deleteStatementOfGoods'
import addAccountingDocumentProof from './addAccountingDocumentProof'
import removeAccountingDocumentProof from './removeAccountingDocumentProof'
const mutations = {
    reorderAccountingDocuments,
    unregisterAccountingDocument,
    initializeTransactionDetails,
    createAccountingDocument,
    updateAccountingDocument,
    saveStatementOfGoods,
    deleteStatementOfGoods,
    addAccountingDocumentProof,
    removeAccountingDocumentProof
};

export default mutations;