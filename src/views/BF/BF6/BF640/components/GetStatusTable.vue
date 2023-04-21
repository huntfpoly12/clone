<template>
  <production-status :typeTag="2" v-if="checkStatus(0)" padding="1px 10px" />
  <production-status :typeTag="3" v-if="checkStatus(1)" padding="1px 10px" />
  <production-status :typeTag="4" v-if="checkStatus(2)" padding="1px 10px" :message="'전자신고파일 다운로드'" />
  <production-status :typeTag="5" v-if="checkStatus(-1)" padding="1px 10px" :message="message" />
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch, reactive } from "vue";
export default defineComponent({
  props: {
    dataProcduct: {
      type: Object,
      required: true,
    },
    message: {
      type: String,
      default: '',
    }
  },
  setup(props) {
    ///
    let arrStatus = ref<any[]>([]);
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