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
                    <DxColumn caption="사업명" width="85" data-field="facilityBusinessName" />

                    <DxColumn caption="일자" data-field="transactionDetailDate" css-class="cell-left"
                        cell-template="transactionDetailDate" />
                    <template #transactionDetailDate="{ data }">
                        {{ $filters.formatDate(data.data.transactionDetailDate) }}
                    </template>

                    <DxColumn caption="순번" data-field="index" css-class="cell-left" />

                    <DxColumn caption="결의번호" data-field="resolutionNumber" />

                    <DxColumn caption="통장번호" data-field="bankbookNumber" />

                    <DxColumn caption="통장별명" data-field="bankbookNickname" />

                    <DxColumn caption="결의서종류" data-field="resolutionType" css-class="cell-left"
                        cell-template="resolutionType" />
                    <template #resolutionType="{ data }">
                        {{ arrResolutionType.find((item) => data.data.resolutionType == item.id)?.text }}
                    </template>

                    <DxColumn caption="세입액" data-field="revenue" format="fixedPoint" />
                    <DxColumn caption="세출액" data-field="expenditure" format="fixedPoint" />
                    <DxColumn caption="적요" data-field="summary" />
                    <DxColumn caption="계정과목" data-field="theOrder" css-class="cell-left"
                        cell-template="theOrder-accountCode" />
                    <template #theOrder-accountCode="{ data }">
                        {{ data.data.theOrder }}-
                        {{ accountSubjects.find((item) => item.code == data.data.accountCode)?.name }}
                    </template>
                    <DxColumn caption="상대계정" data-field="relationCode" cell-template="relationCode" />
                    <template #relationCode="{ data }">
                        {{ accountSubjects.find((item) => item.code == data.data.relationCode)?.name }}
                    </template>
                    <DxColumn caption="자금원천" data-field="fundingSource" cell-template="fundingSource"
                        css-class="cell-left" />
                    <template #fundingSource="{ data }">
                        {{ arrFundingSource.find((item) => item.id == data.data.fundingSource)?.text }}
                    </template>
                    <DxColumn caption="거래처" data-field="clientName" />
                    <DxColumn caption="결과" data-field="success" cell-template="success-result" />
                    <template #success-result="{ data }">
                        <a-tag v-if="data.data.success" color="#4F6228">성공</a-tag>
                        <a-tag v-else-if="data.data.result" color="#C00000">{{ data.data.result }}</a-tag>
                    </template>
                </DxDataGrid>
            </a-spin>
        </div>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/AC/AC2/AC210";
import { companyId } from "@/helpers/commonFunction";
import { useStore } from "vuex";
import notification from "@/utils/notification";
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
import {
    ResolutionType,
    FundingSource,
    enum2Entries,
} from "@bankda/jangbuda-common";
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
        const arrResolutionType = computed(() => {
            let item: any = enum2Entries(ResolutionType).map((value) => ({
                id: value[1],
                text: value[0],
            }));
            return item;
        });
        const arrFundingSource = computed(() => {
            let item: any = enum2Entries(FundingSource).map((value) => ({
                id: value[1],
                text: value[0],
            }));
            return item;
        });
        const dataAccountSubject = ref(JSON.parse(sessionStorage.getItem("accountSubject") ?? '[]'))
        const accountSubjects = Array()
        dataAccountSubject.value.map((value: any) => {
            value.codes.map((code: any) => {
                accountSubjects.push(code)
            })
        })
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
            arrResolutionType,
            accountSubjects,
            arrFundingSource,
        };
    },
});
</script>

<style lang="scss" scoped></style>
