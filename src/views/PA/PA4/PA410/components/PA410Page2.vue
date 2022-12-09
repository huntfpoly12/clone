<template>
 <div class="page-content">
    <div class="content-page2">
        <a-spin :spinning="loading" size="large">
            <div class="select-employee">
                <div class="label">
                    사원
                </div>
                <div class="input-select">
                    <employ-select   width="300px"/>
                </div>
            </div>
            <div class="info-employee">
                <a-row :gutter="16">
                    <a-col :span="12">
                        <div class="header-text-2">근속기간</div> 
                            <div class="input-employee">
                                <a-form-item label="정산시작(입사)일" label-align="right" class="red">
                                    <date-time-box  width="150px"  v-model:valueDate="formState.settlementStartDate"></date-time-box>
                                </a-form-item>
                                <span>
                                    <img src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px;" />
                                    <p>퇴직소득 정산의 시작일(기산일)로서, 중간정산지급 등으로 인해 입사일과 상이할 수 있습니다.</p>
                                </span>
                            </div> 
                            <div class="input-employee">
                                <a-form-item label="정산종료(퇴사)일" label-align="right" class="red">
                                    <date-time-box  width="150px" v-model:valueDate="formState.settlementFinishDate"></date-time-box>
                                </a-form-item>  
                                <span>
                                    <img src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px;" />
                                    <p>퇴직소득 정산의 시작일(기산일)로서, 중간정산지급 등으로 인해 입사일과 상이할 수 있습니다.</p>
                                </span>
                            </div>  
                            <div class="input-employee">
                                <a-form-item label="제외일수" label-align="right" >
                                    <number-box-money  width="200px" :spinButtons="false" :rtlEnabled="true" v-model:valueInput="formState.exclusionDays" > </number-box-money>
                                </a-form-item> 
                                <span>
                                    <img src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px;" />
                                    <p>정산시작(기산)일 기준 제외일수만큼 뒤로 미뤄서 근속일수를 계산합니다.</p>
                                </span>
                            </div>
                            <div class="input-employee">
                                <a-form-item label="가산일수" label-align="right" >
                                    <number-box-money  width="200px" :spinButtons="false" :rtlEnabled="true" v-model:valueInput="formState.additionalDays"> </number-box-money>
                                </a-form-item> 
                                <span>
                                    <img src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px;" />
                                    <p>정산시작(기산)일 기준 가산일수만큼 앞으로 당겨서 근속일수를 계산합니다.</p>
                                </span>
                            </div> 
                    </a-col>
                    <a-col :span="12">
                        <div class="header-text-2">급여/상여/수당</div>
                        <div class="salary">
                            <div class="input-salary">
                                <a-form-item label="퇴직전 3개월 임금 총액 (세전)" label-align="right" >
                                    <number-box-money  width="150px" :spinButtons="false" :rtlEnabled="true" v-model:valueInput="formState.totalPay3Month"> </number-box-money>
                                </a-form-item>  
                                <span class="pl-5 pt-4">원</span>
                            </div>
                            <div class="input-salary">
                                <a-form-item label="연간 상여금 총액" label-align="right" >
                                    <number-box-money  width="150px" :spinButtons="false" :rtlEnabled="true" v-model:valueInput="formState.totalAnualBonus"> </number-box-money>
                                </a-form-item> 
                                <span class="pl-5 pt-4">원</span>
                            </div>
                            <div class="input-salary">
                                <a-form-item label="연차수당" label-align="right" >
                                    <number-box-money  width="150px" :spinButtons="false" :rtlEnabled="true" v-model:valueInput="formState.annualLeaveAllowance"> </number-box-money>
                                </a-form-item> 
                                <span class="pl-5 pt-4">원</span>
                            </div>
                        </div>
                
                    </a-col>
                </a-row>
                <div class="time-service">근속연수 / 근속월수 / 근속일수: {{yearsService}}년/{{monthsService}}개월/{{workingDays}}일</div>
                <div class="button-calculate">
                    <button-basic text="&#129155; 퇴직금 계산 &#129155;" type="default" @onClick="calculateIncomeRetirement"/> 
                </div>
            </div>
            <div class="retirement-benefit">
                <div class="header-text-2">퇴직급여</div>
                <a-row>
                    <a-col :span="12">
                        <div class="input-benefit">
                            <a-form-item label="퇴직급여(예상)" label-align="right" >
                                <number-box-money  width="150px" :spinButtons="false" :rtlEnabled="true" :readOnly="true" v-model:valueInput="caculateValue"> </number-box-money>
                            </a-form-item>
                            <span class="pl-5 pt-4">원</span>
                        </div>
                    </a-col>
                    <a-col :span="12">
                        <div class="text-benefit">
                            <span>
                                <img src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px;" class="img-note"/>
                                <p>상기 급여(수당)으로 계산된 퇴직금으로 실제 지급된 퇴직금과는 상이할 수 있습니다.</p>
                                <img src="@/assets/images/email.svg" alt="" style="width: 40px;" class="img-email"/>
                            </span>
                        </div>
                    </a-col>
                </a-row>
            </div>
        </a-spin>
    </div>
 </div>
</template>

<script lang="ts">
import DateTimeBox from '@/components/common/DateTimeBox.vue'
import { defineComponent, watch, ref, reactive } from 'vue'
import { useQuery } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import { companyId } from "@/helpers/commonFunction"
import queries from "@/graphql/queries/PA/PA4/PA410/index";
import { initFormState } from '../utils';
import dayjs from 'dayjs';
export default defineComponent({
  
    components: {
        DateTimeBox
    },
    setup(props, { emit }) {
        const yearsService = ref(0);
        const monthsService = ref(0);
        const workingDays = ref(0);
        const caculateValue = ref(0);
        const trigger = ref<boolean>(false)
        const formState = reactive({
            ...initFormState,
            settlementStartDate: dayjs().format("YYYY-MM-DD"),
            settlementFinishDate: dayjs().format("YYYY-MM-DD")
        })
        let variables = {
                companyId: companyId,
                input: formState
        }
        watch(()=> formState.settlementFinishDate, (newFinishDate) => {
            const finishDate = dayjs(newFinishDate)         
            workingDays.value = finishDate.diff(formState.settlementStartDate, 'day');
            if (workingDays.value < 0) {
                formState.settlementFinishDate = dayjs().add(1, 'day').format("YYYY-MM-DD");
            } else {
                monthsService.value = finishDate.diff(formState.settlementStartDate, 'month');
                yearsService.value = finishDate.diff(formState.settlementStartDate, 'year');
            }
                  
        })
   
        const {
            result, loading, refetch, onError
        } = useQuery(queries.calculateIncomeRetirement, variables, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }))
        onError(e => {
            notification('error', e.message)
        })
      
        watch(result, (value) => {
            if (value && value.calculateIncomeRetirement) {
                caculateValue.value = value.calculateIncomeRetirement;
             }
        })

        const calculateIncomeRetirement = () => {
            trigger.value = true;
            refetch()
        }
        return {
            loading,
            formState,
            caculateValue,
            yearsService,
            monthsService,
            workingDays,
            calculateIncomeRetirement
        }
    },
})
</script>

<style lang="scss" scoped>
    .content-page2{
        margin: 10px 20px;
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
                ::v-deep .red {
                    label {
                    color: red;
                    }
                }
          
            }
            .time-service{
                font-size: 17px;
                font-weight: bold;
            }
            .button-calculate{
                    text-align: center;
                    margin: 25px;
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


    }
</style>
