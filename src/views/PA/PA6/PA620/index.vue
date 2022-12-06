<template>
    <action-header title="사업소득자등록" @actionSave="saving($event)" :buttonDelete="false" />
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
                <a-col :span="21"></a-col>

                <a-col :span="24">
                    <a-spin :spinning="loadingGetEmployeeBusinesses || loadingUpdate || loadingDelete" size="large">
                        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                            :show-borders="true" key-expr="companyId" @exporting="onExporting"
                            :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                            :column-auto-width="true" :focused-row-enabled="true">
                            <DxScrolling column-rendering-mode="virtual" />
                            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                            <DxExport :enabled="true" :allow-export-selected-data="true" />
                            <DxToolbar>
                                <DxItem location="after" template="pagination-table" />
                                <DxItem name="searchPanel" />
                                <DxItem name="exportButton" />
                                <DxItem location="after" template="button-history" css-class="cell-button-add" />
                                <DxItem location="after" template="button-template" css-class="cell-button-add" />
                                <DxItem name="addRowButton" show-text="always" />
                            </DxToolbar>
                            <template #button-template>
                                <DxButton icon="plus" @click="addRow" />
                            </template>
                            <template #button-history style="border-color: #ddd;">
                                <DxButton icon="plus">
                                    <HistoryOutlined style="font-size: 18px;" @click="modalHistory" />
                                </DxButton>
                            </template>
                            <template #pagination-table>
                                <div v-if="rowTable > originData.rows">
                                    <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows"
                                        :total="rowTable" show-less-items />
                                </div>
                            </template>

                            <DxColumn :caption="globalYear + ' 귀속월'" cell-template="col-first" data-type="string" />
                            <template #col-first="{ data }">
                                <b>지급연월</b><br>
                                <span>{{ data.data.imputedYear }}-{{ data.data.imputedMonth }}</span>
                            </template>
                            <DxColumn caption="1" width="100px" cell-template="month-1" />
                            <template #month-1="{ data }">
                                <div v-if="(data.data.imputedMonth == 1)">{{ data.data.imputedMonth }}</div>
                            </template>
                            <DxColumn caption="2" width="100px" cell-template="month-2" />
                            <template #month-2="{ data }">
                                <div v-if="(data.data.imputedMonth == 2)">{{ data.data.imputedMonth }}</div>
                            </template>
                            <DxColumn caption="3" width="100px" cell-template="month-3" />
                            <template #month-3="{ data }">
                                <div v-if="(data.data.imputedMonth == 3)">{{ data.data.imputedMonth }}</div>
                            </template>
                            <DxColumn caption="4" width="100px" cell-template="month-4" />
                            <template #month-4="{ data }">
                                <div v-if="(data.data.imputedMonth == 4)">{{ data.data.imputedMonth }}</div>
                            </template>
                            <DxColumn caption="5" width="100px" cell-template="month-5" />
                            <template #month-5="{ data }">
                                <div v-if="(data.data.imputedMonth == 5)">{{ data.data.imputedMonth }}</div>
                            </template>
                            <DxColumn caption="6" width="100px" cell-template="month-6" />
                            <template #month-6="{ data }">
                                <div v-if="(data.data.imputedMonth == 6)">{{ data.data.imputedMonth }}</div>
                            </template>
                            <DxColumn caption="7" width="100px" cell-template="month-7" />
                            <template #month-7="{ data }">
                                <div v-if="(data.data.imputedMonth == 7)">{{ data.data.imputedMonth }}</div>
                            </template>
                            <DxColumn caption="8" width="100px" cell-template="month-8" />
                            <template #month-8="{ data }">
                                <div v-if="(data.data.imputedMonth == 8)">{{ data.data.imputedMonth }}</div>
                            </template>
                            <DxColumn caption="9" width="100px" cell-template="month-9" />
                            <template #month-9="{ data }">
                                <div v-if="(data.data.imputedMonth == 9)">{{ data.data.imputedMonth }}</div>
                            </template>
                            <DxColumn caption="10" width="100px" cell-template="month-10" />
                            <template #month-10="{ data }">
                                <div v-if="(data.data.imputedMonth == 10)">
                                    <colorful-badge :value="data.data.status" :year="data.data.imputedYear"
                                        :month="data.data.imputedMonth" />
                                </div>
                            </template>
                            <DxColumn caption="11" width="100px" cell-template="month-11" />
                            <template #month-11="{ data }">
                                <div v-if="(data.data.imputedMonth == 11)">{{ data.data.imputedMonth }}</div>
                            </template>
                            <DxColumn caption="12" width="100px" cell-template="month-12" />
                            <template #month-12="{ data }">
                                <div v-if="(data.data.imputedMonth == 12)">{{ data.data.imputedMonth }}</div>
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
                                            <div v-if="(data.data.month == 1)">{{ data.data.value }}</div>
                                        </template>
                                        <DxColumn caption="2" width="100px" cell-template="month-2" />
                                        <template #month-2="{ data }">
                                            <div v-if="(data.data.month == 2)">{{ data.data.value }}</div>
                                        </template>
                                        <DxColumn caption="3" width="100px" cell-template="month-3" />
                                        <template #month-3="{ data }">
                                            <div v-if="(data.data.month == 3)">{{ data.data.value }}</div>
                                        </template>
                                        <DxColumn caption="4" width="100px" cell-template="month-4" />
                                        <template #month-4="{ data }">
                                            <div v-if="(data.data.month == 4)">{{ data.data.value }}</div>
                                        </template>
                                        <DxColumn caption="5" width="100px" cell-template="month-5" />
                                        <template #month-5="{ data }">
                                            <div v-if="(data.data.month == 5)">{{ data.data.value }}</div>
                                        </template>
                                        <DxColumn caption="6" width="100px" cell-template="month-6" />
                                        <template #month-6="{ data }">
                                            <div v-if="(data.data.month == 6)">{{ data.data.value }}</div>
                                        </template>
                                        <DxColumn caption="7" width="100px" cell-template="month-7" />
                                        <template #month-7="{ data }">
                                            <div v-if="(data.data.month == 7)">{{ data.data.value }}</div>
                                        </template>
                                        <DxColumn caption="8" width="100px" cell-template="month-8" />
                                        <template #month-8="{ data }">
                                            <div v-if="(data.data.month == 8)">{{ data.data.value }}</div>
                                        </template>
                                        <DxColumn caption="9" width="100px" cell-template="month-9" />
                                        <template #month-9="{ data }">
                                            <div v-if="(data.data.month == 9)">{{ data.data.value }}</div>
                                        </template>
                                        <DxColumn caption="10" width="100px" cell-template="month-10" />
                                        <template #month-10="{ data }">
                                            <div v-if="data.data.month == 10">{{ data.data.value }}</div>
                                        </template>
                                        <DxColumn caption="11" width="100px" cell-template="month-11" />
                                        <template #month-11="{ data }">
                                            <div v-if="(data.data.month == 11)">{{ data.data.value }}
                                            </div>
                                        </template>
                                        <DxColumn caption="12" width="100px" cell-template="month-12" />
                                        <template #month-12="{ data }">
                                            <div v-if="(data.data.month == 12)">{{ data.data.value }}
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
                        <div class="table-detail-left">
                            <DxButton text="귀 {yyyy-mm}" />
                            <DxButton text="귀 {yyyy-mm}" />
                            <process-status v-model:valueStatus="status" />
                        </div>
                    </div>
                </a-col>

                <!-- <a-col :span="16" class="custom-layout">
                    <a-spin :spinning="loadingGetEmployeeBusinesses || loadingUpdate || loadingDelete" size="large">
                        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                            :show-borders="true" key-expr="employeeId" @exporting="onExporting"
                            :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                            :column-auto-width="true" :onRowClick="actionEdit" :focused-row-enabled="true">
                            <DxScrolling column-rendering-mode="virtual" />
                            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                            <DxExport :enabled="true" :allow-export-selected-data="true" />
                            <DxToolbar>
                                <DxItem location="after" template="pagination-table" />
                                <DxItem name="searchPanel" />
                                <DxItem name="exportButton" />
                                <DxItem location="after" template="button-history" css-class="cell-button-add" />
                                <DxItem location="after" template="button-template" css-class="cell-button-add" /> 
                                <DxItem name="addRowButton" show-text="always" /> 
                            </DxToolbar>
                            <template #button-template>
                                <DxButton icon="plus" @click="addRow" />
                            </template>
                            <template #button-history style="border-color: #ddd;">
                                <DxButton icon="plus">
                                    <HistoryOutlined style="font-size: 18px;" @click="modalHistory" />
                                </DxButton>
                            </template>
                            <template #pagination-table>
                                <div v-if="rowTable > originData.rows">
                                    <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows"
                                        :total="rowTable" show-less-items />
                                </div>
                            </template>
                            <DxColumn caption="성명 (상호)" cell-template="tag" />
                            <template #tag="{ data }" class="custom-action">
                                <div class="custom-action">
                                    <employee-info :idEmployee="data.data.employeeId" :name="data.data.name"
                                        :idCardNumber="data.data.residentId" :status="data.data.status"
                                        :foreigner="data.data.foreigner" :checkStatus="false" />
                                </div>
                            </template>

                            <DxColumn caption="주민등록번호" cell-template="resident-id" width="200px" />
                            <template #resident-id="{ data }" class="custom-action">
                                <a-tooltip placement="top"
                                    v-if="data.data.residentId?.length == 14
                                    && parseInt(data.data.residentId.split('-')[0].slice(2, 4)) < 13 && parseInt(data.data.residentId.split('-')[0].slice(4, 6)) < 32"
                                    key="black">
                                    {{ data.data.residentId }}
                                </a-tooltip>
                                <a-tooltip placement="top" v-else title="ERROR" color="red">
                                    {{ data.data.residentId }}
                                </a-tooltip>

                            </template>
                            <DxColumn caption="소득부분" cell-template="grade-cell" width="200px" />
                            <template #grade-cell="{ data }" class="custom-action">
                                <income-type :typeCode="data.data.incomeTypeCode"
                                    :typeName="data.data.incomeTypeName" />
                            </template>

                            <DxColumn :width="70" cell-template="pupop" />
                            <template #pupop="{ data }" class="custom-action">
                                <div class="custom-action" style="text-align: center;"> 
                                    <a-tooltip placement="top" v-if="data.data.deletable == true"
                                        @click="actionDelete(data.data.employeeId, data.data.incomeTypeCode)">
                                        <template #title>변경이력</template>
                                        <DeleteOutlined />
                                    </a-tooltip>
                                </div>
                            </template>
                        </DxDataGrid>
                        <div class="pagination-table" v-if="rowTable > originData.rows">
                            <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows"
                                :total="rowTable" show-less-items style="margin-top: 10px" />
                        </div>
                    </a-spin>
                </a-col>
                <a-col :span="8" class="custom-layout">
                    <a-spin :spinning="loadingGetEmployeeBusinessesDetail || loadingUpdate" size="large">
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
                </a-col> -->
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

export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxPaging, DxSelection, DxExport, DxSearchPanel, DxScrolling, DxToolbar, DxEditing, DxGrouping, DxItem, DxButton, DxMasterDetail,
        EditOutlined, HistoryOutlined, SearchOutlined, DeleteOutlined, SaveOutlined,
        MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, ArrForeigner,
        HistoryPopup
    },
    setup() {
        let arrEdit: any = []
        let status = 30
        const contentDelete = Message.getMessage('PA120', '002').message
        let popupData = ref([])
        let modalHistoryStatus = ref<boolean>(false)
        const dataSource = ref([]);
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
        const valueCallApiGetEmployeeBusinesses = reactive({
            companyId: companyId,
            imputedYear: globalYear,
            // imputedMonth: dayjs().month(),
        })
        let valueCallApiGetEmployeeBusiness = reactive({
            companyId: companyId,
            imputedYear: globalYear,
            incomeTypeCode: '',
            employeeId: null
        })
        let dataCustomRes: any = reactive([])
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
        let disabledInput = ref(false)
        let disabledInput2 = ref(true)
        const modalStatus = ref(false)
        const textResidentId = ref('주민등록번호')
        // ================GRAPQL==============================================
        const { refetch: refetchData, loading: loadingGetEmployeeBusinesses, onError: errorGetEmployeeBusinesses, onResult: resEmployeeBusinesses } = useQuery(queries.getIncomeProcessBusinesses, valueCallApiGetEmployeeBusinesses, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        resEmployeeBusinesses(res => {
            let respon = res.data.getIncomeProcessBusinesses
            dataSource.value = respon
            respon.map((val: any) => {
                dataCustomRes.push(
                    {
                        id: 1,
                        name: "인원",
                        imputedYear: val.imputedYear,
                        month: val.imputedMonth,
                        value: val.employeeStat.employeeCount.toLocaleString('en-US', { currency: 'VND' })
                    },
                    {
                        id: 2,
                        name: "지급액",
                        imputedYear: val.imputedYear,
                        month: val.imputedMonth,
                        value: val.incomeStat.incomePayment.toLocaleString('en-US', { currency: 'VND' })
                    },
                    {
                        id: 3,
                        name: "소득세",
                        imputedYear: val.imputedYear,
                        month: val.imputedMonth,
                        value: val.incomeStat.withholdingIncomeTax.toLocaleString('en-US', { currency: 'VND' })
                    },
                    {
                        id: 4,
                        name: "지방소득세",
                        imputedYear: val.imputedYear,
                        month: val.imputedMonth,
                        value: val.incomeStat.withholdingLocalIncomeTax.toLocaleString('en-US', { currency: 'VND' })
                    },
                    {
                        id: 5,
                        name: "공제총액",
                        imputedYear: val.imputedYear,
                        month: val.imputedMonth,
                        value: val.incomeStat.withholdingIncomeTax + val.incomeStat.withholdingLocalIncomeTax.toLocaleString('en-US', { currency: 'VND' })
                    },
                    {
                        id: 6,
                        name: "차인지급액",
                        imputedYear: val.imputedYear,
                        month: val.imputedMonth,
                        value: val.incomeStat.actualPayment.toLocaleString('en-US', { currency: 'VND' })
                    },
                )
            })
        })
        errorGetEmployeeBusinesses(res => {
            notification('error', res.message)
        })

        const { refetch: refetchDataDetail, loading: loadingGetEmployeeBusinessesDetail, onError: errorGetEmployeeBusinessesDetail, onResult: resEmployeeBusinessesDetail } = useQuery(queries.getEmployeeBusiness, valueCallApiGetEmployeeBusiness, () => ({
            enabled: triggerDetail.value,
            fetchPolicy: "no-cache",
        }));
        resEmployeeBusinessesDetail(res => {

        })
        errorGetEmployeeBusinessesDetail(res => {
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
        const saving = (e: any) => {

        }

        const addRow = () => {

        }

        const actionDelete = (employeeId: any, incomeTypeCode: any) => {
            valueCallApiGetEmployeeBusiness.incomeTypeCode = incomeTypeCode
            valueCallApiGetEmployeeBusiness.employeeId = employeeId
            modalStatus.value = true
        }

        const statusComfirm = (res: any) => {
            if (res == true)
                actionDeleteApi(valueCallApiGetEmployeeBusiness)

        }

        const modalHistory = () => {
            modalHistoryStatus.value = true;
        }

        return {
            status,
            dataCustomRes,
            globalYear,
            textResidentId,
            disabledInput2,
            popupData,
            modalHistoryStatus,
            loadingCreated,
            disabledInput,
            loadingGetEmployeeBusinessesDetail,
            loadingGetEmployeeBusinesses,
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
            modalHistory,
            statusComfirm,
            actionDelete,
            addRow,
            changeTextTypeCode,
            actionEdit,
            onExporting,
            changeTextCountry,
            saving
        };
    },
});
</script>  
<style scoped lang="scss" src="./style/style.scss" >

</style>
