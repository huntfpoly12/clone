<template>
    <standard-form class="modal-add">
        <a-row :gutter="16">
            <a-col :span="12">
                <a-form-item label="구분">
                    <a-tag :color="dataForm.input.retirementType == 2 ? 'green' : 'red'">{{
                            dataForm.input.retirementType == 2 ? '중간정산' : '퇴직소득'
                    }}</a-tag>
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
                        v-model:valueInput="dataForm.input.paymentDay" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="사원" class="label-required">
                    <employ-select :arrayValue="arrayEmploySelect" :required="true"
                        v-model:valueEmploy="dataForm.input.employeeId" width="300px" />
                </a-form-item>

                <a-form-item label="입사일">
                    <div class="d-flex-center">
                        <date-time-box :required="false" width="150px" :disabled="true" :valueDate="dayjs(joinedAt).format('YYYY-MM-DD')" />
                        <div class="ml-5 d-flex-center">
                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            <span class="custom-waring">
                                수정이 필요한 경우 <b @click="openNewTab" style="cursor: pointer;">[사원등록]</b>에서 수정하시기 바랍니다.
                            </span>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="임원여부">
                    <switch-basic textCheck="X" textUnCheck="O" width="60px"
                        v-model:valueSwitch="dataForm.input.executive" />
                </a-form-item>
                <a-form-item label="퇴직사유" class="label-required">
                    <select-box-common :arrSelect="arrayReasonResignation" :required="true"
                        v-model:valueInput="dataForm.input.retirementReason" placeholder="영업자선택" width="300px" />
                </a-form-item>
            </a-col>
            <div class="header-text-1">근속연수</div>
            <a-col :span="24">
                <checkbox-basic size="13" label="중간지급여부" class="mb-10"
                    v-model:valueCheckbox="dataForm.checkBoxCallApi" />
            </a-col>
            <a-col :span="12">
                <div class="header-text-2 mb-10">중간지급 근속연수</div>
                <a-form-item label="정산시작(입사)일" class="label-required">
                    <div class="d-flex-center">
                        <date-time-box width="150px" dateFormat="YYYY-MM-DD" :disabled="!dataForm.checkBoxCallApi"
                            v-model:valueDate="dataForm.taxCalculationInput.prevRetiredYearsOfService.settlementStartDate" />
                        <div class="ml-5 d-flex-center">
                            <a-tooltip placement="top">
                                <template #title>퇴직소득 정산의 시작일(기산일)로서, 중간정산지급 등으로 인해 입사일과 상이할 수 있습니다.</template>
                                <div>
                                    <span><img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"
                                            class="mr-5"></span>
                                </div>
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="정산종료(퇴사)일" class="label-required">
                    <div class="d-flex-center">
                        <date-time-box width="150px" dateFormat="YYYY-MM-DD" :disabled="!dataForm.checkBoxCallApi"
                            v-model:valueDate="dataForm.taxCalculationInput.prevRetiredYearsOfService.settlementFinishDate" />
                        <div class="ml-5 d-flex-center">
                            <a-tooltip placement="top">
                                <template #title>퇴직소득 정산의 종료일로서, 중간정산지급인 경우 퇴사일과 상이할 수 있습니다.</template>
                                <div>
                                    <span><img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"
                                            class="mr-5"></span>
                                </div>
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="지급일">
                    <date-time-box :required="false" width="150px" :disabled="!dataForm.checkBoxCallApi"
                        v-model:valueDate="dataForm.taxCalculationInput.prevRetiredYearsOfService.paymentDate" />
                </a-form-item>
                <a-form-item label="제외일수">
                    <div class="d-flex-center">
                        <number-box :required="false" width="150px"
                            :disabled="!dataForm.checkBoxCallApi"
                            v-model:valueInput="dataForm.taxCalculationInput.prevRetiredYearsOfService.exclusionDays" />
                        <div class="ml-5 d-flex-center">
                            <a-tooltip placement="top">
                                <template #title>정산시작(기산)일 기준 제외일수만큼 뒤로 미뤄서 근속일수를 계산합니다.</template>
                                <div>
                                    <span><img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"
                                            class="mr-5"></span>
                                </div>
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="가산일수">
                    <div class="d-flex-center">
                        <number-box :required="false" width="150px"
                            :disabled="!dataForm.checkBoxCallApi"
                            v-model:valueInput="dataForm.taxCalculationInput.prevRetiredYearsOfService.additionalDays" />
                        <div class="ml-5 d-flex-center">
                            <a-tooltip placement="top">
                                <template #title>정산시작(기산)일 기준 가산일수만큼 앞으로 당겨서 근속일수를 계산합니다.</template>
                                <div>
                                    <span><img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"
                                            class="mr-5"></span>
                                </div>
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <div>
                    근속연수 / 근속월수 / 근속일수: {{ dataPrevRetiredYearsOfService.yearsOfService }}년/{{
                            dataPrevRetiredYearsOfService.monthsOfService
                    }}개월/{{ dataPrevRetiredYearsOfService.daysOfService
}}일
                </div>
            </a-col>
            <a-col :span="12">
                <div class="header-text-2 mb-10">최종 근속연수</div>
                <a-form-item label="정산시작(입사)일" class="label-required">
                    <div class="d-flex-center">
                        <date-time-box width="150px" dateFormat="YYYY-MM-DD"
                            v-model:valueDate="dataForm.taxCalculationInput.lastRetiredYearsOfService.settlementStartDate" />
                        <div class="ml-5 d-flex-center">
                            <a-tooltip placement="top">
                                <template #title>퇴직소득 정산의 시작일(기산일)로서, 중간정산지급 등으로 인해 입사일과 상이할 수 있습니다.</template>
                                <div>
                                    <span><img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"
                                            class="mr-5"></span>
                                </div>
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="정산종료(퇴사)일" class="label-required">
                    <div class="d-flex-center">
                        <date-time-box width="150px" dateFormat="YYYY-MM-DD"
                            v-model:valueDate="dataForm.taxCalculationInput.lastRetiredYearsOfService.settlementFinishDate" />
                        <div class="ml-5 d-flex-center">
                            <a-tooltip placement="top">
                                <template #title>퇴직소득 정산의 종료일로서, 중간정산지급인 경우 퇴사일과 상이할 수 있습니다.</template>
                                <div>
                                    <span><img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"
                                            class="mr-5"></span>
                                </div>
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="지급일">
                    <date-time-box :required="false" width="150px" v-model:valueDate="dataForm.taxCalculationInput.lastRetiredYearsOfService.paymentDate" />
                </a-form-item>
                <a-form-item label="제외일수">
                    <div class="d-flex-center">
                        <number-box :required="false" width="150px"
                            v-model:valueInput="dataForm.taxCalculationInput.lastRetiredYearsOfService.exclusionDays" />
                        <div class="ml-5 d-flex-center">
                            <a-tooltip placement="top">
                                <template #title>정산시작(기산)일 기준 제외일수만큼 뒤로 미뤄서 근속일수를 계산합니다.</template>
                                <div>
                                    <span><img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"
                                            class="mr-5"></span>
                                </div>
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="가산일수">
                    <div class="d-flex-center">
                        <number-box :required="false" width="150px"
                            v-model:valueInput="dataForm.taxCalculationInput.lastRetiredYearsOfService.additionalDays" />
                        <div class="ml-5 d-flex-center">
                            <a-tooltip placement="top">
                                <template #title>정산시작(기산)일 기준 가산일수만큼 앞으로 당겨서 근속일수를 계산합니다.</template>
                                <div>
                                    <span><img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"
                                            class="mr-5"></span>
                                </div>
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <div>
                    근속연수 / 근속월수 / 근속일수: {{ dataLastRetiredYearsOfService.yearsOfService }}년/{{
                            dataLastRetiredYearsOfService.monthsOfService
                    }}개월/{{ dataLastRetiredYearsOfService.daysOfService
}}일
                </div>
            </a-col>
            <a-col :span="12" class="mt-10 custom-label">
                <div class="header-text-2 mb-10">중간지급 퇴직급여</div>
                <a-form-item label="중간지급 퇴직급여">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px" :disabled="!dataForm.checkBoxCallApi"
                            v-model:valueInput="dataForm.taxCalculationInput.prevRetirementBenefitStatus.retirementBenefits" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="중간지급 비과세퇴직급여">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px" :disabled="!dataForm.checkBoxCallApi"
                            v-model:valueInput="dataForm.taxCalculationInput.prevRetirementBenefitStatus.nonTaxableRetirementBenefits" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="중간지급 과세대상 퇴직급여">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px" :disabled="!dataForm.checkBoxCallApi"
                            v-model:valueInput="dataForm.taxCalculationInput.prevRetirementBenefitStatus.taxableRetirementBenefits" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
            </a-col>
            <a-col :span="12" class="mt-10">
                <div class="header-text-2 mb-10">정산 근속연수</div>
                <a-form-item label="정산시작(입사)일" class="label-required">
                    <div class="d-flex-center">
                        <date-time-box width="150px" dateFormat="YYYY-MM-DD" v-model:valueDate="dataForm.incomeCalculationInput.settlementStartDate" />
                        <div class="ml-5 d-flex-center">
                            <a-tooltip placement="top">
                                <template #title>퇴직소득 정산의 시작일(기산일)로서, 중간정산지급 등으로 인해 입사일과 상이할 수 있습니다.</template>
                                <div>
                                    <span><img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"
                                            class="mr-5"></span>
                                </div>
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="정산종료(퇴사)일" class="label-required">
                    <div class="d-flex-center">
                        <date-time-box width="150px" dateFormat="YYYY-MM-DD" v-model:valueDate="dataForm.incomeCalculationInput.settlementFinishDate" />
                        <div class="ml-5 d-flex-center">
                            <a-tooltip placement="top">
                                <template #title>퇴직소득 정산의 종료일로서, 중간정산지급인 경우 퇴사일과 상이할 수 있습니다.</template>
                                <div>
                                    <span><img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;"
                                            class="mr-5"></span>
                                </div>
                            </a-tooltip>
                        </div>
                    </div>
                </a-form-item>
                <div>근속연수 / 근속월수 / 근속일수: {{ dataSettlement.yearsOfService }}년/{{ dataSettlement.monthsOfService }}개월/{{
                        dataSettlement.daysOfService
                }}일</div>
            </a-col>
        </a-row>
    </standard-form>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, reactive } from 'vue'
import dayjs from "dayjs";
import { arrayReasonResignationUtils } from '../../utils/index'
import { Formula } from "@bankda/jangbuda-common";
export default defineComponent({
    props: {
        dataForm: {
            type: Object,
            default: {}
        },
        arrayEmploySelect: {
            type: Array,
            default: []
        },
    },
    setup(props, { emit }) {
        const joinedAt = ref()

        let month1: any = ref(dayjs().format("YYYY-MM"))
        let month2: any = ref(dayjs().format("YYYY-MM"))

        const arrayReasonResignation = reactive([...arrayReasonResignationUtils])
        const dataPrevRetiredYearsOfService: any = ref({})
        const dataLastRetiredYearsOfService: any = ref({})
        const dataSettlement: any = ref({})
        // =============== GRAPQL ==================================


        // =============== WATCH ==================================
        watch(month1, (value) => {
            props.dataForm.processKey.imputedYear = parseInt(value.split('-')[0])
            props.dataForm.processKey.imputedMonth = parseInt(value.split('-')[1])
        });
        watch(month2, (value) => {
            props.dataForm.processKey.paymentYear = parseInt(value.split('-')[0])
            props.dataForm.processKey.paymentMonth = parseInt(value.split('-')[1])
        });

        // Prev
        watch(() => props.dataForm.taxCalculationInput.prevRetiredYearsOfService.settlementStartDate, (value: any) => {
            props.dataForm.incomeCalculationInput.settlementStartDate = value
        });

        watch(() => props.dataForm.taxCalculationInput.lastRetiredYearsOfService.settlementStartDate, (value: any) => {
            props.dataForm.incomeCalculationInput.settlementStartDate = value
        });
        watch(() => props.dataForm.taxCalculationInput.lastRetiredYearsOfService.settlementFinishDate, (value: any) => {
            props.dataForm.incomeCalculationInput.settlementFinishDate = value
        });

        watch(() => props.dataForm.input.employeeId, (value) => {
            let dataEmployee: any = props.arrayEmploySelect.find((element: any) => element.employeeId == value)
            props.dataForm.input.employeeType = dataEmployee?.type
            joinedAt.value = dataEmployee?.joinedAt
        });

        watch(() => props.dataForm.taxCalculationInput.prevRetiredYearsOfService, (value: any) => {
            dataPrevRetiredYearsOfService.value = Formula.getDateOfService(
                value.paymentStartDate,
                value.paymentFinishDate,
                value.exclusionDays,
                value.additionalDays
            );
        }, { deep: true });

        watch(() => props.dataForm.taxCalculationInput.lastRetiredYearsOfService, (value: any) => {   
            dataLastRetiredYearsOfService.value = Formula.getDateOfService(
                value.paymentStartDate,
                value.paymentFinishDate,
                value.exclusionDays,
                value.additionalDays
            );
        }, { deep: true });
        watch(() => [
            props.dataForm.incomeCalculationInput.settlementStartDate,
            props.dataForm.incomeCalculationInput.settlementFinishDate,
            props.dataForm.incomeCalculationInput.additionalDays,
            props.dataForm.incomeCalculationInput.exclusionDays,
        ], (value: any) => {
            dataSettlement.value = Formula.getDateOfService(
                props.dataForm.incomeCalculationInput.settlementStartDate,
                props.dataForm.incomeCalculationInput.settlementFinishDate,
                props.dataForm.incomeCalculationInput.exclusionDays,
                props.dataForm.incomeCalculationInput.additionalDays
            );
        }, { deep: true });

        watch(() => [
            props.dataForm.taxCalculationInput.prevRetiredYearsOfService.additionalDays,
            props.dataForm.taxCalculationInput.lastRetiredYearsOfService.additionalDays
        ], (value: any) => {
            props.dataForm.incomeCalculationInput.additionalDays = props.dataForm.taxCalculationInput.prevRetiredYearsOfService.additionalDays + props.dataForm.taxCalculationInput.lastRetiredYearsOfService.additionalDays
        })
        watch(() => [
            props.dataForm.taxCalculationInput.prevRetiredYearsOfService.exclusionDays,
            props.dataForm.taxCalculationInput.lastRetiredYearsOfService.exclusionDays
        ], (value: any) => {
            props.dataForm.incomeCalculationInput.exclusionDays = props.dataForm.taxCalculationInput.prevRetiredYearsOfService.exclusionDays + props.dataForm.taxCalculationInput.lastRetiredYearsOfService.exclusionDays
        })

        // =============== FUNCTION ================================
        const openNewTab = () => {
            window.open('pa-120')
        };
        return {
            month1, month2,
            arrayReasonResignation,
            openNewTab,
            joinedAt,
            dataPrevRetiredYearsOfService,
            dataLastRetiredYearsOfService,
            dataSettlement,
            dayjs,
        }
    }
})
</script>


<style lang="scss" scoped src="../../style/modalAdd.scss">

</style>