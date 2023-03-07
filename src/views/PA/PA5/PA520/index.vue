<template>
    <action-header title="일용직사원등록" @actionSave="actionSave" :buttonSave="actionChangeComponent != 2"/>
     checkChangeValueEditTab1PA520 : {{ store.state.common.checkChangeValueEditTab1PA520 }}<br>
    checkChangeValueEditTab2PA520: {{ store.state.common.checkChangeValueEditTab2PA520 }}<br>
    checkChangeValueAddPA520: {{ store.state.common.checkChangeValueAddPA520 }}<br>
    activeAddRowPA520: {{ store.state.common.activeAddRowPA520 }}<br>
    idRowChangePa520: {{ store.state.common.idRowChangePa520 }}<br>
    actionChangeComponent: {{ actionChangeComponent }}<br>
    addRowBtOnclick: {{ addRowBtOnclick  }}<br>
    modalChangeValueEdit : {{  modalChangeValueEdit }}
    {{ idRowEdit }}
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
                    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                        :show-borders="true" key-expr="employeeId" :allow-column-reordering="move_column"
                        :focused-row-enabled="true" :allow-column-resizing="colomn_resize" :onRowClick="onRowClick"
                        v-model:focused-row-key="focusedRowKey" @exporting="onExporting">
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
                            <employee-info :idEmployee="data.data.employeeId" :name="data.data.name"
                                :status="data.data.status" :foreigner="data.data.foreigner" :checkStatus="false"
                                v-else />
                        </template>
                        <DxColumn caption="주민등록번호" cell-template="residentId" width="150"  css-class="cell-center" />
                        <template #residentId="{ data }" >
                            <div v-if="data.data.residentId?.length == 14">
                                <a-tooltip placement="top"
                                    v-if="parseInt(data.data.residentId.split('-')[0].slice(2, 4)) < 13 && parseInt(data.data.residentId.split('-')[0].slice(4, 6)) < 32"
                                    key="black">
                                    {{ data.data.residentId }}
                                </a-tooltip>
                                <a-tooltip placement="top" v-else title="ERROR" color="red">
                                    {{ data.data.residentId }}
                                </a-tooltip>
                            </div>
                            <div v-else>
                                <a-tooltip placement="top" key="black">
                                    {{ data.data.residentId.slice(0, 6) + '-' + data.data.residentId.slice(6, 13) }}
                                </a-tooltip>
                            </div>
                        </template>

                        <DxColumn caption="비고" cell-template="grade-cell" />
                        <template #grade-cell="{ data }">
                            <div class="custom-grade-cell">
                                <four-major-insurance v-if="data.data.nationalPensionDeduction == true" :typeTag="1"
                                    :typeValue="1" />
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
    <PopupMessage :modalStatus="modalChangeValueEdit" @closePopup="modalChangeValueEdit = false" typeModal="confirm"
        :content="Message.getCommonMessage('501').message" okText="네" cancelText="아니오" @checkConfirm="comfirmAndSaveEdit" />
    <!-- confirm for case add -->
    <PopupMessage :modalStatus="modalChangeValueAdd" @closePopup="modalChangeValueAdd = false" typeModal="confirm"
        :content="Message.getCommonMessage('501').message" okText="네" cancelText="아니오" @checkConfirm="confirmAndSaveAdd" />
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, onMounted } from "vue"
import DxButton from "devextreme-vue/button"
import { useStore } from 'vuex'
import { useQuery, useMutation } from "@vue/apollo-composable"
import { companyId, onExportingCommon } from "@/helpers/commonFunction"
import { DxDataGrid, DxColumn, DxPaging, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxTotalItem ,DxExport} from "devextreme-vue/data-grid"
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue"
import notification from "@/utils/notification"
import queries from "@/graphql/queries/PA/PA5/PA520/index"
import PA520PopupAddNew from "./components/PA520PopupAddNew.vue"
import PA520PopupEdit from "./components/PA520PopupEdit.vue"
import mutations from "@/graphql/mutations/PA/PA5/PA520/index"
import { DataCreatedTable } from "./utils/index"
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";
import { Message } from "@/configs/enum"

export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxPaging, DxSearchPanel, DxScrolling, DxToolbar, DxEditing, DxGrouping, DxItem, DxButton, DxTotalItem, EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined,DxExport,
        PA520PopupAddNew, PA520PopupEdit
    },
    setup() {
        const focusedRowKey = ref()
        const modalChangeValueEdit = ref(false)
        const actionChangeComponent = ref(1)
        const contentDelete = Message.getMessage('PA120', '002').message
        const modalComfirmDelete = ref(false)
        const dataSource = ref([])
        const store = useStore()
        const totalUserOnl = ref(0)
        const totalUserOff = ref(0)
        const globalYear = computed(() => store.state.settings.globalYear)
        const move_column = computed(() => store.state.settings.move_column)
        const trigger = ref<boolean>(true)
        const colomn_resize = computed(() => store.state.settings.colomn_resize)
        const idRowSaveDone = computed(() => store.state.common.rowIdSaveDonePa520)
        const idRowCurrentClick= computed(() =>store.state.common.idRowChangePa520)
        const originData = ref({
            companyId: companyId,
            imputedYear: globalYear.value,
        })
        const idAction = ref()
        const isAddNewStatus = ref<boolean>(false)
        const modalHistoryStatus = ref<boolean>(false)
        const modalDeleteStatus = ref<boolean>(false)
        const modalChangeValueAdd = ref(false)
        const idRowEdit = ref()
        let isMounted = false; // determine first page load
        let isClickRow = false; // determine when action click row 
        const isDelete = ref<boolean>(false); // determine when action click icon delete 
        const resetAddComponent = ref<number>(1);
        // use to catch case click add button and change something after that click add button  again
        const addRowBtOnclick = ref<boolean>(false) // to check is click button add row or not
        // ======================= GRAPQL ================================
        const {
            refetch: refetchData,
            result,
            loading,
        } = useQuery(queries.getEmployeeWageDailies, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }))
        //hook on mounted to change page load state
        onMounted(() => {
          isMounted = true;
        });
        const {
            mutate: actionDelete,
            onError: errorDelete,
            onDone: successDelete,
        } = useMutation(mutations.deleteEmployeeWageDaily)
        errorDelete(e => {
            notification('error', e.message)
        })
        successDelete(e => {
            notification('success', `업데이트 완료!`)
            trigger.value = true
            refetchData()
            focusedRowKey.value = store.state.common.dataSourcePA520[0].employeeId
        })
        // ======================= WATCH ================================== 
        watch(result, (value) => {
          if (value) {
            // If it's the first time the page loads, focus on the first row
            if (isMounted) {
              onRowClick({ data : value.getEmployeeWageDailies[0] })
              isMounted = false
              isClickRow = false
            }
            store.state.common.dataSourcePA520 = value.getEmployeeWageDailies
            // Total number of employees who have quit
            totalUserOnl.value = value.getEmployeeWageDailies.filter((val: any) => val.status != 0).length
            totalUserOff.value = value.getEmployeeWageDailies.filter((val: any) => val.status == 0).length
              if (store.state.common.rowIdSaveDonePa520 != 0) {
                // Get index row change 
                let idRowNextForcus = isClickRow ? idRowCurrentClick.value : idRowSaveDone.value
                // If there is a click event on the row, it will assign the employee id to focus
                let dataRowChange = store.state.common.dataSourcePA520.filter((val: any) => val.employeeId == idRowNextForcus) 
                // active row change
                onRowClick({ data: dataRowChange[0] })
                isClickRow = false
                isDelete.value = false
              }
              trigger.value = false
              
            }
        })
        watch(() => isAddNewStatus.value, (value) => {
            if (value == false) {
                trigger.value = true
                refetchData()
            }
        })
        watch(globalYear, (value) => {
            onAddBtClick()
            trigger.value = true
            originData.value.imputedYear = value
            refetchData()
        });

        // get datasource from store to client
        watch(() => store.state.common.dataSourcePA520, (value) => {
            dataSource.value = value
        }, { deep: true });

        watch(() => store.state.common.rowIdSaveDonePa520, (value) => {
            trigger.value = true
            refetchData()
        }, { deep: true });
        // ======================= FUNCTION ================================
        const onExporting = (e: { component: any; cancel: boolean; }) => {
          const workbook = new Workbook();
          const worksheet = workbook.addWorksheet('Employees');

          exportDataGrid({
            component: e.component,
            worksheet,
            autoFilterEnabled: true,
          }).then(() => {
            workbook.xlsx.writeBuffer().then((buffer) => {
              saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
            });
          });
          e.cancel = true;
        }
        // Opening a modal window.
        const onAddBtClick = () => {
          addRowBtOnclick.value = true
          if (
            store.state.common.checkChangeValueEditTab1PA520 == true
            //|| store.state.common.checkChangeValueEditTab2PA520 == true |
          ){
            modalChangeValueEdit.value = true
            return
          }
            // Adding a new row to the table.
          if (store.state.common.activeAddRowPA520 == false) {
                funcAddNewRow()
                actionChangeComponent.value = 1
                isAddNewStatus.value = true
          } 
          if (store.state.common.activeAddRowPA520 && store.state.common.checkChangeValueAddPA520) {
            modalChangeValueAdd.value = true
            
          }
      }

      const funcAddNewRow = () => {
        store.state.common.activeAddRowPA520 = true 
        // Adding a new row to the grid.
        let valueAddDefault = { ...DataCreatedTable }
        store.state.common.dataSourcePA520 = JSON.parse(JSON.stringify(store.state.common.dataSourcePA520)).concat(valueAddDefault)
        // Setting the focusedRowKey to null.
        focusedRowKey.value = null
        setTimeout(() => {
            let a = document.body.querySelectorAll('[aria-rowindex]');
            (a[a.length - 1] as HTMLInputElement).classList.add("dx-row-focused");
        }, 100);
        resetAddComponent.value++
        actionChangeComponent.value = 1
      }
        // The above code is a function that is called when the user clicks on the edit button.
      const onRowClick = (val: any) => {
         
          // if click delete icon do nothing
          if (isDelete.value) {
            return
          }
          isClickRow = true
          store.state.common.idRowChangePa520 = val.data.employeeId
          // for case Edit  but click other row
          if (
            store.state.common.checkChangeValueEditTab1PA520 == true || store.state.common.checkChangeValueEditTab2PA520 == true 
          ){ 
            modalChangeValueEdit.value = true
            return
          }
          // for case Add  but click other row
          if (store.state.common.checkChangeValueAddPA520 == true) {
            modalChangeValueAdd.value = true
            return
          } else { idRowEdit.value = val.data.employeeId }
          
          actionChangeComponent.value = 2
          focusedRowKey.value = val.data.employeeId
          //The case is creating but not entering data but clicking to another row
          if (store.state.common.activeAddRowPA520 == true) {
              store.state.common.dataSourcePA520 = store.state.common.dataSourcePA520.splice(0, store.state.common.dataSourcePA520.length - 1)
              store.state.common.activeAddRowPA520 = false
          }
            
        }
        const modalHistory = () => {
            modalHistoryStatus.value = companyId
        }
        const onDeleteRow = (data: any) => {
            isDelete.value = true
            idAction.value = data
            modalComfirmDelete.value = true
        }
        // A function that is called when the user clicks on the delete button.
        const onConfirmDelete = (res: any) => {
            if (res == true)
                actionDelete({
                    companyId: companyId,
                    imputedYear: globalYear.value,
                    employeeId: idAction.value
                })
        }
        const closeAction = () => {
            trigger.value = true
            refetchData()
        }
        const actionSave = () => {
            store.state.common.actionSaveAddPA520++
        }

        const actionUpdate = (currentTab: number) => {
            if (currentTab == 1) {
              store.state.common.actionUpdateTab1PA520++
            } else {
              store.state.common.actionUpdateTab2PA520++
            }
        }

        // A function that is called when the user clicks on the save button.
        const comfirmAndSaveEdit = (res: any) => {
          if (res == true) {
            store.state.common.checkChangeValueEditTab1PA520 ? actionUpdate(1) : actionUpdate(2)
            // In case you are editing and then click on another and agree to save the information, 
            if (addRowBtOnclick.value) {
              funcAddNewRow()
            } else {
              idRowEdit.value = focusedRowKey.value
              // for case edit tab2 and click other row
              //store.state.common.idRowChangePa520 = focusedRowKey.value
              store.state.common.checkChangeValueEditTab2PA520 = false
            }
          } else {
            if (addRowBtOnclick.value) {
              funcAddNewRow()
            } else {
              idRowEdit.value = focusedRowKey.value
              // for case edit tab2 and click other row
              //store.state.common.idRowChangePa520 = focusedRowKey.value
              store.state.common.checkChangeValueEditTab2PA520 = false
            }
          }
          store.state.common.checkChangeValueEditTab1PA520 = false
        }
        const confirmAndSaveAdd = (res: any) => {
          if (res == true) {
            focusedRowKey.value = store.state.common.dataSourcePA520.slice(-1).pop().employeeId
            actionSave()    
           
          } else if (!res && addRowBtOnclick.value) { 
            // Delete new row
            store.state.common.dataSourcePA520 = store.state.common.dataSourcePA520.splice(0, store.state.common.dataSourcePA520.length - 1)
            // Change status switch in store
            store.state.common.activeAddRowPA520 = false
            store.state.common.checkChangeValueAddPA520 = false
            // Setting the value of the addRowOnclick variable to false.
            addRowBtOnclick.value = false
            resetAddComponent.value++ // increment one unit to reset the newly created form
            onAddBtClick()
          } else {//Not save
            // Delete new row
            store.state.common.dataSourcePA520 = store.state.common.dataSourcePA520.splice(0, store.state.common.dataSourcePA520.length - 1)
            // Change status switch in store
            store.state.common.activeAddRowPA520 = false
            store.state.common.checkChangeValueAddPA520 = false
            // Get index row change 
            let indexChange = store.state.common.dataSourcePA520.findIndex((val: any) => val.employeeId == store.state.common.idRowChangePa520)
            // active row change
            setTimeout(() => {
              let a = document.body.querySelectorAll('[aria-rowindex]');
              (a[indexChange] as HTMLInputElement).click();
            }, 100);
          }
        }

        return {
            modalChangeValueAdd, focusedRowKey, modalChangeValueEdit, store, resetAddComponent, actionChangeComponent, idRowEdit, totalUserOff, totalUserOnl, modalComfirmDelete, loading, modalDeleteStatus, dataSource, modalHistoryStatus, isAddNewStatus, move_column, colomn_resize, contentDelete,onExporting,
            confirmAndSaveAdd, comfirmAndSaveEdit, actionSave, closeAction, refetchData, onDeleteRow, modalHistory, onAddBtClick, onRowClick, onConfirmDelete,Message,addRowBtOnclick
        }
    },
})
</script> 
<style lang="scss" scoped src="./style/style.scss" >

</style>
