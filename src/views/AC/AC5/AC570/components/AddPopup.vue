<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" footer=""
        :width="562" :key="resetFormNum">
        <standard-form action="" name="add-ac570" ref="ac570FormRef">
            <div class="custom-modal mt-20">
                <div class="custom-center">
                    <a-form-item label="전용일자" class="red">
                        <date-time-box width="230px" dateFormat="YYYY-MM-DD" v-model:valueDate="formState.transitionDate" ref="requiredTransitionDate" />
                    </a-form-item>
                    <a-form-item label="원천계정과목" class="red">
                        <account-code-select width="230px" @valueCode3="onCodeSourceCode" 
                        :code1Check="valueCode1TransitionCode"
                        :code2Check="valueCode2TransitionCode"
                        :code3Check="valueCode3TransitionCode"
                        v-model:valueInput="formState.sourceCode" :required="true" />
                    </a-form-item>
                    <a-form-item label="전용계정과목" class="red">
                        <account-code-select width="230px" @valueCode3="onCodeTransitionCode" 
                        :code1Check="valueCode1SourceCode" 
                        :code2Check="valueCode2SourceCode" 
                        :code3Check="valueCode3SourceCode"
                        v-model:valueInput="formState.transitionCode" :required="true" />
                    </a-form-item>
                    <a-form-item label="전용액" class="red">
                        <number-box-money width="230px" v-model:valueInput="formState.transitionAmount" :min="1" :required="true" :spinButtons="false" placeholder="양수만 가능"/>
                    </a-form-item>
                    <div class="text-align-center mt-20"><span>과목전용조서를 등록하시겠습니까?</span></div>
                </div>
            </div>
            <div class="text-align-center mt-20">
                <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
                    @onClick="setModalVisible()" />
                <button-basic class="button-form-modal" :text="'네. 등록합니다'" :width="140" :type="'default'"
                    :mode="'contained'" @onClick="onSubmit" />
            </div>
        </standard-form>
    </a-modal>
    <detail-popup :modalStatus="modalStatusDetail" @closePopup="modalStatusDetail = false" :dataAddPopup="formState" @callApi="callApi"/>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import DetailPopup from './DetailPopup.vue';
import dayjs from "dayjs";
import filters from "@/helpers/filters";

import { initialState } from '../utils/index'
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Object,
            default: {}
        }
    },
    components: {
        DetailPopup
    },
    setup(props, { emit }) {
        const modalStatusDetail = ref<boolean>(false)
        const ac570FormRef = ref()
        let resetFormNum = ref(1);

        let requiredTransitionDate = ref()
        let valueCode1SourceCode = ref()
        let valueCode2SourceCode = ref()
        let valueCode3SourceCode = ref()
        let valueCode1TransitionCode = ref()
        let valueCode2TransitionCode = ref()
        let valueCode3TransitionCode = ref()
        const formState = ref<any>()
        const setModalVisible = () => {
            emit("closePopup", false)
        };

        const onSubmit = (e: any) => {
            var res = ac570FormRef.value.validate();
            if (!formState.value.transitionDate) {
                requiredTransitionDate.value.validate(true)
            }
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
                emit("closePopup", false)
                modalStatusDetail.value = true;
            }
            
        };
        const onCodeSourceCode = (val: any) => {
            valueCode1SourceCode.value = val.code1
            valueCode2SourceCode.value = val.code2
            valueCode3SourceCode.value = val.code3
            
        }
        const onCodeTransitionCode = (val: any) => {
            valueCode1TransitionCode.value = val.code1
            valueCode2TransitionCode.value = val.code2
            valueCode3TransitionCode.value = val.code3
        }
        const callApi = () => {
            emit("callApi", true)
        }

        watch(() => props.modalStatus, (value) => {
            if (value) {
                formState.value = { ...initialState }
                resetFormNum.value++
            }
        })

        return {
            setModalVisible,
            onSubmit,
            labelCol: { style: { width: "150px" } },
            modalStatusDetail,
            requiredTransitionDate,
            ac570FormRef, resetFormNum, formState,
            callApi,
            onCodeSourceCode, onCodeTransitionCode,
            valueCode1SourceCode, valueCode1TransitionCode,
            valueCode2SourceCode, valueCode2TransitionCode,
            valueCode3SourceCode, valueCode3TransitionCode,
        }
    },
})
</script>

<style lang="scss">
.custom-modal {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
}

.custom-modal .ant-form-item-label>label {
    width: 130px;
    padding-left: 10px;
}
.text-align-center {
    text-align: center;
}

.button-form-modal {
    margin: 0px 5px;
}
</style>