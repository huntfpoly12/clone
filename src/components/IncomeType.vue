<template>
    <div v-if="(showTooltip == false)" class="custom-grade-cell">
        <div class="custom-grade-cell-tag">{{ typeCode }}</div>
        <span>{{ typeName }} [{{ incomeTypeName }}]</span>
    </div>
    <a-tooltip v-else>
        <template #title>prompt text</template>
        <div class="custom-grade-cell">
            <div class="custom-grade-cell-tag">{{ typeCode }}</div>
            <span>{{ typeName }} [{{ incomeTypeName }}]</span>
        </div>
    </a-tooltip>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    props: {
        typeCode: {
            type: String,
            required: true
        },
        typeName: {
            type: String,
            required: true
        },
        incomeTypeName: {
            type: String,
            required: true
        }
    },
    setup(props, { emit }) {
        let showTooltip = ref(false) 
        if (props.incomeTypeName.length > 2)
            showTooltip.value = true

        return {
            showTooltip
        }
    },
});
</script>
<style lang="scss" scoped>
.custom-grade-cell {
    display: flex;
    align-items: center;

    .custom-grade-cell-tag {
        padding: 3px 10px;
        border: 1px solid #304967;
        margin-right: 10px;
        border-radius: 5px;
        min-width: 50px;
        text-align: center;
    }
}
</style>
    
    