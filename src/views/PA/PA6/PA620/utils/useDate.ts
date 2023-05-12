import { computed, defineComponent, ref, watch } from "vue";
// import dayjs from "dayjs";
// import { useStore } from "vuex";
// import filters from '@/helpers/filters';
// export default function useDate() {
//   const store = useStore();
//   let processKeyPA620 = computed(() => store.getters["common/processKeyPA620"]);
//   let day = computed(() => store.getters["common/paymentDayPA620"]);
//   const daysInMonth = ref(+dayjs(`${processKeyPA620.value.paymentMonth}`).daysInMonth());
//   const paymentDayPA620 = computed({
//     get() {
//       let newDay =
//         day.value > daysInMonth.value || day.value == 0 ? daysInMonth.value : day.value;
//       let date = `${processKeyPA620.value.paymentYear}${filters.formatMonth(
//         processKeyPA620.value.paymentMonth
//       )}${newDay}`;
//       console.log(`output->date`,date)
//       return dayjs(date).format('YYYYMMDD');
//     },
//     set(value) {
//       let day = +value.toString().slice(-2);
//       store.commit("common/paymentDayPA620", day);
//     },
//   });
//   const startDate = computed(() => {
//     let day = dayjs(
//       `${processKeyPA620.value.paymentYear}${processKeyPA620.value.paymentMonth}`
//     )
//       .startOf("month")
//       .toDate();
//     return day;
//   });
//   const finishDate = computed(() => {
//     let day = dayjs(
//       `${processKeyPA620.value.paymentYear}${processKeyPA620.value.paymentMonth}`
//     )
//       .endOf("month")
//       .toDate();
//     return day;
//   });
//   const dayNum = computed(()=>+paymentDayPA620.value.toString().slice(-2));
//   return { startDate, finishDate,dayNum, paymentDayPA620 };
// }
