<template>
  <div class="search-form">
    <a-row>
      <a-col :span="12">
        <a-row>
          <a-col :span="8">
            <a-form-item label="귀속연도">
              <year-picker-box-custom
                v-model:valueDate="filterForm.imputedYear"
                :minYear="2022"
                color="#a6a6a6"
              ></year-picker-box-custom>
            </a-form-item>
          </a-col>
          <a-col :span="16">
            <div class="custom-note">
              <a-form-item label="제작요청상태">
                <switch-basic
                  v-model:valueSwitch="filterForm.afterProduction"
                  :textCheck="'제작요청후'"
                  :textUnCheck="'제작요청전'"
                />
              </a-form-item>
              <a-tooltip color="black" placement="top">
                <template #title
                  >제작전은 제작요청되지 않은 상태입니다.</template
                >
                <img src="@/assets/images/iconInfo.png" class="img-info" />
              </a-tooltip>
            </div>
          </a-col>
        </a-row>
        <a-form-item label="제출대상구분">
          <div class="checkbox-tab-1">
            <span>연간(1.1~12.31)지급분</span>
            <div class="group-checkbox">
              <a-row :style="!filterForm.afterProduction ? 'opacity: 0.6' : ''">
                <a-col :span="12">
                  <div class="checkbox-item">
                    <checkbox-basic
                      v-model:valueCheckbox="checkbox1"
                      :disabled="!filterForm.afterProduction"
                      :size="'20'"
                    />
                    <production-status :typeTag="2" padding="0px 5px" />
                  </div>
                  <div class="checkbox-item">
                    <checkbox-basic
                      v-model:valueCheckbox="checkbox3"
                      :disabled="!filterForm.afterProduction"
                      :size="'20'"
                    />
                    <production-status :typeTag="4" padding="0px 5px" />
                  </div>
                </a-col>
                <a-col :span="12">
                  <div class="checkbox-item">
                    <checkbox-basic
                      v-model:valueCheckbox="checkbox2"
                      :disabled="!filterForm.afterProduction"
                      :size="'20'"
                    />
                    <production-status :typeTag="3" padding="0px 5px" />
                  </div>
                  <div class="checkbox-item">
                    <checkbox-basic
                      v-model:valueCheckbox="checkbox4"
                      :disabled="!filterForm.afterProduction"
                      :size="'20'"
                    />
                    <production-status :typeTag="5" padding="0px 5px" />
                  </div>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-row>
          <a-col :span="8">
            <a-form-item label="사업자코드">
              <default-text-box
                width="150px"
                v-model:valueInput="filterForm.companyCode"
                :textUppercase="true"
              />
            </a-form-item>
            <a-form-item label="상호">
              <default-text-box
                width="150px"
                v-model:valueInput="filterForm.companyName"
              ></default-text-box>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="매니저리스트">
              <list-manager-dropdown
                width="150px"
                v-model:valueInput="filterForm.manageUserId"
              />
            </a-form-item>
            <a-form-item label="영업자리스트">
              <list-sales-dropdown
                width="150px"
                v-model:valueInput="filterForm.salesRepresentativeId"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <div style="padding-left: 50px">
              <switch-basic
                :textCheck="'해지제외'"
                :textUnCheck="'해지포함'"
                v-model:valueSwitch="filterForm.excludeCancel"
              />
            </div>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
  <div class="grid-view">
    <div class="title-table d-flex">
      <a-form-item label="파일 제작 설정" label-align="left">
        <div class="custom-note d-flex-center">
          <switch-basic
            textCheck="세무대리인신고"
            textUnCheck="납세자자진신고"
            :disabled="true"
          />
          <a-tooltip color="black" placement="top">
            <template #title
              >본 설정으로 적용된 파일로 다운로드 및 메일발송 됩니다.</template
            >
            <img src="@/assets/images/iconInfo.png" class="img-info" />
          </a-tooltip>
        </div>
      </a-form-item>
      <a-form-item label="제출연월일" label-align="left">
        <div class="d-flex-center">
          <date-time-box width="150px" v-model:valueDate="dateSubmission" />
          <a-tooltip placement="topLeft" color="black">
            <template #title>전자신고파일 제작 요청</template>
            <div class="btn-modal-save" @click="requestIncomeFile">
              <SaveOutlined class="fz-20 ml-5 action-save" />
              <span style="margin-left: 5px">파일제작요청</span>
            </div>
          </a-tooltip>
        </div>
      </a-form-item>
    </div>
    <div class="content-grid">
      <a-spin
        :spinning="loadingIncomeWagePayment || loadingElectronicFilings"
        size="large"
      >
        <DxDataGrid
          id="DxDataGrid-bf-630-tab1"
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="dataSource"
          :show-borders="true"
          key-expr="companyId"
          class="mt-10"
          :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
          @selection-changed="selectionChanged"
          v-model:selected-row-keys="selectedRowKeys"
          noDataText="내역이 없습니다"
        >
          <DxPaging :enabled="false" />
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxSelection
            mode="multiple"
            :fixed="true"
            show-check-boxes-mode="onClick"
            :deferred="false"
          />
          <DxColumn caption="사업자코드" cell-template="companyCode" />
          <template #companyCode="{ data }">
            {{
              data.data.companyServiceContract.active
                ? data.data.company.code
                : "해지"
            }}
          </template>
          <DxColumn caption="상호 주소" cell-template="companyName" />
          <template #companyName="{ data }">
            {{ data.data.company.name }}
            {{ data.data.company.address }}
          </template>
          <DxColumn caption="사업자등록번호" cell-template="bizNumber" />
          <template #bizNumber="{ data }">
            {{ formatBizNumber(data.data.company.bizNumber) }}
          </template>
          <DxColumn
            caption="최종제작요청일시"
            data-field="lastProductionRequestedAt"
            data-type="date"
            format="yyyy-MM-dd HH:mm"
          />
          <DxColumn caption="제작현황" cell-template="imputed" width="430" />
          <template #imputed="{ data }">
            <GetStatusTable
              :beforeProductionRequest="!data.data.lastProductionRequestedAt"
              :data="data.data"
              tabName="tab1"
              @productionStatusData="(value: any) => productionStatusData(value, data.rowIndex)"
            />
          </template>

          <!-- <DxSummary>
            <DxTotalItem cssClass="bf-630-sumary" column="사업자코드" summary-type="count" display-format="전체: [{0}]" />
            <DxTotalItem cssClass="bf-630-sumary" column="제작현황" :customize-text="productStatusSummary" />
          </DxSummary> -->
        </DxDataGrid>
        <div class="DxDataGrid-bf-630-tab1-sumary">
          <div
            v-html="
              `전체: <span style='font-size: 16px'>[${dataSource.length}]</span>`
            "
          ></div>
          <div v-html="productStatusSummary()"></div>
        </div>
      </a-spin>
    </div>
  </div>
  <request-file-popup
    v-if="modalRequestFile"
    :modalStatus="modalRequestFile"
    @closePopup="modalRequestFile = false"
    :data="dataRequestFile"
    tabName="tab1"
    @onDoneRequest="doneRequestFile"
  ></request-file-popup>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import DxCheckBox from "devextreme-vue/check-box";
import { useQuery } from "@vue/apollo-composable";
import { useStore } from "vuex";
import {
  DxDataGrid,
  DxToolbar,
  DxSelection,
  DxColumn,
  DxItem,
  DxScrolling,
  DxSummary,
  DxTotalItem,
  DxPaging,
} from "devextreme-vue/data-grid";
import { SaveOutlined } from "@ant-design/icons-vue";
import DxButton from "devextreme-vue/button";
import queries from "@/graphql/queries/BF/BF6/BF630/index";
import { companyId } from "@/helpers/commonFunction";
import notification from "@/utils/notification";
import dayjs, { Dayjs } from "dayjs";
import RequestFilePopup from "./RequestFilePopup.vue";
import GetStatusTable from "./GetStatusTable.vue";
import { Message } from "@/configs/enum";
export default defineComponent({
  components: {
    DxCheckBox,
    SaveOutlined,
    DxButton,
    DxDataGrid,
    DxToolbar,
    DxSelection,
    DxColumn,
    DxItem,
    DxScrolling,
    DxSummary,
    DxTotalItem,
    RequestFilePopup,
    GetStatusTable,
    DxPaging,
  },
  props: {
    activeSearch: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const userInfor = computed(() => store.state.auth.userInfor);
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const trigger = ref<boolean>(true);
    const triggerElecFilings = ref<boolean>(false);
    const dateSubmission = ref(new Date().getFullYear() + 1 + "0310");
    // for checkbox
    const checkbox1 = ref<boolean>(false);
    const checkbox2 = ref<boolean>(false);
    const checkbox3 = ref<boolean>(false);
    const checkbox4 = ref<boolean>(false);
    let modalRequestFile = ref<boolean>(false);
    let companyIds = Array();
    const dataRequestFile = ref();
    const filterForm = reactive({
      afterProduction: true,
      productionStatuses: Array(),
      companyCode: "",
      companyName: "",
      manageUserId: null,
      salesRepresentativeId: null,
      excludeCancel: true,
      imputedYear: dayjs().year(),
    });
    const dataSource = ref<any>([]);
    const dataSourceOrigin = ref<any>([]);
    let productionStatusArr = ref<any>([]);
    let countListData = ref(0);
    let payloadIncomeBusinessPayment = {
      imputedYear: filterForm.imputedYear,
    };
    let isFirstSearchByfilter = ref(false);
    let selectedRowKeys = ref<any>([]);

    // ============ GRAPQL ===============================
    const {
      result: resIncomeWagePayment,
      onResult: onResIncomeWagePayment,
      loading: loadingIncomeWagePayment,
      onError: onErrorIncomeWagePayment,
    } = useQuery(
      queries.searchIncomeWagePaymentStatementElectronicFilingsByYear,
      payloadIncomeBusinessPayment,
      () => ({
        enabled: trigger.value,
        fetchPolicy: "no-cache",
      })
    );

    const {
      result: resElectronicFilings,
      loading: loadingElectronicFilings,
      refetch: refetchElectronicFilings,
      onError: onErrorElectronicFilings,
    } = useQuery(
      queries.getElectronicFilingsByIncomeWagePaymentStatement,
      {
        input: {
          companyId: companyId,
          imputedYear: filterForm.imputedYear,
        },
      },
      () => ({
        enabled: triggerElecFilings.value,
        fetchPolicy: "no-cache",
      })
    );
    // ===================DONE GRAPQL==================================
    // watch result  api searchIncomeWagePaymentStatementElectronicFilingsByYear
    watch(resIncomeWagePayment, (value: any) => {
      productionStatusArr.value = [];
      if (value) {
        let data =
          value.searchIncomeWagePaymentStatementElectronicFilingsByYear;
        let result = Object.values(
          data.reduce((acc: any, curr: any) => {
            if (
              !acc[curr.companyId] ||
              dayjs(curr.lastProductionRequestedAt).isBefore(
                dayjs(acc[curr.companyId].lastProductionRequestedAt)
              )
            ) {
              acc[curr.companyId] = curr;
            }
            return acc;
          }, {})
        );
        dataSource.value = result.map((items: any) => {
          if (!!items.lastProductionRequestedAt) {
            items.afterProduction = false;
          } else {
            items.afterProduction = true;
          }
          return items;
        });
        dataSourceOrigin.value = result.map((items: any) => {
          if (!!items.lastProductionRequestedAt) {
            items.afterProduction = true;
          } else {
            items.afterProduction = false;
          }
          return items;
        });
        isFirstSearchByfilter.value = result.some(
          (item: any) => !!item.lastProductionRequestedAt
        );
        if (!isFirstSearchByfilter.value) {
          searchByFilter();
        }
        countListData.value = 0;
      }
      trigger.value = false;
    });
    onErrorIncomeWagePayment((e) => {
      //notification('error', e.message)
    });

    // watch result  api getElectronicFilingsByIncomeWagePaymentStatement
    watch(
      () => resElectronicFilings,
      (value) => {
        if (value) {
        }
      }
    );
    onErrorElectronicFilings((e) => {
      //notification('error', e.message)
    });

    // watch checkbox change
    watch(
      () => checkbox1.value,
      (value) => {
        if (value) {
          filterForm.productionStatuses.push(0);
        } else {
          filterForm.productionStatuses = filterForm.productionStatuses.filter(
            function (item) {
              return item !== 0;
            }
          );
        }
        if (
          !checkbox1.value &&
          !checkbox2.value &&
          !checkbox3.value &&
          !checkbox4.value
        ) {
          filterForm.afterProduction = false;
        }
      }
    );
    watch(
      () => checkbox2.value,
      (value) => {
        if (value) {
          filterForm.productionStatuses.push(1);
        } else {
          filterForm.productionStatuses = filterForm.productionStatuses.filter(
            function (item) {
              return item !== 1;
            }
          );
        }
        if (
          !checkbox1.value &&
          !checkbox2.value &&
          !checkbox3.value &&
          !checkbox4.value
        ) {
          filterForm.afterProduction = false;
        }
      }
    );
    watch(
      () => checkbox3.value,
      (value) => {
        if (value) {
          filterForm.productionStatuses.push(2);
        } else {
          filterForm.productionStatuses = filterForm.productionStatuses.filter(
            function (item) {
              return item !== 2;
            }
          );
        }
        if (
          !checkbox1.value &&
          !checkbox2.value &&
          !checkbox3.value &&
          !checkbox4.value
        ) {
          filterForm.afterProduction = false;
        }
      }
    );
    watch(
      () => checkbox4.value,
      (value) => {
        if (value) {
          filterForm.productionStatuses.push(-1);
        } else {
          filterForm.productionStatuses = filterForm.productionStatuses.filter(
            function (item) {
              return item !== -1;
            }
          );
        }
        if (
          !checkbox1.value &&
          !checkbox2.value &&
          !checkbox3.value &&
          !checkbox4.value
        ) {
          filterForm.afterProduction = false;
        }
      }
    );

    // watch active searching
    watch(
      () => filterForm.imputedYear,
      (value) => {
        payloadIncomeBusinessPayment.imputedYear = value;
        trigger.value = true;
      }
    );
    watch(
      () => props.activeSearch,
      (value) => {
        searchByFilter();
      }
    );
    watch(
      () => filterForm.afterProduction,
      (value) => {
        checkbox1.value = value;
        checkbox2.value = value;
        checkbox3.value = value;
        checkbox4.value = value;
      },
      {
        immediate: true,
      }
    );
    // ----------------request file---------

    const selectionChanged = (event: any) => {
      const listItemStatus2: any = [];
      dataSource.value.forEach((items: any) => {
        if (items.productionStatus == 2) {
          listItemStatus2.push(items.companyId);
        }
      });
      const indexItemStatus2 = selectedRowKeys.value.findIndex((items: any) =>
        listItemStatus2.includes(items)
      );
      if (indexItemStatus2 >= 0) {
        selectedRowKeys.value.splice(indexItemStatus2, 1);
      }
      companyIds = selectedRowKeys.value;
    };

    const messageDelNoItem = Message.getMessage("COMMON", "404").message;
    // request file popup action
    const requestIncomeFile = () => {
      if (companyIds.length) {
        dataRequestFile.value = {
          companyIds: companyIds,
          filter: { imputedYear: filterForm.imputedYear },
          emailInput: {
            receiverName: userInfor.value.name,
            receiverAddress: userInfor.value.email,
          },
        };
        modalRequestFile.value = true;
      } else {
        notification("warning", messageDelNoItem);
      }
    };

    const countStatus = (arr: any[], type: number, propertyCompare: string) => {
      if (Object.keys(arr).length === 0 || arr.length === 0) {
        return 0;
      }
      let count = arr.reduce((acc: any, crr: any) => {
        acc[crr[propertyCompare]] = acc[crr[propertyCompare]]
          ? acc[crr[propertyCompare]] + 1
          : 1;
        return acc;
      }, {});
      if (count[type]) {
        return count[type];
      }
      return 0;
    };
    const productStatusSummary = () => {
      let totalBeforeProduction = 0;
      dataSource.value.forEach((items: any) => {
        if (!items?.afterProduction) {
          totalBeforeProduction++;
        }
      });
      return `제작요청전 <span style="font-size: 16px">[${totalBeforeProduction}]</span>
              제작대기 <span style="font-size: 16px">[${countStatus(
                productionStatusArr.value,
                0,
                "productionStatus"
              )}]</span> 
              제작중 <span style="font-size: 16px">[${countStatus(
                productionStatusArr.value,
                1,
                "productionStatus"
              )}]</span> 
              제작실패 <span style="font-size: 16px">[${countStatus(
                productionStatusArr.value,
                -1,
                "productionStatus"
              )}]</span> 
              제작성공 <span style="font-size: 16px">[${countStatus(
                productionStatusArr.value,
                2,
                "productionStatus"
              )}]</span>`;
    };
    const productionStatusData = (emitVal: any, index: number) => {
      countListData.value++;
      const lengthDataSourceAfterProduction = dataSource.value.filter(
        (x: any) => !!x.lastProductionRequestedAt
      ).length;
      if (countListData.value > lengthDataSourceAfterProduction) return;
      if (emitVal !== null) {
        productionStatusArr.value = [...productionStatusArr.value, emitVal];
        dataSource.value[index].productionStatus = emitVal.productionStatus;
        dataSource.value[index].afterProduction = true;
        dataSourceOrigin.value[index].productionStatus =
          emitVal.productionStatus;
        dataSourceOrigin.value[index].afterProduction = true;
      }
      if (countListData.value == lengthDataSourceAfterProduction) {
        if (isFirstSearchByfilter.value) {
          isFirstSearchByfilter.value = false;
          searchByFilter();
        }
      }
    };

    const searchByFilter = async () => {
      dataSource.value = dataSourceOrigin.value.filter((items: any) => {
        return (
          checkProductionStatuses(
            items.afterProduction,
            Number.isInteger(items.productionStatus)
              ? items.productionStatus
              : null
          ) &&
          checkKeyFilter(
            filterForm.companyCode,
            items.company.code,
            "includes"
          ) &&
          checkKeyFilter(
            filterForm.companyName,
            items.company.name,
            "includes"
          ) &&
          checkKeyFilter(
            filterForm.manageUserId,
            items.companyServiceContract.manageUserId,
            "equal"
          ) &&
          checkKeyFilter(
            filterForm.salesRepresentativeId,
            items.companyServiceContract.salesRepresentativeId,
            "equal"
          ) &&
          (!filterForm.excludeCancel ||
            filterForm.excludeCancel === items.companyServiceContract.active)
        );
      });
      productionStatusArr.value = [];
      dataSource.value.forEach((item: any) => {
        if (Number.isInteger(item?.productionStatus)) {
          productionStatusArr.value.push({
            productionStatus: item.productionStatus,
          });
        }
      });
    };
    const checkKeyFilter = (
      valueFilters: any,
      valueItems: any,
      type: string
    ) => {
      if (!valueFilters) {
        return true;
      } else {
        if (type === "includes") {
          const valueItem = valueItems.toString().toLowerCase();
          const valueFilter = valueFilters.toString().toLowerCase().trim();
          if (valueItem.includes(valueFilter)) {
            return true;
          } else {
            return false;
          }
        } else {
          if (valueFilters === valueItems) {
            return true;
          } else {
            return false;
          }
        }
      }
    };

    const checkProductionStatuses = (
      afterProduction: boolean,
      productionStatus?: number | null
    ) => {
      if (filterForm.afterProduction) {
        if (filterForm.afterProduction === afterProduction) {
          if (filterForm.productionStatuses.includes(productionStatus)) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        if (filterForm.afterProduction === afterProduction) {
          return true;
        } else {
          return false;
        }
      }
    };

    const formatBizNumber = (value: any) => {
      const bizNumber = value.toString();
      return `${bizNumber.slice(0, 3)}-${bizNumber.slice(
        3,
        5
      )}-${bizNumber.slice(5)}`;
    };

    const doneRequestFile = () => {
      modalRequestFile.value = false;
      trigger.value = true;
      searchByFilter();
    };
    return {
      filterForm,
      move_column,
      colomn_resize,
      dataSource,
      checkbox1,
      checkbox2,
      checkbox3,
      checkbox4,
      loadingElectronicFilings,
      loadingIncomeWagePayment,
      trigger,
      userInfor,
      requestIncomeFile,
      modalRequestFile,
      dataRequestFile,
      dateSubmission,
      productStatusSummary,
      productionStatusData,
      selectionChanged,
      selectedRowKeys,
      formatBizNumber,
      doneRequestFile,
    };
  },
});
</script>
<style scoped lang="scss" src="../style/styleTabs.scss"></style>
<style scoped lang="scss">
.DxDataGrid-bf-630-tab1-sumary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  border: 1px solid #ddd;
  border-top: none;
  padding: 7px;
  padding-left: 80px;
  color: rgba(51, 51, 51, 0.7);
}

:deep(.ant-form-item-label > label) {
  width: 110px;
  padding-left: 10px;
}
</style>
