<template>
  <action-header
    title="기타소득자등록"
    :buttonDelete="false"
    :buttonSave="false"
    :buttonSearch="false"
    :buttonPrint="false"
  />
  <div id="pa-120" class="page-content">
    <a-row style="flex-flow: row nowrap" class="row-first">
      <a-col :span="11" style="max-width: 45.34%" class="col-left">
        <a-spin :spinning="loading" size="large">
          <DxDataGrid
            id="pa-120-gridContainer"
            :show-row-lines="true"
            :hoverStateEnabled="true"
            :data-source="dataSource"
            :show-borders="true"
            key-expr="key"
            :allow-column-reordering="move_column"
            :allow-column-resizing="colomn_resize"
            :column-auto-width="true"
            :onRowClick="onClickRow"
            :focused-row-enabled="true"
            :auto-navigate-to-focused-row="true"
            v-model:focused-row-key="focusedRowKey"
            ref="gridRef"
            @focused-row-changing="onFocusedRowChanging"
            noDataText="내역이 없습니다"
          >
            <DxPaging :page-size="0" />
            <DxSearchPanel
              :visible="true"
              :highlight-case-sensitive="true"
              :search-visible-columns="['TypeCodeAndName']"
              placeholder="검색"
            />
            <DxExport :enabled="true" />
            <DxScrolling mode="standard" show-scrollbar="always" />
            <DxToolbar>
              <DxItem template="total-user" location="before" />
              <DxItem name="searchPanel" />
              <DxItem name="exportButton" css-class="cell-button-export" />
              <DxItem
                location="after"
                template="button-history"
                css-class="cell-button-add"
              />
              <DxItem
                location="after"
                template="button-template"
                css-class="cell-button-add"
              />
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
                <HistoryOutlined
                  style="font-size: 18px"
                  @click="modalHistory"
                />
              </DxButton>
            </template>
            <DxColumn
              caption="성명"
              width="180"
              cell-template="company-name"
              data-field="name"
            />
            <template #company-name="{ data }: any">
              <employee-info
                :idEmployee="data.data.employeeId"
                :name="data.data.name"
                :idCardNumber="data.data.residentId"
                :status="data.data.status"
                :foreigner="data.data.foreigner"
                :checkStatus="false"
                :employeeId="data.data.employeeId"
              />
            </template>
            <DxColumn
              caption="주민등록번호"
              cell-template="residentId"
              width="110"
              data-field="residentId"
            />
            <template #residentId="{ data }: any">
              <resident-id :residentId="data.data.residentId"></resident-id>
            </template>
            <DxColumn
              caption="비고"
              cell-template="grade-cell"
              data-field="incomeTaxMagnification"
              :calculateCellValue="calculateIncomeTypeCodeAndName"
            />
            <template #grade-cell="{ data }: any">
              <div>
                <four-major-insurance
                  v-if="data.data.nationalPensionDeduction"
                  :typeTag="1"
                  :typeValue="1"
                />
                <four-major-insurance
                  v-if="data.data.healthInsuranceDeduction"
                  :typeTag="2"
                  :typeValue="1"
                />
                <four-major-insurance
                  v-if="data.data.employeementInsuranceDeduction"
                  :typeTag="4"
                  :typeValue="1"
                />
                <four-major-insurance
                  v-if="data.data.nationalPensionSupportPercent"
                  :typeTag="6"
                  :ratio="data.data.nationalPensionSupportPercent"
                />
                <four-major-insurance
                  v-if="data.data.employeementInsuranceSupportPercent"
                  :typeTag="7"
                  :ratio="data.data.employeementInsuranceSupportPercent"
                />
                <four-major-insurance
                  v-if="data.data.employeementReductionRatePercent"
                  :typeTag="8"
                  :ratio="data.data.employeementReductionRatePercent"
                />
                <four-major-insurance
                  v-if="data.data.incomeTaxMagnification"
                  :typeTag="10"
                  :ratio="data.data.incomeTaxMagnification"
                />
              </div>
            </template>
            <DxColumn cell-template="action" width="48" />
            <template #action="{ data }: any">
              <DxButton
                type="ghost"
                style="cursor: pointer"
                @click="actionDeleteFuc(data.data.employeeId)"
                v-if="data.data.deletable"
              >
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
      <a-col :span="13" class="col-right">
        <PA120PopupAddNewVue v-if="tabType == 1" :key="addComponentKey" />
        <PA120PopupEdit v-if="tabType == 2" />
      </a-col>
    </a-row>
    <a-modal
      :visible="delStatus"
      @cancel="delStatus = false"
      :mask-closable="false"
      class="confirm-md"
      footer=""
      :width="500"
    >
      <standard-form action="" name="delete-510">
        <div class="custom-modal-delete">
          <img
            src="@/assets/images/icon_delete.png"
            alt=""
            style="width: 30px"
          />
          <span>{{ contentDelete }}</span>
        </div>
        <div class="text-align-center mt-30">
          <button-basic
            class="button-form-modal"
            :text="'아니요'"
            :type="'default'"
            :mode="'outlined'"
            @onClick="delStatus = false"
          />
          <button-basic
            class="button-form-modal"
            :text="'네. 삭제합니다'"
            :width="140"
            :type="'default'"
            :mode="'contained'"
            @onClick="statusComfirm"
          />
        </div>
      </standard-form>
    </a-modal>
    <history-popup
      :modalStatus="modalHistoryStatus"
      @closePopup="modalHistoryStatus = false"
      title="변경이력"
      :idRowEdit="employeeIdPA120"
      typeHistory="pa-120"
    />
    <PopupMessage
      :modalStatus="rowChangeStatus"
      @closePopup="rowChangeStatus = false"
      :typeModal="'confirm'"
      :title="messageSave"
      :content="''"
      :keyAccept="'1234'"
      :okText="'네'"
      cancelText="아니요"
      @checkConfirm="onRowChangeComfirm"
    />
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
    const tabType = ref(2); // 1 is add, 2 is edit.
    const totalUserOnl = ref(0);
    const totalUserOff = ref(0);
    const globalYear = ref<number>(
      parseInt(sessionStorage.getItem("paYear") ?? "0")
    );
    const messageSave = Message.getMessage("COMMON", "501").message;
    const messageDel = Message.getMessage("COMMON", "402").message;
    // get data common
    const configdeductionParam = ref({
      companyId: companyId,
      imputedYear: globalYear,
      useOnly: true,
    });
    store.dispatch("common/deductionItemsPA120", configdeductionParam.value);
    store.dispatch("common/payItemsPA120", configdeductionParam.value);

    // form data tab 1
    const formStateTab1PA120 = computed(
      () => store.state.common.formStateTab1PA120
    );
    // form data tab 1 to compare
    const formOriginTab1PA120 = computed(
      () => store.state.common.formOriginTab1PA120
    );
    // form data tab 2
    const formStateTab2PA120 = computed(
      () => store.state.common.formStateTab2PA120
    );
    // form data tab 2 to compare
    const formOriginTab2PA120 = computed(
      () => store.state.common.formOriginTab2PA120
    );
    // check whether it is new row state.
    const isNewRowPA120 = computed(() => store.state.common.isNewRowPA120);
    // id to call api in all components
    const employeeIdPA120 = computed(() => store.state.common.employeeIdPA120);
    // id fake of row. used when data row changes but don't submit;
    const idRowFake = ref();
    // boolean check: Has Tab 1 been created successfully?
    const createSucessTab1PA120 = computed(
      () => store.state.common.createSucessTab1PA120
    );
    //2 is row click. 1 is add button click. 3 is add button click and save by itself. ;
    const compareType = ref(2);
    const focusedRowKey = ref(formStateTab1PA120.value.employeeId);

    //-----------------get employee wages and data source --------------------------------

    const dataSource = ref<any[]>([]);
    const isFirstRun = ref(true);
    const employeeWagesTrigger = ref<boolean>(true);
    const employeeWagesParam = ref({
      companyId: companyId,
      imputedYear: globalYear.value,
    });
    const { result, loading, onError } = useQuery(
      queries.getEmployeeWages,
      employeeWagesParam,
      () => ({
        enabled: employeeWagesTrigger.value,
        fetchPolicy: "no-cache",
      })
    );
    onError((res: any) => {
      notification("error", res.message);
    });
    watch(result, (value) => {
      const data = value.getEmployeeWages;
      // count user
      totalUserOnl.value = 0;
      totalUserOff.value = 0;
      dataSource.value = data.map((item: any) => {
        if (item.status != 0) {
          totalUserOnl.value++;
        } else {
          totalUserOff.value++;
        }
        return {
          ...item,
          key: item.employeeId.toString(),
        };
      });
      store.state.common.notDatasourcePA120 = false;
      if (compareType.value == 3) {
        addNewRow();
        return;
      }
      if (data.length > 0 && isFirstRun.value) {
        tabType.value = 2;
        store.state.common.employeeIdPA120 = data[0].employeeId;
        focusedRowKey.value = dataSource.value[0].key;
        isFirstRun.value = false;
        idRowFake.value = data[0].employeeId;
      }
      if (data.length == 0) {
        tabType.value = 1;
        store.commit("common/formStateTab1PA120", initFormStateTab1);
        store.commit("common/formOriginTab1PA120", initFormStateTab1);
        store.state.common.notDatasourcePA120 = true;
      }
      employeeWagesTrigger.value = false;
    });

    // -------------------OPEN HISTORY -------------------

    const modalHistoryStatus = ref<boolean>(false);
    const modalHistory = () => {
      modalHistoryStatus.value = true;
    };

    //--------------------delete row data-------------------

    const delStatus = ref(false);
    const idDelete = ref();
    const {
      mutate: mutateDelete,
      onError: errorDelete,
      onDone: successDelete,
    } = useMutation(mutations.deleteEmployeeWage);
    const statusComfirm = (res: any) => {
      mutateDelete({
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
      tabType.value = 2;
      employeeWagesTrigger.value = true;
      delStatus.value = false;
    });
    errorDelete((e) => {
      //notification('error', e.message);
    });

    //----------------compare Data----------------

    // tab1's key to reset form validatation.
    const addComponentKey = ref(1);
    const rowChangeStatus = ref<Boolean>(false); // Change in row permission status
    // xóa row mới tạo
    const delNewRow = () => {
      dataSource.value = dataSource.value.splice(
        0,
        dataSource.value.length - 1
      );
      store.commit("common/formStateTab1PA120", initFormStateTab1);
      store.state.common.isNewRowPA120 = false;
    };
    // thêm row mới
    const addNewRow = () => {
      store.commit("common/formStateTab1PA120", initFormStateTab1);
      store.commit("common/formOriginTab1PA120", initFormStateTab1);
      tabType.value = 1;
      store.state.common.isNewRowPA120 = true;
      compareType.value = 1;
      addComponentKey.value++;
      // setTimeout(()=>{
      dataSource.value = dataSource.value.concat([formStateTab1PA120.value]);
      focusedRowKey.value = formStateTab1PA120.value.key;
      // },0)
    };
    const compareForm = () => {
      const { stayQualification, employeeId, ...obj1 } =
        formOriginTab1PA120.value;
      const {
        stayQualification: stayQualification2,
        employeeId: employeeId2,
        ...obj2
      } = formStateTab1PA120.value;

      const { ...tab2 } = formStateTab2PA120.value;
      const { ...tabEdit2 } = formOriginTab2PA120.value;
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
    // click add button in the top of the table
    const openAddNewModal = async () => {
      compareType.value = 3;
      if (isNewRowPA120.value) {
        if (!compareForm()) {
          rowChangeStatus.value = true;
          return;
        }
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
    const notSaveType = computed(() => {
      const { stayQualification, employeeId, ...obj1 } =
        formOriginTab1PA120.value;
      const {
        stayQualification: stayQualification2,
        employeeId: employeeId2,
        ...obj2
      } = formStateTab1PA120.value;
      // Both tab 1 and tab 2 is different.
      if (
        JSON.stringify(obj1) != JSON.stringify(obj2) &&
        JSON.stringify(formStateTab2PA120.value) !=
          JSON.stringify(formOriginTab2PA120.value)
      ) {
        return 4;
      }
      // only tab 2 is different.
      if (
        JSON.stringify(formStateTab2PA120.value) !=
        JSON.stringify(formOriginTab2PA120.value)
      ) {
        return 2;
      }
      // only tab 2 is different.
      return 1;
    });
    // Thực hiện chờ đợi việc api call xong khi notSaveType == 4.
    async function waitForApiCall() {
      return new Promise((resolve: any) => {
        const unwatch = watch(actionFormDonePA120, () => {
          unwatch();
          resolve();
        });
      });
    }
    // allow API of dataSource to be called? when notSaveType == 4.
    const hasCallGetAllApi = ref(true);
    // handle when it has confirm result.
    const onRowChangeComfirm = async (ok: boolean) => {
      if (ok) {
        if (notSaveType.value == 2 || notSaveType.value == 4) {
          let ele21 = document.getElementById("btn-save-edit-tab2");
          ele21?.click();
        }
        if (notSaveType.value == 4) {
          hasCallGetAllApi.value = false;
          await waitForApiCall();
        }
        hasCallGetAllApi.value = true;
        if (notSaveType.value == 1 || notSaveType.value == 4) {
          let ele11 = document.getElementById("btn-save") as HTMLInputElement;
          ele11?.click();
          let ele12 = document.getElementById("btn-save-edit");
          ele12?.click();
        }
      } else {
        removeHoverRowKey();
        // remove new row at bottom of the table
        if (isNewRowPA120.value) {
          dataSource.value = dataSource.value.splice(
            0,
            dataSource.value.length - 1
          );
        }
        // add new row
        if (compareType.value == 1 || compareType.value == 3) {
          addNewRow();
          return;
        }
        // access selected row in the table.
        if (compareType.value == 2) {
          store.state.common.employeeIdPA120 = idRowFake.value;
          store.state.common.isNewRowPA120 = false;
          tabType.value = 2;
          focusedRowKey.value = idRowFake.value.toString();
        }
        compareType.value = 2;
      }
    };

    // ------------------when submit form done-----------------------

    const actionFormDonePA120 = computed(
      () => store.getters["common/actionFormDonePA120"]
    );
    watch(actionFormDonePA120, () => {
      // switch to edit tab
      if (createSucessTab1PA120.value) {
        tabType.value = 2;
      }
      if (!hasCallGetAllApi.value) {
        return;
      }
      if (compareType.value == 3) {
        employeeWagesTrigger.value = true;
        return;
      }
      // redirect to new selected row or current row.
      focusedRowKey.value =
        compareType.value == 1
          ? formStateTab1PA120.value.employeeId.toString()
          : idRowFake.value.toString();
      store.state.common.isNewRowPA120 = false;
      employeeWagesTrigger.value = true;
      store.state.common.employeeIdPA120 =
        compareType.value == 1
          ? formStateTab1PA120.value.employeeId
          : idRowFake.value;
      if (compareType.value == 2) {
        tabType.value = 2;
      }
    });

    // ------------------when submit form error-----------------------

    const actionFormErrorPA120 = computed(
      () => store.state.common.actionFormErrorPA120
    );
    watch(actionFormErrorPA120, () => {
      compareType.value = 1;
      focusedRowKey.value = formStateTab1PA120.value?.employeeId.toString();
      // check what tab is valid and redirect to it.
      if (notSaveType.value == 1 || notSaveType.value == 4) {
        store.commit("common/activeTabEditKeyPA120", "1");
      } else {
        store.commit("common/activeTabEditKeyPA120", "2");
      }
      if (dataSource.value[dataSource.value.length - 1].key != 0) {
        focusedRowKey.value = formStateTab1PA120.value?.employeeId.toString();
      }
    });

    //---------------------click row in the table---------------------

    const onClickRow = (data: any) => {
      compareType.value = 2;
      if (isNewRowPA120.value) {
        if (compareForm()) {
          delNewRow();
          if (tabType.value == 1) {
            tabType.value = 2;
          }
          store.state.common.employeeIdPA120 = data.data.employeeId;
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
        if (tabType.value == 1) {
          tabType.value = 2;
        }
      }
    };

    // ----------------custom column to search------------------------

    function calculateIncomeTypeCodeAndName(rowData: any) {
      return `${
        rowData.nationalPensionDeduction +
        rowData.healthInsuranceDeduction +
        rowData.employeementInsuranceDeduction +
        rowData.nationalPensionSupportPercent +
        rowData.employeementInsuranceSupportPercent +
        rowData.employeementReductionRatePercent +
        rowData.incomeTaxMagnification
      }`;
    }

    //-----------------------hover when click diff row----------------

    const gridRef = ref(); // ref of grid
    const dataGridRef = computed(() => gridRef.value?.instance as any); // ref of grid Instance
    const onFocusedRowChanging = (e: any) => {
      // const rowElement = document.querySelector(
      //   `[aria-rowindex="${e.newRowIndex + 1}"]`
      // );
      var rowElement = e.rowElement;
      if (focusedRowKey.value == e.rows[e.newRowIndex].key) {
        e.cancel = true;
        return;
      }
      if (!compareForm()) {
        rowElement?.addClass("dx-state-hover-custom");
        e.cancel = true;
      }
    };
    const removeHoverRowKey = () => {
      const element = document.querySelector(".dx-state-hover-custom");
      if (element) dataGridRef.value?.refresh();
    };

    // get config common in cm-130 to set default values.

    const dataQueryCm130 = ref({
      companyId: companyId,
      imputedYear: globalYear,
    });
    const { result: resultConfigCm130 } = useQuery(
      queryCM130.getWithholdingConfig,
      dataQueryCm130,
      () => ({
        fetchPolicy: "no-cache",
      })
    );
    watch(resultConfigCm130, (newVal) => {
      if (newVal) {
        store.state.common.isDisableInsuranceSupport =
          newVal.getWithholdingConfig.insuranceSupport;
      }
    });

    return {
      loading,
      tabType,
      delStatus,
      dataSource,
      onClickRow,
      mutateDelete,
      actionDeleteFuc,
      modalHistory,
      contentDelete,
      totalUserOnl,
      totalUserOff,
      modalHistoryStatus,
      openAddNewModal,
      statusComfirm,
      move_column,
      colomn_resize,
      addComponentKey,
      focusedRowKey,
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
      employeeIdPA120,
    };
  },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
