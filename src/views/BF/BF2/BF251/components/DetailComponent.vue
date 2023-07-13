<template>
    <a-modal :visible="modalStatus" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="1100">
        <div>
            <div class="text-center">
                <h2><b>CMS 계좌정보</b></h2>
            </div>
            <standard-form ref="refFormItemAC120">
                <a-row class="form">
                    <a-col :span="8" class="row1">
                        <a-form-item label="사업자코드">
                            <default-text-box v-model:valueInput="code" width="130px" style="margin-right: 10px"
                                :required="true" />
                        </a-form-item>
                        <a-form-item label="연락처">
                            <default-text-box v-model:valueInput="phone" width="130px" style="margin-right: 10px"
                                :required="true" />
                        </a-form-item>
                        <a-form-item label="금융기관코드">
                            <default-text-box v-model:valueInput="bankType" width="130px" style="margin-right: 10px"
                                :required="true" />
                        </a-form-item>
                        <a-form-item label="사업자(주민)등록번호">
                            <default-text-box v-model:valueInput="no" width="130px" style="margin-right: 10px"
                                :required="true" />
                        </a-form-item>
                        <a-form-item label="출금동의일자">
                            <default-text-box v-model:valueInput="no" width="130px" style="margin-right: 10px"
                                :required="true" />
                        </a-form-item>
                        <a-form-item label="에러코드">
                            <default-text-box v-model:valueInput="no" width="130px" style="margin-right: 10px"
                                :required="true" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="상호">
                            <default-text-box v-model:valueInput="companyName" width="130px" style="margin-right: 10px"
                                :required="true" />
                        </a-form-item>
                        <a-form-item label="휴대폰">
                            <default-text-box v-model:valueInput="mobilePhone" width="130px" style="margin-right: 10px"
                                :required="true" />
                        </a-form-item>
                        <a-form-item label="계좌번호">
                            <default-text-box v-model:valueInput="accountNumber" width="130px" style="margin-right: 10px"
                                :required="true" />
                        </a-form-item>
                        <a-form-item label="자동출금일">
                            <select-box-common width="180px" :arrSelect="arrSelect1" :required="true"
                                v-model:valueInput="valueSelect1" />
                        </a-form-item>
                        <a-form-item label="출금동의신청서" class="custom">
                            <DxButton class="custom-button" :height="$config_styles.HeightInput">
                                <div class="d-flex-center">
                                    <DownloadOutlined style="font-size: 14px; transform: rotate(180deg)" />
                                    <span class="pl-5">파일 선택</span>
                                </div>
                            </DxButton>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="대표자명">
                            <default-text-box v-model:valueInput="presidentName" width="130px" style="margin-right: 10px"
                                :required="true" />
                        </a-form-item>
                        <a-form-item label="금융기관명">
                            <default-text-box v-model:valueInput="bankType" width="130px" style="margin-right: 10px"
                                :required="true" />
                        </a-form-item>
                        <a-form-item label="예금주">
                            <select-box-common width="180px" :arrSelect="[]" :required="true"
                                v-model:valueInput="ownerName" />
                        </a-form-item>
                        <a-form-item label="CMS승인상태" class="red">
                            <select-box-common width="180px" :arrSelect="arrSelectCMS" :required="true"
                                v-model:valueInput="no" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </standard-form>
        </div>
        <div class="text-center mt-20">
            <button-basic :disabled="false" @onClick="onSubmit" class="button-form-modal" :text="'저장'" :type="'default'"
                :mode="'contained'" />
        </div>
        <PopupMessage :modalStatus="isModal" @closePopup="isModal = false" :typeModal="'confirm'" okText="네. 저장합니다"
            cancelText="아니오" @checkConfirm="handle" content="">{{ arrSelectCMS }}
            <!-- <div>
                CMS승인상태 : ….. <br />저장될 CMS승인상태는 실제와 상이할 수 있으니 반드시 확인하시기 바랍니다.그래도 저장하시겠습니까?
            </div> -->
        </PopupMessage>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, computed, toRefs } from "vue";
import { useStore } from "vuex";
import comfirmClosePopup from '@/utils/comfirmClosePopup';
import { DownloadOutlined } from "@ant-design/icons-vue";
import DxButton from "devextreme-vue/button";
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        DownloadOutlined, DxButton,
    },

    setup(props, { emit }) {
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const dataDetail = reactive({
            code: null,
            phone: null,
            bankType: null,
            no: null,

            companyName: null,
            mobilePhone: null,
            accountNumber: null,
            presidentName: null,
            // bankType: null,
            ownerName: null,
            valueSelect1: null,
        })
        const isModal = ref(false)
        const dataSource = ref<any>([]);
        let arrSelect1 = [
            {
                value: '1',
                label: '5일',
            },
            {
                value: '2',
                label: '12일',
            },
            {
                value: '3',
                label: '19일',
            },
        ]
        let arrSelectCMS = [
            {
                value: '1',
                label: '대기',
            },
            {
                value: '2',
                label: '접수',
            },
            {
                value: '3',
                label: '승인신청',
            },
            {
                value: '4',
                label: '승인완료',
            },
            {
                value: '5',
                label: '승인실패',
            },
            {
                value: '6',
                label: '해지신청',
            },
            {
                value: '7',
                label: '해지완료',
            },
            {
                value: '8',
                label: '해지실패',
            },
        ]

        // =================== GRAPHQL ===================


        // ============== ON DONE MUTATION GRAPHQL ===============


        // ================== WATCH ================
        watch(() => props.modalStatus, async (newValue, old) => {
            if (newValue) {

            }
        }
        );

        // ================ FUNCTION ============================================
        const cancel = () => {
            emit("closePopup", false);
            // if (JSON.stringify(formStateDataSource.value) == JSON.stringify(dataSource.value)) {
            // 	emit("closePopup", false);
            // } else {
            // 	comfirmClosePopup(() => emit('closePopup', false))
            // }
        };
        const onSubmit = () => {
            isModal.value = true;
        }
        const handle = () => {

        }
        return {
            move_column,
            colomn_resize,
            dataSource,
            cancel,
            ...toRefs(dataDetail),
            arrSelectCMS, arrSelect1, onSubmit,
            isModal, handle
        };
    },
});
</script>

<style lang="scss" scoped>
:deep .ant-form-item-label>label {
    width: 110px;
}

:deep .row1 .ant-form-item-label>label {
    width: 150px;
}

:deep .form .custom .dx-state-hover {
    background-color: #474747 !important;
}

.custom-button {
    color: white;
    background-color: #6b6b6b;

    :deep .dx-button-content {
        padding: 6px 8px;
    }

}
</style>
