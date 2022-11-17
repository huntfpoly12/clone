<template>
	<div ref="root">
		<a-modal :visible="modalStatus" :mask-closable="false" centered cancelText="그냥 나가기" @cancel="setModalVisible()"
			width="700px" :footer="null">
			<h2 class="title-h2">이용자정보</h2>
			<standard-form formName="add-cm110">
				<a-row :gutter="24" class="cm-100-popup-add">
					<a-col :span="12">
						<a-form-item label="이용자ID" :label-col="labelCol" class="red">
							<default-text-box :width="150" :required="true" :replaceRegex="true"
								v-model:valueInput="formState.username">
							</default-text-box>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<button-basic :disabled="!disabledCheckUserName" :text="'중복체크'" :type="'default'"
							:mode="'contained'" @onClick="checkUserName" />
					</a-col>
					<a-col :span="12">
						<a-form-item label="성명" :label-col="labelCol" class="red">
							<default-text-box :width="150" :required="true" v-model:valueInput="formState.name">
							</default-text-box>
						</a-form-item>
					</a-col>
					<a-col :span="20">
						<a-form-item label="회계권한(담당사업)" :label-col="labelCol">
							<tag-select-box placeholder="선택하십시오" :arrayValue="bizTypeList"
								v-model:valueTagSelect="formState.facilityBusinessIds" />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="원천권한" :label-col="labelCol">
							<radio-group :arrayValue="optionsRadio" v-model:valueRadioCheck="returnRadio"
								:layoutCustom="'horizontal'" />
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-row>
							<a-col>
								<a-form-item label="휴대폰" class="red" :label-col="labelCol">
									<tel-text-box :width="150" :required="true"
										v-model:valueInput="formState.mobilePhone"></tel-text-box>
								</a-form-item>
							</a-col>
							<a-col>
								<p class="validate-message">‘-’없이 숫자만 입력</p>
							</a-col>
						</a-row>
					</a-col>
					<a-col :span="24">
						<a-row>
							<a-col :span="14">
								<a-form-item label="이메일" class="red" :label-col="labelCol">
									<mail-text-box v-model:valueInput="formState.email" :required="true" />
								</a-form-item>
							</a-col>
							<a-col>
								<p class="validate-message" v-if="!statusMailValidate">이메일 형식이 정확하지 않습니다.</p>
							</a-col>
						</a-row>
					</a-col>
				</a-row>

				<div class="text-align-center mt-20">
					<button-basic class="button-form-modal" text="그냥 나가기" :type="'default'" :mode="'outlined'"
						@onClick="setModalVisible()" />
					<button-basic class="button-form-modal" text="저장하고 나가기" :width="140" :type="'default'"
						:mode="'contained'" @onClick="creactUserNew($event)" />
				</div>
			</standard-form>
		</a-modal>
	</div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive, watch } from "vue";
import DxButton from 'devextreme-vue/button';
import { MailOutlined } from '@ant-design/icons-vue';
import type { SelectProps } from 'ant-design-vue';
import { useQuery, useMutation } from "@vue/apollo-composable";
import mutations from "../../../../../graphql/mutations/CM/CM110/index";
import notification from "../../../../../utils/notification";
import comfirmClosePopup from "../../../../../utils/comfirmClosePopup";
import queries from "../../../../../graphql/queries/CM/CM110/index"
import DxValidationGroup from 'devextreme-vue/validation-group';
import { initialOptionsRadio, initialState } from "../utils/index";
export default defineComponent({
	props: {
		modalStatus: {
			default: false,
			type: Boolean,
		},
		data: null,
	},
	components: {
		MailOutlined,
		DxButton,
		DxValidationGroup

	},
	setup(props, { emit }) {
		const optionsRadio = reactive([...initialOptionsRadio]); 
		const statusMailValidate = ref<boolean>(true);
		const disabledCheckUserName = ref<boolean>(false); 
		let triggers = ref<boolean>(false);
		let triggersUserName = ref<boolean>(false);
		let dataQuery = ref()
		let returnRadio = ref(0);
		watch(() => props.modalStatus, (value) => {
			if (props.data.companyId) {
				triggers.value = true;
				dataQuery.value = { companyId: props.data.companyId };
				refetchData()
			}
			Object.assign(formState, initialState);
		}) 

		const formState = reactive({ ...initialState });
		let objDataDefault = ref({ ...initialState }); 
		watch(() => formState.email, (value) => {
			let checkMail = value.match(
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
			if (!checkMail) {
				statusMailValidate.value = false;
			} else {
				statusMailValidate.value = true;
			}
		})
		let bizTypeList = ref([])
		const { refetch: refetchData, onResult } = useQuery(queries.getDataFacilityBusiness, dataQuery, () => ({ enabled: triggers.value, fetchPolicy: "no-cache", }))

		let dataCallApiCheck = ref({})
		const { refetch: refetchUserName, onResult: onResultUsername } = useQuery(queries.checkUserNameCompany, dataCallApiCheck, () => ({ enabled: triggersUserName.value, fetchPolicy: "no-cache", }))

		onResult(e => {
			let dataRes: any = []
			e.data.getMyCompanyFacilityBusinesses.map((val: any) => {
				dataRes.push({
					name: val.name,
					id: val.facilityBusinessId
				})
			})
			bizTypeList.value = dataRes
		})
		onResultUsername(e => {
			if (e.data)
				if (e.data.isUserRegistableUsername == true) {
					notification('success', `사용 가능한 아이디입니다`)
				} else {
					notification('error', `이미 존재하는 아이디 입니다. 다른 아이디를 입력해주세요`)
				}
		})
		//Creact user in company
		const {
			mutate: creactUser,
			onDone: creactDone,
			onError: creactError
		} = useMutation(mutations.creactUser);


		creactError(e => {
			notification('error', e.message)
		})
		creactDone(e => {
			emit("closePopup", false)
			notification('success', `신규 사용자등록이 완료되었습니다. 비밀번호 설정을 위한 이메일을 확인해주세요.!`)
		})
		const creactUserNew = (e: any) => {
			var res = e.validationGroup.validate();
			if (!res.isValid) {
				res.brokenRules[0].validator.focus();
			} else {
				let dataCallApiCreate = {
					companyId: props.data.companyId,
					input: {
						username: formState.username,
						name: formState.name,
						accountingRole: false,
						facilityBusinessIds: formState.facilityBusinessIds,
						withholdingRole: formState.withholdingRole,
						mobilePhone: formState.mobilePhone,
						email: formState.email,
					}
				}
				creactUser(dataCallApiCreate)
			}
		}


		const checkUserName = () => {
			if (formState.username !== '') {
				triggersUserName.value = true
				refetchUserName()
			} else {
				notification('error', `사용자 이름을 입력헤주세요!`)
			}
		}

		watch(() => formState.username, (value) => {
			formState.username = value.replace(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g, '')
			triggersUserName.value = false
			dataCallApiCheck.value = {
				username: formState.username
			}

			if (formState.username.length >= 1) {
				disabledCheckUserName.value = true
			} else {
				disabledCheckUserName.value = false
			}
		})

		watch(() => formState.mobilePhone, (value) => { 
			formState.mobilePhone = value.replace(/\D/g, '');
		})
		watch(() => returnRadio.value, (value) => {
			if (value == 0) {
				formState.withholdingRole = true;
			} else {
				formState.withholdingRole = false;
			}
		}
		); 

		const setModalVisible = () => {
			if (JSON.stringify(objDataDefault.value) === JSON.stringify(formState) == true)
				emit("closePopup", false)
			else
				comfirmClosePopup(() => emit('closePopup', false))
		} 
		return {
			dataCallApiCheck,
			labelCol: { style: { width: "150px" } },
			formState,  
			optionsRadio, 
			statusMailValidate,
			disabledCheckUserName,
			bizTypeList,
			creactUserNew,
			refetchData,
			checkUserName,
			setModalVisible,
			returnRadio,
		};
	},
});
</script>
<style lang="scss" scoped src="../style/style.scss">
.confirm-popup /deep/.ant-modal-footer {
	text-align: center;
}
</style>
