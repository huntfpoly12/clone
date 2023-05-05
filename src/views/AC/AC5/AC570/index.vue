<template>
    <action-header :buttonDelete="false" :buttonSearch="false" :buttonSave="false" :buttonPrint="false"/>
    <div id="ac-570">
        <div class="page-content">
            <a-row>
                <a-col span="24" class="data-table">
                    <a-spin :spinning="false" size="large">
                        <DxDataGrid noDataText="내역이 없습니다" id="gridContainer" :show-row-lines="true" :hoverStateEnabled="true"
                            :data-source="listEmployeeExtra" :show-borders="true" key-expr="residentIdHide"
                            :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                            :column-auto-width="true" @focused-row-changing="onFocusedRowChanging" ref="gridRef"
                            v-model:focused-row-key="focusedRowKey" :focused-row-enabled="true">
                            <DxScrolling mode="standard" show-scrollbar="always" />
                            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색"/>
                            <DxPaging :enabled="false" />
                            <DxExport :enabled="true"/>
                            <DxToolbar>
                                <DxItem name="searchPanel" />
                                <DxItem name="exportButton" css-class="cell-button-export"/>
                                <DxItem location="after" template="print" css-class="cell-button-add" />
                                <DxItem location="after" template="group_email" css-class="cell-button-add" />
                                <DxItem location="after" template="button-history" css-class="cell-button-add" />
                                <DxItem location="after" template="button-template" css-class="cell-button-add" />
                            </DxToolbar>
                            <template #print>
                                <a-tooltip>
                                    <template #title>출력 / 저장</template>
                                    <img src="@/assets/images/print.svg" alt="" style="width: 25px;" />
                                </a-tooltip>
                            </template>
                            <template #group_email>
                                <img src="@/assets/images/group_email.png" alt=""
                                    style="width: auto; height: 25px; margin-left: 6px;" />
                            </template>
                            <template #button-history>
                                <DxButton icon="plus">
                                    <HistoryOutlined style="font-size: 18px;" @click="modalHistory" />
                                </DxButton>
                            </template>
                            <template #button-template>
                                <a-tooltip placement="topLeft">
                                    <template #title>과목전용조서 등록</template>
                                    <div>
                                        <DxButton icon="plus" @click="actionCreate" />
                                    </div>
                                </a-tooltip>
                            </template>
                            <DxColumn caption="전용일자" data-field="name" />
                            <DxColumn caption="관" data-field="name" />
                            <DxColumn caption="항" data-field="name" />
                            <DxColumn caption="목" data-field="name" />
                            <DxColumn caption="세목" data-field="name" />
                            <DxColumn caption="예산액" data-field="name" />
                            <DxColumn caption="전용액" data-field="name" />
                            <DxColumn caption="예산현액" data-field="name" />
                            <DxColumn caption="지출액" data-field="name" />
                            <DxColumn caption="불용액" data-field="name" />
                            <DxColumn caption="최종저장일시" data-field="name" />
                            <DxColumn caption="최종저장아이디" data-field="name" />
                            <DxColumn :width="50" cell-template="pupop" css-class="cell-center" />
                            <template #pupop="{ data }">
                                <a-tooltip placement="top">
                                    <template #title>과목전용조서 삭제</template>
                                    <div>
                                        <DeleteOutlined v-if="data.data.deletable"
                                            style="font-size: 16px; width: 100%; height: 30px; line-height: 30px;"
                                            @click="statusAddRow ? modalStatusDelete = true : ''" />
                                    </div>
                                </a-tooltip>
                            </template>
                        </DxDataGrid>
                    </a-spin>
                </a-col>
                <!-- <a-col span="7" class="custom-layout">
                    
                </a-col> -->
            </a-row>
        </div>
        <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="popupData"
            title="변경이력" :idRowEdit="idRowEdit" typeHistory="ac-570" />
        <AddPopup :modalStatus="modalStatusAdd" @closePopup="modalStatusAdd = false" :data="popupData"/>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, computed, watchEffect } from "vue";
import HistoryPopup from "@/components/HistoryPopup.vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useStore } from 'vuex';
import { DxDataGrid, DxColumn, DxToolbar, DxItem, DxExport, DxScrolling, DxPaging, DxSearchPanel, } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import notification from "@/utils/notification";
import DxButton from "devextreme-vue/button";
import { companyId } from "@/helpers/commonFunction";
import  AddPopup from './components/AddPopup.vue'
import { Message } from "@/configs/enum"
export default defineComponent({
    components: {
        AddPopup,
        DxDataGrid, DxColumn, EditOutlined, HistoryOutlined, DxToolbar, DxItem, DxExport, DeleteOutlined, DxButton, HistoryPopup, SaveOutlined, DxScrolling, DxPaging, DxSearchPanel
    },
    setup() {
        // const contentDelete = Message.getMessage('PA120', '002').message
        const contentDelete = ref('선택된 소득자의 해당 원천년도에 소득 내역들이 있다면 삭제불가하며, 삭제한 후 복구불가합니다. 그래도 삭제하시겠습니까?')
        // config grid
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? '0'))

        let statusFormUpdate = ref(false)
        const modalHistoryStatus = ref<boolean>(false);
        var idRowEdit = ref<number>(0);
        let popupData = ref();
        const focusedRowKey = ref()
        const modalStatus = ref(false)
        const modalStatusAdd = ref(false);
        const modalStatusDelete = ref(false);
        let trigger = ref(true);
        let triggerDetail = ref(false);
        const listEmployeeExtra: any = ref([])
        let formState: any = ref({});
        const resetFormNum = ref(1);
        const statusAddRow = ref(true);
        const statusClickButtonSave = ref<boolean>(true);
        const statusClickButtonAdd = ref<boolean>(false);
        const gridRef = ref(); // ref of grid
        const dataGridRef = computed(() => gridRef.value?.instance as any); // ref of grid Instance
        const originData = {
            companyId: companyId,
            imputedYear: acYear.value,
        }
        const originDataDetail: any = ref({
            companyId: companyId,
            imputedYear: acYear.value,
            employeeId: null,
            incomeTypeCode: null,
        });
        let confirmSave = ref(false)
        // const optionsRadio = ref([...initialOptionsRadio]);
        let runOne = ref(true);
        const dataYearNew = ref(acYear.value)
        const checkClickYear = ref<Boolean>(false)
        var disabledBlock = ref<boolean>(false);

        // ================GRAPQL==============================================


        // ================FUNCTION============================================
        const ac570FormRef = ref()


        const modalHistory = (data: any) => {
            modalHistoryStatus.value = true
        }

        const onFocusedRowChanging = (e: any) => {

        }
        const actionCreate = (e: any) => {
            modalStatusAdd.value = true
        }

        // A function that is called when the user clicks on the delete button.

        // ================WATCHING============================================

        return {
            confirmSave, move_column, colomn_resize, idRowEdit, modalHistoryStatus, labelCol: { style: { width: "150px" } }, formState, statusFormUpdate, popupData, listEmployeeExtra, DeleteOutlined, modalStatus, focusedRowKey, resetFormNum, modalStatusAdd,
            // confimSaveWhenChangeRow, 
            onFocusedRowChanging,
            // actionToAddFromEdit, 
            actionCreate, modalHistory,
            contentDelete, modalStatusDelete, statusAddRow, Message, ac570FormRef, disabledBlock, gridRef,
        };
    },
});
</script> 
<style scoped lang="scss" src="./style/style.scss" ></style>

<style>
.confirmDelete .anticon {
    color: black !important;
}
</style>
