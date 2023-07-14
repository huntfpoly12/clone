<template>
	<a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
		:width="650">
		<a-spin :spinning="loading" size="large">
			<standard-form action="" name="edit-510">
				<div class="custom-modal-edit">
					<img src="@/assets/images/icon_edit.png" alt="" style="width: 30px" />
					<span>선택된 내역 지급일을</span>
					<date-time-box-custom ref="requiredDayValue" width="150px" :required="true" :startDate="startDate"
						:finishDate="finishDate" v-model:valueDate="dayValue" />
					<span>일로 변경하시겠습니까?</span>
				</div>
				<div class="text-center mt-30">
					<button-basic class="mr-5" :text="'아니요'" :type="'default'" :mode="'outlined'"
						@onClick="setModalVisible" />
					<button-basic class="ml-5" :text="'네. 변경합니다'" :width="140" :type="'default'" :mode="'contained'"
						@onClick="onSubmit" />
				</div>
			</standard-form>
		</a-spin>
	</a-modal>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from "vue";
import notification from "@/utils/notification";
import { companyId } from "@/helpers/commonFunction";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA5/PA510/index";
import { useStore } from "vuex";
import { Message } from "@/configs/enum";
import dayjs from "dayjs";
import { sampleDataIncomeWageDaily } from "../../utils/index";
import filters from "@/helpers/filters";
export default defineComponent({
	props: {
		modalStatus: {
			type: Boolean,
			default: false,
		},
		data: {
			type: Array,
			default: [],
		},
	},
	components: {},
	setup(props, { emit }) {
		const store = useStore();
		const processKey = computed(() => store.state.common.pa510.processKeyPA510);
		const dayValue = ref(1);
		const loading = ref<boolean>(false);
		const startDate = computed(() => dayjs(`${processKey.value.paymentYear}-${processKey.value.paymentMonth}`).startOf("month").toDate());
		const finishDate = computed(() => dayjs(`${processKey.value.paymentYear}-${processKey.value.paymentMonth}`).endOf("month").toDate());
		const requiredDayValue = ref();
		const setModalVisible = () => {
			emit("closePopup", false);
		};
		const { mutate, onDone, onError } = useMutation(
			mutations.changeIncomeWageDailyPaymentDay
		);
		onDone(() => {
			emit("closePopup", false);
			store.state.common.pa510.onDoneEdit = true;
			store.state.common.pa510.loadingTableInfo++;
		});
		onError((e: any) => {
			//notification('error', e.message)
		});
		const onSubmit = (e: any) => {
			if (!dayValue.value) {
				requiredDayValue.value.validate(true);
				return;
			}
			props.data?.forEach((data: any) => {
				mutate({
					companyId: companyId,
					processKey: processKey.value,
					incomeId: data.incomeId,
					day: parseInt(dayValue.value?.toString().slice(6, 8)) ?? 1,
				});
			})
		};
		watch(() => props.modalStatus, (value) => {
			if (value) {
				dayValue.value = sampleDataIncomeWageDaily.paymentDay
					? parseInt(
						`${processKey.value.paymentYear}${filters.formatMonth(
							processKey.value.paymentMonth
						)}${filters.formatMonth(sampleDataIncomeWageDaily.paymentDay)}`
					)
					: parseInt(
						`${processKey.value.paymentYear}${filters.formatMonth(
							processKey.value.paymentMonth
						)}${filters.formatMonth(
							dayjs(
								`${processKey.value.paymentYear}-${processKey.value.paymentMonth}`
							).daysInMonth()
						)}`
					);
			}
		});

		return {
			setModalVisible,
			onSubmit,
			dayValue,
			loading,
			startDate,
			finishDate,
			requiredDayValue,
		};
	},
});
</script>

<style lang="scss" scoped>
.custom-modal-edit {
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: center;
	margin-top: 20px;

	img {
		width: 40px;
		margin-right: 5px;
	}

	span {
		padding: 0px 5px;
	}
}

.list-error {
	margin: 5px 0;
	display: flex;
	align-items: center;
}
</style>
