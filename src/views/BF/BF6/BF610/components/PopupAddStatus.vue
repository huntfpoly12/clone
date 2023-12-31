<template>
  <a-modal
    :visible="modalStatus"
    footer=""
    :mask-closable="false"
    title="소득별 마감현황"
    okText="저장하고 나가기"
    cancelText="그냥 나가기"
    @cancel="setModalVisible"
    width="992px"
  >
    <a-spin :spinning="loadingTable || loadingChangeStatus" size="large">
      <DxDataGrid
        :show-row-lines="true"
        :hoverStateEnabled="true"
        :data-source="dataSource"
        :show-borders="true"
        key-expr="companyId"
        class="wf-100"
        :column-auto-width="true"
        noDataText="내역이 없습니다"
      >
        <DxScrolling mode="standard" show-scrollbar="always" />
        <DxColumn
          caption="귀속연월"
          cell-template="imputedYear"
          alignment="center"
        />
        <template #imputedYear="{ data }">
          <span class="tag-custom-1">
            {{ data.data.imputedYear }}-{{
              data.data.imputedMonth < 10
                ? "0" + data.data.imputedMonth
                : data.data.imputedMonth
            }}
          </span>
        </template>
        <DxColumn
          caption="지급연월"
          cell-template="payment"
          alignment="center"
        />
        <template #payment="{ data }">
          <span class="tag-custom-2">
            {{ data.data.paymentYear }}-{{
              data.data.paymentMonth < 10
                ? "0" + data.data.paymentMonth
                : data.data.paymentMonth
            }}
          </span>
        </template>
        <DxColumn caption="소득종류" cell-template="type" alignment="center" />
        <template #type="{ data }">
          {{ IncomeType[data.data.type] }}
        </template>
        <!-- <DxColumn caption="총지급액" data-field="totalPayment" />
                <DxColumn caption="인원" data-field="employeeStat.employeeCount"  data-type="string" /> -->
        <DxColumn
          caption="마감현황"
          cell-template="status"
          alignment="center"
        />
        <template #status="{ data }">
          <process-status
            v-model:valueStatus="data.data.status"
            :dataRow="data.data"
            @checkConfirmRowTable="changeStatusRowTable"
          />
        </template>
        <DxColumn caption="마감일" cell-template="마감일" alignment="center" />
        <template #마감일="{ data }">
          <a-tooltip color="white" placement="top">
            <template #title>
              <div class="d-flex items-center gap-4 text-color-black">
                <span>{{
                  dayjs(data.data.updatedAt).format("YYYY-MM-DD")
                }}</span>
                <a-tag
                  :color="getColorTag(data.data.statusUpdateUser.type)"
                  class="mr-0"
                >
                  {{ data.data.statusUpdateUser.type == "m" ? "매" : "고" }}
                </a-tag>
                <span>{{ data.data.statusUpdateUser.username }}</span>
                <span>{{ data.data.statusUpdateUser.id }}</span>
              </div>
            </template>
            <span v-if="data.data.updatedAt" class="tag-custom-3">{{
              dayjs(data.data.updatedAt).format("MM-DD")
            }}</span>
          </a-tooltip>
        </template>
      </DxDataGrid>
    </a-spin>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import {
  DxDataGrid,
  DxToolbar,
  DxSelection,
  DxColumn,
  DxItem,
  DxScrolling,
} from "devextreme-vue/data-grid";
import queries from "@/graphql/queries/BF/BF6/BF610/index";
import mutations from "@/graphql/mutations/BF/BF6/BF610/index";
import notification from "@/utils/notification";
import dayjs from "dayjs";
import { IncomeType } from "@bankda/jangbuda-common";
import { Message } from "@/configs/enum";
export default defineComponent({
  components: {
    DxDataGrid,
    DxToolbar,
    DxSelection,
    DxColumn,
    DxItem,
    DxScrolling,
  },
  props: {
    modalStatus: Boolean,
    dataCall: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    let trigger = ref(false);
    const dataSource = ref();
    let dataSearch = ref();
    /*
     * ============== API ==============
     */
    //  QUERY : getIncomProcessesInTaxWithholdingStatusReport
    let {
      refetch: refetchTable,
      loading: loadingTable,
      onError: errorTable,
      onResult: resTable,
    } = useQuery(
      queries.getIncomProcessesInTaxWithholdingStatusReport,
      dataSearch,
      () => ({
        enabled: trigger.value,
        fetchPolicy: "no-cache",
      })
    );
    resTable((res) => {
      dataSource.value =
        res.data?.getIncomProcessesInTaxWithholdingStatusReport;
    });
    errorTable((res) => {
      notification("error", res.message);
    });
    //  Mutation : changeIncomeProcessStatus
    const {
      mutate: actionChangeStatus,
      loading: loadingChangeStatus,
      onDone: doneChangeStatus,
      onError: errChangeStatus,
    } = useMutation(mutations.changeIncomeProcessStatus);
    doneChangeStatus(() => {
      refetchTable();
      notification("success", `업부상태 변경되었습니다!`);
    });
    errChangeStatus((error) => {
      //notification('error', error.message)
    });
    /*
     * ============== WATCHING ==============
     */
    watch(
      () => props.modalStatus,
      (newVal: any) => {
        if (newVal == true) {
          trigger.value = true;
          dataSearch.value = {
            companyId: props.dataCall?.companyId,
            reportId: props.dataCall?.reportId,
            imputedYear: props.dataCall?.imputedYear,
          };
          if (dataSearch.value) refetchTable();
        }
      },
      { deep: true }
    );
    /*
     * ============== FUNCTION ==============
     */
    const changeStatusRowTable = (data: any) => {
      let dataChangeStatus = {
        companyId: data.companyId,
        type: data.type,
        processKey: {
          imputedMonth: data.imputedMonth,
          imputedYear: data.imputedYear,
          paymentMonth: data.paymentMonth,
          paymentYear: data.paymentYear,
        },
        status: data.status,
      };
      actionChangeStatus(dataChangeStatus);
    };
    const setModalVisible = () => {
      emit("closePopup", true);
    };
    const getColorTag = (data: any) => {
      if (data === "c") {
        return "#91d5ff";
      } else if (data === "m") {
        return "black";
      } else if (data === "r") {
        return "grey";
      } else if (data === "p") {
        return "goldenrod";
      }
    };

    return {
      dataSource,
      loadingTable,
      loadingChangeStatus,
      dayjs,
      setModalVisible,
      changeStatusRowTable,
      getColorTag,
      IncomeType,
      Message
    };
  },
});
</script>
<style scoped lang="scss">
.tag-custom-2 {
  background-color: black;
  padding: 4px 20px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.tag-custom-1 {
  background-color: gray;
  padding: 4px 20px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}
.tag-custom-3 {
  background-color: white;
  padding: 3px 24px;
  border-radius: 5px;
  color: black;
  border: 1px solid black;
  cursor: pointer;
}
.text-color-black {
  color: black;
}
.gap-4 {
  gap: 6px;
}
.mr-0 {
  margin-right: 0px;
}
:deep .buttonModal {
  //margin-top: -5px;
  //height: 27px !important;
}
</style>
