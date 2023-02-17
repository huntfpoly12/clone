<template>
    <a-tag v-if="valueUse" :style="{ width: width }" color="rgb(16 142 236 / 62%)">이용중</a-tag>
    <a-tag v-else :style="{ width: width }" color="rgb(205 32 31 / 51%)">이용중지</a-tag>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        valueUse: {
            type: Boolean,
            required: true
        },
        width: {
            type: String,
            default: '65px'
        }
    },

    setup(props, { emit }) {
        return {
            
        }
    },
});
</script>

<style lang="scss" scoped>
.ant-tag-has-color {
    text-align: center;
}
</style>
