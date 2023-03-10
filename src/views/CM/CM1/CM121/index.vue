<template>
  <div class="cm-121">
    <action-header title="통장 관리" :buttonDelete="false" />
    <a-row class="cm-121_row">
      <a-col span="12" class="cm-121_main">
        <div class="cm-121_main-content">
          <a-spin :spinning="false" size="large">
            <DxDataGrid id="gridContainer" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
              :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :show-borders="true"
              key-expr="bankbookId" :column-auto-width="true" :focused-row-enabled="true" v-model:focused-row-key="focusedRowKey">
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
                  <HistoryOutlined style="font-size: 18px;" />
                </DxButton>
              </template>


              <DxColumn caption="금융기관" data-field="dataSource" />
              <DxColumn caption="통장번호" data-field="bankbookNumber" />
              <DxColumn caption="통장용도" data-field="useType" />
              <DxColumn caption="통장별명" data-field="bankbookNickname" />
              <DxColumn caption="사업구분" data-field="useScrap" />
              <DxColumn caption="스크래핑 이용 여부" data-field="f" />
              <DxColumn caption="최종 스크래핑 현황" width="130px" cell-template="action" />
              <template #action="{}">
                <div style="text-align: center">
                  <img src="@/assets/images/searchPlus.png" style="width: 20px; height: 20px; margin-top: 0px;" />
                </div>
              </template>
              <DxColumn :width="50" cell-template="pupop" css-class="cell-center" />
              <template #pupop="{ data }">
                <!-- <div style=""> -->
                <DeleteOutlined style="font-size: 16px; width: 100%; height: 30px; line-height: 30px;" @click="deleteBankBook(data.data)"/>
                <!-- </div> -->
              </template>
            </DxDataGrid>
          </a-spin>
        </div>
      </a-col>
      <a-col span="12" class="cm-121_detail">
        <a-spin :spinning="false" size="large">
          <standard-form formName="cm-121-from" ref="cm121Form">
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
                        v-model:valueInput="dataDetailBankbook.bankbookInput.bankbookNumber" />
                      <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
                      <span class="style-note">최초 저장된 이후 수정 불가</span>
                    </div>
                  </a-form-item>
                  <a-form-item label="통장별명" class="form-item-top red">
                    <div class="custom-note d-flex-center">
                      <default-text-box :required="true" :width="150"
                        v-model:valueInput="dataDetailBankbook.bankbookInput.bankbookNickname" />
                      <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
                      <span class="style-note">중복 등록 불가</span>
                    </div>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item label="통장구분" class="form-item-top">
                    <div class="custom-note d-flex-center form-item-top-switch">
                      <switch-basic :textCheck="'법인'" :textUnCheck="'개인'" v-model:valuSewitch="isTypeClassification" />
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
                    <default-text-box :required="true" :width="150"
                      v-model:valueInput="dataDetailBankbook.bankbookInput.accountName" />
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
            <div>
              <div class="cm-121_detail-infomation cm-121_detail-infomation-bottom custom-note d-flex-center">
                <span>스크래핑 (통장내역 자동 조회) 정보</span>
                <div class="pl-5">
                  <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
                  <span class="style-note">(주의) 아래 데이터는 암호화되어 조회가 불가능합니다. 단, 업데이트는 가능합니다</span>
                </div>
              </div>
              <a-row class="cm-121_detail-infomation-bottom">
                <a-col span="12">
                  <a-form-item label="스크래핑 이용 여부" class="form-item-bottom">
                    <div class="custom-note d-flex-center">
                      <switch-basic :textCheck="'포함'" :textUnCheck="'제외'"
                        v-model:valueSwitch="dataDetailBankbook.bankbookInput.useScrap" />
                      <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
                      <span class="style-note">이용하지 않는 경우 스크래<br />핑 중지가 되어 통장 불러<br />오기를 할 수 없습니다.</span>
                    </div>
                  </a-form-item>
                  <a-form-item label="사업자등록번호 (법인통장)" class="form-item-bottom red">
                    <text-number-box :required="true" :width="150"
                      v-model:value="dataDetailBankbook.scrapingInfoInput.bizNumber" />
                  </a-form-item>
                  <a-form-item label="간편조회 ID" class="form-item-bottom red">
                    <default-text-box :required="true" :width="150"
                      v-model:value="dataDetailBankbook.scrapingInfoInput.webId" />
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item label="통장 비밀번호 (숫자 4자리)" class="form-item-bottom red">
                    <text-number-box :required="true" :width="150"
                      v-model:value="dataDetailBankbook.scrapingInfoInput.accountPassword" />
                  </a-form-item>
                  <a-form-item label="생년월일 (개인통장)" class="form-item-bottom red">
                    <number-box :required="true" :width="150"
                      v-model:value="dataDetailBankbook.scrapingInfoInput.birthday" />
                  </a-form-item>
                  <a-form-item label="간편조회 PW" class="form-item-bottom red">
                    <default-text-box :required="true" :width="150"
                      v-model:value="dataDetailBankbook.scrapingInfoInput.webPassword" />
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
        @dataRegisterBankbook="dataRegisterBankbook" />
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
import { DxDataGrid, DxColumn, DxToolbar, DxItem, DxSearchPanel, DxExport, DxScrolling, DxRowDragging, DxSorting } from "devextreme-vue/data-grid";
import { EditOutlined, HistoryOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons-vue";
import PopupRegisterBankbook from './components/PopupRegisterBankbook.vue'
import PopupDeleteBankbook from './components/PopupDeleteBankbook.vue'
import DxButton from "devextreme-vue/button";
import { FacilityBizType, BankType, enum2Entries } from "@bankda/jangbuda-common";
// import { BankBookUseType } from "@bankda/jangbuda-common";
import DxSelectBox from "devextreme-vue/select-box";
import notification from '@/utils/notification';
export default defineComponent({
  components: {
    DxDataGrid, DxColumn, DxToolbar, DxItem, DxSearchPanel, DxExport, DxScrolling, DxButton, DxRowDragging, DxSorting, DxSelectBox,
    EditOutlined, HistoryOutlined, DeleteOutlined, SaveOutlined, PopupRegisterBankbook, PopupDeleteBankbook
  },
  setup() {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const globalYear = computed(() => store.state.settings.globalYear)
    const triggerBankbooks = ref<boolean>(true);
    const dataSource = ref<any>([])
    let isModalRegister = ref<boolean>(false)
    const facilityBizTypeCommon = FacilityBizType.all();
    const bankTypeCommon = BankType.all();
    const focusedRowKey = ref()
    // const bankbookUseType: any = computed(() => {
    //   let bsDeduction: any = enum2Entries(BankBookUseType).map((value) => ({
    //     value: value[1],
    //     label: value[0],
    //   }));
    //   return bsDeduction;
    // });
    const bankbookUseType = [
      {
        value: 1,
        label: "운영비",
      },
      {
        value: 2,
        label: "보조금",
      },
      {
        value: 3,
        label: "후원금",
      }
    ]
    let isTypeClassification = ref<boolean>(false)
    const cm121Form = ref()
    let dataDetailBankbook = reactive({
      companyId: companyId,
      fiscalYear: globalYear,
      facilityBusinessId: null,
      bankbookInput: {
        bankbookNickname: '',
        useType: null,
        owner: '',
        useScrap: true,
        sort: dataSource.value.length,
        type: null,
        bankbookNumber: null,
        classification: '',
        accountCode: '',
        accountName: '',
      },
      scrapingInfoInput: {
        accountPassword: null,
        birthday: null,
        bizNumber: null,
        webId: '',
        webPassword: '',
      },
    })
    let isCreate = ref<boolean>(false)
    // ============ GRAPQL ===============================

    const {
      result: resBankbooks,
      onResult: onResBankbooks
      // loading,
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

    watch(resBankbooks, (value) => {
      if(value.getBankbooks) {
      dataSource.value = value.getBankbooks
      focusedRowKey.value = value.getBankbooks[0].bankbookId
      }
      triggerBankbooks.value = false
    })

    const onReorder = (e: any) => {
      const visibleRows = e.component.getVisibleRows();
      const toIndex = dataSource.value.findIndex((item: any) => item.bankbookId === visibleRows[e.toIndex].data.bankbookId);
      const fromIndex = dataSource.value.findIndex((item: any) => item.bankbookId === e.itemData.bankbookId);
      const newTasks = [...dataSource.value];
      newTasks.splice(fromIndex, 1);
      newTasks.splice(toIndex, 0, e.itemData);
      dataSource.value = newTasks;
    }

    const showPopupRegister = () => {
      isModalRegister.value = true
    }

    const dataRegisterBankbook = (data: any) => {
      dataDetailBankbook.facilityBusinessId = data.facilityBiz
      dataDetailBankbook.bankbookInput.type = data.type
      isTypeClassification.value = true
      isCreate.value = true
      isModalRegister.value = false
    }

    // select bankbook detail

    watch(focusedRowKey, (value)=> {

    })

    // create bankbook
    const {
      mutate: createBankbook,
      onDone: doneCreateBankbook,
      onError: errorCreateBankbook
    } = useMutation(mutations.createBankbook);
    doneCreateBankbook((e) => {
      notification('success', `업데이트 완료!`)
    })
    errorCreateBankbook(e => {
      notification('error', e.message)
    })
    const submit = () => {
      const res = cm121Form.value.validate()
      if(!res.isValid) {
        res.brokenRules[0].validator.focus();
        return
      }
      if (isTypeClassification.value) {
        dataDetailBankbook.bankbookInput.classification = 'C'
      } else {
        dataDetailBankbook.bankbookInput.classification = 'P'
      }
      createBankbook(dataDetailBankbook)
    }

    // delete bankbook
    const {
      mutate: deleteBankbook,
      onDone: doneDeleteBankbook,
      onError: errorDeleteBankbook
    } = useMutation(mutations.deleteBankbook);
    doneDeleteBankbook((e) => {
      notification('success', `업데이트 완료!`)
      triggerBankbooks.value = true
    })
    errorDeleteBankbook(e => {
      notification('error', e.message)
    })
    const deleteBankBook = (data: any) => {
      deleteBankbook({
        companyId: companyId,
        fiscalYear: globalYear.value,
        facilityBusinessId: data.facilityBusinessId,
        bankbookId: data.bankbookId
      })
    }

    return {
      move_column,
      colomn_resize,
      onReorder,
      dataSource,
      isModalRegister,
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
      deleteBankBook
    }
  }
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
