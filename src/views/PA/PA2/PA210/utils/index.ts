import filters from "@/helpers/filters";
import dayjs from "dayjs";
import {
    WageReportType,
    enum2Entries,
} from "@bankda/jangbuda-common";
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
        return { "style": { color: 'black', backgroundColor: 'white', border: '1px solid black',width: '75px' }, "tag_name": "정기"};
    } 
    if (index == 0 && afterDeadline == true) {
        return { "style": { color: 'black', backgroundColor: '1px solid black',width: '75px' }, "tag_name": "기한후" };
    } 
    if (index > 0 && afterDeadline == false) {
        return { "style": { color: 'white', backgroundColor: 'orange',width: '75px' }, "tag_name": `수정 ${index}`};
    }
}
export const getReportType = (data: any) => {
    let text = '';
    let style = null;
    enum2Entries(WageReportType).map((value) => {
        if (data == value[1]) {
            text = value[0];
            style = data == 1 ? { color: 'white', backgroundColor: 'black' } : { color: 'white', backgroundColor: 'gray' }
        }
    });
    return { 'text': text, 'style': style }
};

export const showTooltipYearMonth = (reportType: any, startYearMonth: any, finishYearMonth: any) => {
    if (reportType == 1) {
        return filters.formatDate(finishYearMonth.toString(), 'YYYY-MM')
    } else {
        if (!finishYearMonth) return filters.formatDate(startYearMonth.toString(), 'YYYY-MM');
        return filters.formatDate(startYearMonth.toString(), 'YYYY-MM') + (finishYearMonth ? '~' +
        filters.formatDate(finishYearMonth.toString(), 'YYYY-MM') : '')
    }
        
}


export const  getObjectWithPositiveValues = (obj:any)=>{
  if (typeof obj !== 'object' || obj === null) {
    return null;
  }

  let hasPositiveValue = false;

  for (let key in obj) {
    if (key === 'code') {
      continue;
    }
    if (typeof obj[key] === 'number' && obj[key] > 0) {
      hasPositiveValue = true;
      break; 
    }
  }

  if (hasPositiveValue) {
    return true;
  } else {
    return false;
  }
}
