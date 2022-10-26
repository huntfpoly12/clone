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
                        <a-col>
                            <label class="lable-item">회원종류 :</label>
                            <a-select style="width: 10px" v-model:value="dataSearch.type" option-label-prop="children">
                                <a-select-option value="c" label="고객사">
                                    <a-tag :color="getColorTag('c')">고객사</a-tag>
                                </a-select-option>
                                <a-select-option value="m" label="매니저">
                                    <a-tag :color="getColorTag('m')">매니저</a-tag>
                                </a-select-option>
                                <a-select-option value="r" label="영업자">
                                    <a-tag :color="getColorTag('r')">영업자</a-tag>
                                </a-select-option>
                                <a-select-option value="p" label="파트너">
                                    <a-tag :color="getColorTag('p')">파트너</a-tag>
                                </a-select-option>
                            </a-select>
                        </a-col>
                        <a-col>
                            <label class="lable-item">소속코드:</label>
                            <a-input style="width: 150px" v-model:value="dataSearch.groupCode" />
                        </a-col>
                        <a-col>
                            <label class="lable-item">소속명:</label>
                            <a-input style="width: 150px" v-model:value="dataSearch.groupName" />
                        </a-col>
                        <a-col>
                            <label class="lable-item">회원ID :</label>
                            <a-input style="width: 150px" v-model:value="dataSearch.username" />
                        </a-col>
                        <a-col>
                            <label class="lable-item">회원명 :</label>
                            <a-input style="width: 150px" v-model:value="dataSearch.name" />
                        </a-col>
                        <a-col style="display: flex; align-items: center">
                            <a-checkbox v-model:checked="checkStatus.checkBox1" value="true">
                                <a-tag :color="getAbleDisable(true)">이용중</a-tag>
                            </a-checkbox>
                            <a-checkbox v-model:checked="checkStatus.checkBox2">
                                <a-tag :color="getAbleDisable(false)">이용중지</a-tag>
                            </a-checkbox>
                        </a-col>
                    </a-row>
                </div>
            </div>
            <div class="page-content">
                <DxDataGrid :data-source="dataSource" :show-borders="true" key-expr="id" @exporting="onExporting" :allow-column-reordering="true" :allow-column-resizing="true"
                        :column-auto-width="true" >
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
                            (data.value == "p"? "파트너": "영업자")) }}</a-tag>
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
import { defineComponent, ref } from "vue";
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
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { useQuery } from "@vue/apollo-composable";
import queries from "../../../../graphql/queries/BF/BF2/BF210/index";
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
        LoginOutlined
    },
    data() {
        return {
            popupData: [],
            modalAddNewStatus: false,
            modalEditStatus: false,
            modalHistoryStatus: false,
            modalLoginStatus: false,
        };
    },
    setup() {
        let triggersearching = ref<boolean>(false);
        const spinning = ref<boolean>(true);
        const checkStatus = ref({
            checkBox1: true,
            checkBox2: false
        })
        const rowChoose = ref()
        const dataSearch = ref({
            page: 1,
            rows: 10,
            type: "m",
            groupCode: "",
            groupName: "",
            username: "",
            name: "",
        })
        var idRowEdit = ref<number>(0)
        const originData = ref({
            page: 1,
            rows: 10,
            type: "",
            groupCode: "",
            groupName: "",
            username: "",
            name: "",
        })
        setTimeout(() => {
            spinning.value = !spinning.value;
        }, 1000);
        const dataSource = ref([])
        const { refetch: refetchData, onResult } = useQuery(queries.searchUsers, originData, () => ({
            enabled: triggersearching.value,
            fetchPolicy: "no-cache",
        }))
        onResult((res) => {
            dataSource.value = res.data.searchUsers.datas
        })

        const searching = () => {

            spinning.value = !spinning.value;
            let dataNew = ref()
            if (checkStatus.value.checkBox1 == true && checkStatus.value.checkBox2 == false) {
                dataNew.value = {
                    page: 1,
                    rows: 10,
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
                    rows: 10,
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
                    rows: 10,
                    type: dataSearch.value.type,
                    groupCode: dataSearch.value.groupCode,
                    groupName: dataSearch.value.groupName,
                    username: dataSearch.value.username,
                    name: dataSearch.value.name,
                }
            }
            originData.value = dataNew.value
            refetchData()
            triggersearching.value = true             
            setTimeout(() => {
                spinning.value = !spinning.value;
            }, 1000);
        }
        return {
            spinning,
            dataSource,
            idRowEdit,
            refetchData,
            originData,
            searching,
            dataSearch,
            rowChoose,
            checkStatus
        }
    },
    methods: {
        onExporting(e: any) {
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
        },
        openAddNewModal() {
            this.modalAddNewStatus = true;
        },
        setModalEditVisible(data: any) {
            this.idRowEdit = data.data.id
            this.modalEditStatus = true;
            this.popupData = data;
        },
        modalHistory(data: any) {
            this.idRowEdit = data.data.id
            this.modalHistoryStatus = true;
            this.popupData = data;
        },
        modalLogin(data: any) {

            this.rowChoose = data.key
            this.modalLoginStatus = true;
            this.popupData = data;
        },
        getColorTag(data: any) {
            if (data === "c") {
                return "blue";
            } else if (data === "m") {
                return "black";
            } else if (data === "r") {
                return "grey";
            } else if (data === "p") {
                return "#cdc71c";
            }
        },
        getAbleDisable(data: any) {
            if (data === true) {
                return "blue";
            } else if (data === false) {
                return "#d5a7a7";
            }
        },
    },
});
</script>
<style scoped>
.page-content {
    padding: 10px 10px;
}

.cell-button-add {
    padding-left: 100px !important;
}

.cell-center {
    text-align: center !important
}

.dx-button-has-text .dx-button-content {
    padding: 0px 15px !important;
}

.search-form {
    background: #f1f3f4;
    padding: 10px 24px;
}

.dx-select-checkbox {
    display: inline-block !important;
}

#data-grid-demo {
    min-height: 700px;
}

.search-form .col {
    display: flex;
    align-items: center;
}

.search-form .col {
    margin-top: 20px;
}

.search-form .col .lable-item {
    width: 110px;
    display: inline-block;
}

.search-form .col .item:nth-child(2) {
    margin-left: 30px;
}
</style>