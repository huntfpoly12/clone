<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="tab23-pa120">
    <div class="header-text-3 mb-0" style="margin-bottom: 0">부양가족 상세</div>
    <a-row>
      <a-col :span="24">
        <a-spin :spinning="loading" size="large">
          <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
                      :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true"
                      id="gridContainer" noDataText="내역이 없습니다">
            <DxScrolling mode="infinite" />
            <DxToolbar>
              <DxItem location="after" template="button-template" css-class="cell-button-add" />
            </DxToolbar>
            <template #button-template>
              <DxButton icon="plus" @click="openAddDependent" />
            </template>
            <DxColumn alignment="left" caption="연말 관계" data-field="relation" cell-template="relation" />
            <template #relation="{ data }">
              {{ $filters.formatRelation(data.value) }}
            </template>
            <DxColumn alignment="left" caption="성명" data-field="name" />
            <DxColumn caption="내/외국인" data-field="foreigner" cell-template="foreignerChange" :width="80" />
            <DxColumn alignment="left" caption="주민등록번호" cell-template="residentId" data-field="residentId" />
            <DxColumn alignment="left" cell-template="ageChange" header-cell-template="age-header" />
            <DxColumn alignment="left" header-cell-template="basicDeduction-header" data-field="basicDeduction"
                      cell-template="basicDeductionChange" />
            <DxColumn alignment="left" header-cell-template="women-header" data-field="women"
                      cell-template="womenChange" />
            <DxColumn alignment="left" header-cell-template="singleParent-header" data-field="singleParent"
                      cell-template="singleParentChange" />
            <DxColumn alignment="left" header-cell-template="senior-header" data-field="senior"
                      cell-template="SeniorChange" />
            <DxColumn alignment="left" caption="장애인 " data-field="disabled" cell-template="disabledChange" />
            <DxColumn alignment="left" header-cell-template="descendant-header" data-field="descendant"
                      cell-template="DescendantChange" />
            <DxColumn alignment="left" caption="출산 입양" data-field="maternityAdoption"
                      cell-template="maternityAdoptionChange" />
            <DxColumn alignment="left" caption="위탁 관계 " data-field="consignmentRelationship" />
            <DxColumn alignment="left" caption="세대주여부 " data-field="householder" cell-template="householderChange" />
            <DxColumnFixing :enabled="true" />
            <DxColumn :width="50" cell-template="pupop" :fixed="true" fixed-position="right" alignment="center" />
            <template #pupop="{ data }">
              <DxButton class="custom-action" @click="actionEdit(data.data)"
                        style="border: none; margin-top: -2px; width: 35px; height: 35px;">
                <div v-if="!loading">
                  <zoom-in-outlined v-if="data.data.relation == 0" :style="{ fontSize: '20px', color: 'black' }" />
                  <edit-outlined v-else :style="{ fontSize: '20px', color: 'black' }" />
                </div>
              </DxButton>
            </template>
            <template #foreignerChange="{ data: cellData }">
              <div v-if="!cellData.value">내</div>
              <div v-else class="tag-foreigner">외 </div>
            </template>
            <template #residentId="{ data: cellData }">
              <div>{{ cellData.value.slice(0, 6) + '-' + cellData.value.slice(6, 13) }}</div>
            </template>
            <template #womenChange="{ data: cellData }">
              <BtnCheck :value="cellData.value" />
            </template>
            <template #ageChange="{ data }">
              {{ convertAge(data.data.residentId.toString()) }}
            </template>
            <template #basicDeductionChange="{ data: cellData }">
              <div v-if="cellData.value == 0">
                <button class="btn-red">해당없음</button>
              </div>
              <div v-else>{{ basicDeduction(cellData.value) }}</div>
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
            <template #householderChange="{ data: cellData }">
              <BtnCheck :value="cellData.value" />
            </template>
            <template #age-header>
              <a-tooltip placement="top" class="custom-tooltip" :overlayStyle="{ maxWidth: '500px' }">
                <template #title>
                  주민등록번호로 해당 원천년도 기준 나이 자동 계산
                </template>
                <div style="text-align: center;">
                  나이
                </div>
              </a-tooltip>
            </template>
            <template #basicDeduction-header>
              <a-tooltip placement="top" class="custom-tooltip" :overlayStyle="{ maxWidth: '500px' }">
                <template #title>
                  주민등록번호로 해당 원천년도 기준 나이 자동 계산 <br />
                  다만, 장애인에 해당하는 경우 나이 기준을 적용하지 아니함
                </template>
                <div style="text-align: center;">
                  기본공제
                </div>
              </a-tooltip>
            </template>
            <template #women-header>
              <a-tooltip placement="top" class="custom-tooltip">
                <template #title>
                  한부모가족 공제와 중복 공제 불가
                </template>
                <div style="text-align: center;">
                  부녀자
                </div>
              </a-tooltip>
            </template>
            <template #singleParent-header>
              <a-tooltip placement="top" class="custom-tooltip">
                <template #title>
                  부녀자 공제와 중복 공제 불가
                </template>
                <div style="text-align: center;">
                  한부모
                </div>
              </a-tooltip>
            </template>
            <template #senior-header>
              <a-tooltip placement="top" class="custom-tooltip">
                <template #title>
                  만 70세 이상
                </template>
                <div style="text-align: center;">
                  경로 우대
                </div>
              </a-tooltip>
            </template>
            <template #descendant-header>
              <a-tooltip placement="top" class="custom-tooltip">
                <template #title>
                  7세 이상 20세 이하의 자녀인 경우 공제 대상
                </template>
                <div style="text-align: center;">
                  자녀
                </div>
              </a-tooltip>
            </template>
          </DxDataGrid>
        </a-spin>
        <div>
          <div class="header-text-3">부양가족 요약</div>
          <a-row >
            <a-col :span="12" class="pr-10">
              <div class="header-text-2">기본공제</div>

              <a-form-item label="본인" label-align="right">
                <div class="display-flex">
                  <text-number-box width="200px" :value="relationSummary" :disabled="true" />
                </div>
              </a-form-item>
              <a-form-item label="배우자" label-align="right">
                <div class="display-flex">
                  <text-number-box width="200px" :value="basicDeductionSummary0" :disabled="true" />
                </div>
              </a-form-item>
              <a-form-item label="20세이하" label-align="right">
                <div class="display-flex">
                  <text-number-box width="200px" :value="basicDeductionSummary == 0 ? '' : basicDeductionSummary"
                                   :disabled="true" />
                </div>
              </a-form-item>
              <a-form-item label="60세이하" label-align="right">
                <div class="display-flex">
                  <text-number-box width="200px" :value="basicDeductionSummary2 == 0 ? '' : basicDeductionSummary2"
                                   :disabled="true" />
                </div>
              </a-form-item>
              <div class="header-text-2">자녀세액공제</div>
              <a-form-item label="자녀세액공제" label-align="right">
                <div class="display-flex">
                  <text-number-box width="200px" :value="descendantSummary == 0 ? '' : descendantSummary"
                                   :disabled="true" />
                </div>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <div class="header-text-2">추가/세액공제</div>
              <a-form-item label="경로우대" class="display-flex" label-align="right">
                <div class="display-flex">
                  <text-number-box width="200px" :value="seniorSummary == 0 ? '' : seniorSummary" :disabled="true" />
                </div>
              </a-form-item>
              <a-form-item label="장애인" label-align="right">
                <div class="display-flex">
                  <text-number-box width="200px" :value="disabledSummary == 0 ? '' : disabledSummary" :disabled="true" />
                </div>
              </a-form-item>
              <a-form-item label="부녀자" label-align="right">
                <div class="display-flex">
                  <text-number-box width="200px" :value="womenSummary2 == 0 ? '' : womenSummary2" :disabled="true" />
                </div>
              </a-form-item>
              <a-form-item label="한부모" label-align="right">
                <div class="display-flex">
                  <text-number-box width="200px" :value="singleParentSummary == 0 ? '' : singleParentSummary"
                                   :disabled="true" />
                </div>
              </a-form-item>
              <a-form-item label="출산입양" label-align="right">
                <div class="display-flex">
                  <text-number-box width="200px" :value="maternityAdoptionSummary == 0 ? '' : maternityAdoptionSummary"
                                   :disabled="true" />
                </div>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
    <PopupAddNewDependent v-if="modalAddNewDependent" :modalStatus="modalAddNewDependent"
                          @closePopup="modalAddNewDependent = false" :key="newForm" :employeeId="employeeIdPA120" :idRowEdit="employeeIdPA120"
                          :dataSourceLen="dataSource.length" @upDateData="updateData" :relationAll="relationAll" :deductionAll="deductionAll">
    </PopupAddNewDependent>
    <PopupUpdateDependent v-if="modalEditStatus" :modalStatus="modalEditStatus" @closePopup="modalEditStatus = false" :deductionAll="deductionAll"
                          :idRowEdit="employeeIdPA120" :dependentItem="dependentItem" @upDateData="updateData" :relationAll="relationAll">
    </PopupUpdateDependent>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from "vue";
import { EditOutlined, DeleteOutlined, ZoomInOutlined } from "@ant-design/icons-vue"

import { DxDataGrid, DxColumn, DxToolbar, DxItem, DxScrolling, DxColumnFixing } from "devextreme-vue/data-grid";
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
    DxColumnFixing,
    ZoomInOutlined,
  },
  props: {
    idRowEdit: {
      type: Number
    },
  },
  setup(props, { emit }) {
    const dataSource = ref([]);
    const store = useStore();
    const per_page = computed(() => store.state.settings.per_page);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const modalAddNewDependent = ref<boolean>(false);
    const modalEditStatus = ref<boolean>(false);
    const modalStatus = ref(false)
    const contentDelete = Message.getMessage('PA120', '002').message
    const idAction = ref();
    const relationSummary = ref();
    const basicDeductionSummary0 = ref();
    const basicDeductionSummary = ref();
    const basicDeductionSummary2 = ref();
    const descendantSummary = ref();
    const seniorSummary = ref();
    const disabledSummary = ref();
    const womenSummary2 = ref();
    const singleParentSummary = ref();
    const maternityAdoptionSummary = ref();
    const relationAll = ref();
    const deductionAll = ref();
    let formStateTab3 = reactive<any>({
      ...initFormStateTab3,
    })
    const newForm = ref(0)
    const yearPA120 = computed(() => store.state.common.yearPA120);
    const openAddDependent = () => {
      modalAddNewDependent.value = true;
      newForm.value++;
    };
    const dependentItem = ref();
    const actionEdit = (val: any) => {
      dependentItem.value = val;
      modalEditStatus.value = true
    }
    const employeeIdPA120 = computed(() => store.state.common.employeeIdPA120);

    // get employee independent
    const originDataDetail = ref({
      companyId: companyId,
      imputedYear: yearPA120.value,
      employeeId: employeeIdPA120
    })
    // watch(() => employeeIdPA120, (value) => {
    //   originDataDetail.value.employeeId = value;
    // })
    // watch(() => employeeIdPA120, async (newVal) => {
    //   originDataDetail.value = {
    //     companyId: companyId,
    //     imputedYear: yearPA120.value,
    //     employeeId: newVal
    //   };
    //   trigger.value = true;
    // }, { immediate: true })
    const {
      result,
      loading,
      refetch
    } = useQuery(queries.getEmployeeWage, originDataDetail, () => ({
      fetchPolicy: "no-cache",
    }));
    watch(result, (value) => {
      if (value) {
        dataSource.value = value.getEmployeeWage.dependents;
        relationAll.value = value.getEmployeeWage.dependents.map((item: any) => ({
          value: item.relation
        }))
        deductionAll.value = value.getEmployeeWage.dependents.map((item: any) => ({
          value: item.basicDeduction
        }))
        store.state.common.deductionDependentCountPA120 = value.getEmployeeWage.deductionDependentCount;
        relationSummary.value =
          dataSource.value.some((item: { relation: string | number }) => {
            return item.relation == 0;
          }) === true
            ? 'O'
            : '';
        basicDeductionSummary0.value =
          dataSource.value.filter((item: any) => {
            return item.basicDeduction == 2;
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
          return item.descendant;
        }).length
        seniorSummary.value = dataSource.value.filter((item: any) => {
          return item.senior;
        }).length;
        disabledSummary.value = dataSource.value.filter((item: any) => {
          return item.disabled;
        }).length;
        womenSummary2.value = dataSource.value.filter((item: any) => {
          return item.women;
        }).length;
        singleParentSummary.value = dataSource.value.filter((item: any) => {
          return item.singleParent;
        }).length;
        maternityAdoptionSummary.value = dataSource.value.filter((item: any) => {
          return item.maternityAdoption;
        }).length;
      }
    });

    const updateData = () => {
      refetch();
    };
    const hasStatus = (foreigner: Boolean) => {
      if (foreigner) {
        return null;
      }
      return 0;
    };

    return {
      companyId, idAction, loading,
      dataSource,
      modalEditStatus,
      modalStatus, formStateTab3,
      modalAddNewDependent,
      openAddDependent,
      actionEdit,
      hasStatus, updateData,
      contentDelete,
      per_page, move_column, colomn_resize, relationSummary,
      basicDeductionSummary0,
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
      dependentItem,
      relationAll,
      deductionAll,
      employeeIdPA120,
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
  margin: 15px 0px;

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

#gridContainer {
  max-height: 300px;
}
</style>


