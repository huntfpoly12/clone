<template>
  <Datepicker v-model="date" placeholder="Start Typing ..." textInput />
</template>
<script lang="ts">
import { CalendarOutlined } from '@ant-design/icons-vue';
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
    CalendarOutlined
  },
  watch:{
    displayDatepicker(){
      console.log('xxxxx');
    }
  },
  setup(props, { emit }) {
    let displayDatepicker: boolean = false;
    let className: string = props.id ? `date_${props.id}` :'';
    let dateFormat: string | undefined = props.dateFormat;
    let value = ref<Dayjs>();
    function dateValue(
      date: string | number | Date | dayjs.Dayjs | null | undefined
    ) {
      return dayjs(date, dateFormat);
    }
    const date = ref();

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

    function autoFormatDate(e:any) {
      console.log(e.element.querySelector("input.dx-texteditor-input").value);
    }

 
    // function dateOnFocus(value: any) {
    //   this.$el.querySelector("input").select();
    //   value = value;
    // }
    function dataReturn(e: any){
      emit('data-datetime', e);
    }

    function xxx(){
      displayDatepicker = !displayDatepicker;
     console.log(displayDatepicker);
    }
    return {
      date,
      dateValue,
      formatter,
      // dateOnFocus,
      className,
      dataReturn,
      autoFormatDate,
      value,
      xxx,
      displayDatepicker
    };
  },
});
</script>
<style>

</style>