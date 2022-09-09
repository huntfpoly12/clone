<template>
    <a-col :span="6" class="imgPreview">
        <img v-if="imageUrl" :width="200" :src="imageUrl" alt="avatar" @click="handlePreview" />
        <img v-else="imageUrl" :width="200"
            src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
            alt="avatar" />
    </a-col>

    <a-modal :visible="previewVisible" :title="title" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="imageUrl" />
    </a-modal>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
    props: {
        'title': {
            type: String
        },
        'imageUrl': {
            type: String
        },

    },
    setup() {
        const previewVisible = ref(false);
        const handleCancel = () => {
            previewVisible.value = false;
        }
        const handlePreview = () => {
            previewVisible.value = true
        }

        return {
            previewVisible,
            handleCancel,
            handlePreview
        };
    }, 
};
</script>

<style scoped lang="scss">
.imgPreview {
    cursor: pointer;
}
</style>