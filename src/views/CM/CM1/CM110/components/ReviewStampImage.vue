<template>
    <div>
        <a-modal :visible="modalStatus" title="직인자동생성" @cancel="setModalVisible()" :mask-closable="false" width="420px"
            footer="">
            <div class="text-center">
                <div class="mb-10">
                    <div>
                        ※ 직인에 인쇄될 상호를 입력하신 후 <b>미리보기</b> 버튼을 누르세요.
                    </div>
                </div>
                <div class="mb-10 d-flex-center">
                    <default-text-box v-model:valueInput="signature" style="margin-right: 10px; display: inline-block;"
                        :width="210" placeholder="2~15자 (특수문자불가)" :maxlength="15"></default-text-box>
                    <button-basic :width="100" :disabled="disabledBtnPreview" @onClick="createMyCompanyAutoGeneratedSeal"
                        :text="'미리보기'" :type="'default'" :mode="'contained'" />
                </div>
                <div class="mb-10">
                    <a-image :width="320" :src="previewImage" :preview="false"
                        fallback="data:image/png;base64,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" />
                </div>
                <div class="mb-10">
                    <button-basic class="btn-stamp" :disabled="disabledBtnHandOk" @onClick="handOk" :text="'사용하기'"
                        :type="'default'" :mode="'contained'" />
                </div>
            </div>
        </a-modal>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/CM/CM110/index";
import queries from "@/graphql/queries/CM/CM110/index"

export default defineComponent({
    props: ["modalStatus", "data"],
    components: {
    },
    setup(props, { emit }) {
        let previewImage: any = ref("");
        let signature = ref("");
        let disabledBtnPreview = ref(true);
        let disabledBtnHandOk = ref(true);
        let triggers = ref<boolean>(false);

        watch(() => signature.value, (value) => {
            var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            let countLength = signature.value.length;
            if (2 <= countLength && countLength < 16 && !format.test(signature.value)) {
                disabledBtnPreview.value = false;
            } else {
                signature.value = value.replace(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g, '')
                disabledBtnPreview.value = true;
            }
        }
        );
        const setModalVisible = () => {
            disabledBtnPreview.value = true;
            emit("closePopup", false);
            previewImage.value = "";
            signature.value = '';
            disabledBtnHandOk.value = true;
        };
        const {
            mutate: getSeal,
            loading: loadingUpdate,
            onDone: onDoneSeal,
            onError: onErrSeal
        } = useMutation(mutations.createMyCompanyAutoGeneratedSeal);
        onDoneSeal(e => {
            triggers.value = false
        })

        const dataCall = ref({
            name: signature
        })
        const { refetch: refetchData, loading, error, onResult } = useQuery(queries.getSeal, dataCall.value, () => ({ enabled: triggers.value, fetchPolicy: "no-cache", }))
        let sealData = ref('')
        onResult(e => {
            previewImage.value = 'data:image/png;base64,' + e.data.getMyCompanyAutoGeneratedSeal.seal
            sealData.value = e.data.getMyCompanyAutoGeneratedSeal.seal
            triggers.value = false
        })
        const createMyCompanyAutoGeneratedSeal = () => {
            refetchData()
            triggers.value = true
            disabledBtnHandOk.value = false;
        }
        const handOk = () => {
            emit("urlSeal", sealData.value)
            setModalVisible()
        }
        return {
            setModalVisible,
            previewImage,
            signature,
            disabledBtnPreview,
            disabledBtnHandOk,
            createMyCompanyAutoGeneratedSeal,
            handOk
        };
    },
});
</script> 
<style scoped>
.btn-stamp {
    width: 160px;
}

.stamp-text-note {
    text-align: left;
    margin-left: 3px;
    display: flex;
}
</style>