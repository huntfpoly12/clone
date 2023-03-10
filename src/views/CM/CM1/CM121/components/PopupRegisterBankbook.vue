<template>
  <a-modal :visible="isModalRegister" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
    :width="644">
    <standard-form action="" name="request-file-630">
      <div class="text-align-center mt-10">

        <div class="cmc121-popup-from-select-data">
          <a-form-item>
            <select-box-common :arrSelect="facilityBizTypeCommon"
              v-model:valueInput="dataFrom.facilityBiz" displayeExpr="n" valueExpr="v" width="160px" />
          </a-form-item>
          <span>에</span>
          <a-form-item class="clr" label-align="left">
            <bank-select-box v-model:valueInput="dataFrom.type" width="160px" />
          </a-form-item>
          <span>통장 등록하시겠습니까?</span>
        </div>
        <button-basic class="button-form-modal" :text="'아니요'" :width="140" :type="'default'" :mode="'outlined'" @onClick="cancel" />
        <button-basic class="button-form-modal" :text="'네. 발송합니다'" :width="140" :type="'default'" :mode="'contained'"
          :disabled="!dataFrom.facilityBiz || !dataFrom.type" @onClick="submit" />
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue'
import { FacilityBizType, BankType } from "@bankda/jangbuda-common";
export default defineComponent({
  props: {
    isModalRegister: {
      type: Boolean,
      default: false,
    },
  },
  components: {
  },

  setup(props, { emit }) {
    const dataFrom = reactive({
      facilityBiz: null,
      type: null,
    })
    let facilityBizTypeCommon = ref()
    let bankTypeCommon = ref()
    facilityBizTypeCommon.value = FacilityBizType.all();
    bankTypeCommon.value = BankType.all();
    console.log('facilityBizTypeCommon.value', facilityBizTypeCommon.value);

    const setModalVisible = () => {
      emit("closePopup", false)
    };
    const cancel = () => {
      dataFrom.facilityBiz = null
      dataFrom.type = null
      emit("closePopup", false)
    };
    const submit = () => {
      emit('dataRegisterBankbook', dataFrom);
    }
    return {
      setModalVisible,
      submit,
      facilityBizTypeCommon,
      bankTypeCommon,
      dataFrom,
      cancel
    }
  },
})
</script>

<style lang="scss" scoped>
.cmc121-popup-from-select-data {
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
