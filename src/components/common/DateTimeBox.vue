<template>
    <Datepicker
      v-model="date"
      :class="classNameProps"
      textInput
      autoApply
      :format="format"
      @focus="focusDatetime"
      v-on:blur="alertDate"
      @keyup="getdata"
      @update:modelValue="closeDateTime"
      :format-locale="ko"
      :style="{height: $config_styles.HeightInput, width: width }"
    >
    </Datepicker>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import DxDateBox from "devextreme-vue/date-box";

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ko } from "date-fns/locale";
import { Dayjs } from "dayjs";
export default defineComponent({
  props: {
    dateFormat: {
      default: "YYYY-MM-DD",
      type: String,
    },
    width: {
      default: "100%",
      type: String,
    },
    valueDate: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    className: {
      type: String,
    },
    styleDate: {
      type: String,
    },
  },
  components: {
    DxDateBox,
    Datepicker,
  },
  setup(props, { emit }) {
    const month = ref({
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    });
    let className: string = props.id ? `date_${props.id}` : "";
    let value = ref<Dayjs>();
    let dataInput: any = "";
    let classNameProps = "datepicker" + props.className;
    var date = ref(new Date(props.valueDate));

    const format = (date: any) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    };

    const emitData = () => {
      let classDate = "." + classNameProps + " .dp__input";
      var Url = document.querySelector(classDate) as HTMLInputElement;
      emit("valueDateChange", Url.value);
    };

    watch(
      () => props.valueDate,
      (currentValue, oldValue) => {
        date.value = new Date(currentValue);
      }
    );

    const alertDate = () => {
      if (dataInput) {
        let dateInput = "";
        if (dataInput.length == 8) {
          dateInput =
            dataInput.slice(0, 4) +
            "-" +
            dataInput.slice(4, 6) +
            "-" +
            dataInput.slice(6, 8);
        } else if (dataInput.length == 10) {
          const [year, month, day] = dataInput.split("-");
          dateInput = year + "-" + month + "-" + day;
        }
        let dat = new Date(dateInput);
        date.value = dat;
      }
      emitData();
    };

    const closeDateTime = () => {
      setTimeout(() => {
        let classDate = "." + classNameProps + " .dp__input";
        var Url = document.querySelector(classDate) as HTMLInputElement;
        Url.select();
      }, 200);
    };

    const getdata = () => {
      let classDate = "." + classNameProps + " .dp__input";
      var Url = document.querySelector(classDate) as HTMLInputElement;
      dataInput = Url.value;
    };

    const focusDatetime = () => {
      let classDate = "." + classNameProps + " .dp__input";
      var Url = document.querySelector(classDate) as HTMLInputElement;
      Url.select();
    };

    return {
      classNameProps,
      closeDateTime,
      dataInput,
      focusDatetime,
      getdata,
      alertDate,
      date,
      className,
      value,
      format,
      emitData,
      month,
      ko,
    };
  },
});
</script> 
