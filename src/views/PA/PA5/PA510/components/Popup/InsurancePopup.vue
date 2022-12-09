<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="600">
            <div class="custom-modal">
                <div class="text-align-center">
                    <div style="display: flex;">
                        <h3>4대보험 EDI 조회 결과</h3>
                        <img src="@/assets/images/iconInfo.png" style="width: 16px; height: 16px; margin: 5px 5px 0px 10px;" />
                        <div class="noteText">
                            <span>4대보험 EDI 정보를 불러오기 전이거나 오류인 경
                                <br>
                            우 4대보험 EDI 값이 공란으로 표시될 수 있습니다.</span>
                        </div>
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
            <div class="text-align-center mt-40">
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

.mt-40 {
    margin-top: 40px;
}

.text-align-center {
    text-align: center;
}

.text-align-left {
    text-align: left;
}

.button-form-modal {
    margin: 0px 5px;
}
</style>