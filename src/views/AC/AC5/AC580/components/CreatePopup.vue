<template>
  <a-modal :visible="true" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer="" width="36%">
    <standard-form action="" name="delete-510">
      <a-row class="mt-20">
        <a-col class="ml-20">
          <a-form-item label="후원자" label-align="right">
            <div class="input-text">
              <select-box-common :arrSelect="healthInsuranceSelectbox" :required="true"
                v-model:valueInput="formState.healthInsuranceAcquisitionCode" />
              <span style="font-size: 12px; color: #888888" class="mt-5">
                <img src="@/assets/images/iconInfo.png" style="width: 14px" class="mr-5" />기부금영수증 발행 가능한 후원자만 조회됩니다.
              </span>
            </div>
          </a-form-item>
        </a-col>
        <a-col class="ml-20 mt-10">
          <a-form-item label="발행기간">
            <range-date-time-box v-model:valueDate="rangeDate" width="250px" :multi-calendars="true" />
          </a-form-item>
        </a-col>
      </a-row>
      <div class="text-center mt-10">상기 내용으로 기부금영수증 발행하시겠습니까?</div>
      <div class="text-align-center mt-30">
        <button-basic class="button-form-modal" text="아니요" type="default" mode="outlined" @onClick="setModalVisible" />
        <button-basic class="button-form-modal" text="네. 삭제합니다" :width="140" type="default" mode="contained"
          @onClick="onSubmit" />
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import {
  employeeFashionArr, productionStatusesCheckbox, nationaPersionSelectbox, healthInsuranceSelectbox,
  includeDependentsSelectbox,
} from "../utils/index";
import notification from '@/utils/notification';
import { useMutation } from '@vue/apollo-composable';
import mutations from '@/graphql/mutations/PA/PA7/PA720/index';
import { Message } from '@/configs/enum';
import dayjs from 'dayjs';
export default defineComponent({
  // props: {
  // },
  components: {},
  setup(props, { emit }) {
    const messageDel = Message.getMessage('COMMON', '402').message;
    const formState = reactive({
      healthInsuranceAcquisitionCode: 1,
    })
    const rangeDate: any = ref([parseInt(dayjs().subtract(1, 'week').format('YYYYMMDD')), parseInt(dayjs().format('YYYYMMDD'))]);
    const setModalVisible = () => {
      emit('onCreateModal', false);
    };
    // const { mutate: onDelIncomeExtras, onDone: onDoneDeleteIncomeExtras, onError: onErorDeleteIncomeExtras } = useMutation(mutations.deleteIncomeExtras);
    // onDoneDeleteIncomeExtras((e) => {
    //   setModalVisible();
    //   notification('success', messageDel);
    //   emit('delDone')
    // });

    const onSubmit = (e: any) => {
      // onDelIncomeExtras({
      //   ...props.data,
      // });
      emit('onCreateModal', true);
    };
    return {
      setModalVisible,
      onSubmit,
      healthInsuranceSelectbox, formState, rangeDate
    };
  },
});
</script>

<style lang="scss" scoped>
.input-text {
  display: flex;
  align-items: center;

  span {
    margin-left: 10px;
  }
}

:deep .ant-form-item-label>label {
  width: 70px;
}
</style>