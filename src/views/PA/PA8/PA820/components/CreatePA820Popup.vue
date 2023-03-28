<template>
  <a-modal
    class="form-modal"
    width="60%"
    :bodyStyle="{ 'max-height': '90vh', 'overflow-y': 'scroll' }"
    :visible="isOpenModalCreate"
    title="취득신고 신규 등록"
    centered
    @cancel="$emit('closeModal')"
    :footer="null"
  >
    <standard-form ref="formRef">
      
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import mutations from "@/graphql/mutations/PA/PA8/PA810/index";
import queries from "@/graphql/queries/PA/PA8/PA810/index";
import getCompany from "@/graphql/queries/common/getCompany";
import {companyId} from "@/helpers/commonFunction";
// import INITIAL_DATA, {Company, DependentsType} from "./../utils";
import {
  DeleteOutlined,
  HistoryOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import {DependantsRelation, enum2Entries} from "@bankda/jangbuda-common";
import {useMutation, useQuery} from "@vue/apollo-composable";
import dayjs from "dayjs";
import DxButton from "devextreme-vue/button";
import {DxColumn, DxDataGrid, DxScrolling} from "devextreme-vue/data-grid";
import {DxFileUploader} from "devextreme-vue/file-uploader";
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import {useStore} from "vuex";
// import URL_CONST from "./../const";
import notification from "@/utils/notification";
import filters from "@/helpers/filters";
import {clone, cloneDeep} from "lodash";

let dpRelation = enum2Entries(DependantsRelation);
const getCodeOrLabel = (id: number) => {
  return {
    number: id.toString(),
    label: dpRelation[id][0].split(".")[1],
  };
};

enum EmployeeWageType {
  WAGE = 10,
  WAGEDaily = 20,
}

const getQuery = (type: EmployeeWageType) => {
  switch (type) {
    case EmployeeWageType.WAGE:
      return queries.getEmployeeWages;
    case EmployeeWageType.WAGEDaily:
      return queries.getEmployeeWageDailies;
  }
};
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
  },
  props: {
    isOpenModalCreate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear);
    const {per_page, move_column, colomn_resize} = store.state.settings;
    const employeeWageType = ref<EmployeeWageType>(EmployeeWageType.WAGE);
    // const employeeWage = ref(INITIAL_DATA.initialEmployeeWage);
    // const employeeWages = ref();
    // const employeeWageSelected = ref();
    // const formRef = ref();
    // const isFileList = ref(false);
    // const formData = ref({...INITIAL_DATA.InitialFormCreate});
    // const infoCompany = reactive({
    //   name: "",
    //   adding: "",
    //   presidentName: "",
    //   bizNumber: "",
    // });
    // const stateSelectQuery = reactive({
    //   selectedRadioValue: EmployeeWageType.WAGE,
    //   query: queries.getEmployeeWages,
    // });

    // const isChooseNationalPensionReport = computed(
    //   () => !formData.value.nationalPensionReport
    // );
    // const isChooseHealthInsuranceReport = computed(
    //   () => !formData.value.healthInsuranceReport
    // );
    // const isChooseEmployeementInsuranceAndIndustrialAccidentInsurance =
    //   computed(
    //     () =>
    //       formData.value.employeementInsuranceReport ||
    //       formData.value.industrialAccidentInsuranceReport
    //   );
    // const handleRadioChange = (event: Event) => {
    //   stateSelectQuery.selectedRadioValue = +(event.target as HTMLInputElement)
    //     .value;
    //   employeeWageSelected.value = null;
    //   employeeWage.value = {...INITIAL_DATA.initialEmployeeWage};
    // };
    // // Get DataSource getMajorInsuranceCompanyEmployeeAcquisitions
    // const dataSource = ref([]);

    // // get Company
    // const {
    //   result: dataCompany,
    //   loading,
    //   refetch,
    // } = useQuery<{ getCompany: Company }>(
    //   getCompany,
    //   {id: companyId},
    //   () => ({
    //     // enabled: trigger.value,
    //     fetchPolicy: "no-cache",
    //   })
    // );
    // watch(dataCompany, (value) => {
    //   if (value) {
    //     infoCompany.name = value.getCompany.name;
    //     infoCompany.bizNumber = value.getCompany.bizNumber;
    //     infoCompany.presidentName = value.getCompany.presidentName;
    //     infoCompany.adding = value.getCompany.address;
    //   }
    // });
    // // get and refetch data when employeeWageType change
    // const variables = reactive({
    //   companyId: companyId,
    //   imputedYear: globalYear.value,
    // });
    // const query = ref(queries.getEmployeeWages);
    // const {result: dataEmployeeWages, refetch: refetchDataEmployeeWages} =
    //   useQuery(query, variables, () => ({
    //     fetchPolicy: "no-cache",
    //   }));
    // watch(
    //   dataEmployeeWages,
    //   (value) => {
    //     if (value) {
    //       if (stateSelectQuery.selectedRadioValue === EmployeeWageType.WAGE) {
    //         employeeWages.value = value.getEmployeeWages;
    //       } else {
    //         employeeWages.value = value.getEmployeeWageDailies;
    //       }
    //     }
    //   },
    //   {deep: true}
    // );
    // watch(
    //   () => stateSelectQuery.selectedRadioValue,
    //   (newValue) => {
    //     query.value = getQuery(newValue);
    //   }
    // );

    // //  get Employee Wage
    // watch(
    //   employeeWageSelected,
    //   (value) => {
    //     if (value) {
    //       const emp = employeeWages.value.find((item: any) => item.employeeId === value)
    //       if (emp && emp?.dependents) emp.dependents.sort((a: any, b: any) => a.relation - b.relation);

    //       employeeWage.value = cloneDeep(emp);
    //     }
    //   },
    //   {deep: true}
    // );
    // const resetForm = () => {
    //   formData.value = cloneDeep(INITIAL_DATA.InitialFormCreate)
    //   employeeWage.value = cloneDeep(INITIAL_DATA.initialEmployeeWage)
    //   employeeWageSelected.value = null;
    //   employeeWageType.value = EmployeeWageType.WAGE;
    //   stateSelectQuery.selectedRadioValue = EmployeeWageType.WAGE;

    // };
    // watch(() => props.isOpenModalCreate, (newVal) => {
    //   if (newVal) {
    //     stateSelectQuery.selectedRadioValue = EmployeeWageType.WAGE;
    //   } else {
    //     isFileList.value = false;
    //     resetForm();
    //   }
    // }, { deep: true});
    // // Mutation
    // const {
    //   mutate,
    //   onDone: onDoneCreateMajor,
    //   loading: loadingCreateMajor,
    //   onError: errorCreateMajor,
    // } = useMutation(
    //   mutations.createMajorInsuranceCompanyEmployeeAcquisition,
    //   () => ({
    //     fetchPolicy: "no-cache",
    //   })
    // );
    // onDoneCreateMajor(() => {
    //   notification("success", "저장되었습니다.");
    //   resetForm();
    //   emit("handleCreate");
    // });
    // errorCreateMajor((error) => {
    //   console.log("error", error);
    //   notification("error", error.message);
    // });
    // /// Submit form
    // const onSubmit = async (e: any) => {
    //   const res = e.validationGroup.validate();
    //   // !res.isValid
    //   if (!res.isValid) {
    //     res.brokenRules[0].validator.focus();
    //   } else {
    //     const {
    //       adding,
    //       joinedAt,
    //       name,
    //       president,
    //       presidentName,
    //       residentId,
    //       totalPay,
    //       bizNumber,
    //       ...newFormData
    //     } = formData.value;
    //     const dependents = employeeWage.value?.dependents
    //       ? employeeWage.value.dependents.map((item: any) => {
    //         return {
    //           name: employeeWage.value.name,
    //           residentId: employeeWage.value.residentId,
    //           relationCode: getCodeOrLabel(item.relation).number,
    //           nationalityNumber: item.nationalityNumber,
    //           stayQualification: item.stayQualification,
    //           stayPeriodFrom: item?.contractExpiredDate
    //             ? item.contractExpiredDate[0]
    //             : filters.formatDateToInterger(new Date().getTime()),
    //           stayPeriodTo: item?.contractExpiredDate
    //             ? item.contractExpiredDate[1]
    //             : filters.formatDateToInterger(
    //               new Date().setDate(new Date().getDate() + 7)
    //             ),
    //           disabledRegisteredDate: item.disabledRegisteredDate
    //             ? filters.formatDateToInterger(item.disabledRegisteredDate)
    //             : 0,
    //         };
    //       })
    //       : [];
    //     const input = {
    //       ...newFormData,
    //       employeeId: Number(employeeWageSelected.value),
    //       employeeType: stateSelectQuery.selectedRadioValue,
    //       dependents,
    //     };
    //     input.insuranceReductionCode &&= Number(
    //       formData.value.insuranceReductionCode
    //     );
    //     input.insuranceReductionReasonCode &&= Number(
    //       formData.value.insuranceReductionReasonCode
    //     );
    //     input.contractExpiredDate &&= filters.formatDateToInterger(newFormData.contractExpiredDate);
    //     mutate({
    //       ...variables,
    //       input: input,
    //     });
    //   }
    // };
    // const getFileId = (fileId: { id: Number }) => {
    //   formData.value.dependentsEvidenceFileStorageId = fileId.id;
    // };
    // const formatDate = (date: any) => {
    //   return dayjs(date).format("YYYY/MM/DD");
    // };
    return {
      globalYear,
      per_page,
      move_column,
      colomn_resize,
      // dataSource,
      // onSubmit,
      // formData,
      // styleDisable: {opacity: 0.4},
      // employeeWages,
      // employeeWageSelected,
      // employeeWageType,
      // EmployeeWageType,
      // formatDate,
      // stateSelectQuery,
      // handleRadioChange,
      // infoCompany,
      // employeeWage,
      // isChooseNationalPensionReport,
      // isChooseHealthInsuranceReport,
      // isChooseEmployeementInsuranceAndIndustrialAccidentInsurance,
      // URL_CONST,
      // getFileId,
      // dpRelation,
      // getCodeOrLabel,
      // filters,
      // col: {
      //   item: 9,
      //   space: 3,
      // },
      // formRef,
      // isFileList,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../styles/index.scss";

:deep(.label-custom) {
  .dx-field-label {
    width: 250px !important;
  }

  .dx-field-value {
    width: calc(100% - 150px) !important;
  }
}

.table-container {

  .d-flex-center {
    //min-width: fit-content;
    width: 100%;
    min-width: 1000px;
    background-color: #5b80b9;
    .header {
      min-width: 70px;
      text-align: center;
    }
    table {
      width: calc(100% - 70px);
      border-collapse: collapse;
      border-bottom: none;
      border-left: none;
      border-right: none;
      border-top: none;
      table-layout: auto;

      th, tr, td {
        text-align: center !important;
      }

      th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        color: white;
      }

      td, th {
        border: 0.5px solid #ddd;
        height: 100%;
        white-space: normal;
      }

      tbody {
        background-color: rgb(233, 236, 243);

      }
    }
  }
}

.bg-gray {
  background-color: rgb(233, 236, 243);
  color: rgba(61, 59, 59, 0.85) !important;
}

.bg-blue {
  background-color: #5b80b9;
}


</style>
