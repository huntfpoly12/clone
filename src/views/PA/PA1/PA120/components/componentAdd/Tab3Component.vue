<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="tab23-pa120">
    <a-row>
      <a-col :span="24">
        <a-spin :spinning="false" size="large">
          <DxDataGrid
            :show-row-lines="true"
            :hoverStateEnabled="true"
            :data-source="dataSource"
            :show-borders="true"
            :allow-column-reordering="move_column"
            :allow-column-resizing="colomn_resize"
            :column-auto-width="true"
            id="gridContainer"
          >
            <DxToolbar>
              <DxItem
                location="after"
                template="button-template"
                css-class="cell-button-add"
              />
            </DxToolbar>
            <template #button-template>
              <DxButton icon="plus" @click="openAddDependent" />
            </template>
            <DxColumn
              alignment="left"
              caption="연말 관계"
              data-field="relation"
            />
            <DxColumn alignment="left" caption="성명" data-field="name" />
            <DxColumn
              caption="내/외국인"
              data-field="foreigner"
              cell-template="foreignerChange"
              :width="80"
            />
            <DxColumn
              alignment="left"
              caption="주민등록번호"
              data-field="residentId"
            />
            <DxColumn alignment="left" caption="나이" data-field="Age" />
            <DxColumn
              alignment="left"
              caption="기본공제"
              data-field="basicDeduction"
              cell-template="basicDeductionChange"
            />
            <DxColumn
              alignment="left"
              caption="부녀자"
              data-field="women"
              cell-template="womenChange"
            />
            <DxColumn
              alignment="left"
              caption="한부모"
              data-field="singleParent"
              cell-template="singleParentChange"
            />
            <DxColumn
              alignment="left"
              caption="경로 우대"
              data-field="senior"
              cell-template="SeniorChange"
            />
            <DxColumn
              alignment="left"
              caption="장애인 "
              data-field="disabled"
              cell-template="disabledChange"
            />
            <DxColumn
              alignment="left"
              caption="자녀"
              data-field="descendant"
              cell-template="DescendantChange"
            />
            <DxColumn
              alignment="left"
              caption="출산 입양"
              data-field="maternityAdoption"
              cell-template="maternityAdoptionChange"
            />
            <DxColumn
              alignment="left"
              caption="위탁 관계 "
              data-field="consignmentRelationship"
              cell-template="consignmentRelationshipChange"
            />
            <!-- <DxColumn
              alignment="left"
              caption="세대주 여부 "
              data-field="householder"
            /> -->
            <template #foreignerChange="{ data: cellData }">
              <employee-info
                :foreigner="cellData.value"
                :status="hasStatus(cellData.value)"
              ></employee-info>
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
              <BtnCheck :value="cellData.value"/>
            </template>
            <template #disabledChange="{ data: cellData }">
              <div v-if="cellData.value">{{cellData.value}}</div>
            </template>
            <template #DescendantChange="{ data: cellData }">
              <BtnCheck :value="cellData.value" />
            </template>
            <template #maternityAdoptionChange="{ data: cellData }">
              <div v-if="cellData.value">{{cellData.value}}</div>
            </template>
            <template #consignmentRelationshipChange="{ data: cellData }">
              <BtnCheck :value="cellData.value" />
            </template>
          </DxDataGrid>
        </a-spin>
      </a-col>
    </a-row>
    <popup-add-new-dependent
      :modalStatus="modalAddNewDependent"
      @closePopup="modalAddNewDependent = false"
      :employeeId="employeeId"
      :dataSourceLen="dataSource.length"
      @upDateData="updateData"
    ></popup-add-new-dependent>
  </div>
</template>
   <script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from 'vue';
import {
  DxDataGrid,
  DxColumn,
  DxToolbar,
  DxItem,
} from 'devextreme-vue/data-grid';
import DxButton from 'devextreme-vue/button';
import { useStore } from 'vuex';
import PopupAddNewDependent from '../tab3Dependent/PopupAddNewDependent.vue';
import { useMutation, useQuery } from '@vue/apollo-composable';
import queries from '@/graphql/queries/PA/PA1/PA120/index';
import { companyId } from '@/helpers/commonFunction';
import BtnCheck from '../btnCheck/BtnCheck.vue';
export default defineComponent({
  components: {
    PopupAddNewDependent,
    DxDataGrid,
    DxColumn,
    DxToolbar,
    DxItem,
    DxButton,
    BtnCheck,
  },
  props: {
    employeeId: {
      type: String,
      default: 0,
    },
  },
  setup(props, context) {
    const dataSource = ref([]);
    const store = useStore();
    const per_page = computed(() => store.state.settings.per_page);
    const move_column = computed(() => store.state.settings.move_column);
    const trigger = ref<boolean>(true);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const modalAddNewDependent = ref<boolean>(false);
    const modalEditStatus = ref<boolean>(false);
    const modalHistoryStatus = ref<boolean>(false);
    const globalYear = computed(() => store.state.settings.globalYear);
    const originDataDetail = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
      employeeId: ref(props.employeeId).value,
    });
    const { refetch, result } = useQuery(
      queries.getEmployeeWage,
      originDataDetail,
    );
    watch(result, (value) => {
      if (value) {
        dataSource.value = value.getEmployeeWage.dependents;
        trigger.value = false;
      }
    });
    // watch(updateData, () => {

    // } )
    const openAddDependent = () => {
      modalAddNewDependent.value = true;
    };
    const actionEdit = (data: any) => {
      refetch();
    };
    const modalHistory = (data: any) => {};

    const actionDelete = (data: any) => {};
    const onSubmit = (e: any) => {};
    const hasStatus = (foreigner: Boolean) => {
      if (foreigner) {
        return null;
      }
      return 0;
    };
    const updateData = (emit: Boolean) => {
      console.log(emit);
      refetch();
    };
    return {
      dataSource,
      modalEditStatus,
      modalAddNewDependent,
      openAddDependent,
      actionEdit,
      modalHistory,
      actionDelete,
      onSubmit,
      per_page,
      move_column,
      colomn_resize,
      originDataDetail,
      result,
      refetch,
      hasStatus,
      updateData,
    };
  },
});
</script>
<style scoped>
.btn-red {
    background: rgb(236, 29, 29);
    padding: 3px 18px;
    border: 1px solid transparent;
    color: #ffffff;
    border-radius: 3px;
    font-size: 12px;
  }
</style>

   