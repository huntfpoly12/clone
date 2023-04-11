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
              <template v-if="step === 0">
                  <Tab1  @closePopup="setModalVisible"
                      :actionNextStep="valueNextStep" @nextPage="step++" :processKey="processKey" :arrayEmploySelect="arrayEmploySelect"/>
              </template>

              <template v-if="step === 1">
                  <Tab2  />
              </template>

              <template v-if="step === 2">
                  <Tab3  ref="formEditTab3"/>
              </template>
        </div>
        <div style="justify-content: center;" class="pt-10 wf-100 d-flex-center">
            <button-basic text="이전" type="default" mode="outlined" class="mr-5" @onClick="prevStep" v-if="step != 0" />
            <button-basic text="다음" type="default" mode="contained" @onClick="nextStep" v-if="step < 2" />
            <button-basic text="저장" type="default" mode="contained" @onClick="updated" v-if="step === 2" />
        </div>
    </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, onUpdated, onUnmounted } from 'vue'
import notification from "@/utils/notification";
import { companyId } from '@/helpers/commonFunction';
import { useMutation, useQuery } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA4/PA420/index"
import Tab1 from './TabEdit/Tab1.vue';
import Tab2 from './TabEdit/Tab2.vue';
import Tab3 from './TabEdit/Tab3.vue';
import queries from "@/graphql/queries/PA/PA4/PA420/index";
import queriescm130 from "@/graphql/queries/CM/CM130/index";
import { useStore } from 'vuex';
import comfirmClosePopup from '@/utils/comfirmClosePopup';
import {Message} from "@/configs/enum";

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
        const formEditTab3 = ref()
        const store = useStore();
        const globalYear = computed(() => store.state.settings.globalYear)
        const step = ref(9)
        const valueNextStep = ref(0)
        const dayValue = ref(1)
        const retirementIncome1 = ref(true)
        const retirementIncome2 = ref(true)
        const isDataFormChange = ref(false)
        const trigger = ref(false)
        const statusModal = ref(props.modalStatus)
        const requestCallDetail: any = ref({
            companyId: companyId,
            processKey: props.processKey,
            incomeId: 0
        })
        const  firstLoad = ref(0)
        store.dispatch('common/getListEmployee', {
            companyId: companyId,
            imputedYear: globalYear,
        })
        const arrayEmploySelect = ref(store.state.common.arrayEmployeePA410)
        // =========================  GRAPQL =================================================
        // query get config from screen cm-130
        const {
              loading: loadingConfig,
              result: resultConfig,
            } = useQuery(
              queriescm130.getWithholdingConfig,
              {
                companyId:companyId,
                imputedYear:globalYear
              },
              () => ({
                  fetchPolicy: "no-cache",
              })
        );

        watch(resultConfig,(resConfig)=>{
          if (resConfig) {
            store.state.common.paymentDayPA420 = resConfig.getWithholdingConfig.paymentDay;
          }
        })

        const {
            mutate,
            onDone,
            onError,
        } = useMutation(mutations.updateIncomeRetirement);
        onDone(() => {
            notification('success', Message.getCommonMessage('106').message)
            emit("closePopup", false)
            emit("updateSuccess", true)
        })
        onError((e: any) => {
            notification('error', e.message)
        })

        const { loading,refetch: refetchGetDetail, onError: errorGetDetail, onResult: resultGetDetail } = useQuery(queries.getIncomeRetirement, requestCallDetail, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        resultGetDetail( async(newValue) => {
          if (newValue && newValue.data) {
            let checkBoxCallApi = true
            // if prevRetiredYearsOfService or prevRetirementBenefitStatus is null then assign it with a default value
            if (newValue.data.getIncomeRetirement.specification.specificationDetail.prevRetiredYearsOfService == null) {
              checkBoxCallApi = false
              newValue.data.getIncomeRetirement.specification.specificationDetail.prevRetiredYearsOfService = {
                settlementStartDate: null,
                settlementFinishDate: null,
                paymentDate: null,
                exclusionDays:0,
                additionalDays:0,
              }
            }
            if (newValue.data.getIncomeRetirement.specification.specificationDetail.prevRetirementBenefitStatus == null) {
              checkBoxCallApi = false
              newValue.data.getIncomeRetirement.specification.specificationDetail.prevRetirementBenefitStatus = {
                retirementBenefits: 0,
                nonTaxableRetirementBenefits: 0,
                taxableRetirementBenefits: 0
              }
            }
            await store.dispatch("common/setFormStateEditPA420", {
                ...newValue.data.getIncomeRetirement,
                "checkBoxCallApi": checkBoxCallApi,
            });

            firstLoad.value = 0
            trigger.value = false
            step.value = 0
          }
        })
        errorGetDetail(res => {
            notification('error', res.message)
        })
        // ================WATCHING============================================
        watch(() => store.state.common.formStateEditPA420, (newValue, oldValue) => {
          if (Object.keys(oldValue).length !== 0 && firstLoad.value >0) {
            isDataFormChange.value = true
          }
          firstLoad.value++
         }, { deep: true })

        watch(() => props.modalStatus, (newValue) => {
            requestCallDetail.value.incomeId = props.keyRowIndex
            statusModal.value = newValue
            if (newValue) {
              trigger.value = true
              refetchGetDetail()
              firstLoad.value = 0
            }
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
            let dataDefault = store.state.common.formStateEditPA420.specification
            // validate datepicker tab 3
            let statements = dataDefault.specificationDetail.calculationOfDeferredRetirementIncomeTax.statements;
            let dtValidate = true
            if (formEditTab3.value.isReqStatements1 && statements.length > 0 && statements[0].depositDate == null) {
                formEditTab3.value.statements1Ref.validate(true)
                dtValidate = false
            } else {
                formEditTab3.value.statements1Ref.validate(false)
            }
            if (formEditTab3.value.isReqStatements2 && statements.length > 1 && statements[1].depositDate == null) {
                formEditTab3.value.statements2Ref.validate(true)
                dtValidate = false
            } else {
                formEditTab3.value.statements2Ref.validate(false)
            }

            // validate form tab 3
            const  validForm3 =   formEditTab3.value.tab3EditForm.validate();
            if (!validForm3.isValid ) {
                validForm3.brokenRules[0].validator.focus();
            } else if (!dtValidate) {
                    dtValidate = true
            } else {

                let dataCallApiUpdate =
                {
                    "companyId": companyId,
                    "processKey": props.processKey,
                    "incomeId": props.keyRowIndex,
                    "input": {
                        retirementType: store.state.common.formStateEditPA420.retirementType,
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
                        (!store.state.common.formStateEditPA420.checkBoxCallApi && (name === "prevRetirementBenefitStatus" || name === "prevRetiredYearsOfService"))
                    ) {
                        delete val[name];
                    } else {
                        return val;
                    }
                    })
                );
                mutate(cleanData)
            }
        }

        const setModalVisible = () => {
          if (isDataFormChange.value)
          {
            comfirmClosePopup(() => {
              emit("closePopup", false);
              statusModal.value = false;
              isDataFormChange.value = false;
            })
          }else{
              emit("closePopup", false);
              statusModal.value = false;
              isDataFormChange.value = false;

          }

        };
        return {
            formEditTab3,
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
            valueNextStep,
            arrayEmploySelect,store,loading
        }
    },
})
</script>
<style lang="scss" scoped src="../style/modalAdd.scss">

</style>
