import dayjs from "dayjs";
import filters from "@/helpers/filters";
// export const initialArrayRadioCheck = [
//   { id: 0, text: '구입' },
//   { id: 1, text: '운반' },
//   { id: 2, text: '수선' },
//   { id: 3, text: '인쇄' },
//   { id: 4, text: '지출' }
// ]
export const initialArrayRadioMonth = [
  { id: 1, text: '01' },
  { id: 2, text: '02' },
  { id: 3, text: '03' },
  { id: 4, text: '04' },
  { id: 5, text: '05' },
  { id: 6, text: '06' },
  { id: 7, text: '07' },
  { id: 8, text: '08' },
  { id: 9, text: '09' },
  { id: 10, text: '10' },
  { id: 11, text: '11' },
  { id: 12, text: '12' },

]
// export const initialStateFormAdd = {
//   bankbookId: null,
//   transactionDetailDate: filters.formatDateToInterger(dayjs().startOf('month').toDate()),
//   resolutionType: 11,
//   amount: null,
//   summary: '',
//   fundingSource: 3,
//   letterOfApprovalType: null,
//   accountCode: null,
// };
export const initialStateFormData = {
  bankbookId: null,
  paymentDate: null,
  resolutionType: 11,
  amount: null,
  summary: '',
  fundingSource: 3,
  letterOfApprovalType: null,
  theOrder: 1,
  resolutionClassification: 1,
  transactionDetailDate: filters.formatDateToInterger(dayjs().startOf('month').toDate()),
  // resolutionDate: filters.formatDateToInterger(dayjs().startOf('month').toDate()),
  // transactionDetailDate: filters.formatDateToInterger(dayjs().startOf('month').toDate()),
  causeActionDate: null,
  proposedDate: null,
  accountingDate: null,
  registrationDate: null,
  // bankbook: {
  //   bankbookNickname: null,
  //   bankbookNumber: null,
  // },
  
  accountCode: null,
  relationCode: null,
  // clientId: null,
  source: null,
  writer: null,
  memo: null,
  causeUsage: null,
  statementOfGoodsItems: null,
  // goodsCount: null,

  accountingDocumentId: null,
}
export const initStatementOfGoods = {
  item: '',
  standard: '',
  unit: '',
  quantity: null,
  unitPrice: null,
  amount: null,
  remark: ''
};