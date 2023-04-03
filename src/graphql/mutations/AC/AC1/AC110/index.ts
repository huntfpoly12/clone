import syncBankbookDetails from './syncBankbookDetails'
import registerTransactionDetailsToAccountingDocuments from './registerTransactionDetailsToAccountingDocuments'
import unregisterTransactionDetailsToAccountingDocuments from './unregisterTransactionDetailsToAccountingDocuments'
import initializeTransactionDetails from './initializeTransactionDetails'
import addBankbookDetailProof from './addBankbookDetailProof'
import removeBankbookDetailProof from './removeBankbookDetailProof'
import saveTransactionDetails from './saveTransactionDetails'
import deleteStatementOfGoods from './deleteStatementOfGoods'
import saveStatementOfGoods from './saveStatementOfGoods'
const mutations = {
  syncBankbookDetails,
  registerTransactionDetailsToAccountingDocuments,
  unregisterTransactionDetailsToAccountingDocuments,
  initializeTransactionDetails,
  addBankbookDetailProof,
  removeBankbookDetailProof,
  saveTransactionDetails,
  deleteStatementOfGoods,
  saveStatementOfGoods
};

export default mutations;
