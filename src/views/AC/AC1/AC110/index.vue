<template>
  <action-header title="통장내역" :buttonDelete="false" />
  <div class="ac-110">
    <div class="ac-110__top">
      <div class="ac-110__top-grid">
        <div class="ac-110__top-grid-items">
          <span class="ac-110__top-grid-items-text">01</span>
          <ProcessStatus :valueStatus="statusEntering" />
        </div>
        <div class="ac-110__top-grid-items">
          <span class="ac-110__top-grid-items-text">02</span>
          <ProcessStatus :valueStatus="statusInput" />
        </div>
        <div class="ac-110__top-grid-items">
          <span class="ac-110__top-grid-items-text">03</span>
          <ProcessStatus :valueStatus="statusAdjusting" />
        </div>
        <div class="ac-110__top-grid-items">
          ~
        </div>
        <div class="ac-110__top-grid-items"></div>
        <div class="ac-110__top-grid-items">
          <span class="ac-110__top-grid-items-text">12</span>
          <ProcessStatus :valueStatus="statusAdjusted" />
        </div>
      </div>
      <div class="ac-110__top-flex">
        <ProcessStatus :valueStatus="statusAdjusting" :disabled="true" />
        <div class="ac-110__top-flex-action">
          <button-basic :text="'통장내역 불러오기'" :type="'default'" :mode="'contained'" @onClick="openPopupRetrieveStatements"/>
          <button-basic :text="'☑전표등록'" :type="'default'" :mode="'contained'" style="margin-left: 5px;" @onClick="openPopupSlipRegistrationSelected"/>
          <HistoryOutlined style="font-size: 18px; margin-left: 5px;" />
        </div>
      </div>
    </div>
    <div class="ac-110__main">
      <div class="ac-110__main-main">
        <DxDataGrid key-expr="id" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataDemoMain"
          :show-borders="true" :allow-column-reordering="move_column" v-model:focused-row-key="focusedRowKey"
          :allow-column-resizing="colomn_resize" :column-auto-width="true" @selection-changed="selectionChanged">
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxSelection mode="multiple" :fixed="true" />
          <DxColumn caption="통장" cell-template="fill1" />
          <template #fill1="{ data }">
            <a-tooltip placement="left" title="{은행명} {통장번호} ">
              <div>{{ data.data.fill1 }}</div>
            </a-tooltip>
          </template>
          <DxColumn caption="통장용도" data-field="fill2"></DxColumn>
          <DxColumn caption="일자" data-field="fill3"></DxColumn>
          <DxColumn caption="통장적요" data-field="fill4"></DxColumn>
          <DxColumn caption="내용|비고" data-field="fill5"></DxColumn>
          <DxColumn caption="입금액" data-field="fill6"></DxColumn>
          <DxColumn caption="출금액" data-field="fill7"></DxColumn>
          <DxColumn caption="통장잔액" data-field="fill8"></DxColumn>
          <DxColumn caption="증빙" data-field="fill9"></DxColumn>
          <DxColumn caption="거래내역" data-field="fill10"></DxColumn>
          <DxColumn caption="정상여부" cell-template="normality" width="80" />
          <template #normality="{ data }">
            <button-basic :text="data.data.normality ? 'O' : 'X'" :type="data.data.normality ? 'success' : 'danger'" :mode="'contained'" />
          </template>
          <DxColumn caption="전표등록" cell-template="slipRegistration" width="200" />
          <template #slipRegistration="{ data }">
            <div class="ac-110__main-main-slipRegistration">
              <button-basic :text="data.data.slipRegistration ? 'O' : 'X'" :type="data.data.slipRegistration ? 'success' : 'danger'" :mode="'contained'" style="margin-right: 5px;" />
              <button-basic :text="data.data.slipRegistration ?'전표취소' : '전표등록'" :type="'default'" :mode="'contained'" @onClick="openPopupRegistration(data.data.slipRegistration)"/>
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
          <DxDataGrid key-expr="id" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataDemoMain"
            :show-borders="true" :allow-column-reordering="move_column" v-model:focused-row-key="focusedRowKey"
            :allow-column-resizing="colomn_resize" :column-auto-width="true">
            <DxScrolling mode="standard" show-scrollbar="always" />
            <DxColumn caption="결의구분" data-field="fill1"></DxColumn>
            <DxColumn caption="수입액" data-field="fill2"></DxColumn>
            <DxColumn caption="지출액" data-field="fill3"></DxColumn>
            <DxColumn caption="적요" data-field="fill4"></DxColumn>
            <DxColumn caption="계정과목" cell-template="accountSubject" />
            <template #accountSubject="{data}">
              <select-box-common :arrSelect="arraySelectBox" :required="true" />
            </template>
            <DxColumn caption="상대계정" cell-template="relativeAccount" />
            <template #relativeAccount="{data}">
              <select-box-common :arrSelect="arraySelectBox" :required="true" />
            </template>
            <DxColumn caption="자금원천" cell-template="sourceOfFunding" />
            <template #sourceOfFunding="{data}">
              <select-box-common :arrSelect="arraySelectBox" :required="true" />
            </template>
            <DxColumn caption="거래처" data-field="fill8"></DxColumn>
            <DxColumn caption="품의종류" cell-template="typeOfProduct" />
            <template #typeOfProduct="{data}">
              <select-box-common :arrSelect="arraySelectBox" :required="true" />
            </template>
            <DxColumn caption="원인/용도" cell-template="causeUse" />
            <template #causeUse="{ data }">
              <EditOutlined style="font-size: 12px" @click="openPopupItemDetail"/>
            </template>
            <DxColumn caption="물품내역" cell-template="itemDetails" />
            <template #itemDetails="{ data }">
              <PlusOutlined style="font-size: 12px" @click="openPopupItemDetail"/>
            </template>
            <DxColumn caption="메모" cell-template="memo" />
            <template #memo="{ data }">
              <EditOutlined style="font-size: 12px" @click="openPopupItemDetail"/>
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
            <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture-card"
              v-model:file-list="fileList" @preview="handlePreview" headers="dsadasdsad" @change="changeFile">
              <div v-if="fileList.length < MAX_UP_LOAD">
                <div class="ant-btn-upload">
                  <p class="ant-btn-upload-text">이미지 파일을 여기에 끌이다 놓으세요</p>
                  <img src="@/assets/images/iconImage.png" class="ant-btn-upload-image" alt="">
                  <p class="ant-btn-upload-text">또는</p>
                  <button class="ant-btn-upload-button">파일 선택</button>
                </div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>
        </a-col>
      </a-row>
    </div>
    <PopupMessage :modalStatus="isModalRetrieveStatements" @closePopup="isModalRetrieveStatements = false"
        :typeModal="'confirm'" :title="''" :content="contentPopupRetrieveStatements"
        :okText="'네. 불러옵니다'" :cancelText="'아니요'"
        @checkConfirm="handleConfirmChange" />
    <PopupSlipCancellation :isModalSlipCancellation="isModalSlipCancellation" @closePopup="isModalSlipCancellation = false" @submit="isModalSlipCancellation = false"/>
    <PopupSlipRegistration :isModalSlipRegistrantion="isModalSlipRegistrantion" @closePopup="isModalSlipRegistrantion = false" @submit="isModalSlipRegistrantion = false"/>
    <PopupSlipRegistrationSelected :isModalSlipRegistrationSelected="isModalSlipRegistrationSelected" @closePopup="isModalSlipRegistrationSelected = false" @submit="isModalSlipRegistrationSelected = false"/>
    <PopupItemDetails :isModalItemDetail="isModalItemDetail" @closePopup="isModalItemDetail = false" @submit="isModalItemDetail = false"/>
  </div>
</template>
<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, ref, reactive, computed } from "vue";
import ProcessStatus from "@/components/common/ProcessStatus.vue"
import { DxItem, DxDataGrid, DxColumn, DxScrolling, DxSelection, DxSummary, DxTotalItem } from "devextreme-vue/data-grid";
import { HistoryOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { dataDemoMain, MAX_UP_LOAD, contentPopupRetrieveStatements } from "./utils/index"
import { Message } from "@/configs/enum"
import PopupSlipCancellation from "./components/PopupSlipCancellation.vue"
import PopupSlipRegistration from "./components/PopupSlipRegistration.vue"
import PopupSlipRegistrationSelected from "./components/PopupSlipRegistrationSelected.vue"
import PopupItemDetails from "./components/PopupItemDetails.vue"
interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  percent?: number;
  url?: string;
  preview?: string;
  originFileObj?: any;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}

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
    PopupItemDetails
  },
  setup() {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const globalYear = computed(() => store.state.settings.globalYear)
    let statusEntering = ref(10);
    let statusInput = ref(20);
    let statusAdjusting = ref(30);
    let statusAdjusted = ref(40);
    let focusedRowKey = ref()
    let dataSource = ref<any[]>([])
    let fileList = ref<any[]>([])
    const previewImage = ref<string | undefined>('');
    const previewVisible = ref<boolean>(false);
    let isModalRetrieveStatements = ref(false);
    let isModalSlipCancellation = ref(false);
    let isModalSlipRegistrantion = ref(false);
    let isModalSlipRegistrationSelected = ref(false);
    let isModalItemDetail = ref(false);
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

    // COMPUTED
    
    // METHODS

    const selectionChanged = () => { }
    const getBase64 = (file: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
    const handlePreview = async (file: FileItem) => {
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string;
      }
      previewImage.value = file.url || file.preview;
      previewVisible.value = true;
    };
    const handleChange = ({ fileList: newFileList }: FileInfo) => {
      fileList.value = newFileList;
    };

    const handleCancel = () => {
      previewVisible.value = false;
    };

    const changeFile = ({ fileList: newFileList }: FileInfo) => {
      console.log('change', fileList);
    }

    const totalDeposits = () => {
      let total = 0;
      dataDemoMain.forEach((item) => {
        total += item.fill6;
      });
      return `입금액 합계: ${total}`
    };

    const totalWithdrawal = () => {
      let total = 0;
      dataDemoMain.forEach((item) => {
        total += item.fill7;
      });
      return `출금액 합계: ${total}`
    };

    const countSlipRegistration = () => {
      let totalRegistration = 0;
      let totalCancellation = 0;
      dataDemoMain.forEach((item) => {
        if(item.slipRegistration) {
          totalRegistration++
        }else {
          totalCancellation++
        }
      });
      return `전표등록 여부 (O: ${totalRegistration}, X: ${totalCancellation})`
    };

    const openPopupRegistration = (value: any) => {
      if(value){
        isModalSlipCancellation.value = true
      }else {
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
      return `수입액 합계: ${total}`
    }

    const sumOfExpenses = () => {
      let total = 0;
      dataDemoMain.forEach((item) => {
        total += item.fill7;
      });
      return `지출액 합계: ${total}`
    }

    const openPopupItemDetail = () => {
      isModalItemDetail.value = true
    }

    return {
      statusEntering,
      statusInput,
      statusAdjusting,
      statusAdjusted,
      move_column,
      colomn_resize,
      globalYear,
      focusedRowKey,
      selectionChanged,
      dataDemoMain,
      handlePreview,
      handleChange,
      previewVisible,
      fileList,
      handleCancel,
      previewImage,
      MAX_UP_LOAD,
      changeFile,
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
      openPopupItemDetail
    };
  },
});
</script>
<style lang="scss">
.ac-110__main-detail-detail2-upload {
  .ant-upload-list-picture-card-container {
    width: 120px;
    height: 120px;
    margin: 0 9px 8px 0;
  }

  .ant-upload-list-item {
    border-radius: 15px;
  }

  .ant-upload.ant-upload-select-picture-card {
    width: 120px;
    height: 120px;
    border-radius: 15px;
    margin: 0;
  }
}
</style>
<style lang="scss" scoped src="./style/style.scss"></style>
