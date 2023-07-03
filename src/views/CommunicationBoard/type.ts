import { InjectionKey, Ref, UnwrapRef } from "vue";

export interface DataRow {
	id: number
	title: string
	content: string
	date: Date
	expressionType: number
}

export const OpenRowKey = Symbol() as InjectionKey<(data: DataRow) => void>
export const DataRowKey = Symbol() as InjectionKey<Ref<UnwrapRef<DataRow | null>>>
