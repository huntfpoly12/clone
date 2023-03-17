<template>
  <a-modal v-model:visible="visibleConfirm" :mask-closable="false" class="confirm-md" footer="" :width="521"
      @cancel="cancelModal" />
</template>

<script lang="ts">
import { defineComponent, watch, ref, reactive } from 'vue'
import { Modal } from 'ant-design-vue';
import { WarningOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  props: {
      modalStatus: {
          type: Boolean,
          default: false,
      },
      typeModal: {
          type: String
      },
      title: {
          type: String
      },
      content: {
          type: String
      },
      keyAccept: {
          type: String
      },
      okText: {
          type: String,
          default: "이해했다"
      },
      cancelText: {
          type: String,
          default: "이해했다"
      },
      isConfirmIcon: {
          type: Boolean,
          default: false
      }
  },
  components: {
      WarningOutlined
  },
  setup(props, { emit }) {
      const inputAccep = ref()
      const visibleConfirm = ref<boolean>(false);
      let visible = ref(false);
      const icon = reactive(props.isConfirmIcon ? {} : { icon: null })
      watch(
          () => props.modalStatus,
          (newValue, old) => {
              if (newValue == true) {
                  if (props.typeModal == "error")
                      Modal.error({
                          title: props.title,
                          content: props.content,
                          okText: props.okText,
                          onOk() {
                              emit("closePopup", false)
                          },

                      });
                  else if (props.typeModal == "warning")
                      Modal.warning({
                          title: props.title,
                          content: props.content,
                          okText: props.okText,
                          onOk() {
                              emit("closePopup", false)
                          },

                      });
                  else if (props.typeModal == "success")
                      Modal.success({
                          title: props.title,
                          content: props.content,
                          okText: props.okText,
                          onOk() {
                              emit("closePopup", false)
                          },

                      });
                  else if (props.typeModal == "info")
                      Modal.info({
                          title: props.title,
                          content: props.content,
                          okText: props.okText,
                          onOk() {
                              emit("closePopup", false)
                          },
                      });
                  else if (props.typeModal == "confirm")
                      Modal.confirm({
                          title: props.title,
                          content: props.content,
                          okText: props.okText,
                          cancelText: props.cancelText,
                          ...icon,
                          class: props.isConfirmIcon ? '' : 'noIcon',
                          onOk() {
                              emit("checkConfirm", true)
                              // emit("closePopup", false)

                          },
                          onCancel() {
                              emit("closePopup", false)
                              emit("checkConfirm", false)
                          },
                      });
                  else if (props.typeModal == "acceptInput") {
                      visibleConfirm.value = true
                  }
              }
          }
      );

      const handleOk = () => {
          if (props.keyAccept == inputAccep.value)
              emit("checkConfirm", true)
          else
              emit("checkConfirm", false)
          visibleConfirm.value = false
      }

      const cancelModal = () => {
          emit("closePopup", false)
      }

      return {
          handleOk,
          visible,
          visibleConfirm,
          inputAccep,
          cancelModal
      }
  },
})
</script>

<style lang="scss" >
.ant-modal-confirm-body svg {
  font-size: 50px;
}

.noIcon {
  text-align: center;
}
</style>
