<template>
  <div class="facilityBizType-header">
    <a @click="openPopup"><span  v-if="acStateYear">회계({{ namelFacilityBiz }}, {{acStateYear}}) </span> <span v-if="paStateYear">원천({{paStateYear}})</span></a>
  </div>
  <a-modal :visible="modalConfirm" :closable="false" :width="paStateYear && acStateYear ? 420 : 377" footer="" :bodyStyle="{padding: '15px'}">
    <a-spin :spinning="!userInfor" size="small">
      <standard-form  formName="forget-password" ref="settingFacilityBizType">
      <h2 :style="paStateYear && acStateYear ? {'padding-left':'39px','margin-top': '20px'}:''">시설사업 및 귀속연도 선택</h2>
        <div class="popup-content">
          <a-row class="item-row">
            <a-col  :span="24">
              <span >회계업무 시설사업 / 귀속연도 선택</span>
            </a-col>
          </a-row>
          <div style="width: 266px;">
            <a-row  class="item-row ac-settings">
              <a-col  :span="24" >
                <div style="display: flex;">
                  <DxSelectBox :noDataText="Message.getMessage('COMMON', '901').message" width="195px" :data-source="listFacilityBizTypeForUser"
                    v-model:value="facilityBiz"  :display-expr="'name'" :value-expr="'facilityBusinessId'"
                  :height="$config_styles.HeightInput"  placeholder="사업유형 선택" :disabled="!infos" style="margin-right: 2px;">
                  <DxValidator>
                        <DxRequiredRule :message=" Message.getMessage('COMMON', '102').message" />
                    </DxValidator>
                  </DxSelectBox>

                  <DxSelectBox :noDataText="Message.getMessage('COMMON', '901').message" v-model:value="acYear" :items="acArrYear"  width="70px" :disabled="!infos" placeholder="년" :height="$config_styles.HeightInput">
                    <DxValidator>
                        <DxRequiredRule :message=" Message.getMessage('COMMON', '102').message" />
                    </DxValidator>
                  </DxSelectBox>
                </div>
              </a-col>
            </a-row>
            <hr/>
            <a-row  class="item-row  pa-settings">
              <a-col :span="24">
                <div style="display: flex;">
                  <span style="width: 195px;" :class="!info ? 'opacity': ''" > 원천업무 귀속연도 선택 </span>
                  <DxSelectBox :noDataText="Message.getMessage('COMMON', '901').message" v-model:value="paYear" :items="paArrYear" width="70px" :disabled="!info" placeholder="년" :height="$config_styles.HeightInput">
                    <DxValidator>
                        <DxRequiredRule :message=" Message.getMessage('COMMON', '102').message" />
                    </DxValidator>
                  </DxSelectBox>
                </div>
              </a-col>
            </a-row>
          </div>

          <a-row v-if="paStateYear && acStateYear" class="warning-text">
            <a-col :span="24">
              <p>시설사업을 변경하시면,</p>
              <p>- 모든 작업창이 닫히고 처음 로그인한 상태로 새로 설정됩니다.</p>
              <p>- 저장하지 않은 데이터는 모두 사라집니다.</p>
              <p style="margin-top: 15px;">그래도 변경하시겠습니까?</p>
            </a-col>
          </a-row>
      </div>
      <a-row>
        <a-col :span="9" :offset="paStateYear && acStateYear ? 8 : 9">
          <div style="display: flex;">
            <button-basic v-if="paStateYear && acStateYear" class="button-form-modal" :text="'아니오'" :type="'normal'" :mode="'contained'" @onClick="handleCancel" style="margin-right: 10px;"/>
            <DxButton
              :width="74"
              @click="handleOk"
              styling-mode="contained"
              :style="{ color: $config_styles.ColorButtonDefault, backgroundColor: '#0078D7', border: $config_styles.BorderButtonDefault }"
              :height="$config_styles.HeightInput"
              :text="paStateYear && acStateYear ? '네' : '확인'"
            />
          </div>
        </a-col>
      </a-row>
      </standard-form>
    </a-spin>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted,  } from "vue";
import { useStore } from 'vuex';
import DxSelectBox from "devextreme-vue/select-box";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import { setMenuTab } from "@/helpers/commonFunction";
import { WarningOutlined } from "@ant-design/icons-vue";
import DxButton from 'devextreme-vue/button';
import { getJwtObject } from "@bankda/jangbuda-common";
import notification from "@/utils/notification"
import { Message } from "@/configs/enum";
import dayjs from "dayjs";
import queries from "@/graphql/queries/BF/BF3/BF320/index";
import { useQuery } from "@vue/apollo-composable";

export default defineComponent({
  components: {
    WarningOutlined,DxSelectBox, DxValidator, DxRequiredRule,DxButton
  },
  setup() {
    const token  = sessionStorage.getItem("token")
    const acStateYear = ref(sessionStorage.getItem("acYear"))
    const paStateYear = ref(sessionStorage.getItem("paYear"))
    const namelFacilityBiz = ref(sessionStorage.getItem("name"))
    const globalFacilityBizId = ref(sessionStorage.getItem("globalFacilityBizId"))
    const modalConfirm = ref<boolean>(false)
    const facilityBiz: any = ref(null)
    const jwtObject = getJwtObject(token!);
    const settingFacilityBizType = ref()
    let infos = jwtObject.accounting;
    let info = jwtObject.withholding;
    const store = useStore();
    store.dispatch('auth/getUserInfor');
    const userInfor = computed(() => store.getters['auth/getUserInfo'])
    const acYear = ref(dayjs().year())
    const paYear = ref(dayjs().year())
    const companyId = computed(() => sessionStorage.getItem("token") ? getJwtObject(sessionStorage.getItem("token") as string).companyId : null)
    let listFacilityBizTypeForUser:any = ref([]);
    const dataQuery = ref({
      companyId: companyId.value
    });
    const facilityBusinessTrigger = ref(false);
    onMounted(() => {
      if((jwtObject.userType === 'c' || jwtObject.payload?.aut) && !globalFacilityBizId.value && !acStateYear.value && !paStateYear.value){
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

    const setFacility = (param: any) => {
      listFacilityBizTypeForUser.value = param;
      store.commit('settings/setListFacilityBizTypeForUser', param)
      if (!(paStateYear.value && acStateYear.value)) facilityBiz.value = param[0]?.facilityBusinessId || null;
    }
    if(companyId.value && jwtObject.payload.aut){
      facilityBusinessTrigger.value = true;
    }
    const {result} = useQuery(queries.getMyCompanyFacilityBusinesses,dataQuery,
    () => ({
        enabled: facilityBusinessTrigger.value,
        fetchPolicy: "no-cache",
    }))
    watch(result, (newVal: any)=> {
      if(newVal){
        setFacility(newVal.getMyCompanyFacilityBusinesses);
      }
    })
    watch(userInfor, (newVal: any) => {
      if(jwtObject.userType != 'm'){
        setFacility(newVal.facilityBusinesses);
      }
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
          sessionStorage.setItem("facilityBizType", dt.facilityBizType)
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
        if (globalFacilityBizId.value) {
          store.dispatch('settings/getAccountSubject', { companyId: companyId.value, fiscalYear: Number(dayjs().year()), facilityBizType: parseInt(globalFacilityBizId.value) })
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
      settingFacilityBizType,
      userInfor
    }
  },
});
</script>

<style lang="scss" scoped>
.popup-content{
  padding: 10px 10px 10px 10px;
}
.facilityBizType-header{
  display: flex;
  align-items: center;
  &-label {
    margin-right: 10px;
  }
}

p {
    margin-top: 0;
    margin-bottom: 0em;
}
.item-row{
  margin-bottom: 15px;
  margin-top: 15px;
}
.opacity{
  opacity: 50%;
}
.warning-text{
  p{
    font-size: 11px;
  }
}
.pa-settings{
  span{
    margin: 5px 0px;
  }
}

</style>
