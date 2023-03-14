<template>
    <div class="year-custom-1" :style="{height: $config_styles.HeightInputl, backgroundColor: color }">
      <Datepicker
        autoApply
        yearPicker 
        v-model="newDate"
        @update:modelValue="handleDate"
        :disabled="disabled"
        :year-range="[minYear, maxYear]"
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
import dayjs, { Dayjs } from 'dayjs';
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
        },
        minYear: {
          type: Number,
          default: 1970,
        },
        maxYear: {
          type: Number,
          default: dayjs().year() + 1,
        },
        color: {
          type: String,
          default: "black",
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
    width: fit-content;
    padding: 3px 16px;
}
</style>
