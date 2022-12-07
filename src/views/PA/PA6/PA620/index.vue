<template>
    <action-header title="사업소득자등록" />
    <div id="pa-620">
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
                    <a-spin :spinning="loadingGetIncomeProcessBusinesses || loadingUpdate || loadingDelete"
                        size="large">
                        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                            :show-borders="true" key-expr="companyId" @exporting="onExporting"
                            :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                            :column-auto-width="true" :focused-row-enabled="true">
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
                                        :year="data.data.month1.imputedYear" :month="data.data.month1.imputedMonth" />
                                </div>
                            </template>
                            <DxColumn caption="2" width="100px" cell-template="month-2" />
                            <template #month-2="{ data }">
                                <div class="hover-underlined" v-if="data.data.month2"
                                    @click="showDetailSelected(data.data.month2.imputedMonth, data.data.month2.imputedYear, data.data.month2.paymentYear, data.data.month2.paymentMonth)">
                                    <colorful-badge :value="data.data.month2.status"
                                        :year="data.data.month2.imputedYear" :month="data.data.month2.imputedMonth" />
                                </div>
                            </template>
                            <DxColumn caption="3" width="100px" cell-template="month-3" />
                            <template #month-3="{ data }">
                                <div class="hover-underlined" v-if="data.data.month3"
                                    @click="showDetailSelected(data.data.month3.imputedMonth, data.data.month3.imputedYear, data.data.month3.paymentYear, data.data.month3.paymentMonth)">
                                    <colorful-badge :value="data.data.month3.status"
                                        :year="data.data.month3.imputedYear" :month="data.data.month3.imputedMonth" />
                                </div>
                            </template>
                            <DxColumn caption="4" width="100px" cell-template="month-4" />
                            <template #month-4="{ data }">
                                <div class="hover-underlined" v-if="data.data.month4"
                                    @click="showDetailSelected(data.data.month4.imputedMonth, data.data.month4.imputedYear, data.data.month4.paymentYear, data.data.month4.paymentMonth)">
                                    <colorful-badge :value="data.data.month4.status"
                                        :year="data.data.month4.imputedYear" :month="data.data.month4.imputedMonth" />
                                </div>
                            </template>
                            <DxColumn caption="5" width="100px" cell-template="month-5" />
                            <template #month-5="{ data }">
                                <div class="hover-underlined" v-if="data.data.month5"
                                    @click="showDetailSelected(data.data.month5.imputedMonth, data.data.month5.imputedYear, data.data.month5.paymentYear, data.data.month5.paymentMonth)">
                                    <colorful-badge :value="data.data.month5.status"
                                        :year="data.data.month5.imputedYear" :month="data.data.month5.imputedMonth" />
                                </div>
                            </template>
                            <DxColumn caption="6" width="100px" cell-template="month-6" />
                            <template #month-6="{ data }">
                                <div class="hover-underlined" v-if="data.data.month6"
                                    @click="showDetailSelected(data.data.month6.imputedMonth, data.data.month6.imputedYear, data.data.month6.paymentYear, data.data.month6.paymentMonth)">
                                    <colorful-badge :value="data.data.month6.status"
                                        :year="data.data.month6.imputedYear" :month="data.data.month6.imputedMonth" />
                                </div>
                            </template>
                            <DxColumn caption="7" width="100px" cell-template="month-7" />
                            <template #month-7="{ data }">
                                <div class="hover-underlined" v-if="data.data.month7"
                                    @click="showDetailSelected(data.data.month7.imputedMonth, data.data.month7.imputedYear, data.data.month7.paymentYear, data.data.month7.paymentMonth)">
                                    <colorful-badge :value="data.data.month7.status"
                                        :year="data.data.month7.imputedYear" :month="data.data.month7.imputedMonth" />
                                </div>
                            </template>
                            <DxColumn caption="8" width="100px" cell-template="month-8" />
                            <template #month-8="{ data }">
                                <div class="hover-underlined" v-if="data.data.month8"
                                    @click="showDetailSelected(data.data.month8.imputedMonth, data.data.month8.imputedYear, data.data.month8.paymentYear, data.data.month8.paymentMonth)">
                                    <colorful-badge :value="data.data.month8.status"
                                        :year="data.data.month8.imputedYear" :month="data.data.month8.imputedMonth" />
                                </div>
                            </template>
                            <DxColumn caption="9" width="100px" cell-template="month-9" />
                            <template #month-9="{ data }">
                                <div class="hover-underlined" v-if="data.data.month9"
                                    @click="showDetailSelected(data.data.month9.imputedMonth, data.data.month9.imputedYear, data.data.month9.paymentYear, data.data.month9.paymentMonth)">
                                    <colorful-badge :value="data.data.month9.status"
                                        :year="data.data.month9.imputedYear" :month="data.data.month9.imputedMonth" />
                                </div>
                            </template>
                            <DxColumn caption="10" width="100px" cell-template="month-10" />
                            <template #month-10="{ data }">
                                <div class="hover-underlined" v-if="data.data.month10"
                                    @click="showDetailSelected(data.data.month10.imputedMonth, data.data.month10.imputedYear, data.data.month10.paymentYear, data.data.month10.paymentMonth)">
                                    <colorful-badge :value="data.data.month10.status"
                                        :year="data.data.month10.imputedYear" :month="data.data.month10.imputedMonth" />
                                </div>
                            </template>
                            <DxColumn caption="11" width="100px" cell-template="month-11" />
                            <template #month-11="{ data }">
                                <div class="hover-underlined" v-if="data.data.month11"
                                    @click="showDetailSelected(data.data.month11.imputedMonth, data.data.month11.imputedYear, data.data.month11.paymentYear, data.data.month11.paymentMonth)">
                                    <colorful-badge :value="data.data.month11.status"
                                        :year="data.data.month11.imputedYear" :month="data.data.month11.imputedMonth" />
                                </div>
                            </template>
                            <DxColumn caption="12" width="100px" cell-template="month-12" />
                            <template #month-12="{ data }">
                                <div class="hover-underlined" v-if="data.data.month12"
                                    @click="showDetailSelected(data.data.month12.imputedMonth, data.data.month12.imputedYear, data.data.month12.paymentYear, data.data.month12.paymentMonth)">
                                    <colorful-badge :value="data.data.month12.status"
                                        :year="data.data.month12.imputedYear" :month="data.data.month12.imputedMonth" />
                                </div>
                            </template>
                            <DxMasterDetail class="table-detail" :enabled="true" template="detailRow" />
                            <template #detailRow="{ data }">
                                <div class="table-detail">
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
                                </div>
                            </template>
                        </DxDataGrid>
                        <div class="pagination-table" v-if="rowTable > originData.rows">
                            <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows"
                                :total="rowTable" show-less-items style="margin-top: 10px" />
                        </div>
                    </a-spin>
                </a-col>

                <a-col :span="24">
                    <div class="header-detail-main">
                        <div class="table-detail-left d-flex-center">
                            <div class="text-box-1">귀 {yyyy-mm}</div>
                            <div class="text-box-2">귀 {yyyy-mm}</div>
                            <process-status v-model:valueStatus="status" />
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
                            :show-borders="true" key-expr="employeeId" @exporting="onExporting"
                            :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                            :column-auto-width="true" :onRowClick="actionEdit" :focused-row-enabled="true">
                            <DxScrolling column-rendering-mode="virtual" />
                            <DxColumn caption="기타소득자 [소득구분]" cell-template="tag" />
                            <template #tag="{ data }" class="custom-action">
                                <income-type :typeCode="data.data.incomeTypeCode"
                                    :typeName="(data.data.employee.name + data.data.employee.name)" />
                            </template>
                            <DxColumn caption="지급일" data-field="paymentDay" />
                            <DxColumn caption="지급액" data-field="paymentAmount" />
                            <DxColumn caption="세율" data-field="taxRate" />
                            <DxColumn caption="공제" cell-template="income-tax" />
                            <template #income-tax="{ data }" class="custom-action">
                                <div>
                                    {{ data.data.withholdingIncomeTax + data.data.withholdingLocalIncomeTax }}
                                </div>
                            </template>
                            <DxColumn caption="차인지급액" data-field="actualPayment" />

                        </DxDataGrid>
                        <div class="pagination-table" v-if="rowTable > originData.rows">
                            <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows"
                                :total="rowTable" show-less-items style="margin-top: 10px" />
                        </div>
                    </a-spin>
                </a-col>
                <a-col :span="8" class="custom-layout">
                    <a-spin :spinning="loadingTableDetail" size="large">
                        <a-form-item label="영업자코드" label-align="right">
                            <div class="custom-note">
                                <text-number-box width="200px" v-model:valueInput="dataAction.employeeId"
                                    placeholder="숫자만 입력 가능" :disabled="disabledInput" :required="true" />
                                <span>
                                    <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 최초 저장된 이후
                                    수정 불가
                                </span>
                            </div>
                        </a-form-item>
                        <a-form-item label="성명(상호)" label-align="right">
                            <default-text-box v-model:valueInput="dataAction.input.name" width="200px"
                                placeholder="한글,영문(대문자) 입력 가능" :required="true" />
                        </a-form-item>
                        <a-form-item label="내/외국인" label-align="right">
                            <radio-group :arrayValue="arrForeigner" width="200px"
                                v-model:valueRadioCheck="dataAction.input.foreigner" layoutCustom="horizontal" />
                        </a-form-item>
                        <a-form-item label="외국인 국적" label-align="right">
                            <country-code-select-box v-model:valueCountry="dataAction.input.nationalityCode"
                                @textCountry="changeTextCountry" width="200px" :disabled="disabledInput2" />
                        </a-form-item>
                        <a-form-item label="외국인 체류자격" label-align="right">
                            <stay-qualification-select-box :disabled="disabledInput2"
                                v-model:valueStayQualifiction="dataAction.input.stayQualification" width="200px" />
                        </a-form-item>
                        <a-form-item :label="textResidentId" label-align="right">
                            <id-number-text-box v-model:valueInput="dataAction.input.residentId" width="200px"
                                placeholder="숫자 13자리" :required="true" />
                        </a-form-item>
                        <a-form-item label="소득구분" label-align="right">
                            <type-code-select-box width="200px" v-model:valueInput="dataAction.incomeTypeCode"
                                @textTypeCode="changeTextTypeCode" :disabled="disabledInput" />
                        </a-form-item>
                        <a-form-item label="이메일" label-align="right">
                            <div class="custom-note">
                                <mail-text-box width="300px" v-model:valueInput="dataAction.input.email"
                                    placeholder="abc@example.com" :required="true" />
                                <span>
                                    <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 원천징수영수증 등
                                    주요 서류를 메일로 전달 가능합니다.
                                </span>
                            </div>
                        </a-form-item>
                    </a-spin>
                </a-col>
            </a-row>
        </div>
    </div>
    <PopupMessage :modalStatus="modalStatus" @closePopup="modalStatus = false" typeModal="confirm"
        :content="contentDelete" okText="네" cancelText="아니요" @checkConfirm="statusComfirm" />
    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="popupData"
        title="변경이력" typeHistory="pa-620" />
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from "vue";
import { useStore } from 'vuex';
import { useQuery, useMutation } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA6/PA620/index";
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxMasterDetail } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import { onExportingCommon } from "@/helpers/commonFunction"
import { origindata, ArrForeigner } from "./utils";
import DxButton from "devextreme-vue/button";
import { companyId } from "@/helpers/commonFunction";
import mutations from "@/graphql/mutations/PA/PA6/PA620/index";
import HistoryPopup from '@/components/HistoryPopup.vue';
import { Message } from "@/configs/enum"
import dayjs, { Dayjs } from 'dayjs';
import filters from "@/helpers/filters";

export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxPaging, DxSelection, DxExport, DxSearchPanel, DxScrolling, DxToolbar, DxEditing, DxGrouping, DxItem, DxButton, DxMasterDetail,
        EditOutlined, HistoryOutlined, SearchOutlined, DeleteOutlined, SaveOutlined,
        MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, ArrForeigner,
        HistoryPopup
    },
    setup() {
        let status = 30
        let popupData = ref([])
        let modalHistoryStatus = ref<boolean>(false)
        let dataSource: any = ref([]);
        let dataSourceDetail = ref([]);
        let disabledInput = ref(false)
        let disabledInput2 = ref(true)
        const contentDelete = Message.getMessage('PA120', '002').message
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const rowTable = ref(0);
        const originData = reactive({ ...origindata, rows: per_page });
        const arrForeigner = ArrForeigner
        const trigger = ref<boolean>(true);
        const triggerDetail = ref<boolean>(false);
        const globalYear = computed(() => store.state.settings.globalYear)

        const valueCallApiGetIncomeProcessBusinesses = reactive({
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
                imputedYear: 2022,
                imputedMonth: 10,
                paymentYear: 2022,
                paymentMonth: 1
            }
        })
        let dataCustomRes: any = ref([])
        let dataAction = reactive({
            companyId: companyId,
            imputedYear: globalYear,
            employeeId: null,
            incomeTypeCode: '940100',
            input: {
                name: '',
                foreigner: false,
                nationality: '대한민국',
                nationalityCode: 'KR',
                stayQualification: 'C-4',
                residentId: '',
                incomeTypeName: '저술가',
                email: '',
            }
        })
        const modalStatus = ref(false)
        const textResidentId = ref('주민등록번호')
        // ================GRAPQL==============================================

        // API QUERY TABLE BIG
        const { refetch: refetchData, loading: loadingGetIncomeProcessBusinesses, onError: errorGetIncomeProcessBusinesses, onResult: resIncomeProcessBusinesses } = useQuery(queries.getIncomeProcessBusinesses, valueCallApiGetIncomeProcessBusinesses, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        resIncomeProcessBusinesses(res => {
            let respon = res.data.getIncomeProcessBusinesses
            dataSource.value = [{
                companyId: companyId,
            }]

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
                    value: filters.formatCurrency(val.employeeStat.employeeCount),
                    ...dataAdd
                }
                dataCustomRes.value[1]['month' + val.imputedMonth] =
                {
                    value: filters.formatCurrency(val.incomeStat.incomePayment),
                    ...dataAdd
                }
                dataCustomRes.value[2]['month' + val.imputedMonth] = {
                    value: filters.formatCurrency(val.incomeStat.withholdingIncomeTax),
                    ...dataAdd
                }
                dataCustomRes.value[3]['month' + val.imputedMonth] = {
                    value: filters.formatCurrency(val.incomeStat.withholdingLocalIncomeTax),
                    ...dataAdd
                }
                dataCustomRes.value[4]['month' + val.imputedMonth] = {
                    value: filters.formatCurrency(val.incomeStat.withholdingIncomeTax + val.incomeStat.withholdingLocalIncomeTax),
                    ...dataAdd
                }
                dataCustomRes.value[5]['month' + val.imputedMonth] = {
                    value: filters.formatCurrency(val.incomeStat.actualPayment),
                    ...dataAdd
                }

                if (val.imputedMonth == dayjs().month()) {
                    dataCallTableSmall.processKey.imputedMonth = val.imputedMonth
                    dataCallTableSmall.processKey.imputedYear = val.imputedYear
                    dataCallTableSmall.processKey.paymentMonth = val.paymentMonth
                    dataCallTableSmall.processKey.paymentYear = val.paymentYear

                    triggerDetail.value = true
                    refetchTableDetail()
                }

            })
        })
        errorGetIncomeProcessBusinesses(res => {
            notification('error', res.message)
        })

        // API QUERY TABLE SMALL LEFT SIDE
        const { refetch: refetchTableDetail, loading: loadingTableDetail, onError: errorGetIncomeProcessBusinessesDetail, onResult: resIncomeProcessBusinessesDetail } = useQuery(queries.getIncomeBusinesses, valueCallApiGetEmployeeBusiness, () => ({
            enabled: triggerDetail.value,
            fetchPolicy: "no-cache",
        }));
        resIncomeProcessBusinessesDetail(res => {
            dataSourceDetail.value = res.data.getIncomeBusinesses
            console.log(dataSourceDetail.value);

        })
        errorGetIncomeProcessBusinessesDetail(res => {
            notification('error', res.message)
        })

        const {
            mutate: actionUpdate,
            onError: upadateErr,
            loading: loadingUpdate,
            onDone: updateDone,
        } = useMutation(mutations.updateEmployeeBusiness);
        updateDone(res => {
            refetchData()
            notification('success', `업데이트 완료!`)
        })
        upadateErr(res => {
            notification('error', res.message)
        })

        const {
            mutate: actionCreated,
            onError: createdErr,
            loading: loadingCreated,
            onDone: createdDone,
        } = useMutation(mutations.createEmployeeBusiness);
        createdDone(res => {
            refetchData()
            notification('success', `업데이트 완료!`)
        })
        createdErr(res => {
            notification('error', res.message)
        })

        const {
            mutate: actionDeleteApi,
            onError: deleteError,
            loading: loadingDelete,
            onDone: deleteDone,
        } = useMutation(mutations.deleteEmployeeBusiness);
        deleteError(res => {
            notification('error', res.message)
        })
        deleteDone(res => {
            refetchData()
            notification('success', `업데이트 완료!`)
        })

        // ================WATCHING============================================


        // ================FUNCTION============================================
        const onExporting = (e: any) => {
            onExportingCommon(e.component, e.cancel, '영업자관리')
        };
        const actionEdit = (data: any) => {

        }

        const changeTextCountry = (text: any) => {
            dataAction.input.nationality = text
        }
        const changeTextTypeCode = (text: any) => {
            dataAction.input.incomeTypeName = text
        }


        const addRow = () => {

        }


        const statusComfirm = (res: any) => {
            if (res == true)
                actionDeleteApi(valueCallApiGetEmployeeBusiness)

        }


        const showDetailSelected = (imputedMonth: any, imputedYear: any, paymentYear: any, paymentMonth: any) => {
            console.log(imputedMonth);
            console.log(imputedYear);
            console.log(paymentYear);
            console.log(paymentMonth);

        }

        return {
            dataSourceDetail,
            status,
            dataCustomRes,
            globalYear,
            textResidentId,
            disabledInput2,
            popupData,
            modalHistoryStatus,
            loadingCreated,
            disabledInput,
            loadingTableDetail,
            loadingGetIncomeProcessBusinesses,
            arrForeigner,
            rowTable,
            dataSource,
            per_page, move_column, colomn_resize,
            originData,
            dataAction,
            loadingUpdate,
            loadingDelete,
            modalStatus,
            contentDelete,
            showDetailSelected,
            statusComfirm,
            addRow,
            changeTextTypeCode,
            actionEdit,
            onExporting,
            changeTextCountry,
        };
    },
});
</script>  
<style scoped lang="scss" src="./style/style.scss" >

</style>
