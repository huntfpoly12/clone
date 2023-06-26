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
      <a-spin :spinning="loading1 || loading2">
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
          <!-- <DxColumn caption="사업장관리번호" /> -->
          <DxColumn
            caption="처리상태"
            data-field="workingStatus"
            alignment="center"
            :format="workStatusText"
          />
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
  DxSearchPanel,
  DxItem,
  DxToolbar,
  DxPaging,
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
    DxSearchPanel,
    DxItem,
    DxToolbar,
    DxPaging,
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

    //----------------------GET LOG CompanyJoinLogs------------------------

    const companyJoinLogsTrigger = ref(false);
    const {
      result: companyJoinLogsResult,
      onError: companyJoinLogsError,
      loading: loading1,
    } = useQuery(
      queries.getMajorInsuranceCompanyJoinLogs,
      {
        ...props.paramValue,
        imputedYear: dayjs().year(),
      },
      () => ({
        fetchPolicy: "no-cache",
        enabled: companyJoinLogsTrigger.value,
      })
    );
    watch(companyJoinLogsResult, (newVal) => {
      let dataArr = newVal.getMajorInsuranceCompanyJoinLogs;
      dataSource.value = dataArr;
      companyJoinLogsTrigger.value = false;
    });
    companyJoinLogsError((res: any) => {
      notification("error", res.message);
    });

    //----------------------GET LOG CompanyOutLogs------------------------

    const companyOutLogsTrigger = ref(false);
    const {
      result: companyOutLogsResult,
      onError: companyOutLogsError,
      loading: loading2,
    } = useQuery(
      queries.getMajorInsuranceCompanyOutLogs,
      {
        ...props.paramValue,
        imputedYear: dayjs().year(),
      },
      () => ({
        fetchPolicy: "no-cache",
        enabled: companyOutLogsTrigger.value,
      })
    );
    watch(companyOutLogsResult, (newVal) => {
      let dataArr = newVal.getMajorInsuranceCompanyOutLogs;
      dataSource.value = dataArr;
      companyOutLogsTrigger.value = false;
    });
    companyOutLogsError((res: any) => {
      notification("error", res.message);
    });

    //-----------------------CHECK WHICH LOGS-----------------------------

    watch(
      () => props.paramValue,
      (newVal: any) => {
        if (props.dataType == 1) {
          companyJoinLogsTrigger.value = true;
          companyOutLogsTrigger.value = false;
        }
        if (props.dataType == 2) {
          companyOutLogsTrigger.value = true;
          companyJoinLogsTrigger.value = false;
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
      workStatusText,
    };
  },
});
</script>
<style lang="scss" scoped></style>
