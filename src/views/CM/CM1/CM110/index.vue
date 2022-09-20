<template>
  <div id="cm-110" class="page-content">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="사업자">
        <a-row>
          <a-col :span="24">
            <div class="container">
              <a-form :model="formState" :label-col="labelCol">
                <h2 class="title-h2">사업자정보</h2>
                <a-row>
                  <a-col :span="12">
                    <a-form-item label="상호">
                      <a-input
                        v-model:value="formState.상호"
                        :disabled="true"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="8">
                    <a-form-item label="사업자유형">
                      <a-input
                        v-model:value="formState.사업자유형"
                        :disabled="true"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="8" justify="end">
                    <a-form-item label="사업자번호">
                      <a-input
                        v-model:value="formState.사업자번호"
                        :disabled="true"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="16">
                    <a-form-item label="주소" :wrapper-col="{ span: 24 }">
                      <a-input
                        v-model:value="formState.주소"
                        :disabled="true"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="10">
                    <a-row>
                      <a-col :span="15">
                        <a-form-item label="대표번호">
                          <a-input v-model:value="formState.대표번호" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="8">
                        <p class="validate-message">‘-’없이 숫자만 입력</p>
                      </a-col>
                    </a-row>
                  </a-col>
                  <a-col :span="12">
                    <a-row>
                      <a-col :span="12">
                        <a-form-item label="팩스번호">
                          <a-input v-model:value="formState.팩스번호" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="8">
                        <p class="validate-message">‘-’없이 숫자만 입력</p>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
                <h2 class="title-h2">직인등록</h2>
                <a-row>
                  <a-col :span="16">
                    <a-row>
                      <a-col :span="9" :xl="9">
                        <a-form-item label="직인(인감)">
                          <a-image
                            :width="200"
                            :src="previewImage"
                            :preview="false"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="14" :xl="14">
                        <div class="preview-image">
                          <a-row>
                            <a-col :span="5">
                              <a-button type="primary" @click="stampReview"
                                >직인자동생성</a-button
                              >
                            </a-col>
                            <a-col :span="16">
                              <InfoCircleFilled />
                              <a-typography-text>
                                직인 이미지를 자동으로 생성하여 등록합니다.
                              </a-typography-text>
                            </a-col>
                          </a-row>
                        </div>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="16">
                    <a-row>
                      <a-col :span="6" :offset="3" :xl="6">
                        <a-form-item label="">
                          <a-upload
                            v-model:file-list="fileList"
                            name="file"
                            :headers="headers"
                            @change="handleChange"
                            :multiple="false"
                            :showUploadList="false"
                            accept=".tiff,.png,.jpeg,.jpg"
                          >
                            <a-button class="btn-upload-image"
                              >직인업로드</a-button
                            >
                          </a-upload>
                        </a-form-item>
                      </a-col>
                      <a-col :span="14" :xl="14">
                        <InfoCircleFilled />
                        <a-typography-text>
                          이미지 사이즈 : 100 x 100 이하 / 파일크기 : 1M 이하 /
                          종류 : GIF, JPG, PNG
                        </a-typography-text>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
                <h2 class="title-h2">대표자정보</h2>
                <a-row>
                  <a-col :span="10">
                    <a-row>
                      <a-col :span="15">
                        <a-form-item label="대표자명">
                          <a-input v-model:value="formState.대표자명" />
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </a-col>
                  <a-col :span="12">
                    <a-row>
                      <a-col :span="12">
                        <a-form-item label="휴대폰">
                          <a-input v-model:value="formState.휴대폰" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="8">
                        <p class="validate-message">‘-’없이 숫자만 입력</p>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="8">
                    <a-form-item label="생년월일">
                      <a-input
                        v-model:value="formState.생년월일"
                        width="100%"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <p class="validate-message">
                      ‘-’없이 8자리 숫자로 입력하세요. ( 자릿수 : 연4 월2 일2 )
                    </p>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item label="이메일">
                      <a-input v-model:value="formState.이메일" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <p class="validate-message">
                      이메일 형식이 정확하지 않습니다.
                    </p>
                  </a-col>
                </a-row>
                <a-form-item :wrapper-col="{ span: 14, offset: 9 }">
                  <a-button type="primary" @click="onSubmit"
                    >그냥 나가기</a-button
                  >
                  <a-button style="margin-left: 10px">저장하고 나가기</a-button>
                </a-form-item>
              </a-form>
            </div>
          </a-col>
        </a-row>
        <ReviewStampImage
          :modalStatus="modalStampReviewStatus"
          @closePopup="modalStampReviewStatus = false"
          :data="fileImage"
        />
      </a-tab-pane>
      <a-tab-pane key="2" tab="이용자"> </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRaw, reactive } from "vue";
import type { UnwrapRef } from "vue";
import { InfoCircleFilled } from "@ant-design/icons-vue";
import ReviewStampImage from "./components/ReviewStampImage.vue";
interface FormState {
  상호: string;
  사업자유형: string;
  사업자번호: string;
  주소: string;
  대표번호: string;
  팩스번호: string;
  직인인감: string;
  대표자명: string;
  휴대폰: string;
  생년월일: string;
  이메일: string;
}

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default defineComponent({
  components: {
    InfoCircleFilled,
    ReviewStampImage,
  },
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      상호: "효사랑노인요양전문병원",
      사업자유형: "고객",
      사업자번호: "215-87-15485",
      주소: "효사랑노인요양전문병원",
      대표번호: "0428753658",
      팩스번호: "0428743651",
      직인인감:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      대표자명: "홍길동",
      휴대폰: "01056898845",
      생년월일: "예) 19801231",
      이메일: "bankda.jangbuda@gmail.com",
    });

    let previewImage: any = ref("/public/images/demo-image.jpg");
    let fileImage: any = ref(null);
    let modalStampReviewStatus: any = ref();

    const handleChange = async (info: any) => {
      if (info.file.status !== "uploading") {
        previewImage.value = await getBase64(info.file.originFileObj);
        fileImage.value = info;
      }

      if (info.file.status === "done") {
        //message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        //console.log(info.file);
        //message.error(`${info.file.name} file upload failed.`);
      }
    };

    const stampReview = () => {
      if (fileImage.value !== null) {
        modalStampReviewStatus.value = true;
      }
    };

    const fileList = ref([]);
    const onSubmit = () => {
      console.log("submit!", toRaw(formState));
    };
    return {
      labelCol: { style: { width: "150px" } },
      formState,
      onSubmit,
      activeKey: ref("1"),
      fileList,
      headers: {
        authorization: "authorization-text",
      },
      handleChange,
      previewImage,
      stampReview,
      modalStampReviewStatus,
      fileImage,
    };
  },
});
</script>
<style scoped>
.container {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding-right: 10px;
  padding-left: 10px;
}

.title-h2 {
  margin-left: 1%;
}

.validate-message {
  margin-left: 2%;
  color: #c3baba;
}

.btn-upload-image {
  width: 200px;
  margin-left: 17px;
}
</style>
  