<template>
    <div class="custom-item">
        <DxTextBox :value="stydefault.id" :read-only="true" class="product-name" />
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import DxTextBox from 'devextreme-vue/text-box';
export default defineComponent({
    components: {
        DxTextBox,
    },
    props: ['fieldData'],
    setup(props) {
        let stydefault = ref({
            id: 3,
            color: 'white',
            name: "영업자회원",
            type: "r",
            grade: "",
            background: 'grey',
            border: "1px solid grey"
        })
        if (props.fieldData)
            stydefault.value = props.fieldData

        // watch(
        //     () => props.fieldData,
        //     (newValue, old) => { 
        //         console.log(newValue);

        //         // stydefault.value = newValue
        //     }
        // );


        return {
            stydefault
        }
    }

});
</script>
  