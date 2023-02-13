<template>
    <div class="year-custom-1" :style="{height: $config_styles.HeightInput }">
      <Datepicker
        autoApply
        yearPicker 
        v-model="newDate"
        @update:modelValue="handleDate"
        :disabled="disabled"
      >
          <template #trigger>
              <div class="text-box-1">{{ text }} {{newDate}}</div>
          </template>
      </Datepicker>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default defineComponent({
    props: {
        valueDate: {
            type: [Number, String],
        },
        text: {
            type: String,
            default: "귀",
        },
        disabled: {
          type: Boolean,
          default: false,
        }
    },
    components: {
        Datepicker,
    },
    setup(props, { emit }) {
        let newDate = ref(props.valueDate)
        const handleDate = (val: any) => {
            emit("update:valueDate", val)
        }
        return {
            newDate,
            handleDate
        };
    },
});
</script> 

<style lang="scss" scoped>
.year-custom-1 {
    border-radius: 5px;
    color: white;
    background-color: black;
    width: 80px;
    padding: 3px 16px;
}
</style>
