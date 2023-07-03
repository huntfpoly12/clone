<template>
    <action-header title="기타소득자등록" @actionSave="false" :buttonSave="false" />
    <div id="announcement-user">
        <div class="page-content">
            <a-row>
                <a-col span="16" class="data-table">
                    <a-spin :spinning="false" size="large">
                        <DxDataGrid noDataText="내역이 없습니다" id="gridContainer" :show-row-lines="true"
                            :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
                            key-expr="residentIdHide" :allow-column-reordering="move_column"
                            :allow-column-resizing="colomn_resize" :column-auto-width="true" ref="gridRef"
                            :focused-row-enabled="true">
                            <DxScrolling mode="standard" show-scrollbar="always" />
                            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
                            <DxPaging :enabled="false" />
                            <DxExport :enabled="true" />
                            <DxToolbar>
                                <DxItem template="search-template" location="before" />
                                <DxItem name="searchPanel" />
                                <!-- <DxItem name="exportButton" css-class="cell-button-export" /> -->
                                <!-- <DxItem location="after" template="button-history" css-class="cell-button-add" /> -->
                                <!-- <DxItem location="after" template="button-template" css-class="cell-button-add" /> -->
                            </DxToolbar>
                            <template #search-template>
                                <div class="d-flex-center">
                                    <a-form-item label="작성기간 (최대 3년)" :label-col="labelCol" class="red">
                                        <range-date-time-box v-model:valueDate="rangeDate" width="250px"
                                            :multi-calendars="true" />
                                    </a-form-item>

                                    <div class="d-flex-center ml-20">
                                        <span><checkbox-basic :valueCheckbox="true" /></span>
                                        <span>삭제 포함</span>
                                    </div>
                                </div>
                            </template>
                            <DxColumn caption="구분" cell-template="" data-field="" />

                            <DxColumn caption="상단고정" cell-template="" data-field="" />

                            <DxColumn caption="내용" cell-template="" data-field="" />

                            <DxColumn caption="작성자" cell-template="" data-field="" />

                            <DxColumn caption="작성일" cell-template="" data-field="" />
                        </DxDataGrid>
                    </a-spin>
                </a-col>
                <a-col span="8" class="custom-layout">
                    <a-spin :spinning="false" size="large">
                        <StandardForm formName="pa-710-form" ref="pa710FormRef">

                        </StandardForm>
                    </a-spin>
                </a-col>
            </a-row>
        </div>

    </div>
</template>
<script lang="ts">
import {
    defineComponent,
    ref,
    watch,
    reactive,
    computed,
    watchEffect,
} from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useStore } from "vuex";
import {
    DxDataGrid,
    DxColumn,
    DxToolbar,
    DxItem,
    DxSearchPanel,
    DxExport,
    DxScrolling,
    DxPaging,
} from "devextreme-vue/data-grid";
import {
    EditOutlined,
    HistoryOutlined,
    DeleteOutlined,
    SaveOutlined,
} from "@ant-design/icons-vue";
import dayjs from 'dayjs';
import DxButton from "devextreme-vue/button";
import DataSource from "devextreme/data/data_source";
export default defineComponent({
    components: {
        DxDataGrid,
        DxColumn,
        EditOutlined,
        HistoryOutlined,
        DxToolbar,
        DxItem,
        DxExport,
        DxSearchPanel,
        DeleteOutlined,
        DxButton,
        SaveOutlined,
        DxScrolling,
        DxPaging,
    },
    setup() {
        // config grid
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const dataSource = ref([])
        let trigger = ref(true);
        const rangeDate = ref([parseInt(dayjs().subtract(3, 'year').format("YYYYMMDD")), parseInt(dayjs().format("YYYYMMDD"))])

        // ================GRAPQL==============================================

        // ================FUNCTION============================================

        // ================WATCHING============================================


        return {
            move_column,
            colomn_resize,
            labelCol: { style: { width: "150px" } },
            dataSource,
            rangeDate,
        };
    },
});
</script>
<style scoped lang="scss" src="./style/style.scss"></style>

<style>
.confirmDelete .anticon {
    color: black !important;
}
</style>
