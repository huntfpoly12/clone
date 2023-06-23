export interface ISearchCompanyAccountingDeadlines {
  fiscalYear: number;
  year: number;
  month: number;
  statuses?: number[];
  manageUserId?: number | null;
  salesRepresentativeId?: number | null;
  excludeCancel: boolean;
}
