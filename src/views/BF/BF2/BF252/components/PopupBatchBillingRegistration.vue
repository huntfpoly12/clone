<template>
  <a-modal v-bind="$props" footer="" :closable="false" width="600px">
    <div class="d-flex-center justify-content-center gap-10 mb-20">
      <span>청구연월</span>
      <month-picker-box v-model="month" width="100px"/>
      <span>일괄청구 등록하시겠습니까?</span>
    </div>
    <div class="d-flex-center justify-content-center gap-10">
      <button-basic class="button-form-modal" text="아니요" type="default" :mode="'outlined'"
                    @onClick="cancel"/>
      <button-basic class="button-form-modal" text="네. 일괄청구등록합니다" type="default" :mode="'contained'"
                    @onClick="submit"/>
    </div>
  </a-modal>
</template>

<script setup lang="ts">

import { ref } from "vue";
import dayjs from "dayjs";

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

</style>
