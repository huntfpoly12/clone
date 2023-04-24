<template>
    <action-header :buttonDelete="false" :buttonSearch="false" :buttonSave="false" :buttonPrint="false"/>
    <div id="ac-590">
        <div class="top">
            <div class="month">
                <span class="period">기간</span>
                <OnlyMonthPickerBox class="mr-5" v-model:valueMonth="monthStart" />
                <ProcessStatus :disabled="true" :valueStatus="status" />
                <span class="mr-5 ml-5">~</span>
                <OnlyMonthPickerBox class="mr-5" v-model:valueMonth="monthEnd" />
                <ProcessStatus :disabled="true" :valueStatus="status" />
                <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
                <span class="style-note style-note-cm121">조정마감된 월만 해당 (조정마감이 아닌 월은 제외).</span>
            </div>
        </div>
        <div class="main">
            <DxDataGrid key-expr="id" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSourceAC510"
                :show-borders="true" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                :column-auto-width="true">
                <DxColumn :width="1565" cell-template="col-first" caption="서식" />
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
        const acYear = computed(() => store.state.settings.acYear)
        const status = ref(10)
        let monthStart = ref(5)
        let monthEnd = ref(9)
        const dataSourceAC510 = ref<any>([
            { id: 1, name: "세입결산서" },
            { id: 2, name: "세출결산서", },
            { id: 3, name: "총계정원장", },
            { id: 4, name: "현금출납부", },
            { id: 5, name: "수입결의서", },
            { id: 6, name: "지출(여입)결의서", },
            { id: 7, name: "구입과지출(여입)결의서", },
        ])
        const valueCheckBox = ref<boolean>(false)
        const modalEmailSingle = ref(false)
        const popupDataEmailSingle = ref({})
        const actionOpenPopupEmailSingle = (data: any) => {
            // gridRef.value?.instance.deselectAll()
            // popupDataEmailSingle.value = {
            //     companyId: companyId,
            //     input: {
            //         imputedYear: acYear,
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
            valueCheckBox,
            dataSourceAC510,
            status, monthStart, monthEnd,
            actionPrint,
            modalEmailSingle, actionOpenPopupEmailSingle, popupDataEmailSingle
        };
    },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
