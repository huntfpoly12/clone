<template>
  <action-header title="기타소득자등록" :buttonDelete="false" :buttonSave="false" :buttonSearch="false" :buttonPrint="false" />
  <div id="pa-120" class="page-content">
    <a-row style="flex-flow: row nowrap" class="row-first">
      <a-col :span="11" style="max-width: 45.34%" class="col-left">
        <a-spin :spinning="loading" size="large">
          <DxDataGrid id="pa-120-gridContainer" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
            :show-borders="true" key-expr="key" :allow-column-reordering="move_column"
            :allow-column-resizing="colomn_resize" :column-auto-width="true" :onRowClick="actionEdit"
            :focused-row-enabled="true" :auto-navigate-to-focused-row="true" v-model:focused-row-key="focusedRowKey"
            ref="gridRef" @focused-row-changing="onFocusedRowChanging" noDataText="내역이 없습니다">
            <DxPaging :page-size="0" />
            <DxSearchPanel :visible="true" :highlight-case-sensitive="true" :search-visible-columns="['TypeCodeAndName']"
              placeholder="검색" />
            <DxExport :enabled="true" />
            <DxScrolling mode="standard" show-scrollbar="always" />
            <DxToolbar>
              <DxItem template="total-user" location="before" />
              <DxItem name="searchPanel" />
              <DxItem name="exportButton" css-class="cell-button-export" />
              <DxItem location="after" template="button-history" css-class="cell-button-add" />
              <DxItem location="after" template="button-template" css-class="cell-button-add" />
            </DxToolbar>
            <template #total-user>
              <a-row style="width: 280px">
                <a-col :span="8" style="padding-right: 10px">
                  <div class="total-user">
                    <div>
                      <span>{{ dataSource.length }}</span>
                      <span>전체</span>
                    </div>
                    <div>
                      <img src="@/assets/images/user.svg" alt="" />
                    </div>
                  </div>
                </a-col>
                <a-col :span="8" style="padding-right: 10px">
                  <div class="current-user total-user">
                    <div>
                      <span>{{ totalUserOnl }}</span>
                      <span>재직</span>
                    </div>
                    <div>
                      <img src="@/assets/images/user.svg" alt="" />
                    </div>
                  </div>
                </a-col>
                <a-col :span="8" style="padding-right: 10px">
                  <div class="leave-user total-user">
                    <div>
                      <span>{{ totalUserOff }}</span>
                      <span>퇴사</span>
                    </div>
                    <div>
                      <img src="@/assets/images/user.svg" alt="" />
                    </div>
                  </div>
                </a-col>
              </a-row>
            </template>
            <template #button-template>
              <a-tooltip placement="top" class="custom-tooltip">
                <template #title> 신규 </template>
                <div style="text-align: center">
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
            <template #company-name="{ data }: any">
              <employee-info :idEmployee=" data.data.employeeId " :name=" data.data.name "
                :idCardNumber=" data.data.residentId " :status=" data.data.status " :foreigner=" data.data.foreigner "
                :checkStatus=" false " @toolTopErorr=" toolTopErorr " :employeeId=" data.data.employeeId "
                @mouseenter="defaultVisible = true" @mouseleave="defaultVisible = false" />
            </template>
            <DxColumn caption="주민등록번호" cell-template="residentId" width="110" data-field="residentId" />
            <template #residentId=" { data }: any ">
              <resident-id :residentId=" data.data.residentId "></resident-id>
            </template>
            <DxColumn caption="비고" cell-template="grade-cell" data-field="incomeTaxMagnification"
              :calculateCellValue=" calculateIncomeTypeCodeAndName " />
            <template #grade-cell=" { data }: any ">
              <div>
                <four-major-insurance v-if=" data.data.nationalPensionDeduction " :typeTag=" 1 " :typeValue=" 1 " />
                <four-major-insurance v-if=" data.data.healthInsuranceDeduction " :typeTag=" 2 " :typeValue=" 1 " />
                <four-major-insurance v-if=" data.data.employeementInsuranceDeduction " :typeTag=" 4 " :typeValue=" 1 " />
                <four-major-insurance v-if=" data.data.nationalPensionSupportPercent " :typeTag=" 6 "
                  :ratio=" data.data.nationalPensionSupportPercent " />
                <four-major-insurance v-if=" data.data.employeementInsuranceSupportPercent " :typeTag=" 7 "
                  :ratio=" data.data.employeementInsuranceSupportPercent " />
                <four-major-insurance v-if=" data.data.employeementReductionRatePercent " :typeTag=" 8 "
                  :ratio=" data.data.employeementReductionRatePercent " />
                <four-major-insurance v-if=" data.data.incomeTaxMagnification " :typeTag=" 10 "
                  :ratio=" data.data.incomeTaxMagnification " />
              </div>
            </template>
            <DxColumn cell-template="action" width="48" />
            <template #action=" { data }: any ">
              <DxButton type="ghost" style="cursor: pointer" @click="actionDeleteFuc(data.data.employeeId)"
                v-if=" data.data.deletable ">
                <a-tooltip zIndex="9999999" placement="top" color="black">
                  <template #title>
                    <div>삭제</div>
                  </template>
                  <DeleteOutlined style="font-size: 16px" />
                </a-tooltip>
              </DxButton>
            </template>
          </DxDataGrid>
        </a-spin>
        <!-- <input v-model="focusedRowKey"/> -->
      </a-col>
      <a-col :span=" 13 " class="col-right">
        <PA120PopupAddNewVue :modalStatus=" modalAddNewStatus "
          v-if=" actionChangeComponent == 1 " :key=" addComponentKey " @redirectTab=" redirectTab " />
        <PA120PopupEdit v-if=" actionChangeComponent == 2 " />
      </a-col>
    </a-row>
    <a-modal :visible=" delStatus " @cancel="delStatus = false" :mask-closable=" false " class="confirm-md" footer=""
      :width=" 500 ">
      <standard-form action="" name="delete-510">
        <div class="custom-modal-delete">
          <img src="@/assets/images/icon_delete.png" alt="" style="width: 30px" />
          <span>{{ contentDelete }}</span>
        </div>
        <div class="text-align-center mt-30">
          <button-basic class="button-form-modal" :text=" '아니요' " :type=" 'default' " :mode=" 'outlined' "
            @onClick="delStatus = false" />
          <button-basic class="button-form-modal" :text=" '네. 삭제합니다' " :width=" 140 " :type=" 'default' "
            :mode=" 'contained' " @onClick=" statusComfirm " />
        </div>
      </standard-form>
    </a-modal>
    <history-popup :modalStatus=" modalHistoryStatus " @closePopup="modalHistoryStatus = false" title="변경이력"
      :idRowEdit=" employeeIdPA120 " typeHistory="pa-120" />
    <PopupMessage :modalStatus=" rowChangeStatus " @closePopup="rowChangeStatus = false" :typeModal=" 'confirm' "
      :title=" messageSave " :content=" '' " :keyAccept=" '1234' " :okText=" '네' " cancelText="아니요"
      @checkConfirm=" onRowChangeComfirm " />
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from "vue";
import {
  DxDataGrid,
  DxColumn,
  DxToolbar,
  DxItem,
  DxPaging,
  DxScrolling,
  DxSearchPanel,
  DxExport,
} from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";
import { useStore } from "vuex";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { companyId } from "@/helpers/commonFunction";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA1/PA120/index";
import mutations from "@/graphql/mutations/PA/PA1/PA120/index";
import PA120PopupAddNewVue from "./components/PA120PopupAddNew.vue";
import PA120PopupEdit from "./components/PA120PopupEdit.vue";
import { Message } from "@/configs/enum";
import { DxTooltip } from "devextreme-vue/tooltip";
import { initFormStateTab1 } from "./utils/index";
import {
  EditOutlined,
  HistoryOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
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
    DxExport,
  },
  setup() {
    const store = useStore();
    const contentDelete = Message.getMessage("PA120", "002").message;
    const { move_column, colomn_resize } = store.state.settings;
    const actionChangeComponent = ref(2);
    const totalUserOnl = ref(0);
    const totalUserOff = ref(0);
    const globalYear = ref<number>(
      parseInt(sessionStorage.getItem("paYear") ?? "0")
    );
    const formStateTab1PA120 = computed(               // form data tab 1 
      () => store.state.common.formStateTab1PA120
    );
    const formOriginTab1PA120 = computed(() => store.state.common.formOriginTab1PA120); // form data tab 1 to compare
    const formStateTab2PA120 = computed(
      () => store.state.common.formStateTab2PA120       // form data tab 1 
    );
    const formOriginTab2PA120 = computed(               // form data tab 1 to compare
      () => store.state.common.formOriginTab2PA120
    );
    const isNewRowPA120 = computed(() => store.state.common.isNewRowPA120); // check whether it is new row state.

    const modalAddNewStatus = ref<boolean>(false);
    const modalHistoryStatus = ref<boolean>(false);
    const defaultVisible = ref<boolean>(false);
    const employeeIdPA120 = computed(()=> store.state.common.employeeIdPA120);
    const rowChangeStatus = ref<Boolean>(false);
    const idRowFake = ref();
    const messageSave = Message.getMessage("COMMON", "501").message;
    const messageDel = Message.getMessage("COMMON", "402").message;
    
    //-----------------get employee wage and data source --------------------------------
    
    const dataSource = ref<any[]>([]);
    const isFirstRun = ref(true);
    const trigger = ref<boolean>(true);
    const originData = ref({
      companyId: companyId,
      imputedYear: globalYear.value,
    });
    const { result, loading, onError } = useQuery(
      queries.getEmployeeWages,
      originData,
      () => ({
        enabled: trigger.value,
        fetchPolicy: "no-cache",
      })
    );
    onError((res: any) => {
      notification("error", res.message);
      dataSource.value = [];
      actionChangeComponent.value = 1;
      store.commit("common/formStateTab1PA120", initFormStateTab1);
      store.commit("common/formOriginTab1PA120", initFormStateTab1);
      store.state.common.notDatasourcePA120 = true;
    });
    watch(result, (value) => {
      const data = value.getEmployeeWages;
      dataSource.value = data.map((item: any) => ({
        ...item,
        key: item.employeeId.toString(),
      }));
      store.state.common.notDatasourcePA120 = false;
      if (compareType.value == 3) {
        addNewRow();
        return;
      }
      if (data.length > 0 && isFirstRun.value) {
        actionChangeComponent.value = 2;
        store.state.common.employeeIdPA120 = data[0].employeeId;
        focusedRowKey.value = dataSource.value[0].key;
        isFirstRun.value = false;
        idRowFake.value = data[0].employeeId;
      }
      if (data.length == 0) {
        actionChangeComponent.value = 1;
        store.commit("common/formStateTab1PA120", initFormStateTab1);
        store.commit("common/formOriginTab1PA120", initFormStateTab1);
        store.state.common.notDatasourcePA120 = true;
      }
      trigger.value = false;
    });
    // addcomponent
    const addComponentKey = ref(1);
    const modalHistory = () => {
      modalHistoryStatus.value = true;
    };

    //--------------------delete row data-------------------

    const delStatus = ref(false);
    const idDelete = ref();
    const {
      mutate: actionDelete,
      onError: errorDelete,
      onDone: successDelete,
    } = useMutation(mutations.deleteEmployeeWage);
    const statusComfirm = (res: any) => {
      actionDelete({
        companyId: companyId,
        imputedYear: globalYear.value,
        employeeId: idDelete.value,
      });
    };
    const actionDeleteFuc = (data: any) => {
      idDelete.value = data;
      delStatus.value = true;
    };
    successDelete((e) => {
      notification("success", messageDel);
      isFirstRun.value = true;
      actionChangeComponent.value = 2;
      trigger.value = true;
      delStatus.value = false;
    });
    errorDelete((e) => {
      //notification('error', e.message);
    });

    //----------------compare Data----------------

    //function common
    const delNewRow = () => {
      dataSource.value = dataSource.value.splice(
        0,
        dataSource.value.length - 1
      );
      store.commit("common/formStateTab1PA120", initFormStateTab1);
      addComponentKey.value++;
      store.state.common.isNewRowPA120 = false;
      compareType.value = 2;
    };
    const addNewRow = () => {
      actionChangeComponent.value = 1;
      addComponentKey.value++;
      store.commit("common/formStateTab1PA120", initFormStateTab1);
      store.commit("common/formOriginTab1PA120", initFormStateTab1);
      store.state.common.isNewRowPA120 = true;
      compareType.value = 1;
      setTimeout(() => {
        dataSource.value = dataSource.value.concat([
          formStateTab1PA120.value,
        ]);
        focusedRowKey.value = formStateTab1PA120.value.key;
      }, 0);
    };
    const compareType = ref(2); //2 is row click. 1 is add button click;
    const compareForm = () => {
      const { stayQualification, employeeId, ...obj1 } = formOriginTab1PA120.value;
      const {
        stayQualification: stayQualification2,
        employeeId: employeeId2,
        ...obj2
      } = formStateTab1PA120.value;

      const { ...tab2 } = formStateTab2PA120.value;
      const { ...tabEdit2 } = formOriginTab2PA120.value;
      // console.log(`output->tab2, tabEdit2`,tab2, tabEdit2)
      if (!formStateTab1PA120.value.foreigner) {
        delete obj1.nationality;
        delete obj2.nationality;
      }
      if (
        JSON.stringify(obj1) == JSON.stringify(obj2) &&
        JSON.stringify(tab2) == JSON.stringify(tabEdit2)
      ) {
        return true;
      }
      return false;
    };
    const openAddNewModal = async () => {
      compareType.value = 3;
      if (isNewRowPA120.value) {
        if (!compareForm()) {
          rowChangeStatus.value = true;
          return;
        }
        store.commit("common/formStateTab1PA120", initFormStateTab1);
        dataSource.value = dataSource.value.splice(
          0,
          dataSource.value.length - 1
        );
        dataSource.value = dataSource.value.concat([
          formStateTab1PA120.value,
        ]);
        addComponentKey.value++;
        store.state.common.notDatasourcePA120 = false;
        return;
      }
      if (!compareForm()) {
        rowChangeStatus.value = true;
        return;
      }
      formStateTab1PA120.value.stayQualification =
        initFormStateTab1.stayQualification;
      addNewRow();
      store.state.common.notDatasourcePA120 = false;
      return;
    };
    const tabCurrent = computed(() => {
      const { stayQualification, employeeId, ...obj1 } = formOriginTab1PA120.value;
      const {
        stayQualification: stayQualification2,
        employeeId: employeeId2,
        ...obj2
      } = formStateTab1PA120.value;

      if (
        JSON.stringify(obj1) != JSON.stringify(obj2) &&
        JSON.stringify(formStateTab2PA120.value) !=
        JSON.stringify(formOriginTab2PA120.value)
      ) {
        return 4;
      }
      if (
        JSON.stringify(formStateTab2PA120.value) !=
        JSON.stringify(formOriginTab2PA120.value)
      ) {
        return 2;
      }
      return 1;
    });
    const onRowChangeComfirm = async (ok: boolean) => {
      if (ok) {
        if (tabCurrent.value == 1 || tabCurrent.value == 4) {
          let ele11 = document.getElementById("btn-save") as HTMLInputElement;
          ele11?.click();
          let ele12 = document.getElementById("btn-save-edit");
          ele12?.click();
        }
        if (tabCurrent.value == 2 || tabCurrent.value == 4) {
          let ele21 = document.getElementById("btn-save-edit-tab2");
          ele21?.click();
          let ele22 = document.getElementById("btn-save-add-tab2");
          ele22?.click();
        }
      } else {
        removeHoverRowKey();
        if (isNewRowPA120.value) {
          dataSource.value = dataSource.value.splice(
            0,
            dataSource.value.length - 1
          );
        }
        if (compareType.value == 1 || compareType.value == 3) {
          addNewRow();
          return;
        }
        if (compareType.value == 2) {
          store.state.common.employeeIdPA120 = idRowFake.value;
          store.state.common.isNewRowPA120 = false;
          actionChangeComponent.value = 2;
          focusedRowKey.value = idRowFake.value.toString();
        }
        compareType.value = 2;
      }
    };
    // when submit form done
    const actionFormDonePA120 = computed(
      () => store.getters["common/actionFormDonePA120"]
    );
    watch(actionFormDonePA120, () => {
      if (compareType.value == 3) {
        trigger.value = true;
        return;
      }
      focusedRowKey.value =
        compareType.value == 1
          ? formStateTab1PA120.value.employeeId.toString()
          : idRowFake.value.toString();
      store.state.common.isNewRowPA120 = false;
      trigger.value = true;
      store.state.common.employeeIdPA120 =
        compareType.value == 1
          ? formStateTab1PA120.value.employeeId
          : idRowFake.value;
      if (compareType.value == 2) {
        actionChangeComponent.value = 2;
      }
    });
    //submit error
    const actionFormErrorPA120 = computed(
      () => store.state.common.actionFormErrorPA120
    );
    watch(actionFormErrorPA120, () => {
      compareType.value = 1;
      focusedRowKey.value = formStateTab1PA120.value?.employeeId.toString();
      removeHoverRowKey();
      if (tabCurrent.value == 1 || tabCurrent.value == 4) {
        store.commit("common/activeTabEditKeyPA120", "1");
      } else {
        store.commit("common/activeTabEditKeyPA120", "2");
      }
      if (dataSource.value[dataSource.value.length - 1].key != 0) {
        focusedRowKey.value =
          formStateTab1PA120.value?.employeeId.toString();
      }
    });
    //edit row
    const actionEdit = (data: any) => {
      compareType.value = 2;
      if (isNewRowPA120.value) {
        if (compareForm()) {
          delNewRow();
          store.state.common.employeeIdPA120 = data.data.employeeId;
          if (actionChangeComponent.value == 1) {
            actionChangeComponent.value = 2;
          }
          return;
        }
        rowChangeStatus.value = true;
        idRowFake.value = data.data.employeeId;
        return;
      }
      if (!compareForm()) {
        rowChangeStatus.value = true;
        idRowFake.value = data.data.employeeId;
        return;
      } else {
        store.state.common.employeeIdPA120 = data.data.employeeId;
        idRowFake.value = data.data.employeeId;
        if (actionChangeComponent.value == 1) {
          actionChangeComponent.value = 2;
        }
      }
    };

    watch(result, (value) => {
      if (value) {
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
    const focusedRowKey = ref(formStateTab1PA120.value.employeeId);
    const activeTabEditKeyPA120 = computed(
      () => store.state.common.activeTabEditKeyPA120
    );
    function calculateIncomeTypeCodeAndName(rowData: any) {
      return `${rowData.nationalPensionDeduction +
        rowData.healthInsuranceDeduction +
        rowData.employeementInsuranceDeduction +
        rowData.nationalPensionSupportPercent +
        rowData.employeementInsuranceSupportPercent +
        rowData.employeementReductionRatePercent +
        rowData.incomeTaxMagnification
        }`;
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
        store.state.common.isDisableInsuranceSupport =
          newVal.getWithholdingConfig.insuranceSupport;
      }
    });

    //-----------------------hover when click diff row----------------

    const gridRef = ref(); // ref of grid
    const dataGridRef = computed(() => gridRef.value?.instance as any); // ref of grid Instance
    const onFocusedRowChanging = (e: any) => {
      const rowElement = document.querySelector(
        `[aria-rowindex="${e.newRowIndex + 1}"]`
      );
      if (focusedRowKey.value == e.rows[e.newRowIndex].key) {
        e.cancel = true;
        return;
      }
      if (!compareForm()) {
        rowElement?.classList.add("dx-state-hover-custom");
        e.cancel = true;
      }
    };
    const removeHoverRowKey = () => {
      const element = document.querySelector(".dx-state-hover-custom");
      if (element) dataGridRef.value?.refresh();
    };

    // get config

    const withholdingTrigger = ref(true);
    const dataQueryCm130 = ref({
      companyId: companyId,
      imputedYear: globalYear,
    });
    const { result: resultConfigCm130 } = useQuery(
      queryCM130.getWithholdingConfig,
      dataQueryCm130,
      () => ({
        enabled: withholdingTrigger.value,
        fetchPolicy: "no-cache",
      })
    );
    watch(resultConfigCm130, (newVal) => {
      if (newVal) {
        store.state.common.isDisableInsuranceSupport =
          newVal.getWithholdingConfig.insuranceSupport;
        withholdingTrigger.value = false;
      }
    });

    const redirectTab = () => {
      if (formStateTab1PA120.value.employeeId) {
        // store.state.common.employeeIdPA120 = formStateTab1PA120.value.employeeId;
        // actionChangeComponent.value = 2;
      }
    };
    return {
      loading,
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
      move_column,
      colomn_resize,
      addComponentKey,
      toolTopErorr,
      isResidentIdError,
      focusedRowKey,
      activeTabEditKeyPA120,
      defaultVisible,
      formStateTab1PA120,
      isNewRowPA120,
      initFormStateTab1,
      rowChangeStatus,
      onRowChangeComfirm,
      compareType,
      messageSave,
      messageDel,
      gridRef,
      formOriginTab1PA120,
      compareForm,
      calculateIncomeTypeCodeAndName,
      onFocusedRowChanging,
      redirectTab,
      employeeIdPA120,
    };
  },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
