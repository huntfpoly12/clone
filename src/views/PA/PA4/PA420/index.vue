<template>
    <action-header title="퇴직소득자료입력" @actionSave="saving" />
    <div id="pa-420">
        <div class="page-content">
            <a-row>
                <a-col :span="3" class="total-user">
                    <div>
                        <span>{{ dataSource.length }}</span>
                        <br>
                        <span>전체</span>
                    </div>
                    <div>
                        <img src="@/assets/images/user.svg" style="width: 70px" />
                    </div>
                </a-col>
                <a-col :span="24" class="mt-10">
                    <a-spin :spinning="loadingGetIncomeProcessBusinesses" size="large">
                        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                            :show-borders="true" key-expr="companyId" :allow-column-reordering="move_column"
                            :allow-column-resizing="colomn_resize" :column-auto-width="true"
                            :focused-row-enabled="true">
                            <DxScrolling column-rendering-mode="virtual" />
                            <DxColumn :caption="globalYear + ' 귀속월'" cell-template="col-first" data-type="string" />
                            <template #col-first="{ data }">
                                <b>지급연월</b>
                            </template>
                            <DxColumn caption="1" width="100px" cell-template="month-1" />
                            <template #month-1="{ data }">
                                <div class="hover-underlined" v-if="data.data.month1"
                                    @click="showDetailSelected(data.data.month1.imputedMonth, data.data.month1.imputedYear, data.data.month1.paymentYear, data.data.month1.paymentMonth)">
                                    <colorful-badge :value="data.data.month1.status"
                                        :year="data.data.month1.paymentYear" :month="data.data.month1.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(1)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="2" width="100px" cell-template="month-2" />
                            <template #month-2="{ data }">
                                <div class="hover-underlined" v-if="data.data.month2"
                                    @click="showDetailSelected(data.data.month2.imputedMonth, data.data.month2.imputedYear, data.data.month2.paymentYear, data.data.month2.paymentMonth)">
                                    <colorful-badge :value="data.data.month2.status"
                                        :year="data.data.month2.paymentYear" :month="data.data.month2.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(2)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="3" width="100px" cell-template="month-3" />
                            <template #month-3="{ data }">
                                <div class="hover-underlined" v-if="data.data.month3"
                                    @click="showDetailSelected(data.data.month3.imputedMonth, data.data.month3.imputedYear, data.data.month3.paymentYear, data.data.month3.paymentMonth)">
                                    <colorful-badge :value="data.data.month3.status"
                                        :year="data.data.month3.paymentYear" :month="data.data.month3.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(3)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="4" width="100px" cell-template="month-4" />
                            <template #month-4="{ data }">
                                <div class="hover-underlined" v-if="data.data.month4"
                                    @click="showDetailSelected(data.data.month4.imputedMonth, data.data.month4.imputedYear, data.data.month4.paymentYear, data.data.month4.paymentMonth)">
                                    <colorful-badge :value="data.data.month4.status"
                                        :year="data.data.month4.paymentYear" :month="data.data.month4.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(4)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="5" width="100px" cell-template="month-5" />
                            <template #month-5="{ data }">
                                <div class="hover-underlined" v-if="data.data.month5"
                                    @click="showDetailSelected(data.data.month5.imputedMonth, data.data.month5.imputedYear, data.data.month5.paymentYear, data.data.month5.paymentMonth)">
                                    <colorful-badge :value="data.data.month5.status"
                                        :year="data.data.month5.paymentYear" :month="data.data.month5.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(5)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="6" width="100px" cell-template="month-6" />
                            <template #month-6="{ data }">
                                <div class="hover-underlined" v-if="data.data.month6"
                                    @click="showDetailSelected(data.data.month6.imputedMonth, data.data.month6.imputedYear, data.data.month6.paymentYear, data.data.month6.paymentMonth)">
                                    <colorful-badge :value="data.data.month6.status"
                                        :year="data.data.month6.paymentYear" :month="data.data.month6.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(6)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="7" width="100px" cell-template="month-7" />
                            <template #month-7="{ data }">
                                <div class="hover-underlined" v-if="data.data.month7"
                                    @click="showDetailSelected(data.data.month7.imputedMonth, data.data.month7.imputedYear, data.data.month7.paymentYear, data.data.month7.paymentMonth)">
                                    <colorful-badge :value="data.data.month7.status"
                                        :year="data.data.month7.paymentYear" :month="data.data.month7.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(7)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="8" width="100px" cell-template="month-8" />
                            <template #month-8="{ data }">
                                <div class="hover-underlined" v-if="data.data.month8"
                                    @click="showDetailSelected(data.data.month8.imputedMonth, data.data.month8.imputedYear, data.data.month8.paymentYear, data.data.month8.paymentMonth)">
                                    <colorful-badge :value="data.data.month8.status"
                                        :year="data.data.month8.paymentYear" :month="data.data.month8.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(8)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="9" width="100px" cell-template="month-9" />
                            <template #month-9="{ data }">
                                <div class="hover-underlined" v-if="data.data.month9"
                                    @click="showDetailSelected(data.data.month9.imputedMonth, data.data.month9.imputedYear, data.data.month9.paymentYear, data.data.month9.paymentMonth)">
                                    <colorful-badge :value="data.data.month9.status"
                                        :year="data.data.month9.paymentYear" :month="data.data.month9.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(9)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="10" width="100px" cell-template="month-10" />
                            <template #month-10="{ data }">
                                <div class="hover-underlined" v-if="data.data.month10"
                                    @click="showDetailSelected(data.data.month10.imputedMonth, data.data.month10.imputedYear, data.data.month10.paymentYear, data.data.month10.paymentMonth)">
                                    <colorful-badge :value="data.data.month10.status"
                                        :year="data.data.month10.paymentYear" :month="data.data.month10.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(10)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="11" width="100px" cell-template="month-11" />
                            <template #month-11="{ data }">
                                <div class="hover-underlined" v-if="data.data.month11"
                                    @click="showDetailSelected(data.data.month11.imputedMonth, data.data.month11.imputedYear, data.data.month11.paymentYear, data.data.month11.paymentMonth)">
                                    <colorful-badge :value="data.data.month11.status"
                                        :year="data.data.month11.paymentYear" :month="data.data.month11.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(11)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="12" width="100px" cell-template="month-12" />
                            <template #month-12="{ data }">
                                <div class="hover-underlined" v-if="data.data.month12"
                                    @click="showDetailSelected(data.data.month12.imputedMonth, data.data.month12.imputedYear, data.data.month12.paymentYear, data.data.month12.paymentMonth)">
                                    <colorful-badge :value="data.data.month12.status"
                                        :year="data.data.month12.paymentYear" :month="data.data.month12.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(12)"> [+]
                                </div>
                            </template>
                            <DxMasterDetail class="table-detail" :enabled="true" template="detailRow" />
                            <template #detailRow="{ data }">
                                <DxDataGrid key-expr="id" :data-source="dataCustomRes" :show-borders="false"
                                    :column-auto-width="true" :allow-column-reordering="move_column"
                                    :show-column-headers="false" :allow-column-resizing="colomn_resize"
                                    :focused-row-enabled="true">
                                    <DxColumn :caption="globalYear + ' 귀속월'" cell-template="col-first"
                                        data-type="string" />
                                    <template #col-first="{ data }">
                                        <b>{{ data.data.name }}</b><br>
                                    </template>
                                    <DxColumn caption="1" width="100px" cell-template="month-1" />
                                    <template #month-1="{ data }">
                                        <div class="hover-underlined"
                                            @click="showDetailSelected(data.data.month1.imputedMonth, data.data.month1.imputedYear, data.data.month1.paymentYear, data.data.month1.paymentMonth)"
                                            v-if="data.data.month1"> {{ data.data.month1.value }}</div>
                                    </template>
                                    <DxColumn caption="2" width="100px" cell-template="month-2" />
                                    <template #month-2="{ data }">
                                        <div class="hover-underlined"
                                            @click="showDetailSelected(data.data.month2.imputedMonth, data.data.month2.imputedYear, data.data.month2.paymentYear, data.data.month2.paymentMonth)"
                                            v-if="(data.data.month2)"> {{ data.data.month2.value }}</div>
                                    </template>
                                    <DxColumn caption="3" width="100px" cell-template="month-3" />
                                    <template #month-3="{ data }">
                                        <div class="hover-underlined"
                                            @click="showDetailSelected(data.data.month3.imputedMonth, data.data.month3.imputedYear, data.data.month3.paymentYear, data.data.month3.paymentMonth)"
                                            v-if="(data.data.month3)"> {{ data.data.month3.value }}</div>
                                    </template>
                                    <DxColumn caption="4" width="100px" cell-template="month-4" />
                                    <template #month-4="{ data }">
                                        <div class="hover-underlined"
                                            @click="showDetailSelected(data.data.month4.imputedMonth, data.data.month4.imputedYear, data.data.month4.paymentYear, data.data.month4.paymentMonth)"
                                            v-if="(data.data.month4)"> {{ data.data.month4.value }}</div>
                                    </template>
                                    <DxColumn caption="5" width="100px" cell-template="month-5" />
                                    <template #month-5="{ data }">
                                        <div class="hover-underlined"
                                            @click="showDetailSelected(data.data.month5.imputedMonth, data.data.month5.imputedYear, data.data.month5.paymentYear, data.data.month5.paymentMonth)"
                                            v-if="(data.data.month5)"> {{ data.data.month5.value }}</div>
                                    </template>
                                    <DxColumn caption="6" width="100px" cell-template="month-6" />
                                    <template #month-6="{ data }">
                                        <div class="hover-underlined"
                                            @click="showDetailSelected(data.data.month6.imputedMonth, data.data.month6.imputedYear, data.data.month6.paymentYear, data.data.month6.paymentMonth)"
                                            v-if="(data.data.month6)"> {{ data.data.month6.value }}</div>
                                    </template>
                                    <DxColumn caption="7" width="100px" cell-template="month-7" />
                                    <template #month-7="{ data }">
                                        <div class="hover-underlined"
                                            @click="showDetailSelected(data.data.month7.imputedMonth, data.data.month7.imputedYear, data.data.month7.paymentYear, data.data.month7.paymentMonth)"
                                            v-if="(data.data.month7)"> {{ data.data.month7.value }}</div>
                                    </template>
                                    <DxColumn caption="8" width="100px" cell-template="month-8" />
                                    <template #month-8="{ data }">
                                        <div class="hover-underlined"
                                            @click="showDetailSelected(data.data.month8.imputedMonth, data.data.month8.imputedYear, data.data.month8.paymentYear, data.data.month8.paymentMonth)"
                                            v-if="(data.data.month8)"> {{ data.data.month8.value }}</div>
                                    </template>
                                    <DxColumn caption="9" width="100px" cell-template="month-9" />
                                    <template #month-9="{ data }">
                                        <div class="hover-underlined"
                                            @click="showDetailSelected(data.data.month9.imputedMonth, data.data.month9.imputedYear, data.data.month9.paymentYear, data.data.month9.paymentMonth)"
                                            v-if="(data.data.month9)"> {{ data.data.month9.value }}</div>
                                    </template>
                                    <DxColumn caption="10" width="100px" cell-template="month-10" />
                                    <template #month-10="{ data }">
                                        <div class="hover-underlined"
                                            @click="showDetailSelected(data.data.month10.imputedMonth, data.data.month10.imputedYear, data.data.month10.paymentYear, data.data.month10.paymentMonth)"
                                            v-if="data.data.month10">
                                            {{ data.data.month10.value }}
                                        </div>
                                    </template>
                                    <DxColumn caption="11" width="100px" cell-template="month-11" />
                                    <template #month-11="{ data }">
                                        <div class="hover-underlined"
                                            @click="showDetailSelected(data.data.month11.imputedMonth, data.data.month11.imputedYear, data.data.month11.paymentYear, data.data.month11.paymentMonth)"
                                            v-if="(data.data.month11)">
                                            {{ data.data.month11.value }}
                                        </div>
                                    </template>
                                    <DxColumn caption="12" width="100px" cell-template="month-12" />
                                    <template #month-12="{ data }">
                                        <div class="hover-underlined"
                                            @click="showDetailSelected(data.data.month12.imputedMonth, data.data.month12.imputedYear, data.data.month12.paymentYear, data.data.month12.paymentMonth)"
                                            v-if="(data.data.month12)">
                                            {{ data.data.month12.value }}
                                        </div>
                                    </template>
                                </DxDataGrid>
                            </template>
                        </DxDataGrid>
                    </a-spin>
                </a-col> 
                <ComponentDetail :dataCallTableDetail="valueCallApiGetEmployeeBusiness" :statusButton="statusButton"
                    :actionSave="actionSave" @createdDone="createdDone" />
                <CopyMonth :modalStatus="modalCopy" @closePopup="actionCopySuccess"
                    :processKey="valueCallApiGetEmployeeBusiness.processKey" :data="dataModalCopy"
                    @dataAddIncomeProcess="dataAddIncomeProcess" />
            </a-row>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed } from "vue";
import { useStore } from 'vuex';
import { useQuery } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA4/PA420/index";
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxMasterDetail } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import { origindata, dataAddTableBigUtils } from "./utils";
import DxButton from "devextreme-vue/button";
import { companyId } from "@/helpers/commonFunction";
import HistoryPopup from '@/components/HistoryPopup.vue';
import dayjs from 'dayjs';
import filters from "@/helpers/filters";
import ComponentDetail from "./components/ComponentDetail.vue";
import CopyMonth from "./components/CopyMonth.vue";
export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxPaging, DxSelection, DxExport, DxSearchPanel, DxScrolling, DxToolbar, DxEditing, DxGrouping, DxItem, DxButton, DxMasterDetail,
        EditOutlined, HistoryOutlined, SearchOutlined, DeleteOutlined, SaveOutlined,
        MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined,
        HistoryPopup, ComponentDetail, CopyMonth
    },
    setup() {
        let statusButton = ref()
        let actionSave = ref(0)
        let dataSource: any = ref([]);
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const rowTable = ref(0);
        const originData = reactive({ ...origindata, rows: per_page });
        const trigger = ref<boolean>(true);
        const modalCopy = ref<boolean>(false);
        const dataModalCopy: any = ref()
        const globalYear = computed(() => store.state.settings.globalYear)
        const dataGetValueTable = reactive({
            companyId: companyId,
            imputedYear: globalYear,
            // imputedMonth: dayjs().month(),
        })
        const dataCallTableSmall = reactive({
            companyId: companyId,
            processKey: {
                imputedYear: null,
                imputedMonth: null,
                paymentYear: null,
                paymentMonth: null,
            }
        })
        let valueCallApiGetEmployeeBusiness = reactive({
            companyId: companyId,
            processKey: {
                imputedYear: globalYear.value,
                imputedMonth: dayjs().month()+ 1,
                paymentYear: globalYear.value,
                paymentMonth: dayjs().month() + 1
            }
        })
        let dataCustomRes: any = ref([])
        // ================GRAPQL==============================================
        // API QUERY TABLE BIG
        const { refetch: refetchData, loading: loadingGetIncomeProcessBusinesses, onError: errorGetIncomeProcessBusinesses, onResult: resIncomeProcessBusinesses } = useQuery(queries.getIncomeProcessRetirements, dataGetValueTable, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        resIncomeProcessBusinesses(res => {
            let respon = res.data.getIncomeProcessRetirements
            dataSource.value = [{
                companyId: companyId,
            }]
            dataCustomRes.value = [...dataAddTableBigUtils]
            if (respon)
                respon.map((val: any) => {
                    // data table minify  
                    let dataAdd = {
                        imputedMonth: val.imputedMonth,
                        imputedYear: val.imputedYear,
                        paymentYear: val.paymentYear,
                        paymentMonth: val.paymentMonth,
                    }
                    dataSource.value[0]['month' + val.imputedMonth] = val
                    // data table detail
                    dataCustomRes.value[0]['month' + val.imputedMonth] =
                    {
                        value: filters.formatCurrency(val.employeeStat?.employeeCount) + " (" + filters.formatCurrency(val.employeeStat?.retireEmployeeCount) + ")",
                        ...dataAdd
                    }
                    dataCustomRes.value[1]['month' + val.imputedMonth] =
                    {
                        value: filters.formatCurrency(val.incomeStat?.retirementBenefits),
                        ...dataAdd
                    }
                    dataCustomRes.value[2]['month' + val.imputedMonth] = {
                        value: filters.formatCurrency(val.incomeStat?.nonTaxableRetirementBenefits),
                        ...dataAdd
                    }
                    dataCustomRes.value[3]['month' + val.imputedMonth] = {
                        value: filters.formatCurrency(val.incomeStat?.taxableRetirementBenefits),
                        ...dataAdd
                    }
                    dataCustomRes.value[4]['month' + val.imputedMonth] = {
                        value: filters.formatCurrency(val.incomeStat?.incomePayment),
                        ...dataAdd
                    }
                    dataCustomRes.value[5]['month' + val.imputedMonth] = {
                        value: filters.formatCurrency(val.incomeStat?.withholdingLocalIncomeTax),
                        ...dataAdd
                    }
                    dataCustomRes.value[6]['month' + val.imputedMonth] = {
                        value: filters.formatCurrency(val.incomeStat?.incomePayment + val.incomeStat?.withholdingLocalIncomeTax),
                        ...dataAdd
                    }
                    dataCustomRes.value[7]['month' + val.imputedMonth] = {
                        value: filters.formatCurrency(val.incomeStat?.retirementBenefits - val.incomeStat?.withholdingLocalIncomeTax),
                        ...dataAdd
                    }
                    if (val.imputedMonth == (dayjs().month() + 1)) {
                        dataCallTableSmall.processKey.imputedMonth = val.imputedMonth
                        dataCallTableSmall.processKey.imputedYear = val.imputedYear
                        dataCallTableSmall.processKey.paymentMonth = val.paymentMonth
                        dataCallTableSmall.processKey.paymentYear = val.paymentYear
                        statusButton.value = val.status
                    }
                })
        })
        errorGetIncomeProcessBusinesses(res => {
            notification('error', res.message)
        })
        // ================FUNCTION============================================   
        const showDetailSelected = (imputedMonth: any, imputedYear: any, paymentYear: any, paymentMonth: any) => {
            valueCallApiGetEmployeeBusiness.processKey.imputedMonth = imputedMonth
            valueCallApiGetEmployeeBusiness.processKey.imputedYear = imputedYear
            valueCallApiGetEmployeeBusiness.processKey.paymentYear = paymentYear
            valueCallApiGetEmployeeBusiness.processKey.paymentMonth = paymentMonth
        }
        const saving = () => {
            actionSave.value++;
        }
        const createdDone = () => {
            trigger.value = true
            refetchData()
        }
        const addMonth = (month: number) => {
            dataModalCopy.value = month
            modalCopy.value = true
        }
        const dataAddIncomeProcess = (data: any) => {
            dataSource.value[0]['month' + data.imputedMonth] = data
            dataSource.value[0]['month' + data.imputedMonth].status = 10
        }
        const actionCopySuccess = () => {
            modalCopy.value = false
        }
        return {
            modalCopy,
            actionSave,
            statusButton,
            valueCallApiGetEmployeeBusiness,
            dataCustomRes,
            globalYear,
            loadingGetIncomeProcessBusinesses,
            rowTable,
            dataSource,
            per_page, move_column, colomn_resize,
            originData,
            createdDone,
            addMonth,
            dataModalCopy,
            saving,
            showDetailSelected,
            actionCopySuccess,
            dataAddIncomeProcess
        };
    },
});
</script>  
<style scoped lang="scss" src="./style/style.scss" >
</style>
