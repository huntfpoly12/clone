<template>
    <a-row :gutter="16">
        <a-col :span="6"></a-col>
        <a-col :span="12" class="custom-label">
            <div class="header-text-2 mb-10">급여/상여/수당</div>
            <a-form-item label="퇴직전 3개월 임금 총액 (세전)">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="200px"
                        v-model:valueInput="dataGet.specification.totalPay3Month" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="연간 상여금 총액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="200px"
                        v-model:valueInput="dataGet.specification.totalAnualBonus" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="연차수당">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="200px"
                        v-model:valueInput="dataGet.specification.annualLeaveAllowance" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>

            <div class="d-flex mt-20 mb-20 wf-100">
                <div class="d-flex-center" style="margin: 0 auto;">
                    <button-basic text="퇴직금 계산" type="default" mode="contained" @onClick="calculateIncomeRetirement" />
                    <div class="ml-5 d-flex-center">
                        <a-tooltip placement="top" class="custom-tooltip">
                            <template #title>
                                상기 급여(수당)으로 퇴직금 계산합니다.
                            </template>
                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                        </a-tooltip>
                    </div>
                </div>
            </div>

            <div class="header-text-2 mb-10">퇴직급여</div>
            <a-form-item label="퇴직급여(예상)">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="200px" disabled="true"
                        v-model:valueInput="dataGet.specification.expectedRetirementBenefits" />
                    <span class="pl-5 mr-5">원</span>
                    <a-tooltip placement="top" class="custom-tooltip">
                        <template #title>
                            상기 급여(수당)으로 계산된 퇴직금으로 실제 지급된 퇴직금과는 상이할 수 있습니다.
                        </template>
                        <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                    </a-tooltip>
                </div>
            </a-form-item>
            <a-form-item label="퇴직급여(확정)">
                <div
                    :class="dataGet.specification.expectedRetirementBenefits !== dataGet.specification.definedRetirementBenefits ? 'd-flex-center custom-input-number' : 'd-flex-center'">
                    <number-box-money :required="false" width="200px"
                        v-model:valueInput="dataGet.specification.definedRetirementBenefits" />
                    <span class="pl-5 mr-5">원</span>
                    <a-tooltip placement="top" class="custom-tooltip">
                        <template #title>
                            실제 지급된 퇴직급여를 입력합니다.
                        </template>
                        <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                    </a-tooltip>
                </div>
            </a-form-item>
        </a-col>
    </a-row>
</template>


<script lang="ts">
import { defineComponent, ref, watch, reactive } from 'vue'
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA4/PA420/index";
import { companyId } from '@/helpers/commonFunction';
import dayjs from "dayjs";
export default defineComponent({
    props: {
        dataDetail: Object,
        actionNextStep: Number,
    },

    setup(props, { emit }) {
        const trigger = ref(false)
        const dataGet: any = ref({
            ...props.dataDetail
        })

        let requestCallDetail: any = ref()

        const calculateIncomeRetirement = () => {
            trigger.value = true
            requestCallDetail.value = {
                companyId: companyId,
                input: {
                    settlementStartDate: parseInt(dayjs(dataGet.value.specification.specificationDetail.settlementRetiredYearsOfService.settlementStartDate).format("YYYYMMDD")),
                    settlementFinishDate: parseInt(dayjs(dataGet.value.specification.specificationDetail.settlementRetiredYearsOfService.settlementFinishDate).format("YYYYMMDD")),
                    exclusionDays: dataGet.value.specification.specificationDetail.prevRetiredYearsOfService.exclusionDays + dataGet.value.specification.specificationDetail.lastRetiredYearsOfService.exclusionDays,
                    additionalDays: dataGet.value.specification.specificationDetail.lastRetiredYearsOfService.additionalDays + dataGet.value.specification.specificationDetail.prevRetiredYearsOfService.additionalDays,
                    totalPay3Month: dataGet.value.specification.totalPay3Month,
                    totalAnualBonus: dataGet.value.specification.totalAnualBonus,
                    annualLeaveAllowance: dataGet.value.specification.annualLeaveAllowance
                }
            }
            if (requestCallDetail.value)
                refetChcalculate()
        }

        const { refetch: refetChcalculate, onError: errorCalculate, result: resultCalculate } = useQuery(queries.calculateIncomeRetirement, requestCallDetail, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));

        watch(() => resultCalculate, (newValue) => {
            if (newValue.value)
                dataGet.value.specification.expectedRetirementBenefits = newValue.value.calculateIncomeRetirement
        }, { deep: true })

        watch(() => dataGet, (newValue) => {
            emit("update:dataDetail", newValue);
        }, { deep: true })



        return {
            dataGet,
            calculateIncomeRetirement
        }
    }
})
</script>


<style lang="scss" scoped src="../../style/modalAdd.scss">

</style>
<style scoped lang="scss">
::v-deep label {
    min-width: 250px !important;
}

::v-deep .custom-input-number .dx-texteditor-input {
    color: red;
}
</style>