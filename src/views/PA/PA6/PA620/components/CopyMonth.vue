<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="500">
        <a-form-item label="귀속/지급연월" label-align="right" class="mt-40">
            <div class="d-flex-center">
                <div class="month-custom-1 d-flex-center">
                    귀 <month-picker-box v-model:valueDate="month1" width="65px" class="mr-5 ml-5" />
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
        :width="500">
        <div class="mt-30">
            과거내역 ipiuttttt 로 부터 복사하여 새로 입력합니다.
        </div>

        <div class="text-align-center mt-30">
            <button-basic class="button-form-modal" text="아니요" :width="140" type="default" mode="outlined"
                @onClick="setModalVisibleCopy" />
            <button-basic class="button-form-modal" text="네" :width="140" type="default" mode="contained"
                @onClick="openModalCopy" />
        </div>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import { companyId } from "@/helpers/commonFunction"
import notification from "@/utils/notification";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA6/PA620/index"
import dayjs from "dayjs";
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
        },
        data: {
            type: Array,
            default: []
        },
        processKey: {
            type: Array,
            default: []
        },
    },
    components: {
    },
    setup(props, { emit }) {
        let month1: any = ref(dayjs().format("YYYY-MM"))
        let month2: any = ref(dayjs().format("YYYY-MM"))
        const modalCopy = ref(false)
        const paymentDayCopy = ref()
        const dataAction = reactive({
            companyId: companyId,
            source: {
                imputedYear: 2022,
                imputedMonth: 1,
                paymentYear: 2022,
                paymentMonth: 1,
            },
            target: {
                imputedYear: 2022,
                imputedMonth: 1,
                paymentYear: 2022,
                paymentMonth: 1,
            }
        })

        const {
            mutate,
            onError,
            onDone,
        } = useMutation(mutations.copyIncomeBusinesses)
        onError(res => {
            notification('error', res.message)
        })
        onDone(res => {
            setModalVisible()
            notification('success', `완료!`)
        })

        const setModalVisible = () => {
            emit("closePopup", false)
        };
        const setModalVisibleCopy = () => {
            modalCopy.value = false
        };

        const onSubmit = () => {
            dataAction.source.imputedMonth = parseInt(month1.value.split('-')[1])
            dataAction.source.imputedYear = parseInt(month1.value.split('-')[0])
            dataAction.source.paymentMonth = parseInt(month2.value.split('-')[1])
            dataAction.source.paymentYear = parseInt(month2.value.split('-')[0])

            dataAction.target.imputedMonth = parseInt(month1.value.split('-')[1])
            dataAction.target.imputedYear = parseInt(month1.value.split('-')[0])
            dataAction.target.paymentMonth = parseInt(month2.value.split('-')[1])
            dataAction.target.paymentYear = parseInt(month2.value.split('-')[0])

            mutate(dataAction)

        };

        const openModalCopy = () => {
            modalCopy.value = true
        }
        return {
            modalCopy,
            paymentDayCopy,
            dataAction,
            month1, month2,
            openModalCopy,
            setModalVisible,
            setModalVisibleCopy,
            onSubmit,
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
    padding-left: 10px;
    border-radius: 5px;
    margin-right: 10px;
    color: white;

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