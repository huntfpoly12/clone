<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <action-header title="기타소득자등록" @actionSave="onSubmit($event)" :buttonDelete="false" />
    <div id="pa-120" class="page-content">
        <a-row>
            <a-col :span="3" style="padding-right: 10px">
                <div class="total-user">
                    <div>
                        <span>{{ dataSource.length }}</span>
                        <br>
                        <span>전체</span>
                    </div>
                    <div>
                        <img src="@/assets/images/user.svg" alt="" style="width: 70px">
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
                        <img src="@/assets/images/user.svg" alt="" style="width: 70px">
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
                        <img src="@/assets/images/user.svg" alt="" style="width: 70px">
                    </div>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="12" class="custom-layout">
                <a-spin :spinning="loading" size="large">
                    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                        :show-borders="true" key-expr="employeeId" :allow-column-reordering="move_column"
                        :allow-column-resizing="colomn_resize" :column-auto-width="true" :onRowClick="actionEdit"
                        :focused-row-enabled="true">
                        <DxPaging :page-size="15" />

                        <DxToolbar>
                            <DxItem location="after" template="button-history" css-class="cell-button-add" />
                            <DxItem location="after" template="button-template" css-class="cell-button-add" />
                        </DxToolbar>
                        <template #button-template>
                            <DxButton icon="plus" @click="openAddNewModal" />
                        </template>
                        <template #button-history="{ data }" style="border-color: #ddd;">
                            <DxButton icon="plus">
                                <HistoryOutlined style="font-size: 18px;" @click="modalHistory" />
                            </DxButton>
                        </template>
                        <DxColumn caption="성명" cell-template="company-name" />
                        <template #company-name="{ data }">
                            <employee-info :idEmployee="data.data.employeeId" :name="data.data.name"
                                :idCardNumber="data.data.residentId" :status="data.data.status"
                                :foreigner="data.data.foreigner" :checkStatus="false" />
                        </template>
                        <DxColumn caption="주민등록번호" data-field="residentId" width="130" />
                        <DxColumn caption="비고" cell-template="grade-cell" />
                        <template #grade-cell="{}" class="custom-action">
                            <div class="custom-grade-cell">
                                <four-major-insurance :typeTag="1" :typeValue="1" />
                            </div>
                        </template>
                        <DxColumn cell-template="pupop" width="100" />
                        <template #pupop="{ data }" class="custom-action">
                            <div class="custom-action" style="text-align: center;">
                                <a-space :size="10">
                                    <DeleteOutlined @click="actionDeleteFuc(data.data.employeeId)" />
                                </a-space>
                            </div>
                        </template>
                    </DxDataGrid>
                </a-spin>
            </a-col>
            <a-col :span="14" class="custom-layout" style="padding-right: 0px;">
                <PA120PopupAddNewVue ref="addNew" :idRowEdit="idRowEdit" :modalStatus="modalAddNewStatus"
                    @closePopup="eventCLoseAddPopup" v-if="actionChangeComponent == 1" :key="addComponentKey" />
                <PA120PopupEdit :idRowEdit="idRowEdit" :modalStatus="modalEditStatus" @closePopup="eventCLoseAddPopup"
                    v-if="actionChangeComponent == 2" />
            </a-col>
        </a-row>
        <PopupMessage :modalStatus="modalStatus" @closePopup="modalStatus = false" typeModal="confirm"
            :content="contentDelete" okText="네" cancelText="아니요" @checkConfirm="statusComfirm" />
        <history-popup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" title="변경이력"
            :idRowEdit="idRowEdit" typeHistory="pa-120" />
        <PopupMessage :modalStatus="popupStatus" @closePopup="popupStatus = false" :typeModal="'confirm'"
            :title="'ban co muon xoa khong'" :content="'Content notification'" :keyAccept="'1234'" :okText="'확인'"
            @checkConfirm="onPopupComfirm" />
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed } from "vue";
import { DxDataGrid, DxColumn, DxToolbar, DxItem, DxPaging } from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";
import { useStore } from 'vuex';
import { useQuery, useMutation } from "@vue/apollo-composable";
import { companyId } from "@/helpers/commonFunction";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA1/PA120/index";
import mutations from "@/graphql/mutations/PA/PA1/PA120/index"
import PA120PopupAddNewVue from "./components/PA120PopupAddNew.vue";
import PA120PopupEdit from "./components/PA120PopupEdit.vue";
import { Message } from "@/configs/enum"

import { EditOutlined, HistoryOutlined, DeleteOutlined } from "@ant-design/icons-vue"

export default defineComponent({
    components: {
        DxDataGrid,
        DxColumn,
        DxToolbar, DxPaging,
        DxItem,
        DxButton, EditOutlined, HistoryOutlined, DeleteOutlined,
        PA120PopupAddNewVue, PA120PopupEdit
    },
    setup() {
        const actionChangeComponent = ref(1)

        const contentDelete = Message.getMessage('PA120', '002').message
        const modalStatus = ref(false)
        const dataSource = ref([]);
        const store = useStore();
        const totalUserOnl = ref(0)
        const totalUserOff = ref(0)
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
        const modalHistoryStatus = ref<boolean>(false);
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
        // addcomponent
        const addComponentKey = ref(1);
        const popupStatus = ref(false);
        const onPopupComfirm = (params: Boolean) => {
            if (params) {
                popupStatus.value = false;
                addComponentKey.value++;
            }
        }
        const openAddNewModal = async () => {
            actionChangeComponent.value = 1
            modalAddNewStatus.value = !modalAddNewStatus.value;
            addNew.value.compareData()
            if (!addNew.value.compareData()) {
                popupStatus.value = true;
            }
        };
        const actionEdit = (data: any) => {
            actionChangeComponent.value = 2
            idRowEdit.value = data.data.employeeId
            modalEditStatus.value = true
        }
        const eventCLoseAddPopup = () => {
            trigger.value = true
            refetchData()

        }
        const modalHistory = () => {
            modalHistoryStatus.value = true;
        }
        const actionDeleteFuc = (data: any) => {
            idAction.value = data
            modalStatus.value = true
        }
        const statusComfirm = (res: any) => {
            if (res == true) {
                actionDelete({
                    companyId: companyId,
                    imputedYear: globalYear.value,
                    employeeId: idAction.value
                })
                actionChangeComponent.value = 1
            }
        }
        watch(result, (value) => {
            if (value) {
                dataSource.value = value.getEmployeeWages
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
        const onSubmit = (e: any) => {
        };
        watch(() => modalEditStatus.value, (value) => {
            if (value == false) {
                trigger.value = true
                refetchData()
            }
        })
        //ref
        const addNew = ref();
        return {
            loading,
            idRowEdit,
            actionChangeComponent,
            modalEditStatus,
            modalStatus,
            onSubmit,
            dataSource,
            actionEdit,
            actionDelete,
            actionDeleteFuc,
            modalHistory,
            contentDelete,
            totalUserOnl,
            totalUserOff,
            modalHistoryStatus,
            openAddNewModal, eventCLoseAddPopup,
            modalAddNewStatus, statusComfirm,
            per_page, move_column, colomn_resize,
            addComponentKey,
            onPopupComfirm,
            popupStatus,
            addNew,
        }
    },
});
</script>






































<style lang="scss" scoped src="./style/style.scss" />
