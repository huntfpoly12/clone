<template>
    <div id="components-modal-demo-position">
        <a-modal :visible="modalStatus" footer="" :mask-closable="false" title="서비스관리 " centered okText="저장하고 나가기"
            cancelText="그냥 나가기" @cancel="setModalVisible()" width="1200px">
            <standard-form  :wrapper-col="{span: 14}">
                <a-spin tip="Loading..." :spinning="loading || loadingUpdate">
                    <a-collapse v-model:activeKey="activeKey" accordion :bordered="false">
                        <a-collapse-panel key="1" header="이용서비스" class="-scrollpopup">
                            <div style="height: 500px;overflow-y: scroll;">
                                <a-row>
                                    <a-col :span="12">
                                        <a-form-item label="총이용료" style="font-weight: bold">
                                            <p class="input-disble">
                                                {{ $filters.formatCurrency(formState.info.totalPrice =
        formState.info.accountingPrice + formState.info.withholdingPrice)
}}
                                            </p>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="12"></a-col>
                                    <a-col :span="12">
                                        <a-form-item label="회계서비스 이용료" class="cusstom-label-padding">
                                            <p class="input-disble">
                                                {{ $filters.formatCurrency(formState.info.accountingPrice) }}
                                            </p>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="12"></a-col>
                                    <a-col :span="12">
                                        <a-form-item label="원천서비스 이용료" class="cusstom-label-padding">
                                            <p class="input-disble">
                                                {{ $filters.formatCurrency(formState.info.withholdingPrice) }}
                                            </p>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="14"></a-col>
                                </a-row>
                                <hr />
                                <a-row>
                                    <a-col :span="12">
                                        <a-form-item label="회계서비스" style="font-weight: bold">
                                            <checkbox-basic v-model:valueCheckbox="formState.info.usedAccounting"
                                                size="14" label="회계서비스 신청" />
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <div :class="formState.info.usedAccounting ? '' : 'disabled-div'">
                                    <div>
                                        <a-card title="⁙ 운영사업" :bordered="false" style="width: 100%"
                                            :headStyle="{ padding: '5px', color: 'red' }" bodyStyle="padding: 0px 0px">
                                        </a-card>
                                    </div>
                                    <!-- {{  formState.info.accounting }} -->
                                    <DxDataGrid id="gridContainer" :show-borders="true" ref="gridRefName"
                                        :data-source="formState.info.accounting"
                                        key-expr="rowIndex" :allow-column-reordering="move_column"
                                        :allow-column-resizing="colomn_resize" :column-auto-width="true" :show-row-lines="true"
                                        :focused-row-enabled="true" :onRowClick="onSelectionClick">
                                        <DxEditing :use-icons="true" :allow-adding="true" template="button-template"
                                            new-row-position="pageBottom" :allow-deleting="true" mode="cell">
                                            <DxTexts confirmDeleteMessage="삭제하겠습니까?" />
                                        </DxEditing>
                                        <DxToolbar>
                                            <DxItem location="after" template="button-template"
                                                css-class="cell-button-add" />
                                        </DxToolbar>
                                        <template #button-template>
                                            <DxButton icon="plus" @click="addRow" />
                                        </template>
                                        <DxColumn data-field="No" :allow-editing="false" :width="50" caption="#"
                                            cell-template="indexCell" />
                                        <template #indexCell="{ data }">
                                            <div>{{ data.rowIndex + 1 }}</div>
                                        </template>
                                        <DxColumn data-field="name" caption="사업명 (중복불가)" />
                                        <DxColumn data-field="facilityBizType" caption="사업분류">
                                            <DxLookup :data-source="facilityBizType" value-expr="v" display-expr="n" />
                                        </DxColumn>
                                        <DxColumn data-field="startYearMonth" caption="서비스시작년월" data-type="date"
                                            :format="'yyyy-MM'" />
                                        <DxColumn data-field="capacity" caption="정원수 (명)" />
                                        <DxColumn caption="회계서비스이용료" cell-template="totalPrice" data-type="number" />
                                        <template #totalPrice="{ data }">
                                            {{ $filters.formatCurrency(getTotalAmount(data.data)) }}
                                        </template>
                                    </DxDataGrid>
                                    <a-row :gutter="24" class="data-row-accounting"
                                        v-if="formState.info.accounting.length">
                                        <a-col :span="8">
                                            <div class="custom-money">
                                                <a-form-item label="사업분류" class="red">
                                                    <select-box-common style="float:right" :arrSelect="facilityBizType"
                                                        :required="true" :width="150"
                                                        v-model:valueInput="formState.info.accounting[rowIndex].facilityBizType"
                                                        :value-expr="'v'" :display-expr="'n'" />
                                                </a-form-item>
                                            </div>
                                            <div class="custom-money">
                                                <a-form-item label="사업명 (중복불가) " class="red">
                                                    <default-text-box style="float:right" :width="150"
                                                        v-model:valueInput="formState.info.accounting[rowIndex].name" />
                                                </a-form-item>
                                            </div>
                                            <div class="custom-money">
                                                <a-form-item label="서비스 시작년월" class="red">
                                                    <month-picker-box style="float:right" width="150px"
                                                        v-model:valueDate="formState.info.accounting[rowIndex].startYearMonth" />
                                                </a-form-item>
                                            </div>
                                            <div class="custom-money">
                                                <a-form-item label="정원수" class="red">
                                                    <number-box style="float:right" :width="150"
                                                        v-model:valueInput="formState.info.accounting[rowIndex].capacity" />
                                                </a-form-item>
                                            </div>
                                            <div class="custom-money">
                                                <a-form-item label="장기요양기관등록번호" class="red">
                                                    <default-text-box style="float:right" :width="150"
                                                        v-model:valueInput="formState.info.accounting[rowIndex].longTermCareInstitutionNumber" />
                                                </a-form-item>
                                            </div>
                                        </a-col>
                                        <a-col :span="8">
                                            <a-form-item label="회계서비스 이용료:" style=" font-weight: bold">
                                                <p class="input-disble"
                                                    :id="'price-' + formState.info.accounting[rowIndex].name">
                                                    {{ $filters.formatCurrency(getTotalAmount(formState.info.accounting[rowIndex])) }}
                                                </p>
                                            </a-form-item>
                                            <div class="custom-money">
                                                <a-form-item label="기본이용료">
                                                    <number-box-money style="float:right" :width="185"
                                                        v-model:valueInput="formState.info.accounting[rowIndex].price"
                                                        :spinButtons="false" />
                                                </a-form-item>
                                            </div>
                                            <!-- {{ formState.info.accounting }} -->
                                            <div class="custom-money">
                                                <DxCheckBox
                                                    :value="checkOption(formState.info.accounting[rowIndex].options, 1)"
                                                    text="입력대행" class="custom-checkbox"
                                                    @value-changed="changeChecked($event.value, 1, formState.info.accounting[rowIndex])" />
                                                <DxNumberBox :format="'#,###'" :min="0"
                                                    :value="getPriceOption(formState.info.accounting[rowIndex].options, 1)"
                                                    :disabled="disableInput(formState.info.accounting[rowIndex].options, 1)"
                                                    @keyDown="changeValueInput($event.component, 1, formState.info.accounting[rowIndex])" />
                                            </div>
                                            <div class="custom-money">
                                                <DxCheckBox
                                                    :value="checkOption(formState.info.accounting[rowIndex].options, 2)"
                                                    text="계좌통합" class="custom-checkbox"
                                                    @value-changed="changeChecked($event.value, 2, formState.info.accounting[rowIndex])" />
                                                <DxNumberBox :format="'#,###'" :min="0"
                                                    :value="getPriceOption(formState.info.accounting[rowIndex].options, 2)"
                                                    :disabled="disableInput(formState.info.accounting[rowIndex].options, 2)"
                                                    @keyDown="changeValueInput($event.component, 2, formState.info.accounting[rowIndex])" />
                                            </div>
                                            <div class="custom-money">
                                                <DxCheckBox
                                                    :value="checkOption(formState.info.accounting[rowIndex].options, 3)"
                                                    text="W4C" class="custom-checkbox"
                                                    @value-changed="changeChecked($event.value, 3, formState.info.accounting[rowIndex])" />
                                                <DxNumberBox :min="0" :format="'#,###'"
                                                    :value="getPriceOption(formState.info.accounting[rowIndex].options, 3)"
                                                    :disabled="disableInput(formState.info.accounting[rowIndex].options, 3)"
                                                    @keyDown="changeValueInput($event.component, 3, formState.info.accounting[rowIndex])" />
                                            </div>
                                        </a-col>
                                        <a-col :span="8">
                                            <a-col>
                                                <preview-image :height="'250px'" :activePreview="true"
                                                    :dataImage="formState.info.accounting[rowIndex].registrationCard"
                                                    :name="formState.info.accounting[rowIndex]?.name"
                                                    @deleteImg="removeImg" />
                                            </a-col>
                                            <div style="margin-top: 10px;">
                                                <imgUpload :title="'사업자등록증'"
                                                    @update-img="getImgUrl($event, formState.info.accounting[rowIndex])"
                                                    :customrow="1" />
                                            </div>
                                        </a-col>
                                    </a-row>
                                </div>
                                <hr />
                                <a-row>
                                    <a-col :span="14">
                                        <a-form-item label="원천서비스" style="font-weight: bold"
                                            class="custom-label-select">
                                            <checkbox-basic v-model:valueCheckbox="formState.info.usedWithholding"
                                                :disabled="false" size="14" label="원천서비스 신청" />
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <a-row :class="formState.info.usedWithholding ? '' : 'disabled-div'">
                                    <a-col :span="14">
                                        <a-form-item label="서비스 시작년월" class="custom-label-select red">
                                            <month-picker-box width="150px" :required="true"
                                                v-model:valueDate="formState.info.withholding.startYearMonth"
                                                date-format="MM/DD/YYYY" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="14">
                                        <a-form-item label="직 원 수 " class="custom-label-select red">
                                            <number-box-money width="150px" :min="0" :required="true"
                                                v-model:valueInput="formState.info.withholding.capacity"
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
                                            <span style="width: 180px; line-height: 33px;">기본이용료</span>
                                            <number-box-money :min="0" width="180px"
                                                v-model:valueInput="formState.info.withholding.price"
                                                :spinButtons="false" />
                                        </div>
                                    </a-col>
                                    <a-coll :span="8"></a-coll>
                                    <a-col :span="14">
                                        <div class="custom-service" style="">
                                            <checkbox-basic style="width: 180px"
                                                v-model:valueCheckbox="withholdingServiceType" size="14" label="4대보험"
                                                @change="handleInputTexService" />
                                            <number-box-money :min="0"
                                                v-model:valueInput="formState.info.withholding.options[0].price"
                                                :disabled="!withholdingServiceType" width="180px"
                                                :spinButtons="false" />
                                        </div>
                                    </a-col>
                                </a-row>
                            </div>
                        </a-collapse-panel>
                        <a-collapse-panel key="2" header="담당매니저/ 영업자">
                            <a-form-item label="담당매니저" class="custom-label-select">
                                <div style="width: 200px">
                                    <list-manager-dropdown v-model:valueInput="formState.extra.manageUserId" />
                                </div>
                            </a-form-item>
                            <a-form-item label="영업자" class="custom-label-select">
                                <div style="width: 200px">
                                    <list-sales-dropdown v-model:valueInput="formState.extra.salesRepresentativeId" />
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
                                                {{ dayjs(text.updatedAt).format("YYYY/MM/DD") }} 게시
                                                {{ dayjs(text.createdAt).format("YYYY/MM/DD") }}
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
                            @onClick="actionUpdateServiceContract" />
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
import imgUpload from "@/components/UploadImage.vue";
import DxNumberBox from "devextreme-vue/number-box";
import { DxCheckBox } from 'devextreme-vue/check-box';
import comfirmClosePopup from '@/utils/comfirmClosePopup';
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
import queries from "@/graphql/queries/BF/BF3/BF330/index";
import mutations from "@/graphql/mutations/BF/BF3/BF330/index";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import DxTextBox from 'devextreme-vue/text-box';
import { initialState, initialFormStateMomes } from "../utils/index"
dayjs.extend(weekday);
dayjs.extend(localeData);
import { useQuery, useMutation } from "@vue/apollo-composable";
import DateTimeBox from "@/components/common/DateTimeBox.vue";
import notification from '@/utils/notification';
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
        idRowEdit: {
            type: Number,
            default: null,
        },
    },
    setup(props, { emit }) {
        // config grid
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const facilityBizType = FacilityBizType.all();
        const activeKey = ref([1]);
        const dataQuery = ref();
        const dataQueryMemos = ref();
        const gridRefName: any = ref("grid");
        
        const loading = ref<boolean>(false);
        let trigger = ref<boolean>(false);
        let objDataDefault = reactive({ ...initialState });

        const formStateMomes = ref([...initialFormStateMomes]);
        const formState: any = reactive({ ...initialState });

        const withholdingServiceType = ref(false)
        
        // ============ GRAPQL ===============================
        // get service contract
        const { result } = useQuery(
            queries.getServiceContract,
            dataQuery,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );
        // get list memo of company
        const { result: resultMemo, refetch: refetchMemo } = useQuery(
            queries.getServiceContractManageMemos,
            dataQueryMemos,
            () => ({
                enabled: trigger.value,
                fetchPolicy: "no-cache",
            })
        );
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

        // ========== WATCH ============================
        // process data after call getServiceContract api
        watch(result, (value) => {
            if (value.getServiceContract) {
                let data = JSON.parse(
                    JSON.stringify(value.getServiceContract, (name, val) => {
                        if (
                            name === "__typename"
                        ) {
                            delete val[name];
                        } else {
                            return val;
                        }
                    })
                );
                formState.id = data.id;
                formState.info = data.usedServiceInfo;
                formState.info.usedAccounting = data.usedAccounting;
                formState.info.usedWithholding = data.usedWithholding;
                formState.extra.salesRepresentativeId = data.salesRepresentativeId;
                formState.extra.manageUserId = data.manageUserId;
                if (formState.info.withholding.options[0].withholdingServiceType) {
                    withholdingServiceType.value = true
                }
                formState.info.accounting?.map((element: any, index: number) => {
                    element.rowIndex = index;
                 })
            }
            setTimeout(() => {
                objDataDefault = { ...formState }
            }, 500);
        });

        // watch(dataGetTotalAmount, (value) => {
        //     let price = 0
        //     formState.info.accounting?.map((value: any) => {
        //         value.options?.map((value: any) => {
        //             price += value.price
        //         })
        //         price += value.price
        //     })
        //     formState.info.accountingPrice = price
        // });

        watch(() => formState.info.usedAccounting, (value) => {
            if (!value) {
                formState.info.accounting = []
            }
        })

        
        // ============= FUNCTION ==============================
        const setModalVisible = () => {
            if (JSON.stringify(objDataDefault) === JSON.stringify(formState) == false)
                comfirmClosePopup(() => emit("closePopup", false))
            else
                emit("closePopup", false)
        };

        const handleAdd = () => {
            formStateMomes.value.unshift({
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
            });
        };
        const handleAddMemo = (note: any, mmId: any = null) => {
            if (note !== "" && mmId == null) {
                actionCreateMemo({ companyId: formState.id, memo: note });
            } else {
                actionUpdateMemo({ companyId: formState.id, memo: note, memoId: mmId });
            }
        };
        const handleDeleteMemo = (key: number) => {
            if (formStateMomes.value.length > 1) {
                actionDeleteMemo({ companyId: formState.id, memoId: key });
            }
        };
        
        const actionUpdateServiceContract = (e: any) => {
            var variables = JSON.parse(JSON.stringify({...formState}));
            variables.info.accounting?.map((value: any) => {
                delete value.registrationCard
                delete value.rowIndex
            })
            actionUpdate(variables);
        };

        const totalWithholdingService = computed(() => {
            let ttwithholdingPrice = 0
            if (formState.id) {
                ttwithholdingPrice = formState.info.withholding.price + formState.info.withholding.options[0].price
            }
            formState.info.withholdingPrice = ttwithholdingPrice
            return ttwithholdingPrice
        });
        // const dataGetTotalAmount = ref(0)
        const getTotalAmount = (data: any) => {
            let totalAmount = 0
            if (data.options) {
                data.options?.map((e: any) => {
                    totalAmount += parseInt(e.price)
                })
                totalAmount += parseInt(data.price)
            }
            let price = 0
            formState.info.accounting?.map((value: any) => {
                value.options?.map((value: any) => {
                    price += value.price
                })
                price += value.price
            })
            formState.info.accountingPrice = price
            // dataGetTotalAmount.value = totalAmount
            return totalAmount
        }
        // Thay đổi giá trị option 
        const changeValueInput = (event: any, indexOP: any, val: any) => {
            setTimeout(() => {
                // Tìm options đang thay đổi để update dữ liệu mới
                formState.info.accounting?.map((e: any) => {
                    if (e.name == val.name) {
                        e.options?.map((k: any) => {
                            if (indexOP == k.accountingServiceType) {
                                k.price = event._parsedValue
                            }
                        })
                    }
                })
            }, 100);
        }
        // Thay đổi trạng thái ô checkbox của  options
        const changeChecked = (valChange: any, optionChange: number, valOJ: any) => {
            // nếu checked thì thêm dòng mới trong mảng options để lưu giá trị
            if (valChange == true) {
                formState.info.accounting?.map((e: any) => {
                    if (e.facilityBusinessId == valOJ.facilityBusinessId) {
                        if (!e.options?.find((val: any) => val.accountingServiceType === optionChange)) {
                            e.options.push({
                                accountingServiceType: optionChange,
                                price: 0
                            })
                        }
                    }
                })
            }
            // nếu unchecked thì xóa dòng đó trong options
            else {
                setTimeout(() => {
                    let arr: any = reactive({})
                    formState.info.accounting?.map((e: any) => {
                        if (e.name == valOJ.name) {
                            e.options = e.options?.filter((k: any) => {
                                return k.accountingServiceType !== optionChange;
                            });
                            arr = e
                        }
                    })
                    getPriceOption(arr.options, optionChange)
                }, 100);
            }
        }
        // Lấy số tiền trong option đang thay đổi
        const getPriceOption = (arr: any, value: number) => {
            let price = 0
            if (arr) {
                arr.map((e: any) => {
                    if (e.accountingServiceType == value) {
                        price = e.price
                    }
                })
            }
            return price
        }
        // disable input khi unchecked
        const disableInput = (arr: any, value: number) => {
            let checked = ref(true)
            if (arr) {
                arr.map((e: any) => {
                    if (e.accountingServiceType == value) {
                        checked.value = false
                    }
                })
            }
            return checked.value
        }
        // Kiểm tra checked của option ban đầu
        const checkOption = (arr: any, value: number) => {
            let count = 0
            if (arr) {
                arr.map((e: any) => {
                    if (e.accountingServiceType == value) {
                        count = 1
                    }
                })
            }
            if (count == 0) {
                return false
            } else {
                return true
            }
        }
        // lấy img sau khi upload
        const getImgUrl = (img: any, data: any) => {
            formState.info.accounting?.map((e: any) => {
                if (e.name == data.name) {
                    e.registrationCardFileStorageId = img.id
                    e.registrationCard = {
                        url: img.url,
                        name: img.fileName
                    }
                }
            })
        }
        // const checkValueLongTerm = (longTerm: any) => {
        //     return parseInt(longTerm)
        // }
        const handleInputTexService = () => {
            if (!withholdingServiceType.value) {
                formState.info.withholding.options[0].price = 0
            }
        }
        const removeImg = (name: any) => {
            setTimeout(() => {
                formState.info.accounting?.map((e: any) => {
                    if (e.name == name) {
                        e.registrationCard = null
                        e.registrationCardFileStorageId = null
                    }
                })
            }, 100);
        };

        const rowIndex = ref<number>(0);
        const onSelectionClick = (value: any) => {
            getTotalAmount(value)
            rowIndex.value = value.rowIndex
        }
        const addRow = () => {
            gridRefName.value.instance.addRow()
            // gridRefName.value.instance.deselectAll()
            gridRefName.value.instance.closeEditCell()
            // setTimeout(() => {
            //     if (gridRefName.value.instance.totalCount() == 1) {
            //         let a = document.body.querySelectorAll('[aria-rowindex]');
            //         (a[gridRefName.value.instance.totalCount() - 1] as HTMLInputElement).click();
            //     }
            // }, 100);
            // rowIndex.value = formState.info.accounting.length - 1
            formState.info.accounting[formState.info.accounting.length - 1].options = []
            formState.info.accounting[formState.info.accounting.length - 1].facilityBusinessId = formState.info.accounting.length
        };

        watch(resultMemo, (value) => {
            if (value && value.getServiceContractManageMemos.length > 0) {
                formStateMomes.value = value.getServiceContractManageMemos;
            }
        });
        watch(() => props.modalStatus, (newValue) => {
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
        });
        
        return {
            handleInputTexService,
            move_column,
            colomn_resize,
            getImgUrl,
            checkOption,
            disableInput,
            getPriceOption,
            changeChecked,
            changeValueInput,
            getTotalAmount,
            setModalVisible,
            loading,
            activeKey,
            formState,
            removeImg,
            facilityBizType,
            formStateMomes,
            handleAdd,
            handleDeleteMemo,
            handleAddMemo,
            actionUpdateServiceContract,
            loadingUpdate,
            totalWithholdingService,
            onSelectionClick,
            addRow,
            gridRefName,
            rowIndex,
            withholdingServiceType,
            dayjs,
        };
    },
});
</script>  

<style src="../style/stylePopup.scss" scoped />
