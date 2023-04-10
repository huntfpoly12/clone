<template>
  <a-modal :visible="isModalDelete" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
    :width="644">
    <standard-form action="" name="request-file-630">
      <div class="text-align-center mt-10">

        <div class="cmc121-popup-comfirm-delete">
          본 회계연도 내 연계된 통장, 거래, 전표, 결의서 내역이 있다면 삭제불가하며, 삭제한 후 복구불가합니다. 그래도 삭제하시겠습니까?
        </div>
        <button-basic class="button-form-modal" :text="'아니요'" :width="140" :type="'default'" :mode="'outlined'" @onClick="cancel" />
        <button-basic class="button-form-modal" :text="'네. 삭제합니다'" :width="140" :type="'default'" :mode="'contained'" @onClick="submit" />
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue'
import { FacilityBizType, BankType } from "@bankda/jangbuda-common";
export default defineComponent({
  props: {
    isModalDelete: {
      type: Boolean,
      default: false,
    },
  },
  components: {
  },

  setup(props, { emit }) {
    const setModalVisible = () => {
      emit("closePopup", false)
    };
    const cancel = () => {
      emit("closePopup", false)
    };
    const submit = () => {
      emit('agreeDeleteBankbook');
    }
    return {
      setModalVisible,
      submit,
      cancel
    }
  },
})
</script>

<style lang="scss" scoped>
.cmc121-popup-comfirm-delete {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.text-align-center {
  text-align: center;
}

.button-form-modal {
  margin: 0px 5px;
}
</style>
