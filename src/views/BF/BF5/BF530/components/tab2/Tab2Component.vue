<template>
  <div class="tab-group">
    <section>
      <a-row :gutter="[0, 5]">
        <a-rol class="mr-15">
          <a-form-item label="업체명">
            <default-text-box
              width="150px"
              v-model:valueInput="formState.companyName"
            />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="사업자등록번호">
            <biz-number-text-box
              width="150px"
              v-model:valueInput="formState.companyBizNumber"
            />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="사업장관리번호">
            <ManageIdTextBox
              width="150px"
              v-model:valueInput="formState.manageId"
            />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="신고종류">
            <SelectBoxCT
              :searchEnabled="true"
              :arrSelect="reportTypeSelectbox"
              v-model:valueInput="formState.type"
              displayeExpr="text"
              valueExpr="id"
              width="150px"
              placeholder="선택"
            />
          </a-form-item>
        </a-rol>
        <a-rol class="mr-15">
          <a-form-item label="상태">
            <SelectBoxCT
              :searchEnabled="true"
              :arrSelect="workingStatusSelectbox"
              v-model:valueInput="formState.workingStatus"
              displayeExpr="text"
              valueExpr="id"
              width="150px"
              placeholder="선택"
            />
          </a-form-item>
        </a-rol>
        <a-col>
          <a-form-item label="기간">
            <range-date-time-box
              v-model:valueDate="rangeDate"
              width="250px"
              :multi-calendars="true"
              :clearable="false"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </section>
    <a-row class="top-table mt-10" justify="end">
      <button-basic
        @onClick="onSave"
        mode="contained"
        type="default"
        text="상태일괄변경"
      />
    </a-row>
    <div class="content-grid">
      <a-spin :spinning="loading1 || loadingDataSource">
        <DxDataGrid
          id="tab2-bf530"
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="filterDsTab2Bf530"
          :show-borders="true"
          key-expr="workId"
          class="mt-10"
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
          @selection-changed="selectionChanged"
          :allowSelection="true"
          ref="tab1Bf520Ref"
          noDataText="내역이 없습니다"
        >
          <DxKeyboardNavigation :enabled="false" />
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxLoadPanel :enabled="false" :showPane="true" />
          <DxSelection
            :select-all-mode="'allPages'"
            :show-check-boxes-mode="'onClick'"
            mode="multiple"
          />
          <DxColumn
            caption="일련번호"
            data-field="companyId"
            alignment="left"
          />
          <DxColumn
            caption="신고구분"
            data-field="type"
            alignment="left"
            :format="reportTypeText"
          />
          <DxColumn caption="업체명" data-field="companyName" />
          <DxColumn
            caption="사업장관리번호"
            data-field="manageId"
            :format="$filters.formatManageId"
          />
          <DxColumn caption="대표자명" data-field="companyPresidentName" />
          <DxColumn
            caption="상태"
            width="135px"
            cell-template="workingStatus"
          />
          <template #workingStatus="{ data }: any">
            <SelectBoxCT
              :searchEnabled="true"
              :arrSelect="workingStatusSelectbox"
              v-model:valueInput="data.data.workingStatus"
              displayeExpr="text"
              valueExpr="id"
              width="120px"
              placeholder="선택"
            />
          </template>
          <DxColumn
            caption="사무대행위탁상태"
            data-field="totalCollectedTaxAmount"
            width="125"
          />
          <DxColumn
            caption="신청일"
            data-field="registeredAt"
            width="125"
            alignment="left"
            data-type="date"
            format="yyyy-MM-dd"
          >
          </DxColumn>
          <DxColumn
            caption="접수일"
            data-field="acceptedAt"
            width="125"
            data-type="date"
            format="yyyy-MM-dd"
          />
          <DxColumn
            caption="완료일"
            data-field="completedAt"
            alignment="left"
            data-type="date"
            cell-template="completedAt"
          />
          <template #completedAt="{ data }">
            <div>
              {{
                completedAtFormat(
                  data.data.completedAt,
                  data.data.workingStatus
                )
              }}
            </div>
          </template>
          <DxColumn
            caption="접수번호"
            width="155px"
            cell-template="acceptedNumber"
          />
          <template #acceptedNumber="{ data }: any">
            <default-text-box
              :width="120"
              v-model:valueInput="data.data.acceptedNumber"
            />
          </template>
          <DxColumn caption="메모" width="135px" cell-template="memo" />
          <template #memo="{ data }: any">
            <a-tooltip zIndex="9999999" placement="top" color="black">
              <template #title> {{ data.data.memo }} </template>
              <div></div>
              <default-text-box
                :width="120"
                v-model:valueInput="data.data.memo"
              />
            </a-tooltip>
          </template>
          <DxColumn
            caption="신고서다운로드"
            cell-template="downA"
            alignment="right"
          />
          <template #downA="{ data }: any" class="custom-action">
            <div class="d-flex justify-content-center">
              <DxButton
                type="ghost"
                class=""
                style="cursor: pointer"
                @click="
                  onGetAcquistionRp(
                    data.data.workId,
                    data.data.companyId,
                    data.data.type
                  )
                "
              >
                <DownloadOutlined :style="{ fontSize: 12 }" />
              </DxButton>
            </div>
          </template>

          <DxColumn caption="팩스발송" cell-template="downD" />
          <template #downD="{ data }: any" class="custom-action">
            <div class="d-flex justify-content-center">
              <a-popover
                v-model:visible="data.data.visible"
                trigger="click"
                zIndex="9999"
              >
                <template #content>
                  <div class="mb-5">아직 제공되지 않는 기능입니다.</div>
                </template>
                <a href="#"></a>
                <button-basic mode="contained" type="default" text="팩스발송" />
              </a-popover>
            </div>
          </template>
          <DxColumn
            caption="팩스상태"
            cell-template="downE"
            alignment="right"
          />
          <template #downE="{ data }: any" class="custom-action">
            <div class="d-flex justify-content-center">
              <!-- <DxButton type="ghost" class="" style="cursor: pointer" @click=" onGetAcquistionRp(data.data.workId) ">
              <DownloadOutlined :style="{fontSize: 12}"/>
            </DxButton> -->
            </div>
          </template>
          <DxColumn cell-template="history" />
          <template #history="{ data }: any" class="custom-action">
            <div class="d-flex justify-content-center">
              <DxButton
                type="ghost"
                style="cursor: pointer"
                @click="
                  onOpenLogs(
                    data.data.workId,
                    data.data.companyId,
                    data.data.type
                  )
                "
              >
                <a-tooltip zIndex="9999999" placement="top" color="black">
                  <template #title>
                    <div>변경이력</div>
                  </template>
                  <HistoryOutlined style="font-size: 16px" />
                </a-tooltip>
              </DxButton>
            </div>
          </template>
        </DxDataGrid>
      </a-spin>
    </div>
    <History
      v-if="modalHistory"
      @closeModal="modalHistory = false"
      :param-value="paramValue"
      :dataType="dataType"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from "vue";
import queries from "@/graphql/queries/BF/BF5/BF530/index";
import mutations from "@/graphql/mutations/BF/BF5/BF530/index";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useStore } from "vuex";
import DxButton from "devextreme-vue/button";
import {
  DxDataGrid,
  DxColumn,
  DxScrolling,
  DxSelection,
  DxSummary,
  DxTotalItem,
  DxLoadPanel,
  DxEditing,
  DxLookup,
  DxColumnFixing,
  DxKeyboardNavigation,
} from "devextreme-vue/data-grid";
import {
  DownloadOutlined,
  SaveOutlined,
  HistoryOutlined,
} from "@ant-design/icons-vue";
import notification from "@/utils/notification";
import { Message } from "@/configs/enum";
import {
  reportTypeSelectbox,
  workingStatusSelectbox,
  companyConsignStatusSelectbox,
  EDIStatusSelectbox,
  formatMonth,
  dataTableTab1,
  states1,
  reportTypeSelectbox2,
  reportTypeText,
  completedAtFormat,
} from "../../utils/index";
import dayjs from "dayjs";
import History from "./History.vue";
import SelectBoxCT from "./../SelectBoxCT.vue";
export default defineComponent({
  components: {
    DxButton,
    DxDataGrid,
    DxScrolling,
    DxSelection,
    DxColumn,
    SaveOutlined,
    DxSummary,
    DxTotalItem,
    DxLoadPanel,
    History,
    DxEditing,
    DxLookup,
    DownloadOutlined,
    DxColumnFixing,
    SelectBoxCT,
    HistoryOutlined,
    DxKeyboardNavigation,
  },
  props: {
    search: {
      type: Number,
    },
    onSearch: {
      type: Function,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const countGet = ref(0);
    const rangeDate: any = computed({
      get() {
        return [
          parseInt(dayjs().subtract(1, "week").format("YYYYMMDD")),
          parseInt(dayjs().format("YYYYMMDD")),
        ];
      },
      set(newVal: any) {
        companyRequestListParam.input = {
          fromDate: newVal[0],
          toDate: newVal[1],
        };
        if (countGet.value == 1) {
          companyRequestListTrigger.value = true;
        } else {
          countGet.value = 0;
        }
      },
    });
    const formState: any = reactive({
      companyName: "",
      companyBizNumber: "",
      manageId: "",
      type: "",
      workingStatus: "",
    });
    const { move_column, colomn_resize } = store.state.settings;
    const tab1Bf520Ref = ref();
    const workIds = ref<any[]>([]);
    const dataType = ref(1);
    const globalYear = dayjs().year();
    const loadingDataSource = ref(false);

    //-----------------------Fcn common-----------------------------------------

    //-----------------------Search with holding and data source----------------

    const dataSource = ref<any[]>([...dataTableTab1]);
    const filterDsTab2Bf530 = computed(
      () => store.state.common.filterDsTab2Bf530
    );
    const companyRequestListParam = reactive({
      input: {
        fromDate: rangeDate.value[0],
        toDate: rangeDate.value[1],
      },
    });
    const companyRequestListTrigger = ref(true);
    const {
      result: companyRequestListResult,
      onError: companyRequestListError,
      loading: loading1,
      refetch: companyRequestListRefetch,
    } = useQuery(
      queries.getMajorInsuranceAdminCompanyRequestList,
      companyRequestListParam,
      () => ({
        fetchPolicy: "no-cache",
        enabled: companyRequestListTrigger.value,
      })
    );
    watch(companyRequestListResult, (newVal) => {
      loadingDataSource.value = true;
      let dataArr = newVal.getMajorInsuranceAdminCompanyRequestList.map(
        (item: any) => {
          return {
            companyName: item.company.name,
            companyPresidentName: item.company.presidentName,
            visible: false,
            ...item,
          };
        }
      );
      dataSource.value = dataArr;
      if (props.onSearch) {
        props.onSearch();
      }
      companyRequestListTrigger.value = false;
      countGet.value++;
    });
    companyRequestListError((res: any) => {
      notification("error", res.message);
    });

    //----------------------------ON SEARCH ------------------------------

    watch(
      () => props.search,
      () => {
        loadingDataSource.value = true;
        let arr = dataSource.value.filter((item: any) => {
          return Object.keys(formState).every((key: any) => {
            if (formState[key]) {
              return formState[key] == item[key];
            }
            if (formState[key] === 0) {
              return formState[key] == item[key];
            }
            return true;
          });
        });
        store.commit("common/filterDsTab2Bf530", arr);
        setTimeout(() => {
          loadingDataSource.value = false;
        }, 10);
      },
      { deep: true }
    );

    // -----------------------------HISTORY-------------------

    const modalHistory = ref(false);
    const paramValue = reactive({
      companyId: NaN,
      workId: NaN,
    });
    const onOpenLogs = (workId: number, companyId: number, type: number) => {
      paramValue.workId = workId;
      paramValue.companyId = companyId;
      dataType.value = type;
      modalHistory.value = true;
      // actionParam.workId = e;
    };

    //----------------------------SELECT ROW IN TABLES ------------------------

    const selectionChanged = (event: any) => {
      let { selectedRowsData } = event;
      workIds.value = selectedRowsData.map((item: any) => item.workId);
    };

    //----------------------GET ViewURL------------------------

    const viewUrlParam = reactive({
      companyId: NaN,
      imputedYear: globalYear,
      workId: NaN,
    });
    //dataType == 1
    const companyJoinViewUrlTrigger = ref<boolean>(false);
    const {
      result: companyJoinViewUrlResult,
      onError: companyJoinViewUrlError,
    } = useQuery(
      queries.getMajorInsuranceCompanyJoinFaxFilingReportViewUrl,
      viewUrlParam,
      () => ({
        enabled: companyJoinViewUrlTrigger.value,
        fetchPolicy: "no-cache",
      })
    );
    companyJoinViewUrlError((res: any) => {
      notification("error", res.message);
    });
    watch(companyJoinViewUrlResult, (newVal) => {
      if (newVal) {
        window.open(newVal.getMajorInsuranceCompanyJoinFaxFilingReportViewUrl);
        companyJoinViewUrlTrigger.value = false;
      }
    });
    //dataType == 2
    const companyOutViewUrlTrigger = ref<boolean>(false);
    const { result: companyOutViewUrlResult, onError: companyOutViewUrlError } =
      useQuery(
        queries.getMajorInsuranceCompanyOutFaxFilingReportViewUrl,
        viewUrlParam,
        () => ({
          enabled: companyOutViewUrlTrigger.value,
          fetchPolicy: "no-cache",
        })
      );
    companyOutViewUrlError((res: any) => {
      notification("error", res.message);
    });
    watch(companyOutViewUrlResult, (newVal) => {
      if (newVal) {
        window.open(newVal.getMajorInsuranceCompanyOutFaxFilingReportViewUrl);
        companyOutViewUrlTrigger.value = false;
      }
    });

    const onGetAcquistionRp = (
      workId: number,
      companyId: number,
      type: number
    ) => {
      viewUrlParam.companyId = companyId;
      viewUrlParam.workId = workId;
      if (type == 1) {
        companyJoinViewUrlTrigger.value = true;
      } else {
        companyOutViewUrlTrigger.value = true;
      }
    };

    //------------------------ACTION UPDATE TABLE--------------------------------

    //update CompanyJoinData
    const {
      mutate: creationCompanyJoinData,
      onDone: onDoneCompanyJoinData,
      onError: onErrorCompanyJoinData,
    } = useMutation(mutations.updateMajorInsuranceCompanyJoinData);
    onDoneCompanyJoinData(() => {
      notification("success", Message.getCommonMessage("106").message);
      emit("closeModal", true);
      companyRequestListTrigger.value = true;
      companyRequestListRefetch();
    });
    onErrorCompanyJoinData((e: any) => {
      notification("error", e.message);
    });
    //cancel CompanyJoinData
    const {
      mutate: cancelCompanyJoin,
      onDone: onDoneCompanyJoin2,
      onError: onErrorCompanyJoin2,
    } = useMutation(mutations.cancelMajorInsuranceCompanyJoin);
    onDoneCompanyJoin2(() => {
      notification("success", Message.getCommonMessage("106").message);
      emit("closeModal", true);
    });
    onErrorCompanyJoin2((e: any) => {
      notification("error", e.message);
    });
    //update CompanyOutData
    const {
      mutate: creationCompanyOutData,
      onDone: onDoneCompanyOutData,
      onError: onErrorCompanyOutData,
    } = useMutation(mutations.updateMajorInsuranceCompanyOutData);
    onDoneCompanyOutData(() => {
      notification("success", Message.getCommonMessage("106").message);
      emit("closeModal", true);
      companyRequestListTrigger.value = true;
      companyRequestListRefetch();
    });
    onErrorCompanyOutData((e: any) => {
      notification("error", e.message);
    });
    //cancel CompanyOutData
    const {
      mutate: cancelCompanyOut,
      onDone: onDoneCompanyOut2,
      onError: onErrorCompanyOut2,
    } = useMutation(mutations.cancelMajorInsuranceCompanyOut);
    onDoneCompanyOut2(() => {
      notification("success", Message.getCommonMessage("106").message);
      emit("closeModal", true);
    });
    onErrorCompanyOut2((e: any) => {
      notification("error", e.message);
    });

    const onSave = () => {
      let formData: any[] = [];
      filterDsTab2Bf530.value.forEach((item: any) => {
        if (workIds.value.some((item1: any) => item.workId == item1)) {
          return formData.push({
            field: {
              search: {
                companyId: item.companyId,
                imputedYear: globalYear,
                workId: item.workId,
              },
              data: {
                workingStatus: item.workingStatus,
                memo: item.memo,
                acceptedNumber: item.acceptedNumber,
              },
            },
            type: item.type,
          });
        }
      });
      formData.forEach((item: any) => {
        if (item.type == 1) {
          if (item.field.data.workingStatus == 0) {
            cancelCompanyJoin(item.field.search);
          }
          creationCompanyJoinData(item.field);
        }
        if (item.type == 2) {
          if (item.field.data.workingStatus == 0) {
            cancelCompanyOut(item.field.search);
          }
          creationCompanyOutData(item.field);
        }
      });
    };
    return {
      formState,
      rangeDate,
      move_column,
      colomn_resize,
      dataSource,
      selectionChanged,
      formatMonth,
      filterDsTab2Bf530,
      loading1,
      reportTypeSelectbox,
      workingStatusSelectbox,
      companyConsignStatusSelectbox,
      EDIStatusSelectbox,
      states1,
      reportTypeSelectbox2,
      onGetAcquistionRp,
      onOpenLogs,
      modalHistory,
      onSave,
      tab1Bf520Ref,
      dataType,
      paramValue,
      reportTypeText,
      dayjs,
      completedAtFormat,
      loadingDataSource,
    };
  },
});
</script>
<style lang="scss">
@import "../../style/style.scss";
</style>
