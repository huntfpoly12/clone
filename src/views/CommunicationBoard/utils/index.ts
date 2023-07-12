import { ClassificationEnum } from "@/views/CommunicationBoard/type";

export const messageTab3 = {
  messageId: 0,
  active: true,
  expresstionType: 4,
  code: '',
  company: {
    code: "",
    id: 0,
    name: '',
    address: '',
    active: true,
  },
  writerCompactUser: {
    id: 0,
    name: '',
    username: '',
    active: true,
  },
  fileStorages: "",
  classification: ClassificationEnum.MAJOR_INSURANCE
}
interface RowEditDefault {
  id: number
  content: string
  files: Array<{ id: number, url: string, name: string }>
  isEdit: boolean
  classification: ClassificationEnum
}
export const rowEditDefault: RowEditDefault = {
  id: 0,
  content: '',
  files: [],
  isEdit: false,
  classification: ClassificationEnum.MAJOR_INSURANCE
}
