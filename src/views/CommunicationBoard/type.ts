import { InjectionKey, Ref, UnwrapRef } from "vue";

export interface DataRow {
	id: number
	title: string
	content: string
	date: Date
	expressionType: number
	active: boolean
	mutual: string
	address: string
	classification: string
	writer: string
	dateOfCreation: string
	replyDateAndTime: string
}

export const OpenRowKey = Symbol() as InjectionKey<(data: DataRow) => void>
export const DataRowKey = Symbol() as InjectionKey<Ref<UnwrapRef<DataRow | null>>>
