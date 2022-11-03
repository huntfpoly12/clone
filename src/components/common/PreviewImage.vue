<template>
    <a-col>
        <div v-if="dataImage" class="img-preview">
            <a-image :src="dataImage.url" style="height: 200px;" />
        </div>
        <div v-else class="img-preview">
            <img src="../../../src/assets/images/imgdefault.jpg" style="height: 200px;" />
        </div> 
    </a-col>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    components: {

    },
    props: ['width', 'height', 'activePreview','dataImage']

})
</script>