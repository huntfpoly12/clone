<template>
  <div class="facilityBizType-header">
    <label for="" class="facilityBizType-header-label">시설사업명</label>
    <select-box-common :arrSelect="facilityBizTypeCommon" v-model:valueInput="facilityBiz" displayeExpr="n" valueExpr="v"
      width="170px" placeholder="사업유형 선택" :searchEnabled="false"/>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useStore } from 'vuex';
import { FacilityBizType } from "@bankda/jangbuda-common";
export default defineComponent({
  components: {
  },
  setup() {
    const store = useStore();
    const globalFacilityBizId = computed(() => store.state.settings.globalFacilityBizId)
    let facilityBiz = ref(1)
    let facilityBizTypeCommon = ref()
    facilityBizTypeCommon.value = FacilityBizType.all();
    watch(() => facilityBiz.value, (value) => {
      store.commit('settings/setGlobalFacilityBizId', value)
    },{
      deep: true,
      immediate: true
    })
    watch(() => globalFacilityBizId.value, (value) => {
      if(value === facilityBiz)return
      facilityBiz.value = value
    })
    return {
      facilityBiz,
      facilityBizTypeCommon
    }
  },
});
</script>

<style lang="scss" scoped>
.facilityBizType-header{
  display: flex;
  align-items: center;
  margin-right: 20px;
  &-label {
    margin-right: 10px;
  }
}
</style>
