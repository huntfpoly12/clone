<template>
    <div class="deduction">
        <a-tooltip  color="black" placement="top" v-if="showTooltip">
        <!-- <a-tooltip  color="black" placement="top"> -->
            <template #title>{{ name }}</template>
            <span class="deducation-name" :style="{ 'width': width }">{{ name }}</span>
        </a-tooltip>
        <span class="deducation-name" :style="{ 'width': width }" v-else>{{ name }}</span>
        <a-tooltip  color="black" placement="top" v-if="type == 1">
            <template #title>{{ subName }}</template>
            <div class="deduction-tag deduction-tag-1">
                <span>과</span>
            </div>
        </a-tooltip>
        <a-tooltip  color="black" placement="top" v-if="type == 2">
            <template #title>{{ subName }}</template>
            <div class="deduction-tag deduction-tag-2">
                <span>상</span>
            </div>
        </a-tooltip>
        <a-tooltip  color="black" placement="top" v-if="type == 3">
            <template #title>
                <span style="text-align: center;">
                    비과세 <br />{{ subName }}
                </span>
            </template>
            <div class="deduction-tag deduction-tag-3">
                <span>비</span>
            </div>
        </a-tooltip>
        <a-tooltip  color="black" placement="top" v-if="type == 4">
            <template #title>{{ subName }}</template>
            <div class="deduction-tag deduction-tag-4">
                <span>공</span>
            </div>
        </a-tooltip>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    props: {
        type: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        subName: {
            type: String,
            required: true
        },
        width: {
            type: String,
            default: '70px'
        },
        showTooltip: {
            type: Boolean,
            default: true,
        }
    },
    setup(props, { emit }) {
        return {
        };
    },
});
</script>
<style lang="scss" scoped>
.deduction {
    display: flex;
    align-items: center;
    cursor: pointer;

    >span {
        margin-right: 5px;
    }

    .deduction-tag {
        width: 40px;
        text-align: center;
        padding: 3px 0;
        border-radius: 5px;
    }

    .deduction-tag-1 {
        border: 1px solid #A6A6A6;
        color: black;
    }

    .deduction-tag-2 {
        border: 1px solid #A6A6A6;
        color: black;
    }

    .deduction-tag-3 {
        border: 1px solid #4F81BD;
        background-color: #4F81BD;
        color: white;
    }

    .deduction-tag-4 {
        border: 1px solid #7F7F7F;
        background-color: #7F7F7F;
        color: white;
    }

    .deducation-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
    
    