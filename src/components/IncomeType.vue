<template>
    <div v-if="!incomeTypeNameRes" class="custom-grade-cell">
        <div class="custom-grade-cell-tag">{{ typeCodeRes }}</div>
        <span>{{ typeNameRes }}</span>
    </div>

    <div v-else-if="incomeTypeNameRes && incomeTypeNameRes.length < 10" class="custom-grade-cell">
        <div class="custom-grade-cell-tag">{{ typeCode }}</div>
        <span>{{ typeNameRes }} [{{ incomeTypeNameRes }}]</span>
    </div>

    <a-tooltip v-else color="black">
        <template #title>{{ incomeTypeNameRes }}</template>
        <div class="custom-grade-cell">
            <div class="custom-grade-cell-tag">{{ typeCodeRes }}</div>
            <span>{{ typeNameRes }}</span>
            [<span class="custom-text">{{ incomeTypeNameRes }}</span>]
        </div>
    </a-tooltip>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";

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
        }
    },
    setup(props) {
        const typeCodeRes = ref(props.typeCode)
        const typeNameRes = ref(props.typeName)
        watch(() => (props.typeCode, props.typeName), (newValue) => {
            typeCodeRes.value = props.typeCode
            typeNameRes.value = props.typeName
        });
        const incomeTypeNameRes = ref(props.incomeTypeName)

        return {
            incomeTypeNameRes,
            typeNameRes,
            typeCodeRes
        }
    }
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

.custom-text {
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
    
    