<template>
    <action-header title="권한그룹관리" @actionSearch="searching" />
    <div id="bf-220">
        <div class="search-form">
            <div id="components-grid-demo-flex">
                <a-row justify="start" :gutter="[16, 8]">
                    <a-col class="search">
                        <label class="lable-item">대상회원 :</label>
                        <checkbox-basic v-model:valueCheckbox="buttonSearch.typeSevice1" :size="'16'" />
                        <a-tag color="black" class="custom-service-search" @click="changeValSearch('1')">매니저
                        </a-tag>
                        <checkbox-basic v-model:valueCheckbox="buttonSearch.typeSevice2" :size="'16'" />
                        <a-tag color="gray" class="custom-service-search" @click="changeValSearch('2')">영업자회원
                        </a-tag>
                        <checkbox-basic v-model:valueCheckbox="buttonSearch.typeSevice3" :size="'16'" />
                        <a-tag class="ant-tag-yellow custom-service-search" @click="changeValSearch('3')">파트너회원
                        </a-tag>
                    </a-col>
                </a-row>
            </div>
        </div>
        <div class="page-content">
            <a-spin :spinning="spinning" size="large">
                <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true" key-expr="id"
                    @exporting="onExporting" :allow-column-reordering="move_column"
                    :allow-column-resizing="colomn_resize" :column-auto-width="true">
                    <DxScrolling mode="standard" show-scrollbar="always"/>
                    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                    <DxPaging :page-size="dataSearch.rows" />
                    <DxExport :enabled="true" :allow-export-selected-data="true" />
                    <DxToolbar>
                        <DxItem name="page" template="pagination-table" />
                        <DxItem name="searchPanel" />
                        <DxItem name="exportButton" />
                        <DxItem location="after" template="button-template" css-class="cell-button-add" />
                        <DxItem name="groupPanel" />
                        <DxItem name="addRowButton" show-text="always" />
                        <DxItem name="columnChooserButton" />
                    </DxToolbar>
                    <template #button-template>
                        <DxButton icon="plus" @click="openAddNewModal" />
                    </template>
                    <template #pagination-table>
                        <div v-if="totalRow > dataSearch.rows">
                            <a-pagination v-model:current="dataSearch.page" v-model:page-size="dataSearch.rows"
                                :total="totalRow" />
                        </div>
                    </template>
                    <DxColumn data-field="id" caption="그룹코드" data-type="text" :fixed="true" />
                    <DxColumn data-field="name" caption="그룹명" />
                    <DxColumn data-field="type" caption="대상회원" cell-template="button" />
                    <template #button="{ data }" class="custom-action">
                        <a-tag :color="getColorTag(data.value)">
                            {{ data.value == 'm' ? '매니저' : (data.value == 'r' ? '영업자' : (data.value == 'p' ? '파트너' :
                                    ''))
                            }}
                        </a-tag>
                    </template>
                    <DxColumn data-field="memo" caption="메모" />
                    <DxColumn :width="80" cell-template="pupop" />
                    <template #pupop="{ data }" class="custom-action">
                        <div class="custom-action">
                            <a-space :size="10">
                                <a-tooltip placement="top">
                                    <template #title>편집</template>
                                    <EditOutlined @click="openEditModal(data)" />
                                </a-tooltip>
                                <a-tooltip placement="top">
                                    <template #title>변경이력</template>
                                    <HistoryOutlined @click="modalHistory(data)" />
                                </a-tooltip>
                            </a-space>
                        </div>
                    </template>
                </DxDataGrid>
                <div class="pagination-table" v-if="totalRow > dataSearch.rows">
                    <a-pagination v-model:current="dataSearch.page" v-model:page-size="dataSearch.rows"
                        :total="totalRow" />
                </div>
                <BF220PopupAddNew :modalStatus="modalAddNewStatus" @closePopupAdd="closePopupAdd" />
                <BF220PopupEdit :modalStatus="modalEditStatus" @closePopupEdit="closePopupEdit" :idRowIndex="IDRow" />
                <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
                    :data="popupData" title="변경이력" :idRowEdit="IDRow" typeHistory="cm-220" />
            </a-spin>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { dataSearchUtils, buttonSearchUtils } from "./utils";
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxItem,DxScrolling } from 'devextreme-vue/data-grid';
import HistoryPopup from '@/components/HistoryPopup.vue';
import BF220PopupAddNew from "./components/BF220PopupAddNew.vue";
import DxButton from "devextreme-vue/button";
import notification from '@/utils/notification';
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/BF/BF2/BF220/index";
import { EditOutlined, HistoryOutlined, SearchOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined, LoginOutlined } from '@ant-design/icons-vue';
import BF220PopupEdit from './components/BF220PopupEdit.vue';
import { onExportingCommon } from "@/helpers/commonFunction"
export default defineComponent({
    components: {
        DxDataGrid,
        DxColumn,
        DxButton,
        DxPaging,
        DxSelection,
        DxScrolling,
        DxExport,
        DxSearchPanel,
        BF220PopupAddNew,
        HistoryPopup,
        EditOutlined,
        HistoryOutlined,
        DxToolbar,
        DxItem,
        SearchOutlined,
        PrinterOutlined,
        DeleteOutlined,
        SaveOutlined,
        LoginOutlined,
        BF220PopupEdit
    },
    setup() {
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const totalRow = ref(0)
        const IDRow = ref()
        const modalHistoryStatus = ref(false)
        const spinning = ref<boolean>(true);
        const popupData = ref()
        const buttonSearch = ref({
            ...buttonSearchUtils
        })
        const modalAddNewStatus = ref(false)
        const modalEditStatus = ref(false)
        const dataSearch = ref({
            ...dataSearchUtils,
            rows: per_page,
        })
        const searching = () => {
            let arrayStatus = []
            if (buttonSearch.value.typeSevice1 == true) {
                arrayStatus.push('m')
            }
            if (buttonSearch.value.typeSevice2 == true) {
                arrayStatus.push('r')
            }
            if (buttonSearch.value.typeSevice3 == true) {
                arrayStatus.push('p')
            }
            if (buttonSearch.value.typeSevice1 != true && buttonSearch.value.typeSevice2 != true && buttonSearch.value.typeSevice3 != true) {
                notification('error', '대상회원을 선택해야합니다!')
            } else {
                dataSearch.value.types = arrayStatus
                spinning.value = true
                refetchData()
            }
        }
        const { refetch: refetchData, result: resList } = useQuery(queries.searchScreenRoleGroups, dataSearch, () => ({
            fetchPolicy: "no-cache",
        }))
        const closePopupAdd = () => {
            modalAddNewStatus.value = false
            refetchData()
        }
        const closePopupEdit = () => {
            modalEditStatus.value = false
            refetchData()
        }
        const onExporting = (e: any) => {
            onExportingCommon(e.component, e.cancel, '권한그룹관리')
        }
        const modalHistory = (data: any) => {
            IDRow.value = data.data.id
            modalHistoryStatus.value = true;
            popupData.value = data;
        }
        const openAddNewModal = () => {
            modalAddNewStatus.value = true;
        }
        const openEditModal = (data: any) => {
            IDRow.value = data.data.id
            modalEditStatus.value = true;
        }
        const getColorTag = (data: string) => {
            if (data === "m") {
                return "black";
            } else if (data === "p") {
                return "yellow";
            } else if (data === "r") {
                return "gray";
            }
        }
        const changeValSearch = (key: any) => {
            if (key == '1')
                buttonSearch.value.typeSevice1 = !buttonSearch.value.typeSevice1
            else if (key == '2')
                buttonSearch.value.typeSevice2 = !buttonSearch.value.typeSevice2
            else if (key == '3')
                buttonSearch.value.typeSevice3 = !buttonSearch.value.typeSevice3
        }
        let dataSource = ref([])
        watch(resList, (value) => {
            dataSource.value = value.searchScreenRoleGroups.datas
            totalRow.value = value.searchScreenRoleGroups.totalCount
            spinning.value = false
        });
        return {
            changeValSearch,
            move_column,
            colomn_resize,
            modalAddNewStatus,
            modalHistoryStatus,
            closePopupAdd,
            closePopupEdit,
            modalEditStatus,
            modalHistory,
            searching,
            getColorTag,
            onExporting,
            openAddNewModal,
            openEditModal,
            popupData,
            spinning,
            dataSearch,
            resList,
            buttonSearch,
            totalRow,
            IDRow,
            dataSource
        }
    },
});
</script>


<style lang="scss" scoped src="./style/style.scss"/>
