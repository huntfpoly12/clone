<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="500">
        <div class="mt-20 text-center">
            <h2><b>소득자료 생성</b></h2>
            <div style="display: inline-block;">
                <a-form-item label="귀속/지급연월" label-align="right">
                    <div class="d-flex-center">
                        <div class="month-custom-1 d-flex-center">
                            귀 {{ processKey.imputedYear }}-{{ $filters.formatMonth(month) }}
                        </div>
                        <month-picker-box-custom :disabled="true" text="지" v-model:valueDate="month2" class="ml-5" />
                    </div>
                </a-form-item>
                <a-form-item label="지급일" label-align="right">
                    <date-time-box-custom ref="requiredPaymentDayCopy" width="150px" :required="true" :startDate="startDate"
                        :finishDate="finishDate" v-model:valueDate="paymentDayCopy" />
                    <!-- <number-box :max="31" :min="1" width="150px" class="mr-5" v-model:valueInput="paymentDayCopy" /> -->
                </a-form-item>
            </div>

            <div class="text-center mt-30">
                <button-basic class="button-form-modal" text="새로 입력" :width="140" type="default" mode="contained"
                    @onClick="onSubmit" />
                <button-basic class="button-form-modal" text="과거 내역 복사" :width="140" type="default" mode="contained"
                    @onClick="openModalCopy" />
            </div>
        </div>
    </a-modal>

    <a-modal :visible="modalCopy" @cancel="setModalVisibleCopy" :mask-closable="false" class="confirm-md" footer=""
        :width="600">
        <div class="mt-30 d-flex-center center modal-copy-api">
            <span>과거내역</span>
            <DxSelectBox :width="200" :key="resetSelect" :data-source="arrDataPoint" placeholder="선택"
                item-template="item-data" field-template="field-data" @value-changed="updateValue" :disabled="false">
                <template #field-data="{ data }">
                    <span v-if="data" style="padding: 4px">
                        귀 {{ data.imputedYear }}-{{ $filters.formatMonth(data.imputedMonth) }}
                        지 {{ data.paymentYear }}-{{ $filters.formatMonth(data.paymentMonth) }}
                        <DxTextBox style="display: none;" />
                    </span>
                    <span v-else style="padding: 4px">
                        <span>선택</span>
                        <DxTextBox style="display: none;" />
                    </span>
                </template>
                <template #item-data="{ data }">
                    <span>
                        귀 {{ data.imputedYear }}-{{ $filters.formatMonth(data.imputedMonth) }}
                        지 {{ data.paymentYear }}-{{ $filters.formatMonth(data.paymentMonth) }}
                    </span>
                </template>
            </DxSelectBox>
            <span>로 부터 복사하여 새로 입력합니다.</span>
        </div>

        <div class="text-center mt-30">
            <button-basic class="button-form-modal" text="아니요" :width="140" type="default" mode="outlined"
                @onClick="setModalVisibleCopy" />
            <button-basic class="button-form-modal" text="네" :width="140" type="default" mode="contained"
                @onClick="actionCopy" />
        </div>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { companyId } from "@/helpers/commonFunction"
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";
import notification from "@/utils/notification";
import { useQuery, useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA1/PA110/index"
import queries from "@/graphql/queries/PA/PA1/PA110/index"
import dayjs from "dayjs";
import filters from "@/helpers/filters";
import { sampleDataIncomeWage } from "../../utils/index"
import { Message } from "@/configs/enum";
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
        },
        data: {
            type: Number,
            default: 0
        },
        arrDataPoint: {
            type: Array,
            default: []
        },
        dateType: {
            type: Number,
            default: 1,
        },
    },
    components: {
        DxSelectBox,
        DxTextBox
    },
    setup(props, { emit }) {
        const store = useStore()
        const processKey = computed(() => store.state.common.pa110.processKeyPA110)
        const paYear = ref<number>(parseInt(sessionStorage.getItem("paYear") ?? '0'))
        const month: any = ref<number>()
        const month2: any = ref(parseInt(dayjs().format('YYYYMM')))
        const modalCopy = ref(false)
        const paymentDayCopy = ref()
        const paymentDayCallApi = ref()
        const paymentTypeCallApi = ref()
        const dataApiCopy: any = ref({})
        const trigger = ref<boolean>(true)
        const startDate = ref(dayjs(`${paYear.value}-${month.value}`).startOf('month').toDate());
        const finishDate = ref(dayjs(`${paYear.value}-${month.value}`).endOf('month').toDate());
        const requiredPaymentDayCopy = ref()
        const resetSelect = ref<number>(0)
        watch(() => props.data, (val) => {
            month.value = val
            let paymentMonth = month.value

            // if (value) {

            if (paymentTypeCallApi.value == 2) {
                paymentMonth = month.value + 1
            }
            let daySetting = paymentDayCallApi.value == 0 ? dayjs(`${paYear.value}-${paymentMonth}`).daysInMonth() : paymentDayCallApi.value
            month2.value = parseInt(`${paymentMonth == 13 ? paYear.value + 1 : paYear.value}${paymentMonth == 13 ? '01' : filters.formatMonth(paymentMonth)}`)
            paymentDayCopy.value = parseInt(`${month2.value}${filters.formatMonth(daySetting)}`)

            // }
            startDate.value = dayjs(`${month2.value}`).startOf('month').toDate();
            finishDate.value = dayjs(`${month2.value}`).endOf('month').toDate();
            // trigger.value = true
        });
        const dataQuery = ref({ companyId: companyId, imputedYear: paYear.value });
        const { result: resultConfig } = useQuery(
            queries.getWithholdingConfig,
            dataQuery,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );

        // watch(() => month2.value, (newVal) => {

        //     if (paymentDayCallApi.value == 0) {
        //         paymentDayCopy.value = parseInt(`${newVal}${dayjs(`${newVal}`).daysInMonth()}`)
        //     } else {
        //         paymentDayCopy.value = parseInt(`${newVal}01}`)
        //     }

        //     startDate.value = dayjs(`${newVal}`).startOf('month').toDate();
        //     finishDate.value = dayjs(`${newVal}`).endOf('month').toDate();
        // })
        watch(() => store.state.common.pa110.actionCallGetMonthDetail, (newVal) => {
            trigger.value = true;
        })
        watch(resultConfig, (value) => {
            trigger.value = false;
            sampleDataIncomeWage.paymentDay = value.getWithholdingConfig.paymentDay == null ? 0 : value.getWithholdingConfig.paymentDay
            paymentDayCallApi.value = value.getWithholdingConfig.paymentDay == null ? 0 : value.getWithholdingConfig.paymentDay
            paymentTypeCallApi.value = value.getWithholdingConfig.paymentType
            // let paymentMonth = month.value
            // month2.value = parseInt(`${paymentMonth == 13 ? paYear.value + 1 : paYear.value}${paymentMonth == 13 ? '01' : filters.formatMonth(paymentMonth)}`)
            // if (value) {
            //     paymentDayCopy.value = parseInt(`${month2.value}${filters.formatMonth(value.getWithholdingConfig.paymentDay)}`)
            //     sampleDataIncomeWage.paymentDay = value.getWithholdingConfig.paymentDay
            //     if (value.getWithholdingConfig.paymentType == 2) {
            //         paymentMonth = month.value + 1
            //     }
            // }
            // startDate.value = dayjs(`${month2.value}`).startOf('month').toDate();
            // finishDate.value = dayjs(`${month2.value}`).endOf('month').toDate();
        });
        const updateValue = (value: any) => {
            dataApiCopy.value = value.value
        };

        const {
            mutate,
            onError,
            onDone,
        } = useMutation(mutations.copyIncomeWages)
        onError(res => {
            notification('error', res.message)
        })
        onDone(res => {
            setModalVisible()
            setModalVisibleCopy()
            notification('success', Message.getMessage('COMMON', '106').message)
            store.state.common.pa110.processKeyPA110.imputedMonth = month.value
            store.state.common.pa110.processKeyPA110.paymentYear = parseInt(month2.value?.toString().slice(0, 4))
            store.state.common.pa110.processKeyPA110.paymentMonth = parseInt(month2.value?.toString().slice(4, 6))
            store.state.common.pa110.loadingTableInfo++
        })

        const setModalVisible = () => {
            emit("closePopup", false)
        };
        const setModalVisibleCopy = () => {
            modalCopy.value = false
        };

        const onSubmit = () => {
            if (!paymentDayCopy.value) {
                requiredPaymentDayCopy.value.validate(true)
                return
            }
            store.state.common.pa110.processKeyPA110.imputedYear = paYear.value
            store.state.common.pa110.processKeyPA110.imputedMonth = month.value
            store.state.common.pa110.processKeyPA110.paymentYear = parseInt(month2.value?.toString().slice(0, 4))
            store.state.common.pa110.processKeyPA110.paymentMonth = parseInt(month2.value?.toString().slice(4, 6))
            emit("dataAddIncomeProcess", {
                imputedYear: processKey.value.imputedYear,
                imputedMonth: month.value,
                paymentYear: parseInt(month2.value?.toString().slice(0, 4)),
                paymentMonth: parseInt(month2.value?.toString().slice(4, 6)),
            })
            emit("closePopup", false)
            sampleDataIncomeWage.paymentDay = parseInt(paymentDayCopy.value?.toString().slice(6, 8)) ?? 1
            // store.state.common.pa110.paymentDayCopy = paymentDayCopy.value
            // store.state.common.pa110.actionCopy++
            store.state.common.pa110.resetArrayEmploySelect++
        };

        const openModalCopy = () => {
            resetSelect.value++
            dataApiCopy.value = {}
            modalCopy.value = true
        }
        const actionCopy = () => {
            // onSubmit();
            // setModalVisible()
            // setModalVisibleCopy()
            if (dataApiCopy.value.imputedYear) {
                mutate({
                    companyId: companyId,
                    source: dataApiCopy.value,
                    target: {
                        imputedYear: processKey.value.imputedYear,
                        imputedMonth: month.value,
                        paymentYear: parseInt(month2.value?.toString().slice(0, 4)),
                        paymentMonth: parseInt(month2.value?.toString().slice(4, 6)),
                    },
                    targetDay: parseInt(paymentDayCopy.value?.toString().slice(6, 8)),
                })

            } else {
                notification('error', '날짜를 선택하세요.')
            }

        }
        return {
            resetSelect,
            processKey,
            month,
            modalCopy,
            paymentDayCopy,
            actionCopy,
            month2,
            openModalCopy,
            setModalVisible,
            setModalVisibleCopy,
            onSubmit,
            updateValue,
            startDate, finishDate, requiredPaymentDayCopy,
        }
    },
})
</script>

<style lang="scss" scoped>
.button-form-modal {
    margin: 0px 5px;
}

:deep label {
    width: 100px;
}

:deep .month-custom-1 {
    background-color: #A6A6A6;
    padding: 3px 16px;
    border-radius: 5px;
    color: white;
    height: 28px;
}

.modal-copy-api {
    height: 70px;
}

.center {
    justify-content: center;
}
</style>
