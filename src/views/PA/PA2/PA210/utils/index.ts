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

export const getAfterDeadline = (index: number, afterDeadline :  boolean) => {
    if (index == 0 && afterDeadline == false) {
        return { "style": { color: 'black', backgroundColor: 'white', border: 'black' }, "tag_name": "정기" };
    } 
    if (index == 0 && afterDeadline == true) {
        return { "style": { color: 'white', backgroundColor: 'black' }, "tag_name": "기한후" };
    } 
    if (index > 0 && afterDeadline == false) {
        return { "style": { color: 'white', backgroundColor: 'orange' }, "tag_name": `수정(${index})` };
    }
}
