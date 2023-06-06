<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <a-spin :spinning="loading" size="large">
    <action-header title="계약정보관리&심사" @actionSearch="actionSearch ? searching($event) : changePage($event)"
      :buttonSearch="true" />
    <div id="bf-310">
      <div class="search-form">
        <a-row :gutter="[24, 8]">
          <a-col>
            <label class="lable-item">서비스종류 :</label>
            <checkbox-basic v-model:valueCheckbox="listCheckBox.accounting" :disabled="false" :size="'14'" label="회계"
              style="margin-right: 10px" />
            <checkbox-basic v-model:valueCheckbox="listCheckBox.withholding" :disabled="false" :size="'14'" label="원천" />
          </a-col>
          <a-col>
            <div class="dflex custom-flex">
              <label class="lable-item">심사상태/결과 :</label>
              <SelectCustomField v-model:valueInput="statuses" :dataSource="subReqStatus" width="150px" :isShowId="false"/>
            </div>
          </a-col>
          <a-col>
            <div class="dflex custom-flex">
              <label class="lable-item">영업자 :</label>
              <list-sales-dropdown width="150px" v-model:valueInput="originData.salesRepresentativeId" />
            </div>
          </a-col>

          <a-col>
            <div class="dflex custom-flex">
              <label class="lable-item">상호 :</label>
              <default-text-box width="150px" v-model:valueInput="originData.companyName" />
            </div>
          </a-col>

          <a-col>
            <div class="dflex custom-flex">
              <label class="lable-item">대표자 :</label>
              <default-text-box width="150px" v-model:valueInput="originData.presidentName" />
            </div>
          </a-col>
          <a-col>
            <div class="dflex custom-flex">
              <label class="lable-item">신청기간 :</label>
              <range-date-time-box v-model:valueDate="rangeDate" width="250px" :multi-calendars="true"
                :placeholder="'시작 날짜 - 종료 날짜'" :clearable="false" :maxRange="365"/>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="page-content">
        <DxDataGrid id="table-main-bf310" noDataText="내역이 없습니다" :show-row-lines="true" :hoverStateEnabled="true"
          :data-source="dataSource" :show-borders="true" key-expr="id" @exporting="onExporting"
          :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize" :column-auto-width="true">
          <DxPaging :enabled="false" />
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
          <DxExport :enabled="true" />
          <DxToolbar>
            <DxItem name="exportButton" css-class="cell-button-export" />
            <DxItem name="page" template="pagination-table" location="after" />
            <DxItem name="searchPanel" />
          </DxToolbar>
          <template #pagination-table>
            <div v-if="rowTable > originData.rows">
              <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows" :total="rowTable"
                show-less-items @change="changePage" />
            </div>
          </template>

          <DxColumn data-field="createdAt" caption="신청일자" cell-template="createdat-cell" data-type="date" />
          <template #createdat-cell="{ data }">
            {{ $filters.formatDate(data.value) }}
          </template>
          <DxColumn data-field="code" caption="신청코드" />
          <DxColumn data-field="status" caption="심사상태" cell-template="grid-cell" css-class="cell-center" />
          <template #grid-cell="{ data }">
            <a-tag style="width: 55px" :color="getColorTag(data.value)?.name">{{
              getColorTag(data.value)?.tag_name
            }}</a-tag>
          </template>
          <DxColumn data-field="companyCode" caption="사업자코드" css-class="cell-center" cell-template="companyCode" />
          <template #companyCode="{data}">
            <div class="ant-tag-green" style="background-color: #ffffff;">{{ data.data.companyCode }}</div>
          </template>
          <DxColumn data-field="companyName" caption="상호" />
          <DxColumn data-field="companyAddress" caption="주소" />
          <DxColumn data-field="presidentName" caption="대표자" />
          <DxColumn data-field="compactSalesRepresentative.name" caption="영업자" />
          <DxColumn caption="신청서비스" cell-template="acc-service" />
          <template #acc-service="{ data }">
            <div style="display: flex; align-items: center;">
              <div style="width: 45px;">
                <a-popover v-if="data.data.simpleAccountingInfos">
                  <template #content>
                    <div v-for="item in data.data.simpleAccountingInfos" :key="item">
                      <div>
                        {{ item.name }}:
                        {{
                          item.startYearMonth.toString().slice(0, 4) +
                          "-" +
                          item.startYearMonth.toString().slice(4, 6)
                        }}
                      </div>
                    </div>
                  </template>
                  <a-tag>회계</a-tag>
                </a-popover>
              </div>
              <div style="width: 28px;">
                <a-tag style="border-radius: 50%"
                  v-if="data.data.simpleAccountingInfos && data.data.simpleAccountingInfos">{{
                    data.data.simpleAccountingInfos.length }}
                </a-tag>
              </div>
              <a-popover v-if="data.data.simpleWithholdingInfo">
                <template #content>
                  <div>
                    {{
                      data.data.simpleWithholdingInfo.name
                      ? data.data.simpleWithholdingInfo.name + ":"
                      : ""
                    }}
                    {{
                      data.data.simpleWithholdingInfo.startYearMonth
                        .toString()
                        .slice(0, 4) +
                      "-" +
                      data.data.simpleWithholdingInfo.startYearMonth
                        .toString()
                        .slice(4, 6)
                    }}
                  </div>
                </template>
                <a-tag color="black">원천</a-tag>
              </a-popover>
            </div>
          </template>
          <DxColumn :width="120" cell-template="pupop" type="buttons" />
          <template #pupop="{ data }">
            <div class="custom-action">
              <a-space :size="10">
                <a-tooltip placement="top" color="black">
                  <template #title>편집</template>
                  <EditOutlined @click="setModalVisible(data)" />
                </a-tooltip>
                <a-tooltip placement="top" color="black">
                  <template #title>변경이력</template>
                  <HistoryOutlined @click="modalHistory(data)" />
                </a-tooltip>
                <a-tooltip placement="top" color="black">
                  <template #title>사용자권한</template>
                  <div @mouseenter="data.data.isHover=false" @mouseleave="data.data.isHover=true" style="height: 17px; min-width: 17px;" 
                    @click="onEnterUser(data.data)"
                  >
                    <img v-if="data.data.isHover" class="permission-img" src="@/assets/images/add-permission.png"/>
                    <img v-else class="permission-img permission-img-hover" src="@/assets/images/add-permission-hover.png"/>
                  </div>
                </a-tooltip>
              </a-space>
            </div>
          </template>
        </DxDataGrid>
        <div class="pagination-table" v-if="rowTable > originData.rows">
          <a-pagination v-model:current="originData.page" v-model:page-size="originData.rows" :total="rowTable"
            show-less-items @change="changePage" />
        </div>
        <BF310Popup :modalStatus="modalStatus" @closePopup="modalStatus = false" @onUpdate="onDoneUpdate"
          :data="idSubRequest" :key="keyRefreshPopup310" />
        <HistoryPopup :modalStatus="modalHistoryStatus" @closePopup="modalHistoryStatus = false" :data="popupData"
          title="변경이력" :idRowEdit="idSubRequest" typeHistory="bf-310" />
        <EnterCusAccModal v-if="isCustomerModal" :companyInfo="companyInfo" @closeModal="onHandleCusAcc"/>
      </div>
    </div>
  </a-spin>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch, computed } from "vue";
import { useStore } from "vuex";
import { useMutation, useQuery } from "@vue/apollo-composable";
import dayjs from "dayjs";
import { EditOutlined, HistoryOutlined } from "@ant-design/icons-vue";
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxExport,
  DxSearchPanel,
  DxToolbar,
  DxItem,
  DxScrolling,
} from "devextreme-vue/data-grid";
import BF310Popup from "./components/BF310Popup.vue";
import queries from "@/graphql/queries/BF/BF3/BF310/index";
import mutations from "@/graphql/mutations/AddToken/index";
import { dataSearchIndex } from "./utils/index";
import { onExportingCommon, makeDataClean } from "@/helpers/commonFunction";
import {
    SubscriptionRequestStatus,
    enum2Entries,
} from "@bankda/jangbuda-common";

export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxExport,
    DxScrolling,
    DxSearchPanel,
    BF310Popup,
    EditOutlined,
    DxToolbar,
    DxItem,
    HistoryOutlined,
  },
  setup() {
    const store = useStore();
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const rangeDate = ref([
      parseInt(dayjs().subtract(1, "year").format("YYYYMMDD")),
      parseInt(dayjs().format("YYYYMMDD")),
    ]);
    const dataSource = ref([]);
    const modalStatus = ref(false);
    const idSubRequest = ref();
    const statuses: any = ref([]);
    const trigger = ref<boolean>(true);
    const rowTable = ref();
    let modalHistoryStatus = ref<boolean>(false);
    let popupData = ref([]);
    const actionSearch: any = ref<boolean>(true);
    const keyRefreshPopup310 = ref(0);
    const listCheckBox = ref({
      accounting: true,
      withholding: true,
    });
    const originData = reactive({
      ...dataSearchIndex,
      rows: 1000,
      startDate: rangeDate.value[0],
      finishDate: rangeDate.value[1],
    });
    const subReqStatus: any = computed(() => {
            let slGrade: any = enum2Entries(SubscriptionRequestStatus).map(
                (value) => ({
                    id: value[1],
                    name: value[0],
                })
            );
            // slGrade.unshift({ value: null, label: "전체" });
            return slGrade;
        });

    watch(
      () => listCheckBox.value,
      (value) => {
        originData.useServiceTypes = [];
        if (value.accounting) {
          originData.useServiceTypes.push(1);
        }
        if (value.withholding) {
          originData.useServiceTypes.push(2);
        }
      },
      {
        deep: true,
      }
    );

    const setModalVisible = (data: any) => {
      idSubRequest.value = data.data.id;
      modalStatus.value = true;
      popupData.value = data;
    };
    const {
      refetch: refetchData,
      loading,
      error,
      result,
      onError,
    } = useQuery(
      queries.searchSubscriptionRequests,
      { filter: originData },
      () => ({
        enabled: trigger.value,
        fetchPolicy: "no-cache",
      })
    );
    onError((error) => {
      //notification('error', error.message)
    });
    const onExporting = (e: { component: any; cancel: boolean }) => {
      onExportingCommon(e.component, e.cancel, "계약정보관리&심사");
    };
    const modalHistory = (data: any) => {
      idSubRequest.value = data.data.id;
      modalHistoryStatus.value = true;
      popupData.value = data;
    };
    const getColorTag = (data: any) => {
      if (data == 10) {
        return { name: "red", tag_name: "신청" };
      } else if (data == 20) {
        return { name: "blue", tag_name: "심사중" };
      } else if (data == 30) {
        return { name: "green", tag_name: "승인" };
      } else if (data == 99) {
        return { name: "grey", tag_name: "반려" };
      }
    };
    const searching = (e: any) => {
      originData.page = 1;
      originData.startDate = rangeDate.value[0];
      originData.finishDate = rangeDate.value[1];
      originData.statuses =
        statuses.value == 0 ? [10, 20, 30, 99] : statuses.value;
      makeDataClean(originData);
      trigger.value = true;
      actionSearch.value = false;
    };
    const changePage = (e: any) => {
      actionSearch.value = true;
      originData.startDate = rangeDate.value[0];
      originData.finishDate = rangeDate.value[1];
      originData.statuses =
        statuses.value == 0 ? [10, 20, 30, 99] : statuses.value;
      makeDataClean(originData);
      trigger.value = true;
    };
    watch(result, (value) => {
      trigger.value = false;
      if (value) {
        rowTable.value = value.searchSubscriptionRequests.totalCount;
        dataSource.value = value.searchSubscriptionRequests.datas.map((item: any)=>({...item, isHover: true}));
      }
    });
    // Get api when page is changed
    const onChangePage = (page: any, pageSize: any) => {
      originData.page = page;
      makeDataClean(originData);
      trigger.value = true;
    };

    const onDoneUpdate = () => {
      setTimeout(() => {
        keyRefreshPopup310.value++
        trigger.value = true;
      }, 500);
    };


    
    const companyInfo = reactive({
      code: NaN,
      name: '',
      companyId: NaN,
    })
    const userToken = ref();
    function cloneWebsite() {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      const windowFeatures = `width=${width},height=${height},fullscreen=yes`;
      const currentUrl = window.location.origin.replace(/\/$/, '');
      if(userToken.value){
        window.open(`${currentUrl}/dashboard?token=${userToken.value.accessToken}`, '_blank', windowFeatures);
      }
    }
    const {mutate, onDone, onError: customerLoginError } = useMutation(mutations.customerWorkLogin);
    const isCustomerModal = ref(false);
    const onEnterUser = (data: any) => {
      companyInfo.code = data.code;
      companyInfo.name = data.companyName;
      companyInfo.companyId = data.id;
      isCustomerModal.value = true;
    }
    const onHandleCusAcc = (emitVal: boolean) => {
      isCustomerModal.value = false;
      if(emitVal){
        mutate({companyId:companyInfo.companyId})
      }else{

      }
    }
    onDone((result: any) => {
      userToken.value = result.data.customerWorkLogin;
      cloneWebsite();
    })
    return {
      loading,
      move_column,
      colomn_resize,
      modalHistoryStatus,
      modalHistory,
      rangeDate,
      idSubRequest,
      dataSource,
      modalStatus,
      popupData,
      rowTable,
      setModalVisible,
      originData,
      statuses,
      searching,
      changePage,
      getColorTag,
      onExporting,
      actionSearch,
      onChangePage,
      dayjs,
      trigger,
      onDoneUpdate,
      listCheckBox,
      keyRefreshPopup310,
      onHandleCusAcc, isCustomerModal,companyInfo,onEnterUser,
      subReqStatus,
    };
  },
});
</script>

<style lang="scss" scoped src="./style/style.scss" />
