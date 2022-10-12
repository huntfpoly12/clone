<template>
    <div>
        <a-modal :visible="modalStatus" centered okText="저장하고 나가기" :mask-closable="false" cancelText="그냥 나가기"
            @cancel="setModalVisible()" width="700px">
            <div class="cm-100-popup-edit">
                <a-form :model="formState" :label-col="labelCol">
                    <h2 class="title-h2">사업자정보</h2>

                    <a-row>
                        <a-col :span="12">
                            <a-form-item label="이용자ID">
                                <a-input v-model:value="formState.id" :disabled="true" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-button disabled>중복체크</a-button>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="상태" :label-col="{ span: 8 }">
                                <a-switch v-model:checked="formState.active" style="width: 80px">
                                    <template #checkedChildren>이용중</template>
                                    <template #unCheckedChildren>이용중지</template>
                                </a-switch>
                            </a-form-item>
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
                                <a-select v-model:value="valueFacilyti" :options="bizTypeList" mode="tags"
                                    placeholder="선택하십시오" max-tag-count="responsive">
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
                                        <a-input v-model:value="formState.mobilePhone"
                                            @change="validateNumber($event,'휴대폰')" />
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
                                            :style="!statusMailValidate ? { borderColor: 'red'}: ''" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="8">
                                    <p class="validate-message" v-if="!statusMailValidate">이메일 형식이 정확하지 않습니다.</p>
                                </a-col>
                            </a-row>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24">
                            <a-button danger class="btn-set-password" @click="confirmPopup">비밀번호 설정</a-button>
                        </a-col>
                    </a-row>

                </a-form>
            </div>
            <template #footer>
                <div style="text-align: center;">
                    <a-button @click="setModalVisible()">그냥 나가기</a-button>
                    <a-button type="primary" @click="confirmUpdate()">저장하고 나가기</a-button>
                </div>
            </template>
        </a-modal>

        <div class="confirm-popup">
            <a-modal v-model:visible="visible" :mask-closable="false">
                <a-row>
                    <a-col :span="4">
                        <mail-outlined :style="{fontSize: '70px'}" />
                    </a-col>
                    <a-col :span="20">
                        <p><strong>비밀번호 설정 이메일</strong></p>
                        <p>비밀번호 설정 링크가 이메일로 발송됩니다.</p>
                        <p>계속 진행하시겠습니까?</p>
                    </a-col>
                </a-row>
                <template #footer>
                    <a-button>아니오</a-button>
                    <a-button type="primary" @click="sendMessToGmail">네. 발송합니다</a-button>
                </template>
            </a-modal>
        </div>

    </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch, reactive } from "vue";
import { MailOutlined } from '@ant-design/icons-vue';
import type { SelectProps } from 'ant-design-vue';
import { useQuery, useMutation } from "@vue/apollo-composable";
import queries from "../../../../../graphql/queries/CM/CM110/index"
import mutations from "../../../../../graphql/mutations/CM/CM110/index";
import { message } from 'ant-design-vue';

const optionsRadio = [
    { label: '있음', value: true },
    { label: '없음', value: false }
];

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
    },

    setup(props, { emit }) {
        const visible = ref<boolean>(false);
        const statusMailValidate = ref<boolean>(true);
        const options = ref<SelectProps['options']>([]);
        let formState: any = ref({});
        let valueFacilyti = ref([]);
        let trigger = ref<boolean>(false);
        let dataCall = ref()
        let dataUser = ref()

        for (let i = 10; i < 36; i++) {
            const value = i.toString(36) + i;
            options?.value?.push({
                label: `Long Label: ${value}`,
                value,
            });
        }

        // Get detail user
        const { refetch: refetchData, loading, error, onResult } = useQuery(queries.getDetailUser, dataUser, () => ({ enabled: trigger.value, fetchPolicy: "no-cache", }))

        //Update info user
        const {
            mutate: updateUser,
            onDone: onDoneUpdate,
            onError: onErrorUpdate
        } = useMutation(mutations.updateInfoUser);

        //Send mail 
        const {
            mutate: sendGmail,
            onDone: doneSendGmail,
            onError: errorSendGmail
        } = useMutation(mutations.sendEmail);


        onDoneUpdate((e) => {
            message.success(`Update success!`);
            emit("closePopup", false)
        })

        const confirmPopup = () => {
            visible.value = true;
        }

        const validateNumber = (e: any, name: string) => {
            let valNumberOnly = e.target.value.replace(/\D+/g, '');
            switch (name) {
                case '휴대폰':
                    formState.휴대폰 = valNumberOnly;
                    break;
                default:
            }
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

        onResult((res) => {
            let newFaci: any = []
            res.data.getMyCompanyUser.facilityBusinesses.map((e: any) => {
                newFaci.push(e.facilityBusinessId)
            })
            valueFacilyti.value = newFaci
            formState.value = res.data.getMyCompanyUser
        })

        let bizTypeList = ref([])
        const { refetch: refetchFacility, onResult: resultFacility } = useQuery(queries.getDataFacilityBusiness, dataCall, () => ({ enabled: trigger.value, fetchPolicy: "no-cache", }))
        resultFacility(e => {
            let dataRes: any = []
            e.data.getMyCompanyFacilityBusinesses.map((val: any) => {
                dataRes.push({
                    label: val.name,
                    value: val.facilityBusinessId
                })
            })
            bizTypeList.value = dataRes
        })

        watch(() => props.modalStatus, (value) => {
            if (props.data && props.data.companyId) {
                dataCall.value = {
                    companyId: props.data.companyId
                }
                dataUser.value =  props.data

                trigger.value = true;
                refetchData()
                refetchFacility()
            }
        })

        const confirmUpdate = () => {
            let dataUpdate = {
                companyId: props.data.companyId,
                userId: props.data.userId,
                input: {
                    name: formState.value.name,
                    accountingRole: false,
                    facilityBusinessIds: valueFacilyti.value,
                    withholdingRole: formState.value.withholdingRole,
                    mobilePhone: formState.value.mobilePhone,
                    email: formState.value.email,
                    active: formState.value.active
                }
            }
            updateUser(dataUpdate)
        }

        doneSendGmail((e) => {
            message.success(`Send email success!`);
            // emit("closePopup", false)
        })

        const sendMessToGmail = () => {
            let dataCallSendEmail = {
                companyId: props.data.companyId,
                userId: props.data.userId,
            }
            sendGmail(dataCallSendEmail)
        }

        return {
            labelCol: { style: { width: "150px" } },
            formState,
            options,
            visible,
            optionsRadio,
            confirmPopup,
            validateNumber,
            validateEmail,
            statusMailValidate,
            valueFacilyti,
            confirmUpdate,
            sendGmail,
            sendMessToGmail,
            bizTypeList,
            refetchFacility
        };
    },

    methods: {
        setModalVisible() {
            this.$emit('closePopup', false)
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
