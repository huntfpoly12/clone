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
                                <a-input v-model:value="formState.이용자ID" :disabled="true" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-button disabled>중복체크</a-button>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="상태" :label-col="{ span: 8 }">
                                <a-switch v-model:checked="formState.상태" style="width: 80px">
                                    <template #checkedChildren>이용중</template>
                                    <template #unCheckedChildren>이용중지</template>
                                </a-switch>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="12">
                            <a-form-item label="성명">
                                <a-input v-model:value="formState.성명" />
                            </a-form-item>
                        </a-col>

                    </a-row>
                    <a-row>
                        <a-col :span="24">
                            <a-form-item label="회계권한(담당사업)">
                                <a-select v-model:value="formState.회계권한담당사업" :options="options" mode="tags"
                                    placeholder="Please select" max-tag-count="responsive">
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="16">
                            <a-form-item label="원천권한">
                                <a-radio-group v-model:value="formState.원천권한" :options="optionsRadio" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="16">
                            <a-row>
                                <a-col :span="15">
                                    <a-form-item label="휴대폰">
                                        <a-input v-model:value="formState.휴대폰" @change="validateNumber($event,'휴대폰')" />
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
                                        <a-input v-model:value="formState.이메일" @change="validateEmail"
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
                    <a-button type="primary" @click="setModalVisible()">저장하고 나가기</a-button>
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
                    <a-button type="primary">네. 발송합니다</a-button>
                </template>
            </a-modal>
        </div>

    </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, onUpdated } from "vue";
import { MailOutlined } from '@ant-design/icons-vue';
import type { SelectProps } from 'ant-design-vue';
import type { UnwrapRef } from "vue";
import { number } from "vue-types";
interface FormState {
    이용자ID: string;
    성명: string;
    회계권한담당사업: any;
    원천권한: string;
    휴대폰: string;
    이메일: string;
    상태: boolean;
}

const optionsRadio = [
    { label: '있음', value: '있음' },
    { label: '없음', value: '없음' }
];

export default defineComponent({
    props: {
        modalStatus: {
            default: false,
            type: Boolean,
        },
        data: {
            default: null,
            type: number,
        },
    },

    components: {
        MailOutlined
    },

    setup(props) {
        const visible = ref<boolean>(false);
        const statusMailValidate = ref<boolean>(true);
        const options = ref<SelectProps['options']>([]);
        for (let i = 10; i < 36; i++) {
            const value = i.toString(36) + i;
            options?.value?.push({
                label: `Long Label: ${value}`,
                value,
            });
        }
        const formState: UnwrapRef<FormState> = reactive({
            이용자ID: 'tsv-estaram',
            성명: '박태환',
            회계권한담당사업: [],
            원천권한: '없음',
            휴대폰: '01056482514',
            이메일: 'bankda.jangbuda@gmail.com',
            상태: true
        });

        console.log(props.data);

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
                // code block
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

        onUpdated(() => {
            
        })

        return {
            labelCol: { style: { width: "150px" } },
            formState,
            options,
            visible,
            optionsRadio,
            confirmPopup,
            validateNumber,
            validateEmail,
            statusMailValidate
        };
    },



    methods: {
        setModalVisible() {
            this.$emit('closePopup', false)
        }
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
