<template>
    <action-header :buttonDelete="false" :buttonSearch="true" @actionSearch="searching()" :buttonSave="false" :buttonPrint="false" />
    <div class="ac-210 page-content">
        <a-spin :spinning="loadingSearchAccountingDocumentW4cUploads">
            <DxDataGrid noDataText="내역이 없습니다" id="dataGridAC210" key-expr="requestId" :show-row-lines="true"
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
                <DxColumn caption="NO" width="85" data-field="requestId" css-class="cell-left"/>

                <DxColumn caption="요청일시" data-field="requedtedAt" data-type="date" format="yyyy-MM-dd HH:mm"/>

                <DxColumn caption="내용" data-field="month" cell-template="year-month" css-class="cell-left"/>
                <template #year-month="{ data }">
                    <span>전표 {{ data.data.year }}-{{ data.data.month }} 업로드 </span>
                </template>

                <DxColumn caption="전체건수" data-field="totalCount" format="fixedPoint"/>

                <DxColumn caption="성공건수" data-field="successCount" format="fixedPoint"/>

                <DxColumn caption="실패건수" data-field="failCount" format="fixedPoint"/>

                <DxColumn caption="미실행건수" data-field="unexecutedCount" format="fixedPoint"/>

                <DxColumn caption="상세조회" data-field="" cell-template="zoom" css-class="cell-center" width="100"/>
                <template #zoom="{ data }">
                    <DxButton class="ml-3" @click="actionOpenModalDetail(data.data)">
                        <ZoomInOutlined :style="{ fontSize: '20px', color: 'black' }" />
                    </DxButton>
                </template>

                <DxColumn caption="결과" data-field="result" />

                <DxColumn caption="상태" data-field="status" />

                <!-- <DxColumn caption="비고" data-field="" /> -->
            </DxDataGrid>
        </a-spin>
    </div>
    <ModalDetail :modalStatus="statusModalDetail" @closePopup="statusModalDetail = false" :requestId="requestId"></ModalDetail>
    <ModalUpload :modalStatus="statusModalUpload" @closePopup="statusModalUpload = false" @resetTable="searching()"></ModalUpload>
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
        let requestId = ref<number>()
        let statusModalDetail = ref<boolean>(false);
        let statusModalUpload = ref<boolean>(false);
        let triggerSearchAccountingDocumentW4cUploads = ref<boolean>(true);
        const dataSource: any = ref(new DataSource({
            store: {
                type: "array",
                key: "requestId",
                data: [],
            },
            requireTotalCount: true,
        }));
        const argumentSearchAccountingDocumentW4cUploads = ref({
            companyId: companyId,
            startDate: rangeDate.value[0],
            finishDate: rangeDate.value[1],
        })

        // =================== GRAPHQL ===================
        // query SearchAccountingDocumentW4cUploads
		const {
			result: resSearchAccountingDocumentW4cUploads,
			loading: loadingSearchAccountingDocumentW4cUploads,
			onError: errorSearchAccountingDocumentW4cUploads,
		} = useQuery(
			queries.searchAccountingDocumentW4cUploads,
			argumentSearchAccountingDocumentW4cUploads.value,
			() => ({
				enabled: triggerSearchAccountingDocumentW4cUploads.value,
				fetchPolicy: "no-cache",
			})
		);
		errorSearchAccountingDocumentW4cUploads((e) => {
            triggerSearchAccountingDocumentW4cUploads.value = false;
			//notification('error', e.message)
		});


        // ================== WATCH ================
        watch(resSearchAccountingDocumentW4cUploads, (value) => {
			triggerSearchAccountingDocumentW4cUploads.value = false;
            dataSource.value = new DataSource({
				store: {
					type: "array",
					key: "requestId",
					data: value.searchAccountingDocumentW4cUploads,
				},
				requireTotalCount: true,
			});
		});

        // ================ FUNCTION ============================================
        const actionOpenModalDetail = (data: any) => {
            requestId.value = data.requestId
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
        const searching = () => {
            argumentSearchAccountingDocumentW4cUploads.value.startDate = rangeDate.value[0]
            argumentSearchAccountingDocumentW4cUploads.value.finishDate = rangeDate.value[1]
            triggerSearchAccountingDocumentW4cUploads.value = true
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
            searching,
            loadingSearchAccountingDocumentW4cUploads,
            requestId,
        };
    },
});
</script>
<style lang="scss" scoped src="./style/index.scss"></style>
