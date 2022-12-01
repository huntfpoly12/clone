<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div id="tab23-pa120">
        <a-row>
            <a-col :span="24">
                <a-spin :spinning="loading" size="large">

                    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                        :show-borders="true" :allow-column-reordering="move_column"
                        :allow-column-resizing="colomn_resize" :column-auto-width="true" id="gridContainer">
                        <DxToolbar>
                            <DxItem location="after" template="button-template" css-class="cell-button-add" />
                        </DxToolbar>
                        <template #button-template>
                            <DxButton icon="plus" @click="openAddDependent" />
                        </template>
                        <DxColumn alignment="left" caption="연말 관계" data-field="relation" />
                        <DxColumn alignment="left" caption="성명" data-field="name" />
                        <DxColumn caption="내/외국인" data-field="foreigner" cell-template="foreignerChange" :width="80" />
                        <DxColumn alignment="left" caption="주민등록번호" data-field="residentId" />
                        <DxColumn alignment="left" caption="나이" data-field="Age" />
                        <DxColumn alignment="left" caption="기본공제" data-field="basicDeduction"
                            cell-template="basicDeductionChange" />
                        <DxColumn alignment="left" caption="부녀자" data-field="women" cell-template="womenChange" />
                        <DxColumn alignment="left" caption="한부모" data-field="singleParent"
                            cell-template="singleParentChange" />
                        <DxColumn alignment="left" caption="경로 우대" data-field="senior" cell-template="SeniorChange" />
                        <DxColumn alignment="left" caption="장애인 " data-field="disabled"
                            cell-template="disabledChange" />
                        <DxColumn alignment="left" caption="자녀" data-field="descendant"
                            cell-template="DescendantChange" />
                        <DxColumn alignment="left" caption="출산 입양" data-field="maternityAdoption"
                            cell-template="maternityAdoptionChange" />
                        <DxColumn alignment="left" caption="위탁 관계 " data-field="consignmentRelationship"
                            cell-template="consignmentRelationshipChange" />
                        <!-- <DxColumn
              alignment="left"
              caption="세대주 여부 "
              data-field="householder"
            /> -->
                        <DxColumn :width="80" cell-template="pupop" />
                        <template #pupop="{ data }" class="custom-action">
                            <div class="custom-action">
                                <a-space :size="10">
                                    <a-tooltip placement="top">
                                        <template #title>편집</template>
                                        <EditOutlined @click="actionEdit(data.data.index)" />
                                    </a-tooltip>
                                    <!-- <DeleteOutlined @click="actionDeleteFuc(data.data.index)" /> -->
                                </a-space>
                            </div>
                        </template>
                        <template #foreignerChange="{ data: cellData }">
                            <employee-info :foreigner="cellData.value" :status="hasStatus(cellData.value)">
                            </employee-info>
                        </template>
                        <template #womenChange="{ data: cellData }">
                            <BtnCheck :value="cellData.value" />
                        </template>
                        <template #basicDeductionChange="{ data: cellData }">
                            <div v-if="cellData.value == 0">
                                <button class="btn-red">해당없음</button>
                            </div>
                        </template>
                        <template #singleParentChange="{ data: cellData }">
                            <BtnCheck :value="cellData.value" />
                        </template>
                        <template #SeniorChange="{ data: cellData }">
                            <BtnCheck :value="cellData.value" />
                        </template>
                        <template #disabledChange="{ data: cellData }">
                            <div v-if="cellData.value">{{ cellData.value }}</div>
                        </template>
                        <template #DescendantChange="{ data: cellData }">
                            <BtnCheck :value="cellData.value" />
                        </template>
                        <template #maternityAdoptionChange="{ data: cellData }">
                            <div v-if="cellData.value">{{ cellData.value }}</div>
                        </template>
                        <template #consignmentRelationshipChange="{ data: cellData }">
                            <BtnCheck :value="cellData.value" />
                        </template>
                    </DxDataGrid>
                </a-spin>
                <div>
                    <div class="header-text-3">부양가족 요약
                    </div>
                    <a-row :gutter="12">
                        <a-col :span="12">
                            <div class="header-text-2">기본공제</div>

                            <a-form-item label="본인" label-align="right">
                                <div class="display-flex">
                                    <text-number-box width="200px" v-model:valueInput="formStateTab3.relation"
                                        :readOnly="true" :required="false" />
                                </div>
                            </a-form-item>
                            <a-form-item label="배우자" label-align="right">
                                <div class="display-flex">
                                    <text-number-box width="200px" v-model:valueInput="formStateTab3.women"
                                        :readOnly="true" :required="false" />
                                </div>
                            </a-form-item>
                            <a-form-item label="20세이하" label-align="right">
                                <div class="display-flex">
                                    <text-number-box width="200px" v-model:valueInput="formStateTab3.basicDeduction"
                                        :readOnly="true" :required="false" />
                                </div>
                            </a-form-item>
                            <a-form-item label="60세이하" label-align="right">
                                <div class="display-flex">
                                    <text-number-box width="200px" v-model:valueInput="formStateTab3.basicDeduction"
                                        :readOnly="true" :required="false" />
                                </div>
                            </a-form-item>
                            <div class="header-text-2">자녀세액공제</div>
                            <a-form-item label="자녀세액공제" label-align="right">
                                <div class="display-flex">
                                    <text-number-box width="200px" v-model:valueInput="formStateTab3.descendant"
                                        :readOnly="true" :required="false" />
                                </div>
                            </a-form-item>
                        </a-col>

                        <a-col :span="12">
                            <div class="header-text-2">추가/세액공제</div>
                            <a-form-item label="경로우대" class="display-flex" label-align="right">
                                <div class="display-flex">
                                    <text-number-box width="200px" v-model:valueInput="formStateTab3.senior"
                                        :readOnly="true" :required="false" />
                                </div>
                            </a-form-item>
                            <a-form-item label="장애인" label-align="right">
                                <div class="display-flex">
                                    <text-number-box width="200px" v-model:valueInput="formStateTab3.disabled"
                                        :readOnly="true" :required="false" />
                                </div>
                            </a-form-item>
                            <a-form-item label="부녀자" label-align="right">
                                <div class="display-flex">
                                    <text-number-box width="200px" v-model:valueInput="formStateTab3.women"
                                        :readOnly="true" :required="false" />
                                </div>
                            </a-form-item>
                            <a-form-item label="한부모" label-align="right">
                                <div class="display-flex">
                                    <text-number-box width="200px" v-model:valueInput="formStateTab3.singleParent"
                                        :readOnly="true" :required="false" />
                                </div>
                            </a-form-item>
                            <a-form-item label="출산입양" label-align="right">
                                <div class="display-flex">
                                    <text-number-box width="200px" v-model:valueInput="formStateTab3.maternityAdoption"
                                        :readOnly="true" :required="false" />
                                </div>
                            </a-form-item>

                        </a-col>

                    </a-row>

                </div>
            </a-col>
        </a-row>
        <PopupAddNewDependent :modalStatus="modalAddNewDependent" @closePopup="modalAddNewDependent = false"
            :employeeId="employeeId" :idRowEdit="idRowEdit" :dataSourceLen="dataSource.length" @upDateData="updateData">
        </PopupAddNewDependent>
        <PopupEditUpdateDependent :modalStatus="modalEditStatus" @closePopup="modalEditStatus = false"
            :idRowIndex="idRowIndex" :idRowEdit="idRowEdit" :dataSourceLen="dataSource.length">
        </PopupEditUpdateDependent>

        <PopupMessage :modalStatus="modalStatus" @closePopup="modalStatus = false" typeModal="confirm"
            :content="contentDelete" okText="네" cancelText="아니요" @checkConfirm="statusComfirm" />
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from "vue";
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue"

import { DxDataGrid, DxColumn, DxToolbar, DxItem } from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";
import { useStore } from 'vuex';
import { useMutation, useQuery } from "@vue/apollo-composable";
import { companyId } from "../../../../../../helpers/commonFunction";
import mutations from "../../../../../../graphql/mutations/PA/PA1/PA120/index";
import queries from "../../../../../../graphql/queries/PA/PA1/PA120/index";
import notification from "../../../../../../utils/notification";
import PopupAddNewDependent from './tab3EditDependent/PopupEditAddNewDependent.vue'
import PopupEditUpdateDependent from './tab3EditDependent/PopupEditUpdateDependent.vue'
import { Message } from "../../../../../../configs/enum"
import BtnCheck from '../btnCheck/BtnCheck.vue';

import { divide } from "lodash";
import { string } from "vue-types";
import {
    initFormStateTab3,
} from "../../utils/index";
export default defineComponent({
    components: {
        PopupAddNewDependent,
        PopupEditUpdateDependent,
        DxDataGrid,
        DxColumn,
        DxToolbar,
        DxItem, BtnCheck,
        DxButton, EditOutlined, DeleteOutlined
    },
    props: {
        popupStatus: {
            type: Boolean,
            default: false,
        },
        idRowEdit: {
            type: Number
        },
        employeeId: {
            type: String,
            default: 0,
        },
    },
    setup(props, { emit }) {
        const dataSource = ref([]);
        const store = useStore();
        const per_page = computed(() => store.state.settings.per_page);
        const move_column = computed(() => store.state.settings.move_column);
        const trigger = ref<boolean>(true);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const modalAddNewDependent = ref<boolean>(false);
        const modalEditStatus = ref<boolean>(false);
        const modalHistoryStatus = ref<boolean>(false)
        const modalStatus = ref(false)
        const contentDelete = Message.getMessage('PA120', '002').message
        const idAction = ref()
        const globalYear = computed(() => store.state.settings.globalYear);
        const actionChangeComponent = ref(0)
        const idRowIndex = ref()
        let formStateTab3 = reactive<any>({
            ...initFormStateTab3,
        })
        const openAddDependent = () => {
            modalAddNewDependent.value = true;
        };
        const actionEdit = (val: any) => {
            idRowIndex.value = val
            modalEditStatus.value = true
        }
        const modalHistory = (data: any) => {

        }
        const actionDeleteFuc = (data: any) => {
            idAction.value = data
            modalStatus.value = true
        }
        const statusComfirm = (res: any) => {
            if (res == true)
                actionDelete({
                    companyId: companyId,
                    imputedYear: globalYear.value,
                    employeeId: props.idRowEdit,
                    index: idAction.value
                })

        }
        const onSubmit = (e: any) => {
        };
        watch(() => props.idRowEdit, (value) => {
            originDataDetail.value.employeeId = value
        })
        // get employee independent
        const originDataDetail = ref({
            companyId: companyId,
            imputedYear: globalYear.value,
            employeeId: props.idRowEdit
        })
        const {
            refetch: refetchData,
            result,
            loading,
        } = useQuery(queries.getEmployeeWage, originDataDetail, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        watch(() => modalEditStatus.value, (value) => {
            if (value == false) {
                trigger.value = true
                refetchData()
            }
        })
        watch(result, (value) => {
            if (value) {
                dataSource.value = value.getEmployeeWage.dependents;
                trigger.value = false;
                formStateTab3 = { ...dataSource.value }
            }
        });
        watch(() => props.idRowEdit, (value) => {
            trigger.value = true
            refetchData()
        })
        // delete
        const {
            mutate: actionDelete,
            onError: errorDelete,
            onDone: successDelete,
        } = useMutation(mutations.deleteEmployeeWageDependent)
        errorDelete(e => {
            notification('error', e.message)
        })
        successDelete(e => {
            notification('success', `업데이트 완료!`)
            trigger.value = true
            refetchData()
        })
        const updateData = (emit: Boolean) => {
            trigger.value = true
            refetchData();
        };
        const hasStatus = (foreigner: Boolean) => {
            if (foreigner) {
                return null;
            }
            return 0;
        };
        return {
            companyId, idAction, idRowIndex, loading,
            dataSource,
            modalEditStatus,
            modalStatus, formStateTab3,
            modalAddNewDependent,
            openAddDependent,
            actionDeleteFuc,
            actionEdit,
            modalHistory,
            actionDelete,
            hasStatus, updateData,
            onSubmit, statusComfirm, contentDelete,
            per_page, move_column, colomn_resize,
        }
    },
});
</script>
<style lang="scss" scoped >
.header-text-2 {
    background-color: #C6D9F1;
    padding: 5px;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 10px;
}

.btn-red {
    background: rgb(236, 29, 29);
    padding: 3px 18px;
    border: 1px solid transparent;
    color: #ffffff;
    border-radius: 3px;
    font-size: 12px;
}

::v-deep .ant-form-item-label>label {
    font-weight: bold;

}

.display-flex {
    display: flex;
    justify-content: flex-end;
    margin: 5px 0px;
}


.header-text-3 {
    background-color: #558ED5;
    padding: 5px;
    font-weight: bold;
    font-size: 18px;
    margin: 30px 0px;

    span {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: white;
        float: right;

        p {
            margin: 5px 0px 3px 10px;
        }
    }

}
</style>
  
     
  