<template>
    <action-header title="4대보험업무관리" buttonSearch buttonDelete buttonPrint />
    <div id="bf-251" class="page-content">
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
                            <!-- <a-form-item label="매니저리스트" class="mr-10">
                                <list-manager-dropdown v-model:valueInput="dataSource" width="180px" />
                            </a-form-item>
                            <a-form-item label="영업자리스트" class="mr-10">
                                <list-sales-dropdown v-model:valueInput="dataSource" width="180px" />
                            </a-form-item> -->
                            <div class="mr-20">
                                khiêm: this is test detail
                                <EditOutlined style="font-size: 18px " class="mr-10" @click="onOpenDetail" />
                            </div>
                            <switch-basic width="80px" class="switch-insurance mr-10" switch-basic textCheck="해지제외"
                                textUnCheck="해지포함" v-model:valueSwitch="dataSource" />
                            <a-tooltip title="CMS 동의신청서">
                                <div>
                                    <DxButton class="ml-4 custom-button" type="default"
                                        :height="$config_styles.HeightInput" @click="onOpenPopupEI13">
                                        <div class="d-flex-center">
                                            <DownloadOutlined style="font-size: 14px" />
                                            <span class="pl-5">EI13 파일 다운로드</span>
                                        </div>
                                    </DxButton>
                                </div>
                            </a-tooltip>
                            <a-tooltip title="CMS 동의신청정보">
                                <div>
                                    <DxButton class="ml-4 custom-button" type="default"
                                        :height="$config_styles.HeightInput" @click="onOpenPopupEB13">
                                        <div class="d-flex-center">
                                            <DownloadOutlined style="font-size: 14px" />
                                            <span class="pl-5">EB13 파일 다운로드</span>
                                        </div>
                                    </DxButton>
                                </div>
                            </a-tooltip>
                            <a-tooltip title="EB13, EB14 파일 업로드">
                                <div>
                                    <DxButton class="ml-4 custom-button" type="default"
                                        :height="$config_styles.HeightInput" @click="onOpenModalEB13EB14">
                                        <div class="d-flex-center">
                                            <DownloadOutlined style="font-size: 14px; transform: rotate(180deg)" />
                                            <span class="pl-5">CMS 동의신청결과 반영</span>
                                        </div>
                                    </DxButton>
                                </div>
                            </a-tooltip>
                        </a-row>
                    </template>
                    <DxColumn caption="사업자코드" data-field="" width="70" />
                    <DxColumn caption="상호" data-field="" />

                    <DxColumn caption="주소" data-field="" width="95px" />
                    <DxColumn caption="영업자" data-field="" width="110" />

                    <DxColumn caption="금용가관명" data-field="" width="110" />

                    <DxColumn caption="금용기관코드" data-field="" width="135" />

                    <DxColumn caption="개좌번호" data-field="" width="118" />

                    <DxColumn caption="여금주" data-field="" width="118" />

                    <DxColumn caption="CMS 승인상태" data-field="" />

                    <DxColumn caption="에어코드" data-field="" />

                    <DxColumn caption="에어코드" cell-template="action" />
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
    <PopupMessage :modalStatus="statusPopupEI13" @closePopup="statusPopupEI13 = false" :typeModal="'confirm'"
        content="CMS 승인상태가 “접수”인 내역들 대상으로 전자파일 제작 및 다운로드되며, 해당 내역 모두 “승인신청”으로 변경됩니다.그래도 다운로드하시겠습니까?" okText="네. 다운로드합니다"
        cancelText="아니오" @checkConfirm="handleConfirmEI13" />
    <PopupMessage :modalStatus="statusPopupEB13" @closePopup="statusPopupEB13 = false" :typeModal="'confirm'"
        content="CMS 승인상태가 “승인신청”인 내역들 대상으로 전자파일 제작 및 다운로드됩니다. 그래도 다운로드하시겠습니까?" okText="네. 다운로드합니다" cancelText="아니오"
        @checkConfirm="handleConfirmEB13" />
    <ModalEB13EB14 :modalStatus="statusModalEB13EB14" @closePopup="statusModalEB13EB14 = false"/>
</template>
  
<script lang="ts">
import { computed, defineComponent, reactive, ref, watch, watchEffect } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useStore } from "vuex";
import DxButton from "devextreme-vue/button";
import DetailComponent from "./components/DetailComponent.vue"
import ModalEB13EB14 from "./components/ModalEB13EB14.vue"
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
        ModalEB13EB14,
    },
    setup(props, { emit }) {
        const store = useStore();
        const { move_column, colomn_resize } = store.state.settings;

        const dataSource = ref([]);
        let statusModalDetail = ref<boolean>(false)
        let statusModalHistory = ref<boolean>(false)
        let statusPopupEI13 = ref<boolean>(false)
        let statusPopupEB13 = ref<boolean>(false)
        let statusModalEB13EB14 = ref<boolean>(false)
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
        const onOpenPopupEI13 = () => {
            statusPopupEI13.value = true
        }
        const onOpenPopupEB13 = () => {
            statusPopupEB13.value = true
        }
        const onOpenModalEB13EB14 = () => {
            statusModalEB13EB14.value = true
        }
        const handleConfirmEI13 = () => {

        }
        const handleConfirmEB13 = () => {

        }

        return {
            move_column,
            colomn_resize,
            dataSource,
            statusModalDetail, statusModalHistory, statusPopupEI13, statusPopupEB13,
            onOpenPopupEI13, onOpenPopupEB13, handleConfirmEI13, handleConfirmEB13,
            onOpenDetail, onOpenHistory, onOpenModalEB13EB14, statusModalEB13EB14,
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
  