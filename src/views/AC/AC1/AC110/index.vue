<template>
  <action-header title="통장내역" :buttonDelete="false" />
  <div class="ac-110">
    <div class="ac-110__top">
      <div class="ac-110__top-grid">
        <div class="ac-110__top-grid-items">
          <div class="ac-110__top-grid-items-text">
            <span class="">01</span>
            <span class="">월</span>
          </div>
          <ProcessStatus :disabled="true" :valueStatus="statusEntering" />
        </div>
        <div class="ac-110__top-grid-items">
          <div class="ac-110__top-grid-items-text">
            <span class="">02</span>
            <span class="">월</span>
          </div>
          <ProcessStatus :disabled="true" :valueStatus="statusInput" />
        </div>
        <div class="ac-110__top-grid-items">
          <div class="ac-110__top-grid-items-text">
            <span class="">03</span>
            <span class="">월</span>
          </div>
          <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
        </div>
        <div class="ac-110__top-grid-items">
          <div class="ac-110__top-grid-items-text">
            <span class="">04</span>
            <span class="">월</span>
          </div>
          <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
        </div>
        <div class="ac-110__top-grid-items">
          <div class="ac-110__top-grid-items-text">
            <span class="">05</span>
            <span class="">월</span>
          </div>
          <ProcessStatus :disabled="true" :valueStatus="statusAdjusted" />
        </div>
        <div class="ac-110__top-grid-items">
          <div class="ac-110__top-grid-items-text">
            <span class="">06</span>
            <span class="">월</span>
          </div>
          <ProcessStatus :disabled="true" :valueStatus="statusInput" />
        </div>
        <div class="ac-110__top-grid-items">
          <div class="ac-110__top-grid-items-text">
            <span class="">07</span>
            <span class="">월</span>
          </div>
          <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
        </div>
        <div class="ac-110__top-grid-items">
          <div class="ac-110__top-grid-items-text">
            <span class="">08</span>
            <span class="">월</span>
          </div>
          <ProcessStatus :disabled="true" :valueStatus="statusAdjusted" />
        </div>
        <div class="ac-110__top-grid-items">
          <div class="ac-110__top-grid-items-text">
            <span class="">09</span>
            <span class="">월</span>
          </div>
          <ProcessStatus :disabled="true" :valueStatus="statusInput" />
        </div>
        <div class="ac-110__top-grid-items">
          <div class="ac-110__top-grid-items-text">
            <span class="">10</span>
            <span class="">월</span>
          </div>
          <ProcessStatus :disabled="true" :valueStatus="statusInput" />
        </div>
        <div class="ac-110__top-grid-items">
          <div class="ac-110__top-grid-items-text">
            <span class="">11</span>
            <span class="">월</span>
          </div>
          <ProcessStatus :disabled="true" :valueStatus="statusAdjusting" />
        </div>
        <div class="ac-110__top-grid-items">
          <div class="ac-110__top-grid-items-text">
            <span class="">12</span>
            <span class="">월</span>
          </div>
          <ProcessStatus :disabled="true" :valueStatus="statusAdjusted" />
        </div>
      </div>
      <div class="ac-110__top-flex">
        <ProcessStatus :valueStatus="statusAdjusting" :disabled="true" />
        <div class="ac-110__top-flex-action">
          <button-basic :text="'통장내역 불러오기'" :type="'default'" :mode="'contained'"
            @onClick="openPopupRetrieveStatements" />
          <button-basic :text="'☑전표등록'" :type="'default'" :mode="'contained'" style="margin-left: 5px;"
            @onClick="openPopupSlipRegistrationSelected" />
          <HistoryOutlined style="font-size: 18px; margin-left: 5px;" />
        </div>
      </div>
    </div>
    <div class="ac-110__main">
      <div class="ac-110__main-main">
        <DxDataGrid key-expr="bankbookId" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
          v-model:selected-row-keys="selectedRowKeys" :show-borders="true" :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize" :column-auto-width="true" @selection-changed="selectionChanged">
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxSelection mode="multiple" :fixed="true" show-check-boxes-mode="onClick" :deferred="false" />
          <DxColumn caption="통장" cell-template="nickName" />
          <template #nickName="{ data }">
            <a-tooltip placement="left" :title="`${getNameBankType(data.data.bankbook.type)} ${data.data.bankbook.bankbookNumber}`">
              <div>{{ data.data.bankbook.bankbookNickname }}</div>
            </a-tooltip>
          </template>
          <DxColumn caption="통장용도" data-field="bankbook.useType">
            <DxLookup :data-source="bankbookUseType" value-expr="value" display-expr="label" />
          </DxColumn>
          <DxColumn caption="일자" data-field="bankbookDetailDate" />
          <DxColumn caption="통장적요" data-field="summary" />
          <DxColumn caption="내용|비고" cell-template="content" />
          <template #content="{ data }">
            <div>
              {{ data.data.content }} {{ data.data.note }} 
            </div>
          </template>
          <DxColumn caption="입금액" data-field="deposit" format="fixedPoint" />
          <DxColumn caption="출금액" data-field="withdraw" format="fixedPoint" />
          <DxColumn caption="통장잔액" data-field="balance" format="fixedPoint" />
          <DxColumn caption="증빙" data-field="proofCount" />
          <DxColumn caption="거래내역" data-field="transactionDetailsCount" />
          <DxColumn caption="정상여부" cell-template="normalTransactionDetails" width="80" />
          <template #normalTransactionDetails="{ data }">
            <button-basic :text="data.data.normalTransactionDetails ? 'O' : 'X'" :type="data.data.normalTransactionDetails ? 'success' : 'danger'"
              :mode="'contained'" />
          </template>
          <DxColumn caption="전표등록" cell-template="documentRegistered" width="200" />
          <template #documentRegistered="{ data }">
            <div class="ac-110__main-main-slipRegistration">
              <button-basic :text="data.data.documentRegistered ? 'O' : 'X'"
                :type="data.data.documentRegistered ? 'success' : 'danger'" :mode="'contained'"
                style="margin-right: 5px;" />
              <button-basic :text="data.data.documentRegistered ? '전표취소' : '전표등록'" :type="'default'" :mode="'contained'"
                @onClick="openPopupRegistration(data.data.documentRegistered)" />
            </div>
          </template>

          <DxSummary>
            <DxTotalItem column="통장" summary-type="count" display-format="통장내역수: {0}" />
            <DxTotalItem cssClass="custom-sumary" column="입금액" :customize-text="totalDeposits" />
            <DxTotalItem cssClass="custom-sumary" column="출금액" :customize-text="totalWithdrawal" />
            <DxTotalItem cssClass="custom-sumary" column="전표등록" :customize-text="countSlipRegistration" />
          </DxSummary>
        </DxDataGrid>
      </div>
      <a-row class="ac-110__main-detail">
        <a-col span="17" class="ac-110__main-detail-detail1">
          <div class="ac-110__main-detail-detail1-title">
            <b>거래내역-</b><span>{통장별명} Tag{통장용도}</span>
            <b>-정상여부:</b><span>Tag{정상여부}</span>
          </div>
          <DxDataGrid key-expr="id" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataDemoMain"
            :show-borders="true" :allow-column-reordering="move_column" v-model:focused-row-key="selectedRowKeys"
            :allow-column-resizing="colomn_resize" :column-auto-width="true">
            <DxScrolling mode="standard" show-scrollbar="always" />
            <DxExport :enabled="true" />
            <DxToolbar>
              <DxItem template="button-reset" css-class="cell-button-export" />
              <DxItem name="exportButton" css-class="cell-button-export" />
              <DxItem location="after" template="button-add" css-class="cell-button-add" />
            </DxToolbar>
            <template #button-reset>
              <button-basic text="초기화" type="default" :mode="'contained'" />
            </template>
            <template #button-add>
              <a-tooltip placement="top">
                <template #title>신규</template>
                <div>
                  <DxButton icon="plus" />
                </div>
              </a-tooltip>
            </template>
            <DxColumn caption="결의구분" data-field="fill1" />
            <DxColumn caption="수입액" data-field="fill8" format="fixedPoint" alignment="end" />
            <DxColumn caption="지출액" data-field="fill8" format="fixedPoint" alignment="end" />
            <DxColumn caption="적요" data-field="fill4" />
            <DxColumn caption="계정과목" cell-template="accountSubject" width="100" />
            <template #accountSubject="{ data }">
              <account-code-select v-model:valueInput="valueAccountSubjectClassification" />
            </template>
            <DxColumn caption="상대계정" cell-template="relativeAccount" width="100" />
            <template #relativeAccount="{ data }">
              <select-box-common :arrSelect="arraySelectBox" :required="true" />
            </template>
            <DxColumn caption="자금원천" cell-template="sourceOfFunding" width="100" />
            <template #sourceOfFunding="{ data }">
              <FundingSourceSelect v-model:valueInput="valueFundingSource" />
            </template>
            <DxColumn caption="거래처" data-field="fill4" alignment="start" />
            <DxColumn caption="품의종류" cell-template="typeOfProduct" width="100" />
            <template #typeOfProduct="{ data }">
              <select-box-common :arrSelect="arraySelectBox" :required="true" />
            </template>
            <DxColumn caption="원인/용도" cell-template="causeUse" alignment="center" />
            <template #causeUse="{ data }">
              <EditOutlined style="font-size: 12px" @click="openPopupNoteItemDetail" />
            </template>
            <DxColumn caption="물품내역" cell-template="itemDetails" alignment="center" />
            <template #itemDetails="{ data }">
              <PlusOutlined style="font-size: 12px" @click="openPopupItemDetail" />
            </template>
            <DxColumn caption="메모" cell-template="memo" alignment="center" />
            <template #memo="{ data }">
              <EditOutlined style="font-size: 12px" @click="openPopupNoteItemDetail" />
            </template>

            <DxSummary>
              <DxTotalItem column="결의구분" summary-type="count" display-format="통장내역수: {0}" />
              <DxTotalItem cssClass="custom-sumary" column="수입액" :customize-text="sumOfIncome" />
              <DxTotalItem cssClass="custom-sumary" column="지출액" :customize-text="sumOfExpenses" />
            </DxSummary>
          </DxDataGrid>
        </a-col>
        <a-col span="7" class="ac-110__main-detail-detail2">
          <div class="ac-110__main-detail-detail2-upload">
            <UploadPreviewImage v-model:list-image-file="fileList" width="387" />
          </div>
        </a-col>
      </a-row>
    </div>
    <PopupRetrieveStatements :isModalRetrieveStatements="isModalRetrieveStatements"
      @closePopup="isModalRetrieveStatements = false" :title="''" :content="contentPopupRetrieveStatements"
      :okText="'네. 불러옵니다'" :cancelText="'아니요'" @confirm="handleConfirmChange" />
    <PopupSlipCancellation :isModalSlipCancellation="isModalSlipCancellation"
      @closePopup="isModalSlipCancellation = false" @submit="isModalSlipCancellation = false" />
    <PopupSlipRegistration :isModalSlipRegistrantion="isModalSlipRegistrantion"
      @closePopup="isModalSlipRegistrantion = false" @submit="isModalSlipRegistrantion = false" />
    <PopupSlipRegistrationSelected :isModalSlipRegistrationSelected="isModalSlipRegistrationSelected"
      @closePopup="isModalSlipRegistrationSelected = false" @submit="isModalSlipRegistrationSelected = false" />
    <PopupItemDetails :isModalItemDetail="isModalItemDetail" @closePopup="isModalItemDetail = false"
      @submit="isModalItemDetail = false" />
    <PopupNoteItemDetail :isModalNoteItemDetail="isModalNoteItemDetail" @closePopup="isModalNoteItemDetail = false"
      @submit="isModalNoteItemDetail = false" />
  </div>
</template>
<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, reactive, computed, watch, onMounted } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/AC/AC1/AC110";
import mutations from "@/graphql/mutations/AC/AC1/AC110";
import { companyId } from "@/helpers/commonFunction"
import ProcessStatus from "@/components/common/ProcessStatus.vue"
import { DxItem, DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem, DxToolbar, DxExport, DxLookup } from "devextreme-vue/data-grid";
import { HistoryOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { dataDemoMain, MAX_UP_LOAD, contentPopupRetrieveStatements } from "./utils/index"
import { Message } from "@/configs/enum"
import DxButton from "devextreme-vue/button";
import PopupSlipCancellation from "./components/PopupSlipCancellation.vue"
import PopupSlipRegistration from "./components/PopupSlipRegistration.vue"
import PopupSlipRegistrationSelected from "./components/PopupSlipRegistrationSelected.vue"
import PopupItemDetails from "./components/PopupItemDetails.vue"
import PopupNoteItemDetail from "./components/PopupNoteItemDetail.vue"
import PopupRetrieveStatements from "./components/PopupRetrieveStatements.vue"
import UploadPreviewImage from '@/components/UploadPreviewImage.vue'
import { BankType, enum2Entries, BankBookUseType } from "@bankda/jangbuda-common";

export default defineComponent({
  components: {
    ProcessStatus,
    DxItem,
    HistoryOutlined,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxSelection,
    DxSummary,
    DxTotalItem,
    PopupSlipCancellation,
    PopupSlipRegistration,
    PopupSlipRegistrationSelected,
    EditOutlined,
    PlusOutlined,
    PopupItemDetails,
    DxButton,
    DxToolbar,
    DxExport,
    PopupNoteItemDetail,
    PopupRetrieveStatements,
    UploadPreviewImage,
    DxLookup
  },
  setup() {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const globalYear = computed(() => store.state.settings.globalYear)
    const globalFacilityBizId = computed(() => store.state.settings.globalFacilityBizId)
    const bankType = BankType.all();
    const bankbookUseType: any = computed(() => {
      let bsDeduction: any = enum2Entries(BankBookUseType).map((value) => ({
        value: value[1],
        label: value[0],
      }));
      return bsDeduction;
    });
    // trigger
    let triggerAccountingProcesses = ref<boolean>(true)
    let triggerBankbookDetails = ref<boolean>(true)

    let statusEntering = ref(10);
    let statusInput = ref(20);
    let statusAdjusting = ref(30);
    let statusAdjusted = ref(40);
    let selectedRowKeys = ref<any>([])
    let dataSource = ref<any[]>([])
    let fileList = ref<any[]>([])
    let isModalRetrieveStatements = ref(false);
    let isModalSlipCancellation = ref(false);
    let isModalSlipRegistrantion = ref(false);
    let isModalSlipRegistrationSelected = ref(false);
    let isModalItemDetail = ref(false);
    let isModalNoteItemDetail = ref(false);
    let arraySelectBox = reactive([
      {
        value: 1,
        label: '수익사업'
      },
      {
        value: 2,
        label: '자부담'
      },
      {
        value: 3,
        label: '보조금'
      },
      {
        value: 4,
        label: '후원듬'
      }
    ])
    let valueAccountSubjectClassification = ref(null)
    let valueFundingSource = ref(null)
    // COMPUTED




    // GRAPHQL
    const {
      result: resAccountingProcesses,
      // onResult: onResAccountingProcesses,
      loading: loadingGetAccountingProcesses,
      // refetch,
      // onError
    } = useQuery(queries.getAccountingProcesses, {
      companyId: companyId,
      fiscalYear: globalYear.value,
      facilityBusinessId: globalFacilityBizId.value
    },
      () => ({
        enabled: triggerAccountingProcesses.value,
        fetchPolicy: "no-cache",
      }))

    const {
      result: resBankbookDetails,
      // onResult: onResBankbookDetails,
      loading: loadingGetBankbookDetails,
      // refetch,
      // onError
    } = useQuery(queries.getBankbookDetails, {
      companyId: companyId,
      fiscalYear: globalYear.value,
      facilityBusinessId: globalFacilityBizId.value,
      year: globalYear.value,
      month: 3
    },
      () => ({
        enabled: triggerBankbookDetails.value,
        fetchPolicy: "no-cache",
      }))

    // WATCH
    watch(resAccountingProcesses, (value) => {
      console.log('valuevaluevalue', value)
      triggerAccountingProcesses.value = false
    })

    watch(resBankbookDetails, (value) => {
      dataSource.value = value.getBankbookDetails
      triggerBankbookDetails.value = false
    })
    // MOUNTED
    onMounted(() => {
    })
    // METHODS
    const getNameBankType = (value: any) => {
      const item: any = bankType.find((items: any) => items.c === value.toString())
      return item.n || ''
    }
    const selectionChanged = (event: any) => {
      // normalTransactionDetails
      // slipRegistration
      const listItemDisable: any = []
      dataDemoMain.forEach((items: any) => {
        if (items.normalTransactionDetails && !items.documentRegistered) { }
        else { listItemDisable.push(items.id) }
      })
      const indexItemDisable = selectedRowKeys.value.findIndex((items: any) => listItemDisable.includes(items))
      if (indexItemDisable >= 0) {

        selectedRowKeys.value.splice(indexItemDisable, 1)
      }
    }

    const onFocusedRowChanging = (event: any) => {
      // event.cancel = true;
      // console.log('onFocusedRowChanging')
    }

    const totalDeposits = () => {
      let total = 0;
      dataDemoMain.forEach((item) => {
        total += item.fill6;
      });
      return `입금액 합계: ${formatNumber(total)}`
    };

    const totalWithdrawal = () => {
      let total = 0;
      dataDemoMain.forEach((item) => {
        total += item.fill7;
      });
      return `출금액 합계: ${formatNumber(total)}`
    };

    const countSlipRegistration = () => {
      let totalRegistration = 0;
      let totalCancellation = 0;
      dataDemoMain.forEach((item) => {
        if (item.slipRegistration) {
          totalRegistration++
        } else {
          totalCancellation++
        }
      });
      return `전표등록 여부 (O: ${totalRegistration}, X: ${totalCancellation})`
    };

    const openPopupRegistration = (value: any) => {
      if (value) {
        isModalSlipCancellation.value = true
      } else {
        isModalSlipRegistrantion.value = true
      }
    }
    const handleConfirmChange = () => {
      isModalRetrieveStatements.value = false
    }

    const openPopupRetrieveStatements = (value: any) => {
      isModalRetrieveStatements.value = true
    }

    const openPopupSlipRegistrationSelected = () => {
      isModalSlipRegistrationSelected.value = true
    }

    const sumOfIncome = () => {
      let total = 0;
      dataDemoMain.forEach((item) => {
        total += item.fill6;
      });
      return `수입액 합계: ${formatNumber(total)}`
    }

    const sumOfExpenses = () => {
      let total = 0;
      dataDemoMain.forEach((item) => {
        total += item.fill7;
      });
      return `지출액 합계: ${formatNumber(total)}`
    }

    const formatNumber = (value: number) => {
      if (Number.isInteger(value)) {
        return new Intl.NumberFormat().format(value)
      } else {
        return 0
      }
    }

    const openPopupItemDetail = () => {
      isModalItemDetail.value = true
    }

    const openPopupNoteItemDetail = () => {
      isModalNoteItemDetail.value = true
    }

    return {
      statusEntering,
      statusInput,
      statusAdjusting,
      statusAdjusted,
      move_column,
      colomn_resize,
      globalYear,
      selectedRowKeys,
      selectionChanged,
      onFocusedRowChanging,
      dataDemoMain,
      dataSource,
      totalDeposits,
      totalWithdrawal,
      countSlipRegistration,
      isModalRetrieveStatements,
      Message,
      handleConfirmChange,
      openPopupRegistration,
      openPopupRetrieveStatements,
      contentPopupRetrieveStatements,
      isModalSlipCancellation,
      isModalSlipRegistrantion,
      isModalSlipRegistrationSelected,
      isModalItemDetail,
      openPopupSlipRegistrationSelected,
      sumOfIncome,
      sumOfExpenses,
      arraySelectBox,
      openPopupItemDetail,
      openPopupNoteItemDetail,
      isModalNoteItemDetail,
      valueAccountSubjectClassification,
      valueFundingSource,
      fileList,
      bankType,
      bankbookUseType,
      getNameBankType
    };
  },
});
</script>
<style lang="scss" scoped src="./style/style.scss"></style>
