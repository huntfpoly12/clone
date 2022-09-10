<template>
  <div>
    <DxDateBox
      :show-clear-button="false"
      :use-mask-behavior="true"
      :value="dateValue('2022/08/25')"
      @focusIn="dateOnFocus"
      :display-format="formatter"
      type="date"
      :width="width"
    />
  </div>
</template>
<script lang="ts">
import DxDateBox from "devextreme-vue/date-box";
import { defineComponent } from "vue";
import dayjs from "dayjs";
export default defineComponent({
  props: {
    dateFormat:{
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
  },
  components: {
    DxDateBox,
  },
  setup(props) {
    let dateFormat: string | undefined = props.dateFormat;

    function dateValue(
      date: string | number | Date | dayjs.Dayjs | null | undefined
    ) {
      return dayjs(date, dateFormat);
    }

    function formatter(date: {
      getDate: () => any;
      getMonth: () => number;
      getFullYear: () => any;
    }) {
      const day = date.getDate();
      const customDay = day < 10 ? "0" + day : day;
      const month = date.getMonth() + 1;
      const customMonth = month < 10 ? "0" + month : month;
      const year = date.getFullYear();
      return `${year}-${customMonth}-${customDay}`;
    }

    function dateOnFocus(e: {
      element: {
        querySelector: (arg0: string) => {
          (): any;
          new (): any;
          select: { (): void; new (): any };
        };
      };
    }) {
      e.element.querySelector(".dx-texteditor-input").select();
    }
    return {
      dateValue,
      formatter,
      dateOnFocus,
    };
  },
});
</script>