<template>
    <action-header :buttonDelete="false" :buttonSearch="true" :buttonSave="false" :buttonPrint="false" />
    <div class="ac-210 page-content">
        <a-spin :spinning="false">
            <DxDataGrid noDataText="내역이 없습니다" id="dataGridAC210" key-expr="accountingDocumentId" :show-row-lines="true"
                :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true" ref="gridRefAC210"
                :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true">
                <DxScrolling mode="standard" show-scrollbar="always" />
                <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
                <DxExport :enabled="true" />
                <DxPaging :enabled="false" />
                <DxToolbar>
                    <DxItem template="box-action-right" location="after" />
                    <DxItem name="searchPanel" />
                    <DxItem name="exportButton" css-class="cell-button-export" />
                </DxToolbar>
                <template #box-action-right>
                    <div class="action d-flex-center">
                        <span class="mr-10">기간: </span>
                        <range-date-time-box v-model:valueDate="rangeDate" width="250px" :multi-calendars="true" :max-range="90"/>
                        <button-basic @onClick="actionOpenModalUpload" class="ml-5 d-flex-center button-upload" :type="'default'" >
                            <upload-outlined :style="{ fontSize: '16px', marginRight: '5px' }" />
                            <span>전표 업로드</span>
                        </button-basic>
                        <button-basic @onClick="windowOpen('share')" class="ml-5 d-flex-center button-upload" :type="'default'" >
                            <img class="icon_share" src="@/assets/images/icon_share.svg" />
                            <span>뱅크다K 바로가기</span>
                        </button-basic>
                        <button-basic @onClick="windowOpen('addPeople')" class="ml-5 d-flex-center button-upload" :type="'default'" >
                            <user-add-outlined :style="{ fontSize: '16px', marginRight: '5px' }"/>
                            <span>뱅크다K 회원가입</span>
                        </button-basic>
                    </div>
                </template>
                <DxColumn caption="NO" width="85" />

                <DxColumn caption="요청일시" data-field="" />

                <DxColumn caption="내용" data-field="" />

                <DxColumn caption="전체건수" data-field="" />

                <DxColumn caption="성공건수" data-field="" />

                <DxColumn caption="실패건수" data-field="" />

                <DxColumn caption="상세조회" data-field="" cell-template="zoom" />
                <template #zoom="{ data }">
                    <DxButton class="ml-3" @click="actionOpenModalDetail(data.data)">
                        <ZoomInOutlined :style="{ fontSize: '20px', color: 'black' }" />
                    </DxButton>
                </template>

                <DxColumn caption="결과" data-field="" />

                <DxColumn caption="상태" data-field="" />

                <DxColumn caption="비고" data-field="" />
            </DxDataGrid>
        </a-spin>
    </div>
    <ModalDetail :modalStatus="statusModalDetail" @closePopup="statusModalDetail = false"></ModalDetail>
    <ModalUpload :modalStatus="statusModalUpload" @closePopup="statusModalUpload = false"></ModalUpload>
</template>
<script lang="ts">
import { useStore } from "vuex";
import DxButton from "devextreme-vue/button";
import { defineComponent, ref, reactive, computed, watch } from "vue";
import {
    DxItem,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxPaging,
    DxSearchPanel,
    DxToolbar,
    DxExport,
} from "devextreme-vue/data-grid";
import { Message } from "@/configs/enum";
import filters from "@/helpers/filters";
import { useQuery, useMutation } from "@vue/apollo-composable";
import ModalDetail from "./components/ModalDetail.vue"
import ModalUpload from "./components/ModalUpload.vue"
import queries from "@/graphql/queries/AC/AC2/AC210";
import mutations from "@/graphql/mutations/AC/AC2/AC210";
import {
    ZoomInOutlined,
    UploadOutlined,
    UserAddOutlined,
} from "@ant-design/icons-vue";
import { companyId } from "@/helpers/commonFunction";
import dayjs from "dayjs";
import notification from "@/utils/notification";
import DataSource from "devextreme/data/data_source";
// import { Store } from "devextreme/data";
import { isEqual } from "lodash";
export default defineComponent({
    components: {
        DxItem,
        DxExport,
        DxDataGrid,
        DxColumn,
        DxScrolling,
        DxPaging,
        DxButton,
        DxSearchPanel,
        DxToolbar,
        ZoomInOutlined, UploadOutlined, UserAddOutlined,
        ModalDetail,
        ModalUpload,

    },
    setup() {
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? "0"));
        const globalFacilityBizId = ref<number>(parseInt(sessionStorage.getItem("globalFacilityBizId") ?? "0"));
        const dataAccountSubject = ref(JSON.parse(sessionStorage.getItem("accountSubject") ?? '[]'))
        const gridRefAC210 = ref(); // ref of grid
        const rangeDate = ref([parseInt(dayjs().subtract(1, "month").format("YYYYMMDD")), parseInt(dayjs().format("YYYYMMDD"))])

        let statusModalDetail = ref<boolean>(false);
        let statusModalUpload = ref<boolean>(false);

        const dataSource: any = ref(new DataSource({
            store: {
                type: "array",
                key: "accountingDocumentId",
                data: [],
            },
            requireTotalCount: true,
        }));

        // =================== GRAPHQL ===================

        // ================== WATCH ================

        // ================ FUNCTION ============================================
        const actionOpenModalDetail = (data: any) => {
            statusModalDetail.value = true
        }
        const actionOpenModalUpload = (data: any) => {
            statusModalUpload.value = true
        }
        const windowOpen = (data: any) => {
            if (data == 'share') {
                window.open('https://k.bankda.com')
            } else {
                window.open('https://k.bankda.com/api/member')
            }
        }

        // ================ CUSTOM SUMMARY TABLE ============================================

        return {
            dataSource, gridRefAC210,
            actionOpenModalDetail, actionOpenModalUpload,
            statusModalDetail, statusModalUpload,
            move_column,
            colomn_resize,
            rangeDate,
            windowOpen,
        };
    },
});
</script>
<style lang="scss" scoped src="./style/index.scss"></style>
