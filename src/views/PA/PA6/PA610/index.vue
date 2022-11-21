<template>
    <a-spin :spinning="loading" size="large">
        <action-header title="사업소득자등록" />
        <div id="pa-610">
            <div class="page-content">
                <a-row>
                    <a-col :span="3" class="total-user">
                        <div>
                            <span>300</span>
                            <br>
                            <span>전체</span>
                        </div>
                        <div>
                            <i class="dx-icon-user"></i>
                        </div>
                    </a-col>

                    <a-col :span="21"></a-col>
                    <a-col :span="16" class="custom-layout">
                        <div>
                            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                                :show-borders="true" key-expr="id" @exporting="onExporting"
                                :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                                :column-auto-width="true">
                                <DxScrolling column-rendering-mode="virtual" />
                                <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                                <DxExport :enabled="true" :allow-export-selected-data="true" />
                                <DxToolbar>
                                    <DxItem location="after" template="pagination-table" />
                                    <DxItem name="searchPanel" />
                                    <DxItem name="exportButton" />
                                    <DxItem location="after" template="button-template" css-class="cell-button-add" />
                                    <DxItem name="groupPanel" />
                                    <DxItem name="addRowButton" show-text="always" />
                                    <DxItem name="columnChooserButton" />
                                </DxToolbar>
                                <template #button-template>
                                    <DxButton icon="plus" />
                                </template>
                                <template #pagination-table>
                                    <div v-if="rowTable > originData.rows">
                                        <a-pagination v-model:current="originData.page"
                                            v-model:page-size="originData.rows" :total="rowTable" show-less-items />
                                    </div>
                                </template>
                                <DxColumn caption="영업자코드" data-field="code" />
                                <DxColumn caption="영업자명" data-field="name" />
                                <DxColumn caption="등급" data-field="grade" data-type="text" cell-template="grade-cell" />
                                <DxColumn caption="주소" data-field="address" />

                            </DxDataGrid>
                            <div class="pagination-table" v-if="rowTable > originData.rows">
                                <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows"
                                    :total="rowTable" show-less-items style="margin-top: 10px" @change="searching" />
                            </div> 
                        </div>

                    </a-col>
                    <a-col :span="8" class="custom-layout">
                        <div>
                            <a-form-item label="영업자코드" label-align="right">
                                <default-text-box width="200px" placeholder="숫자만 입력 가능" />
                            </a-form-item>
                            <a-form-item label="성명(상호)" label-align="right">
                                <default-text-box width="200px" placeholder="한글,영문(대문자) 입력 가능" />
                            </a-form-item>
                            <a-form-item label="내/외국인" label-align="right">
                                <radio-group :arrayValue="arrForeigner" v-model:valueRadioCheck="valueCheckbox"
                                    layoutCustom="horizontal" />
                            </a-form-item>
                            <a-form-item label="외국인 국적" label-align="right">
                                <country-code-select-box v-model:valueCountry="valueCountry" />
                            </a-form-item>
                            <a-form-item label="외국인 체류자격" label-align="right">
                                <!-- <default-text-box width="200px" placeholder="숫자 13자리"/> -->
                            </a-form-item>
                            <a-form-item label="주민(외국인)번호" label-align="right">
                                <default-text-box width="200px" placeholder="숫자 13자리" />
                            </a-form-item>
                            <a-form-item label="소득구분" label-align="right">
                                <type-code-select-box />
                            </a-form-item>
                            <a-form-item label="이메일" label-align="right">
                                <mail-text-box width="200px" placeholder="abc@example.com" />
                            </a-form-item>
                        </div>
                    </a-col>
                </a-row>
            </div>
        </div>
    </a-spin>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from "vue";
import { useStore } from 'vuex';
import { useQuery } from "@vue/apollo-composable";
import notification from "../../../../utils/notification";
import queries from "../../../../graphql/queries/BF/BF3/BF340/index";
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import { onExportingCommon } from "../../../../helpers/commonFunction"
import { origindata, ArrForeigner } from "./utils";
import DxButton from "devextreme-vue/button";


export default defineComponent({
    components: {
        DxDataGrid,
        DxColumn,
        DxPaging,
        DxSelection,
        DxExport,
        DxSearchPanel,
        DxScrolling,
        EditOutlined,
        HistoryOutlined,
        DxToolbar,
        DxEditing,
        DxGrouping,
        DxItem,
        SearchOutlined,
        MenuFoldOutlined,
        MenuUnfoldOutlined,
        MailOutlined,
        PrinterOutlined,
        DeleteOutlined,
        SaveOutlined,
        ArrForeigner,
        DxButton,
        
    },
    setup() {
        const loading = ref(false)
        const dataSource = ref([]);
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const rowTable = ref(0);
        const originData = reactive({ ...origindata, rows: per_page });
        const arrForeigner = ArrForeigner
        const valueCheckbox = ref(1)
        const valueCountry = ref()
        
        // ================FUNCTION============================================
        const onExporting = (e: any) => {
            onExportingCommon(e.component, e.cancel, '영업자관리')
        };
        const searching = () => {
            // originData.grade = saleGrade.value == 0 ? null : saleGrade.value;
            // originData.statuses = [saleStatus.value];
            // trigger.value = true;
            // refetchData();
        };
        return {
            arrForeigner,
            rowTable,
            loading,
            onExporting,
            dataSource,
            per_page, move_column, colomn_resize,
            originData,
            searching,
            valueCheckbox,
            valueCountry
        };
    },
});
</script>  
<style scoped lang="scss" src="./style/style.scss" >

</style>
