<template>
  <a-modal :visible="isModalSlipRegistrationSelected" @cancel="cancel" :mask-closable="false" class="confirm-md" footer=""
    :width="644">
    <standard-form action="">
      <div class="ac-110-popup-registrantion-selected text-align-center mt-10">
        <div class="ac-110-popup-registrantion-selected-form">
          <a-row>
            <a-col span="12" class="ac-110-popup-registrantion-selected-form-input">
              <a-form-item label="선택된 통장내역">
                <default-text-box :width="50" height="25" :readOnly="true" :valueInput="propListSlipRegistrationSelected.count"/>
              </a-form-item>
              <span class="mr-10">건</span>
            </a-col>
            <a-col span="12" class="ac-110-popup-registrantion-selected-form-input">
              <a-form-item label="대상 거래내역">
                <default-text-box :width="50" height="25" :readOnly="true" :valueInput="totalBankbookCount"/>
              </a-form-item>
              <span class="mr-10">건</span>
            </a-col>
          </a-row>

          <p class="mt-10">상기와 같이 전표등록하시겠습니까? </p>
        </div>
        <div class="mt-10">
          <button-basic class="button-form-modal" :text="'아니요'" :width="140" :type="'default'" :mode="'outlined'"
            @onClick="cancel" />
          <button-basic class="button-form-modal" :text="'네. 등록합니다'" :width="140" :type="'default'" :mode="'contained'"
            @onClick="submit" />
        </div>
      </div>
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue'
export default defineComponent({
  props: {
    isModalSlipRegistrationSelected: {
      type: Boolean,
      default: false,
    },
    propListSlipRegistrationSelected: {
      type: Object,
      default: () => ({
        count: 0,
        selectedRowKeys: []
      })
    }
  },
  components: {
  },

  setup(props, { emit }) {
    let totalBankbookCount: any = ref(0)
    const cancel = () => {
      emit("closePopup", false)
    };
    const submit = () => {
      emit("submit")
    }
    watch(() => props.propListSlipRegistrationSelected.selectedRowKeys, (value) => {
      totalBankbookCount.value = 0
      value.forEach((count: any) => totalBankbookCount.value += count)
    })
    return {
      submit,
      cancel,
      totalBankbookCount
    }
  },
})
</script>

<style lang="scss" scoped>
.ac-110-popup-registrantion-selected {
  &-form {
    &-input {
      display: flex;
      align-items: center;
      span {
        margin-left: 2px;
      }
    }
  }
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

.mt-10 {
  margin-top: 10px;
}
</style>
