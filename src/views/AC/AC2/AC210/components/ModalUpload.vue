<template>
    <a-modal :visible="modalStatus" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="500">
        <standard-form class="text-center mt-20">
            <div class="flex-center">
                <month-picker-box width="100px" class="mr-5"/>
                <span class="ml-5">전표를 w4c에 업로드하시겠습니까?</span>
            </div>
            <div class="text-center mt-30">
                <button-basic class="mr-5" :text="'아니요'" :type="'default'" :mode="'outlined'"
                    @onClick="cancel" />
                <button-basic class="ml-5" :text="'네. 업로드하겠습니다'"  :type="'default'"
                    :mode="'contained'" @onClick="actionOpenModalUploadTable" />
            </div>
        </standard-form>
    </a-modal>

    <a-modal :visible="modalStatusTable" @cancel="cancelTable" :mask-closable="false" class="confirm-md" footer="" :width="1000">
        <div class="mt-20" :key="countKey">
            <a-spin :spinning="false">
                <DxDataGrid noDataText="내역이 없습니다" id="dataGridAC210" key-expr="accountingDocumentId" :show-row-lines="true"
                    :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true" ref="gridRefDetailAC210"
                    :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true">
                    <DxScrolling mode="standard" show-scrollbar="always" />
                    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
                    <DxPaging :enabled="false" />
                    <DxToolbar>
                        <DxItem name="searchPanel" />
                    </DxToolbar>
                    <DxColumn caption="회계연월" width="85" />

                    <DxColumn caption="결의서 내역수" data-field="" />

                    <DxColumn caption="마감현황" data-field="" />

                    <DxColumn caption="업로드 가능 여부 " data-field="" />
                </DxDataGrid>
            </a-spin>
            <div class="text-center mt-30">
                <button-basic :text="'업로드'" :type="'default'"
                    :mode="'contained'" @onClick="actionSubmit" />
            </div>
        </div>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/AC/AC2/AC210";
import queries from "@/graphql/queries/AC/AC2/AC210";
import { companyId } from "@/helpers/commonFunction";
import { useStore } from "vuex";
import dayjs from "dayjs";
import notification from "@/utils/notification";
import { Message } from "@/configs/enum";
import filters from "@/helpers/filters";
import DxButton from "devextreme-vue/button";
import {
    DxItem,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxPaging,
    DxSearchPanel,
    DxToolbar,
} from "devextreme-vue/data-grid";
import DataSource from "devextreme/data/data_source";
export default defineComponent({

    components: {
        DxItem,
        DxDataGrid,
        DxColumn,
        DxScrolling,
        DxPaging,
        DxButton,
        DxSearchPanel,
        DxToolbar,
    },
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
    },

    setup(props, { emit }) {
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? "0"));
        const globalFacilityBizId = ref<number>(parseInt(sessionStorage.getItem("globalFacilityBizId") ?? "0"));
        const countKey = ref<number>(0);
        const gridRefDetailAC210 = ref(); // ref of grid
        const modalStatusTable = ref<boolean>(false)
        const dataSource: any = ref(new DataSource({
            store: {
                type: "array",
                key: "accountingDocumentId",
                data: [],
            },
            requireTotalCount: true,
        }));

        // =================== GRAPHQL ===================

        // ================== WATCH ================
        watch(() => props.modalStatus, (newValue, old) => {

        });

        // ================ FUNCTION ============================================
        const cancel = () => {
            emit("closePopup", false);
        };
        
        const cancelTable = () => {
            modalStatusTable.value = false;
        }

        const actionOpenModalUploadTable = () => {
            modalStatusTable.value = true;
        }

        const actionSubmit = () => {

        }

        return {
            move_column,
            colomn_resize,
            cancel,
            countKey,
            store,
            dataSource, gridRefDetailAC210,
            modalStatusTable,
            cancelTable, actionOpenModalUploadTable,
            actionSubmit,
        };
    },
});
</script>

<style lang="scss" scoped>
.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
