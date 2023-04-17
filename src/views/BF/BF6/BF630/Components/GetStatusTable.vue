<template>
  <a-spin :spinning="loadingTab1 || loadingTab2 || loadingTab3 || loadingTab4">
  <span class="tag-status-null" style="padding:1px 10px;opacity: 50%" v-if="beforeProductionRequest">제작요청전</span>
  <template v-else>
    <production-status :typeTag="2" v-if="checkStatus(0)" padding="1px 10px" />
    <production-status :typeTag="3" v-if="checkStatus(1)" padding="1px 10px" />
    <production-status :typeTag="4" v-if="checkStatus(2)" padding="1px 10px" />
    <production-status :typeTag="5" v-if="checkStatus(-1)" padding="1px 10px" />
  </template>
  </a-spin>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, watch } from "vue";
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
    },
    beforeProductionRequest: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    let arrStatus = ref<any>()
    const triggerTab1 = ref<boolean>(false);
    const triggerTab2 = ref<boolean>(false);
    const triggerTab3 = ref<boolean>(false);
    const triggerTab4 = ref<boolean>(false);
    let dataSearch = reactive({
      input: {
        companyId: props.data?.companyId,
        imputedYear: props.data?.imputedYear
      }
    })

    watch(dataSearch, (newVal) => {
      if (newVal && !props.beforeProductionRequest) {
        if (props.tabName == 'tab1') {
          triggerTab1.value = true
        }
        if (props.tabName == 'tab2') {
          triggerTab2.value = true
        }
        if (props.tabName == 'tab3') {
          triggerTab3.value = true
        }
        if (props.tabName == 'tab4') {
          triggerTab4.value = true
        }
      }
    }, {
      deep: true,
      immediate: true
    })

    // Query 
    let {
      onResult: onResultTab1,
      refetch: refetchTab1,
      loading: loadingTab1
    } = useQuery(queries.getElectronicFilingsByIncomeWagePaymentStatement, dataSearch, () => ({
      enabled: triggerTab1.value,
      fetchPolicy: "no-cache"
    }));

    let {
      onResult: onResultTab2,
      refetch: refetchTab2,
      loading: loadingTab2
    } = useQuery(queries.getElectronicFilingsByIncomeRetirementPaymentStatement, dataSearch, () => ({
      enabled: triggerTab2.value,
      fetchPolicy: "no-cache"
    }));

    let {
      onResult: onResultTab3,
      refetch: refetchTab3,
      loading: loadingTab3
    } = useQuery(queries.getElectronicFilingsByIncomeBusinessPaymentStatement, dataSearch, () => ({
      enabled: triggerTab3.value,
      fetchPolicy: "no-cache"
    }));

    let {
      onResult: onResultTab4,
      refetch: refetchTab4,
      loading: loadingTab4
    } = useQuery(queries.getElectronicFilingsByIncomeExtraPaymentStatement, dataSearch, () => ({
      enabled: triggerTab4.value,
      fetchPolicy: "no-cache"
    }));

    // active query by TAB
    if (props.tabName == 'tab1') {
      triggerTab1.value = true
      refetchTab1();
      onResultTab1((res: any) => {
        if (res.data) {
          arrStatus.value = res.data.getElectronicFilingsByIncomeWagePaymentStatement[0]
          emit('productionStatusData', arrStatus.value);
        } else {
          emit('productionStatusData', null);
        }
        triggerTab1.value = false
      })
    }
    if (props.tabName == 'tab2') {
      triggerTab2.value = true
      refetchTab2();
      onResultTab2((res: any) => {
        if (res.data) {
          arrStatus.value = res.data.getElectronicFilingsByIncomeRetirementPaymentStatement[0]
          emit('productionStatusData', arrStatus.value);
        } else {
          emit('productionStatusData', null);
        }
        triggerTab2.value = false
      })
    }
    if (props.tabName == 'tab3') {
      triggerTab3.value = true
      refetchTab3();
      onResultTab3((res: any) => {
        if (res.data) {
          arrStatus.value = res.data.getElectronicFilingsByIncomeBusinessPaymentStatement[0]
          emit('productionStatusData', arrStatus.value);
        } else {
          emit('productionStatusData', null);
        }
        triggerTab3.value = false
      })
    }
    if (props.tabName == 'tab4') {
      triggerTab4.value = true
      refetchTab4();
      onResultTab4((res: any) => {
        if (res.data) {
          arrStatus.value = res.data.getElectronicFilingsByIncomeExtraPaymentStatement[0]
          emit('productionStatusData', arrStatus.value);
        } else {
          emit('productionStatusData', null);
        }
        triggerTab4.value = false
      })
    }


    const checkStatus = (status: any) => {
      if (!!arrStatus.value && arrStatus.value.productionStatus === status)
        return true
      else
        return false
    }

    return {
      arrStatus, checkStatus, loadingTab1, loadingTab2, loadingTab3, loadingTab4
    }
  }
})
</script>
<style scoped>
.tag-status-null {
  background-color: #A6A6A6;
  color: white;
  text-align: center;
  border-radius: 5px;
  margin-right: 5px;
  width: 80px;
}
</style>
