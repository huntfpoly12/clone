<template>
  <a-modal :visible="isOpenAddModal" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
    width="30%">
    <standard-form action="" name="delete-510">
      <a-row class="mt-20">
        <h3 class="text-center">
          후원금 전용계좌정보
        </h3>
        <a-col span="24">
          <div class="input-group">
            <div class="input-label mt-10">후원자: </div>
            <div class="input-text">
              <div class="d-flex-center mt-10" v-for="(item, index) in inputArr">
                <default-text-box width="130px" v-model:valueInput="item.type" :required="true" />
                <default-text-box width="130px" v-model:valueInput="item.bankbookNumber" :required="true" />
                <default-text-box width="130px" v-model:valueInput="item.owner" :required="true" />
                <a-tooltip placement="top" class="custom-tooltip" zIndex="1000" v-if="inputArr.length - 1 == index">
                  <template #title>
                    <div>
                      후원자 등록
                    </div>
                  </template>
                  <div style="text-align: center;">
                    <DxButton icon="plus" @click="onAddnewBtn(index)" />
                  </div>
                </a-tooltip>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row justify="center" class="mt-20">
        <button-basic class="button-form-modal" text="네. 삭제합니다" :width="140" type="default" mode="contained"
          @onClick="onSubmit" />
      </a-row>
    </standard-form>
  </a-modal>
  <a-modal :visible="!isOpenAddModal" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
    width="30%">
    <standard-form action="" name="delete-510">
      <a-row justify="center" class="mt-20 gap-10">
        <a-form-item label="공통사항" label-align="right" class="red">
          <radio-group :arrayValue="addDetailRadio" v-model:valueRadioCheck="formState.addDetail"
            layoutCustom="horizontal" class="mt-1"></radio-group>
        </a-form-item>
        <div class="text-center">
          내역을 등록하시겠습니까?
        </div>
      </a-row>
      <a-row justify="center" class="mt-20 gap-10">
        <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
          @onClick="setModalVisible" />
        <button-basic class="button-form-modal" :text="'네. 출력합니다'" :width="140" :type="'default'" :mode="'contained'"
          @onClick="onSubmit2" />
      </a-row>
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import {
  addDetailRadio, productionStatusesCheckbox, nationaPersionSelectbox, healthInsuranceSelectbox,
  includeDependentsSelectbox,
} from "../utils/index";
import notification from '@/utils/notification';
import { useMutation } from '@vue/apollo-composable';
import mutations from '@/graphql/mutations/PA/PA7/PA720/index';
import { Message } from '@/configs/enum';
import dayjs from 'dayjs';
import DxButton from "devextreme-vue/button";
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
export default defineComponent({
  // props: {
  // },
  components: { DxButton },
  setup(props, { emit }) {
    const isOpenAddModal = ref(true);
    const messageDel = Message.getMessage('COMMON', '402').message;
    const formState = reactive({
      healthInsuranceAcquisitionCode: 1,
      type: 'type',
      bankbookNumber: 'bankbookNumber',
      owner: 'owner',
      addDetail: 0,
    })
    const setModalVisible = () => {
      emit('onCreateModal', false);
    };
    const store = useStore();
    const dataStateAC580 = computed(() => store.state.common.dataStateAC580);
    // const { mutate: onDelIncomeExtras, onDone: onDoneDeleteIncomeExtras, onError: onErorDeleteIncomeExtras } = useMutation(mutations.deleteIncomeExtras);
    // onDoneDeleteIncomeExtras((e) => {
    //   setModalVisible();
    //   notification('success', messageDel);
    //   emit('delDone')
    // });

    const inputArr = ref([{
      id: 1,
      type: 'type',
      bankbookNumber: 'bankbookNumber',
      owner: 'owner',
    }]);
    const onAddnewBtn = (index: any) => {
      inputArr.value.splice(index + 1, 0, {
        id: index + 2, type: 'type',
        bankbookNumber: 'bankbookNumber',
        owner: 'owner',
      });
    }
    const onSubmit = (e: any) => {
      // onDelIncomeExtras({
      //   ...props.data,
      // });
      // emit('onCreateModal', true);
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        isOpenAddModal.value = false;
      }
    };
    const onSubmit2 = (e: any) => {
      // onDelIncomeExtras({
      //   ...props.data,
      // });
      // emit('onCreateModal', true);
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        // isOpenAddModal.value = false;
        dataStateAC580.value.tableType = formState.addDetail == 0 ? 3 : 4;
        emit('onCreateModal', true);
      }
    };
    return {
      setModalVisible,
      onSubmit, onAddnewBtn, inputArr, isOpenAddModal,
      healthInsuranceSelectbox, formState,
      addDetailRadio, onSubmit2,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-text {
  display: flex;
  align-items: center;
  column-gap: 10px;
  flex-wrap: wrap;
  flex: 1;

  span {
    margin-left: 10px;
  }
}

:deep .ant-form-item-label>label {
  width: 70px;
}

:deep .dx-button-has-icon {
  margin-left: 5px;

  .dx-button-content {
    padding: 4px;
  }
}

.input-group {
  display: flex;
  align-items: center;
  column-gap: 10px;
  flex-wrap: nowrap;

  .d-flex-center {
    column-gap: 10px;
  }

  .input-label {
    flex: 1 1 40%;
    align-self: flex-start;
  }
}

.gap-10 {
  column-gap: 10px;
}

.text-center {
  flex-basis: 100%;
}
</style>