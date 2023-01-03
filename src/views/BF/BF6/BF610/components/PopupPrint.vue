<template>
    <a-modal :visible="modalStatus" footer="" :mask-closable="false" title="소득별 마감현황" okText="저장하고 나가기"
        cancelText="그냥 나가기" @cancel="setModalVisible" width="576px">
        <a-row :gutter="24">
            <a-col :span="12">
                <checkbox-basic size="14" label="원천징수이행상황신고서" v-model:valueCheckbox="dataForm.row1.checkbox" />
            </a-col>
            <a-col :span="12">
                <date-time-box class="mb-5" v-model:valueDate="dataForm.row1.date" />
            </a-col>
            <a-col :span="12">
                <checkbox-basic size="14" label="소득세납부서" v-model:valueCheckbox="dataForm.row2.checkbox" />
            </a-col>
            <a-col :span="12">
                <date-time-box class="mb-5" v-model:valueDate="dataForm.row2.date" />
            </a-col>
            <a-col :span="12">
                <checkbox-basic size="14" label="지방소득세납부서" v-model:valueCheckbox="dataForm.row3.checkbox" />
            </a-col>
            <a-col :span="12">
                <date-time-box class="mb-5" v-model:valueDate="dataForm.row3.date" />
            </a-col>
            <a-col :span="12">
                <checkbox-basic size="14" label="지방소득세환급청구서/납부내역서" v-model:valueCheckbox="dataForm.row4.checkbox" />
            </a-col>
            <a-col :span="12">
                <date-time-box v-model:valueDate="dataForm.row4.date" />
            </a-col>
            <a-col :span="24" class="text-center mt-10">
                서식 출력하시겠습니까?
            </a-col>
            <a-col :span="24" class="text-center mt-10">
                <button-basic text="아니요" type="default" mode="outlined" width="100" @onClick="setModalVisible" />
                <button-basic text="네" type="default" class="ml-5" width="100" @onClick="actionPrint" />
            </a-col>
        </a-row>
    </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling } from "devextreme-vue/data-grid";
import queries from "@/graphql/queries/BF/BF6/BF610/index";
import notification from "@/utils/notification"
import dayjs from "dayjs";
export default defineComponent({
    components: {
        DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling
    },
    props: {
        modalStatus: Boolean,
        dataCall: {
            type: Object,
        },
    },
    setup(props, { emit }) {
        let dataForm = reactive({
            row1: {
                date: '',
                checkbox: false
            },
            row2: {
                date: '',
                checkbox: false
            },
            row3: {
                date: '',
                checkbox: false
            },
            row4: {
                date: '',
                checkbox: false
            },
        })
        let trigger = ref(false)
        let dataPrint: any = ref()
        /*
        * ============== API ============== 
        */

        //  QUERY : searchTaxWithholdingStatusReports
        let {
            refetch: refetchPrint,
            onError: errorPrint,
            onResult: resPrint
        } = useQuery(queries.getTaxWithholdingStatusReportViewUrl, dataPrint, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache"
        }));
        resPrint(res => {
            console.log(res);
            trigger.value = false
        })
        errorPrint(res => {
            notification('error', res.message)
        })
        /*
         * ============== WATCHING ============== 
         */
        watch(() => props.modalStatus, (newVal: any) => {
            if (newVal == true) {
                dataPrint.value = {
                    ...props.dataCall,
                    formInputs: []
                }
            }
        }, { deep: true })

        watch(() => dataForm, (newVal: any) => {
            if (newVal.row1.checkbox == true)
                newVal.row1.date = dayjs()
            else
                newVal.row1.date = ""
            if (newVal.row2.checkbox == true)
                newVal.row2.date = dayjs()
            else
                newVal.row2.date = ""
            if (newVal.row3.checkbox == true)
                newVal.row3.date = dayjs()
            else
                newVal.row3.date = ""
            if (newVal.row4.checkbox == true)
                newVal.row4.date = dayjs()
            else
                newVal.row4.date = ""
        }, { deep: true })

        /*
         * ============== FUNCTION ============== 
         */

        const setModalVisible = () => {
            emit("closePopup", true)
        }
        const actionPrint = () => {
            dataPrint.value.formInputs = []
            if (dataForm.row1.checkbox == true)
                dataPrint.value.formInputs.push({
                    "createDate": dataForm.row1.date.toString(),
                    "type": 1
                })
            if (dataForm.row2.checkbox == true)
                dataPrint.value.formInputs.push({
                    "createDate": dataForm.row2.date.toString(),
                    "type": 2
                })
            if (dataForm.row3.checkbox == true)
                dataPrint.value.formInputs.push({
                    "createDate": dataForm.row3.date.toString(),
                    "type": 3
                })
            if (dataForm.row4.checkbox == true)
                dataPrint.value.formInputs.push({
                    "createDate": dataForm.row4.date.toString(),
                    "type": 4
                })

            trigger.value = true
            if (dataPrint.value.formInputs.length > 0)
                refetchPrint()
            else
                notification('error', "Vui lòng chọn !")
        }
        return {
            dataForm,
            setModalVisible, actionPrint
        }
    }
})
</script>
<style  scoped lang="scss">

</style>