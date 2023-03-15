<template>
  <a-modal :visible="isModalLastScrapingStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
    :width="644" >
    <template #title>
      <div>
        <span>최종 스크래핑 현황 조회 </span><b>{{data?.bankbookNickname || ''}}</b>
      </div>
    </template>
      <div class="text-align-center">
        <div class="mc121-popup-last-scraping-status">
          <a-form-item label="스크래핑 상태" class="mc121-popup-last-scraping-status-from">
            <default-text-box :required="true" :width="200" v-model:valueInput="data.lastScrapingStatus.scrapingStatus" :disabled="true"/>
          </a-form-item>
          <a-form-item label="최종 스크래핑 일시" label-align="right"  class="mc121-popup-last-scraping-status-from">
              <div style="width: 200px">
                  <date-time-box v-model:valueDate="data.lastScrapingStatus.lastScrapingDate" :disabled="true"/>
              </div>
          </a-form-item>
        </div>
        <div class="mt-20 mc121-popup-action">
          <button-basic class="button-form-modal" :text="'정상'" :width="140" :type="'success'" :mode="'contained'" />
          <span class="mc121-popup-slash">/</span>
          <a-tooltip>
            <template #title>{{ data.lastScrapingStatus.errorMessage }}</template>
            <span>
              <DxButton text="에러" width="140" type="danger" styling-mode="contained" :height="$config_styles.HeightInput"/>
            </span>
          </a-tooltip>
        </div>
      </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue'
import DxButton from 'devextreme-vue/button';
export default defineComponent({
  props: {
    isModalLastScrapingStatus: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    DxButton
  },
  setup(props, { emit }) {
    const setModalVisible = () => {
      emit("closePopup", false)
    };
    return {
      setModalVisible
    }
  },
})
</script>

<style lang="scss" scoped>
.cmc121-popup-last-scraping-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  &-btn {
    margin-top: 20px;
  }
}
.mt-20 {
  margin-top: 20px;
}
.text-align-center {
  text-align: center;
}

.button-form-modal {
  margin: 0px 5px;
}
:deep .mc121-popup-last-scraping-status-from {
  label {
    width: 200px;
  }
}
.mc121-popup-action {
  display: flex;
  align-items: center;
  justify-content: center;
}
.mc121-popup-slash {
  font-weight: 400;
  font-size: 30px;
  line-height: 30px;
  margin: 0 10px 5px 10px;
}
</style>
