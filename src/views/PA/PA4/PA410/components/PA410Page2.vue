<template>
 <div class="page-content">
    <div class="content-page2">
        <a-spin :spinning="loading" size="large">
            <div class="select-employee">
                <div class="label">
                    사원
                </div>
                <div class="input-select">
                    <employ-select  :arrayValue="arrayEmployeeSelect"  v-model:valueEmploy="valueSelected" width="300px" :disabled="true"/>
                </div>
            </div>
            <div class="info-employee">
              <standard-form formName="formPA410" ref="formPA410">
                <a-row :gutter="16">
                    <a-col :span="12">
                        <div class="header-text-2">근속기간</div> 
                            <div class="input-employee">
                                <a-form-item label="정산시작(가산)일" label-align="right" class="red">
                                    <date-time-box  width="150px"  v-model:valueDate="formState.settlementStartDate" ref="payStart"></date-time-box>
                                </a-form-item>
                                <info-tool-tip placement="right">퇴직소득 정산의 시작일(기산일)로서, 중간정산지급 등으로 인해 입사일과 상이할 수 있습니다.</info-tool-tip>
                            </div> 
                            <div class="input-employee">
                                <a-form-item label="정산종료(퇴사)일" label-align="right" class="red">
                                    <date-time-box-custom  width="150px" v-model:valueDate="formState.settlementFinishDate" :startDate="dayjs(String(formState.settlementStartDate)).add(1, 'day')" ref="payEnd"></date-time-box-custom>
                                </a-form-item>  
                                <info-tool-tip placement="right">퇴직소득 정산의 종료일로서, 중간정산지급인 경우 퇴사일과 상이할 수 있습니다.</info-tool-tip>
                            </div>  
                            <div class="input-employee">
                                <a-form-item label="제외일수(일)" label-align="right">
                                  <div class="d-flex-center">
                                    <number-box  width="150px" :spinButtons="false" :rtlEnabled="true" v-model:valueInput="formState.exclusionDays"  format="0,###"> </number-box>  
                                  </div>
                                </a-form-item> 
                                <info-tool-tip placement="right">정산시작(기산)일 기준 제외일수만큼 뒤로 미뤄서 근속일수를 계산합니다.</info-tool-tip>
                            </div>
                            <div class="input-employee">
                                <a-form-item label="가산일수(일)" label-align="right">
                                  <div class="d-flex-center">
                                    <number-box  width="150px" :spinButtons="false" :rtlEnabled="true" v-model:valueInput="formState.additionalDays"  format="0,###"> </number-box>
                                  </div>
                                </a-form-item> 
                                <info-tool-tip placement="right">정산시작(기산)일 기준 가산일수만큼 앞으로 당겨서 근속일수를 계산합니다.</info-tool-tip>
                            </div> 
                    </a-col>
                    <a-col :span="12">
                        <div class="header-text-2">급여/상여/수당</div>
                        <div class="salary">
                            <div class="input-salary">
                                <a-form-item label="퇴직전 3개월 임금 총액 (세전)" label-align="right" class="red">
                                    <number-box-money  width="150px" :spinButtons="false" :rtlEnabled="true" v-model:valueInput="formState.totalPay3Month" :required="true" format="0,###"> </number-box-money>
                                </a-form-item>  
                                <span class="pl-5 pt-4">원</span>
                            </div>
                            <div class="input-salary">
                                <a-form-item label="연간 상여금 총액" label-align="right" class="red">
                                    <number-box-money  width="150px" :spinButtons="false" :rtlEnabled="true" v-model:valueInput="formState.totalAnualBonus" :required="true" format="0,###"> </number-box-money>
                                </a-form-item> 
                                <span class="pl-5 pt-4">원</span>
                            </div>
                            <div class="input-salary">
                                <a-form-item label="연차수당" label-align="right" class="red">
                                    <number-box-money  width="150px" :spinButtons="false" :rtlEnabled="true" v-model:valueInput="formState.annualLeaveAllowance" :required="true" format="0,###"> </number-box-money>
                                </a-form-item> 
                                <span class="pl-5 pt-4">원</span>
                            </div>
                        </div>
                    </a-col>
                </a-row>
                <div class="time-service">
                  <a-tag color="red" style="margin-left: 10px;margin-right: 39px;font-size: 14px;">근속연월일</a-tag>
                  <a-tag style="font-size: 14px;">{{dataLastRetiredYearsOfService.yearsOfService}}년/{{dataLastRetiredYearsOfService.monthsOfService}}개월/{{dataLastRetiredYearsOfService.daysOfService}}일</a-tag>
                  </div>
                <!-- <div class="button-calculate">
                    <button-basic text="&#129155; 퇴직금 계산 &#129155;" type="default" @onClick="calculateIncomeRetirement"/> 
                    <info-tool-tip placement="right"></info-tool-tip>
                </div> -->
              </standard-form>
            </div>
        </a-spin>
    </div>
    <div class="infor-text" style="text-align: center; margin-bottom: 20px;color: gray;">상기 급여(수당)으로 퇴직금을 계산합니다.</div>
 </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex';
import { useQuery } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import { companyId } from "@/helpers/commonFunction"
import queries from "@/graphql/queries/PA/PA4/PA410/index";
import { initFormState } from '../utils';
import dayjs from 'dayjs';
import filters from '@/helpers/filters';
import { Formula } from "@bankda/jangbuda-common";
import { onMounted } from 'vue';
import isEmpty from "lodash/isEmpty";
export default defineComponent({
    components: {
    },
    setup(props, { emit }) {
      onMounted(() => {
        if (!isEmpty(formStateStep2.value)) {
          Object.assign(formState, formStateStep2.value)
        } else {
          let employeeInfor = store.state.common.arrayEmployeePA410.find((item: any) => item.employeeId == store.state.common.employeeIdPA410)
          formState.settlementStartDate = employeeInfor && employeeInfor.joinedAt ? employeeInfor.joinedAt : filters.formatDateToInterger(dayjs().format("YYYY-MM-DD"))
          formState.settlementFinishDate = employeeInfor && employeeInfor.leavedAt ? employeeInfor.leavedAt : null
          dataLastRetiredYearsOfService.value = Formula.getDateOfService(
              new Date(filters.formatDate(formState.settlementStartDate)),
              new Date(filters.formatDate(formState.settlementFinishDate)),
              formState.exclusionDays,
              formState.additionalDays
          )
        }

        })
        const formPA410 = ref()
        const payStart = ref()
        const payEnd =  ref()
        const store = useStore();
        const formStateStep2 = computed(() => store.getters['common/stateStep2PA410'])
        const trigger = ref<boolean>(false)
        const modalMailStatus = ref<boolean>(false)
        const valueSelected = computed(()=>store.state.common.employeeIdPA410)
        const dataLastRetiredYearsOfService: any = ref({})
        const formState = reactive({
            ...initFormState,
            settlementStartDate: filters.formatDateToInterger(dayjs().format("YYYY-MM-DD")),
            settlementFinishDate: filters.formatDateToInterger(dayjs().format("YYYY-MM-DD"))
        })
        let variables = {
                companyId: companyId,
                input: formState
        }
        const arrayEmployeeSelect = ref(store.state.common.arrayEmployeePA410)
        watch(() => [
          formState.settlementStartDate,
          formState.settlementFinishDate,
          formState.exclusionDays,
          formState.additionalDays
        ], ([ newStartDate,newFinishDate,newExclusionDays,newAdditionalDays]) => {
          dataLastRetiredYearsOfService.value = Formula.getDateOfService(
              new Date(filters.formatDate(newStartDate)),
              new Date(filters.formatDate(newFinishDate)),
              newExclusionDays,
              newAdditionalDays
          )
        })
   
        const {
            result, loading, refetch, onError,onResult
        } = useQuery(queries.calculateIncomeRetirement, variables, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }))
        onError(e => {
            notification('error', e.message)
        })
        onResult((value) => {
          if (value.data) {
              store.commit('common/setCaculateValuePA410', value.data.calculateIncomeRetirement);
              trigger.value = false;
              store.commit('common/setStateStep2PA410', formState)
              console.log('sdfsdfsdfsdfsdf');
              
              store.dispatch('common/setNextStep')
            }
        })
 
        const calculateIncomeRetirement = () => {
          var res = formPA410.value.validate();
          let dtValidate = true
          if (!formState.settlementStartDate) {
            payStart.value.validate(true)
            dtValidate = false
          }
          if (!formState.settlementFinishDate) {
            payEnd.value.validate(true)
            dtValidate = false
          }

          if (!res.isValid) {
            res.brokenRules[0].validator.focus();
          } else if (!dtValidate) { 
            dtValidate = true
          }
          else {
            trigger.value = true;
            refetch()
          }
        }

          return {
            formPA410,
            dayjs,
            payStart,
            payEnd,
            loading,
            formState,
            calculateIncomeRetirement,
            arrayEmployeeSelect,
            valueSelected,
            modalMailStatus,
            dataLastRetiredYearsOfService
        }
    },
})
</script>

<style lang="scss" scoped>
    .content-page2{
        margin: 10px 20px;
        min-height: 300px;
        .select-employee{
            display: flex;
          
            .label{
                font-size: 17px;
            }
            .input-select{
                padding-left: 10px;
            }
        }
        .info-employee{
            padding-top: 20px;
            .header-text-2 {
                background-color: #C6D9F1;
                padding: 5px;
                font-weight: bold;
                font-size: 14px;
                margin-bottom: 10px;
            }
            .input-employee{
                display: flex;
                .d-flex-center{
                  span{
                    width: 15px;
                  }
                }
                span{
                    display: flex;
                    align-items: center; 
                    margin-left: 10px;
                    width: 60%;
                    img{
                        width: 20px !important;
                        height: 20px !important;
                    }
                    p{
                        margin-top: 0;
                        margin-bottom: 0;
                        margin-left: 5px;
                        font-size: 12px;
                        color: #A6A6A6;
                    }

                }
                ::v-deep .ant-form-item-label>label {
                    width: 135px;
                    padding-left: 10px;
                }
            }
            .time-service{
                font-size: 17px;
                font-weight: bold;
            }
            .button-calculate{
                display: flex;
                text-align: center;
                margin: 25px;
                align-items: center;
                width: auto;
                justify-content: center;
            }
            .salary{
                ::v-deep .ant-form-item-label>label {
                    width: 215px;
                    padding-left: 10px;
                }
                .input-salary{
                    display: flex;
                }
            }
        }

        .retirement-benefit{
            .header-text-2 {
                background-color: #C6D9F1;
                padding: 5px;
                font-weight: bold;
                font-size: 14px;
                margin-bottom: 10px;
            }

            .text-benefit{
                span {
                    display: flex;
                    align-items: center; 
                    p{
                        margin-top: 0;
                        margin-bottom: 0;
                        margin-left: 5px;
                        color: #A6A6A6;
                    }
                    .img-note{
                        width: 17px !important;
                        height: 17px !important;
                    }
                    .img-email{
                        margin-left: 10px;
                        cursor: pointer;
                    }
                }
                align-items: center; 
            }

            .input-benefit{
                display: flex;
            }
        }

        ::v-deep .red {
              label {
              color: red;
              }
          }
    }
</style>
