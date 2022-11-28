<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <action-header title="기타소득자등록" @actionSave="onSubmit($event)" />
    <div id="pa-120" class="page-content">
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
                                        <EditOutlined @click="actionEdit(data.data.employeeId)" />
                                    </a-tooltip>
                                    <a-tooltip placement="top">
                                        <template #title>변경이력</template>
                                        <HistoryOutlined @click="modalHistory(data)" />
                                    </a-tooltip>
                                    <DeleteOutlined @click="actionDeleteFuc(data.data.employeeId)" />
                                </a-space>
                            </div>
                        </template>
                    </DxDataGrid>
                    <PopupMessage :modalStatus="modalStatus" @closePopup="modalStatus = false" typeModal="confirm"
                        :content="contentDelete" okText="네" cancelText="아니요" @checkConfirm="statusComfirm" />
                    <PA120PopupAddNewVue :modalStatus="modalAddNewStatus" @closePopup="eventCLoseAddPopup" />
                    <PA120PopupEdit :idRowEdit="idRowEdit" :modalStatus="modalEditStatus"
                        @closePopup="modalEditStatus = false" />
                    <history-popup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
                        title="변경이력" :idRowEdit="idRowEdit" typeHistory="pa-120" />
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
import queries from "../../../../graphql/queries/PA/PA1/PA120/index";
import mutations from "../../../../graphql/mutations/PA/PA1/PA120/index"
import PA120PopupAddNewVue from "./components/PA120PopupAddNew.vue";
import PA120PopupEdit from "./components/PA120PopupEdit.vue";
import { Message } from "../../../../configs/enum"

import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined, InfoCircleFilled } from "@ant-design/icons-vue"

export default defineComponent({
    components: {
        DxDataGrid,
        DxColumn,
        DxToolbar,
        DxItem,
        DxButton, EditOutlined, HistoryOutlined, DeleteOutlined,
        PA120PopupAddNewVue, PA120PopupEdit
    },
    setup() {
        const contentDelete = Message.getMessage('PA120', '002').message
        const modalStatus = ref(false)
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
        const idAction = ref()
        const modalAddNewStatus = ref<boolean>(false);
        const modalEditStatus = ref<boolean>(false)
        const modalHistoryStatus = ref<boolean>(false)
        const idRowEdit = ref()
        const {
            refetch: refetchData,
            result,
            loading,
        } = useQuery(queries.getEmployeeWages, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        const {
            mutate: actionDelete,
            onError: errorDelete,
            onDone: successDelete,
        } = useMutation(mutations.deleteEmployeeWage)
        errorDelete(e => {
            notification('error', e.message)
        })
        successDelete(e => {
            notification('success', `업데이트 완료!`)
            trigger.value = true
            refetchData()
        })
        watch(result, (value) => {
            if (value) {
                dataSource.value = value.getEmployeeWages;
                trigger.value = false;
            }
        });
        const openAddNewModal = () => {
            modalAddNewStatus.value = true;
        };
        const actionEdit = (val: any) => {
            idRowEdit.value = val
            modalEditStatus.value = true

        }
        const eventCLoseAddPopup = () => {
            modalAddNewStatus.value = false;
            trigger.value = true
            refetchData()

        }
        const modalHistory = (data: any) => {
            idRowEdit.value = data.data.id
            modalHistoryStatus.value = companyId
        }

        const actionDeleteFuc = (data: any) => {
            idAction.value = data
            modalStatus.value = true
        }
        const statusComfirm = (res: any) => {
            if (res == true)
                actionDelete({
                    companyId: companyId,
                    imputedYear: globalYear.value,
                    employeeId: idAction.value
                })

        }
        const onSubmit = (e: any) => {
        };
        watch(() => modalEditStatus.value, (value) => {
            if (value == false) {
                trigger.value = true
                refetchData()
            }
        })
        return {
            loading,
            idRowEdit,
            modalEditStatus,
            modalStatus,
            onSubmit,
            dataSource,
            actionEdit,
            actionDelete,
            actionDeleteFuc,
            modalHistory,
            contentDelete,
            modalHistoryStatus,
            openAddNewModal, eventCLoseAddPopup,
            modalAddNewStatus, statusComfirm,
            per_page, move_column, colomn_resize,
        }
    },
});
</script>

















































<style lang="scss" scoped src="./style/style.scss" />
