<template>
  <div>
    <a-modal
      v-model:visible="value"
      title="영업자관리[bf-340 –pop]"
      centered
      @cancel="updateValue(false)"
      :mask-closable="false"
      :width="1028"
    >
      <template #footer> </template>
      <form action="your-action" >
        <slot></slot>
        <a-row style="margin-top: 20px">
          <a-col :span="16" :offset="8">
            <DxButton
              :width="120"
              text="취소"
              type="default"
              styling-mode="outlined"
            
              style="margin-right: 10px"
            />
            <DxButton
              id="button"
              :use-submit-behavior="true"
              text="저장하고 나가기"
              type="default"
            />
          </a-col>
        </a-row>
      </form>
    </a-modal>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import DxButton from 'devextreme-vue/button';
export default defineComponent({
  props: {
    modalStatus:{
        type: Boolean,
        default: false,
    }
  },
  components: {
    DxButton
  },
  setup(props, { emit }) {
    const value = ref(props.modalStatus);
      const updateValue = (value: any) => {
        emit("update:modalStatus", value);
      };
      watch(
        () => props.modalStatus,
        (newValue) => {
          value.value = newValue;
        }
      );
    return {
        value,
        updateValue
    };
  },
});
</script>
  