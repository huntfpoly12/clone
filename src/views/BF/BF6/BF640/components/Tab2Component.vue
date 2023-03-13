<template>
    <div id="step2">
        <a-row gutter="24" class="search-form-step-1">
            <a-col>{{ dataSearch.beforeProduction }}
                <a-form-item label="지급연월" label-align="left">
                    <month-picker-box-custom v-model:valueDate="datePayment" bgColor="black" text="지"/>
                </a-form-item>
            </a-col>
            <a-col class="ml-30">
                <a-form-item label="최종제작상태" label-align="left">
                    <div class="custom-note d-flex-center">
                        <switch-basic v-model:valueSwitch="beforeProduction" textCheck="제작후"
                            textUnCheck="제작전"/>
                        <div class="d-flex-center ml-5">
                            <img src="@/assets/images/iconInfo.png" style="width: 14px;" />
                            <span>제작전은 제작요청되지 않은 상태입니다.</span>
                        </div>
                    </div>
                </a-form-item>
                <div class="production-check">
                    <div class="d-flex-center custom-checkbox-search">
                        <checkbox-basic v-model:valueCheckbox="typeCheckbox.checkbox1"
                            :disabled="dataSearch.beforeProduction">
                            <production-status :typeTag="2" />
                        </checkbox-basic>
                    </div>
                    <div class="d-flex-center custom-checkbox-search">
                        <checkbox-basic v-model:valueCheckbox="typeCheckbox.checkbox2"
                            :disabled="dataSearch.beforeProduction">
                            <production-status :typeTag="3" />
                        </checkbox-basic>
                    </div>
                    <div class="d-flex-center custom-checkbox-search">{{  }}
                        <checkbox-basic v-model:valueCheckbox="typeCheckbox.checkbox3"
                            :disabled="dataSearch.beforeProduction">
                            <production-status :typeTag="4" />
                        </checkbox-basic>
                    </div>
                    <div class="d-flex-center custom-checkbox-search">
                        <checkbox-basic v-model:valueCheckbox="typeCheckbox.checkbox4"
                            :disabled="dataSearch.beforeProduction">
                            <production-status :typeTag="5" />
                        </checkbox-basic>
                    </div>
                </div>
            </a-col>
            <a-col class="ml-30 search-company">
                <a-form-item label="사업자코드" label-align="left" class="fix-width-label">
                    <biz-number-text-box v-model:valueInput="dataSearch.companyCode" />
                </a-form-item>
                <a-form-item label="상호" label-align="left" class="fix-width-label">
                    <default-text-box v-model:valueInput="dataSearch.companyName" />
                </a-form-item>
                <a-form-item label="매니저리스트" label-align="left" class="fix-width-label">
                    <list-manager-dropdown :required="true" v-model:valueInput="dataSearch.manageUserId" />
                </a-form-item>
                <a-form-item label="영업자리스트" label-align="left" class="fix-width-label">
                    <list-sales-dropdown :required="true" v-model:valueInput="dataSearch.salesRepresentativeId" />
                </a-form-item>
            </a-col>
            <a-col class="search-4">
                <switch-basic textCheck="해지제외" textUnCheck="해지포함" v-model:valueSwitch="dataSearch.excludeCancel" />
            </a-col>
        </a-row>
        <div class="title-table d-flex">
            <a-form-item label="파일 제작 설정" label-align="left">
                <div class="custom-note d-flex-center">
                    <switch-basic v-model:valueSwitch="valueDefaultSwitch" textCheck="세무대리인신고" textUnCheck="납세자자진신고" :disabled="true"/>
                    <span class="d-flex-center">
                        <img src="@/assets/images/iconInfo.png" style="width: 16px;" />
                        <span class="pl-5">본 설정으로 적용된 파일로 다운로드 및 메일발송 됩니다.</span>
                    </span>
                </div>
            </a-form-item>
            <a-form-item label="제출연월일" label-align="left">
                <div class="d-flex-center">
                    <date-time-box width="150px"  v-model:valueDate="dayReport" />
                    <a-tooltip placement="topLeft" color="black">
                        <template #title>전자신고파일 제작 요청</template>
                        <div class="btn-modal-save" @click="openModalSave">
                            <SaveOutlined class="fz-20 ml-5 action-save"/>
                        <span style="margin-left: 5px;">파일제작요청</span>
                        </div>
                    </a-tooltip>
                </div>
            </a-form-item>
        </div>
        <div class="form-table">
            <a-spin :spinning="loadingTable">
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                    :show-borders="true" key-expr="companyId" class="mt-10" :allow-column-reordering="move_column"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true"
                    @selection-changed="selectionChanged">
                    <DxSelection mode="multiple" :fixed="true" />
                    <DxColumn caption="사업자코드" data-field="company.code" />
                    <DxColumn caption="상호 주소" cell-template="상호" />
                    <template #상호="{ data }">
                        {{ data.data.company.name }} - {{ data.data.company.address }}
                    </template>
                    <DxColumn caption="사업자등록번호" cell-template="bizNumber" />
                    <template #bizNumber="{ data }">
                        <span>
                            {{
                                data.data.company.bizNumber.toString().slice(0, 3)
                            }}-{{
    data.data.company.bizNumber.toString().slice(3, 5)
}}-{{
    data.data.company.bizNumber.toString().slice(5, 10)
}}
                        </span>
                    </template>
                    <DxColumn caption="최종제작요청일시" data-field="lastProductionRequestedAt" data-type="date" format="yyyy-MM-dd HH:mm"/>
                    <DxColumn caption="제작현황" cell-template="제작현황" />
                    <template #제작현황="{ data }">
                        <GetStatusTable  :data="data.data" />
                    </template>
                    <DxSummary>
                        <DxTotalItem column="사업자코드" summary-type="count" display-format="전체: {0}" />
                        <DxTotalItem cssClass="custom-sumary" column="제작현황" :customize-text="customTextSummary" />
                    </DxSummary>
                </DxDataGrid>
            </a-spin>
        </div>
    </div>
    <PopupConfirmSave :modalStatus="modalConfirmMail" @closePopup="closeConfirmMail" :data="dataModalSave"
        :step="2" />
</template>
<script lang="ts">
import dayjs from "dayjs";
import { defineComponent, ref, computed, watch } from "vue";
import { checkBoxSearchStep1, dataSearchStep2Utils } from "../utils";
import {
    SaveOutlined
} from "@ant-design/icons-vue";
import { useStore } from 'vuex'
import { DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling, DxSummary, DxTotalItem } from "devextreme-vue/data-grid";
import PopupConfirmSave from "./PopupConfirmSaveStep1.vue";
import GetStatusTable from "./GetStatusTableStep2.vue";
import queries from "@/graphql/queries/BF/BF6/BF640/index";
import { useQuery } from "@vue/apollo-composable";
import notification from "@/utils/notification"
import { Message } from "@/configs/enum";
export default defineComponent({
    components: {
    SaveOutlined,
    DxDataGrid,
    DxToolbar,
    DxSelection,
    DxColumn,
    DxItem,
    DxScrolling,
    PopupConfirmSave,
    GetStatusTable,
    DxSummary,
    DxTotalItem
},
    props: {
        searchStep: Number,
    },
  setup(props) {
  
        let checkBoxSearch = [...checkBoxSearchStep1]
        let valueDefaultCheckbox = ref(1)
        let valueDefaultSwitch = ref(true)
        let beforeProduction = ref(true)
        let keySelect = ref([])
        let dataSearch: any = ref({ ...dataSearchStep2Utils })
        let typeCheckbox = ref<any>({
            checkbox1: false,
            checkbox2: false,
            checkbox3: false,
            checkbox4: false,
        })
        let dataSource: any = ref([])
        const store = useStore()
        const userInfor = computed(() => (store.state.auth.userInfor))
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const datePayment = ref(parseInt(dayjs().format('YYYYMM')))
        const dayReport = ref(`${dayjs().format('YYYYMM')}${dayjs().daysInMonth()}`);
        let trigger = ref(true)
        let modalConfirmMail = ref(false)
        let dataModalSave = ref()
        const messageDelNoItem = Message.getMessage('COMMON', '404').message;
        // ================== GRAPHQL=================
        //  QUERY : searchIncomeBusinessSimplifiedPaymentStatementElectronicFilings
        let {
            refetch: refetchTable,
            loading: loadingTable,
            onError: errorTable,
            onResult: resTable
        } = useQuery(queries.searchIncomeBusinessSimplifiedPaymentStatementElectronicFilings, { filter: dataSearch.value }, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache"
        }));
        resTable((val: any) => {
          // sort array to get row last time update
          let arrSort = val.data.searchIncomeBusinessSimplifiedPaymentStatementElectronicFilings.sort(function(a: any, b : any) {
              return a.lastProductionRequestedAt - b.lastProductionRequestedAt;
          })
          
          dataSource.value = Array(arrSort[0])
          trigger.value = false
        })
        errorTable((error: any) => {
            notification('error', error.message)
        })
        // =================== WATCH ====================
        watch(beforeProduction, (newVal) => {
          dataSearch.value.beforeProduction = !newVal
        })

        watch(() => props.searchStep, () => {
            dataSearch.value.productionStatuses = []
            if (typeCheckbox.value.checkbox1 == true)
                dataSearch.value.productionStatuses.push(0)
            if (typeCheckbox.value.checkbox2 == true)
                dataSearch.value.productionStatuses.push(1)
            if (typeCheckbox.value.checkbox3 == true)
                dataSearch.value.productionStatuses.push(2)
            if (typeCheckbox.value.checkbox4 == true)
                dataSearch.value.productionStatuses.push(-1)
            dataSearch.value.paymentYear = parseInt(datePayment.value.toString().slice(0, 4))
            dataSearch.value.paymentMonth = parseInt(datePayment.value.toString().slice(4, 6))
            if (dataSearch.value) {
                trigger.value = true
                refetchTable()
            }
        }, { deep: true })
        // ================== FUNCTION ================== 
        const openModalSave = () => {
            dataModalSave.value = {
                filter: dataSearch.value,
                emailInput: {
                    receiverName: userInfor.value.name,
                    receiverAddress: userInfor.value.email
                },
                companyIds: keySelect.value
            }
            if (keySelect.value.length > 0) {
                modalConfirmMail.value = true;
            }else {
                notification('warning',messageDelNoItem)
            }
        }

      // The above code is a function that is called when the user clicks the "Close" button on the
      // modal.
        const closeConfirmMail = () => {
          modalConfirmMail.value = false;
          trigger.value = true
          refetchTable()
        }

        const selectionChanged = (res: any) => {
            keySelect.value = res.selectedRowKeys
        }

        //SUM
        // count the number of status
        let productionStatusArr = ref<any>([]);
        const  watchFirstRun = ref(true)
        const countStatus = (arr: any[], type: number) => {
            if (Object.keys(arr).length === 0 || arr.length === 0) {
                return 0;
            }
            let count = arr.reduce((acc: any, crr: any) => {
                acc[crr.productionStatus] = acc[crr.productionStatus] ? acc[crr.productionStatus] + 1 : 1;
                return acc;
            }, {});
            if(count[type]){
                return count[type];
            }
            return 0;
        }
        // custom summary
        const customTextSummary = () => {
            return `제작전 ${countStatus(productionStatusArr.value, 0)} 제작대기 ${countStatus(productionStatusArr.value, 0)} 제작중 ${countStatus(productionStatusArr.value, 1)} 제작실패 ${countStatus(productionStatusArr.value, -1)} 제작성공 ${countStatus(productionStatusArr.value, 2)}`
        }
        // caculator sum
        const reFreshDataGrid = () => {
            if(watchFirstRun.value) {
                dataSource.value = dataSource.value.concat([]);
                dataSource.value = dataSource.value.splice(dataSource.value.length - 1, 1);
                watchFirstRun.value = false;
            }
        }

        // watch beforeProduction
        watch(() => dataSearch.value.beforeProduction, (newVal: any) => {
         
            for (const key in typeCheckbox.value) {
                if (!newVal) {
                    typeCheckbox.value[key] = false;
                } else {
                    typeCheckbox.value[key] = false;
                    typeCheckbox.value.checkbox1 = true;
                }
            }
         }, { deep: true });

        // set last day of month for report
        watch(datePayment, (newVal) => {
          let month = newVal.toString().substring(4);
          let year = newVal.toString().substring(0, 4);
          dayReport.value = `${newVal}${dayjs(`${year}-${month}-01`).daysInMonth()}`
        });
        return {
            loadingTable, activeKey: ref("1"), valueDefaultCheckbox, valueDefaultSwitch, datePayment,dayReport, dataModalSave, dayjs, checkBoxSearch, typeCheckbox, dataSearch, dataSource, colomn_resize, move_column, modalConfirmMail,customTextSummary,
            selectionChanged, openModalSave,closeConfirmMail,beforeProduction
        }
    }
})
</script> 
<style scoped lang="scss" src="../style/style.scss">
</style>
