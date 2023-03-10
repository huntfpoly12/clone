<template>
  <action-header
    title="거래처 관리"
    @actionSave="actionSave($event)"
    @actionSearch="searching($event)"
    :buttonDelete="false"
  />
  <div id="ac-610">
    <div class="search-form dflex">
      <div class="dflex">
        <label class="lable-item">거래처명 :</label>
        <default-text-box width="150px" v-model:valueInput="dataSearch.name" />
      </div>
      <div class="dflex">
        <label class="lable-item">대표자명 :</label>
        <default-text-box v-model:valueInput="dataSearch.presidentName" />
      </div>
      <div class="dflex">
        <label class="lable-item">연락처 :</label>
        <tel-text-box v-model:valueInput="dataSearch.phone" />
      </div>
      <div class="dflex">
        <checkbox-basic
          v-model:valueCheckbox="dataSearch.includeNonUse"
          :size="'20'"
          label="이용중지 포함"
        />
      </div>
    </div>
    <div class="page-content">
      <a-row gutter="24">
        <a-col span="16" class="custom-layout">
          <a-spin :spinning="loading" size="large">
            <DxDataGrid
              ref="gridRef"
              :show-row-lines="true"
              :hoverStateEnabled="true"
              :dataSource="dataSource"
              :show-borders="true"
              key-expr="clientId"
              :allow-column-reordering="move_column"
              :allow-column-resizing="column_resize"
              :focused-row-enabled="true"
              @focused-row-changing="onFocusedRowChanging"
              @focused-row-changed="onFocusedRowChanged"
              v-model:focused-row-key="focusedRowKey"
              :focusedRowIndex="0"
            >
              <DxScrolling mode="standard" show-scrollbar="always" />
              <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
              <DxPaging page-size="15" />
              <DxExport :enabled="true" />
              <DxToolbar>
                <DxItem name="searchPanel" />
                <DxItem name="exportButton" css-class="cell-button-export" />
                <DxItem
                  location="after"
                  template="button-template"
                  css-class="cell-button-add"
                />
              </DxToolbar>
              
              <template #button-template>
                <a-tooltip placement="top">
                  <template #title>거래처 등록</template>
                  <div>
                    <DxButton icon="plus" @click="addRow" />
                  </div>
                </a-tooltip>
              </template>
              <DxColumn caption="거래처명" data-field="name" />
              <DxColumn
                caption="사업자등록번호"
                cell-template="bizNumber"
                data-field="bizNumber"
              />
              <template #bizNumber="{ data }">
                <span v-if="data.data.bizNumber">
                  {{ data.data.bizNumber.toString().slice(0, 3) }}-{{
                    data.data.bizNumber.toString().slice(3, 5)
                  }}-{{ data.data.bizNumber.toString().slice(5, 10) }}
                </span>
              </template>
              <DxColumn
                caption="주민등록번호"
                cell-template="residentId"
                data-field="residentId"
              />
              <template #residentId="{ data }">
                <div v-if="data.data.residentId?.length == 14">
                  <a-tooltip
                    placement="top"
                    v-if="
                      parseInt(data.data.residentId.split('-')[0].slice(2, 4)) <
                        13 &&
                      parseInt(data.data.residentId.split('-')[0].slice(4, 6)) <
                        32
                    "
                    key="black"
                  >
                    {{ data.data.residentId }}
                  </a-tooltip>
                  <a-tooltip placement="top" v-else title="ERROR" color="red">
                    {{ data.data.residentId }}
                  </a-tooltip>
                </div>
                <div v-else>
                  <a-tooltip
                    v-if="data.data.residentId"
                    placement="top"
                    key="black"
                  >
                    {{
                      data.data.residentId.slice(0, 6) +
                      "-" +
                      data.data.residentId.slice(6, 13)
                    }}
                  </a-tooltip>
                </div>
              </template>

              <DxColumn caption="대표자명" data-field="presidentName" />
              <DxColumn caption="연락처" data-field="phone" />
              <DxColumn
                caption="이용여부"
                cell-template="use"
                data-field="use"
              />
              <template #use="{ data }">
                <tag-color-use :valueUse="data.value" />
              </template>
              <DxColumn cell-template="historyClient" />
              <template #historyClient="{ data }">
                <div class="custom-action" style="text-align: center">
                  <HistoryOutlined
                    v-if="data.data.clientId"
                    style="font-size: 18px"
                    @click="modalHistory(data.data.clientId)"
                  />
                </div>
              </template>
            </DxDataGrid>
          </a-spin>
        </a-col>
        <a-col span="8" class="custom-layout">
          <standard-form formName="ac-610" ref="formRef">
            <a-form-item label="거래처명" :label-col="labelCol" class="red">
              <default-text-box
                :required="true"
                width="200"
                v-model:valueInput="formState.name"
              />
            </a-form-item>

            <a-form-item label="사업자등록번호" :label-col="labelCol">
              <biz-number-text-box
                v-model:valueInput="formState.bizNumber"
                :width="200"
                :disabled="!!formState.residentId"
              />
            </a-form-item>

            <a-form-item label="주민등록번호" :label-col="labelCol">
              <id-number-text-box
                :width="200"
                v-model:valueInput="formState.residentId"
                :disabled="!!formState.bizNumber"
              />
            </a-form-item>

            <a-form-item label="대표자명" :label-col="labelCol">
              <default-text-box
                :width="200"
                v-model:valueInput="formState.presidentName"
              />
            </a-form-item>

            <a-form-item label="연락처" :label-col="labelCol">
              <tel-text-box
                type="text"
                :width="200"
                v-model:valueInput="formState.phone"
              />
            </a-form-item>

            <a-form-item label="이용/여부" :label-col="labelCol">
              <switch-basic
                :width="50"
                v-model:valueSwitch="formState.use"
                :textCheck="'O'"
                :textUnCheck="'X'"
              />
              <div style="margin-left: 10px; display: inline-table">
                <img src="@/assets/images/iconInfo.png" style="width: 14px" />
                <span class="style-note">
                  이용하지 않는 경우 삭제되지 않으며,<br />
                  거래처 리스트에서 조회되지 않습니다
                </span>
              </div>
            </a-form-item>

            <div class="text-align-center mt-20">
              <button-basic
                id="ac610-btn-save"
                :text="'저장'"
                type="default"
                @onClick="actionSave($event)"
              />
            </div>
            <button-basic
              @onClick="actionToAddFromEdit"
              mode="outlined"
              type="default"
              text="취소"
              id="active-save"
            />
          </standard-form>
        </a-col>
      </a-row>
    </div>
    <HistoryPopup
      :modalStatus="modalHistoryStatus"
      @closePopup="modalHistoryStatus = false"
      :data="originDataDetail"
      title="변경이력"
      typeHistory="ac-610"
    />
    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="originDataDetail" title="변경이력" typeHistory="ac-610" />
    <PopupMessageCustom :modalStatus="isDiscard" @closePopup="handleDiscardPopup" :typeModal="'confirm'" :title="Message.getCommonMessage('501').message" content="" okText="네" cancelText="아니요" @checkConfirm="handleConfirm" />
  </div>
</template>
<script lang="ts">
import HistoryPopup from "@/components/HistoryPopup.vue";
import { Message } from "@/configs/enum";
import mutations from "@/graphql/mutations/AC/AC6/AC610/index";
import queries from "@/graphql/queries/AC/AC6/AC610/index";
import { companyId } from "@/helpers/commonFunction";
import { compareObject } from "@/utils";
import notification from "@/utils/notification";
import PopupMessageCustom from "@/views/PA/PA6/PA610/components/PopupMessageCustom.vue";
import {
EditOutlined,
HistoryOutlined,
SaveOutlined,
} from "@ant-design/icons-vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import DxButton from "devextreme-vue/button";
import { DxColumn, DxDataGrid, DxExport, DxItem, DxPaging, DxScrolling, DxSearchPanel, DxToolbar} from "devextreme-vue/data-grid";
import { Store } from "devextreme/data";
import DataSource from "devextreme/data/data_source";
import { FocusedRowChangedEvent, FocusedRowChangingEvent } from "devextreme/ui/data_grid";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { initialState } from "./utils/index";
export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    EditOutlined,
    HistoryOutlined,
    DxToolbar,
    DxItem,
    DxExport,
    DxSearchPanel,
    DxButton,
    HistoryPopup,
    SaveOutlined,
    DxScrolling,
    DxPaging,
    PopupMessageCustom
},
  setup() {
    // config grid
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const per_page = 1000;
    const column_resize = computed(() => store.state.settings.colomn_resize);
    // ref
    const isDiscard = ref(false); // verify popup discard 
    const formRef = ref(); // ref of form
    const gridRef = ref(); // ref of grid
    const isNewRow = ref(false); // check if new row is adding
    const isClickAddRow = ref(false); // check if click add row
    const focusedRowKey = ref<number>(0); // focused row key
    const previousRowData = ref(); // save previous row data when focus row change
    const formState: any = ref({ ...initialState }); // data show in form when click row or add new row

    const selectRowKeyAction = ref<number>(0); // key of row selected in gridData
    const dataSource = ref<DataSource>(); // data source of grid
    const originDataDetail: any = ref({
          companyId: companyId,
          clientId: null,
      }); // data detail of grid
    const trigger = ref<boolean>(true); // trigger for call api

    const modalHistoryStatus = ref<boolean>(false);
    // const focusedRowKey: any = ref(null);
    const modalStatus = ref(false);
    const modalStatusAdd = ref(false);
    const listClient: any = ref([]);

    const dataSearch = ref({
      page: 1,
      rows: per_page,
      name: null,
      presidentName: null,
      phone: null,
      includeNonUse: false,
    });
    let confirmSave = ref(false);

    const dataFilter = ref({
      page: 1,
      rows: per_page,
      name: null,
      presidentName: null,
      phone: null,
      includeNonUse: false,
    });
    // ================GRAPHQL==============================================
    // add new client
    const {
      mutate: createClient,
      onDone: onDoneAdd,
      onError: onErrorAdd,
    } = useMutation(mutations.createClient);

    // update client
    const {
      mutate: updateClient,
      onDone: onDoneUpdate,
      onError: onErrorUpdate,
    } = useMutation(mutations.updateClient);

    // get list client
    const {
      refetch: refetchData,
      loading,
      onResult: responseListClient,
    } = useQuery(
      queries.searchClients,{
        companyId: companyId,
        filter: dataFilter.value,
      },() => ({
        fetchPolicy: "no-cache",
        enabled: trigger.value,
      })
    );

    responseListClient((res) => {
      listClient.value = res.data.searchClients.datas;
      dataSource.value = new DataSource({
        store: {
          type: "array",
          key: "clientId",
          data: listClient.value,
        },
        requireTotalCount: true,
      });
    });
        
    const dataGridRef = computed(() => gridRef.value?.instance as any); // ref of grid Instance
    // To listen for changes in variable `dataSource` and update the interface accordingly, you can use watch in Vue.
    // const storeDataSourceCount = computed(() => dataSource.value ? dataSource.value?.totalCount(): 0);
    // get store data
    const storeDataSource = computed(() => dataSource.value?.store() as Store);
    onDoneAdd(async (res: any) => {
      await refetchData();
      if(isClickAddRow.value) {
        addNewRow()
      } else {
        isNewRow.value = false;
        focusedRowKey.value = res.data.createClient.clientId;
        selectRowKeyAction.value = res.data.createClient.clientId;
        previousRowData.value = { ...formState.value };
      }
      notification("success", Message.getCommonMessage('106').message);
    });
    onErrorAdd((e) => {
      notification("error", e.message);
    });
    onDoneUpdate(async (res) => {
      await refetchData();
      previousRowData.value = { ...formState.value };
      // update when click discard
      if (!isNewRow.value) {
        focusedRowKey.value = selectRowKeyAction.value;
      } else {
        isClickAddRow.value && addNewRow()
      }
      isDiscard.value = false;
      notification("success", Message.getCommonMessage('106').message);
    });
    onErrorUpdate((e) => {
      notification("error", e.message);
    });

    // handle add row
    const addRow = () => {
      if (!isNewRow.value) {
        // When there is no row created yet and you are focusing on one row,
        // compare 2 values to check and open a popup.
        if (previousRowData.value && !compareObject(previousRowData.value, formState.value)) {
          isClickAddRow.value = true;
          isDiscard.value = true;
        } else {
          // create new row
          storeDataSource.value.insert(initialState).then((result) => {
            focusedRowKey.value = 0;
            formState.value = result;
            previousRowData.value = { ...result };
            dataGridRef.value?.refresh();
            formRef.value.resetValidate();
          });
        }
        isNewRow.value = true;
      } else {
        if (
          previousRowData.value &&
          !compareObject(previousRowData.value, formState.value)
        ) {
          selectRowKeyAction.value = 0;
          isClickAddRow.value = true;
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
        if (compareObject(formState.value, initialState)) {
          storeDataSource.value.remove(0).then(() => {
            storeDataSource.value
              .byKey(e.rows[e.newRowIndex].key)
              .then((value) => {
                // formState.value = value;
                previousRowData.value = { ...formState.value };
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
          !compareObject(formState.value, previousRowData.value)
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
      formState.value = e.row?.data;
      previousRowData.value = { ...e.row?.data };
    };
    const addNewRow = () => {
      storeDataSource.value.insert(initialState).then((result) => {
        formRef.value.resetValidate();
        selectRowKeyAction.value = 0;
        focusedRowKey.value = 0;
        formState.value = result;
        dataGridRef.value?.refresh();
        isClickAddRow.value = false;
      });
    }
    const handleSubmit = async () => {
      const res = formRef.value.validate();
        isDiscard.value = false;
        if (!res.isValid) {
          // focusedRowKey.value = previousRowData.value.key;
          res.brokenRules[0].validator.focus();
        } else {
          if (focusedRowKey && focusedRowKey.value !== 0) {
            updateClient(dataUpdate.value);
          } else {
            // if form disabled => action add
            const newDataCreate = {
              companyId: companyId,
              input: {
                name: formState.value.name,
                bizNumber: formState.value.bizNumber,
                residentId: formState.value.residentId?.replace("-", ""),
                presidentName: formState.value.presidentName,
                phone: formState.value.phone,
                use: formState.value.use,
              },
            };
            await createClient(newDataCreate);

          }
        }
    }
    // handle confirm popup
    const handleConfirm = async (e: any) => {
      if (e) {
        // kiểm tra xem có phải là thêm mới hay không
        isClickAddRow.value = isNewRow.value && selectRowKeyAction.value === 0
        handleSubmit()
      }
    };
    // handle cancel popup
    const handleDiscardPopup = (e: boolean) => {
      isDiscard.value = e;
      if (isNewRow.value) {
        formRef.value.resetValidate();
        // when have new row and click row other then discard
        if (focusedRowKey.value === 0) {
          storeDataSource.value.remove(0).then(() => {
            focusedRowKey.value = selectRowKeyAction.value;
            formState.value = { ...previousRowData.value };
            dataGridRef.value?.refresh();
          });
          isNewRow.value = false;
          isClickAddRow.value && addNewRow()
        } else {
          // when change other row and want to add row
          storeDataSource.value.insert(initialState).then((result) => {
            formRef.value.resetValidate();
            selectRowKeyAction.value = 0;
            focusedRowKey.value = 0;
            formState.value = result;
            dataGridRef.value?.refresh();
          });
        }
      } else {
        storeDataSource.value
          .update(previousRowData.value.clientId, previousRowData.value)
          .then((value) => {
            focusedRowKey.value = selectRowKeyAction.value || 0;

            storeDataSource.value.byKey(selectRowKeyAction.value).then((value) => {
                formState.value = value;
              });
            dataGridRef.value?.refresh();
          });
      }
    };

    // ================FUNCTION============================================
    const dataUpdate = computed(() => {
      return {
        companyId: companyId,
        clientId: formState.value.clientId,
        input: {
          name: formState.value.name,
          bizNumber: formState.value.bizNumber,
          residentId: formState.value.residentId?.replace("-", ""),
          presidentName: formState.value.presidentName,
          phone: formState.value.phone,
          use: formState.value.use,
        },
      };
    });
    const actionSave = (e: any) => {
      handleSubmit()
      isClickAddRow.value = false;
    };

    const modalHistory = (clientId: any) => {
      originDataDetail.value.clientId = clientId;
      modalHistoryStatus.value = true;
    };

    // When changing the value in the input form then moving to another row, check the valid form and display the popup
    const actionToAddFromEdit = (e: any) => {
      var res = e.validationGroup.validate();
      //remove active row edit
      const element = document.querySelector(".dx-row-focused");
      if (element)
        (element as HTMLInputElement).classList.remove("dx-row-focused");
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else confirmSave.value = true;
    };

    const searching = (e: any) => {
      trigger.value = true;
      Object.assign(dataFilter.value, dataSearch.value)
      dataSearch.value.page = listClient.value.page;
      refetchData()
    };

    return {
      confirmSave,
      move_column,
      column_resize,
      loading,
      modalHistoryStatus,
      labelCol: { style: { width: "150px" } },
      formState,
      originDataDetail,
      modalStatus,
      focusedRowKey,
      modalStatusAdd,
      actionToAddFromEdit,
      actionSave,
      modalHistory,
      dataSearch,
      searching,
      Message,
      dataSource,
      onFocusedRowChanging,
      onFocusedRowChanged,
      gridRef,
      addRow,
      formRef,
      handleDiscardPopup,
      handleConfirm,
      isDiscard
    };
  },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
