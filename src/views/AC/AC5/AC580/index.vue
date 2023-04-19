<template>
  <action-header title="기부금영수증" :buttonSearch="true" @actionSearch="onSearch()"
    :buttonSave="false" />
  <div id="ac-580" class="p-20">
    <!-- {{ dataStateAC580 }} dataStateAC580 <br /> -->
    <!-- {{ mailData }} mailData <br />
    {{ printData }} printData <br />
    {{ modalCreate }} modalCreate <br /> -->
    <div class="top-container">
      <a-row>
        <a-col span="24">
          <div class="input-text">
            <radio-group :arrayValue="employeeFashionArr" v-model:valueRadioCheck="dataStateAC580.tableType"
              layoutCustom="horizontal" class="mt-1"></radio-group>
            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="ml-10">
            <span class="custom-waring">
              후원금의 경우 조정마감된 결의서 기준으로 후원금 수입/사용내역 조회합니다
            </span>
          </div>
        </a-col>
        <a-col span="24">
          <div class="input-text">
            <span class="mr-10">결의서별 후원금 등록 조회 여부:</span>
            <radio-group :arrayValue="employeeFashionArr2" v-model:valueRadioCheck="dataStateAC580.employeeType2"
              layoutCustom="horizontal" class="mt-1"></radio-group>
            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="ml-10">
            <span class="custom-waring">
              후원금의 경우 조정마감된 결의서 기준으로 후원금 수입/사용내역 조회합니다
            </span>
          </div>
        </a-col>
        <a-col>
          <a-form-item label="기간" label-align="right" class="red">
            <div class="input-text">
              <OnlyMonthPickerBox class="mr-5" v-model:valueMonth="dataStateAC580.imputedYear" />
              <ProcessStatus :disabled="true" :valueStatus="30" />
            </div>
          </a-form-item>
        </a-col>
        <a-col>
          <div class="input-text">
            <span class="mx-5">~</span>
            <OnlyMonthPickerBox class="mr-5" v-model:valueMonth="dataStateAC580.monthEnd" />
            <ProcessStatus :disabled="true" :valueStatus="10" />
            <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="ml-10">
            <span class="custom-waring">
              후원금의 경우 조정마감된 결의서 기준으로 후원금 수입/사용내역 조회합니다
            </span>
          </div>
        </a-col>
      </a-row>
    </div>
    <a-row class="tool-bar mt-10" justify="space-between">
      <a-col>
        <div class="mt-5">
          <span class="header">서식 설정</span>
          <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="ml-10">
          <span class="custom-waring">
            본 설정으로 적용된 서식으로 출력 및 메일발송 됩니다
          </span>
        </div>
        <div class="mt-5">
          <checkbox-basic size="14" label="후원자 마스킹 처리"
            v-model:valueCheckbox="dataStateAC580.employeementInsuranceReport" />
          <img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px;" class="ml-10">
          <span class="custom-waring">
            본 설정으로 적용된 서식으로 출력 및 메일발송 됩니다
          </span>
        </div>
        <div class="mt-5">
          후원금 전용계좌정보
          <DxButton class="ml-3" @click="modalCreate = true">
            <edit-outlined :style="{ fontSize: '16px', color: 'black' }" />
          </DxButton>
        </div>
      </a-col>
      <a-col class="d-flex-center">
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
        <div style="text-align: center;">
          <DxButton class="ml-3" @click="modalMail = true">
            <img src="@/assets/images/email.svg" alt="" style="width: 18px;" />
          </DxButton>
        </div>
        <div style="text-align: center;">
          <DxButton class="ml-3" @click="modalHistory = true">
            <HistoryOutlined style="font-size: 18px" />
          </DxButton>
        </div>
        <a-tooltip placement="top" class="custom-tooltip">
          <!-- <template #title>
            <div style="width: 100px">
              기부금영수증 신규 발행
            </div>
          </template> -->
          <div style="text-align: center;">
            <DxButton icon="plus" class="ml-3"  />
          </div>
        </a-tooltip>
      </a-col>
    </a-row>
    <a-row class="bot-ctn mt-10" :gutter="[25]">
      <a-col :span="15" class="col1">
        <Table1 v-if="dataStateAC580.tableType == 1 || dataStateAC580.tableType == 2" />
        <Table2 v-if="dataStateAC580.tableType == 3" />
        <Table3 v-if="dataStateAC580.tableType == 4" />
      </a-col>
      <a-col :span="9" class="col2">
        <Form1 v-if="dataStateAC580.tableType == 1" />
        <Form2 v-if="dataStateAC580.tableType == 2" />
        <Form3 v-if="dataStateAC580.tableType == 3" />
        <Form4 v-if="dataStateAC580.tableType == 4" />
      </a-col>
    </a-row>
  </div>
  <MailPopup v-if="modalMail" v-model:mailData="mailData" @onMailModal="onMailModal" />
  <PrintPopup v-if="modalPrint" v-model:printData="printData" @onPrintModal="onPrintModal" />
  <PopupMessage :modalStatus="modalDelete" @closePopup="modalDelete = false" typeModal="confirm"
    :content="() => deleteContent" okText="네. 삭제합니다" cancelText="아니요" @checkConfirm="onDeleteModal" />
  <ActionFormPopup v-if="modalCreate" @onCreateModal="onCreateModal" />
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
  DxSelection,
} from 'devextreme-vue/data-grid';
import { DownloadOutlined, HistoryOutlined, EditOutlined } from '@ant-design/icons-vue';
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
import ActionFormPopup from './components/ActionFormPopup.vue';
import Form1 from './components/Form1.vue';
import Form2 from './components/Form2.vue';
import Form3 from './components/Form3.vue';
import Form4 from './components/Form4.vue';
import { h } from 'vue';
import Table1 from './components/Table1.vue';
import Table2 from './components/Table2.vue';
import Table3 from './components/Table3.vue';
import { employeeFashionArr, employeeFashionArr2, } from "./utils/index";
export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxScrolling,
    DxButton,
    DxSearchPanel,
    DxExport,
    DxToolbar,
    DxItem,
    HistoryOutlined, EditOutlined, DownloadOutlined,
    MailPopup,
    PrintPopup,
    Form1,
    Form2,
    Form3,
    Form4,
    ActionFormPopup,
    DxSelection,
    Table1,
    Table2,
    Table3,
    employeeFashionArr,
    employeeFashionArr2,
  },
  setup() {
    const store = useStore();
    const { per_page, move_column, colomn_resize } = store.state.settings;
    const dataSource = ref([{
      ID: 1,
      documentName: '건강보험 EDI 위임장',
      businessSite: '사업장관리번호, ',
      administrationAgency: '사업장관리번호,',
      hasDownFile: true,
    }, {
      ID: 2,
      documentName: '국민연금 EDI 위임장',
      businessSite: '사업장관리번호, 업체명,',
      administrationAgency: '사업장관리번호, ',
      hasDownFile: true,
    }]);
    const globalYear = computed(() => store.state.settings.globalYear);
    const dataStateAC580 = computed(() => store.state.common.dataStateAC580);
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
        modalCreate.value = false;
        modalShowCreated.value = true;
      }
    }
    const handleCreate = () => {
      // refetch();
      modalCreate.value = false;
    };

    //---------------------------SHOW CREATED------------------

    const modalShowCreated = ref(false);
    const onShowCreateModdal = (emitVal: Boolean) => {
      if (!emitVal) {
        modalShowCreated.value = false;
      } else {
        modalShowCreated.value = false;
      }
    }

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
      workId: dataStateAC580.value.workId,
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
    // const { mutate: createMajor, onDone: createMajorDone, onError: createMajorError } = useMutation(mutations.createMajorInsuranceConsignStatus);
    // createMajorDone((res: any) => {
    //   notification('success', messageCreate);
    //   let data = res.data.createMajorInsuranceConsignStatus;
    //   dataStateAC580.value.registeredAt = data.registeredAt;
    // })
    // createMajorError((res: any) => {
    //   notification('error', res.message);
    // })

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
      if (!res.isValid || !dataStateAC580.value.check) {
        res?.brokenRules[0]?.validator.focus();
        notification('warning', messageDelNoItem);
      } else {
        let formData = {
          manageId: dataStateAC580.value.manageId,
          companyId: dataStateAC580.value.companyId,
        }
        // createMajor(formData);
        // renewMajor(formData);
      }
    }

    // watch(()=>dataStateAC580.value.tableType,(newVal)=>{
    //   if(newVal == 1) 
    //   if(newVal == 1)
    //   if(newVal == 1)
    //   if(newVal == 1)
    // })


    return {
      per_page, move_column, colomn_resize, dataSource,
      modalMail, modalPrint, modalDelete, modalCreate, modalShowCreated, modalHistory,
      onMailModal, onPrintModal, onDeleteModal, onCreateModal, onShowCreateModdal, onHistoryModal,
      mailData, printData,
      handleCreate, isDelete, handleDelete, contentDelete, dataStateAC580,
      onSubmit, dayjs, onSearch,
      rangeDate, deleteContent,
      employeeFashionArr, employeeFashionArr2,
    };
  },
})
</script>
<style lang="scss">
@import './styles/index.scss';
</style>
