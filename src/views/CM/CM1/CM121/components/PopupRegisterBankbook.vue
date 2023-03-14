<template>
  <a-modal :visible="isModalRegister" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
    :width="644">
    <standard-form action="" name="request-file-630">
      <div class="text-align-center mt-10">

        <div class="cmc121-popup-from-select-data">
          <a-form-item class="mr-10">
            <select-box-common :arrSelect="facilityBizTypeCommon"
              v-model:valueInput="dataFrom.facilityBiz" displayeExpr="n" valueExpr="v" width="160px" placeholder="사업유형 선택"/>
          </a-form-item>
          <span class="mr-10">에</span>
          <a-form-item class="clr mr-10" label-align="left">
            <bank-select-box v-model:valueInput="dataFrom.type" width="160px" />
          </a-form-item>
          <span>통장 등록하시겠습니까?</span>
        </div>
        <button-basic class="button-form-modal" :text="'아니요'" :width="140" :type="'default'" :mode="'outlined'" @onClick="cancel" />
        <button-basic class="button-form-modal" :text="'네.  등록합니다'" :width="140" :type="'default'" :mode="'contained'"
          :disabled="!dataFrom.facilityBiz || !dataFrom.type" @onClick="submit" />
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue'
import { FacilityBizType, BankType } from "@bankda/jangbuda-common";
import notification from "@/utils/notification";
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
    

    const setModalVisible = () => {
      emit("closePopup", false)
    };
    const cancel = () => {
      dataFrom.facilityBiz = null
      dataFrom.type = null
      emit("closePopup", false)
    };
    const submit = () => {
      const bankTypeSelected:any = bankTypeCommon.value.find((item: any) => item.c == dataFrom.type)
      if(!bankTypeSelected.coporateScrapable && !bankTypeSelected.privateScrapable) {
        notification('error', `${bankTypeSelected.n} 은 등록 불가능한 은행입니다. 다른 은행을 선택하세요`)
      }else {
        emit('dataRegisterBankbook', dataFrom);
      }
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
  justify-content: center;
  align-items: center;
  width: 100%;
  font-weight: bold;
}

.text-align-center {
  text-align: center;
}

.button-form-modal {
  margin: 0px 5px;
}
.mr-10 {
  margin-right: 10px;
}
</style>
