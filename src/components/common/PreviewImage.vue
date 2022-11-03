<template>
    <a-col>
        <div v-if="dataImage" class="img-preview">
            <a-image v-if="activePreview || activePreview == true" :src="dataImage.url"
                :style="{ width: width, height: height }" />
            <img v-else :src="dataImage.url" :style="{ width: width, height: height }" />
        </div>
        <div v-else class="img-preview">
            <img src="../../../src/assets/images/imgdefault.jpg" :style="{ width: width, height: height }" />
        </div>
    </a-col>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    props: ['width', 'height', 'activePreview', 'dataImage']

})
</script>

<style lang="scss" scoped>
::v-deep img-preview {
    position: relative;
    width: 100%;
}

::v-deep img {
    position: relative;
    width: 100%;
    height: 345px;

}

.imgPreview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>