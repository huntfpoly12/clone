<template>
  <div class="tab-group">
    <section></section>
    <div class="content-grid">
      <a-spin :spinning="loading1 || loadingDataSource">
        <DxDataGrid
          id="tab2-bf530"
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="filterDsTab2Bf530"
          :show-borders="true"
          key-expr="workId"
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
          <DxPaging :page-size="1000" />
          <DxSearchPanel
            :visible="true"
            :highlight-case-sensitive="true"
            placeholder="검색"
          />
          <DxExport :enabled="true" />
          <DxToolbar>
            <DxItem
              template="search"
              location="after"
            />
            <DxItem template="btnSave" location="after" />
            <DxItem name="searchPanel" location="after" />
            <DxItem
              name="exportButton"
              css-class="cell-button-export"
              location="after"
            />
          </DxToolbar>
          <template #search>
            <a-row>
              <a-rol class="mr-15">
                <a-form-item label="신고종류">
                  <SelectCustomField
                    :searchEnabled="true"
                    v-model:valueInput="formState.type"
                    :dataSource="reportTypeSelectbox"
                    width="95px"
                    displayeExpr="text"
                    valueExpr="id"
                    :isShowId="false"
                    placeholder="선택"
                  />
                </a-form-item>
              </a-rol>
              <a-rol class="mr-15">
                <a-form-item label="상태">
                  <SelectCustomField
                    :searchEnabled="true"
                    v-model:valueInput="formState.workingStatus"
                    :dataSource="workingStatusSelectbox"
                    width="95px"
                    displayeExpr="text"
                    valueExpr="id"
                    :isShowId="false"
                    placeholder="선택"
                  />
                </a-form-item>
              </a-rol>
              <a-col>
                <a-form-item label="기간">
                  <range-date-time-box
                    v-model:valueDate="rangeDate"
                    width="200px"
                    :multi-calendars="true"
                    :clearable="false"
                    teleport
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </template>
          <template #btnSave>
            <div>
              <button-basic
                @onClick="onSave"
                mode="contained"
                type="default"
                text="상태일괄변경"
              />
            </div>
          </template>
          <DxSelection
            :select-all-mode="'allPages'"
            :show-check-boxes-mode="'onClick'"
            mode="multiple"
          />
          <DxColumn
            caption="일련번호"
            data-field="companyId"
            alignment="center"
          />
          <DxColumn
            caption="신고구분"
            data-field="type"
            alignment="center"
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
            width="110"
            cell-template="workingStatus"
          />
          <template #workingStatus="{ data }: any">
            <SelectCustomField
              v-model:valueInput="data.data.workingStatus"
              :dataSource="workingStatusSelectbox"
              width="95px"
              displayeExpr="text"
              valueExpr="id"
              :isShowId="false"
              placeholder="선택"
            />
          </template>
          <DxColumn
            caption="사무대행위탁상태"
            data-field="companyConsignStatus"
            width="125"
            :format="consignStatusText"
            alignment="center"
          />
          <DxColumn
            caption="신청일"
            data-field="registeredAt"
            width="95"
            alignment="left"
            data-type="date"
            format="yyyy-MM-dd"
          >
          </DxColumn>
          <DxColumn
            caption="접수일"
            data-field="acceptedAt"
            width="95"
            data-type="date"
            format="yyyy-MM-dd"
          />
          <DxColumn
            caption="완료일"
            data-field="completedAt"
            alignment="left"
            data-type="date"
            cell-template="completedAt"
            width="95"
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
            width="135px"
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
  DxPaging,
  DxItem,
  DxSearchPanel,
  DxExport,
  DxToolbar,
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
  consignStatusText,
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
    DxPaging,
    DxItem,
    DxSearchPanel,
    DxExport,
    DxToolbar,
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

    const rangeDate = ref([
      dayjs().subtract(1, "year").format("YYYYMMDD"),
      dayjs().format("YYYYMMDD"),
    ]);
    watch(rangeDate, (newVal: any, oldVal) => {
      let oldVal2 = oldVal.map((item: any) => +item);
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal2)) {
        companyRequestListParam.input = {
          fromDate: newVal[0],
          toDate: newVal[1],
        };
        companyRequestListTrigger.value = true;
      }
    });
    const dataSource = ref<any[]>([...dataTableTab1]);
    const filterDsTab2Bf530 = computed(
      () => store.state.common.filterDsTab2Bf530
    );
    const companyRequestListParam = reactive({
      input: {
        fromDate: +rangeDate.value[0],
        toDate: +rangeDate.value[1],
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
      if (newVal !== null) {
        loadingDataSource.value = true;
        let dataArr = newVal.getMajorInsuranceAdminCompanyRequestList.map(
          (item: any) => {
            return {
              companyName: item.company.name,
              companyPresidentName: item.company.presidentName,
              manageId: item.majorInsuranceConsignStatus.manageId,
              companyConsignStatus:
                item.majorInsuranceConsignStatus.companyConsignStatus,
              visible: false,
              ...item,
            };
          }
        );
        dataSource.value = dataArr;
      } else {
        dataSource.value = [];
      }
      if (props.onSearch) {
        props.onSearch();
      }
      companyRequestListTrigger.value = false;
    });
    companyRequestListError((res: any) => {
      notification("error", res.message);
      dataSource.value = [];
      if (props.onSearch) {
        props.onSearch();
      }
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
      consignStatusText,
    };
  },
});
</script>
<style lang="scss">
@import "../../style/style.scss";
</style>
