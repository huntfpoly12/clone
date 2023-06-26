<template>
  <a-modal
    :visible="true"
    @cancel="setModalStatus"
    :mask-closable="false"
    class="confirm-md"
    footer=""
    :width="'80%'"
    title="변경이력"
  >
    <section>
      <a-spin :spinning="loading1">
        <DxDataGrid
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="dataSource"
          :show-borders="true"
          key-expr="loggedAt"
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
          <DxColumn caption="사업장관리번호" data-field="manageId" />
          <DxColumn
            caption="수임상태"
            data-field="companyConsignStatus"
            :format="consignStatusText"
            alignment="center"
          />
          <DxColumn
            caption="처리상태"
            data-field="workingStatus"
            alignment="center"
            :format="workStatusText"
          />
          <DxColumn
            caption="연금EDI상태"
            data-field="nationalPensionEDIStatus"
            :format="EDIStatusText"
            alignment="center"
          />
          <DxColumn
            caption="건보EDI상태"
            data-field="healthInsuranceEDIStatus"
            :format="EDIStatusText"
            alignment="center"
          />
          <DxColumn
            caption="연금지사명"
            data-field="nationalPensionBranchName"
          />
          <DxColumn caption="연금지사FAX" data-field="nationalPensionFax" />
          <DxColumn
            caption="건보지사명"
            data-field="healthInsuranceBranchName"
          />
          <DxColumn caption="건보지사FAX" data-field="healthInsuranceFax" />
          <DxColumn
            caption="고용지사명"
            data-field="employeementInsuranceBranchName"
          />
          <DxColumn caption="고용FAX" data-field="employeementInsuranceFax" />
          <DxColumn
            caption="산재지사명"
            data-field="industrialAccidentInsuranceBranchName"
          />
          <DxColumn
            caption="산재FAX"
            data-field="industrialAccidentInsuranceFax"
          />
          <DxColumn caption="메모" data-field="memo" width="100" />
          <DxColumn caption="IP" data-field="ip" />
          <DxColumn caption="수정ID" data-field="updatedBy" />
        </DxDataGrid>
      </a-spin>
    </section>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import DxDataGrid, {
  DxColumn,
  DxScrolling,
  DxSearchPanel,
  DxItem,
  DxToolbar,
  DxPaging,
} from "devextreme-vue/data-grid";
import queries from "@/graphql/queries/common/index";
import { watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import { workStatusText, consignStatusText, EDIStatusText } from "../../utils";

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
    companyIdParam: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const { per_page, move_column, colomn_resize } = store.state.settings;
    const dataSource = ref<any[]>([]);
    const {
      result: consignStatusLogsResult,
      onError: consignStatusLogsError,
      loading: loading1,
    } = useQuery(
      queries.getMajorInsuranceConsignStatusLogs,
      { companyId: props.companyIdParam },
      () => ({
        fetchPolicy: "no-cache",
      })
    );
    watch(consignStatusLogsResult, (newVal) => {
      let dataArr = newVal.getMajorInsuranceConsignStatusLogs;
      dataSource.value = dataArr;
    });
    consignStatusLogsError((res: any) => {
      notification("error", res.message);
    });

    const setModalStatus = () => {
      emit("closeModal", false);
    };
    return {
      setModalStatus,
      per_page,
      move_column,
      colomn_resize,
      dataSource,
      loading1,
      workStatusText,
      consignStatusText,
      EDIStatusText,
    };
  },
});
</script>
<style lang="scss" scoped></style>
