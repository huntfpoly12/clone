<template>
    <a-modal :visible="modalStatus" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="1100">
        <div>
            <div class="text-center">
                <h2><b>CMS 계좌정보</b></h2>
            </div>
            <standard-form ref="refFormItemAC120">
                <a-row>
                    <a-col :span="8">
                        <a-form-item label="사업자코드">
                            <default-text-box v-model:valueInput="code" width="130px" style="margin-right: 10px"
                                :required="true" disabled="true" />
                        </a-form-item>
                        <a-form-item label="연락처">
                            <default-text-box v-model:valueInput="phone" width="130px" style="margin-right: 10px"
                                :required="true" disabled="true" />
                        </a-form-item>
                        <a-form-item label="금융기관코드">
                            <default-text-box v-model:valueInput="bankType" width="130px" style="margin-right: 10px"
                                :required="true" disabled="true" />
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
                                :required="true" disabled="true" />
                        </a-form-item>
                        <a-form-item label="휴대폰">
                            <default-text-box v-model:valueInput="mobilePhone" width="130px" style="margin-right: 10px"
                                :required="true" disabled="true" />
                        </a-form-item>
                        <a-form-item label="계좌번호">
                            <default-text-box v-model:valueInput="accountNumber" width="130px" style="margin-right: 10px"
                                :required="true" disabled="true" />
                        </a-form-item>
                        <a-form-item label="출금동의신청서">
                            <!-- <default-text-box v-model:valueInput="null" width="130px" style="margin-right: 10px"
                                :required="true" /> -->
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="대표자명">
                            <default-text-box v-model:valueInput="presidentName" width="130px" style="margin-right: 10px"
                                :required="true" disabled="true" />
                        </a-form-item>
                        <a-form-item label="금융기관명">
                            <default-text-box v-model:valueInput="bankType" width="130px" style="margin-right: 10px"
                                :required="true" disabled="true" />
                        </a-form-item>
                        <a-form-item label="예금주">
                            <default-text-box v-model:valueInput="ownerName" width="130px" style="margin-right: 10px"
                                :required="true" disabled="true" />
                        </a-form-item>
                        <a-form-item label="CMS승인상태" class="red">
                            <default-text-box v-model:valueInput="no" width="130px" style="margin-right: 10px"
                                :required="true" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </standard-form>
        </div>
        <div class="btn_submit text-align-center mt-20">
            <!-- <button-basic :disabled="false" @onClick="onSubmit" class="button-form-modal"
                :text="'저장'" :type="'default'" :mode="'contained'" /> -->
        </div>
        <!-- <PopupMessage :modalStatus="isModalDelete" @closePopup="isModalDelete = false" :typeModal="'confirm'"
            :title="Message.getMessage('AC110', '005').message" content="" :okText="Message.getMessage('AC110', '005').yes"
            :cancelText="Message.getMessage('AC110', '005').no" @checkConfirm="handleDelete" /> -->
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, computed, toRefs } from "vue";
import { useStore } from "vuex";
import comfirmClosePopup from '@/utils/comfirmClosePopup';
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
    },
    components: {

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
            ownerName: null
        })
        const dataSource = ref<any>([]);

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
        return {
            move_column,
            colomn_resize,
            dataSource,
            cancel,
            ...toRefs(dataDetail)
        };
    },
});
</script>

<style lang="scss" scoped>
:deep .ant-form-item-label>label {
    width: 110px;
}
</style>
