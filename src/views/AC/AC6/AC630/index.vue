<template>
  <action-header title="기부금영수증" :buttonDelete="false" :buttonSearch="true" @actionSearch="onSearch()" :buttonPrint="false"
    :buttonSave="false" />
  <div id="ac-630" class="p-20">
    <!-- {{ dataState }} dataState <br /> -->
    {{ mailData }} mailData <br />
    {{ printData }} printData <br />
    {{ modalCreate }} modalCreate <br />
    <div class="top-container">
      <a-row>
        <a-col :span="8">
          <a-form-item label="기부기간" label-align="right" class="red">
            <year-picker-box width="100px" v-model:valueDate="dataState.imputedYear" color="#a6a6a6"></year-picker-box>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="발행기간">
            <range-date-time-box v-model:valueDate="rangeDate" width="250px" :multi-calendars="true" />
          </a-form-item>
          <div style="font-size: 12px; color: #888888" class="mt-5">
            <img src="@/assets/images/iconInfo.png" style="width: 14px" />본 회계연도내 기부내역 대상의 발행내역만 검색가능하며, 발행기간과는 무관합니다.
          </div>
        </a-col>
        <a-col :span="8">
          <a-form-item label="후원자" label-align="right" class="red">
            <default-text-box width="200px" :disabled="true" v-model:valueInput="dataState.name" :required="true" />
          </a-form-item>
        </a-col>
      </a-row>
    </div>
    <div class="table-ctn mt-15">
      <a-spin :spinning="false" size="large">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
          key-expr="ID" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
          :column-auto-width="true" :focused-row-enabled="true" ref="taxPayDataRef">
          <DxPaging :page-size="0" />
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" :search-visible-columns="['TypeCodeAndName']" />
          <DxExport :enabled="true" />
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxColumn caption="일련번호" cell-template="tag" width="205" />
          <DxToolbar>
            <DxItem name="searchPanel" />
            <DxItem name="exportButton" css-class="cell-button-export" />
            <DxItem location="after" template="button-mail" css-class="cell-button-add" />
            <DxItem location="after" template="button-print" css-class="cell-button-add" />
            <DxItem location="after" template="button-delete" css-class="cell-button-add" />
            <DxItem location="after" template="button-add" css-class="cell-button-add" />
            <DxItem location="after" template="button-history" css-class="cell-button-add" />
          </DxToolbar>
          <template #button-mail>
            <div style="text-align: center;">
              <DxButton class="ml-3" @click="modalMail = true">
                <img src="@/assets/images/email.svg" alt="" style="width: 18px;" />
              </DxButton>
            </div>
          </template>
          <template #button-print>
            <a-tooltip placement="top" class="custom-tooltip">
              <template #title>
                출력 / 저장
              </template>
              <div style="text-align: center;">
                <DxButton class="ml-3" @click="modalPrint = true">
                  <img src="@/assets/images/print.svg" alt="" style="width: 18px;">
                </DxButton>
              </div>
            </a-tooltip>
          </template>
          <template #button-delete>
            <div style="text-align: center;">
              <DxButton class="ml-3" @click="modalDelete = true">
                <img src="@/assets/images/icon_delete.png" alt="" style="width: 18px;">
              </DxButton>
            </div>
          </template>
          <template #button-add>
            <a-tooltip placement="top" class="custom-tooltip">
              <template #title>
                <div style="width: 100px">
                  기부금영수증 신규 발행
                </div>
              </template>
              <div style="text-align: center;">
                <DxButton icon="plus" @click="modalCreate = true" />
              </div>
            </a-tooltip>
          </template>
          <template #button-history>
            <div style="text-align: center;">
              <DxButton class="ml-3" @click="modalHistory = true">
                <HistoryOutlined style="font-size: 16px" />
              </DxButton>
            </div>
          </template>
          <DxColumn caption="문서명" data-field="documentName" />
          <DxColumn caption="사업장정보" data-field="businessSite" />
          <DxColumn caption="사무대행업체정보" data-field="administrationAgency" />
          <DxColumn caption="다운로드" cell-template="downA" />
          <template #downA="{ data }" class="custom-action">
            <div class="d-flex justify-content-center" v-if="data.data.hasDownFile">
              <DxButton type="ghost" class="" style="cursor: pointer">
                <DownloadOutlined :size="12" />
              </DxButton>
            </div>
          </template>
        </DxDataGrid>
      </a-spin>
    </div>
    <a-row class="mt-20">
      <a-col :span="8" :offset="8" style="text-align: center;">
        <checkbox-basic size="14" v-model:valueCheckbox="dataState.check" :required="true"
          label="보험사무대행 신청서류의 일괄 자동생성에 동의합니다."></checkbox-basic>
      </a-col>
    </a-row>
    <a-row class="mt-20">
      <a-col :span="8" :offset="8" style="text-align: center;">
        <button-basic text="신청서류 일괄생성" type="default" mode="contained" :width="140" id="btn-save"
          @onClick="onSubmit($event)" />
      </a-col>
    </a-row>
  </div>
  <MailPopup v-if="modalMail" v-model:mailData="mailData" @onMailModal="onMailModal" />
  <PrintPopup v-if="modalPrint" v-model:printData="printData" @onPrintModal="onPrintModal" />
  <PopupMessage :modalStatus="modalDelete" @closePopup="modalDelete = false" typeModal="confirm"
    :content="() => deleteContent" okText="네. 삭제합니다" cancelText="아니요" @checkConfirm="onDeleteModal" />
  <CreatePopup v-if="modalCreate" @onCreateModal="onCreateModal" />
</template>
<script lang="ts">
import { ref, defineComponent, watch, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxScrolling,
  DxSearchPanel,
  DxExport,
  DxToolbar,
} from 'devextreme-vue/data-grid';
import { DownloadOutlined, HistoryOutlined } from '@ant-design/icons-vue';
import { companyId } from '@/helpers/commonFunction';
import queries from '@/graphql/queries/PA/PA8/PA860/index';
import mutations from '@/graphql/mutations/PA/PA8/PA860/index';
import DxButton from 'devextreme-vue/button';
import { Message } from "@/configs/enum";
import notification from '@/utils/notification';
import { useQuery, useMutation } from '@vue/apollo-composable';
import dayjs from 'dayjs';
import { DxItem } from 'devextreme-vue/select-box';
import MailPopup from './components/MailPopup.vue';
import PrintPopup from './components/PrintPopup.vue';
import CreatePopup from './components/CreatePopup.vue';
import ShowDataCreated from './components/ShowDataCreated.vue';
import { h } from 'vue';
export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxScrolling,
    DxButton,
    DownloadOutlined,
    DxSearchPanel,
    DxExport,
    DxToolbar,
    DxItem,
    HistoryOutlined,
    MailPopup, PrintPopup, ShowDataCreated, CreatePopup,
  },
  setup() {
    const store = useStore();
    const { per_page, move_column, colomn_resize } = store.state.settings;
    const dataSource = ref([{
      ID: 1,
      documentName: '건강보험 EDI 위임장',
      businessSite: '사업장관리번호, 업체명, 주소, 대표자, 대표자주민번호, 사업자등록번호, 직인',
      administrationAgency: '사업장관리번호, 업체명, 주소, 대표자, 대표자주민번호',
      hasDownFile: true,
    }, {
      ID: 2,
      documentName: '국민연금 EDI 위임장',
      businessSite: '사업장관리번호, 업체명, 주소, 사업자등록번호, 법인등록번호, 대표자, 대표자생년월일, 직인',
      administrationAgency: '사업장관리번호, 업체명, 주소, 사업자등록번호, 법인등록번호, 대표자, 대표자생년월일, 직인',
      hasDownFile: true,
    }, {
      ID: 3,
      documentName: '보험사무대행기관 사무위탁서',
      businessSite: '사업장관리번호, 업체명, 주소, 전화번호, 대표자, 직인',
      administrationAgency: '업체명, 직인',
      hasDownFile: true,
    }, {
      ID: 4,
      documentName: '위임장',
      businessSite: '업체명, 주소, 전화번호, 대표자, 직인',
      administrationAgency: '업체명, 주소, 전화번호, 대표자',
      hasDownFile: true,
    }, {
      ID: 5,
      documentName: '고용산재 업무대행 수임(해지)신청서',
      businessSite: '보험종류(고용,산재), 사업장관리번호, 업체명, 대표자, 전화번호, 근로자수, 해지시 해지사유, 직인',
      administrationAgency: '',
      hasDownFile: true,
    }, {
      ID: 6,
      documentName: '사무위탁해지통지서',
      businessSite: '사업장관리번호, 업체명, 주소, 전화번호, 대표자, 사업의종류, 근로자수, 해지사유, 직인',
      administrationAgency: '',
      hasDownFile: true,
    }, {
      ID: 7,
      documentName: '개인정보제공 동의서',
      businessSite: '업체명, 주소, 대표자, 직인',
      administrationAgency: '업체명, 주소, 사업자등록번호, 대표자, 전화번호, 보험사무대행인가번호',
      hasDownFile: true,
    }]);
    const globalYear = computed(() => store.state.settings.globalYear);
    const dataState = ref({
      registeredAt: '',
      manageId: '',
      check: false,
      companyId: companyId,
      workId: 1,
      imputedYear: globalYear.value,
      name: 'ss',
    })
    const rangeDate: any = ref([parseInt(dayjs().subtract(1, 'week').format('YYYYMMDD')), parseInt(dayjs().format('YYYYMMDD'))]);


    // -----------------------------MAIL-------------------

    const modalMail = ref(false);
    const mailData = ref();
    const onMailModal = (emitVal: Boolean) => {
      if (!emitVal) {
        modalMail.value = false;
        mailData.value = '';
      } else {

      }
      // actionParam.workId = e;
    };

    // -----------------------------PRINT-------------------

    const modalPrint = ref(false);
    const printData = ref(0);
    const onPrintModal = (emitVal: Boolean) => {
      if (!emitVal) {
        modalPrint.value = false;
        printData.value = 0;
      } else {

      }
      // actionParam.workId = e;
    };

    // -----------------------------DELETE-------------------

    const modalDelete = ref(false);
    const deleteContent = h('div', [h('div', '선택된 기부금영수증 {1} 건을 삭제합니다.'), h('div', '삭제 후 복구는 불가합니다. 그래도 삭제하시겠습니까?')])
    const onDeleteModal = (emitVal: Boolean) => {
      if (!emitVal) {
        modalDelete.value = false;
      } else {

      }
      // actionParam.workId = e;
    };

    //---------------------------CREATE------------------

    const modalCreate = ref(false);
    const onCreateModal = (emitVal: Boolean) => {
      if (!emitVal) {
        modalCreate.value = false;
      } else {

      }
    }
    const handleCreate = () => {
      // refetch();
      modalCreate.value = false;
    };

    // -----------------------------HISTORY-------------------

    const modalHistory = ref(false);
    const onHistoryModal = (emitVal: Boolean) => {
      if (!emitVal) {
        modalHistory.value = true;
      } else {

      }
      // actionParam.workId = e;
    };

    //-------------------------mutation cancel acquistion -----------

    const contentDelete = Message.getCommonMessage('401').message as string
    const isDelete = ref(false);
    // const {
    //   mutate: mutateCancelAcquistion,
    //   onDone: onDoneAcquisitionDone,
    //   onError: onDoneAcquisitionError,
    // } = useMutation(mutations.cancelMajorInsuranceCompanyEmployeeAcquisition);
    // onDoneAcquisitionDone(() => {
    //   notification('success', Message.getMessage('COMMON', '402').message);
    //   refetch();
    // });
    const actionDelete = (workId: number) => {
      // isDelete.value = true;
      // actionParam.workId = workId;
    }
    // onDoneAcquisitionError((res) => {
    //   notification('error', res.message);
    // })
    const handleDelete = (e: boolean) => {
      if (e) {
        isDelete.value = false;
        // mutateCancelAcquistion(actionParam);
      }
    }

    //------get ReportViewUrl ----

    // const fillRpTrigger = ref<boolean>(false);
    // const {refetch: fillRpRefetch, result: fillRpResult, onError} = useQuery(
    //   queries.getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl,
    //   actionParam,
    //   () => ({
    //     enabled: fillRpTrigger.value,
    //     fetchPolicy: 'no-cache',
    //   })
    // );
    // watch(fillRpResult, (newVal) => {
    //   if (newVal) {
    //     window.open(newVal.getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl);
    //     fillRpTrigger.value = false;
    //   }
    // });
    const onGetFileStorageId = (url: string) => {
      window.open(url);
    };
    // onError((e) => {
    //   notification('error', e.message);
    // });

    //---------------------SEARCH ACTIONS--------------------

    const onSearch = () => { }


    //-------------------------get incom extra detail ------------------------

    const getMajorInsuranceParam = ref<any>({
      companyId: companyId,
      imputedYear: globalYear.value,
      workId: dataState.value.workId,
    });
    const getMajorInsuranceTrigger = ref<boolean>(false);
    const {
      loading: getMajorInsuranceLoading,
      onError: getMajorInsuranceError,
      result: getMajorInsuranceResult,
    } = useQuery(queries.getMajorInsuranceConsignStatusFaxFilingReportViewUrl, getMajorInsuranceParam, () => ({
      enabled: getMajorInsuranceTrigger.value,
      fetchPolicy: 'no-cache',
    }));
    watch(getMajorInsuranceResult, (newVal: any) => {
      let data = newVal.getMajorInsuranceConsignStatusFaxFilingReportViewUrl;
      if (data)
        window.open(data);
    });
    getMajorInsuranceError((res: any) => {
      notification('error', res.message);
      getMajorInsuranceTrigger.value = false;
    });

    //------------------------------ACTION VIEWS----------------------

    const onGetAcquistionRp = (workId: any) => {
      getMajorInsuranceParam.value.workId = +workId;
      getMajorInsuranceTrigger.value = true;
    };

    //-----------------------------------CREATE MAJOR--------------------------------

    const messageCreate = Message.getMessage('COMMON', '101').message;
    const { mutate: createMajor, onDone: createMajorDone, onError: createMajorError } = useMutation(mutations.createMajorInsuranceConsignStatus);
    createMajorDone((res: any) => {
      notification('success', messageCreate);
      let data = res.data.createMajorInsuranceConsignStatus;
      dataState.value.registeredAt = data.registeredAt;
    })
    createMajorError((res: any) => {
      notification('error', res.message);
    })

    //-----------------------------------RE CREATE MAJOR--------------------------------

    const { mutate: renewMajor, onDone: renewMajorDone, onError: renewMajorError } = useMutation(mutations.renewMajorInsuranceConsignStatus);
    renewMajorDone((res: any) => {
      notification('success', messageCreate);
    })
    renewMajorError((res: any) => {
      notification('error', res.message);
    })
    const messageDelNoItem = Message.getMessage('PA860', '001').message;
    const onSubmit = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid || !dataState.value.check) {
        res?.brokenRules[0]?.validator.focus();
        notification('warning', messageDelNoItem);
      } else {
        let formData = {
          manageId: dataState.value.manageId,
          companyId: dataState.value.companyId,
        }
        createMajor(formData);
        // renewMajor(formData);
      }
    }
    return {
      per_page, move_column, colomn_resize, dataSource,
      modalMail, modalPrint, modalDelete, modalCreate, modalHistory,
      onMailModal, onPrintModal, onDeleteModal, onCreateModal, onHistoryModal,
      mailData, printData,
      handleCreate, isDelete, handleDelete, contentDelete, dataState,
      onSubmit, dayjs, onSearch,
      rangeDate, deleteContent,
    };
  },
})
</script>
<style lang="scss">
@import './styles/index.scss';
</style>