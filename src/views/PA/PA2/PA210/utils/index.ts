import filters from "@/helpers/filters";
import dayjs from "dayjs";
export const radioLeaved = [
   
]
export const dataFormAction = {
    row1: {
        date: filters.formatDateToInterger(dayjs()),
        checkbox: true
    },
    row2: {
        date: '',
        checkbox: false
    },
    row3: {
        date: '',
        checkbox: false
    },
    row4: {
        date: '',
        checkbox: false
    },
}