<template>
    <standard-form action="" name="add-page-110" style="border: 1px solid #d7d7d7; padding: 10px;">
        <a-row>
            <a-col :span="12">
                <a-form-item label="사원">
                    <EmploySelect :arrayValue="arrayEmploySelect"
                        v-model:valueEmploy="dataIncomeWage.employee.employeeId" width="290px" :required="true" />
                </a-form-item>
                <a-form-item label="지급일">
                    <a-form-item label="지급일">
                        <number-box width="200px" :required="true" :min="1" v-model="dataIncomeWage.paymentDay"
                            :max="31" :spinButtons="true" />
                    </a-form-item>
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <div class="top-content">
                    <a-typography-title :level="5" style="margin-bottom: 0;">요약</a-typography-title>
                </div>
                <a-form-item label="소득수당 합계  ">
                    <text-number-box :disabled="true" v-model:valueInput="dataIncomeWage.workingDays" width="200px"
                        :required="true" />
                </a-form-item>
                <a-form-item label="수당 과세 합계  ">
                    <text-number-box :disabled="true" v-model:valueInput="dataIncomeWage.totalTaxPay" width="200px"
                        :required="true" />
                </a-form-item>
                <a-form-item label="수당 비과세 합계  ">
                    <text-number-box :disabled="true" v-model:valueInput="dataIncomeWage.totalTaxfreePay" width="200px"
                        :required="true" />
                </a-form-item>
                <a-form-item label="공제 합계   ">
                    <text-number-box :disabled="true" v-model:valueInput="dataIncomeWage.totalDeduction" width="200px"
                        :required="true" />
                </a-form-item>
                <a-form-item label="차인지급액 ">
                    <text-number-box :disabled="true" v-model:valueInput="dataIncomeWage.actualPayment" width="200px"
                        :required="true" />
                    <img src="@/assets/images/iconInfo.png" style="width: 16px;" />
                    <span>
                        차인지급액 = 수당 합계 - 공제 합계

                    </span>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <div class="top-content">
                    <a-typography-title :level="5" style="margin-bottom: 0;">급여 / 공제</a-typography-title>
                </div>
            </a-col>

            <a-col :span="12" style="padding-leftt: 5px;">
                <div class="top-content">
                    <a-typography-title :level="5" style="margin-bottom: 0;">월급여 원</a-typography-title>
                </div>
                <a-spin :spinning="loadingPayItem" size="large">
                    <div class="deduction-main">
                        <div v-for="(item, index) in arrPayItem" :key="index" class="custom-deduction">
                            <span>
                                <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode != 2"
                                    :name="item.name" :type="1" subName="과세" />
                                <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode == 2"
                                    :name="item.name" :type="2" subName="상여(과세)" />
                                <deduction-items v-if="!item.taxPayItemCode && item.taxfreePayItemCode"
                                    :name="item.name" :type="3"
                                    :subName="item.taxfreePayItemCode + ' ' + item.taxfreePayItemName + ' ' + item.taxFreeIncludeSubmission" />
                                <deduction-items v-if="item.taxPayItemCode == null && item.taxfreePayItemCode == null"
                                    :name="item.name" :type="4" subName="과세" />
                            </span>
                            <div>
                                <number-box-money min="0" width="150px" :spinButtons="false"
                                    v-model:valueInput="item.price" />
                                <span class="pl-5">원</span>
                            </div>
                        </div>
                    </div>
                </a-spin>
            </a-col>
            <a-col :span="12" style="padding-leftt: 5px;">
                <div class="top-content">
                    <a-typography-title :level="5" style="margin-bottom: 0;">월급여 원</a-typography-title>
                </div>
                <a-spin :spinning="loadingDeductionItem" size="large">
                    <div class="deduction-main">
                        <div v-for="(item, index) in arrDeduction" :key="index" class="custom-deduction">
                            <span>
                                <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode != 2"
                                    :name="item.name" :type="1" subName="과세" />
                                <deduction-items v-if="item.taxPayItemCode && item.taxPayItemCode == 2"
                                    :name="item.name" :type="2" subName="상여(과세)" />
                                <deduction-items v-if="!item.taxPayItemCode && item.taxfreePayItemCode"
                                    :name="item.name" :type="3"
                                    :subName="item.taxfreePayItemCode + ' ' + item.taxfreePayItemName + ' ' + item.taxFreeIncludeSubmission" />
                                <deduction-items v-if="item.taxPayItemCode == null && item.taxfreePayItemCode == null"
                                    :name="item.name" :type="4" subName="과세" />
                            </span>
                            <div>
                                <number-box-money min="0" width="150px" :spinButtons="false"
                                    v-model:valueInput="item.price" />
                                <span class="pl-5">원</span>
                            </div>
                        </div>
                    </div>
                </a-spin>
            </a-col>
        </a-row>
        <div class="text-align-center mt-50">
            <DxButton @click="modalDeductions = true" :text="'공제 재계산'"
                :style="{ color: 'white', backgroundColor: 'gray' }" :height="'33px'" />
            <DxButton @click="modalInsurance = true" :text="'4대보험 EDI 조회/적용'"
                :style="{ color: 'white', backgroundColor: 'gray', margin: '0px 10px' }" :height="'33px'" />
            <DxButton @click="modalDeteleTaxpay = true" :text="'중도정산 삭제'"
                :style="{ color: 'white', backgroundColor: 'gray' }" :height="'33px'" />
        </div>
    </standard-form>
    <DeductionPopup :modalStatus="modalDeductions" @closePopup="modalDeductions = false" />
    <InsurancePopup :modalStatus="modalInsurance" @closePopup="modalInsurance = false" />
    <DeletePopupTaxPay :modalStatus="modalDeteleTaxpay" @closePopup="modalDeteleTaxpay = false" />
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch, reactive } from "vue";
import DxButton from "devextreme-vue/button"
import notification from "@/utils/notification";
import { useQuery, useMutation } from "@vue/apollo-composable"
import queries from "@/graphql/queries/PA/PA1/PA110/index"
import mutations from "@/graphql/mutations/PA/PA1/PA110/index"
import DeductionPopup from "./Popup/DeductionPopup.vue"
import InsurancePopup from "./Popup/InsurancePopup.vue"
import DeletePopupTaxPay from "./Popup/DeletePopupTaxPay.vue"
import { companyId } from "@/helpers/commonFunction"
import { useStore } from 'vuex'
export default defineComponent({
    components: {
        DxButton, DeductionPopup, InsurancePopup, DeletePopupTaxPay
    },
    props: {
        dataIncomeWage: {
            type: Object
        },
        arrayEmploySelect: {
            type: Array,
            default: []
        }
    },
    setup(props, { emit }) {
        const modalDeductions = ref<boolean>(false)
        const modalInsurance = ref<boolean>(false)
        const modalDeteleTaxpay = ref<boolean>(false)
        const dataIncomeWage: any = ref({ ...props.dataIncomeWage })
        watch(() => props.dataIncomeWage, (value) => {
            dataIncomeWage.value = value
        })

        const store = useStore()
        const globalYear = computed(() => store.state.settings.globalYear)
        const originData = ref({
            companyId: companyId,
            imputedYear: globalYear,
        })
        const arrDeduction: any = ref([])
        const arrPayItem: any = ref([])
        const {
            loading: loadingDeductionItem,
            onResult: resWithholdingConfigDeduction,
        } = useQuery(queries.getWithholdingConfigDeductionItems, originData, () => ({
            fetchPolicy: "no-cache",
        }))
        resWithholdingConfigDeduction(res => {
            res.data.getWithholdingConfigDeductionItems.map((val: any) => {
                let price = funcCheckPrice(val.itemCode)
                arrDeduction.value.push({
                    ...val,
                    price: price
                })
            })
        })
        const {
            loading: loadingPayItem,
            onResult: resWithholdingConfigPayItems,
        } = useQuery(queries.getWithholdingConfigPayItems, originData, () => ({
            fetchPolicy: "no-cache",
        }))
        resWithholdingConfigPayItems(res => {
            res.data.getWithholdingConfigPayItems.map((val: any) => {
                let price = funcCheckPrice(val.itemCode)
                arrPayItem.value.push({
                    ...val,
                    price: price
                })
            })
        })
        const { mutate: actionupdateIncomeWage, onDone: onDoneUpdated, onError: errorUpdate } = useMutation(
            mutations.updateIncomeWage
        );
        errorUpdate((error) => {
            notification('error', error.message)
        })
        onDoneUpdated(() => {
            notification('success', `업데이트 성공되었습니다!`)
        });
        const onSubmit = () => {
            let variables = {
                companyId: companyId,
                incomeId: dataIncomeWage,
                processKey: {
                    imputedYear: dataIncomeWage,
                    imputedMonth: dataIncomeWage,
                    paymentYear: dataIncomeWage,
                    paymentMonth: dataIncomeWage,
                },
                input: {
                    // dailyWage: 
                    // monthlyWage: 
                    // workingDays: 
                    // deductionItems: 
                }
            };
            actionupdateIncomeWage(variables)
        };
        const funcCheckPrice = (id: any) => {
            let price = 0
            dataIncomeWage.value.deductionItems?.map((e: any) => {
                if (e.itemCode == id)
                    price = e.amount
            })
            return price
        }
        return {
            dataIncomeWage,
            arrDeduction, arrPayItem,
            loadingDeductionItem, loadingPayItem,
            modalDeductions,
            modalInsurance, modalDeteleTaxpay
        };
    },
});
</script>
<style lang="scss" scoped  src="../style/style.scss" >

</style>