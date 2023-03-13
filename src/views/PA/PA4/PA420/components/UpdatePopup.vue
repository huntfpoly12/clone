<template>
    <a-modal :visible="statusModal" @cancel="setModalVisible" :mask-closable="false" class="confirm-md " footer=""
        width="70%" style="top: 20px">
        <div class="header-text-title mt-20">퇴직소득자료입력</div>
        <a-steps :current="step" type="navigation">
            <a-step :status="step === 0 ? 'process' : 'finish'" title="기본정보" @click="changeStep(0)" />
            <a-step :status="checkStepTwo" title="퇴직금계산" @click="changeStep(1)" />
            <a-step :status="checkStepThree" title="퇴직소득세" @click="changeStep(2)" />
        </a-steps>
        <div class="step-content pt-20">
            <keep-alive>
                <template v-if="step === 0">
                    <Tab1 v-model:dataDetail="dataDetailValue" @closePopup="setModalVisible"
                        :actionNextStep="valueNextStep" @nextPage="step++" :processKey="processKey" :arrayEmploySelect="arrayEmploySelect"/>
                </template>
            </keep-alive>
            <keep-alive>
                <template v-if="step === 1">
                    <Tab2 v-model:dataDetail="dataDetailValue" />
                </template>
            </keep-alive>
            <keep-alive>
                <template v-if="step === 2">
                    <Tab3 v-model:dataDetail="dataDetailValue" />
                </template>
            </keep-alive>
        </div>
        <div style="justify-content: center;" class="pt-10 wf-100 d-flex-center">
            <button-basic text="이전" type="default" mode="outlined" class="mr-5" @onClick="prevStep" v-if="step != 0" />
            <button-basic text="다음" type="default" mode="contained" @onClick="nextStep" v-if="step < 2" />
            <button-basic text="저장" type="default" mode="contained" @onClick="updated" v-if="step === 2" />
        </div>
    </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import notification from "@/utils/notification";
import { companyId } from '@/helpers/commonFunction';
import { useMutation, useQuery } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA4/PA420/index"
import Tab1 from './TabEdit/Tab1.vue';
import Tab2 from './TabEdit/Tab2.vue';
import Tab3 from './TabEdit/Tab3.vue';
import queries from "@/graphql/queries/PA/PA4/PA420/index";
import { useStore } from 'vuex';
import { dataDefaultDetailUtils } from '../utils';
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
        keyRowIndex: {
            type: Number,
        },
    },
    components: {
        Tab1, Tab2, Tab3
    },
  setup(props, { emit }) {
        const store = useStore();
        const globalYear = computed(() => store.state.settings.globalYear)
        const step = ref(0)
        const valueNextStep = ref(0)
        const dayValue = ref(1)
        const retirementIncome1 = ref(true)
        const retirementIncome2 = ref(true)
        const trigger = ref(false)
        const statusModal = ref(props.modalStatus)
        const dataDetailValue = ref()
        const setModalVisible = () => {
            statusModal.value = false
            emit("closePopup", false)
        };
        const requestCallDetail: any = ref({
            companyId: companyId,
            processKey: props.processKey,
            incomeId: 0
        })

        store.dispatch('common/getListEmployee', {
            companyId: companyId,
            imputedYear: globalYear,
        })
        const arrayEmploySelect = ref(store.state.common.arrayEmployeePA410)
        // =========================  GRAPQL =================================================
        const {
            mutate,
            onDone,
            onError,
        } = useMutation(mutations.updateIncomeRetirement);
        onDone(() => {
            notification('success', `업데이트 완료!`)
            emit("closePopup", false)
            emit("updateSuccess", true)
        })
        onError((e: any) => {
            notification('error', e.message)
        })

        const { refetch: refetchGetDetail, onError: errorGetDetail, onResult: resultGetDetail } = useQuery(queries.getIncomeRetirement, requestCallDetail, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        resultGetDetail(newValue => {
          if (newValue) {
            let checkBoxCallApi = true
            
            
            // if prevRetiredYearsOfService or prevRetirementBenefitStatus is null then assign it with a default value
            if (newValue.data.getIncomeRetirement.specification.specificationDetail.prevRetiredYearsOfService == null) {
              checkBoxCallApi = false
              newValue.data.getIncomeRetirement.specification.specificationDetail.prevRetiredYearsOfService = dataDefaultDetailUtils.specification.specificationDetail.prevRetiredYearsOfService
            }
            if (newValue.data.getIncomeRetirement.specification.specificationDetail.prevRetirementBenefitStatus == null) {
              checkBoxCallApi = false
              newValue.data.getIncomeRetirement.specification.specificationDetail.prevRetirementBenefitStatus = dataDefaultDetailUtils.specification.specificationDetail.prevRetirementBenefitStatus
            }
            dataDetailValue.value =
            {
                ...newValue.data.getIncomeRetirement,
                "checkBoxCallApi": checkBoxCallApi,
            }
            console.log(dataDetailValue.value ,'dddddddđ');
          }
        })
        errorGetDetail(res => {
            notification('error', res.message)
        })
        // ================WATCHING============================================ 
        watch(() => props.modalStatus, (newValue) => {
            requestCallDetail.value.incomeId = props.keyRowIndex
            statusModal.value = newValue
            trigger.value = true
            refetchGetDetail()
        }, { deep: true })
        // =========================  FUNCTION =============================================== 
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
        const changeStep = (stepChange: any) => {
            step.value = stepChange
        }
        const nextStep = () => {
            if (step.value == 0)
                valueNextStep.value++
            else if (step.value == 1)
                step.value++
        }
        const prevStep = () => {
            step.value--
        }
        const updated = () => {
          let dataDefault = dataDetailValue.value.specification
          console.log(dataDefault)
            
            let dataCallApiUpdate =
            {
                "companyId": companyId,
                "processKey": props.processKey,
                "incomeId": props.keyRowIndex,
                "input": {
                    retirementType: dataDetailValue.value.retirementType,
                    executive: dataDefault.executive,
                    retirementReason: dataDefault.retirementReason,
                },
                "incomeCalculationInput": {
                    "totalPay3Month": dataDefault.totalPay3Month,
                    "totalAnualBonus": dataDefault.totalAnualBonus,
                    "annualLeaveAllowance": dataDefault.annualLeaveAllowance,
                    "settlementStartDate": dataDefault.specificationDetail.settlementRetiredYearsOfService.settlementStartDate,
                    "settlementFinishDate": dataDefault.specificationDetail.settlementRetiredYearsOfService.settlementFinishDate,
                    "exclusionDays": dataDefault.specificationDetail.settlementRetiredYearsOfService.exclusionDays,
                    "additionalDays": dataDefault.specificationDetail.settlementRetiredYearsOfService.additionalDays
                },
                "taxCalculationInput": {
                    "calculationOfDeferredRetirementIncomeTax": {
                        "totalAmount": dataDefault.specificationDetail.calculationOfDeferredRetirementIncomeTax.totalAmount,
                        "statements": [...dataDefault.specificationDetail.calculationOfDeferredRetirementIncomeTax.statements]
                    },
                    "prePaidDelayedTaxPaymentTaxAmount": dataDefault.specificationDetail.taxAmountCalculation.prePaidDelayedTaxPaymentTaxAmount,
                    "taxCredit": dataDefault.specificationDetail.taxAmountCalculation.taxCredit,
                    "lastRetiredYearsOfService": dataDefault.specificationDetail.lastRetiredYearsOfService,
                    "prevRetiredYearsOfService": dataDefault.specificationDetail.prevRetiredYearsOfService,
                    "lastRetirementBenefitStatus": dataDefault.specificationDetail.lastRetirementBenefitStatus,
                    "prevRetirementBenefitStatus": dataDefault.specificationDetail.prevRetirementBenefitStatus
                }
            }
            // remove all row name : __typename
            const cleanData = JSON.parse(
              JSON.stringify(dataCallApiUpdate, (name, val) => {
                if (
                  name === "__typename" || 
                  (!dataDetailValue.value.checkBoxCallApi && (name === "prevRetirementBenefitStatus" || name === "prevRetiredYearsOfService"))
                ) {
                    delete val[name];
                } else {
                    return val;
                }
              })
            );
            mutate(cleanData)
        }
        return {
            setModalVisible,
            changeStep,
            nextStep, prevStep, updated,
            checkStepTwo,
            checkStepThree,
            checkStepFour,
            step,
            dayValue,
            retirementIncome1,
            retirementIncome2,
            statusModal,
            dataDetailValue,
            valueNextStep,
            arrayEmploySelect
        }
    },
})
</script>
<style lang="scss" scoped src="../style/modalAdd.scss">

</style> 
