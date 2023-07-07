<template>
    <a-modal :visible="modalStatus" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="700">
        <!-- <div> -->
            <standard-form ref="refFormItemAC120">
                <a-row>
                    <h4 style="width: 80px;"><b>작성일자</b></h4>
                    <a-col class="mt-30 d-flex-center">
                        <radio-group :arrayValue="arrayRadio" v-model:valueRadioCheck="valueRadio"
                            :layoutCustom="'horizontal'" />
                        <date-time-box class="ml-30" :teleport="true" v-model:valueDate="valueDate" width="130px"
                            :required="true" disabled="false" />
                        <info-tool-tip>모든 내역의 선택된 일자가 작성일자로 일괄 적용. 내역별 결제일자가 작성일자로 적용</info-tool-tip>
                    </a-col>
                </a-row>
                <a-row class="mt-10">
                    <h4 style="width: 80px;"><b>선택된 내역</b></h4>
                    <a-col class="mt-30">
                        <a-form-item label="세금계산서 연계 O">
                            <div class="d-flex-center">
                                <number-box :width="150" v-model:valueInput="valueNumber1" :spinButtons="true" />
                                <info-tool-tip>이미 세금계산서 연계되었던 적이 있는 내역</info-tool-tip>
                            </div>
                        </a-form-item>
                        <a-form-item label="세금계산서 연계 X">
                            <div class="d-flex-center">
                                <number-box :width="150" v-model:valueInput="valueNumber2" :spinButtons="true" />
                                <info-tool-tip>이미 세금계산서 연계되었던 적이 없는 내역</info-tool-tip>
                            </div>
                        </a-form-item>
                        <a-form-item label="합계">
                            <number-box :width="150" v-model:valueInput="valueNumber3" :spinButtons="true" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <div class="mt-10">
                    선택된 내역의 세금계산서 연계 파일 다운로드하시겠습니까?
                </div>
                <div class="mt-10" style="color: #ED7D31">
                    ※ 세금계산서 연계 파일 다운로드시 선택된 내역들의 [세금계산서 연계] 컬럼은 O 로 변경됩니다.
                </div>
            </standard-form>
        <!-- </div> -->
        <div class="text-center mt-20">
            <button-basic class="mr-5" :text="'아니오'" :type="'normal'" :mode="'contained'" @onClick="cancel" />
            <button-basic class="ml-5" :text="'네. 다운로드합니다'" :type="'default'" :mode="'contained'"
                @onClick="submit" />
        </div>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, computed, toRefs } from "vue";
import { useStore } from "vuex";
import DxButton from "devextreme-vue/button";
import { DownloadOutlined } from "@ant-design/icons-vue";
import comfirmClosePopup from '@/utils/comfirmClosePopup';
import { Message } from "@/configs/enum";
import notification from '@/utils/notification';
import type { UploadProps } from 'ant-design-vue';
function getBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        DxButton, DownloadOutlined
    },

    setup(props, { emit }) {
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const dataDetail = reactive({
            valueRadio: 1,
            valueDate: null,
            valueNumber1: 0,
            valueNumber2: 0,
            valueNumber3: 0,

        })
        const dataSource = ref<any>([]);
        const arrayRadio = ref<any>([
            { id: 1, text: '일괄적용' },
            { id: 2, text: '결제일자' }
        ]);
        // =================== GRAPHQL ===================


        // ============== ON DONE MUTATION GRAPHQL ===============


        // ================== WATCH ================
        watch(() => props.modalStatus, async (newValue, old) => {
            if (newValue) {

            }
        }
        );

        // ================ FUNCTION ============================================
        const cancel = () => {
            emit("closePopup", false);
            // if (JSON.stringify(formStateDataSource.value) == JSON.stringify(dataSource.value)) {
            // 	emit("closePopup", false);
            // } else {
            // 	comfirmClosePopup(() => emit('closePopup', false))
            // }
        };
        const submit = () => {

        }

        return {
            move_column,
            colomn_resize,
            dataSource,
            cancel,
            arrayRadio,
            submit,
            ...toRefs(dataDetail)
        };
    },
});
</script>

<style lang="scss" scoped>
:deep .ant-form-item-label>label {
    width: 130px;
}
</style>
