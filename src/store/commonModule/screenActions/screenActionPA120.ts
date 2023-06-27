import { useQuery } from "@vue/apollo-composable";
import { watch, ref } from "vue";
import queries from "@/graphql/queries/PA/PA1/PA120/index";

const screenActionPA120 = {
  // getDePartMents(context: any, payload: any) {
  //   const { onError: errorDepartments, result: resDepartments } = useQuery(
  //     queries.getDepartments,
  //     { companyId: payload },
  //     () => ({
  //       enabled: payload !== null,
  //       fetchPolicy: "no-cache",
  //     })
  //   );
  //   errorDepartments((_error) => {
  //     //notification('error', error.message);
  //   });

  //   watch(resDepartments, (value: any) => {
  //     if (value) {
  //       let arrDepartments: any = [];
  //       arrDepartments = value.getDepartments.map((item: any) => ({
  //         value: item.department,
  //       }));
  //       context.commit("getDePartMents", arrDepartments);
  //     }
  //   });
  // },
  // getResponsibilities: (context: any, payload: any) => {
  //   const { onError: errorResponsibility, result: resResponsibility } =
  //     useQuery(queries.getResponsibilities, { companyId: payload }, () => ({
  //       fetchPolicy: "no-cache",
  //     }));

  //   errorResponsibility((_error) => {
  //     //notification('error', error.message);
  //   });

  //   watch(resResponsibility, (value: any) => {
  //     if (value) {
  //       let arrResponsibility = value.getResponsibilities.map((item: any) => ({
  //         value: item.responsibility,
  //       }));
  //       context.commit("getResponsibilities", arrResponsibility);
  //     }
  //   });
  // },
  //----------------- get Deduction Data---------------------------

  deductionItemsPA120: (context: any, payload: any) => {
    const { result: resConfigDeduction } = useQuery(
      queries.getWithholdingConfigDeductionItems,
      payload,
      () => ({
        fetchPolicy: "no-cache",
      })
    );
    watch(resConfigDeduction, (value) => {
      if (value) {
        let dataConfigDeduction =
          value.getWithholdingConfigDeductionItems.filter((item: any) => {
            if (item.itemCode == 1001) {
              return { itemCode: item.itemCode, name: item.name, value: 0 };
            }
            if (item.itemCode == 1002) {
              return { itemCode: item.itemCode, name: item.name, value: 0 };
            }
            if (item.itemCode == 1003) {
              return { itemCode: item.itemCode, name: item.name, value: 0 };
            }
            if (item.itemCode == 1004) {
              return { itemCode: item.itemCode, name: item.name, value: 0 };
            }
            if (item.itemCode == 1011) {
              return { itemCode: item.itemCode, name: item.name, value: 0 };
            }
            if (item.itemCode == 1012) {
              return { itemCode: item.itemCode, name: item.name, value: 0 };
            }
          });
        context.commit("deductionItemsPA120", dataConfigDeduction);
      }
    });
  },
  payItemsPA120: (context: any, payload: any) => {
    const { result: resConfigPayItems } = useQuery(
      queries.getWithholdingConfigPayItems,
      payload,
      () => ({
        fetchPolicy: "no-cache",
      })
    );
    watch(resConfigPayItems, async (value) => {
      if (value) {
        let dataConfigPayItems = value.getWithholdingConfigPayItems.map(
          (item: any) => {
            return {
              itemCode: item.itemCode,
              name: item.name,
              tax: item.tax,
              taxPayItemCode: item.taxPayItemCode,
              taxfreePayItemCode: item.taxfreePayItemCode,
              taxfreePayItemName: item.taxfreePayItemName,
              taxFreeIncludeSubmission: item.taxFreeIncludeSubmission,
              value: 0,
            };
          }
        );
        context.commit("payItemsPA120", dataConfigPayItems);
      }
    });
  },
};

export default screenActionPA120;
