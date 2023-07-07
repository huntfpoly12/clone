<template>
    <a-modal :visible="modalStatus" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="350">
        <div :key="countKey" class="mt-20 text-center">
            <standard-form ref="" class="form">
                <a-form-item label="EB21 파일 업로드">
                    <DxButton class="custom-button" :height="$config_styles.HeightInput">
                        <div class="d-flex-center">
                            <DownloadOutlined style="font-size: 14px; transform: rotate(180deg)" />
                            <span class="pl-5">파일 선택</span>
                        </div>
                    </DxButton>
                </a-form-item>
                <a-form-item label="EB22 파일 업로드">
                    <DxButton class="custom-button" :height="$config_styles.HeightInput">
                        <div class="d-flex-center">
                            <DownloadOutlined style="font-size: 14px; transform: rotate(180deg)" />
                            <span class="pl-5">파일 선택</span>
                        </div>
                    </DxButton>
                </a-form-item>
            </standard-form>
            <button-basic :disabled="false" @onClick="submit" class="mt-10" :text="'업로드'" :type="'default'"
                :mode="'contained'" />
        </div>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { companyId } from "@/helpers/commonFunction";
import { useStore } from "vuex";
import dayjs from "dayjs";
import notification from "@/utils/notification";
import { Message } from "@/configs/enum";
import filters from "@/helpers/filters";
import DxButton from "devextreme-vue/button";
import { DownloadOutlined } from "@ant-design/icons-vue";
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        DxButton, DownloadOutlined,
    },

    setup(props, { emit }) {
        const store = useStore();
        const countKey = ref<number>(0);
        const modalStatusTable = ref<boolean>(false);

        // =================== GRAPHQL ===================


        // ================== WATCH ================


        watch(() => props.modalStatus, (newValue, old) => {
            if (newValue) {

            }
        });
        // ================ FUNCTION ============================================

        const submit = () => {
            modalStatusTable.value = true;
        };
        const cancel = () => {
            emit("closePopup", false);
        };
        return {
            submit,
            cancel,
            countKey,
            store,
            modalStatusTable,
        };
    },
});
</script>

<style lang="scss" scoped>
:deep .form .dx-state-hover {
    background-color: #474747 !important;
}

.custom-button {
    color: white;
    background-color: #6b6b6b;

    :deep .dx-button-content {
        padding: 6px 8px;
    }

}
</style>
