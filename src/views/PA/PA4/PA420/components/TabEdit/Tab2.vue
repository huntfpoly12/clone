<template>
    <a-row :gutter="16">
        <a-col :span="6"></a-col>
        <a-col :span="12" class="custom-label">
            <div class="header-text-2 mb-10">급여/상여/수당</div>
            <a-form-item label="퇴직전 3개월 임금 총액 (세전)">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="200px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="연간 상여금 총액">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="200px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="연차수당">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="200px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>

            <div class="d-flex mt-20 mb-20 wf-100">
                <div class="d-flex-center" style="margin: 0 auto;">
                    <button-basic text="퇴직금 계산" type="default" mode="contained" />
                    <div class="ml-5 d-flex-center">
                        <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="mr-5">
                        <span class="custom-waring">
                            상기 급여(수당)으로 퇴직금 계산합니다.
                        </span>
                    </div>
                </div>
            </div>

            <div class="header-text-2 mb-10">퇴직급여</div>
            <a-form-item label="퇴직급여(예상)">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="200px" />
                    <span class="pl-5">원</span>
                </div>
            </a-form-item>
            <a-form-item label="퇴직급여(확정)">
                <div class="d-flex-center">
                    <number-box-money :required="false" width="200px" />
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
<style scoped lang="scss">
::v-deep label {
    min-width: 250px !important;
}
</style>