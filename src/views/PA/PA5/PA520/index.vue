<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <action-header title="기타소득자등록" @actionSave="onSubmit($event)" />
    <div id="pa-520" class="page-content">
        <a-row justify="space-around">
            <a-col :span="4" class="total-user">
                <div>
                    <span>8</span>
                    <br>
                    <span>전체</span>
                </div>
                <div>
                    <i class="dx-icon-user"></i>
                </div>
            </a-col>
            <a-col :span="4" class="current-user">
                <div>
                    <span>8</span>
                    <br>
                    <span>재직</span>
                </div>
                <div>
                    <i class="dx-icon-user"></i>
                </div>
            </a-col>
            <a-col :span="4" class="leave-user">
                <div>
                    <span>8</span>
                    <br>
                    <span>퇴사</span>
                </div>
                <div>
                    <i class="dx-icon-user"></i>
                </div>
            </a-col>

        </a-row>
        <a-row>
            <a-col :span="24">
                <a-spin :spinning="loading" size="large">
                    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                        :show-borders="true" key-expr="employeeId" :allow-column-reordering="move_column"
                        :allow-column-resizing="colomn_resize" :column-auto-width="true">
                        <DxToolbar>
                            <DxItem location="after" template="button-template" css-class="cell-button-add" />
                        </DxToolbar>
                        <template #button-template>
                            <DxButton icon="plus" @click="openAddNewModal" />
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
                                    <a-tooltip placement="top">
                                        <template #title>변경이력</template>
                                        <HistoryOutlined @click="modalHistory(data)" />
                                    </a-tooltip>
                                    <DeleteOutlined @click="actionDelete(data)" />
                                </a-space>
                            </div>
                        </template>
                    </DxDataGrid>
                    <PA520PopupAddNewVue :modalStatus="modalAddNewStatus" @closePopup="modalAddNewStatus = false" />
                    <history-popup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
                        typeHistory="pa-520" />
                </a-spin>
            </a-col> 
        </a-row>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from "vue";
import { DxDataGrid, DxColumn, DxToolbar, DxItem } from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";
import { useStore } from 'vuex';
import { useQuery, useMutation } from "@vue/apollo-composable";
import { companyId } from "../../../../helpers/commonFunction";
import notification from "../../../../utils/notification";
import queries from "../../../../graphql/queries/PA/PA5/PA520/index";
import PA520PopupAddNewVue from "./components/PA520PopupAddNew.vue";
export default defineComponent({
    components: {
        DxDataGrid,
        DxColumn,
        DxToolbar,
        DxItem,
        DxButton,
        PA520PopupAddNewVue
    },
    setup() {
        const dataSource = ref([]);
        const store = useStore();
        const globalYear = computed(() => store.state.settings.globalYear);
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const trigger = ref<boolean>(true);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const originData = ref({
            companyId: companyId,
            imputedYear: globalYear,
        });
        const modalAddNewStatus = ref<boolean>(false);
        const modalEditStatus = ref<boolean>(false);
        const modalHistoryStatus = ref<boolean>(false)
        const {
            refetch: refetchData,
            result,
            loading,
        } = useQuery(queries.getEmployeeWages, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));

        watch(result, (value) => {
            if (value) {
                dataSource.value = value.getEmployeeWages;
                trigger.value = false;
            }
        });
        const openAddNewModal = () => {
            modalAddNewStatus.value = true;
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
            loading,
            onSubmit,
            dataSource,
            actionEdit,
            actionDelete,
            modalHistory,
            modalHistoryStatus,
            openAddNewModal,
            modalAddNewStatus,
            per_page, move_column, colomn_resize,
        }
    },
});
</script>






<style lang="scss" scoped src="./style/style.scss" />
