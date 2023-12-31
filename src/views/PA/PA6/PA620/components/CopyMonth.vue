<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
    :width="460">
    <div class="form-group">
      <h3 style="font-weight: 600; text-align: center;">소득자료 생성</h3>
      <a-form-item label="귀속/지급연월" label-align="right" class="mt-20" :label-col="{span:10}">
        <div class="d-flex-center">
          <DxButton :text="'귀 ' + processKeyPA620.imputedYear + '-' + $filters.formatMonth(month1)"
            :style="{ cursor: 'context-menu', color: 'white', backgroundColor: 'gray', height: $config_styles.HeightInput }"
            class="btn-date mr-2" />
          <DxButton :text="'지 ' + month2.slice(0, 4) + '-' + month2.slice(4)"
            :style="{ cursor: 'context-menu', color: 'white', backgroundColor: 'black', height: $config_styles.HeightInput }"
            class="btn-date mr-2" />
        </div>
      </a-form-item>
      <a-form-item label="지급일" label-align="right" :label-col="{span:10}">
        <date-time-box-custom width="170px" :required="true" :startDate="startDate" :finishDate="finishDate"
          v-model:valueDate="paymentDayPA620" />
      </a-form-item>

      <div class="text-center mt-20">
        <button-basic text="새로 입력" :width="140" type="default" mode="contained"
          @onClick="onSubmit" />
        <!-- <button-basic class="button-form-modal" text="과거 내역 복사" :width="140" type="default" mode="contained"
        @onClick="openModalCopy" /> -->
      </div>
    </div>
  </a-modal>

  <a-modal :visible="modalCopy" @cancel="setModalVisibleCopy" :mask-closable="false" class="confirm-md" footer=""
    :width="600">
    <a-spin :spinning="loading">
      <div class="mt-45 d-flex-center">
        <span class="mr-5">과거내역</span>
        <DxSelectBox :width="200" :data-source="arrDataPoint" placeholder="선택" item-template="item-data"
          field-template="field-data" @value-changed="updateValue" :disabled="false">
          <template #field-data="{ data }">
            <span v-if="data" style="padding: 4px">
              귀 {{ data.imputedYear }}-{{ $filters.formatMonth(data.imputedMonth) }}
              지 {{ data.paymentYear }}-{{ $filters.formatMonth(data.paymentMonth) }}
              <DxTextBox style="display: none;" />
            </span>
            <span v-else style="padding: 4px">
              <span>선택</span>
              <DxTextBox style="display: none;" />
            </span>
          </template>
          <template #item-data="{ data }">
            <span>
              귀 {{ data.imputedYear }}-{{ $filters.formatMonth(data.imputedMonth) }}
              지 {{ data.paymentYear }}-{{ $filters.formatMonth(data.paymentMonth) }}
            </span>
          </template>
        </DxSelectBox>
        <span class="ml-5">로 부터 복사하여 새로 입력합니다.</span>
      </div>
    </a-spin>

    <div class="text-center mt-30">
      <button-basic class="mr-5" text="아니요" :width="140" type="default" mode="outlined"
        @onClick="setModalVisibleCopy" />
      <button-basic class="ml-5" text="네" :width="140" type="default" mode="contained"
        @onClick="actionCopy" />
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, computed } from 'vue'
import { companyId } from "@/helpers/commonFunction"
import notification from "@/utils/notification";
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";
import { useMutation, useQuery } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA6/PA620/index"
import queries from "@/graphql/queries/PA/PA6/PA620/index"
import { useStore } from 'vuex'
import dayjs from "dayjs";
import { Message } from '@/configs/enum';
import DxButton from "devextreme-vue/button";
import filters from '@/helpers/filters';

export default defineComponent({
  props: {
    modalStatus: {
      type: Boolean,
    },
    monthVal: {
      type: Number,
    },
    dateType: {
      type: Number,
      default: 1,
    },
  },
  components: {
    DxSelectBox,
    DxTextBox,
    DxButton
  },
  setup(props, { emit }) {
    const store = useStore()
    const globalYear = ref<number>(parseInt(sessionStorage.getItem("paYear") ?? '0'));
    const month1: any = ref<number>()
    const processKeyPA620 = computed(() => store.state.common.processKeyPA620)
    const messageCopyDone = Message.getMessage('COMMON', '106').message;
    let day = computed(() => store.getters['common/paymentDayPA620']);
    const modalCopy = ref(false);
    const paymentDayPA620 = computed({
      get() {
        const daysInMonth = dayjs(`${month2.value}`).daysInMonth();
        let newDay = day.value > daysInMonth || day.value == 0 ? daysInMonth : day.value;
        let date = `${month2.value}${newDay}`;
        return dayjs(date);
      },
      set(value) {
        let day = +value.toString().slice(-2);
        store.commit('common/paymentDayPA620', day);
      },
    });

    const startDate = computed(() => {
      let day = dayjs(`${month2.value}`).startOf('month').toDate();
      return day;
    });
    const finishDate = computed(() => {
      let day = dayjs(`${month2.value}`).endOf('month').toDate();
      return day;
    });
    // ----------set month source default because dependent on the set up before--------------
    let month2: any = ref();
    watch(() => [props.monthVal, processKeyPA620.value.paymentYear], ([val]) => {
      month1.value = val;
      let yearMonth = `${processKeyPA620.value.paymentYear}${processKeyPA620.value.imputedMonth}`;
      if (props.dateType == 2 && val) {
        yearMonth = val == 12 ? `${globalYear.value + 1}01` : `${globalYear.value}${filters.formatMonth(val + 1)}`;
      }
      if (props.dateType == 1) {
        yearMonth = `${globalYear.value}${filters.formatMonth(val)}`;
      }
      month2.value = yearMonth;
    });
    //-------------------------action copy data--------------------------------
    const {
      mutate,
      onError,
      onDone,
    } = useMutation(mutations.copyIncomeBusinesses);
    const openModalCopy = () => {
      modalCopy.value = true
    }
    // get date to copy
    const updateValue = (value: any) => {
      dataApiCopy.value = {
        imputedYear: value.value.imputedYear,
        imputedMonth: value.value.imputedMonth,
        paymentYear: value.value.paymentYear,
        paymentMonth: value.value.paymentMonth,
      }
    };
    const dataApiCopy: any = ref({}); // datasource to copy the data
    const actionCopy = async () => {
      if (dataApiCopy.value.imputedYear) {
        await commitDate();
        let param = {
          companyId: companyId,
          source: dataApiCopy.value,
          target: processKeyPA620.value,
          targetDay: +paymentDayPA620.value.format('DD'),
        }
        mutate(param)
      } else {
        notification('error', '날짜를 선택하세요.')
      }
    }
    onError(res => {
      notification('error', res.message)
    })
    onDone(() => {
      setModalVisible();
      setModalVisibleCopy();
      notification('success', messageCopyDone);
      emit('loadingTable')
    })
    //-------------------------get date source copy--------------------------------
    const arrDataPoint: any = ref({}) // arr date of date source
    const originData: any = ref({
      companyId: companyId,
      filter: {
        startImputedYearMonth: parseInt(`${globalYear.value}01`),
        finishImputedYearMonth: parseInt(`${globalYear.value}12`),
      }
    })
    const {
      onResult: onResult,
      refetch,
      loading
    } = useQuery(queries.findIncomeProcessBusinessStatViews, originData, () => ({
      fetchPolicy: "no-cache",
    }));
    onResult((value: any) => {
      arrDataPoint.value = value.data.findIncomeProcessBusinessStatViews.reverse();
    })
    watch(modalCopy, (newVal, oldVal) => {
      if (newVal) {
        originData.value.filter = { startImputedYearMonth: parseInt(`${globalYear.value}01`), finishImputedYearMonth: parseInt(`${globalYear.value}12`) };
        refetch();
      }
    });
    // ---------------------fn modal --------------------
    const setModalVisible = () => {
      emit("closePopup", false)
    };
    const setModalVisibleCopy = () => {
      modalCopy.value = false
    };
    //----------------emit date and set to store------------------
    const commitDate = async () => {
      const dateCustom = {
        imputedYear: globalYear.value,
        imputedMonth: month1.value,
        paymentYear: parseInt(month2.value.toString().slice(0, 4)),
        paymentMonth: parseInt(month2.value.toString().slice(4, 6)),
      }
      store.commit('common/processKeyPA620', dateCustom);
      emit("dataAddIncomeProcess", dateCustom);
      let day = paymentDayPA620.value.format('YYYYMMDD').toString().slice(-2);
      store.commit('common/paymentDayPA620', +day);
    }
    //------------------fn submit add new------------------------
    const onSubmit = () => {
      commitDate();
      emit("closePopup", false);
    };
    return {
      modalCopy,
      paymentDayPA620,
      month1, month2,
      openModalCopy,
      setModalVisible,
      setModalVisibleCopy,
      onSubmit,
      arrDataPoint,
      updateValue,
      actionCopy,
      processKeyPA620,
      startDate, finishDate,
      loading,
    }
  },
})
</script>

<style lang="scss" scoped>

:deep label {
  width: 100px;
}

:deep div.month-custom-1 {
  background-color: #A6A6A6;
  padding: 4px 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: white;
  width: fit-content;

  .dp__input {
    color: white;
    padding: 0px;
    border: none;
    background-color: #A6A6A6;
  }

  .dp__icon {
    display: none;
  }
}

:deep .month-custom-2 {
  background-color: black;
  padding-left: 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: white;

  .dp__input {
    color: white;
    padding: 0px;
    border: none;
    background-color: black;
    font-size: 14px;
  }

  .dp__icon {
    display: none;
  }
}

:deep .btn-date {
  div.dx-button-content {
    padding: 0px 10px 0px;
  }
}
.form-group{
  margin-top: 20px;
}
</style>
