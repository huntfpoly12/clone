<template>
    <a-modal :visible="modalStatus" :mask-closable="false" title="" okText="네. 발송합니다" cancelText="아니요" width="650px"
        @cancel="setModalVisible">
        <div class="mt-25">
            <div class="d-flex-center">
                <span class="mr-10">
                    선택된 내역들의 전자신고파일 제작요청하고, 결과를
                </span>
                <mail-text-box width="200" />
            </div>
            <span>
                로 메일을 발송하시겠습니까?
            </span>
        </div>
    </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
    components: {
    },
    props: {
        modalStatus: Boolean,
    },
    setup(props, { emit }) {
        const setModalVisible = () => {
            emit("closePopup", true)
        }
        return {
            setModalVisible
        }
    }
})
</script>   