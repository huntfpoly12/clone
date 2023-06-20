<template>
    <a-modal :visible="modalStatus" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="1650">
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
                    <DxColumn caption="사업명" width="85" />

                    <DxColumn caption="일자" data-field="" />

                    <DxColumn caption="순번" data-field="" />

                    <DxColumn caption="결의번호" data-field="" />

                    <DxColumn caption="통장번호" data-field="" />

                    <DxColumn caption="통장별명" data-field="" />

                    <DxColumn caption="결의부분" data-field="" />

                    <DxColumn caption="수입액" data-field="" />
                    <DxColumn caption="지출액" data-field="" />
                    <DxColumn caption="적요" data-field="" />
                    <DxColumn caption="계정과목" data-field="" />
                    <DxColumn caption="상대계정" data-field="" />
                    <DxColumn caption="자금원천" data-field="" />
                    <DxColumn caption="거래처" data-field="" />
                    <DxColumn caption="결과" data-field="" />
                </DxDataGrid>
            </a-spin>
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

        return {
            move_column,
            colomn_resize,
            cancel,
            countKey,
            store,
            dataSource, gridRefDetailAC210,
        };
    },
});
</script>

<style lang="scss" scoped></style>
