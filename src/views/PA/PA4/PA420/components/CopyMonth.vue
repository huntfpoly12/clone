<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="500">
        <a-form-item label="귀속/지급연월" label-align="right" class="mt-40">
            <div class="d-flex-center">
                <div class="month-custom-1 d-flex-center">
                    귀 {{ processKey.imputedYear }}-{{ month1 > 9 ? month1 : '0' + month1 }}
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
        </div>
    </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import notification from "@/utils/notification";
import dayjs from "dayjs";
import queries from "@/graphql/queries/CM/CM130/index"
import { useQuery, useMutation } from "@vue/apollo-composable";
import { companyId } from "@/helpers/commonFunction";
import { useStore } from 'vuex';
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
            type: Object,
            default: {}
        },
    },
    components: {
    },
    setup(props, { emit }) {
        const month1: any = ref<number>()
        const store = useStore();
        const globalYear = computed(() => store.state.settings.globalYear)
        const dataQuery = ref({ companyId: companyId, imputedYear: globalYear.value });
        let month2: any = ref(dayjs().format("YYYY-MM"))
        const modalCopy = ref(false)
        const paymentDayCopy = ref()
        const setModalVisible = () => {
            emit("closePopup", false)
        };
        let trigger = ref(false)

        const { result: resultConfig, refetch } = useQuery(
            queries.getWithholdingConfig,
            dataQuery,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultConfig, (value) => {
            if (value) {
                if (value.getWithholdingConfig.reportType == 1)
                    month2.value = globalYear.value * 100 + parseInt(month1.value)
                else
                    month2.value = globalYear.value * 100 + (parseInt(month1.value) + 1)
            }
        });


        watch(() => props.data, (val) => {
            month1.value = val
        });
        watch(() => props.modalStatus, (val) => {
            if (val == true) {
                trigger.value = true
                refetch()
            }
        });

        const onSubmit = () => {
            emit("dataAddIncomeProcess", {
                imputedYear: props.processKey.imputedYear,
                imputedMonth: month1.value,
                paymentYear: parseInt(month2.value.split('-')[0]),
                paymentMonth: parseInt(month2.value.split('-')[1]),
            })
            emit("closePopup", false)
            notification('success', `완료!`)
        };
        return {
            modalCopy,
            paymentDayCopy,
            month1, month2,
            setModalVisible,
            onSubmit,
        }
    },
})
</script>
<style lang="scss" scoped>
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
    padding: 5px 10px;
    border-radius: 5px;
    margin-right: 10px;
    color: white;

    .dp__input {
        color: white;
        padding: 0px;
        border: none;
        height: 24px;
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
        font-size: 14px;
    }

    .dp__icon {
        display: none;
    }
}
</style>