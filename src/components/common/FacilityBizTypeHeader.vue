<template>
  <div class="facilityBizType-header">
    <label for="" class="facilityBizType-header-label">시설사업명</label>
    <select-box-common :arrSelect="listFacilityBizTypeForUser" v-model:valueInput="facilityBiz" displayeExpr="name" valueExpr="facilityBusinessId"
      width="170px" placeholder="사업유형 선택" :searchEnabled="false"/>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch,  } from "vue";
import { useStore } from 'vuex';
import queries from "@/graphql/queries/CM/CM110/index"
import { useQuery } from "@vue/apollo-composable";
import { companyId } from "@/helpers/commonFunction";
export default defineComponent({
  components: {
  },
  setup() {
    const store = useStore();
    const trigger = ref<boolean>(false)
    const globalFacilityBizId = computed(() => store.state.settings.globalFacilityBizId)
    let facilityBiz: any = ref(null)
    let listFacilityBizTypeForUser:any = ref([])
    watch(() => facilityBiz.value, (value) => {
      store.commit('settings/setGlobalFacilityBizId', value)
    },{
      deep: true,
    })
    watch(() => globalFacilityBizId.value, (value) => {
      if(value === facilityBiz)return
      facilityBiz.value = value
    },{
      deep: true,
      immediate: true,
    })

    const { result } = useQuery(
        queries.getDataFacilityBusiness, {
          companyId: companyId
        },
        () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        })
    );
    watch(()=> companyId, (value) => {
      if(!!value) {
        trigger.value = true
      }
    }, {
      deep: true,
      immediate: true
    })
    watch(result, (value) => {
      if(!!value.getMyCompanyFacilityBusinesses && value.getMyCompanyFacilityBusinesses.length) {
        listFacilityBizTypeForUser.value = value.getMyCompanyFacilityBusinesses
        store.commit('settings/setListFacilityBizTypeForUser', value.getMyCompanyFacilityBusinesses)
      }
      trigger.value = false
    })
    return {
      facilityBiz,
      listFacilityBizTypeForUser
      // facilityBizTypeCommon
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
