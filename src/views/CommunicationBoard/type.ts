import {InjectionKey, Ref, UnwrapRef} from "vue";

export enum ClassificationEnum {
  'COMMON' = '일반',
  'ACCOUNTING' = '회계',
  'SOURCE' = '원천',
  'MAJOR_INSURANCE' = '4대보험'
}

export interface DataCompanyTab3 {
  id: number
  code: string
  name: string
  address: string
  active: boolean
  // phone: string
  // presidentName: string
  // presidentMobilePhone: string
  // manageStartDate: number
  // usedAccountingCount: boolean
  // usedWithholding: boolean
  // servicePrice: number
  // compactSalesRepresentative: {
  //   name: string
  // }
  // manageCompactUser: {
  //   name: string
  // }
  // canceledAt: number
  // unpaidMonths: number
}

export interface RecentAdminCommunicationMessages {
  cursor: string
  node: {
    companyId: number
    messageId: number
    expresstionType: number
    classification: string
    writedAt: string
    content: string
    secret: boolean
    fiscalYear: number
    facilityBusinessId: number
    year: number
    month: number
    writerCompactUser: {
      id: number
      type: string
      name: string
      username: string
      active: boolean
    }
  }
}

export interface MessageDetail {
  companyId: number
  messageId: number
  writedAt: number
  content?: string
  createdAt: number
  createdBy: string
  updatedAt: number
  updatedBy: string
  ip: string
  active: boolean
  expresstionType: number
  classification: string
  company: {
    code: string
    id: number
    name: string
  }
  writerCompactUser: {
    id: number
    name: string
    username: string
    active: boolean
  }
  fileStorages?: Array<{
    id: number
    name: string
    url: string
  }>
}

export const OpenRowKey = Symbol() as InjectionKey<(data: MessageDetail) => void>
export const DataRowKey = Symbol() as InjectionKey<Ref<UnwrapRef<MessageDetail | null>>>
export const DataCompanyTab3 = Symbol() as InjectionKey<Ref<UnwrapRef<DataCompanyTab3 | null>>>
export const OpenRowCompanyTab3 = Symbol() as InjectionKey<(data: DataCompanyTab3) => void>
