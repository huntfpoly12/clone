<template>
    <div style="display: flex;
    align-items: center;" :class="{'text_under':isUnder}">
        <span style="margin-right: 5px;">{{year}}-{{month > 9 ? month : '0'+month}}</span>
        <div v-if="value == 10" class="badge entering"></div>
        <div v-if="value == 20" class="badge input closing"></div>
        <div v-if="value == 30" class="badge adjusting"></div>
        <div v-if="value == 40" class="badge adjusted closing"></div>
    </div>
    
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    props: {
        value: {
            type: Number,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        month: {
            type: Number,
            required: true
        },
        isUnder: {
            type: Boolean,
            default:false,
        }
    },
});
</script>
<style lang="scss" scoped>
.badge {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}
.entering {
    background-color: blue;
    box-shadow: rgba(0, 0, 0, 0.384) 0px 0px 5px 4px;
}
.input {
    background-color: blue;
    border: 3px solid rgb(2, 2, 119);
}
.adjusting {
    background-color: red;
    box-shadow: rgba(0, 0, 0, 0.384) 0px 0px 5px 4px;
}
.adjusted {
    background-color: red;
    border: 3px solid rgb(114, 4, 4);
}
.text_under{
    &:hover{
        text-decoration: underline;
    }
}
</style>
    
    