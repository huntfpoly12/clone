<template>
    <a-row :gutter="16" class="modal-add modal-add-step-3">
        <a-col :span="12">
            <a-form-item label="퇴직급여(확정)">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                    <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5 ml-5">
                    <span class="custom-waring">
                        실제 지급된 퇴직급여를 입력합니다.
                    </span>
                </div>
            </a-form-item>
            <a-form-item label="비과세퇴직급여(확정)">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="과세대상 퇴직급여(확정)">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                    <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5 ml-5">
                    <span class="custom-waring">
                        = 퇴직급여(확정) - 비과세퇴직급여(확정)
                    </span>
                </div>
            </a-form-item>
            <a-form-item label="세액공제">
                <div class="d-flex-top">
                    <div class="d-flex-center">
                        <number-box-money :required="false" width="150px" />
                        <span class="pl-5">원</span>
                        <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5 ml-5">
                    </div>
                    <span class="custom-waring">
                        거주자의 퇴직소득금액에 국외원천소득이 합산되어 있는 경우로서 그 국외원천소득에 대하여 외국에서 외국소득세액을 납부하였거나 납부할 것이 있을 때에는 해당 금액을 기재합니다.
                    </span>
                </div>
            </a-form-item>
            <a-form-item label="기납부(기과세이연)세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                    <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5 ml-5">
                    <span class="custom-waring">
                        직전 중간정산시 소득세를 입력합니다.
                    </span>
                </div>
            </a-form-item>
        </a-col>
        <a-col :span="12">
            <div class="header-text-2 mb-10">연금계좌입금명세 (${계좌입금금액합계} 원)</div>
            <div class="d-flex">
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="연금계좌취급자" />
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="사업자등록번호" />
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="계좌번호" />
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="입금일" />
                <number-box-money :required="false" width="20%" placeholder="계좌입금금액" />
            </div>
            <div class="d-flex mt-5">
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="연금계좌취급자" />
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="사업자등록번호" />
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="계좌번호" />
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="입금일" />
                <number-box-money :required="false" width="20%" placeholder="계좌입금금액" />
            </div>
        </a-col>
        <div class="mb-10 wf-100 text-center">
            <button-basic text="퇴직소득세 계산" type="default" mode="contained" />
        </div>

        <a-col :span="12">
            <div class="header-text-2 mb-10">과세표준계산</div>
            <a-form-item label="퇴직소득">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="근속연수공제">
                <div class="d-flex-center">
                    <date-time-box width="150px" dateFormat="YYYY-MM-DD" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="환산급여">
                <div class="d-flex-center">
                    <date-time-box width="150px" dateFormat="YYYY-MM-DD" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="환산급여별공제">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="퇴직소득과세표준">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                    <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5 ml-5">
                    <span class="custom-waring">
                        = [환산급여] - [환산급여별공제]
                    </span>
                </div>
            </a-form-item>
        </a-col>
        <a-col :span="12">
            <div class="header-text-2 mb-10">세액계산</div>
            <a-form-item label="환산산출세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="퇴직소득 산출세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="세액공제">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="기납부(기과세이연)세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="신고대상세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                    <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5 ml-5">
                    <span class="custom-waring">
                        = [환산산출세액] - [세액공제] - [기납부(기과세이연)세액]
                    </span>
                </div>
            </a-form-item>
        </a-col>
        <a-col :span="12">
            <div class="header-text-2 mb-10">세액계산</div>
            <a-form-item label="환산산출세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <div>연금계좌입금명세 (${계좌입금금액합계} 원)</div>
            <div class="d-flex">
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="연금계좌취급자" />
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="사업자등록번호" />
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="계좌번호" />
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="입금일" />
                <number-box-money :required="false" width="20%" placeholder="계좌입금금액" />
            </div>
            <div class="d-flex mt-5 mb-5">
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="연금계좌취급자" />
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="사업자등록번호" />
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="계좌번호" />
                <number-box-money :required="false" width="20%" class="mr-5" placeholder="입금일" />
                <number-box-money :required="false" width="20%" placeholder="계좌입금금액" />
            </div>
            <a-form-item label="신고대상세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                    <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5 ml-5">
                    <span class="custom-waring">
                        = [환산산출세액] - [세액공제] - [기납부(기과세이연)세액]
                    </span>
                </div>
            </a-form-item>
        </a-col>
        <a-col :span="12">
            <div class="header-text-2 mb-10">세액계산</div>
            <a-form-item label="환산산출세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="환산산출세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <div>신고대상세액</div>
            <a-form-item class="label-children" label="환산산출세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item class="label-children" label="환산산출세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>

            <div>이연퇴직소득세</div>
            <a-form-item class="label-children" label="환산산출세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item class="label-children" label="환산산출세액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="150px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item> 
        </a-col>
    </a-row>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    setup(props, { emit }) {



        return {

        }
    }
})
</script>


<style lang="scss" scoped src="../../style/modalAdd.scss">

</style>