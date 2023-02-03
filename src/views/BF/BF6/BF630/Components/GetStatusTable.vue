<template>
    <a-spin :spinning="loadingTab1|| loadingTab2 || loadingTab3 || loadingTab4">
        <production-statuses :typeTag="2" v-if="checkStatus(0)" padding="1px 10px" />
        <production-statuses :typeTag="3" v-if="checkStatus(1)" padding="1px 10px" />
        <production-statuses :typeTag="4" v-if="checkStatus(2)" padding="1px 10px" />
        <production-statuses :typeTag="5" v-if="checkStatus(-1)" padding="1px 10px" />
    </a-spin>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import queries from "@/graphql/queries/BF/BF6/BF630/index";
import { useQuery } from "@vue/apollo-composable";

export default defineComponent({
    props: {
        data: {
            type: Object,
            default: {}
        },
        tabName: {
            type: String,
            default: ''
        }
    },
    setup(props, { emit }) {
      let arrStatus = ref([])
      let dataSearch = ref({
            input: {
                companyId: props.data?.companyId,
                paymentYear: props.data?.paymentYear,
            }
      })

      const trigger = ref<boolean>(true);

      // Query 
      let {
        onResult: onResultTab1,
        refetch: refetchTab1,
        loading : loadingTab1
      } = useQuery(queries.getElectronicFilingsByIncomeWagePaymentStatement, dataSearch, () => ({
          enabled: trigger.value,
          fetchPolicy: "no-cache"
      }));

      let {
        onResult: onResultTab2,
        refetch: refetchTab2,
        loading : loadingTab2
      } = useQuery(queries.getElectronicFilingsByIncomeRetirementPaymentStatement, dataSearch, () => ({
          enabled: trigger.value,
          fetchPolicy: "no-cache"
      }));

      let {
        onResult: onResultTab3,
        refetch: refetchTab3,
        loading : loadingTab3
      } = useQuery(queries.getElectronicFilingsByIncomeBusinessPaymentStatement, dataSearch, () => ({
          enabled: trigger.value,
          fetchPolicy: "no-cache"
      }));

      let {
        onResult: onResultTab4,
        refetch: refetchTab4,
        loading : loadingTab4
      } = useQuery(queries.getElectronicFilingsByIncomeExtraPaymentStatement, dataSearch, () => ({
          enabled: trigger.value,
          fetchPolicy: "no-cache"
      }));

      // active query by TAB
      if (props.tabName == 'tab1') {
        trigger.value = true
        refetchTab1();
        onResultTab1((res: any) => {
          arrStatus.value = res.data.getElectronicFilingsByIncomeWagePaymentStatement
          trigger.value = false
        })
      }
      if (props.tabName == 'tab2') {
        trigger.value = true
        refetchTab2();
        onResultTab2((res: any) => {
          arrStatus.value = res.data.getElectronicFilingsByIncomeRetirementPaymentStatement
          trigger.value = false
        })
      }
      if (props.tabName == 'tab3') {
        trigger.value = true
        refetchTab3();
        onResultTab3((res: any) => {
          arrStatus.value = res.data.getElectronicFilingsByIncomeBusinessPaymentStatement
          trigger.value = false
        })
      }
      if (props.tabName == 'tab4') {
        trigger.value = true
        refetchTab4();
        onResultTab4((res: any) => {
          arrStatus.value = res.data.getElectronicFilingsByIncomeExtraPaymentStatement
          trigger.value = false
        })
      }


      const checkStatus = (status: any) => {
            if (arrStatus.value.filter((val: any) => val.productionStatus == status).length != 0)
                return true
            else
                return false
      }

      return {
            arrStatus, checkStatus, loadingTab1,loadingTab2,loadingTab3,loadingTab4
      }
    }
})
</script>
