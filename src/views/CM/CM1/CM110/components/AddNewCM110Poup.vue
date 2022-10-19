<template>
	<div>
		<a-modal :visible="modalStatus" :mask-closable="false" centered okText="저장하고 나가기" cancelText="그냥 나가기"
			@cancel="setModalVisible()" width="700px">
			<div class="cm-100-popup-add">
				<a-form :model="formState" :label-col="labelCol">
					<h2 class="title-h2">기초정보설정</h2>
					<a-row>
						<a-col :span="12">
							<a-form-item label="이용자ID">
								<a-input v-model:value="formState.username" @change="validateCharacter" />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-button @click="checkUserName">중복체크</a-button>
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="12">
							<a-form-item label="성명">
								<a-input v-model:value="formState.name" />
							</a-form-item>
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="24">
							<a-form-item label="회계권한(담당사업)">
								<a-select v-model:value="formState.facilityBusinessIds" :options="bizTypeList"
									mode="tags" placeholder="선택하십시오" max-tag-count="responsive">
								</a-select>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="16">
							<a-form-item label="원천권한">
								<a-radio-group v-model:value="formState.withholdingRole" :options="optionsRadio" />
							</a-form-item>
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="16">
							<a-row>
								<a-col :span="15">
									<a-form-item label="휴대폰">
										<a-input v-model:value="formState.mobilePhone" @change="validateNumber" />
									</a-form-item>
								</a-col>
								<a-col :span="8">
									<p class="validate-message">‘-’없이 숫자만 입력</p>
								</a-col>
							</a-row>
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="24">
							<a-row>
								<a-col :span="15">
									<a-form-item label="이메일">
										<a-input v-model:value="formState.email" @change="validateEmail"
											:style="!statusMailValidate ? { borderColor: 'red'}: ''" id="email" />
									</a-form-item>
								</a-col>
								<a-col :span="8">
									<p class="validate-message" v-if="!statusMailValidate">이메일 형식이 정확하지 않습니다.</p>
								</a-col>
							</a-row>
						</a-col>
					</a-row>
				</a-form>
			</div>
			<template #footer>
				<div style="text-align: center;">
					<a-button @click="setModalVisible()">그냥 나가기</a-button>
					<a-button type="primary" @click="creactUserNew">저장하고 나가기</a-button>
				</div>
			</template>
		</a-modal>
	</div>
</template>
<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import { MailOutlined } from '@ant-design/icons-vue';
import type { SelectProps } from 'ant-design-vue';
import { useQuery, useMutation } from "@vue/apollo-composable";
import mutations from "../../../../../graphql/mutations/CM/CM110/index";
import { message } from 'ant-design-vue';
import queries from "../../../../../graphql/queries/CM/CM110/index"

export default defineComponent({
	props: {
		modalStatus: {
			default: false,
			type: Boolean,
		},
		data: null,
	},
	components: {
		MailOutlined
	},
	setup(props, { emit }) {
		const optionsRadio = [
			{ label: '있음', value: true },
			{ label: '없음', value: false }
		];
		const visible = ref<boolean>(false);
		const statusMailValidate = ref<boolean>(false);
		const options = ref<SelectProps['options']>([]);
		let triggers = ref<boolean>(false);
		let triggersUserName = ref<boolean>(false);
		let dataQuery = ref()
		watch(() => props.modalStatus, (value) => {
			if (props.data.companyId) {
				triggers.value = true;
				dataQuery.value = { companyId: props.data.companyId };
				refetchData()
			}
		})
		for (let i = 10; i < 36; i++) {
			const value = i.toString(36) + i;
			options?.value?.push({
				label: `Long Label: ${value}`,
				value,
			});
		}
		const formState = ref({
			username: "",
			name: "",
			accountingRole: true,
			facilityBusinessIds: [],
			withholdingRole: true,
			mobilePhone: "",
			email: "",
		});
		const confirmPopup = () => {
			visible.value = true;
		}
		const validateEmail = (e: any) => {
			let checkMail = e.target.value.match(
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
			if (!checkMail) {
				statusMailValidate.value = false;
			} else {
				statusMailValidate.value = true;
			}
		}
		let bizTypeList = ref([])
		const { refetch: refetchData, onResult } = useQuery(queries.getDataFacilityBusiness, dataQuery, () => ({ enabled: triggers.value, fetchPolicy: "no-cache", }))

		let dataCallApiCheck = ref({})
		const { refetch: refetchUserName, onResult: onResultUsername } = useQuery(queries.checkUserNameCompany, dataCallApiCheck, () => ({ enabled: triggersUserName.value, fetchPolicy: "no-cache", }))

		onResult(e => {
			let dataRes: any = []
			e.data.getMyCompanyFacilityBusinesses.map((val: any) => {
				dataRes.push({
					label: val.name,
					value: val.facilityBusinessId
				})
			})
			bizTypeList.value = dataRes
		})
		onResultUsername(e => {
			if (e.data)
				if (e.data.isUserRegistableUsername == true) {
					message.success(`사용 가능한 아이디입니다`)
				} else {
					message.error(`이미 존재하는 아이디 입니다. 다른 아이디를 입력해주세요`)
				}
		})
		//Creact user in company
		const {
			mutate: creactUser,
			onDone: creactDone,
			onError: creactError
		} = useMutation(mutations.creactUser);


		creactError(e => {
			message.error(e.message, 2)
		})
		creactDone(e => {
			emit("closePopup", false)
			message.success("신규 사용자등록이 완료되었습니다. 비밀번호 설정을 위한 이메일을 확인해주세요.!")
		})
		const creactUserNew = () => {
			if (statusMailValidate.value == true) {
				let dataCallApiCreate = {
					companyId: props.data.companyId,
					input: {
						username: formState.value.username,
						name: formState.value.name,
						accountingRole: false,
						facilityBusinessIds: formState.value.facilityBusinessIds,
						withholdingRole: formState.value.withholdingRole,
						mobilePhone: formState.value.mobilePhone,
						email: formState.value.email,
					}
				}
				creactUser(dataCallApiCreate)
			} else {
				message.error(`이메일형식이 정확하지 않습니다.`)
				var Url = document.getElementById("email") as HTMLInputElement;
				Url.select()
			}
		}


		const checkUserName = () => {
			if (formState.value.username !== '') {
				triggersUserName.value = true
				refetchUserName()
			} else {
				message.error(`사용자 이름을 입력헤주세요!`)
			}
		}
		const validateCharacter = (e: any) => {
			formState.value.username = e.target.value.replace(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g, '')
			dataCallApiCheck.value = {
				username: formState.value.username
			}
		}

		const {
			mutate: sendEmailUser,
			onDone: doneSendEmail,
			onError: errorSendEmail
		} = useMutation(mutations.sendEmail);

		doneSendEmail(e => {
			console.log(e);

		})

		return {
			dataCallApiCheck,
			labelCol: { style: { width: "150px" } },
			formState,
			options,
			visible,
			optionsRadio,
			confirmPopup,
			validateEmail,
			statusMailValidate,
			bizTypeList,
			creactUserNew,
			refetchData,
			checkUserName,
			validateCharacter,
		};
	},
	methods: {
		setModalVisible() {
			this.$emit('closePopup', false)
		},

		validateNumber() {
			let e = this.formState.mobilePhone
			this.formState.mobilePhone = e.replace(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~A-Za-z]/g, '')
		},

	}
});
</script>
<style scoped>
.validate-message {
	margin-left: 2%;
	color: #c3baba;
}

.btn-set-password {
	margin-left: 150px;
}

.confirm-popup /deep/.ant-modal-footer {
	text-align: center;
}

.ant-form-item {
	margin-bottom: 10px;
}
</style>
