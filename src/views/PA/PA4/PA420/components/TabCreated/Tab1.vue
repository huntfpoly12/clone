<template>
    <standard-form class="modal-add">
        <a-row :gutter="16">
            <a-col :span="12">
                <a-form-item label="구분">
                    <a-tag :color="option1 ? 'green' : 'red'">퇴직소득</a-tag>
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
                    <number-box min="1" max="31" :required="true" width="150px" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="사원" class="label-required">
                    <employ-select :arrayValue="arrayEmploySelect" :required="true" v-model:valueEmploy="valueSelected"
                        width="300px" />
                </a-form-item>
                <a-form-item label="임원여부">
                    <switch-basic textCheck="X" textUnCheck="O" width="60px" />
                </a-form-item>
                <a-form-item label="입사일">
                    <div class="d-flex-center">
                        <number-box min="1" max="31" :required="false" width="150px" />
                        <div class="ml-5 d-flex-center">
                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            <span class="custom-waring">
                                수정이 필요한 경우 [사원등록]에서 수정하시기 바랍니다.
                            </span>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="퇴직사유" class="label-required">
                    <select-box-common :arrSelect="arrayReasonResignation" :required="true"
                        v-model:valueInput="valueReasonResignation" placeholder="영업자선택" width="300px" />
                </a-form-item>
            </a-col>
            <div class="header-text-1">근속연수</div>
            <a-col :span="24">
                <checkbox-basic size="13" label="중간지급여부" class="mb-10" />
            </a-col>
            <a-col :span="12">
                <div class="header-text-2 mb-10">근속연수</div>
                <a-form-item label="정산시작(입사)일" class="label-required">
                    <div class="d-flex-center">
                        <date-time-box width="150px" dateFormat="YYYY-MM-DD" />
                        <div class="ml-5 d-flex-center">
                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            <span class="custom-waring">
                                퇴직소득 정산의 시작일(기산일)로서, 중간정산지급 등으로 인해 입사일과 상이할 수 있습니다.
                            </span>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="정산종료(퇴사)일" class="label-required">
                    <div class="d-flex-center">
                        <date-time-box width="150px" dateFormat="YYYY-MM-DD" />
                        <div class="ml-5 d-flex-center">
                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            <span class="custom-waring">
                                퇴직소득 정산의 종료일로서, 중간정산지급인 경우 퇴사일과 상이할 수 있습니다.
                            </span>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="지급일">
                    <number-box min="1" max="31" :required="false" width="150px" />
                </a-form-item>
                <a-form-item label="제외일수">
                    <div class="d-flex-center">
                        <number-box min="1" max="31" :required="false" width="150px" />
                        <div class="ml-5 d-flex-center">
                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            <span class="custom-waring">
                                정산시작(기산)일 기준 제외일수만큼 뒤로 미뤄서 근속일수를 계산합니다.
                            </span>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="가산일수">
                    <div class="d-flex-center">
                        <number-box min="1" max="31" :required="false" width="150px" />
                        <div class="ml-5 d-flex-center">
                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            <span class="custom-waring">
                                정산시작(기산)일 기준 가산일수만큼 앞으로 당겨서 근속일수를 계산합니다.
                            </span>
                        </div>
                    </div>
                </a-form-item>
                <div>
                    근속연수 / 근속월수 / 근속일수: {근속연수}년/{근속월수}개월/{근속일수}일
                </div>
            </a-col>
            <a-col :span="12">
                <div class="header-text-2 mb-10">근속연수</div>
                <a-form-item label="정산시작(입사)일" class="label-required">
                    <div class="d-flex-center">
                        <date-time-box width="150px" dateFormat="YYYY-MM-DD" />
                        <div class="ml-5 d-flex-center">
                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            <span class="custom-waring">
                                퇴직소득 정산의 시작일(기산일)로서, 중간정산지급 등으로 인해 입사일과 상이할 수 있습니다.
                            </span>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="정산종료(퇴사)일" class="label-required">
                    <div class="d-flex-center">
                        <date-time-box width="150px" dateFormat="YYYY-MM-DD" />
                        <div class="ml-5 d-flex-center">
                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            <span class="custom-waring">
                                퇴직소득 정산의 종료일로서, 중간정산지급인 경우 퇴사일과 상이할 수 있습니다.
                            </span>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="지급일">
                    <number-box min="1" max="31" :required="false" width="150px" />
                </a-form-item>
                <a-form-item label="제외일수">
                    <div class="d-flex-center">
                        <number-box min="1" max="31" :required="false" width="150px" />
                        <div class="ml-5 d-flex-center">
                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            <span class="custom-waring">
                                정산시작(기산)일 기준 제외일수만큼 뒤로 미뤄서 근속일수를 계산합니다.
                            </span>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="가산일수">
                    <div class="d-flex-center">
                        <number-box min="1" max="31" :required="false" width="150px" />
                        <div class="ml-5 d-flex-center">
                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            <span class="custom-waring">
                                정산시작(기산)일 기준 가산일수만큼 앞으로 당겨서 근속일수를 계산합니다.
                            </span>
                        </div>
                    </div>
                </a-form-item>
                <div>
                    근속연수 / 근속월수 / 근속일수: {근속연수}년/{근속월수}개월/{근속일수}일
                </div>
            </a-col>
            <a-col :span="12" class="mt-10 custom-label">
                <div class="header-text-2 mb-10">중간지급 퇴직급여</div>
                <a-form-item label="중간지급 퇴직급여">
                    <div class="d-flex-center">
                        <number-box min="1" max="31" :required="false" width="150px" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="중간지급 비과세퇴직급여">
                    <div class="d-flex-center">
                        <number-box min="1" max="31" :required="false" width="150px" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
                <a-form-item label="중간지급 과세대상 퇴직급여">
                    <div class="d-flex-center">
                        <number-box min="1" max="31" :required="false" width="150px" />
                        <span class="pl-5">원</span>
                    </div>
                </a-form-item>
            </a-col>
            <a-col :span="12" class="mt-10">
                <div class="header-text-2 mb-10">정산 근속연수</div>
                <a-form-item label="정산시작(입사)일" class="label-required">
                    <div class="d-flex-center">
                        <date-time-box width="150px" dateFormat="YYYY-MM-DD" />
                        <div class="ml-5 d-flex-center">
                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            <span class="custom-waring">
                                퇴직소득 정산의 시작일(기산일)로서, 중간정산지급 등으로 인해 입사일과 상이할 수 있습니다.
                            </span>
                        </div>
                    </div>
                </a-form-item>
                <a-form-item label="정산종료(퇴사)일" class="label-required">
                    <div class="d-flex-center">
                        <date-time-box width="150px" dateFormat="YYYY-MM-DD" />
                        <div class="ml-5 d-flex-center">
                            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                            <span class="custom-waring">
                                퇴직소득 정산의 종료일로서, 중간정산지급인 경우 퇴사일과 상이할 수 있습니다.
                            </span>
                        </div>
                    </div>
                </a-form-item>
                <div>근속연수 / 근속월수 / 근속일수: {근속연수}년/{근속월수}개월/{근속일수}일</div>
            </a-col>
        </a-row>
    </standard-form>
</template>


<script lang="ts">
import { defineComponent, ref, watch, computed, reactive } from 'vue'
import dayjs from "dayjs";
import { useStore } from 'vuex';
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/PA/PA4/PA420/index";
import { companyId } from '@/helpers/commonFunction';
import { arrayReasonResignationUtils } from '../../utils/index'
export default defineComponent({
    props: {
        option1: Boolean,
        option2: Boolean,
        modalStatusAccept: Boolean,
    },
    setup(props, { emit }) {
        let valueSelected = ref()
        let month1: any = ref(dayjs().format("YYYY-MM"))
        let month2: any = ref(dayjs().format("YYYY-MM"))
        const store = useStore();
        const globalYear = computed(() => store.state.settings.globalYear)
        store.dispatch('common/getListEmployee', {
            companyId: companyId,
            imputedYear: globalYear,
        })
        const valueReasonResignation = ref(1)
        const arrayReasonResignation = reactive([...arrayReasonResignationUtils])
        const arrayEmploySelect = ref(store.state.common.arrayEmployeePA410)

        // =============== GRAPQL ==================================


        // =============== WATCH ==================================
        watch(valueSelected, (value) => {
            console.log(value);

        });
        watch(() => props.modalStatusAccept, (value) => {
            console.log(value);

        });


        // =============== FUNCTION ================================
        return {
            valueSelected,
            arrayEmploySelect,
            month1, month2,
            arrayReasonResignation,
            valueReasonResignation
        }
    }
})
</script>


<style lang="scss" scoped src="../../style/modalAdd.scss">

</style>