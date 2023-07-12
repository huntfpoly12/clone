import {ClassificationEnum, RowEditDefault, TypeEditMessage} from "@/views/CommunicationBoard/type";

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
export const rowEditDefault: RowEditDefault = {
  id: 0,
  content: '',
  files: [],
  isEdit: false,
  classification: ClassificationEnum.MAJOR_INSURANCE
}
