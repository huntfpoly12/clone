<template>
  <action-header
    title="사업소득자등록"
    @actionSave="saving()"
    :buttonDelete="false"
  />
  <div id="pa-610">
    <div class="page-content">
      <a-row>
        <a-col span="2" class="total-user">
          <div>
              <span>{{ storeDataSourceCount }}</span>
              <br>
              <span>전체</span>
          </div>
          <div>
              <img src="@/assets/images/user.svg" style="width: 39px;" />
          </div>
      </a-col>
        <a-col :span="21"></a-col>
        <a-col :span="15" class="custom-layout">
          <a-spin
            :spinning="
              loadingGetEmployeeBusinesses || loadingUpdate || loadingDelete
            "
            size="large"
          >
            <DxDataGrid
              ref="gridRef"
              :show-row-lines="true"
              :hoverStateEnabled="true"
              :dataSource="dataSource"
              :show-borders="true"
              key-expr="key"
              :allow-column-reordering="move_column"
              :allow-column-resizing="column_resize"
              :focused-row-enabled="true"
              @focused-row-changing="onFocusedRowChanging"
              @focused-row-changed="onFocusedRowChanged"
              v-model:focused-row-key="focusedRowKey"
              :focusedRowIndex="0"
            >
              <DxScrolling mode="standard" show-scrollbar="always" />
              <DxSearchPanel :visible="true" :highlight-case-sensitive="true" :search-visible-columns="['TypeCodeAndName']" />
              <DxExport :enabled="true" />
              <DxToolbar>
                <DxItem location="after" template="pagination-table" />
                <DxItem name="searchPanel" />
                <DxItem name="exportButton" css-class="cell-button-export" />
                <DxItem
                  location="after"
                  template="button-history"
                  css-class="cell-button-add"
                />
                <DxItem
                  location="after"
                  css-class="cell-button-add"
                >
                <DxButton icon="plus" @click="addRow">
                  <a-tooltip color="black" placement="top">
                      <template #title>신규</template>
                      <PlusOutlined style="font-size: 16px" />
                  </a-tooltip>
              </DxButton>
                </DxItem>
                <DxItem name="addRowButton" show-text="always" />
              </DxToolbar>
              <template #button-history style="border-color: #ddd">
                <DxButton icon="plus">
                  <HistoryOutlined
                    style="font-size: 18px"
                    @click="modalHistory"
                  />
                </DxButton>
              </template>
              <template #pagination-table>
                <div v-if="rowTable > originData.rows">
                  <a-pagination
                    v-model:current="originData.page"
                    v-model:page-size="originData.rows"
                    :total="rowTable"
                    show-less-items
                  />
                </div>
              </template>
              <DxColumn
                caption="성명 (상호)"
                cell-template="tag"
                data-field="name"
              />
              <template #tag="{ data }" class="custom-action">
                <div class="custom-action" v-if="data.data.__typename">
                  <employee-info
                    :idEmployee="+data.data.employeeId"
                    :name="data.data.name"
                    :idCardNumber="data.data.residentId"
                    :status="data.data.status"
                    :foreigner="data.data.foreigner"
                    :checkStatus="false"
                  />
                </div>
                <div class="custom-action" v-else>
                  <employee-info
                    :idEmployee="+data.data.employeeId"
                    :name="data.data.name"
                    :status="data.data.status"
                    :foreigner="data.data.foreigner"
                    :checkStatus="false"
                  />
                </div>
              </template>
              <DxColumn
                caption="주민등록번호"
                data-field="residentId"
                cell-template="resident-id"
                width="150"
              />
              <template #resident-id="{ data }" class="custom-action">
                <div v-if="data.data.residentId?.length == 14">
                  <a-tooltip
                    placement="top"
                    v-if="
                      parseInt(data.data.residentId.split('-')[0].slice(2, 4)) < 13
                        && parseInt(data.data.residentId.split('-')[0].slice(4, 6)) < 32
                    "
                    key="black"
                  >
                    {{ data.data?.residentId }}
                  </a-tooltip>
                  <a-tooltip placement="top" v-else title="ERROR" color="red">
                    {{ data.data?.residentId }}
                  </a-tooltip>
                </div>
                <div v-else>
                  <a-tooltip placement="top" key="black">
                    {{ data?.data?.residentId?.slice(0, 6) + "-" + data?.data.residentId?.slice(6, 13) }}
                  </a-tooltip>
                </div>
              </template>
              <DxColumn
                caption="소득구분"
                cell-template="grade-cell"
                width="300"
                data-field="TypeCodeAndName"
                :calculateCellValue="calculateIncomeTypeCodeAndName" 
              />
              <template #grade-cell="{ data }" class="custom-action">
                <income-type
                  :typeCode="data.data.incomeTypeCode"
                  :typeName="data.data.incomeTypeName"
                />
              </template>
              <DxColumn :width="50" cell-template="popup" />
              <template #popup="{ data }" class="custom-action">
                <div class="custom-action" style="text-align: center">
                  <a-tooltip
                    placement="top"
                    v-if="data.data.deletable == true"
                    @click="actionDelete(data.data.employeeId,data.data.incomeTypeCode)"
                  >
                    <template #title>변경이력</template>
                    <DeleteOutlined />
                  </a-tooltip>
                </div>
              </template>
            </DxDataGrid>
            <div class="pagination-table" v-if="rowTable > originData.rows">
              <a-pagination
                v-model:current="originData.page"
                v-model:page-size="originData.rows"
                :total="rowTable"
                show-less-items
                style="margin-top: 10px"
              />
            </div>
          </a-spin>
        </a-col>
        <!-- section right -->
        <a-col :span="9" class="custom-layout">
          <a-spin :spinning="loadingUpdate || loadingCreated" size="large">
            <standard-form formName="pa-610" ref="formRef">
              <a-form-item label="코드" label-align="right" class="red">
                <div class="custom-note">
                  <text-number-box
                    width="200px"
                    v-model:valueInput="dataShow.employeeId"
                    placeholder="숫자만 입력 가능"
                    :disabled="!isNewRow"
                    :required="true"
                  />
                  <span>
                    <img
                      src="@/assets/images/iconInfo.png"
                      style="width: 14px"
                    />
                    최초 저장된 이후 수정 불가
                  </span>
                </div>
              </a-form-item>
              <a-form-item label="성명(상호)" label-align="right" class="red">
                <default-text-box
                  v-model:valueInput="dataShow.name"
                  width="200px"
                  placeholder="한글,영문(대문자) 입력 가능"
                  :required="true"
                />
              </a-form-item>
              <a-form-item label="내/외국인" label-align="right" class="red">
                <radio-group
                  :arrayValue="arrForeigner"
                  width="200px"
                  v-model:valueRadioCheck="dataShow.foreigner"
                  layoutCustom="horizontal"
                  @update:valueRadioCheck="changeRadioForeigner"
                />
              </a-form-item>
              <a-form-item
                label="외국인 국적"
                label-align="right"
                :class="!dataShow.foreigner ? '' : 'red'"
              >
                <country-code-select-box
                  v-if="dataShow.foreigner"
                  v-model:valueCountry="dataShow.nationalityCode"
                  @textCountry="changeTextCountry"
                  width="200px"
                  :hiddenOptionKR="true"
                  :required="true"
                />
                <country-code-select-box
                  v-else
                  v-model:valueCountry="dataShow.nationalityCode"
                  @textCountry="changeTextCountry"
                  width="200px"
                  :disabled="true"
                  :required="true"
                />
              </a-form-item>
              <a-form-item
                label="외국인 체류자격"
                label-align="right"
                :class="!dataShow.foreigner ? '' : 'red'"
              >
                <stay-qualification-select-box
                  :disabled="!dataShow.foreigner"
                  :required="dataShow.foreigner"
                  v-model:valueStayQualifiction="dataShow.stayQualification"
                  width="200px"
                />
              </a-form-item>
              <a-form-item
                :label="textResidentId"
                label-align="right"
                class="red"
              >
                <id-number-text-box
                  v-model:valueInput="dataShow.residentId"
                  width="200px"
                  placeholder="숫자 13자리"
                  :required="true"
                  :disabled="!isNewRow && !dataShow.deletable"
                />
              </a-form-item>
              <a-form-item label="소득구분" label-align="right" class="red">
                <type-code-select-box
                  width="200px"
                  v-model:valueInput="dataShow.incomeTypeCode"
                  @textTypeCode="changeTextTypeCode"
                  :disabled="!isNewRow"
                />
              </a-form-item>
              <a-form-item label="이메일" label-align="right">
                <div class="custom-note">
                  <mail-text-box
                    width="300px"
                    v-model:valueInput="dataShow.email"
                    placeholder="abc@example.com"
                  />
                  <span>
                    <img
                      src="@/assets/images/iconInfo.png"
                      style="width: 14px"
                    />
                    원천징수영수증 등 주요 서류를 메일로 전달 가능합니다.
                  </span>
                </div>
              </a-form-item>
              <a-row class="mt-25">
                <a-col :span="8" :offset="8" style="text-align: center">
                  <button-basic
                    text="저장"
                    type="default"
                    mode="contained"
                    :width="90"
                    id="btn-save"
                    @onClick="saving()"
                  />
                </a-col>
              </a-row>
            </standard-form>
          </a-spin>
        </a-col>
      </a-row>
    </div>
  </div>
  <PopupMessage :modalStatus="isDiscardDelete" @closePopup="isDiscardDelete = false" typeModal="confirm" :content="contentDelete" okText="네. 삭제합니다" cancelText="아니요" @checkConfirm="handleDelete"
  />
  <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="popupDataHistory" title="변경이력" typeHistory="pa-610"
  />
  <PopupMessageCustom :modalStatus="isDiscard" @closePopup="handleDiscardPopup" :typeModal="'confirm'" :title="Message.getCommonMessage('501').message" content="" okText="네" cancelText="아니요" @checkConfirm="handleConfirm"
  />
</template>
<script lang="ts">
import queries from "@/graphql/queries/PA/PA6/PA610/index";
import notification from "@/utils/notification";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { DxColumn, DxDataGrid, DxEditing, DxExport, DxGrouping, DxItem, DxPaging, DxScrolling, DxSearchPanel, DxSelection, DxToolbar } from "devextreme-vue/data-grid";
import { FocusedRowChangedEvent, FocusedRowChangingEvent } from "devextreme/ui/data_grid";
import { computed, defineComponent, reactive, ref, watchEffect, watch } from "vue";
import { useStore } from "vuex";

import HistoryPopup from "@/components/HistoryPopup.vue";
import Tooltip from "@/components/common/Tooltip.vue";
import { Message } from "@/configs/enum";
import mutations from "@/graphql/mutations/PA/PA6/PA610/index";
import { companyId, onExportingCommon } from "@/helpers/commonFunction";
import { compareObject } from "@/utils";
import {
DeleteOutlined, EditOutlined, HistoryOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined, PrinterOutlined, SaveOutlined, SearchOutlined,
} from "@ant-design/icons-vue";
import DxButton from "devextreme-vue/button";
import { Store } from "devextreme/data";
import DataSource from "devextreme/data/data_source";
import PopupMessageCustom from "./components/PopupMessageCustom.vue";
import { ArrForeigner, origindata, valueDefaultAction } from "./utils";

export default defineComponent({
  name: 'MyForm',
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxScrolling,
    DxSelection,
    DxExport,
    DxSearchPanel,
    EditOutlined,
    HistoryOutlined,
    DxToolbar,
    DxEditing,
    DxGrouping,
    DxItem,
    SearchOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MailOutlined,
    PrinterOutlined,
    DeleteOutlined,
    SaveOutlined,
    ArrForeigner,
    DxButton,
    HistoryPopup,
    PopupMessageCustom,
    Tooltip,
    PlusOutlined,
},
  setup() {
    const contentDelete ='선택된 소득자의 해당 원천년도에 소득 내역들이 있다면 삭제불가하며, 삭제한 후 복구불가합니다. 그래도 삭제하시겠습니까?';

    const store = useStore();
    const per_page = computed(() => store.state.settings.per_page);
    const move_column = computed(() => store.state.settings.move_column);
    const column_resize = computed(() => store.state.settings.column_resize);
    const rowTable = ref(0);
    const originData = reactive({ ...origindata, rows: per_page });
    const arrForeigner = ArrForeigner;
    const globalYear = computed(() => store.state.settings.globalYear);

    // Ref
    const formWrapper = ref(null)
    const isDiscard = ref(false); // verify popup discard 
    const formRef = ref(); // ref of form
    const gridRef = ref(); // ref of grid
    const isNewRow = ref(false); // check if new row is adding
    const focusedRowKey = ref<number>(0); // focused row key
    let previousRowData = ref(); // save previous row data when focus row change
    const dataShow: any = ref({ ...valueDefaultAction }); // data show in form when click row or add new row
    const selectRowKeyAction = ref<number>(0); // key of row selected in gridData
    const dataSource = ref<DataSource>(); // data source of grid
    const popupDataHistory = ref([]); // data for history popup
    const modalHistoryStatus = ref<boolean>(false); // status of history popup
    const trigger = ref<boolean>(true); // trigger for call api

    let valueCallApiGetEmployeeBusiness: any = reactive({
      companyId: companyId,
      imputedYear: globalYear,
      incomeTypeCode: "",
      employeeId: null,
    });

    const disabledInput2 = ref(true);
    const isDiscardDelete = ref(false);
    const textResidentId = ref("주민등록번호");
    
    const dataGridRef = computed(function () {
      return gridRef.value?.instance as any;
    }); // ref of grid Instance

    // Watch listen dataShow change and change dataShow.name to uppercase

    watchEffect(() => {
      dataShow.value.name = dataShow.value.name?.toUpperCase() ?? '';
    });
    watch(globalYear, () => {
      selectRowKeyAction.value = 0;
      previousRowData.value = {...valueDefaultAction};
      focusedRowKey.value = 0;
      // dataGridRef.value?.refresh();
      formRef.value.resetValidate()
      isNewRow.value = false
      dataShow.value = valueDefaultAction;
    });

    // ================GRAPHQL==============================================
    const valueCallApiGetEmployeeBusinesses = reactive({
      companyId: companyId,
      imputedYear: globalYear,
    });
    const {
      refetch: refetchData,
      loading: loadingGetEmployeeBusinesses,
      onError: errorGetEmployeeBusinesses,
      onResult: resEmployeeBusinesses,
    } = useQuery( queries.getEmployeeBusinesses, valueCallApiGetEmployeeBusinesses, () => ({
        enabled: trigger.value,
        fetchPolicy: "no-cache",
      })
    );
    resEmployeeBusinesses((res) => {
      // because key is number, so i create new key from residentId
      const data = res.data.getEmployeeBusinesses?.map((i: any) => ({
        ...i,
        key: i.residentId
      })) ?? [];
      dataSource.value = new DataSource({
        store: {
          type: "array",
          data: data as Array<any>,
          key: "key",
        },
        requireTotalCount: true,
      });
    });

    // To listen for changes in variable `dataSource` and update the interface accordingly, you can use watch in Vue.
    const storeDataSourceCount = computed(() => dataSource.value ? dataSource.value?.totalCount(): 0);
    // get store data
    const storeDataSource = computed(() => dataSource.value?.store() as Store);

    // ================FUNCTION============================================

    // handle add row
    const addRow = () => {
      if (!isNewRow.value) {
        // When there is no row created yet and you are focusing on one row,
        // compare 2 values to check and open a popup.
        if (previousRowData.value && !compareObject(previousRowData.value, dataShow.value)) {
          isDiscard.value = true;
        } else {
        // create new row
          storeDataSource.value.insert(valueDefaultAction).then((result) => {
            focusedRowKey.value = 0;
            dataShow.value = result;
            previousRowData.value = { ...result };
            dataGridRef.value?.refresh();
            formRef.value.resetValidate()
          });
        }
        isNewRow.value = true;
      } else {
         if (previousRowData.value && !compareObject(previousRowData.value, dataShow.value)) {
          isDiscard.value = true;
        }
      }
    };
    // TODO handle onFocusedRowChanging to row
    const onFocusedRowChanging = (e: FocusedRowChangingEvent) => {
      // create new row and click row other then check data input
      if (isNewRow.value) {
        focusedRowKey.value = 0;
        if (e.rows[e.newRowIndex].key === 0) return;
        // when isNewRow and click row other then check data input
        if (compareObject(dataShow.value, valueDefaultAction)) {
          storeDataSource.value.remove(0).then(() => {
            storeDataSource.value
              .byKey(e.rows[e.newRowIndex].key)
              .then((value) => {
                // dataShow.value = value;
                previousRowData.value = { ...dataShow.value };
              });
            dataGridRef.value?.refresh();
            isNewRow.value = false;
          });
        } else {
          selectRowKeyAction.value = e.rows[e.newRowIndex].key;
          previousRowData.value = { ...e.rows[e.newRowIndex].data };
          isDiscard.value = true;
          e.cancel = true;
        }
      } else {
        // new row is not adding, check data input not change then not handle onFocusedRowChanged
        if (focusedRowKey.value === e.rows[e.newRowIndex].key) {
          e.cancel = true;
          return;
        }
        if (
          focusedRowKey.value !== e.rows[e.newRowIndex].key &&
          previousRowData.value &&
          !compareObject(dataShow.value, previousRowData.value)
        ) {
          isDiscard.value = true;
          selectRowKeyAction.value = e.rows[e.newRowIndex].key;
          e.cancel = true;
        } else {
          selectRowKeyAction.value = e.rows[e.newRowIndex].key;
        }
      }
    };

    // handle onFocusedRowChanged to row, function run then auto set focusedRowKey
    const onFocusedRowChanged = (e: FocusedRowChangedEvent) => {
      dataShow.value = e.row?.data;
      previousRowData.value = { ...e.row?.data };
    };

    // // handle onClick to row
    // const onRowClick = (e: RowClickEvent) => {
    // };
    // handle cancel popup
    const handleDiscardPopup = (e: boolean) => {
      isDiscard.value = e;
      if (isNewRow.value) {
          formRef.value.resetValidate()
        // when have new row and click row other then discard
        if (focusedRowKey.value === 0) {
          storeDataSource.value.remove(0).then(() => {
            focusedRowKey.value = selectRowKeyAction.value;
            dataShow.value = { ...previousRowData.value };
            dataGridRef.value?.refresh();
          });
          isNewRow.value = false;
        } else {
          // when change other row and want to add row
          storeDataSource.value.insert(valueDefaultAction).then((result) => {
            formRef.value.resetValidate()
            selectRowKeyAction.value = 0;
            focusedRowKey.value = 0;
            dataShow.value = result;
            dataGridRef.value?.refresh();
          });
        }
      } else {
        storeDataSource.value
          .update(previousRowData.value.key, previousRowData.value)
          .then((value) => {
            focusedRowKey.value = selectRowKeyAction.value || 0;
            storeDataSource.value.byKey(selectRowKeyAction.value).then((value) => {
              dataShow.value = value;
            });
            dataGridRef.value?.refresh();
          });
      }
    };

    errorGetEmployeeBusinesses((res) => {
      notification("error", res.message);
    });

    const {
      mutate: actionUpdate,
      onError: updateError,
      loading: loadingUpdate,
      onDone: updateDone,
    } = useMutation(mutations.updateEmployeeBusiness);
    updateDone(() => {
      valueCallApiGetEmployeeBusiness.incomeTypeCode =
      dataShow.value.incomeTypeCode;
      valueCallApiGetEmployeeBusiness.employeeId = dataShow.value.employeeId;
      previousRowData.value = { ...dataShow.value };
      // update when click discard
      if (!isNewRow.value) {
        focusedRowKey.value = selectRowKeyAction.value;
      } else {
        storeDataSource.value.insert(valueDefaultAction).then((result) => {
          formRef.value.resetValidate()
          focusedRowKey.value = 0;
          dataShow.value = result;
          previousRowData.value = { ...result };
          dataGridRef.value?.refresh();
        });
      }
      isDiscard.value = false;
      notification("success", Message.getCommonMessage('106').message);
    });
    updateError((res) => {
      if (isDiscard.value) {
        isDiscard.value = false;
      }
      notification("error", res.message);
    });
    const {
      mutate: actionCreated,
      onError: createdErr,
      loading: loadingCreated,
      onDone: createdDone,
    } = useMutation(mutations.createEmployeeBusiness);
    createdDone(async (res) => {
      isNewRow.value = false;
      
      focusedRowKey.value = res.data.createEmployeeBusiness.residentId;
      selectRowKeyAction.value = res.data.createEmployeeBusiness.residentId;
      valueCallApiGetEmployeeBusiness.incomeTypeCode =
        dataShow.value.incomeTypeCode;
      valueCallApiGetEmployeeBusiness.employeeId = parseInt(
        dataShow.value.employeeId
      );
      previousRowData.value = { ...dataShow.value };
      await refetchData();
      notification("success", `업데이트 완료!`);
    });
    createdErr((res) => {
      notification("error", res.message);
    });
    const {
      mutate: actionDeleteApi,
      onError: deleteError,
      loading: loadingDelete,
      onDone: deleteDone,
    } = useMutation(mutations.deleteEmployeeBusiness);
    deleteError((res) => {
      notification("error", res.message);
    });
    deleteDone(() => {
      // previousRowData.value = { ...dataShow.value };
      storeDataSource.value.remove(previousRowData.value.key).then((val) => {
        dataShow.value = { ...valueDefaultAction };
        previousRowData.value = { ...valueDefaultAction };
        refetchData()
        isDiscard.value = false;
      });
      formRef.value.resetValidate()

      notification("success", `업데이트 완료!`);
    });

    const onExporting = (e: any) => {
      onExportingCommon(e.component, e.cancel, "영업자관리");
    };

    const changeTextCountry = (text: any) => {
      dataShow.value.nationality = text;
    };
    const changeTextTypeCode = (text: any) => {
      dataShow.value.incomeTypeName = text;
    };
    const changeRadioForeigner = (value: Boolean) => {
        if(value === false) {
          dataShow.value.nationality = '대한민국'
          dataShow.value.nationalityCode = 'KR'
        } else {
          if(isNewRow.value) {
            dataShow.value.nationality = ''
            dataShow.value.nationalityCode = ''
          } else {
            dataShow.value.nationality = previousRowData.value.nationality
            dataShow.value.nationalityCode = previousRowData.value.nationalityCode
          }
        }
    }
    const dataUpdate = computed(() => {
      let residentId = dataShow.value.residentId.replace("-", "");
      return {
        companyId: companyId,
        imputedYear: globalYear.value,
        employeeId: parseInt(
          dataShow.value.employeeId ? dataShow.value.employeeId : ""
        ),
        incomeTypeCode: dataShow.value.incomeTypeCode,
        input: {
          name: dataShow.value.name,
          foreigner: dataShow.value.foreigner,
          nationality: dataShow.value.nationality,
          nationalityCode: dataShow.value.nationalityCode,
          stayQualification: dataShow.value.stayQualification,
          residentId: residentId.slice(0, 6) + "-" + residentId.slice(6, 13),
          email: dataShow.value.email,
          incomeTypeName: dataShow.value.incomeTypeName,
        },
      };
    });
    const saving = () => {
      const res = formRef.value.validate();
      if (!res.isValid) {
        isDiscard.value = false;
        // focusedRowKey.value = previousRowData.value.key;
        res.brokenRules[0].validator.focus();
        isDiscard.value = false;  
      } else {
        // if form disabled => action edit
        if (focusedRowKey && focusedRowKey.value !== 0) {
          actionUpdate(dataUpdate.value);
        } else {
          // if form disabled => action add
          if(isDiscard.value) return
          const newDateCreate = {
            companyId: companyId,
            imputedYear: globalYear.value,
            input: {
              name: dataShow.value.name,
              foreigner: dataShow.value.foreigner,
              nationality: dataShow.value.nationality,
              nationalityCode: dataShow.value.nationalityCode,
              stayQualification: dataShow.value.stayQualification,
              residentId: dataShow.value.residentId.slice(0, 6) + "-" + dataShow.value.residentId.slice(6, 13),
              email: dataShow.value.email,
              employeeId: parseInt(
                dataShow.value.employeeId ? dataShow.value.employeeId : ""
              ),
              incomeTypeCode: dataShow.value.incomeTypeCode,
              incomeTypeName: dataShow.value.incomeTypeName,
            },
          };
          actionCreated(newDateCreate);
        }
      }
    };
    const handleConfirm = async (e: any) => {
      if (e) {
        const btn = document.querySelector('#btn-save') as HTMLButtonElement
        if(btn) btn.click()

      }
    };
    const actionDelete = (employeeId: any, incomeTypeCode: any) => {
      valueCallApiGetEmployeeBusiness.incomeTypeCode = incomeTypeCode;
      valueCallApiGetEmployeeBusiness.employeeId = employeeId;
      isDiscardDelete.value = true;
    };
    const handleDelete = (res: any) => {
      if (res) actionDeleteApi(valueCallApiGetEmployeeBusiness);
    };
    const modalHistory = () => (modalHistoryStatus.value = true);
    function calculateIncomeTypeCodeAndName(rowData: any) {
            return rowData.incomeTypeCode + ' ' + rowData.incomeTypeName;
        }

    return {
      store,
      focusedRowKey,
      isDiscard,
      textResidentId,
      disabledInput2,
      popupDataHistory,
      modalHistoryStatus,
      loadingCreated,
      arrForeigner,
      rowTable,
      dataSource,
      per_page,
      move_column,
      column_resize,
      originData,
      loadingUpdate,
      loadingDelete,
      isDiscardDelete,
      contentDelete,
      handleConfirm,
      handleDelete,
      actionDelete,
      changeTextTypeCode,
      onExporting,
      changeTextCountry,
      modalHistory,
      saving,
      dataShow,
      isNewRow,
      handleDiscardPopup,
      gridRef,
      addRow,
      storeDataSourceCount,
      onFocusedRowChanged,
      onFocusedRowChanging,
      loadingGetEmployeeBusinesses,
      formRef,
      Message,
      // onRowClick,
      formWrapper,
      changeRadioForeigner,
      calculateIncomeTypeCodeAndName
    };
  },
});
</script>
<style scoped lang="scss" src="./style/style.scss"></style>
<!-- Flow
  onFocusedRowChanging -> onFocusedRowChanged ->  onRowClick ->
-->
