<template>
    <div id="components-modal-demo-position">
        <a-modal :visible="modalStatus" title="직인자동생성" @cancel="setModalVisible()">
            <a-row>
                <a-col :span="14" :xl="14">
                    <InfoCircleFilled />
                    <a-typography-text>
                        직인에 인쇄될 상호를 입력하신 후 <br>미리보기 버튼을 누르세요.
                    </a-typography-text>
                </a-col>
            </a-row>
            <a-input-group size="small">
                <a-row :gutter="8">
                    <a-col :span="10">
                        <a-input value="" aria-placeholder="2~15자 (특수문자불가)" />
                    </a-col>
                    <a-col :span="8">
                        <a-button type="primary" size="small">미리보기</a-button>
                    </a-col>
                </a-row>
            </a-input-group>
            <a-image :width="200" :src="previewImage" :preview="false" />
            <a-button type="primary" style="margin-left: 100px;">저장</a-button>
            <template #footer>

            </template>
        </a-modal>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";
import {
    InfoCircleFilled,
} from "@ant-design/icons-vue";
export default defineComponent({
    props: ["modalStatus", "data"],
    components: {
        InfoCircleFilled
    },
    setup(props, { emit }) {
        let previewImage: any = ref('/public/images/demo-image.jpg');
        const setModalVisible = () => {
            emit("closePopup", false);
        }

        return {
            setModalVisible,
            previewImage
        }
    },
});
</script> 

<style scoped>

</style>