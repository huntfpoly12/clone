import syncBankbookDetails from './syncBankbookDetails'
import registerTransactionDetailsToAccountingDocuments from './registerTransactionDetailsToAccountingDocuments'
import unregisterTransactionDetailsToAccountingDocuments from './unregisterTransactionDetailsToAccountingDocuments'
import initializeTransactionDetails from './initializeTransactionDetails'
import addBankbookDetailProof from './addBankbookDetailProof'
import removeBankbookDetailProof from './removeBankbookDetailProof'
const mutations = {
  syncBankbookDetails,
  registerTransactionDetailsToAccountingDocuments,
  unregisterTransactionDetailsToAccountingDocuments,
  initializeTransactionDetails,
  addBankbookDetailProof,
  removeBankbookDetailProof
};

export default mutations;
