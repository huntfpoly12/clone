<template>
 <div class="page-content">
    <div class="content-page2">
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
                                <date-time-box  width="150px"></date-time-box>
                            </a-form-item>
                            <span>
                                <img src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px;" />
                                <p>퇴직소득 정산의 시작일(기산일)로서, 중간정산지급 등으로 인해 입사일과 상이할 수 있습니다.</p>
                            </span>
                        </div> 
                        <div class="input-employee">
                            <a-form-item label="정산종료(퇴사)일" label-align="right" class="red">
                                <date-time-box  width="150px"></date-time-box>
                            </a-form-item>  
                            <span>
                                <img src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px;" />
                                <p>퇴직소득 정산의 시작일(기산일)로서, 중간정산지급 등으로 인해 입사일과 상이할 수 있습니다.</p>
                            </span>
                        </div>  
                        <div class="input-employee">
                            <a-form-item label="제외일수" label-align="right" >
                                <number-box-money  width="200px" :spinButtons="false" :rtlEnabled="true" > </number-box-money>
                            </a-form-item> 
                            <span>
                                <img src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px;" />
                                <p>정산시작(기산)일 기준 제외일수만큼 뒤로 미뤄서 근속일수를 계산합니다.</p>
                            </span>
                        </div>
                        <div class="input-employee">
                            <a-form-item label="가산일수" label-align="right" >
                                <number-box-money  width="200px" :spinButtons="false" :rtlEnabled="true" > </number-box-money>
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
                                <number-box-money  width="150px" :spinButtons="false" :rtlEnabled="true" > </number-box-money>
                            </a-form-item>  
                            <span class="pl-5 pt-4">원</span>
                        </div>
                        <div class="input-salary">
                            <a-form-item label="연간 상여금 총액" label-align="right" >
                                <number-box-money  width="150px" :spinButtons="false" :rtlEnabled="true" > </number-box-money>
                            </a-form-item> 
                            <span class="pl-5 pt-4">원</span>
                        </div>
                        <div class="input-salary">
                            <a-form-item label="연차수당" label-align="right" >
                                <number-box-money  width="150px" :spinButtons="false" :rtlEnabled="true" > </number-box-money>
                            </a-form-item> 
                            <span class="pl-5 pt-4">원</span>
                        </div>
                    </div>
            
                </a-col>
            </a-row>
        </div>
        <div class="retirement-benefit">
            <div class="header-text-2">퇴직급여</div>
            <a-row>
                <a-col :span="12">
                    <div class="input-benefit">
                        <a-form-item label="퇴직급여(예상)" label-align="right" >
                            <number-box-money  width="150px" :spinButtons="false" :rtlEnabled="true" > </number-box-money>
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

    </div>
 </div>
</template>

<script lang="ts">
import DateTimeBox from '@/components/common/DateTimeBox.vue'
import { defineComponent, watch, ref } from 'vue'

export default defineComponent({
  
    components: {
        DateTimeBox
    },
    setup(props, { emit }) {
      
        return {

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
