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
import { useStore } from "vuex";
export default defineComponent({
  props: {
    data: Object,
  },
  setup(props, { emit }) {
    ///
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear);
    let arrStatus = ref([]);
    const dataSearch = reactive({
      input: {
        companyId: props.data?.companyId,
        imputedYear: globalYear.value,
        reportId: props.data?.reportId,
      },
    });
    let {
      result: filingsByWithholdingResult,
      loading: filingsByWithholdingLoading,
      refetch: filingsByWithholdingRefetch,
    } = useQuery(queries.getElectronicFilingsByWithholdingTax, dataSearch, () => ({
      fetchPolicy: 'no-cache',
    }));
    watch(filingsByWithholdingResult, (newVal) => {
      let data = newVal.getfilingsByWithholding;
      arrStatus.value = data;
      if (data) {
        emit('productionStatusData', data[0]);
      }
    });
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