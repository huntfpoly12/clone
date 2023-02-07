<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="500">
        <a-form-item label="귀속/지급연월" label-align="right" class="mt-40">
            <div class="d-flex-center">
                <div class="month-custom-1 d-flex-center">
                    귀 {{ processKey.imputedYear }}-{{ month > 9 ? month : '0' + month }}
                </div>
                <div class="month-custom-2 d-flex-center">
                    <span>지</span>
                    <month-picker-box v-model:valueDate="month2" width="65px" class="ml-5" />
                </div>
            </div>
        </a-form-item>
        <a-form-item label="지급일" label-align="right">
            <number-box :max="31" :min="1" width="150px" class="mr-5" v-model:valueInput="paymentDayCopy" />
        </a-form-item>

        <div class="text-align-center mt-30">
            <button-basic class="button-form-modal" text="새로 입력" :width="140" type="default" mode="contained"
                @onClick="onSubmit" />
            <button-basic class="button-form-modal" text="과거 내역 복사" :width="140" type="default" mode="contained"
                @onClick="openModalCopy" />
        </div>
    </a-modal>

    <a-modal :visible="modalCopy" @cancel="setModalVisibleCopy" :mask-closable="false" class="confirm-md" footer=""
        :width="600">
        <div class="mt-30 d-flex-center">
            <span>과거내역</span>
            <DxSelectBox :width="200" :data-source="arrDataPoint" placeholder="선택" item-template="item-data"
                field-template="field-data" @value-changed="updateValue" :disabled="false">
                <template #field-data="{ data }">
                    <span v-if="data" style="padding: 4px">
                        귀 {{ data.imputedYear }}-{{
                            data.imputedMonth > 9 ? data.imputedMonth : '0' + data.imputedMonth
                        }}
                        지 {{ data.paymentYear }}-{{
                            data.paymentMonth > 9 ? data.paymentMonth : '0' + data.paymentMonth
                        }}
                        <DxTextBox style="display: none;" />
                    </span>
                    <span v-else style="padding: 4px">
                        <span>선택</span>
                        <DxTextBox style="display: none;" />
                    </span>
                </template>
                <template #item-data="{ data }">
                    <span>귀 {{ data.imputedYear }}-{{
                        data.imputedMonth > 9 ? data.imputedMonth :
                            '0' + data.imputedMonth
                    }} 지
                        {{ data.paymentYear }}-{{
                            data.paymentMonth > 9 ? data.paymentMonth : '0' + data.paymentMonth
                        }}</span>
                </template>
            </DxSelectBox>
            <span>로 부터 복사하여 새로 입력합니다.</span>
        </div>

        <div class="text-align-center mt-30">
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
        const processKey = computed(() => store.state.common.processKeyPA510)
        const globalYear = computed(() => store.state.settings.globalYear)
        const month: any = ref<number>()
        const dataApiCopy: any = ref({})
        const arrDataPoint: any = ref({})
        const trigger = ref<boolean>(false)
        const triggerFindIncome = ref<boolean>(false)
        watch(() => props.data, (val) => {
            month.value = val
            originData.value.filter = {
                startImputedYearMonth: parseInt(`${globalYear.value}01`),
                finishImputedYearMonth: parseInt(`${globalYear.value}12`),
            }
            trigger.value = true
            triggerFindIncome.value = true
        });
        const updateValue = (value: any) => {
            dataApiCopy.value.paymentYear = value.value.paymentYear
            dataApiCopy.value.paymentMonth = value.value.paymentMonth
            dataApiCopy.value.imputedMonth = value.value.imputedMonth
            dataApiCopy.value.imputedYear = value.value.imputedYear
        };

        // const month2 = ref(`${processKey.value.imputedYear}-${processKey.value.imputedMonth}`)
        const month2: any = ref<number>()
        const modalCopy = ref(false)
        const paymentDayCopy = ref()
        const dataQuery = ref({ companyId: companyId, imputedYear: globalYear.value });
        const { result: resultConfig } = useQuery(
            queries.getWithholdingConfig,
            dataQuery,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultConfig, (value) => {
            let paymentMonth = month.value
            if (value) {
                paymentDayCopy.value = value.getWithholdingConfig.paymentDay
                if (value.getWithholdingConfig.paymentType == 2) {
                    paymentMonth = month.value + 1
                }
            }
            month2.value = parseInt(`${paymentMonth == 13 ? globalYear.value + 1 : globalYear.value}${paymentMonth == 13 ? 1 : paymentMonth}`)
            trigger.value = false;
        });
        const originData: any = ref({
            companyId: companyId,
            filter: {
                startImputedYearMonth: parseInt(`${globalYear.value}01`),
                finishImputedYearMonth: parseInt(`${globalYear.value}12`),
            }
        })
        const {
            onResult: onResult
        } = useQuery(queries.findIncomeProcessWageDailyStatViews, originData, () => ({
            enabled: triggerFindIncome.value,
            fetchPolicy: "no-cache",
        }));
        onResult((value: any) => {
            triggerFindIncome.value = false;
            arrDataPoint.value = value.data.findIncomeProcessWageDailyStatViews
        })

        const {
            mutate,
            onError,
            onDone,
        } = useMutation(mutations.copyIncomeWageDailies)
        onError(res => {
            notification('error', res.message)
        })
        onDone(res => {
            setModalVisible()
            setModalVisibleCopy()
            notification('success', `완료!`)
            store.state.common.processKeyPA510.imputedMonth = month.value
            store.state.common.processKeyPA510.paymentYear = parseInt(month2.value.toString().slice(0, 4))
            store.state.common.processKeyPA510.paymentMonth = parseInt(month2.value.toString().slice(4, 6))
            store.state.common.loadingTableInfo++
        })

        const setModalVisible = () => {
            emit("closePopup", false)
        };
        const setModalVisibleCopy = () => {
            modalCopy.value = false
        };

        const onSubmit = () => {
            store.state.common.processKeyPA510.imputedMonth = month.value
            store.state.common.processKeyPA510.paymentYear = parseInt(month2.value.toString().slice(0, 4))
            store.state.common.processKeyPA510.paymentMonth = parseInt(month2.value.toString().slice(4, 6))
            emit("dataAddIncomeProcess", {
                imputedYear: globalYear.value,
                imputedMonth: month.value,
                paymentYear: parseInt(month2.value.toString().slice(0, 4)),
                paymentMonth: parseInt(month2.value.toString().slice(4, 6)),
            })
            emit("closePopup", false)
            store.state.common.paymentDayCopy = paymentDayCopy.value
            store.state.common.resetArrayEmploySelect++
        };

        const openModalCopy = () => {
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
                        paymentYear: parseInt(month2.value.toString().slice(0, 4)),
                        paymentMonth: parseInt(month2.value.toString().slice(4, 6)),
                    },
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
            updateValue,
            arrDataPoint,
        }
    },
})
</script>

<style lang="scss" scoped>
.text-align-center {
    text-align: center;
}

.button-form-modal {
    margin: 0px 5px;
}

::v-deep label {
    width: 100px;
}

::v-deep .month-custom-1 {
    font-size: 13px;
    background-color: #A6A6A6;
    padding: 6px 20px 6px 10px;
    border-radius: 5px;
    margin-right: 10px;
    color: white;
}

::v-deep .month-custom-2 {
    font-size: 13px;
    background-color: black;
    padding: 2px 0px 0px 10px;
    border-radius: 5px;
    margin-right: 10px;
    color: white;

    .dp__input {
        color: white;
        padding: 0px;
        border: none;
        height: 24px;
        background-color: black;
        padding-top: 1px;
        font-size: 12px;
    }

    .dp__icon {
        display: none;
    }
}
</style>