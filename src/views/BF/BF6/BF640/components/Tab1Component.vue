<template>
  <div id="step1">
    <!-- {{ dataSearch }} <br />
    {{ beforeCount }} <br /> -->
    <a-row gutter="24" class="search-form-step-1">
      <a-col>
        <a-form-item label="지급연도" label-align="left">
          <year-picker-box-custom v-model:valueDate="dataSearch.paymentYear" width="65px" class="mr-5" text="지" />
        </a-form-item>
        <a-form-item label="제출대상구분" label-align="left">
          <radio-group :arrayValue="checkBoxSearch" layoutCustom="horizontal"
            v-model:valueRadioCheck="dataSearch.paymentHalfYear" />
        </a-form-item>
      </a-col>
      <a-col class="ml-30">
        <a-form-item label="제작요청상태" label-align="left">
          <div class="custom-note d-flex-center">
            <switch-basic v-model:valueSwitch="setBefore" textCheck="제작요청후" textUnCheck="제작요청전" />
            <div class="d-flex-center ml-5 ">
              <img src="@/assets/images/iconInfo.png" style="width: 14px;" />
              <span>제작전은 제작요청되지 않은 상태입니다.</span>
            </div>
          </div>
        </a-form-item>
        <div class="mt-5 production-check">
          <CheckboxGroup :disabled="dataSearch.beforeProduction" :options="productionStatusesCheckbox"
            v-model:valueCheckbox="dataSearch.productionStatuses" size="18"> </CheckboxGroup>
        </div>
      </a-col>
      <a-col class="search-company">
        <a-form-item label="사업자코드" label-align="left" class="fix-width-label">
          <default-text-box v-model:valueInput="dataSearch.companyCode" />
        </a-form-item>
        <a-form-item label="상호" label-align="left" class="fix-width-label">
          <default-text-box v-model:valueInput="dataSearch.companyName" />
        </a-form-item>
        <a-form-item label="매니저리스트" label-align="left" class="fix-width-label">
          <list-manager-dropdown v-model:valueInput="dataSearch.manageUserId" />
        </a-form-item>
        <a-form-item label="영업자리스트" label-align="left" class="fix-width-label">
          <list-sales-dropdown v-model:valueInput="dataSearch.salesRepresentativeId" />
        </a-form-item>
      </a-col>
      <a-col class="search-4">
        <switch-basic textCheck="해지제외" textUnCheck="해지포함" v-model:valueSwitch="dataSearch.active" />
      </a-col>
    </a-row>
    <div class="title-table d-flex">
      <a-form-item label="파일 제작 설정" label-align="left">
        <div class="custom-note d-flex-center">
          <switch-basic v-model:valueSwitch="valueDefaultSwitch" textCheck="세무대리인신고" textUnCheck="납세자자진신고"
            :disabled="true" />
          <span class="d-flex-center">
            <img src="@/assets/images/iconInfo.png" style="width: 16px;" />
            <span class="pl-5">본 설정으로 적용된 파일로 다운로드 및 메일발송 됩니다.</span>
          </span>
        </div>
      </a-form-item>
      <a-form-item label="제출연월일" label-align="left">
        <div class="d-flex-center">
          <date-time-box width="150px" v-model:valueDate="dayReport" />
          <a-tooltip placement="topLeft" color="black">
            <template #title>전자신고파일 제작 요청</template>
            <div class="btn-modal-save" @click="onRequestFile">
              <SaveOutlined class="fz-20 ml-5 action-save" />
              <span style="margin-left: 5px;">파일제작요청</span>
            </div>
          </a-tooltip>
        </div>
      </a-form-item>
    </div>
    <div class="form-table">
      <a-spin :spinning="loadingTable">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="filteredDataSource"
          :show-borders="true" key-expr="companyId" class="mt-10" :allow-column-reordering="move_column"
          :allow-column-resizing="colomn_resize" :column-auto-width="true" @selection-changed="selectionChanged"
          id="tab1-bf640">
          <DxLoadPanel :enabled="true" :showPane="true" />
          <DxSelection mode="multiple" :fixed="true" />
          <DxColumn caption="사업자코드" data-field="code" cell-template="company-code" />
          <template #company-code="{ data }: any">
            {{ data.data.companyCode }}
            {{ data.data.active ? '' : '해지' }}
          </template>
          <DxColumn caption="상호 주소" cell-template="상호" />
          <template #상호=" { data }: any ">
            {{ data.data.companyName }} -
            {{ data.data.address }}
          </template>
          <DxColumn caption="사업자등록번호" cell-template="bizNumber" />
          <template #bizNumber=" { data }: any ">
            <span>
              {{
              data.data.bizNumber.toString().slice(0, 3)
              }}-{{
              data.data.bizNumber.toString().slice(3, 5)
              }}-{{
              data.data.bizNumber.toString().slice(5, 10)
              }}
            </span>
          </template>
          <DxColumn caption="최종제작요청일시" data-field="lastProductionRequestedAt" data-type="date"
            format="yyyy-MM-dd HH:mm" />
          <DxColumn caption="제작현황" cell-template="제작현황" width="360" />
          <template #제작현황=" { data }: any ">
            <GetStatusTable :dataProcduct=" data.data " :message=" data.data.causeOfProductionFailure " />
          </template>
          <DxSummary>
            <DxTotalItem column="사업자코드" summary-type="count" display-format="전체: {0}" />
            <DxTotalItem cssClass="custom-sumary" column="제작현황" :customize-text=" productStatusSummary " />
          </DxSummary>
        </DxDataGrid>
      </a-spin>
    </div>
    <RequestFilePopup v-if=" modalStatus " :requestFileData=" requestFileData " tab-name="tab1"
      @cancel=" onRequestDone " />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch, reactive } from "vue";
import { checkBoxSearchStep1, dataSearchUtils, productionStatusesCheckbox } from "../utils";
import { SaveOutlined } from "@ant-design/icons-vue";
import { useStore } from 'vuex'
import { DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling, DxSummary, DxTotalItem } from "devextreme-vue/data-grid";
import RequestFilePopup from "./RequestFilePopup.vue";
import GetStatusTable from "./GetStatusTable.vue";

import queries from "@/graphql/queries/BF/BF6/BF640/index";
import { useQuery, useMutation, useApolloClient } from "@vue/apollo-composable";
import notification from "@/utils/notification"
import dayjs from 'dayjs';
import { Message } from '@/configs/enum';
import CheckboxGroup from './CheckboxGroup.vue';
import { watchEffect } from "vue";
import { isNumber } from "lodash";
import { DxLoadPanel } from "devextreme-vue";
export default defineComponent({
  components: {
    SaveOutlined,
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
    CheckboxGroup,
    DxLoadPanel
},
  props: {
    search: {
      type: Number,
    },
    onSearch: {
      type: Function,
      default: () => { },
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const userInfor = computed(() => (store.state.auth.userInfor))
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const globalYear: any = +dayjs().format('YYYY');
    const dayReport = ref(`${globalYear.value}0802`);
    let checkBoxSearch = [...checkBoxSearchStep1]
    let valueDefaultCheckbox = ref(1)
    let valueDefaultSwitch = ref(true)
    let beforeProduction = ref(true)
    let dataSearch: any = ref({ ...dataSearchUtils })
    let defaultDataSource: any = ref([])
    const messageDelNoItem = Message.getMessage('COMMON', '404').message;

    // --------------------search production status-----------------------------------------

    const { client } = useApolloClient();
    const fetchDataStatus = async (companies: any) => {
      if (companies.length === 0) return;
      for (let i = 0; i < companies.length; i++) {
        if (companies[i]) {
          await client.query({
            query: queries.getElectronicFilingsByIncomeWageSimplifiedPaymentStatement, variables: {
              input: {
                companyId: companies[i].companyId,
                paymentYear: companies[i].paymentYear,
                paymentHalfYear: companies[i].paymentHalfYear,
              }
            }
          }).then((res) => {
            let productionStatus = res.data.getElectronicFilingsByIncomeWageSimplifiedPaymentStatement[0].productionStatus;
            let causeOfProductionFailure = res.data.getElectronicFilingsByIncomeWageSimplifiedPaymentStatement[0]?.causeOfProductionFailure;
            productionCount.value--;
            dataSource.value.forEach((item: any) => {
              if (item.companyId == companies[i].companyId) {
                item.productionStatus = productionStatus;
                if (productionStatus == -1) {
                  item.causeOfProductionFailure = causeOfProductionFailure;
                }
                if (productionStatus == 2) {
                  item.allowSelection = false;
                }
              }
            })
          }).catch((err: any) => err);
        }
      }
    };

    //  QUERY : searchIncomeWageSimplifiedPaymentStatementElectronicFilingsByHalfYear

    const dataSource = ref<any[]>([]);
    const filteredDataSource = ref<any[]>([]);
    let searchIncomeWageParam = ref({
      paymentYear: dataSearch.value.paymentYear,
      paymentHalfYear: dataSearch.value.paymentHalfYear
    })
    let {
      refetch: refetchTable,
      loading: loadingTable,
      onError: errorTable,
      result
    } = useQuery(queries.searchIncomeWageSimplifiedPaymentStatementElectronicFilingsByHalfYear, searchIncomeWageParam, () => ({
      fetchPolicy: "no-cache"
    }));
    const productionCount = ref(0);
    const beforeCount = ref(0);
    watch(result, async (newVal: any) => {
      if (newVal) {
        let data = newVal.searchIncomeWageSimplifiedPaymentStatementElectronicFilingsByHalfYear.map((item: any) => {
          let arrData = {};
          if (item) {
            arrData = {
              companyCode: item.company.code,
              companyName: item.company.name,
              address: item.company.address,
              bizNumber: item.company.bizNumber,
              companyId: item.companyId,
              lastProductionRequestedAt: item.lastProductionRequestedAt,
              paymentHalfYear: item.paymentHalfYear,
              paymentYear: item.paymentYear,
              salesRepresentativeId: item.companyServiceContract.salesRepresentativeId,
              manageUserId: item.companyServiceContract.manageUserId,
              active: item.companyServiceContract.active,
              beforeProduction: item.lastProductionRequestedAt ? false : true,
              allowSelection: true,
              causeOfProductionFailure: '',
            }
          }
          return arrData;
        });
        let result = Object.values(data.reduce((acc: any, curr: any) => {
          if (!acc[curr.companyId] || dayjs(curr.lastProductionRequestedAt).isBefore(dayjs(acc[curr.companyId].lastProductionRequestedAt))) {
            acc[curr.companyId] = curr;
          }
          return acc;
        }, {}));
        dataSource.value = [...result];
        await fetchDataStatus(dataSource.value.map((item: any) => {
          if (item.lastProductionRequestedAt) {
            productionCount.value = item.lastProductionRequestedAt ? productionCount.value + 1 : productionCount.value;
            return { companyId: item.companyId, paymentYear: item.paymentYear, paymentHalfYear: item.paymentHalfYear }
          }
          return;
        }));
        if (props.onSearch && productionCount.value == 0) {
          props.onSearch();
        }
      }
    }, { deep: true })

    errorTable((error: any) => {
      notification('error', error.message)
    });
    watchEffect(() => {
      if (dataSearch.value.paymentYear && dataSearch.value.paymentHalfYear) {
        searchIncomeWageParam.value = {
          paymentHalfYear: dataSearch.value.paymentHalfYear,
          paymentYear: dataSearch.value.paymentYear,
        }
      }
    })

    //------------------------SUM AREA------------------------------ 

    // count the number of status
    const countStatus = (arr: any[], type: number | Boolean, propertyCompare: string) => {
      if (Object.keys(arr).length === 0 || arr.length === 0) {
        return 0;
      }
      let typeCustom: number = 0;
      if (typeof type === 'boolean') {
        typeCustom = 0;
      }
      if (isNumber(type)) {
        typeCustom = type;
      }
      let count = arr.reduce((acc: any, crr: any) => {
        let item = typeof (crr[propertyCompare]) == 'boolean' && crr[propertyCompare] == type ? 0 : crr[propertyCompare];
        acc[item] = acc[item] ? acc[item] + 1 : 1;
        return acc;
      }, {});
      if (count[typeCustom]) {
        return count[typeCustom];
      }
      return 0;
    };
    // custom summary
    const productStatusSummary = () => {
      return `제작요청전 ${countStatus(filteredDataSource.value, true, 'beforeProduction')} 제작대기 ${countStatus(filteredDataSource.value, 0, 'productionStatus')} 제작중 ${countStatus(
        filteredDataSource.value, 1, 'productionStatus')} 제작성공 ${countStatus(filteredDataSource.value, 2, 'productionStatus')} 제작실패 ${countStatus(filteredDataSource.value, -1, 'productionStatus')} `;
    };

    //--------------------on Search----------------------

    watch(
      () => props.search,
      () => {
        let { paymentYear, paymentMonth, imputedYear, imputedMonth, ...compareObj } = dataSearch.value;
        let arr = dataSource.value.filter((item: any) => {
          return Object.keys(compareObj).every((key: any) => {
            if (key === 'productionStatuses') {  //error search main reason is 
              return compareObj.productionStatuses.length > 0 ? compareObj.productionStatuses.findIndex((status: any) => status === item.productionStatus) > -1 : true;
            }
            if (compareObj[key]) {
              return compareObj[key] == item[key];
            }
            return true;
          })
        })
        filteredDataSource.value = arr;
        beforeCount.value = 1;
      },
      { deep: true }
    );

    // ----------------request file withholding---------

    const requestFileData = ref<any>({
      companyIds: [],
      filter: dataSearch.value,
      emailInput: {
        receiverName: userInfor?.value?.name,
        receiverAddress: userInfor?.value?.email,
      },
    });
    const selectionChanged = (event: any) => {
      let deselectRowKeys: any = [];
      event.selectedRowsData.forEach((item: any) => {
        if (!item.allowSelection)
          deselectRowKeys.push(event.component.keyOf(item));
      });
      if (deselectRowKeys.length) {
        event.component.deselectRows(deselectRowKeys);
        return;
      }
      if (event.selectedRowsData)
        requestFileData.value.companyIds = event.selectedRowsData.map((item: any) => {
          return item.companyId;
        });
    };
    const modalStatus = ref<boolean>(false);
    const onRequestFile = () => {
      requestFileData.value.emailInput = {
        receiverName: userInfor?.value?.name,
        receiverAddress: userInfor?.value?.email,
      };
      const { active, ...customFilter } = dataSearch.value;
      requestFileData.value.filter = customFilter;
      if (requestFileData.value.companyIds.length > 0) {
        modalStatus.value = true;
      } else {
        notification('warning', messageDelNoItem);
      }
    };
    const onRequestDone = () => {
      refetchTable();
      modalStatus.value = false;
    }

    // watch beforeProduction

    let setBefore = computed(({
      get() {
        return !dataSearch.value.beforeProduction;
      },
      set(val) {
        dataSearch.value.beforeProduction = !val;
      }
    }))
    watch(() => dataSearch.value.beforeProduction, (newVal: any) => {
      if (newVal) {
        dataSearch.value.productionStatuses = [];
      } else {
        dataSearch.value.productionStatuses = [0, 1, 2, -1];
      }
    }, { deep: true })


    /**
     *    If it is the first report of the year, the reporting date will be August 2 of this year. 
      *   If the report is year - end, the reporting date will be February 1 of the following year
     */
    watch(() => dataSearch.value.paymentHalfYear, (newVal) => {
      if (newVal == 1) {
        dayReport.value = `${globalYear.value}0802`
      } else {
        dayReport.value = `${globalYear.value + 1}0201`
      }
    }, { deep: true });

    // const productionStatusData = (emitVal: any) => {
    //     defaultDataSource.value.map((item : any)=>{
    //         if(item.companyId == emitVal.companyId){
    //             item['productStatus'] = emitVal.productStatus
    //         }
    //     })
    //     reFreshDataGrid();
    // }
    return {
      userInfor,
      activeKey: ref("1"),
      valueDefaultCheckbox,
      valueDefaultSwitch,
      loadingTable, dayjs,
      checkBoxSearch,
      dataSearch,
      dataSource, filteredDataSource,
      colomn_resize,
      move_column,
      dayReport, defaultDataSource,
      selectionChanged, productStatusSummary, beforeProduction,
      productionStatusesCheckbox,
      onRequestFile, requestFileData, modalStatus, onRequestDone,
      setBefore,
    }
  }
})
</script> 
<style scoped lang="scss" src="../style/style.scss"></style>
<style scoped lang="scss">
#dataGrid1 {
  :deep .custom-sumary {
    white-space: break-spaces;
  }
}

:deep #tab1-bf640 {
  height: calc(62vh);

  :deep .dx-datagrid-total-footer {
    height: 77px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
  }

  :deep .dx-datagrid-headers {
    height: 27px;
  }

  :deep .dx-datagrid-rowsview {
    max-height: calc(calc(62vh) - 77px - 27px); // chiều cao bảng - chiều cao header - chiều cao footer
  }

  .dx-freespace-row {
    display: none !important; // cục lúc hiện lúc không
  }
}
</style>
