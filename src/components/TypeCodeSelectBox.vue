<template>
    <DxSelectBox :noDataText="Message.getMessage('COMMON', '901').message" :search-enabled="true" :data-source="arrSelect" :value="valueInput" :read-only="readOnly" value-expr="key"
        display-expr="value" field-template="field" item-template="item" :style="{ width: width }" :disabled="disabled"
        @value-changed="updateValue">
        <template #field="{ data }">
            <div v-if="data" class="select-content" style="padding: 3px 0px;">
                <a-tag color="default">{{ data.key }}</a-tag>
                <div class="custom-text">
                    <DxTextBox :value="data && data.value" :read-only="true" class="product-name" />
                    <a-tooltip placement="top" color="black" zIndex="9999999">
                        <template #title>{{ data.value }}</template>
                        <span>{{ data.value }}</span>
                    </a-tooltip>
                </div>
            </div>
            <div v-else style="padding: 3px 0px 3px 5px;">
                <span>선택</span>
                <DxTextBox style="display: none;" />
            </div>
        </template>
        <template #item="{ data }">
            <div class="custom-value">
                <a-tag color="default">{{ data.key }}</a-tag>
                <div class="custom-text">
                    <DxTextBox :value="data && data.value" :read-only="true" class="product-name" />
                    <a-tooltip placement="top" color="black" zIndex="9999999">
                        <template #title>{{ data.value }}</template>
                        <span>{{ data.value }}</span>
                    </a-tooltip>
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
import { Message } from "@/configs/enum"
import { IncomeTypeCode610, IncomeTypeCode710, enum2KeysByValueMap, getEnumKey } from "../configs/enum"
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
        screenCode: {
            type: Number,
            default: 610,
        }
    },
    components: {
        DxSelectBox,
        DxValidator,
        DxRequiredRule,
        DxTextBox
    },
    setup(props, { emit }) {
        let arrSelect = ref(Array());

        if (props.screenCode == 610) {
            enum2KeysByValueMap(IncomeTypeCode610).forEach((name, id) => {
                arrSelect.value.push({ key: id, value: name });
            });
        } else if (props.screenCode == 710) {
            enum2KeysByValueMap(IncomeTypeCode710).forEach((name, id) => {
                arrSelect.value.push({ key: id, value: name });
            });
        }

        const data = new ArrayStore({
            data: arrSelect.value,
            key: "key",
        });

        const updateValue = (value: any) => {
            if (props.screenCode == 610) {
                emit('textTypeCode', getEnumKey(IncomeTypeCode610, value.value))
            } else if (props.screenCode == 710) {
                emit('textTypeCode', getEnumKey(IncomeTypeCode710, value.value))
            }
            emit("update:valueInput", value.value);
        };
        return {
            data,
            updateValue,
            arrSelect,
            Message,
        };
    },
});
</script>
<style scoped lang="scss">
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

    .custom-text {
        width: 120px;
    }
}

.dx-list-item-content {
    display: flex;
}

.dx-texteditor.dx-state-readonly {
    border-style: none;
}

/* .ant-tag span {
    text-align: center;
    align-items: center;
    width: 55px;
    height: 25px;
} */

.custom-value {
    display: flex;
    align-items: center;
    padding: 3px 4px !important;
}

.custom-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
