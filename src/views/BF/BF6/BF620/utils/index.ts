export const reportTypeCheckbox = [
  { id: 1, text: "정기" },
  { id: 2, text: "수정" },
  { id: 3, text: "기한후" },
]
export const reportTypeTab2 = [
  { id: 1, text: "정기" },
  { id: 2, text: "수정" },
]
export const productionStatusesCheckbox = [
    { id: 0, text: "제작대기",  },
    { id: 1, text: "제작중",  },
    { id: 2, text: "제작성공",  },
    { id: -1, text: "제작실패",  },
]
export const formatMonth = (month: number) => {
  if (month < 10) {
    return '0' + month;
  }
  return month;
};