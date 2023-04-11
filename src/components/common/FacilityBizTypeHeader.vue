<template>
  <div class="facilityBizType-header">
    <label for="" class="facilityBizType-header-label">시설사업명</label>
    <select-box-common :arrSelect="listFacilityBizTypeForUser" v-model:valueInput="facilityBiz" displayeExpr="name" valueExpr="facilityBizType"
      width="170px" placeholder="사업유형 선택" :searchEnabled="false"/>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch,  } from "vue";
import { useStore } from 'vuex';
import queries from "@/graphql/queries/BF/BF3/BF310/index";
import { useQuery } from "@vue/apollo-composable";
// import { FacilityBizType } from "@bankda/jangbuda-common";
export default defineComponent({
  components: {
  },
  setup() {
    const store = useStore();
    const token = computed(()=>sessionStorage.getItem("token"))
    store.dispatch('auth/getUserInfor', token.value);
    const userInfor = computed(() => store.state.auth.userInfor)
    const trigger = ref<boolean>(false)
    let payload = ref({
      id: userInfor.value.id,
    })
    const globalFacilityBizId = computed(() => store.state.settings.globalFacilityBizId)
    let facilityBiz: any = ref(null)
    let listFacilityBizTypeForUser:any = ref([])
    // let facilityBizTypeCommon = ref()
    // facilityBizTypeCommon.value = FacilityBizType.all();
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

    const { result } = useQuery(
        queries.getSubscriptionRequest, payload.value,
        () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        })
    );
    watch(() => userInfor.value?.id, (value) => {
      if(value){
        payload.value.id = value
        trigger.value = true
      }
    },{
      deep: true
    })
    watch(result, (value) => {
      if(value.getSubscriptionRequest) {
        listFacilityBizTypeForUser.value = value.getSubscriptionRequest.content.accounting.facilityBusinesses
        facilityBiz.value = listFacilityBizTypeForUser.value[0].facilityBizType
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
