export const initialState = {};
export const MAX_UP_LOAD = 8;
export const InitTransactionDetails = {
  bankbookDetailDate: null,
  bankbookDetailId: null,
  bankbookId: null,
  bankbookDetailTime: null,
  summary: "",
  content: "",
  note: "",
  deposit: null,
  withdraw: null,
  balance: null,
  proofCount: null,
  transactionDetailsCount: null,
  normalTransactionDetails: null,
  documentRegistered: false,
  transactionDetails: {
    transactionDetailDate: null,
    accountingDocumentId: null,
    documentOrderByDate: null,
    bankbookId: null,
    bankbookDetailId: null,
    resolutionClassification: null,
    income: null,
    spending: null,
    summary: "",
    theOrder: null,
    accountCode: null,
    relationCode: null,
    fundingSource: null,
    clientId: null,
    letterOfApprovalType: null,
    causeUsage: "",
    goodsCount: null,
    memo: "",
    goodsId: null,
    documentRegistered: false,
  },
};
export const InitStatementOfGoods = {
  item: '',
  standard: '',
  unit: '',
  quantity: null,
  unitPrice: null,
  amount: null,
  remark: ''
};

export interface PayloadTransactionUpdate {
  resolutionClassification: number;
  income: number;
  spending: number;
  summary?: string;
  theOrder?: number;
  accountCode?: string;
  relationCode?: string;
  fundingSource?: number;
  letterOfApprovalType?: number;
  causeUsage?: string;
  memo?: string;
  clientId?: number;
  accountingDocumentId: number;
}
export interface PayloadTransactionCreate {
  resolutionClassification: number;
  income: number;
  spending: number;
  summary?: string;
  theOrder?: number;
  accountCode?: string;
  relationCode?: string;
  fundingSource?: number;
  letterOfApprovalType?: number;
  causeUsage?: string;
  memo?: string;
  clientId?: number;
}
export const contentPopupRetrieveStatements = `새로운 통장내역이 있는 경우 추가로 불러옵니다. 자주 </br>
사용시 시스템 부하를 줄 수 있기에, 제한되는 경우가 </br>
 있으니 주의하셔서 이용하시기 바랍니다. </br>
 그래도 불러오시겠습니까?`;
