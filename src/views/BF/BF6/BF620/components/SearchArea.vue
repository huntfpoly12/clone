<template>
  <div class="search-group">
    <a-row>
      <a-col>
        <div class="search-date">
          <span class="search-text mt-5 ml-10">지급연월:</span>
          <div>
            <month-picker-box-custom v-model:valueDate="month2" text="지"></month-picker-box-custom>
          </div>
        </div>
      </a-col>
      <a-col>
        <div class="search-date" style="flex-direction: column;">
          <a-form-item label="신고주기" label-align="left" class="mb-0 ml-10" v-if="tab1">
            <span @click="onChangeCheckbox1">
              <checkbox-basic size="14" label="전체" class="mr-10 mx-10" v-model:valueCheckbox="reportType.checkbox1" />
            </span>
            <checkbox-basic size="14" label="매월" class="mr-10" v-model:valueCheckbox="reportType.checkbox2" />
            <checkbox-basic size="14" label="반기" v-model:valueCheckbox="reportType.checkbox3" />
          </a-form-item>
          <a-form-item label="신고구분" label-align="right" class=" ml-10" v-if="tab1">
            <radio-group :arrayValue="reportTypeCheckbox" v-model:valueRadioCheck="filterBF620.withholdingTaxType"
              layoutCustom="horizontal" class="mt-1"></radio-group>
          </a-form-item>
          <a-form-item label="신고주기" label-align="right" class="ml-10 mt-5" v-else>
            <radio-group :arrayValue="reportTypeTab2" v-model:valueRadioCheck="filterBF620.reportType"
              layoutCustom="horizontal" class="mt-1"></radio-group>
          </a-form-item>
        </div>
      </a-col>
      <a-col>
        <div class="search-production">
          <a-form-item label="제작요청상태">
            <div class="input-text">
              <switch-basic v-model:valueSwitch="setBefore" :textCheck="'제작요청후'" :textUnCheck="'제작요청전'" />
              <a-tooltip placement="top" class="custom-tooltip">
                <template #title>
                  제작전은 제작요청되지 않은 상태입니다.
                </template>
                <div style="text-align: center;">
                  <img src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px" class="mb-3 ml-10" />
                </div>
              </a-tooltip>
            </div>
          </a-form-item>
          <div class="mt-5 production-check">
            <CheckboxGroup :disabled="filterBF620.beforeProduction" :options="productionStatusesCheckbox"
              v-model:valueCheckbox="filterBF620.productionStatuses" size="18"> </CheckboxGroup>
          </div>
        </div>
      </a-col>
      <a-col class="search-company">
        <a-form-item label="매니저리스트">
          <list-manager-dropdown width="150px" v-model:valueInput="filterBF620.manageUserId" filterData/>
        </a-form-item>
        <a-form-item label="영업자리스트">
          <list-sales-dropdown width="150px" v-model:valueInput="filterBF620.salesRepresentativeId" />
        </a-form-item>
      </a-col>
      <a-col class="search-4">
        <switch-basic :textCheck="'해지제외'" :textUnCheck="'해지포함'" v-model:valueSwitch="filterBF620.active" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch, watchEffect } from 'vue';
import DxButton from 'devextreme-vue/button';
import { useStore } from 'vuex';
import dayjs from 'dayjs';
import { reportTypeCheckbox, productionStatusesCheckbox, reportTypeTab2 } from '../utils/index';
import CheckboxGroup from './CheckboxGroup.vue';
export default defineComponent({
  components: { DxButton, CheckboxGroup },
  props: {
    rerenderReport: {
      type: Number,
      default: 0,
    },
    tab1: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const store = useStore();
    const filterBF620 = computed(() => store.state.common.filterBF620);
    const radioCheckForeigner = ref([]);
    const foreigner = ref();
    const month2: any = ref(dayjs(`${filterBF620.value.paymentYear}${filterBF620.value.paymentMonth}`))
    let reportType = computed(() => store.state.common.reportType);
    const onChangeCheckbox1 = () => {
      reportType.value.checkbox2 = reportType.value.checkbox1;
      reportType.value.checkbox3 = reportType.value.checkbox1;
      filterBF620.value.reportType = null;
    }
    watch(() => props.rerenderReport, (newVal: any) => {
      if (filterBF620.value.reportType == 1) {
        reportType.value.checkbox1 = false;
        reportType.value.checkbox2 = true;
        reportType.value.checkbox3 = false;
      }
      if (filterBF620.value.reportType == 6) {
        reportType.value.checkbox1 = false;
        reportType.value.checkbox2 = false;
        reportType.value.checkbox3 = true;
      }
    }, { deep: true })
    watch(
      () => [reportType.value.checkbox2, reportType.value.checkbox3],
      ([newVal2, newVal3]) => {
        if (newVal2 && newVal3 && props.tab1) {
          reportType.value.checkbox1 = true;
          filterBF620.value.reportType = null;
          return;
        }
        if (!newVal2 && !newVal3) {
          reportType.value.checkbox1 = false;
          filterBF620.value.reportType = null;
          return;
        }
        if (newVal2 && !newVal3) {
          filterBF620.value.reportType = 1;
          reportType.value.checkbox1 = false;
          return;
        }
        if (newVal3 && !newVal2) {
          reportType.value.checkbox1 = false;
          filterBF620.value.reportType = 6;
          return;
        }
      },
      { immediate: true }
    );

    //watch date

    watch(month2, (newVal: any) => {
      if (newVal) {
        filterBF620.value.paymentYear = +month2.value.toString().slice(0, 4);
        filterBF620.value.paymentMonth = +month2.value.toString().slice(4, 6);
      }
    });

    // watch beforeProduction

    watch(() => filterBF620.value.beforeProduction, (newVal: any) => {
      if (newVal) {
        filterBF620.value.productionStatuses = [];
      } else {
        filterBF620.value.productionStatuses = [0, 1, 2, -1];
      }
    }, { deep: true })
    watch(() => filterBF620.value.productionStatuses, (newVal: any) => {
      if (!newVal.length) {
        filterBF620.value.beforeProduction = true;
      } else {
        filterBF620.value.beforeProduction = false;
      }
    }, { deep: true })

    // ----------------convert companyCode to upper case------------

    const onChange = () => {
      filterBF620.value.companyCode = filterBF620.value.companyCode.toUpperCase();
    }
    // const onChangeSwitch = (e: any) => {
    //   filterBF620.value.beforeProduction = !e;
    // }
    let setBefore = computed(({
      get() {
        return !filterBF620.value.beforeProduction;
      },
      set(val) {
        filterBF620.value.beforeProduction = !val;
      }
    }))

    return {
      radioCheckForeigner,
      foreigner,
      filterBF620,
      month2,
      reportTypeCheckbox,
      productionStatusesCheckbox,
      reportType,
      // afterDeadLineIndex,
      reportTypeTab2,
      onChange, onChangeCheckbox1,
      setBefore,
      dayjs,
    };
  },
});
</script>
<style scoped lang="scss">
@import '../style/searchArea.scss';
</style>
