<template>
  <DxSelectBox
    :search-enabled="true"
    :data-source="dataSelect"
    :value="dataSelect[3].key"
    value-expr="key"
    display-expr="value"
    field-template="field"
    item-template="item"
    width="200px"
  >
    <template #field="{ data }">
      <div class="select-content">
        <a-tag color="default">{{ data.key }}</a-tag>
        <DxTextBox
          :value="data && data.value"
          :read-only="true"
          class="product-name"
        />
      </div>
    </template>
    <template #item="{ data }">
      <div>
        <a-tag color="default">{{ data.key }}</a-tag>
        <DxTextBox
          :value="data && data.value"
          :read-only="true"
          class="product-name"
        />
      </div>
    </template>
  </DxSelectBox>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import DxTextBox from "devextreme-vue/text-box";
import DxSelectBox from "devextreme-vue/select-box";
import ArrayStore from "devextreme/data/array_store";
import { CountryCode, enum2KeysByValueMap } from "@trandung1291/common-tsv";

export default defineComponent({
  components: {
    DxSelectBox,
    DxTextBox,
  },
  setup() {
    let dataSelect = ref(Array());
    const data = new ArrayStore({
      data: dataSelect.value,
      key: "key",
    });
    enum2KeysByValueMap(CountryCode).forEach((codeCountry, nameCountry) => {
      dataSelect.value.push({ key: codeCountry, value: nameCountry });
    });

    return { dataSelect, data };
  },
});
</script>
<style scoped>
::v-deep .dx-texteditor-input {
  padding: 0;
  color: black;
}

::v-deep .product-name {
  margin-top: -5px;
}
.select-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.dx-list-item-content {
  display: flex;
}
.dx-texteditor.dx-state-readonly {
  border-style: none;
}

.ant-tag {
  text-align: center;
  align-items: center;
  width: 40px;
  height: 25px;
}
</style>
