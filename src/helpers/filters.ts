
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
    formatDate(date: any, format = "YYYY-MM-DD") {
        if (typeof date == 'number')
            date = date.toString()
        return dayjs(date).format(format)
    },
    formatDateToInterger(date: any) {
        let valueConver = 0
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
    },
    formatMonth(month: number) {
        if (month) {
            if (month < 10) {
                return '0' + month;
            }
            return month;
        }
    },
    formatPhoneNumber(input: string) {
      if (input) {
        let formattedNumber = input.replace(/^(\d{3})(\d{4})(\d{4,})$/, '$1-$2-$3');
        return formattedNumber;
      } return null;
    },
    formatBizNumber(input: any) {
      if(input){
        let inputStr = input.toString();
        if (inputStr) {
          let formattedNumber = `${inputStr.slice(0, 3)}-${inputStr.slice(3, 5)}-${inputStr.slice(5, 10)}`;
          return formattedNumber;
        }
        return input || '';
      }
      return '';
    },
    formatManageId(input: any) {
      if(input){
        let inputStr = input.toString();
        if (inputStr) {
          let formattedNumber = `${inputStr.slice(0, 3)}-${inputStr.slice(3, 5)}-${inputStr.slice(5, 10)}-${inputStr.slice(10, 11)}`;
          return formattedNumber;
        }
        return input || '';
      }
      return '';
    },
    formatResidentId(input: any) {
      if(input){
        let inputStr = input.toString();
        if (inputStr) {
          let formattedNumber = `${inputStr.slice(0, 6)}-${inputStr.slice(6, 13)}`;
          return formattedNumber;
        }
        return input || '';
      }
      return '';
    },
    formatNumber(input: number | string, decimal: number = 0) {
      if (!isNaN(+input)) {
        return input.toLocaleString('en-US', { minimumFractionDigits: decimal, maximumFractionDigits: decimal })
      }
    }
}
export default filters;
