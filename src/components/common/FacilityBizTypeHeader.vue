<template>
  <div class="facilityBizType-header">
    <label for="" class="facilityBizType-header-label">시설사업명</label>
    <select-box-common :arrSelect="listFacilityBizTypeForUser" v-model:valueInput="facilityBiz" displayeExpr="name" valueExpr="facilityBusinessId"
      width="170px" placeholder="사업유형 선택" :searchEnabled="false" :itemClick="itemClick"/>
  </div>
  <a-modal :visible="modalConfirm" title="시설사업변경에 따른 주의 안내" :closable="false" :width="500" footer="">
    <a-row>
      <a-col :span="4">
          <warning-outlined :style="{ fontSize: '70px', color: '#faad14' }" />
      </a-col>
      <a-col :span="20" class="centent-wrap">
        <p>시설사업을 변경하시면,</p>
        <p>- 모든 작업창이 닫히고 처음 로그인한 상태로 새로 설정됩니다.</p>
        <p>- 저장하지 않은 데이터는 모두 사라집니다.</p>
        <p>그래도 변경하시겠습니까?</p>
      </a-col>
    </a-row>
    <a-row>
    <a-col :span="6" :offset="6"></a-col>
    <a-col :span="6" :offset="6">
      <div style="display: flex;">
        <button-basic class="button-form-modal" :text="'아니오'" :type="'normal'" :mode="'contained'" @onClick="handleCancel" style="margin-right: 10px;"/>
        <button-basic class="button-form-modal" :text="'네'" :width="140" :type="'default'"
                        :mode="'contained'" @onClick="handleOk" />
      </div>         
    </a-col>
  </a-row>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch,  } from "vue";
import { useStore } from 'vuex';
import { Modal } from 'ant-design-vue';
import queries from "@/graphql/queries/CM/CM110/index"
import { useQuery } from "@vue/apollo-composable";
import { companyId, setMenuTab } from "@/helpers/commonFunction";
import { WarningOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    WarningOutlined
  },
  setup() {
    const store = useStore();
    const trigger = ref<boolean>(false)
    const modalConfirm = ref<boolean>(false)
    const globalFacilityBizId = computed(() => store.state.settings.globalFacilityBizId)
    let facilityBizOld: any = ref(null)
    let facilityBiz: any = ref(null)
    let listFacilityBizTypeForUser:any = ref([])
    let firstLoad = ref(true)
    watch(facilityBiz, (newVal, oldVal) => {
      facilityBizOld.value = oldVal;
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
    const handleCancel = () => {
      modalConfirm.value = false
      facilityBiz.value = facilityBizOld.value
    }
    const handleOk = () => {
        store.commit('settings/setGlobalFacilityBizId', facilityBiz.value)
        setMenuTab([])
        modalConfirm.value = false
    }

    const itemClick = async (e: any) => {
      modalConfirm.value = true
    }
    return {
      facilityBiz,
      listFacilityBizTypeForUser,
      handleCancel,
      handleOk,
      modalConfirm,
      itemClick
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

p {
    margin-top: 0;
    margin-bottom: 0em;
}
</style>
