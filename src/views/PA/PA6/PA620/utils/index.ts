interface Origindata {
  page: number;
  rows: number;
  statuses: number[];
  grade: null | number;
  name: string;
  code: string;
}
export const origindata: Origindata = {
  page: 1,
  rows: 10,
  statuses: [1],
  grade: null,
  name: "",
  code: "",
};

export const ArrForeigner = [
  { id: false, text: "내국인" },
  { id: true, text: "외국인" },
];

export const valueDefaultAction = {
  employeeId: null,
  name: "",
  foreigner: false,
  nationality: "대한민국",
  nationalityCode: "KR",
  stayQualification: "C-4",
  residentId: "",
  incomeTypeCode: "940100",
  incomeTypeName: "저술가",
  email: "",
};

import { companyId } from "@/helpers/commonFunction";
// import { useStore } from "vuex";
// import { computed } from "vue";
// /* Using vuex to get the value of paymentDayPA620. */
// export const  dataActionUtils = {
//     setup() {
//     const store = useStore();
//     const paymentDayPA620 = computed(() => store.state.common.paymentDayPA620);
//       return {
//         companyId: companyId,
//         processKey: {
//         imputedYear: 2022,
//         imputedMonth: 1,
//         paymentYear: 2022,
//         paymentMonth: 1,
//         },
//         input: {
//         paymentDay: paymentDayPA620.value,
//         employeeId: 0,
//         incomeTypeCode: "",
//         paymentAmount: 0,
//         taxRate: 3,
//         withholdingIncomeTax: 0,
//         withholdingLocalIncomeTax: 0,
//         }
//       };
//     }
//   };
// const paymentDayPA620 = computed(() => 1);
export const dataActionUtils = {
  companyId: companyId,
  processKey: {
    imputedYear: 2022,
    imputedMonth: 1,
    paymentYear: 2022,
    paymentMonth: 1,
  },
  input: {
    employeeId: 0,
    incomeTypeCode: "",
    paymentAmount: 0,
    taxRate: 3,
    withholdingIncomeTax: 0,
    withholdingLocalIncomeTax: 0,
    paymentDay: 0,
  },
};
export const dataGetDetailEdit = {
  companyId: companyId,
  processKey: {
    imputedYear: 2022,
    imputedMonth: 1,
    paymentYear: 2022,
    paymentMonth: 1,
  },
  incomeId: 0,
};

export const arrDropDownUtil = [
  { id: 1, url: "520", event: "520", title: "" },
  {
    id: 2,
    function: "History",
    event: "History",
    title: "일용직근로소득자료 변경이력",
  },
  {
    id: 2,
    function: "HistoryStatus",
    event: "HistoryStatus",
    title: "일용직근로소득 마감상태 변경이력",
  },
];

export const DataAddNew = {
  incomeId: null,
  paymentDay: null,
  employeeType: null,
  employeeId: null,
  incomeTypeCode: "",
  incomePayment: null,
  withholdingIncomeTax: null,
  withholdingLocalIncomeTax: null,
  withholdingRuralSpecialTax: null,
  prevPaymentDay: null,
  paymentAmount: null,
  taxRate: null,
  actualPayment: null,
  employee: {
    name: "",
    incomeTypeName: "",
  },
};
