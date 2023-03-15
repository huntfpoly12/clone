<template>
  <action-header title="기타소득자등록" :buttonDelete="false" :buttonSave="false" :buttonSearch="false" :buttonPrint="false" />
  <div id="pa-120" class="page-content">
    <a-row>
      <a-col :span="2" style="padding-right: 10px">
        <div class="total-user">
          <div>
            <span>{{ dataSource.length }}</span>
            <span>전체</span>
          </div>
          <div>
            <img src="@/assets/images/user.svg" alt="" style="width: 39px" />
          </div>
        </div>
      </a-col>
      <a-col :span="2" style="padding-right: 10px">
        <div class="current-user">
          <div>
            <span>{{ totalUserOnl }}</span>
            <span>재직</span>
          </div>
          <div>
            <img src="@/assets/images/user.svg" alt="" style="width: 39px" />
          </div>
        </div>
      </a-col>
      <a-col :span="2" style="padding-right: 10px">
        <div class="leave-user">
          <div>
            <span>{{ totalUserOff }}</span>
            <span>퇴사</span>
          </div>
          <div>
            <img src="@/assets/images/user.svg" alt="" style="width: 39px" />
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row style="flex-flow: row nowrap">
      <a-col :span="11" style="max-width: 46.84%" class="custom-layout">
        <a-spin :spinning="loading" size="large">
          <!-- {{ compareForm() }} compareForm() <br />
          {{ initFormStateTabPA120 }} initFormStateTabPA120 <br />
          {{ editRowPA120 }} editRowPA120 <br />
          {{ activeTabKeyPA120 }} activeTabKeyPA120 <br />
          {{ compareType }} compareType <br />
          {{ isCalculateEditPA120 }} isCalculateEditPA120 <br />
          {{ isNewRowPA120 }} isNewRowPA120 <br /> -->
          <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
            key-expr="employeeId" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
            :column-auto-width="true" :onRowClick="actionEdit" :focused-row-enabled="true" id="pa-120-gridContainer"
            :auto-navigate-to-focused-row="true" v-model:focused-row-key="focusedRowKey">
            <DxSearchPanel :visible="true" :highlight-case-sensitive="true"
              :search-visible-columns="['TypeCodeAndName']" />
            <DxExport :enabled="true" />
            <DxScrolling mode="standard" show-scrollbar="always" />
            <DxToolbar>
              <DxItem name="searchPanel" />
              <DxItem name="exportButton" css-class="cell-button-export" />
              <DxItem location="after" template="button-history" css-class="cell-button-add" />
              <DxItem location="after" template="button-template" css-class="cell-button-add" />
            </DxToolbar>
            <template #button-template>
              <a-tooltip placement="top" class="custom-tooltip">
                <template #title>
                  신규
                </template>
                <div style="text-align: center;">
                  <DxButton icon="plus" @click="openAddNewModal" />
                </div>
              </a-tooltip>
            </template>
            <template #button-history>
              <DxButton icon="plus">
                <HistoryOutlined style="font-size: 18px" @click="modalHistory" />
              </DxButton>
            </template>
            <DxColumn caption="성명" width="180" cell-template="company-name" data-field="name" />
            <template #company-name="{ data }">
              <employee-info :idEmployee="data.data.employeeId" :name="data.data.name"
                :idCardNumber="data.data.residentId" :status="data.data.status" :foreigner="data.data.foreigner"
                :checkStatus="false" @toolTopErorr="toolTopErorr" :employeeId="data.data.employeeId"
                @mouseenter="defaultVisible = true" @mouseleave="defaultVisible = false" />
            </template>
            <DxColumn caption="주민등록번호" cell-template="residentId" width="110" data-field="residentId" />
            <template #residentId="{ data }">
              <resident-id :residentId="data.data.residentId"></resident-id>
            </template>
            <DxColumn caption="비고" cell-template="grade-cell" width="410" data-field="incomeTaxMagnification"
              :calculateCellValue="calculateIncomeTypeCodeAndName" />
            <template #grade-cell="{ data }">
              <div>
                <four-major-insurance v-if="data.data.nationalPensionDeduction" :typeTag="1" :typeValue="1" />
                <four-major-insurance v-if="data.data.healthInsuranceDeduction" :typeTag="2" :typeValue="1" />
                <four-major-insurance v-if="data.data.employeementInsuranceDeduction" :typeTag="4" :typeValue="1" />
                <four-major-insurance v-if="data.data.nationalPensionSupportPercent" :typeTag="6"
                  :ratio="data.data.nationalPensionSupportPercent" />
                <four-major-insurance v-if="data.data.employeementInsuranceSupportPercent" :typeTag="7"
                  :ratio="data.data.employeementInsuranceSupportPercent" />
                <four-major-insurance v-if="data.data.employeementReductionRatePercent" :typeTag="8"
                  :ratio="data.data.employeementReductionRatePercent" />
                <four-major-insurance v-if="data.data.incomeTaxMagnification" :typeTag="10"
                  :ratio="data.data.incomeTaxMagnification" />
              </div>
            </template>
            <DxColumn cell-template="pupop" width="30" />
            <template #pupop="{ data }">
              <div class="custom-action" style="text-align: center" v-if="data.data.deletable">
                <a-space :size="10">
                  <DeleteOutlined @click="actionDeleteFuc(data.data.employeeId)" />
                </a-space>
              </div>
            </template>
            <DxScrolling column-rendering-mode="virtual" />
          </DxDataGrid>
        </a-spin>
      </a-col>
      <a-col :span="13" class="custom-layout">
        <PA120PopupAddNewVue ref="addNew" :idRowEdit="idRowEdit" :modalStatus="modalAddNewStatus"
          v-if="actionChangeComponent == 1" :key="addComponentKey" />
        <PA120PopupEdit :idRowEdit="idRowEdit" v-if="actionChangeComponent == 2" />
      </a-col>
    </a-row>
    <PopupMessage :modalStatus="delStatus" @closePopup="delStatus = false" typeModal="confirm" :content="contentDelete"
      okText="네" cancelText="아니요" @checkConfirm="statusComfirm" />
    <history-popup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" title="변경이력"
      :idRowEdit="idRowEdit" typeHistory="pa-120" />
    <PopupMessage :modalStatus="rowChangeStatus" @closePopup="rowChangeStatus = false" :typeModal="'confirm'"
      :title="messageSave" :content="''" :keyAccept="'1234'" :okText="'네'" cancelText="아니요"
      @checkConfirm="onRowChangeComfirm" />
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from 'vue';
import { DxDataGrid, DxColumn, DxToolbar, DxItem, DxPaging, DxScrolling, DxSearchPanel, DxExport } from 'devextreme-vue/data-grid';
import DxButton from 'devextreme-vue/button';
import { useStore } from 'vuex';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { companyId } from '@/helpers/commonFunction';
import notification from '@/utils/notification';
import queries from '@/graphql/queries/PA/PA1/PA120/index';
import mutations from '@/graphql/mutations/PA/PA1/PA120/index';
import PA120PopupAddNewVue from './components/PA120PopupAddNew.vue';
import PA120PopupEdit from './components/PA120PopupEdit.vue';
import { Message } from '@/configs/enum';
import { DxTooltip } from 'devextreme-vue/tooltip';
import { initFormStateTab1, initFormStateTab2 } from './utils/index';
import { EditOutlined, HistoryOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import queryCM130 from "@/graphql/queries/CM/CM130/index";

export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxToolbar,
    DxPaging,
    DxItem,
    DxButton,
    EditOutlined,
    HistoryOutlined,
    DeleteOutlined,
    PA120PopupAddNewVue,
    PA120PopupEdit,
    DxScrolling,
    DxTooltip,
    DxSearchPanel,
    DxExport
  },
  setup() {
    const actionChangeComponent = ref(2);
    const addNew = ref();
    const contentDelete = Message.getMessage('PA120', '002').message;
    const delStatus = ref(false);
    const dataSource = ref<any[]>([]);
    const store = useStore();
    const totalUserOnl = ref(0);
    const totalUserOff = ref(0);
    const globalYear = computed(() => store.state.settings.globalYear);
    const per_page = computed(() => store.state.settings.per_page);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const initFormStateTabPA120 = computed(() => store.state.common.initFormStateTabPA120);
    const editRowPA120 = computed(() => store.state.common.editRowPA120);
    const isNewRowPA120 = computed(() => store.state.common.isNewRowPA120);
    const idAction = ref();
    const modalAddNewStatus = ref<boolean>(false);
    const modalHistoryStatus = ref<boolean>(false);
    const defaultVisible = ref<boolean>(false);
    const idRowEdit = ref();
    const rowChangeStatus = ref<Boolean>(false);
    const idRowFake = ref();
    const messageSave = Message.getMessage('COMMON', '501').message;
    const messageDel = Message.getMessage('COMMON', '401').message;
    const isAddFormErrorPA120 = computed(() => store.state.common.isAddFormErrorPA120);

    //--------------------delete row data-------------------

    const { mutate: actionDelete, onError: errorDelete, onDone: successDelete } = useMutation(mutations.deleteEmployeeWage);
    const actionDeleteFuc = (data: any) => {
      idAction.value = data;
      delStatus.value = true;
    };
    const statusComfirm = (res: any) => {
      if (res == true) {
        actionDelete({
          companyId: companyId,
          imputedYear: globalYear.value,
          employeeId: idAction.value,
        });
        actionChangeComponent.value = 1;
      }
    };
    successDelete((e) => {
      notification('success', `업데이트 완료!`);
      isFirstRun.value = true;
      actionChangeComponent.value = 2;
      trigger.value = true;
    });
    errorDelete((e) => {
      notification('error', e.message);
    });

    //-----------------get employee wage and data source --------------------------------

    const isFirstRun = ref(true);
    const trigger = ref<boolean>(true);
    const originData = ref({
      companyId: companyId,
      imputedYear: globalYear.value,
    });
    const {
      result,
      loading,
    } = useQuery(queries.getEmployeeWages, originData, () => ({
      enabled: trigger.value,
      fetchPolicy: 'no-cache',
    }));
    watch(result, (value) => {
      const data = value.getEmployeeWages;
      dataSource.value = data;
      if (compareType.value == 3) {
        addNewRow();
        return;
      }
      if (data.length > 0 && isFirstRun.value) {
        actionChangeComponent.value = 2;
        idRowEdit.value = data[0].employeeId;
        focusedRowKey.value = data[0].employeeId;
        isFirstRun.value = false;
        idRowFake.value = data[0].employeeId;
      }
      if (data.length == 0) {
        actionChangeComponent.value = 1;
        store.commit('common/initFormStateTabPA120', initFormStateTab1);
        store.commit('common/editRowPA120', initFormStateTab1);
      }
      trigger.value = false;
    });
    //change year
    const isClickYearDiff = ref(false);
    const changeYearDataFake = ref();
    const yearPA120 = computed(() => store.state.common.yearPA120);
    const changeYear = (newVal: any) => {
      isFirstRun.value = true;
      originData.value.imputedYear = newVal;
      trigger.value = true;
      store.state.common.isNewRowPA120 = false;
      store.state.common.yearPA120 = newVal;
      changeYearDataFake.value = newVal;
    }
    let watchGlobalYear = watch(globalYear, (newVal, oldVal) => {
      if (compareForm()) {
        changeYear(newVal);
      } else {
        compareType.value = 2;
        rowChangeStatus.value = true;
        isClickYearDiff.value = true;
        changeYearDataFake.value = oldVal;
      }
    });
    // addcomponent
    const addComponentKey = ref(1);
    const modalHistory = () => {
      modalHistoryStatus.value = true;
    };

    //----------------compare Data----------------

    const isCalculateEditPA120 = computed(() => store.state.common.isCalculateEditPA120);
    //function common
    const delNewRow = () => {
      dataSource.value = dataSource.value.splice(0, dataSource.value.length - 1);
      store.commit('common/initFormStateTabPA120', initFormStateTab1);
      addComponentKey.value++;
      store.state.common.isNewRowPA120 = false;
      compareType.value = 2;
    };
    const addNewRow = () => {
      actionChangeComponent.value = 1;
      store.commit('common/initFormStateTabPA120', initFormStateTab1);
      store.commit('common/editRowPA120', initFormStateTab1);
      store.state.common.isNewRowPA120 = true;
      compareType.value = 1;
      setTimeout(() => {
        dataSource.value = dataSource.value.concat([initFormStateTabPA120.value]);
        focusedRowKey.value = initFormStateTabPA120.value.employeeId;
      }, 0)
    };
    const compareType = ref(2); //2 is row click. 1 is add button click;
    const compareForm = () => {
      const { stayQualification, ...obj1 } = editRowPA120.value;
      const { stayQualification: stayQualification2, ...obj2 } = initFormStateTabPA120.value;
      if (JSON.stringify(obj1) == JSON.stringify(obj2) && isCalculateEditPA120.value) {
        return true;
      }
      return false;
    };
    const openAddNewModal = async () => {
      compareType.value = 1;
      if (isNewRowPA120.value) {
        if (!compareForm()) {
          rowChangeStatus.value = true;
          return;
        }
        store.commit('common/initFormStateTabPA120', initFormStateTab1);
        dataSource.value = dataSource.value.splice(0, dataSource.value.length - 1);
        dataSource.value = dataSource.value.concat([initFormStateTabPA120.value]);
        addComponentKey.value++;
        return;
      }
      if (!compareForm()) {
        rowChangeStatus.value = true;
        return;
      }
      initFormStateTabPA120.value.stayQualification = initFormStateTab1.stayQualification;
      addNewRow();
      return;
    };
    const tabCurrent = computed(() => {
      if (!isCalculateEditPA120.value) {
        return 2;
      }
      return 1;
    })
    const rowKeyTab2PA120 = computed(() => store.state.common.rowKeyTab2PA120)
    const onRowChangeComfirm = async (ok: boolean) => {
      if (ok) {
        if (compareType.value == 1) {
          compareType.value = 3;
        }
        if (tabCurrent.value == 1) {
          let ele11 = document.getElementById('btn-save') as HTMLInputElement;
          ele11?.click();
          let ele12 = document.getElementById('btn-save-edit');
          ele12?.click();
        }
        if (tabCurrent.value == 2) {
          let ele21 = document.getElementById('btn-save-edit-tab2');
          ele21?.click();
          let ele22 = document.getElementById('btn-save-add-tab2');
          ele22?.click();
        }
      } else {
        if (isClickYearDiff.value) {
          changeYear(globalYear.value);
          isClickYearDiff.value = false;
          return;
        }
        if (isNewRowPA120.value) {
          dataSource.value = dataSource.value.splice(0, dataSource.value.length - 1);
        }
        if (compareType.value == 1) {
          addNewRow();
          return;
        }
        if (compareType.value == 2) {
          idRowEdit.value = idRowFake.value;
          store.state.common.isNewRowPA120 = false;
          actionChangeComponent.value = 2;
          focusedRowKey.value = idRowEdit.value;
        }
        compareType.value = 2;
      }
    };
    // when submit form done
    const actionFormDonePA120 = computed(() => store.getters['common/actionFormDonePA120']);
    watch(actionFormDonePA120, () => {
      if (compareType.value == 3) {
        trigger.value = true;
        return;
      }
      if (isClickYearDiff.value) {
        changeYear(globalYear.value)
        isClickYearDiff.value = false;
      }
      trigger.value = true;
      idRowEdit.value = idRowFake.value;
      store.state.common.isNewRowPA120 = false;
      focusedRowKey.value = compareType.value == 1 ? initFormStateTabPA120.value.employeeId : idRowFake.value;
    });
    //submit error
    const actionFormErrorPA120 = computed(() => store.state.common.actionFormErrorPA120);
    watch(actionFormErrorPA120, () => {
      if (isClickYearDiff.value) {
        watchGlobalYear();
        store.state.settings.globalYear = changeYearDataFake.value;
        watchGlobalYear = watch(globalYear, (newVal, oldVal) => {
          if (compareForm()) {
            changeYear(newVal)
          } else {
            compareType.value = 2;
            rowChangeStatus.value = true;
            isClickYearDiff.value = true;
            changeYearDataFake.value = oldVal;
          }
        });
        isClickYearDiff.value = false;
      }
      if (tabCurrent.value == 2) {
        store.commit('common/activeTabKeyPA120', '2');
      } else {
        store.commit('common/activeTabKeyPA120', '1');
      }
      focusedRowKey.value = initFormStateTabPA120.value.employeeId;
    });
    //edit row
    const actionEdit = (data: any) => {
      compareType.value = 2;
      if (isNewRowPA120.value) {
        if (compareForm()) {
          delNewRow();
          // focusedRowKey.value = data.data.employeeId;
          idRowEdit.value = data.data.employeeId;
          if (actionChangeComponent.value == 1) {
            actionChangeComponent.value = 2;
          }
          // isFirstWeb.value = false;
          return;
        }
        rowChangeStatus.value = true;
        idRowFake.value = data.data.employeeId;
        return;
      }
      // isFirstWeb.value = false;
      if (!compareForm()) {
        rowChangeStatus.value = true;
        idRowFake.value = data.data.employeeId;
        return;
      } else {
        idRowEdit.value = data.data.employeeId;
        idRowFake.value = data.data.employeeId;
        if (actionChangeComponent.value == 1) {
          actionChangeComponent.value = 2;
        }
      }
    };

    watch(result, (value) => {
      if (value) {
        dataSource.value = value.getEmployeeWages;
        totalUserOnl.value = 0;
        totalUserOff.value = 0;
        dataSource.value.map((val: any) => {
          if (val.status != 0) {
            totalUserOnl.value++;
          } else {
            totalUserOff.value++;
          }
        });
        trigger.value = false;
      }
    });

    //tooltip residentId
    const isResidentIdError = reactive<any>({});
    const toolTopErorr = (val: any) => {
      isResidentIdError[val.id] = val.isError;
    };
    //focus Row
    const focusedRowKey = ref(initFormStateTabPA120.value.employeeId);
    watch(() => initFormStateTabPA120.value.employeeId, (newVal: any) => {
      focusedRowKey.value = newVal;
    })
    const keyActivePA120 = computed(() => store.getters['common/keyActivePA120']);
    const activeTabKeyPA120 = computed(() => store.state.common.activeTabKeyPA120);
    function calculateIncomeTypeCodeAndName(rowData: any) {
      return `${rowData.nationalPensionDeduction + rowData.healthInsuranceDeduction + rowData.employeementInsuranceDeduction + rowData.nationalPensionSupportPercent + rowData.employeementInsuranceSupportPercent + rowData.employeementReductionRatePercent + rowData.incomeTaxMagnification}`;
    }

    // get config

    const dataQuery = ref({ companyId: companyId, imputedYear: globalYear });
    const { result: resultConfig } = useQuery(
      queryCM130.getWithholdingConfig,
      dataQuery,
      () => ({
        fetchPolicy: "no-cache",
      })
    );
    watch(resultConfig, (newVal) => {
      if (newVal) {
        store.state.common.isDisableInsuranceSupport = newVal.getWithholdingConfig.insuranceSupport;
      }
    })
    return {
      loading,
      idRowEdit,
      actionChangeComponent,
      delStatus,
      dataSource,
      actionEdit,
      actionDelete,
      actionDeleteFuc,
      modalHistory,
      contentDelete,
      totalUserOnl,
      totalUserOff,
      modalHistoryStatus,
      openAddNewModal,
      modalAddNewStatus,
      statusComfirm,
      per_page,
      move_column,
      colomn_resize,
      addComponentKey,
      addNew,
      toolTopErorr,
      isResidentIdError,
      focusedRowKey,
      activeTabKeyPA120,
      keyActivePA120,
      defaultVisible,
      initFormStateTabPA120,
      isNewRowPA120,
      initFormStateTab1,
      rowChangeStatus,
      onRowChangeComfirm,
      compareType,
      messageSave,
      messageDel,
      // isFirstWeb,
      editRowPA120,
      compareForm,
      tabCurrent,
      rowKeyTab2PA120,
      calculateIncomeTypeCodeAndName,
      isCalculateEditPA120,
    };
  },
});
</script>
<style lang="scss" scoped src="./style/style.scss" ></style>
