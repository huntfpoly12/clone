<template>
  <div class="facilityBizType-header">
    <a @click="openPopup"><span  v-if="acStateYear">회계({{ namelFacilityBiz }}, {{acStateYear}}) </span> <span v-if="paStateYear">원천({{paStateYear}})</span></a>
  </div>
  <a-modal :visible="modalConfirm" :closable="false" :width="430" footer="" :bodyStyle="{padding: '15px'}">
    <standard-form  formName="forget-password" ref="settingFacilityBizType">
      <h2>시설사업 및 귀속연도 선택</h2>
        <div class="popup-content">
          <a-row class="item-row">
            <a-col  :span="24">
          <span >회계업무 시설사업 / 귀속연도 선택</span>
          </a-col>
          </a-row>
          <div>
            <a-row :gutter="16" class="item-row">
            <a-col  :span="12">
              <DxSelectBox  width="170px" :data-source="listFacilityBizTypeForUser" 
                  v-model:value="facilityBiz"  :display-expr="'name'" :value-expr="'facilityBusinessId'" 
                :height="$config_styles.HeightInput"  placeholder="사업유형 선택" :disabled="!infos">
                <DxValidator>
                    <DxRequiredRule :message=" Message.getMessage('COMMON', '102').message" />
                </DxValidator>
              </DxSelectBox>
            </a-col>
            <a-col :span="12">
              <DxSelectBox v-model:value="acYear" :items="acArrYear"  width="70px" :disabled="!infos" placeholder="년">
                <DxValidator>
                    <DxRequiredRule :message=" Message.getMessage('COMMON', '102').message" />
                </DxValidator>
              </DxSelectBox>
            </a-col>
          </a-row>
          <a-row :gutter="16" class="item-row">
            <a-col :span="12">
              <spa :class="!info ? 'opacity': ''"> 원천업무 귀속연도 선택 </spa>
            </a-col>
            <a-col :span="12">
              <DxSelectBox v-model:value="paYear" :items="paArrYear" width="70px" :disabled="!info" placeholder="년">              
                <DxValidator>
                    <DxRequiredRule :message=" Message.getMessage('COMMON', '102').message" />
                </DxValidator>
              </DxSelectBox>
            </a-col>
          </a-row>
          </div>

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
  </standard-form>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted,  } from "vue";
import { useStore } from 'vuex';
import DxSelectBox from "devextreme-vue/select-box";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import queries from "@/graphql/queries/CM/CM110/index"
import { useQuery } from "@vue/apollo-composable";
import { companyId, setMenuTab } from "@/helpers/commonFunction";
import { WarningOutlined } from "@ant-design/icons-vue";
import { getJwtObject } from "@bankda/jangbuda-common";
import notification from "@/utils/notification"
import { Message } from "@/configs/enum";
import dayjs from "dayjs";
dayjs

export default defineComponent({
  components: {
    WarningOutlined,DxSelectBox, DxValidator, DxRequiredRule
  },
  setup() {
    const token  = sessionStorage.getItem("token")
    const acStateYear = ref(sessionStorage.getItem("acYear"))
    const paStateYear = ref(sessionStorage.getItem("paYear"))
    const namelFacilityBiz = ref(sessionStorage.getItem("name"))
    const globalFacilityBizId = ref(sessionStorage.getItem("globalFacilityBizId"))
    const trigger = ref<boolean>(false)
    const modalConfirm = ref<boolean>(false)
    const facilityBiz: any = ref(null)
    const jwtObject = getJwtObject(token!);
    const settingFacilityBizType = ref()
    let infos = jwtObject.accounting;
    let info = jwtObject.withholding;
    const store = useStore();
    const acYear = ref(dayjs().year())
    const paYear = ref(dayjs().year())
    let listFacilityBizTypeForUser:any = ref([])
    onMounted(()=>{
      if(jwtObject.userType != 'm' && !globalFacilityBizId.value && !acStateYear.value && !paStateYear.value){
        modalConfirm.value = true
        trigger.value = true
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
    const { result } = useQuery(
        queries.getMyCompanyFacilityBusinesses, {
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
      var res = settingFacilityBizType.value.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
        return
      } else {
        if (infos) {
          let dt = listFacilityBizTypeForUser.value.find((item: any) => item.facilityBusinessId == facilityBiz.value)
          sessionStorage.setItem("globalFacilityBizId", facilityBiz.value)
          sessionStorage.setItem("name", dt.name)
          sessionStorage.setItem("acYear", acYear.value.toString())
          acStateYear.value = sessionStorage.getItem("acYear")
          namelFacilityBiz.value = sessionStorage.getItem("name")
          globalFacilityBizId.value = sessionStorage.getItem("globalFacilityBizId")
        }

        if (info) {
          sessionStorage.setItem("paYear", paYear.value.toString())
          paStateYear.value = sessionStorage.getItem("paYear")
        }

        //get and set account subject
        if (jwtObject.userType === 'c' && globalFacilityBizId.value) {
          store.dispatch('settings/getAccountSubject', { companyId: companyId, fiscalYear: Number(dayjs().year()), facilityBizType: parseInt(globalFacilityBizId.value) })
        }
        setMenuTab([])
        store.commit('settings/setChangeFacilityBusiness')
        modalConfirm.value = false
      }
    }
    const openPopup = () => {
      acYear.value = parseInt(sessionStorage.getItem("acYear")?? "0")
      paYear.value = parseInt(sessionStorage.getItem("paYear")?? "0")
      facilityBiz.value = parseInt(sessionStorage.getItem("globalFacilityBizId") ?? "0")
      trigger.value = true
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
      Message,
      settingFacilityBizType
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
