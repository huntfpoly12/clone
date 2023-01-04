
import dayjs, { Dayjs } from 'dayjs';
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import {
    DependantsRelation,
    enum2Entries,
} from "@bankda/jangbuda-common";
import moment from 'moment';
var dependantsRelation = enum2Entries(DependantsRelation).map((value) => ({
    value: value[1],
    label: value[0],
}));
dayjs.extend(weekday);
dayjs.extend(localeData);

const filters = {
    formatCurrency(input: any) {
        if(input){
            if (isNaN(input)) {
                return "-";
            }
            return input.toLocaleString('ko-KR');
        } return 0;
    },
    formatDate(date: any) {
        return dayjs(date).format('YYYY-MM-DD')
    },
    formatDateToInterger(date: any) {
        return parseInt(dayjs(date).format('YYYYMMDD'))
    },

    formatDateScalar(date : any) {
        return moment(date, "YYYYMMDD").format('YYYY-MM-DD');
    },
    formatRelation(idRelation: number) {
        const obj = dependantsRelation.filter((item: any) => {
            let check = item.label.charAt(0) == idRelation;
            return check;
        })
        return obj[0].label;
    },
    formatDay(day: number){
        if(day<10) {
            return '0' + day;
        }
        return day;
    },
    useImage(url: string){
      return new URL(`/src/assets/images/${url}`, import.meta.url).href;
    }
    
}
export default filters;
