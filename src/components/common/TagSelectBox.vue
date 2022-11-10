<template>
    <DxTagBox :data-source="arrayValue"
            display-expr="name"
            value-expr="id" 
            :layout="layoutCustom"
            @valueChanged="changeValueSelectBox"
            :value="data"
            :height="$config_styles.HeightInput"
            />
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, watch, ref } from "vue";
import DxTagBox from 'devextreme-vue/tag-box';

export default defineComponent ({
    props: {
        arrayValue: {
            type: Array,
            required: true
        },
        valueTagSelect: {
            type: Array
        },
        layoutCustom: {
            type: String
        },
    },
    components: {
        DxTagBox
    },
    setup(props, { emit }) {
        const app: any = getCurrentInstance()
        const data = ref(props.valueTagSelect);
        
        const changeValueSelectBox = (e: any) => {
            emit("update:valueTagSelect", e.value);
        }

        watch(
            () => props.valueTagSelect,
            (value) => {
                data.value = value
            }
        );
        return {
            changeValueSelectBox,
            data,
        }
    },
});
</script>
<style scoped>
::v-deep .dx-tag-content {
    margin: 3px 0 0 4px;
    padding: 2px 25px 4px 6px;
}
</style>
