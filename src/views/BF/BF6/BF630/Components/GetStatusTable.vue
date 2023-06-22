<template>
  <!-- <a-spin :spinning="loadingTab1 || loadingTab2 || loadingTab3 || loadingTab4"> -->
  <!-- <span class="tag-status-null" style="padding:1px 10px;opacity: 50%" v-if="!beforeProductionRequest">제작요청전</span>
    <template v-else>
      <a-tooltip placement="topLeft" color="#C00000" v-if="checkStatus(-1)">
        <template #title>{{ causeOfProductionFailure }}</template>
        <div>
          <production-status :typeTag="5" padding="1px 10px" />
        </div>
      </a-tooltip>
      <a-tooltip placement="topLeft" color="black" v-if="checkStatus(2)">
        <template #title>전자신고파일 다운로드</template>
        <div>
          <production-status :typeTag="4" padding="1px 10px" />
        </div>
      </a-tooltip>
      <production-status :typeTag="2" v-if="checkStatus(0)" padding="1px 10px" />
      <production-status :typeTag="3" v-if="checkStatus(1)" padding="1px 10px" />
    </template> -->
  <production-status :typeTag="2" v-if="checkStatus(0)" padding="1px 10px" />
  <production-status :typeTag="3" v-if="checkStatus(1)" padding="1px 10px" />
  <production-status :typeTag="4" v-if="checkStatus(2)" padding="1px 10px" :message="'전자신고파일 다운로드'" />
  <production-status :typeTag="5" v-if="checkStatus(-1)" padding="1px 10px" :message="message" />
  
  <!-- </a-spin> -->
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
    message: {
      type: String,
      default: '',
    }
    // tabName: {
    //   type: String,
    //   default: ''
    // },
    // beforeProductionRequest: {
    //   type: Boolean,
    //   default: false
    // }
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
    let causeOfProductionFailure = ref('')
    watch(dataSearch, (newVal) => {
      // if (newVal && !props.beforeProductionRequest) {
      //   if (props.tabName == 'tab1') {
      //     triggerTab1.value = true
      //   }
      //   if (props.tabName == 'tab2') {
      //     triggerTab2.value = true
      //   }
      //   if (props.tabName == 'tab3') {
      //     triggerTab3.value = true
      //   }
      //   if (props.tabName == 'tab4') {
      //     triggerTab4.value = true
      //   }
      // }
    }, {
      deep: true,
      immediate: true
    })

    // Query 
    // let {
    //   onResult: onResultTab1,
    //   loading: loadingTab1
    // } = useQuery(queries.getElectronicFilingsByIncomeWagePaymentStatement, dataSearch, () => ({
    //   enabled: triggerTab1.value,
    //   fetchPolicy: "no-cache"
    // }));

    // let {
    //   onResult: onResultTab2,
    //   loading: loadingTab2
    // } = useQuery(queries.getElectronicFilingsByIncomeRetirementPaymentStatement, dataSearch, () => ({
    //   enabled: triggerTab2.value,
    //   fetchPolicy: "no-cache"
    // }));

    // let {
    //   onResult: onResultTab3,
    //   loading: loadingTab3
    // } = useQuery(queries.getElectronicFilingsByIncomeBusinessPaymentStatement, dataSearch, () => ({
    //   enabled: triggerTab3.value,
    //   fetchPolicy: "no-cache"
    // }));

    // let {
    //   onResult: onResultTab4,
    //   loading: loadingTab4
    // } = useQuery(queries.getElectronicFilingsByIncomeExtraPaymentStatement, dataSearch, () => ({
    //   enabled: triggerTab4.value,
    //   fetchPolicy: "no-cache"
    // }));

    // active query by TAB
    // if (props.tabName == 'tab1') {
    //   triggerTab1.value = props.beforeProductionRequest == null ? false : true
    //   onResultTab1((res: any) => {
    //     triggerTab1.value = false
    //     if (res.data) {
    //       arrStatus.value = res.data.getElectronicFilingsByIncomeWagePaymentStatement[0]
    //       emit('productionStatusData', arrStatus.value);
    //     } else {
    //       emit('productionStatusData', null);
    //     }
    //   })
    // }
    // if (props.tabName == 'tab2') {
    //   triggerTab2.value = props.beforeProductionRequest == null ? false : true
    //   onResultTab2((res: any) => {
    //     triggerTab2.value = false
    //     if (res.data) {

    //       arrStatus.value = res.data.getElectronicFilingsByIncomeRetirementPaymentStatement[0]
    //       emit('productionStatusData', arrStatus.value);
    //     } else {
    //       emit('productionStatusData', null);
    //     }
    //   })
    // }
    // if (props.tabName == 'tab3') {
    //   triggerTab3.value = props.beforeProductionRequest == null ? false : true
    //   onResultTab3((res: any) => {
    //     triggerTab3.value = false
    //     if (res.data) {
    //       arrStatus.value = res.data.getElectronicFilingsByIncomeBusinessPaymentStatement[0]
    //       emit('productionStatusData', arrStatus.value);
    //     } else {
    //       emit('productionStatusData', null);
    //     }
    //   })
    // }
    // if (props.tabName == 'tab4') {
    //   triggerTab4.value = props.beforeProductionRequest == null ? false : true
    //   onResultTab4((res: any) => {
    //     triggerTab4.value = false
    //     if (res.data) {
    //       arrStatus.value = res.data.getElectronicFilingsByIncomeExtraPaymentStatement[0]
    //       emit('productionStatusData', arrStatus.value);
    //     } else {
    //       emit('productionStatusData', null);
    //     }
    //   })
    // }

    // watch(() => props.data, (newVal) => {
    //   if (newVal) {
    //     console.log(newVal);

    //     arrStatus.value = [newVal];
    //   }
    //   console.log('arrStatus', arrStatus.value);

    // }, { immediate: true })
    const checkStatus = (status: any) => {
      // if (!!arrStatus.value && arrStatus.value.productionStatus === status) {
      //   causeOfProductionFailure.value = arrStatus.value?.causeOfProductionFailure || ''
      //   return true
      // } else {
      //   return false
      // }
      // if (arrStatus.value.filter((val: any) => val.productionStatus == status).length != 0) return true;
      // else return false;
      if (props.data?.productionStatus == status) return true;
      else return false;
    }

    return {
      arrStatus, checkStatus,
      //  loadingTab1, loadingTab2, loadingTab3, loadingTab4, 
      causeOfProductionFailure
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
