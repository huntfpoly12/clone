<template>
  <div class="header-text">공제 / 감면 / 소득세 적용율</div>
  <a-row>
    <a-col :span="12">
      <a-form-item label="4대보험 공제 여부" label-align="right">
        <text-number-box
          width="200px"
          :required="true"
          placeholder="숫자만 입력 가능"
        />
      </a-form-item>
    </a-col>
    <a-col :span="12">
      <a-form-item label="사번(코드)" label-align="right">
        <text-number-box
          width="200px"
          :required="true"
          placeholder="숫자만 입력 가능"
        />
      </a-form-item>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { InfoCircleFilled } from "@ant-design/icons-vue";
import { DxSelectBox } from "devextreme-vue/select-box";
import { radioCheckForeigner, radioCheckHouseholder } from "../utils/index";
import DataSource from "devextreme/data/data_source";

export default defineComponent({
  components: {
    InfoCircleFilled,
    DxSelectBox,
  },
  props: {
    modalStatus: Boolean,
  },
  setup(props, { emit }) {
  

    return {
   
    };
  },
});
</script>
<style lang="scss" scoped >
    .header-text{
        background-color: #558ED5;
        padding: 5px;
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 10px;
    }
</style>
