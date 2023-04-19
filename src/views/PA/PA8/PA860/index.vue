<template>
  <action-header title="보험사무대행신고" :buttonDelete="false" :buttonSearch="false" :buttonPrint="false" :buttonSave="false" />
  <div id="pa-860" class="p-20">
    <!-- {{ dataState }} dataState <br /> -->
    <div class="top-container">
      <div style="font-weight: 600;">보험사무대행 신청일:</div>
      <div class="ml-30" v-if="dataState.registeredAt">* {{ dayjs(dataState.registeredAt).format('YYYY-MM-DD hh:mm') }} 에
        보험사무대행 동의 및 신청되었습니다.</div>
      <div class="ml-30" v-else>* 보험사무대행 신청이력이 없습니다. 사업장관리번호를 입력하시고, 보험사무대행 신청을 해주시기 바랍니다.</div>
      <!-- {{ dataState.manageId.length }} -->
      <!-- {{ checkManageIdLen() }} -->
      <div class="input-form d-flex-center">
        <label class="mr-10" style="font-weight: 600;">사업장관리번호: </label>
        <text-number-box width="200px" v-model:valueInput="dataState.manageId" :ruleCustom="() => checkManageIdLen"
          :messageRuleCustom="'this field must have 11 digits'" />
      </div>
      <div style="font-weight: 600;">보험사무대행 신청서류 일괄 생성안내:</div>
    </div>
    <div class="table-ctn">
      <a-spin :spinning="false" size="large">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
          key-expr="ID" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
          :column-auto-width="true" :focused-row-enabled="true" ref="taxPayDataRef">
          <DxPaging :page-size="0" />
          <DxColumn caption="문서명" data-field="documentName" />
          <DxColumn caption="사업장정보" data-field="businessSite" />
          <DxColumn caption="사무대행업체정보" data-field="administrationAgency" />
          <DxColumn caption="다운로드" cell-template="downA" />
          <template #downA="{ data }" class="custom-action">
            <div class="d-flex justify-content-center" v-if="data.data.hasDownFile">
              <DxButton type="ghost" class="" style="cursor: pointer" @click="onGetAcquistionRp(data.data.ID)">
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
          @onClick="onSubmit($event)" :disabled="!checkManageIdLen"/>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxScrolling,
} from 'devextreme-vue/data-grid';
import { DownloadOutlined } from '@ant-design/icons-vue';
import { companyId } from '@/helpers/commonFunction';
import queries from '@/graphql/queries/PA/PA8/PA860/index';
import mutations from '@/graphql/mutations/PA/PA8/PA860/index';
import DxButton from 'devextreme-vue/button';
import { Message } from "@/configs/enum";
import notification from '@/utils/notification';
import { useQuery, useMutation } from '@vue/apollo-composable';
import dayjs from 'dayjs';

export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxScrolling,
    DxButton,
    DownloadOutlined
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
    const dataState = ref({
      registeredAt: '',
      manageId: '',
      check: false,
      companyId: companyId,
      workId: 1,
    })
    const globalYear = computed(() => store.state.settings.globalYear);
    //---------------------------add new data------------------
    const isOpenModalCreate = ref(false);
    const openAddNewModal = () => {
      isOpenModalCreate.value = true;
    }
    const handleCreate = () => {
      // refetch();
      isOpenModalCreate.value = false;
    };
    // -----------------------------history-------------------

    const modalHistory = ref(false);
    const onOpenLogs = (e: any) => {
      modalHistory.value = true;
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
    // const { mutate: createMajor, onDone: createMajorDone, onError: createMajorError } = useMutation(mutations.createMajorInsuranceConsignStatus);
    // createMajorDone((res: any) => {
    //   notification('success', messageCreate);
    //   let data = res.data.createMajorInsuranceConsignStatus;
    //   dataState.value.registeredAt = data.registeredAt;
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
      if (!res.isValid || !dataState.value.check) {
        res?.brokenRules[0]?.validator.focus();
        notification('warning', messageDelNoItem);
      } else {
        let formData = {
          manageId: dataState.value.manageId,
          companyId: dataState.value.companyId,
        }
        // createMajor(formData);
        // renewMajor(formData);
      }
    }

    // ----------------------------------CHECK dataState.manageId LENGTH --------------------------------

    const checkManageIdLen = ref(false);
    watch(() => dataState.value.manageId, (value) => {
      // console.log(`output->value`, value)
      checkManageIdLen.value = value.length == 11;
    }, { deep: true })
    return {
      per_page, move_column, colomn_resize,
      dataSource, modalHistory,
      openAddNewModal, onOpenLogs, actionDelete, onGetFileStorageId, onGetAcquistionRp,
      handleCreate, isOpenModalCreate, isDelete, handleDelete, contentDelete, dataState,
      onSubmit, dayjs,
      checkManageIdLen,
    };
  },
})
</script>
<style lang="scss">
@import './styles/index.scss';
</style>