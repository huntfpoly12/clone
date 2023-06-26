<template>
  <!-- Check start date and finishDate -->
  <div ref="inputDateCustom" :class="isValid ? 'validate-datepicker' : ''" :style="{ width: widthBoder }">
    <Datepicker v-model="date" textInput locale="ko" autoApply format="yyyy-MM-dd" :format-locale="ko"
      @update:modelValue="updateValue" :style="{ height: $config_styles.HeightInput }" @closed="handleClosed"
      :max-date="finishDate" :min-date="startDate" :placeholder="placeholder" :teleport="teleport" :disabled="disabled"
      :enable-time-picker="false" :clearable="clearable" @input="input" />
    <div v-if="isValid" class="message-error">
      <span>{{ Message.getCommonMessage('102').message }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch, onMounted, onBeforeUnmount } from "vue";
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
      type: Object as () => string | number | null,
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
    startDate: {
      type: Object as () => any,
    },
    finishDate: {
      type: Object as () => any,
    },
    teleport: {
      default: false,
      type: [Boolean, String]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Datepicker,
  },
  setup(props, { emit }) {
    const isValid = ref(false)
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
    
    const inputDateCustom = ref()
    let elInput: any = null
    onMounted(() => {
      elInput = inputDateCustom.value.querySelector('input')
      if (elInput) {
        elInput.addEventListener("click", (e: any) => handleSelect(e))
      }
    })
    onBeforeUnmount(() => {
      if (elInput) {
        elInput.removeEventListener("click", (e: any) => handleSelect(e))
      }
    })
    watch(
      () => props.valueDate,
      (newValue) => {
        if (newValue) {
          isValid.value = false
          date.value = filters.formatDate(newValue?.toString());
        } else {
          date.value = newValue;
        }
      }
    );
    const updateValue = () => {
      isValid.value = false
      if (date.value)
        emit("update:valueDate", filters.formatDateToInterger(date.value));
      else
        emit("update:valueDate", date.value);
    };
    // create a ref for the component then call this function
    const validate = (status: boolean) => {
      isValid.value = status
    }
    const handleClosed = () => {
      if (date.value)
        emit("handleClosed", filters.formatDateToInterger(date.value));
      else
        emit("handleClosed", date.value);

    }

    const handleSelect = (e: any) => {
      if (!e.target.value.length) return
      const indexCusor = e.target.selectionStart
      const arrText = e.target.value.split("-")
      if (arrText.length === 1) {
        e.target.select()
      } else {
        const maxIndexYear = arrText[0].length
        const maxIndexMonth = maxIndexYear + arrText[1].length + 1
        const maxIndexDay = maxIndexMonth + arrText[2].length + 1
        if (indexCusor <= maxIndexYear || indexCusor >= maxIndexDay) {
          e.target.setSelectionRange(0, maxIndexYear)
        }
        if (indexCusor >= maxIndexYear + 1 && indexCusor <= maxIndexMonth) {
          e.target.setSelectionRange(maxIndexYear + 1, maxIndexMonth)
        }
        if (indexCusor >= maxIndexMonth + 1 && indexCusor < maxIndexDay) {
          e.target.setSelectionRange(maxIndexMonth + 1, maxIndexDay)
        }
      }
    }

    const input = (e: any) => {
      if (e.target.value.length === 10 && (e.target.selectionStart === 4 || e.target.selectionStart === 7)) {
        if (dayjs(e.target.value, 'YYYY-MM-DD', false).isValid()) {
          if (e.target.selectionStart === 4) {
            e.target.setSelectionRange(5, 7)
          } else {
            e.target.setSelectionRange(8, 10)
          }
        }
      }
    }
    return {
      updateValue,
      date, isValid, validate,
      ko,
      dayjs, Message, widthBoder,
      handleClosed,
      inputDateCustom,
      input
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

  .message-error {
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