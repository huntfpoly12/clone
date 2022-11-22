<template>
    <DxSelectBox :search-enabled="true" :data-source="arrSelect" :value="valueInput" :read-only="readOnly"
        value-expr="key" display-expr="value" field-template="field" item-template="item" :style="{ width: width }"
        :disabled="disabled" @value-changed="updateValue">
        <template #field="{ data }">
            <div class="select-content" style="padding: 3px 0px;">
                <a-tag color="default">{{ data.key }}</a-tag>
                <div>
                    <DxTextBox :value="data && data.value" :read-only="true" class="product-name" />
                    {{ data.value }}
                </div>
            </div>
        </template>
        <template #item="{ data }">
            <div class="custom-value">
                <a-tag color="default">{{ data.key }}</a-tag>
                <div>
                    <DxTextBox :value="data && data.value" :read-only="true" class="product-name" />
                    {{ data.value }}
                </div>
            </div>
        </template>
    </DxSelectBox>
</template>
<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import DxSelectBox from "devextreme-vue/select-box";
import ArrayStore from "devextreme/data/array_store";
import { IncomeTypeCode610, enum2KeysByValueMap, getEnumKey } from "../configs/enum"
import DxTextBox from "devextreme-vue/text-box";
export default defineComponent({
    props: {
        required: {
            type: Boolean,
            default: false,
        },

        width: {
            type: String,
            default: '200px'
        },
        clearButton: Boolean,
        disabled: Boolean,
        valueInput: {
            type: String,
            default: "940100",
        },
        readOnly: Boolean,
        nameInput: {
            type: String,
            default: '',
        },
    },
    components: {
        DxSelectBox,
        DxValidator,
        DxRequiredRule,
        DxTextBox
    },
    setup(props, { emit }) {
        let arrSelect = ref(Array());

        enum2KeysByValueMap(IncomeTypeCode610).forEach((name, id) => {
            arrSelect.value.push({ key: id, value: name });
        });
        const data = new ArrayStore({
            data: arrSelect.value,
            key: "key",
        });

        const updateValue = (value: any) => {
            emit('textCountry', getEnumKey(IncomeTypeCode610, value.value))
            emit("update:valueInput", value.value);
        };
        return {
            data,
            updateValue,
            arrSelect,
        };
    },
});
</script>
<style scoped>
::v-deep .dx-texteditor-input {
    padding: 0;
    color: black;
}

::v-deep .product-name {
    display: none;
    margin-top: -5px;
}

.select-content {
    display: flex;
    align-items: center;
    margin-left: 5px;
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
    width: 55px;
    height: 25px;
}

.custom-value {
    display: flex;
    align-items: center;
    padding: 3px 4px !important;
}
</style>
