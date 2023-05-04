<template>
  <DxSelectBox width="120" :search-enabled="false" :data-source="liststatus" placeholder="선택" value-expr="id" display-expr="value"
    v-model:value="valueBinding" field-template="field" item-template="item"  :disabled="disabled"
    :read-only="readOnly" @value-changed="updateValue()" :height="$config_styles.HeightInput">
    <template #field="{ data }">
      <div class="category-select">
          <div class="category-select-items"
          :style="`background: ${data?.background}; color: ${data?.color}; border: 1px solid  ${data?.color};` "
        >{{ data?.value || '' }}</div>
      </div>
      <DxTextBox style="display: none" />
    </template>
    <template #item="{ data }">
      <div class="category-select">
        <div class="category-select-items"
        :style="`background: ${data?.background}; color: ${data?.color}; border: 1px solid  ${data?.color};` "
      >{{ data?.value || '' }}</div>
      </div>
      <DxTextBox style="display: none" />
    </template>
  </DxSelectBox>
</template>
<script lang="ts">
import { ref, watch, getCurrentInstance, computed, onMounted } from "vue";
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";
// import { accountSubject } from "@/helpers/commonFunction"
export default {
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    width: String,
    disabled: Boolean,
    valueInput: {
      type: [Number, String],
      default: null,
    },
    readOnly: Boolean,
  },
  components: {
    DxSelectBox,
    DxTextBox,
  },
  setup(props: any, { emit }: any) {
    const liststatus = [
      { 
        id: 1,
        value: '일반',
        color: '#7f7f7fff',
        background: '#ffffffff'
      },
      { 
        id: 2,
        value: '문의',
        color: '#ffffffff',
        background: '#dc5939ff'
      },
      { 
        id: 3,
        value: '답글',
        color: '#ffffffff',
        background: '#92d050ff'
      },
      { 
        id: 4,
        value: '알림',
        color: '#ffffffff',
        background: '#ffc000ff'
      },
      { 
        id: 5,
        value: '공지',
        color: '#ffffffff',
        background: '#0070c0ff'
      },
    ]
    let valueBinding: any = ref(props.valueInput || 1)

    watch(() => valueBinding.value, (value) => {
      emit("update:valueInput", value);
    })

    const updateValue = () => {

    }
    return {
      valueBinding,
      liststatus,
      updateValue
    };
  },
};
</script>
  
<style scoped lang="scss">
.category-select {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &-items {
    width: 60px;
    text-align: center; 
    border-radius: 5px;
  }
}
</style>
  