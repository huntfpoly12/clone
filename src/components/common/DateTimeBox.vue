<template>
    <!-- check a birthday not later than the current date (if any) -->
    <div :class="isValid ? 'validate-datepicker':''" :style="{ width: widthBoder }">
      <Datepicker v-model="date" :textInput="textInput" locale="ko" autoApply format="yyyy-MM-dd" :format-locale="ko"
          @update:modelValue="updateValue" :style="{ height: $config_styles.HeightInput }"
          :max-date="birthDay ? new Date() : ''" :placeholder="placeholder" :range="range"
          :multi-calendars="multiCalendars"
          :teleport="teleport" :disabled="disabled"
          :clearable="clearable"
          >
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
            type: Object as () => string | number | Array<any> | null,
            default: parseInt(dayjs().format("YYYYMMDD")),
        },
        id: {
            type: String,
            default: "",
        },
        className: {
            type: String,
        },
        birthDay: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ''
        },
        range: {
            type: Boolean,
            default: false
        },
        textInput: {
            type: Boolean,
            default: true
        },
        multiCalendars: {
            type: Boolean,
            default: false
        },
        teleport: {
          default: false,
          type: [Boolean,String]
        },
        clearable: {
          type: Boolean,
          default: true,
        }
    },
    components: {
        Datepicker,
    },
  setup(props, { emit }) {
        const widthBoder = computed(() => {
          const regex1 = /\%/gm;
          const regex2 = /px/gm;
          if ((regex1.exec(props.width))) {
            return String(parseInt(props.width.replace("px", "")) + 2) + '%'
          }
          if ((regex2.exec(props.width))) {
            return String(parseInt(props.width.replace("px", "")) + 2) + 'px'
          }
        })
        const date: any = ref(filters.formatDate(props.valueDate))
        const isValid = ref(false)
        watch(
            () => props.valueDate,
            (newValue) => {
                if (!props.range) {
                    if (newValue) {
                        isValid.value  = false
                        date.value = filters.formatDate(newValue?.toString());
                    }
                    else
                        date.value = newValue;
                } else {
                    if (newValue?.constructor == Array) {
                        date.value = newValue.map((item: any) => {

                            return filters.formatDate(item);
                        });
                    } else {
                        date.value = []
                    }
                }
            }
        );
        const updateValue = () => {
            isValid.value  = false
            if (date.value) {
                if (props.range) {
                    let newDate = date.value.map((item: any) => {
                        return +dayjs(item).format('YYYYMMDD')
                    });
                    emit("update:valueDate", newDate);
                    return;
                }
                let newDate = typeof date.value == 'object' ? +dayjs(date.value).format('YYYYMMDD') : filters.formatDateToInterger(date.value);
                emit("update:valueDate", newDate);
            }
            else
                emit("update:valueDate", date.value);
        };
        // create a ref for the component then call this function
        const validate = (status : boolean) => {
          isValid.value = status
        }
        return {
            updateValue,
            date,
            ko,widthBoder,
            dayjs,Message,isValid,validate
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
:deep(.dp__disabled) {
  color: #A6A6A6;
  background-color: #fff;
}
</style>
