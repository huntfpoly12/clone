<template>
  <action-header title="기타소득자등록" @actionSave="onSubmit($event)" />
  <div id="pa-720" class="page-content">
    <a-row>
      <a-spin :spinning="loading" size="large">
        <DxDataGrid
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="getIncomeProcessExtrasFake"
          :show-borders="true"
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
        >
          <DxColumn
            :caption="imputedYear + '귀속월'"
            cell-template="imputed-year"
            width="350px"
          />
          <template #imputed-year="{ data }">
            <span
              >지급연월 {{ data.data.paymentYear }}-{{
                data.data.paymentMonth
              }}</span
            >
          </template>
          <!-- <DxColumn :caption="imputedMonth" cell-template="imputed-month" />
                    <template #imputed-month="{ data }">
                        <span>{{ data.data.paymentYear }}-{{ data.data.paymentMonth }}</span>
                    </template> -->
          <DxColumn caption="01" cell-template="imputed-month1" />
          <template #imputed-month1="{ data }">
            <colorful-badge
              :value="40"
              :year="data.data.paymentYear"
              :month="data.data.paymentMonth"
            />
          </template>
          <DxColumn caption="02" cell-template="imputed-month2" />
          <template #imputed-month2="{ data }">
            <colorful-badge
              :value="40"
              :year="data.data.paymentYear"
              :month="data.data.paymentMonth"
              @click="onOpenTax"
              :isUnder="true"
            />
          </template>
          <DxColumn caption="03" cell-template="imputed-month3" />
          <template #imputed-month3="{ data }">
            <colorful-badge
              :value="40"
              :year="data.data.paymentYear"
              :month="data.data.paymentMonth"
            />
          </template>
          <DxColumn caption="04" cell-template="imputed-month4" />
          <template #imputed-month4="{ data }">
            <colorful-badge
              :value="40"
              :year="data.data.paymentYear"
              :month="data.data.paymentMonth"
            />
          </template>
          <DxColumn caption="05" cell-template="imputed-month5" />
          <template #imputed-month5="{ data }">
            <colorful-badge
              :value="40"
              :year="data.data.paymentYear"
              :month="data.data.paymentMonth"
            />
          </template>
          <DxColumn caption="06" cell-template="imputed-month6" />
          <template #imputed-month6="{ data }">
            <colorful-badge
              :value="40"
              :year="data.data.paymentYear"
              :month="data.data.paymentMonth"
            />
          </template>
          <DxColumn caption="07" cell-template="imputed-month7" />
          <template #imputed-month7="{ data }">
            <colorful-badge
              :value="40"
              :year="data.data.paymentYear"
              :month="data.data.paymentMonth"
            />
          </template>
          <DxColumn caption="08" cell-template="imputed-month8" />
          <template #imputed-month8="{ data }">
            <colorful-badge
              :value="40"
              :year="data.data.paymentYear"
              :month="data.data.paymentMonth"
            />
          </template>
          <DxColumn caption="09" cell-template="imputed-month9" />
          <template #imputed-month9="{ data }">
            <colorful-badge
              :value="40"
              :year="data.data.paymentYear"
              :month="data.data.paymentMonth"
            />
          </template>
          <DxColumn caption="10" cell-template="imputed-month10" />
          <template #imputed-month10="{ data }">
            <colorful-badge
              :value="40"
              :year="data.data.paymentYear"
              :month="data.data.paymentMonth"
            />
          </template>
          <DxColumn caption="11" cell-template="imputed-month11" />
          <template #imputed-month11="{ data }">
            <colorful-badge
              :value="40"
              :year="data.data.paymentYear"
              :month="data.data.paymentMonth"
            />
          </template>
          <DxColumn caption="12" cell-template="imputed-month12" />
          <template #imputed-month12="{ data }">
            <colorful-badge
              :value="40"
              :year="data.data.paymentYear"
              :month="data.data.paymentMonth"
            />
          </template>
          <DxMasterDetail :enabled="true" template="row-detail" />
          <template #row-detail="{ data }">
            hihihihii
            <a-form-item label="장기요양기관등록번호" class="clr">
            </a-form-item>
            <div style="display: flex">
              {{ data.data }}
            </div>
          </template>
        </DxDataGrid>
      </a-spin>
    </a-row>
    <a-row
      style="
        border: 1px solid #d7d7d7;
        padding: 10px;
        margin-top: 10px;
        justify-content: space-between;
      "
    >
      <a-col>
        <DxButton
          :text="'귀' + imputedYear + imputedMonth"
          :style="{ color: 'white', backgroundColor: 'gray' }"
          :height="'33px'"
        />
        <DxButton
          :text="'지' + imputedYear + imputedMonth"
          :style="{ color: 'white', backgroundColor: 'black' }"
          :height="'33px'"
        />
        <ProcessStatus v-model:valueStatus="price" />
      </a-col>
      <a-col class="">
        <DxButton class="ml-3" @click="deleteItem">
          <img
            style="width: 17px"
            src="@/assets/images/icon_delete.png"
            alt=""
          />
        </DxButton>
        <DxButton class="ml-3" icon="plus" />
        <DxButton class="ml-3" icon="edit" @click="editItem" />

        <DxDropDownButton
          class="ml-3"
          :items="arrDropDownPayrollRegister"
          text="급여대장"
          @item-click="onItemClick"
          item-template="item-field"
        >
          <template #item-field="{ data }">
            <div style="text-align: center">
              <img
                :src="'../../../../../src/assets/images/' + data.img"
                alt=""
                style="width: 25px; height: 25px"
              />
            </div>
          </template>
        </DxDropDownButton>
        <DxDropDownButton
          class="ml-3"
          :items="arrDropDownSalaryStatement"
          text="급여명세서"
          @item-click="onItemClick"
          item-template="item-field"
        >
          <template #item-field="{ data }">
            <div style="text-align: center">
              <img
                :src="'../../../../../src/assets/images/' + data.img"
                alt=""
                style="width: 25px; height: 25px"
              />
            </div>
          </template>
        </DxDropDownButton>
        <DxDropDownButton
          class="ml-3"
          :items="arrDropDown"
          text="선택"
          style="width: 120px"
          @item-click="onItemClick"
          item-template="item-field"
        >
          <template #item-field="{ data }">
            <div style="text-align: center">
              <HistoryOutlined
                v-if="data.img"
                class="mr-5"
                style="font-size: 18px"
              />
              <button v-else-if="data.url" class="button-open-tab">
                일용직사원등록
              </button>
            </div>
          </template>
        </DxDropDownButton>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="13" class="custom-layout">
        <a-spin :spinning="loading" size="large">
          <DxDataGrid
            :show-row-lines="true"
            :hoverStateEnabled="true"
            :data-source="getIncomeExtrasFake"
            :show-borders="true"
            :allow-column-reordering="move_column"
            :allow-column-resizing="colomn_resize"
            :column-auto-width="true"
            @selection-changed="selectionChanged"
            @row-click="onRowClick"
          >
            <DxSelection
              select-all-mode="allPages"
              show-check-boxes-mode="always"
              mode="multiple"
            />
            <DxColumn
              caption="기타소득자 [소득구분]"
              cell-template="tag"
              width="170"
            />
            <template #tag="{ data }" class="custom-action">
              <div>
                <button style="margin-right: 5px">
                  {{ data.data.incomeTypeCode }}
                </button>
                <a-tooltip placement="top">
                  <template
                    #title
                    v-if="data.data.employee.incomeTypeName.length > 10"
                  >
                    <span>{{ data.data.employee.incomeTypeName }}</span>
                  </template>

                  {{ checkLen(data.data.employee.incomeTypeName) }}
                </a-tooltip>
              </div>
            </template>
            <DxColumn caption="지급일" data-field="paymentDay" />
            <DxColumn caption="지급액" data-field="paymentAmount" />
            <DxColumn caption="필요경비" data-field="requiredExpenses" />
            <DxColumn caption="소득금액" data-field="incomePayment" />
            <DxColumn caption="세율" data-field="taxRate" />
            <DxColumn caption="공제" cell-template="incomLocalTax" />
            <template #incomLocalTax="{ data }">
              {{
                data.data.withholdingIncomeTax +
                data.data.withholdingLocalIncomeTax
              }}
            </template>
            <DxColumn caption="차인지급액" data-field="actualPayment" />
            <DxSummary>
              <!-- <DxTotalItem :customize-text="customizeTotal" show-in-column="성명 (상호)" />
                        <DxTotalItem :customize-text="customizeTotalTaxPay" show-in-column="과세소득" />
                        <DxTotalItem :customize-text="customizeTotalTaxfreePay" show-in-column="비과세소득" />
                        <DxTotalItem :customize-text="customizeIncomeTax" column="withholdingIncomeTax" />
                        <DxTotalItem :customize-text="customizeDateLocalIncomeTax" column="withholdingLocalIncomeTax" /> -->
            </DxSummary>
          </DxDataGrid>
        </a-spin>
      </a-col>
      <a-col :span="11" class="custom-layout" style="padding-right: 0px">
        <standard-form
          action=""
          name="add-page-210"
          style="border: 1px solid #d7d7d7; padding: 10px"
        >
          <a-row>
            <a-col :span="24">
              <a-form-item label="기타소득자">
                <DxSelectBox
                  width="250px"
                  :data-source="incomeArr"
                  placeholder="선택"
                  display-expr="label"
                  item-template="item-data"
                  :height="$config_styles.HeightInput"
                >
                  <template #item-data="{ data }">
                    <button style="margin-right: 5px">
                      {{ data.incomeTypeCode }}
                    </button>
                    <a-tooltip placement="top">
                      <template #title v-if="data.incomeTypeName.length > 10">
                        <span>{{ data.incomeTypeName }}</span>
                      </template>

                      {{ checkLen(data.incomeTypeName) }}
                    </a-tooltip>
                  </template>
                </DxSelectBox>
              </a-form-item>
            </a-col>
            <!-- <a-col :span="12">
              <div class="top-content">
                <a-typography-title :level="5" style="margin-bottom: 0"
                  >요약</a-typography-title
                >
              </div>
              <a-form-item label="근무일수">
                <text-number-box width="200px" :required="true" />
              </a-form-item>
              <a-form-item label="월급여">
                <default-text-box width="200px" :required="true" />
              </a-form-item>
              <a-form-item label="공제합계">
                <default-text-box width="200px" :required="true" />
              </a-form-item>
              <a-form-item label="차인지급액">
                <default-text-box width="200px" :required="true" />
                <img src="@/assets/images/iconInfo.png" style="width: 16px" />
                <span> 급여합계 - 공제합계 </span>
              </a-form-item>
            </a-col> -->
            <!-- <a-col :span="24">
              <div class="top-content">
                <a-typography-title :level="5" style="margin-bottom: 0"
                  >급여 / 공제</a-typography-title
                >
              </div>
            </a-col> -->
            <a-col span="24">
              <div class="top-content">
                <a-typography-title :level="5" style="margin-bottom: 0"
                  >소득내역</a-typography-title
                >
              </div>
            </a-col>
            <a-col :span="12" style="padding-right: 5px">
              <!-- <div class="top-content">
                <a-typography-title :level="5" style="margin-bottom: 0">
                  귀속/지급연월
                </a-typography-title>
              </div> -->
              <a-form-item label="귀속/지급연월" style="display: flex">
                <div class="input-text">
                  <button>monthpicker imputedYear-imputedMonth</button>
                  <button>monthpicker paymentYear-paymentMonth</button>
                </div>
              </a-form-item>
              <a-form-item label="지급일">
                <text-number-box
                  width="150px"
                  :required="true"
                  :min="1"
                  :max="30"
                  :spinButtons="true"
                  value="datepicker"
                ></text-number-box>
              </a-form-item>
              <a-form-item label="지급액">
                <text-number-box
                  width="150px"
                  :required="true"
                  :min="1"
                  :max="30"
                  :spinButtons="true"
                ></text-number-box>
              </a-form-item>
              <a-form-item label="필요경비">
                <text-number-box
                  width="150px"
                  :required="true"
                  :min="1"
                  :max="30"
                  :spinButtons="true"
                ></text-number-box>
              </a-form-item>
              <a-form-item label="세율">
                <DxSelectBox
                  width="200px"
                  :data-source="incomeArr"
                  placeholder="선택"
                  display-expr="label"
                  item-template="item-data"
                  :height="$config_styles.HeightInput"
                >
                  <template #item-data="{ data }">
                    <button style="margin-right: 5px">
                      {{ data.incomeTypeCode }}
                    </button>
                    <a-tooltip placement="top">
                      <template #title v-if="data.incomeTypeName.length > 10">
                        <span>{{ data.incomeTypeName }}</span>
                      </template>

                      {{ checkLen(data.incomeTypeName) }}
                    </a-tooltip>
                  </template>
                </DxSelectBox>
              </a-form-item>
            </a-col>
            <a-col :span="12" style="padding-left: 5px">
              <div class="top-content">
                <a-typography-title :level="5" style="margin-bottom: 0"
                  >공제합계 {{ price }}원</a-typography-title
                >
              </div>
              <div class="input-text">
                <a-form-item label="소득세(공제)">
                  <text-number-box
                    style="margin-left: 20px; width: 150px"
                    :required="true"
                  />
                  <span>원</span>
                </a-form-item>
              </div>
              <div class="input-text">
                <a-form-item label="지방소득세(공제)">
                  <text-number-box
                    style="margin-left: 20px; width: 150px"
                    :required="true"
                  />
                  <span>원</span>
                </a-form-item>
              </div>
              <div class="top-content">
                <a-typography-title :level="5" style="margin-bottom: 0"
                  >차인지급액 {{ price }}원
                  <img src="@/assets/images/iconInfo.png" style="width: 16px" />
                  <span
                    style="font-size: 10px; color: #7f7f7f; margin-left: 5px"
                    >지급액 - 필요경비 - 공제합계</span
                  >
                </a-typography-title>
              </div>
            </a-col>
          </a-row>
          <div class="text-align-center mt-50">
            <DxButton
              @click="modalDeductions = true"
              :text="'공제 재계산'"
              :style="{ color: 'white', backgroundColor: 'gray' }"
              :height="'33px'"
            />
            <DxButton
              @click="modalInsurance = true"
              :text="'4대보험 EDI 조회/적용'"
              :style="{ color: 'white', backgroundColor: 'gray' }"
              :height="'33px'"
            />
          </div>
        </standard-form>
      </a-col>
    </a-row>

    <DeletePopup
      :modalStatus="modalDelete"
      @closePopup="modalDelete = false"
      :data="popupDataDelete"
    />
    <EditPopup
      :modalStatus="modalEdit"
      @closePopup="modalEdit = false"
      :data="popupDataEdit"
    />
    <PrintPayrollRegisterPopup
      :modalStatus="modalPrintPayrollRegister"
      @closePopup="modalPrintPayrollRegister = false"
      :data="popupDataPayrollRegister"
    />
    <PrintSalaryStatementPopup
      :modalStatus="modalPrintSalaryStatement"
      @closePopup="modalPrintSalaryStatement = false"
      :data="popupDataSalaryStatement"
    />
    <EmailMultiPopup
      :modalStatus="modalEmailMulti"
      @closePopup="modalEmailMulti = false"
      :data="popupDataEmailMulti"
    />
    <EmailSinglePayrollRegisterPopup
      :modalStatus="modalEmailSinglePayrollRegister"
      @closePopup="modalEmailSinglePayrollRegister = false"
      :data="popupDataEmailSinglePayrollRegister"
    />
    <EmailSinglePopup
      :modalStatus="modalEmailSingle"
      @closePopup="modalEmailSingle = false"
      :data="popupDataEmailSingle"
    />
    <HistoryPopup
      :modalStatus="modalHistoryStatus"
      @closePopup="modalHistoryStatus = false"
      :data="popupData"
      title="변경이력"
      typeHistory="pa-510"
    />
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed } from 'vue';
import DxButton from 'devextreme-vue/button';
import dayjs, { Dayjs } from 'dayjs';
import { useStore } from 'vuex';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { companyId } from '../../../../helpers/commonFunction';
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxExport,
  DxSelection,
  DxSearchPanel,
  DxToolbar,
  DxEditing,
  DxGrouping,
  DxScrolling,
  DxItem,
  DxSummary,
  DxTotalItem,
  DxMasterDetail,
} from 'devextreme-vue/data-grid';
import DxSelectBox from 'devextreme-vue/select-box';
import {
  EditOutlined,
  HistoryOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
  PrinterOutlined,
  DeleteOutlined,
  SaveOutlined,
} from '@ant-design/icons-vue';
import notification from '../../../../utils/notification';
import { getIncomeProcessExtrasFake, getIncomeExtrasFake } from './utils/index';
import PrintPayrollRegisterPopup from './components/Popup/PrintPayrollRegisterPopup.vue';
import queries from '../../../../graphql/queries/PA/PA7/PA720/index';
import mutations from '../../../../graphql/mutations/PA/PA5/PA510/index';
import { Message } from '../../../../configs/enum';
import DxDropDownButton from 'devextreme-vue/drop-down-button';
import DeletePopup from './components/Popup/DeletePopup.vue';
import EditPopup from './components/Popup/EditPopup.vue';
import EmailSinglePayrollRegisterPopup from './components/Popup/EmailSinglePayrollRegisterPopup.vue';
import EmailMultiPopup from './components/Popup/EmailMultiPopup.vue';
import EmailSinglePopup from './components/Popup/EmailSinglePopup.vue';
import PrintSalaryStatementPopup from './components/Popup/PrintSalaryStatementPopup.vue';
import EmploySelect from '@/components/common/EmploySelect.vue';
import ProcessStatus from '@/components/common/ProcessStatus.vue';
export default defineComponent({
  components: {
    DxMasterDetail,
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxSelection,
    DxExport,
    DxSearchPanel,
    DxScrolling,
    DxToolbar,
    DxEditing,
    DxGrouping,
    DxItem,
    DxButton,
    DxSummary,
    DxTotalItem,
    EditOutlined,
    HistoryOutlined,
    SearchOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MailOutlined,
    PrinterOutlined,
    DeleteOutlined,
    SaveOutlined,
    DxDropDownButton,
    PrintPayrollRegisterPopup,
    PrintSalaryStatementPopup,
    DeletePopup,
    EditPopup,
    EmailSinglePayrollRegisterPopup,
    EmailMultiPopup,
    EmailSinglePopup,
    EmploySelect,
    ProcessStatus,
    DxSelectBox,
  },
  setup() {
    const price = ref(40);
    const dataSource = ref([]);
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear);
    const per_page = computed(() => store.state.settings.per_page);
    const move_column = computed(() => store.state.settings.move_column);
    const trigger = ref<boolean>(true);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);

    const modalEmailSingle = ref(false);
    const modalEmailSinglePayrollRegister = ref(false);
    const modalEmailMulti = ref(false);

    const popupDataEmailSingle = ref({});
    const popupDataEmailSinglePayrollRegister = ref({});
    const popupDataEmailMulti = ref({});

    const imputedYear = ref('');
    const imputedMonth = ref('');

    const modalPrintPayrollRegister = ref<boolean>(false);
    const modalPrintSalaryStatement = ref<boolean>(false);
    const modalDeductions = ref<boolean>(false);
    const modalInsurance = ref<boolean>(false);
    const modalDelete = ref<boolean>(false);
    const modalEdit = ref<boolean>(false);
    const modalHistoryStatus = ref<boolean>(false);
    const popupDataPayrollRegister = ref({});
    const popupDataSalaryStatement = ref({});
    const popupDataDelete = ref({});
    const popupDataEdit = ref({});
    const originData = ref({
      companyId: companyId,
      imputedYear: globalYear,
      imputedMonth: 11,
    });
    let popupData = ref([]);
    // ======================= GRAPQL ================================
    const {
      refetch: refetchData,
      result,
      loading,
    } = useQuery(queries.getIncomeProcessExtras, originData, () => ({
      enabled: trigger.value,
      fetchPolicy: 'no-cache',
    }));
    // ======================= WATCH ==================================
    watch(result, (value) => {
      if (value) {
        dataSource.value = value.getIncomeProcessWageDailies;
        trigger.value = false;
      }
      console.log(dataSource.value);
    });

    const deleteItem = (value: any) => {
      modalDelete.value = true;
      popupDataDelete.value = value;
    };
    const editItem = (value: any) => {
      modalEdit.value = true;
      popupDataEdit.value = value;
    };
    // ======================= FUNCTION ================================
    const onSubmit = (e: any) => {};

    const arrDropDownPayrollRegister = [
      { id: 1, img: 'print.svg', event: 'PrintPayrollRegister' },
      { id: 2, img: 'email.png', event: 'EmailPayrollRegister' },
    ];
    const arrDropDownSalaryStatement = [
      { id: 1, img: 'print.svg', event: 'PrintSalaryStatement' },
      { id: 2, img: 'email.png', event: 'EmailSalaryStatement' },
      { id: 3, img: 'group_email.png', event: 'EmailMultiSalaryStatement' },
    ];
    const arrDropDown = [
      { id: 1, url: '520', event: '520' },
      { id: 2, img: 'email.png', event: 'History' },
    ];
    const onItemClick = (value: any) => {
      console.log(value);

      switch (value.itemData.event) {
        case 'PrintPayrollRegister':
          modalPrintPayrollRegister.value = true;
          // popupDataPayrollRegister.value = value
          break;
        case 'EmailPayrollRegister':
          modalEmailSinglePayrollRegister.value = true;
          // popupDataPayrollRegister.value = value
          break;
        case 'PrintSalaryStatement':
          modalPrintSalaryStatement.value = true;
          // popupDataPayrollRegister.value = value
          break;
        case 'EmailSalaryStatement':
          modalEmailSingle.value = true;
          // popupDataPayrollRegister.value = value
          break;
        case 'EmailMultiSalaryStatement':
          modalEmailMulti.value = true;
          // popupDataPayrollRegister.value = value
          break;
        case 'EmailPayrollRegister':
          modalPrintPayrollRegister.value = true;
          // popupDataPayrollRegister.value = value
          break;
        case 'History':
          modalHistoryStatus.value = true;
          // popupDataPayrollRegister.value = value
          break;
      }
    };

    const selectionChanged = (data: any) => {};

    const arrayEmploySelect = ref([
      {
        employeeId: 'JTU342378',
        name: 'khiem',
        idCardNumber: '800101-1100123',
        status: 0,
        foreigner: true,
      },
      {
        employeeId: 'KHU342378',
        name: 'khiem 1',
        idCardNumber: '800101-1100123',
        status: 0,
        foreigner: false,
      },
      {
        employeeId: 'JHK342378',
        name: 'khiem 3',
        idCardNumber: '800101-1100123',
        status: 1,
        foreigner: true,
      },
    ]);

    const onOpenTax = () => {
      console.log('dsf');
    };
    const checkLen = (text: String) => {
      if (text.length > 10) {
        return text.substring(0, 10) + '...';
      }
      return text;
    };
    const onRowClick = (e: any) => {
      console.log(e.data);
    };
    const incomeArr = getIncomeExtrasFake.map((item: any) => {
      return {
        incomeTypeCode: item.incomeTypeCode,
        incomeTypeName: item.employee.incomeTypeName,
      };
    });
    return {
      price,
      loading,
      dataSource,
      per_page,
      move_column,
      colomn_resize,
      refetchData,
      onSubmit,
      onItemClick,
      arrDropDownPayrollRegister,
      arrDropDownSalaryStatement,
      arrDropDown,
      modalPrintPayrollRegister,
      modalPrintSalaryStatement,
      modalHistoryStatus,
      popupDataPayrollRegister,
      popupDataSalaryStatement,
      deleteItem,
      modalDelete,
      popupDataDelete,
      editItem,
      modalEdit,
      popupDataEdit,
      popupData,
      selectionChanged,
      modalDeductions,
      modalInsurance,
      modalEmailSingle,
      modalEmailSinglePayrollRegister,
      modalEmailMulti,
      popupDataEmailSingle,
      popupDataEmailSinglePayrollRegister,
      popupDataEmailMulti,
      arrayEmploySelect,
      imputedYear,
      imputedMonth,
      getIncomeProcessExtrasFake,
      getIncomeExtrasFake,
      onOpenTax,
      checkLen,
      onRowClick,
      incomeArr,
    };
  },
});
</script> 
<style lang="scss" scoped src="./style/style.scss" >
</style>
