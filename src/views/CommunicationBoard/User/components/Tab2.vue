<template>
    <!-- <div > -->
    <!-- <div class="page-content"> -->
    <a-row>
        <a-col span="16" class="data-table">
            <a-spin :spinning="false" size="large">
                <DxDataGrid noDataText="내역이 없습니다" id="gridContainer" :show-row-lines="true" :hoverStateEnabled="true"
                    :data-source="dataSource" :show-borders="true" key-expr="residentIdHide"
                    :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true"
                    ref="gridRef" :focused-row-enabled="true">
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
                        <div class="d-flex-center search-template">
                            <a-form-item label="작성기간 (최대 1년)" :label-col="labelCol">
                                <range-date-time-box v-model:valueDate="rangeDate" maxRange width="250px"
                                    :multi-calendars="true" />
                            </a-form-item>

                            <div class="d-flex-center ml-20">
                                <img src="@/assets/images/iconInfo.png" style="width: 16px" />
                                <span class="ml-5">문의글 기준</span>
                            </div>
                        </div>
                    </template>
                    <DxColumn caption="구분" cell-template="" data-field="" />

                    <DxColumn caption="분류" cell-template="" data-field="" />

                    <DxColumn caption="알림내용" cell-template="" data-field="" />

                    <DxColumn caption="작성자" cell-template="" data-field="" />

                    <DxColumn caption="작성일시" cell-template="" data-field="" />
                </DxDataGrid>
            </a-spin>
        </a-col>
        <a-col span="8" class="custom-layout">
            <a-spin :spinning="false" size="large">
                <StandardForm formName="form-tab2" ref="pa710FormRef">
                    <div v-if="dataSource" class="wrapper-content">
                        <div v-for="data in dataSourceDetail" :key="data.id" class="question-container">
                            <div class="d-flex-center gap-10">
                                <div :class="`tag ${getTag(data.expressionType).class}`">{{
                                    getTag(data.expressionType).text }}</div>
                                <div class="font-bold">id_{{ data.id }}</div>
                                <div class="time">{{ dayjs(data.date).format('YYYY-MM-DD hh:mm:ss') }}</div>
                                <div class="classification">회계-마감-(2023-05)</div>
                            </div>
                            <div class="truncate" style=" width: 250px;">{{ data.content }}</div>
                        </div>
                    </div>
                </StandardForm>
            </a-spin>
        </a-col>
    </a-row>
    <!-- </div> -->

    <!-- </div> -->
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
import { getFakeData } from "../utils/index";
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
        const dataSourceDetail = ref<any>()

        dataSourceDetail.value = getFakeData()
        let trigger = ref(true);
        const loading = ref(false);
        const rangeDate = ref([parseInt(dayjs().subtract(1, 'year').format("YYYYMMDD")), parseInt(dayjs().format("YYYYMMDD"))])

        // ================GRAPQL==============================================

        // ================FUNCTION============================================

        const getTag = (expressionType: number) => {
            switch (expressionType) {
                case 1:
                    return {
                        text: '문의',
                        class: 'tag-inquiry'
                    }
                case 2:
                    return {
                        text: '답글',
                        class: 'tag-reply'
                    }
                case 3:
                    return {
                        text: '알림',
                        class: 'tag-alarm'
                    }
                case 4:
                    return {
                        text: '일반',
                        class: 'tag-white'
                    }
                default:
                    return {
                        text: '', class: ''
                    }
            }
        }
        // const openRow = (data: any) => {

        // }
        // ================WATCHING============================================


        return {
            move_column,
            colomn_resize,
            labelCol: { style: { width: "150px" } },
            dataSource, dataSourceDetail,
            loading,
            getTag,
            // openRow, 
            dayjs,
            rangeDate,
        };
    },
});
</script>
<style scoped lang="scss" src="../style/style.scss"></style>
