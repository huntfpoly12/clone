<template>
    <a-modal :visible="modalStatus" footer="" :mask-closable="false" title="" okText="저장하고 나가기" cancelText="그냥 나가기"
        @cancel="setModalVisible" width="576px">
        <a-row :gutter="24" class="mt-20">
            <a-col :span="12">
                <checkbox-basic  label="원천징수이행상황신고서" v-model:valueCheckbox="dataForm.row1.type" />
            </a-col>
            <a-col :span="12">
                <date-time-box class="mb-5" v-model:valueDate="dataForm.row1.createDate" />
            </a-col>
            <a-col :span="12">
                <checkbox-basic  label="소득세납부서" v-model:valueCheckbox="dataForm.row2.type" />
            </a-col>
            <a-col :span="12">
                <date-time-box class="mb-5" v-model:valueDate="dataForm.row2.createDate" />
            </a-col>
            <a-col :span="12">
                <checkbox-basic  label="지방소득세납부서" v-model:valueCheckbox="dataForm.row3.type" />
            </a-col>
            <a-col :span="12">
                <date-time-box class="mb-5" v-model:valueDate="dataForm.row3.createDate" />
            </a-col>
            <a-col :span="12">
                <checkbox-basic  label="지방소득세환급청구서/납부내역서" v-model:valueCheckbox="dataForm.row4.type" />
            </a-col>
            <a-col :span="12">
                <date-time-box v-model:valueDate="dataForm.row4.createDate" />
            </a-col>
            <a-col :span="24" class="text-center mt-10">
                서식 출력하시겠습니까?
            </a-col>
            <a-col :span="24" class="text-center mt-10">
                <button-basic text="아니요" type="default" mode="outlined" width="100" @onClick="setModalVisible" />
                <button-basic text="네" type="default" class="ml-5" width="100" :disabled="!(dataForm.row1.type || dataForm.row2.type || dataForm.row3.type || dataForm.row4.type)"  @onClick="actionPrint" />
            </a-col>
        </a-row>
    </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, watchEffect } from "vue";
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/BF/BF6/BF610/index";
import notification from "@/utils/notification"
import dayjs from "dayjs";
import filters from "@/helpers/filters";
export default defineComponent({
    props: {
        modalStatus: Boolean,
        dataCall: {
            type: Object,
        },
    },
    setup(props, { emit }) {
        type Form =  {
            [key: string]: {
                createDate: number | string;
                type: boolean;
            }}
        let dataForm = reactive<Form>({
            row1: {
                createDate: filters.formatDateToInterger(new Date()),
                type: true
            },
            row2: {
                createDate: '',
                type: false
            },
            row3: {
                createDate: '',
                type: false
            },
            row4: {
                createDate: '',
                type: false
            },
        })
        let trigger = ref(false)
        let dataPrint: any = ref({
            ...props.dataCall,
                    formInputs: []
        })
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
            trigger.value = false
        })

         /*
         * ============== WATCHING ==============
         */
         watchEffect(() => {
            dataForm.row1.createDate = dataForm.row1.type ?  filters.formatDateToInterger(dayjs()) : ''

        })
        watchEffect(() => {
            dataForm.row2.createDate = dataForm.row2.type ?  filters.formatDateToInterger(dayjs()) : ''

        })
        watchEffect(() => {
            dataForm.row3.createDate = dataForm.row3.type ?  filters.formatDateToInterger(dayjs()) : ''

        })
        watchEffect(() => {
            dataForm.row4.createDate = dataForm.row4.type ?  filters.formatDateToInterger(dayjs()) : ''
        })
        /*
         * ============== FUNCTION ==============
         */

        const setModalVisible = () => {
            emit("closePopup", true)
        }
        const actionPrint = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                dataPrint.value.formInputs = Object.values(dataForm).reduce((acc: any, cur: any, index: number) => {
                    if (cur.type) {
                        acc.push({
                            createDate: cur.createDate,
                            type: index + 1
                        })
                    }
                    return acc
                }, [])
                trigger.value = true
            }
        }
        return {
            dataForm,
            setModalVisible, actionPrint,
            dataPrint
        }
    }
})
</script>
<style  scoped lang="scss">

</style>
