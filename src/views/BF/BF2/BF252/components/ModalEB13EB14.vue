<template>
    <a-modal :visible="modalStatus" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="350">
        <div :key="countKey" class="text-center">
            <standard-form ref="refFormAddAC120" class="form">
                <h2 class="mb-20">CMS 동의신청결과 반영</h2>
                <a-form-item label="EB13 파일 업로드">
                    <DxButton class="custom-button" :height="$config_styles.HeightInput">
                        <div class="d-flex-center">
                            <DownloadOutlined style="font-size: 14px; transform: rotate(180deg)" />
                            <span class="pl-5">파일 선택</span>
                        </div>
                    </DxButton>
                </a-form-item>
                <a-form-item label="EB14 파일 업로드">
                    <DxButton class="custom-button" :height="$config_styles.HeightInput">
                        <div class="d-flex-center">
                            <DownloadOutlined style="font-size: 14px; transform: rotate(180deg)" />
                            <span class="pl-5">파일 선택</span>
                        </div>
                    </DxButton>
                </a-form-item>
            </standard-form>
            <button-basic :disabled="false" @onClick="submit" class="mt-10" :text="'CMS 동의신청결과 반영 시작'" :type="'default'"
                :mode="'contained'" />
        </div>
    </a-modal>

    <a-modal :visible="modalStatusTable" @cancel="cancelTable" :mask-closable="false" class="confirm-md" footer=""
        :width="600">
        <div class="text-center">
            <h2 class="mb-20">CMS 동의신청결과 반영</h2>
            <DxDataGrid noDataText="내역이 없습니다" class="mt-20" ref="dataGridRef" :show-row-lines="true"
                :data-source="dataSource" :show-borders="true" :allow-column-reordering="move_column"
                :allow-column-resizing="colomn_resize" :column-auto-width="true">
                <DxColumn caption="반영결과" cell-template="item" width="180" />
                <DxColumn caption="내역수" cell-template="standard"  />
            </DxDataGrid>
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
import {
	DxDataGrid,
	DxColumn,
} from "devextreme-vue/data-grid";
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        DxDataGrid, DxColumn,
        DxButton, DownloadOutlined,
    },

    setup(props, { emit }) {
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const countKey = ref<number>(0);
        const refFormAddAC120 = ref();

        const modalStatusTable = ref<boolean>(false);

        const statusShowLetterOfApprovalType = ref(false);

        const dataSource = ref<any>([]);

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
        const cancelTable = () => {
            modalStatusTable.value = false;
        }
        return {
            refFormAddAC120,
            statusShowLetterOfApprovalType,
            submit,
            cancel,
            countKey,
            store,
            move_column, colomn_resize,
            modalStatusTable, cancelTable, dataSource,
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

    .dx-button-content {

        padding: 6px 8px;
    }

}
</style>
