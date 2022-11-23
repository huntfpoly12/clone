<template>
    <div class="custom-grade-cell">
        <div class="custom-grade-cell-tag">{{ incomeTypeCode }}</div>
        <span>{{ incomeTypeName }}</span>
    </div>
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
        }
    },
    setup(props, { emit }) {
        const incomeTypeCode = ref(props.typeCode);
        const incomeTypeName = ref(props.typeName);
        return {
            incomeTypeCode,
            incomeTypeName
        };
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
    
    