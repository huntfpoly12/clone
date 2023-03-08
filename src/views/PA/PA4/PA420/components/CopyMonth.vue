<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="500">
        <a-form-item label="귀속/지급연월" label-align="right" class="mt-40">
            <div class="d-flex-center">
                <div class="month-custom-1 d-flex-center">
                    귀 {{ store.state.settings.globalYear }}-{{ $filters.formatMonth(month1) }}
                </div>
                <month-picker-box-custom v-model:valueDate="month2"/>
           
            </div>
        </a-form-item>
        <a-form-item label="지급일" label-align="right" class="label-required">
            <number-box :max="31" :min="1" width="150px" class="mr-5" v-model:valueInput="paymentDayCopy" :required="true"/>
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
import filters from "@/helpers/filters";
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
        let month2: any = ref(parseInt(dayjs().format('YYYYMM')))
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
            let paymentMonth = month1.value
            if (value) {
                paymentDayCopy.value = value.getWithholdingConfig.paymentDay
                if (value.getWithholdingConfig.paymentType == 2) {
                    paymentMonth = month1.value + 1
                }
            }
            month2.value = parseInt(`${paymentMonth == 13 ? globalYear.value + 1 : globalYear.value}${paymentMonth == 13 ? '01' : filters.formatMonth(paymentMonth)}`)
            trigger.value = false;
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

        const onSubmit = (e : any) => {
          var res = e.validationGroup.validate();
          if (!res.isValid) {
            res.brokenRules[0].validator.focus();
          } else {
            emit("dataAddIncomeProcess", {
              imputedYear: globalYear.value,
              imputedMonth: month1.value,
              paymentYear: parseInt(month2.value.toString().slice(0, 4)),
              paymentMonth: parseInt(month2.value.toString().slice(4, 6)),
            })
            emit("closePopup", false)
            notification('success', `완료!`)
          }
        };
        return {
            modalCopy,
            paymentDayCopy,
            month1, month2,
            setModalVisible,
            onSubmit,store
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
        background-color: #A6A6A6;
    }
    .dp__icon {
        display: none;
    }
}
:deep.label-required {
    label {
        color: red;
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
        background-color: black;
        font-size: 14px;
    }

    .dp__icon {
        display: none;
    }
}
</style>
