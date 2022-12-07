<template>
    <a-col :span="24">
        <div class="header-detail-main">
            <div class="table-detail-left d-flex-center">
                <div class="text-box-1">귀 {{ dataTableDetail.processKey.imputedYear }}-{{
                        dataTableDetail.processKey.imputedMonth
                }}</div>
                <div class="text-box-2">지 {{ dataTableDetail.processKey.paymentYear }}-{{
                        dataTableDetail.processKey.paymentMonth
                }}</div>
                <!-- <process-status v-model:valueStatus="status" /> -->
            </div>
            <div class="table-detail-right">
                <DxButton>
                    <DeleteOutlined style="font-size: 18px;" />
                </DxButton>
                <DxButton icon="plus" @click="addRow" />
                <DxButton icon="plus">
                    <EditOutlined style="font-size: 18px;" />
                </DxButton>
            </div>
        </div>
    </a-col>

    <a-col :span="16" class="custom-layout">
        <a-spin :spinning="loadingTableDetail" size="large">
            <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSourceDetail"
                :show-borders="true" key-expr="employeeId" :allow-column-reordering="move_column"
                :allow-column-resizing="colomn_resize" :column-auto-width="true" :onRowClick="actionEdit"
                :focused-row-enabled="true">
                <DxScrolling column-rendering-mode="virtual" />
                <DxColumn caption="기타소득자 [소득구분]" cell-template="tag" />
                <template #tag="{ data }" class="custom-action">
                    <income-type :typeCode="data.data.incomeTypeCode" :typeName="(data.data.employee.name)"
                        :incomeTypeName="data.data.employee.incomeTypeName" />
                </template>
                <DxColumn caption="지급일" data-field="paymentDay" data-type="string" :format="amountFormat" />
                <DxColumn caption="지급액" data-field="paymentAmount" data-type="string" :format="amountFormat" />
                <DxColumn caption="세율" data-field="taxRate" data-type="string" :format="amountFormat" />
                <DxColumn caption="공제" cell-template="income-tax" :format="amountFormat" />
                <template #income-tax="{ data }" class="custom-action">
                    <div>
                        {{ data.data.withholdingIncomeTax + data.data.withholdingLocalIncomeTax }}
                    </div>
                </template>
                <DxColumn caption="차인지급액" data-field="actualPayment" data-type="string" :format="amountFormat" />

            </DxDataGrid>
        </a-spin>
    </a-col>
    <a-col :span="8" class="custom-layout">
    </a-col>

</template>

<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from "vue";
import { useStore } from 'vuex';
import { useQuery, useMutation } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA6/PA620/index";
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxMasterDetail } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import mutations from "@/graphql/mutations/PA/PA6/PA620/index";
import DxButton from "devextreme-vue/button";
export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxPaging, DxSelection, DxExport, DxSearchPanel, DxScrolling, DxToolbar, DxEditing, DxGrouping, DxItem, DxButton, DxMasterDetail,
        EditOutlined, HistoryOutlined, SearchOutlined, DeleteOutlined, SaveOutlined,
        MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined
    },
    props: {
        dataCallTableDetail: {
            type: Object
        }
    },
    setup(props) {
        const amountFormat = ref({ currency: 'VND', useGrouping: true })
        let dataSourceDetail = ref([]);
        const triggerDetail = ref<boolean>(true);
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const rowTable = ref(0);
        const globalYear = computed(() => store.state.settings.globalYear)
        let dataAction = reactive({

        })
        let dataTableDetail: any = ref({ ...props.dataCallTableDetail })

        // ================GRAPQL==============================================

        // API QUERY TABLE SMALL LEFT SIDE
        const { refetch: refetchTableDetail, loading: loadingTableDetail, onError: errorGetIncomeProcessBusinessesDetail, onResult: resIncomeProcessBusinessesDetail } = useQuery(queries.getIncomeBusinesses, dataTableDetail, () => ({
            enabled: triggerDetail.value,
            fetchPolicy: "no-cache",
        }));
        resIncomeProcessBusinessesDetail(res => {
            dataSourceDetail.value = res.data.getIncomeBusinesses
            triggerDetail.value = false
        })
        errorGetIncomeProcessBusinessesDetail(res => {
            notification('error', res.message)
        })

        // ================WATCHING============================================
        watch(() => props.dataCallTableDetail, (newValue, old) => {
            dataTableDetail.value = newValue
            triggerDetail.value = true
        }, { deep: true })

        // ================FUNCTION============================================   
        const addRow = () => {

        }

        const actionEdit = (data: any) => {

        }

        return {
            dataTableDetail,
            dataAction,
            rowTable, per_page, move_column, colomn_resize,
            loadingTableDetail,
            dataSourceDetail,
            addRow,
            actionEdit,
            amountFormat,
        }
    }
});
</script>
<style scoped lang="scss" src="../style/style.scss" >

</style>
