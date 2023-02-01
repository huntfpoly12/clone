<template>
  <div class="search-form">
    <a-row>
      <a-col :span="12">
        <a-row>
          <a-col :span="8">
            <a-form-item  label="귀속연도">
              <date-time-box :range="true" :multiCalendars="true" valueDate="2020-01-01"></date-time-box>
            </a-form-item>
          </a-col>
          <a-col :span="16">
            <div class="custom-note">
              <a-form-item  label="최종제작상태">
                <switch-basic v-model:valueSwitch="originData.beforeProduction"  :textCheck="'제작후'" :textUnCheck="'제작전'"/>
              </a-form-item>
              <span>
                <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 제작전은 제작요청되지 않은 상태입니다.
              </span>
            </div>
          </a-col>
        </a-row>

      </a-col>
      <a-col :span="12">
        
      </a-col>
    </a-row>
  </div>
  <div class="grid-view">
    <div class="header-grid-form">
      <a-row justify="start" :gutter="[16, 8]">
        <a-col class="custom-flex">
          <label class="lable-item">파일 제작 설정 :</label>
          <switch-basic  :textCheck="'세무대리인신고'" :textUnCheck="'납세자자진신고'"/>
          <span class="infor-icon">
                <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 본 설정으로 적용된 파일로 다운로드 및 메일발송 됩니다.
          </span>
        </a-col>
        <a-col class="custom-flex">
          <label class="lable-item">제출연월일:</label>
          <date-time-box width="150px" dateFormat="YYYY-MM-DD" />
        </a-col>
        <a-col class="custom-flex">
          <a-tooltip  color="black">
            <template #title>전자신고파일 제작 요청</template>
            <a-button class="ml-4" @click="requestIncomeFile">
                <SaveOutlined style="font-size: 17px" />
            </a-button>
          </a-tooltip>
        </a-col>
      </a-row>
    </div>
    <div class="content-grid">
      <a-spin :spinning="loadingIncomeExtraPayment || loadingElectronicFilings" size="large">
            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                :show-borders="true" key-expr="companyId" class="mt-10" :allow-column-reordering="move_column"
                :allow-column-resizing="colomn_resize" :column-auto-width="true">
                <DxScrolling mode="standard" show-scrollbar="always"/>
                <DxSelection mode="multiple" :fixed="true" />
                <DxColumn caption="사업자코드" data-field="company.code" />
                <DxColumn caption="상호 주소" cell-template="companyName" />
                <template #companyName="{ data }">
                  {{ data.data.company.name }}
                  {{ data.data.company.address }}
                </template>
                <DxColumn caption="사업자등록번호" data-field="company.bizNumber"/>
                <DxColumn caption="최종제작요청일시" cell-template="lastProductionRequestedAt"/>
                <template #lastProductionRequestedAt="{ data }">
                  {{ data.data.lastProductionRequestedAt }}
                </template>
                <DxColumn caption="제작현황" cell-template="imputed" />
                <template #imputed="{ data }"> 
                </template>
            </DxDataGrid>
        </a-spin>
    </div>
  </div>
  <request-file-popup v-if="modalRequestFile" :modalStatus="modalRequestFile"  @closePopup="modalRequestFile = false" :data="dataRequestFile"></request-file-popup>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import DxCheckBox from 'devextreme-vue/check-box';
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useStore } from "vuex";
import { DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling } from "devextreme-vue/data-grid";
import {SaveOutlined } from "@ant-design/icons-vue";
import DxButton from "devextreme-vue/button";
import queries from "@/graphql/queries/BF/BF6/BF630/index";
import {companyId} from "@/helpers/commonFunction"
import notification from "@/utils/notification";
import dayjs, { Dayjs } from "dayjs";
import RequestFilePopup from "./RequestFilePopup.vue"
export default defineComponent({
  components: {
    DxCheckBox,SaveOutlined,DxButton,DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling,RequestFilePopup
  },
  props: {
    activeSearch: {
      type: Number,
      default: 0,
    },
    activeSave: {
      type: Number,
      default: 0,
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const userInfor = computed(() => (store.state.auth.userInfor))
    const globalYear = computed(() => store.state.settings.globalYear)
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const trigger = ref<boolean>(false);
    const triggerElecFilings = ref<boolean>(false);
    // for checkbox 
    const checkbox1 = ref<boolean>(false);
    const checkbox2 = ref<boolean>(false);
    const checkbox3 = ref<boolean>(false);
    const checkbox4 = ref<boolean>(false);
    const modalRequestFile = ref<boolean>(false);
    let companyIds = Array();
    const dataRequestFile = ref()
    const originData = reactive({
          beforeProduction:true,
          productionStatuses:Array(),
          companyCode:'',
          companyName:'',
          manageUserId:0,
          salesRepresentativeId:0,
          excludeCancel:true,
          imputedYear: dayjs().year(),
      }
    )
    const dataSource = ref([])
    // ============ GRAPQL ===============================
    const {
        result:  resIncomeExtraPayment,
        onResult: onResIncomeExtraPayment,
        loading: loadingIncomeExtraPayment,
        refetch: refetchIncomeExtraPayment,
        onError: onErrorIncomeExtraPayment
    } = useQuery(queries.searchIncomeExtraPaymentStatementElectronicFilings, {
      filter: originData
    }, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
    }))

    
    const {
        result: resElectronicFilings,
        loading: loadingElectronicFilings,
        refetch: refetchElectronicFilings,
        onError: onErrorElectronicFilings
    } = useQuery(queries.getElectronicFilingsByIncomeWagePaymentStatement,
      {
        input: {
          companyId: companyId,
          imputedYear: globalYear.value,
        }
      }, () => ({
            enabled: triggerElecFilings.value,
            fetchPolicy: "no-cache",
    }))

    // ===================DONE GRAPQL==================================
    // watch result  api searchIncomeExtraPaymentStatementElectronicFilings
    onResIncomeExtraPayment(() => {
      trigger.value = false
    })
    watch(resIncomeExtraPayment, (value) => {
      if (value) {
        dataSource.value = value.searchIncomeExtraPaymentStatementElectronicFilings
        // create list company ID for request file
        dataSource.value.map((item : any) => {
          companyIds.push(item.companyId)
        })
      }
    })
    onErrorIncomeExtraPayment(e => {
            notification('error', e.message)
    })

    // watch result  api getElectronicFilingsByIncomeWagePaymentStatement
    watch(() => resElectronicFilings, (value) => {
      if (value) {
        console.log(value,'fdgdfg')
      }
    })
    onErrorElectronicFilings(e => {
            notification('error', e.message)
    })

    // watch checkbox change
    watch(checkbox1, (value) => {
      if (value) {
        originData.productionStatuses.push(0)
      } else {
        originData.productionStatuses = originData.productionStatuses.filter(function(item) {
            return item !== 0
        })
      };
    })
    watch(checkbox2, (value) => {
      if (value) {
        originData.productionStatuses.push(1)
      } else {
        originData.productionStatuses = originData.productionStatuses.filter(function(item) {
            return item !== 1
        })
      };
    })
    watch(checkbox3, (value) => {
      if (value) {
        originData.productionStatuses.push(2)
      } else {
        originData.productionStatuses = originData.productionStatuses.filter(function(item) {
            return item !== 2
        })
      };
    })
    watch(checkbox4, (value) => {
      if (value) {
        originData.productionStatuses.push(-1)
      } else {
        originData.productionStatuses = originData.productionStatuses.filter(function(item) {
            return item !== -1
        })
      };
    })

    // watch active searching
    watch(() => props.activeSearch, (value) => {
      trigger.value = true;
      refetchIncomeExtraPayment()
    })

    // request file popup action
    const requestIncomeFile = () => {
      dataRequestFile.value = {
        companyIds : companyIds,
        filter: originData,
        emailInput: {
          receiverName: userInfor.value.name,
          receiverAddress: userInfor.value.email
        }
      }
      modalRequestFile.value = true
    }
    return {
      globalYear,
      originData,
      move_column,
      colomn_resize,
      dataSource,
      checkbox1,
      checkbox2,
      checkbox3,
      checkbox4,
      loadingElectronicFilings,
      loadingIncomeExtraPayment,
      trigger,
      requestIncomeFile,
      modalRequestFile,
      dataRequestFile
    }
  }
})
</script>
<style  scoped lang="scss" src="../style/styleTabs.scss">
</style>

