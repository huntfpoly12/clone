<template>
  <action-header title="사업소득자등록" @actionSave="saving()" :buttonSave="true" />
  <div id="pa-610">
    <div class="page-content">
      <a-row :gutter="[24, 0]" style="margin: 0; ">
        <a-col :span="16">
          <div style="height: 100%; border: 1px solid #d7d7d7">
            <a-spin :spinning="loadingGetEmployeeBusinesses || loadingUpdate || loadingDelete
              " size="large">
              <DxDataGrid ref="gridRef" :show-row-lines="true" :hoverStateEnabled="true" :dataSource="dataSource"
                :show-borders="true" key-expr="key" :allow-column-reordering="move_column"
                :allow-column-resizing="column_resize" :focused-row-enabled="true"
                @focused-row-changing="onFocusedRowChanging" @focused-row-changed="onFocusedRowChanged"
                v-model:focused-row-key="focusedRowKey" :focusedRowIndex="0" noDataText="내역이 없습니다"
                style="height: calc(100vh - 160px);">
                <DxPaging :page-size="0" />
                <DxScrolling mode="standard" show-scrollbar="always" />
                <DxSearchPanel :visible="true" :highlight-case-sensitive="true"
                  :search-visible-columns="['TypeCodeAndName']" placeholder="검색" />
                <DxExport :enabled="true" />
                <DxToolbar>
                  <DxItem template="total-user" location="before" />
                  <DxItem name="searchPanel" />
                  <DxItem name="exportButton" css-class="cell-button-export" />
                  <DxItem location="after" template="button-history" css-class="cell-button-add" />
                  <DxItem location="after" css-class="cell-button-add">
                    <DxButton icon="plus" @click="!isDataInvalidAttributionYear && addRow()">
                      <a-tooltip color="black" placement="top">
                        <template #title>신규</template>
                        <PlusOutlined style="font-size: 16px" />
                      </a-tooltip>
                    </DxButton>
                  </DxItem>
                  <DxItem name="addRowButton" show-text="always" />
                </DxToolbar>
                <template #total-user>
                  <div class="total-user">
                    <span>{{ storeDataSourceCount }}</span>
                    <span>전체</span>
                    <img src="@/assets/images/user.svg" />
                  </div>
                </template>
                <template #button-history style="border-color: #ddd">
                  <DxButton icon="plus">
                    <HistoryOutlined style="font-size: 18px" @click="modalHistory" />
                  </DxButton>
                </template>
                <DxColumn caption="성명 (상호)" cell-template="tag" data-field="name" />
                <template #tag="{ data }" class="custom-action">
                  <div class="custom-action">
                    <employee-info :idEmployee="+data.data.employeeId" :name="data.data.name"
                      :idCardNumber="data.data.residentId" :status="data.data.status" :foreigner="data.data.foreigner"
                      :checkStatus="false" />
                  </div>
                </template>
                <DxColumn caption="주민등록번호" data-field="residentId" cell-template="resident-id" width="150" />
                <template #resident-id="{ data }" class="custom-action">
                  <resident-id :residentId="data.data.residentId"></resident-id>
                </template>
                <DxColumn caption="소득구분" cell-template="grade-cell" width="300" data-field="TypeCodeAndName"
                  :calculateCellValue="calculateIncomeTypeCodeAndName" />
                <template #grade-cell="{ data }" class="custom-action">
                  <income-type :typeCode="data.data.incomeTypeCode" :typeName="data.data.incomeTypeName" />
                </template>
                <DxColumn :width="50" cell-template="popup" />
                <template #popup="{ data }" class="custom-action">
                  <div class="custom-action" style="text-align: center">
                    <a-tooltip placement="top" v-if="data.data.deletable == true"
                      @click="actionDelete(data.data.employeeId, data.data.incomeTypeCode)" title="">
                      <DeleteOutlined />
                    </a-tooltip>
                  </div>
                </template>
              </DxDataGrid>
            </a-spin>
          </div>

        </a-col>
        <!-- section right -->
        <a-col :span="8" class="custom-layout"
          :style="(storeDataSourceCount === 0 && !isNewRow || isDataInvalidAttributionYear) && 'pointer-events: none;'">
          <a-spin :spinning="loadingUpdate || loadingCreated" size="large">
            <standard-form formName="pa-610" ref="formRef">
              <a-form-item label="코드" label-align="right">
                <div class="d-flex-center">
                  <text-number-box width="200px" v-model:valueInput="dataShow.employeeId" placeholder="" disabled />
                </div>
              </a-form-item>
              <a-form-item label="성명(상호)" label-align="right" class="red">
                <default-text-box v-model:valueInput="dataShow.name" width="200px" placeholder="한글,영문(대문자) 입력 가능"
                  :required="true" />
              </a-form-item>
              <a-form-item label="내/외국인" label-align="right" class="red">
                <radio-group :arrayValue="arrForeigner" width="200px" :disabled="!dataShow.deletable && !isNewRow"
                  v-model:valueRadioCheck="dataShow.foreigner" layoutCustom="horizontal"
                  @update:valueRadioCheck="changeRadioForeigner" />
              </a-form-item>
              <a-form-item label="외국인 국적" label-align="right" :class="!dataShow.foreigner ? '' : 'red'">
                <country-code-select-box v-if="dataShow.foreigner" v-model:valueCountry="dataShow.nationalityCode"
                  @textCountry="changeTextCountry" width="200px" :hiddenOptionKR="true" :required="true" />
                <DxSelectBox v-else :data-source="[{ key: 'KR', value: '대한민국' }]" :value="'KR'" field-template="field"
                  value-expr="key" display-expr="value" :required="true" :disabled="true" width="200px"
                  item-template="item">
                  <template #field="{ data }">
                    <div class="d-flex-center ml-5">
                      <a-tag color="default">{{ data.key }}</a-tag>
                      <div>
                        <DxTextBox :value="data && data.value" :read-only="true" class="product-name" />
                      </div>
                    </div>
                  </template>
                </DxSelectBox>
              </a-form-item>
              <a-form-item label="외국인 체류자격" label-align="right" :class="!dataShow.foreigner ? '' : 'red'">
                <stay-qualification-select-box :disabled="!dataShow.foreigner" :required="dataShow.foreigner"
                  v-model:valueStayQualifiction="dataShow.stayQualification" width="200px" />
              </a-form-item>
              <a-form-item :label="dataShow.foreigner ? '외국인번호 유효성' : '주민등록번호'" label-align="right" class="red">
                <!-- :disabled="!isNewRow && !dataShow.deletable" -->
                <id-number-text-box v-model:valueInput="dataShow.residentId" width="200px" placeholder="숫자 13자리"
                  :required="true" :disabled="!dataShow.deletable && !isNewRow" :foreigner="dataShow.foreigner" />
              </a-form-item>
              <a-form-item label="소득구분" label-align="right" class="red">
                <type-code-select-box width="200px" v-model:valueInput="dataShow.incomeTypeCode"
                  @textTypeCode="changeTextTypeCode" :disabled="!isNewRow" required/>
              </a-form-item>
              <a-form-item label="이메일" label-align="right">
                <div class="d-flex-center">
                  <mail-text-box width="200px" v-model:valueInput="dataShow.email" placeholder="abc@example.com" />
                  <info-tool-tip class="ml-5">
                    원천징수영수증 등 주요 서류를 메일로 전달 가능합니다.
                  </info-tool-tip>
                </div>
              </a-form-item>
              <a-row class="mt-25">
                <a-col :span="8" :offset="8" style="text-align: center">
                  <button-basic text="저장" type="default" mode="contained" :width="90" id="btn-save" @onClick="saving()"
                    :disabled="storeDataSourceCount === 0 && !isNewRow" />
                </a-col>
              </a-row>
            </standard-form>
          </a-spin>
        </a-col>
      </a-row>
    </div>
  </div>
  <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="popupDataHistory"
    title="변경이력" typeHistory="pa-610" />
  <PopupMessageCustom :modalStatus="isDiscard" @closePopup="handleDiscardPopup" :typeModal="'confirm'"
    :title="Message.getCommonMessage('501').message" content="" okText="네" cancelText="아니요"
    @checkConfirm="handleConfirm" />
</template>
<script lang="ts">
import queries from "@/graphql/queries/PA/PA6/PA610/index";
import notification from "@/utils/notification";
import { useMutation, useQuery } from "@vue/apollo-composable";
import {
  DxColumn,
  DxDataGrid,
  DxScrolling,
  DxEditing,
  DxExport,
  DxGrouping,
  DxItem,
  DxPager,
  DxPaging,
  DxSearchPanel,
  DxSelection,
  DxToolbar
} from "devextreme-vue/data-grid";
import DxSelectBox from "devextreme-vue/select-box";

import { FocusedRowChangedEvent, FocusedRowChangingEvent } from "devextreme/ui/data_grid";
import { computed, defineComponent, reactive, ref, watch, watchEffect } from "vue";
import { useStore } from "vuex";

import HistoryPopup from "@/components/HistoryPopup.vue";
import { Message } from "@/configs/enum";
import mutations from "@/graphql/mutations/PA/PA6/PA610/index";
import { companyId, onExportingCommon } from "@/helpers/commonFunction";
import isEqual from "lodash/isEqual";

import {
  DeleteOutlined,
  EditOutlined,
  HistoryOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  PrinterOutlined,
  SaveOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import DxButton from "devextreme-vue/button";
import { Store } from "devextreme/data";
import DataSource from "devextreme/data/data_source";
import PopupMessageCustom from "./components/PopupMessageCustom.vue";
import { ArrForeigner, valueDefaultAction } from "./utils";
import { FormStatus } from "@/store/settingModule/types";
import DxTextBox from "devextreme-vue/text-box";
import dayjs from "dayjs";
import deletePopup from "@/utils/deletePopup";
import { h } from "vue";
import cloneDeep from "lodash/cloneDeep";

export default defineComponent({
  name: 'MyForm',
  components: {
    DxDataGrid, DxScrolling,
    DxColumn,
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
    PlusOutlined,
    DxPaging,
    DxPager,
    DxSelectBox,
    DxTextBox
  },
  setup() {

    const contentDelete = h('div', [h('div', '선택된 소득자의 해당 원천년도에 소득 내역들이 있다면 삭제불가하며,'), h('div', '삭제한 후 복구불가합니다. 그래도 삭제하시겠습니까?')])
    const arrForeigner = ArrForeigner;

    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const column_resize = computed(() => store.state.settings.column_resize);
    const paYear = computed(() => Number(sessionStorage.getItem("paYear")) || dayjs().year())
    const dataGridRef = computed(() => gridRef.value?.instance as any); // ref of grid Instance

    // Ref
    const formWrapper = ref(null)
    const isDiscard = ref(false); // verify popup discard
    const formRef = ref(); // ref of form
    const gridRef = ref(); // ref of grid
    const isNewRow = ref(false); // check if new row is adding
    const isClickAddRow = ref(false); // check if click add row
    const focusedRowKey = ref<number>(0); // focused row key
    let previousRowData = ref(); // save previous row data when focus row change
    const dataShow: any = ref({ ...valueDefaultAction }); // data show in form when click row or add new row
    const selectRowKeyAction = ref<number>(0); // key of row selected in gridData
    const dataSource = ref<DataSource>(); // data source of grid
    const popupDataHistory = ref([]); // data for history popup
    const modalHistoryStatus = ref<boolean>(false); // status of history popup
    const trigger = ref<boolean>(true); // trigger for call api
    const storeDataSourceCount = ref(0) // count of store data source
    const isDataInvalidAttributionYear = ref(false) // check if data invalid attribution year

    let valueCallApiGetEmployeeBusiness: any = reactive({
      companyId: companyId,
      imputedYear: paYear,
      employeeId: null,
    });

    const disabledInput2 = ref(true);
    const isDiscardDelete = ref(false);


    // Watch listen dataShow change and change dataShow.name to uppercase

    watchEffect(() => {
      dataShow.value.name = dataShow.value.name?.toUpperCase() ?? '';
    });



    // watch listen dataSource and paYear change then change focusedRowKey
    watch([dataSource, paYear], async (newVal, oldValue) => {
      if (newVal[0]?.isLoaded() && newVal[1] !== oldValue[1]) {
        // focusedRowKey.value = newVal[0]?.items()[0]?.residentId || 0;
        storeDataSourceCount.value = newVal[0]?.totalCount() || 0
      }
    }, { deep: true });
    // Watch resultGetEmployeeBusinesses


    // ================GRAPHQL==============================================
    const valueCallApiGetEmployeeBusinesses = reactive({
      companyId: companyId,
      imputedYear: paYear,
    });
    const resetForm = () => {
      formRef.value.resetValidate();
      previousRowData.value = { ...valueDefaultAction };
      dataShow.value = cloneDeep(valueDefaultAction);
    }
    const {
      refetch: refetchData,
      loading: loadingGetEmployeeBusinesses,
      onError: errorGetEmployeeBusinesses,
      onResult: resEmployeeBusinesses,
      result: resultGetEmployeeBusinesses,
    } = useQuery(queries.getEmployeeBusinesses, valueCallApiGetEmployeeBusinesses, () => ({
      enabled: trigger.value,
      fetchPolicy: "no-cache",
    })
    );
    // watch listen paYear change then focus first row
    watch(paYear, async (newVal, oldValue) => {
      if (newVal !== oldValue) {
        focusedRowKey.value = resultGetEmployeeBusinesses.value?.getEmployeeBusinesses[0]?.residentId || 0;
      }
    }, { deep: true });
    resEmployeeBusinesses((res) => {
      if (isDataInvalidAttributionYear.value) {
        focusedRowKey.value = 0;
        isDataInvalidAttributionYear.value = false
      }
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
      });
      storeDataSourceCount.value = data.length;
      if (data.length === 0) {
        resetForm()
      }
      isNewRow.value = false
    });
    // get store data
    const storeDataSource = computed(() => dataSource.value?.store() as Store);

    // ================FUNCTION============================================

    // handle add row
    const addRow = () => {
      if (!isNewRow.value) {
        // When there is no row created yet and you are focusing on one row,
        // compare 2 values to check and open a popup.
        if (previousRowData.value && !isEqual(previousRowData.value, dataShow.value)) {
          isDiscard.value = true;
        } else {
          // create new row
          addNewRow()
        }
      } else {
        if (previousRowData.value && !isEqual(previousRowData.value, dataShow.value)) {
          selectRowKeyAction.value = 0
          isClickAddRow.value = true;
          isDiscard.value = true;
        }
      }
      isNewRow.value = true;
    };
    // handle onFocusedRowChanging to row
    const onFocusedRowChanging = (e: FocusedRowChangingEvent) => {
      // create new row and click row other then check data input
      const rowElement = document.querySelector(`[aria-rowindex="${e.newRowIndex + 1}"]`)
      if (isNewRow.value) {
        focusedRowKey.value = 0;
        if (e.rows[e.newRowIndex].key === 0) return;
        // when isNewRow and click row other then check data input
        if (isEqual(dataShow.value, valueDefaultAction)) {
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
          rowElement?.classList.add("dx-state-hover-custom")
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
          !isEqual(dataShow.value, previousRowData.value)
        ) {
          rowElement?.classList.add("dx-state-hover-custom")
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
      selectRowKeyAction.value = e.row?.key ?? 0;
      dataShow.value = e.row?.data;
      previousRowData.value = { ...e.row?.data };
    };

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
            isNewRow.value = false;
            isClickAddRow.value && addNewRow()
          });
        } else {
          storeDataSource.value.update(previousRowData.value.key, previousRowData.value)
          // when change other row and want to add row
          addNewRow()
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
      resetForm()
      storeDataSourceCount.value = 0;
      dataSource.value = new DataSource({
        store: {
          type: "array",
          data: [],
          key: "key",
        },
      });
      isDataInvalidAttributionYear.value = true
      notification("error", res.message);
    });

    const {
      mutate: actionUpdate,
      onError: updateError,
      loading: loadingUpdate,
      onDone: updateDone,
    } = useMutation(mutations.updateEmployeeBusiness);
    updateDone((res) => {
      valueCallApiGetEmployeeBusiness.incomeTypeCode = dataShow.value.incomeTypeCode;
      valueCallApiGetEmployeeBusiness.employeeId = dataShow.value.employeeId;
      previousRowData.value = { ...dataShow.value };
      // update when click discard
      if (!isNewRow.value) {
        focusedRowKey.value = selectRowKeyAction.value;
      } else {
        storeDataSource.value.insert(cloneDeep(valueDefaultAction)).then((result) => {
          formRef.value.resetValidate()
          focusedRowKey.value = 0;
          dataShow.value = result;
          previousRowData.value = { ...result };
          dataGridRef.value?.refresh();
        });
      }
      isDiscard.value = false;
      notification("success", Message.getCommonMessage('106').message);
      store.state.common.savePA610++;
      // when update success then check click year
      // if user click button change year then update year
      dataGridRef.value?.refresh();
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
      // tạo mới xong và kiểm tra có phải là thêm mới hay không, nếu đúng thì thêm row mới
      await refetchData();
      if (isClickAddRow.value) {
        addNewRow()
      } else {
        if (selectRowKeyAction.value !== 0) {
          focusedRowKey.value = selectRowKeyAction.value
        } else {
          focusedRowKey.value = res.data.createEmployeeBusiness.residentId;
          selectRowKeyAction.value = res.data.createEmployeeBusiness.residentId;
          dataShow.value.employeeId = res.data.createEmployeeBusiness.employeeId
        }
        valueCallApiGetEmployeeBusiness.incomeTypeCode = dataShow.value.incomeTypeCode;
        // valueCallApiGetEmployeeBusiness.employeeId = parseInt(dataShow.value.employeeId);
        previousRowData.value = { ...dataShow.value };
        // Nếu không phải thêm row mới thì isNewRow = false
        isNewRow.value = false;
      }
      notification("success", Message.getCommonMessage('101').message);
      store.state.common.savePA610++;
    });
    createdErr((res) => {
      dataGridRef.value?.refresh();
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

      notification("success", Message.getCommonMessage('402').message);
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
      if (!value) {
        dataShow.value.nationality = '대한민국'
        dataShow.value.nationalityCode = 'KR'
        dataShow.value.stayQualification = null
      } else {
        if (isNewRow.value) {
          dataShow.value.nationality = ''
          dataShow.value.nationalityCode = ''
          dataShow.value.stayQualification = null
        } else {
          if (previousRowData.value.foreigner) {
            dataShow.value.nationality = previousRowData.value.nationality
            dataShow.value.nationalityCode = previousRowData.value.nationalityCode
            dataShow.value.stayQualification = previousRowData.value.stayQualification
          } else {
            dataShow.value.nationality = ''
            dataShow.value.nationalityCode = ''
            dataShow.value.stayQualification = null
          }

        }
      }
    }
    const dataUpdate = computed(() => {
      let residentId = dataShow.value.residentId.replace("-", "");
      return {
        companyId: companyId,
        imputedYear: paYear.value,
        employeeId: parseInt(
          dataShow.value.employeeId ? dataShow.value.employeeId : ""
        ),
        // incomeTypeCode: dataShow.value.incomeTypeCode,
        input: {
          name: dataShow.value.name,
          foreigner: dataShow.value.foreigner,
          nationality: dataShow.value.nationality,
          nationalityCode: dataShow.value.nationalityCode,
          stayQualification: dataShow.value.stayQualification,
          residentId: residentId,
          email: dataShow.value.email,
          incomeTypeName: dataShow.value.incomeTypeName,
        },
      };
    });
    const addNewRow = () => {
      storeDataSource.value.insert(cloneDeep(valueDefaultAction)).then((result) => {
        focusedRowKey.value = 0;
        dataShow.value = cloneDeep(valueDefaultAction);;
        previousRowData.value = cloneDeep(valueDefaultAction);
        dataGridRef.value?.refresh();
        isClickAddRow.value = false;
        isNewRow.value = true;
        formRef.value.resetValidate()
        selectRowKeyAction.value = 0;
      });
    }
    const handleSubmit = async () => {
      const res = formRef.value.validate();
      isDiscard.value = false;
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
        store.commit('settings/setFormStatus', FormStatus.editing)
        selectRowKeyAction.value = focusedRowKey.value
      } else {
        // if form disabled => action edit
        if (focusedRowKey && focusedRowKey.value !== 0) {
          await actionUpdate(dataUpdate.value);
        } else {
          const newDataCreate = {
            companyId: companyId,
            imputedYear: paYear.value,
            input: {
              name: dataShow.value.name,
              foreigner: dataShow.value.foreigner,
              nationality: dataShow.value.nationality,
              nationalityCode: dataShow.value.nationalityCode,
              stayQualification: dataShow.value.stayQualification,
              residentId: dataShow.value.residentId,
              email: dataShow.value.email || null,
              incomeTypeCode: dataShow.value.incomeTypeCode,
              incomeTypeName: dataShow.value.incomeTypeName,
            },
          };
          await actionCreated(newDataCreate);
        }
      }
    }
    const saving = () => {
      handleSubmit()
      isClickAddRow.value = false;

    };
    const handleConfirm = async (e: any) => {
      if (e) {
        // kiểm tra xem có phải là thêm mới hay không
        isClickAddRow.value = isNewRow.value && selectRowKeyAction.value === 0
        handleSubmit()
      }
    };
    const actionDelete = (employeeId: any, incomeTypeCode: any) => {
      delete valueCallApiGetEmployeeBusiness.incomeTypeCode
      valueCallApiGetEmployeeBusiness.employeeId = employeeId;
      deletePopup({
        callback: () => {
          actionDeleteApi(valueCallApiGetEmployeeBusiness);
        },
        message: contentDelete,
        width: 550,
      })
    };

    const modalHistory = () => (modalHistoryStatus.value = true);
    function calculateIncomeTypeCodeAndName(rowData: any) {
      return rowData.incomeTypeCode + ' ' + rowData.incomeTypeName;
    }

    return {
      store,
      focusedRowKey,
      isDiscard,
      disabledInput2,
      popupDataHistory,
      modalHistoryStatus,
      loadingCreated,
      arrForeigner,
      dataSource,
      move_column,
      column_resize,
      loadingUpdate,
      loadingDelete,
      isDiscardDelete,
      contentDelete,
      handleConfirm,
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
      calculateIncomeTypeCodeAndName,
      isDataInvalidAttributionYear
    };
  },
});
</script>
<style scoped lang="scss" src="./style/style.scss">
</style>
<!-- Flow
  onFocusedRowChanging -> onFocusedRowChanged ->  onRowClick ->
-->
