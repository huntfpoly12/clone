<template>
    <action-header :buttonDelete="false" :buttonSearch="false" :buttonSave="false" :buttonPrint="false"/>
    <div id="ac-510">
        <div class="top">
            <div class="grid">
                <div class="items" v-for="(status, index) in arrStatus" :key="index">
                    <div class="text">
                        <span class="">{{ $filters.formatMonth(index + 1) }}</span>
                        <span class="">월</span>
                    </div>
                    <ProcessStatus :disabled="true" :valueStatus="status" />
                </div>
            </div>
            <div class="flex">
                <a-form-item label="서식 설정">
                    <div class="dflex custom-flex">
                        <div style="margin-right: 10px;">
                            <a-tooltip :overlayStyle="{maxWidth: '500px'}">
                                <template #title>본 설정으로 적용된 서식으로 출력 및 메일발송 됩니다.</template>
                                <img src="@/assets/images/iconInfo.png" style="width: 14px;" />
                            </a-tooltip>
                        </div>
                        <checkbox-basic v-model:valueCheckbox="valueCheckBox" :disabled="false" :size="'20'" />
                        <span>결산서 (세목까지 출력)</span>
                        <div style="margin-left: 10px;">
                            <img src="@/assets/images/iconInfo.png" style="width: 14px;" />
                            <span>선택시 결산서 서식에 세목까지 출력됩니다</span>
                        </div>
                    </div>
                </a-form-item>
            </div>
        </div>
        <div class="main">
            <DxDataGrid key-expr="id" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSourceAC510"
                :show-borders="true" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                :column-auto-width="true">
                <DxColumn cell-template="col-first" caption="서식" />
                <template #col-first="{ data }">
                    {{ data.data.name }}<br>
                </template>
                <DxColumn :width="80" cell-template="pupop" />
                <template #pupop="{ data }">
                    <div class="custom-action" style="text-align: center;">
                        <img @click="actionOpenPopupEmailSingle(data.data)" src="@/assets/images/email.svg" alt=""
                            style="width: 25px; margin-right: 3px;" />
                        <a-tooltip>
                            <template #title>출력 / 저장</template>
                            <img @click="actionPrint(data.data)" src="@/assets/images/print.svg" alt=""
                                style="width: 25px;" />
                        </a-tooltip>
                    </div>
                </template>
            </DxDataGrid>
        </div>
    </div>
    <EmailSinglePopup :modalStatus="modalEmailSingle" @closePopup="modalEmailSingle = false" :data="popupDataEmailSingle" />
</template>
<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, reactive, computed, watch } from "vue";
import { companyId } from "@/helpers/commonFunction";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import EmailSinglePopup from "./components/EmailSinglePopup.vue";
export default defineComponent({
    components: {
        DxDataGrid, DxColumn,
        EmailSinglePopup
    },
    setup() {
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const globalYear = computed(() => store.state.settings.globalYear)
        const dataSourceAC510 = ref<any>([
            { id: 1, name: "세입결산서" },
            { id: 2, name: "세출결산서", },
            { id: 3, name: "총계정원장", },
            { id: 4, name: "현금출납부", },
            { id: 5, name: "수입결의서", },
            { id: 6, name: "지출(여입)결의서", },
            { id: 7, name: "구입과지출(여입)결의서", },
        ])
        const arrStatus = [
            10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ]
        const valueCheckBox = ref<boolean>(false)
        const modalEmailSingle = ref(false)
        const popupDataEmailSingle = ref({})
        const actionOpenPopupEmailSingle = (data: any) => {
            // gridRef.value?.instance.deselectAll()
            // popupDataEmailSingle.value = {
            //     companyId: companyId,
            //     input: {
            //         imputedYear: globalYear,
            //         type: valueDefaultIncomeBusiness.value.input.type,
            //         receiptDate: valueDefaultIncomeBusiness.value.input.receiptDate,
            //     },
            //     employeeInputs: {
            //         senderName: sessionStorage.getItem("username"),
            //         receiverName: data.employee.name,
            //         receiverAddress: data.employee.email,
            //         employeeId: data.employee.employeeId,
            //         incomeTypeCode: data.employee.incomeTypeCode
            //     }
            // }
            modalEmailSingle.value = true
        }

        const actionPrint = (data: any) => {
            // gridRef.value?.instance.deselectAll()
            // valueDefaultIncomeBusiness.value.employeeKeys = [
            //     { employeeId: data.employee.employeeId, incomeTypeCode: data.employee.incomeTypeCode }
            // ]
            // triggerPrint.value = true;
        }
        return {
            move_column,
            colomn_resize,
            arrStatus,
            valueCheckBox,
            dataSourceAC510,
            actionPrint,
            modalEmailSingle, actionOpenPopupEmailSingle, popupDataEmailSingle
        };
    },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
