<template>
  <div>
    <DxSelectBox :search-enabled="true" :width="width" :data-source="donationTypeStore" :show-clear-button="clearButton"
      display-expr="label" value-expr="value" :disabled="disabled" @value-changed="updateValue"
      :height="$config_styles.HeightInput" placeholder="선택" field-template="field" item-template="item">
      <template #field="{ data }">
        <div v-if="data" class="text-overflow" style="padding: 2px;display: flex; align-items: center;">
          <a-tag color="black">{{ data?.value }}</a-tag>
          <div>
            {{ data.label }}
            <DxTextBox style="display: none;" />
          </div>
        </div>
        <div v-else class="pt-5 pl-5">
          <span>선택</span>
          <DxTextBox style="display: none;" />
        </div>
      </template>
      <template #item="{ data }">
        <div style="display: flex; align-items: center;">
          <a-tag color="black">{{ data?.value }}</a-tag>
          <div>
            {{ data?.label }}
            <DxTextBox style="display: none;" />
          </div>
        </div>
      </template>
      <DxValidator>
        <DxRequiredRule v-if="required" :message="messageRequired" />
      </DxValidator>
    </DxSelectBox>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, getCurrentInstance, computed } from "vue";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";
import {
  DonationType,
  enum2Entries,
} from "@bankda/jangbuda-common";
export default defineComponent({
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '200',
    },
    clearButton: Boolean,
    disabled: {
      type: Boolean,
      default: false,
    },
    valueInput: {
      type: Number,
      default: 0,
    },
  },
  components: {
    DxSelectBox,
    DxValidator,
    DxRequiredRule,
    DxTextBox
  },
  setup(props, { emit }) {
    var donationTypeStore: any = computed(() => {
      return enum2Entries(DonationType).map((value) => ({
        value: value[1],
        label: value[0],
      }));;
    });
    const app: any = getCurrentInstance();
    const messages = app.appContext.config.globalProperties.$messages;
    const messageRequired = ref(messages.getCommonMessage('102').message);
    const updateValue = (e: any) => {
      emit("update:valueInput", e.value);
    };
    return {
      updateValue,
      messageRequired,
      donationTypeStore,
    };
  },
});
</script>
<style lang="scss" scoped>
.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
