<template>
  <div class="facilityBizType-header">{{ acStateYear }}
    <a @click="openPopup"><span >회계({{ namelFacilityBiz }}, {{acStateYear}}) </span> <span v-if="paStateYear">원천({{paStateYear}})</span></a>
  </div>
  <a-modal :visible="modalConfirm" :closable="false" :width="430" footer="" :bodyStyle="{padding: '15px'}">
   <h2>시설사업 및 귀속연도 선택</h2>
    <div class="popup-content">
      <a-row class="item-row">
        <a-col  :span="24">
      <span >회계업무 시설사업 / 귀속연도 선택</span>
      </a-col>
      </a-row>
      <a-row :gutter="16" class="item-row">
        <a-col  :span="12">
          <DxSelectBox  width="170px" :data-source="listFacilityBizTypeForUser" 
              v-model:value="facilityBiz"  :display-expr="'name'" :value-expr="'facilityBusinessId'" 
            :height="$config_styles.HeightInput"  placeholder="사업유형 선택" :disabled="!infos">
          </DxSelectBox>
        </a-col>
        <a-col :span="12">
          <DxSelectBox v-model:value="acYear" :items="acArrYear"  width="70px" :disabled="!infos"/>
        </a-col>
      </a-row>
      <a-row :gutter="16" class="item-row">
        <a-col :span="12">
          <spa :class="!info ? 'opacity': ''"> 원천업무 귀속연도 선택 </spa>
        </a-col>
        <a-col :span="12">
          <DxSelectBox v-model:value="paYear" :items="paArrYear" width="70px" :disabled="!info"/>
        </a-col>
      </a-row>
      <a-row v-if="paStateYear && acStateYear">
        <a-col :span="24">
          <p>시설사업을 변경하시면,</p>
          <p>- 모든 작업창이 닫히고 처음 로그인한 상태로 새로 설정됩니다.</p>
          <p>- 저장하지 않은 데이터는 모두 사라집니다.</p>
          <p>그래도 변경하시겠습니까?</p>
        </a-col>
      </a-row>
  </div>
  <a-row>
    <a-col :span="6" :offset="8">
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
import { defineComponent, ref, computed, watch, onMounted,  } from "vue";
import { useStore } from 'vuex';
import DxSelectBox from "devextreme-vue/select-box";
import queries from "@/graphql/queries/CM/CM110/index"
import { useQuery } from "@vue/apollo-composable";
import { companyId, setMenuTab } from "@/helpers/commonFunction";
import { WarningOutlined } from "@ant-design/icons-vue";
import { getJwtObject } from "@bankda/jangbuda-common";
import notification from "@/utils/notification"
import dayjs from "dayjs";
dayjs
window.addEventListener('storage', (e) => {
  if (e.key === 'acYear') {
   alert()
  }
});
export default defineComponent({
  components: {
    WarningOutlined,DxSelectBox
  },
  setup() {
    const token  = sessionStorage.getItem("token")
    const acStateYear = computed(()=>sessionStorage.getItem("acYear"))
    const paStateYear = computed(()=>sessionStorage.getItem("paYear"))
    const namelFacilityBiz = computed(()=>sessionStorage.getItem("name"))
    const globalFacilityBizId = computed(()=>sessionStorage.getItem("globalFacilityBizId"))
    const jwtObject = getJwtObject(token!);
    let infos = jwtObject.accounting;
    let info = jwtObject.withholding;
    const store = useStore();
    const acYear = ref(dayjs().year())
    const paYear = ref(dayjs().year())
    onMounted(()=>{
      console.log(globalFacilityBizId.value ,acStateYear.value,paStateYear.value);
      
      if(!globalFacilityBizId.value && !acStateYear.value && !paStateYear.value){
        modalConfirm.value = true
      }
    })
    const acArrYear = computed(()=>{
      if(facilityBiz.value && infos){
          let act = infos?.find(item => item.id == facilityBiz.value)
          const year :any = act?.startYearMonth.toString().substring(0, 4);
          const currentYear = dayjs().year(); 
          let startYear = parseInt(year);
          const yearArray = [];
          for (startYear; startYear <= currentYear; startYear++) {
            yearArray.push(startYear);
          }
        return yearArray
      }
    })
    const paArrYear = computed(()=>{
      if(info){
          const year :any = info?.startYearMonth.toString().substring(0, 4);
          const currentYear = dayjs().year(); 
          let startYear = parseInt(year);
          const yearArray = [];
          for (startYear; startYear <= currentYear; startYear++) {
            yearArray.push(startYear);
          }
          return yearArray
      }
    })
    const trigger = ref<boolean>(true)
    const modalConfirm = ref<boolean>(false)

    const facilityBiz: any = ref(null)
    let listFacilityBizTypeForUser:any = ref([])

    const { result } = useQuery(
        queries.getDataFacilityBusiness, {
          companyId: companyId
        },
        () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        })
    );

    watch(result, (value) => {
      if(value && value.getMyCompanyFacilityBusinesses.length) {
        listFacilityBizTypeForUser.value = value.getMyCompanyFacilityBusinesses
        store.commit('settings/setListFacilityBizTypeForUser', value.getMyCompanyFacilityBusinesses)
      }
      trigger.value = false
    })


    const handleCancel = () => {
      if((globalFacilityBizId.value && acStateYear.value) || paStateYear.value  ){
        modalConfirm.value = false
      }else{
        notification('warning', 'you have not selected base project and allocation year')
      }
    }
    const handleOk = () => {
      let dt = listFacilityBizTypeForUser.value.find((item : any)=>item.facilityBusinessId == facilityBiz.value)
      sessionStorage.setItem("globalFacilityBizId", facilityBiz.value)
      sessionStorage.setItem("acYear", acYear.value.toString())
      sessionStorage.setItem("paYear", paYear.value.toString())
      sessionStorage.setItem("name", dt.name)
      //get and set account subject
      if (jwtObject.userType === 'c' && globalFacilityBizId.value) {
        store.dispatch('settings/getAccountSubject',{ companyId: companyId, fiscalYear: Number(dayjs().year()),facilityBizType: globalFacilityBizId.value})
      }
      setMenuTab([])
      modalConfirm.value = false
    }
    const openPopup = ()=>{
      modalConfirm.value = true
    }
    return {
      facilityBiz,
      listFacilityBizTypeForUser,
      namelFacilityBiz,
      globalFacilityBizId,
      handleCancel,
      handleOk,
      modalConfirm,
      acArrYear,
      paArrYear,
      paYear,
      acYear,
      infos,
      info,
      acStateYear,
      paStateYear,
      openPopup,
    }
  },
});
</script>

<style lang="scss" scoped>
.popup-content{
  padding: 0px 10px 10px 10px;
}
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
.item-row{
  margin-bottom: 10px;
}
.opacity{
  opacity: 50%;  
}
</style>
