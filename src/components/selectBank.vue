<template>
  <div>
    <a-space>
      <a-select ref="select" @change="handleChange" v-model="bankType.value">
        <a-select-option
          v-for="item in bankType"
          :key="item.value"
          :value="item.bankName"
        ></a-select-option>
      </a-select>
    </a-space>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import type { SelectProps } from "ant-design-vue";
export default {
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
    const bankType = ref<SelectProps["options"]>([
      { bankName: "경남은행", value: 39 },
      { bankName: "광주은행", value: 34 },
      { bankName: "국민은행", value: 4 },
      { bankName: "기업은행", value: 3 },
      { bankName: "농협", value: 13 },
      { bankName: "대구은행", value: 31 },
      { bankName: "부산은행", value: 32 },
      { bankName: "산업은행", value: 89 },
      { bankName: "새마을금고", value: 45 },
      { bankName: "수협", value: 88 },
      { bankName: "신한은행", value: 26 },
      { bankName: "신협", value: 48 },
      { bankName: "씨티은행", value: 28 },
      { bankName: "우리은행", value: 20 },
      { bankName: "우체국", value: 71 },
      { bankName: "전북은행", value: 37 },
      { bankName: "전북은행", value: 23 },
      { bankName: "제주은행", value: 35 },
      { bankName: "카카오뱅크", value: 92 },
      { bankName: "케이뱅크", value: 91 },
      { bankName: "하나은행", value: 81 },
    ]);
    const handleChange = (value: any) => {
      console.log(`selected ${value}`);
      emit("bank", value);
    };
    return {
      bankType,
      handleChange,
    };
  },
};
</script>

<style scoped>
.form-group {
  margin-top: 30px;
}
</style>
