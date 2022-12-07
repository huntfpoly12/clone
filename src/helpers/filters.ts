
import dayjs, { Dayjs } from 'dayjs';
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import {
    DependantsRelation,
    enum2Entries,
} from "@bankda/jangbuda-common";
var dependantsRelation = enum2Entries(DependantsRelation).map((value) => ({
    value: value[1],
    label: value[0],
}));
dayjs.extend(weekday);
dayjs.extend(localeData);

const filters = {
    formatCurrency(input: number) {
        if (isNaN(input)) {
            return "-";
        }
        return input.toLocaleString('ko-KR');
    },
    formatDate(date: any) {
        return dayjs(date).format('YYYY-MM-DD')
    },
    formatRelation(idRelation: number) {
        const obj = dependantsRelation.filter((item: any) => {
            let check = item.label.charAt(0) == idRelation;
            return check;
        })
        return obj[0].label;
    }
}
export default filters;