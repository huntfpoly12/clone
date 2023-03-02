<template>
    <div id="tab2-pa520">
        <div class="header-text-1">공제</div>
        {{ dataDefaultGet }}------------------------------{{ originDataUpdate }}
        <a-row :gutter="16">
            <a-col :span="24">
                <a-form-item label="4대보험 공제 여부" label-align="right" class="ins-dedu">
                    <div class="d-flex-center">
                        <checkbox-basic size="14px" label="국민연금" class="check-box-tab1"
                            v-model:valueCheckbox="originDataUpdate.input.nationalPensionDeduction" :disabled="true"/>
                        <checkbox-basic size="14px" label="건강보험" class="check-box-tab1"
                            v-model:valueCheckbox="originDataUpdate.input.healthInsuranceDeduction" :disabled="true"/>
                        <checkbox-basic size="14px" label="고용보험" class="check-box-tab1"
                            v-model:valueCheckbox="originDataUpdate.input.employeementInsuranceDeduction" />
                        <div class="pr-5 pl-10">
                            <img src="@/assets/images/iconInfo.png" style="width: 16px;">
                        </div>
                        <span class="style-note" style="font-size: 10px; color: #888888">본 항목은 공제 계산을 위한 설정으로 실제 4대보험
                            <br> 신고 여부와는 무관합니다.
                        </span>
                    </div>
                </a-form-item>
            </a-col>
        </a-row>
        <a-row :gutter="16">
            <a-col :span="24">
              <div class="header-text-2">
                <a-row>
                  <a-col :span="14" >
                    두루누리사회보험 공제
                  </a-col>
                  <a-col :span="10" class="switch-bg">
                    <span>두루누리사회보험 공제 여부 :</span>
                    <switch-basic textCheck="Y" textUnCheck="N"
                        v-model:valueSwitch="originDataUpdate.input.insuranceSupport" class="switch-insurance"  :disabled="!insuranceSupport"/>
                  </a-col>
                </a-row>
              </div>

                <a-form-item label="국민연금 적용율" label-align="right" class="custom-style-label">
                    <radio-group :arrayValue="radioCheckPersenPension"
                        v-model:valueRadioCheck="originDataUpdate.input.nationalPensionSupportPercent"
                        layoutCustom="horizontal" :disabled="!originDataUpdate.input.insuranceSupport || !insuranceSupport" />
                </a-form-item>
                <a-form-item label="고용보험 적용율" label-align="right" class="custom-style-label">
                    <radio-group :arrayValue="radioCheckPersenPension"
                        v-model:valueRadioCheck="originDataUpdate.input.employeementInsuranceSupportPercent"
                        layoutCustom="horizontal" :disabled="!originDataUpdate.input.insuranceSupport || !insuranceSupport" />
                </a-form-item>
            </a-col>
        </a-row>
        <div class="header-text-3">급여 (기본값)
            <span>
                <img src="@/assets/images/iconInfoWrite.png" style="width: 16px;">
                <p style="font-size: 10px; font-weight: 400;">급여소득자료 입력시 본 급여 기본값을 불러옵니다</p>
            </span>
        </div>
        <a-row :gutter="16">
            <a-col :span="24"><b>차인지급액</b> <b>{{
                $filters.formatCurrency(originDataUpdate.input.monthlyWage -
                    totalDeduction)
            }} </b> 원
            </a-col>
        </a-row>
        <a-row :gutter="16">
            <a-col :span="10">
                <div class="header-text-0">
                    <span>
                      월급여{{ $filters.formatCurrency(originDataUpdate.input.monthlyWage) }} 원
                    </span>
                </div>
                <div>
                    <a-form-item label="일급/월급">
                        <div class="d-flex-center">
                            <switch-basic textCheck="일급" textUnCheck="월급" class="mr-10 custom-switch"
                                v-model:valueSwitch="originDataUpdate.input.monthlyPaycheck"/>
                            <number-box-money :min="0" width="100px" class="mr-5"
                                v-if="!originDataUpdate.input.monthlyPaycheck"
                                v-model:valueInput="originDataUpdate.input.monthlyWage" placeholder="월급여"
                                @changeInput="onChangeMonthlyWage" />
                            <number-box-money :min="0" width="100px" class="mr-5" v-else
                                v-model:valueInput="originDataUpdate.input.dailyWage" placeholder="일급여"
                                @changeInput="onChangeDailyWage" />
                        </div>
                    </a-form-item>
                    <div class="mb-5">
                        <img src="@/assets/images/iconInfo.png" style="width: 16px;">
                        <span class="pl-5 fz-11" style="font-size: 10px; color: #888888">
                            {{ originDataUpdate.input.monthlyPaycheck ? messageMonthlySalary : messageDaylySalary }}
                        </span>
                    </div>
                    <a-form-item label="근무일수">
                        <div class="d-flex-center">
                            <number-box width="170px" class="mr-5" 
                                v-model:valueInput="originDataUpdate.input.workingDays"
                                @changeInput="onChangeWorkingDays" :min="1" :max="31" />
                            <span class="ml-10">일</span>
                        </div>
                    </a-form-item>
                    <div>
                        일급여: <b> {{ $filters.formatCurrency(originDataUpdate.input.dailyWage) }} </b> 원
                    </div>
                    <div>
                        월급여: <b> {{ $filters.formatCurrency(originDataUpdate.input.monthlyWage) }} 원</b>
                    </div>
                </div>
            </a-col>
            <a-col :span="14">
                <div class="header-text-0"><span>공제 항목 {{ $filters.formatCurrency(totalDeduction) }}
                        원</span></div>
                <a-spin :spinning="loading" size="large">
                    <div class="deduction-main">
                        <div v-for="(item, index) in arrDeduction" class="custom-deduction" :key="index">
                            <span>
                                <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode != 2"
                                    :name="item.name" :type="1" subName="과세" width="100px" />
                                <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode == 2"
                                    :name="item.name" :type="2" subName="상여(과세)" width="100px" />
                                <deduction-items v-if="!item.taxPayItemCode && item.taxfreePayItemCode"
                                    :name="item.name" :type="3"
                                    :subName="item.taxfreePayItemCode + ' ' + item.taxfreePayItemName + ' ' + item.taxFreeIncludeSubmission" width="100px" />
                                <deduction-items v-if="item.taxPayItemCode == null && item.taxfreePayItemCode == null"
                                    :name="item.name" :type="4" subName="공제" width="100px" />
                            </span>
                            <div>
                                <number-box-money :min="0" width="150px" :spinButtons="false"
                                    v-model:valueInput="item.price" :disabled="true" />
                                <span class="pl-5">원</span>
                            </div>
                        </div>
                    </div>
                </a-spin>
            </a-col>
        </a-row>
        <div class="button-action">
            <button-basic text="공제계산" :type="typeCalculateColor" mode="contained"  @onClick="callFuncCalculate"/>
            <button-basic text="저장" type="default" mode="contained" class="ml-5" @onClick="updateDeduction"
                id="action-update" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { radioCheckPersenPension, originDataInputUpdate } from "../../utils/index";
import { useQuery, useMutation } from "@vue/apollo-composable"
import { useStore } from 'vuex';
import queries from "@/graphql/queries/PA/PA5/PA520/index"
import queriescm130 from "@/graphql/queries/CM/CM130/index";
import { companyId, calculateNationalPensionEmployee, calculateHealthInsuranceEmployee, calculateLongTermCareInsurance, calculateEmployeementInsuranceEmployee } from "@/helpers/commonFunction"
import mutations from "@/graphql/mutations/PA/PA5/PA520/index";
import notification from "@/utils/notification";
import { Formula } from "@bankda/jangbuda-common";
export default defineComponent({
    props: {
        modalStatus: Boolean,
        idRowEdit: Number
    },
    setup(props, { emit }) {
        let dataReturn = ref()
        const messageMonthlySalary = ref('일급 선택시, 월급 = 일급 x 근무일수');
        const messageDaylySalary = ref('월급 선택시, 일급 = 월급 / 근무일수');
        const store = useStore();
        const globalYear: any = computed(() => store.state.settings.globalYear);
        const totalDeduction = ref(0)
        const arrDeduction: any = ref()
        const insuranceSupport = ref(false)
        const typeCalculateColor = ref('default')
        const caculateDone = ref(false)
        
        const originData = ref({
            companyId: companyId,
            imputedYear: globalYear.value,
        })
        const originDataDetail = ref({
            companyId: companyId,
            imputedYear: globalYear.value,
            employeeId: props.idRowEdit
        })
        let originDataUpdate: any = ref({
            companyId: companyId,
            imputedYear: globalYear.value,
            employeeId: props.idRowEdit,
            input: {
                ...originDataInputUpdate
            },
        })
        let trigger = ref(false)
        let dataDefaultGet = ref()
        // ================== GRAPQL ====================================
        // query get config from screen cm-130
        const {
          result: resultConfig,
        } = useQuery(
              queriescm130.getWithholdingConfig,
              originData,
              () => ({
                  fetchPolicy: "no-cache",
              })
        );

        watch(resultConfig,(resConfig)=>{
          if (resConfig) {
            insuranceSupport.value = resConfig.getWithholdingConfig.insuranceSupport;
            originDataUpdate.value.input.insuranceSupport = resConfig.getWithholdingConfig.insuranceSupport;
          }
        })    
          
        const {
            loading: loading,
            onResult: resWithholdingConfigPayItems,
        } = useQuery(queries.getWithholdingConfigDeductionItems, originData, () => ({
            fetchPolicy: "no-cache",
        }))
        resWithholdingConfigPayItems(res => {
            arrDeduction.value = []
            res.data.getWithholdingConfigDeductionItems.map((val: any) => {
                if ([1001, 1002, 1003, 1004, 1011, 1012].includes(val.itemCode)) {
                    let price = funcCheckPrice(val.itemCode)
                    arrDeduction.value.push({
                        ...val,
                        price: price
                    })
                }
                    
            })
        })

        const {
            refetch: refectchDetail,
            onResult: resApiGetEmployeeWageDaily,
        } = useQuery(queries.getEmployeeWageDaily, originDataDetail, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }))

        resApiGetEmployeeWageDaily((e: any) => {
            trigger.value = false
            if (e.data) {
                let res = e.data.getEmployeeWageDaily
                originDataUpdate.value.employeeId = res.employeeId
                originDataUpdate.value.input.nationalPensionDeduction = res.nationalPensionDeduction
                originDataUpdate.value.input.healthInsuranceDeduction = res.healthInsuranceDeduction
                originDataUpdate.value.input.longTermCareInsuranceDeduction = res.longTermCareInsuranceDeduction
                originDataUpdate.value.input.employeementInsuranceDeduction = res.employeementInsuranceDeduction 
                originDataUpdate.value.input.insuranceSupport = res.insuranceSupport
                setTimeout(() => {
                    originDataUpdate.value.input.nationalPensionSupportPercent = res.nationalPensionSupportPercent == null ? 0 : res.nationalPensionSupportPercent
                    originDataUpdate.value.input.employeementInsuranceSupportPercent = res.employeementInsuranceSupportPercent == null ? 0 : res.employeementInsuranceSupportPercent
                }, 100);
                originDataUpdate.value.input.nationalPensionSupportPercent = res.nationalPensionSupportPercent
                originDataUpdate.value.input.employeementInsuranceSupportPercent = res.employeementInsuranceSupportPercent
                originDataUpdate.value.input.monthlyPaycheck = res.monthlyPaycheck
                originDataUpdate.value.input.workingDays = res.workingDays
                originDataUpdate.value.input.dailyWage = res.dailyWage
                originDataUpdate.value.input.monthlyWage = res.monthlyWage
                dataReturn.value = res.deductionItems
                // delay push data to form caculate 
                let dataAddDedution: any = []
                arrDeduction.value?.map((val: any) => {
                    let arrReturn = addDedution(val.itemCode)
                    if (arrReturn.itemCode) {
                        val.price = arrReturn.amount
                        dataAddDedution.push({ itemCode: arrReturn.itemCode, amount: arrReturn.amount })
                    } else {
                        val.price = 0
                        dataAddDedution.push({ itemCode: val.itemCode, amount: 0 })
                    }
                })
                if (dataAddDedution)
                    originDataUpdate.value.input.deductionItems = dataAddDedution
              dataDefaultGet.value = JSON.stringify(originDataUpdate.value)
            }
        })
        const {
            mutate,
            onError,
            onDone,
        } = useMutation(mutations.saveEmployeeWageDailyPayDeduction);
        onError(e => {
            notification('error', e.message)
        })
        onDone(() => {
            trigger.value = true
            refectchDetail()
            emit('closePopup', false)
            notification('success', '업그레이드가 완료되었습니다!')
        })
        // ================== WATCH ====================================
        watch(() => originDataUpdate.value, (newVal) => {
          let valueConvert = JSON.parse(dataDefaultGet.value)
            
          if (valueConvert.input.nationalPensionSupportPercent == null)
            valueConvert.input.nationalPensionSupportPercent = 0
          if (valueConvert.input.employeementInsuranceSupportPercent == null)
            valueConvert.input.employeementInsuranceSupportPercent = 0
                
          if (JSON.stringify(newVal) === JSON.stringify(valueConvert)) {
              store.state.common.checkStatusChangeValuePA520 = false
            } else {   
              store.state.common.checkStatusChangeValuePA520 = true
            }
        }, { deep: true })

        // Event change value default
        watch(() => originDataUpdate.value.input.insuranceSupport, (newVal) => {
            if (newVal == false) {
                originDataUpdate.value.input.nationalPensionSupportPercent = null
                originDataUpdate.value.input.employeementInsuranceSupportPercent = null
            } else {
                originDataUpdate.value.input.nationalPensionSupportPercent = 0
                originDataUpdate.value.input.employeementInsuranceSupportPercent = 0
            }
        }, { deep: true })
        // call api on tab 2 for the first time
        if (store.state.common.idRowChangePa520 != 0) {
            originDataDetail.value.employeeId = store.state.common.idRowChangePa520
            trigger.value = true
            refectchDetail()
        }
        // call api on tab 2 next time
        watch(() => store.state.common.idRowChangePa520, (res) => {
          if (!store.state.common.checkStatusChangeValuePA520) {
              originDataDetail.value.employeeId = store.state.common.idRowChangePa520
              trigger.value = true
              refectchDetail()
          }
          store.state.common.checkStatusChangeValuePA520 = false
        }, { deep: true })
        watch(() => arrDeduction, (res) => {
            let total = 0
            res.value.map((val: any) => {
                total += val.price
            })
            totalDeduction.value = total
        }, { deep: true })
        watch(() => store.state.common.actionSaveTab2PA520, (res) => {
            updateDeduction()
        }, { deep: true })

        // If checkbox 4대보험 공제 여부 change is call calculate function
        watch([
          () => originDataUpdate.value.input.nationalPensionDeduction,
          () => originDataUpdate.value.input.healthInsuranceDeduction,
          () => originDataUpdate.value.input.employeementInsuranceDeduction,], ([res1, res2, res3]) => {
            callFuncCalculate()
          })
        
        // if any change in tab 2 color button is change color orage
        watch([
          () => originDataUpdate.value.input.nationalPensionDeduction,
          () => originDataUpdate.value.input.healthInsuranceDeduction,
          () => originDataUpdate.value.input.employeementInsuranceDeduction,
          () => originDataUpdate.value.input.monthlyWage,
          () => originDataUpdate.value.input.workingDays
        ], () => {
          // delete item  no need in object , Just compare item watching
          let defValue = JSON.parse(dataDefaultGet.value).input;
          delete defValue.longTermCareInsuranceDeduction
          delete defValue.insuranceSupport
          delete defValue.nationalPensionSupportPercent
          delete defValue.employeementInsuranceSupportPercent
          delete defValue.monthlyPaycheck
          delete defValue.workingDays
          delete defValue.dailyWage
          delete defValue.deductionItems
          
          let originValue = JSON.parse(JSON.stringify(originDataUpdate.value.input));
          delete originValue.longTermCareInsuranceDeduction
          delete originValue.insuranceSupport
          delete originValue.nationalPensionSupportPercent
          delete originValue.employeementInsuranceSupportPercent
          delete originValue.monthlyPaycheck
          delete originValue.workingDays
          delete originValue.dailyWage
          delete originValue.deductionItems
          // Compare two object if different change button color to orange
          if (JSON.stringify(defValue) !== JSON.stringify(originValue)){
            typeCalculateColor.value = 'calculate'
          } else {
            typeCalculateColor.value = 'default'
          }
        })
        // ================== FUNCTION ==================================
        const updateDeduction = () => {
            mutate(originDataUpdate.value)
            store.state.common.checkStatusChangeValuePA520 = false
        }
        const callFuncCalculate = async () => {
            let dataDefault = originDataUpdate.value.input
            let total1 = dataDefault.nationalPensionDeduction == true ? calculateNationalPensionEmployee(dataDefault.monthlyWage, dataDefault.nationalPensionSupportPercent) : 0
            let total2 = dataDefault.healthInsuranceDeduction == true ? calculateHealthInsuranceEmployee(dataDefault.monthlyWage) : 0
            let total3 = dataDefault.healthInsuranceDeduction == true ? calculateLongTermCareInsurance(dataDefault.monthlyWage) : 0
            let total4 = dataDefault.employeementInsuranceDeduction == true ? calculateEmployeementInsuranceEmployee(dataDefault.monthlyWage, dataDefault.employeementInsuranceSupportPercent) : 0
            let total5 = await Formula.getDailyEmployeeTax(202210, dataDefault.workingDays, dataDefault.dailyWage, dataDefault.monthlyWage).incomeAmount
            let total6 = await Formula.getDailyEmployeeTax(202210, dataDefault.workingDays, dataDefault.dailyWage, dataDefault.monthlyWage).localIncomeTax
            let arrCallApi: any = []
            arrDeduction.value?.map((val: any) => {
                delete val.__typename
                if (val.deductionItemCode == 1001)
                    val.price = total1
                if (val.deductionItemCode == 1002)
                    val.price = total2
                if (val.deductionItemCode == 1003)
                    val.price = total3
                if (val.deductionItemCode == 1004)
                    val.price = total4
                if (val.deductionItemCode == 1011)
                    val.price = total5
                if (val.deductionItemCode == 1012)
                    val.price = total6
                arrCallApi.push({
                    itemCode: val.deductionItemCode,
                    amount: val.price
                })
            })
            originDataUpdate.value.input.deductionItems = arrCallApi
           
        }
        const funcCheckPrice = (id: any) => {
            let price = 0
            originDataUpdate.value.input.deductionItems.map((val: any) => {
                if (val.itemCode == id)
                    price = val.amount
            })
            return price
        }
        const addDedution = (id: any) => {
            let arrReturn: any = []
            dataReturn.value.map((val: any) => {
                if (id == val.itemCode) {
                    arrReturn = val
                    delete val.__typename
                }
            })
            return arrReturn
        }
        // LOGIC FORM
        const onChangeDailyWage = () => {
            let monthlyWage = Math.floor(originDataUpdate.value.input.dailyWage * (originDataUpdate.value.input.workingDays > 0 ?
                originDataUpdate.value.input.workingDays : 0));
            originDataUpdate.value.input.monthlyWage = monthlyWage;
        }
        const onChangeMonthlyWage = () => {
            let dailyWage = Math.floor(originDataUpdate.value.input.workingDays > 0 ? originDataUpdate.value.input.monthlyWage /
                originDataUpdate.value.input.workingDays : 0)
            originDataUpdate.value.input.dailyWage = dailyWage;
        }
      const onChangeWorkingDays = () => {
          if (originDataUpdate.value.input.monthlyPaycheck) {
                let monthlyWage = Math.floor(originDataUpdate.value.input.dailyWage * (originDataUpdate.value.input.workingDays > 0 ?
                    originDataUpdate.value.input.workingDays : 0));
                originDataUpdate.value.input.monthlyWage = monthlyWage;
          } else {
                let dailyWage = Math.floor(originDataUpdate.value.input.workingDays > 0 ? originDataUpdate.value.input.monthlyWage /
                    originDataUpdate.value.input.workingDays : 0)
                originDataUpdate.value.input.dailyWage = dailyWage;
            }
        }
        return {dataDefaultGet,
            store, originDataUpdate, messageMonthlySalary, totalDeduction, arrDeduction, radioCheckPersenPension, loading, messageDaylySalary,
            callFuncCalculate, updateDeduction, onChangeDailyWage, onChangeMonthlyWage, onChangeWorkingDays,caculateDone,insuranceSupport,typeCalculateColor
        };
    },
});
</script>
<style lang="scss" scoped src="../../style/tab2.scss">
</style>
