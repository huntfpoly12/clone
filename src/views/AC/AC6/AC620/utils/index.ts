type StringOrNull = string | null;
export type BackerCreateInput = {
  backerCode?: string | number;
  name: string;
  fundrasingInstitution?: boolean;
  donationOrganization?: boolean;
  residentId?: StringOrNull;
  bizNumber?: StringOrNull;
  roadAddress?: StringOrNull;
  addressExtend?: StringOrNull;
  phone?: StringOrNull;
  use: boolean;
  year?: number;
  type: number;
  nonProfitCorpType?: number;
  otherContents?: StringOrNull;
};
export const initBackerCreateInput: BackerCreateInput = {
  backerCode: 0,
  name: "",
  type: 1,
  nonProfitCorpType: 9,
  otherContents: "",
  fundrasingInstitution: false,
  donationOrganization: false,
  bizNumber: "",
  roadAddress: "",
  addressExtend: "",
  phone: "",
  use: true,
  residentId: "",
};
