<template>
    <div>
        <a-modal :visible="modalStatus" centered okText="저장하고 나가기" :mask-closable="false" cancelText="그냥 나가기"
            @cancel="setModalVisible()" width="700px" footer="">
            <h2 class="title-h2">이용자정보</h2>
            <standard-form formName="edit-cm110">
                <a-row :gutter="24" class="cm-100-popup-edit">
                    <a-col :span="18">
                        <a-form-item label="이용자ID" :label-col="labelCol">
                            <default-text-box :width="150" v-model:valueInput="formState.username" :disabled="true">
                            </default-text-box>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="상태">
                            <switch-basic v-model:valueSwitch="formState.active" :textCheck="'이용중'"
                                :textUnCheck="'이용중지'" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="성명" :label-col="labelCol" class="red">
                            <default-text-box :width="150" v-model:valueInput="formState.name" :required="true">
                            </default-text-box>
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="회계권한(담당사업)" :label-col="labelCol">
                            <tag-select-box placeholder="선택하십시오" :arrayValue="bizTypeList"
                                v-model:valueTagSelect="valueFacilyti" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="16">
                        <a-form-item label="원천권한" :label-col="labelCol">
                            <radio-group :arrayValue="optionsRadio" v-model:valueRadioCheck="returnRadio"
                                :layoutCustom="'horizontal'" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-row>
                            <a-col>
                                <a-form-item label="휴대폰" :label-col="labelCol" class="red">
                                    <tel-text-box :width="150" v-model:valueInput="formState.mobilePhone"
                                        :required="true"></tel-text-box>
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
                                    <mail-text-box v-model:valueInput="formState.email" :required="true"
                                        :style="!statusMailValidate ? { borderColor: 'red' } : ''" id="email">
                                    </mail-text-box>
                                </a-form-item>
                            </a-col>
                            <a-col :span="10">
                                <p class="validate-message" v-if="!statusMailValidate">
                                    이메일 형식이 정확하지 않습니다.
                                </p>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
                <div>
                    <a-col style="margin-left: 150px;">
                        <button-basic :disabled="!statusMailValidate" class="btn-set-password" :width="140"
                            :text="'비밀번호 설정'" :type="'danger'" :mode="'outlined'" @onClick="confirmPopup" />
                    </a-col>
                </div>
                <div class="text-align-center mt-20">
                    <button-basic class="button-form-modal" :text="'그냥 나가기'" :type="'default'" :mode="'outlined'"
                        @onClick="setModalVisible()" />
                    <button-basic class="button-form-modal" :text="'저장하고 나가기'" :width="140" :type="'default'"
                        :mode="'contained'" @onClick="confirmUpdate($event)" />
                </div>
            </standard-form>
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
                <div class="text-align-center mt-20">
                    <button-basic class="button-form-modal" :text="'아니오'" :type="'default'" :mode="'outlined'"
                        @onClick="closePopupEmail" />
                    <button-basic class="button-form-modal" :text="'네. 발송합니다'" :width="140" :type="'default'"
                        :mode="'contained'" @onClick="sendMessToGmail" />
                </div>
            </a-modal>
        </div>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, reactive } from "vue";
import { MailOutlined } from "@ant-design/icons-vue";
import type { SelectProps } from "ant-design-vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import queries from "../../../../../graphql/queries/CM/CM110/index";
import mutations from "../../../../../graphql/mutations/CM/CM110/index";
import notification from "../../../../../utils/notification";
import { initialOptionsRadio } from "../utils/index";

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
        const optionsRadio = reactive([...initialOptionsRadio]);
        
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
            notification('success', `업데이트 완료되었습니다!`)
            emit("closePopup", false);
        });
        onErrorUpdate((e) => {
            notification('error', e.message)
        });

        errorSendGmail((e) => {
            notification('error', e.message)
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
                    name: val.name,
                    id: val.facilityBusinessId,
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
        const confirmUpdate = (e: any) => {
            var res = e.validationGroup.validate();
            if (!res.isValid) {
                res.brokenRules[0].validator.focus();
            } else {
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
                    notification('error', `이메일형식이 정확하지 않습니다.`)
                    var Url = document.getElementById("email") as HTMLInputElement;
                    Url.select();
                }
            }
        };
        doneSendGmail((e) => {
            notification('success', `비밀번호 설정을 위한 이메일을 확인해주세요.`)
            visible.value = false;
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
            statusMailValidate,
            valueFacilyti,
            confirmUpdate,
            sendGmail,
            sendMessToGmail,
            bizTypeList,
            refetchFacility,
            setModalVisible,
            closePopupEmail,
        };
    },
});
</script>
<style lang="scss" scoped src="../style/style.scss">
.btn-set-password {
    margin-left: 150px;
}

.confirm-popup /deep/.ant-modal-footer {
    text-align: center;
}
</style>
