<template>
  <div>
    <a-space>
      <a-select :disabled="disableFormVal" ref="select" v-model:value="selectValue" style="width: 120px" @change="handleChange">
        <a-select-option :key="0" value="">은행 선택</a-select-option>
        <a-select-option v-for="item in bankTypeSelect" :key="item.c" :value="item.c">{{item.n}}</a-select-option>
      </a-select>

    </a-space>
  </div>
</template>
<script lang="ts">
import { ref, onMounted } from "vue";
import { BankType } from "@bankda/jangbuda-common";
import type { SelectProps } from "ant-design-vue";
export default {
  props: {
    selectValue: {
      default: "39",
      type: String,
    },
    width: {
      default: "100%",
      type: String,
    },

    disableFormVal: {
      default: false,
      type: Boolean,
    },
  },
  mounted() { },
  setup(props: any, { emit }: any) {
    const styleBank = ref({
      width: props.width
    })
    const bankTypeSelect = ref<SelectProps["options"]>([]);
    onMounted(() => {
      bankTypeSelect.value = BankType.all()
    })
    const handleChange = (value: any) => {
      emit("bank", value);
    };
    return {
      bankTypeSelect,
      handleChange,
      styleBank
    };
  },
};
</script>

<style scoped>
.form-group {
  margin-top: 30px;
}
</style>
