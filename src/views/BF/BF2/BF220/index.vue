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
        <div id="bf-220">
            <div class="search-form">
                <div id="components-grid-demo-flex">
                    <a-row justify="start" :gutter="[16,8]">
                        <a-col>
                            <label class="lable-item">대상회원 :</label>
                            <a-checkbox v-model:checked="buttonSearch.typeSevice1">
                                <a-tag color="black">매니저</a-tag>
                            </a-checkbox>
                            <a-checkbox v-model:checked="buttonSearch.typeSevice2">
                                <a-tag color="gray" style="border: 1px solid black;">영업자</a-tag>
                            </a-checkbox>
                            <a-checkbox v-model:checked="buttonSearch.typeSevice3">
                                <a-tag color="#FFFF00" style="color: black;border: 1px solid black">파트너</a-tag>
                            </a-checkbox>
                        </a-col>
                    </a-row>
                </div>
            </div>
            <div class="page-content">
                <DxDataGrid :data-source="resList ? resList.searchScreenRoleGroups.datas : ''" :show-borders="true"
                    key-expr="id" @exporting="onExporting">
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

                    <DxColumn data-field="id" caption="그룹코드" data-type="text" :fixed="true" />
                    <DxColumn data-field="name" caption="그룹명" />
                    <DxColumn data-field="type" caption="대상회원" cell-template="button" />
                    <template #button="{ data }" class="custom-action">
                        <a-tag :color="getColorTag(data.value)">
                            {{ data.value == 'm' ? '매니저' : (data.value == 'r' ? '영업자' : (data.value == 'p' ? '파트너' :
                            '')) }}
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
                        :total="totalRow" show-less-items />
                </div>

                <BF220PopupAddNew :modalStatus="modalAddNewStatus"  @closePopupAdd="modalAddNewStatus = false" />

                <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
                    :data="popupData" title="변경이력" />
            </div>

        </div>
    </a-spin>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxExport,
    DxSelection,
    DxSearchPanel,
    DxToolbar,
    DxItem
} from 'devextreme-vue/data-grid';
import HistoryPopup from '../../../../components/HistoryPopup.vue';
import BF220PopupAddNew from "./components/BF220PopupAddNew.vue";
import DxButton from "devextreme-vue/button";
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { useQuery } from "@vue/apollo-composable";
import queries from "../../../../graphql/queries/BF/BF2/BF220/index";
import { message } from 'ant-design-vue';
import {
    EditOutlined,
    HistoryOutlined,
    SearchOutlined,
    PrinterOutlined,
    DeleteOutlined,
    SaveOutlined,
    LoginOutlined
} from '@ant-design/icons-vue';
import dayjs from 'dayjs';
import weekday from "dayjs/plugin/weekday"
import localeData from "dayjs/plugin/localeData"
dayjs.extend(weekday)
dayjs.extend(localeData)
export default defineComponent({
    components: {
        DxDataGrid,
        DxColumn,
        DxButton,
        DxPaging,
        DxSelection,
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
        LoginOutlined
    },
    data() {
        return {
            popupData: [],
            modalStatus: false,
            modalHistoryStatus: false,
            modalAddNewStatus: false,
            modalEditStatus: false
        };
    },
    setup() {
        const totalRow = ref(0)
        const spinning = ref<boolean>(true);
        const buttonSearch = ref({
            typeSevice1: true,
            typeSevice2: true,
            typeSevice3: true
        }) 

        const dataSearch = ref({
            page: 1,
            rows: 10,
            types: ["m", "r", "p"]
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
                message.error('Vui lòng chọn trạng thái để tìm kiếm')
            } else {
                dataSearch.value.types = arrayStatus
                spinning.value = true
                setTimeout(() => {
                    refetchData()
                }, 100);
            }
        }

        const { refetch: refetchData, result: resList } = useQuery(queries.searchScreenRoleGroups, dataSearch, () => ({
            fetchPolicy: "no-cache",
        }))

        watch(resList, (value) => {
            totalRow.value = value.searchScreenRoleGroups.totalCount
            setTimeout(() => {
                spinning.value = false
            }, 500);
        });

        return {
            searching,
            spinning,
            dataSearch,
            resList,
            buttonSearch,
            totalRow
        }
    },
    methods: {
        onExporting(e: any) {
            const workbook = new Workbook();
            const worksheet = workbook.addWorksheet('employees');
            exportDataGrid({
                component: e.component,
                worksheet,
                autoFilterEnabled: true,
            }).then(() => {
                workbook.xlsx.writeBuffer().then((buffer) => {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), '권한그룹관리.xlsx');
                });
            });
            e.cancel = true;
        },
        setModalVisible(data: any) {
            this.modalStatus = true;
            this.popupData = data;
        },
        modalHistory(data: any) {
            this.modalHistoryStatus = true;
            this.popupData = data;
        },
        openAddNewModal() {
            this.modalAddNewStatus = true;
        },
        openEditModal(data: any) {
            this.modalEditStatus = true;
        },
        getColorTag(data: String) {
            if (data === "m") {
                return "black";
            } else if (data === "p") {
                return "yellow";
            } else if (data === "r") {
                return "gray";
            }
        }
    },
});
</script>

<style lang="scss" scoped>
.page-content {
    padding: 10px 10px;
}

#data-grid-demo {
    min-height: 700px;
}

.dx-select-checkbox {
    display: inline-block !important;
}

.modal-note {
    max-height: 500px;
    overflow: auto;

    .title-note {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    th {
        display: none;
    }

    .ant-collapse-content-box {
        padding: 0px;
    }
}

.anticon {
    cursor: pointer;
}

.custom-action {
    text-align: center;
}

.search-form {
    margin-bottom: 10px;
    background: #f1f3f4;
    padding: 10px 24px;

    >div {
        width: 100%;
        justify-content: flex-start !important;
        align-items: center;
        margin-right: 15px;
    }

    label {
        margin-right: 10px;
    }

    .lable-item {
        white-space: nowrap;
        margin-right: 10px;
        width: auto !important;
    }

    .col {
        align-items: center;
        display: flex;
        align-items: center;
        margin-top: 20px;

        .lable-item {
            width: 110px;
            display: inline-block;
        }

        .item:nth-child(2) {
            margin-left: 30px;
        }
    }
}

.ant-row {
    align-items: center;
}

.ant-form-item {
    margin-bottom: 4px;
}

.ant-collapse {
    .ant-collapse-item {
        .ant-collapse-header {
            padding: 7px;
        }
    }
}

.warring-modal {
    font-size: 12px;
    line-height: 0px;
}

.ant-form-item-label {
    text-align: left;
}

.clr {
    label {
        color: red;
    }
}

.clr-text {
    color: red;
}

.clb,
.clb-label label {
    color: black !important;
}

::v-deep.components-modal-demo-position {
    ::v-deep.test-local {
        background-color: pink !important;
        width: 1000px !important;
        height: 200px !important;
    }

    .imgPreview img {
        width: 1000px !important;
    }

    .ant-form-item-label {
        text-align: left;
    }
}

.dflex {
    display: flex;
}

.custom-flex {
    align-items: flex-start;
}

.warring-bank {
    display: flex;
    align-items: center;
}

.pl-5 {
    padding-left: 5px;
}

.custom-lineHeight {
    line-height: 3px;
}
</style>