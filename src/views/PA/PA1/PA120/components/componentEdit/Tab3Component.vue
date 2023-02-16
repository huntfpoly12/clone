<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div id="tab23-pa120">
        <a-row>
            <a-col :span="24">
                <a-spin :spinning="loading" size="large">
                    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                        :show-borders="true" :allow-column-reordering="move_column"
                        :allow-column-resizing="colomn_resize" :column-auto-width="true" id="gridContainer">
                        <DxScrolling mode="standard" show-scrollbar="always"/>
                        <DxToolbar>
                            <DxItem location="after" template="button-template" css-class="cell-button-add" />
                        </DxToolbar>
                        <template #button-template>
                            <DxButton icon="plus" @click="openAddDependent" />
                        </template>
                        <DxColumn alignment="left" caption="연말 관계" data-field="relation" cell-template="relation"/>
                        <template #relation="{ data }" class="custom-action">
                            {{$filters.formatRelation(data.value)}}
                        </template>
                        <DxColumn alignment="left" caption="성명" data-field="name" />
                        <DxColumn caption="내/외국인" data-field="foreigner" cell-template="foreignerChange" :width="80" />
                        <DxColumn alignment="left" caption="주민등록번호" data-field="residentId" />
                        <DxColumn alignment="left" caption="나이" data-field="Age" cell-template="ageChange" />
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
                        <DxColumn alignment="left" caption="위탁 관계 " data-field="consignmentRelationship"/>
                        <DxColumn alignment="left" caption="세대주여부 " data-field="householder"
                        cell-template="householderChange" />
                        <DxColumnFixing :enabled="true"/>
                        <DxColumn :width="50" cell-template="pupop" :fixed="true" fixed-position="right" alignment="center"/>
                        <template #pupop="{ data }" class="custom-action">
                            <div class="custom-action">
                                <a-space :size="10">
                                    <a-tooltip  color="black" placement="top">
                                        <template #title>편집</template>
                                        <EditOutlined @click="actionEdit(data.data.index)" />
                                    </a-tooltip>

                                </a-space>
                            </div>
                        </template>
                        <template #foreignerChange="{ data: cellData }">
                            <div v-if="cellData.value">내</div>
                            <div v-else>외</div>
                        </template>
                        <template #womenChange="{ data: cellData }">
                            <BtnCheck :value="cellData.value" />
                        </template>
                        <template #ageChange="{data}">
                            {{convertAge(data.data.residentId.toString())}}
                        </template>
                        <template #basicDeductionChange="{ data: cellData }">
                            <div v-if="cellData.value == 0">
                                <button class="btn-red">해당없음</button>
                            </div>
                            <div v-else>{{basicDeduction(cellData.value)}}</div>
                        </template>
                        <template #singleParentChange="{ data: cellData }">
                            <BtnCheck :value="cellData.value" />
                        </template>
                        <template #SeniorChange="{ data: cellData }">
                            <BtnCheck :value="cellData.value" />
                        </template>
                        <template #disabledChange="{ data: cellData }">
                            <div v-if="cellData.value">{{ disabledType(cellData.value) }}</div>
                        </template>
                        <template #DescendantChange="{ data: cellData }">
                            <BtnCheck :value="cellData.value" />
                        </template>
                        <template #maternityAdoptionChange="{ data: cellData }">
                            <div v-if="cellData.value">{{ maternityAndAdoption(cellData.value) }}</div>
                        </template>
                        <!-- <template #consignmentRelationshipChange="{ data: cellData }">
                            <BtnCheck :value="cellData.value" />
                        </template> -->
                        <template #householderChange="{ data: cellData }">
                            <BtnCheck :value="cellData.value" />
                        </template>
                    </DxDataGrid>
                </a-spin>
                <div>
                    <div class="header-text-3">부양가족 요약</div>
                    <a-row :gutter="12">
                        <a-col :span="12">
                        <div class="header-text-2">기본공제</div>

                        <a-form-item label="본인" label-align="right">
                            <div class="display-flex">
                            <text-number-box
                                width="200px"
                                :value="relationSummary"
                                :readOnly="true"
                            />
                            </div>
                        </a-form-item>
                        <a-form-item label="배우자" label-align="right">
                            <div class="display-flex">
                            <text-number-box
                                width="200px"
                                :value="womenSummary"
                                :readOnly="true"
                            />
                            </div>
                        </a-form-item>
                        <a-form-item label="20세이하" label-align="right">
                            <div class="display-flex">
                            <text-number-box
                                width="200px"
                                :value="basicDeductionSummary == 0 ?'': basicDeductionSummary"
                                :readOnly="true"
                            />
                            </div>
                        </a-form-item>
                        <a-form-item label="60세이하" label-align="right">
                            <div class="display-flex">
                            <text-number-box
                                width="200px"
                                :value="basicDeductionSummary2 == 0 ?'': basicDeductionSummary2"
                                :readOnly="true"
                            />
                            </div>
                        </a-form-item>
                        <div class="header-text-2">자녀세액공제</div>
                        <a-form-item label="자녀세액공제" label-align="right">
                            <div class="display-flex">
                            <text-number-box
                                width="200px"
                                :value="descendantSummary == 0 ?'': descendantSummary"
                                :readOnly="true"
                            />
                            </div>
                        </a-form-item>
                        </a-col>

                        <a-col :span="12">
                        <div class="header-text-2">추가/세액공제</div>
                        <a-form-item
                            label="경로우대"
                            class="display-flex"
                            label-align="right"
                        >
                            <div class="display-flex">
                            <text-number-box
                                width="200px"
                                :value="seniorSummary == 0 ?'': seniorSummary"
                                :readOnly="true"
                            />
                            </div>
                        </a-form-item>
                        <a-form-item label="장애인" label-align="right">
                            <div class="display-flex">
                            <text-number-box
                                width="200px"
                                :value="disabledSummary == 0 ?'': disabledSummary"
                                :readOnly="true"
                            />
                            </div>
                        </a-form-item>
                        <a-form-item label="부녀자" label-align="right">
                            <div class="display-flex">
                            <text-number-box
                                width="200px"
                                :value="womenSummary2 == 0 ?'': womenSummary2"
                                :readOnly="true"
                            />
                            </div>
                        </a-form-item>
                        <a-form-item label="한부모" label-align="right">
                            <div class="display-flex">
                            <text-number-box
                                width="200px"
                                :value="singleParentSummary == 0 ?'': singleParentSummary"
                                :readOnly="true"
                            />
                            </div>
                        </a-form-item>
                        <a-form-item label="출산입양" label-align="right">
                            <div class="display-flex">
                            <text-number-box
                                width="200px"
                                :value="maternityAdoptionSummary == 0 ?'': maternityAdoptionSummary"
                                :readOnly="true"
                            />
                            </div>
                        </a-form-item>
                        </a-col>
                    </a-row>
                </div>
            </a-col>
        </a-row>
      
        <PopupAddNewDependent :modalStatus="modalAddNewDependent" @closePopup="modalAddNewDependent = false" :key="newForm"
            :employeeId="idRowEdit" :idRowEdit="idRowEdit" :dataSourceLen="dataSource.length" @upDateData="updateData">
        </PopupAddNewDependent>
        <PopupUpdateDependent :modalStatus="modalEditStatus" @closePopup="modalEditStatus = false" :key="idRowIndex"
            :idRowIndex="idRowIndex" :idRowEdit="idRowEdit" :dataSourceLen="dataSource.length">
        </PopupUpdateDependent>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from "vue";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue"

import { DxDataGrid, DxColumn, DxToolbar, DxItem,DxScrolling, DxColumnFixing } from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";
import { useStore } from 'vuex';
import { useQuery } from "@vue/apollo-composable";
import { companyId, convertAge } from "@/helpers/commonFunction";
import queries from "@/graphql/queries/PA/PA1/PA120/index";
import PopupAddNewDependent from '../tab3Dependent/PopupAddNewDependent.vue'
import PopupUpdateDependent from '../tab3Dependent/PopupUpdateDependent.vue'
import { Message } from "@/configs/enum"
import BtnCheck from '../btnCheck/BtnCheck.vue';
import {
    initFormStateTab3,
    basicDeduction,
    maternityAndAdoption,
    disabledType,
} from "../../utils/index";
export default defineComponent({
    components: {
        PopupAddNewDependent,
        PopupUpdateDependent,
        DxDataGrid,
        DxColumn,
        DxScrolling,
        DxToolbar,
        DxItem, BtnCheck,
        DxButton, EditOutlined, DeleteOutlined,
        DxColumnFixing
    },
    props: {
        popupStatus: {
            type: Boolean,
            default: false,
        },
        idRowEdit: {
            type: Number
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
        const modalStatus = ref(false)
        const contentDelete = Message.getMessage('PA120', '002').message
        const idAction = ref()
        const globalYear = computed(() => store.state.settings.globalYear);
        const idRowIndex = ref()
        const relationSummary = ref();
        const womenSummary = ref();
        const basicDeductionSummary = ref();
        const basicDeductionSummary2 = ref();
        const descendantSummary = ref();
        const seniorSummary = ref();
        const disabledSummary = ref();
        const womenSummary2 = ref();
        const singleParentSummary = ref();
        const maternityAdoptionSummary = ref();
        let formStateTab3 = reactive<any>({
            ...initFormStateTab3,
        })
        const newForm = ref(0)
        const openAddDependent = () => {
            modalAddNewDependent.value = true;
            newForm.value++;
        };
        const actionEdit = (val: any) => {
            idRowIndex.value = val
            modalEditStatus.value = true
            refetchData()

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
                relationSummary.value =
                    dataSource.value.some((item: { relation: string | number }) => {
                        return item.relation == 0;
                    }) === true
                        ? 'O'
                        : '';
                womenSummary.value =
                    dataSource.value.filter((item: any) => {
                        return item.women === true;
                    }).length >= 1
                        ? 'O'
                        : '';
                basicDeductionSummary.value =
                    dataSource.value.filter((item: any) => {
                        return item.basicDeduction == 3;
                    }).length;
                basicDeductionSummary2.value =
                    dataSource.value.filter((item: any) => {
                        return item.basicDeduction == 4;
                    }).length;
                descendantSummary.value = dataSource.value.filter((item: any) => {
                    return item.descendant == true;
                }).length;
                seniorSummary.value = dataSource.value.filter((item: any) => {
                    return item.senior == true;
                }).length;
                disabledSummary.value = dataSource.value.filter((item: any) => {
                    return item.senior == 0;
                }).length;
                disabledSummary.value = dataSource.value.filter((item: any) => {
                    return item.senior == 0;
                }).length;
                womenSummary2.value = dataSource.value.filter((item: any) => {
                    return item.senior == 0;
                }).length;
                singleParentSummary.value = dataSource.value.filter((item: any) => {
                    return item.senior == true;
                }).length;
                maternityAdoptionSummary.value = dataSource.value.filter((item: any) => {
                    return item.senior == 0;
                }).length;
            }
        });
        watch(() => props.idRowEdit, (value) => {
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
            actionEdit,
            hasStatus, updateData,
            onSubmit, contentDelete,
            per_page, move_column, colomn_resize, relationSummary,
            womenSummary,
            basicDeductionSummary,
            basicDeductionSummary2,
            descendantSummary,
            seniorSummary,
            disabledSummary,
            womenSummary2,
            singleParentSummary,
            maternityAdoptionSummary,
            convertAge,
            newForm,
            basicDeduction,
            maternityAndAdoption,
            disabledType,
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
  
     
  