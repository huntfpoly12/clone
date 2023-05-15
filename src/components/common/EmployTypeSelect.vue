<template>
  <!-- {{ arrayValue }} -->
  <DxSelectBox :noDataText="Message.getMessage('COMMON', '901').message" :width="width" :data-source="arrayValue"
    item-template="item-data" value-expr="key" display-expr="employeeId" :value="valueEmployRes"
    field-template="field-data" @value-changed="updateValue" :height="$config_styles.HeightInput" :disabled="disabled"
    :dropDownOptions="{ height: '250px' }">
    <template #field-data="{ data }">
      <div v-if="data" style="padding: 1px">
        <span class="btn-container">
          {{ data.employeeId }}
        </span>
        <a-tooltip placement="top" zIndex="999999" v-if="data?.name.length > 15">
          <template #title>
            <span>{{ checkLenTooltip(data?.name, 15) }}</span>
          </template>
          <div class="name-w-1">
            {{ checkLen(data?.name, 15) }}
          </div>
        </a-tooltip>
        <div class="name-w-1" v-else>
          {{ checkLen(data?.name, 15) }}
        </div>
        <a-tooltip placement="top" zIndex="999999" v-if="data?.incomeTypeName">
          <template #title>
            <span>{{ data?.incomeTypeCode }} {{ checkLenTooltip(data?.incomeTypeName, 0) }}</span>
          </template>
          <a-tag class="ml-5 py-1 mr-0"> {{ checkLen(data?.incomeTypeName, 21) }}</a-tag>
        </a-tooltip>
        <DxTextBox style="display: none;" />
      </div>
      <div v-else class="pt-5 pl-5">
        <span>선택</span>
        <DxTextBox style="display: none;" />
      </div>

    </template>
    <template #item-data="{ data }">
      <div class="employee-group" v-if="data.employeeId">
        <span class="btn-container">
          {{ data.employeeId }}
        </span>
        <a-tooltip placement="top" zIndex="999999" v-if="data?.name.length > 15">
          <template #title>
            <span>{{ checkLenTooltip(data?.name, 15) }}</span>
          </template>
          <div class="name-w-1">
            {{ checkLen(data?.name, 15) }}
          </div>
        </a-tooltip>
        <div class="name-w-1" v-else>
          {{ checkLen(data?.name, 15) }}
        </div>
        <a-tooltip placement="top" zIndex="999999" v-if="data?.incomeTypeName">
          <template #title>
            <span>{{ data?.incomeTypeCode }} {{ checkLenTooltip(data?.incomeTypeName, 0) }}</span>
          </template>
          <a-tag class="ml-5 py-2 mr-0"> {{ checkLen(data?.incomeTypeName, 21) }}</a-tag>
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
import { Message } from "@/configs/enum"
export default defineComponent({
  props: {
    required: {
      type: Boolean,
      default: true,
    },
    width: String,
    disabled: Boolean,
    valueEmploy: {
      type: Number,
    },
    arrayValue: {
      type: Array,
      required: true
    },
    nameInput: {
      type: String,
      default: '',
    },
    newLoadKey: {
      type: [String, Number],
      default: null,
    }
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
      })

    };
    watch(
      () => props.newLoadKey,
      () => {
        valueEmployRes.value = +props.newLoadKey > 0 && props.newLoadKey;
      }, { deep: true }
    );
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const messageRequired = ref(messages.getCommonMessage('102').message);
    const checkLen = (text: String, num: number) => {
      if (text.length > num) {
        return text.substring(0, num - 3) + '...';
      }
      return text;
    };
    const checkLenTooltip = (text: String, num: number) => {
      return text.length > num ? text : '';
    };
    return {
      updateValue,
      valueEmployRes,
      messageRequired,
      checkLen, checkLenTooltip,
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

.main {
  display: flex;
  align-items: flex-end;
}


.tag-status {
  background-color: red;
  color: white;
  padding: 4px 10px;
  border-radius: 5px;
  margin: 0 5px;
}


.tag-status {
  background-color: red;
  color: white;
  padding: 4px 10px;
  border-radius: 5px;
  margin: 0 5px;
}

.tag-foreigner {
  background-color: orange;
  color: white;
  padding: 4px 10px;
  border-radius: 5px;
  margin: 0 5px;
}

.display-none {
  display: none;
}

.jtf-center {
  justify-content: center;
}

.employee-group {
  padding: 0 10px;
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

.name-w {
  width: 70px;
  display: inline-block;
}

.name-w-1 {
  display: inline-block;
}

:deep .dx-button-content {
  display: inline-flex;
  align-items: center;
  padding: 0px 7px 1px !important;

  .dx-dropdowneditor-icon {
    width: 24px;
  }
}
</style>
  