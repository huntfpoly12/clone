<template>
  <div class="search-group">
    <a-row>
      <a-col>
        <div class="search-date" style="margin-left: 181px;">
          <a-form-item label="신고주기" label-align="left" class="mb-0" v-if="tab1">
            <checkbox-basic size="14" label="전체" class="mr-10 mx-10" v-model:valueCheckbox="reportType.checkbox1" />
            <checkbox-basic size="14" label="매월" class="mr-10" v-model:valueCheckbox="reportType.checkbox2" />
            <checkbox-basic size="14" label="반기" v-model:valueCheckbox="reportType.checkbox3" />
          </a-form-item>
          
        </div>
        <div class="search-date">
          <span class="search-text mt-5">지급연월</span>
          <div>
            <month-picker-box-custom v-model:valueDate="month2" text="지"></month-picker-box-custom>
          </div>
          <a-form-item label="신고구분" label-align="right" class=" ml-10" v-if="tab1">
            <radio-group :arrayValue="reportTypeCheckbox" v-model:valueRadioCheck="afterDeadLineIndex"
              layoutCustom="horizontal" class="mt-1"></radio-group>
          </a-form-item>
          <a-form-item label="신고구분" label-align="left" class="ml-10" v-else>
            <radio-group :arrayValue="reportTypeTab2" v-model:valueRadioCheck="afterDeadLineIndex"
              layoutCustom="horizontal" class="mt-1"></radio-group>
          </a-form-item>
        </div>
      </a-col>
      <a-col>
        <div class="search-production">
          <a-form-item label="최종제작상태">
            <switch-basic v-model:valueSwitch="filterBF620.beforeProduction" :textCheck="'제작후'" :textUnCheck="'제작전'" />
            <span style="font-size: 11px; color: #888888" class="ml-5"> <img src="@/assets/images/iconInfo.png"
                style="width: 14px" /> 제작전은 제작요청되지 않은 상태입니다. </span>
          </a-form-item>
          <div class="mt-5 production-check">
            <CheckboxGroup :disabled="!filterBF620.beforeProduction" :options="productionStatusesCheckbox"
              v-model:valueCheckbox="filterBF620.productionStatuses" size="18"> </CheckboxGroup>
          </div>
        </div>
      </a-col>
      <a-col class="search-company">
        <a-form-item label="사업자코드">
          <!-- <biz-number-text-box width="150px" v-model:valueInput="filterBF620.code" /> -->
          <default-text-box v-model:valueInput="filterBF620.code" width="150px" @onChange="onChange"></default-text-box>
        </a-form-item>
        <a-form-item label="상호">
          <default-text-box width="150px" v-model:valueInput="filterBF620.name"></default-text-box>
        </a-form-item>
        <a-row>
          <a-form-item label="매니저리스트">
            <list-manager-dropdown width="150px" v-model:valueInput="filterBF620.manageUserId" />
          </a-form-item>
        </a-row>
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
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import DxButton from 'devextreme-vue/button';
import { useStore } from 'vuex';
import dayjs from 'dayjs';
import { reportTypeCheckbox, productionStatusesCheckbox, reportTypeTab2 } from '../utils/index';
import CheckboxGroup from './CheckboxGroup.vue';
import { filter } from 'lodash';
export default defineComponent({
  components: { DxButton, CheckboxGroup },
  props: {
    tab1: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const store = useStore();
    const filterBF620 = computed(() => store.state.common.filterBF620);
    const radioCheckForeigner = ref([]);
    const foreigner = ref();
    const month2: any = ref(dayjs().format('YYYY-MM'));
    let reportType = reactive({
      checkbox1: true,
      checkbox2: true,
      checkbox3: true,
    });
    const checkbox2 = ref([]);
    const searchWithholdingTrigger = ref(true);
    // watch filterBF620.reportType to change value
    watch(
      () => reportType.checkbox1,(newVal: any) => {
        if(!newVal && (!reportType.checkbox2 || !reportType.checkbox3)) {
          return;
        }
        reportType.checkbox2 = newVal;
        reportType.checkbox3 = newVal;
        delete filterBF620.value.reportType;

      },
      { deep: true }
    );
    watch(
      () => reportType,
      (newVal: any) => {
        if (newVal.checkbox2 == true && newVal.checkbox3 == true) {
          newVal.checkbox1 = true;
          delete filterBF620.value.reportType;
          return;
        }
        newVal.checkbox1 = false;
        if (newVal.checkbox2) {
          filterBF620.value.reportType = 1;
          return;
        }
        if (newVal.checkbox3) {
          filterBF620.value.reportType = 6;
          return;
        }
      },
      { deep: true }
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
      if (!newVal) {
        filterBF620.value.productionStatuses = [];
      } else {
        filterBF620.value.productionStatuses = [0];
      }
    }, { deep: true })
    // afterDeadLineIndex
    const afterDeadLineIndex = ref(1);
    watch(afterDeadLineIndex,(newVal: any)=> {
      if(newVal === 1) {
        filterBF620.value.index = 0;
        filterBF620.value.afterDeadline = false;
      }
      if(newVal === 2) {
        filterBF620.value.index = 1;
        filterBF620.value.afterDeadline = false;
      }
      if(newVal === 3) {
        filterBF620.value.index = 0;
        filterBF620.value.afterDeadline = true;
      }
    })
    // ----------------convert code to upper case------------
    const onChange = () => {
      filterBF620.value.code = filterBF620.value.code.toUpperCase();
    }
    return {
      radioCheckForeigner,
      foreigner,
      filterBF620,
      month2,
      reportTypeCheckbox,
      productionStatusesCheckbox,
      reportType,
      checkbox1: '',
      checkbox2,
      afterDeadLineIndex,
      reportTypeTab2,
      onChange
    };
  },
});
</script>
<style scoped lang="scss">
@import '../style/searchArea.scss';
</style>
