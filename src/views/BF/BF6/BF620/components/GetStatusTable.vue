<template>
  <production-status :typeTag="2" v-if="checkStatus(0)" padding="1px 10px" />
  <production-status :typeTag="3" v-if="checkStatus(1)" padding="1px 10px" />
  <production-status :typeTag="4" v-if="checkStatus(2)" padding="1px 10px" />
  <production-status :typeTag="5" v-if="checkStatus(-1)" padding="1px 10px" />
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch, reactive } from "vue";
export default defineComponent({
  props: {
    dataProcduct: {
      type: Object,
      // required: true,
    },
    isCallApi: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, { emit }) {
    ///
    let arrStatus = ref<any[]>([]);
    // const filingsBywithholdingTrigger = ref(props.isCallApi);

    // const dataSearch = reactive({
    //   input: {
    //     companyId: props.dataProcduct?.companyId,
    //     imputedYear: props.dataProcduct?.imputedYear,
    //     reportId: props.dataProcduct?.reportId,
    //   },
    // });
    // watch(() => props.isCallApi, (newVal: boolean) => {
    //   filingsBywithholdingTrigger.value = newVal;
    // }, { deep: true })
    // let {
    //   result: filingsByWithholdingResult,
    //   loading: filingsByWithholdingLoading,
    //   onError: filingsByWithholdingError,
    // } = useQuery(queries.getElectronicFilingsByWithholdingTax, dataSearch, () => ({
    //   enabled: filingsBywithholdingTrigger.value,
    //   fetchPolicy: 'no-cache',
    // }));
    // watch(filingsByWithholdingResult, (newVal) => {
    //   let data = newVal.getElectronicFilingsByWithholdingTax;
    //   arrStatus.value = data;
    //   filingsBywithholdingTrigger.value = false;
    //   if (data) {
    //     emit('productionStatusData', { ...data[0], companyId: props.dataProcduct?.companyId });
    //   }
    // });
    // filingsByWithholdingError((res: any) => {
    //   notification('error', res.message);
    //   emit('productionStatusData', {});
    //   filingsBywithholdingTrigger.value = false;
    // })
    watch(() => props.dataProcduct, (newVal) => {
      if (newVal) {
        arrStatus.value = [newVal];
      }
    }, { immediate: true })
    const checkStatus = (status: any) => {
      if (arrStatus.value.filter((val: any) => val.productionStatus == status).length != 0) return true;
      else return false;
    };
    return {
      arrStatus,
      checkStatus,
      // filingsByWithholdingLoading,
    };
  },
});
</script>