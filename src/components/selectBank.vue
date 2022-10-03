<template>
  <div>
    <a-space>
      <a-select
        ref="select"
        @change="handleChange"
        v-model="bankType.label"
        :options="bankType"
        :style="styleBank"
        v-model:value="selectValue"
      >
      </a-select>
    </a-space>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
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
  },
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    onChange(data: any) {
      // this.bankType = data;
      console.log(data);
    },
  },
  setup(props: any, { emit }: any) {
    const styleBank = ref({
      width: props.width
    })
    const bankType = ref<SelectProps["options"]>([
      { label: "경남은행", value: "39" },
      { label: "광주은행", value: "34" },
      { label: "국민은행", value: "04" },
      { label: "기업은행", value: "03" },
      { label: "농협", value: "13" },
      { label: "대구은행", value: "31" },
      { label: "부산은행", value: "32" },
      { label: "산업은행", value: "89" },
      { label: "새마을금고", value: "45" },
      { label: "수협", value: "88" },
      { label: "신한은행", value: "26" },
      { label: "신협", value: "48" },
      { label: "씨티은행", value: "28" },
      { label: "우리은행", value: "20" },
      { label: "우체국", value: "71" },
      { label: "전북은행", value: "37" },
      { label: "전북은행", value: "23" },
      { label: "제주은행", value: "35" },
      { label: "카카오뱅크", value: "92" },
      { label: "케이뱅크", value: "91" },
      { label: "하나은행", value: "81" },
    ]);
    const handleChange = (value: any) => {
      emit("bank", value);
    };
    return {
      bankType,
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
