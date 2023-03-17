<template>
  <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer="" :width="500">
    <standard-form action="" name="delete-510">
      <div class="custom-modal-delete">
        <img src="@/assets/images/icon_delete.png" alt="" style="width: 30px" />
        <span v-if="data.incomeIds.length">선택된 내역({{ data.incomeIds.length }}건) 삭제합니다. 그래도 진행하시겠습니까?</span>
        <span v-else>항목을 하나 선택해야합니다</span>
      </div>
      <div class="text-align-center mt-30">
        <button-basic class="button-form-modal" text="아니요" type="default" mode="outlined" @onClick="setModalVisible" />
        <button-basic class="button-form-modal" text="네. 삭제합니다" :width="140" type="default" mode="contained" @onClick="onSubmit" />
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import notification from '@/utils/notification';
import { useMutation } from '@vue/apollo-composable';
import mutations from '@/graphql/mutations/PA/PA7/PA720/index';
import { Message } from '@/configs/enum';
export default defineComponent({
  props: {
    modalStatus: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: {},
    },
  },
  components: {},
  setup(props, { emit }) {
    const messageDel = Message.getMessage('COMMON', '404').message;
    const setModalVisible = () => {
      emit('closePopup', false);
    };
    const { mutate: onDelIncomeExtras, onDone: onDoneDeleteIncomeExtras, onError: onErorDeleteIncomeExtras } = useMutation(mutations.deleteIncomeExtras);
    onDoneDeleteIncomeExtras((e) => {
      setModalVisible();
      notification('success', messageDel);
      emit('delDone')
    });

    const onSubmit = (e: any) => {
      onDelIncomeExtras({
        ...props.data,
      });
    };
    return {
      setModalVisible,
      onSubmit,
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
</style>