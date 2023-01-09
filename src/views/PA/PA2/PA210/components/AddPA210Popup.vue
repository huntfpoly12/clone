<template>
    <div id="add-pa-210">
        <a-modal :visible="modalStatus" centered okText="네. 작성합니다" cancelText="아니요"
            @cancel="setModalVisible()" :mask-closable="false" width="650px" footer="">
            <standard-form formName="add-pa-210">
                <a-spin tip="Loading..." :spinning="loading">
                    <h2 style="font-weight: 600; color: gray" class="title_modal">
                        Create
                    </h2>
                    
                </a-spin>
                <div class="text-align-center mt-20">
                    <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
                        @onClick="setModalVisible()" />
                    <button-basic class="button-form-modal" :text="'네. 작성합니다'" :width="140"
                        :type="'default'" :mode="'contained'" @onClick="onSubmit($event)" />
                </div>
            </standard-form>
        </a-modal>
        <report-grid :modalStatus="reportGridStatus" @closePopup="reportGridStatus = false" ></report-grid>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, watch } from "vue";
import { companyId } from "@/helpers/commonFunction";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/CM/CM130/index";
import notification from "@/utils/notification";
import comfirmClosePopup from "@/utils/comfirmClosePopup";
import dayjs, { Dayjs } from "dayjs";
import ReportGrid from "./ReportGrid/ReportGrid.vue";

export default defineComponent({
    props: ["modalStatus"],

    components: {
      ReportGrid
    },

    setup(props, { emit }) {
        const loading = ref<Boolean>(false)
        const reportGridStatus  = ref(false)
        watch(() => props.modalStatus, (value) => {
           
        })
    
        const onSubmit = (e: any) => {
          reportGridStatus.value = true
        };
        const setModalVisible = () => {
            // if (JSON.stringify(objDataDefault.value) === JSON.stringify(formState) == true)
                emit("closePopup", false)
            // else
            //     comfirmClosePopup(() => emit('closePopup', false))
        };
        return {
            loading,
            labelCol: { style: { width: "150px" } },
            onSubmit,
            setModalVisible,
            reportGridStatus
        };
    },
});
</script>
<style lang="scss" scoped src="../style/stylePopup.scss">
::v-deep ul.ant-cascader-menu {
    height: auto;
    max-height: 180px;
}
</style>
