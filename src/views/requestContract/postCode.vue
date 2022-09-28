<template>
    <div>
        <div>
            <a class="button" @click="isOpen = true">우편번호 검색</a>
            <a-modal v-model:visible="isOpen" footer="" :mask-closable="false">
                <div>
                    <VueDaumPostcode @complete="onComplete" />
                </div>
            </a-modal>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { VueDaumPostcodeCompleteResult, VueDaumPostcode } from 'vue-daum-postcode'

export default defineComponent({
    components: {
        VueDaumPostcode
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