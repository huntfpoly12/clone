<template>

  <action-header title="거주자의 사업소득원천징수영수증 " />
  <div id="pa-430">
    <div class="search-form">
      <div class=" custom-flex">
        <a-row>
          <a-col :span="24">
            <label class="lable-item">소득자보관용: </label>
            <switch-basic style="width: 120px;" v-model:valueSwitch="valueSwitch" :textCheck="'지급'"
              :textUnCheck="'귀속'" />
          </a-col>
        </a-row>
        <a-col>
          <div class=" custom-flex">
            <label class="lable-item">영수일:</label>
            <a-range-picker :placeholder="['2022-09', '2022-11']" format="YYYY-MM" :value="value" :mode="mode2"
              locale="ko" @panelChange="handlePanelChange2" @change="handleChange" />
          </div>
        </a-col>
        <a-col>
          <div class=" selectRatio">
            <strong class="lable-item">구분 :</strong>
            <radio-group :arrayValue="arrayRadioCheck" v-model:valueRadioCheck="valueRadioBox"
              :layoutCustom="'horizontal'" />
          </div>
        </a-col>
      </div>

    </div>
    <div class="page-content">
      <div class="page-content-top">
        <a-col :span="12">
          <div class="format-settings">
            <strong>서식 설정: </strong>
            <div class="format-settings-text">
              <img src="@/assets/images/iconInfo.png" style="width: 14px;" />
              <span>
                본 설정으로 적용된 서식으로 출력 및 메일발송 됩니다.
              </span>
            </div>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="created-date">
            <strong class="lable-item">영수일 :</strong>
            <date-time-box width="150px" v-model:valueDate="valueDefaultIncomeRetirement.input.receiptDate">
            </date-time-box>
          </div>
        </a-col>

      </div>
      <a-col>
        <strong class="lable-item">소득자보관용 :</strong>
        <switch-basic v-model:valueSwitch="valueSwitch2" :textCheck="'발행자보관용'" :textUnCheck="'발행자보관용'" />
      </a-col>
      <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
        @exporting="onExporting" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
        :column-auto-width="true" @selection-changed="selectionChanged">
        <!-- <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
                  <DxExport :enabled="true" :allow-export-selected-data="true" /> -->
        <DxToolbar>
          <!-- <DxItem name="searchPanel" />
                      <DxItem name="exportButton" />
                      <DxItem name="groupPanel" />
                      <DxItem name="addRowButton" show-text="always" />
                      <DxItem name="columnChooserButton" /> -->
          <DxItem template="send-group-mail" />
        </DxToolbar>
        <template #send-group-mail>
          <div class="custom-mail-group">
            <DxButton @click="actionOpenPopupEmailMulti">
              <img src="@/assets/images/emailGroup.png" alt="" style="width: 33px;" />
            </DxButton>
          </div>
        </template>
        <DxSelection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" />
        <DxColumn :width="250" caption="사원" cell-template="tag" />
        <template #tag="{ data }" class="custom-action">
          <div class="custom-action">
            <employee-info :idEmployee="data.data.employee.employeeId" :name="data.data.employee.name"
              :idCardNumber="data.data.employee.residentId" :status="data.data.employee.status"
              :foreigner="data.data.employee.foreigner" :checkStatus="false" />
          </div>
        </template>
        <DxColumn data-field="employee.status" caption="구분 " cell-template="grid-cell" css-class="cell-center" />
        <template #grid-cell="{ data }">
          <a-tag :color="getColorTag(data.value)?.name">{{
              getColorTag(data.value)?.tag_name
          }}</a-tag>
        </template>
        <DxColumn caption="입사일 (정산시작일) " data-field="employee.residentId" />

        <DxColumn caption="퇴사일 (정산종료일) " cell-template="grade-cell" :width="150" />
        <template #grade-cell="{ data }" class="custom-action">
          <income-type :typeCode="data.data.employee.incomeTypeCode" :typeName="data.data.employee.incomeTypeName">
          </income-type>
        </template>
        <DxColumn caption="귀속연월" data-field="paymentAmount" />
        <DxColumn caption="지급연월" data-field="withholdingIncomeTax" />
        <DxColumn caption="퇴직급여" data-field="withholdingLocalIncomeTax" />
        <DxColumn caption="비과세 퇴직급여" data-field="paymentAmount" />
        <DxColumn caption="과세대상 퇴직급여" data-field="test1" />
        <DxColumn caption="공제" data-field="test1" />
        <DxColumn caption="차인지급액" data-field="test1" />
        <DxColumn caption="비고" data-field="test1" />
        <DxColumn :width="80" cell-template="pupop" />
        <template #pupop="{ data }" class="custom-action">
          <div class="custom-action" style="text-align: center;">
            <img @click="actionOpenPopupEmailSingle(data.data)" src="@/assets/images/email.svg" alt=""
              style="width: 25px; margin-right: 3px;" />
            <img src="@/assets/images/print.svg" alt="" style="width: 25px;" />
          </div>
        </template>
        <DxSummary>
          <DxTotalItem show-in-column="성명 (상호)" />
          <DxTotalItem column="paymentAmount" summary-type="sum" />
          <DxTotalItem column="withholdingIncomeTax" summary-type="sum" />
          <DxTotalItem column="requiredExpenses" summary-type="sum" />
          <DxTotalItem column="incomePayment" summary-type="sum" />
          <DxTotalItem column="withholdingLocalIncomeTax" summary-type="sum" />
          <DxTotalItem column="비과세 퇴직급여" summary-type="sum" />
          <DxTotalItem column="과세대상 퇴직급여" summary-type="sum" />
          <DxTotalItem column="공제" summary-type="sum" />
          <DxTotalItem column="차인지급액" summary-type="sum" />
          <DxTotalItem column="비고" summary-type="sum" />
        </DxSummary>
      </DxDataGrid>

    </div>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from "vue";
import { useStore } from "vuex";
import { useQuery } from "@vue/apollo-composable";
import DxButton from "devextreme-vue/button";
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxExport,
  DxSelection,
  DxSearchPanel,
  DxToolbar,
  DxItem, DxSummary, DxTotalItem
} from "devextreme-vue/data-grid";
import {
  companyId,
  onExportingCommon,
  userId,
} from "@/helpers/commonFunction";


export default defineComponent({
  components: {
    DxButton,
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxExport,
    DxSearchPanel,
    DxToolbar,
    DxItem, DxSummary, DxTotalItem,

  },
  setup() {
    const valueSwitch = ref(true);
    const valueSwitch2 = ref(true);
    const popupDataEmailSingle = ref({})
    const popupDataEmailMulti = ref({})
    const dataSelect = ref<any>([])
    const store = useStore();

    const globalYear = computed(() => store.state.settings.globalYear);
    const trigger = ref<boolean>(true);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const modalEmailSingle = ref(false)
    const modalEmailMulti = ref(false)
    const dataSource = ref([
      {
        paymentAmount: 2,
        withholdingIncomeTax: 5,
        withholdingLocalIncomeTax: 20,
        employee: {
          type: 1,
          employeeId: 40,
          incomeTypeCode: 'qweqw',
          name: 'rqweqwe',
          email: 'qrqweqw@gmail.com',
          foreigner: false,
          residentIdValidity: true,
          status: 10,
          residentId: '12312412',
          incomeTypeName: '31231'
        }
      },
      {
        paymentAmount: 2,
        withholdingIncomeTax: 5,
        withholdingLocalIncomeTax: 20,
        employee: {
          type: 1,
          employeeId: 40,
          incomeTypeCode: '3123',
          name: '412312',
          email: 'sdqe13@gmail.com',
          foreigner: true,
          residentIdValidity: true,
          status: 20,
          residentId: '4123',
          incomeTypeName: '1231'
        }
      },


    ]);
    const arrayRadioCheck = ref([
      { id: 0, text: "전체" },
      { id: 1, text: "퇴직소득" },
      { id: 2, text: "중간정산" },
    ]);
    const valueRadioBox = ref(0);
    const mode2 = ref(["month", "month"]);
    const value = ref([]);
    const handleChange = (val: any) => {
      value.value = val;
    };
    const handlePanelChange2 = (val: any, mode: any) => {
      value.value = val;
      mode2.value = [
        mode[0] === "date" ? "month" : mode[0],
        mode[1] === "date" ? "month" : mode[1],
      ];
    };
    const getColorTag = (data: any) => {
      if (data == 10) {
        return { name: "red", tag_name: "신청" };
      } else if (data == 20) {
        return { name: "blue", tag_name: "심사중" };
      } else if (data == 30) {
        return { name: "green", tag_name: "승인" };
      } else if (data == 99) {
        return { name: "grey", tag_name: "반려" };
      }
    };
    const originData = ref({
      companyId: companyId,
      imputedYear: globalYear,
    });
    const valueDefaultIncomeRetirement = ref({
      companyId: companyId,
      input: {
        imputedYear: globalYear,
        type: 1,
        receiptDate: new Date().toJSON().slice(0, 10),
      },
      employeeKeys: {
        employeeId: 0,
        incomeTypeCode: ""
      }
    });

    const onExporting = (e: { component: any; cancel: boolean }) => {
      onExportingCommon(e.component, e.cancel, "계약정보관리&심사");
    };
    const actionOpenPopupEmailSingle = (data: any) => {
      popupDataEmailSingle.value = {
        companyId: companyId,
        input: {
          imputedYear: globalYear,
          type: valueDefaultIncomeRetirement.value.input.type,
          receiptDate: valueDefaultIncomeRetirement.value.input.receiptDate,
        },
        employeeInputs: {
          senderName: sessionStorage.getItem("username"),
          receiverName: data.employee.name,
          receiverAddress: data.employee.email,
          employeeId: data.employee.employeeId,
          incomeTypeCode: data.employee.incomeTypeCode
        }
      }
      modalEmailSingle.value = true
    }
    const onCloseEmailSingleModal = () => {
      modalEmailSingle.value = false
    }
    const onCloseEmailMultiModal = () => {
      modalEmailMulti.value = false
    }

    const actionOpenPopupEmailMulti = () => {
      popupDataEmailMulti.value = {
        companyId: companyId,
        input: {
          imputedYear: globalYear,
          type: valueDefaultIncomeRetirement.value.input.type,
          receiptDate: valueDefaultIncomeRetirement.value.input.receiptDate,
        },
        employeeInputs: dataSelect.value
      }
      // console.log(popupDataEmailMulti.value);

      modalEmailMulti.value = true
    }

    const selectionChanged = (data: any) => {
      data.selectedRowKeys.forEach((data: any) => {
        dataSelect.value.push({
          senderName: sessionStorage.getItem("username"),
          receiverName: data.employee.name,
          receiverAddress: data.employee.email,
          employeeId: data.employee.employeeId,
          incomeTypeCode: data.employee.incomeTypeCode
        })
      })
    }

    watch(valueSwitch, (newValue) => {
      if (newValue) {
        valueDefaultIncomeRetirement.value.input.type = 1
      } else {
        valueDefaultIncomeRetirement.value.input.type = 2
      }
    });
    watch(valueSwitch2, (newValue) => {
      if (newValue) {
        valueDefaultIncomeRetirement.value.input.type = 1
      } else {
        valueDefaultIncomeRetirement.value.input.type = 2
      }
    });


    const sendMail = (sendType: string) => {
      alert(sendType);
    }
    return {
      valueDefaultIncomeRetirement,
      valueSwitch, valueSwitch2,

      popupDataEmailSingle,
      popupDataEmailMulti,
      actionOpenPopupEmailSingle,
      actionOpenPopupEmailMulti,

      globalYear,
      dataSource,
      sendMail,
      move_column,
      colomn_resize,
      onExporting,
      modalEmailSingle,
      modalEmailMulti,
      onCloseEmailSingleModal,
      onCloseEmailMultiModal,
      selectionChanged,

      mode2,
      value,
      handleChange,
      handlePanelChange2,
      valueRadioBox,
      arrayRadioCheck,
      getColorTag
    };
  },
});
</script>
























































































































<style lang="scss" scoped src="./style/style.scss" />
