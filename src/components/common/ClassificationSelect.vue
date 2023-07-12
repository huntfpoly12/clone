<template>
    <DxSelectBox :noDataText="Message.getMessage('COMMON', '901').message" :width="width"
        :search-enabled="false" :data-source="listClassification" placeholder="선택" value-expr="id" display-expr="value"
        v-model:value="valueSelected" :disabled="disabled" :read-only="readOnly"
        @value-changed="updateValue($event, valueSelected)" :height="$config_styles.HeightInput">
    </DxSelectBox>
</template>
<script lang="ts">
import { ref, watch, computed } from "vue";
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";
import { Message } from "@/configs/enum"
export default {
    props: {
        required: {
            type: Boolean,
            default: false,
        },
        width: {
            type: [Number, String],
            default: 120,
        },
        disabled: Boolean,
        valueSelect: {
            type: [Number, String],
            default: '일반',
        },
        readOnly: Boolean,
    },
    components: {
        DxSelectBox,
        DxTextBox,
    },
    setup(props: any, { emit }: any) {
        const listClassification = [
            {
                id: '일반',
                value: '일반',
            },
            {
                id: '회계',
                value: '회계',
            },
            {
                id: '원천',
                value: '원천',
            },
            {
                id: '4대보험',
                value: '4대보험',
            },
        ]
        const valueSelected = ref(props.valueSelect);

        watch(() => props.valueSelect, (newValue) => {
            valueSelected.value = newValue;
        });

        const updateValue = (e: any, val: any) => {
            console.log('ầ', val);
            
            emit("update:valueSelect", val);
        }
        return {
            valueSelected,
            listClassification,
            updateValue,
            Message,
        };
    },
};
</script>
    
<style scoped lang="scss">
.category-select {
    // width: 100%;
    // height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto 0;

    &-items {
        // width: 60px;
        text-align: center;
        border-radius: 5px;
        padding: 2px 20px;
    }

    // .fs-10 {
    //   font-size: 10px;
    // }
}
</style>
    