<template>
  <action-header title="일용직사원등록" @actionSave="actionSave" :buttonSave="actionChangeComponent != 2"/>
  <a-row>
        <a-col :span="6" >{{globalYear}}
          formStatus :{{ store.state.settings.formStatus }}<br>
          clickYearStatus :{{ store.state.settings.clickYearStatus }} - {{clickYearStatus}}<br>
          newYear :{{ store.state.settings.newYear }}<br>
          globalYear:{{ store.state.settings.globalYear }}<br>

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
          actionChangeComponent: {{ actionChangeComponent }} ---tab---{{ store.state.common.setTabActivePA520 }}<br> 
          addRowBtOnclick: {{ addBtOnclick  }}<br>
          isChangeYearPA520 : {{ store.state.common.isChangeYearPA520 }} <br>
          isClickBtnSavePA520: {{ store.state.common.isClickBtnSavePA520 }} <br>
        </a-col>
        <a-col :span="6">
          modalChangeValueAdd : {{  modalChangeValueAdd }}  <br>
          modalChangeValueEdit : {{  modalChangeValueEdit }}  <br>
          focusedRowKey :  {{ focusedRowKey }}<br>
          idRowSaveDone :  {{ idRowSaveDone }}<br>
          idRowEdit : {{ idRowEdit }}<br>
          idRowCurrentClick: {{ idRowCurrentClick }}<br>
          isClickRow {{ store.state.common.isClickRowPA520 }} <br>
        </a-col>
  </a-row>
  <div id="pa-520" class="page-content">
  {{ loading }}
      <a-row>
          <a-col :span="13" class="custom-layout" >
              <a-spin :spinning="loading" size="large">
                <div class="grid-table" style="height: 100%;">
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
                  style="max-height: 700px;"
                  ref="pa520Grid"
                  @focused-row-changing="onFocusedRowChanging"
                  @focused-row-changed="onFocusedRowChanged"
                  >
                      <DxScrolling mode="virtual" show-scrollbar="always"/>
                      <DxSearchPanel :visible="true" />
                      <DxExport :enabled="true"/>
                      <DxPaging :enabled="false" />
                      <DxToolbar>
                          <DxItem location="before">
                              <div class="total-user">
                                <div>
                                  <span>{{ totalUser }}</span>
                                  <span> 전체</span>
                                </div>
                                <div>
                                  <img src="@/assets/images/user.svg" alt="" style="width: 31px" />
                                </div>
                              </div>
                            </DxItem>
                            <DxItem location="before">
                              <div class="current-user">
                                <div>
                                  <span>{{ totalUserOnl }}</span>
                                  <span> 재직</span>
                                </div>
                                <div>
                                  <img src="@/assets/images/user.svg" alt="" style="width: 31px" />
                                </div>
                              </div>
                            </DxItem>
                            <DxItem location="before">
                              <div class="leave-user">
                                <div>
                                  <span>{{ totalUserOff }}</span>
                                  <span> 퇴사</span>
                                </div>
                                <div>
                                  <img src="@/assets/images/user.svg" alt="" style="width: 31px" />
                                </div>
                              </div>
                           
                          </DxItem>
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
                      <DxColumn caption="성명" cell-template="company-name" width="250" data-field="name"/>
                      <template #company-name="{ data }">
                          <employee-info :idEmployee="data.data.employeeId" :name="data.data.name"
                              :idCardNumber="data.data.residentId" :status="data.data.status"
                              :foreigner="data.data.foreigner" :checkStatus="false"
                              v-if="store.state.common.activeAddRowPA520 == false" />
                          <employee-info v-else :idEmployee="data.data.employeeId" :name="data.data.name"
                              :status="data.data.status" :foreigner="data.data.foreigner" :checkStatus="false"
                               />
                      </template>
                      <DxColumn caption="주민등록번호" cell-template="residentId" width="150"  css-class="cell-center" data-field="residentId"/>
                      <template #residentId="{ data }" >
                        <resident-id :residentId="data.data.residentId"></resident-id>
                      </template>

                      <DxColumn caption="비고" cell-template="node-cell" />
                      <template #node-cell="{ data }">
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
      :content="contentDelete" okText="네. 삭제합니다" cancelText="아니요" @checkConfirm="onConfirmDelete" />
  <history-popup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" title="변경이력"
      :idRowEdit="idRowEdit" typeHistory="pa-520" />
  <!-- confirm for case edit   -->
  <PopupMessage :modalStatus="modalChangeValueEdit" @closePopup="closePopupConfirmEdit" typeModal="confirm"
      :content="Message.getCommonMessage('501').message" okText="네" cancelText="아니오" @checkConfirm="comfirmAndSaveEdit" />
  <!-- confirm for case add -->
  <PopupMessage :modalStatus="modalChangeValueAdd" @closePopup="modalChangeValueAdd = false" typeModal="confirm"
      :content="Message.getCommonMessage('501').message" okText="네" cancelText="아니오" @checkConfirm="confirmAndSaveAdd" />
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
import { ClickYearStatus, FormStatus } from "@/store/settingModule/types";
import dayjs, { Dayjs } from "dayjs";
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
    const contentDelete = Message.getMessage("PA120", "002").message;
    const modalComfirmDelete = ref(false);
    const dataSource = ref<any>(new DataSource({
      store: {
        type: "array",
        key: 'employeeId',
        data: [],
      }
    }));

    const totalUserOnl = ref(0);
    const totalUserOff = ref(0);
    const totalUser = ref(0);
    const idRowCurrentClick = ref(0);
    // vuex declare
    const store = useStore();
    const globalYear = computed(() => store.getters['settings/currentYear']);
    const focusedRowKey = computed(() => store.getters['common/focusedRowKeyPA520'])
    const clickYearStatus = computed(() => store.getters['settings/clickYearStatus'])
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const idRowSaveDone = computed(() => store.getters['common/idRowSaveDonePA520']);
    const addBtOnclick = computed(() => store.getters['common/addBtOnclickPA520']);// determine when click add new button
    const isChangeYear = computed(() => store.getters['common/isChangeYearPA520']);// determine when click change year
    // const isValidateEditPA520 = computed(() => store.state.common.isValidateEditPA520);
    // const isValidateAddPA520 = computed(() => store.getters['common/isValidateAddPA520']);
    const isClickRow = computed(() => store.getters['common/isClickRowPA520']); // determine when action click row
    const isClickBtnSavePA520 = computed(() => store.getters['common/isClickBtnSavePA520']); 
    // const isDelete = computed(() => store.state.common.isClickDelete); // determine when action click icon delete
    const tab1IsChange = computed(() => store.getters['common/checkChangeValueEditTab1PA520']);
    const tab2IsChange = computed(() => store.getters['common/checkChangeValueEditTab2PA520']);
    const fromAddIsChange = computed(() => store.getters['common/checkChangeValueAddPA520']);
    const modalChangeValueEdit = computed(() => store.getters['common/modalChangeValueEditPA520'])
    const modalChangeValueAdd = computed(() => store.getters['common/modalChangeValueAddPA520'])
    const actionChangeComponent = computed(() => store.getters['common/setComponentPA520'])
    const idRowEdit = computed(() => store.getters['common/idRowCurrentEditPA520'])
    const activeAddRowPA520  = computed(() => store.getters['common/activeAddRowPA520'])
    const originData = ref({
      companyId: companyId,
      imputedYear: globalYear,
    });
    
    const trigger = ref<boolean>(true);
    const isAddNewStatus = ref<boolean>(false);
    const modalHistoryStatus = ref<boolean>(false);
    const modalDeleteStatus = ref<boolean>(false);
    const resetAddComponent = ref<number>(1);
   
    // use to catch case click add button and change something after that click add button  again
    // to check is click button add row or not
   
    // ======================= GRAPQL ================================
    const {
      refetch: refetchData,
      result,
      loading,
      onError
    } = useQuery(queries.getEmployeeWageDailies, originData, () => ({
      enabled: trigger.value,
      fetchPolicy: "no-cache",
    }));
    onError((e) => {
      notification("error", e.message);
      store.commit('settings/setCurrentYear',dayjs().year())
    });
    const {
      mutate: actionDelete,
      onError: errorDelete,
      onDone: successDelete,
    } = useMutation(mutations.deleteEmployeeWageDaily);
    errorDelete((e) => {
      notification("error", e.message);
    });
    successDelete((e) => {
      notification("success", Message.getCommonMessage('402').message);
      trigger.value = true;
      refetchData();
    });
    // ======================= WATCH ==================================
    //check if the year is changed, then confirm first if you are adding or editing data
    watch(globalYear, (newYear, oldYear) => {
      store.commit('common/setIsChangeYearPA520', true);
      if (!tab1IsChange.value && !tab2IsChange.value && !fromAddIsChange.value)
      {
        trigger.value = true;
      }
    })

    watch(clickYearStatus, async (newVal : ClickYearStatus) => {
        if (fromAddIsChange.value && newVal !== ClickYearStatus.none) {
          store.commit('common/setModalChangeValueAddPA520', true);
        }
        if ((tab1IsChange.value || tab2IsChange.value) && newVal !== ClickYearStatus.none) {
          store.commit('common/setModalChangeValueEditPA520', true)
        }
    })

    watch(result,() => {
      if (result && result.value) {
        const data = result.value.getEmployeeWageDailies.map((item: any) => ({
          ...item,
          key: item.employeeId
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
        totalUser.value = result.value.getEmployeeWageDailies.length;


        // nếu sau confirm mà trươc đấy click thêm row thì thêm row mới
        if (addBtOnclick.value && !isClickRow.value && !isChangeYear.value && !isClickBtnSavePA520.value) {
          onAddBtClick()
          store.commit('common/setAddBtOnclickPA520', false);
          store.dispatch('common/resetStatusModal')
        }

        // nếu trước đấy chuyển row thì focus vào row mới vừa chuyển 
        if (isClickRow.value && !isClickBtnSavePA520.value) {
          setRowEdit(idRowCurrentClick.value)
          store.dispatch('common/resetStatusModal')
        }
        // nếu chỉ click Save btn -> focus vào row vừa tạo
        if (isClickBtnSavePA520.value) {
          setRowEdit(parseInt(idRowSaveDone.value))
          store.dispatch('common/resetStatusModal')
        }

        // for the case of changing the year and having to focus on the first row
        if (isChangeYear.value) {
          store.commit('common/setIsChangeYearPA520', false);
          dataSource.value.load()
          let items = dataSource.value.items()
          if (items.length > 0) { // If there is data, focus on the first row
            setRowEdit(dataSource.value.items()[0].employeeId)
            store.commit('common/setComponentPA520',2);
          } else {// If there is no data, add an input box
            onAddBtClick()
          }
        }
        trigger.value = false;
      }
      store.dispatch('common/resetActionStatus')
    });

    watch(()=>store.state.common.dataSourcePA520,(newVal)=>{
      dataSource.value.store().update(0,newVal).then(() => dataSource.value.reload());
    },{ deep: true })

    watch(() => isAddNewStatus.value,
      (value) => {
        if (value == false) {
          trigger.value = true;
          refetchData();
        }
      }
    );

    watch(idRowSaveDone,
      (value) => {
        trigger.value = true;
        refetchData();
      },
    );

    watch(focusedRowKey, () => {
  
      let newRow = dataSource.value.items().filter((item: any) => item.key == 0);
   
      console.log(newRow.length, isClickRow.value);
      if (newRow.length > 0 && isClickRow.value) {
        removeNewRow()
        store.dispatch('common/resetActionStatus')
      }
    })
    const removeNewRow = () => {
        dataSource.value.store().remove(0).then(() => {dataSource.value.reload()})
    }
    // ======================= FUNCTION ================================
    // The above code is a function that is called when the user clicks on the edit button.
    const onFocusedRowChanging = (event: any) => {
        store.commit('common/setActiveAddRowPA520',false)
        store.commit('common/setIsClickRowPA520', true)
        // remove tất cả class focus đã thêm vào trước đấy
        const gridTable = pa520Grid.value.instance.getVisibleRows();
        gridTable.forEach((row: any) => {
          const rowElement = pa520Grid.value.instance.getRowElement(row.rowIndex);
          if (rowElement[0].classList.contains('dx-state-hover-new')) {
            rowElement[0].classList.remove('dx-state-hover-new');
          }
        });

        let newRowIndex = event.newRowIndex
        var rowElement = event.rowElement;
        if (rowElement) {
          rowElement.addClass('dx-state-hover-new');
        }
        idRowCurrentClick.value = dataSource.value.items()[newRowIndex].employeeId
        // // for case Editing or Adding  but click other row
        if (fromAddIsChange.value) {
          store.commit('common/setModalChangeValueAddPA520', true);
          event.cancel = true
        }
        if (tab1IsChange.value || tab2IsChange.value) {
          store.commit('common/setModalChangeValueEditPA520', true)
          event.cancel = true
          
        }
        store.commit('common/setAddBtOnclickPA520',false);
      
    }
    const onFocusedRowChanged = async(event: any) => {
      // if(focusedRowKey.value == 0 && !isClickRow.value ){
      //   store.commit('common/setComponentPA520',1);
      // } else {
      //   store.commit('common/setComponentPA520', 2);
      //   setRowEdit(event.row.data.employeeId);
      // }
    }

    const actionSave = () => {
      store.state.common.actionSaveAddPA520++;
    };

    const funcAddNewRow = () => { 
      store.commit('common/setActiveAddRowPA520',true);
      dataSource.value.store().remove(0).then(() => {
        dataSource.value.store().insert(DataCreatedTable).then(() => dataSource.value.reload());
      })
      store.commit('common/setFocusedRowKeyPA520',0);
      resetAddComponent.value++;
      store.commit('common/setComponentPA520',1);
      return
    }
    // Opening a modal window.
    const onAddBtClick = async () => {
      store.commit('common/setAddBtOnclickPA520', true);
      store.commit('common/setIsClickRowPA520', false);
      if (fromAddIsChange.value) {
        store.commit('common/setModalChangeValueAddPA520', true);
        return
      }
      if (tab1IsChange.value || tab2IsChange.value) {
        store.commit('common/setModalChangeValueEditPA520', true)
        return
      }
      // // Adding a new row to the table.
      funcAddNewRow();     
    };
    const confirmAndSaveAdd = async (res: any) => {
      if(res == true){
        await actionSave();
        const hasValidator = await store.dispatch('common/hasValidator')
        
        // nếu có validate = true không làm gì tiếp theo cả
        if (hasValidator) {
          store.dispatch('common/resetStatusModal')
          return
        }
      } else {
        
        if (addBtOnclick.value && !isClickRow.value && clickYearStatus.value == ClickYearStatus.none) {
          store.dispatch('common/resetStatusModal')
          store.dispatch('common/resetActionStatus')
          store.dispatch('common/resetStatusChangeFrom')
          funcAddNewRow();
        } 

        if (isClickRow.value && !addBtOnclick.value && clickYearStatus.value == ClickYearStatus.none) {
          setRowEdit(idRowCurrentClick.value)
          store.dispatch('common/resetStatusModal')
          //store.dispatch('common/resetActionStatus')
          store.dispatch('common/resetStatusChangeFrom')
        }

        if (clickYearStatus.value !== ClickYearStatus.none) {
     
          store.dispatch('common/resetStatusModal')
          store.dispatch('common/resetActionStatus')
          store.dispatch('common/resetStatusChangeFrom')
          store.commit('settings/setCurrentYear')
        }
      }
    };
    const actionUpdate = (currentTab: number) => {
      if (currentTab == 1) {
        store.state.common.actionUpdateTab1PA520++;
      } else {
        store.state.common.actionUpdateTab2PA520++;
      }
    };

    const closePopupConfirmEdit = async()=>{
      store.commit('common/setModalChangeValueEditPA520',false)
    }
    // A function that is called when the user clicks on the save button.
    const comfirmAndSaveEdit = async (res: any) => {
      //store.dispatch('settings/resetYearStatus')
      if (res == true) {
        tab1IsChange.value
          ? await actionUpdate(1) : await actionUpdate(2);
        const hasValidator = await store.dispatch('common/hasValidator')
        if (hasValidator) {
          if(clickYearStatus.value !==  ClickYearStatus.none) store.commit('settings/setClickYearStatus',ClickYearStatus.none)
          store.dispatch('common/resetStatusModal')
          store.dispatch('common/resetStatusValidate')
          return
        }
        
        // In case you are editing and then click on another and agree to save the information,
        if (!addBtOnclick.value) {
          // In case reset the tab when one of the two tabs is fixed and validated
          if (tab1IsChange.value) {
            store.commit('common/setTabActivePA520','1')
          }

          if (tab2IsChange.value) {
            store.commit('common/setTabActivePA520','2')
          }
          store.commit('common/setIsClickRowPA520',true)
        }
      } else {
        if (addBtOnclick.value && !isClickRow.value && clickYearStatus.value == ClickYearStatus.none) {
          funcAddNewRow();
          store.dispatch('common/resetStatusModal')
          store.dispatch('common/resetActionStatus')
          store.dispatch('common/resetStatusChangeFrom')
          
        }

        if (isClickRow.value && !addBtOnclick.value && clickYearStatus.value == ClickYearStatus.none) {
          setRowEdit(idRowCurrentClick.value)
          // for case edit tab2 and click other row
          store.dispatch('common/resetStatusModal')
          store.dispatch('common/resetActionStatus')
          store.dispatch('common/resetStatusChangeFrom')
        }

        if (clickYearStatus.value !== ClickYearStatus.none) {
          store.dispatch('common/resetStatusModal')
          store.dispatch('common/resetActionStatus')
          store.dispatch('common/resetStatusChangeFrom')
          store.commit('settings/setCurrentYear')
        }
      }
      //store.state.common.checkChangeValueEditTab1PA520 = false;
    };

    const setRowEdit = (rowId: number) => {
      store.commit('common/setIdRowCurrentEditPA520',rowId)
      store.commit('common/setFocusedRowKeyPA520', rowId)
    }
    const modalHistory = () => {
      modalHistoryStatus.value = companyId;
    };
    const onDeleteRow = (data: any) => {
      // isDelete.value = true;
      // idAction.value = data;
      modalComfirmDelete.value = true;
    };
    // A function that is called when the user clicks on the delete button.
    const onConfirmDelete = (res: any) => {
      if (res == true)
        actionDelete({
          companyId: companyId,
          imputedYear: globalYear.value,
          employeeId: idRowCurrentClick.value,
        });
    };
    const closeAction = () => {
      trigger.value = true;
      refetchData();
    };

   const onExporting = (e: { component: any; cancel: boolean }) => {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Employees");

      exportDataGrid({
        component: e.component,
        worksheet,
        customizeCell: function({ gridCell, excelCell }) {
          if (gridCell?.rowType == 'data') {
            if (gridCell?.column?.cellTemplate == "company-name") {
              let cellValue = `${gridCell.data.employeeId} - ${gridCell.data.name} ${gridCell.data.status==0?'- 퇴':''} ${gridCell.data.foreigner?'- 외':''}`
              excelCell.value = cellValue;
            }
            if (gridCell?.column?.cellTemplate == "residentId") {
              excelCell.value = gridCell.data.residentId;
            }
            if (gridCell?.column?.cellTemplate == "node-cell") {
              let cellValue = ''
              gridCell.data.healthInsuranceDeduction ? cellValue += '- 건' : ''
              gridCell.data.employeementInsuranceDeduction ? cellValue += ' - 고' : ''
              gridCell.data.nationalPensionSupportPercent ? cellValue += ` - 두 ${ gridCell.data.nationalPensionSupportPercent }%}` : ''
              gridCell.data.employeementInsuranceSupportPercent ? cellValue += ` - 두(고)${ gridCell.data.employeementInsuranceSupportPercent }%}` : ''
              excelCell.value = cellValue;
            }
          }
        }
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

    return {
      pa520Grid,
      modalChangeValueAdd,
      focusedRowKey,
      modalChangeValueEdit,
      closePopupConfirmEdit,
      store,
      resetAddComponent,
      actionChangeComponent,
      idRowEdit,
      totalUserOff,
      totalUserOnl,
      totalUser,
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
      addBtOnclick,
      trigger,
      onFocusedRowChanged,
      onFocusedRowChanging,
      idRowCurrentClick,
      idRowSaveDone,
      globalYear,
      clickYearStatus
    };
  },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
