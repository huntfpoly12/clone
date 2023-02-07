<template>
    <div :class="fieldData?.id != 'c' ? 'custom-item-input-bf-210' : 'custom1-item-input-bf-210'"
        :style="{ width: '100px', background: stydefault.background, padding: '0px 0 0 12px', borderRadius: '5px', border: stydefault.border, height: '25px', margin: '4px 0px 0 4px' }">
        <DxTextBox :value="stydefault && stydefault.name" :read-only="true" class="product-name" />
    </div>
</template>
<script script lang ="ts">
import { reactive, defineComponent, watch } from "vue";
import DxTextBox from 'devextreme-vue/text-box';
export default defineComponent({
    props: ['fieldData'],
    components: {
        DxTextBox,
    },
    setup(props) {
        let stydefault = reactive({
            id: 3,
            color: 'black',
            name: "영업자회원",
            type: "r",
            grade: "",
            background: 'grey',
            border: "1px solid grey"
        })
        if (props.fieldData)
            stydefault = props.fieldData

        return {
            stydefault
        }
    }

});
</script> 

<style  lang="scss">
.custom-item-input-bf-210 {
    padding: 0px !important;

    .dx-texteditor-input {
        color: white;
    }

    .product-name {
        margin-top: -5px;
    }
}

.custom1-item-input-bf-210 {
    padding: 0px !important;

    .dx-texteditor-input {
        color: black;
    }

    .product-name {
        margin-top: -5px;
    }
}
</style>