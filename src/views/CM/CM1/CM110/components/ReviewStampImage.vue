<template>
  <div>
    <a-modal
      :visible="modalStatus"
      title="직인자동생성"
      @cancel="setModalVisible()"
    >
      <div class="stamp-image-content">
        <a-row type="flex" justify="space-around" align="middle">
          <a-col :span="24">
            <div class="stamp-child">
              <div class="stamp-text-note">
                <InfoCircleFilled />
                <a-typography-text>
                  직인에 인쇄될 상호를 입력하신 후 <br />미리보기 버튼을
                  누르세요.
                </a-typography-text>
              </div>
            </div>

            <div class="stamp-child">
              <a-input-group compact>
                <a-input
                  v-model:value="signature"
                  placeholder="2~15자 (특수문자불가)"
                  style="width: calc(100% - 260px)"
                  @change="validateCharacter"
                />
                <a-button type="primary" :disabled="disabledBtnPreview"
                  >미리보기</a-button
                >
              </a-input-group>
            </div>
            <div class="stamp-child">
              <a-image :width="300" :src="previewImage" :preview="false" />
            </div>
            <div class="stamp-child">
              <a-button type="primary" class="btn-stamp">저장</a-button>
            </div>
          </a-col>
        </a-row>
      </div>
      <template #footer> </template>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent,watch } from "vue";
import { InfoCircleFilled } from "@ant-design/icons-vue";

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
    let previewImage: any = ref("https://lh3.googleusercontent.com/prAZ1xAiwE-JFPdZXqNlVc3jI8bZvh2etH5H_o2HvPYTzeWeG6NJL3WDIQfWKt-s80BDgCa2y-EKZY3SV-Phvz5tS5T82UY8ojtoCxIkGB2Okc6s1urH_zXZBXBR0s2Zzai_7I5u0JYo5g9uHP8zhEMrcNFLSvB4QEQ-4lMCSk3Pz9UL2TwYd5QMfqK-_D-4L8XOO_Q82_fNLhs3QwfUHppD9shcL7vOeZ-tsGFdAFtF7rqZDK2ILYNtmc9Y4AwHfBetqna09hP1yqmzH1uCsAulp4bdoZcFEOdSRL23uluUStQll1PnVzMSjIKbPLeykKahl_gT1DWuH3jp93Iky1X4iDNc9JMoHxedH36DZni6zcN0DQPzAgYVX5dqNkAI2JSs3qSppZmhN6UhS7fmct8wuN58mB_cEkODqd66KGNajIIZPtgiOQsx580gNn5_f-eRSvS0eJ-n2U1REYaqxWYKXZQE6ilK86IcRAZSZEOULewEH-lgILlm_mn-_Q6vFmn83YS3BuUrfIGUyc4l_sO4dY_Lrep1PCuiAuRlkpamfBj_Ln5qgciRhM3Vfsqsdiww-Ltx5e-5pWFffQ7FU9vZvrgFuQIlQBCQEwVLTssJGNrpF4r0spb6BNQ11ni98MzrD7Ky2Tv3M-D_RS5iuJMhJ96NnGnoVnhd_1n1v9tBhbEzonkckjZWNIy_2hO6ddSp8BaYAKPF_lmsu9kC7pfwAM6VSJ7u4Ki4y6VtzYawjLAX643_aGkc4rH9S9kwGPkqJjtj5DXbnmKNyEOn1rLcHdihGDUaQxMggiLaphnIxchKKtuWWBC2RkBVKkss3XXMhaZjp8oyZDPOzarA6vk_dROFhlzPGCNVhRAWQRFmNZlIbQv3N4CJa5StQ-h4zi9cf2_VByBTtUb9e3-LhgC_mya8MLP9pTwcUzs=s686-no?authuser=0");
    let signature = ref("");
    let disabledBtnPreview = ref(true);
    watch( () => props.modalStatus, async (currentValue, oldValue) => {
        if(typeof currentValue !== "undefined"){
            previewImage.value = await getBase64(props.data.file.originFileObj);
        }
    });
    const setModalVisible = () => {
      emit("closePopup", false);
      previewImage.value = "https://lh3.googleusercontent.com/prAZ1xAiwE-JFPdZXqNlVc3jI8bZvh2etH5H_o2HvPYTzeWeG6NJL3WDIQfWKt-s80BDgCa2y-EKZY3SV-Phvz5tS5T82UY8ojtoCxIkGB2Okc6s1urH_zXZBXBR0s2Zzai_7I5u0JYo5g9uHP8zhEMrcNFLSvB4QEQ-4lMCSk3Pz9UL2TwYd5QMfqK-_D-4L8XOO_Q82_fNLhs3QwfUHppD9shcL7vOeZ-tsGFdAFtF7rqZDK2ILYNtmc9Y4AwHfBetqna09hP1yqmzH1uCsAulp4bdoZcFEOdSRL23uluUStQll1PnVzMSjIKbPLeykKahl_gT1DWuH3jp93Iky1X4iDNc9JMoHxedH36DZni6zcN0DQPzAgYVX5dqNkAI2JSs3qSppZmhN6UhS7fmct8wuN58mB_cEkODqd66KGNajIIZPtgiOQsx580gNn5_f-eRSvS0eJ-n2U1REYaqxWYKXZQE6ilK86IcRAZSZEOULewEH-lgILlm_mn-_Q6vFmn83YS3BuUrfIGUyc4l_sO4dY_Lrep1PCuiAuRlkpamfBj_Ln5qgciRhM3Vfsqsdiww-Ltx5e-5pWFffQ7FU9vZvrgFuQIlQBCQEwVLTssJGNrpF4r0spb6BNQ11ni98MzrD7Ky2Tv3M-D_RS5iuJMhJ96NnGnoVnhd_1n1v9tBhbEzonkckjZWNIy_2hO6ddSp8BaYAKPF_lmsu9kC7pfwAM6VSJ7u4Ki4y6VtzYawjLAX643_aGkc4rH9S9kwGPkqJjtj5DXbnmKNyEOn1rLcHdihGDUaQxMggiLaphnIxchKKtuWWBC2RkBVKkss3XXMhaZjp8oyZDPOzarA6vk_dROFhlzPGCNVhRAWQRFmNZlIbQv3N4CJa5StQ-h4zi9cf2_VByBTtUb9e3-LhgC_mya8MLP9pTwcUzs=s686-no?authuser=0";
      signature.value = '';
    };
    const validateCharacter = () => {
      var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      let countLength = signature.value.length;
      if (2 < countLength && countLength < 16 && !format.test(signature.value)) {
        disabledBtnPreview.value = false;
      } else {
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
  width: 150px;
}
.stamp-text-note {
  text-align: left;
  margin-left: 87px;
}
</style>