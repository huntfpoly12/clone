<template>
    <a-modal :visible="modalStatus" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="644">
        <div class="mt-20">
            <span>선택된 전표외 동일 통장내역의 전표가 있다면, 함께 전표취소됩니다. (내역원천 = 수기인 전표는 삭제)</span>
            <standard-form action="" class="text-align-center mt-20">
                <a-row class="row-1">
                    <a-col :span="12" class="col-1">
                        <div class="input_info">
                            <a-form-item label="선택된 전표">
                                <number-box :width="60" />
                            </a-form-item>
                            <span class="pl-5 mb-5">건</span>
                        </div>
                        <div class="input_info">
                            <a-form-item label="동일 통장내역의 전표">
                                <number-box :width="60" />
                            </a-form-item>
                            <span class="pl-5 mb-5">건</span>
                        </div>
                    </a-col>
                    <a-col :span="12" class="col-2">
                        <div class="input_info">
                            <a-form-item label="수기입력 전표">
                                <number-box :width="60" />
                            </a-form-item>
                            <span class="pl-5 mb-5">건 (삭제 예정)</span>
                        </div>
                        <div class="input_info">
                            <a-form-item label="전체 전표취소 건수">
                                <number-box :width="60" />
                            </a-form-item>
                            <span class="pl-5 mb-5">건</span>
                        </div>
                    </a-col>
                </a-row>
                <div class="mt-10"><span>상기의 전표들을 취소하시겠습니까?</span></div>
                <div class="mt-20">
                    <button-basic class="button-form-modal" :text="'아니요'" :width="140" :type="'default'" :mode="'outlined'"
                        @onClick="cancel" />
                    <button-basic class="button-form-modal" :text="'네. 취소합니다'" :width="140" :type="'default'"
                        :mode="'contained'" @onClick="submit" />
                </div>
            </standard-form>
        </div>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue'
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
    },
    components: {
    },

    setup(props, { emit }) {
        const cancel = () => {
            emit("closePopup", false)
        };
        const submit = () => {
            emit("submit")
        }
        return {
            submit,
            cancel
        }
    },
})
</script>

<style lang="scss" scoped>

.text-align-center {
    text-align: center;
}

.button-form-modal {
    margin: 0px 5px;
}

.mt-10 {
    margin-top: 10px;
}
.mt-20 {
    margin-top: 20px;
}

.input_info {
    display: flex;
    align-items: center;
}

:deep .col-1 .ant-form-item-label {
    >label {
        width: 150px;
    }
}
:deep .col-2 .ant-form-item-label {
    >label {
        width: 130px;
    }
}
</style>
