<template>
    <div id="step1">
        <a-row gutter="24" class="search-form-step-1">
            <a-col>
                <a-form-item label="지급연도" label-align="left">
                    <year-picker-box-custom v-model:valueDate="dataSearch.paymentYear" width="65px" class="mr-5"  text="지"/>
                </a-form-item>
                <a-form-item label="제출대상구분" label-align="left">
                    <radio-group :arrayValue="checkBoxSearch" layoutCustom="horizontal"
                        v-model:valueRadioCheck="dataSearch.paymentHalfYear" />
                </a-form-item>
            </a-col>
            <a-col class="ml-30">
                <a-form-item label="최종제작상태" label-align="left">
                    <div class="custom-note d-flex-center">
                        <switch-basic v-model:valueSwitch="beforeProduction" textCheck="제작후"
                            textUnCheck="제작전" />
                        <div class="d-flex-center ml-5 ">
                            <img src="@/assets/images/iconInfo.png" style="width: 14px;" />
                            <span>제작전은 제작요청되지 않은 상태입니다.</span>
                        </div>
                    </div>
                </a-form-item>
                <div class="production-check">
                    <div class="d-flex-center custom-checkbox-search" >
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
                    <div class="d-flex-center custom-checkbox-search">
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
            <a-col class="search-company">
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
                    <date-time-box width="150px" v-model:valueDate="dayReport" />
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
                    @selection-changed="selectionChanged" id="dataGrid1">
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
                    <DxColumn caption="최종제작요청일시" data-field="lastProductionRequestedAt" data-type="date" format="yyyy-MM-dd HH:mm" />
                    <DxColumn caption="제작현황" cell-template="제작현황" width="200px" />
                    <template #제작현황="{ data }">
                        <GetStatusTable v-if="data.data.lastProductionRequestedAt"  :data="data.data"
                            @productionStatusData="productionStatusData" />
                    </template>
                    <DxSummary>
                        <DxTotalItem column="사업자코드" summary-type="count" display-format="전체: {0}" />
                        <DxTotalItem cssClass="custom-sumary" column="제작현황" :customize-text="customTextSummary" />
                    </DxSummary>
                </DxDataGrid>
            </a-spin>
        </div>
        <PopupConfirmSaveStep1  :modalStatus="modalConfirmMail" @closePopup="closeConfirmMail"
            :data="dataModalSave" :step="1" @sendActionSaveDone="actionSaveDone" />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch, reactive } from "vue";
import { checkBoxSearchStep1, dataSearchUtils } from "../utils";
import { SaveOutlined } from "@ant-design/icons-vue";
import { useStore } from 'vuex'
import { DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling, DxSummary, DxTotalItem } from "devextreme-vue/data-grid";
import PopupConfirmSaveStep1 from "./PopupConfirmSaveStep1.vue";
import GetStatusTable from "./GetStatusTable.vue";
import queries from "@/graphql/queries/BF/BF6/BF640/index";
import { useQuery, useMutation } from "@vue/apollo-composable";
import notification from "@/utils/notification"
import dayjs from 'dayjs';
import { Message } from '@/configs/enum';
export default defineComponent({
    components: {
        SaveOutlined, DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling, DxSummary, DxTotalItem,
        PopupConfirmSaveStep1, GetStatusTable
    },
    props: {
        searchStep: Number,
    },
    setup(props, { emit }) {
        const store = useStore();
        const userInfor = computed(() => (store.state.auth.userInfor))
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const globalYear: any = computed(() => store.state.settings.globalYear);
        const dayReport = ref(`${globalYear.value}0802`);
        let checkBoxSearch = [...checkBoxSearchStep1]
        let valueDefaultCheckbox = ref(1)
        let valueDefaultSwitch = ref(true)
        let beforeProduction = ref(true)
        let dataSearch: any = ref({ ...dataSearchUtils })
        let typeCheckbox = ref<any>({
            checkbox1: true,
            checkbox2: true,
            checkbox3: true,
            checkbox4: true,
        })
        let trigger = ref(true)
        let dataSource: any = ref([])
        let modalConfirmMail = ref(false)
        let dataCallApiGetElectronic = ref()
        let dataModalSave = ref()
        let keySelect = ref([]);
        const messageDelNoItem = Message.getMessage('COMMON', '404').message;
        // ================== GRAPHQL=================
        //  QUERY : searchIncomeWageSimplifiedPaymentStatementElectronicFilings
        let {
            refetch: refetchTable,
            loading: loadingTable,
            onError: errorTable,
            onResult: resTable
        } = useQuery(queries.searchIncomeWageSimplifiedPaymentStatementElectronicFilings, { filter: dataSearch.value }, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache"
        }));
        resTable((val: any) => {
            // sort array to get row last time update
            let arrSort = val.data.searchIncomeWageSimplifiedPaymentStatementElectronicFilings.sort(function(a: any, b : any) {
                return a.lastProductionRequestedAt - b.lastProductionRequestedAt;
            })
            
            dataSource.value = arrSort[0] ? Array(arrSort[0]) : []
            trigger.value = false
            // call api get productionStatus
            if (dataSource.value.length > 0) {
                dataSource.value.map((val: any) => {
                    dataCallApiGetElectronic.value = {
                        input: {
                            companyId: val.companyId,
                            paymentYear: val.paymentYear,
                            paymentHalfYear: dataSearch.value.paymentHalfYear
                        }
                    }
                })
            }
        })
        errorTable((error: any) => {
            notification('error', error.message)
        })
        // ================== FUNCTION ================== 
        const selectionChanged = (event: any) => {
            keySelect.value = event.selectedRowKeys
        }
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

        const closeConfirmMail = () => {
          modalConfirmMail.value = false;
          trigger.value = true
          refetchTable()
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

        const actionSaveDone = () => {
            modalConfirmMail.value = false
            trigger.value = true
            refetchTable()
            watchFirstRun.value = true;
        }
        // ================= WATHCH ===================
        watch(beforeProduction, (newVal) => {
          dataSearch.value.beforeProduction = !newVal
        })
        watch(() => props.searchStep, (val: any) => {
            productionStatusArr.value = []
            dataSearch.value.productionStatuses = []
            if (typeCheckbox.value.checkbox1 == true)
                dataSearch.value.productionStatuses.push(0)
            if (typeCheckbox.value.checkbox2 == true)
                dataSearch.value.productionStatuses.push(1)
            if (typeCheckbox.value.checkbox3 == true)
                dataSearch.value.productionStatuses.push(2)
            if (typeCheckbox.value.checkbox4 == true)
                dataSearch.value.productionStatuses.push(-1)
            if (dataSearch.value) {
                trigger.value = true;
                refetchTable();
                watchFirstRun.value = true;
            }
        }, { deep: true })

        // watch beforeProduction
        watch(() => dataSearch.value.beforeProduction, (newVal: any) => {
         for (const key in typeCheckbox.value) {
             if (!newVal) {
                 typeCheckbox.value[key] = true;
             } else {
                 typeCheckbox.value[key] = false;
             }
         }
        }, { deep: true });

        /**
         *    If it is the first report of the year, the reporting date will be August 2 of this year. 
          *   If the report is year - end, the reporting date will be February 1 of the following year
         */
        watch(() => dataSearch.value.paymentHalfYear, (newVal) => {
            if (newVal == 1) {
              dayReport.value= `${globalYear.value}0802`
            } else {
              dayReport.value= `${globalYear.value+1}0201`
            }
        }, { deep: true });
        
        const productionStatusData = (emitVal: any) => {
            productionStatusArr.value = [emitVal];
            reFreshDataGrid();
        }
        return {
          userInfor,
          dataModalSave,
          activeKey: ref("1"),
          valueDefaultCheckbox,
          valueDefaultSwitch,
          loadingTable, dayjs,
          checkBoxSearch,
          typeCheckbox,
          dataSearch,
          dataSource,
          colomn_resize,
          move_column,
          modalConfirmMail,
          dayReport,
          actionSaveDone, selectionChanged, openModalSave, customTextSummary, productionStatusData,closeConfirmMail,productionStatusArr,beforeProduction
        }
    }
})
</script> 
<style scoped lang="scss" src="../style/style.scss">

</style>
<style scoped lang="scss">
#dataGrid1 {
    :deep .custom-sumary {
        white-space: break-spaces;
    }
}
</style>
