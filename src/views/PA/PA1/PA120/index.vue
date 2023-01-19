<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <action-header title="기타소득자등록" :buttonDelete="false" :buttonSave="false" :buttonSearch="false"
        :buttonPrint="false" />
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
            <a-col :span="10" class="custom-layout">
                <a-spin :spinning="loading" size="large">
                    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                        :show-borders="true" key-expr="employeeId" :allow-column-reordering="move_column"
                        :allow-column-resizing="colomn_resize" :column-auto-width="true" :onRowClick="actionEdit"
                        :focused-row-enabled="true" id="pa-120-gridContainer" :auto-navigate-to-focused-row="true"
                        v-model:focused-row-key="focusedRowKey">
                        <DxScrolling mode="standard" show-scrollbar="always"/>
                        <DxToolbar>
                            <DxItem location="after" template="button-history" css-class="cell-button-add" />
                            <DxItem location="after" template="button-template" css-class="cell-button-add" />
                        </DxToolbar>
                        <template #button-template>
                            <DxButton icon="plus" @click="openAddNewModal" />
                        </template>
                        <template #button-history="{}" style="border-color: #ddd;">
                            <DxButton icon="plus">
                                <HistoryOutlined style="font-size: 18px;" @click="modalHistory" />
                            </DxButton>
                        </template>
                        <DxColumn caption="성명" width="140" cell-template="company-name" />
                        <template #company-name="{ data }">
                            <employee-info :idEmployee="data.data.employeeId" :name="data.data.name"
                                :idCardNumber="data.data.residentId" :status="data.data.status"
                                :foreigner="data.data.foreigner" :checkStatus="false" @toolTopErorr="toolTopErorr"
                                :employeeId="data.data.employeeId" @mouseenter="defaultVisible = true"
                                @mouseleave="defaultVisible = false" />
                        </template>
                        <DxColumn caption="주민등록번호" cell-template="residentId" width="120" />
                        <template #residentId="{ data }">
                            <div :id="`residentId${data.data.residentId}`">{{ data.data.residentId }}</div>
                            <DxTooltip v-if="isResidentIdError[`${data.data.employeeId}`]"
                                position="top"
                                v-model:visible="defaultVisible" :hide-on-outside-click="false"
                                :target="`#residentId${data.data.residentId}`">Error
                            </DxTooltip>
                        </template>
                        <DxColumn caption="비고" cell-template="grade-cell" />
                        <template #grade-cell="{ data }">
                            <div>
                                <four-major-insurance v-if="data.data.nationalPensionDeduction" :typeTag="1"
                                    :typeValue="1" />
                                <four-major-insurance v-if="data.data.healthInsuranceDeduction" :typeTag="2"
                                    :typeValue="1" />
                                <four-major-insurance v-if="data.data.employeementInsuranceDeduction" :typeTag="4"
                                    :typeValue="1" />
                                <four-major-insurance v-if="data.data.nationalPensionSupportPercent" :typeTag="6"
                                    :ratio="data.data.nationalPensionSupportPercent" />
                                <four-major-insurance v-if="data.data.employeementInsuranceSupportPercent" :typeTag="7"
                                    :ratio="data.data.employeementInsuranceSupportPercent" />
                                <four-major-insurance v-if="data.data.employeementReductionRatePercent" :typeTag="8"
                                    :ratio="data.data.employeementReductionRatePercent" />
                                <four-major-insurance v-if="data.data.incomeTaxMagnification" :typeTag="10"
                                    :ratio="data.data.incomeTaxMagnification" />
                            </div>
                        </template>
                        <DxColumn cell-template="pupop" width="30" />
                        <template #pupop="{ data }" class="custom-action">
                            <div class="custom-action" style="text-align: center;" v-if="data.data.deletable">
                                <a-space :size="10">
                                    <DeleteOutlined @click="actionDeleteFuc(data.data.employeeId)" />
                                </a-space>
                            </div>
                        </template>
                        <DxScrolling column-rendering-mode="virtual" />
                    </DxDataGrid>
                </a-spin>
            </a-col>
            <a-col :span="14" class="custom-layout" style="padding-right: 0px;">
                <PA120PopupAddNewVue ref="addNew" :idRowEdit="idRowEdit" :modalStatus="modalAddNewStatus"
                    v-if="actionChangeComponent == 1" :key="addComponentKey" />
                <PA120PopupEdit :idRowEdit="idRowEdit" :modalStatus="modalEditStatus" v-if="actionChangeComponent == 2"
                    :arrRowEdit="arrRowEdit" :resetActiveKey="resetActiveKey" />
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
import { ref, defineComponent, watch, computed, reactive } from "vue";
import { DxDataGrid, DxColumn, DxToolbar, DxItem, DxPaging, DxScrolling } from "devextreme-vue/data-grid";
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
import { DxTooltip } from 'devextreme-vue/tooltip';

import { EditOutlined, HistoryOutlined, DeleteOutlined } from "@ant-design/icons-vue"

export default defineComponent({
    components: {
        DxDataGrid,
        DxColumn,
        DxToolbar, DxPaging,
        DxItem,
        DxButton, EditOutlined, HistoryOutlined, DeleteOutlined,
        PA120PopupAddNewVue, PA120PopupEdit, DxScrolling, DxTooltip
    },
    setup() {
        const actionChangeComponent = ref(1)
        const addNew = ref();
        const contentDelete = Message.getMessage('PA120', '002').message
        const modalStatus = ref(false)
        const dataSource = ref([]);
        const store = useStore();
        const totalUserOnl = ref(0)
        const totalUserOff = ref(0)
        const globalYear = computed(() => store.state.settings.globalYear);
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const arrRowEdit = computed(() => store.state.common.arrayRoweditedPA120);
        const trigger = ref<boolean>(true);
        const originData = ref({
            companyId: companyId,
            imputedYear: globalYear,
        });
        const idAction = ref()
        const modalAddNewStatus = ref<boolean>(false);
        const modalEditStatus = ref<boolean>(false)
        const modalHistoryStatus = ref<boolean>(false);
        const defaultVisible = ref<boolean>(false);
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
            actionChangeComponent.value = 1;
            // if (!addNew.value.compareData()) {
            //     popupStatus.value = true;
            // }
            addComponentKey.value++;
        };

        watch(() => store.state.common.reloadEmployeeList, () => {
            trigger.value = true
            refetchData()
        })
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

        watch(() => modalEditStatus.value, (value) => {
            if (value == false) {
                trigger.value = true
                refetchData()
            }
        })
        //rest resetActiveKey
        const resetActiveKey = ref("1");
        const actionEdit = (data: any) => {
            actionChangeComponent.value = 2
            idRowEdit.value = data.data.employeeId
            modalEditStatus.value = true;
            resetActiveKey.value = "1";
            store.commit('common/resetTabPA120', "1")
        }
        // when submit form done
        const actionFormDonePA120 = computed(() => store.getters['common/actionFormDonePA120']);
        watch(actionFormDonePA120, () => {
            trigger.value = true;
            refetchData();
        })
        //tooltip residentId
        const isResidentIdError = reactive<any>({});
        const toolTopErorr = (val: any) => {
            isResidentIdError[val.id] = val.isError;
        }
        //focus Row
        const focusedRowKey = ref<String | Number>(0);
        const keyActivePA120 = computed(() => store.getters['common/keyActivePA120']);
        const resetTabPA120 = computed(() => store.getters['common/resetTabPA120']);
        watch(keyActivePA120, (newval: number) => {
            focusedRowKey.value = +newval;
        })
        return {
            loading,
            idRowEdit,
            actionChangeComponent,
            modalEditStatus,
            modalStatus,
            dataSource,
            actionEdit,
            actionDelete,
            actionDeleteFuc,
            modalHistory,
            contentDelete,
            totalUserOnl,
            totalUserOff,
            modalHistoryStatus,
            openAddNewModal,
            modalAddNewStatus, statusComfirm,
            per_page, move_column, colomn_resize,
            addComponentKey,
            onPopupComfirm,
            popupStatus,
            addNew,
            arrRowEdit,
            toolTopErorr,
            isResidentIdError,
            focusedRowKey,
            resetActiveKey,
            resetTabPA120,
            keyActivePA120,
            defaultVisible,
        }
    },
});
</script>
<style lang="scss" scoped src="./style/style.scss" >

</style>
