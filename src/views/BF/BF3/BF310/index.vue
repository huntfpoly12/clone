<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <a-spin :spinning="loading" size="large">
        <action-header title="계약정보관리&심사" @actionSearch="actionSearch ? searching($event) : changePage($event)" :buttonSearch="true"/>
        <div id="bf-310">
            <div class="search-form">
                <a-row :gutter="[24, 8]">
                    <a-col>
                        <label class="lable-item">서비스종류 :</label>
                        <checkbox-basic v-model:valueCheckbox="originData.accounting" :disabled="false" :size="'14'"
                            label="회계" style="margin-right: 10px;" />
                        <checkbox-basic v-model:valueCheckbox="originData.withholding" :disabled="false" :size="'14'"
                            label="원천" />
                    </a-col>
                    <a-col>
                        <div class="dflex custom-flex">
                            <label class="lable-item">심사상태/결과 :</label>
                            <subs-req-status-select-box v-model:valueInput="statuses" placeholder="전체" />
                        </div>
                    </a-col>
                    <a-col>
                        <div class="dflex custom-flex">
                            <label class="lable-item">영업자 :</label>
                            <list-sales-dropdown width="150px" v-model:valueInput="originData.salesRepresentativeId" />
                        </div>
                    </a-col>

                    <a-col>
                        <div class="dflex custom-flex">
                            <label class="lable-item">상호 :</label>
                            <default-text-box width="150px" v-model:valueInput="originData.companyName" />
                        </div>
                    </a-col>

                    <a-col>
                        <div class="dflex custom-flex">
                            <label class="lable-item">대표자 :</label>
                            <default-text-box width="150px" v-model:valueInput="originData.presidentName" />
                        </div>
                    </a-col>

                    <a-col>
                        <div class="dflex custom-flex">
                            <label class="lable-item">신청기간 :</label>
                            <range-date-time-box v-model:valueDate="rangeDate" width="250px" :multi-calendars="true" :placeholder="'시작 날짜 - 종료 날짜'"/>
                        </div>
                    </a-col>
                </a-row>
            </div>
            <div class="page-content">
                <DxDataGrid id="table-main-bf310" noDataText="내역이 없습니다" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                    :show-borders="true" key-expr="id" @exporting="onExporting" :allow-column-reordering="move_column"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true">
                    <DxScrolling mode="standard" show-scrollbar="always" />
                    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색"/>
                    <DxPaging :page-size="rowTable" />
                    <DxExport :enabled="true"/>
                    <DxToolbar>
                        <DxItem name="exportButton" css-class="cell-button-export"/>
                        <DxItem name="page" template="pagination-table" location="after" />
                        <DxItem name="searchPanel" />
                    </DxToolbar>
                    <template #pagination-table>
                        <div v-if="rowTable > originData.rows">
                            <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows"
                                :total="rowTable" show-less-items @change="changePage" />
                        </div>
                    </template>

                    <DxColumn data-field="createdAt" caption="신청일자" cell-template="createdat-cell" data-type="date" />
                    <template #createdat-cell="{ data }">
                        {{ $filters.formatDate(data.value) }}
                    </template>
                    <DxColumn data-field="code" caption="신청코드" />
                    <DxColumn data-field="status" caption="심사상태" cell-template="grid-cell" css-class="cell-center" />
                    <template #grid-cell="{ data }">
                        <a-tag style="width: 55px" :color="getColorTag(data.value)?.name">{{ getColorTag(data.value)?.tag_name }}</a-tag>
                    </template>
                    <DxColumn data-field="companyCode" caption="사업자코드" css-class="cell-center" />
                    <DxColumn data-field="companyName" caption="상호" />
                    <DxColumn data-field="companyAddress" caption="주소" />
                    <DxColumn data-field="presidentName" caption="대표자" />
                    <DxColumn data-field="compactSalesRepresentative.name" caption="영업자" />
                    <DxColumn caption="신청서비스" cell-template="acc-service" />
                    <template #acc-service="{ data }">
                        <span v-if="data.data.simpleAccountingInfos">
                            <a-popover>
                                <template #content>
                                    <div v-for="item in data.data.simpleAccountingInfos" :key="item">
                                        <div>{{ item.name }}: {{ (item.startYearMonth).toString().slice(0, 4) + '-' +
                                        (item.startYearMonth).toString().slice(4, 6) }}</div>
                                    </div>
                                </template>
                                <a-tag>회계</a-tag>
                            </a-popover>
                            <a-tag style="border-radius: 50%;" v-if="data.data.simpleAccountingInfos">{{
                                    data.data.simpleAccountingInfos.length
                                }}
                                </a-tag>
                        </span>
                        <span v-if="data.data.simpleWithholdingInfo">
                            <a-popover>
                                <template #content>
                                    <div>{{ data.data.simpleWithholdingInfo.name ? data.data.simpleWithholdingInfo.name + ':' : ''}} {{
                                                                        (data.data.simpleWithholdingInfo.startYearMonth).toString().slice(0, 4) + '-' +
                                    (data.data.simpleWithholdingInfo.startYearMonth).toString().slice(4, 6) }}</div>
                                </template>
                                <a-tag color="black">원천</a-tag>
                            </a-popover>
                        </span>
                    </template>
                    <DxColumn :width="80" cell-template="pupop" type="buttons" />
                    <template #pupop="{ data }">
                        <div class="custom-action">
                            <a-space :size="10">
                                <a-tooltip placement="top" color="black">
                                    <template #title>편집</template>
                                    <EditOutlined @click="setModalVisible(data)" />
                                </a-tooltip>
                                <a-tooltip placement="top" color="black">
                                    <template #title>변경이력</template>
                                    <HistoryOutlined @click="modalHistory(data)" />
                                </a-tooltip>
                            </a-space>
                        </div>
                    </template>
                </DxDataGrid>
                <div class="pagination-table" v-if="rowTable > originData.rows">
                    <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows"
                        :total="rowTable" show-less-items @change="changePage" />
                </div>
                <BF310Popup :modalStatus="modalStatus" @closePopup="modalStatus = false" @onUpdate="onDoneUpdate" :data="idSubRequest" />
                <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
                    :data="popupData" title="변경이력" :idRowEdit="idSubRequest" typeHistory="bf-310" />
            </div>
        </div>
    </a-spin>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { useQuery } from "@vue/apollo-composable";
import dayjs from 'dayjs';
import { EditOutlined, HistoryOutlined } from '@ant-design/icons-vue';
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSearchPanel, DxToolbar, DxItem, DxScrolling } from "devextreme-vue/data-grid";
import BF310Popup from "./components/BF310Popup.vue";
import queries from "@/graphql/queries/BF/BF3/BF310/index"
import { dataSearchIndex } from "./utils/index";
import { onExportingCommon, makeDataClean } from "@/helpers/commonFunction"
import notification from '@/utils/notification';
export default defineComponent({
    components: {
        DxDataGrid,
        DxColumn,
        DxPaging,
        DxExport,
        DxScrolling,
        DxSearchPanel,
        BF310Popup,
        EditOutlined,
        DxToolbar,
        DxItem, HistoryOutlined
    },
    setup() {
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const rangeDate = ref([parseInt(dayjs().subtract(1, 'year').format('YYYYMMDD')),parseInt( dayjs().format('YYYYMMDD'))]);
        const dataSource = ref([]);
        const modalStatus = ref(false);
        const idSubRequest = ref();
        const statuses: any = ref([]);
        const trigger = ref<boolean>(true);
        const rowTable = ref()
        let modalHistoryStatus = ref<boolean>(false)
        let popupData = ref([])
        const actionSearch: any = ref<boolean>(true)
        const originData = reactive({
            ...dataSearchIndex,
            rows: per_page,
            startDate: rangeDate.value[0],
            finishDate: rangeDate.value[1]
        })

        const setModalVisible = (data: any,) => {
            idSubRequest.value = data.data.id;
            modalStatus.value = true;
            popupData.value = data;

        }
        const { refetch: refetchData, loading, error, result ,onError} = useQuery(queries.searchSubscriptionRequests, { filter: originData }, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        onError((error) => {
            notification('error', error.message)
        });
        const onExporting = (e: { component: any; cancel: boolean; }) => {
            onExportingCommon(e.component, e.cancel, '계약정보관리&심사')
        }
        const modalHistory = (data: any) => {
            idSubRequest.value = data.data.id;
            modalHistoryStatus.value = true;
            popupData.value = data;
        }
        const getColorTag = (data: any) => {
            if (data == 10) {
                return { "name": "red", "tag_name": "신청" };
            } else if (data == 20) {
                return { "name": "blue", "tag_name": "심사중" };
            } else if (data == 30) {
                return { "name": "green", "tag_name": "승인" };
            } else if (data == 99) {
                return { "name": "grey", "tag_name": "반려" };
            }
        }
        const searching = (e: any) => {
            originData.page = 1
            originData.startDate = rangeDate.value[0]
            originData.finishDate = rangeDate.value[1]
            originData.statuses = statuses.value == 0 ? [10, 20, 30, 99] : statuses.value
            makeDataClean(originData)
            trigger.value = true;
            actionSearch.value = false
        }
        const changePage = (e: any) => {
            actionSearch.value = true
            originData.startDate = rangeDate.value[0]
            originData.finishDate = rangeDate.value[1]
            originData.statuses = statuses.value == 0 ? [10, 20, 30, 99] : statuses.value
            makeDataClean(originData)
            trigger.value = true;
        }
        watch(result, (value) => {
            trigger.value = false;
            if (value) {
                rowTable.value = value.searchSubscriptionRequests.totalCount
                dataSource.value = value.searchSubscriptionRequests.datas
            }
        });
        // Get api when page is changed
        const onChangePage = (page: any, pageSize: any) => {
            originData.page = page;
            makeDataClean(originData)
            trigger.value = true;
        }
        
        const onDoneUpdate = () => {
            setTimeout(() => {
                trigger.value = true
            }, 500);
        }

        return {
            loading,
            move_column,
            colomn_resize, modalHistoryStatus, modalHistory,
            rangeDate,
            idSubRequest,
            dataSource,
            modalStatus, popupData,
            rowTable,
            setModalVisible,
            originData,
            statuses,
            searching, changePage,
            getColorTag,
            onExporting,
            actionSearch,
            onChangePage,
            dayjs,
            trigger,
            onDoneUpdate,
        }
    },

});
</script>

<style lang="scss" scoped  src="./style/style.scss" />
