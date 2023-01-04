<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer="" :width="500">
    <a-form-item label="귀속/지급연월" label-align="right" class="mt-40">
      <div class="d-flex-center">
        <div class="month-custom-1 d-flex-center">귀 {{ processKey.imputedYear }}-{{ formatMonth(month) }}</div>
        <div class="month-custom-2 d-flex-center">지 <month-picker-box v-model:valueDate="month2" width="65px" class="ml-5" /></div>
      </div>
    </a-form-item>
    <a-form-item label="지급일" label-align="right">
      <number-box :max="31" :min="1" width="150px" class="mr-5" v-model:valueInput="paymentDayCopy" />
    </a-form-item>

    <div class="text-align-center mt-30">
      <button-basic class="button-form-modal" text="새로 입력" :width="140" type="default" mode="contained" @onClick="onSubmit" />
      <button-basic class="button-form-modal" text="과거 내역 복사" :width="140" type="default" mode="contained" @onClick="openModalCopy" />
    </div>
  </a-modal>

  <a-modal :visible="modalCopy" @cancel="setModalVisibleCopy" :mask-closable="false" class="confirm-md" footer="" :width="600">
    <div class="mt-30 d-flex-center">
      <span>과거내역 {{ month2 }} </span>
      <DxSelectBox class="mx-3" :width="200" :data-source="arrDataPoint" placeholder="선택" item-template="item-data" field-template="field-data" @value-changed="updateValue" :disabled="false">
        <template #field-data="{ data }">
          <span v-if="data" style="padding: 4px">
            귀 {{ data.imputedYear }}-{{ formatMonth(data.imputedMonth) }} 지 {{ data.paymentYear }}-{{ formatMonth(data.paymentMonth) }}
            <DxTextBox style="display: none" />
          </span>
          <span v-else style="padding: 4px">
            <span>선택</span>
            <DxTextBox style="display: none" />
          </span>
        </template>
        <template #item-data="{ data }">
          <span>귀 {{ data.imputedYear }}-{{ formatMonth(data.imputedMonth) }} 지 {{ data.paymentYear }}-{{ formatMonth(data.paymentMonth) }}</span>
        </template>
      </DxSelectBox>
      <span>로 부터 복사하여 새로 입력합니다.</span>
    </div>

    <div class="text-align-center mt-30">
      <button-basic class="button-form-modal" text="아니요" :width="140" type="default" mode="outlined" @onClick="setModalVisibleCopy" />
      <button-basic class="button-form-modal" text="네" :width="140" type="default" mode="contained" @onClick="actionCopy" />
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { companyId } from '@/helpers/commonFunction';
import DxSelectBox from 'devextreme-vue/select-box';
import DxTextBox from 'devextreme-vue/text-box';
import notification from '@/utils/notification';
import { useMutation, useQuery } from '@vue/apollo-composable';
import mutations from '@/graphql/mutations/PA/PA7/PA720/index';
import queries from '@/graphql/queries/PA/PA7/PA720/index';
import dayjs from 'dayjs';
export default defineComponent({
  props: {
    modalStatus: {
      type: Boolean,
    },
    month: {
      type: Number,
      default: 0,
    },
  },
  components: {
    DxSelectBox,
    DxTextBox,
  },
  setup(props, { emit }) {
    const store = useStore();
    const processKey = computed(() => store.state.common.processKeyPA510);
    const globalYear = computed(() => store.state.settings.globalYear);
    const dataApiCopy: any = ref({});
    const updateValue = (value: any) => {
      dataApiCopy.value = value.value;
      delete dataApiCopy.value.imputedYearMonth;
      delete dataApiCopy.value.incomeCount;
      delete dataApiCopy.value.__typename;
    };
    const month2 = ref<String>(`${processKey.value.imputedYear}-${processKey.value.imputedMonth}`);
    const modalCopy = ref(false);
    const paymentDayCopy = ref();
    const findIncomeProcessExtraStatViewsParam = computed(() => ({
      companyId: companyId,
      filter: { startImputedYearMonth: 202200, finishImputedYearMonth: +(month2.value.substring(0, 4) + `12`) },
    }));
    const findIncomeProcessExtraStatViewsTrigger = ref(true);
    const arrDataPoint = ref<[]>([]);
    const { mutate, onError, onDone } = useMutation(mutations.copyIncomeExtras);
    const {
      result: resultFindIncomeProcessExtraStatViews,
      loading: loadingFindIncomeProcessExtraStatViews,
      refetch: refetchFindIncomeProcessExtraStatViews,
    } = useQuery(queries.findIncomeProcessExtraStatViews, findIncomeProcessExtraStatViewsParam, () => ({
      enabled: findIncomeProcessExtraStatViewsTrigger.value,
      fetchPolicy: 'no-cache',
    }));
    // watch
    watch(resultFindIncomeProcessExtraStatViews, (value) => {
      findIncomeProcessExtraStatViewsTrigger.value = false;
      arrDataPoint.value = value.findIncomeProcessExtraStatViews;
    });
    onError((res) => {
      notification('error', res.message);
    });
    onDone((res) => {
      setModalVisible();
      setModalVisibleCopy();
      notification('success', ` 완료!`);
      emit('loadingTableInfo', true);
    });

    const setModalVisible = () => {
      emit('closePopup', false);
    };
    const setModalVisibleCopy = () => {
      modalCopy.value = false;
    };

    const onSubmit = () => {
      emit('dataAddIncomeProcess', {
        imputedYear: processKey.value.imputedYear,
        imputedMonth: props.month,
        paymentYear: parseInt(month2.value.split('-')[0]),
        paymentMonth: parseInt(month2.value.split('-')[1]),
      });
      emit('closePopup', false);
    };

    const openModalCopy = () => {
      modalCopy.value = true;
    };
    const actionCopy = () => {
      if (dataApiCopy.value.imputedYear) {
        mutate({
          companyId: companyId,
          source: dataApiCopy.value,
          target: {
            imputedYear: processKey.value.imputedYear,
            imputedMonth: props.month,
            paymentYear: parseInt(month2.value.split('-')[0]),
            paymentMonth: parseInt(month2.value.split('-')[1]),
          },
        });
      } else {
        notification('error', '날짜를 선택하세요.');
      }
    };
    const formatMonth = (month: number) => {
      if (month < 10) {
        return '0' + month;
      }
      return month;
    };

    return {
      processKey,
      modalCopy,
      paymentDayCopy,
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

.mt-30 {
  margin-top: 30px;
}

.text-align-center {
  text-align: center;
}

.button-form-modal {
  margin: 0px 5px;
}

::v-deep label {
  width: 100px;
}

::v-deep .month-custom-1 {
  background-color: #a6a6a6;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: white;

  .dp__input {
    color: white;
    padding: 0px;
    border: none;
    height: 30px;
    background-color: #a6a6a6;
  }

  .dp__icon {
    display: none;
  }
}

::v-deep .month-custom-2 {
  background-color: black;
  padding-left: 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: white;

  .dp__input {
    color: white;
    padding: 0px;
    border: none;
    height: 30px;
    background-color: black;
  }

  .dp__icon {
    display: none;
  }
}
</style>