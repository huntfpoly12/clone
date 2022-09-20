
<template>
    <VueNumberFormat v-if="typeInput == 1" v-model:value="valueInput" style="width: 120px" class="inputNumber"
        :options="{precision: 0,prefix: '', decimal: '.', thousand: ','}" @click="$event.target.select()"
        @change="changeInputNumber">
    </VueNumberFormat>
    <VueNumberFormat v-if="typeInput == 2" v-model:value="valueInput" style="width: 120px" class="inputNumber"
        :options="{precision: 0,prefix: '', decimal: '.', thousand: ''}" @click="$event.target.select()">
    </VueNumberFormat>
</template>

<script>
import { defineComponent } from 'vue';
import VueNumberFormat from 'vue-number-format'
export default defineComponent({
    props: {
        typeInput: String,
    },
    components: {
        VueNumberFormat
    },
    data(props) {
        return {
            valueInput: '',
            typeInput: props.typeInput
        }
    },
    methods: {
        changeInputNumber() {
            console.log(this.valueInput);
            this.$emit("dataInput", this.valueInput);
        }

    },
    mounted() {
        var els = document.getElementsByClassName("inputNumber");
        for (var i = 0; i < els.length; i++) {
            els[i].value = "";
        }
    },
})
</script>


<style lang="scss">
.inputNumber {
    border: 1px solid #d9d9d9;
    padding: 4px 10px;
}

.inputNumber:focus-visible {
    outline: 1px solid #40a9ff;
    border-color: #40a9ff;
    border-radius: 1px;
    box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
    border-right-width: 1px !important;
    outline: 0;
}
</style>
