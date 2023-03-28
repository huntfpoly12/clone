<template>
  <a-modal v-model:visible="isModalRetrieveStatements" :closable="false" class="confirm-md" footer="" :width="400"
      @cancel="cancelModal">
      <a-row>
          <a-col :span="24" class="centent-wrap">
              <h3><b>{{ title }}</b></h3>
              <p v-html="content"></p>
          </a-col>
          <div style="text-align: center; width: 100%;">
            <button-basic :text="cancelText" type="default" style="margin-right: 10px" :mode="'outlined'" @onClick="cancelModal" />
            <button-basic :text="okText" type="default" :mode="'contained'" @onClick="agreeModal" />
          </div>
      </a-row>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, watch, ref, reactive } from 'vue'
import { Modal } from 'ant-design-vue';
export default defineComponent({
  props: {
      isModalRetrieveStatements: {
          type: Boolean,
          default: false,
      },
      title: {
          type: String
      },
      content: {
          type: String
      },
      okText: {
          type: String,
          default: "이해했다"
      },
      cancelText: {
          type: String,
          default: "이해했다"
      }
  },
  setup(props, { emit }) {

      const cancelModal = () => {
          emit("closePopup", false)
      }

      const agreeModal = () => {
        emit("confirm", false)
      }

      return {
          cancelModal,
          agreeModal
      }
  },
})
</script>

<style lang="scss" scoped>
.mr-10 {
  margin-right: 10px;
}
.ant-modal-confirm-body svg {
  font-size: 50px;
}

.noIcon {
  text-align: center;
}
</style>

