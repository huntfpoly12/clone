import syncBankbookDetails from './syncBankbookDetails'
import registerTransactionDetailsToAccountingDocuments from './registerTransactionDetailsToAccountingDocuments'
import unregisterTransactionDetailsToAccountingDocuments from './unregisterTransactionDetailsToAccountingDocuments'
import initializeTransactionDetails from './initializeTransactionDetails'
import addBankbookDetailProof from './addBankbookDetailProof'
import removeBankbookDetailProof from './removeBankbookDetailProof'
import saveTransactionDetails from './saveTransactionDetails'
const mutations = {
  syncBankbookDetails,
  registerTransactionDetailsToAccountingDocuments,
  unregisterTransactionDetailsToAccountingDocuments,
  initializeTransactionDetails,
  addBankbookDetailProof,
  removeBankbookDetailProof,
  saveTransactionDetails
};

export default mutations;
