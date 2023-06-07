<template>
  <action-header
    title="후원자 관리"
    @actionSave="actionSave($event)"
    @actionSearch="actionSearch && searching($event)"
    :buttonSave="true"
    :buttonSearch="true"
  />
  <div id="ac-620">
    <div class="search-form dflex">
      <div class="dflex">
        <label class="lable-item">후원자명 :</label>
        <default-text-box v-model:valueInput="dataSearch.name" />
      </div>
      <div class="dflex">
        <label class="lable-item">후원자 구분 :</label>
        <select-box-common
          :arrSelect="backerTypeArrayAll"
          displayeExpr="name" valueExpr="id" width="150px"
          v-model:valueInput="type"
        />
      </div>
      <div class="dflex">
        <label class="lable-item">연락처 :</label>
        <text-number-box width="150px" v-model:valueInput="dataSearch.phone" />
      </div>
    </div>
    <div class="px-6">
      <a-row :gutter="[12,0]">
        <a-col span="16">
          <div style="height: 100%; border: 1px solid #d7d7d7">
            <a-spin :spinning="loading" size="large">
              <DxDataGrid
                ref="gridRef"
                :show-row-lines="true"
                :hoverStateEnabled="true"
                :dataSource="dataSource"
                :show-borders="true"
                key-expr="backerCode"
                :allow-column-reordering="move_column"
                :focused-row-enabled="true"
                @focused-row-changing="onFocusedRowChanging"
                @focused-row-changed="onFocusedRowChanged"
                v-model:focused-row-key="focusedRowKey"
                :focusedRowIndex="focusedRowIndex"
                style="height: 740px"
                noDataText="내역이 없습니다"
              >
                <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색"/>
                <DxPaging :page-size="0" />
                <DxExport :enabled="true" />
                <DxToolbar>
                  <DxItem name="searchPanel" />
                  <DxItem name="exportButton" css-class="cell-button-export" />
                  <DxItem location="after" template="button-template" css-class="cell-button-add"/>

                </DxToolbar>

                <template #button-template>
                  <a-tooltip placement="top" title="신규">
                    <div>
                      <DxButton icon="plus" @click="addRow" />
                    </div>
                  </a-tooltip>
                </template>
                <DxColumn caption="후원자코드" data-field="backerCode" alignment="center"/>
                <DxColumn caption="후원자명" data-field="name" alignment="center"/>
                <DxColumn caption="후원자구분" cell-template="type" data-field="type" alignment="center"/>
                <template #type="{ data }">{{ BeckerType[data.data.type] }}</template>
                <DxColumn caption="주민등록번호" cell-template="residentId" data-field="residentId"
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
                <DxColumn
                  caption="사업자(고유)등록번호"
                  cell-template="bizNumber"
                  data-field="bizNumber"
                  alignment="center"
                />
                <template #bizNumber="{ data }">
                  <span v-if="data.data.bizNumber">
                    {{ data.data.bizNumber.toString().slice(0, 3) }}-{{
                      data.data.bizNumber.toString().slice(3, 5)
                    }}-{{ data.data.bizNumber.toString().slice(5, 10) }}
                  </span>
                </template>
                <DxColumn caption="주소" data-field="roadAddress" alignment="center"/>
                <DxColumn caption="연락처" data-field="phone" alignment="center"/>
                <DxColumn caption="기부금영수증 발행 가능 여부" data-field="donationOrganization" cell-template="donationOrganization" alignment="center"/>
                <template #donationOrganization="{ data }">
                  <span>{{
                    data.data.name
                    && (data.data.residentId || data.data.bizNumber)
                    && (data.data.roadAddress || data.data.addressExtend)
                      ? 'O' : 'X' }}</span>
                </template>
                <DxColumn
                  caption="이용여부"
                  cell-template="use"
                  data-field="use"
                  alignment="center"
                />
                <template #use="{ data }">
                  <tag-color-use :valueUse="data.value" />
                </template>
                <DxColumn cell-template="historyBacker" width="70px" alignment="center"/>
                <template #historyBacker="{ data }">
                  <div @click="handleClickShowHistory(data.data.backerCode)">
                    <HistoryOutlined  style="font-size: 18px" class="" />
                  </div>
                </template>
              </DxDataGrid>
            </a-spin>
          </div>
        </a-col>
        <a-col span="8" class="relative form-custom" :style="!isDataRow && 'pointer-events: none;'">
          <standard-form formName="ac-610" ref="formRef" style="padding-top: 10px">
            <a-form-item label="후원자 구분" :label-col="labelCol">
              <DxSelectBox
                :search-enabled="true"
                :data-source="backerTypeArray"
                v-model:value="formState.type"
                display-expr="name"
                value-expr="id"
                name="type"
                width="150px"
                :disabled="formState.backerCode !== 0"
              >
              </DxSelectBox>
            </a-form-item>
            <a-form-item label="후원자코드" :label-col="labelCol" class="red">
              <default-text-box
                width="200"
                v-model:valueInput="formState.backerCode"
                :disabled="true"
              />
            </a-form-item>
            <a-form-item label="후원자명" :label-col="labelCol" class="red">
              <default-text-box
                :required="true"
                width="200"
                v-model:valueInput="formState.name"
              />
            </a-form-item>

            <a-form-item v-if="formState.type === 3" label="비영리법인구분" :label-col="labelCol">
              <a-radio-group
                v-model:value="formState.nonProfitCorpType"
                class="d-flex flex-col items-center gap-2"
                :disabled="formState.backerCode !== 0"
              >
                <a-radio :value="1" >종교법인</a-radio>
                <a-radio :value="2" >확교법인</a-radio>
                <a-radio :value="3" >의료법인</a-radio>
                <a-radio :value="4" >사회복지법인</a-radio>
                <div class="d-flex-center">
                  <a-radio :value="9">기타</a-radio>
                  <default-text-box
                    :width="150"
                    v-model:valueInput="formState.otherContents"
                    :disabled="formState.nonProfitCorpType !== 9 || formState.backerCode !== 0"
                    :required="formState.nonProfitCorpType === 9"
                    placeholder="기타 내용"
                  />
                </div>
              </a-radio-group>
            </a-form-item>

            <a-form-item label="모금(자) 기관 여부" :label-col="labelCol">
              <switch-basic v-if="isShowFundrasingInstitution" v-model:valueSwitch="formState.fundrasingInstitution" textCheck="Y" textUnCheck="N"
                            style="width: 80px" />
              <span v-else>해당사항없음</span>

            </a-form-item>
            <a-form-item label="기부금 단체 여부" :label-col="labelCol">
              <switch-basic v-if="isShowDonationOrganization" v-model:valueSwitch="formState.donationOrganization" textCheck="Y" textUnCheck="N"
                            style="width: 80px" />
              <span v-else>해당사항없음</span>
            </a-form-item>

            <a-form-item label="주민등록번호" :label-col="labelCol" v-if="formState.type === 1">
              <div class="d-flex gap-6" >
                <id-number-text-box
                  width="200"
                  v-model:valueInput="formState.residentId"
                  :disabled="formState.type !== 1"
                />
                <!--  @onClick="checkDuplicateUsername" :disabled="disabledBtn" -->
                <button-basic width="90" text="중복체크" :type="'default'" :mode="'contained'" @onClick="checkDuplicateResidentId" :disabled="isDisableBtnCheckResidentId || isCheckedResidentId || formState.type !== 1" />
                <info-tool-tip >
                  <span class="">
                    주민등록번호 저장시 개인정보 처리 방침에 동의한걸로 간주합니다.<br />
                    기부금영수증 발행시 반드시 필요합니다.
                  </span>
                </info-tool-tip>
              </div>
            </a-form-item>

            <a-form-item label="사업자(고유)등록번호" :label-col="labelCol" v-else>
              <div class="d-flex gap-6">
                <biz-number-text-box
                  v-model:valueInput="formState.bizNumber"
                  width="200"
                  :disabled="formState.type === 1"
                />
                <!--  @onClick="checkDuplicateUsername" :disabled="disabledBtn" -->
                <button-basic width="90" text="중복체크" :type="'default'" :mode="'contained'" @onClick="checkDuplicateBizNumber" :disabled="isDisableBtnCheckBizNumber || isCheckedBizNumber || formState.type === 1" />
                <info-tool-tip placement="left">
                    <span>
                    이용하지 않는 경우 삭제되지 않으며<br />
                    거래처 리스트에서 조회되지 않습니다
                  </span>
                </info-tool-tip>
              </div>
            </a-form-item>



            <a-form-item label="주소" :label-col="labelCol">
              <div class="d-flex gap-6 mb-5">
                <default-text-box v-model:valueInput="formState.roadAddress" width="200px" :disabled="true" class="roadAddress"
                                  placeholder="도로명주소" />
                <div style="margin-left: -5px">
                  <post-code-button @dataAddress="funcAddress" text="주소검색" width="90"/>
                </div>
                <info-tool-tip placement="left">
                  기부금영수증 발행시 반드시 필요합니다.
                </info-tool-tip>
              </div>
              <default-text-box v-model:valueInput="formState.addressExtend" width="300px" placeholder="상세 주소 입력" />
            </a-form-item>

            <a-form-item label="연락처" :label-col="labelCol">
              <tel-text-box
                type="text"
                :width="200"
                v-model:valueInput="formState.phone"
              />
            </a-form-item>

            <a-form-item label="이용 여부" :label-col="labelCol">
              <div class="d-flex gap-6">
                <switch-basic
                  :width="50"
                  v-model:valueSwitch="formState.use"
                  :textCheck="'O'"
                  :textUnCheck="'X'"
                />
                <info-tool-tip>
                  이용하지 않는 경우 삭제되지 않으며, 거래처 리스트에서 조회되지 않습니다.
                </info-tool-tip>
              </div>
            </a-form-item>

            <div class="text-align-center mt-20">
              <button-basic
                :text="'저장'"
                type="default"
                @onClick="actionSave($event)"
                :disabled="!isDataRow"
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
    <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="originDataDetail" title="변경이력" typeHistory="ac-620" />
    <PopupMessageCustom :modalStatus="isDiscard" @closePopup="handleDiscardPopup" :typeModal="'confirm'" :title="Message.getCommonMessage('501').message" content="" okText="네" cancelText="아니요" @checkConfirm="handleConfirm" />
  </div>
</template>
<script lang="ts">
import HistoryPopup from "@/components/HistoryPopup.vue";
import { Message } from "@/configs/enum";
import mutations from "@/graphql/mutations/AC/AC6/AC620/index";
import queries from "@/graphql/queries/AC/AC6/AC620/index";
import { companyId } from "@/helpers/commonFunction";
// import { compareObject } from "@/utils";
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
import DxSelectBox from "devextreme-vue/select-box";
import { Store } from "devextreme/data";
import DataSource from "devextreme/data/data_source";
import { FocusedRowChangedEvent, FocusedRowChangingEvent } from "devextreme/ui/data_grid";
import {computed, defineComponent, ref, watch} from "vue";
import { useStore } from "vuex";
import {checkAndAddKeyToObject, initBackerCreateInput} from "./utils/index";
import {isEqual, cloneDeep} from "lodash";
import {message} from "ant-design-vue";
import dayjs from "dayjs";
// type SearchType = {
//   page: number
//   rows: number
//   name: string | null
//   phone: string | undefined
//   type: null | number
//   includeNonUse: boolean
// };
enum BeckerType {
  개인 = 1,
  영리법인 = 2,
  비영리법인 = 3,
  민간단체 = 4,
  국가단체 = 5,
  공공기관 = 6,
  소관법인 = 7
}
const backerTypeArray: Array<{ name: string,  id: BeckerType | null}> = Object.keys(BeckerType).filter(key => isNaN(Number(key))).map(key => ({ name: key, id: BeckerType[key as keyof typeof BeckerType] }));
const backerTypeArrayAll: Array<{ name: string,  id: BeckerType | 0 | null}> = [{ name: '전체', id: 0}, ...backerTypeArray];

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
    PopupMessageCustom,
    DxSelectBox
  },
  setup() {
    // config grid
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const per_page = 1000;
    const column_resize = computed(() => store.state.settings.colomn_resize);
    const acYear = computed(() => Number(sessionStorage.getItem("acYear")) || dayjs().year())
    // ref
    const isDiscard = ref(false); // verify popup discard
    const formRef = ref(); // ref of form
    const gridRef = ref(); // ref of grid
    const isNewRow = ref(false); // check if new row is adding
    const isClickAddRow = ref(false); // check if click add row
    const focusedRowKey = ref<number>(0); // focused row key
      const focusedRowIndex = ref<number>(0);
    const previousRowData = ref({...initBackerCreateInput}); // save previous row data when focus row change

    const formState: any = ref({...initBackerCreateInput}); // data show in form when click row or add new row
    const selectRowKeyAction = ref<number>(0); // key of row selected in gridData
    const dataSource = ref<DataSource>(); // data source of grid
    const originDataDetail: any = ref({
      companyId: companyId,
      backerCode: null,
    }); // data detail of grid
    const trigger = ref<boolean>(true); // trigger for call api
    const modalHistoryStatus = ref<boolean>(false);
    // const focusedRowKey: any = ref(null);
    const modalStatus = ref(false);
    const modalStatusAdd = ref(false);
    let triggerDetail = ref(false);
    const listBackers: any = ref([]);

    const actionSearch: any = ref<boolean>(true);
    const type = ref(0);

    const dataSearch: any = ref({
      page: 1,
      rows: per_page,
      name: null,
      phone: undefined,
      type: null,
      includeNonUse: true,
    });
    let confirmSave = ref(false);
    // backerTypeArray.unshift({ name: '전체', id: null })
    // ================GRAPHQL==============================================
    // add new client
    const {
      mutate: createBacker,
      onDone: onCreatedBacker,
      onError: onErrorAdd,
    } = useMutation(mutations.createBacker);

    // update client
    const {
      mutate: updateBacker,
      onDone: onDoneUpdate,
      onError: onErrorUpdate,
    } = useMutation(mutations.updateBacker);

    // get list client
    const {
      refetch: refetchData,
      loading,
      onResult: responseListClient,
    } = useQuery(
      queries.searchBackers,{
        companyId: companyId,
        filter: {
          page: 1,
          rows: per_page,
          includeNonUse: true,
        },
      },() => ({
        fetchPolicy: "no-cache",
        enabled: trigger.value,
      })
    );

    responseListClient((res) => {
      listBackers.value = res.data.searchBackers.datas;
      if (listBackers.value.length > 0) {
        const firstData = res.data.searchBackers.datas[0];
        focusedRowKey.value = res.data.searchBackers.datas[0]?.backerCode
        formState.value = firstData;
        previousRowData.value = cloneDeep(firstData);
      } else {
        formState.value = {...initBackerCreateInput};
        previousRowData.value = {...initBackerCreateInput};
        formRef.value?.resetValidate()
      }
      dataSource.value = new DataSource({
        store: {
          type: "array",
          key: "backerCode",
          data: listBackers.value,
        },
        requireTotalCount: true,
      });
      if (!isNewRow.value) {
        focusedRowKey.value = selectRowKeyAction.value;
      }
    });

    const dataGridRef = computed(() => gridRef.value?.instance as any); // ref of grid Instance
    // To listen for changes in variable `dataSource` and update the interface accordingly, you can use watch in Vue.
    // const storeDataSourceCount = computed(() => dataSource.value ? dataSource.value?.totalCount(): 0);
    // get store data
    const storeDataSource = computed(() => dataSource.value?.store() as Store);
    onCreatedBacker(async (res: any) => {
      await refetchData();
      if(isClickAddRow.value) {
        addNewRow()
      } else {
        if(selectRowKeyAction.value !==0) {
          focusedRowKey.value = selectRowKeyAction.value
        } else {
          focusedRowKey.value = res.data.createBacker.backerCode;
          selectRowKeyAction.value = res.data.createBacker.backerCode;
        }
        isNewRow.value = false;
      }
      notification("success", Message.getCommonMessage('101').message);
    });
    onErrorAdd((e) => {
      notification("error", e.message);
    });
    onDoneUpdate(async (res) => {
      formState.value = {...res.data.updateBacker};
      previousRowData.value = {...res.data.updateBacker};
      // update when click discard
      await refetchData();

      if (!isNewRow.value) {
        focusedRowKey.value = selectRowKeyAction.value;
      } else {
        storeDataSource.value.insert(initBackerCreateInput).then((result) => {
          previousRowData.value = { ...result };
          formRef.value.resetValidate()
          focusedRowKey.value = 0;
          formState.value = result;
          // Object.assign(formState,result);
          previousRowData.value = { ...result };
          dataGridRef.value?.refresh();
          isClickAddRow.value && addNewRow()
        });
      }
      isCheckedBizNumber.value = false;
      isCheckedResidentId.value = false;
      isDiscard.value = false;
      notification("success", Message.getCommonMessage('106').message);

    });
    onErrorUpdate((e) => {
      triggerDetail.value = true;
      notification("error", e.message);
    });

    // handle add row
    const addRow = () => {
      if (!isNewRow.value) {
        // When there is no row created yet and you are focusing on one row,
        // compare 2 values to check and open a popup.
        if (previousRowData.value && !isEqual(previousRowData.value, formState.value)) {
          isDiscard.value = true;
        } else {
          // create new row
          addNewRow()
        }
        isNewRow.value = true;
      } else {
        if (previousRowData.value &&!isEqual(previousRowData.value, formState.value)) {
          selectRowKeyAction.value = 0;
          isClickAddRow.value = true;
          isDiscard.value = true;
        }
      }
    };
    // handle onFocusedRowChanging to row
    const onFocusedRowChanging = (e: FocusedRowChangingEvent) => {
      if(e) {
        const rowElement = document.querySelector(`[aria-rowindex="${e.newRowIndex + 1}"]`)
        // create new row and click row other then check data input
        if (isNewRow.value) {
          focusedRowKey.value = 0;
          if (e.rows[e.newRowIndex].key === 0) return;

          // when isNewRow and click row other then check data input
          if (isEqual(formState.value, initBackerCreateInput)) {
            storeDataSource.value.remove(0).then(() => {
              storeDataSource.value
                .byKey(e.rows[e.newRowIndex].key)
                .then((value) => {
                  // formState = value;
                  previousRowData.value = cloneDeep(formState.value) as any;
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
            !isEqual(formState.value, previousRowData.value)
          ) {
            isDiscard.value = true;
            selectRowKeyAction.value = e.rows[e.newRowIndex].key;
            rowElement?.classList.add("dx-state-hover-custom")
            e.cancel = true;
          } else {
            selectRowKeyAction.value = e.rows[e.newRowIndex].key;
          }
        }
      }
    };
    // handle onFocusedRowChanged to row, function run then auto set focusedRowKey
    const onFocusedRowChanged = (e: FocusedRowChangedEvent) => {
      if(e.row) {
        formState.value = e.row?.data;
        previousRowData.value = cloneDeep(e.row?.data);
        formRef.value.resetValidate();
      }
    };
    const addNewRow = () => {
      storeDataSource.value.insert(initBackerCreateInput).then((result) => {
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
        dataGridRef.value?.refresh();
      } else {
        if (focusedRowKey && focusedRowKey.value !== 0) {
          // If bizNumber changed
          if (!isDisableBtnCheckBizNumber.value || !isDisableBtnCheckResidentId.value) {
            if (isCheckedBizNumber.value || isCheckedResidentId.value) {
              await updateBacker(dataUpdate.value);
              focusedRowIndex.value = -1;
            } else {
              dataGridRef.value?.refresh();
              const messageType = formState.value.type === 1 ? '001' : '002';
              notification('error', Message.getMessage('AC620', messageType).message)
            }
          } else {
            await updateBacker(dataUpdate.value);
            focusedRowIndex.value = -1;
          }
        } else {
          const newData = {
            type: formState.value.type,
            year: acYear.value,
            use: formState.value.use,
            name: formState.value.name
          }
          checkAndAddKeyToObject({obj: newData, key: 'fundrasingInstitution', value: formState.value.fundrasingInstitution})
          checkAndAddKeyToObject({obj: newData, key: 'donationOrganization', value: formState.value.donationOrganization})
          checkAndAddKeyToObject({obj: newData, key: 'residentId', value: formState.value.residentId})
          checkAndAddKeyToObject({obj: newData, key: 'bizNumber', value: formState.value.bizNumber})
          checkAndAddKeyToObject({obj: newData, key: 'roadAddress', value: formState.value.roadAddress})
          checkAndAddKeyToObject({obj: newData, key: 'addressExtend', value: formState.value.addressExtend})
          checkAndAddKeyToObject({obj: newData, key: 'phone', value: formState.value.phone})
          checkAndAddKeyToObject({obj: newData, key: 'nonProfitCorpType', value: formState.value.nonProfitCorpType})
          checkAndAddKeyToObject({obj: newData, key: 'otherContents', value: formState.value.otherContents})
          // if form disabled => action add isCheckedBizNumber
          const newDataCreate = {
            companyId: companyId,
            input: {
              ...newData,
            },
          };
          if (!isDisableBtnCheckBizNumber.value || !isDisableBtnCheckResidentId.value) {
            if (isCheckedBizNumber.value || isCheckedResidentId.value) {
              await createBacker(newDataCreate);
            } else {
              dataGridRef.value?.refresh();
              const messageType = formState.value.type === 1 ? '001' : '002';
              notification('error', Message.getMessage('AC620', messageType).message)
            }
          } else {
            await createBacker(newDataCreate);
          }
        }
      }
    }
    // handle confirm popup
    const handleConfirm = async (e: any) => {
      if (e) {
        // kiểm tra xem có phải là thêm mới hay không
        isClickAddRow.value = isNewRow.value && selectRowKeyAction.value === 0
        await handleSubmit()
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
            isClickAddRow.value && addNewRow()
          });
          isNewRow.value = false;
        } else {
          storeDataSource.value.update(previousRowData.value.backerCode, previousRowData.value)
          // when change other row and want to add row
          addNewRow()
        }
      } else {
        storeDataSource.value
          .update(previousRowData.value.backerCode, previousRowData.value)
          .then(() => {
            focusedRowKey.value = selectRowKeyAction.value || 0;
            storeDataSource.value.byKey(selectRowKeyAction.value).then((value: any) => {
              Object.assign(formState, value);
            });
            dataGridRef.value?.refresh();
          });
      }
    };
    // check duplicate ResidentId
    const variables = {
      companyId: companyId,
      residentId: formState.value.residentId,
    };
    const isDisableBtnCheckResidentId = computed(() => {
      if (formState.value?.residentId?.length !== 13 ) {
        isCheckedResidentId.value = false;
        return true
      } else {
        if (formState.value?.residentId === previousRowData.value?.residentId)
          isCheckedResidentId.value = true;
      }
      if (isNewRow.value) return false;
      return formState.value?.residentId === previousRowData.value?.residentId;
    });
    const isCheckedResidentId = ref(true);
    const triggerResidentId = ref(false);
    const { refetch: refetchCheckResidentId, onResult: onResultCheckResidentId } = useQuery(
      queries.isBackerRegistableResidentId,
      variables,
      () => ({ enabled: triggerResidentId.value, fetchPolicy: "no-cache", }))
    const checkDuplicateResidentId = () => {
      variables.residentId = formState.value.residentId
        if (formState.value.residentId !== '') {
            triggerResidentId.value = true
            refetchCheckResidentId()
        } else {
            notification('error', '사용자 이름을 입력헤주세요!');
        }
    }
    onResultCheckResidentId(e => {
      triggerResidentId.value = false
      if (e.data?.isBackerRegistableResidentId) {
        message.success({
          content: () =>  Message.getMessage('AC620', '003').message,
          class: 'ant-message',
          style: {
            marginTop: '20vh',
            display: "flex",
            justifyContent: "end",
            paddingRight: "100px",
          },
        }, 2);
        isCheckedResidentId.value = true
      } else {
        isCheckedResidentId.value = false
        message.error({
          content: () =>  Message.getMessage('AC620', '004').message,
          class: 'ant-message',
          style: {
            marginTop: '20vh',
            display: "flex",
            justifyContent: "end",
            paddingRight: "100px",
          },
        }, 2);
      }
    })

    // watch type and reset bizNumber or residentId, if type === 1 => bizNumber, type !== 1 => residentId
    watch(() => formState.value.type, (newValue) => {
      if (isNewRow.value) {
        if (newValue !== 1) {
          formState.value.residentId = '';
          isCheckedResidentId.value = false;
        } else {
          formState.value.bizNumber = '';
          isCheckedBizNumber.value = false;
        }
      }
    }, { deep: true });
    // check duplicate Biz Number
    const variablesCheckBizNumber = {
      companyId: companyId,
      bizNumber: formState.value.bizNumber,
    };
    const isDisableBtnCheckBizNumber = computed(() => {
      if (formState.value?.bizNumber?.length !== 10 ) {
        isCheckedBizNumber.value = false;
        return true
      } else {
        if (formState.value?.bizNumber === previousRowData.value?.bizNumber)
          isCheckedBizNumber.value = true;
      }
      if (isNewRow.value) return false;
      return formState.value?.bizNumber === previousRowData.value?.bizNumber;
    });
    const isCheckedBizNumber = ref(false);
    const triggerBizNumber = ref(false);
    const { refetch: refetchCheckBizNumber, onResult: onResultCheckBizNumber } = useQuery(
      queries.isBackerRegistableBizNumber,
      variablesCheckBizNumber,
      () => ({ enabled: triggerBizNumber.value, fetchPolicy: "no-cache", }))
    const checkDuplicateBizNumber = () => {
      variablesCheckBizNumber.bizNumber = formState.value.bizNumber
        if (formState.value.bizNumber !== '') {
          triggerBizNumber.value = true
          // refetchCheckBizNumber()
        } else {
            notification('error', '사용자 이름을 입력헤주세요!');
        }
    }
    onResultCheckBizNumber(e => {
      triggerBizNumber.value = false
        if (e.data?.isBackerRegistableBizNumber) {
          message.success({
            content: () =>  Message.getMessage('AC620', '005').message,
            class: 'ant-message',
            style: {
              marginTop: '20vh',
              display: "flex",
              justifyContent: "end",
              paddingRight: "100px",
            },
          }, 2);
          isCheckedBizNumber.value = true
        } else {
          message.error({
            content: () =>  Message.getMessage('AC620', '006').message,
            class: 'ant-message',
            style: {
              marginTop: '20vh',
              display: "flex",
              justifyContent: "end",
              paddingRight: "100px",
            },
          }, 2);
          isCheckedBizNumber.value = false
        }
    })
    // ================FUNCTION============================================
    const dataUpdate = computed(() => {
      const input:any = {
        name: formState.value.name,
        use: formState.value.use,
      }
      if (formState.value.residentId) input.residentId = formState.value.residentId?.replace("-", "");
      if (formState.value.bizNumber) input.bizNumber = formState.value.bizNumber;
      if (formState.value.phone) input.phone = formState.value.phone;
      if (formState.value.fundrasingInstitution) input.fundrasingInstitution = formState.value.fundrasingInstitution;
      if (formState.value.donationOrganization) input.donationOrganization = formState.value.donationOrganization;
      if (formState.value.roadAddress) input.roadAddress = formState.value.roadAddress;
      if (formState.value.addressExtend) input.addressExtend = formState.value.addressExtend;
      return {
        companyId: companyId,
        backerCode: formState.value.backerCode,
        input: input,
      };
    });
    const actionSave = (e: any) => {
      handleSubmit()
      isClickAddRow.value = false;
    };

    const handleClickShowHistory = (backerCode: any) => {
      originDataDetail.value.backerCode = backerCode;
      modalHistoryStatus.value = true;
    };

    // When changing the value in the input form then moving to another row, check the valid form and display the popup
    const actionToAddFromEdit = (e: any) => {
      const res = e.validationGroup.validate();
      //remove active row edit
      const element = document.querySelector(".dx-row-focused");
      if (element)
        (element as HTMLInputElement).classList.remove("dx-row-focused");
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else confirmSave.value = true;
    };

    const searching = (e: any) => {
      // dataSearch.value.type = type.value === 0 ? null : type.value;
      dataSearch.value.page = listBackers.value.page;
      const dataFilter = {
        page: 1,
        rows: per_page,
        includeNonUse: true,
      };
      checkAndAddKeyToObject({obj: dataFilter, key: 'name', value: dataSearch.value.name})
      checkAndAddKeyToObject({obj: dataFilter, key: 'phone', value: dataSearch.value.phone})
      checkAndAddKeyToObject({obj: dataFilter, key: 'type', value: type.value})
      refetchData({
        companyId: companyId,
        filter: {...dataFilter},
      })
    };

    const funcAddress = (data: any) => {
      formState.value.roadAddress = data.roadAddress;
    };


    const isShowFundrasingInstitution = computed(() =>  formState.value.type < 5);
    const isShowDonationOrganization = computed(() => formState.value.type === 3 || formState.value.type === 4);
    const isDataRow = computed(() => dataSource.value?.totalCount() && dataSource.value?.totalCount() > 0)
    return {
      confirmSave,
      move_column,
      column_resize,
      loading,
      modalHistoryStatus,
      labelCol: { style: { width: "170px" } },
      formState,
      originDataDetail,
      modalStatus,
      focusedRowKey,
      modalStatusAdd,
      actionToAddFromEdit,
      actionSave,
      handleClickShowHistory,
      dataSearch,
      searching,
      actionSearch,
      Message,
      dataSource,
      onFocusedRowChanging,
      onFocusedRowChanged,
      gridRef,
      addRow,
      formRef,
      handleDiscardPopup,
      handleConfirm,
      isDiscard,
      backerTypeArray,
      BeckerType,
      isShowFundrasingInstitution,
      isShowDonationOrganization,
      funcAddress,
      backerTypeArrayAll,
      type,
      isDisableBtnCheckResidentId,
      checkDuplicateResidentId,
      checkDuplicateBizNumber,
      isDisableBtnCheckBizNumber,
      isCheckedBizNumber,
      isCheckedResidentId,
      isDataRow,
      focusedRowIndex
    };
  },
});
</script>
<style lang="scss" scoped src="./style/style.scss">

</style>
