<template>
  <div>
    <a-select
      :style="{width: width , height:$config_styles.HeightInput}"
      v-model:value="value"
      :disabled="disabled"
      option-label-prop="children"
      @select="updateValue(value)"
      :placeholder="placeholder"
    >
      <a-select-option v-for="saleStatus in saleGrade"  :key="saleStatus.value" :label="saleStatus.label" :style="{width: width}">
        <a-tag :color="getColorTag(saleStatus.label)">{{saleStatus.label}}</a-tag>
      </a-select-option>
    </a-select>
    <a-modal v-if="confirmStatus"
      v-model:visible="visibleConfirm"
      :mask-closable="false"
      :afterClose="afterConfirmClose"
      class="confirm-md"
      :width="521"
    >
      <a-row>
        <a-col :span="4">
          <warning-outlined
            :style="{ fontSize: '70px', color: '#faad14', paddingTop: '20px' }"
          />
        </a-col>
        <a-col :span="20">
          <h3><b>해지 확인</b></h3>
          <p>해지하실 경우 본 영업자에 속한 사업자들은 본사로 귀속됩니다.</p>
          <p>해지처리를 확정하시려면 “확인”을 입력하신 후 완료 버튼을</p>
          <p>누르세요</p>
        </a-col>
        <div style="text-align: center; width: 100%; margin-left: 100px">
          <a-input
            v-model:value="confirm"
            placeholder="확인"
            style="width: 200px"
          />
          <a-button
            type="primary"
            @click="handleOkConfirm"
            style="margin-left: 100px"
            >완료</a-button
          >
        </div>
      </a-row>
      <template #footer> </template>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import DxSelectBox from "devextreme-vue/select-box";
import { WarningOutlined } from "@ant-design/icons-vue";
import {
  SalesRepresentativeStatus,
  enum2Entries,
} from "@bankda/jangbuda-common";

const saleGrade = enum2Entries(SalesRepresentativeStatus).map((value) => ({
  value: value[1],
  label: value[0],
}));

export default defineComponent({
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    messRequired: {
      type: String,
      default: "Input is required!",
    },
    width: String,
    maxCharacter: Number,

    clearButton: Boolean,
    disabled: Boolean,
    valueInput: {
      type: [Number,String],
      
    },
    placeholder: String,
    readOnly: Boolean,
    confirmStatus: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    DxSelectBox,
    WarningOutlined,
  },
  setup(props, { emit }) {
    const value = ref(props.valueInput);
    const visibleConfirm = ref<boolean>(false);
    let confirm = ref<string>("");
    const updateValue = (value: any) => {
      if (value == 2 && props.confirmStatus == true) {
        visibleConfirm.value = true;
      } else {
        emit("update:valueInput", value);
      }
    };
    watch(
      () => props.valueInput,
      (newValue) => {
        value.value = newValue;
      }
    );

    // confirm popup
    const handleOkConfirm = () => {
      if (confirm.value == "확인") {
        visibleConfirm.value = false;
      } else {
        value.value = 1;
        visibleConfirm.value = false;
      }
    };

    const afterConfirmClose = () => {
      if (confirm.value == "확인") {
        value.value = 2;
      } else {
        value.value = 1;
      }
    };

    const getColorTag = (data: string) => {
      if (data === "정상") {
        return "#108ee9";
      } else if (data === "해지") {
        return "#cd201f";
      } else if (data === "숨김") {
        return "grey";
      }
    };
    return {
      updateValue,
      saleGrade,
      afterConfirmClose,
      visibleConfirm,
      confirm,
      getColorTag,
      handleOkConfirm,
      value,
    };
  },
});
</script>
  <style scoped></style>
  