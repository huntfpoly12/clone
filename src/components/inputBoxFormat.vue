<template>
    <div @click="$event.target.select()">
        <DxNumberBox v-if="max!= '' && min!= ''" v-model:value="valueInput" value-change-event="keyup"
            style="height: 33px" @value-changed="changeValueInput" :format="format" :show-spin-buttons="spinButtons"
            :show-clear-button="clearButton" :max="max" :min="min" :disabled="disabled" :class="nameService" />

        <DxNumberBox v-else v-model:value="valueInput" value-change-event="keyup" style="height: 33px"
            @value-changed="changeValueInput" :show-spin-buttons="spinButtons" :show-clear-button="clearButton"
            :disabled="disabled" :class="nameService" />
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
        clearButton: Boolean,
        disabled: Boolean,
        value: String
    },
    data(props) {
        return {
            valueInput: props.value
        }
    },
    components: {
        DxNumberBox
    },
    methods: {
        changeValueInput() {
            let dataCall = {
                name: this.nameService,
                value: this.valueInput
            }
            if (this.valueInput == 0) {
                this.valueInput = ''
            }
            this.$emit("valueInput", dataCall);
        },

    }
})
</script>