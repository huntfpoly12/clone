<template>
  <a-modal
    :visible="modalStatus"
    @cancel="setModalVisible"
    :mask-closable="false"
    class="confirm-md"
    footer=""
    :width="460"
  >
    <div class="form-group">
      <h3 style="font-weight: 600; text-align: center;">소득자료 생성</h3>
      <a-form-item label="귀속/지급연월" label-align="right" :label-col="{span:10}">
        <div class="d-flex-center">
          <DxButton
            :text="'귀 ' + globalYear + '-' + formatMonth(month1)"
            :style="{
              cursor: 'context-menu',
              color: 'white',
              backgroundColor: 'gray',
              height: $config_styles.HeightInput,
            }"
            class="btn-date mr-2"
          />
          <DxButton
            :text="'지 ' + month2.slice(0, 4) + '-' + month2.slice(4)"
            :style="{
              cursor: 'context-menu',
              color: 'white',
              backgroundColor: 'black',
              height: $config_styles.HeightInput,
            }"
            class="btn-date mr-2"
          />
        </div>
      </a-form-item>
      <a-form-item label="지급일"  label-align="right" :label-col="{span:10}">
        <date-time-box-custom
          width="170px"
          :required="true"
          :startDate="startDate"
          :finishDate="finishDate"
          v-model:valueDate="paymentDayPA720"
        />
        <!-- <number-box :max="31" :min="1" width="150px" class="mr-5" v-model:valueInput="paymentDayPA720" :isFormat="true" /> -->
      </a-form-item>

      <div class="text-center mt-20">
        <button-basic
          text="새로 입력"
          :width="140"
          type="default"
          mode="contained"
          @onClick="onSubmit"
        />
        <!-- <button-basic class="button-form-modal" text="과거 내역 복사" :width="140" type="default" mode="contained"
        @onClick="openModalCopy" /> -->
      </div>
    </div>
  </a-modal>

  <a-modal
    :visible="modalCopy"
    @cancel="setModalVisibleCopy"
    :mask-closable="false"
    class="confirm-md"
    footer=""
    :width="600"
  >
    <a-spin :spinning="loading">
      <div class="mt-45 d-flex-center">
        <span class="mr-5">과거내역</span>
        <DxSelectBox
          class="mx-3"
          :width="200"
          :data-source="arrDataPoint"
          placeholder="선택"
          item-template="item-data"
          field-template="field-data"
          @value-changed="updateValue"
          :disabled="false"
        >
          <template #field-data="{ data }">
            <span v-if="data" style="padding: 4px">
              귀 {{ data.imputedYear }}-{{ formatMonth(data.imputedMonth) }} 지
              {{ data.paymentYear }}-{{ formatMonth(data.paymentMonth) }}
              <DxTextBox style="display: none" />
            </span>
            <span v-else style="padding: 4px">
              <span>선택</span>
              <DxTextBox style="display: none" />
            </span>
          </template>
          <template #item-data="{ data }">
            <span
              >귀 {{ data.imputedYear }}-{{ formatMonth(data.imputedMonth) }} 지
              {{ data.paymentYear }}-{{ formatMonth(data.paymentMonth) }}</span
            >
          </template>
        </DxSelectBox>
        <span class="mr-5">로 부터 복사하여 새로 입력합니다.</span>
      </div>
    </a-spin>

    <div class="text-center mt-30">
      <button-basic
        class="mr-5"
        text="아니요"
        :width="140"
        type="default"
        mode="outlined"
        @onClick="setModalVisibleCopy"
      />
      <button-basic
        class="ml-5"
        text="네"
        :width="140"
        type="default"
        mode="contained"
        @onClick="actionCopy"
      />
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { companyId } from "@/helpers/commonFunction";
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";
import notification from "@/utils/notification";
import { useMutation, useQuery } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA7/PA720/index";
import queries from "@/graphql/queries/PA/PA7/PA720/index";
import { Message } from "@/configs/enum";
import DxButton from "devextreme-vue/button";
import filters from "@/helpers/filters";
import dayjs from "dayjs";
export default defineComponent({
  props: {
    modalStatus: {
      type: Boolean,
    },
    month: {
      type: Number,
      default: 0,
    },
    dateType: {
      type: Number,
      default: 0,
    },
  },
  components: {
    DxSelectBox,
    DxTextBox,
    DxButton,
  },
  setup(props, { emit }) {
    const store = useStore();
    const processKeyPA720 = computed(() => store.state.common.processKeyPA720);
    const globalYear = ref<number>(
      parseInt(sessionStorage.getItem("paYear") ?? "0")
    );
    const month1 = ref(1);
    const modalCopy = ref(false);
    const paymentDayPA720 = computed({
      get() {
        let day = store.getters["common/paymentDayPA720"];
        const daysInMonth = dayjs(`${month2.value}`).daysInMonth();
        let newDay = day > daysInMonth || day == 0 ? daysInMonth : day;
        let date = `${month2.value}${newDay}`;
        return date;
      },
      set(value) {
        let day = value.toString().slice(-2);
        store.state.common.paymentDayPA720 = day;
      },
    });
    const trigger = ref(false);
    const startDate = computed(() => {
      let day = dayjs(`${month2.value}`).startOf("month").toDate();
      return day;
    });
    const finishDate = computed(() => {
      let day = dayjs(`${month2.value}`).endOf("month").toDate();
      return day;
    });

    // ----------set month source default because dependent on the set up before--------------

    const month2 = ref<String>(
      `${globalYear.value}${processKeyPA720.value.processKey.imputedMonth}`
    );
    watch(
      () => props.modalStatus,
      (newVal: boolean) => {
        if (newVal) {
          let val = props.month;
          month1.value = val;
          let yearMonth = `${processKeyPA720.value.processKey.paymentYear}${processKeyPA720.value.processKey.imputedMonth}`;
          if (props.dateType == 2 && val) {
            yearMonth =
              val == 12
                ? `${globalYear.value + 1}01`
                : `${globalYear.value}${filters.formatMonth(val + 1)}`;
          }
          if (props.dateType == 1) {
            yearMonth = `${globalYear.value}${filters.formatMonth(val)}`;
          }
          month2.value = yearMonth;
          trigger.value = true;
        }
      },
      { deep: true }
    );

    //-------------------------get date source copy--------------------------------

    const arrDataPoint: any = ref({}); // arr date of date source
    const findIncomeProcessExtraStatViewsParam: any = ref({
      companyId: companyId,
      filter: {
        startImputedYearMonth: parseInt(`${globalYear.value}01`),
        finishImputedYearMonth: parseInt(`${globalYear.value}12`),
      },
    });
    const {
      result: resultFindIncomeProcessExtraStatViews,
      refetch: findIncomeRefetch,
      loading,
    } = useQuery(
      queries.findIncomeProcessExtraStatViews,
      findIncomeProcessExtraStatViewsParam,
      () => ({
        enabled: trigger.value,
        fetchPolicy: "no-cache",
      })
    );
    watch(resultFindIncomeProcessExtraStatViews, (value) => {
      arrDataPoint.value = value.findIncomeProcessExtraStatViews.reverse();
      trigger.value = true;
    });
    const messageCopyDone = Message.getMessage("COMMON", "106").message;
    watch(modalCopy, (newVal, oldVal) => {
      if (newVal) {
        findIncomeProcessExtraStatViewsParam.value.filter.startImputedYearMonth =
          parseInt(`${globalYear.value}01`);
        findIncomeProcessExtraStatViewsParam.value.filter.finishImputedYearMonth =
          parseInt(`${globalYear.value}12`);
        trigger.value = true;
        findIncomeRefetch();
      }
    });

    //-------------------------action copy data--------------------------------

    const { mutate, onError, onDone } = useMutation(mutations.copyIncomeExtras);
    const openModalCopy = () => {
      modalCopy.value = true;
    };
    const updateValue = (value: any) => {
      dataApiCopy.value = {
        imputedYear: value.value.imputedYear,
        imputedMonth: value.value.imputedMonth,
        paymentYear: value.value.paymentYear,
        paymentMonth: value.value.paymentMonth,
      };
    };
    const dataApiCopy: any = ref({}); // datasource to copy the data
    const actionCopy = async () => {
      if (dataApiCopy.value.imputedYear) {
        await commitDate();
        let param = {
          companyId: companyId,
          source: dataApiCopy.value,
          target: processKeyPA720.value.processKey,
          targetDay: +paymentDayPA720.value.toString().slice(-2),
        };
        mutate(param);
      } else {
        notification("error", "날짜를 선택하세요.");
      }
    };
    onError((res) => {
      notification("error", res.message);
    });
    onDone(() => {
      setModalVisible();
      setModalVisibleCopy();
      notification("success", messageCopyDone);
      emit("closePopup", true);
    });

    // ---------------------fn modal --------------------

    const setModalVisible = () => {
      emit("closePopup", false);
    };
    const setModalVisibleCopy = () => {
      modalCopy.value = false;
    };
    const formatMonth = (month: number) => {
      if (month < 10) {
        return "0" + month;
      }
      return month;
    };

    //----------------emit date and set to store------------------

    const commitDate = async () => {
      let dateTarget = {
        imputedYear: globalYear.value,
        imputedMonth: props.month,
        paymentYear: parseInt(month2.value.toString().slice(0, 4)),
        paymentMonth: parseInt(month2.value.toString().slice(4, 6)),
      };
      emit("addMonthSuccess", dateTarget);
      processKeyPA720.value.processKey = dateTarget;
      let day = paymentDayPA720.value.toString().slice(-2);
      store.state.common.paymentDayPA720 = +day;
    };

    //------------------fn submit add new------------------------

    const onSubmit = () => {
      commitDate();
      emit("closePopup", false);
    };

    return {
      processKeyPA720,
      modalCopy,
      actionCopy,
      month2,
      openModalCopy,
      setModalVisible,
      setModalVisibleCopy,
      onSubmit,
      updateValue,
      arrDataPoint,
      dataApiCopy,
      formatMonth,
      month1,
      globalYear,
      paymentDayPA720,
      startDate,
      finishDate,
      loading,
    };
  },
});
</script>

<style lang="scss" scoped>
.custom-modal-delete {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-top: 20px;

  img {
    width: 40px;
    margin-right: 5px;
  }

  span {
    padding: 0px 5px;
  }
}

:deep label {
  width: 100px;
}

:deep div.month-custom-1 {
  background-color: #a6a6a6;
  padding: 4px 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: white;
  width: fit-content;

  .dp__input {
    color: white;
    padding: 0px;
    border: none;
    background-color: #a6a6a6;
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
