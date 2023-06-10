interface Origindata {
  page: number;
  rows: number;
  statuses: number[];
  grade: null | number;
  name: string;
  code: string;
}
export const origindata: Origindata = {
  page: 1,
  rows: 10,
  statuses: [1],
  grade: null,
  name: "",
  code: "",
};

export const ArrForeigner = [
  { id: false, text: "내국인" },
  { id: true, text: "외국인" },
];

export const valueDefaultAction = {
  key: 0,
  employeeId: "",
  foreigner: false,
  incomeTypeCode: "",
  incomeTypeName: "",
  name: "",
  residentId: "",
  status: null,
  email: "",
  nationality: "대한민국",
  nationalityCode: "KR",
  stayQualification: null,
  deletable: false,
};
