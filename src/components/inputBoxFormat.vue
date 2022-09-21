<template>
    <div @click="$event.target.select()">
        <DxNumberBox v-if="max!= '' && min!= ''" v-model:value="valueInput" value-change-event="keyup"
            style="width: 120px;height: 33px" @value-changed="changeValueInput" :format="format"
            :show-spin-buttons="spinButtons" :show-clear-button="clearButton" :max="max" :min="min" />

        <DxNumberBox v-else v-model:value="valueInput" value-change-event="keyup" style="width: 120px;height: 33px"
            @value-changed="changeValueInput" :show-spin-buttons="spinButtons" :show-clear-button="clearButton" />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import DxNumberBox from 'devextreme-vue/number-box';
export default defineComponent({
    props: {
        format: String,
        nameService: String,
        min: Number,
        max: Number,
        spinButtons: Boolean,
        clearButton: Boolean

    },
    components: {
        DxNumberBox
    },
    data() {
        return {
            valueInput: ''
        }
    },
    methods: {
        changeValueInput() {
            let dataCall = {
                name: this.nameService,
                value: this.valueInput
            }

            this.$emit("valueInput", dataCall);
        }
    }
})
</script>