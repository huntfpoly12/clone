<template>
    <action-header buttonSearch/>
    <div id="bf-253" class="page-content">
        <div class="content-grid">
            <a-spin :spinning="false">
                <DxDataGrid id="data-source" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                    :show-borders="true" key-expr="companyId" :allow-column-reordering="move_column"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true" ref="tab1Bf520Ref"
                    noDataText="내역이 없습니다">
                    <DxScrolling mode="standard" show-scrollbar="always" />
                    <DxPaging :page-size="1000" />
                    <DxSelection :select-all-mode="'allPages'" :show-check-boxes-mode="'always'" mode="multiple" />
                    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
                    <DxExport :enabled="true" />
                    <DxToolbar>
                        <DxItem location="after" template="search-action" />
                        <DxItem name="searchPanel" location="after" />
                        <DxItem name="exportButton" css-class="cell-button-export" location="after" />
                    </DxToolbar>
                    <template #search-action>
                        <a-row class="d-flex-center">
                            <div class="mr-20">
                                khiêm: this is test detail
                                <EditOutlined style="font-size: 18px " class="mr-10" @click="onOpenDetail" />
                            </div>
                            <a-form-item label="결제예정일자" class="mr-10">
                                <range-date-time-box v-model:valueDate="rangeDate1" width="220px" :multi-calendars="true"
                                    :max-select="36" />
                            </a-form-item>
                            <a-form-item label="결제일자" class="mr-10">
                                <range-date-time-box v-model:valueDate="rangeDate2" width="220px" :multi-calendars="true"
                                    :max-select="36" />
                            </a-form-item>
                            <DxButton class="ml-4 custom-button" type="default" :disabled="false"
                                :height="$config_styles.HeightInput" @click="actionOpenModalAdd">
                                <div class="d-flex-center">
                                    <PlusOutlined style="font-size: 14px" />
                                    <span class="pl-5">입금추가</span>
                                </div>
                            </DxButton>
                            <a-tooltip title="CMS 출금신청자료">
                                <div>
                                    <DxButton class="ml-4 custom-button" type="default" :height="$config_styles.HeightInput"
                                        @click="onOpenModalEB21">
                                        <div class="d-flex-center">
                                            <DownloadOutlined style="font-size: 14px" />
                                            <span class="pl-5">EB21 파일 다운로드</span>
                                        </div>
                                    </DxButton>
                                </div>
                            </a-tooltip>
                            <a-tooltip title="CMS 출금신청결과">
                                <div>
                                    <DxButton class="ml-4 custom-button" type="default" :height="$config_styles.HeightInput"
                                        @click="onOpenModalEB21EB22">
                                        <div class="d-flex-center">
                                            <DownloadOutlined style="font-size: 14px; transform: rotate(180deg)" />
                                            <span class="pl-5">EB21, EB22 파일 업로드</span>
                                        </div>
                                    </DxButton>
                                </div>
                            </a-tooltip>
                            <a-tooltip title="선택된 내역 세금계산서 연계 파일 다운로드">
                                <div>
                                    <DxButton class="ml-4 mr-4 custom-button" type="default" :disabled="false"
                                        :height="$config_styles.HeightInput" @click="actionModalTaxInvoice">
                                        <div class="d-flex-center">
                                            <span><checkbox-basic :valueCheckbox="true" disabled="true" /></span>
                                            <span>세금계산서연계</span>
                                        </div>
                                    </DxButton>
                                </div>
                            </a-tooltip>

                        </a-row>
                    </template>
                    <DxColumn caption="입금구분" data-field="" width="70" />
                    <DxColumn caption="사업자코드" data-field="" />

                    <DxColumn caption="상호" data-field="" width="95px" />
                    <DxColumn caption="결제예정일자" data-field="" width="110" />

                    <DxColumn caption="결제일자" data-field="" width="110" />

                    <DxColumn caption="결제은행" data-field="" width="135" />

                    <DxColumn caption="결제금액" data-field="" width="118" />

                    <DxColumn caption="CMS 출금상태" data-field="" width="118" />

                    <DxColumn caption="세금계산서 연계" data-field="" />

                    <DxColumn caption="최종저장일시" data-field="" />

                    <DxColumn caption="" cell-template="action" />
                    <template #action="{ data }">
                        <EditOutlined class="mr-10" style="font-size: 18px" />
                        <HistoryOutlined style="font-size: 18px" />
                    </template>
                </DxDataGrid>
            </a-spin>
        </div>
    </div>
    <DetailComponent :modalStatus="statusModalDetail" @closePopup="statusModalDetail = false" />
    <HistoryPopup :modalStatus="statusModalHistory" @closePopup="statusModalHistory = false" title="변경이력" :idRowEdit="null"
        typeHistory="bf-251-detail" :data="null" />
    <!-- <PopupMessage :modalStatus="statusPopupEI13" @closePopup="statusPopupEI13 = false" :typeModal="'confirm'"
        content="CMS 승인상태가 “접수”인 내역들 대상으로 전자파일 제작 및 다운로드되며, 해당 내역 모두 “승인신청”으로 변경됩니다.그래도 다운로드하시겠습니까?" okText="네. 다운로드합니다"
        cancelText="아니오" @checkConfirm="handleConfirmEI13" />
    <PopupMessage :modalStatus="statusPopupEB13" @closePopup="statusPopupEB13 = false" :typeModal="'confirm'"
        content="CMS 승인상태가 “승인신청”인 내역들 대상으로 전자파일 제작 및 다운로드됩니다. 그래도 다운로드하시겠습니까?" okText="네. 다운로드합니다" cancelText="아니오"
        @checkConfirm="handleConfirmEB13" /> -->
    <ModalAdd :modalStatus="statusModalAdd" @closePopup="statusModalAdd = false" />
    <ModalEB21 :modalStatus="statusModalEB21" @closePopup="statusModalEB21 = false" />
    <TaxInvoice :modalStatus="statusModalTaxInvoice" @closePopup="statusModalTaxInvoice = false" />
    <ModalEB21EB22 :modalStatus="statusModalEB21EB22" @closePopup="statusModalEB21EB22 = false" />
</template>
  
<script lang="ts">
import { computed, defineComponent, reactive, ref, watch, watchEffect } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useStore } from "vuex";
import DxButton from "devextreme-vue/button";
import ModalAdd from "./components/ModalAdd.vue"
import ModalEB21 from "./components/ModalEB21.vue"
import DetailComponent from "./components/DetailComponent.vue"
import TaxInvoice from "./components/TaxInvoice.vue"
import ModalEB21EB22 from "./components/ModalEB21EB22.vue"
import {
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxSelection,
    DxPaging,
    DxItem,
    DxSearchPanel,
    DxExport,
    DxToolbar,
} from "devextreme-vue/data-grid";
import {
    DownloadOutlined,
    HistoryOutlined,
    EditOutlined,
    PlusOutlined,
} from "@ant-design/icons-vue";
import dayjs from "dayjs";
export default defineComponent({
    components: {
        DxButton,
        DxDataGrid,
        DxScrolling,
        DxSelection,
        DxColumn,
        DownloadOutlined,
        HistoryOutlined,
        DxPaging,
        DxItem,
        DxSearchPanel,
        DxExport,
        DxToolbar,
        EditOutlined,
        DetailComponent,
        ModalEB21EB22,
        PlusOutlined,
        TaxInvoice,
        ModalAdd,
        ModalEB21,
    },
    setup(props, { emit }) {
        const store = useStore();
        const { move_column, colomn_resize } = store.state.settings;
        const rangeDate1 = ref([parseInt(dayjs().startOf('month').format("YYYYMMDD")), parseInt(dayjs().format("YYYYMMDD"))])
        const rangeDate2 = ref([parseInt(dayjs().startOf('month').format("YYYYMMDD")), parseInt(dayjs().format("YYYYMMDD"))])
        const dataSource = ref([]);
        let statusModalDetail = ref<boolean>(false)
        let statusModalAdd = ref<boolean>(false)
        let statusModalHistory = ref<boolean>(false)
        let statusModalEB21 = ref<boolean>(false)
        let statusModalEB21EB22 = ref<boolean>(false)
        let statusModalTaxInvoice = ref<boolean>(false)
        //-----------------------Fcn common-----------------------------------------

        //-----------------------Get DATA SOURCE------------------------------

        //----------------------------ON SEARCH ------------------------------

        // -----------------------------HISTORY-------------------

        //----------------------------SELECT ROW IN TABLES ------------------------

        //----------------------------OPEN MODAL 1 CORRECTION ------------------------

        //-------------------------get MajorInsurance ViewURL ------------------------

        //------------------------FUNCTION--------------------------------
        const onOpenDetail = () => {
            statusModalDetail.value = true
        }
        const onOpenHistory = () => {
            statusModalHistory.value = true
        }
        const onOpenModalEB21 = () => {
            statusModalEB21.value = true
        }
        const onOpenModalEB21EB22 = () => {
            statusModalEB21EB22.value = true
        }

        const actionOpenModalAdd = () => {
            statusModalAdd.value = true
        }
        const actionModalTaxInvoice = () => {
            statusModalTaxInvoice.value = true
        }

        return {
            move_column,
            colomn_resize,
            rangeDate1, rangeDate2,
            dataSource,
            actionOpenModalAdd, statusModalAdd,
            actionModalTaxInvoice, statusModalTaxInvoice,
            onOpenDetail, statusModalDetail,
            onOpenHistory, statusModalHistory,
            onOpenModalEB21, statusModalEB21,
            onOpenModalEB21EB22, statusModalEB21EB22,
        };
    },
});
</script>
<style lang="scss">
@import "./style/style.scss";

.btn-close {
    font-size: 14px;
    border: 1px solid #3333;
    display: block;
    padding: 3px;
    line-height: 4px;
    height: 14px;
    margin-left: 92%;
    margin-bottom: 7px;
    cursor: pointer;
}
</style>
  