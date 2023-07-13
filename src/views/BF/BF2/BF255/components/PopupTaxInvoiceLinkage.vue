<template>
  <a-modal :visible="isModalTaxInvoiceLinkage" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="700">
    <standard-form action="">
      <div class="bf-255-popup-taxInvoiceLinkage">
        <div class="bf-255-popup-taxInvoiceLinkage-filter">
          <a-row>
            <a-col :span="24">작성일자</a-col>
            <a-col :span="8" :offset="3">
              <radio-group :arrayValue="[
                  { id: 1, text: '일괄적용' },
                  { id: 2, text: '결제일자' },
              ]" layoutCustom="horizontal" />
            </a-col>
            <a-col :span="8"><date-time-box/></a-col>
            <a-col :span="24">선택된 내역</a-col>
            <a-col :span="21" :offset="3" class="bf-255-popup-taxInvoiceLinkage-filter-input">
              <a-form-item label="세금계산서 연계 X">
								<default-text-box width="150px" />
							</a-form-item>
							<a-tooltip placement="top" color="black" class="fz-10 ml-10 mb-5">
								<template #title>이미 세금계산서 연계되었던 적이 있는 내역</template>
								<img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px" class="mr-5" />
							</a-tooltip>
            </a-col>
            <a-col :span="21" :offset="3" class="bf-255-popup-taxInvoiceLinkage-filter-input">
              <a-form-item label="세금계산서 연계 O">
								<default-text-box width="150px" />
							</a-form-item>
							<a-tooltip placement="top" color="black" class="fz-10 ml-10 mb-5">
								<template #title>이미 세금계산서 연계되었던 적이 없는 내역</template>
								<img src="@/assets/images/iconInfoGray.png" alt="" style="width: 15px" class="mr-5" />
							</a-tooltip>
            </a-col>
            <a-col :span="21" :offset="3" class="bf-255-popup-taxInvoiceLinkage-filter-input">
              <a-form-item label="합계">
								<default-text-box width="150px" />
							</a-form-item>
            </a-col>
            <a-col :span="21" :offset="3" class="bf-255-popup-taxInvoiceLinkage-filter-note">
              <p>선택된 내역의 세금계산서 연계 파일 다운로드하시겠습니까?</p>
              <p>※ 환급이기에 마이너스 세금계산서가 작성됩니다.</p>
              <p>※ 세금계산서 연계 파일 다운로드시 선택된 내역들의 [세금계산서 연계] 컬럼은 O 로 변경됩니다.</p>
            </a-col>
          </a-row>
        </div>
        <div class="bf-255-popup-taxInvoiceLinkage-buttons">
          <button-basic class="button-form-modal" :text="'아니요'" :width="80" :type="'default'" :mode="'outlined'"
            @onClick="cancel" />
          <button-basic class="button-form-modal" :text="'네. 환급신청 등록합니다'" :width="180" :type="'default'" :mode="'contained'"
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
    isModalTaxInvoiceLinkage: {
      type: Boolean,
      default: false,
    },
  },
  components: {
  },

  setup(props, { emit }) {
    const cancel = () => {
      emit("closePopup", false)
    };
    const submit = () => {
      emit("submit")
    }
    return {
      submit,
      cancel
    }
  },
})
</script>

<style lang="scss" scoped>
.bf-255-popup-taxInvoiceLinkage {
  &-text {
    display: flex;
    align-items: center;
    justify-content: center;
    &-label {
      color: red;
    }
  }
  &-filter {
    &-input {
      display: flex;
      align-items: center;
      
    }
    &-note {
      margin-top: 15px;
      p {
        margin: 0;
      }
    }
  }
  &-buttons{ 
    margin-top: 10px;
    text-align: center;
  }
}

.button-form-modal {
  margin: 0px 5px;
}

.mr-10 {
  margin-right: 10px;
}
::v-deep .ant-form-item-label {
  width: 100px !important;
  text-align: left;
  margin-right: 20px;
}
</style>
