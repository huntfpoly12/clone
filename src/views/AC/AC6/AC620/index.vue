<template>
  <action-header
    title="후원자 관리"
    @actionSave="actionSave($event)"
    @actionSearch="actionSearch && searching($event)"
    :buttonDelete="false"
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
          :arrSelect="backerTypeArray"
          displayeExpr="name" valueExpr="id" width="150px"
          v-model:valueInput="dataSearch.type"
        />
      </div>
      <div class="dflex">
        <label class="lable-item">연락처 :</label>
        <text-number-box width="150px" v-model:valueInput="dataSearch.phone" />
      </div>
    </div>
    <div class="page-content">
      <a-row gutter="24">
        <a-col span="14" class="custom-layout">
          <a-spin :spinning="loading" size="large">
            <DxDataGrid
              ref="gridRef"
              v-model:focused-row-key="focusedRowKey"
              :show-row-lines="true"
              :hoverStateEnabled="true"
              :dataSource="dataSource"
              :show-borders="true"
              key-expr="backerCode"
              :allow-column-reordering="move_column"
              :focused-row-enabled="true"
              :allow-column-resizing="column_resize"
              @focused-row-changing="onFocusedRowChanging"
              @focused-row-changed="onFocusedRowChanged"
              :focusedRowIndex="0"
            >
              <DxScrolling mode="standard" show-scrollbar="always" />
              <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
              <DxPaging page-size="10" />
              <DxExport :enabled="true" />
              <DxToolbar>
                <DxItem name="searchPanel" />
                <DxItem name="exportButton" css-class="cell-button-export" />
                <DxItem location="after" template="button-template" css-class="cell-button-add" />
<!--                <DxItem location="after" template="button-history" css-class="cell-button-add" />-->
              </DxToolbar>

              <template #button-template>
                <a-tooltip placement="top">
                  <template #title>거래처 등록</template>
                  <div>
                    <DxButton icon="plus" @click="addRow" />
                  </div>
                </a-tooltip>
              </template>
<!--              <template #button-history>-->
<!--                 -->
<!--              </template>-->
              <DxColumn caption="후원자코드" data-field="backerCode" alignment="center"/>
              <DxColumn caption="후원자명" data-field="name" alignment="center"/>
              <DxColumn caption="후원자구분" data-field="type" :customize-text="(cellInfo: any)=> BeckerType[cellInfo.value]" alignment="center"/>
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
                <span>{{  data.data.donationOrganization ? 'O' : 'X' }}</span>
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
                <div class="custom-action" style="text-align: center" @click="handleClickShowHistory(data.data.backerCode)">
                  <HistoryOutlined  style="font-size: 18px" class="" />
                </div>
              </template>
            </DxDataGrid>
          </a-spin>
        </a-col>
        <a-col span="10" class="custom-layout">
          <standard-form formName="ac-610" ref="formRef">
            <a-form-item label="후원자 구분" :label-col="labelCol">
              <select-box-common
                :arrSelect="backerTypeArray"
                displayeExpr="name" valueExpr="id" width="150px"
                v-model:valueInput="formState.type"
                :disabled="formState.backerCode !== 0"
              />
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
              <a-radio-group v-model:value="formState.nonProfitCorpType" class="d-flex flex-col items-center gap-2">
                <a-radio :value="1" >종교법인</a-radio>
                <a-radio :value="2" >확교법인</a-radio>
                <a-radio :value="3" >의료법인</a-radio>
                <a-radio :value="4" >사회복지법인</a-radio>
                <div class="d-flex">
                  <a-radio :value="9">기타</a-radio>
                  <default-text-box
                    :width="150"
                    v-model:valueInput="formState.otherContents"
                    :disabled="formState.nonProfitCorpType !== 9"
                    :required="formState.nonProfitCorpType === 9"
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

            <a-form-item label="주민등록번호" :label-col="labelCol">
              <div class="d-flex gap-6">
                <id-number-text-box
                  :required="formState.type === 1"
                  :width="200"
                  v-model:valueInput="formState.residentId"
                  :disabled="false"
                />
                <!--  @onClick="checkDuplicateUsername" :disabled="disabledBtn" -->
                <button-basic text="중복체크" :type="'default'" :mode="'contained'" />
                <InfoToolTip>
                  <span class="">
                    주민등록번호 저장시 개인정보 처리 방침에 동의한걸로 간주합니다.<br />
                    기부금영수증 발행시 반드시 필요합니다.
                  </span>
                </InfoToolTip>
              </div>
            </a-form-item>

            <a-form-item label="사업자(고유)등록번호" :label-col="labelCol">
              <div class="d-flex gap-6">
                <biz-number-text-box
                  :required="formState.type === 1"
                  v-model:valueInput="formState.bizNumber"
                  :width="200"
                  :disabled="false"
                />
                <!--  @onClick="checkDuplicateUsername" :disabled="disabledBtn" -->
                <button-basic text="중복체크" :type="'default'" :mode="'contained'" />
                <InfoToolTip>
                  기부금영수증 발행시 반드시 필요합니다.
                </InfoToolTip>
              </div>
            </a-form-item>



            <a-form-item label="대표자명" :label-col="labelCol">
              <div class="d-flex gap-6 mb-5">
                <default-text-box v-model:valueInput="formState.roadAddress" width="200px" :disabled="true" class="roadAddress"
                placeholder="도로명주소" />
                <post-code-button @dataAddress="funcAddress" text="주소검색"/>
                <InfoToolTip>
                  기부금영수증 발행시 반드시 필요합니다.
                </InfoToolTip>
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
                  :textCheck="'X'"
                  :textUnCheck="'O'"
                />
                <InfoToolTip>
                  <span>
                    이용하지 않는 경우 삭제되지 않으며<br />
                    거래처 리스트에서 조회되지 않습니다
                  </span>
                </InfoToolTip>
              </div>
            </a-form-item>

            <div class="text-align-center mt-20">
              <button-basic
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
import { Store } from "devextreme/data";
import DataSource from "devextreme/data/data_source";
import { FocusedRowChangedEvent, FocusedRowChangingEvent } from "devextreme/ui/data_grid";
import {computed, defineComponent, ref} from "vue";
import { useStore } from "vuex";
import { initBackerCreateInput } from "./utils/index";
import TextNumberBox from "@/components/common/TextNumberBox.vue";
import InfoToolTip from './components/InfoToolTip.vue'
import { isEqualObject } from "@/utils";

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

export default defineComponent({
  components: {
    TextNumberBox,
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
    InfoToolTip
},
  setup() {
    // config grid
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const per_page = 1000;
    const column_resize = computed(() => store.state.settings.colomn_resize);
    const globalYear = computed(() => store.state.settings.globalYear);
    // ref
    const isDiscard = ref(false); // verify popup discard
    const formRef = ref(); // ref of form
    const gridRef = ref(); // ref of grid
    const isNewRow = ref(false); // check if new row is adding
    const isClickAddRow = ref(false); // check if click add row
    const focusedRowKey = ref<number>(0); // focused row key
    const previousRowData = ref(); // save previous row data when focus row change

    const formState = ref({...initBackerCreateInput}); // data show in form when click row or add new row
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
    const dataSearch = ref({
      page: 1,
      rows: per_page,
      name: null,
      phone: '',
      type: null,
      includeNonUse: true,
    });
    let confirmSave = ref(false);
    // backerTypeArray.unshift({ name: '전체', id: null })
    // ================GRAPHQL==============================================
    // add new client
    const {
      mutate: createBacker,
      onDone: onDoneAdd,
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
        filter: dataSearch.value,
      },() => ({
        fetchPolicy: "no-cache",
        enabled: trigger.value,
      })
    );

    responseListClient((res) => {
      listBackers.value = res.data.searchBackers.datas;
      dataSource.value = new DataSource({
        store: {
          type: "array",
          key: "backerCode",
          data: listBackers.value,
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
        focusedRowKey.value = res.data.createBacker.backerCode;
        selectRowKeyAction.value = res.data.createBacker.backerCode;
        previousRowData.value = { ...formState };
      }
      notification("success", Message.getCommonMessage('106').message);
    });
    onErrorAdd((e) => {
      notification("error", e.message);
    });
    onDoneUpdate(async (res) => {
      previousRowData.value = { ...formState };
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
        if (previousRowData.value && !isEqualObject(previousRowData.value, formState.value)) {
          isDiscard.value = true;
        } else {
          // create new row
          addNewRow()
        }
        isNewRow.value = true;
      } else {
        if (previousRowData.value &&!isEqualObject(previousRowData.value, formState.value)) {
          selectRowKeyAction.value = 0;
          isClickAddRow.value = true;
          isDiscard.value = true;
        }
      }
    };
    // handle onFocusedRowChanging to row
    const onFocusedRowChanging = (e: FocusedRowChangingEvent) => {
      // create new row and click row other then check data input
      if (isNewRow.value) {
        focusedRowKey.value = 0;
        if (e.rows[e.newRowIndex].key === 0) return;
        // when isNewRow and click row other then check data input
        if (isEqualObject(formState.value, initBackerCreateInput)) {
          storeDataSource.value.remove(0).then(() => {
            storeDataSource.value
              .byKey(e.rows[e.newRowIndex].key)
              .then((value) => {
                // formState = value;
                previousRowData.value = { ...formState };
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
          !isEqualObject(formState.value, previousRowData.value)
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
      // Object.assign(formState, e.row?.data);
      formState.value = e.row?.data;
      previousRowData.value = { ...e.row?.data };
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
        } else {
          if (focusedRowKey && focusedRowKey.value !== 0) {
            await updateBacker(dataUpdate.value);
          } else {
            const {backerCode, ...newData} = formState.value
            // if form disabled => action add
            const newDataCreate = {
              companyId: companyId,
              input: {
                ...newData,
                year: globalYear.value,
              },
            };
            await createBacker(newDataCreate);
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
          // when change other row and want to add row
          storeDataSource.value.insert(initBackerCreateInput).then((result) => {
            formRef.value.resetValidate();
            selectRowKeyAction.value = 0;
            focusedRowKey.value = 0;
            formState.value = result;
            dataGridRef.value?.refresh();
          });
        }
      } else {
        storeDataSource.value
          .update(previousRowData.value.backerCode, previousRowData.value)
          .then((value) => {
            focusedRowKey.value = selectRowKeyAction.value || 0;

            storeDataSource.value.byKey(selectRowKeyAction.value).then((value) => {
              Object.assign(formState, value);
            });
            dataGridRef.value?.refresh();
          });
      }
    };

    const isEnableBtnCheckResidentId = ref(true);
    const triggerResidentId = ref(false);
    // check duplicate username
    // const { refetch: refetchUserName, onResult: onResultUsername } = useQuery(queries.isUserRegistableUsername, dataCallCheck, () => ({ enabled: triggerResidentId.value, fetchPolicy: "no-cache", }))
    // const checkDuplicateUsername = () => {
    //   isEnableBtnCheckResidentId.value = true;
    //     if (formState.value.residentId !== '') {
    //         triggerResidentId.value = true
    //         refetchUserName()
    //     } else {
    //         notification('error', '사용자 이름을 입력헤주세요!');
    //     }
    // }
    // onResultUsername(e => {
    //   triggerResidentId.value = false
    //     if (e.data)
    //         if (e.data.isUserRegistableUsername == true) {
    //             notification('success', `사용 가능한 아이디입니다!`)
    //         } else {
    //             notification('error', '이미 존재하는 아이디 입니다. 다른 아이디를 입력해주세요');
    //         }
    // })
    // ================FUNCTION============================================
    const dataUpdate = computed(() => {
      return {
        companyId: companyId,
        backerCode: formState.value.backerCode,
        input: {
          name: formState.value.name,
          bizNumber: formState.value.bizNumber,
          residentId: formState.value.residentId?.replace("-", ""),
          phone: formState.value.phone,
          use: formState.value.use,
          fundrasingInstitution: formState.value.fundrasingInstitution,
          donationOrganization: formState.value.donationOrganization,
          roadAddress: formState.value.roadAddress,
          addressExtend: formState.value.addressExtend,
        },
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
      dataSearch.value.page = listBackers.value.page;
      actionSearch.value = false;
    };

    const funcAddress = (data: any) => {
      formState.value.roadAddress = data.roadAddress;
    };


    const isShowFundrasingInstitution = computed(() =>  formState.value.type === 5 || formState.value.type === 6 || formState.value.type === 7);
    const isShowDonationOrganization = computed(() => formState.value.type !== 3 && formState.value.type !== 4);

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
      funcAddress
    };
  },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
