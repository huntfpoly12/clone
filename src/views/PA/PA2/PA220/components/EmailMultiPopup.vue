<template>
	<a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
		:width="562">
		<standard-form action="" name="email-single-630">
			<div class="custom-modal-send-email">
				<img src="@/assets/images/emailGroup.png" alt="" style="width: 50px" />
				<div>
					<span>개별 메일이 발송되며, 개별 메일이 등록되지 않은 경우에 한해서
					</span>
					<div style="display: flex; align-items: center">
						<mail-text-box width="250px" :required="true" v-model:valueInput="emailAddress"></mail-text-box>
						<span>로 메일을 발송하시겠습니까?</span>
					</div>
				</div>
			</div>
			<div class="text-center mt-50">
				<button-basic class="mr-5" :text="'아니요'" :type="'default'" :mode="'outlined'"
					@onClick="setModalVisible()" />
				<button-basic class="ml-5" :text="'네. 발송합니다'" :type="'default'"
					:mode="'contained'" @onClick="onSubmit" />
			</div>
		</standard-form>
	</a-modal>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from "vue";
import notification from "@/utils/notification";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA6/PA630/index";
import { makeDataClean, companyId } from "@/helpers/commonFunction";
import { useStore } from "vuex";
export default defineComponent({
	props: {
		modalStatus: {
			type: Boolean,
			default: false,
		},
		data: {
			type: Object,
			default: {},
		},
		dataSelect: Array,
	},
	components: {},
	setup(props, { emit }) {
		const store = useStore();
		const token = computed(() => sessionStorage.getItem("token"));
		store.dispatch("auth/getUserInfor", token.value);
		const userInfor = computed(() => store.state.auth.userInfor);
		let emailAddress = ref("");

		watch(() => props.modalStatus, (val) => {
			emailAddress.value = userInfor.value?.email;
		}, { deep: true, });

		const setModalVisible = () => {
			emit("closePopup", false);
		};

		const {
			mutate: sendEmail,
			onDone: onDoneAdd,
			onError: errorSendEmail,
		} = useMutation(mutations.sendIncomeBusinessWithholdingReceiptReportEmail);
		const onSubmit = (e: any) => {
			var res = e.validationGroup.validate();
			if (!res.isValid) {
				res.brokenRules[0].validator.focus();
			} else {
				let employeeInputs: any = []
				props.dataSelect?.map((value: any) => {
					employeeInputs.push({
						receiverName: value.receiverName,
						receiverAddress: value.receiverAddress ? value.receiverAddress : emailAddress.value,
						senderName: value.senderName,
						employeeId: value.employeeId
					})
				});
				let variables = makeDataClean({
					companyId: companyId,
					input: props.data,
					employeeInputs: employeeInputs
				});
				sendEmail(variables);
			}
		};
		onDoneAdd(() => {
			notification("success", `업데이트 완료!`);
			emit("closePopup", false);
		});
		errorSendEmail((e: any) => {
			//notification('error', e.message)
		});

		return {
			setModalVisible,
			onSubmit,
			emailAddress,
		};
	},
});
</script>

<style lang="scss">
</style>
