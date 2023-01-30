<template>
    <a-modal :visible="modalStatus" footer="" :mask-closable="false" title="" okText="저장하고 나가기" cancelText="그냥 나가기"
        @cancel="setModalVisible" width="576px">
        <a-row :gutter="24" class="pt-20 mt-20">
            <a-col :span="12">
                <checkbox-basic size="14" label="원천징수이행상황신고서" v-model:valueCheckbox="dataForm.row1.checkbox" />
            </a-col>
            <a-col :span="12">
                <date-time-box :disabled="!dataForm.row1.checkbox" class="mb-5" v-model:valueDate="dataForm.row1.date" :placeholder="'작성일(YYYY-MM-DD)'" />
            </a-col>
            <a-col :span="12">
                <checkbox-basic size="14" label="소득세납부서" v-model:valueCheckbox="dataForm.row2.checkbox" />
            </a-col>
            <a-col :span="12">
                <date-time-box :disabled="!dataForm.row2.checkbox" class="mb-5" v-model:valueDate="dataForm.row2.date" :placeholder="'작성일(YYYY-MM-DD)'" />
            </a-col>
            <a-col :span="12">
                <checkbox-basic size="14" label="지방소득세납부서" v-model:valueCheckbox="dataForm.row3.checkbox" />
            </a-col>
            <a-col :span="12">
                <date-time-box :disabled="!dataForm.row3.checkbox" class="mb-5" v-model:valueDate="dataForm.row3.date" :placeholder="'작성일(YYYY-MM-DD)'" />
            </a-col>
            <a-col :span="12">
                <checkbox-basic size="14" label="지방소득세환급청구서/납부내역서" v-model:valueCheckbox="dataForm.row4.checkbox" />
            </a-col>
            <a-col :span="12">
                <date-time-box :disabled="!dataForm.row4.checkbox" class="mb-5" v-model:valueDate="dataForm.row4.date" :placeholder="'작성일(YYYY-MM-DD)'" />
            </a-col>
            <a-col :span="24" class="text-center mt-10">
                서식 출력하시겠습니까?
            </a-col>
            <a-col :span="24" class="text-center mt-10">
                <button-basic text="아니요" type="default" mode="outlined" width="100" @onClick="setModalVisible" />
                <button-basic :disabled="disabledButton" text="네" type="default" class="ml-5" width="100"
                    @onClick="actionPrint" />
            </a-col>
        </a-row>
    </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive } from "vue";
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/BF/BF6/BF610/index";
import notification from "@/utils/notification"
import { dataFormAction } from "./../utils/index" 
import dayjs from "dayjs";
import filters from "@/helpers/filters";
export default defineComponent({
    components: {},
    props: {
        modalStatus: Boolean,
        dataCall: {
            type: Object,
        },
    },
    setup(props, { emit }) {
        let dataForm: any = ref(JSON.parse(JSON.stringify({...dataFormAction})))
        let trigger = ref(false)
        let dataPrint: any = ref()
        let disabledButton = ref(false)
        /*
        * ============== API ============== 
        */

        //  QUERY : getTaxWithholdingStatusReportViewUrl
        let {
            refetch: refetchPrint,
            onError: errorPrint,
            onResult: resPrint
        } = useQuery(queries.getTaxWithholdingStatusReportViewUrl, dataPrint, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache"
        }));
        resPrint(res => {
            window.open(res.data.getTaxWithholdingStatusReportViewUrl);
            trigger.value = false
            emit('closePopup', true)
        })
        errorPrint(res => {
            notification('error', res.message)
        })

        /*
         * ============== WATCHING ============== 
         */
        watch(() => props.modalStatus, (newVal: any) => {
            dataForm.value = JSON.parse(JSON.stringify({...dataFormAction}))
        }, { deep: true })

        watch(() => dataForm.value, (newVal: any) => {
            if (newVal.row1.checkbox == true || newVal.row2.checkbox == true || newVal.row3.checkbox == true || newVal.row4.checkbox == true) {
                disabledButton.value = false
            } else {
                disabledButton.value = true
            }
        }, { deep: true })
        watch(() => dataForm.value.row1.checkbox, (newVal: any) => {
            if (newVal) {
                dataForm.value.row1.date = filters.formatDateToInterger(dayjs())
            } else {
                dataForm.value.row1.date = ""
            }
        })
        watch(() => dataForm.value.row2.checkbox, (newVal: any) => {
            if (newVal) {
                dataForm.value.row2.date = filters.formatDateToInterger(dayjs())
            } else {
                dataForm.value.row2.date = ""
            }
        })
        watch(() => dataForm.value.row3.checkbox, (newVal: any) => {
            if (newVal) {
                dataForm.value.row3.date = filters.formatDateToInterger(dayjs())
            } else {
                dataForm.value.row3.date = ""
            }
        })
        watch(() => dataForm.value.row4.checkbox, (newVal: any) => {
            if (newVal) {
                dataForm.value.row4.date = filters.formatDateToInterger(dayjs())
            } else {
                dataForm.value.row4.date = ""
            }
        })

        /*
         * ============== FUNCTION ============== 
         */

        const setModalVisible = () => {
            emit("closePopup", true)
        }
        const actionPrint = () => {
            dataPrint.value = {
                ...props.dataCall,
                formInputs: []
            }
            if (dataForm.value.row1.checkbox == true)
                dataPrint.value.formInputs.push({
                    "createDate": dataForm.value.row1.date,
                    "type": 1
                })
            if (dataForm.value.row2.checkbox == true)
                dataPrint.value.formInputs.push({
                    "createDate": dataForm.value.row2.date,
                    "type": 2
                })
            if (dataForm.value.row3.checkbox == true)
                dataPrint.value.formInputs.push({
                    "createDate": dataForm.value.row3.date,
                    "type": 3
                })
            if (dataForm.value.row4.checkbox == true)
                dataPrint.value.formInputs.push({
                    "createDate": dataForm.value.row4.date,
                    "type": 4
                })
            trigger.value = true
            refetchPrint()
        }
        return {
            dataForm,
            setModalVisible, actionPrint,
            disabledButton,
            dataFormAction
        }
    }
})
</script>
<style scoped lang="scss" src="../style/stylePopup.scss">

</style>