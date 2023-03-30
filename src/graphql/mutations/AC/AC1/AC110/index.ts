import syncBankbookDetails from './syncBankbookDetails'
import registerTransactionDetailsToAccountingDocuments from './registerTransactionDetailsToAccountingDocuments'
import unregisterTransactionDetailsToAccountingDocuments from './unregisterTransactionDetailsToAccountingDocuments'
import initializeTransactionDetails from './initializeTransactionDetails'
const mutations = {
  syncBankbookDetails,
  registerTransactionDetailsToAccountingDocuments,
  unregisterTransactionDetailsToAccountingDocuments,
  initializeTransactionDetails
};

export default mutations;
