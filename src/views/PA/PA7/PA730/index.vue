<template>
  <a-spin :spinning="loading" size="large">
    <action-header title="기타소득원천징수영수증 " @actionSearch="searching" />
    <div id="pa-730">
      <div class="search-form">
        <a-row>
          <a-col :span="22">
            <a-row :gutter="[24, 8]">
              <a-col>
                <div class="dflex custom-flex global-year">
                  <label class="lable-item">귀속연도 :</label>
                  <a-tag color="#a3a2a0">{{ globalYear }}</a-tag>
                </div>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>
      <div class="page-content">
        <a-row class="header-group">
          <a-col :span="12">
            <div class="format-settings">
              <strong>서식 설정 : </strong>
              <div class="format-settings-text"><img src="@/assets/images/iconInfo.png" style="width: 14px" /> 본 설정으로
                적용된 서식으로 출력 및 메일발송 됩니다.</div>
            </div>
          </a-col>
          <a-col :span="12">
            <div class="created-date">
              <label class="lable-item">영수일 :</label>
              <date-time-box width="150px" v-model:valueDate="valueDefaultIncomeExtra.input.receiptDate"></date-time-box>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <strong class="lable-item">소득자보관용: </strong>
            <switch-basic style="width: 120px" v-model:valueSwitch="valueSwitch" :textCheck="'소득자보관용'"
              :textUnCheck="'지급자 보관용'" />
          </a-col>
        </a-row>
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
          @exporting="onExporting" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
          :column-auto-width="true" @selection-changed="onSelectionChanged">
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
          <DxExport :enabled="true" :allow-export-selected-data="true" />
          <DxToolbar>
            <DxItem template="send-group-mail" />
            <DxItem template="send-group-print" />
          </DxToolbar>
          <template #send-group-mail>
            <div class="custom-mail-group">
              <DxButton @click="actionOpenPopupEmailGroup">
                <img src="@/assets/images/emailGroup.png" alt=""
                  style="width: 35px; margin-right: 3px; cursor: pointer" />
              </DxButton>
            </div>
          </template>
          <template #send-group-print>
            <div class="custom-mail-group">
              <DxButton @click="onPrintGroup">
                <img src="@/assets/images/printGroup.png" alt=""
                  style="width: 35px; margin-right: 3px; cursor: pointer" />
              </DxButton>
            </div>
          </template>
          <DxSelection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" />
          <DxColumn caption="성명 (상호)" cell-template="tag" width="150" />
          <template #tag="{ data }" class="custom-action">
            <div class="custom-action">
              <employee-info :idEmployee="data.data.employee.employeeId" :name="data.data.employee.name"
                :idCardNumber="data.data.employee.residentId" :status="data.data.employee.status"
                :foreigner="data.data.employee.foreigner" :checkStatus="false" />
            </div>
          </template>
          <DxColumn caption="주민등록번호" data-field="employee.residentId" />
          <DxColumn caption="소득구분" cell-template="grade-cell" width="160" />
          <template #grade-cell="{ data }" class="custom-action">
            <income-type :typeCode="data.data.employee.incomeTypeCode" :typeName="data.data.employee.incomeTypeName">
            </income-type>
          </template>
          <DxColumn caption="지급총액" data-field="paymentAmount" format="fixedPoint" width="100" />
          <DxColumn caption="비과세소득" cell-template="show0" width="100" class="text-right" data-type="number" />
          <template #show0>0</template>
          <DxColumn caption="필요경비" data-field="requiredExpenses" format="fixedPoint" width="100" />
          <DxColumn caption="소득금액" data-field="incomePayment" format="fixedPoint" width="100" />

          <DxColumn caption="원천징수세액 소득세" data-field="withholdingIncomeTax" format="fixedPoint" width="150" />
          <DxColumn caption="원천징수세액 지방소득세" data-field="withholdingLocalIncomeTax" format="fixedPoint" width="150" />
          <DxColumn caption="원천징수세액 농어촌특별세" cell-template="show0" width="150" data-type="number" />
          <DxColumn caption="원천징수세액계합계" cell-template="sumWithholding" width="150" data-type="number" />
          <template #sumWithholding="{ data }">
            {{ $filters.formatCurrency(data.data.withholdingIncomeTax + data.data.withholdingLocalIncomeTax) }}
          </template>
          <DxSummary>
            <DxTotalItem show-in-column="성명 (상호)" summary-type="count" display-format="전체: {0}" />
            <DxTotalItem column="paymentAmount" summary-type="sum" display-format="지급총액합계: {0}" value-format="#,###" />
            <DxTotalItem show-in-column="비과세소득" summary-type="sum" display-format="비과세소득합계: 0" value-format="#,###" />
            <DxTotalItem column="requiredExpenses" summary-type="sum" display-format="필요경비합계: {0}"
              value-format="#,###" />
            <DxTotalItem column="incomePayment" summary-type="sum" display-format="소득금액합계: {0}" value-format="#,###" />
            <DxTotalItem column="withholdingIncomeTax" summary-type="sum" display-format="원천징수세액 소득세합계: {0}"
              value-format="#,###" />
            <DxTotalItem column="withholdingLocalIncomeTax" summary-type="sum" display-format="원천징수세액 지방소득세합계: {0}"
              value-format="#,###" />
            <DxTotalItem show-in-column="원천징수세액 농어촌특별세" summary-type="sum" display-format="원천징수세액 지방소득세합계: 0"
              value-format="#,###" />
            <DxTotalItem column="원천징수세액계합계" :customize-text="customTextSummary"
              value-format="#,###" />
          </DxSummary>
          <DxColumn :width="80" cell-template="pupop" />
          <template #pupop="{ data }" class="custom-action">
            <div class="custom-action" style="text-align: center">
              <img @click="actionOpenPopupEmailSingle(data.data)" src="@/assets/images/email.svg" alt=""
                style="width: 25px; margin-right: 3px; cursor: pointer" />
              <img @click="onPrint(data.data)" src="@/assets/images/print.svg" alt="" style="width: 25px" />
            </div>
          </template>
        </DxDataGrid>
        <EmailSinglePopup :modalStatus="modalEmailSingle" @closePopup="onCloseEmailSingleModal"
          :data="popupSingleData" />
        <EmailGroupPopup :modalStatus="modalEmailGroup" :emailUserLogin="emailUserLogin"
          @closePopup="onCloseEmailGroupModal" :data="popupGroupData" />
      </div>
      <PopupMessage :modalStatus="popupMailGroup" @closePopup="popupMailGroup = false" :typeModal="'warning'"
        :title="'Warning'" :content="'항목을 1개 이상 선택해야합니다'" />
    </div>
  </a-spin>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { useQuery } from '@vue/apollo-composable';
import DxButton from 'devextreme-vue/button';
import dayjs, { Dayjs } from 'dayjs';
import { DxDataGrid, DxColumn, DxPaging, DxExport, DxSelection, DxSearchPanel, DxToolbar, DxItem, DxSummary, DxTotalItem } from 'devextreme-vue/data-grid';
import { companyId, onExportingCommon, userId } from "@/helpers/commonFunction";
import queries from '../../../../graphql/queries/PA/PA7/PA730/index';
import EmailSinglePopup from './components/PA730PopupSendSingleEmail.vue';
import EmailGroupPopup from './components/PA730PopupSendGroupEmail.vue';
import queriesGetUser from '@/graphql/queries/BF/BF2/BF210/index';
import filters from "@/helpers/filters";
export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxExport,
    DxSearchPanel,
    DxToolbar,
    DxItem,
    DxButton,
    DxSummary,
    DxTotalItem,
    EmailSinglePopup,
    EmailGroupPopup,
  },
  setup() {
    const valueSwitch = ref(true);
    const popupSingleData = ref({});
    const popupGroupData = ref({});
    let dataSelect = ref<any>([]);
    const store = useStore();

    const globalYear = computed(() => store.state.settings.globalYear);
    const trigger = ref<boolean>(true);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const modalEmailSingle = ref(false);
    const modalEmailGroup = ref(false);
    const dataSource = ref([]);
    const originData = ref({
      companyId: companyId,
      imputedYear: globalYear,
    });
    const valueDefaultIncomeExtra = ref({
      companyId: companyId,
      input: {
        imputedYear: globalYear,
        type: 1,
        receiptDate: parseInt(dayjs().format('YYYYMMDD')),
      },
      employeeKeys: {
        employeeId: 0,
        incomeTypeCode: '',
      },
    });
    const {
      refetch: refetchData,
      result,
      loading,
    } = useQuery(queries.searchIncomeExtraWithholdingReceipts, originData, () => ({
      enabled: trigger.value,
      fetchPolicy: 'no-cache',
    }));
    const onExporting = (e: { component: any; cancel: boolean }) => {
      onExportingCommon(e.component, e.cancel, '계약정보관리&심사');
    };
    const actionOpenPopupEmailSingle = (data: any) => {
      popupSingleData.value = {
        companyId: companyId,
        input: {
          imputedYear: globalYear,
          type: valueDefaultIncomeExtra.value.input.type,
          receiptDate: valueDefaultIncomeExtra.value.input.receiptDate,
        },
        employeeInputs: {
          senderName: sessionStorage.getItem('username'),
          receiverName: data.employee.name,
          receiverAddress: data.employee.email,
          employeeId: data.employee.employeeId,
          incomeTypeCode: data.employee.incomeTypeCode,
        },
      };
      modalEmailSingle.value = true;
    };
    const onCloseEmailSingleModal = () => {
      modalEmailSingle.value = false;
    };
    const actionOpenPopupEmailGroup = () => {
      if (!isClickRow.value) {
        popupMailGroup.value = true;
        return;
      }
      if (isOnlyEmployee.value) {
        popupMailGroup.value = true;
        return;
      }
      popupGroupData.value = {
        companyId: companyId,
        input: {
          imputedYear: globalYear,
          type: valueDefaultIncomeExtra.value.input.type,
          receiptDate: valueDefaultIncomeExtra.value.input.receiptDate,
        },
        employeeInputs: dataSelect.value,
      };
      modalEmailGroup.value = true;
    };
    //popupMailGroup
    const isOnlyEmployee = ref<boolean>(false);
    const popupMailGroup = ref<boolean>(false);
    const isClickRow = ref<boolean>(false);
    const onSelectionChanged = (data: any) => {
      isClickRow.value = true;
      isOnlyEmployee.value = data.selectedRowKeys.length < 1;
      if (!isOnlyEmployee.value) {
        dataSelect.value = data.selectedRowKeys.map((val: any) => {
          return {
            senderName: sessionStorage.getItem('username'),
            receiverName: val.employee.name,
            receiverAddress: val.employee.email,
            employeeId: val.employee.employeeId,
            incomeTypeCode: val.employee.incomeTypeCode,
          };
        });
        data.selectedRowKeys.value = dataSelect;
      }
    };
    const onCloseEmailGroupModal = () => {
      // dataSelect = ref<any>([]);
      modalEmailGroup.value = false;
    };
    watch(result, (value) => {
      if (value) {
        dataSource.value = value.searchIncomeExtraWithholdingReceipts;
        trigger.value = false;
      }
    });
    watch(valueSwitch, (newValue) => {
      if (newValue) {
        valueDefaultIncomeExtra.value.input.type = 1;
      } else {
        valueDefaultIncomeExtra.value.input.type = 2;
      }
    });

    const searching = () => {
      trigger.value = true;
      refetchData();
    };
    // print area
    const receiptReportViewUrlTrigger = ref<boolean>(false);
    const receiptReportViewUrlParam = reactive({
      companyId: companyId,
      input: {
        imputedYear: globalYear,
        type: valueDefaultIncomeExtra.value.input.type,
        receiptDate: valueDefaultIncomeExtra.value.input.receiptDate,
      },
      employeeKeys: [{
        employeeId: null,
        incomeTypeCode: null,
      }],
    });
    const {
      result: resultReceiptReportViewUrl,
      refetch: refetchReceiptViewUrl,
      loading: loadingReceiptViewUrl,
    } = useQuery(queries.getIncomeExtraWithholdingReceiptReportViewUrl, receiptReportViewUrlParam, () => ({
      enabled: receiptReportViewUrlTrigger.value,
      fetchPolicy: 'no-cache',
    }));
    const onPrint = (data: any) => {
      receiptReportViewUrlParam.employeeKeys = [{ employeeId: data.employee.employeeId, incomeTypeCode: data.employee.incomeTypeCode }];
      receiptReportViewUrlParam.input = { imputedYear: globalYear, type: valueDefaultIncomeExtra.value.input.type, receiptDate: valueDefaultIncomeExtra.value.input.receiptDate };
      receiptReportViewUrlTrigger.value = true;
      refetchReceiptViewUrl();
    };
    watch(
      resultReceiptReportViewUrl,
      (newValue) => {
        window.open(newValue.getIncomeExtraWithholdingReceiptReportViewUrl);
        receiptReportViewUrlTrigger.value = false;
      },
      { deep: true }
    );
    const onPrintGroup = () => {
      var array:any = [];
      console.log(dataSelect.value);
      
       dataSelect.value.map((val: any) => {
        array.push({
          employeeId: val.employeeId,
          incomeTypeCode: val.incomeTypeCode
        })
      })
      receiptReportViewUrlParam.employeeKeys = array
      receiptReportViewUrlParam.input = { imputedYear: globalYear, type: valueDefaultIncomeExtra.value.input.type, receiptDate: valueDefaultIncomeExtra.value.input.receiptDate };
      receiptReportViewUrlTrigger.value = true;
      refetchReceiptViewUrl();
    };
    // group mail
    const { onResult: onResultUserInf } = useQuery(queriesGetUser.getUser, { id: userId }, () => ({
      fetchPolicy: 'no-cache',
    }));
    const emailUserLogin = ref('');
    onResultUserInf((e) => {
      emailUserLogin.value = e.data.getUser.email;
    });
    const customTextSummary = () => {
      let total = 0
      dataSource.value.map((val: any) => {
        total += val.withholdingIncomeTax + val.withholdingLocalIncomeTax
      })
      return '원천징수세액계합계: ' + filters.formatCurrency(total)
    }
    watch(globalYear, (newValue) => {
      trigger.value = true;
    })
    return {
      valueDefaultIncomeExtra,
      valueSwitch,
      loading,
      popupSingleData,
      popupGroupData,
      actionOpenPopupEmailSingle,
      actionOpenPopupEmailGroup,
      searching,
      globalYear,
      dataSource,
      move_column,
      colomn_resize,
      onExporting,
      modalEmailSingle,
      modalEmailGroup,
      onCloseEmailSingleModal,
      onCloseEmailGroupModal,
      onSelectionChanged,
      onPrint, onPrintGroup,
      emailUserLogin,
      isOnlyEmployee,
      popupMailGroup,
      receiptReportViewUrlParam,
      customTextSummary,
    };
  },
});
</script>





<style lang="scss" scoped src="./style/style.scss" />
