<template>
    <div id="components-modal-demo-position">
        <a-modal :visible="modalStatus" footer="" :mask-closable="false" title="서비스관리 " centered okText="저장하고 나가기"
            cancelText="그냥 나가기" @cancel="setModalVisible()" width="1200px">
            <standard-form :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-spin tip="Loading..." :spinning="loading || loadingUpdate">
                    <a-collapse v-model:activeKey="activeKey" accordion>
                        <a-collapse-panel key="1" header="이용서비스" class="-scrollpopup">
                            <div style="height: 500px;overflow-y: scroll;">
                                <a-row>
                                    <a-col :span="12">
                                        <a-form-item label="총이용료" style="font-weight: bold">
                                            <p class="input-disble">
                                                {{ $filters.formatCurrency(totalPrice) }}
                                            </p>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="12"></a-col>
                                    <a-col :span="12">
                                        <a-form-item label="회계서비스 이용료" class="cusstom-label-padding">
                                            <p class="input-disble">
                                                {{ $filters.formatCurrency(totalPriceAccountingService) }}
                                            </p>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="12"></a-col>
                                    <a-col :span="12">
                                        <a-form-item label="원천서비스 이용료" class="cusstom-label-padding">
                                            <p class="input-disble">
                                                {{ $filters.formatCurrency(totalWithholdingService) }}
                                            </p>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="14"></a-col>
                                </a-row>
                                <hr />
                                <a-row>
                                    <a-col :span="12">
                                        <a-form-item label="회계서비스" style="font-weight: bold">
                                            <checkbox-basic v-model:valueCheckbox="formState.usedAccountingCount"
                                                :disabled="false" size="14" label="회계서비스 신청" />
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <div>
                                    <div>
                                        <a-card title="⁙ 운영사업" :bordered="false" style="width: 100%"
                                            :headStyle="{ padding: '5px', color: 'red' }" bodyStyle="padding: 0px 0px">
                                        </a-card>
                                    </div>
                                    <DxDataGrid id="grid-container" :show-borders="true" @content-ready="contentReady" 
                                        :data-source="formState.accountingfacilityBusinesses"
                                        key-expr="facilityBusinessId" :allow-column-reordering="move_column"
                                        :allow-column-resizing="colomn_resize" :column-auto-width="true"
                                        :selected-row-keys="selectedItemKeys">
                                        <DxEditing :use-icons="true" :allow-updating="true" :allow-adding="true"
                                            :new-row-position="'pageBottom'"
                                            :allow-deleting="true" mode="cell" />
                                        <DxSelection mode="single" />
                                        <DxPaging :enabled="false" />
                                        <DxColumn :width="10" />
                                        <template #indexCell="{ data }">
                                            <div>{{ data.rowIndex + 1 }}</div>
                                        </template>
                                        <DxColumn data-field="name" caption="사업명 (중복불가)" />
                                        <DxColumn data-field="facilityBizType" caption="사업분류">
                                            <DxLookup :data-source="facilityBizType" value-expr="v" display-expr="n" />
                                        </DxColumn>
                                        <DxColumn data-field="startYearMonth" caption="서비스시작년월" data-type="date"
                                            :format="'yyyy-MM-dd'" />
                                        <DxColumn data-field="capacity" caption="정원수 (명)" />
                                        <DxColumn  caption="회계서비스이용료" cell-template="totalPrice"/>
                                        <template #totalPrice="{ data }">
                                            {{ $filters.formatCurrency(getTotalAmount(data)) }}
                                        </template>
                                        <DxToolbar>
                                            <DxItem name="addRowButton" />
                                        </DxToolbar>
                                        <DxMasterDetail :enabled="true" template="detailTemplate" />
                                        <template #detailTemplate="{ data }">
                                            <a-row :gutter="24">
                                                <a-col :span="10">
                                                    <a-form-item label="회계서비스 이용료:" style=" font-weight: bold">
                                                        <p class="input-disble" :id="'price-' + data.data.name">
                                                            {{
                                                                    $filters.formatCurrency(getTotalAmount(data))
                                                            }}
                                                        </p>
                                                    </a-form-item>
                                                    <div class="custom-money">
                                                        <checkbox-basic :value="true" :disabled="true" size="16"
                                                            label="기본이용료" />
                                                        <text-number-box v-model:valueInput="data.data.price" />
                                                    </div>

                                                    <div class="custom-money">
                                                        <DxCheckBox :value="checkOption(data.data.options, 1)"
                                                            text="입력대행" class="custom-checkbox"
                                                            @value-changed="changeChecked($event.value, 1, data.data)" />
                                                        <DxNumberBox :format="'#,###'" :min="0"
                                                            :value="getPriceOption(data.data.options, 1)"
                                                            :disabled="disableInput(data.data.options, 1)"
                                                            @keyDown="changeValueInput($event.component, 1, data.data)" />
                                                    </div>
                                                    <div class="custom-money">
                                                        <DxCheckBox :value="checkOption(data.data.options, 2)"
                                                            text="계좌통합" class="custom-checkbox"
                                                            @value-changed="changeChecked($event.value, 2, data.data)" />
                                                        <DxNumberBox :format="'#,###'" :min="0"
                                                            :value="getPriceOption(data.data.options, 2)"
                                                            :disabled="disableInput(data.data.options, 2)"
                                                            @keyDown="changeValueInput($event.component, 2, data.data)" />
                                                    </div>
                                                    <div class="custom-money">
                                                        <DxCheckBox :value="checkOption(data.data.options, 3)"
                                                            text="W4C" class="custom-checkbox"
                                                            @value-changed="changeChecked($event.value, 3, data.data)" />
                                                        <DxNumberBox :min="0" :format="'#,###'"
                                                            :value="getPriceOption(data.data.options, 3)"
                                                            :disabled="disableInput(data.data.options, 3)"
                                                            @keyDown="changeValueInput($event.component, 3, data.data)" />
                                                    </div>
                                                    
                                                </a-col>
                                                <a-col :span="14">
                                                    <div class="custom-money" style="padding-left: 0px">
                                                        <div style="width: auto;padding-right: 10px;color:red">
                                                            <b>장기요양기관등록번호 :</b>
                                                        </div>
                                                        <text-number-box
                                                            v-model:valueInput="data.data.longTermCareInstitutionNumber"
                                                            placeholder="‘-’없이 숫자만 입력" width="250px" :required="true"
                                                            nameInput="formState-extendInfoCmsBankAccountNumber">
                                                        </text-number-box>
                                                    </div>
                                                    <div style="display: flex">
                                                        <div>
                                                            <imgUpload :title="titleModal"
                                                                @update-img="getImgUrl($event, data)" :customrow="1" />
                                                        </div>
                                                        <a-col>
                                                            <preview-image :height="'250px'" :activePreview="true"
                                                                :dataImage="data.data.registrationCard"
                                                                :name="data.data.name" @deleteImg="removeImg" />
                                                        </a-col>
                                                    </div>
                                                </a-col>
                                            </a-row>
                                        </template>
                                    </DxDataGrid>
                                </div>
                                <hr />
                                <a-row>
                                    <a-col :span="14">
                                        <a-form-item label="원천서비스" style="font-weight: bold"
                                            class="custom-label-select">
                                            <checkbox-basic v-model:valueCheckbox="formState.usedWithholding"
                                                :disabled="false" size="14" label="원천서비스" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="14">
                                        <a-form-item label="서비스 시작년월" class="custom-label-select">
                                            <date-time-box width="150px"
                                                v-model:valueDate="formState.withholdingStartYearMonth"
                                                date-format="MM/DD/YYYY" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="14">
                                        <a-form-item label="직 원 수 " class="custom-label-select">
                                            <number-box-money width="150px" :min="0"
                                                v-model:valueInput="formState.withholdingCapacity"
                                                :spinButtons="false" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="14">
                                        <a-form-item label="원천서비스 이용료:" style="font-weight: bold;"
                                            class="custom-label-select">
                                            <p class="input-disble" style="width: 328px;">
                                                {{ $filters.formatCurrency(totalWithholdingService) }}
                                            </p>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="14">
                                        <div style="display: flex; padding-left: 120px">
                                            <checkbox-basic style="width: 180px"
                                                v-model:valueCheckbox="formState.checkBoxBasicFee" size="14"
                                                label="기본이용료" @change="handleInputTexService" />
                                            <number-box-money :min="0" width="180px"
                                                :disabled="formState.disableNumber5"
                                                v-model:valueInput="formState.usedServiceInfoWithholdingPrice"
                                                :spinButtons="false" />
                                        </div>
                                    </a-col>
                                    <a-coll :span="8"></a-coll>
                                    <a-col :span="14">
                                        <div class="custom-service" style="">
                                            <checkbox-basic style="width: 180px"
                                                v-model:valueCheckbox="formState.checkBoxMajorInsurance" size="14"
                                                label="4대보험" @change="handleInputTexService" />
                                            <number-box-money :min="0" v-model:valueInput="formState.fourMajorInsurance"
                                                :disabled="formState.disableNumber6" width="180px"
                                                :spinButtons="false" />
                                        </div>
                                    </a-col>
                                </a-row>
                            </div>
                        </a-collapse-panel>
                        <a-collapse-panel key="2" header="담당매니저/ 영업자">
                            <a-form-item label="담당매니저" class="custom-label-select">
                                <div style="width: 200px">
                                    <list-manager-dropdown v-model:selected="formState.manageUserId" />
                                </div>
                            </a-form-item>
                            <a-form-item label="영업자" class="custom-label-select">
                                <div style="width: 200px">
                                    <list-sales-dropdown v-model:selected="formState.compactSalesRepresentativeId" />
                                </div>
                            </a-form-item>
                        </a-collapse-panel>
                        <a-collapse-panel key="3" header="메모"
                            :extra="formStateMomes.length > 0 ? formStateMomes.length : ''"
                            :style="{ position: 'relative' }">
                            <a-table bordered="false" :data-source="formStateMomes" :pagination="false">
                                <template #bodyCell="{ text, index }">
                                    <div>
                                        <div class="title-note">
                                            <div>
                                                {{ text.ownerName }} 수정
                                                {{ formarDate(text.updatedAt) }} 게시
                                                {{ formarDate(text.createdAt) }}
                                            </div>
                                            <div v-if="index == 0">
                                                <PlusSquareOutlined :style="{ fontSize: '25px' }" @click="handleAdd" />
                                            </div>
                                        </div>
                                        <div class="text-area-box-custom">
                                            <text-area-box placeholder="전달사항입력" v-model:valueInput="text.memo" />
                                        </div>
                                        <a-space :size="8" style="margin-top: 7px">
                                            <save-outlined :style="{ fontSize: '20px' }"
                                                @click="handleAddMemo(text.memo, text.memoId)" />
                                            <DeleteOutlined :style="{ fontSize: '20px' }"
                                                @click="handleDeleteMemo(text.memoId)" />
                                        </a-space>
                                    </div>
                                </template>
                            </a-table>
                        </a-collapse-panel>
                    </a-collapse>
                    <div class="footer">
                        <button-basic text="그냥 나가기" type="default" mode="outlined" @onClick="setModalVisible" />
                        <button-basic text="저장하고 나가기" type="default" mode="contained"
                            @onClick="updateServiceContract" />
                    </div>
                </a-spin>
            </standard-form>
        </a-modal>
    </div>
</template>
<script lang="ts">
import {
    AccountingAdditionalServiceType,
    WithholdingAdditionalServiceType,
} from "@bankda/jangbuda-common";
import { FacilityBizType } from "@bankda/jangbuda-common";
import { ref, defineComponent, watch, reactive, computed } from "vue";
import { useStore } from 'vuex';
import DxDropDownBox from "devextreme-vue/drop-down-box";
import imgUpload from "../../../../../components/UploadImage.vue";
import DxNumberBox from "devextreme-vue/number-box";
import { DxCheckBox } from 'devextreme-vue/check-box';
import comfirmClosePopup from '../../../../../utils/comfirmClosePopup';
import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxEditing,
    DxSelection,
    DxLookup,
    DxToolbar,
    DxItem,
    DxTexts,
    DxMasterDetail,
} from "devextreme-vue/data-grid";
import { DxButton } from "devextreme-vue/button";
import {
    UploadOutlined,
    MinusCircleOutlined,
    ZoomInOutlined,
    SaveOutlined,
    DeleteOutlined,
    PlusSquareOutlined,
    WarningFilled,
    PlusOutlined,
} from "@ant-design/icons-vue";
import type { UploadProps } from "ant-design-vue";
import queries from "../../../../../graphql/queries/BF/BF3/BF330/index";
import mutations from "../../../../../graphql/mutations/BF/BF3/BF330/index";
import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import DxTextBox from 'devextreme-vue/text-box';
dayjs.extend(weekday);
dayjs.extend(localeData);
import { useQuery, useMutation } from "@vue/apollo-composable";
import DateTimeBox from "../../../../../components/common/DateTimeBox.vue";
import notification from '../../../../../utils/notification';
export default defineComponent({
    components: {
        DxTextBox, DxDropDownBox, DxDataGrid, DxColumn, DxPaging, DxSelection, DxEditing, DxLookup, DxButton, DxToolbar, DxItem, DxNumberBox, DxTexts, DxMasterDetail, DxCheckBox,
        UploadOutlined,
        MinusCircleOutlined,
        ZoomInOutlined, SaveOutlined, DeleteOutlined, PlusSquareOutlined,
        WarningFilled,
        imgUpload,
        PlusOutlined,
        DateTimeBox
    },
    props: {
        modalStatus: Boolean,
        modalStatusHistory: Boolean,
        idRowEdit: {
            type: Number,
            default: null,
        },
    },
    watch: {
    },
    setup(props, { emit }) {
        // config grid
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const facilityBizType = FacilityBizType.all();
        const titleModal = "사업자등록증";
        const labelCol = ref({ style: { width: "150px" } });
        const wrapperCol = ref({ span: 14 });
        const imageValue = ref("");
        const fileName = ref("");
        const dataQuery = ref();
        const selectedItemKeys = reactive([])
        const dataQueryMemos = ref();
        const loading = ref<boolean>(false);
        let trigger = ref<boolean>(false);
        const fileList = ref<UploadProps["fileList"]>([]);
        const initialState = {
            id: null,
            totalFee: 0,
            accountingPrice: 0,
            withholdingPrice: 0,
            accountingfacilityBusinesses: [],
            usedAccountingCount: false,
            usedServiceInfoAccountingPrice: 0,
            inputAgent: 0,
            accountIntegration: 0,
            sSIS: 0,
            usedWithholding: false,
            withholdingStartYearMonth: "",
            withholdingCapacity: "",
            usedServiceInfoWithholdingPrice: 0,
            fourMajorInsurance: 0,
            compactSalesRepresentativeId: 0,
            manageUserId: 0,
            name: "",
            name2: "",
            name3: "",
            delivery: false,
            type: [],
            resource: "",
            desc: "",
            totalService: 0,
            accFeeService: 0,
            accBasicFee: "",
            accInput: "",
            accConsolidation: "",
            acc4wc: "",
            basicFee: "",
            majorInsurance: "",
            taxFeeSevice: 0,
            checkBox: false,
            checkBoxAccBasicFee: false,
            checkBoxAccInput: false,
            checkBoxAccConso: false,
            checkBoxAcc4wc: false,
            checkBoxMajorInsurance: false,
            checkBoxBasicFee: false,
            disableNumber1: false,
            disableNumber2: false,
            disableNumber3: false,
            disableNumber4: false,
            disableNumber5: false,
            disableNumber6: false,
        };
        let objDataDefault = reactive({ ...initialState });
        const formStateMomes = ref([
            {
                memoId: null,
                ownerUserId: 0,
                ownerName: "",
                ownerUsername: "",
                memo: "",
                createdAt: dayjs(new Date()).format("YYYY/MM/DD"),
                createdBy: "",
                updatedAt: dayjs(new Date()).format("YYYY/MM/DD"),
                updatedBy: "",
                ip: "",
                active: "",
            },
        ]);
        const setModalVisible = () => {
            if (JSON.stringify(objDataDefault) === JSON.stringify(formState) == false)
                comfirmClosePopup(() => emit("closePopup", false))
            else
                emit("closePopup", false)
        };
        const activeKey = ref([1]);

        const formState = reactive({ ...initialState });
        // get service contract
        const { result } = useQuery(
            queries.getServiceContract,
            dataQuery,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );
        // process data after call getServiceContract api
        watch(result, (value) => {
            if (value && value.getServiceContract) {
                imageValue.value = value.getServiceContract.usedServiceInfo.accounting.registrationCard ? value.getServiceContract.usedServiceInfo.accounting.registrationCard.url : ''
                formState.id = value.getServiceContract.id;
                formState.totalFee =
                    value.getServiceContract.usedServiceInfo.totalPrice;
                formState.accountingPrice =
                    value.getServiceContract.usedServiceInfo.accountingPrice;
                formState.withholdingPrice =
                    value.getServiceContract.usedServiceInfo.withholdingPrice;
                formState.accountingfacilityBusinesses =
                    value.getServiceContract.usedServiceInfo.accounting;
                formState.usedAccountingCount =
                    value.getServiceContract.usedAccountingCount > 0 ? true : false;
                formState.usedWithholding = value.getServiceContract.usedWithholding;
                formState.withholdingStartYearMonth =
                    value.getServiceContract.withholding.startYearMonth;
                formState.withholdingCapacity =
                    value.getServiceContract.withholding.capacity;
                formState.compactSalesRepresentativeId =
                    value.getServiceContract.salesRepresentativeId;
                formState.manageUserId = value.getServiceContract.manageUserId;
                // process price Company / Accounting facility business list
                if (value.getServiceContract.usedServiceInfo.accounting.length > 0) {
                    value.getServiceContract.usedServiceInfo.accounting.map((el: any) => {
                        formState.usedServiceInfoAccountingPrice += el.price;
                        formState.checkBoxAccBasicFee = true;
                        if (el.options.length > 0) {
                            el.options.map((value: any) => {
                                switch (value.accountingServiceType) {
                                    case 1:
                                        formState.checkBoxAccInput = true;
                                        formState.inputAgent += value.price;
                                        break;
                                    case 2:
                                        formState.checkBoxAccConso = true;
                                        formState.accountIntegration += value.price;
                                        break;
                                    case 3:
                                        formState.checkBoxAcc4wc = true;
                                        formState.sSIS += value.price;
                                        break;
                                    default:
                                        break;
                                }
                            });
                        }
                    });
                }
                // process price Company / Withholding information (사업자/원천정보)
                formState.usedServiceInfoWithholdingPrice =
                    value.getServiceContract.usedServiceInfo.withholding.price;
                formState.checkBoxBasicFee = value.getServiceContract.usedServiceInfo.withholding.price == 0 ? false : true;
                formState.disableNumber5 = value.getServiceContract.usedServiceInfo.withholding.price == 0 ? true : false;
                formState.disableNumber6 = value.getServiceContract.usedServiceInfo.withholding.options.length == 0 ? true : false
                if (
                    value.getServiceContract.usedServiceInfo.withholding.options.length >
                    0
                ) {
                    value.getServiceContract.usedServiceInfo.withholding.options.map(
                        (val: any) => {
                            switch (val.withholdingServiceType) {
                                case 1:
                                    formState.checkBoxMajorInsurance = true;
                                    formState.fourMajorInsurance += val.price;
                                    break;
                                default:
                                    break;
                            }
                        }
                    );
                }
                objDataDefault = {
                    ...formState
                }
            }
        });
        // get list memo of company
        const { result: resultMemo, refetch: refetchMemo } = useQuery(
            queries.getServiceContractManageMemos,
            dataQueryMemos,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );
        watch(resultMemo, (value) => {
            if (value && value.getServiceContractManageMemos.length > 0) {
                formStateMomes.value = value.getServiceContractManageMemos;
            }
        });
        // mutation create memo
        const {
            mutate: actionCreateMemo,
            onError: onErrorMemo,
            onDone: onCreatedMemo,
        } = useMutation(mutations.createServiceContractManageMemo);
        onCreatedMemo((res) => {
            refetchMemo();
            notification('success', "매모 추가 완료")
        });
        onErrorMemo((res: any) => {
            notification('error', res.message)
        })
        // mutation update memo
        const { mutate: actionUpdateMemo, onError: errUpdateMemo, onDone: onUpdatedMemo } = useMutation(
            mutations.updateServiceContractManageMemo
        );
        errUpdateMemo((res: any) => {
            notification('error', res.message)
        })
        onUpdatedMemo(() => {
            refetchMemo();
        });
        // mutation delete memo
        const { mutate: actionDeleteMemo, onError: errDeleteMemo, onDone: onDeleteMemo } = useMutation(
            mutations.deleteServiceContractManageMemo
        );
        errDeleteMemo((res: any) => {
            notification('error', res.message)
        })
        onDeleteMemo(() => {
            refetchMemo();
        });
        const handleDeleteMemo = (key: number) => {
            if (formStateMomes.value.length > 1) {
                actionDeleteMemo({ companyId: formState.id, memoId: key });
            }
        };
        const handleAdd = () => {
            const newMemo: any = {
                memoId: null,
                ownerUserId: 0,
                ownerName: "",
                ownerUsername: "",
                memo: "",
                createdAt: dayjs(new Date()).format("YYYY/MM/DD"),
                createdBy: "",
                updatedAt: dayjs(new Date()).format("YYYY/MM/DD"),
                updatedBy: "",
                ip: "",
                active: "",
            };
            formStateMomes.value.unshift(newMemo);
        };
        const handleAddMemo = (note: any, mmId: any = null) => {
            if (note !== "" && mmId == null) {
                actionCreateMemo({ companyId: formState.id, memo: note });
            } else {
                actionUpdateMemo({ companyId: formState.id, memo: note, memoId: mmId });
            }
        };
        // Update Service Contract
        const {
            mutate: actionUpdate,
            loading: loadingUpdate,
            onDone: updateDone,
            onError: errUpdateContract
        } = useMutation(mutations.updateServiceContract);
        errUpdateContract((res) => {
            notification('error', res.message)
        })
        updateDone((res) => {
            notification('success', "업데이트 완료!")
            emit("closePopup", false)
        });
        const updateServiceContract = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                activeKey.value = [1]
            } else {
                let accountingInfor: any = [];
                let arrayAccountingOptions: any = [];
                if (formState.checkBoxAccInput) {
                    arrayAccountingOptions.push({
                        accountingServiceType:
                            AccountingAdditionalServiceType.INPUT_AGENT.code,
                        price: formState.inputAgent,
                    });
                }
                if (formState.checkBoxAccConso) {
                    arrayAccountingOptions.push({
                        accountingServiceType:
                            AccountingAdditionalServiceType.ACCOUNT_INTEGRATION.code,
                        price: formState.accountIntegration,
                    });
                }
                if (formState.checkBoxAcc4wc) {
                    arrayAccountingOptions.push({
                        accountingServiceType: AccountingAdditionalServiceType.SSIS.code,
                        price: formState.sSIS,
                    });
                }
                if (formState.accountingfacilityBusinesses.length > 0) {
                    formState.accountingfacilityBusinesses.map((e: any) => {
                        e.options = e.options.map((val: any) => ({
                            price: val.price,
                            accountingServiceType: val.accountingServiceType,
                        }))
                        accountingInfor.push({
                            longTermCareInstitutionNumber: e.longTermCareInstitutionNumber.toString(),
                            facilityBizType: e.facilityBizType,
                            name: e.name,
                            startYearMonth: e.startYearMonth,
                            capacity: e.capacity,
                            registrationCardFileStorageId: e.registrationCardFileStorageId,
                            facilityBusinessId: e.facilityBusinessId ? e.facilityBusinessId : 0,
                            price: parseInt(e.price),
                            options: e.options,
                        })
                    });
                }
                let arrayWithholdingOptions: any = [];
                if (formState.checkBoxMajorInsurance) {
                    arrayWithholdingOptions.push({
                        withholdingServiceType:
                            WithholdingAdditionalServiceType.MAJOR_INSURANCE.code,
                        price: formState.fourMajorInsurance,
                    });
                }
                let withholdingInfor = {
                    startYearMonth: formState.withholdingStartYearMonth,
                    capacity: parseInt(formState.withholdingCapacity),
                    price: formState.usedServiceInfoWithholdingPrice,
                    options: arrayWithholdingOptions,
                };
                let infoData = {
                    totalPrice: totalPrice.value,
                    accountingPrice: totalPriceAccountingService.value,
                    withholdingPrice: totalWithholdingService.value,
                    accounting: accountingInfor,
                    withholding: withholdingInfor,
                };
                let extraData = {
                    salesRepresentativeId: formState.compactSalesRepresentativeId,
                    manageUserId: formState.manageUserId,
                };
                let variables = {
                    id: formState.id,
                    info: infoData,
                    extra: extraData,
                };
                actionUpdate(variables);
            }
        };
        const totalPriceAccountingService = computed(() => {
            let ttPriceAcc = formState.usedServiceInfoAccountingPrice +
                formState.inputAgent +
                formState.accountIntegration +
                formState.sSIS
            return ttPriceAcc
        });
        const totalWithholdingService = computed(() => {
            return (
                formState.usedServiceInfoWithholdingPrice + formState.fourMajorInsurance
            );
        });
        const totalPrice = computed(() => {
            let ttPrice =
                formState.usedServiceInfoAccountingPrice +
                formState.inputAgent +
                formState.accountIntegration +
                formState.sSIS +
                formState.usedServiceInfoWithholdingPrice +
                formState.fourMajorInsurance;
            return ttPrice
        });
        const formarDate = (date: any) => {
            return dayjs(date).format("YYYY/MM/DD");
        };
        const getTotalAmount = (data: any) => {
            let totalAmount = 0
            data.data.options.map((e: any) => {
                totalAmount += parseInt(e.price)
            })
            totalAmount += parseInt(data.data.price)
            return totalAmount
        }
        // Thay đổi giá trị option 
        const changeValueInput = (event: any, indexOP: any, val: any) => {
            setTimeout(() => {
                // Nếu option có giá trị trả về là : 1,2,3
                if (indexOP != 0) {
                    // Tìm options đang thay đổi để update dữ liệu mới
                    formState.accountingfacilityBusinesses.map((e: any) => {
                        if (e.name == val.name) {
                            e.options.map((k: any) => {
                                if (indexOP == k.accountingServiceType) {
                                    k.price = event._parsedValue
                                }
                            })
                        }
                    })
                } else { //option đầu tiên và lấy price ngoài options
                    formState.accountingfacilityBusinesses.map((e: any) => {
                        if (e.name == val.name) {
                            e.price = event._parsedValue
                        }
                    })
                }
            }, 100);
        }
        // Thay đổi trạng thái ô checkbox của  options
        const changeChecked = (valChange: any, optionChange: number, valOJ: any) => {
            // nếu checked thì thêm dòng mới trong mảng options để lưu giá trị
            if (valChange == true)
                formState.accountingfacilityBusinesses.map((e: any) => {
                    if (e.name == valOJ.name) {
                        e.options.push({
                            accountingServiceType: optionChange,
                            price: 0
                        })
                    }
                })
            // nếu unchecked thì xóa dòng đó trong options
            else {
                setTimeout(() => {
                    let arr: any = reactive({})
                    formState.accountingfacilityBusinesses.map((e: any) => {
                        if (e.name == valOJ.name) {
                            e.options = e.options.filter((k: any) => {
                                return k.accountingServiceType !== optionChange;
                            });
                            arr = e
                        }
                    })
                    getTotalAmount(arr)
                    getPriceOption(arr.options, optionChange)
                }, 100);
            }
        }
        // Lấy số tiền trong option đang thay đổi
        const getPriceOption = (arr: any, value: number) => {
            let price = 0
            arr.map((e: any) => {
                if (e.accountingServiceType == value) {
                    price = e.price
                }
            })
            return price
        }
        // disable input khi unchecked
        const disableInput = (arr: any, value: number) => {
            let checked = ref(true)
            arr.map((e: any) => {
                if (e.accountingServiceType == value) {
                    checked.value = false
                }
            })
            return checked.value
        }
        // Kiểm tra checked của option ban đầu
        const checkOption = (arr: any, value: number) => {
            let count = 0
            arr.map((e: any) => {
                if (e.accountingServiceType == value) {
                    count = 1
                }
            })
            if (count == 0) {
                return false
            } else {
                return true
            }
        }
        // lấy img sau khi upload
        const getImgUrl = (img: any, data: any) => {
            formState.accountingfacilityBusinesses.map((e: any) => {
                if (e.name == data.data.name) {
                    e.registrationCardFileStorageId = img.id
                    e.registrationCard = {
                        url: img.url,
                        name: img.fileName
                    }
                }
            })
        }
        const checkValueLongTerm = (longTerm: any) => {
            return parseInt(longTerm)
        }
        const handleInputTexService = () => {
            let basicFee =
                formState.basicFee == "" ? 0 : parseInt(formState.basicFee);
            let majorInsurance =
                formState.majorInsurance == ""
                    ? 0
                    : parseInt(formState.majorInsurance);
            formState.taxFeeSevice = basicFee + majorInsurance;
        }
        const removeImg = (name: any) => {
            setTimeout(() => {
                formState.accountingfacilityBusinesses.map((e: any) => {
                    if (e.name == name) {
                        e.registrationCard = null
                        e.registrationCardFileStorageId = null
                    }
                })
            }, 100);
        };
        const contentReady = (e: any) => {
            if (!e.component.getSelectedRowKeys().length) { 
                e.component.expandRow(1)
            }
        }
        watch(
            () => props.modalStatus,
            (newValue) => {
                trigger.value = true;
                if (newValue) {
                    dataQuery.value = { id: props.idRowEdit };
                    dataQueryMemos.value = { companyId: props.idRowEdit };
                    refetchMemo();
                } else {
                    formStateMomes.value = [
                        {
                            memoId: null,
                            ownerUserId: 0,
                            ownerName: "",
                            ownerUsername: "",
                            memo: "",
                            createdAt: dayjs(new Date()).format("YYYY/MM/DD"),
                            createdBy: "",
                            updatedAt: dayjs(new Date()).format("YYYY/MM/DD"),
                            updatedBy: "",
                            ip: "",
                            active: "",
                        },
                    ];
                    Object.assign(formState, initialState);
                    trigger.value = false;
                }
            }
        );
        watch(
            () => formState.checkBoxAccBasicFee,
            (newVal) => {
                if (newVal === false) {
                    formState.usedServiceInfoAccountingPrice = 0;
                    formState.disableNumber1 = true;

                    objDataDefault.usedServiceInfoAccountingPrice = 0;
                    objDataDefault.disableNumber1 = true;
                } else {
                    formState.disableNumber1 = false;
                    objDataDefault.disableNumber1 = false;
                }
            }
        );
        watch(
            () => formState.checkBoxAccInput,
            (newVal) => {
                if (newVal === false) {
                    formState.inputAgent = 0;
                    formState.disableNumber2 = true;

                    objDataDefault.inputAgent = 0;
                    objDataDefault.disableNumber2 = true;
                } else {
                    formState.disableNumber2 = false;
                    objDataDefault.disableNumber2 = false;
                }
            }
        );
        watch(
            () => formState.checkBoxAccConso,
            (newVal) => {
                if (newVal === false) {
                    formState.accountIntegration = 0;
                    formState.disableNumber3 = true;
                } else {
                    formState.disableNumber3 = false;
                }
            }
        );
        watch(
            () => formState.checkBoxAcc4wc,
            (newVal) => {
                if (newVal === false) {
                    formState.sSIS = 0;
                    formState.disableNumber4 = true;
                } else {
                    formState.disableNumber4 = false;
                }
            }
        );
        watch(
            () => formState.checkBoxBasicFee,
            (newVal) => {
                if (newVal === false) {
                    formState.usedServiceInfoWithholdingPrice = 0;
                    formState.disableNumber5 = true;
                } else {
                    formState.disableNumber5 = false;
                }
            }
        );
        watch(
            () => formState.checkBoxMajorInsurance,
            (newVal) => {
                if (newVal === false) {
                    formState.fourMajorInsurance = 0;
                    formState.disableNumber6 = true;
                } else {
                    formState.disableNumber6 = false;
                }
            }
        );
        return { 
            contentReady,
            selectionChanged,
            handleInputTexService,
            selectedItemKeys,
            move_column,
            colomn_resize,
            checkValueLongTerm,
            getImgUrl,
            checkOption,
            disableInput,
            getPriceOption,
            changeChecked,
            changeValueInput,
            getTotalAmount,
            fileList,
            setModalVisible,
            loading,
            activeKey,
            formState,
            labelCol,
            wrapperCol,
            titleModal,
            PlusSquareOutlined,
            PlusOutlined,
            fileName,
            removeImg,
            imageValue,
            dataQuery,
            result,
            trigger,
            facilityBizType,
            formStateMomes,
            formarDate,
            handleAdd,
            handleDeleteMemo,
            handleAddMemo,
            updateServiceContract,
            loadingUpdate,
            totalPriceAccountingService,
            totalWithholdingService,
            totalPrice,
        };
    },
});
</script>  
<style src="../style/stylePopup.scss" scoped />