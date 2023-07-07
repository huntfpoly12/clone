<template>
    <a-modal :visible="modalStatus" @cancel="cancel" :mask-closable="false" class="confirm-md" footer="" :width="1100">
        <standard-form ref="refFormItemAC120">
            <h3><b>입금관리</b></h3>
            <a-row class="ml-30 mb-20">
                <a-col :span="8">
                    <a-form-item label="입금구분">
                        <default-text-box v-model:valueInput="text1" width="180px" :required="true" disabled="true" />
                    </a-form-item>
                    <a-form-item label="CMS 출금상태">
                        <div class="d-flex-center">
                            <select-box-common width="180px" :arrSelect="arrSelect1" :required="true"
                                v-model:valueInput="valueSelect1" />
                            <info-tool-tip>환급결제금액이 없는 경우에만, 미처리로 변경가능합니다.</info-tool-tip>
                        </div>
                    </a-form-item>
                    <a-form-item label="결제방법">
                        <select-box-common width="180px" disabled="true" :arrSelect="arrSelect2" :required="true"
                            v-model:valueInput="valueSelect2" />
                    </a-form-item>
                    <a-form-item label="예금주">
                        <default-text-box disabled="true" v-model:valueInput="text2" width="180px" :required="true" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="사업자코드">
                        <default-text-box v-model:valueInput="text3" width="180px" disabled="true" />
                    </a-form-item>
                    <a-form-item label="결제예정일자">
                        <date-time-box :teleport="true" v-model:valueDate="valueDate1" disabled="true" width="180px"
                            :required="true" />
                    </a-form-item>
                    <a-form-item label="결제은행">
                        <select-box-common width="180px" disabled="true" :arrSelect="null" :required="true"
                            v-model:valueInput="valueSelect3" />
                    </a-form-item>
                    <a-form-item label="결제금액">
                        <default-text-box disabled="true" v-model:valueInput="text3" width="180px" :required="true" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="상호">
                        <default-text-box v-model:valueInput="text4" width="180px" :required="true"
                            disabled="true" />
                    </a-form-item>
                    <a-form-item label="결제일자">
                        <date-time-box :teleport="true" v-model:valueDate="valueDate2" disabled="true" width="180px"
                            :required="true" />
                    </a-form-item>
                    <a-form-item label="계좌번호">
                        <default-text-box v-model:valueInput="text5" width="180px" :required="true" disabled="true" />
                    </a-form-item>
                    <a-form-item label="환급결제금액">
                        <div class="d-flex-center">
                            <default-text-box v-model:valueInput="text6" width="180px" :required="true" disabled="true" />
                            <info-tool-tip>환급결제금액 > 0 이면, CMS 출금상태 변경 불가합니다.</info-tool-tip>
                        </div>
                    </a-form-item>
                </a-col>
            </a-row>
            <DxDataGrid id="data-source" :show-row-lines="true" :hoverStateEnabled="true" :data-source="dataSource"
                :show-borders="true" key-expr="companyId" :allow-column-reordering="move_column"
                :allow-column-resizing="colomn_resize" :column-auto-width="true" ref="tab1Bf520Ref" noDataText="내역이 없습니다">
                <DxScrolling mode="standard" show-scrollbar="always" />
                <DxPaging :page-size="1000" />
                <DxSelection :select-all-mode="'allPages'" :show-check-boxes-mode="'always'" mode="multiple" />
                <!-- <DxSearchPanel :visible="true" :highlight-case-sensitive="true" placeholder="검색" />
                <DxExport :enabled="true" /> -->
                <DxToolbar>
                </DxToolbar>

                <DxColumn caption="청구연월" data-field="" />
                <DxColumn caption="청구등록 구분" data-field="" />

                <DxColumn caption="서비스명" data-field="" />
                <DxColumn caption="CMS 출금상태" data-field="" />

                <DxColumn caption="청구금액" data-field="" />

                <DxColumn caption="청구내역별환급결제금액" data-field="" />

            </DxDataGrid>
            <a-row class="my-10">
                <a-form-item label="메모">
                    <default-text-box v-model:valueInput="text6" width="900px" :required="true" disabled="true" />
                </a-form-item>
            </a-row>
            <a-row>
                <a-col :span="8">
                    <a-form-item label="출금실패사유">
                        <default-text-box v-model:valueInput="text7" width="190px" :required="true" disabled="true" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="세금계산서 연계">
                        <default-text-box disabled="true" v-model:valueInput="text8" width="190px" :required="true" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="최종저장일시">
                        <default-text-box v-model:valueInput="text9" width="200px" :required="true" disabled="true" />
                    </a-form-item>
                </a-col>
            </a-row>
        </standard-form>
        <!-- </div> -->
        <div class="text-center mt-20">
            <button-basic :disabled="false" @onClick="onSubmit" :text="'저장'" :type="'default'" :mode="'contained'" />
        </div>
        <PopupMessage :modalStatus="isModalConfirmSubmit" @closePopup="isModalConfirmSubmit = false" :typeModal="'confirm'"
            content="CMS 출금상태를 “미처리”로 저장하는 경우, 본 메뉴에서는 더 이상 조회되지 않습니다.그래도 “미처리”로 저장하시겠습니까?"
            okText="네. 미처리로 저장합니다" cancelText="아니오" @checkConfirm="handleSubmit" />
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, computed, toRefs } from "vue";
import { useStore } from "vuex";
import DxButton from "devextreme-vue/button";
import { DownloadOutlined } from "@ant-design/icons-vue";
import comfirmClosePopup from '@/utils/comfirmClosePopup';
import { Message } from "@/configs/enum";
import notification from '@/utils/notification';
import { arrSelect1, arrSelect2 } from '../index.ts'
import {
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxSelection,
    DxPaging,
    DxItem,
    DxSearchPanel,
    DxExport,
    DxToolbar,
} from "devextreme-vue/data-grid";
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        DxDataGrid,
        DxColumn,
        DxScrolling,
        DxSelection,
        DxPaging,
        DxItem,
        DxSearchPanel,
        DxExport,
        DxToolbar,
        DxButton, DownloadOutlined,
    },

    setup(props, { emit }) {
        const store = useStore();
        const move_column = computed(() => store.state.settings.move_column);
        const colomn_resize = computed(() => store.state.settings.colomn_resize);
        const dataDetail = reactive({
            text1: '',
            valueSelect1: 4,
            valueSelect2: 2,
            valueSelect3: null,
            valueDate1: null,
            valueDate2: null,
            text2: '',
            text3: '',
            text4: '',
            text5: '',
            text6: '',
            text7: '',
            text8: '',
            text9: '',
        })
        const dataSource = ref<any>([]);
        let isModalConfirmSubmit = ref<boolean>(false);
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
            isModalConfirmSubmit.value = true;
        }
        const handleSubmit = () => {

        }


        return {
            move_column,
            colomn_resize,
            dataSource,
            cancel,
            onSubmit,
            isModalConfirmSubmit,
            handleSubmit,
            arrSelect1,
            arrSelect2,
            ...toRefs(dataDetail)
        };
    },
});
</script>

<style lang="scss" scoped>
:deep .ant-form-item-label>label {
    width: 110px;
}

#data-source {
    max-height: 500px;
}
</style>
