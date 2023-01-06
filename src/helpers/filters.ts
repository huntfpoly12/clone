
import dayjs from 'dayjs';
import {
    DependantsRelation,
    enum2Entries,
} from "@bankda/jangbuda-common";
var dependantsRelation = enum2Entries(DependantsRelation).map((value) => ({
    value: value[1],
    label: value[0],
}));
const filters = {
    formatCurrency(input: any) {
        if (input) {
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
        let valueConver = 0
        console.log(`output->date`,date)
        if (date.length <= 7) {
            valueConver = parseInt(dayjs(date).format('YYYYMM'))
        } else {
            valueConver = parseInt(dayjs(date).format('YYYYMMDD'))
        }
        return valueConver
    },
    formatRelation(idRelation: number) {
        const obj = dependantsRelation.filter((item: any) => {
            let check = item.label.charAt(0) == idRelation;
            return check;
        })
        return obj[0].label;
    },
    useImage(url: string) {
        return new URL(`/src/assets/images/${url}`, import.meta.url).href;
    }
}
export default filters;
