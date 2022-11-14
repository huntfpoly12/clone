<template>
    <a-spin :spinning="spinning" size="large">
        <div class="top-content">
            <a-typography-title :level="3"> 회원관리
            </a-typography-title>
            <div class="list-action">
                <a-tooltip>
                    <template #title>조회</template>
                    <a-button @click="searching">
                        <SearchOutlined />
                    </a-button>
                </a-tooltip>
                <a-tooltip>
                    <template #title>저장</template>
                    <a-button>
                        <SaveOutlined />
                    </a-button>
                </a-tooltip>
                <a-tooltip>
                    <template #title>삭제</template>
                    <a-button>
                        <DeleteOutlined />
                    </a-button>
                </a-tooltip>
                <a-tooltip>
                    <template #title>출력</template>
                    <a-button>
                        <PrinterOutlined />
                    </a-button>
                </a-tooltip>
            </div>
        </div>
        <div id="bf-210">
            <div class="search-form">
                <div id="components-grid-demo-flex">
                    <a-row justify="start" :gutter="[16, 8]">
                        <a-col class="custom-flex">
                            <label class="lable-item">회원종류 :</label>
                            <DxSelectBox id="custom-templates" :data-source="products" display-expr="name"
                                value-expr="id" item-template="item" :height="$config_styles.HeightInput"
                                style="width:170px" field-template="field" @value-changed="changeValueType">
                                <template #field="{ data }">
                                    <Field :fieldData="data" />
                                </template>
                                <template #item="{ data }">
                                    <div style="width: 100%; padding: 3px;">
                                        <div
                                            :style="{ color: data.color, background: data.background, padding: '2px 12px', borderRadius: '5px', border: data.border }">
                                            {{ data.name }}
                                        </div>
                                    </div>
                                </template>
                            </DxSelectBox> 
                        </a-col>
                        <a-col class="custom-flex">
                            <label class="lable-item">소속코드:</label>
                            <default-text-box width="150px" v-model:valueInput="dataSearch.groupCode" />
                        </a-col>
                        <a-col class="custom-flex">
                            <label class="lable-item">소속명:</label>
                            <default-text-box width="150px" v-model:valueInput="dataSearch.groupName" />
                        </a-col>
                        <a-col class="custom-flex">
                            <label class="lable-item">회원ID :</label>
                            <default-text-box width="150px" v-model:valueInput="dataSearch.username" />
                        </a-col>
                        <a-col class="custom-flex">
                            <label class="lable-item">회원명 :</label>
                            <default-text-box width="150px" v-model:valueInput="dataSearch.name" />
                        </a-col>
                        <a-col class="custom-flex">
                            <checkbox-basic v-model:valueCheckbox="checkStatus.checkBox1" :size="'14'" />
                            <a-tag :color="getAbleDisable(true)" style="cursor: pointer; margin-left: 7px;"
                                @click="changeValueCheckBox('checkBox1')">이용중</a-tag>
                            <checkbox-basic v-model:valueCheckbox="checkStatus.checkBox2" :size="'14'" />
                            <a-tag :color="getAbleDisable(false)" style="cursor: pointer; margin-left: 7px;"
                                @click="changeValueCheckBox('checkBox2')">이용중지
                            </a-tag>
                        </a-col>
                    </a-row>
                </div>
            </div>
            <div class="page-content">
                <DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="id" @exporting="onExporting"
                :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true">
                    <DxPaging :page-size="20" />
                    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                    <DxExport :enabled="true" :allow-export-selected-data="true" />
                    <DxToolbar>
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
                    <DxColumn data-field="active" caption="상태" data-type="text" cell-template="check-box" />
                    <template #check-box="{ data }">
                        <a-tag :color="getAbleDisable(data.value)">{{ data.value == true ? "이용중" : "이용중지" }}</a-tag>
                    </template>
                    <DxColumn data-field="username" caption="회원ID" css-class="cell-center" />
                    <DxColumn data-field="name" caption="회원명" />
                    <DxColumn data-field="type" caption="회원종류" cell-template="grid-cell" css-class="cell-center" />
                    <template #grid-cell="{ data }">
                        <a-tag :color="getColorTag(data.value)">
                            {{ data.value == "m" ? "매니저" : (data.value == "c"
                                    ? "고객사" :
                                    (data.value == "p" ? "파트너" : "영업자"))
                            }}</a-tag>
                    </template>
                    <DxColumn data-field="mobilePhone" caption="휴대폰" />
                    <DxColumn data-field="groupCode" caption="소속코드" />
                    <DxColumn data-field="groupName" caption="소속명" />
                    <DxColumn cell-template="pupop" :width="100" css-class="cell-center" />
                    <template #pupop="{ data }" class="custom-action">
                        <div class="custom-action">
                            <a-space :size="10">
                                <a-tooltip placement="top">
                                    <template #title>편집</template>
                                    <EditOutlined @click="setModalEditVisible(data)" />
                                </a-tooltip>
                                <a-tooltip placement="top">
                                    <template #title>변경이력</template>
                                    <HistoryOutlined @click="modalHistory(data)" />
                                </a-tooltip>
                                <a-tooltip placement="top">
                                    <template #title>로그인이력</template>
                                    <login-outlined @click="modalLogin(data)" />
                                </a-tooltip>
                            </a-space>
                        </div>
                    </template>
                </DxDataGrid>
                <AddNew210Poup :modalStatus="modalAddNewStatus" @closePopup="modalAddNewStatus = false" />
                <EditBF210Popup :modalStatus="modalEditStatus" @closePopup="modalEditStatus = false" :data="popupData"
                    :idRowEdit="idRowEdit" typeHistory="bf-210-pop" title="회원관리" />
                <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
                    :data="popupData" title="변경이력" :idRowEdit="idRowEdit" typeHistory="bf-210" />
                <PopLogin :modalStatus="modalLoginStatus" @closePopup="modalLoginStatus = false" :data="popupData"
                    title="로그인이력" :idRow="rowChoose" />
            </div>
        </div>
    </a-spin>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxExport,
    DxSearchPanel,
    DxToolbar,
    DxItem,
} from "devextreme-vue/data-grid";
import EditBF210Popup from "./components/EditBF210Popup.vue";
import AddNew210Poup from "./components/AddNew210Poup.vue";
import HistoryPopup from "../../../../components/HistoryPopup.vue";
import PopLogin from "./components/PopLogin.vue";
import DxButton from "devextreme-vue/button";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import { exportDataGrid } from "devextreme/excel_exporter";
import {
    EditOutlined,
    HistoryOutlined,
    SearchOutlined,
    PrinterOutlined,
    DeleteOutlined,
    SaveOutlined,
    LoginOutlined
} from "@ant-design/icons-vue";
import DxSelectBox from 'devextreme-vue/select-box';
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { useQuery } from "@vue/apollo-composable";
import queries from "../../../../graphql/queries/BF/BF2/BF210/index";
import Field from './components/Field.vue';
dayjs.extend(weekday);
dayjs.extend(localeData);
export default defineComponent({
    components: {
        DxDataGrid,
        DxColumn,
        DxButton,
        DxPaging,
        DxExport,
        DxSearchPanel,
        EditOutlined,
        HistoryOutlined,
        DxToolbar,
        DxItem,
        AddNew210Poup,
        EditBF210Popup,
        HistoryPopup,
        PopLogin,
        SearchOutlined,
        PrinterOutlined,
        DeleteOutlined,
        SaveOutlined,
        DxSelectBox,
        LoginOutlined,
        Field,
    },
    setup() {
        const popupData = ref([])
        const modalAddNewStatus = ref(false)
        const modalHistoryStatus = ref(false)
        const modalLoginStatus = ref(false)
        const modalEditStatus = ref<boolean>(false);
        let triggerSearching = ref<boolean>(false);
        const spinning = ref<boolean>(false);
        const checkStatus = ref({
            checkBox1: true,
            checkBox2: false
        })
        const rowChoose = ref()
        // config grid
        const store = useStore();
        
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);

        const dataSearch = ref({
            page: 1,
            rows: per_page,
            type: "m",
            groupCode: "",
            groupName: "",
            username: "",
            name: "",
        })
        var idRowEdit = ref<number>(0)
        const originData = ref()
        let products = ref([
            {
                id: "c",
                color: '#096dd9',
                name: "고객사",
                background: '#e6f7ff',
                border: "1px solid #91d5ff",
            },
            {
                id: "m",
                color: 'white',
                name: "매니저",
                background: 'black',
                border: "1px solid black",
            },
            {
                id: "r",
                color: 'white',
                name: "영업자",
                background: 'grey',
                border: "1px solid grey",
            },
            {
                id: "p",
                color: 'white',
                name: "파트너",
                background: 'goldenrod',
                border: "1px solid goldenrod",
            }
        ])
        const dataSource = ref([])
        const { refetch: refetchData, onResult } = useQuery(queries.searchUsers, originData, () => ({
            enabled: triggerSearching.value,
            fetchPolicy: "no-cache",
        }))
        onResult((res) => {
            dataSource.value = res.data.searchUsers.datas
            setTimeout(() => {
                spinning.value = false;
            }, 500);
        })
        const searching = () => {
            spinning.value = !spinning.value;
            let dataNew = ref()
            if (checkStatus.value.checkBox1 == true && checkStatus.value.checkBox2 == false) {
                dataNew.value = {
                    page: 1,
                    rows: per_page,
                    type: dataSearch.value.type,
                    groupCode: dataSearch.value.groupCode,
                    groupName: dataSearch.value.groupName,
                    username: dataSearch.value.username,
                    name: dataSearch.value.name,
                    active: true,
                }
            } else if (checkStatus.value.checkBox2 == true && checkStatus.value.checkBox1 == false) {
                dataNew.value = {
                    page: 1,
                    rows: per_page,
                    type: dataSearch.value.type,
                    groupCode: dataSearch.value.groupCode,
                    groupName: dataSearch.value.groupName,
                    username: dataSearch.value.username,
                    name: dataSearch.value.name,
                    active: false,
                }
            } else {
                dataNew.value = {
                    page: 1,
                    rows: per_page,
                    type: dataSearch.value.type,
                    groupCode: dataSearch.value.groupCode,
                    groupName: dataSearch.value.groupName,
                    username: dataSearch.value.username,
                    name: dataSearch.value.name,
                }
            }
            triggerSearching.value = true
            if (originData) {
                originData.value = dataNew.value
                refetchData()
            }
        }
        const changeValueCheckBox = (checkbox: any) => {
            if (checkbox == 'checkBox1')
                checkStatus.value.checkBox1 = !checkStatus.value.checkBox1
            else
                checkStatus.value.checkBox2 = !checkStatus.value.checkBox2
        }
        const onExporting = (e: any) => {
            const workbook = new Workbook();
            const worksheet = workbook.addWorksheet("employees");
            exportDataGrid({
                component: e.component,
                worksheet,
                autoFilterEnabled: true,
            }).then(() => {
                workbook.xlsx.writeBuffer().then((buffer) => {
                    saveAs(
                        new Blob([buffer], { type: "application/octet-stream" }),
                        "DataGrid.xlsx"
                    );
                });
            });
            e.cancel = true;
        }
        const openAddNewModal = () => {
            modalAddNewStatus.value = true;
        }
        const setModalEditVisible = (data: any) => {
            idRowEdit.value = data.data.id
            modalEditStatus.value = true;
            popupData.value = data;
        }
        const modalHistory = (data: any) => {
            idRowEdit.value = data.data.id
            modalHistoryStatus.value = true;
            popupData.value = data;
        }
        const modalLogin = (data: any) => {
            rowChoose.value = data.key
            modalLoginStatus.value = true;
            popupData.value = data;
        }
        const getColorTag = (data: any) => {
            if (data === "c") {
                return "#91d5ff";
            } else if (data === "m") {
                return "black";
            } else if (data === "r") {
                return "grey";
            } else if (data === "p") {
                return "goldenrod";
            }
        }
        const getAbleDisable = (data: any) => {
            if (data === true) {
                return "blue";
            } else if (data === false) {
                return "#d5a7a7";
            }
        }
        watch(() => modalEditStatus.value,
            () => {
                refetchData()
            }
        );
        const changeValueType = (e: any) => {
            dataSearch.value.type = e.value
        }
        return {
            changeValueType,
            onExporting,
            move_column,
            colomn_resize,
            openAddNewModal,
            setModalEditVisible,
            getAbleDisable,
            getColorTag,
            modalHistory,
            modalLogin,
            popupData,
            modalAddNewStatus,
            modalLoginStatus,
            modalHistoryStatus,
            changeValueCheckBox,
            modalEditStatus,
            spinning,
            dataSource,
            idRowEdit,
            refetchData,
            originData,
            searching,
            dataSearch,
            rowChoose,
            checkStatus,
            products
        }
    },
});
</script>
<style scoped lang="scss" src="./style/style.scss">
</style>