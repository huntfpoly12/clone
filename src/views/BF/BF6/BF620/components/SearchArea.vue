<template>
  <div class="search-group">
    {{ filterBF620 }}
    <a-row>
      <a-col>
        <div class="search-detail">
          <span class="search-text mt-5">귀속연월</span>
          <div class="search-date">
            <div class="month-custom d-flex-center">
              귀
              <month-picker-box v-model:valueDate="month1" width="65px" class="mr-5 ml-5" />
            </div>
            <!-- <div class="month-custom month-black d-flex-center">
              지
              <month-picker-box v-model:valueDate="month2" width="65px" class="mr-5 ml-5" />
            </div> -->
          </div>
          <a-form-item label="신고주기" label-align="left" class="mb-0">
            <checkbox-basic size="14" label="전체" class="mr-10 mx-10" v-model:valueCheckbox="reportType.checkbox1" />
            <checkbox-basic size="14" label="정기" class="mr-10" v-model:valueCheckbox="reportType.checkbox2" />
            <checkbox-basic size="14" label="반기" v-model:valueCheckbox="reportType.checkbox3" />
          </a-form-item>
          <!-- <a-form-item label="신고주기" label-align="left" class="mb-0"
            >
            <checkbox-basic size="14" label="전체" class="mr-10" v-model:valueCheckbox="filterBF620.reportType" />
            <checkbox-basic size="14" label="정기" class="mr-10" v-model:valueCheckbox="filterBF620.reportType" />
            <checkbox-basic size="14" label="반기" v-model:valueCheckbox="filterBF620.reportType" />
          </a-form-item> -->
          <!-- <a-form-item label="내/외국인" label-align="right">
            <radio-group :arrayValue="reportTypeCheckbox" v-model:valueRadioCheck="filterBF620.reportType" layoutCustom="horizontal"
              class="mt-1"></radio-group>
          </a-form-item> -->
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import DxButton from 'devextreme-vue/button';
import { useStore } from 'vuex';
import dayjs from 'dayjs';
import { reportTypeCheckbox } from '../utils/index';
export default defineComponent({
  components: { DxButton },
  setup() {
    const store = useStore();
    const filterBF620 = computed(() => store.state.common.filterBF620);
    const radioCheckForeigner = ref([]);
    const foreigner = ref();
    const month1: any = ref(dayjs().format('YYYY-MM'));
    const month2: any = ref(dayjs().format('YYYY-MM'));
    let reportType = reactive({
      checkbox1: true,
      checkbox2: true,
      checkbox3: true,
    });
    // watch filterBF620.reportType to change value
    // watch(()=> filterBF620.value.reportType, (newValue) => {
    //   if(newValue == 0) {
    //     filterBF620.value.reportType = null;
    //   }
    // })
    watch(
      () => reportType.checkbox1,
      (newVal: any) => {
        reportType.checkbox2 = newVal;
        reportType.checkbox3 = newVal;
      },
      { deep: true }
    );
    watch(
      () => reportType,
      (newVal: any) => {
        if (newVal.checkbox2 == true && newVal.checkbox3 == true) {
          newVal.checkbox1 = true;
        } else {
          newVal.checkbox1 = false;
        }
      },
      { deep: true }
    );
    return {
      radioCheckForeigner,
      foreigner,
      filterBF620,
      month1,
      month2,
      reportTypeCheckbox,
      reportType,
    };
  },
});
</script>
<style scoped lang="scss">
@import '../style/searchArea.scss';
</style>