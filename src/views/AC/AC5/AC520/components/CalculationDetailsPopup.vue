<template>
  <a-modal v-bind="$props" @ok="handleOk" @cancel="closePopup" :mask-closable="false">
    <a-row>
      <a-col span="6"></a-col>
        <dx-field-custom label="산출내역">
          <a-radio-group
            :value="typeCal"
            required
          >
            <a-radio :value="1">제목</a-radio>
            <a-radio :value="2">계산식</a-radio>
          </a-radio-group>
        </dx-field-custom>
      <a-col span="16"></a-col>
    </a-row>
  </a-modal>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

import DxFieldCustom from "@/components/common/DxFieldCustom.vue";
import {ModalProps} from "ant-design-vue";
interface Props extends ModalProps {
  isOpen?: boolean
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['closePopup'])

const typeCal = ref(2)
const handleOk = () => {

}
const closePopup = () => {
  emit('closePopup', false)
}
</script>

<style scoped>

</style>
