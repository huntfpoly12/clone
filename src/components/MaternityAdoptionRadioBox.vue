<template>
    <DxRadioGroup :items="maternityAndAdoption" :value="data" :layout="layoutCustom" @valueChanged="changeValueRadioGroup"  value-expr="id"
              display-expr="text"/>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, watch, ref,computed } from "vue";
import DxRadioGroup from 'devextreme-vue/radio-group';
import {
    MaternityAndAdoption,
    enum2Entries,
  } from "@bankda/jangbuda-common";

export default defineComponent({
    props: {
        valueRadioCheck: {
            type: Object
        },
        layoutCustom: {
            type: String
        },
    },
    components: {
        DxRadioGroup
    },

    setup(props, { emit }) {
         
      var  maternityAndAdoption : any  = computed(() => {
          let mtAndAdoption : any =  enum2Entries(MaternityAndAdoption).map((value) => ({
          id: value[1],
          text: value[0],
        }));
        return mtAndAdoption;
      }) ;
        const app: any = getCurrentInstance()
        const styleCheckBox = app.appContext.config.globalProperties.$config_styles
        const data = ref(props.valueRadioCheck);
        const changeValueRadioGroup = (e: any) => {
            emit("update:valueRadioCheck", e.value);
        }

        watch(
            () => props.valueRadioCheck,
            (value) => {
                data.value = value

            }
        );
        return {
            maternityAndAdoption,
            changeValueRadioGroup,
            styleCheckBox,
            data,
        }
    },
});
</script>

<style lang="scss" scoped>
::v-deep .dx-radiobutton-icon-checked .dx-radiobutton-icon-dot {
    background: v-bind("styleCheckBox.ColorCheckBox");
    margin-top: -13px;
    margin-left: 3px;
}

::v-deep .dx-radiobutton-icon::before {
    border: 1px solid v-bind("styleCheckBox.ColorCheckBox");
    width: 14px;
    height: 14px;
}

::v-deep .dx-radio-value-container {
    padding-right: 0px
}

::v-deep .dx-radiobutton {
    line-height: 18px;
}
</style>