<template>
    <div id="step1">
        <a-row gutter="24" class="search-form-step-1">
            <a-col>
                <a-form-item label="지급연월">
                    <month-picker-box-custom v-model:valueDate="datePayment" :minDate="new Date('2022-1-1')"
                        bgColor="black" />
                </a-form-item>
            </a-col>
            <a-col>
                <a-form-item label="최종제작상태" label-align="left">
                    <div class="custom-note d-flex-center">
                        <switch-basic v-model:valueSwitch="dataSearch.beforeProduction" textCheck="제작후" textUnCheck="제작전" />
                        <div class="d-flex-center ml-5">
                            <img src="@/assets/images/iconInfo.png" style="width: 14px;" />
                            <span>제작전은 제작요청되지 않은 상태입니다.</span>
                        </div>
                    </div>
                </a-form-item>
                <div id="checkBoxSearchBF650">
                    <CheckboxGroup :disabled="!dataSearch.beforeProduction" :options="productionStatusesCheckbox"
                        v-model:valueCheckbox="dataSearch.productionStatuses" :size="18"> </CheckboxGroup>
                </div>
            </a-col>
            <a-col>
                <a-form-item label="사업자코드" label-align="left" class="fix-width-label">
                    <biz-number-text-box v-model:valueInput="dataSearch.companyCode" />
                </a-form-item>
                <a-form-item label="매니저리스트" label-align="left" class="fix-width-label">
                    <list-manager-dropdown :required="true" v-model:valueInput="dataSearch.manageUserId" />
                </a-form-item>
            </a-col>
            <a-col>
                <a-form-item label="상호" label-align="left" class="fix-width-label">
                    <default-text-box v-model:valueInput="dataSearch.companyName" />
                </a-form-item>
                <a-form-item label="영업자리스트" label-align="left" class="fix-width-label">
                    <list-sales-dropdown :required="true" v-model:valueInput="dataSearch.salesRepresentativeId" />
                </a-form-item>
            </a-col>
            <a-col>
                <switch-basic textCheck="해지제외" textUnCheck="해지포함" v-model:valueSwitch="dataSearch.excludeCancel" />
            </a-col>
        </a-row>
        <div class="title-table d-flex">
            <a-form-item label="파일 제작 설정" label-align="left">
                <div class="custom-note d-flex-center">
                    <switch-basic :disabled="true" v-model:valueSwitch="valueDefaultSwitch" textCheck="세무대리인신고"
                        textUnCheck="납세자자진신고" />
                    <span class="d-flex-center">
                        <img src="@/assets/images/iconInfo.png" style="width: 16px;" />
                        <span class="pl-5">본 설정으로 적용된 파일로 다운로드 및 메일발송 됩니다.</span>
                    </span>
                </div>
            </a-form-item>
            <a-form-item label="제출연월일" label-align="left">
                <div class="d-flex-center">
                    <date-time-box width="150px" dateFormat="YYYY-MM-DD" v-model:valueDate="dateTime" />
                    <a-tooltip placement="topLeft" color="black">
                        <template #title>전자신고파일 제작 요청</template>
                        <div class="btn-modal-save" @click="openModalSave">
                            <SaveOutlined class="fz-24 ml-5 action-save" />
                            <span style="margin-left: 5px;">파일제작요청</span>
                        </div>
                    </a-tooltip>
                </div>
            </a-form-item>
        </div>
        <div class="form-table">
            <a-spin :spinning="loadingTable">
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
                    key-expr="companyId" class="mt-10" :allow-column-reordering="move_column"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true" @selection-changed="selectionChanged">
                    <DxSelection mode="multiple" :fixed="true" />
                    <DxColumn caption="사업자코드" data-field="company.code" />
                    <DxColumn caption="상호-주소" cell-template="company" />
                    <template #company="{ data }">
                        {{ data.data.company.name }} - {{ data.data.company.address }}
                    </template>
                    <DxColumn caption="사업자등록번호" cell-template="bizNumber" />
                    <template #bizNumber="{ data }">
                        <span>
                            {{ data.data.company.bizNumber.toString().slice(0, 3) }}-{{
                                data.data.company.bizNumber.toString().slice(3, 5)
                            }}-{{
    data.data.company.bizNumber.toString().slice(5, 10)
}}
                        </span>
                    </template>
                    <DxColumn caption="최종제작요청일시" data-field="lastProductionRequestedAt" data-type="date"
                        format="yyyy-MM-dd hh:mm" />
                    <DxColumn caption="제작현황" cell-template="productionStatus" />
                    <template #productionStatus="{ data }">
                        <GetStatusTable :data="data.data" @productionStatusData="productionStatusData()" />
                    </template>
                    <DxSummary>
                        <DxTotalItem column="사업자코드" summary-type="count" display-format="전체: {0}" />
                        <!-- <DxTotalItem column="제작현황" :customize-text="customizeTotalMonthly" value-format="#,###" /> -->
                        <DxTotalItem cssClass="custom-sumary" column="제작현황" :customize-text="customTextSummary" />
                    </DxSummary>
                </DxDataGrid>
            </a-spin>
        </div>
    </div>
    <PopupConfirmSave :modalStatus="modalConfirmMail" @closePopup="modalConfirmMail = false" :data="dataModalSave" />
</template>
<script lang="ts">
import dayjs from "dayjs";
import { defineComponent, ref, computed, watch } from "vue";
import { dataSearchUtils } from "../utils";
import {
    SaveOutlined
} from "@ant-design/icons-vue";
import { useStore } from 'vuex'
import { DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling, DxSummary, DxTotalItem } from "devextreme-vue/data-grid";
import PopupConfirmSave from "./PopupConfirmSave.vue";
import GetStatusTable from "./GetStatusTable.vue";
import queries from "@/graphql/queries/BF/BF6/BF650/index";
import { useQuery, useMutation } from "@vue/apollo-composable";
import notification from "@/utils/notification"
export default defineComponent({
    components: {
        SaveOutlined, DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling, DxSummary, DxTotalItem,
        PopupConfirmSave, GetStatusTable
    },
    props: {
        searchStep: Number,
    },
    setup(props) {
        let datePayment = ref(parseInt(dayjs().format('YYYYMM')))
        let dateTime = ref(dayjs().endOf('month'))
        let valueDefaultSwitch = ref(true)
        let keySelect = ref([])
        let dataSearch: any = ref({ ...dataSearchUtils })
        const productionStatusesCheckbox = [
            { id: 0, text: "제작대기", },
            { id: 1, text: "제작중", },
            { id: 2, text: "제작성공", },
            { id: -1, text: "제작실패", },
        ]
        let dataSource: any = ref([])
        const store = useStore()
        const userInfor = computed(() => (store.state.auth.userInfor))
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        let trigger = ref(true)
        let modalConfirmMail = ref(false)
        let dataModalSave = ref()
        // ================== GRAPHQL=================
        //  QUERY : searchIncomeBusinessSimplifiedPaymentStatementElectronicFilings
        let {
            refetch: refetchTable,
            loading: loadingTable,
            onError: errorTable,
            onResult: resTable
        } = useQuery(queries.searchIncomeWageDailyPaymentStatementElectronicFilings, { filter: dataSearch.value }, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache"
        }));
        resTable((val: any) => {
            // Filtering the dataSource.value to remove duplicate data.
            let arrDataConvert: any = []
            val.data.searchIncomeWageDailyPaymentStatementElectronicFilings.map((val: any) => {
                let row = arrDataConvert.find((data: any) => data.companyId == val.companyId)
                if (row) {
                    if (row.lastProductionRequestedAt < val.lastProductionRequestedAt) {
                        arrDataConvert.push(val)
                    }
                } else {
                    arrDataConvert.push(val)
                }
            })
            dataSource.value = arrDataConvert
            trigger.value = false
        })
        errorTable((error: any) => {
            notification('error', error.message)
        })
        // =================== WATCH ====================
        watch(() => props.searchStep, () => {
            dataSearch.value.paymentYear = parseInt(datePayment.value.toString().slice(0, 4))
            dataSearch.value.paymentMonth = parseInt(datePayment.value.toString().slice(4, 6))
            if (dataSearch.value) {
                trigger.value = true
                refetchTable()
            }
        }, { deep: true })
        // ================== FUNCTION ================== 
        const openModalSave = () => {
            modalConfirmMail.value = true
            dataModalSave.value = {
                filter: dataSearch.value,
                emailInput: {
                    receiverName: userInfor.value.name,
                    receiverAddress: userInfor.value.email
                },
                companyIds: keySelect.value
            }
        }
        const selectionChanged = (res: any) => {
            keySelect.value = res.selectedRowKeys
        }
        const customTextSummary = () => {
            return `제작전: ${countStatus(productionStatusArr.value, 0, 'productionStatus')}, 제작대기: ${countStatus(productionStatusArr.value, 0, 'productionStatus')}, 제작중: ${countStatus(
                productionStatusArr.value,
                1, 'productionStatus'
            )}, 제작실패: ${countStatus(productionStatusArr.value, -1, 'productionStatus')}, 제작성공: ${countStatus(productionStatusArr.value, 2, 'productionStatus')}`;
        }
        let arr = ref<any>([])
        let productionStatusArr = ref<any>([]);
        const watchFirstRun = ref(true);
        const productionStatusData = (emitVal: any) => {
            arr.value.push(emitVal);
            productionStatusArr.value = [emitVal];
            reFreshDataGrid();
        };
        const countStatus = (arr: any[], type: number, propertyCompare: string) => {
            if (Object.keys(arr).length === 0 || arr.length === 0) {
                return 0;
            }
            let count = arr.reduce((acc: any, crr: any) => {
                acc[crr[propertyCompare]] = acc[crr[propertyCompare]] ? acc[crr[propertyCompare]] + 1 : 1;
                return acc;
            }, {});
            if (count[type]) {
                return count[type];
            }
            return 0;
        };
        const reFreshDataGrid = () => {
            if (watchFirstRun.value) {
                dataSource.value = dataSource.value.concat([]);
                dataSource.value = dataSource.value.splice(dataSource.value.length - 1, 1);
                watchFirstRun.value = false;
            }
        };
        return {
            customTextSummary,
            loadingTable,
            valueDefaultSwitch,
            datePayment,
            dataModalSave,
            // checkBoxSearch,
            productionStatusesCheckbox,
            dataSearch, dataSource, colomn_resize, move_column, modalConfirmMail,
            selectionChanged, openModalSave,
            dateTime,
            productionStatusData,
        }
    }
})
</script> 
<style scoped lang="scss" src="../style/style.scss"></style>