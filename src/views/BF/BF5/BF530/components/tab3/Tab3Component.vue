<template>
  <div class="tab-group">
    <section>
      <a-row :gutter="[0, 5]">
        <a-rol class="mr-20">
          <a-form-item label="업체명">
            <default-text-box
              width="150px"
              v-model:valueInput="formState.companyName"
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
        <a-rol class="mr-20">
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
        <a-rol class="mr-20">
          <a-form-item label="신고종류">
            <SelectBoxCT
              :searchEnabled="true"
              :arrSelect="reportTypeSelectboxTab3"
              v-model:valueInput="formState.type"
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
    <div class="content-grid">
      <a-spin :spinning="loading1 || loadingDataSource">
        <DxDataGrid
          id="tab3-bf530"
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="filterDsTab3Bf530"
          :show-borders="true"
          key-expr="workId"
          class="mt-10"
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
          @selection-changed="selectionChanged"
          :allowSelection="true"
          ref="tab3Bf520Ref"
          noDataText="내역이 없습니다"
        >
          <DxKeyboardNavigation :enabled="false" />
          <DxPaging :page-size="1000" />
          <DxSearchPanel
            :visible="true"
            :highlight-case-sensitive="true"
            placeholder="검색"
          />
          <DxExport :enabled="true" />
          <DxToolbar>
            <DxItem template="btnSave" location="after" />
            <DxItem name="searchPanel" location="after" />
            <DxItem
              name="exportButton"
              css-class="cell-button-export"
              location="after"
            />
          </DxToolbar>
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
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxSelection
            :select-all-mode="'allPages'"
            :show-check-boxes-mode="'onClick'"
            mode="multiple"
          />
          <DxLoadPanel :enabled="false" :showPane="true" />
          <DxColumn
            caption="일련번호"
            data-field="companyId"
            alignment="center"
          />
          <DxColumn
            caption="신고구분"
            data-field="type"
            alignment="center"
            :format="reportTypeTextTab3"
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
            alignment="center"
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
            data-field="companyConsignStatus"
            width="125"
            :format="consignStatusText"
            alignment="center"
          />
          <DxColumn caption="사원명" data-field="name" />
          <DxColumn
            caption="사원주민번호"
            data-field="residentId"
            alignment="center"
            :format="$filters.formatResidentId"
          />
          <DxColumn
            caption="신청일"
            data-field="registeredAt"
            width="125"
            alignment="center"
            data-type="date"
            format="yyyy-MM-dd"
          />
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
          <DxColumn
            caption="전자신고파일다운로드"
            cell-template="downB"
            alignment="right"
          />
          <template #downB="{ data }: any" class="custom-action">
            <div class="d-flex justify-content-center">
              <DxButton
                type="ghost"
                class=""
                style="cursor: pointer"
                @click="onDownLoad(data.data)"
              >
                <DownloadOutlined :style="{ fontSize: 12 }" />
              </DxButton>
            </div>
          </template>
          <DxColumn caption="팩스발송" cell-template="downD" width="100px" />
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
    <Download
      v-if="viewUrlModal"
      @closeModal="viewUrlModal = false"
      :payload="downLoadParam"
    />
    <History
      v-if="modalHistory"
      @closeModal="modalHistory = false"
      :param-value="paramValue"
      :dataType="dataType"
    />
    <popup-message
      :modalStatus="downModal1"
      @closePopup="downModal1 = false"
      title="다운로드받은 신고의 상태를 ‘완료’로 전환하시겠습니까?"
      content=""
      okText="네"
      cancelText="아니오"
      @checkConfirm="downConfirm1"
      typeModal="confirm"
    />
    <popup-message
      :modalStatus="downModal2"
      @closePopup="downModal2 = false"
      title="다운로드받은 신고의 상태를 ‘완료’로 전환하시겠습니까?"
      content=""
      okText="네"
      cancelText="아니오"
      @checkConfirm="downConfirm2"
      typeModal="confirm"
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
  DxPaging,
  DxKeyboardNavigation,
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
  reportTypeSelectboxTab3,
  workingStatusSelectbox,
  EDIStatusSelectbox,
  formatMonth,
  dataTableTab1,
  states1,
  reportTypeSelectbox2,
  reportTypeTextTab3,
  completedAtFormat,
  consignStatusText,
} from "../../utils/index";
import dayjs from "dayjs";
import Download from "./Download.vue";
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
    Download,
    History,
    DxEditing,
    DxLookup,
    DownloadOutlined,
    DxColumnFixing,
    SelectBoxCT,
    HistoryOutlined,
    DxPaging,
    DxKeyboardNavigation,
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
      manageId: "",
      type: "",
      workingStatus: "",
    });
    const { move_column, colomn_resize } = store.state.settings;
    const tab3Bf520Ref = ref();
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
        employeeRequestListParam.input = {
          fromDate: newVal[0],
          toDate: newVal[1],
        };
        employeeRequestListTrigger.value = true;
        employeeRequestListRefetch();
      }
    });
    const dataSource = ref<any[]>([...dataTableTab1]);
    const filterDsTab3Bf530 = computed(
      () => store.state.common.filterDsTab3Bf530
    );
    const employeeRequestListParam = reactive({
      input: {
        fromDate: +rangeDate.value[0],
        toDate: +rangeDate.value[1],
      },
    });
    const employeeRequestListTrigger = ref(true);
    const {
      result: employeeRequestListResult,
      onError: employeeRequestListError,
      loading: loading1,
      refetch: employeeRequestListRefetch,
    } = useQuery(
      queries.getMajorInsuranceAdminCompanyEmployeeRequestList,
      employeeRequestListParam,
      () => ({
        fetchPolicy: "no-cache",
        enabled: employeeRequestListTrigger.value,
      })
    );
    watch(employeeRequestListResult, (newVal) => {
      if (newVal !== null) {
        loadingDataSource.value = true;
        let dataArr =
          newVal.getMajorInsuranceAdminCompanyEmployeeRequestList.map(
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
      employeeRequestListTrigger.value = false;
      if (props.onSearch) {
        props.onSearch();
      }
    });
    employeeRequestListError((res: any) => {
      // notification("error", res.message);
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
        store.commit("common/filterDsTab3Bf530", arr);
        setTimeout(() => {
          loadingDataSource.value = false;
        }, 50);
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
    };

    //----------------------------SELECT ROW IN TABLES ------------------------

    const selectionChanged = (event: any) => {
      let { selectedRowsData } = event;
      workIds.value = selectedRowsData.map((item: any) => item.workId);
    };

    //----------------------GET ViewURL------------------------

    const viewUrlModal = ref<boolean>(false);
    const viewUrlParam = ref({
      companyId: NaN,
      imputedYear: globalYear,
      workId: NaN,
    });
    const viewUrlType = ref(1);
    //dataType == 1
    const type1ViewUrlTrigger = ref<boolean>(false);
    const { result: type1ViewUrlResult, onError: type1ViewUrlError } = useQuery(
      queries.getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl,
      viewUrlParam,
      () => ({
        enabled: type1ViewUrlTrigger.value,
        fetchPolicy: "no-cache",
      })
    );
    type1ViewUrlError((res: any) => {
      notification("error", res.message);
    });
    watch(type1ViewUrlResult, (newVal) => {
      if (newVal) {
        if (typeViewUrl.value === 2) {
          downLoadParam.value.url =
            newVal.getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl;
          viewUrlModal.value = true;
        } else {
          window.open(
            newVal.getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl
          );
        }
        cancelWhenViewUrl();
        type1ViewUrlTrigger.value = false;
      }
    });
    //dataType == 2
    const type2ViewUrlTrigger = ref<boolean>(false);
    const { result: type2ViewUrlResult, onError: type2ViewUrlError } = useQuery(
      queries.getMajorInsuranceCompanyEmployeeLossFaxFilingReportViewUrl,
      viewUrlParam,
      () => ({
        enabled: type2ViewUrlTrigger.value,
        fetchPolicy: "no-cache",
      })
    );
    type2ViewUrlError((res: any) => {
      notification("error", res.message);
    });
    watch(type2ViewUrlResult, (newVal) => {
      if (newVal) {
        if (typeViewUrl.value === 2) {
          downLoadParam.value.url =
            newVal.getMajorInsuranceCompanyEmployeeLossFaxFilingReportViewUrl;
          viewUrlModal.value = true;
        } else {
          window.open(
            newVal.getMajorInsuranceCompanyEmployeeLossFaxFilingReportViewUrl
          );
        }
        cancelWhenViewUrl();
        type2ViewUrlTrigger.value = false;
      }
    });
    //dataType == 3
    const type3ViewUrlTrigger = ref<boolean>(false);
    const { result: type3ViewUrlResult, onError: type3ViewUrlError } = useQuery(
      queries.getMajorInsuranceCompanyEmployeeSalaryChangeFaxFilingReportViewUrl,
      viewUrlParam,
      () => ({
        enabled: type3ViewUrlTrigger.value,
        fetchPolicy: "no-cache",
      })
    );
    type3ViewUrlError((res: any) => {
      notification("error", res.message);
    });
    watch(type3ViewUrlResult, (newVal) => {
      if (newVal) {
        if (typeViewUrl.value === 2) {
          downLoadParam.value.url =
            newVal.getMajorInsuranceCompanyEmployeeSalaryChangeFaxFilingReportViewUrl;
          viewUrlModal.value = true;
        } else {
          window.open(
            newVal.getMajorInsuranceCompanyEmployeeSalaryChangeFaxFilingReportViewUrl
          );
        }
        cancelWhenViewUrl();
        type3ViewUrlTrigger.value = false;
      }
    });
    //dataType == 4
    const type4ViewUrlTrigger = ref<boolean>(false);
    const { result: type4ViewUrlResult, onError: type4ViewUrlError } = useQuery(
      queries.getMajorInsuranceCompanyEmployeeLeaveOfAbsenceFaxFilingReportViewUrl,
      viewUrlParam,
      () => ({
        enabled: type4ViewUrlTrigger.value,
        fetchPolicy: "no-cache",
      })
    );
    type4ViewUrlError((res: any) => {
      notification("error", res.message);
    });
    watch(type4ViewUrlResult, (newVal) => {
      if (newVal) {
        if (typeViewUrl.value === 2) {
          downLoadParam.value.url =
            newVal.getMajorInsuranceCompanyEmployeeLeaveOfAbsenceFaxFilingReportViewUrl;
          viewUrlModal.value = true;
        } else {
          window.open(
            newVal.getMajorInsuranceCompanyEmployeeLeaveOfAbsenceFaxFilingReportViewUrl
          );
        }
        cancelWhenViewUrl();
        type4ViewUrlTrigger.value = false;
      }
    });
    //dataType == 5
    const type5ViewUrlTrigger = ref<boolean>(false);
    const { result: type5ViewUrlResult, onError: type5ViewUrlError } = useQuery(
      queries.getMajorInsuranceCompanyEmployeeReturnToWorkFaxFilingReportViewUrl,
      viewUrlParam,
      () => ({
        enabled: type5ViewUrlTrigger.value,
        fetchPolicy: "no-cache",
      })
    );
    type5ViewUrlError((res: any) => {
      notification("error", res.message);
    });
    watch(type5ViewUrlResult, (newVal) => {
      if (newVal) {
        if (typeViewUrl.value === 2) {
          downLoadParam.value.url =
            newVal.getMajorInsuranceCompanyEmployeeReturnToWorkFaxFilingReportViewUrl;
          viewUrlModal.value = true;
        } else {
          window.open(
            newVal.getMajorInsuranceCompanyEmployeeReturnToWorkFaxFilingReportViewUrl
          );
        }
        cancelWhenViewUrl();
        type5ViewUrlTrigger.value = false;
      }
    });
    const downModal1 = ref(false);
    const downModal2 = ref(false);
    const typeViewUrl = ref(1);
    const onGetAcquistionRp = (
      workId: number,
      companyId: number,
      type: number
    ) => {
      viewUrlParam.value = {
        ...viewUrlParam.value,
        companyId: companyId,
        workId: workId,
      };
      viewUrlType.value = type;
      downModal1.value = true;
    };
    const callApiUrl = () => {
      if (viewUrlType.value === 1) {
        type1ViewUrlTrigger.value = true;
      }
      if (viewUrlType.value === 2) {
        type2ViewUrlTrigger.value = true;
      }
      if (viewUrlType.value === 3) {
        type3ViewUrlTrigger.value = true;
      }
      if (viewUrlType.value === 4) {
        type4ViewUrlTrigger.value = true;
      }
      if (viewUrlType.value === 5) {
        type5ViewUrlTrigger.value = true;
      }
    };
    const downConfirm1 = (e: any) => {
      if (e) {
        typeViewUrl.value = 1;
        callApiUrl();
      }
    };

    const cancelWhenViewUrl = () => {
      if (viewUrlType.value == 1) {
        create1({
          search: { ...viewUrlParam.value },
          data: { workingStatus: 10 },
        });
      }
      if (viewUrlType.value == 2) {
        create2({
          search: { ...viewUrlParam.value },
          data: { workingStatus: 10 },
        });
      }
      if (viewUrlType.value == 3) {
        create3({
          search: { ...viewUrlParam.value },
          data: { workingStatus: 10 },
        });
      }
      if (viewUrlType.value == 4) {
        create4({
          search: { ...viewUrlParam.value },
          data: { workingStatus: 10 },
        });
      }
      if (viewUrlType.value == 5) {
        create5({
          search: { ...viewUrlParam.value },
          data: { workingStatus: 10 },
        });
      }
    };

    // ---------------------- DOWN LOAD --------------------

    const urlDownLoad = ref("");
    const downLoadParam: any = ref();
    const onDownLoad = (data: any) => {
      viewUrlType.value = data.type;
      viewUrlParam.value = {
        ...viewUrlParam.value,
        companyId: data.companyId,
        workId: data.workId,
      };
      downModal2.value = true;
      downLoadParam.value = data;
    };
    const downConfirm2 = (e: any) => {
      if (e) {
        typeViewUrl.value = 2;
        callApiUrl();
      }
    };

    //------------------------ACTION UPDATE TABLE--------------------------------

    //1
    const {
      mutate: create1,
      onDone: onDone1,
      onError: onError1,
    } = useMutation(
      mutations.updateMajorInsuranceCompanyEmployeeAcquisitionData
    );
    onDone1(() => {
      notification("success", Message.getCommonMessage("106").message);
      emit("closeModal", true);
      if (!employeeRequestListTrigger.value) {
        employeeRequestListTrigger.value = true;
      }
    });
    onError1((e: any) => {
      notification("error", e.message);
    });
    //cancel 1
    const {
      mutate: cancel1,
      onDone: onDone12,
      onError: onError12,
    } = useMutation(mutations.cancelMajorInsuranceCompanyEmployeeAcquisition);
    onDone12(() => {
      notification("success", Message.getCommonMessage("106").message);
      emit("closeModal", true);
    });
    onError12((e: any) => {
      notification("error", e.message);
    });
    //update 2
    const {
      mutate: create2,
      onDone: onDone2,
      onError: onError2,
    } = useMutation(mutations.updateMajorInsuranceCompanyEmployeeLossData);
    onDone2(() => {
      notification("success", Message.getCommonMessage("106").message);
      emit("closeModal", true);
      if (!employeeRequestListTrigger.value) {
        employeeRequestListTrigger.value = true;
        employeeRequestListRefetch();
      }
    });
    onError2((e: any) => {
      notification("error", e.message);
    });
    //cancel 2
    const {
      mutate: cancel2,
      onDone: onDone22,
      onError: onError22,
    } = useMutation(mutations.cancelMajorInsuranceCompanyEmployeeLoss);
    onDone22(() => {
      notification("success", Message.getCommonMessage("106").message);
      emit("closeModal", true);
    });
    onError22((e: any) => {
      notification("error", e.message);
    });

    //update 2
    const {
      mutate: create3,
      onDone: onDone3,
      onError: onError3,
    } = useMutation(
      mutations.updateMajorInsuranceCompanyEmployeeSalaryChangeData
    );
    onDone3(() => {
      notification("success", Message.getCommonMessage("106").message);
      emit("closeModal", true);
      if (!employeeRequestListTrigger.value) {
        employeeRequestListTrigger.value = true;
        employeeRequestListRefetch();
      }
    });
    onError3((e: any) => {
      notification("error", e.message);
    });
    //cancel 3
    const {
      mutate: cancel3,
      onDone: onDone32,
      onError: onError32,
    } = useMutation(mutations.cancelMajorInsuranceCompanyEmployeeSalaryChange);
    onDone32(() => {
      notification("success", Message.getCommonMessage("106").message);
      emit("closeModal", true);
    });
    onError32((e: any) => {
      notification("error", e.message);
    });
    //update 4
    const {
      mutate: create4,
      onDone: onDone4,
      onError: onError4,
    } = useMutation(
      mutations.updateMajorInsuranceCompanyEmployeeLeaveOfAbsenceData
    );
    onDone4(() => {
      notification("success", Message.getCommonMessage("106").message);
      emit("closeModal", true);
    });
    onError4((e: any) => {
      if (!employeeRequestListTrigger.value) {
        employeeRequestListTrigger.value = true;
        employeeRequestListRefetch();
      }
      notification("error", e.message);
    });
    //cancel 4
    const {
      mutate: cancel4,
      onDone: onDone42,
      onError: onError42,
    } = useMutation(
      mutations.cancelMajorInsuranceCompanyEmployeeLeaveOfAbsence
    );
    onDone42(() => {
      notification("success", Message.getCommonMessage("106").message);
      emit("closeModal", true);
    });
    onError42((e: any) => {
      notification("error", e.message);
    });

    //update 5
    const {
      mutate: create5,
      onDone: onDone5,
      onError: onError5,
    } = useMutation(
      mutations.updateMajorInsuranceCompanyEmployeeReturnToWorkData
    );
    onDone5(() => {
      notification("success", Message.getCommonMessage("106").message);
      emit("closeModal", true);
      if (!employeeRequestListTrigger.value) {
        employeeRequestListTrigger.value = true;
        employeeRequestListRefetch();
      }
    });
    onError5((e: any) => {
      notification("error", e.message);
    });
    //cancel 5
    const {
      mutate: cancel5,
      onDone: onDone52,
      onError: onError52,
    } = useMutation(mutations.cancelMajorInsuranceCompanyEmployeeReturnToWork);
    onDone52(() => {
      notification("success", Message.getCommonMessage("106").message);
      emit("closeModal", true);
    });
    onError52((e: any) => {
      notification("error", e.message);
    });

    const onSave = () => {
      let formData: any[] = [];
      filterDsTab3Bf530.value.forEach((item: any) => {
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
          create1(item.field);
          if (item.field.data.workingStatus == 0) {
            cancel1(item.field.search);
          }
        }
        if (item.type == 2) {
          create2(item.field);
          if (item.field.data.workingStatus == 0) {
            cancel2(item.field.search);
          }
        }
        if (item.type == 3) {
          create3(item.field);
          if (item.field.data.workingStatus == 0) {
            cancel3(item.field.search);
          }
        }
        if (item.type == 4) {
          create4(item.field);
          if (item.field.data.workingStatus == 0) {
            cancel4(item.field.search);
          }
        }
        if (item.type == 5) {
          create5(item.field);
          if (item.field.data.workingStatus == 0) {
            cancel5(item.field.search);
          }
        }
      });
    };

    return {
      formState,
      rangeDate,
      move_column,
      colomn_resize,
      dataSource,
      viewUrlModal,
      selectionChanged,
      formatMonth,
      filterDsTab3Bf530,
      reportTypeSelectboxTab3,
      workingStatusSelectbox,
      EDIStatusSelectbox,
      states1,
      reportTypeSelectbox2,
      onGetAcquistionRp,
      onOpenLogs,
      modalHistory,
      onSave,
      tab3Bf520Ref,
      downModal1,
      downConfirm1,
      downModal2,
      dataType,
      paramValue,
      loading1,
      onDownLoad,
      downLoadParam,
      urlDownLoad,
      reportTypeTextTab3,
      dayjs,
      downConfirm2,
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
