<template>
    <standard-form class="modal-add">
        <a-row :gutter="16">
            <a-col :span="12">
                <a-form-item label="구분">
                    <a-tag :color="dataGet.retirementType == 1 ? 'green' : 'red'">퇴직소득</a-tag>
                </a-form-item>
                <a-form-item label="귀속/지급연월">
                    <div class="d-flex-center">
                        <div class="month-custom-1 d-flex-center">
                            귀 <month-picker-box v-model:valueDate="month1" width="65px" class="mr-5 ml-5" />
                        </div>
                        <div class="month-custom-2 d-flex-center">
                            지 <month-picker-box v-model:valueDate="month2" class="ml-5" width="65px" />
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="지급일" class="label-required">
                    <number-box min="1" max="31" :required="true" width="150px"
                        v-model:valueInput="dataGet.paymentDay" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="사원" class="label-required">
                    <employ-select :arrayValue="arrayEmploySelect" v-model:valueEmploy="valueSelected" width="350px"
                        :required="true" disabled="true" />
                </a-form-item>
                <a-form-item label="입사일">
                    <div class="d-flex-center">
                        <date-time-box width="130px" disabled="true" :valueDate="dataGet.employee.joinedAt" />
                        <div class="ml-5 d-flex-center">
                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            <span class="custom-waring">
                                수정이 필요한 경우 <span style="cursor: pointer; color: blue;" @click="openTabFuc">[사원등록]
                                </span> 에서 수정하시기 바랍니다.
                            </span>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="임원여부">
                    <switch-basic textCheck="X" textUnCheck="O" width="60px"
                        v-model:valueSwitch="dataGet.specification.executive" />
                </a-form-item>
                <a-form-item label="퇴직사유" class="label-required">
                    <select-box-common :arrSelect="arrayReasonResignation" :required="true"
                        v-model:valueInput="dataGet.specification.retirementReason" placeholder="영업자선택" width="300px" />
                </a-form-item>
            </a-col>
            <div class="header-text-1">근속연수</div>
            <a-col :span="24">
                <checkbox-basic  label="중간지급여부" class="mb-10"
                    v-model:valueCheckbox="dataGet.checkBoxCallApi" />
            </a-col>
            <a-col :span="12">
                <div class="header-text-2 mb-10">중간지급 근속연수</div>
                <a-form-item label="정산시작(입사)일" :class="dataGet.checkBoxCallApi ? 'label-required' : ''">
                    <div class="d-flex-center">
                        <date-time-box width="150px" :disabled="!dataGet.checkBoxCallApi"
                            v-model:valueDate="dataGet.specification.specificationDetail.prevRetiredYearsOfService.settlementStartDate"
                            :required="true" />
                        <div class="ml-5 d-flex-center">
                            <a-tooltip placement="top" class="custom-tooltip">
                                <template #title>
                                    퇴직소득 정산의 시작일(기산일)로서, 중간정산지급 등으로 인해 입사일과 상이할 수 있습니다.
                                </template>
                                <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="정산종료(퇴사)일" :class="dataGet.checkBoxCallApi ? 'label-required' : ''">
                    <div class="d-flex-center">
                        <date-time-box-custom width="150px" :disabled="!dataGet.checkBoxCallApi"
                            v-model:valueDate="dataGet.specification.specificationDetail.prevRetiredYearsOfService.settlementFinishDate"
                            :required="true"
                            :startDate="dayjs(dataGet.specification.specificationDetail.prevRetiredYearsOfService.settlementStartDate?.toString())" />
                        <div class="ml-5 d-flex-center">
                            <a-tooltip placement="top" class="custom-tooltip">
                                <template #title>
                                    퇴직소득 정산의 종료일로서, 중간정산지급인 경우 퇴사일과 상이할 수 있습니다.
                                </template>
                                <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="지급일">
                    <date-time-box width="150px" :disabled="!dataGet.checkBoxCallApi"
                        v-model:valueDate="dataGet.specification.specificationDetail.prevRetiredYearsOfService.paymentDate"
                        :required="true" />
                </a-form-item>
                <a-form-item label="제외일수">
                    <div class="d-flex-center">
                        <number-box :required="false" width="150px" :disabled="!dataGet.checkBoxCallApi"
                            v-model:valueInput="dataGet.specification.specificationDetail.prevRetiredYearsOfService.exclusionDays" />
                        <div class="ml-5 d-flex-center">
                            <a-tooltip placement="top" class="custom-tooltip">
                                <template #title>
                                    정산시작(기산)일 기준 제외일수만큼 뒤로 미뤄서 근속일수를 계산합니다.
                                </template>
                                <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="가산일수">
                    <div class="d-flex-center">
                        <number-box :required="false" width="150px" :disabled="!dataGet.checkBoxCallApi"
                            v-model:valueInput="dataGet.specification.specificationDetail.prevRetiredYearsOfService.additionalDays" />
                        <div class="ml-5 d-flex-center">
                            <a-tooltip placement="top" class="custom-tooltip">
                                <template #title>
                                    정산시작(기산)일 기준 가산일수만큼 앞으로 당겨서 근속일수를 계산합니다.
                                </template>
                                <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <div>
                    근속연수 / 근속월수 / 근속일수:
                    {{ yearsOfService1.year }}년/
                    {{ yearsOfService1.month }}개월/
                    {{ yearsOfService1.day }}일
                </div>
            </a-col>
            <a-col :span="12">
                <div class="header-text-2 mb-10">최종 근속연수</div>
                <a-form-item label="정산시작(입사)일" class="label-required">
                    <div class="d-flex-center">
                        <date-time-box width="150px"
                            v-model:valueDate="dataGet.specification.specificationDetail.lastRetiredYearsOfService.settlementStartDate" />
                        <div class="ml-5 d-flex-center">
                            <a-tooltip placement="top" class="custom-tooltip">
                                <template #title>
                                    퇴직소득 정산의 시작일(기산일)로서, 중간정산지급 등으로 인해 입사일과 상이할 수 있습니다.
                                </template>
                                <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="정산종료(퇴사)일" class="label-required">
                    <div class="d-flex-center">
                        <date-time-box-custom width="150px"
                            :startDate="dayjs(dataGet.specification.specificationDetail.lastRetiredYearsOfService.settlementStartDate?.toString())"
                            v-model:valueDate="dataGet.specification.specificationDetail.lastRetiredYearsOfService.settlementFinishDate" />
                        <div class="ml-5 d-flex-center">
                            <a-tooltip placement="top" class="custom-tooltip">
                                <template #title>
                                    퇴직소득 정산의 종료일로서, 중간정산지급인 경우 퇴사일과 상이할 수 있습니다.
                                </template>
                                <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="지급일">
                    <date-time-box width="150px"
                        v-model:valueDate="dataGet.specification.specificationDetail.lastRetiredYearsOfService.paymentDate"
                        :required="true" />
                </a-form-item>
                <a-form-item label="제외일수">
                    <div class="d-flex-center">
                        <number-box :required="false" width="150px"
                            v-model:valueInput="dataGet.specification.specificationDetail.lastRetiredYearsOfService.exclusionDays" />
                        <div class="ml-5 d-flex-center">
                            <a-tooltip placement="top" class="custom-tooltip">
                                <template #title>
                                    정산시작(기산)일 기준 제외일수만큼 뒤로 미뤄서 근속일수를 계산합니다.
                                </template>
                                <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="가산일수">
                    <div class="d-flex-center">
                        <number-box :required="false" width="150px"
                            v-model:valueInput="dataGet.specification.specificationDetail.lastRetiredYearsOfService.additionalDays" />
                        <div class="ml-5 d-flex-center">
                            <a-tooltip placement="top" class="custom-tooltip">
                                <template #title>
                                    정산시작(기산)일 기준 가산일수만큼 앞으로 당겨서 근속일수를 계산합니다.
                                </template>
                                <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <div>
                    근속연수 / 근속월수 / 근속일수: {{ yearsOfService2.year }}년/{{ yearsOfService2.month }}개월/{{
                        yearsOfService2.day
                    }}일
                </div>
            </a-col>
            <a-col :span="12" class="mt-10 custom-label">
                <div class="header-text-2 mb-10">중간지급 퇴직급여</div>
                <a-form-item label="중간지급 퇴직급여">
                    <div class="d-flex-center">
                        <number-box :required="false" width="150px" :disabled="!dataGet.checkBoxCallApi"
                            v-model:valueInput="dataGet.specification.specificationDetail.prevRetirementBenefitStatus.retirementBenefits" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="중간지급 비과세퇴직급여">
                    <div class="d-flex-center">
                        <number-box :required="false" width="150px" :disabled="!dataGet.checkBoxCallApi"
                            v-model:valueInput="dataGet.specification.specificationDetail.prevRetirementBenefitStatus.nonTaxableRetirementBenefits" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="중간지급 과세대상 퇴직급여">
                    <div class="d-flex-center">
                        <number-box :required="false" width="150px" :disabled="!dataGet.checkBoxCallApi"
                            v-model:valueInput="dataGet.specification.specificationDetail.prevRetirementBenefitStatus.taxableRetirementBenefits" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
            </a-col>
            <a-col :span="12" class="mt-10">
                <div class="header-text-2 mb-10">정산 근속연수</div>
                <a-form-item label="정산시작(입사)일" class="label-required">
                    <div class="d-flex-center">
                        <date-time-box width="150px"
                            v-model:valueDate="dataGet.specification.specificationDetail.settlementRetiredYearsOfService.settlementStartDate" />
                        <div class="ml-5 d-flex-center">
                            <a-tooltip placement="top" class="custom-tooltip">
                                <template #title>
                                    퇴직소득 정산의 시작일(기산일)로서, 중간정산지급 등으로 인해 입사일과 상이할 수 있습니다.
                                </template>
                                <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="정산종료(퇴사)일" class="label-required">
                    <div class="d-flex-center">
                        <date-time-box width="150px"
                            v-model:valueDate="dataGet.specification.specificationDetail.settlementRetiredYearsOfService.settlementFinishDate" />
                        <div class="ml-5 d-flex-center">
                            <a-tooltip placement="top" class="custom-tooltip">
                                <template #title>
                                    퇴직소득 정산의 종료일로서, 중간정산지급인 경우 퇴사일과 상이할 수 있습니다.
                                </template>
                                <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <div>근속연수 / 근속월수 / 근속일수: {{ yearsOfService3.year }}년/{{ yearsOfService3.month }}개월/{{
                    yearsOfService3.day
                }}일</div>
            </a-col>
        </a-row>
        <button-basic text="이전" type="default" mode="outlined" class="mr-5" @onClick="submitForm" id="checkBox"
            style="display: none;" />
    </standard-form>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed, reactive } from 'vue'
import dayjs from "dayjs";
import { useStore } from 'vuex';
import { companyId, openTab } from '@/helpers/commonFunction';
import { arrayReasonResignationUtils, dataDefaultDetailUtils } from '../../utils/index'
import { Formula } from "@bankda/jangbuda-common";

export default defineComponent({
    props: {
        dataDetail: Object,
        actionNextStep: Number,
    },
    setup(props, { emit }) {
        let valueSelected = ref(17)
        let month1: any = ref(dayjs().format("YYYY-MM"))
        let month2: any = ref(dayjs().format("YYYY-MM"))

        let yearsOfService1 = reactive({
            day: 0,
            month: 0,
            year: 0
        })
        let yearsOfService2 = reactive({
            day: 0,
            month: 0,
            year: 0
        })
        let yearsOfService3 = reactive({
            day: 0,
            month: 0,
            year: 0
        })

        const dataGet: any = ref({
            ...dataDefaultDetailUtils
        })
        const store = useStore();
        const globalYear = computed(() => store.state.settings.globalYear)
        store.dispatch('common/getListEmployee', {
            companyId: companyId,
            imputedYear: globalYear,
        })
        const arrayReasonResignation = reactive([...arrayReasonResignationUtils])
        const arrayEmploySelect = ref([])
        const arrayEmploySelectCommon = reactive(store.state.common.arrayEmployeePA410)


        // =============== WATCH ==================================
        watch(() => props.dataDetail, (value: any) => {
            dataGet.value = value
            month1.value = dayjs(value.paymentYear + '-' + value.paymentMonth).format("YYYY-MM")
            setTimeout(() => {
                if (arrayEmploySelectCommon) {
                    arrayEmploySelect.value = JSON.parse(
                        JSON.stringify(arrayEmploySelectCommon, (name, val) => {
                            if (
                                // name !== "name" && name !== "updatedAt" && name != "status" && name != "stayQualification" && name != "type" && name != "employeeId"
                                name === "__typename"
                            ) {
                                delete val[name];
                            } else {
                                return val;
                            }
                        })
                    );
                }
            }, 100);
        }, { deep: true });

        watch(() => props.actionNextStep, (newVal) => {
            (document.getElementById("checkBox") as HTMLInputElement).click();
        });

        watch(() => dataGet.value.specification.specificationDetail.prevRetiredYearsOfService.settlementFinishDate, (newVal) => {
            dataGet.value.specification.specificationDetail.lastRetiredYearsOfService.settlementStartDate = newVal
        });

        watch(() => dataGet.value.specification.specificationDetail.prevRetiredYearsOfService, (newVal) => {
            let val1: any = newVal.settlementStartDate?.toString()
            let val2: any = newVal.settlementFinishDate?.toString()
            let objectData = Formula.getDateOfService(
                val1,
                val2,
                newVal.exclusionDays,
                newVal.additionalDays);

            yearsOfService1.day = objectData.daysOfService
            yearsOfService1.month = objectData.monthsOfService
            yearsOfService1.year = objectData.yearsOfService
        }, { deep: true });

        watch(() => dataGet.value.specification.specificationDetail.lastRetiredYearsOfService, (newVal) => {
            let val1: any = newVal.settlementStartDate?.toString()
            let val2: any = newVal.settlementFinishDate?.toString()
            let objectData = Formula.getDateOfService(
                val1,
                val2,
                newVal.exclusionDays,
                newVal.additionalDays);

            yearsOfService2.day = objectData.daysOfService
            yearsOfService2.month = objectData.monthsOfService
            yearsOfService2.year = objectData.yearsOfService
        }, { deep: true });

        watch(() => dataGet.value.specification.specificationDetail.settlementRetiredYearsOfService, (newVal) => {
            let val1: any = newVal.settlementStartDate?.toString()
            let val2: any = newVal.settlementFinishDate?.toString()

            let objectData = Formula.getDateOfService(
                val1,
                val2,
                (dataGet.value.specification.specificationDetail.prevRetiredYearsOfService.exclusionDays + dataGet.value.specification.specificationDetail.lastRetiredYearsOfService.exclusionDays),
                (dataGet.value.specification.specificationDetail.prevRetiredYearsOfService.additionalDays + dataGet.value.specification.specificationDetail.lastRetiredYearsOfService.additionalDays));

            yearsOfService3.day = objectData.daysOfService
            yearsOfService3.month = objectData.monthsOfService
            yearsOfService3.year = objectData.yearsOfService
        }, { deep: true });


        let indexChange = ref(0)
        watch(() => [
            dataGet.value.specification.specificationDetail.prevRetiredYearsOfService.settlementStartDate,
            dataGet.value.specification.specificationDetail.lastRetiredYearsOfService.settlementFinishDate,
            dataGet.value.specification.specificationDetail.lastRetiredYearsOfService.settlementStartDate, dataGet.value.checkBoxCallApi], ([newA, newB, newC, checkBoxNew], [prevA, prevB, prevC, checkBoxOld]) => {
                if (indexChange)
                    if (checkBoxNew == true) {
                        dataGet.value.specification.specificationDetail.settlementRetiredYearsOfService.settlementStartDate = newA
                        dataGet.value.specification.specificationDetail.settlementRetiredYearsOfService.settlementFinishDate = newB
                    } else {
                        dataGet.value.specification.specificationDetail.settlementRetiredYearsOfService.settlementStartDate = newC
                        dataGet.value.specification.specificationDetail.settlementRetiredYearsOfService.settlementFinishDate = newB
                    }
                indexChange.value++
            });
        // =============== FUNCTION ================================
        const openTabFuc = () => {
            emit('closePopup', true)
            openTab({ name: "일용직사원등록", url: "/dashboard/pa-520", id: "pa-520" })
        }

        const submitForm = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                emit('nextPage', true)
            }
        }

        return {
            yearsOfService1, yearsOfService2, yearsOfService3,
            valueSelected,
            arrayEmploySelect,
            month1, month2,
            arrayReasonResignation,
            dataGet,
            dayjs,
            openTabFuc,
            submitForm,
        }
    }
})
</script>
<style lang="scss" scoped src="../../style/modalAdd.scss">

</style>