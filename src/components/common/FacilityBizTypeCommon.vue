<template>
    <DxLookup :data-source="states" value-expr="ID" display-expr="Name" />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import DxCheckBox from 'devextreme-vue/check-box';
import {
    DxLookup
} from "devextreme-vue/data-grid";
import bizTypeList from "../../constants/facilityBizType";
export default defineComponent({
    props: { 
    },
    components: {
        DxCheckBox
    },

    setup(props, { emit }) {
        const states = ref(bizTypeList)

        return {
            states
        }
    },
});
</script> 
