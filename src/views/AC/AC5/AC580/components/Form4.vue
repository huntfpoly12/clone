<template>
  <a-spin :spinning="false">
    <!-- {{ formState }} formState <br /> -->
    <standard-form>
      <div class="form-container">

        <h3>후원금 수입 내역</h3>
        <a-row>
          <a-col :span="24">
            <a-form-item label="발생일" label-align="right" class="red">
              <date-time-box width="200px" v-model:valueDate="formState.joinedAt" :required="true" ></date-time-box>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="후원품 종류" label-align="right" class="red">
              <select-box-common width="200px" :arrSelect="nationaPersionSelectbox" :required="true"
                v-model:valueInput="formState.nationalPensionAcquisitionCode" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="후원자" label-align="right" class="red">
              <div class="input-text">
                <select-box-common width="200px" :arrSelect="nationaPersionSelectbox" :required="true"
                  v-model:valueInput="formState.nationalPensionAcquisitionCode" />
              </div>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="명세" label-align="right">
              <div class="input-text">
                <default-text-box width="200px" v-model:valueInput="formState.name" :required="true" />
                <span style="font-size: 12px; color: #888888" class="mt-5">
                  <img src="@/assets/images/iconInfo.png" style="width: 14px" class="mr-5" />후원자의 후원 용도,취지 등 입력
                </span>
              </div>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="품명" label-align="right">
              <div class="input-text">
                <select-box-common width="200px" :arrSelect="nationaPersionSelectbox" :required="true"
                  v-model:valueInput="formState.nationalPensionAcquisitionCode" />
              </div>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="수량" label-align="right" class="red">
              <default-text-box width="200px" v-model:valueInput="formState.name" :required="true" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="단위" label-align="right" >
              <select-box-common width="200px" :arrSelect="nationaPersionSelectbox" :required="true"
                v-model:valueInput="formState.nationalPensionAcquisitionCode" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="상당금액" label-align="right" class="red">
              <default-text-box width="200px" v-model:valueInput="formState.name" :required="true" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="비고" label-align="right">
              <default-text-box width="200px" v-model:valueInput="formState.name" />
            </a-form-item>
          </a-col>
        </a-row>
        <div class="mt-25 d-flex-center" style="justify-content: center;">
          <button-basic class="mr-10" text="삭제" type="default" mode="contained" :width="80" id="btn-save"
            @onClick="onDelete()" />
          <button-basic text="저장" type="default" mode="contained" :width="80" id="btn-save" @onClick="onSubmit($event)" />
        </div>
      </div>
    </standard-form>
  </a-spin>
  <PopupMessage :modalStatus="modalConfirm" @closePopup="modalConfirm = false" typeModal="confirm" :width="530"
    :content="() => confirmContent" okText="네. 삭제합니다" cancelText="아니요" @checkConfirm="onConfirmModal" />
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
    const globalYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? '0'));
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
    const openAddNewModal = () => { }
    const onDelete = () => { }
    return {
      globalYear, employeeWages,
      employeeFashionArr, employeeFashionArr2, nationaPersionSelectbox, healthInsuranceSelectbox, includeDependentsSelectbox,
      formState, onSubmit,
      isDisabled1, isDisabled2,
      per_page, move_column, colomn_resize,
      modalConfirm, onConfirmModal, confirmContent,
      openAddNewModal, onDelete,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../styles/form.scss";
</style>
