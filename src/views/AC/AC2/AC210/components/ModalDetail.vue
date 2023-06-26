<template>
    <a-modal :visible="modalStatus" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="1650">
        <div class="mt-20" :key="countKey">
            <h1 class="text-center mb-0">업로드 요청 내역 및 결과</h1>
            <a-spin :spinning="loadingGetAccountingDocumentW4cUploadItems">
                <DxDataGrid noDataText="내역이 없습니다" id="dataGridAC210" key-expr="requestId" :show-row-lines="true"
                    :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true" ref="gridRefDetailAC210"
                    :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true">
                    <DxScrolling mode="standard" show-scrollbar="always" />
                    <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
                    <DxPaging :enabled="false" />
                    <DxToolbar>
                        <DxItem name="searchPanel" />
                    </DxToolbar>
                    <DxColumn caption="사업명" width="85" data-field="facilityBusinessName"/>

                    <DxColumn caption="일자" data-field="transactionDetailDate" css-class="cell-left" cell-template="transactionDetailDate"/>
                    <template #transactionDetailDate="{ data }">
                        {{ $filters.formatDate(data.data.transactionDetailDate) }}
                    </template>

                    <DxColumn caption="순번" data-field="index" css-class="cell-left"/>

                    <DxColumn caption="결의번호" data-field="resolutionNumber" />

                    <DxColumn caption="통장번호" data-field="bankbookNumber" />

                    <DxColumn caption="통장별명" data-field="bankbookNickname" />

                    <DxColumn caption="결의서종류" data-field="resolutionType" css-class="cell-left"/>

                    <DxColumn caption="세입액" data-field="revenue" format="fixedPoint"/>
                    <DxColumn caption="세출액" data-field="expenditure" format="fixedPoint"/>
                    <DxColumn caption="적요" data-field="summary"/>
                    <DxColumn caption="계정과목" data-field="theOrder" cell-template="theOrder-accountCode"/>
                    <template #theOrder-accountCode="{ data }">
                        {{ data.data.theOrder }}-{{ data.data.accountCode }}
                    </template>
                    <DxColumn caption="상대계정" data-field="relationCode" />
                    <DxColumn caption="자금원천" data-field="fundingSource" css-class="cell-left"/>
                    <DxColumn caption="거래처" data-field="clientName" />
                    <DxColumn caption="결과" data-field="success" cell-template="success-result"/>
                    <template #success-result="{ data }">
                        <a-tag v-if="data.data.success" color="#4F6228">성공</a-tag>
                        <a-tag v-else-if="data.data.result" color="#C00000">{{data.data.result}}</a-tag>
                    </template>
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
        requestId: Number,
    },

    setup(props, { emit }) {
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? "0"));
        const globalFacilityBizId = ref<number>(parseInt(sessionStorage.getItem("globalFacilityBizId") ?? "0"));
        const countKey = ref<number>(0);
        const gridRefDetailAC210 = ref(); // ref of grid
        let triggerGetAccountingDocumentW4cUploadItems = ref<boolean>(false);
        const argumentGetAccountingDocumentW4cUploadItems = ref({
            companyId: companyId,
            requestId: props.requestId
        }); 
        const dataSource: any = ref(new DataSource({
            store: {
                type: "array",
                key: "requestId",
                data: [],
            },
            requireTotalCount: true,
        }));

        // =================== GRAPHQL ===================
        // query getAccountingDocumentW4cUploadItems
		const {
			result: resGetAccountingDocumentW4cUploadItems,
			loading: loadingGetAccountingDocumentW4cUploadItems,
			onError: errorGetAccountingDocumentW4cUploadItems,
		} = useQuery(
			queries.getAccountingDocumentW4cUploadItems,
			argumentGetAccountingDocumentW4cUploadItems.value,
			() => ({
				enabled: triggerGetAccountingDocumentW4cUploadItems.value,
				fetchPolicy: "no-cache",
			})
		);
		errorGetAccountingDocumentW4cUploadItems((e) => {
            triggerGetAccountingDocumentW4cUploadItems.value = false;
			//notification('error', e.message)
		});

        // ================== WATCH ================
        watch(() => props.modalStatus, (newValue, old) => {
            if (newValue) {
                argumentGetAccountingDocumentW4cUploadItems.value.requestId = props.requestId
                triggerGetAccountingDocumentW4cUploadItems.value = true;
            }
        });
        watch(resGetAccountingDocumentW4cUploadItems, (value) => {
            triggerGetAccountingDocumentW4cUploadItems.value = false;
            dataSource.value = new DataSource({
                store: {
                    type: "array",
                    key: "requestId",
                    data: value.getAccountingDocumentW4cUploadItems,
                },
                requireTotalCount: true,
            });
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
            loadingGetAccountingDocumentW4cUploadItems,
        };
    },
});
</script>

<style lang="scss" scoped></style>
