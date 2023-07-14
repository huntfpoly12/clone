<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="600">
            <div class="custom-modal">
                <div class="text-center">
                    <div style="display: -webkit-inline-box;">
                    <h3>4대보험 EDI 조회 결과</h3>
                    <a-tooltip color="black" placement="top">
                        <template #title><span>4대보험 EDI 정보를 불러오기 전이거나 오류인 경
                                <br>
                                우 4대보험 EDI 값이 공란으로 표시될 수 있습니다.</span></template>
                        <img src="@/assets/images/iconInfo.png" class="img-info" />
                    </a-tooltip>
                </div>

                    <div>
                        <table class="table text-align-left">
                            <tr class="title">
                                <th>항목</th>
                                <th>4대보험 EDI</th>
                                <th>원본</th>
                            </tr>
                            <tr>
                                <td>국민연금</td>
                                <td>new-value</td>
                                <td>old-value</td>
                            </tr>
                            <tr>
                                <td>건강보험</td>
                                <td>new-value</td>
                                <td>old-value</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="text-center mt-40">
                <button-basic class="button-form-modal" :text="'적용'" :width="140" :type="'default'" :mode="'contained'"
                    @onClick="onSubmit" />
            </div>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Object,
            default: {}
        },
        emailUserLogin: {
            type: String,
            default: ""
        }
    },
    components: {
    },
    setup(props, { emit }) {
        ;

        const setModalVisible = () => {
            emit("closePopup", false)
        };
        const onSubmit = (e: any) => {

        };

        return {
            setModalVisible,
            onSubmit,
        }
    },
})
</script>

<style lang="scss" scoped>
.custom-modal {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 20px;

    .table,
    th,
    td {
        border: 1px solid gray;
        padding: 5px 10px;
        width: 500px;
    }
    .title {
        background-color: #e6f7ff;
    }
}

.text-align-left {
    text-align: left;
}
</style>