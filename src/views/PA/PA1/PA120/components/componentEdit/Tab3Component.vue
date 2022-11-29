<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div id="tab23-pa120">
        <a-row>
            <a-col :span="24">
                <a-spin :spinning="false" size="large">
                    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                        :show-borders="true" :allow-column-reordering="move_column"
                        :allow-column-resizing="colomn_resize" :column-auto-width="true">
                        <DxToolbar>
                            <DxItem location="after" template="button-template" css-class="cell-button-add" />
                        </DxToolbar>
                        <template #button-template>
                            <DxButton icon="plus" @click="openEditDependent" />
                        </template>
                        <DxColumn caption="성명" cell-template="company-name" :width="500" />
                        <template #company-name="{ data }">
                            <employee-info :idEmployee="data.data.employeeId" :name="data.data.name"
                                :status="data.data.status" :foreigner="data.data.foreigner" :checkStatus="false" />
                        </template>
                        <DxColumn caption="주민등록번호" data-field="residentId" :width="200" />
                        <DxColumn caption="비고" cell-template="grade-cell" />
                        <template #grade-cell="{ data }" class="custom-action">
                            <div class="custom-grade-cell">
                                <div class="custom-grade-cell-tag">{{ data.data.incomeTypeCode }}</div>
                                <span>{{ data.data.incomeTypeName }}</span>
                            </div>
                        </template>
                        <DxColumn :width="80" cell-template="pupop" />
                        <template #pupop="{ data }" class="custom-action">
                            <div class="custom-action">
                                <a-space :size="10">
                                    <a-tooltip placement="top">
                                        <template #title>편집</template>
                                        <EditOutlined @click="actionEdit(data)" />
                                    </a-tooltip>
                                    <DeleteOutlined @click="actionDelete(data)" />
                                </a-space>
                            </div>
                        </template>
                    </DxDataGrid>
                </a-spin>
            </a-col>
        </a-row>
        <PopupUpdateDependent :modalStatus="modalAddNewDependent"></PopupUpdateDependent>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from "vue";
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined, InfoCircleFilled } from "@ant-design/icons-vue"

import { DxDataGrid, DxColumn, DxToolbar, DxItem } from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";
import { useStore } from 'vuex';
import PopupUpdateDependent from './tab3Dependent/PopupUpdateDependent.vue'
export default defineComponent({
    components: {
        PopupUpdateDependent,
        DxDataGrid,
        DxColumn,
        DxToolbar,
        DxItem,
        DxButton, EditOutlined, DeleteOutlined
    },
    setup() {
        const dataSource = ref([]);
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const trigger = ref<boolean>(true);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const modalAddNewDependent = ref<boolean>(false);
        const modalEditStatus = ref<boolean>(false);
        const modalHistoryStatus = ref<boolean>(false)

        const openEditDependent = () => {
            modalAddNewDependent.value = true;
        };
        const actionEdit = (data: any) => {

        }
        const modalHistory = (data: any) => {

        }

        const actionDelete = (data: any) => {

        }
        const onSubmit = (e: any) => {
        };
        return {

            dataSource,
            modalEditStatus,
            modalAddNewDependent,
            openEditDependent,
            actionEdit,
            modalHistory,
            actionDelete,
            onSubmit,
            per_page, move_column, colomn_resize,
        }
    },
});
</script>

  