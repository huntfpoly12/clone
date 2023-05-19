<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="500">
        <div class="custom-modal-delete">
            <img src="@/assets/images/icon_delete.png" alt="" style="width: 30px;">
            <span>{{ contentDelete }}</span>
        </div>
        <div class="text-align-center mt-30">
            <button-basic class="button-form-modal" :text="contentNo" :type="'default'" :mode="'outlined'"
                @onClick="setModalVisible" />
            <button-basic class="button-form-modal" :text="contentYes" :width="140" :type="'default'" :mode="'contained'"
                @onClick="onDeleteConfirm" />
        </div>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
        contentDelete: {
            type: String,
            default: '',
        },
        contentYes: {
            type: String,
            default: '네. 삭제합니다',
        },
        contentNo: {
            type: String,
            default: '아니요',
        }

    },
    setup(props, { emit }) {
        const setModalVisible = () => {
            emit("closePopup", false)
        };
        const onDeleteConfirm = () => {
            emit("closePopup", false)
            emit('confirmDelete', true);
        }
        return {
            setModalVisible,
            onDeleteConfirm,
        }
    },
})
</script>

<style></style>