<template>
  <div class="container">
    <a-row :gutter="[0, 12]">
      <a-col :span="24" class="d-flex-center justify-content-end">
        <a-form-item label="결제예정일자">
          <date-time-box width="200px" v-model:value-date="date"/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="전체 사업자 수">
          <default-text-box width="200px"/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="청구금액 (합계)">
          <default-text-box width="200px"/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="당월 사업자 수">
          <default-text-box width="200px"/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="청구금액 (당월)">
          <default-text-box width="200px"/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="연체 사업자 수">
          <default-text-box width="200px"/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="청구금액 (연체)">
          <default-text-box width="200px"/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="선납 사업자 수">
          <default-text-box width="200px"/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="청구금액 (선납)">
          <default-text-box width="200px"/>
        </a-form-item>
      </a-col>
      <a-col :span="12"></a-col>
    </a-row>
    <div class="note">
      <div>출금자료등록시 CMS 출금상태는 아래와 같이 변경됩니다.</div>
      <div>청구금액 > 0 : 출금신청</div>
      <div>청구금액 = 0 : 출금제외</div>
      <br>
      <div>출금자료 등록하시겠습니까?</div>
    </div>
  </div>

</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { ref } from "vue";

const date = ref<string>(dayjs().format("YYYYMMDD"));
</script>

<style lang="scss" scoped>
.container {
  width: 800px;
  margin: 0 auto;
  .note {
    padding-left: 50px;
  }
}

:deep(.ant-form-item-label) {
  label {
    width: 120px;
  }
}

</style>
