<template>
  <div>
    <a-modal :visible="modalStatus" title="직인자동생성" @cancel="setModalVisible()" :mask-closable="false" width="400px">
      <div class="stamp-image-content">
        <div class="stamp-child">
          <div class="stamp-text-note">
            <div style="font-size: 16px;margin-right: 5px;">
              <InfoCircleFilled />
            </div>
            <div>
              <a-typography-text>
                직인에 인쇄될 상호를 입력하신 후 <br />미리보기 버튼을
                누르세요.
              </a-typography-text>
            </div>
          </div>
        </div>

        <div class="stamp-child">
          <a-input-group compact>
            <a-input v-model:value="signature" placeholder="2~15자 (특수문자불가)" style="width: calc(100% - 128px)"
              @change="validateCharacter" :maxlength="15"/>
            <a-button type="primary" :disabled="disabledBtnPreview">미리보기</a-button>
          </a-input-group>
        </div>
        <div class="stamp-child">
          <a-image :width="312" :src="previewImage" :preview="false" />
        </div>
        <div class="stamp-child">
          <a-button type="primary" class="btn-stamp">저장</a-button>
        </div>

      </div>
      <template #footer> </template>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import { InfoCircleFilled } from "@ant-design/icons-vue";
import { AnyRecord } from "dns";

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default defineComponent({
  props: ["modalStatus", "data"],
  components: {
    InfoCircleFilled,
  },
  setup(props, { emit }) {
    let previewImage: any = ref("https://trello.com/1/cards/63284173f2296b003fcff931/attachments/632bd4d27b65f901c650875f/previews/632bd4d37b65f901c65087c2/download/%EC%98%A8%EB%9D%BC%EC%9D%B8%EB%8F%84%EC%9E%A5-%EC%BD%94%EB%B9%97%EC%86%8C%ED%94%84%ED%8A%B8.png");
    let signature = ref("");
    let disabledBtnPreview = ref(true);
    watch(() => props.modalStatus, async (currentValue, oldValue) => {
      if (typeof currentValue !== "undefined") {
        previewImage.value = await getBase64(props.data.file.originFileObj);
      }
    });
    const setModalVisible = () => {
      emit("closePopup", false);
      previewImage.value = "https://trello.com/1/cards/63284173f2296b003fcff931/attachments/632bd4d27b65f901c650875f/previews/632bd4d37b65f901c65087c2/download/%EC%98%A8%EB%9D%BC%EC%9D%B8%EB%8F%84%EC%9E%A5-%EC%BD%94%EB%B9%97%EC%86%8C%ED%94%84%ED%8A%B8.png";
      signature.value = '';
    };
    const validateCharacter = (e: any) => {
      var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    
      let countLength = signature.value.length;
      if (2 < countLength && countLength < 16 && !format.test(signature.value)) {
        disabledBtnPreview.value = false;
      } else {
        signature.value = e.target.value.replace(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g, '')
        disabledBtnPreview.value = true;
      }
    };

    return {
      setModalVisible,
      previewImage,
      signature,
      validateCharacter,
      disabledBtnPreview
    };
  },
});
</script> 

<style scoped>
.stamp-image-content {
  text-align: center;
}

.stamp-child {
  margin-bottom: 10px;
}

.btn-stamp {
  width: 160px;
}

.stamp-text-note {
  text-align: left;
  margin-left: 3px;
  display: flex;
}
</style>