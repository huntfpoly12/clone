export enum ClickYearStatus {
  none = 'none',
  increasing = 'increasing',
  decreasing = 'decreasing'
}
export enum FormStatus {
  none = 'none',
  adding = 'adding',
  editing = 'editing'
}
export interface SettingState {
  per_page: Number;
  sort: boolean;
  move_column: boolean;
  colomn_resize: boolean;
  row_resize: boolean;
  isPopupVisible: boolean
  formStatus: FormStatus
  clickYearStatus: ClickYearStatus
  newYear: number,
  globalYear: number,
  globalFacilityBizId: number | null,
  accountSubject: any
  
}

export interface PayLoadAccSubject {
  companyId: number,
  fiscalYear: number,
  facilityBizType: number
}
