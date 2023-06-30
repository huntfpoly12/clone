<template>
  <!-- {{ arrayValue }} -->
  <DxSelectBox
    :noDataText="Message.getMessage('COMMON', '901').message"
    :width="width"
    :data-source="arrayValue"
    item-template="item-data"
    value-expr="key"
    display-expr="employeeId"
    :value="valueEmployRes"
    field-template="field-data"
    @value-changed="updateValue"
    :height="$config_styles.HeightInput"
    :disabled="disabled"
    :read-only="readOnly"
    :dropDownOptions="{ maxHeight: '250px', wrapperAttr: popupAttributes }"
  >
    <template #field-data="{ data }">
      <div v-if="data" class="employee-group" style="padding: 1px">
        <span class="btn-container">
          {{ data.employeeId }}
        </span>
        <a-tooltip placement="top" zIndex="999999" :title="data?.name">
          <!-- <template #title>
            <span>{{ checkLenTooltip(data?.name, 15) }}</span>
          </template> -->
          <div class="name-w-1 px-3">
            {{ data?.name }}
          </div>
        </a-tooltip>
        <a-tooltip placement="top" zIndex="999999" v-if="data?.incomeTypeName" :title="data?.incomeTypeCode + ' ' + data?.incomeTypeName">
          <!-- <template #title>
            <span>{{ data?.incomeTypeCode }} {{ data?.incomeTypeName }}</span>
          </template> -->
          <a-tag class="ml-5 py-1 mr-0 t text-overflow">
            {{ data?.incomeTypeName }}</a-tag
          >
        </a-tooltip>
        <DxTextBox style="display: none" />
      </div>
      <div v-else class="pt-5 pl-5">
        <span>선택</span>
        <DxTextBox style="display: none" />
      </div>
    </template>
    <template #item-data="{ data }">
      <div class="employee-group" v-if="data.employeeId">
        <span class="btn-container">
          {{ data.employeeId }}
        </span>
        <a-tooltip
          placement="top"
          zIndex="999999"
          :title="data?.name"
        >
          <!-- <template #title>
            <span>{{ checkLenTooltip(data?.name, 15) }}</span>
          </template> -->
          <div class="name-w-1 px-3">
            {{ data?.name }}
          </div>
        </a-tooltip>
        <!-- <div class="name-w-1 px-3" v-else>
          {{ checkLen(data?.name, 15) }}
        </div> -->
        <a-tooltip placement="top" zIndex="999999" v-if="data?.incomeTypeName" :title="data?.incomeTypeCode + ' ' + data?.incomeTypeName">
          <!-- <template #title>
            <span
              >{{ data?.incomeTypeCode }}
              {{ checkLenTooltip(data?.incomeTypeName, 0) }}</span
            >
          </template> -->
          <a-tag class="ml-5 py-2 mr-0">
            {{ data?.incomeTypeName }}</a-tag
          >
        </a-tooltip>
      </div>
    </template>
    <DxValidator :name="nameInput">
      <DxRequiredRule v-if="required" :message="messageRequired" />
    </DxValidator>
  </DxSelectBox>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed, getCurrentInstance } from "vue";
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import { Message } from "@/configs/enum";
export default defineComponent({
  props: {
    required: {
      type: Boolean,
      default: true,
    },
    width: String,
    disabled: Boolean,
    readOnly: Boolean,
    valueEmploy: {
      type: Number,
    },
    arrayValue: {
      type: Array,
      required: true,
    },
    nameInput: {
      type: String,
      default: "",
    },
    newLoadKey: {
      type: [String, Number],
      default: null,
    },
    popupAttributes: {
      type: Object,
    },
  },
  components: {
    DxSelectBox,
    DxTextBox,
    DxValidator,
    DxRequiredRule,
  },
  setup(props, { emit }) {
    let valueEmployRes: any = ref(+props.newLoadKey > 0 && props.newLoadKey);
    const updateValue = (value: any) => {
      props.arrayValue.forEach((val: any) => {
        if (val.key == value.value) {
          emit("update:valueEmploy", val.employeeId);
          emit("incomeTypeCode", val);
          valueEmployRes.value = value.value;
        }
      });
    };
    watch(
      () => props.newLoadKey,
      () => {
        valueEmployRes.value = +props.newLoadKey > 0 && props.newLoadKey;
      },
      { deep: true }
    );
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const messageRequired = ref(messages.getCommonMessage("102").message);
    const checkLen = (text: String, num: number) => {
      if (text.length > num) {
        return text.substring(0, num - 3) + "...";
      }
      return text;
    };
    const checkLenTooltip = (text: String, num: number) => {
      return text.length > num ? text : "";
    };
    return {
      updateValue,
      valueEmployRes,
      messageRequired,
      checkLen,
      checkLenTooltip,
      Message,
    };
  },
});
</script>
<style scoped lang="scss">
:deep .dx-list-item.dx-state-active:focus {
  border-color: blue;
  box-shadow: 0 0 3px blue;
}

.employee-group {
  // padding: 0 10px;
  display: flex;
  align-items: center;
}

.btn-container {
  margin-right: 5px;
  text-align: center;
  border: 1px solid rgb(164, 164, 164);
  border-radius: 5px;
  padding: 2.2px;
  min-width: 30px;
  display: inline-block;
}

:deep .dx-list-item.dx-state-active {
  color: black !important;
}

:deep .custom-grade-cell {
  display: flex;
  align-items: center;

  .custom-grade-cell-tag {
    padding: 1px 10px !important;
    border: 1px solid #304967;
    margin-right: 10px;
    border-radius: 5px;
    text-align: center;
  }
}

.name-w-1 {
  // display: -webkit-inline-box;
  text-align: center;
  // max-width: 40%;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

:deep .dx-button-content {
  display: inline-flex;
  align-items: center;
  // padding: 0px 5px  !important;

  // .dx-dropdowneditor-icon {
  //   width: 24px;
  // }
}
:deep span.ant-tag {
  // width: 210px;
  // max-width: 50%;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
:deep .dx-template-wrapper {
  display: flex;
  align-items: center;
}
:deep .dx-dropdowneditor-field-template-wrapper, :deep .dx-template-wrapper {
  width: 80%;
}

</style>
