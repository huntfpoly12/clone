<template>
	<a-modal :visible="modalStatus" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="600">
		<div class="mt-20 " :key="countKey">
			<standard-form formName="ac-120-form-add" ref="refFormAddAC120" class="text-align-center mt-20">
				<a-form-item label="결제예정일자">
					<div class="d-flex-center">
						<date-time-box :teleport="true" v-model:valueDate="valueDate" width="130px" :required="true"/>
						<span class="pl-5">CMS 출금신청자료 (EB21) 파일 다운로드하시겠습니까?</span>
					</div>
				</a-form-item>
			</standard-form>
			<div class="mt-20 text-center">
				<button-basic class="mr-5" :text="'아니오'" :type="'normal'" :mode="'contained'"
					@onClick="cancel" />
				<button-basic class="ml-5" :text="'네. 다운로드합니다'" :type="'default'" :mode="'contained'"
					@onClick="submit" />
			</div>
		</div>
	</a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { companyId } from "@/helpers/commonFunction";
import { useStore } from "vuex";
import dayjs from "dayjs";
import notification from "@/utils/notification";
import { Message } from "@/configs/enum";
import filters from "@/helpers/filters";
// import comfirmClosePopup from '@/utils/comfirmClosePopup';
import {
	ResolutionType,
	LetterOfApprovalType,
	ResolutionClassification,
	FundingSource,
	enum2Entries,
} from "@bankda/jangbuda-common";
export default defineComponent({
	props: {
		modalStatus: {
			type: Boolean,
			default: false,
		}
	},
	components: {

	},

	setup(props, { emit }) {
		const store = useStore();
		const countKey = ref<number>(0);
		const valueDate = ref()
		// =================== GRAPHQL ===================


		// ================== WATCH ================


		watch(
			() => props.modalStatus,
			(newValue, old) => {
				if (newValue) {

					countKey.value++;
				}
			}
		);


		// ================ FUNCTION ============================================

		const submit = () => {

		};
		const cancel = () => {
			emit("closePopup", false);
		};

		return {
			submit,
			cancel,
			valueDate,
			countKey,
			store,

		};
	},
});
</script>

<style lang="scss" scoped></style>
