<template>
  <div class="tab-group tab1">
    <div class="content-grid">
      <a-spin :spinning="loading1 || loadingDataSource">
        <DxDataGrid
          id="tab1-bf530"
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="filterDsTab1Bf530"
          :show-borders="true"
          key-expr="companyId"
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
          <DxPaging :page-size="1000" />
          <DxSearchPanel
            :visible="true"
            :highlight-case-sensitive="true"
            placeholder="검색"
          />
          <DxExport :enabled="true" />
          <DxToolbar>
            <DxItem location="after" template="search" />
            <DxItem template="btnSave" location="after" />
            <DxItem name="searchPanel" location="after" />
            <DxItem
              name="exportButton"
              css-class="cell-button-export"
              location="after"
            />
          </DxToolbar>
          <template #search>
            <a-row :gutter="[0, 5]" align="center">
              <a-rol class="mr-20">
                <a-form-item label="상태">
                  <SelectCustomField
                    :searchEnabled="true"
                    v-model:valueInput="formState.workingStatus"
                    :dataSource="workingStatusSelectbox"
                    width="90px"
                    displayeExpr="text"
                    valueExpr="id"
                    :isShowId="false"
                    placeholder="선택"
                  />
                </a-form-item>
              </a-rol>
              <a-rol class="mr-20">
                <a-form-item label="수임상태">
                  <SelectCustomField
                    :searchEnabled="true"
                    v-model:valueInput="formState.companyConsignStatus"
                    :dataSource="companyConsignStatusSelectbox"
                    width="90px"
                    displayeExpr="text"
                    valueExpr="id"
                    :isShowId="false"
                    placeholder="선택"
                  />
                </a-form-item>
              </a-rol>
              <a-rol class="mr-20">
                <a-form-item label="건강ED 연계상태">
                  <SelectCustomField
                    :searchEnabled="true"
                    v-model:valueInput="formState.healthInsuranceEDIStatus"
                    :dataSource="EDIStatusSelectbox"
                    width="90px"
                    displayeExpr="text"
                    valueExpr="id"
                    :isShowId="false"
                    placeholder="선택"
                  />
                </a-form-item>
              </a-rol>
              <a-rol class="mr-20">
                <a-form-item label="연금EDI 연계상태">
                  <SelectCustomField
                    :searchEnabled="true"
                    v-model:valueInput="formState.nationalPensionEDIStatus"
                    :dataSource="EDIStatusSelectbox"
                    width="90px"
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
          <DxColumn caption="업체명" data-field="companyName" />
          <DxColumn
            caption="사업자등록번호"
            data-field="companyBizNumber"
            :format="$filters.formatBizNumber"
          />
          <DxColumn
            caption="사업장관리번호"
            data-field="manageId"
            :format="$filters.formatManageId"
          />
          <DxColumn
            caption="대표자명"
            data-field="companyPresidentName"
            width="95px"
          />
          <DxColumn
            data-field="companyConsignStatus"
            caption="수임상태"
            width="105"
            cell-template="companyConsignStatus"
            alignment="left"
            :allow-sorting="false"
          />
          <template #companyConsignStatus="{ data }: any">
            <SelectCustomField
              v-model:valueInput="data.data.companyConsignStatus"
              :dataSource="companyConsignStatusSelectbox"
              width="90px"
              displayeExpr="text"
              valueExpr="id"
              :isShowId="false"
              placeholder="선택"
            />
            <!-- <SelectBoxCT
              :searchEnabled="false"
              :arrSelect="companyConsignStatusSelectbox"
              v-model:valueInput="data.data.companyConsignStatus"
              displayeExpr="text"
              valueExpr="id"
              width="90px"
              placeholder="선택"
            /> -->
          </template>
          <DxColumn
            data-field="workingStatus"
            caption="상태(처리상태)"
            width="105"
            cell-template="workingStatus"
            alignment="left"
            :allow-sorting="false"
          />
          <template #workingStatus="{ data }: any">
            <SelectCustomField
              v-model:valueInput="data.data.workingStatus"
              :dataSource="workingStatusSelectbox"
              width="90px"
              displayeExpr="text"
              valueExpr="id"
              :isShowId="false"
              placeholder="선택"
            />
            <!-- <SelectBoxCT
              :searchEnabled="true"
              :arrSelect="workingStatusSelectbox"
              v-model:valueInput="data.data.workingStatus"
              displayeExpr="text"
              valueExpr="id"
              width="90px"
              placeholder="선택"
            /> -->
          </template>
          <DxColumn caption="메모" width="135" cell-template="memo" />
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
            data-field="healthInsuranceEDIStatus"
            caption="건강EDI 연계상태 "
            width="105"
            cell-template="healthInsuranceEDIStatus"
            alignment="left"
            :allow-sorting="false"
          />
          <template #healthInsuranceEDIStatus="{ data }: any">
            <SelectCustomField
              v-model:valueInput="data.data.healthInsuranceEDIStatus"
              :dataSource="EDIStatusSelectbox"
              width="90px"
              displayeExpr="text"
              valueExpr="id"
              :isShowId="false"
              placeholder="선택"
            />
          </template>
          <DxColumn
            data-field="nationalPensionEDIStatus"
            caption="연금EDI 연계상태 "
            width="105"
            cell-template="nationalPensionEDIStatus"
            alignment="left"
            :allow-sorting="false"
          />
          <template #nationalPensionEDIStatus="{ data }: any">
            <SelectCustomField
              v-model:valueInput="data.data.nationalPensionEDIStatus"
              :dataSource="EDIStatusSelectbox"
              width="90px"
              displayeExpr="text"
              valueExpr="id"
              :isShowId="false"
              placeholder="선택"
            />
          </template>
          <DxColumn
            caption="관할지사정보수정"
            cell-template="productionStatus"
            alignment="center"
          />
          <template #productionStatus="{ data }: any">
            <div class="d-flex justify-content-center">
              <button-basic
                @onClick="onOpenPop1(data.data.companyId)"
                mode="contained"
                type="default"
                text="수정"
              />
            </div>
          </template>
          <DxColumn
            caption="리포트파일다운로드"
            cell-template="downA"
            alignment="right"
          />
          <template #downA="{ data }: any" class="custom-action">
            <div class="d-flex justify-content-center">
              <DxButton
                type="ghost"
                class=""
                style="cursor: pointer"
                @click="onGetAcquistionRp(data.data.companyId)"
              >
                <DownloadOutlined :style="{ fontSize: 12 }" />
              </DxButton>
            </div>
          </template>
          <DxColumn
            caption="신청일"
            data-field="registeredAt"
            alignment="left"
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
          <DxColumn caption="팩스발송" cell-template="downD" width="105px" />
          <template #downD="{ data }: any">
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
          <DxColumn cell-template="history" width="50" />
          <template #history="{ data }: any" class="custom-action">
            <div class="d-flex justify-content-center">
              <DxButton
                type="ghost"
                style="cursor: pointer"
                @click="onOpenLogs(data.data.companyId)"
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
    <Correction
      v-if="modalStatus1"
      @closeModal="closeCorrection"
      :companyIdParam="companyIdParam"
    />
    <History
      v-if="modalHistory"
      @closeModal="modalHistory = false"
      :companyIdParam="companyIdParam"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import queries from "@/graphql/queries/BF/BF5/BF530/index";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useStore } from "vuex";
import DxButton from "devextreme-vue/button";
import {
  DxDataGrid,
  DxColumn,
  DxScrolling,
  DxSelection,
  DxLoadPanel,
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
import { DxTextBox, DxTooltip } from "devextreme-vue";
import notification from "@/utils/notification";
import { Message } from "@/configs/enum";
import {
  reportTypeSelectbox,
  workingStatusSelectbox,
  companyConsignStatusSelectbox,
  EDIStatusSelectbox,
  formatMonth,
  states1,
  completedAtFormat,
} from "../../utils/index";
import dayjs from "dayjs";
import Correction from "./Correction.vue";
import SendTax from "./SendTax.vue";
import History from "./History.vue";
import SelectBoxCT from "./../SelectBoxCT.vue";
import mutations from "@/graphql/mutations/BF/BF5/BF530/index";
export default defineComponent({
  components: {
    DxButton,
    DxDataGrid,
    DxScrolling,
    DxSelection,
    DxColumn,
    SaveOutlined,
    DxLoadPanel,
    Correction,
    SendTax,
    History,
    DownloadOutlined,
    SelectBoxCT,
    HistoryOutlined,
    DxTextBox,
    DxTooltip,
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
      companyName4: "",
      workingStatus: "",
      companyConsignStatus: "",
      healthInsuranceEDIStatus: "",
      nationalPensionEDIStatus: "",
    });
    const { move_column, colomn_resize } = store.state.settings;
    const tab1Bf520Ref = ref();
    const dataTest = ref();
    const companies = ref<any[]>([]);
    const globalYear = dayjs().year();
    const loadingDataSource = ref(false);

    //-----------------------Fcn common-----------------------------------------

    //-----------------------Get DATA SOURCE------------------------------

    const rangeDate = ref([
      dayjs().subtract(1, "year").format("YYYYMMDD"),
      dayjs().format("YYYYMMDD"),
    ]);
    watch(rangeDate, (newVal: any, oldVal) => {
      let oldVal2 = oldVal.map((item: any) => +item);
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal2)) {
        adminConsignStatusParam.input = {
          fromDate: newVal[0],
          toDate: newVal[1],
        };
        adminConsignStatusTrigger.value = true;
      }
    });
    const dataSource = ref<any[]>([]);
    const filterDsTab1Bf530 = computed(
      () => store.state.common.filterDsTab1Bf530
    );
    const adminConsignStatusParam = reactive({
      input: {
        fromDate: +rangeDate.value[0],
        toDate: +rangeDate.value[1],
      },
    });
    const adminConsignStatusTrigger = ref(true);
    const {
      result: adminConsignStatusResult,
      onError: adminConsignStatusError,
      loading: loading1,
      refetch,
    } = useQuery(
      queries.getMajorInsuranceAdminConsignStatus,
      adminConsignStatusParam,
      () => ({
        fetchPolicy: "no-cache",
        enabled: adminConsignStatusTrigger.value,
      })
    );
    watch(adminConsignStatusResult, (newVal) => {
      if (newVal !== null) {
        loadingDataSource.value = true;
        let dataArr = newVal.getMajorInsuranceAdminConsignStatus.map(
          (item: any) => {
            return {
              companyCode: item.company.code,
              companyName: item.company.name,
              companyBizNumber: item.company.bizNumber,
              companyPresidentName: item.company.presidentName,
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
      adminConsignStatusTrigger.value = false;
    });
    adminConsignStatusError((res: any) => {
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
        store.commit("common/filterDsTab1Bf530", arr);
        setTimeout(() => {
          loadingDataSource.value = false;
        }, 0);
      },
      { deep: true }
    );

    // -----------------------------HISTORY-------------------

    const modalHistory = ref(false);
    const companyIdParam = ref();
    const onOpenLogs = (e: number) => {
      modalHistory.value = true;
      companyIdParam.value = e;
      // actionParam.workId = e;
    };

    //----------------------------SELECT ROW IN TABLES ------------------------

    const selectionChanged = (event: any) => {
      let { selectedRowsData } = event;
      companies.value = selectedRowsData.map((item: any) => item.companyId);
    };

    //----------------------------OPEN MODAL 1 CORRECTION ------------------------

    const modalStatus1 = ref<boolean>(false);
    const onOpenPop1 = (companyId: any) => {
      modalStatus1.value = true;
      companyIdParam.value = companyId;
    };
    const closeCorrection = (emitVal: boolean) => {
      modalStatus1.value = false;
      if (emitVal) {
        adminConsignStatusTrigger.value = true;
      }
    };

    //-------------------------get MajorInsurance ViewURL ------------------------

    const getMajorInsuranceUrlParam = reactive<any>({
      companyId: null,
      imputedYear: globalYear,
    });
    const getMajorInsuranceUrlTrigger = ref<boolean>(false);
    const {
      onError: getMajorInsuranceUrlError,
      result: getMajorInsuranceUrlResult,
    } = useQuery(
      queries.getMajorInsuranceConsignStatusFaxFilingReportViewUrl,
      getMajorInsuranceUrlParam,
      () => ({
        enabled: getMajorInsuranceUrlTrigger.value,
        fetchPolicy: "no-cache",
      })
    );
    watch(getMajorInsuranceUrlResult, (newVal: any) => {
      let data = newVal.getMajorInsuranceConsignStatusFaxFilingReportViewUrl;
      if (data) window.open(data);
    });
    getMajorInsuranceUrlError((res: any) => {
      notification("error", res.message);
      getMajorInsuranceUrlTrigger.value = false;
    });

    const onGetAcquistionRp = (e: any) => {
      getMajorInsuranceUrlParam.companyId = e;
      getMajorInsuranceUrlTrigger.value = true;
    };

    //------------------------ACTION UPDATE TABLE--------------------------------

    //updateConsignStatus
    const {
      mutate: creationConsignStatus,
      onDone: onDoneConsignStatus,
      onError: onErrorConsignStatus,
    } = useMutation(mutations.updateMajorInsuranceConsignStatus);
    onDoneConsignStatus(() => {
      notification("success", Message.getCommonMessage("106").message);
      emit("closeModal", true);
      adminConsignStatusTrigger.value = true;
    });
    onErrorConsignStatus((e: any) => {
      notification("error", e.message);
    });
    //updateConsignMemo
    const {
      mutate: creationConsignMemo,
      onDone: onDoneConsignMemo,
      onError: onErrorConsignMemo,
    } = useMutation(mutations.updateMajorInsuranceConsignMemo);
    onDoneConsignMemo(() => {
      notification("success", Message.getCommonMessage("106").message);
      emit("closeModal", true);
    });
    onErrorConsignMemo((e: any) => {
      notification("error", e.message);
    });
    //updateConsignWorkingStatus
    const {
      mutate: creationConsignWorkingStatus,
      onDone: onDoneConsignWorkingStatus,
      onError: onErrorConsignWorkingStatus,
    } = useMutation(mutations.updateMajorInsuranceConsignWorkingStatus);
    onDoneConsignWorkingStatus(() => {
      notification("success", Message.getCommonMessage("106").message);
      emit("closeModal", true);
    });
    onErrorConsignWorkingStatus((e: any) => {
      notification("error", e.message);
    });
    //cancelConsignWorkingStatus
    const {
      mutate: cancelConsignWorkingStatus,
      onDone: onDoneConsignWorkingStatus2,
      onError: onErrorConsignWorkingStatus2,
    } = useMutation(mutations.cancelMajorInsuranceConsignStatus);
    onDoneConsignWorkingStatus2(() => {
      notification("success", Message.getCommonMessage("106").message);
      emit("closeModal", true);
      adminConsignStatusTrigger.value = true;
      refetch();
    });
    onErrorConsignWorkingStatus2((e: any) => {
      notification("error", e.message);
    });

    const onSave = () => {
      let formConsignStatus: any[] = [];
      filterDsTab1Bf530.value.forEach((item: any) => {
        if (companies.value.some((item1: any) => item.companyId == item1)) {
          return formConsignStatus.push({
            field: {
              companyId: item.companyId,
              input: {
                companyConsignStatus: item.companyConsignStatus,
                healthInsuranceEDIStatus: item.healthInsuranceEDIStatus,
                nationalPensionEDIStatus: item.nationalPensionEDIStatus,
              },
            },
            workingStatus: item.workingStatus,
          });
        }
      });
      formConsignStatus.forEach((item: any) => {
        if (item.workingStatus == 0) {
          cancelConsignWorkingStatus({
            companyId: item.field.companyId,
            imputedYear: globalYear,
          });
        }
        creationConsignStatus(item.field);
      });
      let formConsignMemo: any[] = [];
      filterDsTab1Bf530.value.forEach((item: any) => {
        if (
          companies.value.some((item1: any) => item.companyId == item1) &&
          item.memo
        ) {
          return formConsignMemo.push({
            companyId: item.companyId,
            memo: item.memo,
          });
        }
      });
      formConsignMemo.forEach((item: any) => {
        creationConsignMemo(item);
      });
      let formConsignWorkingStatus: any[] = [];
      filterDsTab1Bf530.value.forEach((item: any) => {
        if (companies.value.some((item1: any) => item.companyId == item1)) {
          return formConsignWorkingStatus.push({
            companyId: item.companyId,
            workingStatus: item.workingStatus,
          });
        }
      });
      formConsignWorkingStatus.forEach((item: any) => {
        creationConsignWorkingStatus(item);
      });
    };
    return {
      formState,
      rangeDate,
      move_column,
      colomn_resize,
      dataSource,
      filterDsTab1Bf530,
      selectionChanged,
      formatMonth,
      reportTypeSelectbox,
      workingStatusSelectbox,
      companyConsignStatusSelectbox,
      EDIStatusSelectbox,
      states1,
      modalStatus1,
      onOpenPop1,
      closeCorrection,
      onOpenLogs,
      modalHistory,
      onSave,
      tab1Bf520Ref,
      dataTest,
      companyIdParam,
      loading1,
      onGetAcquistionRp,
      dayjs,
      completedAtFormat,
      loadingDataSource,
    };
  },
});
</script>
<style lang="scss">
@import "../../style/style.scss";

.btn-close {
  font-size: 14px;
  border: 1px solid #3333;
  display: block;
  padding: 3px;
  line-height: 4px;
  height: 14px;
  margin-left: 92%;
  margin-bottom: 7px;
  cursor: pointer;
}
</style>
