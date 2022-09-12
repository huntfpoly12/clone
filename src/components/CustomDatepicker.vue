<template>
  <div>
    <DxDateBox  :class="className" :show-clear-button="false" :use-mask-behavior="true" :value="dateValue('2022/08/25')"
      @focusIn="dateOnFocus" :display-format="formatter" type="date" :width="width" :on-value-changed="dateOnFocus" :on-closed="dateOnFocus" :on-enter-key="dateOnFocus" @value-changed="dataReturn"/>
  </div>
</template>
<script lang="ts">
import DxDateBox from "devextreme-vue/date-box";
import { defineComponent,ref } from "vue";
import dayjs, { Dayjs } from 'dayjs';
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
    }
  },
  components: {
    DxDateBox,
  },
  setup(props, { emit }) {
    let className: string = props.id ? `date_${props.id}` :'';
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

    function dateOnFocus(e: any) {
      e.element.querySelector("input.dx-texteditor-input").select();  
    }

    function dataReturn(e: any){
      emit('data-datetime', e);
    }
    
    return {
      dateValue,
      formatter,
      dateOnFocus,
      className,
      dataReturn
    };
  },
});
</script>