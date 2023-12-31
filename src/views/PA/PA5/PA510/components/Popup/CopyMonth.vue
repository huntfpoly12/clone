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
import { useMutation, useQuery } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA5/PA510/index"
import queries from "@/graphql/queries/PA/PA5/PA510/index"
import dayjs from "dayjs";
import filters from "@/helpers/filters";
import { sampleDataIncomeWageDaily } from "../../utils/index"
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
    },
    components: {
        DxSelectBox,
        DxTextBox
    },
    setup(props, { emit }) {
        const store = useStore()
        const processKey = computed(() => store.state.common.pa510.processKeyPA510)
        const paYear = ref<number>(parseInt(sessionStorage.getItem("paYear") ?? '0'))
        const month: any = ref<number>()
        const dataApiCopy: any = ref({})
        const arrDataPoint: any = ref({})
        const paymentDayCallApi = ref()
        const paymentTypeCallApi = ref()
        const trigger = ref<boolean>(true)
        const triggerFindIncome = ref<boolean>(false)
        const resetSelect = ref<number>(0)
        const startDate = ref(dayjs(`${paYear.value}-${month.value}`).startOf('month').toDate());
        const finishDate = ref(dayjs(`${paYear.value}-${month.value}`).endOf('month').toDate());
        const requiredPaymentDayCopy = ref()
        const month2: any = ref(parseInt(dayjs().format('YYYYMM')))
        const modalCopy = ref(false)
        const paymentDayCopy = ref()
        const dataQuery = ref({ companyId: companyId, imputedYear: paYear });

        const originData: any = ref({
            companyId: companyId,
            filter: {
                startImputedYearMonth: parseInt(`${paYear.
                    value}01`),
                finishImputedYearMonth: parseInt(`${paYear.value}12`),
            }
        })
        // ======================= GRAPQL ================================
        const {
            onResult: onResult
        } = useQuery(queries.findIncomeProcessWageDailyStatViews, originData, () => ({
            enabled: triggerFindIncome.value,
            fetchPolicy: "no-cache",
        }));

        onResult((value: any) => {
            triggerFindIncome.value = false;
            arrDataPoint.value = value.data.findIncomeProcessWageDailyStatViews
            arrDataPoint.value.sort(function (a: any, b: any) {
                return b.imputedMonth - a.imputedMonth;
            });
        })

        const {
            mutate, onError, onDone,
        } = useMutation(mutations.copyIncomeWageDailies)

        onError(res => {
            notification('error', res.message)
        })
        onDone(res => {
            setModalVisible()
            setModalVisibleCopy()
            notification('success', Message.getMessage('COMMON', '106').message)
            processKey.value.imputedMonth = month.value
            processKey.value.paymentYear = parseInt(month2.value?.toString().slice(0, 4))
            processKey.value.paymentMonth = parseInt(month2.value?.toString().slice(4, 6))
            store.state.common.pa510.loadingTableInfo++
        })

        const { result: resultConfig } = useQuery(
            queries.getWithholdingConfig,
            dataQuery,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );

        // ======================= WATCH ==================================
        watch(() => props.data, (val) => {
            month.value = val
            originData.value.filter = {
                startImputedYearMonth: parseInt(`${paYear.value}01`),
                finishImputedYearMonth: parseInt(`${paYear.value}12`),
            }
            calculate()
            // trigger.value = true
            triggerFindIncome.value = true
        });

        watch(() => store.state.common.pa510.actionCallGetMonthDetail, (newVal) => {
            trigger.value = true;
        })
        // watch(() => month2.value, (newVal) => {
        //     if (paymentDayCallApi.value == 0) {
        //         paymentDayCopy.value = parseInt(`${newVal}${dayjs(`${newVal}`).daysInMonth()}`)
        //     } else {
        //         paymentDayCopy.value = parseInt(`${newVal}01}`)
        //     }

        //     startDate.value = dayjs(`${newVal}`).startOf('month').toDate();
        //     finishDate.value = dayjs(`${newVal}`).endOf('month').toDate();
        // })
        watch(resultConfig, (value) => {
            trigger.value = false;
            sampleDataIncomeWageDaily.paymentDay = value.getWithholdingConfig.paymentDay == null ? 0 : value.getWithholdingConfig.paymentDay
            paymentDayCallApi.value = value.getWithholdingConfig.paymentDay == null ? 0 : value.getWithholdingConfig.paymentDay
            paymentTypeCallApi.value = value.getWithholdingConfig.paymentType
        });
        // ======================= FUNCTION ================================
        const calculate = () => {
            let paymentMonth = month.value

            if (paymentTypeCallApi.value == 2) {
                paymentMonth = month.value + 1
            }
            let daySetting = paymentDayCallApi.value == 0 ? dayjs(`${paYear.value}-${paymentMonth}`).daysInMonth() : paymentDayCallApi.value
            month2.value = parseInt(`${paymentMonth == 13 ? paYear.value + 1 : paYear.value}${paymentMonth == 13 ? '01' : filters.formatMonth(paymentMonth)}`)
            paymentDayCopy.value = parseInt(`${month2.value}${filters.formatMonth(daySetting)}`)

            startDate.value = dayjs(`${month2.value}`).startOf('month').toDate();
            finishDate.value = dayjs(`${month2.value}`).endOf('month').toDate();
        }
        const updateValue = (value: any) => {
            dataApiCopy.value.paymentYear = value.value.paymentYear
            dataApiCopy.value.paymentMonth = value.value.paymentMonth
            dataApiCopy.value.imputedMonth = value.value.imputedMonth
            dataApiCopy.value.imputedYear = value.value.imputedYear
        };

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
            processKey.value.imputedMonth = month.value
            processKey.value.paymentYear = parseInt(month2.value?.toString().slice(0, 4))
            processKey.value.paymentMonth = parseInt(month2.value?.toString().slice(4, 6))
            emit("dataAddIncomeProcess", {
                imputedYear: paYear.value,
                imputedMonth: month.value,
                paymentYear: parseInt(month2.value?.toString().slice(0, 4)),
                paymentMonth: parseInt(month2.value?.toString().slice(4, 6)),
            })
            emit("closePopup", false)
            store.state.common.pa510.statusRowAdd = true
            // store.state.common.pa510.paymentDayCopy = paymentDayCopy.value
            // store.state.common.pa510.actionCopy++
            sampleDataIncomeWageDaily.paymentDay = parseInt(paymentDayCopy.value?.toString().slice(6, 8)) ?? 1
            store.state.common.pa510.resetArrayEmploySelect++
        };

        const openModalCopy = () => {
            resetSelect.value++
            dataApiCopy.value = {}
            modalCopy.value = true
        }
        const actionCopy = () => {
            if (dataApiCopy.value.imputedYear) {
                mutate({
                    companyId: companyId,
                    source: dataApiCopy.value,
                    target: {
                        imputedYear: processKey.value.imputedYear,
                        imputedMonth: month?.value,
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
            resetSelect,
            updateValue,
            arrDataPoint,
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
