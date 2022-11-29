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
                        <DxColumn caption="연말 관계" data-field="relation" />
                        <DxColumn caption="성명" data-field="name" />
                        <DxColumn caption="내/외국인 " data-field="foreigner" cell-template="foreigner" />
                        <template #foreigner="{ data }">
                            <employee-info :foreigner="data.foreigner" :checkStatus="false" />
                        </template>
                        <DxColumn caption="주민등록번호" data-field="residentId" />
                        <DxColumn caption="나이" data-field="Age" />
                        <DxColumn caption="기본공제" data-field="basicDeduction" />
                        <DxColumn caption="부녀자" data-field="women" />
                        <DxColumn caption="한부모" data-field="singleParent" />
                        <DxColumn caption="경로 우대" data-field="Senior" />
                        <DxColumn caption="장애인 " data-field="Disabled" />
                        <DxColumn caption="자녀" data-field="Descendant" />
                        <DxColumn caption="출산 입양" data-field="maternityAdoption" />
                        <DxColumn caption="위탁 관계 " data-field="consignmentRelationship" />
                        <DxColumn caption="세대주 여부 " data-field="Householder" />
                        <DxColumn :width="80" cell-template="pupop" />
                        <template #pupop="{ data }" class="custom-action">
                            <div class="custom-action">
                                <a-space :size="10">
                                    <a-tooltip placement="top">
                                        <template #title>편집</template>
                                        <EditOutlined @click="actionEdit(data)" />
                                    </a-tooltip>
                                    <DeleteOutlined @click="actionDeleteFuc(data.data.index)" />
                                </a-space>
                            </div>
                        </template>
                    </DxDataGrid>
                </a-spin>
            </a-col>
        </a-row>
        <PopupUpdateDependent :modalStatus="modalAddNewDependent"></PopupUpdateDependent>
        <PopupMessage :modalStatus="modalStatus" @closePopup="modalStatus = false" typeModal="confirm"
            :content="contentDelete" okText="네" cancelText="아니요" @checkConfirm="statusComfirm" />
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from "vue";
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined, InfoCircleFilled } from "@ant-design/icons-vue"

import { DxDataGrid, DxColumn, DxToolbar, DxItem } from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";
import { useStore } from 'vuex';
import { useMutation, useQuery } from "@vue/apollo-composable";
import { companyId } from "../../../../../../helpers/commonFunction";
import mutations from "../../../../../../graphql/mutations/PA/PA1/PA120/index";
import queries from "../../../../../../graphql/queries/PA/PA1/PA120/index";
import notification from "../../../../../../utils/notification";
import PopupUpdateDependent from './tab3Dependent/PopupUpdateDependent.vue'
import { Message } from "../../../../../../configs/enum"
import { divide } from "lodash";
import { string } from "vue-types";

export default defineComponent({
    components: {
        PopupUpdateDependent,
        DxDataGrid,
        DxColumn,
        DxToolbar,
        DxItem,
        DxButton, EditOutlined, DeleteOutlined
    },
    props: {
        popupStatus: {
            type: Boolean,
            default: false,
        },
        idRowEdit: {
            type: Number
        },

    },
    setup(props, { emit }) {
        const dataSource = ref([]);
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const trigger = ref<boolean>(true);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const modalAddNewDependent = ref<boolean>(false);
        const modalEditStatus = ref<boolean>(false);
        const modalHistoryStatus = ref<boolean>(false)
        const modalStatus = ref(false)
        const contentDelete = Message.getMessage('PA120', '002').message
        const idAction = ref()

        const globalYear = computed(() => store.state.settings.globalYear);
        const openEditDependent = () => {
            modalAddNewDependent.value = true;
        };
        const actionEdit = (data: any) => {

        }
        const modalHistory = (data: any) => {

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
                    employeeId: props.idRowEdit,
                    index: idAction.value
                })

        }
        const onSubmit = (e: any) => {
        };
        // get employee independent
        const originDataDetail = ref({
            companyId: companyId,
            imputedYear: globalYear.value,
            employeeId: props.idRowEdit
        })
        const {
            refetch: refetchData,
            result,
            loading,
        } = useQuery(queries.getEmployeeWage, originDataDetail, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        watch(result, (value) => {
            if (value) {
                dataSource.value = value.getEmployeeWage.dependents;
                trigger.value = false;
            }
        });
        // delete
        const {
            mutate: actionDelete,
            onError: errorDelete,
            onDone: successDelete,
        } = useMutation(mutations.deleteEmployeeWageDependent)
        errorDelete(e => {
            notification('error', e.message)
        })
        successDelete(e => {
            notification('success', `업데이트 완료!`)
            trigger.value = true
            refetchData()
        })

        return {
            companyId,
            dataSource,
            modalEditStatus,
            modalStatus,
            modalAddNewDependent,
            openEditDependent,
            actionDeleteFuc,
            actionEdit,
            modalHistory,
            actionDelete,
            onSubmit, statusComfirm, contentDelete,
            per_page, move_column, colomn_resize,
        }
    },
});
</script>
<style lang="scss" scoped >

</style>


  