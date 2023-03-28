<template>
    <!-- Check start date and finishDate -->
    <div :class="isValid ? 'validate-datepicker':''" :style="{ width: widthBoder+'px' }">
      <Datepicker v-model="date" textInput locale="ko" autoApply format="yyyy-MM-dd" :format-locale="ko"
          @update:modelValue="updateValue" :style="{ height: $config_styles.HeightInput, width: width }"
          :max-date="finishDate" :min-date="startDate" :placeholder="placeholder"
          :teleport="teleport" :disabled="disabled" >
      </Datepicker>
      <div v-if="isValid" class="message-error">
        <span>{{ Message.getCommonMessage('102').message }}</span>
      </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ko } from "date-fns/locale";
import filters from "@/helpers/filters";
import dayjs from 'dayjs';
import { Message } from "@/configs/enum";
export default defineComponent({
    props: {
        width: {
            default: "100%",
            type: String,
        },
        valueDate: {
            type: [Number, String],
            default: parseInt(dayjs().format("YYYYMMDD")),
        },
        id: {
            type: String,
            default: "",
        },
        className: {
            type: String,
        },
        placeholder: {
            type: String,
            default: ''
        },
        startDate: Date,
        finishDate: Date,
        teleport: {
          default: false,
          type: [Boolean,String]
        },
        disabled: {
            type: Boolean,
            default: false
        },
    },
    components: {
        Datepicker,
    },
    setup(props, { emit }) { 
        const isValid = ref(false)
        const widthBoder = computed(()=> parseInt(props.width.replace("px", "")) + 2 )
        const date: any = ref(filters.formatDate(props.valueDate))
        watch(
            () => props.valueDate,
            (newValue) => {
              if (newValue) {
                isValid.value  = false
                date.value = filters.formatDate(newValue?.toString());
              } else {
                date.value = newValue;
              }
            }
        ); 
        const updateValue = () => {
            isValid.value  = false
            if (date.value)
                emit("update:valueDate", filters.formatDateToInterger(date.value));
            else
                emit("update:valueDate", date.value);
        };
        // create a ref for the component then call this function
        const validate = (status : boolean) => {
          isValid.value = status
        }
        return {
            updateValue,
            date,isValid,validate,
            ko,
            dayjs,Message,widthBoder
        };
    },
});
</script> 


<style lang="scss" scoped>
.dp__disabled {
    background: #fff;
    border: 1px solid #ddd;
    opacity: .5
}

.validate-datepicker {
  border: 1px #d9534f;
  border-radius: 5px;
  border-style: solid;
  height: 31px;
  .message-error{
    position: absolute;
    border-radius: 5px;
    background: #d9534f;
    padding: 5px 20px;
    color: white;
    z-index: 999999;
    width: auto;
  }
}
</style>
