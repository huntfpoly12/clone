<template>
  <a-modal
    :visible="true"
    @cancel="setModalStatus"
    :mask-closable="false"
    class="confirm-md"
    footer=""
    :width="'60%'"
    title="변경이력"
  >
    <section class="mt-20">
      <a-spin
        :spinning="loading1 || loading2 || loading3 || loading4 || loading5"
      >
        <DxDataGrid
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="dataSource"
          :show-borders="true"
          key-expr="ts"
          class="mt-10"
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
          noDataText="내역이 없습니다"
        >
          <DxPaging :page-size="20" />
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxSearchPanel
            :visible="true"
            :highlight-case-sensitive="true"
            placeholder="검색"
          />
          <DxToolbar>
            <DxItem name="searchPanel" location="after" />
          </DxToolbar>
          <DxColumn
            caption="기록일시"
            data-field="loggedAt"
            alignment="left"
            data-type="date"
            format="yyyy-MM-dd HH:mm"
          />
          <DxColumn caption="내용" data-field="remark" />
          <DxColumn caption="사업장관리번호" alignment="center" />
          <DxColumn
            caption="처리상태"
            data-field="workingStatus"
            alignment="center"
            :format="workStatusText"
          />
          <DxColumn caption="접수번호" data-field="acceptedNumber" />
          <DxColumn caption="메모" data-field="memo" />
          <DxColumn caption="IP" data-field="ip" />
          <DxColumn caption="수정ID" data-field="updatedBy" />
        </DxDataGrid>
      </a-spin>
    </section>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import DxDataGrid, {
  DxColumn,
  DxScrolling,
  DxPaging,
  DxSearchPanel,
  DxItem,
  DxToolbar,
} from "devextreme-vue/data-grid";
import { useQuery } from "@vue/apollo-composable";
import queries from "@/graphql/queries/common/index";
import dayjs from "dayjs";
import notification from "@/utils/notification";
import { workStatusText } from "../../utils";

export default defineComponent({
  components: {
    DxDataGrid,
    DxScrolling,
    DxColumn,
    DxPaging,
    DxSearchPanel,
    DxItem,
    DxToolbar
  },
  props: {
    paramValue: {
      type: Object,
      required: true,
    },
    dataType: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const { per_page, move_column, colomn_resize } = store.state.settings;
    const dataSource = ref([]);

    const setModalStatus = () => {
      emit("closeModal", false);
    };

    //----------------------GET LOG 1------------------------

    const type1Trigger = ref(false);
    const {
      result: type1Result,
      onError: type1Error,
      loading: loading1,
    } = useQuery(
      queries.getMajorInsuranceCompanyEmployeeAcquisitionLogs,
      {
        ...props.paramValue,
        imputedYear: dayjs().year(),
      },
      () => ({
        fetchPolicy: "no-cache",
        enabled: type1Trigger.value,
      })
    );
    watch(type1Result, (newVal) => {
      let dataArr = newVal.getMajorInsuranceCompanyEmployeeAcquisitionLogs;
      dataSource.value = dataArr;
      type1Trigger.value = false;
    });
    type1Error((res: any) => {
      notification("error", res.message);
    });

    //----------------------GET LOG 2------------------------

    const type2Trigger = ref(false);
    const {
      result: type2Result,
      onError: type2Error,
      loading: loading2,
    } = useQuery(
      queries.getMajorInsuranceCompanyEmployeeLossLogs,
      {
        ...props.paramValue,
        imputedYear: dayjs().year(),
      },
      () => ({
        fetchPolicy: "no-cache",
        enabled: type2Trigger.value,
      })
    );
    watch(type2Result, (newVal) => {
      let dataArr = newVal.getMajorInsuranceCompanyEmployeeLossLogs;
      dataSource.value = dataArr;
      type2Trigger.value = false;
    });
    type2Error((res: any) => {
      notification("error", res.message);
    });

    //----------------------GET LOG 3------------------------

    const type3Trigger = ref(false);
    const {
      result: type3Result,
      onError: type3Error,
      loading: loading3,
    } = useQuery(
      queries.getMajorInsuranceCompanyEmployeeSalaryChangeLogs,
      {
        ...props.paramValue,
        imputedYear: dayjs().year(),
      },
      () => ({
        fetchPolicy: "no-cache",
        enabled: type3Trigger.value,
      })
    );
    watch(type3Result, (newVal) => {
      let dataArr = newVal.getMajorInsuranceCompanyEmployeeSalaryChangeLogs;
      dataSource.value = dataArr;
      type3Trigger.value = false;
    });
    type3Error((res: any) => {
      notification("error", res.message);
    });

    //----------------------GET LOG 42------------------------

    const type4Trigger = ref(false);
    const {
      result: type4Result,
      onError: type4Error,
      loading: loading4,
    } = useQuery(
      queries.getMajorInsuranceCompanyEmployeeLeaveOfAbsenceLogs,
      {
        ...props.paramValue,
        imputedYear: dayjs().year(),
      },
      () => ({
        fetchPolicy: "no-cache",
        enabled: type4Trigger.value,
      })
    );
    watch(type4Result, (newVal) => {
      let dataArr = newVal.getMajorInsuranceCompanyEmployeeLeaveOfAbsenceLogs;
      dataSource.value = dataArr;
      type4Trigger.value = false;
    });
    type4Error((res: any) => {
      notification("error", res.message);
    });

    //----------------------GET LOG 5------------------------

    const type5Trigger = ref(false);
    const {
      result: type5Result,
      onError: type5Error,
      loading: loading5,
    } = useQuery(
      queries.getMajorInsuranceCompanyEmployeeReturnToWorkLogs,
      {
        ...props.paramValue,
        imputedYear: dayjs().year(),
      },
      () => ({
        fetchPolicy: "no-cache",
        enabled: type5Trigger.value,
      })
    );
    watch(type5Result, (newVal) => {
      let dataArr = newVal.getMajorInsuranceCompanyEmployeeReturnToWorkLogs;
      dataSource.value = dataArr;
      type5Trigger.value = false;
    });
    type5Error((res: any) => {
      notification("error", res.message);
    });

    //-----------------------CHECK WHICH LOGS-----------------------------

    watch(
      () => props.paramValue,
      (newVal: any) => {
        if (props.dataType == 1) {
          type1Trigger.value = true;
        }
        if (props.dataType == 2) {
          type2Trigger.value = true;
        }
        if (props.dataType == 3) {
          type3Trigger.value = true;
        }
        if (props.dataType == 4) {
          type4Trigger.value = true;
        }
        if (props.dataType == 5) {
          type5Trigger.value = true;
        }
      },
      { immediate: true }
    );
    return {
      setModalStatus,
      per_page,
      move_column,
      colomn_resize,
      dataSource,
      loading1,
      loading2,
      loading3,
      loading4,
      loading5,
      workStatusText,
    };
  },
});
</script>
<style lang="scss" scoped></style>
