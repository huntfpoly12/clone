<template>
  <a-spin :spinning="filingsByWithholdingLoading">
    <production-status :typeTag="2" v-if="checkStatus(0)" padding="1px 10px" />
    <production-status :typeTag="3" v-if="checkStatus(1)" padding="1px 10px" />
    <production-status :typeTag="4" v-if="checkStatus(2)" padding="1px 10px" />
    <production-status :typeTag="5" v-if="checkStatus(-1)" padding="1px 10px" />
  </a-spin>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch, reactive } from "vue";
import queries from '@/graphql/queries/BF/BF6/BF620/index';
import { useQuery } from '@vue/apollo-composable';
import notification from "@/utils/notification";
export default defineComponent({
  props: {
    dataProcduct: {
      type: Object,
      // required: true,
    },
  },
  setup(props, { emit }) {
    ///
    let arrStatus = ref<any[]>([]);
    const filingsBywithholdingTrigger = ref(false);
    watch(()=> props.dataProcduct, (newVal)=> {
      if(newVal){
        filingsBywithholdingTrigger.value = true;
      }
    },{ immediate: true })
    const dataSearch = reactive({
      input: {
        companyId: props.dataProcduct?.companyId,
        imputedYear: props.dataProcduct?.imputedYear,
        reportId: props.dataProcduct?.reportId,
      },
    });
    let {
      result: filingsByWithholdingResult,
      loading: filingsByWithholdingLoading,
      refetch: filingsByWithholdingRefetch,
      onError: filingsByWithholdingError,
    } = useQuery(queries.getElectronicFilingsByWithholdingTax, dataSearch, () => ({
      enabled: filingsBywithholdingTrigger.value,
      fetchPolicy: 'no-cache',
    }));
    watch(filingsByWithholdingResult, (newVal) => {
      let data = newVal.getElectronicFilingsByWithholdingTax;
      arrStatus.value = data;
      filingsBywithholdingTrigger.value = false;
      if (data) {
        emit('productionStatusData', data[0]);
      }
    });
    filingsByWithholdingError((res: any)=> {notification('error', res.message)})
    const checkStatus = (status: any) => {
      if (arrStatus.value.filter((val: any) => val.productionStatus == status).length != 0) return true;
      else return false;
    };
    return {
      arrStatus,
      checkStatus,
      filingsByWithholdingLoading,
    };
  },
});
</script>