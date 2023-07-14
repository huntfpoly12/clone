<template>
  <a-modal :visible="isModalLastScrapingStatus" @cancel="setModalVisible" :mask-closable="true" :closable="false"
    class="confirm-md" footer="" :width="644">
    <template #title>
      <div>
        <span>최종 스크래핑 현황 조회 </span><b>{{ data?.bankbookNickname || '' }}</b>
      </div>
    </template>
    <div class="text-align-center">
      <div class="mc121-popup-last-scraping-status">
        <a-form-item label="스크래핑 상태" class="mc121-popup-last-scraping-status-from">
          <a-tooltip v-if="!!data.lastScrapingStatus?.errorMessage" >
            <template #title>{{ data.lastScrapingStatus?.errorMessage }}</template>
            <div class="mc121-popup-last-scraping-status-from-tagError">에러
            </div>
          </a-tooltip>
          <div v-else class="mc121-popup-last-scraping-status-from-tagSussce">
            정상
          </div>
        </a-form-item>
        <a-form-item label="최종 스크래핑 일시" label-align="right" class="mc121-popup-last-scraping-status-from">
          <div style="width: 200px">
            <default-text-box :width="200" :valueInput="fomatDate(data.lastScrapingStatus?.lastScrapingDate)"
              :disabled="true" />
          </div>
        </a-form-item>
      </div>
      <div class="mt-20 mc121-popup-action">
        <button-basic class="button-form-modal" :text="'닫기'" :width="140" :type="'default'" :mode="'contained'"
          @onClick="setModalVisible" />
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DxButton from 'devextreme-vue/button';
import dayjs from 'dayjs';
export default defineComponent({
  props: {
    isModalLastScrapingStatus: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => { },
    },
  },
  components: {
    DxButton
  },
  setup(props, { emit }) {
    const setModalVisible = () => {
      emit("closePopup", false)
    };

    const fomatDate = (date: any) => {
      if (typeof date == 'number') {
        return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return ''
      }
    }
    return {
      setModalVisible,
      fomatDate
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

  &-tagSussce {
    width: 100px;
    height: 28px;
    line-height: 28px;
    background-color: #337614;
    color: #fff;
    border-radius: 5px;
  }
  &-tagError {
    width: 100px;
    height: 28px;
    line-height: 28px;
    background-color: #bb3835;
    color: #fff;
    border-radius: 5px;
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
