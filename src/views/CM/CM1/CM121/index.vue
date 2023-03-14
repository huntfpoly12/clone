<template>
  <div class="cm-121">
    <action-header title="통장 관리" :buttonDelete="false" />
    <a-row class="cm-121_row">
      <a-col span="12" class="cm-121_main">
        <div class="cm-121_main-content">
          <a-spin
            :spinning="loadingGetBankbooks || loadingCreateBankbook || loadingUpdateBankbook || loadingDeleteBankbook"
            size="large">
            <DxDataGrid id="gridContainer" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
              :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :show-borders="true"
              key-expr="bankbookId" :column-auto-width="true" :focused-row-enabled="true"
              v-model:focused-row-key="focusedRowKey" @focused-row-changing="onFocusedRowChanging">
              <DxRowDragging :allow-reordering="true" :on-reorder="onReorder" :show-drag-icons="true" />
              <DxSorting mode="none" />
              <DxScrolling mode="standard" show-scrollbar="always" />
              <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
              <DxExport :enabled="true" />
              <DxToolbar>
                <DxItem name="searchPanel" />
                <DxItem name="exportButton" css-class="cell-button-export" />
                <DxItem location="after" template="button-history" css-class="cell-button-add" />
                <DxItem location="after" template="button-add" css-class="cell-button-add" />
              </DxToolbar>
              <template #button-add>
                <a-tooltip placement="top">
                  <template #title>신규</template>
                  <div>
                    <DxButton icon="plus" @click="showPopupRegister" />
                  </div>
                </a-tooltip>
              </template>
              <template #button-history>
                <DxButton icon="plus">
                  <HistoryOutlined style="font-size: 18px;" @click="modalHistory" />
                </DxButton>
              </template>


              <DxColumn caption="금융기관" data-field="type">
                <DxLookup :data-source="bankTypeCommon" value-expr="c" display-expr="n" />
              </DxColumn>
              <DxColumn caption="통장번호" data-field="bankbookNumber" />
              <DxColumn caption="통장용도" data-field="useType">
                <DxLookup :data-source="bankbookUseType" value-expr="value" display-expr="label" />
              </DxColumn>
              <DxColumn caption="통장별명" data-field="bankbookNickname" />
              <DxColumn caption="사업구분" />
              <DxColumn caption="스크래핑 이용 여부" data-field="useScrap" />
              <DxColumn caption="최종 스크래핑 현황" width="130px" cell-template="action" />
              <template #action="{ data }">
                <div style="text-align: center">
                  <img src="@/assets/images/searchPlus.png" style="width: 20px; height: 20px; margin-top: 0px;"
                    @click="showPopupLastScrapingStatus(data.data)" />
                </div>
              </template>
              <DxColumn :width="50" cell-template="delete" css-class="cell-center" />
              <template #delete="{ data }">
                <DeleteOutlined style="font-size: 16px; width: 100%; height: 30px; line-height: 30px"
                  @click="deleteBankBook(data.data)" />
              </template>
            </DxDataGrid>
          </a-spin>
        </div>
      </a-col>
      <a-col span="12" class="cm-121_detail">
        <a-spin :spinning="loadingCreateBankbook || loadingGetBankbook || loadingUpdateBankbook" size="large">
          <standard-form formName="cm-121-from" ref="cm121Form" :key="countResetForm">
            <div>
              <p class="cm-121_detail-infomation">통장정보</p>
              <a-row class="cm-121_detail-infomation-top">
                <a-col span="12">
                  <a-form-item label="사업구분" class="form-item-top">
                    <select-box-common :arrSelect="facilityBizTypeCommon" :required="true"
                      v-model:valueInput="dataDetailBankbook.facilityBusinessId" displayeExpr="n" valueExpr="v"
                      width="150px" :disabled="true" />
                  </a-form-item>
                  <a-form-item label="금융기관" class="form-item-top">
                    <bank-select-box v-model:valueInput="dataDetailBankbook.bankbookInput.type" width="150px"
                      :disabled="true" />
                  </a-form-item>
                  <a-form-item label="통장번호" class="form-item-top red">
                    <div class="custom-note d-flex-center">
                      <text-number-box :required="true" :width="150"
                        v-model:valueInput="dataDetailBankbook.bankbookInput.bankbookNumber" :disabled="!isCreate" />
                      <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
                      <span class="style-note">최초 저장된 이후 수정 불가</span>
                    </div>
                  </a-form-item>
                  <a-form-item label="통장별명" class="form-item-top red">
                    <div class="custom-note d-flex-center">
                      <default-text-box :required="true" :width="150" placeholder="영어,한글,숫자만 가능"
                        v-model:valueInput="dataDetailBankbook.bankbookInput.bankbookNickname" />
                      <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
                      <span class="style-note">중복 등록 불가</span>
                    </div>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item label="통장구분" class="form-item-top">
                    <div class="custom-note d-flex-center form-item-top-switch">
                      <switch-basic :textCheck="'법인'" :textUnCheck="'개인'" v-model:valueSwitch="isTypeClassification" 
                      :disabled="!isSetTypeClassification.corporate || !isSetTypeClassification.private"/>
                      <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
                      <span class="style-note">최초 저장된 이후 수정 불가</span>
                    </div>
                  </a-form-item>
                  <a-form-item label="통장용도" class="form-item-top">
                    <div class="custom-note d-flex-center">
                      <DxSelectBox :search-enabled="true" width="150" display-expr="label" value-expr="value"
                        :data-source="bankbookUseType" v-model:value="dataDetailBankbook.bankbookInput.useType"
                        placeholder="통장용도" />
                      <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
                      <span class="style-note">관련 계정과목 적용 또는 <br />관련 서식에 기재됩니다.</span>
                    </div>
                  </a-form-item>
                  <a-form-item label="예금주" class="form-item-top red">
                    <default-text-box :required="true" :width="150"
                      v-model:valueInput="dataDetailBankbook.bankbookInput.owner" />
                  </a-form-item>
                  <a-form-item label="계정과목" class="form-item-top">
                    <default-text-box :width="150" v-model:valueInput="accountSubject" :disabled="true" />
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
            <div>
              <div class="cm-121_detail-infomation cm-121_detail-infomation-bottom d-flex-center">
                <span>스크래핑 (통장내역 자동 조회) 정보</span>
                <div class="pl-5">
                  <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
                  <span class="style-note">(주의) 아래 데이터는 암호화되어 조회가 불가능합니다. 단, 업데이트는 가능합니다</span>
                </div>
              </div>
              <a-row>
                <a-col span="12">
                  <a-form-item label="스크래핑 이용 여부" class="form-item-bottom">
                    <div class="custom-note d-flex-center form-item-bottom-switch">
                      <switch-basic :textCheck="'O'" :textUnCheck="'X'"
                        v-model:valueSwitch="dataDetailBankbook.bankbookInput.useScrap" />
                      <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
                      <span class="style-note">이용하지 않는 경우 스크래<br />핑 중지가 되어 통장 불러<br />오기를 할 수 없습니다.</span>
                    </div>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item v-if="dataDetailBankbook.bankbookInput.useScrap" label="통장 비밀번호 (숫자 4자리)" class="form-item-bottom red">
                    <text-number-box :required="true" :width="150" maxLength="4" v-model:value="dataDetailBankbook.scrapingInfoInput.accountPassword"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col span="12">
                  <a-form-item label="사업자등록번호 (법인통장)" class="form-item-bottom red">
                    <biz-number-text-box v-model:valueInput="dataDetailBankbook.scrapingInfoInput.bizNumber" :width="150" :disabled="!isTypeClassification"/>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item label="생년월일 (개인통장)" class="form-item-bottom red">
                    <birth-day-box v-model:valueInput="dataDetailBankbook.scrapingInfoInput.birthday" width="150px" :required="true" :disabled="isTypeClassification"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col span="12">
                  <a-form-item v-if="isInputWebID" :label="isTypeClassification ? inputIDPWBankType.corporate.ID : inputIDPWBankType.private.ID" class="form-item-bottom red">
                    <default-text-box :required="true" :width="150" v-model:valueInput="dataDetailBankbook.scrapingInfoInput.webId" />
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item v-if="isInputWebPW" :label="isTypeClassification ? inputIDPWBankType.corporate.PW : inputIDPWBankType.private.PW" class="form-item-bottom red">
                    <default-text-box :required="true" :width="150" v-model:valueInput="dataDetailBankbook.scrapingInfoInput.webPassword"/>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
            <div class="cm-121_detail-btn">
              <button-basic text="저장" type="default" mode="contained" @onClick="submit" />
            </div>
          </standard-form>
        </a-spin>
      </a-col>
      <PopupRegisterBankbook :isModalRegister="isModalRegister" @closePopup="isModalRegister = false"
        @dataRegisterBankbook="dataRegisterBankbook" :key="keyResetPopupRegisterBankbook"/>
      <PopupDeleteBankbook :isModalDelete="isModalDelete" @closePopup="isModalDelete = false"
        @agreeDeleteBankbook="agreeDeleteBankbook" />
      <PopupMessage :modalStatus="isModalConfirmSaveChange" @closePopup="isModalConfirmSaveChange = false" :typeModal="'confirm'"
        :title="Message.getMessage('COMMON', '501').message" content="" :okText="Message.getMessage('COMMON', '501').yes" :cancelText="Message.getMessage('COMMON', '501').no" @checkConfirm="handleConfirmChange" />
      <PopupLastScrapingStatus :isModalLastScrapingStatus="isModalLastScrapingStatus" :data="dataPopupScrapingStatus"
        @closePopup="isModalLastScrapingStatus = false" @agreeDeleteBankbook="agreeDeleteBankbook" />
      <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="popupHistoryData"
        title="변경이력" :idRowEdit="idRowEdit" typeHistory="cm-121" keyExpr="bankbookId" />
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useStore } from 'vuex';
import queries from "@/graphql/queries/CM/CM121";
import mutations from "@/graphql/mutations/CM/CM121";
import dayjs, { Dayjs } from "dayjs";
import { companyId } from "@/helpers/commonFunction"
import { DxDataGrid, DxColumn, DxToolbar, DxItem, DxSearchPanel, DxExport, DxScrolling, DxRowDragging, DxSorting, DxLookup } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import PopupRegisterBankbook from './components/PopupRegisterBankbook.vue'
import PopupDeleteBankbook from './components/PopupDeleteBankbook.vue'
import PopupLastScrapingStatus from './components/PopupLastScrapingStatus.vue'
import DxButton from "devextreme-vue/button";
import { FacilityBizType, BankType, enum2Entries, BankBookUseType } from "@bankda/jangbuda-common";
import DxSelectBox from "devextreme-vue/select-box";
import notification from '@/utils/notification';
import HistoryPopup from "@/components/HistoryPopup.vue";
import { cloneDeep, isEqual } from "lodash";
import { Message } from "@/configs/enum"
export default defineComponent({
  components: {
    DxDataGrid, DxColumn, DxToolbar, DxItem, DxSearchPanel, DxExport, DxScrolling, DxButton, DxRowDragging, DxSorting, DxSelectBox,
    EditOutlined, HistoryOutlined, DeleteOutlined, SaveOutlined, PopupRegisterBankbook, PopupDeleteBankbook, PopupLastScrapingStatus, HistoryPopup,
    DxLookup
  },
  setup() {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const globalYear = computed(() => store.state.settings.globalYear)
    const triggerBankbook = ref<boolean>(false);
    const triggerBankbooks = ref<boolean>(true);
    const dataSource = ref<any>([])
    let isModalRegister = ref<boolean>(false)
    let isModalDelete = ref<boolean>(false)
    let isModalConfirmSaveChange = ref<boolean>(false)
    let isDelete = ref<boolean>(false)
    let isModalLastScrapingStatus = ref<boolean>(false)
    let isNewCreate = ref<boolean>(false)
    const facilityBizTypeCommon = FacilityBizType.all();
    const bankTypeCommon = BankType.all();
    const focusedRowKey = ref()
    let indexRow = ref()
    let firstLoad = ref(true)
    let countResetForm = ref(0)
    const modalHistoryStatus = ref<boolean>(false);
    let idRowEdit = ref<number>(0);
    let popupHistoryData = ref();
    let dataPopupScrapingStatus = ref<any>()
    let accountSubject = ref('')
    let keyResetPopupRegisterBankbook = ref(0)
    let dataDelete = reactive({
      companyId: companyId,
      fiscalYear: globalYear.value,
      facilityBusinessId: null,
      bankbookId: null
    })
    const paramBankbookDetail = reactive({
      companyId: companyId,
      fiscalYear: globalYear.value,
      facilityBusinessId: null,
      bankbookId: null
    })
    const bankbookUseType: any = computed(() => {
      let bsDeduction: any = enum2Entries(BankBookUseType).map((value) => ({
        value: value[1],
        label: value[0],
      }));
      return bsDeduction;
    });
    let isTypeClassification = ref<boolean>(false)
    const cm121Form = ref()
    let dataDetailBankbook = ref({
      companyId: companyId,
      fiscalYear: globalYear,
      facilityBusinessId: null,
      bankbookId: null,
      bankbookInput: {
        bankbookNickname: '',
        useType: 1,
        owner: '',
        useScrap: true,
        sort: null,
        type: null,
        bankbookNumber: null,
        classification: '',
        accountCode: '',
        accountName: '',
      },
      scrapingInfoInput: {
        accountPassword: null,
        birthday: '',
        bizNumber: null,
        webId: '',
        webPassword: '',
      },
    })
    let oldDataDetailBankbook: any = ref({})
    let isCreate = ref<boolean>(false)
    const isSetTypeClassification: any = ref({
      corporate: true,
      private: true
    })

    const objChange: any = ref({})
    let isStatusClickCreate = ref<boolean>(false)
    const inputIDPWBankType: any = ref({
      corporate: {
        ID: '',
        PW: ''
      },
      private: {
        ID: '',
        PW: ''
      }
    })
    // ------------COMPUTED ----------------------

    const isEdited = computed(() => {
      return isEqual(oldDataDetailBankbook.value, dataDetailBankbook.value)
    })
    const isInputWebID = computed(() => {
      return dataDetailBankbook.value.bankbookInput.useScrap && 
              ((inputIDPWBankType.value.corporate.ID && isTypeClassification.value) || (inputIDPWBankType.value.private.ID && !isTypeClassification.value))
    })
    const isInputWebPW = computed(() => {
      return dataDetailBankbook.value.bankbookInput.useScrap && 
              ((inputIDPWBankType.value.corporate.PW && isTypeClassification.value) || (inputIDPWBankType.value.private.PW && !isTypeClassification.value))
    })
    // ============ GRAPQL ===============================

    // get list bankbook
    const {
      result: resBankbooks,
      // onResult: onResBankbooks,
      loading: loadingGetBankbooks,
      // refetch,
      // onError
    } = useQuery(queries.getBankbooks, {
      companyId: companyId,
      fiscalYear: globalYear,
    },
      () => ({
        enabled: triggerBankbooks.value,
        fetchPolicy: "no-cache",
      }))

    // get detail bankbook
    const {
      result: resBankbook,
      // onResult: onResBankbooks,
      loading: loadingGetBankbook,
      // refetch,
      // onError
    } = useQuery(queries.getBankbook, paramBankbookDetail,
      () => ({
        enabled: triggerBankbook.value,
        fetchPolicy: "no-cache",
      }))

    // update sort
    const {
      mutate: reorderBankbooks,
      onDone: doneReorderBankbooks,
      onError: errorReorderBankbooks,
      loading: loadingReorderBankbooks,
    } = useMutation(mutations.reorderBankbooks);

    // create bankbook
    const {
      mutate: createBankbook,
      onDone: doneCreateBankbook,
      onError: errorCreateBankbook,
      loading: loadingCreateBankbook,
    } = useMutation(mutations.createBankbook);
    doneCreateBankbook((e) => {
      notification('success', `업데이트 완료!`)
      isNewCreate.value = true
      triggerBankbooks.value = true
      keyResetPopupRegisterBankbook.value++
    })
    errorCreateBankbook(e => {
      notification('error', e.message)
    })

    // update bankbook
    const {
      mutate: updateBankbook,
      onDone: doneUpdateBankbook,
      onError: errorUpdateBankbook,
      loading: loadingUpdateBankbook,
    } = useMutation(mutations.updateBankbook);
    doneUpdateBankbook((e) => {
      notification('success', `업데이트 완료!`)
      triggerBankbooks.value = true
    })
    errorUpdateBankbook(e => {
      notification('error', e.message)
    })

    // delete bankbook
    const {
      mutate: deleteBankbook,
      onDone: doneDeleteBankbook,
      onError: errorDeleteBankbook,
      loading: loadingDeleteBankbook,
    } = useMutation(mutations.deleteBankbook);
    doneDeleteBankbook((e) => {
      notification('success', `업데이트 완료!`)
      triggerBankbooks.value = true
    })
    errorDeleteBankbook(e => {
      notification('error', e.message)
    })
    // -----------WATCH-------------
    watch(resBankbooks, (value) => {
      if (value.getBankbooks) {
        dataSource.value = value.getBankbooks
        if (firstLoad.value && value.getBankbooks.length) {
          focusedRowKey.value = value.getBankbooks[0].bankbookId
          isCreate.value = false
          paramBankbookDetail.facilityBusinessId = value.getBankbooks[0].facilityBusinessId
          paramBankbookDetail.bankbookId = value.getBankbooks[0].bankbookId
          triggerBankbook.value = true
        }
        if (isNewCreate.value) {
          focusedRowKey.value = value.getBankbooks[value.getBankbooks.length - 1].bankbookId
          isCreate.value = false
          paramBankbookDetail.facilityBusinessId = value.getBankbooks[value.getBankbooks.length - 1].facilityBusinessId
          paramBankbookDetail.bankbookId = value.getBankbooks[value.getBankbooks.length - 1].bankbookId
          triggerBankbook.value = true
        }
        if (isDelete.value) {
          if (value.getBankbooks.length !== 0) {
            if (value.getBankbooks.length - 1 < indexRow.value) {
              focusedRowKey.value = value.getBankbooks[indexRow.value - 1].bankbookId
              paramBankbookDetail.facilityBusinessId = value.getBankbooks[indexRow.value - 1].facilityBusinessId
              paramBankbookDetail.bankbookId = value.getBankbooks[indexRow.value - 1].bankbookId
            } else {
              focusedRowKey.value = value.getBankbooks[indexRow.value].bankbookId
              paramBankbookDetail.facilityBusinessId = value.getBankbooks[indexRow.value].facilityBusinessId
              paramBankbookDetail.bankbookId = value.getBankbooks[indexRow.value].bankbookId
            }
            isCreate.value = false
            triggerBankbook.value = true
          } else {
            focusedRowKey.value = null
            resetDataDetail()
            isCreate.value = true
          }
        }
        isNewCreate.value = false
        firstLoad.value = false
        isDelete.value = false
      }
      triggerBankbooks.value = false
    })

    watch(resBankbook, (value) => {
      resetDataDetail()
      const data = value.getBankbook
      dataDetailBankbook.value.facilityBusinessId = data.facilityBusinessId
      dataDetailBankbook.value.bankbookId = data.bankbookId
      dataDetailBankbook.value.bankbookInput.bankbookNumber = data.bankbookNumber
      dataDetailBankbook.value.bankbookInput.bankbookNickname = data.bankbookNickname
      dataDetailBankbook.value.bankbookInput.useType = data.useType
      dataDetailBankbook.value.bankbookInput.owner = data.owner
      dataDetailBankbook.value.bankbookInput.useScrap = data.useScrap
      dataDetailBankbook.value.bankbookInput.accountName = data.accountName || ''
      dataDetailBankbook.value.bankbookInput.accountCode = data.accountCode || ''
      dataDetailBankbook.value.bankbookInput.type = data.type
      dataDetailBankbook.value.bankbookInput.sort = data.sort
      oldDataDetailBankbook.value = cloneDeep(dataDetailBankbook.value)
      setAccountSubject(dataDetailBankbook.value.bankbookInput.accountName, dataDetailBankbook.value.bankbookInput.accountCode)
      isTypeClassification.value = data.classification === 'C' ? true : false
      countResetForm.value++
      triggerBankbook.value = false
    })

    watch(() => isTypeClassification.value, (value) => {
      if (value) {
        dataDetailBankbook.value.scrapingInfoInput.birthday = ''
      } else {
        dataDetailBankbook.value.scrapingInfoInput.bizNumber = null
      }
      countResetForm.value++
    })
    watch(() => dataDetailBankbook.value.bankbookInput.useScrap, (value) => {
      if (!value) {
        dataDetailBankbook.value.scrapingInfoInput.accountPassword = null
        dataDetailBankbook.value.scrapingInfoInput.webPassword = ""
        dataDetailBankbook.value.scrapingInfoInput.webId = ""
        countResetForm.value++
      }
    })


    watch(() => dataDetailBankbook.value.bankbookInput.type, (value) => {
      if(value){
        const typeItem: any = bankTypeCommon.find((item: any) => item.c == value)
        isSetTypeClassification.value.corporate = typeItem.coporateScrapable
        isSetTypeClassification.value.private = typeItem.privateScrapable
        if ((isSetTypeClassification.value.corporate && isSetTypeClassification.value.private) || (isSetTypeClassification.value.corporate && !isSetTypeClassification.value.private)) {
          isTypeClassification.value = true
        }else {
          isTypeClassification.value = false
        }
        handleGetInputBankType('c', typeItem.i.coporate)
        handleGetInputBankType('p', typeItem.i.private)
      }else {
        isSetTypeClassification.value.corporate = true
        isSetTypeClassification.value.private = true
      }
    })
    // -------METHODS-----------

    const handleGetInputBankType = (type: string, listInput: string) => {
      const listInputArr = listInput.split(",");
      const ID = listInputArr.find((item:any) => item.includes('ID'))
      const PW = listInputArr.find((item:any) => item.includes('PW'))
      if(type === 'c') {
        inputIDPWBankType.value.corporate.ID = ID || ''
        inputIDPWBankType.value.corporate.PW = PW || ''
      }else {
        inputIDPWBankType.value.private.ID = ID || ''
        inputIDPWBankType.value.private.PW = PW || ''
      }
    }

    const onReorder = (e: any) => {
      indexRow.value = e.toIndex
      const visibleRows = e.component.getVisibleRows();
      const toIndex = dataSource.value.findIndex((item: any) => item.bankbookId === visibleRows[e.toIndex].data.bankbookId);
      const fromIndex = dataSource.value.findIndex((item: any) => item.bankbookId === e.itemData.bankbookId);
      const newTasks = [...dataSource.value];
      newTasks.splice(fromIndex, 1);
      newTasks.splice(toIndex, 0, e.itemData);
      dataSource.value = newTasks;
      const sortTo = dataSource.value[fromIndex].sort
      const sortFrom = e.itemData.sort
      dataSource.value[toIndex].sort = sortTo
      dataSource.value[fromIndex].sort = sortFrom
      reorderBankbooks({
        companyId: companyId,
        fiscalYear: globalYear.value,
        facilityBusinessId: e.itemData.facilityBusinessId,
        inputs: [
          {
            bankbookId: e.itemData.bankbookId,
            sort: sortTo
          },
          {
            bankbookId: dataSource.value[fromIndex].bankbookId,
            sort: sortFrom
          },
        ]
      })
    }

    const showPopupRegister = () => {
      isStatusClickCreate.value = true
      if(isEdited.value || !dataDetailBankbook.value.bankbookInput.type){
        isModalRegister.value = true
      }else {
        isModalConfirmSaveChange.value = true
      }
    }

    const dataRegisterBankbook = (data: any) => {
      resetDataDetail()
      paramBankbookDetail.facilityBusinessId = null,
      paramBankbookDetail.bankbookId = null
      dataDetailBankbook.value.facilityBusinessId = data.facilityBiz
      dataDetailBankbook.value.bankbookInput.type = data.type
      oldDataDetailBankbook.value = cloneDeep(dataDetailBankbook.value)
      isTypeClassification.value = true
      focusedRowKey.value = null
      isCreate.value = true
      countResetForm.value++
      isModalRegister.value = false
    }

    const resetDataDetail = () => {
      dataDetailBankbook.value.facilityBusinessId = null
      dataDetailBankbook.value.bankbookInput.type = null
      dataDetailBankbook.value.bankbookInput.sort = dataSource.value.length ? dataSource.value[dataSource.value.length - 1].sort + 1 : 0
      dataDetailBankbook.value.bankbookId = null
      dataDetailBankbook.value.bankbookInput.bankbookNumber = null
      dataDetailBankbook.value.bankbookInput.bankbookNickname = ''
      dataDetailBankbook.value.bankbookInput.useType = 1
      dataDetailBankbook.value.bankbookInput.owner = ''
      dataDetailBankbook.value.bankbookInput.useScrap = true
      dataDetailBankbook.value.bankbookInput.accountName = '보통예금'
      dataDetailBankbook.value.bankbookInput.accountCode = '101010103'
      dataDetailBankbook.value.scrapingInfoInput.accountPassword = null
      dataDetailBankbook.value.scrapingInfoInput.birthday = ''
      dataDetailBankbook.value.scrapingInfoInput.bizNumber = null
      dataDetailBankbook.value.scrapingInfoInput.webId = ''
      dataDetailBankbook.value.scrapingInfoInput.webPassword = ''
      setAccountSubject(dataDetailBankbook.value.bankbookInput.accountName, dataDetailBankbook.value.bankbookInput.accountCode)
      countResetForm.value++
    }

    const submit = () => {
      const res = cm121Form.value.validate()
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
        return
      }
      if (isTypeClassification.value) {
        dataDetailBankbook.value.bankbookInput.classification = 'C'
      } else {
        dataDetailBankbook.value.bankbookInput.classification = 'P'
      }

      const data = JSON.parse(JSON.stringify(dataDetailBankbook.value))

      if (isTypeClassification.value) {
        delete data.scrapingInfoInput.birthday
      } else {
        delete data.scrapingInfoInput.bizNumber
      }

      if (!dataDetailBankbook.value.bankbookInput.useScrap) {
        delete data.scrapingInfoInput.accountPassword
        delete data.scrapingInfoInput.webPassword
        delete data.scrapingInfoInput.webId
      }else {
        if(!isInputWebID) delete data.scrapingInfoInput.webId
        if(!isInputWebPW) delete data.scrapingInfoInput.webPassword
      }
      if (isCreate.value) {
        delete data.scrapingInfoInput.bankbookId
        createBankbook(data)
      } else {
        updateBankbook(data)
        doneUpdateBankbook(() => {
          triggerBankbooks.value = true
        })
      }
    }

    const deleteBankBook = (data: any) => {
      dataDelete.facilityBusinessId = data.facilityBusinessId
      dataDelete.bankbookId = data.bankbookId
      isModalDelete.value = true
    }

    const agreeDeleteBankbook = () => {
      isDelete.value = true
      isModalDelete.value = false
      deleteBankbook(dataDelete)
    }

    const modalHistory = () => {
      modalHistoryStatus.value = true
    }

    const showPopupLastScrapingStatus = (data: any) => {
      dataPopupScrapingStatus.value = data
      isModalLastScrapingStatus.value = true
    }

    const onFocusedRowChanging = (event: any) => {
      if(isEdited.value) {
        isCreate.value = false
        if (paramBankbookDetail.bankbookId === event.rows[event.newRowIndex].data.bankbookId) return
        indexRow.value = event.newRowIndex
        paramBankbookDetail.facilityBusinessId = event.rows[event.newRowIndex].data.facilityBusinessId
        paramBankbookDetail.bankbookId = event.rows[event.newRowIndex].data.bankbookId
        triggerBankbook.value = true
      }else {
        event.cancel = true
        isModalConfirmSaveChange.value = true
        objChange.value.indexRow = event.newRowIndex
        objChange.value.facilityBusinessId = event.rows[event.newRowIndex].data.facilityBusinessId
        objChange.value.bankbookId = event.rows[event.newRowIndex].data.bankbookId
      }
    }

    const handleConfirmChange = (val: boolean) => {
      if(val){
        submit()
      }else{
        if(isStatusClickCreate.value){
          resetDataDetail()
          isModalRegister.value = true
        }else{
          isModalConfirmSaveChange.value = false
          indexRow.value =  objChange.value.indexRow
          focusedRowKey.value = objChange.value.bankbookId
          paramBankbookDetail.facilityBusinessId = objChange.value.facilityBusinessId
          paramBankbookDetail.bankbookId = objChange.value.bankbookId
          triggerBankbook.value = true
        }
      }
      isStatusClickCreate.value = false
    }

    const setAccountSubject = (accountName: string, accountCode: string) => {
      accountSubject.value = `${accountName}(${accountCode})`
    }

    return {
      move_column,
      colomn_resize,
      onReorder,
      dataSource,
      isModalRegister,
      isModalDelete,
      showPopupRegister,
      dataRegisterBankbook,
      dataDetailBankbook,
      facilityBizTypeCommon,
      bankTypeCommon,
      bankbookUseType,
      isTypeClassification,
      submit,
      cm121Form,
      focusedRowKey,
      deleteBankBook,
      agreeDeleteBankbook,
      loadingGetBankbooks,
      loadingCreateBankbook,
      loadingDeleteBankbook,
      loadingGetBankbook,
      loadingUpdateBankbook,
      isCreate,
      countResetForm,
      modalHistoryStatus,
      modalHistory,
      idRowEdit,
      popupHistoryData,
      isModalLastScrapingStatus,
      showPopupLastScrapingStatus,
      dataPopupScrapingStatus,
      onFocusedRowChanging,
      isSetTypeClassification,
      accountSubject,
      keyResetPopupRegisterBankbook,
      isModalConfirmSaveChange,
      handleConfirmChange,
      Message,
      inputIDPWBankType,
      isInputWebID,
      isInputWebPW
    }
  }
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
