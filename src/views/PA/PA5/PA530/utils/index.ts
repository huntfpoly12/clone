import { computed } from "vue";
const globalYear: any = computed(() => parseInt(sessionStorage.getItem("paYear") ?? "0"))
export const initialArrCheckBoxSearch = {
    quarter1: {
        label: "1/4분기",
        value: true,
    },
    quarter2: {
        label: "2/4분기",
        value: true,
    },
    quarter3: {
        label: "3/4분기",
        value: true,
    },
    quarter4: {
        label: "4/4분기",
        value: true,
    },
    month1: {
        label: "01월",
        value: true,
        subValue: parseInt(globalYear.value + "01")
    },
    month2: {
        label: "02월",
        value: true,
        subValue: parseInt(globalYear.value + "02")
    },
    month3: {
        label: "03월",
        value: true,
        subValue: parseInt(globalYear.value + "03")
    },
    month4: {
        label: "04월",
        value: true,
        subValue: parseInt(globalYear.value + "04")
    },
    month5: {
        label: "05월",
        value: true,
        subValue: parseInt(globalYear.value + "05")
    },
    month6: {
        label: "06월",
        value: true,
        subValue: parseInt(globalYear.value + "06")
    },
    month7: {
        label: "07월",
        value: true,
        subValue: parseInt(globalYear.value + "07")
    },
    month8: {
        label: "08월",
        value: true,
        subValue: parseInt(globalYear.value + "08")
    },
    month9: {
        label: "09월",
        value: true,
        subValue: parseInt(globalYear.value + "09")
    },
    month10: {
        label: "10월",
        value: true,
        subValue: parseInt(globalYear.value + "10")
    },
    month11: {
        label: "11월",
        value: true,
        subValue: parseInt(globalYear.value + "11")
    },
    month12: {
        label: "12월",
        value: true,
        subValue: parseInt(globalYear.value + "12")
    },
}