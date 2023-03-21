<template>
  <div class="search-form">
    <a-row>
      <a-col :span="12">
        <a-row>
          <a-col :span="8">
            <a-form-item label="귀속연도">
              <year-picker-box-custom v-model:valueDate="filterForm.imputedYear" :minYear="2022"
                color="#a6a6a6"></year-picker-box-custom>
            </a-form-item>
          </a-col>
          <a-col :span="16">
            <div class="custom-note">
              <a-form-item label="제작요청상태">
                <switch-basic v-model:valueSwitch="filterForm.afterProduction" :textCheck="'제작후'"
                  :textUnCheck="'제작요청전'" />
              </a-form-item>
              <span class="style-note">
                <img src="@/assets/images/iconInfo.png" style="width: 14px;" /> 제작전은 제작요청되지 않은 상태입니다.
              </span>
            </div>
          </a-col>
        </a-row>
        <a-form-item label="제출대상구분">
          <div class="checkbox-tab-1">
            <span>연간(1.1~12.31)지급분</span>
            <div class="group-checkbox">
              <a-row>
                <a-col :span="12">
                  <div class="checkbox-item">
                    <checkbox-basic v-model:valueCheckbox="checkbox1" :disabled="!filterForm.afterProduction"
                      :size="'20'" /> <production-status :typeTag="2" padding="0px 5px" />
                  </div>
                  <div class="checkbox-item">
                    <checkbox-basic v-model:valueCheckbox="checkbox3" :disabled="!filterForm.afterProduction"
                      :size="'20'" /> <production-status :typeTag="4" padding="0px 5px" />
                  </div>
                </a-col>
                <a-col :span="12">
                  <div class="checkbox-item">
                    <checkbox-basic v-model:valueCheckbox="checkbox2" :disabled="!filterForm.afterProduction"
                      :size="'20'" /> <production-status :typeTag="3" padding="0px 5px" />
                  </div>
                  <div class="checkbox-item">
                    <checkbox-basic v-model:valueCheckbox="checkbox4" :disabled="!filterForm.afterProduction"
                      :size="'20'" /> <production-status :typeTag="5" padding="0px 5px" />
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
              <biz-number-text-box width="150px" v-model:valueInput="filterForm.companyCode" />
            </a-form-item>
            <a-form-item label="상호">
              <default-text-box width="150px" v-model:valueInput="filterForm.companyName"></default-text-box>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="매니저리스트">
              <list-manager-dropdown width="150px" v-model:valueInput="filterForm.manageUserId" />
            </a-form-item>
            <a-form-item label="영업자리스트">
              <list-sales-dropdown width="150px" :required="true" v-model:valueInput="filterForm.salesRepresentativeId" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <div style="padding-left: 50px;">
              <switch-basic :textCheck="'해지제외'" :textUnCheck="'해지포함'" v-model:valueSwitch="filterForm.excludeCancel" />
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
          <switch-basic textCheck="세무대리인신고" textUnCheck="납세자자진신고" :disabled="true" />
          <span class="style-note">
            <img src="@/assets/images/iconInfo.png" style="width: 16px;" />
            <span class="pl-5">본 설정으로 적용된 파일로 다운로드 및 메일발송 됩니다.</span>
          </span>
        </div>
      </a-form-item>
      <a-form-item label="제출연월일" label-align="left">
        <div class="d-flex-center">
          <date-time-box width="150px" v-model:valueDate="dateSubmission" />
          <a-tooltip placement="topLeft" color="black">
            <template #title>전자신고파일 제작 요청</template>
            <div class="btn-modal-save" @click="requestIncomeFile">
              <SaveOutlined class="fz-20 ml-5 action-save" />
              <span style="margin-left: 5px;">파일제작요청</span>
            </div>
          </a-tooltip>
        </div>
      </a-form-item>
    </div>
    <div class="content-grid">
      <a-spin :spinning="loadingIncomeExtraPayment || loadingElectronicFilings" size="large">
        <DxDataGrid :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource" :show-borders="true"
          key-expr="companyId" class="mt-10" :allow-column-reordering="move_column" :allow-column-resizing="colomn_resize"
          :column-auto-width="true" @selection-changed="selectionChanged" v-model:selected-row-keys="selectedRowKeys">
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxSelection mode="multiple" :fixed="true" show-check-boxes-mode="onClick" :deferred="false" />
          <DxColumn caption="사업자코드" cell-template="companyCode" />
          <template #companyCode="{ data }">
            {{ data.data.companyServiceContract.active ? data.data.company.code : '해지' }}
          </template>
          <DxColumn caption="상호 주소" cell-template="companyName" />
          <template #companyName="{ data }">
            {{ data.data.company.name }}
            {{ data.data.company.address }}
          </template>
          <DxColumn caption="사업자등록번호" data-field="company.bizNumber" />
          <DxColumn caption="최종제작요청일시" data-field="lastProductionRequestedAt" data-type="date"
            format="yyyy-MM-dd hh:mm" />
          <DxColumn caption="제작현황" cell-template="imputed" />
          <template #imputed="{ data }">
            <GetStatusTable v-if="data.data.lastProductionRequestedAt" :data="data.data" tabName="tab4"
              @productionStatusData="(value) => productionStatusData(value, data.rowIndex)" />
          </template>

          <DxSummary>
            <DxTotalItem column="사업자코드" summary-type="count" display-format="전체: {0}" />
            <DxTotalItem cssClass="custom-sumary" column="제작현황" :customize-text="productStatusSummary" />
          </DxSummary>
        </DxDataGrid>
      </a-spin>
    </div>
  </div>
  <request-file-popup v-if="modalRequestFile" :modalStatus="modalRequestFile" @closePopup="modalRequestFile = false"
    :data="dataRequestFile" tabName="tab4"></request-file-popup>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import DxCheckBox from 'devextreme-vue/check-box';
import { useQuery } from "@vue/apollo-composable";
import { useStore } from "vuex";
import { DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling, DxSummary, DxTotalItem } from "devextreme-vue/data-grid";
import { SaveOutlined } from "@ant-design/icons-vue";
import DxButton from "devextreme-vue/button";
import queries from "@/graphql/queries/BF/BF6/BF630/index";
import { companyId } from "@/helpers/commonFunction"
import notification from "@/utils/notification";
import dayjs, { Dayjs } from "dayjs";
import RequestFilePopup from "./RequestFilePopup.vue"
import GetStatusTable from "./GetStatusTable.vue";
import { Message } from '@/configs/enum';
export default defineComponent({
  components: {
    DxCheckBox, SaveOutlined, DxButton, DxDataGrid, DxToolbar, DxSelection, DxColumn, DxItem, DxScrolling, DxSummary, DxTotalItem, RequestFilePopup, GetStatusTable
  },
  props: {
    activeSearch: {
      type: Number,
      default: 0,
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const userInfor = computed(() => (store.state.auth.userInfor))
    const globalYear = computed(() => store.state.settings.globalYear)
    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const trigger = ref<boolean>(true);
    const triggerElecFilings = ref<boolean>(false);
    const lastDayFeb = dayjs(`${globalYear}-02-01`).daysInMonth()
    const dateSubmission = ref(`${globalYear.value + 1}02${lastDayFeb}`)
    // for checkbox 
    const checkbox1 = ref<boolean>(false);
    const checkbox2 = ref<boolean>(false);
    const checkbox3 = ref<boolean>(false);
    const checkbox4 = ref<boolean>(false);
    const modalRequestFile = ref<boolean>(false);
    let companyIds = Array();
    const dataRequestFile = ref()
    const filterForm = reactive({
      afterProduction: true,
      productionStatuses: Array(),
      companyCode: '',
      companyName: '',
      manageUserId: 0,
      salesRepresentativeId: 0,
      excludeCancel: true,
      imputedYear: dayjs().year(),
    }
    )
    const dataSource = ref<any>([])
    const dataSourceOrigin = ref<any>([])
    let keyRefetch = ref(0)
    let productionStatusArr = ref<any>([]);
    let countListData = ref(0)
    let payloadIncomeBusinessPayment = {
      imputedYear: filterForm.imputedYear
    }
    let isFirstSearch = ref(false)
    // ============ GRAPQL ===============================
    const {
      result: resIncomeExtraPayment,
      onResult: onResIncomeExtraPayment,
      loading: loadingIncomeExtraPayment,
      refetch: refetchIncomeExtraPayment,
      onError: onErrorIncomeExtraPayment
    } = useQuery(queries.searchIncomeExtraPaymentStatementElectronicFilingsByYear, payloadIncomeBusinessPayment, () => ({
      enabled: trigger.value,
      fetchPolicy: "no-cache",
    }))


    const {
      result: resElectronicFilings,
      loading: loadingElectronicFilings,
      refetch: refetchElectronicFilings,
      onError: onErrorElectronicFilings
    } = useQuery(queries.getElectronicFilingsByIncomeWagePaymentStatement,
      {
        input: {
          companyId: companyId,
          imputedYear: globalYear.value,
        }
      }, () => ({
        enabled: triggerElecFilings.value,
        fetchPolicy: "no-cache",
      }))
    let selectedRowKeys = ref<any>([])
    // ===================DONE GRAPQL==================================
    // watch result  api searchIncomeExtraPaymentStatementElectronicFilingsByYear
    watch(resIncomeExtraPayment, (value) => {
      if (value) {
        let data = value.searchIncomeExtraPaymentStatementElectronicFilingsByYear;
        let result = Object.values(data.reduce((acc: any, curr: any) => {
          if (!acc[curr.companyId] || dayjs(curr.lastProductionRequestedAt).isBefore(dayjs(acc[curr.companyId].lastProductionRequestedAt))) {
            acc[curr.companyId] = curr;
          }
          return acc;
        }, {}));
        dataSource.value = result.map((items: any) => {
          if (!!items.lastProductionRequestedAt) {
            items.afterProduction = false
          } else {
            items.afterProduction = true
          }
          return items
        })
        dataSourceOrigin.value = result.map((items: any) => {
          if (!!items.lastProductionRequestedAt) {
            items.afterProduction = true
          } else {
            items.afterProduction = false
          }
          return items
        })
        isFirstSearch.value = result.some((item: any) => !!item.lastProductionRequestedAt)
        if (!isFirstSearch.value) {
          searchByFilter()
        }
        countListData.value = 0
      }
      trigger.value = false
    })
    onErrorIncomeExtraPayment(e => {
      notification('error', e.message)
    })

    // watch result  api getElectronicFilingsByIncomeWagePaymentStatement
    watch(() => resElectronicFilings, (value) => {
      if (value) {
      }
    })
    onErrorElectronicFilings(e => {
      notification('error', e.message)
    })

    // watch checkbox change
    watch(checkbox1, (value) => {
      if (value) {
        filterForm.productionStatuses.push(0)
      } else {
        filterForm.productionStatuses = filterForm.productionStatuses.filter(function (item) {
          return item !== 0
        })
      };
    })
    watch(checkbox2, (value) => {
      if (value) {
        filterForm.productionStatuses.push(1)
      } else {
        filterForm.productionStatuses = filterForm.productionStatuses.filter(function (item) {
          return item !== 1
        })
      };
    })
    watch(checkbox3, (value) => {
      if (value) {
        filterForm.productionStatuses.push(2)
      } else {
        filterForm.productionStatuses = filterForm.productionStatuses.filter(function (item) {
          return item !== 2
        })
      };
    })
    watch(checkbox4, (value) => {
      if (value) {
        filterForm.productionStatuses.push(-1)
      } else {
        filterForm.productionStatuses = filterForm.productionStatuses.filter(function (item) {
          return item !== -1
        })
      };
    })

    // watch active searching
    watch(() => props.activeSearch, (value) => {
      searchByFilter()
    })
    watch(() => filterForm.imputedYear, (value) => {
      payloadIncomeBusinessPayment.imputedYear = value
      trigger.value = true
    })
    // ----------------request file---------

    const selectionChanged = (event: any) => {
      const listItemStatus2: any = []
      dataSource.value.forEach((items: any) => {
        if (items.productionStatus == 2) {
          listItemStatus2.push(items.companyId)
        }
      })
      const indexItemStatus2 = selectedRowKeys.value.findIndex((items: any) => listItemStatus2.includes(items))
      if (indexItemStatus2 >= 0) {
        selectedRowKeys.value.splice(indexItemStatus2, 1)
      }
      companyIds = selectedRowKeys.value
    };
    const messageDelNoItem = Message.getMessage('COMMON', '404').message;
    // request file popup action
    const requestIncomeFile = () => {
      if (companyIds.length) {
        dataRequestFile.value = {
          companyIds: companyIds,
          filter: filterForm,
          emailInput: {
            receiverName: userInfor.value.name,
            receiverAddress: userInfor.value.email
          }
        }
        modalRequestFile.value = true
      } else {
        notification('warning', messageDelNoItem);
      }
    }

    const countStatus = (arr: any[], type: number, propertyCompare: string) => {
      if (Object.keys(arr).length === 0 || arr.length === 0) {
        return 0;
      }
      let count = arr.reduce((acc: any, crr: any) => {
        acc[crr[propertyCompare]] = acc[crr[propertyCompare]] ? acc[crr[propertyCompare]] + 1 : 1;
        return acc;
      }, {});
      if (count[type]) {
        return count[type];
      }
      return 0;
    };
    const productStatusSummary = () => {
      let totalBeforeProduction = 0
      dataSource.value.forEach((items: any) => {
        if (!items?.afterProduction) {
          totalBeforeProduction++
        }
      });
      return `제작전 ${totalBeforeProduction} 
              제작대기 ${countStatus(productionStatusArr.value, 0, 'productionStatus')} 
              제작중 ${countStatus(productionStatusArr.value, 1, 'productionStatus')} 
              제작실패 ${countStatus(productionStatusArr.value, -1, 'productionStatus')} 
              제작성공 ${countStatus(productionStatusArr.value, 2, 'productionStatus')}`;
    };
    const productionStatusData = (emitVal: any, index: number) => {
      countListData.value++
      if (countListData.value > dataSource.value.filter((x: any) => !!x.lastProductionRequestedAt).length) return
      if (emitVal !== null) {
        productionStatusArr.value = [...productionStatusArr.value, emitVal];
        dataSource.value[index].productionStatus = emitVal.productionStatus
        dataSource.value[index].afterProduction = true
        dataSourceOrigin.value[index].productionStatus = emitVal.productionStatus
        dataSourceOrigin.value[index].afterProduction = true
      }
      if (countListData.value == dataSource.value.length) {
        keyRefetch.value++
        if (isFirstSearch.value) {
          searchByFilter()
          isFirstSearch.value = false
        }
      }
    };

    watch(() => filterForm.afterProduction, (value) => {
      checkbox1.value = value
      checkbox2.value = value
      checkbox3.value = value
      checkbox4.value = value
    },
      {
        immediate: true
      })
    const searchByFilter = async () => {
      dataSource.value = dataSourceOrigin.value.filter((items: any) => {
        return checkProductionStatuses(items.afterProduction, Number.isInteger(items.productionStatus) ? items.productionStatus : null)
          && checkKeyFilter(filterForm.companyCode, items.company.code)
          && checkKeyFilter(filterForm.companyName, items.company.name)
          && checkKeyFilter(filterForm.manageUserId, items.companyServiceContract.manageUserId)
          && checkKeyFilter(filterForm.salesRepresentativeId, items.companyServiceContract.salesRepresentativeId)
          && filterForm.excludeCancel === items.companyServiceContract.active
      })
    }
    const checkKeyFilter = (valueFilter: any, valueItems: any) => {
      if (!valueFilter) {
        return true
      } else if (valueFilter === valueItems) {
        return true
      } else {
        return false
      }
    }

    const checkProductionStatuses = (afterProduction: boolean, productionStatus?: number | null) => {
      if (filterForm.afterProduction) {
        if (filterForm.afterProduction === afterProduction) {
          if (filterForm.productionStatuses.includes(productionStatus)) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      } else {
        if (filterForm.afterProduction === afterProduction) {
          return true
        } else {
          return false
        }
      }
    }
    return {
      globalYear,
      filterForm,
      move_column,
      colomn_resize,
      dataSource,
      checkbox1,
      checkbox2,
      checkbox3,
      checkbox4,
      loadingElectronicFilings,
      loadingIncomeExtraPayment,
      trigger,
      requestIncomeFile,
      modalRequestFile,
      dataRequestFile,
      dateSubmission,
      productStatusSummary,
      productionStatusData,
      selectionChanged,
      keyRefetch,
      selectedRowKeys
    }
  }
})
</script>
<style  scoped lang="scss" src="../style/styleTabs.scss"></style>
<style scoped lang="scss">
:deep(.ant-form-item-label>label) {
  width: 110px;
  padding-left: 10px;
}
</style>
