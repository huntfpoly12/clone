<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <action-header title="기타소득자등록" @actionSave="onSubmit($event)" />
    <div id="pa-520" class="page-content">
        <a-row>
            <a-col :span="3" style="padding-right: 10px">
                <div class="total-user">
                    <div>
                        <span>{{ dataSource.length }}</span>
                        <br>
                        <span>전체</span>
                    </div>
                    <div>
                        <img src="../../../../assets/images/user.svg" alt="" style="width: 70px">
                    </div>
                </div>
            </a-col>
            <a-col :span="3" style="padding-right: 10px">
                <div class="current-user">
                    <div>
                        <span>{{ totalUserOnl }}</span>
                        <br>
                        <span>재직</span>
                    </div>
                    <div>
                        <img src="../../../../assets/images/user.svg" alt="" style="width: 70px">
                    </div>
                </div>
            </a-col>
            <a-col :span="3" style="padding-right: 10px">
                <div class="leave-user">
                    <div>
                        <span>{{ totalUserOff }}</span>
                        <br>
                        <span>퇴사</span>
                    </div>
                    <div>
                        <img src="../../../../assets/images/user.svg" alt="" style="width: 70px">
                    </div>
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
                        <DxColumn caption="성명" cell-template="company-name" />
                        <template #company-name="{ data }">
                            <employee-info :idEmployee="data.data.employeeId" :name="data.data.name"
                                :idCardNumber="data.data.residentId" :status="data.data.status"
                                :foreigner="data.data.foreigner" :checkStatus="false" />
                        </template>
                        <DxColumn caption="주민등록번호" data-field="residentId" />
                        <DxColumn caption="비고" cell-template="grade-cell" />
                        <template #grade-cell="{ data }" class="custom-action">
                            <div class="custom-grade-cell">
                                <four-major-insurance :typeTag="1" :typeValue="1" />
                            </div>
                        </template>
                        <DxColumn cell-template="pupop" width="100" />
                        <template #pupop="{ data }" class="custom-action">
                            <div class="custom-action">
                                <a-space :size="10">
                                    <a-tooltip placement="top">
                                        <template #title>편집</template>
                                        <EditOutlined @click="openEditModal(data.data.employeeId)" />
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
                </a-spin>
                <PopupMessage :modalStatus="modalStatus" @closePopup="modalStatus = false" typeModal="confirm"
                    :content="contentDelete" okText="네" cancelText="아니요" @checkConfirm="statusComfirm" />
                <PA520PopupAddNew :modalStatus="modalAddNewStatus" @closePopup="modalAddNewStatus = false" />
                <PA520PopupEdit :idRowEdit="idRowEdit" :modalStatus="modalEditStatus"
                    @closePopup="modalEditStatus = false" />
                <history-popup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
                     title="변경이력" :idRowEdit="idRowEdit" typeHistory="pa-520" />
            </a-col>
        </a-row>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed } from "vue"
import DxButton from "devextreme-vue/button"
import { useStore } from 'vuex'
import { useQuery, useMutation } from "@vue/apollo-composable"
import { companyId } from "../../../../helpers/commonFunction"
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxSummary, DxTotalItem } from "devextreme-vue/data-grid"
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined, InfoCircleFilled } from "@ant-design/icons-vue"
import notification from "../../../../utils/notification"
import queries from "../../../../graphql/queries/PA/PA5/PA520/index"
import PA520PopupAddNew from "./components/PA520PopupAddNew.vue"
import PA520PopupEdit from "./components/PA520PopupEdit.vue"
import mutations from "../../../../graphql/mutations/PA/PA5/PA520/index"
import { Message } from "../../../../configs/enum"

export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxPaging, DxSelection, DxExport, DxSearchPanel, DxScrolling, DxToolbar, DxEditing, DxGrouping, DxItem, DxButton, DxSummary, DxTotalItem,
        EditOutlined,
        HistoryOutlined,
        SearchOutlined,
        MenuFoldOutlined,
        MenuUnfoldOutlined,
        MailOutlined,
        PrinterOutlined,
        DeleteOutlined,
        SaveOutlined,
        InfoCircleFilled,
        PA520PopupAddNew,
        PA520PopupEdit
    },
    setup() {
        const contentDelete = Message.getMessage('PA120', '002').message
        const modalStatus = ref(false)
        const dataSource = ref([])
        const store = useStore()
        const totalUserOnl = ref(0)
        const totalUserOff = ref(0)
        const globalYear = computed(() => store.state.settings.globalYear)
        const per_page = computed(() => store.state.settings.per_page)
        const move_column = computed(() => store.state.settings.move_column)
        const trigger = ref<boolean>(true)
        const colomn_resize = computed(() => store.state.settings.colomn_resize)
        const originData = ref({
            companyId: companyId,
            imputedYear: globalYear,
        })
        const idAction = ref()
        const modalAddNewStatus = ref<boolean>(false)
        const modalEditStatus = ref<boolean>(false)
        const modalHistoryStatus = ref<boolean>(false)
        const modalDeleteStatus = ref<boolean>(false)
        const idRowEdit = ref()
        // ======================= GRAPQL ================================
        const {
            refetch: refetchData,
            result,
            loading,
        } = useQuery(queries.getEmployeeWageDailies, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }))

        const {
            mutate: actionDelete,
            onError: errorDelete,
            onDone: successDelete,
        } = useMutation(mutations.deleteEmployeeWageDaily)
        errorDelete(e => {
            notification('error', e.message)
        })
        successDelete(e => {
            notification('success', `업데이트 완료!`)
            trigger.value = true
            refetchData()
        })

        // ======================= WATCH ==================================
        watch(result, (value) => {
            if (value) {
                dataSource.value = value.getEmployeeWageDailies
                totalUserOnl.value = 0
                totalUserOff.value = 0
                dataSource.value.map((val: any) => {
                    if (val.status != 0) {
                        totalUserOnl.value++
                    } else {
                        totalUserOff.value++
                    }
                })
                trigger.value = false
            }
        })

        watch(() => modalAddNewStatus.value, (value) => {
            if (value == false) {
                trigger.value = true
                refetchData()
            }
        })
        watch(() => modalEditStatus.value, (value) => {
            if (value == false) {
                trigger.value = true
                refetchData()
            }
        })

        // ======================= FUNCTION ================================
        const openAddNewModal = () => {
            modalAddNewStatus.value = true
        }
        const openEditModal = (val: any) => {
            idRowEdit.value = val
            modalEditStatus.value = true

        }

        const modalHistory = (data: any) => {
            idRowEdit.value = data.data.id
            modalHistoryStatus.value = companyId
        }

        const actionDeleteFuc = (data: any) => {
            idAction.value = data
            modalStatus.value = true
        }
        const onSubmit = (e: any) => {
        }

        const statusComfirm = (res: any) => {
            if (res == true)
                actionDelete({
                    companyId: companyId,
                    imputedYear: globalYear.value,
                    employeeId: idAction.value
                })

        }
        return {
            idRowEdit,
            totalUserOff,
            totalUserOnl,
            modalStatus,
            loading,
            modalEditStatus,
            modalDeleteStatus,
            dataSource,
            modalHistoryStatus,
            modalAddNewStatus,
            per_page, move_column, colomn_resize,
            contentDelete,
            onSubmit,
            actionDeleteFuc,
            modalHistory,
            openAddNewModal,
            openEditModal,
            statusComfirm,
        }
    },
})
</script> 
<style lang="scss" scoped src="./style/style.scss" >

</style>
