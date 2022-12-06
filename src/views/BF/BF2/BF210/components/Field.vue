<template>
    <div>
        <div class="custom-item"
            :style="{ width: '100px', background: stydefault.background, padding: '0px 0 0 12px', borderRadius: '5px', border: stydefault.border, height: '25px', margin: '4px 0px 0 4px' }">
            <DxTextBox :value="stydefault && stydefault.name" :read-only="true" class="product-name" />
        </div>
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
            color: 'white',
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

<style scoped>
::v-deep .dx-texteditor-input {
    padding: 0;
    color: white;
}

::v-deep .product-name {
    margin-top: -5px;
}
</style>