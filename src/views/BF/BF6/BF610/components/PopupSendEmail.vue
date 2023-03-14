<template>
    <a-modal :visible="modalStatus" footer="" :mask-closable="false" title="" okText="저장하고 나가기" cancelText="그냥 나가기"
        @cancel="setModalVisible" width="576px">
        <a-row :gutter="24" class="mt-20">
            <a-col :span="12">
                <checkbox-basic  label="원천징수이행상황신고서" v-model:valueCheckbox="dataForm.row1.checkbox" />
            </a-col>
            <a-col :span="12">
                <date-time-box class="mb-5" v-model:valueDate="dataForm.row1.date" />
            </a-col>
            <a-col :span="12">
                <checkbox-basic  label="소득세납부서" v-model:valueCheckbox="dataForm.row2.checkbox" />
            </a-col>
            <a-col :span="12">
                <date-time-box class="mb-5" v-model:valueDate="dataForm.row2.date" />
            </a-col>
            <a-col :span="12">
                <checkbox-basic  label="지방소득세납부서" v-model:valueCheckbox="dataForm.row3.checkbox" />
            </a-col>
            <a-col :span="12">
                <date-time-box class="mb-5" v-model:valueDate="dataForm.row3.date" />
            </a-col>
            <a-col :span="12">
                <checkbox-basic  label="지방소득세환급청구서/납부내역서" v-model:valueCheckbox="dataForm.row4.checkbox" />
            </a-col>
            <a-col :span="12">
                <date-time-box v-model:valueDate="dataForm.row4.date" />
            </a-col>
            <a-col :span="24" class="text-center mt-10 d-flex-center">
                <mail-text-box width="200" class="mr-5" :required="true" v-model:valueInput="dataPrint.emailInput.receiverAddress" placeholder="abc@example.com" />
                <span>로 메일을 발송하시겠습니까?</span>
            </a-col>
            <a-col :span="24" class="text-center mt-10">
                <button-basic text="아니요" type="default" mode="outlined" width="100" @onClick="setModalVisible" />
                <button-basic text="네" type="default" class="ml-5" width="100" :disabled="dataPrint.formInputs.length === 0" @onClick="actionPrint($event)" />
            </a-col>
        </a-row>
    </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive } from "vue";
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/BF/BF6/BF610/index";
import notification from "@/utils/notification"
import dayjs from "dayjs";
import filters from "@/helpers/filters";
import { Message } from "@/configs/enum";
type DataCall = {
  reportId: string;
  companyId: string;
  senderName: string;
  imputedYear: string;
  receiverName: string;
  receiverAddress: string;
}
export default defineComponent({
    props: {
        modalStatus: Boolean,
        dataCall: {
            type: Object as () => DataCall,
        },
    },
    setup(props, { emit }) {
        let dataForm = reactive({
            row1: {
                date: new Date(),
                checkbox: true
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
        let dataPrint = ref()
        /*
        * ============== API ==============
        */

        //  QUERY : sendTaxWithholdingStatusReportEmail
        let {
            refetch: refetchPrint,
            onError: errorPrint,
            onResult: resPrint,
        } = useQuery(queries.sendTaxWithholdingStatusReportEmail, dataPrint, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache"
        }));
        resPrint(res => {
            trigger.value = false
            emit("closePopup", true)
            notification('success', Message.getCommonMessage('101'))
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
                    reportId: props.dataCall?.companyId,
                    companyId: props.dataCall?.reportId,
                    imputedYear: props.dataCall?.imputedYear,
                    formInputs: [ {
                      createDate: filters.formatDateToInterger(dataForm.row1.date),
                      type: 1
                    }],
                    emailInput: {
                      receiverName: props.dataCall?.receiverName,
                      receiverAddress: props.dataCall?.receiverAddress,
                      senderName: props.dataCall?.senderName
                    }
                }
            }
        }, { deep: true })

        watch(() => dataForm, (newVal: any) => {
            if (newVal.row1.checkbox == true)
                newVal.row1.date = filters.formatDateToInterger(dayjs())
            else
                newVal.row1.date = ""
            if (newVal.row2.checkbox == true)
                newVal.row2.date = filters.formatDateToInterger(dayjs())
            else
                newVal.row2.date = ""
            if (newVal.row3.checkbox == true)
                newVal.row3.date = filters.formatDateToInterger(dayjs())
            else
                newVal.row3.date = ""
            if (newVal.row4.checkbox == true)
                newVal.row4.date = filters.formatDateToInterger(dayjs())
            else newVal.row4.date = ""

            dataPrint.value.formInputs = []
            if (dataForm.row1.checkbox == true)
                dataPrint.value.formInputs.push({
                    "createDate": filters.formatDateToInterger(dataForm.row1.date),
                    "type": 1
                })
            if (dataForm.row2.checkbox == true)
                dataPrint.value.formInputs.push({
                    "createDate": filters.formatDateToInterger(dataForm.row2.date),
                    "type": 2
                })
            if (dataForm.row3.checkbox == true)
                dataPrint.value.formInputs.push({
                    "createDate": filters.formatDateToInterger(dataForm.row3.date),
                    "type": 3
                })
            if (dataForm.row4.checkbox == true)
                dataPrint.value.formInputs.push({
                    "createDate": filters.formatDateToInterger(dataForm.row4.date),
                    "type": 4
                })
        }, { deep: true })

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
              if (dataPrint.value.formInputs.length > 0) {
                trigger.value = true
                refetchPrint()
              } else notification('error', "Vui lòng chọn !")
            }
        }
        return {
            dataForm, dataPrint,
            setModalVisible, actionPrint
        }
    }
})
</script>
<style  scoped lang="scss">

</style>
