<template>
	<div class="wrapper">
		<a-spin :spinning="loading">
			<div v-if="dataSource" class="wrapper-content">
				<div v-for="data in dataSource" :key="data.id" class="question-container"
					@click="openRow(data.expressionType)">
					<div class="d-flex-center gap-10">
						<div :class="`tag ${getTag(data.expressionType).class}`">{{ getTag(data.expressionType).text }}
						</div>
						<div class="font-bold">id_{{ data.id }}</div>
						<div class="time">{{ dayjs(data.date).format('YYYY-MM-DD hh:mm:ss') }}</div>
						<div class="classification">회계-마감-(2023-05)</div>
					</div>
					<div class="truncate" style=" width: 250px;">{{ data.content }}</div>
				</div>
			</div>
		</a-spin>
	</div>
</template>

<script lang="ts">
import { getFakeData } from "../utils/index";
import { defineComponent, ref } from "vue";
import dayjs from "dayjs";
import { openTab } from "@/helpers/commonFunction"
// import { DataRow, OpenRowKey } from "@/views/CommunicationBoard/type";

export default defineComponent({

	setup(props, { emit }) {
		const dataSource = ref<any>()
		dataSource.value = getFakeData()
		const loading = ref(false)
		const getData = () => {
			// loading.value = true
			// setTimeout(() => {
			//   dataSource.value = getFakeData()
			//   loading.value = false
			// }, 500)
		}
		const getTag = (expressionType: number) => {
			switch (expressionType) {
				case 1:
					return {
						text: '문의',
						class: 'tag-inquiry'
					}
				case 2:
					return {
						text: '답글',
						class: 'tag-reply'
					}
				case 3:
					return {
						text: '알림',
						class: 'tag-alarm'
					}
				case 4:
					return {
						text: '일반',
						class: 'tag-white'
					}
				default:
					return {
						text: '', class: ''
					}
			}
		}
		const openRow = (expressionType: number) => {
			console.log(expressionType);

			switch (expressionType) {
				case 1:
					return emit('activeKey', 3)
				case 3:
					return emit('activeKey', 2)
				case 4:
					return openTab({ name: '마감', url: '/ac-130', id: 'ac-130' })
				default:

			}
		}
		return {
			dataSource, loading,
			getData,
			getTag,
			dayjs,
			openRow,
		}
	}

})
</script>

<style scoped lang="scss" src="../style/style.scss"></style>
