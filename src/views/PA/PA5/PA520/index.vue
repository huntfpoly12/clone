<template>
  <action-header title="일용직사원등록" @actionSave="actionSave" :buttonSave="actionChangeComponent != 2"/>
  <!-- <a-row>
        <a-col :span="6" >
          checkChangeValueEditTab1PA520 : {{ store.state.common.checkChangeValueEditTab1PA520 }}<br>
          checkChangeValueEditTab2PA520: {{ store.state.common.checkChangeValueEditTab2PA520 }}<br>
          checkChangeValueAddPA520: {{ store.state.common.checkChangeValueAddPA520 }}<br>
        </a-col>
        <a-col :span="6" >
          activeAddRowPA520: {{ store.state.common.activeAddRowPA520 }}<br>
          idRowChangePa520: {{ store.state.common.idRowChangePa520 }}<br>
          trigger: {{ trigger}}<br>
          
        </a-col>
        <a-col :span="6">
          actionChangeComponent: {{ actionChangeComponent }}<br>
          addRowBtOnclick: {{ addRowBtOnclick  }}<br>
          countBtOnclick: {{ countBtOnclick  }}<br>
         
        </a-col>
        <a-col :span="6">
          modalChangeValueEdit : {{  modalChangeValueEdit }}  <br>
          focusedRowKey :  {{ focusedRowKey }}<br>
          idRowSaveDone :  {{ idRowSaveDone }}<br>
          idRowEdit : {{ idRowEdit }}<br>
          idRowCurrentClick: {{ idRowCurrentClick }}
        </a-col>
  </a-row> -->

  <div id="pa-520" class="page-content">
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
      <a-row>
          <a-col :span="13" class="custom-layout">
              <a-spin :spinning="loading" size="large">
                <div class="grid-table">
                  <DxDataGrid 
                  :show-row-lines="true" 
                  :hoverStateEnabled="true" 
                  :data-source="dataSource" 
                  :focusedRowIndex="0"
                  :show-borders="true"  
                  :allow-column-reordering="move_column"
                  :focused-row-enabled="true"
                  :allow-column-resizing="colomn_resize" 
                 
                  v-model:focused-row-key="focusedRowKey" 
                  @exporting="onExporting" 
                  id="gridContainer" 
                  ref="pa520Grid"
                  @focused-row-changing="onFocusedRowChanging"
                  @focused-row-changed="onFocusedRowChanged"
                  >
                      <DxScrolling mode="standard" show-scrollbar="always"/>
                      <DxSearchPanel :visible="true" />
                      <DxExport :enabled="true"/>
                      <DxPaging :enabled="false" />
                      <DxToolbar>
                          <DxItem name="searchPanel" />
                          <DxItem location="after" name="exportButton" css-class="cell-button-export"/>
                          <DxItem location="after" template="button-history" css-class="cell-button-add" />
                          <DxItem location="after" template="button-template" css-class="cell-button-add" />
                          
                      </DxToolbar>
                      <template #button-template>
                        <a-tooltip placement="top" class="custom-tooltip">
                            <template #title>
                              신규
                            </template>
                            <div style="text-align: center;" >
                              <DxButton icon="plus" @click="onAddBtClick" />
                            </div>
                        </a-tooltip>
                      </template>
                      <template #button-history>
                          <DxButton>
                              <HistoryOutlined @click="modalHistory" class="fz-18" />
                          </DxButton>
                      </template>
                      <DxColumn caption="성명" cell-template="company-name" width="250" />
                      <template #company-name="{ data }">
                          <employee-info :idEmployee="data.data.employeeId" :name="data.data.name"
                              :idCardNumber="data.data.residentId" :status="data.data.status"
                              :foreigner="data.data.foreigner" :checkStatus="false"
                              v-if="store.state.common.activeAddRowPA520 == false" />
                          <employee-info v-else :idEmployee="data.data.employeeId" :name="data.data.name"
                              :status="data.data.status" :foreigner="data.data.foreigner" :checkStatus="false"
                               />
                      </template>
                      <DxColumn caption="주민등록번호" cell-template="residentId" width="150"  css-class="cell-center" />
                      <template #residentId="{ data }" >
                        <resident-id :residentId="data.data.residentId"></resident-id>
                      </template>

                      <DxColumn caption="비고" cell-template="grade-cell" />
                      <template #grade-cell="{ data }">
                          <div class="custom-grade-cell">
                              <four-major-insurance v-if="data.data.healthInsuranceDeduction == true" :typeTag="2"
                                  :typeValue="1" />
                              <four-major-insurance v-if="data.data.employeementInsuranceDeduction == true"
                                  :typeTag="4" :typeValue="1" />
                              <four-major-insurance v-if="data.data.nationalPensionSupportPercent" :typeTag="6"
                                  :typeValue="1" :ratio="data.data.nationalPensionSupportPercent" />
                              <four-major-insurance v-if="data.data.employeementInsuranceSupportPercent" :typeTag="7"
                                  :typeValue="1" :ratio="data.data.employeementInsuranceSupportPercent" />
                          </div>
                      </template>
                      <DxColumn cell-template="pupop" width="50" />
                      <template #pupop="{ data }">
                          <div v-if="data.data.deletable" class="custom-action text-center">
                              <DeleteOutlined @click="onDeleteRow(data.data.employeeId)" />
                          </div>
                      </template>
                  </DxDataGrid>
                </div>
              </a-spin>
          </a-col>
          <a-col :span="11" class="custom-layout" style="padding-right: 0px;">
              <PA520PopupAddNew :modalStatus="isAddNewStatus" @closePopup="closeAction"
                  v-if="actionChangeComponent == 1" :key="resetAddComponent" />
              <PA520PopupEdit :idRowEdit="idRowEdit" @closePopup="closeAction" v-if="actionChangeComponent == 2" />
          </a-col>
      </a-row>
  </div>
  <PopupMessage :modalStatus="modalComfirmDelete" @closePopup="modalComfirmDelete = false" typeModal="confirm"
      :content="contentDelete" okText="네. 삭제합니다" cancelText="아니요(modalComfirmDelete)" @checkConfirm="onConfirmDelete" />
  <history-popup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" title="변경이력"
      :idRowEdit="idRowEdit" typeHistory="pa-520" />
  <!-- confirm for case edit   -->
  <PopupMessage :modalStatus="modalChangeValueEdit" @closePopup="modalChangeValueEdit = false" typeModal="confirm"
      :content="Message.getCommonMessage('501').message" okText="네" cancelText="아니오(modalChangeValueEdit)" @checkConfirm="comfirmAndSaveEdit" />
  <!-- confirm for case add -->
  <PopupMessage :modalStatus="modalChangeValueAdd" @closePopup="modalChangeValueAdd = false" typeModal="confirm"
      :content="Message.getCommonMessage('501').message" okText="네" cancelText="아니오(modalChangeValueAdd)" @checkConfirm="confirmAndSaveAdd" />
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, onMounted, reactive, watchEffect } from "vue";
import DxButton from "devextreme-vue/button";
import { useStore } from "vuex";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { companyId, onExportingCommon } from "@/helpers/commonFunction";
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxSearchPanel,
  DxToolbar,
  DxEditing,
  DxGrouping,
  DxScrolling,
  DxItem,
  DxTotalItem,
  DxExport,
} from "devextreme-vue/data-grid";
import {
  EditOutlined,
  HistoryOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
  PrinterOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons-vue";
import notification from "@/utils/notification";
import queries from "@/graphql/queries/PA/PA5/PA520/index";
import PA520PopupAddNew from "./components/PA520PopupAddNew.vue";
import PA520PopupEdit from "./components/PA520PopupEdit.vue";
import mutations from "@/graphql/mutations/PA/PA5/PA520/index";
import {  DataCreatedTable,  } from "./utils/index";
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";
import { Message } from "@/configs/enum";
import DataSource from "devextreme/data/data_source";

export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSearchPanel,
    DxScrolling,
    DxToolbar,
    DxEditing,
    DxGrouping,
    DxItem,
    DxButton,
    DxTotalItem,
    EditOutlined,
    HistoryOutlined,
    SearchOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MailOutlined,
    PrinterOutlined,
    DeleteOutlined,
    SaveOutlined,
    DxExport,
    PA520PopupAddNew,
    PA520PopupEdit,
  },
  setup() {
    const pa520Grid = ref<any>(null);
    const focusedRowKey =  ref<any>(null);
    const modalChangeValueEdit = ref(false);
    const actionChangeComponent = ref(1);
    const contentDelete = Message.getMessage("PA120", "002").message;
    const modalComfirmDelete = ref(false);
    const dataSource = ref<any>(new DataSource({
          store: {
              type: "array",
              key: 'employeeId',
              data: [],
          }
    }));
    const store = useStore();
    const totalUserOnl = ref(0);
    const totalUserOff = ref(0);
    const idRowCurrentClick = ref(0);
    const oldGlobalYear = ref(0)
    const globalYear = computed(() => store.state.settings.globalYear);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const idRowSaveDone = computed(() => store.state.common.rowIdSaveDonePa520);
    const addRowBtOnclick = computed(() => store.state.common.addRowBtOnclick);// determine when clcik add new button
    const countBtOnclick = computed(() => store.state.common.countBtOnclick);// count the number of times the add button clicks
   
    const originData = ref({
      companyId: companyId,
      imputedYear: globalYear.value,
    });
    const idAction = ref();
    const trigger = ref<boolean>(true);
    const isAddNewStatus = ref<boolean>(false);
    const modalHistoryStatus = ref<boolean>(false);
    const modalDeleteStatus = ref<boolean>(false);
    const modalChangeValueAdd = ref<boolean>(false);
    const idRowEdit = ref();
    let isClickRow = false; // determine when action click row
    const isDelete = ref<boolean>(false); // determine when action click icon delete
    const resetAddComponent = ref<number>(1);
    const isChangeYear = ref<boolean>(false);
    // use to catch case click add button and change something after that click add button  again
    // to check is click button add row or not
   
    // ======================= GRAPQL ================================
    const {
      refetch: refetchData,
      result,
      loading,
    } = useQuery(queries.getEmployeeWageDailies, originData, () => ({
      enabled: trigger.value,
      fetchPolicy: "no-cache",
    }));

    const {
      mutate: actionDelete,
      onError: errorDelete,
      onDone: successDelete,
    } = useMutation(mutations.deleteEmployeeWageDaily);
    errorDelete((e) => {
      notification("error", e.message);
    });
    successDelete((e) => {
      notification("success", `업데이트 완료!`);
      trigger.value = true;
      refetchData();
    });
    // ======================= WATCH ==================================
    //check if the year is changed, then confirm first if you are adding or editing data
    watch(() => globalYear.value, (newYear, oldYear) => {
      isChangeYear.value = true
      oldGlobalYear.value = oldYear
      if (
        !store.state.common.checkChangeValueEditTab1PA520 &&
        !store.state.common.checkChangeValueEditTab2PA520 &&
        !store.state.common.checkChangeValueAddPA520 
      )
      {
        
        trigger.value = true;
        originData.value.imputedYear = newYear;
        refetchData();
        resetAllCheckerStatus()
      }
     
      if (
        store.state.common.checkChangeValueEditTab1PA520 == true ||
        store.state.common.checkChangeValueEditTab2PA520 == true
      ) {
        modalChangeValueEdit.value = true;
        return;
      }
      
      if (store.state.common.checkChangeValueAddPA520 == true) {
        modalChangeValueAdd.value = true;
        return;
      } 

    })

    watch(result,() => {
      if (result && result.value) {
        const data = result.value.getEmployeeWageDailies.map((i: any) => ({
          ...i,
          key: i.employeeId
        })) ;
        dataSource.value = new DataSource({
          store: {
              type: "array",
              key: 'key',
              data: result.value ? data : [],
          }
        })

        // Total number of employees who have quit
        totalUserOnl.value = result.value.getEmployeeWageDailies.filter(
          (val: any) => val.status != 0
        ).length;
        totalUserOff.value = result.value.getEmployeeWageDailies.filter(
          (val: any) => val.status == 0
        ).length;

        // this is case after save done
        if (store.state.common.rowIdSaveDonePa520 != 0) {
          // Get index row change
          let idRowNextForcus = isClickRow ? idRowCurrentClick.value : idRowSaveDone.value;
          idRowEdit.value = parseInt(idRowNextForcus);
          focusedRowKey.value = parseInt(idRowNextForcus);
          store.state.common.countBtOnclick = 0;

          isClickRow = false;
          isDelete.value = false;
          store.state.common.rowIdSaveDonePa520 = 0
        }

        // for the case of changing the year and having to focus on the first row
        if (isChangeYear.value) {
          isChangeYear.value = false
          dataSource.value.load()
          let items = dataSource.value.items()
          if (items.length > 0) { // If there is data, focus on the first row
            idRowEdit.value = dataSource.value.items()[0].employeeId;
            focusedRowKey.value = dataSource.value.items()[0].employeeId;
          } else {// If there is no data, add an input box
            onAddBtClick()
          }
        }
        trigger.value = false;
      }
    });

    watch(()=>store.state.common.dataSourcePA520,(newVal)=>{
      dataSource.value.store().update(0,newVal).then(() => dataSource.value.reload());
    },{ deep: true })



    watch(
      () => isAddNewStatus.value,
      (value) => {
        if (value == false) {
          trigger.value = true;
          refetchData();
        }
      }
    );

    watch(
      () => store.state.common.rowIdSaveDonePa520,
      (value) => {
        trigger.value = true;
        refetchData();
      },
      { deep: true }
    );
    // ======================= FUNCTION ================================

    const resetAllCheckerStatus = () => {
      store.state.common.checkChangeValueEditTab1PA520 = false
      store.state.common.checkChangeValueEditTab2PA520 = false
      store.state.common.checkChangeValueAddPA520 = false
      store.state.common.activeAddRowPA520 = false
      store.state.common.addRowBtOnclick = false
      store.state.common.countBtOnclick  = 0
    }
    const onExporting = (e: { component: any; cancel: boolean }) => {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Employees");

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

    const funcAddNewRow = async () => {
      store.state.common.activeAddRowPA520 = true;
      dataSource.value.store().remove(0).then(() => {
        dataSource.value.store().insert(DataCreatedTable).then(() => dataSource.value.reload());
      })
      focusedRowKey.value = 0
      resetAddComponent.value++;
      actionChangeComponent.value = 1;
    }
    // Opening a modal window.
    const onAddBtClick = () => {
      store.state.common.addRowBtOnclick = true;
      store.state.common.countBtOnclick++;
      if (
        store.state.common.checkChangeValueEditTab1PA520 == true || 
        store.state.common.checkChangeValueEditTab2PA520 == true 
      ) {
        modalChangeValueEdit.value = true;
        return;
      }
      // // Adding a new row to the table.
      if (store.state.common.activeAddRowPA520 == false) {
      
        funcAddNewRow();     
        actionChangeComponent.value = 1;
        isAddNewStatus.value = true;
      }
      if (
        store.state.common.activeAddRowPA520 &&
        store.state.common.checkChangeValueAddPA520
      ) {
        modalChangeValueAdd.value = true;
      }
    };

    // The above code is a function that is called when the user clicks on the edit button.
    const onFocusedRowChanging = (event: any)=>{
      let newRowIndex = event.newRowIndex
      idRowCurrentClick.value = event.rows[newRowIndex].data.employeeId
      // for case Edit  but click other row
      if (
        store.state.common.checkChangeValueEditTab1PA520 == true ||
        store.state.common.checkChangeValueEditTab2PA520 == true
      ) {
        modalChangeValueEdit.value = true;
        event.cancel = true
      }
      // for case Add  but click other row
      if (store.state.common.checkChangeValueAddPA520 == true) {
        store.state.common.addRowBtOnclick = false
        modalChangeValueAdd.value = true;
        event.cancel = true
      } 
    }
    const onFocusedRowChanged = (event : any)=>{
      if(store.state.common.activeAddRowPA520 && store.state.common.addRowBtOnclick){
        actionChangeComponent.value = 1;
      }else{
        actionChangeComponent.value = 2;
        store.state.common.idRowChangePa520 = focusedRowKey.value;
        idRowEdit.value = event.row.data.employeeId;
      }
    }

    const modalHistory = () => {
      modalHistoryStatus.value = companyId;
    };
    const onDeleteRow = (data: any) => {
      isDelete.value = true;
      idAction.value = data;
      modalComfirmDelete.value = true;
    };
    // A function that is called when the user clicks on the delete button.
    const onConfirmDelete = (res: any) => {
      if (res == true)
        actionDelete({
          companyId: companyId,
          imputedYear: globalYear.value,
          employeeId: idAction.value,
        });
    };
    const closeAction = () => {
      trigger.value = true;
      refetchData();
    };
    const actionSave = () => {
      store.state.common.actionSaveAddPA520++;
    };

    const actionUpdate = (currentTab: number) => {
      if (currentTab == 1) {
        store.state.common.actionUpdateTab1PA520++;
      } else {
        store.state.common.actionUpdateTab2PA520++;
      }
    };

    // A function that is called when the user clicks on the save button.
    const comfirmAndSaveEdit = (res: any) => {
      if (res == true) {
          store.state.common.checkChangeValueEditTab1PA520
          ? actionUpdate(1)
          : actionUpdate(2);
        // In case you are editing and then click on another and agree to save the information,
        if (addRowBtOnclick.value) {
          funcAddNewRow();
          store.state.common.checkChangeValueEditTab2PA520 = false;
        } else {
          isClickRow = true
        }
      } else {
        if (addRowBtOnclick.value) {
          funcAddNewRow();
        } else {
          focusedRowKey.value = idRowCurrentClick.value;
          idRowEdit.value = idRowCurrentClick.value;
          // for case edit tab2 and click other row
          store.state.common.idRowChangePa520 = idRowCurrentClick.value
          store.state.common.checkChangeValueEditTab2PA520 = false;
        }
      }
      store.state.common.checkChangeValueEditTab1PA520 = false;
    };
    const confirmAndSaveAdd = (res: any) => {
   
      if (res == true && addRowBtOnclick.value) {
        actionSave();
      }else if (res == true &&  !addRowBtOnclick.value) {
        actionSave();
        idRowEdit.value = idRowCurrentClick.value;
        focusedRowKey.value = idRowCurrentClick.value;
        store.state.common.countBtOnclick = 0
        //Not save
        store.state.common.activeAddRowPA520 = false;
        store.state.common.checkChangeValueAddPA520 = false;

      } else if (!res && addRowBtOnclick.value) {
        store.state.common.countBtOnclick = 0
        // Change status switch in store
        store.state.common.activeAddRowPA520 = false;
        store.state.common.checkChangeValueAddPA520 = false;
        // Setting the value of the addRowOnclick variable to false.
        store.state.common.addRowBtOnclick = false;
        resetAddComponent.value++; // increment one unit to reset the newly created form
        onAddBtClick();

      } else {
        idRowEdit.value = idRowCurrentClick.value;
        focusedRowKey.value = idRowCurrentClick.value;
        store.state.common.countBtOnclick = 0
        //Not save
        store.state.common.activeAddRowPA520 = false;
        store.state.common.checkChangeValueAddPA520 = false;
        // Get index row change
      }
    };

    return {
      pa520Grid,
      modalChangeValueAdd,
      focusedRowKey,
      modalChangeValueEdit,
      store,
      resetAddComponent,
      actionChangeComponent,
      idRowEdit,
      totalUserOff,
      totalUserOnl,
      modalComfirmDelete,
      loading,
      modalDeleteStatus,
      dataSource,
      modalHistoryStatus,
      isAddNewStatus,
      move_column,
      colomn_resize,
      contentDelete,
      onExporting,
      confirmAndSaveAdd,
      comfirmAndSaveEdit,
      actionSave,
      closeAction,
      refetchData,
      onDeleteRow,
      modalHistory,
      onAddBtClick,
      onConfirmDelete,
      Message,
      addRowBtOnclick,
      countBtOnclick,
      trigger,
      onFocusedRowChanged,
      onFocusedRowChanging,
      idRowCurrentClick,
      idRowSaveDone
    };
  },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
