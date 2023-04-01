<template>
  <a-modal class="form-modal" width="60%" :bodyStyle="{ 'max-height': '90vh', 'overflow-y': 'scroll' }" :visible="true"
    title="기부금영수증 발행" centered @cancel="$emit('onShowCreateModdal', false)" :footer="null">
    <a-spin :spinning="false">
      <!-- {{ formState }} formState <br /> -->
      <standard-form>
        <div class="form-container">

          <div class="header">후원자</div>
          <a-row class="px-15">
            <a-col :span="12">
              <a-form-item label="후원자" label-align="right" class="red">
                <div class="input-text">
                  <default-text-box width="200px" :disabled="true" v-model:valueInput="formState.name" :required="true" />
                  <a-tag color="orange" class="ml-5">{{ formState.beckeType }}</a-tag>
                </div>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="주소" label-align="right" class="red">
                <default-text-box width="200px" :disabled="true" v-model:valueInput="formState.presidentName"
                  :required="true" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="px-15">
            <a-col :span="12">
              <a-form-item label="주민등록번호" label-align="right" class="red">
                <default-text-box width="200px" :disabled="true" v-model:valueInput="formState.name" :required="true" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="사업자등록번호" label-align="right" class="red">
                <default-text-box width="200px" :disabled="true" v-model:valueInput="formState.presidentName"
                  :required="true" />
              </a-form-item>
            </a-col>
          </a-row>

          <div class="header">기부기간 / 금액 / 내역</div>
          <a-row class="px-15">
            <a-col :span="12">
              <a-form-item label="기부기간" label-align="right" class="red">
                <default-text-box width="200px" :disabled="true" v-model:valueInput="formState.name" :required="true" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="후원금 합계 (건)" label-align="right" class="red">
                <default-text-box width="200px" :disabled="true" v-model:valueInput="formState.presidentName"
                  :required="true" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="px-15">
            <a-col :span="12">
              <a-form-item label="기부금 총액 (건)" label-align="right" class="red">
                <default-text-box width="200px" :disabled="true" v-model:valueInput="formState.name" :required="true" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="후원품 합계 (건)" label-align="right" class="red">
                <default-text-box width="200px" :disabled="true" v-model:valueInput="formState.presidentName"
                  :required="true" />
              </a-form-item>
            </a-col>

            <div class="header-1">기부(후원금(품))내역상세</div>
            <a-spin :spinning="false" size="large">
              <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="formState" :show-borders="true"
                key-expr="employeeId" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
                :column-auto-width="true">
                <DxPaging :page-size="0" />
                <DxColumn caption="사업명" data-field="name" />
                <DxColumn caption="구분" data-field="bizNumber" />
                <DxColumn caption="연월일" data-field="presidentName" />
                <DxColumn caption="내용" alignment="center">
                  <DxColumn caption="품명" data-field="adding" />
                  <DxColumn caption="수량" data-field="totalPay" />
                  <DxColumn caption="단가" data-field="residentId" />
                </DxColumn>
                <DxColumn caption="금액" data-field="jobTypeCode" cell-template="jobTypeCode" />
                <template #jobTypeCode="{ data }" class="custom-action">
                  <div class="d-flex justify-content-center" v-if="data.data.hasDownFile">
                    {{ data.value }}
                  </div>
                </template>
              </DxDataGrid>
            </a-spin>
          </a-row>

          <div class="header">서식 설정</div>
          <a-row>
            <a-col :span="12">
              <a-form-item label="발행일자" label-align="right" class="red">
                <date-time-box width="200px" v-model:valueDate="formState.joinedAt"></date-time-box>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="기부유형" label-align="right" class="red">
                <default-text-box width="200px" :disabled="true" v-model:valueInput="formState.presidentName"
                  :required="true" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <div style="color: red">
                기부금공제대상 기부금단체 근거법령:
              </div>
              <div class="label-width">
                <default-text-box width="200px" :disabled="true" v-model:valueInput="formState.presidentName"
                  :required="true" />
                <default-text-box class="mt-5" width="200px" :disabled="true" v-model:valueInput="formState.presidentName"
                  :required="true" />
              </div>
            </a-col>
          </a-row>
          <a-row class="mt-15">
            <a-col :span="8" :offset="8" style="text-align: center;">
              <button-basic text="저장 (기부금영수증 발행)" type="default" mode="contained" :width="180" id="btn-save"
                @onClick="onSubmit($event)" />
            </a-col>
          </a-row>
        </div>
      </standard-form>
    </a-spin>
    <PopupMessage :modalStatus="modalConfirm" @closePopup="modalConfirm = false" typeModal="confirm" :width="530"
      :content="() => confirmContent" okText="네. 발행합니다" cancelText="아니요" @checkConfirm="onConfirmModal" />
  </a-modal>
</template>

<script lang="ts">
import mutations from "@/graphql/mutations/PA/PA8/PA810/index";
import queries from "@/graphql/queries/PA/PA8/PA810/index";
import getCompany from "@/graphql/queries/common/getCompany";
import { companyId } from "@/helpers/commonFunction";
// import INITIAL_DATA, {Company, DependentsType} from "./../utils";
import {
  DeleteOutlined,
  HistoryOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import {
  employeeFashionArr, productionStatusesCheckbox, nationaPersionSelectbox, healthInsuranceSelectbox, employeeFashionArr2,
  includeDependentsSelectbox,
} from "../utils/index";
import { DependantsRelation, enum2Entries } from "@bankda/jangbuda-common";
import { useMutation, useQuery } from "@vue/apollo-composable";
import dayjs from "dayjs";
import DxButton from "devextreme-vue/button";
import { DxColumn, DxDataGrid, DxPaging, DxScrolling } from "devextreme-vue/data-grid";
import { DxFileUploader } from "devextreme-vue/file-uploader";
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import { useStore } from "vuex";
import notification from "@/utils/notification";
import { h } from 'vue';
export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxButton,
    DxScrolling,
    HistoryOutlined,
    DeleteOutlined,
    SearchOutlined,
    DxFileUploader,
    DxPaging
  },
  setup(props, { emit }) {
    const store = useStore();
    const { per_page, move_column, colomn_resize } = store.state.settings;
    const globalYear = computed(() => store.state.settings.globalYear);
    const formState = reactive({
      employeeType: 0,
      employeeId: 1,
      name: 'ss',
      bizNumber: 'ss',
      presidentName: 'ss',
      adding: 'ADDING',
      totalPay: 'ss',
      residentId: '',
      joinedAt: dayjs().format('YYYY-MM-DD'),
      nationalPensionReport: false,
      healthInsuranceReport: true,
      employeementInsuranceReport: true,
      industrialAccidentInsuranceReport: true,
      nationalPensionAcquisitionCode: 1,
      acquisitionMonthPayment: false,
      healthInsuranceAcquisitionCode: 1,
      healthInsuranceAcquisitionCode2: 1,
      includeDependents: true,
      acquisitionMonthPayment2: false,
      jobTypeCode: 1,
      contractWorker: 'contractWorker',
      beckeType: 'beckeType',
    })

    // ----------------get and refetch data when employeeWageType change---------

    const employeeWages = ref([]);
    const variables = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
    });
    const query = ref(queries.getEmployeeWages);
    const { result: dataEmployeeWages, refetch: refetchDataEmployeeWages } =
      useQuery(query, variables, () => ({
        fetchPolicy: "no-cache",
      }));
    watch(
      dataEmployeeWages,
      (value) => {
        if (value) {
          // if (stateSelectQuery.selectedRadioValue === EmployeeWageType.WAGE) {
          employeeWages.value = value.getEmployeeWages;
          // } else {
          //   employeeWages.value = value.getEmployeeWageDailies;
          // }
        }
      },
      { deep: true }
    );

    //---------------------------------DISABLED FIELD--------------------------------

    const isDisabled1 = computed(() => !formState.employeementInsuranceReport && !formState.industrialAccidentInsuranceReport)
    const isDisabled2 = computed(() => {
      // if(formState.healthInsuranceAcquisitionCode2 == 23 || )
      let check = [23, 26, 32].some((item: any) => formState.healthInsuranceAcquisitionCode2 == item);
      formState.includeDependents = check;
      return check;
    })

    // -----------------------------DELETE-------------------

    const modalConfirm = ref(false);
    const confirmContent = h('div', [h('div', '기부금영수증은 발행이후 수정 불가하며, 부득이 수정이 필요한'), h('div', '경우 삭제 후 다시 발행해야 합니다. 그래도 발행하시겠습니까?')])
    const onConfirmModal = (emitVal: Boolean) => {
      if (!emitVal) {
        modalConfirm.value = false;
        emit('onShowCreateModdal', false);
      } else {
        emit('onShowCreateModdal', true);
      }
      // actionParam.workId = e;
    };


    //-----------------------------------FORM ACTION--------------------------------

    const onSubmit = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        modalConfirm.value = true;
      }
    }
    return {
      globalYear, employeeWages,
      employeeFashionArr, employeeFashionArr2, nationaPersionSelectbox, healthInsuranceSelectbox, includeDependentsSelectbox,
      formState, onSubmit,
      isDisabled1, isDisabled2,
      per_page, move_column, colomn_resize,
      modalConfirm, onConfirmModal, confirmContent,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../styles/form.scss";
</style>
