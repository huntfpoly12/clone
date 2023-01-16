<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="500">
        <a-form-item label="귀속/지급연월" label-align="right" class="mt-40">
            <div class="d-flex-center">
                <div class="month-custom-1 d-flex-center">
                    귀 {{ processKey.imputedYear }}-{{ month }}
                    <!-- <month-picker-box v-model:valueDate="month1" width="65px" class="mr-5 ml-5" /> -->
                </div>
                <div class="month-custom-2 d-flex-center">
                    지 <month-picker-box v-model:valueDate="month2" width="65px" class="ml-5" />
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
                        귀 {{ data.imputedYear }}-{{ data.imputedMonth }} 지 {{ data.paymentYear }}-{{ data.paymentMonth
                        }}
                        <DxTextBox style="display: none;" />
                    </span>
                    <span v-else style="padding: 4px">
                        <span>선택</span>
                        <DxTextBox style="display: none;" />
                    </span>
                </template>
                <template #item-data="{ data }">
                    <span>귀 {{ data.imputedYear }}-{{ data.imputedMonth }} 지
                        {{ data.paymentYear }}-{{ data.paymentMonth }}</span>
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
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA1/PA110/index"
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
        const processKey = computed(() => store.state.common.processKeyPA110)
        const globalYear = computed(() => store.state.settings.globalYear)
        const month: any = ref<number>()
        const dataApiCopy: any = ref({})
        watch(() => props.data, (val) => {
            month.value = val
        let yearMonth = `${processKey.value.paymentYear}${processKey.value.imputedMonth}`;
        if (props.dateType == 2 && props.data) {
          yearMonth = `${processKey.value.paymentYear}${props.data + 1}`;
        }
        if (props.dateType == 1) {
          yearMonth = `${processKey.value.paymentYear}${props.data}`;
        }
        month2.value = yearMonth;
        });
        const updateValue = (value: any) => {
            dataApiCopy.value = value.value
        };
        const month2 = ref(`${processKey.value.imputedYear}-${processKey.value.imputedMonth}`)
        const modalCopy = ref(false)
        const paymentDayCopy = ref()

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
            notification('success', ` 완료!`)
            emit('loadingTableInfo', true)
        })

        const setModalVisible = () => {
            emit("closePopup", false)
        };
        const setModalVisibleCopy = () => {
            modalCopy.value = false
        };

        const onSubmit = () => {
            emit("dataAddIncomeProcess", {
                imputedYear: processKey.value.imputedYear,
                imputedMonth: month.value,
                paymentYear: parseInt(month2.value.toString().slice(0,4)),
                paymentMonth: parseInt(month2.value.toString().slice(4,6)),
            })
            store.state.common.processKeyPA110.imputedYear = globalYear.value
            store.state.common.processKeyPA110.imputedMonth = month.value
            store.state.common.processKeyPA110.paymentYear = parseInt(month2.value.toString().slice(0,4))
            store.state.common.processKeyPA110.paymentMonth = parseInt(month2.value.toString().slice(4,6))
            emit("closePopup", false)
        };

        const openModalCopy = () => {
            modalCopy.value = true
        }
        const actionCopy = () => {
            onSubmit();
            setModalVisible()
            setModalVisibleCopy()
            if (dataApiCopy.value.imputedYear) {
                mutate({
                    companyId: companyId,
                    source: dataApiCopy.value,
                    target: {
                        imputedYear: processKey.value.imputedYear,
                        imputedMonth: month.value,
                        paymentYear: parseInt(month2.value.toString().slice(0,4)),
                        paymentMonth: parseInt(month2.value.toString().slice(4,6)),
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
        }
    },
})
</script>

<style lang="scss" scoped>
.custom-modal-delete {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    margin-top: 20px;

    img {
        width: 40px;
        margin-right: 5px;
    }

    span {
        padding: 0px 5px;
    }
}

.mt-30 {
    margin-top: 30px;
}

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
    background-color: #A6A6A6;
    padding: 4px 10px;
    border-radius: 5px;
    margin-right: 10px;
    color: white;
    font-size: 16px;
    .dp__input {
        color: white;
        padding: 0px;
        border: none;
        height: 30px;
        background-color: #A6A6A6;
    }

    .dp__icon {
        display: none;
    }
}

::v-deep .month-custom-2 {
    background-color: black;
    padding-left: 10px;
    border-radius: 5px;
    margin-right: 10px;
    color: white;

    .dp__input {
        color: white;
        padding: 0px;
        border: none;
        height: 30px;
        background-color: black;
    }

    .dp__icon {
        display: none;
    }
}
</style>
