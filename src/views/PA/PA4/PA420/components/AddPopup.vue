<template>

    <a-modal :visible="modalOption" @cancel="setModalVisible" :mask-closable="false" class="confirm-md " footer=""
        style="top: 20px">
        <div class="mt-20">
            <radio-group :arrayValue="option1" v-model:valueRadioCheck="retirementIncome1" layoutCustom="horizontal" />
            <radio-group :arrayValue="option2" v-model:valueRadioCheck="dataForm.input.retirementType" layoutCustom="horizontal" />
            <span>
                퇴직소득자료 입력하시겠습니까?
            </span>
        </div>
        <div class="footer mt-30">
            <button-basic class="button-form-modal mr-5" text="아니요" type="default" mode="outlined"
                @onClick="setModalVisible" />
            <button-basic class="button-form-modal" text="네. 변경합니다" :width="140" type="default" mode="contained"
                @onClick="openModalAdd" />
        </div>
    </a-modal>

    <a-modal :visible="modalStatusAccept" @cancel="setModalVisible" :mask-closable="false" class="confirm-md " footer=""
        width="70%" style="top: 20px">
        <div class="header-text-title mt-20">퇴직소득자료입력</div>
        <a-steps :current="step" type="navigation">
            <a-step :status="step === 0 ? 'process' : 'finish'" title="기본정보" @click="changeStep(0)" />
            <a-step :status="checkStepTwo" title="퇴직금계산" @click="changeStep(1)" />
            <a-step :status="checkStepThree" title="퇴직소득세" @click="changeStep(2)" />
        </a-steps>
        <div class="step-content pt-20">
            <form action="your-action">
                <template v-if="step === 0">
                    <Tab1 :option1="retirementIncome1" :dataForm="dataForm" />
                </template>
                <template v-if="step === 1">
                    <Tab2 :dataForm="dataForm"/>
                </template>
                <template v-if="step === 2">
                    <Tab3 :dataForm="dataForm"/>
                </template>
            </form>
        </div>
        <div style="justify-content: center;" class="pt-10 wf-100 d-flex-center">
            <button-basic text="이전" type="default" mode="outlined" class="mr-5" @onClick="prevStep" v-if="step != 0" />
            <button-basic text="다음" type="default" mode="contained" @onClick="nextStep" v-if="step < 2" />
            <button-basic text="저장" type="default" mode="contained" @onClick="created" v-if="step === 2" />
        </div>
        {{ dataForm }}
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, watch } from 'vue'
import notification from "@/utils/notification";
import { companyId } from '@/helpers/commonFunction';
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA4/PA420/index"
import Tab1 from './TabCreated/Tab1.vue';
import Tab2 from './TabCreated/Tab2.vue';
import Tab3 from './TabCreated/Tab3.vue';
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA4/PA420/index";
import { initialFormState } from '../utils/index'
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Array,
            default: []
        },
        processKey: {
            type: Object,
        },
        key: {
            type: Number,
        },
    },
    components: {
        Tab1, Tab2, Tab3
    },
    setup(props, { emit }) {

        const step = ref(0)
        const dayValue = ref(1)
        const modalStatusAccept = ref(false)
        const retirementIncome1 = ref(true)
        // const retirementIncome2 = ref(1)
        const modalOption = ref()
        const trigger = ref(false)
        const dataForm = reactive({ ...initialFormState });
        const option1 = reactive([
            { id: true, text: '사원' },
            { id: false, text: '일용직사원' }
        ])
        const option2 = reactive([
            { id: 1, text: '퇴직소득(퇴직자)' },
            { id: 2, text: '중도정산' }
        ])
        const setModalVisible = () => {
            modalStatusAccept.value = false
            emit("closePopup", false)
        };

        const requestCallDetail = reactive({
            companyId: companyId,
            processKey: props.processKey,
            incomeId: props.key
        })

        // =========================  GRAPQL =================================================
        const {
            mutate,
            onDone,
            onError,
        } = useMutation(mutations.changeIncomeBusinessPaymentDay);
        onDone(() => {
            notification('success', `업데이트 완료!`)
            emit("closePopup", false)
        })
        onError((e: any) => {
            notification('error', e.message)
        })

        const { refetch: refetchGetDetail, onError: errorGetDetail, result: resultGetDetail } = useQuery(queries.getIncomeRetirement, requestCallDetail, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));

        // ================WATCHING============================================
        watch(() => props.modalStatus, (newValue) => {
            modalOption.value = newValue
        })

        // =========================  FUNCTION ===============================================
        // all Computed 
        const checkStepTwo = computed(() => {
            if (step.value === 0) {
                return "wait";
            } else if (step.value === 1) {
                return "process";
            } else {
                return "finish";
            }
        });
        const checkStepThree = computed(() => {
            if (step.value < 2) {
                return "wait";
            } else if (step.value === 2) {
                return "process";
            } else {
                return "finish";
            }
        });
        const checkStepFour = computed(() => {
            if (step.value < 3) {
                return "wait";
            } else if (step.value === 3) {
                return "process";
            } else {
                return "finish";
            }
        });

        const onSubmit = () => {

        };

        const changeStep = (stepChange: any) => {
            step.value = stepChange
        }

        const nextStep = (event: any) => {
            if (step.value < 2) {
                step.value++
            }
        }

        const prevStep = () => {
            step.value--;
        }

        const created = () => {

        }

        const openModalAdd = () => {
            modalStatusAccept.value = true
            modalOption.value = false
            console.log(props.data);

        }
        return {
            setModalVisible,
            onSubmit,
            changeStep,
            nextStep, prevStep, created,
            openModalAdd,
            checkStepTwo,
            checkStepThree,
            checkStepFour,
            step,
            dayValue,
            modalStatusAccept,
            option1, option2,
            modalOption,
            retirementIncome1,
            // retirementIncome2,
            dataForm,
        }
    },
})
</script>

<style lang="scss" scoped src="../style/modalAdd.scss">

</style> 