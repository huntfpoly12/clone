<template>
    <div>
        <a-modal :visible="modalStatus" centered okText="저장하고 나가기" :mask-closable="false" cancelText="그냥 나가기"
            @cancel="setModalVisible()" width="700px" footer="">
            <div class="cm-100-popup-edit">
                <a-form :model="formState" :label-col="labelCol">
                    <h2 class="title-h2">이용자정보</h2>
                    <a-row :gutter="24">
                        <a-col :span="12">
                            <a-form-item label="이용자ID">
                                <default-text-box v-model:valueInput="formState.username" :disabled="true">
                                </default-text-box>
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-button disabled>중복체크</a-button>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="상태" :label-col="{ span: 8 }">
                                <switch-basic v-model:valueSwitch="formState.active" :textCheck="'이용중'"
                                    :textUnCheck="'이용중지'" />
                                <!-- <a-switch v-model:checked="formState.active" style="width: 80px">
                                    <template #checkedChildren>이용중</template>
                                    <template #unCheckedChildren>이용중지</template>
                                </a-switch> -->
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="12">
                            <a-form-item label="성명">
                                <default-text-box v-model:valueInput="formState.name"></default-text-box>
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
                                <radio-group :arrayValue="optionsRadio" v-model:valueRadioCheck="returnRadio"
                                    :layoutCustom="'horizontal'" />
                                <!-- <a-radio-group v-model:value="formState.withholdingRole" :options="optionsRadio" /> -->
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="16">
                            <a-row>
                                <a-col :span="15">
                                    <a-form-item label="휴대폰">
                                        <text-number-box v-model:valueInput="formState.mobilePhone"></text-number-box>
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
                                        <mail-text-box v-model:valueInput="formState.email"
                                            :style="!statusMailValidate ? { borderColor: 'red' } : ''" id="email">
                                        </mail-text-box>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="8">
                                    <p class="validate-message" v-if="!statusMailValidate">
                                        이메일 형식이 정확하지 않습니다.
                                    </p>
                                </a-col>
                            </a-row>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col>
                            <button-basic class="btn-set-password" :width="140" :text="'비밀번호 설정'" :type="'danger'"
                                :mode="'outlined'" @onClick="confirmPopup" />
                        </a-col>
                    </a-row>
                </a-form>
            </div>
            <div class="text-align-center mt-20">
                <button-basic class="button-form-modal" :text="'그냥 나가기'" :type="'default'" :mode="'outlined'"
                    @onClick="setModalVisible()" />
                <button-basic class="button-form-modal" :text="'저장하고 나가기'" :width="140" :type="'default'"
                    :mode="'contained'" @onClick="confirmUpdate()" />
            </div>
        </a-modal>
        <div class="confirm-popup">
            <a-modal v-model:visible="visible" :mask-closable="false" footer="">
                <a-row>
                    <a-col :span="4">
                        <mail-outlined :style="{ fontSize: '70px' }" />
                    </a-col>
                    <a-col :span="20">
                        <p><strong>비밀번호 설정 이메일</strong></p>
                        <p>비밀번호 설정 링크가 이메일로 발송됩니다.</p>
                        <p>계속 진행하시겠습니까?</p>
                    </a-col>
                </a-row>
                <!-- <a-button @click="closePopupEmail">아니오</a-button> -->
                <button-basic class="button-form-modal" :text="'아니오'" :type="'default'" :mode="'outlined'"
                    @onClick="closePopupEmail" />
                <button-basic class="button-form-modal" :text="'네. 발송합니다'" :width="140" :type="'default'"
                    :mode="'contained'" @onClick="sendMessToGmail" />
                <!-- <a-button type="primary" @click="sendMessToGmail">네. 발송합니다</a-button> -->
            </a-modal>
        </div>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import { MailOutlined } from "@ant-design/icons-vue";
import type { SelectProps } from "ant-design-vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import queries from "../../../../../graphql/queries/CM/CM110/index";
import mutations from "../../../../../graphql/mutations/CM/CM110/index";
import { message } from "ant-design-vue";
import { log } from "console";

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
        const optionsRadio = [
            { id: 0, text: "있음" },
            { id: 1, text: "없음" },
        ];
        const visible = ref<boolean>(false);
        const statusMailValidate = ref<boolean>(true);
        const options = ref<SelectProps["options"]>([]);
        let formState: any = ref({});
        let valueFacilyti = ref([]);
        let trigger = ref<boolean>(false);
        let dataCall = ref();
        let dataUser = ref();
        let returnRadio = ref();
        for (let i = 10; i < 36; i++) {
            const value = i.toString(36) + i;
            options?.value?.push({
                label: `Long Label: ${value}`,
                value,
            });
        }
        // Get detail user
        const {
            refetch: refetchData,
            loading,
            error,
            onResult,
        } = useQuery(queries.getDetailUser, dataUser, () => ({
            enabled: trigger.value,
            fetchPolicy: "no-cache",
        }));
        //Update info user
        const {
            mutate: updateUser,
            onDone: onDoneUpdate,
            onError: onErrorUpdate,
        } = useMutation(mutations.updateInfoUser);
        //Send mail
        const {
            mutate: sendGmail,
            onDone: doneSendGmail,
            onError: errorSendGmail,
        } = useMutation(mutations.sendEmail);
        onDoneUpdate((e) => {
            message.success(`업데이트 완료되었습니다!`);
            emit("closePopup", false);
        });
        onErrorUpdate((e) => {
            message.error(e.message);
        });

        errorSendGmail((e) => {
            message.error(e.message);
        });
        const confirmPopup = () => {
            visible.value = true;
        };

        watch(() => formState.value.email, (value) => {
                let checkMail = value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                if (!checkMail) {
                    statusMailValidate.value = false;
                } else {
                    statusMailValidate.value = true;
                }
            }
        );

        watch(() => returnRadio.value, (value) => {
                if (value == 0) {
                    formState.value.withholdingRole = true;
                } else {
                    formState.value.withholdingRole = false;
                }
                
            }
        );
        // const validateEmail = (e: any) => {
        //     let checkMail = e.target.value.match(
        //         /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //     );
        //     if (!checkMail) {
        //         statusMailValidate.value = false;
        //     } else {
        //         statusMailValidate.value = true;
        //     }
        // }
        onResult((res) => {
            let newFaci: any = [];
            res.data.getMyCompanyUser.facilityBusinesses.map((e: any) => {
                newFaci.push(e.facilityBusinessId);
            });
            valueFacilyti.value = newFaci;
            formState.value = res.data.getMyCompanyUser;
            
            if (formState.value.withholdingRole == true) {
                returnRadio.value = 0;
            } else {
                returnRadio.value = 1;
            }
            let checkMail = res.data.getMyCompanyUser.email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
            if (!checkMail) {
                statusMailValidate.value = false;
            } else {
                statusMailValidate.value = true;
            }
        });
        let bizTypeList = ref([]);
        const { refetch: refetchFacility, onResult: resultFacility } = useQuery(
            queries.getDataFacilityBusiness,
            dataCall,
            () => ({ enabled: trigger.value, fetchPolicy: "no-cache" })
        );
        resultFacility((e) => {
            let dataRes: any = [];
            e.data.getMyCompanyFacilityBusinesses.map((val: any) => {
                dataRes.push({
                    label: val.name,
                    value: val.facilityBusinessId,
                });
            });
            bizTypeList.value = dataRes;
        });
        watch(
            () => props.modalStatus,
            (value) => {
                if (props.data && props.data.companyId) {
                    trigger.value = true;
                    dataCall.value = {
                        companyId: props.data.companyId,
                    };
                    dataUser.value = props.data;
                    refetchData();
                    refetchFacility();
                }
            }
        );
        const confirmUpdate = () => {
            if (statusMailValidate.value == true) {
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
                        active: formState.value.active,
                    },
                };
                updateUser(dataUpdate);
            } else {
                message.error(`이메일형식이 정확하지 않습니다.`);
                var Url = document.getElementById("email") as HTMLInputElement;
                Url.select();
            }
        };
        doneSendGmail((e) => {
            message.success(`비밀번호 설정을 위한 이메일을 확인해주세요.`);
            visible.value = false;
            // emit("closePopup", false)
        });

        const sendMessToGmail = () => {
            let dataCallSendEmail = {
                companyId: props.data.companyId,
                userId: props.data.userId,
            };
            sendGmail(dataCallSendEmail);
        };

        const setModalVisible = () => {
            emit("closePopup", false);
        };

        watch(
            () => formState.value.mobilePhone,
            (value) => {
                let e = formState.value.mobilePhone;
                formState.value.mobilePhone = value.replace(/\D/g, "");
            }
        );
        // const validateNumber = () => {
        //     let e = formState.value.mobilePhone
        //     formState.value.mobilePhone = e.replace(/\D/g, '');
        // }

        const closePopupEmail = () => {
            visible.value = false;
        };

        return {
            returnRadio,
            labelCol: { style: { width: "150px" } },
            formState,
            options,
            visible,
            optionsRadio,
            confirmPopup,
            // validateEmail,
            statusMailValidate,
            valueFacilyti,
            confirmUpdate,
            sendGmail,
            sendMessToGmail,
            bizTypeList,
            refetchFacility,
            setModalVisible,
            // validateNumber,
            closePopupEmail,
        };
    },
    methods: {
        // setModalVisible() {
        //     this.$emit('closePopup', false)
        // },
        // validateNumber() {
        //     let e = this.formState.mobilePhone
        //     this.formState.mobilePhone = e.replace(/\D/g, '');
        // },
        // closePopupEmail(){
        //     this.visible=false
        // }
    },
});
</script>
<style lang="scss" src="../style/style.scss">

</style>
<style scoped>
.btn-set-password {
    margin-left: 150px;
}

.confirm-popup /deep/.ant-modal-footer {
    text-align: center;
}
</style>
