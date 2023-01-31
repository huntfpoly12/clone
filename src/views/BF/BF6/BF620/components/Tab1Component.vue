<template>
    <div class="tab-1-group">
      <SearchArea/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchArea from "./SearchArea.vue"
export default defineComponent({
    components: {
        SearchArea,
    },
    setup() {

    }
})
</script>
<style scoped lang="scss">

</style>