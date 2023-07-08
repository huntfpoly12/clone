<template>
  <a-modal v-bind="$props" footer="" :closable="false" width="600px">
    <div class="d-flex-center justify-content-center gap-10 mb-10">
      <span>청구연월</span>
      <month-picker-box v-model="month" width="100px"/>
      <span class="text-red">사업자코드(상호)</span>
      <select-box-common :arr-select="[]" placeholder="선택"/>
    </div>
    <div class="text-center mb-20">개별청구  등록하시겠습니까?</div>
    <div class="d-flex-center justify-content-center gap-10">
      <button-basic class="button-form-modal" text="아니요" type="default" :mode="'outlined'"
                    @onClick="cancel"/>
      <button-basic class="button-form-modal" text="네. 개별청구등록합니다" type="default" :mode="'contained'"
                    @onClick="submit"/>
    </div>
  </a-modal>
</template>

<script setup lang="ts">

import { ref } from "vue";
import dayjs from "dayjs";
import SelectBox from "@/views/base/SelectBox.vue";
import SelectBoxCommon from "@/components/common/SelectBoxCommon.vue";

const emit = defineEmits(["closePopup", "submit"]);
const month = ref<string>(dayjs().format("YYYYMM"));
const cancel = () => {
  emit("closePopup", false)
};
const submit = () => {
  emit("submit")
}
</script>

<style scoped>
.text-red {
  color: red;
}
</style>
