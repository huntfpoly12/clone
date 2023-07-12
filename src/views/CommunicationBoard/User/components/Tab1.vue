<template>
	<div style="text-align: end">
		<DxButton @click="reloadData">
			<ReloadOutlined style="font-size: 14px;" />
		</DxButton>
	</div>
	<div class="wrapper">
		<!-- <ExpressionType  /> -->
		<a-spin :spinning="loadingTable">
			<div v-if="dataSource" class="wrapper-content">
				<div v-for="data in dataSource.edges" :key="data" class="question-container-tab1"
					@click="openRow(data.node.expresstionType)">
					<div class="d-flex-center gap-10">
						<ExpressionType :valueSelect="data.node.expresstionType" :isSelect="false" />
						<div class="font-bold" :class="data.node.writerCompactUser.type == 'm' ? 'blue' : 'black'">{{
							data.node.writerCompactUser.name }}</div>
						<div class="time">{{ dayjs(data.node.writedAt).format('YYYY-MM-DD hh:mm:ss') }}</div>
						<div class="classification" v-if="data.node.expresstionType == 1">
							{{ data.node.classification }}
						</div>
						<div class="classification" v-if="data.node.expresstionType == 4">
							<!-- <resolution-classification-select :valueInput="data.node.classification" /> -->
						</div>
						<div v-if="data.node.expresstionType == 2" class="d-flex-center">
							<checkbox-basic :valueCheckbox="data.node.secret" disabled="true" />
							<span>비밀글</span>
							<info-tool-tip>선택시 작성글과 답글은 작성자만 조회할 수 있습니다</info-tool-tip>
						</div>
					</div>
					<div class="truncate">{{ data.node.content }}</div>
				</div>
			</div>
		</a-spin>
	</div>
</template>

<script lang="ts">
import { getFakeData } from "../utils/index";
import { defineComponent, reactive, ref } from "vue";
import dayjs from "dayjs";
import { ReloadOutlined } from '@ant-design/icons-vue';
import { openTab } from "@/helpers/commonFunction"
import queries from "@/graphql/queries/CommunicationBoard/User/index";
import { useQuery, useMutation } from "@vue/apollo-composable";
import notification from "@/utils/notification";
import { companyId } from "@/helpers/commonFunction";
import DxButton from "devextreme-vue/button";
import { getJwtObject } from "@bankda/jangbuda-common";
export default defineComponent({
	components: {
		ReloadOutlined,
		DxButton
	},
	setup(props, { emit }) {
		const dataSource = ref<any>()
		dataSource.value = getFakeData()
		// const loading = ref(false)
		const token = ref(sessionStorage.getItem("token"))
		let jwtObject = getJwtObject(token.value!);

		const trigger = ref<boolean>(true)
		const originData = reactive({
			companyId: companyId,
			filter: {
				first: 2,
				after: null,
			},
			currentUserId: jwtObject.userId,
		})
		// ============ GRAPQL ===============================
		const { loading: loadingTable, onResult: resRecentWorkCommunicationMessages, onError
		} = useQuery(queries.getRecentWorkCommunicationMessages, originData, () => ({
			enabled: trigger.value,
			fetchPolicy: "no-cache",
		}));
		onError((error) => {
			trigger.value = false;
			//notification('error', error.message)
		});
		resRecentWorkCommunicationMessages((value) => {
			trigger.value = false;
			dataSource.value = value.data.getRecentWorkCommunicationMessages;

		});

		const openRow = (expressionType: number) => {
			console.log(expressionType);
			switch (expressionType) {
				case 1:
					return openTab({ name: '마감', url: '/ac-130', id: 'ac-130' })
				case 2:
					return emit('activeKey', 3)
				case 3:
					return emit('activeKey', 3)
				case 4:
					return emit('activeKey', 2)
				default:
			}
		}
		const reloadData = () => {
			trigger.value = true;
		}
		return {
			dataSource, loadingTable,
			dayjs,
			openRow,
			reloadData,
		}
	}

})
</script>

<style scoped lang="scss" src="../style/style.scss"></style>
