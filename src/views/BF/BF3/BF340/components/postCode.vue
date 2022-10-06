<template  #enterButton>
    <!-- <a class="button" @click="isOpen = true">우편번호 검색</a> -->

    <a class="button" @click="isOpen = true">
        <search-outlined />
    </a>

    <a-modal v-model:visible="isOpen" footer="" :mask-closable="false">
        <div>
            <VueDaumPostcode @complete="onComplete" />
        </div>
    </a-modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { VueDaumPostcodeCompleteResult, VueDaumPostcode } from 'vue-daum-postcode'
import { SearchOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    components: {
        VueDaumPostcode,
        SearchOutlined
    },
    data() {
        return {
            isOpen: false,
            result: null as VueDaumPostcodeCompleteResult | null,
        }
    },
    methods: {
        onComplete(result: VueDaumPostcodeCompleteResult) {
            this.$emit("dataAddress", result)
            this.isOpen = false
        },
    },
})
</script>