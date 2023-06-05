<template>
  <a-modal
    :visible="true"
    @cancel="setModalVisible"
    @ok="onOk"
    :mask-closable="true"
    title="사용자권한으로 로그인"
  >
  <template #cancelText>취소</template>
  <template #okText>네</template>
    <div style="font-weight: 600;">{{companyInfo.code  }} {{companyInfo.name}}</div>
    <div>
      위 회사의 대표자 아이디로 로그인된 새로운 브라우저 창이 열립니다.<br/>
      계속 진행하시겠습니까?
    </div>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    companyInfo: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const setModalVisible = () => {
      emit("closeModal", false);
    };
    const onOk = () => {
      emit("closeModal", true);
    }
    return {
      setModalVisible,
      onOk
    };
  },
});
</script>
