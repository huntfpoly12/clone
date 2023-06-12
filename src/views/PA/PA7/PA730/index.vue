<template>
  <a-spin :spinning="loading" size="large">
    <action-header title="기타소득원천징수영수증 " @actionSearch="searching" :buttonSearch="true" />
    <div id="pa-730">
      <div class="search-form">
        <a-row>
          <a-col :span="22">
            <a-row :gutter="[24, 8]">
              <a-col>
                <div class="custom-flex global-year">
                  <label class="lable-item">귀속연도 :</label>
                  <a-tag color="#a3a2a0">귀 {{ paYear }}</a-tag>
                </div>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>
      <div class="page-content">
        <a-row class="header-group">
          <a-col :span="12">
            <a-form-item label="서식 설정">
              <div class="custom-flex">
                <switch-basic style="width: 120px;" v-model:valueSwitch="valueSwitch" :textCheck="'소득자 보관용'"
                  :textUnCheck="'발행자 보관용'" />
                <a-tooltip color="black" placement="top">
                  <template #title>본 설정으로 적용된 서식으로 출력 및 메일발송 됩니다.</template>
                  <img src="@/assets/images/iconInfo.png" class="img-info" />
                </a-tooltip>
              </div>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <div class="created-date">
              <label class="lable-item">영수일 :</label>
              <date-time-box width="150px" v-model:valueDate="valueDefaultIncomeExtra.input.receiptDate"></date-time-box>
            </div>
          </a-col>
        </a-row>
        <DxDataGrid id="gridContainerPA730" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
          :show-borders="true" @exporting="onExporting" :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize" ref="gridRef" :column-auto-width="true"
          @selection-changed="onSelectionChanged">
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
          <DxToolbar>
            <DxItem template="send-group-mail" />
            <DxItem template="send-group-print" />
          </DxToolbar>
          <template #send-group-mail>
              <DxButton @click="actionOpenPopupEmailGroup">
                <img src="@/assets/images/emailGroup.png" alt=""
                  style="width: 28px; margin-right: 3px; cursor: pointer" />
              </DxButton>
          </template>
          <template #send-group-print>
              <DxButton @click="onPrintGroup">
                <a-tooltip title="출력 / 저장" placement="topLeft">
                  <img src="@/assets/images/printGroup.png" alt=""
                    style="width: 28px; margin-right: 3px; cursor: pointer" />
                </a-tooltip>
              </DxButton>
          </template>
          <DxSelection select-all-mode="allPages" show-check-boxes-mode="onClick" mode="multiple" />
          <DxColumn caption="성명 (상호)" css-class="cell-left" cell-template="tag" width="200" data-field="employee.employeeId"/>
          <template #tag="{ data }">
              <employee-info :idEmployee="data.data.employee.employeeId" :name="data.data.employee.name"
                :idCardNumber="data.data.employee.residentId" :status="data.data.employee.status"
                :foreigner="data.data.employee.foreigner" :checkStatus="false" />
          </template>
          <DxColumn caption="주민등록번호" :width="130" cell-template="residentId" data-field="employee.residentId" />
          <template #residentId="{ data }">
            <resident-id :residentId="data.data.employee?.residentId"></resident-id>
          </template>
          <DxColumn caption="소득구분" cell-template="grade-cell" width="160" data-field="employee.incomeTypeCode"/>
          <template #grade-cell="{ data }">
            <income-type :typeCode="data.data.employee.incomeTypeCode" :typeName="data.data.employee.incomeTypeName">
            </income-type>
          </template>
          <DxColumn caption="지급총액" data-field="paymentAmount" format="fixedPoint" width="100" />
          <DxColumn caption="비과세소득" cell-template="show0" width="100" format="fixedPoint" data-type="number" />
          <template #show0>0</template>
          <DxColumn caption="필요경비" data-field="requiredExpenses" format="fixedPoint" width="100" />
          <DxColumn caption="소득금액" data-field="incomePayment" format="fixedPoint" width="100" />

          <DxColumn caption="원천징수세액 소득세" data-field="withholdingIncomeTax" format="fixedPoint" width="150" />
          <DxColumn caption="원천징수세액 지방소득세" data-field="withholdingLocalIncomeTax" format="fixedPoint" />
          <DxColumn caption="원천징수세액 농어촌특별세" cell-template="show0" width="150" data-type="number" />
          <DxColumn caption="원천징수세액계합계" cell-template="sumWithholding" data-field="total" width="150" data-type="number" />
          <template #sumWithholding="{ data }">
            {{ $filters.formatCurrency(data.data.total) }}
          </template>
          
          <DxColumn cell-template="pupop" :width="80"/>
          <template #pupop="{ data }">
            <div style="text-align: center">
              <img @click="actionOpenPopupEmailSingle(data.data)" src="@/assets/images/email.svg" alt=""
                style="width: 25px; margin-right: 3px; cursor: pointer" />
              <a-tooltip title="출력 / 저장" placement="topLeft">
                <img @click="onPrint(data.data)" src="@/assets/images/print.svg" alt="" style="width: 25px" />
              </a-tooltip>
            </div>
          </template>
        </DxDataGrid>
        <div v-if="dataSource.length"
            style="border: 1px solid #ddd; border-top: none; width: 100%; display: flex; justify-content: space-between; padding: 5px 20px;"
            class="fs-14">
            <div>
              <div class="dx-datagrid-summary-item dx-datagrid-text-content">
                <div>전체<span>[{{ dataSource.length }}]</span></div>
              </div>
            </div>
            <div style="margin-left: 20px;">
              <div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="customPaymentAmount()">
              </div>
            </div>
            <div style="margin-left: 20px;">
              <div class="dx-datagrid-summary-item dx-datagrid-text-content">
                <div>비과세소득합계<span>[0]</span></div>
              </div>
            </div>
            <div style="margin-left: 20px;">
              <div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="customRequiredExpenses()">
              </div>
            </div>
            <div style=" margin-left: 20px;">
              <div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="customIncomePayment()">
              </div>
            </div>
            <div style=" margin-left: 20px;">
              <div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="customWithholdingIncomeTax()">
              </div>
            </div>
            <div style=" margin-left: 20px;">
              <div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="customWithholdingLocalIncomeTax()">
              </div>
            </div>
            <div style=" margin-left: 20px;">
              <div class="dx-datagrid-summary-item dx-datagrid-text-content">
                <div>원천징수세액 지방소득세합계<span>[0]</span></div>
              </div>
            </div>
            <div style=" margin-left: 20px;">
              <div class="dx-datagrid-summary-item dx-datagrid-text-content" v-html="customTextSummary()">
              </div>
            </div>
          </div>
        <EmailSinglePopup :modalStatus="modalEmailSingle" @closePopup="onCloseEmailSingleModal" :data="popupSingleData" />
        <EmailGroupPopup :modalStatus="modalEmailGroup" @closePopup="onCloseEmailGroupModal" :data="popupGroupData" />
      </div>
      <!-- <PopupMessage :modalStatus="popupMailGroup" @closePopup="popupMailGroup = false" :typeModal="'warning'"
        :title="'Warning'" :content="'항목을 1개 이상 선택해야합니다'" /> -->
    </div>
  </a-spin>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import notification from "@/utils/notification";
import { useQuery } from '@vue/apollo-composable';
import DxButton from 'devextreme-vue/button';
import dayjs from 'dayjs';
import { DxDataGrid, DxColumn, DxPaging, DxSelection, DxSearchPanel, DxToolbar, DxItem, DxSummary, DxScrolling, DxTotalItem } from 'devextreme-vue/data-grid';
import { companyId, onExportingCommon } from "@/helpers/commonFunction";
import queries from '../../../../graphql/queries/PA/PA7/PA730/index';
import EmailSinglePopup from './components/PA730PopupSendSingleEmail.vue';
import EmailGroupPopup from './components/PA730PopupSendGroupEmail.vue';
import filters from "@/helpers/filters";
export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxScrolling,
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
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const valueSwitch = ref(true);
    const popupSingleData = ref({});
    const popupGroupData = ref({});
    let dataSelect = ref<any>([]);
    const store = useStore();
    const gridRef = ref(); // ref of grid
    const paYear = ref<number>(parseInt(sessionStorage.getItem("paYear") ?? '0'));
    const trigger = ref<boolean>(true);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const modalEmailSingle = ref(false);
    const modalEmailGroup = ref(false);
    const dataSource = ref([]);
    const originData = ref({
      companyId: companyId,
      imputedYear: paYear.value,
    });
    const valueDefaultIncomeExtra = ref({
      companyId: companyId,
      input: {
        imputedYear: paYear.value,
        type: 1,
        receiptDate: parseInt(dayjs().format('YYYYMMDD')),
      },
      employeeKeys: {
        employeeId: 0,
        incomeTypeCode: '',
      },
    });
    const {
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
      gridRef.value?.instance.deselectAll()
      popupSingleData.value = {
        companyId: companyId,
        input: {
          imputedYear: paYear.value,
          type: valueDefaultIncomeExtra.value.input.type,
          receiptDate: valueDefaultIncomeExtra.value.input.receiptDate,
        },
        employeeInputs: {
          senderName: sessionStorage.getItem('username'),
          receiverName: data.employee.name,
          receiverAddress: data.employee.email,
          employeeId: data.employee.employeeId,
          // incomeTypeCode: data.employee.incomeTypeCode,
        },
      };
      modalEmailSingle.value = true;
    };
    const onCloseEmailSingleModal = () => {
      modalEmailSingle.value = false;
    };
    const actionOpenPopupEmailGroup = () => {
      if (dataSelect.value.length) {
        popupGroupData.value = {
          companyId: companyId,
          input: {
            imputedYear: paYear.value,
            type: valueDefaultIncomeExtra.value.input.type,
            receiptDate: valueDefaultIncomeExtra.value.input.receiptDate,
          },
          employeeInputs: dataSelect.value,
        };
        modalEmailGroup.value = true;
      } else {
        notification('error', messages.getCommonMessage('404').message)
      }
    };
    const onSelectionChanged = (data: any) => {
      dataSelect.value = []
      data.selectedRowKeys.forEach((data: any) => {
        dataSelect.value.push({
          senderName: sessionStorage.getItem('username'),
          receiverName: data.employee.name,
          receiverAddress: data.employee.email,
          employeeId: data.employee.employeeId,
          // incomeTypeCode: data.employee.incomeTypeCode,
        })
      })
    };
    const onCloseEmailGroupModal = () => {
      modalEmailGroup.value = false;
    };
    watch(result, (value) => {
      if (value) {
        dataSource.value = value.searchIncomeExtraWithholdingReceipts.map((value: any) => {
          return {
            ...value,
            total: value.withholdingIncomeTax + value.withholdingLocalIncomeTax
          }
        });
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
    };
    // print area
    const receiptReportViewUrlTrigger = ref<boolean>(false);
    const receiptReportViewUrlParam = reactive({
      companyId: companyId,
      input: {
        imputedYear: paYear.value,
        type: valueDefaultIncomeExtra.value.input.type,
        receiptDate: valueDefaultIncomeExtra.value.input.receiptDate,
      },
      employeeIds: [null
        // employeeId: null,
        // incomeTypeCode: null,
      ],
    });
    const {
      result: resultReceiptReportViewUrl,
      loading: loadingReceiptViewUrl,
    } = useQuery(queries.getIncomeExtraWithholdingReceiptReportViewUrl, receiptReportViewUrlParam, () => ({
      enabled: receiptReportViewUrlTrigger.value,
      fetchPolicy: 'no-cache',
    }));
    const onPrint = (data: any) => {
      gridRef.value?.instance.deselectAll()
      receiptReportViewUrlParam.employeeIds = [data.employee.employeeId];
      receiptReportViewUrlParam.input = { imputedYear: paYear.value, type: valueDefaultIncomeExtra.value.input.type, receiptDate: valueDefaultIncomeExtra.value.input.receiptDate };
      receiptReportViewUrlTrigger.value = true;
      // refetchReceiptViewUrl();
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
      if (dataSelect.value.length) {
        var array: any = [];
        dataSelect.value.map((val: any) => {
          array.push(val.employeeId)
        })
        receiptReportViewUrlParam.employeeIds = array
        receiptReportViewUrlParam.input = { imputedYear: paYear.value, type: valueDefaultIncomeExtra.value.input.type, receiptDate: valueDefaultIncomeExtra.value.input.receiptDate };
        receiptReportViewUrlTrigger.value = true;
        // refetchReceiptViewUrl();
      } else {
        notification('error', messages.getCommonMessage('404').message)
      }
    };
    const customPaymentAmount = () => {
      let sum = 0
      dataSource.value?.map((row: any) => {
        sum += row.paymentAmount
      })
      return `지급총액합계 <span>[${filters.formatCurrency(sum)}]</span>`;
    }
    const customRequiredExpenses = () => {
      let sum = 0
      dataSource.value?.map((row: any) => {
        sum += row.requiredExpenses
      })
      return `필요경비합계 <span>[${filters.formatCurrency(sum)}]</span>`;
    }
    const customIncomePayment = () => {
      let sum = 0
      dataSource.value?.map((row: any) => {
        sum += row.incomePayment
      })
      return `소득금액합계 <span>[${filters.formatCurrency(sum)}]</span> `;
    }
    const customWithholdingIncomeTax = () => {
      let sum = 0
      dataSource.value?.map((row: any) => {
        sum += row.withholdingIncomeTax
      })
      return `원천징수세액 소득세합계 <span>[${filters.formatCurrency(sum)}]</span>`;
    }
    const customWithholdingLocalIncomeTax = () => {
      let sum = 0
      dataSource.value?.map((row: any) => {
        sum += row.withholdingLocalIncomeTax
      })
      return `원천징수세액 지방소득세합계 <span>[${filters.formatCurrency(sum)}]</span>`;
    }
    const customTextSummary = () => {
      let total = 0
      dataSource.value.map((val: any) => {
        total += val.withholdingIncomeTax + val.withholdingLocalIncomeTax
      })
      return `원천징수세액계합계 <span>[${filters.formatCurrency(total)}]</span> `
    }

    return {
      valueDefaultIncomeExtra,
      valueSwitch,
      loading,
      popupSingleData,
      popupGroupData,
      actionOpenPopupEmailSingle,
      gridRef,
      actionOpenPopupEmailGroup,
      searching,
      paYear,
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
      receiptReportViewUrlParam,
      customTextSummary,
      customPaymentAmount, customRequiredExpenses, customIncomePayment, customWithholdingIncomeTax, customWithholdingLocalIncomeTax,
    };
  },
});
</script>









<style lang="scss" scoped src="./style/style.scss" />
