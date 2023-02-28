<template>
    <action-header title="사업소득자료입력" @actionSave="saving" :buttonDelete="false" :buttonSearch="false"
        :buttonPrint="false" :buttonSave="false" />
    <div id="pa-620">
        <div class="page-content">
            <a-row>
                <a-col :span="24" class="mt-10">
                    <a-spin :spinning="loadingGetIncomeProcessBusinesses" size="large">
                        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                            :show-borders="true" key-expr="companyId" :allow-column-reordering="move_column"
                            :allow-column-resizing="colomn_resize" :column-auto-width="true"
                            :focused-row-enabled="true"> 
                            <DxColumn :caption="globalYear + ' 귀속월'" cell-template="col-first" data-type="string" />
                            <template #col-first="{}">
                                <b>지급연월</b>
                            </template>
                            <DxColumn caption="01" width="100px" cell-template="month-1" />
                            <template #month-1="{ data }">
                                <div class="hover-underlined" v-if="data.data.month1"
                                    :class="setUnderline(data.data.month1.imputedMonth) ? 'current-underlined' : ''"
                                    @click="showDetailSelected(data.data.month1)">
                                    <colorful-badge :value="data.data.month1.status"
                                        :year="data.data.month1.paymentYear" :month="data.data.month1.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(1)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="02" width="100px" cell-template="month-2" />
                            <template #month-2="{ data }">
                                <div class="hover-underlined" v-if="data.data.month2"
                                    :class="setUnderline(data.data.month2.imputedMonth) ? 'current-underlined' : ''"
                                    @click="showDetailSelected(data.data.month2)">
                                    <colorful-badge :value="data.data.month2.status"
                                        :year="data.data.month2.paymentYear" :month="data.data.month2.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(2)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="03" width="100px" cell-template="month-3" />
                            <template #month-3="{ data }">
                                <div class="hover-underlined" v-if="data.data.month3"
                                    :class="setUnderline(data.data.month3.imputedMonth) ? 'current-underlined' : ''"
                                    @click="showDetailSelected(data.data.month3)">
                                    <colorful-badge :value="data.data.month3.status"
                                        :year="data.data.month3.paymentYear" :month="data.data.month3.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(3)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="04" width="100px" cell-template="month-4" />
                            <template #month-4="{ data }">
                                <div class="hover-underlined" v-if="data.data.month4"
                                    :class="setUnderline(data.data.month4.imputedMonth) ? 'current-underlined' : ''"
                                    @click="showDetailSelected(data.data.month4)">
                                    <colorful-badge :value="data.data.month4.status"
                                        :year="data.data.month4.paymentYear" :month="data.data.month4.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(4)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="05" width="100px" cell-template="month-5" />
                            <template #month-5="{ data }">
                                <div class="hover-underlined" v-if="data.data.month5"
                                    :class="setUnderline(data.data.month5.imputedMonth) ? 'current-underlined' : ''"
                                    @click="showDetailSelected(data.data.month5)">
                                    <colorful-badge :value="data.data.month5.status"
                                        :year="data.data.month5.paymentYear" :month="data.data.month5.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(5)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="06" width="100px" cell-template="month-6" />
                            <template #month-6="{ data }">
                                <div class="hover-underlined" v-if="data.data.month6"
                                    :class="setUnderline(data.data.month6.imputedMonth) ? 'current-underlined' : ''"
                                    @click="showDetailSelected(data.data.month6)">
                                    <colorful-badge :value="data.data.month6.status"
                                        :year="data.data.month6.paymentYear" :month="data.data.month6.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(6)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="07" width="100px" cell-template="month-7" />
                            <template #month-7="{ data }">
                                <div class="hover-underlined" v-if="data.data.month7"
                                    :class="setUnderline(data.data.month7.imputedMonth) ? 'current-underlined' : ''"
                                    @click="showDetailSelected(data.data.month7)">
                                    <colorful-badge :value="data.data.month7.status"
                                        :year="data.data.month7.paymentYear" :month="data.data.month7.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(7)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="08" width="100px" cell-template="month-8" />
                            <template #month-8="{ data }">
                                <div class="hover-underlined" v-if="data.data.month8"
                                    :class="setUnderline(data.data.month8.imputedMonth) ? 'current-underlined' : ''"
                                    @click="showDetailSelected(data.data.month8)">
                                    <colorful-badge :value="data.data.month8.status"
                                        :year="data.data.month8.paymentYear" :month="data.data.month8.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(8)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="09" width="100px" cell-template="month-9" />
                            <template #month-9="{ data }">
                                <div class="hover-underlined" v-if="data.data.month9"
                                    :class="setUnderline(data.data.month9.imputedMonth) ? 'current-underlined' : ''"
                                    @click="showDetailSelected(data.data.month9)">
                                    <colorful-badge :value="data.data.month9.status"
                                        :year="data.data.month9.paymentYear" :month="data.data.month9.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(9)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="10" width="100px" cell-template="month-10" />
                            <template #month-10="{ data }">
                                <div class="hover-underlined" v-if="data.data.month10"
                                    :class="setUnderline(data.data.month10.imputedMonth) ? 'current-underlined' : ''"
                                    @click="showDetailSelected(data.data.month10)">
                                    <colorful-badge :value="data.data.month10.status"
                                        :year="data.data.month10.paymentYear" :month="data.data.month10.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(10)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="11" width="100px" cell-template="month-11" />
                            <template #month-11="{ data }">
                                <div class="hover-underlined" v-if="data.data.month11"
                                    :class="setUnderline(data.data.month11.imputedMonth) ? 'current-underlined' : ''"
                                    @click="showDetailSelected(data.data.month11)">
                                    <colorful-badge :value="data.data.month11.status"
                                        :year="data.data.month11.paymentYear" :month="data.data.month11.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(11)"> [+]
                                </div>
                            </template>
                            <DxColumn caption="12" width="100px" cell-template="month-12" />
                            <template #month-12="{ data }">
                                <div class="hover-underlined" v-if="data.data.month12"
                                    :class="setUnderline(data.data.month12.imputedMonth) ? 'current-underlined' : ''"
                                    @click="showDetailSelected(data.data.month12)">
                                    <colorful-badge :value="data.data.month12.status"
                                        :year="data.data.month12.paymentYear" :month="data.data.month12.paymentMonth" />
                                </div>
                                <div v-else style="width: 100%;text-align: center;" @click="addMonth(12)"> [+]
                                </div>
                            </template>
                            <DxMasterDetail class="table-detail" :enabled="true" template="detailRow" />
                            <template #detailRow="{}"> 
                                <DxDataGrid key-expr="id" :data-source="dataCustomRes" :show-borders="false"
                                    :column-auto-width="true" :allow-column-reordering="move_column"
                                    :show-column-headers="false" :allow-column-resizing="colomn_resize"
                                    :focused-row-enabled="true">
                                    <!-- <DxScrolling mode="standard" show-scrollbar="always" /> -->
                                    <DxColumn :caption="globalYear + ' 귀속월'" cell-template="col-first"
                                        data-type="string" />
                                    <template #col-first="{ data }">
                                        <b>{{ data.data.name }}</b><br>
                                    </template>
                                    <DxColumn caption="1" width="100px" cell-template="month-1" />
                                    <template #month-1="{ data }">
                                        <div class="hover-underlined" @click="showDetailSelected(data.data.month1)"
                                            v-if="data.data.month1"> {{ data.data.month1.value }}</div>
                                    </template>
                                    <DxColumn caption="2" width="100px" cell-template="month-2" />
                                    <template #month-2="{ data }">
                                        <div class="hover-underlined" @click="showDetailSelected(data.data.month2)"
                                            v-if="(data.data.month2)"> {{ data.data.month2.value }}</div>
                                    </template>
                                    <DxColumn caption="3" width="100px" cell-template="month-3" />
                                    <template #month-3="{ data }">
                                        <div class="hover-underlined" @click="showDetailSelected(data.data.month3)"
                                            v-if="(data.data.month3)"> {{ data.data.month3.value }}</div>
                                    </template>
                                    <DxColumn caption="4" width="100px" cell-template="month-4" />
                                    <template #month-4="{ data }">
                                        <div class="hover-underlined" @click="showDetailSelected(data.data.month4)"
                                            v-if="(data.data.month4)"> {{ data.data.month4.value }}</div>
                                    </template>
                                    <DxColumn caption="5" width="100px" cell-template="month-5" />
                                    <template #month-5="{ data }">
                                        <div class="hover-underlined" @click="showDetailSelected(data.data.month5)"
                                            v-if="(data.data.month5)"> {{ data.data.month5.value }}</div>
                                    </template>
                                    <DxColumn caption="6" width="100px" cell-template="month-6" />
                                    <template #month-6="{ data }">
                                        <div class="hover-underlined" @click="showDetailSelected(data.data.month6)"
                                            v-if="(data.data.month6)"> {{ data.data.month6.value }}</div>
                                    </template>
                                    <DxColumn caption="7" width="100px" cell-template="month-7" />
                                    <template #month-7="{ data }">
                                        <div class="hover-underlined" @click="showDetailSelected(data.data.month7)"
                                            v-if="(data.data.month7)"> {{ data.data.month7.value }}</div>
                                    </template>
                                    <DxColumn caption="8" width="100px" cell-template="month-8" />
                                    <template #month-8="{ data }">
                                        <div class="hover-underlined" @click="showDetailSelected(data.data.month8)"
                                            v-if="(data.data.month8)"> {{ data.data.month8.value }}</div>
                                    </template>
                                    <DxColumn caption="9" width="100px" cell-template="month-9" />
                                    <template #month-9="{ data }">
                                        <div class="hover-underlined" @click="showDetailSelected(data.data.month9)"
                                            v-if="(data.data.month9)"> {{ data.data.month9.value }}</div>
                                    </template>
                                    <DxColumn caption="10" width="100px" cell-template="month-10" />
                                    <template #month-10="{ data }">
                                        <div class="hover-underlined" @click="showDetailSelected(data.data.month10)"
                                            v-if="data.data.month10">
                                            {{ data.data.month10.value }}
                                        </div>
                                    </template>
                                    <DxColumn caption="11" width="100px" cell-template="month-11" />
                                    <template #month-11="{ data }">
                                        <div class="hover-underlined" @click="showDetailSelected(data.data.month11)"
                                            v-if="(data.data.month11)">
                                            {{ data.data.month11.value }}
                                        </div>
                                    </template>
                                    <DxColumn caption="12" width="100px" cell-template="month-12" />
                                    <template #month-12="{ data }">
                                        <div class="hover-underlined" @click="showDetailSelected(data.data.month12)"
                                            v-if="(data.data.month12)">
                                            {{ data.data.month12.value }}
                                        </div>
                                    </template>
                                </DxDataGrid> 
                            </template>
                        </DxDataGrid>
                    </a-spin>
                </a-col>
                <!-- {{ processKeyPA620 }} processKeyPA620 <br/> -->
                <ComponentDetail v-model:statusBt="statusButton" :isDisabledForm="isDisabledForm"
                    @createdDone="createdDone" ref="formRef" @noSave="changeNoSave"/>
                <CopyMonth :modalStatus="modalCopy" @closePopup="modalCopy = false; statusButton = 10" :monthVal="dataModalCopy"
                    :dateType="dateType" @loadingTable="loadingTable" @dataAddIncomeProcess="dataAddIncomeProcess" />
            </a-row>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from "vue";
import { useStore } from 'vuex';
import { useQuery } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA6/PA620/index";
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxMasterDetail } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import { origindata } from "./utils";
import { companyId } from "@/helpers/commonFunction";
import HistoryPopup from '@/components/HistoryPopup.vue';
import dayjs from 'dayjs';
import filters from "@/helpers/filters";
import ComponentDetail from "./components/ComponentDetail.vue";
import CopyMonth from "./components/CopyMonth.vue";
import queriesHolding from "@/graphql/queries/CM/CM130/index";
export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxPaging, DxSelection, DxExport, DxSearchPanel, DxScrolling, DxToolbar, DxEditing, DxGrouping, DxItem, DxMasterDetail,
        EditOutlined, HistoryOutlined, SearchOutlined, DeleteOutlined, SaveOutlined,
        MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined,
        HistoryPopup, ComponentDetail, CopyMonth,
    },
    setup() {
        let statusButton = ref()
        let actionSave = ref(0)
        let dataSource: any = ref([]);
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const monthClicked = computed(() => store.state.common.processKeyPA620.imputedMonth);
        const rowTable = ref(0);
        const dataModalCopy: any = ref()
        const originData = reactive({ ...origindata, rows: per_page });
        const trigger = ref<boolean>(true);
        const modalCopy = ref<boolean>(false);
        const globalYear = computed(() => store.state.settings.globalYear);
        const processKeyPA620 = computed(() => store.state.common.processKeyPA620);
        const valueCallApiGetIncomeProcessBusinesses = reactive({
            companyId: companyId,
            imputedYear: globalYear.value,
            // imputedMonth: dayjs().month(),
        })
        let dataCustomRes: any = ref([])
        const isRunOnce = ref<boolean>(true);
        const isDisabledForm = ref<boolean>(false);
        const formRef = ref();
        // ================GRAPQL==============================================
        // API QUERY TABLE BIG
        const { refetch: refetchData, loading: loadingGetIncomeProcessBusinesses, onError: errorGetIncomeProcessBusinesses, onResult: resIncomeProcessBusinesses } = useQuery(queries.getIncomeProcessBusinesses, valueCallApiGetIncomeProcessBusinesses, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        resIncomeProcessBusinesses(res => {
            if (res.data?.getIncomeProcessBusinesses) {
                let respon = res.data.getIncomeProcessBusinesses
                dataSource.value = [{
                    companyId: companyId,
                }]
                if (respon.length == 0) {
                    isDisabledForm.value = true;
                } else {
                    isDisabledForm.value = false;
                }
                dataCustomRes.value = [
                    {
                        id: 1,
                        name: "인원",
                    },
                    {
                        id: 2,
                        name: "지급액",
                    },
                    {
                        id: 3,
                        name: "소득세",
                    },
                    {
                        id: 4,
                        name: "지방소득세",
                    },
                    {
                        id: 5,
                        name: "공제총액",
                    },
                    {
                        id: 6,
                        name: "차인지급액",
                    },
                ]
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
                        value: filters.formatCurrency(val.employeeStat?.employeeCount),
                        ...dataAdd
                    }
                    dataCustomRes.value[1]['month' + val.imputedMonth] =
                    {
                        value: filters.formatCurrency(val.incomeStat?.incomePayment),
                        ...dataAdd
                    }
                    dataCustomRes.value[2]['month' + val.imputedMonth] = {
                        value: filters.formatCurrency(val.incomeStat?.withholdingIncomeTax),
                        ...dataAdd
                    }
                    dataCustomRes.value[3]['month' + val.imputedMonth] = {
                        value: filters.formatCurrency(val.incomeStat?.withholdingLocalIncomeTax),
                        ...dataAdd
                    }
                    dataCustomRes.value[4]['month' + val.imputedMonth] = {
                        value: filters.formatCurrency(val.incomeStat?.withholdingIncomeTax + val.incomeStat?.withholdingLocalIncomeTax),
                        ...dataAdd
                    }
                    dataCustomRes.value[5]['month' + val.imputedMonth] = {
                        value: filters.formatCurrency(val.incomeStat?.actualPayment),
                        ...dataAdd
                    }
                    // if (val.imputedMonth == (dayjs().month() + 1)) {
                    //     statusButton.value = val.status
                    //     // if(actionSave.value == 0){
                    //     //     store.state.common.processKeyPA620.imputedYear = val.imputedYear
                    //     //     store.state.common.processKeyPA620.imputedMonth = val.imputedMonth
                    //     //     store.state.common.processKeyPA620.paymentYear = val.paymentYear
                    //     //     store.state.common.processKeyPA620.paymentMonth = val.paymentMonth
                    //     // }          
                    // }
                })
                if (isRunOnce.value) {
                    isRunOnce.value = false;
                    if (dataSource.value[0]['month' + `${dayjs().month() + 1}`]) {
                    showDetailSelected(dataSource.value[0]['month' + `${dayjs().month() + 1}`]);
                    }
                }

            }
        })
        errorGetIncomeProcessBusinesses(res => {
            notification('error', res.message)
        })
        // get config to check default date type
        const dateType = ref<number>(1);
        const dataQuery = ref({ companyId: companyId, imputedYear: globalYear.value });
        const { result: resultConfig } = useQuery(
            queriesHolding.getWithholdingConfig,
            dataQuery,
            () => ({
                fetchPolicy: "no-cache",
            })
        );
        watch(resultConfig, (newVal) => {
            const data = newVal.getWithholdingConfig;
            dateType.value = data.paymentType;
            store.state.common.paymentDayPA620 = data.paymentDay;
        });
        // ================FUNCTION============================================ 
        // fnc click month fake
        const changeMonthDataFake = ref();
        const onChangeMonth=( data: any )=>{
            store.commit("common/processKeyPA620", { imputedMonth: data.imputedMonth });
            statusButton.value = data.status
            store.state.common.processKeyPA620.imputedYear = data.imputedYear
            store.state.common.processKeyPA620.imputedMonth = data.imputedMonth
            store.state.common.processKeyPA620.paymentYear = data.paymentYear
            store.state.common.processKeyPA620.paymentMonth = data.paymentMonth;
        }  
        const showDetailSelected = (data: any) => {
          if(formRef.value.compareForm()){
            onChangeMonth(data)
          }else {
            formRef.value.isClickMonthDiff = true;
            formRef.value.rowChangeStatus = true;
            changeMonthDataFake.value = data;
          }
            
        }
        const saving = () => {
            actionSave.value++;
        }
        const createdDone = () => {
            refetchData()
        }
        const addMonth = (month: number) => {
            dataModalCopy.value = month;
            modalCopy.value = true;
        }
        const loadingTable = () => {
            isRunOnce.value = true;
            refetchData();
        }
        const dataAddIncomeProcess = (data: any) => {
            dataSource.value[0]['month' + data.imputedMonth] = data
            dataSource.value[0]['month' + data.imputedMonth].status = 10
            isDisabledForm.value = false;
            setUnderline(data);
        }
        const setUnderline = (monthInputed: any) => {
            return monthClicked.value == monthInputed
        }
        const changeNoSave = () => {
          console.log(`output- chay vao day`,)
          onChangeMonth(changeMonthDataFake.value)
        }
        // ======================================== WATCH =========================================
        watch (globalYear, (newVal) => {
            isRunOnce.value = true;
            valueCallApiGetIncomeProcessBusinesses.imputedYear = newVal;
            store.commit("common/processKeyPA620", { imputedYear: globalYear.value, paymentYear: globalYear.value });
            formRef.value.resetForm();
        })

        return {
            modalCopy, actionSave, statusButton, dataCustomRes, globalYear, loadingGetIncomeProcessBusinesses, rowTable, dataSource, per_page, move_column, colomn_resize, originData, dataModalCopy, dateType, isDisabledForm,
            setUnderline, createdDone, addMonth, saving, showDetailSelected, loadingTable, dataAddIncomeProcess,processKeyPA620,formRef,changeNoSave
        };
    },
});
</script>  
<style scoped lang="scss" src="./style/style.scss" >

</style>
