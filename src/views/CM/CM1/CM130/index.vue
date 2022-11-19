<template>
    <div id="cm-130" class="cm-130" style="padding: 24px;">
        <a-spin tip="Loading..." :spinning="loading || loadingWithholdingConfig">
            <a-tabs v-model:activeKey="activeKey" type="card">
                <template #rightExtra>
                    <div class="list-action">
                        <div v-if="activeKey == '1'">
                            <a-tooltip>
                                <template #title>저장</template>
                                <a-button @click="onSubmitConfig">
                                    <SaveOutlined />
                                </a-button>
                            </a-tooltip>
                        </div>
                        <div v-if="activeKey == '2'">
                            <div class="btn-action">
                                <a-tooltip>
                                    <template #title>삭제</template>
                                    <a-button>
                                        <SearchOutlined />
                                    </a-button>
                                </a-tooltip>
                                <a-tooltip>
                                    <template #title>삭제</template>
                                    <a-button>
                                        <DeleteOutlined />
                                    </a-button>
                                </a-tooltip>
                                <a-tooltip>
                                    <template #title>출력</template>
                                    <a-button>
                                        <PrinterOutlined />
                                    </a-button>
                                </a-tooltip>
                            </div>
                        </div>
                    </div>
                </template>
                <a-tab-pane key="1" tab="기본">
                    <a-row>
                        <a-col :span="24">
                            <div class="container">
                                <standard-form formName="index-cm-310">
                                    <h2 style="font-weight: 600; color: gray" class="title-h2">
                                        급여기본설정
                                    </h2>
                                    <a-row>
                                        <a-col :span="12">
                                            <a-form-item label="급여신고주기" :label-col="labelCol">
                                                <radio-group :arrayValue="optionsRadioReportType" v-model:valueRadioCheck="formState.reportType" :layoutCustom="'horizontal'" />
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                    <a-row>
                                        <a-col :span="12">
                                            <a-form-item label="급여지급형태" :label-col="labelCol">
                                                <radio-group :arrayValue="optionsRadioPaymentType" v-model:valueRadioCheck="formState.paymentType" :layoutCustom="'horizontal'" />
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                    <a-row>
                                        <a-col :span="16">
                                            <a-form-item label="급여지급일자" :label-col="labelCol">
                                                <div style="display: flex; align-items: center">
                                                    <number-box
                                                        :width="150"
                                                        :required="true"
                                                        placeholder="Number box"
                                                        :min="0" 
                                                        :max="30"
                                                        v-model:valueInput="formState.paymentDay"
                                                        :spinButtons="true">
                                                    </number-box>
                                                    <span style="margin-left: 5px">일, ( 말일은 ‘0’을 선택하세요)</span>
                                                </div>
                                                <div style=" display: flex; margin-top: 10px; align-items: center; ">
                                                    <info-circle-outlined />
                                                    <span style="margin-left: 5px">
                                                        급여지급일자는 선택사항으로 지정시 급여명세서 등에
                                                        해당 급여일자가 입력되며, 수정 가능합니다.
                                                    </span>
                                                </div>
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                    <a-row>
                                        <a-col :span="12">
                                            <a-form-item>
                                                <div style="margin-left: 50px">
                                                    <span>두루누리 적용 여부 (사업자):</span>
                                                    <switch-basic style="width: 80px; margin-left: 8px;" v-model:valueSwitch="formState.insuranceSupport" :textCheck="'적용'"
                                                        :textUnCheck="'미적용'" />
                                                </div>
                                                <div style="margin-left: 150px; margin-top: 10px">
                                                    <info-circle-outlined />
                                                    <span style="margin-left: 5px">
                                                        사업자 두루누리 미적용시 해당 사원이 두루누리
                                                        적용이더라도 급여계산에 반영되지 않습니다.
                                                    </span>
                                                </div>
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                    <h2 style="font-weight: 600; color: gray" class="title-h2">
                                        관할세무서, 지방소득세 납세지 설정
                                    </h2>
                                    <a-row :gutter="24">
                                        <a-col>
                                            <a-form-item label="사업장주소" :label-col="labelCol">
                                                <default-text-box
                                                    style="width: 574px; margin-right: 10px; float: left;"
                                                    :disabled="true"
                                                    v-model:valueInput="formState.companyAddressInfoAddress">
                                                </default-text-box>
                                                <button-basic class="button-form-modal" :text="'자동선택'" :type="'default'" :mode="'contained'" @onClick="showModal"/>
                                                <a-modal class="container_email" v-model:visible="isShow"
                                                    okText="네. 적용합니다" cancelText="아니오" @ok="handleSuccsess"
                                                    :mask-closable="false" footer="">
                                                    <div id="modal">
                                                        <div style="display: flex">
                                                            <question-circle-outlined
                                                                style="padding-right: 10px; font-size: xxx-large" />
                                                            <div>
                                                                <p style="margin: 0; font-weight: 600">
                                                                    관할세무서 : 송파세무서
                                                                </p>
                                                                <p style="margin: 0; font-weight: 600">
                                                                    지방소득세 납세지 : 서울특별시 송파구
                                                                </p>
                                                                <p style="margin: 0">
                                                                    위 자동으로 선택된 결과로 적용하시겠습니까?
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="text-align-right mt-20">
                                                        <button-basic class="button-form-modal" :text="'아니오'" :type="'default'" :mode="'outlined'" @onClick="setModalVisible()"/>
                                                        <button-basic class="button-form-modal" :text="'네. 적용합니다'" :width="140" :type="'default'" :mode="'contained'" @onClick="handleSuccsess"/>
                                                    </div>
                                                </a-modal>
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                    <a-row>
                                        <a-col>
                                            <a-row :gutter="24">
                                                <a-col>
                                                    <a-form-item label="관할세무서" :label-col="labelCol">
                                                        <default-text-box
                                                            style="width: 200px;"
                                                            :disabled="true"
                                                            v-model:valueInput="formState.competentTaxOfficeCode">
                                                        </default-text-box>
                                                    </a-form-item>
                                                </a-col>
                                                <a-col>
                                                    <div style="margin-left: 22px;">
                                                        <span>지방소득세 납세지:</span>
                                                        <default-text-box 
                                                            style="width: 200px; display: inline-block; margin-left: 10px;"
                                                            :disabled="true"
                                                            v-model:valueInput="formState.localIncomeTaxArea">
                                                        </default-text-box>
                                                    </div>
                                                </a-col>
                                                <a-form-item>
                                                    <button-basic :text="'수동선택'" :type="'default'" :mode="'contained'" @onClick="modalSetting"/>
                                                </a-form-item>
                                            </a-row>
                                        </a-col>
                                    </a-row>
                                </standard-form>
                            </div>
                        </a-col>
                    </a-row>
                    <SettingPopup :modalStatus="modalSettingStatus" @closePopup="modalSettingStatus = false"
                        @dataEmit="changeValueAddress" title="원천설정" />
                </a-tab-pane>
                <a-tab-pane key="2" tab="급여항목">
                    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true" key-expr="itemCode"
                    :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true">
                        <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                        <DxExport :enabled="true" :allow-export-selected-data="true" />
                        <DxToolbar>
                            <DxItem name="searchPanel" />
                            <DxItem name="exportButton" />
                            <DxItem location="after" template="button-template" css-class="cell-button-add" />
                            <DxItem name="groupPanel" />
                            <DxItem name="addRowButton" show-text="always" />
                            <DxItem name="columnChooserButton" />
                        </DxToolbar>
                        <template #button-template>
                            <DxButton icon="plus" @click="openAddNewModal" />
                        </template>
                        <DxColumn data-field="itemCode" :width="80" css-class="cell-center" caption="코드" />
                        <DxColumn data-field="use" caption="이용여부" :width="100" cell-template="use"
                            css-class="cell-center" />
                        <template #use="{ data }">
                            <a-tag :color="getAbleDisable(data.value)">이용중지</a-tag>
                        </template>
                        <DxColumn data-field="printName" caption="과세구분"/>
                        <DxColumn data-field="name" caption="항목명" />
                        <DxColumn data-field="taxfreePayItemCode" caption="비과세코드" css-class="cell-center" />
                        <DxColumn data-field="printTaxFreeIncludeSubmission" caption="제출여부" />
                        <DxColumn data-field="printCode" caption="유형"/>
                        <DxColumn data-field="formula" caption="산출방법" />
                        <DxColumn cell-template="pupop" css-class="cell-center" :width="100" />
                        <template #pupop="{ data }" class="custom-action">
                            <div class="custom-action">
                                <a-space :size="10">
                                    <a-tooltip placement="top">
                                        <template #title>편집</template>
                                        <EditOutlined @click="setModalEditVisible(data)" />
                                    </a-tooltip>
                                    <a-tooltip placement="top">
                                        <template #title>변경이력</template>
                                        <HistoryOutlined @click="modalHistory(data)" />
                                    </a-tooltip>
                                    <deleteOutlined @click="deleteConfig(data)" />
                                </a-space>
                            </div>
                        </template>
                    </DxDataGrid>
                    <AddCM130Popup :modalStatus="modalAddNewStatus" @closePopup="onCloseAddNewModal" title="원천설정" />
                    <EditCM130Popup :modalStatus="modalEditStatus" @closePopup="onCloseEditModal" :data="popupData"
                        title="원천설정" :idRowEdit="idRowEdit" />
                    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false"
                        :data="popupData" title="변경이력" :idRowEdit="idRowEdit" typeHistory="cm-130" />
                </a-tab-pane>
            </a-tabs>
        </a-spin>
    </div>
</template>
<script lang="ts">
import { companyId } from "../../../../helpers/commonFunction";
import {
} from "@ant-design/icons-vue";
import {
    WarningFilled,
    EditOutlined,
    SearchOutlined,
    PrinterOutlined,
    DeleteOutlined, SaveOutlined,
    HistoryOutlined,
    LoginOutlined,
} from "@ant-design/icons-vue";
import HistoryPopup from "../../../../components/HistoryPopup.vue";
import queries from "../../../../graphql/queries/CM/CM130/index";
import mutations from "../../../../graphql/mutations/CM/CM130/index";
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, reactive, watch, createVNode, computed } from "vue";
import { useStore } from 'vuex';
import { DxNumberBox } from "devextreme-vue/number-box";
import DxButton from "devextreme-vue/button";
import { Modal } from 'ant-design-vue';
import {
    DxDataGrid,
    DxColumn,
    DxExport,
    DxSearchPanel,
    DxToolbar,
    DxPaging,
    DxItem,
} from "devextreme-vue/data-grid";
import notification from "../../../../utils/notification";
import EditCM130Popup from "../CM130/components/EditCM130Popup.vue";
import SettingPopup from "./components/SettingPopup.vue";
import { Workbook } from "exceljs";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";
import AddCM130Popup from "./components/AddCM130Popup.vue";
import dayjs, { Dayjs } from "dayjs";
import { optionsRadioReportType, optionsRadioPaymentType  } from "./data";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { TaxPayItem, TaxFreePayItem } from "@bankda/jangbuda-common";
import { initialFormState } from "./data";
dayjs.extend(weekday);
dayjs.extend(localeData);
export default defineComponent({
    components: {
        DxNumberBox,
        WarningFilled,
        SettingPopup,
        DxDataGrid,
        DxColumn,
        DxExport,
        DxSearchPanel,
        DxButton,
        DxToolbar,
        DxItem,
        EditOutlined,
        HistoryOutlined,
        LoginOutlined,
        EditCM130Popup,
        HistoryPopup,
        AddCM130Popup,
        SearchOutlined,
        PrinterOutlined,
        DeleteOutlined,
        SaveOutlined,
        DxPaging
    },
    setup() {
        // config grid
        const store = useStore();
        
        // const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const popupData = ref([]);
        const modalSettingStatus = ref<boolean>(false);
        const modalEditStatus = ref<boolean>(false);
        const modalAddNewStatus = ref<boolean>(false);
        const modalHistoryStatus = ref<boolean>(false);
        const isSwitch = ref<boolean>(false);
        const isShow = ref<boolean>(false);
        const idRowEdit = ref(0);
        const formState = reactive({ ...initialFormState });
        const setModalVisible = () => {
			isShow.value = false;
		}
        const dataSource = ref([]);
        const dataQueryWithholding = ref({ companyId: companyId, imputedYear: parseInt(dayjs().format('YYYY')) });
        //================================================= FUNCTION============================================
        const showModal = () => {
            isShow.value = true;
        };
        const SwitchButton = () => {
            isSwitch.value = true;
        };
        let previewImage: any = ref("/public/images/demo-image.jpg");
        const handleSuccsess = (e: MouseEvent) => {
            isShow.value = false;
        };
        // reportType: 1 or 6
        // paymentType: 1 or 2
        // get config
        const dataQuery = ref({ companyId: companyId, imputedYear: parseInt(dayjs().format('YYYY')) });
        const { result: resultConfig, loading, refetch: refetchConfig } = useQuery(
            queries.getWithholdingConfig,
            dataQuery,
            () => ({
                fetchPolicy: "no-cache",
            })
        );
        watch(resultConfig, (value) => {
            if (value) {
                formState.reportType = value.getWithholdingConfig.reportType;
                formState.paymentType = value.getWithholdingConfig.paymentType;
                formState.paymentDay = value.getWithholdingConfig.paymentDay;
                formState.insuranceSupport = value.getWithholdingConfig.insuranceSupport;
                formState.competentTaxOfficeCode = value.getWithholdingConfig.competentTaxOfficeCode;
                formState.localIncomeTaxArea = value.getWithholdingConfig.localIncomeTaxArea;
                formState.companyAddressInfoAddress = value.getWithholdingConfig.companyAddressInfo.address;
                formState.collectivePayment = value.getWithholdingConfig.collectivePayment;
                formState.taxForEachBusiness = value.getWithholdingConfig.taxForEachBusiness;
            }
        });
        // update config 
        const { mutate: actionUpdateWithholdingConfig, onDone: onDoneUpdated, onError: errorEditConfig } = useMutation(
            mutations.updateWithholdingConfig
        );
        errorEditConfig((error) => {
            notification('error', error.message)
        })
        onDoneUpdated(() => {
            notification('success', `업데이트 성공되었습니다!`)
            refetchConfig();
        });
        const onSubmitConfig = () => {
            let variables = {
                companyId: companyId,
                imputedYear: parseInt(dayjs().format('YYYY')),
                input: {
                    reportType: formState.reportType,
                    paymentType: formState.paymentType,
                    paymentDay: formState.paymentDay,
                    insuranceSupport: formState.insuranceSupport,
                    competentTaxOfficeCode: formState.competentTaxOfficeCode,
                    localIncomeTaxArea: formState.localIncomeTaxArea,
                    collectivePayment: formState.collectivePayment,
                    taxForEachBusiness: formState.taxForEachBusiness
                }
            };
            actionUpdateWithholdingConfig(variables)
        };
        // get withholding config pay items  
        const { result: resultWithholdingConfig, refetch: refetchWithholdingConfig, loading: loadingWithholdingConfig } = useQuery(
            queries.getWithholdingConfigPayItems,
            dataQueryWithholding,
            () => ({
                fetchPolicy: "no-cache",
            })
        );
        watch(resultWithholdingConfig, (value) => {
            dataSource.value = value.getWithholdingConfigPayItems; 
            dataSource.value.map((e: any) =>{
                if(e.taxPayItemCode != null) {
                    taxPayItem.map((eData: any) => {
                        if (eData.value == e.taxPayItemCode) {
                            e.printCode = eData.label
                        }
                    })
                    e.printName = "과세"
                }else{
                    taxFreePayItem.map((eData: any) => {
                        if (eData.value == e.taxfreePayItemCode) {
                            e.printCode = eData.Label
                            if (eData.submission) {
                                e.printTaxFreeIncludeSubmission = 'O'
                            } else {
                                e.printTaxFreeIncludeSubmission = 'X'
                            }
                        }
                    })
                    e.printName = "비과세"
                }
            })
        });
        // delete withholding config pay item
        const { mutate: actionDelete, onDone: onDoneDelete } = useMutation(
            mutations.deleteWithholdingConfigPayItem
        );
        onDoneDelete(() => {
            notification('success', `업데이트 성공되었습니다!`)
            refetchWithholdingConfig()
        });
        const deleteConfig = (data: any) => {
            Modal.confirm({
                title: '삭제하겠습니까?',
                icon: createVNode(ExclamationCircleOutlined),
                okText: '네',
                cancelText: '아니요',
                //content: createVNode('div', { style: 'color:red;' }, 'Some descriptions'),
                onOk() {
                    let variables = {
                        companyId: companyId,
                        imputedYear: parseInt(dayjs().format('YYYY')),
                        itemCode: data.data.itemCode
                    };
                    actionDelete(variables);
                },
                class: 'confirm',
            });
        }
        const onExporting = (e: any) => {
            const workbook = new Workbook();
            const worksheet = workbook.addWorksheet("employees");
            exportDataGrid({
                component: e.component,
                worksheet,
                autoFilterEnabled: true,
            }).then(() => {
                workbook.xlsx.writeBuffer().then((buffer) => {
                    saveAs(
                        new Blob([buffer], { type: "application/octet-stream" }),
                        "DataGrid.xlsx"
                    );
                });
            });
            e.cancel = true;
        };
        const modalSetting = () => {
            modalSettingStatus.value = true;
        }
        const openAddNewModal = () => {
            if (dataSource.value.length <= 20) {
                modalAddNewStatus.value = true;
            } else {
                notification('error', `이용 가능한 급여항목은 최대 20개입니다. 기존항목을 이용중지한 후 새로 추가하세요`)
            }
        }
        const onCloseAddNewModal = () => {
            modalAddNewStatus.value = false;
            refetchWithholdingConfig();
        };
        const setModalEditVisible = (data: any) => {
            idRowEdit.value = data.data.itemCode;
            modalEditStatus.value = true;
            popupData.value = data;
        };
        const onCloseEditModal = () => {
            modalEditStatus.value = false;
            refetchWithholdingConfig();
        };
        const modalHistory = (data: any) => {
            idRowEdit.value = data.data.itemCode;
            modalHistoryStatus.value = true;
            popupData.value = data;
        }
        const getAbleDisable = (data: any) => {
            if (data) {
                return "transparent";
            } else {
                return "red";
            }
        }
        const changeValueAddress = (data: any) => {
            formState.competentTaxOfficeCode = data.taxOfficeName
            formState.localIncomeTaxArea = data.localIncomeTaxArea
        }

        const taxPayItem = Object.keys(TaxPayItem.all()).map((k, index) => ({
            value: TaxPayItem.all()[index].enumOrdinal,
            label: TaxPayItem.all()[index].name,
        }));
        
        
        const taxFreePayItem = Object.keys(TaxFreePayItem.all()).map((k, index) => ({
            value: TaxFreePayItem.all()[index].enumKey,
            label: TaxFreePayItem.all()[index].name,
            submission: JSON.parse(JSON.stringify(TaxFreePayItem.all()[index])).props.submission,
        }));
        return {
            changeValueAddress,
            idRowEdit,
            move_column,
            colomn_resize,
            optionsRadioReportType,
            optionsRadioPaymentType,
            labelCol: { style: { width: "150px" } },
            formState,
            activeKey: ref("1"),
            onSubmitConfig,
            previewImage,
            SwitchButton,
            isSwitch,
            isShow,
            setModalVisible,
            showModal,
            handleSuccsess,
            dataSource,
            loading,
            loadingWithholdingConfig,
            deleteConfig,
            popupData,
            modalSettingStatus,
            modalEditStatus,
            modalAddNewStatus,
            modalHistoryStatus,
            modalSetting,
            openAddNewModal,
            onCloseAddNewModal,
            setModalEditVisible,
            onCloseEditModal,
            modalHistory,
            getAbleDisable,
            onExporting,
            taxPayItem,
            taxFreePayItem,
        };
    },
});
</script>
<style lang="scss" scoped src="./style/style.scss">
.btn-action>button {
    margin-left: 5px;
}

::v-deep .ant-tag-red {
    border: none;
}

::v-deep .cell-center {
    text-align: center !important;
}

::v-deep .ant-modal-body {
    padding: 0;
}

.container {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    padding-right: 10px;
    padding-left: 10px;
}

.title-h2 {
    margin-left: 1%;
}

.validate-message {
    margin-left: 2%;
    color: #c3baba;
}
</style>
