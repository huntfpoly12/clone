<template>
    <a-modal :visible="modalStatus" footer="" :mask-closable="false" title="" okText="네. 발송합니다" cancelText="아니요"
        width="650px" @cancel="setModalVisible">
        <standard-form>
            <div class="mt-25">
                <div class="d-flex-center">
                    <span class="mr-10">
                        선택된 내역들의 전자신고파일 제작요청하고, 결과를
                    </span>
                    <mail-text-box width="250" v-model:valueInput="mailAction" />
                </div>
                <span>
                    로 메일을 발송하시겠습니까?
                </span>
            </div>
            <div class="d-flex-center mt-10">
                <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
                    @onClick="setModalVisible()" />
                <button-basic class="button-form-modal" :text="'네. 발송합니다'" :width="140" :type="'default'"
                    :mode="'contained'" @onClick="onSubmit" />
            </div>
        </standard-form>
    </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
    components: {
    },
    props: {
        modalStatus: Boolean,
        data: Object
    },
    setup(props, { emit }) {
        let mailAction = ref()
        watch(() => props.modalStatus, (newVal) => {
            if (newVal == true) {
                mailAction.value = props.data?.emailInput.receiverAddress
            }
        })

        const setModalVisible = () => {
            emit("closePopup", true)
        }

        const onSubmit = () => {

        }
        return {
            mailAction,
            onSubmit, setModalVisible
        }
    }
})
</script>   