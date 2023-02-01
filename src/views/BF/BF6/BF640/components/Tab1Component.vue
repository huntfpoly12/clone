<template>
    <div id="step1">
        <a-row gutter="24" class="search-form-step-1">
            <a-col>
                <a-form-item label="귀속연도" label-align="left">
                    <year-picker-box-custom v-model:valueDate="dataSearch.paymentYear" width="65px" class="mr-5 ml-5" />
                </a-form-item>
                <a-form-item label="제출대상구분" label-align="left">
                    <radio-group :arrayValue="checkBoxSearch" layoutCustom="horizontal"
                        v-model:valueRadioCheck="dataSearch.paymentHalfYear" />
                </a-form-item>
            </a-col>
            <a-col>
                <a-form-item label="최종제작상태" label-align="left">
                    <div class="custom-note d-flex-center">
                        <switch-basic v-model:valueSwitch="dataSearch.beforeProduction" textCheck="제작전"
                            textUnCheck="제작후" />
                        <div class="d-flex-center ml-5 ">
                            <img src="@/assets/images/iconInfo.png" style="width: 14px;" />
                            <span>제작전은 제작요청되지 않은 상태입니다.</span>
                        </div>
                    </div>
                </a-form-item>
                <div>
                    <div class="d-flex-center custom-checkbox-search"
                        @click="typeCheckbox.checkbox1 = !typeCheckbox.checkbox1">
                        <checkbox-basic size="16" v-model:valueCheckbox="typeCheckbox.checkbox1">
                            <production-statuses :typeTag="2" />
                        </checkbox-basic>
                    </div>
                    <div class="d-flex-center custom-checkbox-search"
                        @click="typeCheckbox.checkbox2 = !typeCheckbox.checkbox2">
                        <checkbox-basic size="16" v-model:valueCheckbox="typeCheckbox.checkbox2">
                            <production-statuses :typeTag="3" />
                        </checkbox-basic>
                    </div>
                    <div class="d-flex-center custom-checkbox-search"
                        @click="typeCheckbox.checkbox3 = !typeCheckbox.checkbox3">
                        <checkbox-basic size="16" v-model:valueCheckbox="typeCheckbox.checkbox3">
                            <production-statuses :typeTag="4" />
                        </checkbox-basic>
                    </div>
                    <div class="d-flex-center custom-checkbox-search"
                        @click="typeCheckbox.checkbox4 = !typeCheckbox.checkbox4">
                        <checkbox-basic size="16" v-model:valueCheckbox="typeCheckbox.checkbox4">
                            <production-statuses :typeTag="5" />
                        </checkbox-basic>
                    </div>
                </div>
            </a-col>
            <a-col>
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
            <a-col>
                <switch-basic textCheck="해지제외" textUnCheck="해지포함" v-model:valueSwitch="dataSearch.excludeCancel" />
            </a-col>
        </a-row>
        <div class="title-table d-flex">
            <a-form-item label="파일 제작 설정" label-align="left">
                <div class="custom-note d-flex-center">
                    <switch-basic v-model:valueSwitch="valueDefaultSwitch" textCheck="세무대리인신고" textUnCheck="납세자자진신고" />
                    <span class="d-flex-center">
                        <img src="@/assets/images/iconInfo.png" style="width: 16px;" />
                        <span class="pl-5">본 설정으로 적용된 파일로 다운로드 및 메일발송 됩니다.</span>
                    </span>
                </div>
            </a-form-item>
            <a-form-item label="제출연월일" label-align="left">
                <div class="d-flex-center">
                    <date-time-box width="150px" dateFormat="YYYY-MM-DD" />
                    <a-tooltip placement="topLeft" color="black">
                        <template #title>전자신고파일 제작 요청</template>
                        <SaveOutlined class="fz-24 ml-5 action-save" @click="modalConfirmMail = true" />
                    </a-tooltip>
                </div>
            </a-form-item>
        </div>
        <div class="form-table">
            <a-spin :spinning="loadingTable">
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                    :show-borders="true" key-expr="companyId" class="mt-10" :allow-column-reordering="move_column"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true">
                    <DxSelection mode="multiple" :fixed="true" />
                    <DxColumn caption="사업자코드" />
                    <DxColumn caption="상호 주소" />
                    <DxColumn caption="사업자등록번호" />
                    <DxColumn caption="최종제작요청일시" />
                    <DxColumn caption="제작현황" />
                </DxDataGrid>
            </a-spin>
        </div>
        <PopupConfirmSaveStep1 :modalStatus="modalConfirmMail" @closePopup="modalConfirmMail = false" />
    </div>
</template>
<script lang="ts">
import dayjs from "dayjs";
import { defineComponent, ref, computed, watch } from "vue";
import { checkBoxSearchStep1, dataSearchUtils } from "../utils";
import { SaveOutlined } from "@ant-design/icons-vue";
import { useStore } from 'vuex'
import { DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling } from "devextreme-vue/data-grid";
import PopupConfirmSaveStep1 from "./PopupConfirmSaveStep1.vue";

import queries from "@/graphql/queries/BF/BF6/BF640/index";
import { useQuery, useMutation } from "@vue/apollo-composable";
import notification from "@/utils/notification"

export default defineComponent({
    components: {
        SaveOutlined, DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling,
        PopupConfirmSaveStep1,
    },
    props: {
        searchStep: Number,
    },
    setup(props, { emit }) {
        let checkBoxSearch = [...checkBoxSearchStep1]
        let valueDefaultCheckbox = ref(1)
        let valueDefaultSwitch = ref(false)
        let dataSearch: any = ref({ ...dataSearchUtils })
        let typeCheckbox = ref({
            checkbox1: true,
            checkbox2: false,
            checkbox3: false,
            checkbox4: false,
        })
        let trigger = ref(true)
        let dataSource: any = ref([])
        let modalConfirmMail = ref(false)
        let dataCallApiGetElectronic = ref()
        const store = useStore()
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);

        // ================== GRAPHQL=================
        //  QUERY : searchIncomeWageSimplifiedPaymentStatementElectronicFilings
        let {
            refetch: refetchTable,
            loading: loadingTable,
            onError: errorTable,
            onResult: resTable
        } = useQuery(queries.search, { filter: dataSearch.value }, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache"
        }));
        resTable((val: any) => {
            dataSource.value = val.data.searchIncomeWageSimplifiedPaymentStatementElectronicFilings
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


        //  QUERY : getElectronicFilingsByIncomeWageSimplifiedPaymentStatement
        // let {
        //     refetch: refetchType,
        //     loading: loadingType,
        //     onError: errorType,
        //     onResult: resType
        // } = useQuery(queries.getElectronicFilingsByIncomeWageSimplifiedPaymentStatement, { filter: dataSearch.value }, () => ({
        //     enabled: trigger.value,
        //     fetchPolicy: "no-cache"
        // }));

        // ================= WATHCH ===================
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
            if (dataSearch) {
                trigger.value = true
                refetchTable()
            }
        }, { deep: true })

        return {
            activeKey: ref("1"), valueDefaultCheckbox, valueDefaultSwitch, loadingTable,
            dayjs, checkBoxSearch, typeCheckbox, dataSearch, dataSource, colomn_resize, move_column, modalConfirmMail
        }
    }
})
</script> 
<style scoped lang="scss" src="../style/style.scss">

</style>