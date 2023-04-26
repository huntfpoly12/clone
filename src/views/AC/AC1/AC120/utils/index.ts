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
export const initialStateFormAdd = {
  bankbookId: null,
  // resolutionDate: filters.formatDateToInterger(dayjs().startOf('month').toDate()),
  resolutionType: 11,
  amount: null,
  summary: '',
  fundingSource: 3,
  letterOfApprovalType: null,
};
export const initialStateFormData = {
  bankbookId: null,
  paymentDate: null,
  resolutionType: 11,
  amount: null,
  summary: '',
  fundingSource: 3,
  letterOfApprovalType: null,
  theOrder: 1,
  resolutionClassification: null,
  // resolutionDate: filters.formatDateToInterger(dayjs().startOf('month').toDate()),
  // transactionDetailDate: filters.formatDateToInterger(dayjs().startOf('month').toDate()),
  causeActionDate: null,
  proposedDate: null,
  accountingDate: null,
  registrationDate: null,
  bankbook: {
    bankbookNickname: null,
    bankbookNumber: null,
  },
  
  accountCode: null,
  relationCode: null,
  // clientId: null,
  source: null,
  writer: null,
  memo: null,
  causeUsage: null,
  statementOfGoodsItems: null,
  // goodsCount: null,

  accountingDocumentId: 'AC120',
}
export const dataDemoMain = [
  {
    fill1: 20230330,
    data: [
      {
        id: "1",
        fill2: "운영비",
        fill3: "2023-12-23",
        fill4: "홈플러스",
        fill5: "체크카드|KB금융",
        fill6: 1000,
        fill7: 1500,
        fill8: 4500000,
        fill9: "1",
        fill10: "2",
        normality: true,
        slipRegistration: true,
      },
      {
        id: "2",
        fill2: "운영비",
        fill3: "2023-12-23",
        fill4: "홈플러스",
        fill5: "체크카드|KB금융",
        fill6: 1000,
        fill7: 1500,
        fill8: 4500000,
        fill9: "1",
        fill10: "2",
        normality: false,
        slipRegistration: true,
      },
      {
        id: "43",
        fill2: "운영비",
        fill3: "2023-12-23",
        fill4: "홈플러스",
        fill5: "체크카드|KB금융",
        fill6: 1000,
        fill7: 1500,
        fill8: 4500000,
        fill9: "1",
        fill10: "2",
        normality: true,
        slipRegistration: false,
      },
    ],
  },
  {
    fill1: 20230220,
    data: [
      {
        id: "44",
        fill2: "운영비",
        fill3: "2023-12-23",
        fill4: "홈플러스",
        fill5: "체크카드|KB금융",
        fill6: 1000,
        fill7: 1500,
        fill8: 4500000,
        fill9: "1",
        fill10: "2",
        normality: true,
        slipRegistration: true,
      },
      {
        id: "45",
        fill2: "운영비",
        fill3: "2023-12-23",
        fill4: "홈플러스",
        fill5: "체크카드|KB금융",
        fill6: 1000,
        fill7: 1500,
        fill8: 4500000,
        fill9: "1",
        fill10: "2",
        normality: false,
        slipRegistration: false,
      },
    ],
  },

  {
    fill1: 20230512,
    data: [
      {
        id: "33",
        fill2: "운영비",
        fill3: "2023-12-23",
        fill4: "홈플러스",
        fill5: "체크카드|KB금융",
        fill6: 1000,
        fill7: 1500,
        fill8: 4500000,
        fill9: "1",
        fill10: "2",
        normality: true,
        slipRegistration: false,
      },
    ],
  },
];
export const dataDemoMain2 = [
  {
    id: "1",
    fill1: 20230330,
    fill2: "운영비1",
    fill3: "2023-12-23",
    fill4: "홈플러스",
    fill5: "체크카드|KB금융",
    fill6: 1000,
    fill7: 1500,
    fill8: 4500000,
    fill9: "1",
    fill10: "2",
    normality: true,
    slipRegistration: true,
  },
  {
    id: "2",
    fill1: 20230330,
    fill2: "운영비2",
    fill3: "2023-12-23",
    fill4: "홈플러스",
    fill5: "체크카드|KB금융",
    fill6: 1000,
    fill7: 1500,
    fill8: 4500000,
    fill9: "1",
    fill10: "2",
    normality: false,
    slipRegistration: true,
  },
  {
    id: "43",
    fill1: 20230330,
    fill2: "운영비3",
    fill3: "2023-12-23",
    fill4: "홈플러스",
    fill5: "체크카드|KB금융",
    fill6: 1000,
    fill7: 1500,
    fill8: 4500000,
    fill9: "1",
    fill10: "2",
    normality: true,
    slipRegistration: false,
  },
  {
    id: "44",
    fill1: 20230330,
    fill2: "운영비4",
    fill3: "2023-12-23",
    fill4: "홈플러스",
    fill5: "체크카드|KB금융",
    fill6: 1000,
    fill7: 1500,
    fill8: 4500000,
    fill9: "1",
    fill10: "2",
    normality: true,
    slipRegistration: true,
  },
  {
    id: "45",
    fill1: 20230330,
    fill2: "운영비5",
    fill3: "2023-12-23",
    fill4: "홈플러스",
    fill5: "체크카드|KB금융",
    fill6: 1000,
    fill7: 1500,
    fill8: 4500000,
    fill9: "1",
    fill10: "2",
    normality: false,
    slipRegistration: false,
  },
  {
    id: "33",
    fill1: 20230330,
    fill2: "운영비6",
    fill3: "2023-12-23",
    fill4: "홈플러스",
    fill5: "체크카드|KB금융",
    fill6: 1000,
    fill7: 1500,
    fill8: 4500000,
    fill9: "1",
    fill10: "2",
    normality: true,
    slipRegistration: false,
  },
  {
    id: "34",
    fill1: 20230330,
    fill2: "운영비7",
    fill3: "2023-12-23",
    fill4: "홈플러스",
    fill5: "체크카드|KB금융",
    fill6: 1000,
    fill7: 1500,
    fill8: 4500000,
    fill9: "1",
    fill10: "2",
    normality: true,
    slipRegistration: true,
  },
  {
    id: "35",
    fill1: 20230330,
    fill2: "운영비8",
    fill3: "2023-12-23",
    fill4: "홈플러스",
    fill5: "체크카드|KB금융",
    fill6: 1000,
    fill7: 1500,
    fill8: 4500000,
    fill9: "1",
    fill10: "2",
    normality: false,
    slipRegistration: false,
  },
  // {
  //   id: "13",
  //   fill1: 20230330,
  //   fill2: "운영비9",
  //   fill3: "2023-12-23",
  //   fill4: "홈플러스",
  //   fill5: "체크카드|KB금융",
  //   fill6: 1000,
  //   fill7: 1500,
  //   fill8: 4500000,
  //   fill9: "1",
  //   fill10: "2",
  //   normality: true,
  //   slipRegistration: false,
  // },
  // {
  //   id: "14",
  //   fill1: 20230330,
  //   fill2: "운영비10",
  //   fill3: "2023-12-23",
  //   fill4: "홈플러스",
  //   fill5: "체크카드|KB금융",
  //   fill6: 1000,
  //   fill7: 1500,
  //   fill8: 4500000,
  //   fill9: "1",
  //   fill10: "2",
  //   normality: true,
  //   slipRegistration: true,
  // },
  // {
  //   id: "15124",
  //   fill1: 20230330,
  //   fill2: "운영비11",
  //   fill3: "2023-12-23",
  //   fill4: "홈플러스",
  //   fill5: "체크카드|KB금융",
  //   fill6: 1000,
  //   fill7: 1500,
  //   fill8: 4500000,
  //   fill9: "1",
  //   fill10: "2",
  //   normality: false,
  //   slipRegistration: false,
  // },
  // {
  //   id: "1232",
  //   fill1: 20230330,
  //   fill2: "운영비11",
  //   fill3: "2023-12-23",
  //   fill4: "홈플러스",
  //   fill5: "체크카드|KB금융",
  //   fill6: 1000,
  //   fill7: 1500,
  //   fill8: 4500000,
  //   fill9: "1",
  //   fill10: "2",
  //   normality: false,
  //   slipRegistration: false,
  // },
  // {
  //   id: "15345",
  //   fill1: 20230330,
  //   fill2: "운영비11",
  //   fill3: "2023-12-23",
  //   fill4: "홈플러스",
  //   fill5: "체크카드|KB금융",
  //   fill6: 1000,
  //   fill7: 1500,
  //   fill8: 4500000,
  //   fill9: "1",
  //   fill10: "2",
  //   normality: false,
  //   slipRegistration: false,
  // },
  // {
  //   id: "15235",
  //   fill1: 20230330,
  //   fill2: "운영비11",
  //   fill3: "2023-12-23",
  //   fill4: "홈플러스",
  //   fill5: "체크카드|KB금융",
  //   fill6: 1000,
  //   fill7: 1500,
  //   fill8: 4500000,
  //   fill9: "1",
  //   fill10: "2",
  //   normality: false,
  //   slipRegistration: false,
  // },
  // {
  //   id: "15456",
  //   fill1: 20230330,
  //   fill2: "운영비11",
  //   fill3: "2023-12-23",
  //   fill4: "홈플러스",
  //   fill5: "체크카드|KB금융",
  //   fill6: 1000,
  //   fill7: 1500,
  //   fill8: 4500000,
  //   fill9: "1",
  //   fill10: "2",
  //   normality: false,
  //   slipRegistration: false,
  // },
  // {
  //   id: "15457456",
  //   fill1: 20230330,
  //   fill2: "운영비11",
  //   fill3: "2023-12-23",
  //   fill4: "홈플러스",
  //   fill5: "체크카드|KB금융",
  //   fill6: 1000,
  //   fill7: 1500,
  //   fill8: 4500000,
  //   fill9: "1",
  //   fill10: "2",
  //   normality: false,
  //   slipRegistration: false,
  // },
];
export const initStatementOfGoods = {
  item: '',
  standard: '',
  unit: '',
  quantity: null,
  unitPrice: null,
  amount: null,
  remark: ''
};
export const contentPopupRetrieveStatements =
  "새로운 통장내역이 있는 경우 추가로 불러옵니다. 자주 사용시 시스템 부하를 줄 수 있기에, 제한되는 경우가 있으니 주의하셔서 이용하시기 바랍니다. 그래도 불러오시겠습니까?";
