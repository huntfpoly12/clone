
import dayjs, { Dayjs } from 'dayjs';
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(weekday);
dayjs.extend(localeData);

const filters = {
    formatCurrency(input: number) {
        if (isNaN(input)) {
            return "-";
        }
        return input.toLocaleString('ko-KR');
    },
    formatDate(date: any){
        return dayjs(date).format('YYYY-MM-DD')
    },

}
export default filters;