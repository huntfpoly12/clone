<template>
    <action-header title="일용직사원등록" @actionSave="actionSaveFunc" :buttonSave="actionChangeComponent != 2"/>
    <div id="pa-520" class="page-content">
        <a-row>
          <a-col :span="3" style="padding-right: 10px">
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
          <a-col :span="3" style="padding-right: 10px">
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
          <a-col :span="3" style="padding-right: 10px">
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
                <a-spin :spinning="loading" size="large">{{ store.state.common.activeAddRowPA520  }} {{ store.state.common.checkChangeValueAddPA520 }}
                    <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                        :show-borders="true" key-expr="employeeId" :allow-column-reordering="move_column"
                        :focused-row-enabled="true" :allow-column-resizing="colomn_resize" :onRowClick="openEditModal"
                        v-model:focused-row-key="focusedRowKey">
                        <DxScrolling mode="standard" show-scrollbar="always"/>
                        <DxPaging :enabled="false" />
                        <DxToolbar>
                            <DxItem location="after" template="button-history" css-class="cell-button-add" />
                            <DxItem location="after" template="button-template" css-class="cell-button-add" />
                        </DxToolbar>
                        <template #button-template>
                            <DxButton icon="plus" @click="openAddNewModal" />
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
                        <template #grade-cell="{ data }" class="custom-action">
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
                        <template #pupop="{ data }" class="custom-action">
                            <div v-if="data.data.deletable" class="custom-action text-center">
                                <DeleteOutlined @click="actionDeleteFuc(data.data.employeeId)" />
                            </div>
                        </template>
                    </DxDataGrid>
                </a-spin>
            </a-col>
            <a-col :span="11" class="custom-layout" style="padding-right: 0px;">
                <PA520PopupAddNew :modalStatus="modalAddNewStatus" @closePopup="closeAction"
                    v-if="actionChangeComponent == 1" :key="resetAddComponent" />
                <PA520PopupEdit :idRowEdit="idRowEdit" @closePopup="closeAction" v-if="actionChangeComponent == 2"
                    :actionSave="actionSave" />
            </a-col>
        </a-row>
    </div>
    <PopupMessage :modalStatus="modalStatus" @closePopup="modalStatus = false" typeModal="confirm"
        :content="contentDelete" okText="네" cancelText="아니요" @checkConfirm="statusComfirm" />
    <history-popup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" title="변경이력"
        :idRowEdit="idRowEdit" typeHistory="pa-520" />
    <PopupMessage :modalStatus="modalStatusChange" @closePopup="modalStatusChange = false" typeModal="confirm"
        :content="Message.getCommonMessage('501').message" okText="네ㅌㅌ" cancelText="아니오" @checkConfirm="statusComfirmSave" />
    <PopupMessage :modalStatus="modalChangeValueAdd" @closePopup="modalChangeValueAdd = false" typeModal="confirm"
        :content="Message.getCommonMessage('501').message" okText="네" cancelText="아니오" @checkConfirm="confirmSaveAdd" />
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed } from "vue"
import DxButton from "devextreme-vue/button"
import { useStore } from 'vuex'
import { useQuery, useMutation } from "@vue/apollo-composable"
import { companyId } from "@/helpers/commonFunction"
import { DxDataGrid, DxColumn, DxPaging, DxSearchPanel, DxToolbar, DxEditing, DxGrouping, DxScrolling, DxItem, DxTotalItem } from "devextreme-vue/data-grid"
import { EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue"
import notification from "@/utils/notification"
import queries from "@/graphql/queries/PA/PA5/PA520/index"
import PA520PopupAddNew from "./components/PA520PopupAddNew.vue"
import PA520PopupEdit from "./components/PA520PopupEdit.vue"
import mutations from "@/graphql/mutations/PA/PA5/PA520/index"
import { DataCreatedTable } from "./utils/index"

import { Message } from "@/configs/enum"
export default defineComponent({
    components: {
        DxDataGrid, DxColumn, DxPaging, DxSearchPanel, DxScrolling, DxToolbar, DxEditing, DxGrouping, DxItem, DxButton, DxTotalItem, EditOutlined, HistoryOutlined, SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, PrinterOutlined, DeleteOutlined, SaveOutlined,
        PA520PopupAddNew, PA520PopupEdit
    },
    setup() {
        const focusedRowKey = ref()
        const modalStatusChange = ref(false)
        const actionChangeComponent = ref(1)
        const actionSave = ref(0)
        const contentDelete = Message.getMessage('PA120', '002').message
        const modalStatus = ref(false)
        const dataSource = ref([])
        const store = useStore()
        const totalUserOnl = ref(0)
        const totalUserOff = ref(0)
        const globalYear = computed(() => store.state.settings.globalYear)
        const move_column = computed(() => store.state.settings.move_column)
        const trigger = ref<boolean>(true)
      const colomn_resize = computed(() => store.state.settings.colomn_resize)
      const Id_RowSaveDone = computed(() => store.state.common.rowIdSaveDonePa520)
        const originData = ref({
            companyId: companyId,
            imputedYear: globalYear.value,
        })
        const idAction = ref()
        const modalAddNewStatus = ref<boolean>(false)
        const modalHistoryStatus = ref<boolean>(false)
        const modalDeleteStatus = ref<boolean>(false)
        const idRowEdit = ref()
        const resetAddComponent = ref<number>(1);
        const addRowOnclick = ref<boolean>(false)
        let dataChange = ref(0)
        // ======================= GRAPQL ================================
        const {
            refetch: refetchData,
            result,
            loading,
        } = useQuery(queries.getEmployeeWageDailies, originData, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }))
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
        })
        // ======================= WATCH ================================== 
        watch(result, (value) => {
            if (value) {
                store.state.common.dataSourcePA520 = value.getEmployeeWageDailies

                // Total number of employees who have quit
                totalUserOnl.value = value.getEmployeeWageDailies.filter((val: any) => val.status != 0).length
                totalUserOff.value = value.getEmployeeWageDailies.filter((val: any) => val.status == 0).length
 
              if (store.state.common.rowIdSaveDonePa520 != 0) {
    
                // Get index row change 
                let indexChange = store.state.common.dataSourcePA520.findIndex((val: any) => val.employeeId == Id_RowSaveDone.value)
  
                // active row change
                setTimeout(() => { 
                  let a = document.body.querySelectorAll('.style-Id');
                  (a[indexChange] as HTMLInputElement).click();
                }, 100);
              }
              trigger.value = false
            }
        })
        watch(() => modalAddNewStatus.value, (value) => {
            if (value == false) {
                trigger.value = true
                refetchData()
            }
        })
        watch(globalYear, (value) => {
            openAddNewModal()
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

        // Opening a modal window.
      const openAddNewModal = () => {
            // Adding a new row to the table.
          if (store.state.common.activeAddRowPA520 == false) {
              // Adding a new row to the grid.
                let valueAddDefault = { ...DataCreatedTable }
                store.state.common.dataSourcePA520 = JSON.parse(JSON.stringify(store.state.common.dataSourcePA520)).concat(valueAddDefault)
               // Setting the focusedRowKey to null.
                focusedRowKey.value = null
                setTimeout(() => {
                    let a = document.body.querySelectorAll('[aria-rowindex]');
                    (a[a.length - 1] as HTMLInputElement).classList.add("dx-row-focused");
                }, 100);

                store.state.common.activeAddRowPA520 = true
                resetAddComponent.value++;
                actionChangeComponent.value = 1
                modalAddNewStatus.value = true
          }

          if (store.state.common.activeAddRowPA520 && store.state.common.checkChangeValueAddPA520) {
            modalChangeValueAdd.value = true
            addRowOnclick.value = true
          }
      }
        
        const modalChangeValueAdd = ref(false)
        // The above code is a function that is called when the user clicks on the edit button.
        const openEditModal = (val: any) => {
            store.state.common.idRowChangePa520 = val.data.employeeId
            if (store.state.common.checkChangeValueAddPA520 == true) {
                modalChangeValueAdd.value = true
            } else {
                // change component edit
                actionChangeComponent.value = 2
                focusedRowKey.value = val.data.employeeId
                if (store.state.common.activeAddRowPA520 == true) {
                    store.state.common.dataSourcePA520 = store.state.common.dataSourcePA520.splice(0, store.state.common.dataSourcePA520.length - 1)
                    store.state.common.activeAddRowPA520 = false
                }
                if (store.state.common.checkStatusChangeValuePA520 == true) {
                    modalStatusChange.value = true
                    dataChange.value = val.data.employeeId
                } else {
                    idRowEdit.value = val.data.employeeId
                }
            }
        }
        const modalHistory = () => {
            modalHistoryStatus.value = companyId
        }
        const actionDeleteFuc = (data: any) => {
            idAction.value = data
            modalStatus.value = true
        }
        // A function that is called when the user clicks on the delete button.
        const statusComfirm = (res: any) => {
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
        const actionSaveFunc = () => {
            actionSave.value++
            store.state.common.actionSavePA520++
        }
        // A function that is called when the user clicks on the save button.
      const statusComfirmSave = (res: any) => {
         if (res == true) {
              actionSaveFunc()
              store.state.common.idRowChangePa520 = dataChange.value
              store.state.common.allowedChangedRowPA520 = true
              idRowEdit.value = dataChange.value
          } else {
              store.state.common.allowedChangedRowPA520 = false
          }

        }
        const confirmSaveAdd = (res: any) => {
          if (res == true) {
            store.state.common.actionSaveAddPA520++
            // get employeeId (row key) last row in dataSourcePA520
            focusedRowKey.value = store.state.common.dataSourcePA520.slice(-1).pop().employeeId
          } else if (!res && addRowOnclick.value) { 
            // Delete row add demo
            store.state.common.dataSourcePA520 = store.state.common.dataSourcePA520.splice(0, store.state.common.dataSourcePA520.length - 1)
            // Change status switch in store
            store.state.common.activeAddRowPA520 = false
            store.state.common.checkChangeValueAddPA520 = false
            // Setting the value of the addRowOnclick variable to false.
            addRowOnclick.value = false
            openAddNewModal()
          }else{//Not save
            // Delete row add demo
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
            modalChangeValueAdd, focusedRowKey, modalStatusChange, store, actionSave, resetAddComponent, actionChangeComponent, idRowEdit, totalUserOff, totalUserOnl, modalStatus, loading, modalDeleteStatus, dataSource, modalHistoryStatus, modalAddNewStatus, move_column, colomn_resize, contentDelete,
            confirmSaveAdd, statusComfirmSave, actionSaveFunc, closeAction, refetchData, actionDeleteFuc, modalHistory, openAddNewModal, openEditModal, statusComfirm,Message
        }
    },
})
</script> 
<style lang="scss" scoped src="./style/style.scss" >

</style>
