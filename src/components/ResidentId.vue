<template>
  <div v-if="residentId.length == 14">
    <a-tooltip placement="top"
      v-if="validResidentId(residentId)"
      key="black">
      {{ residentId }}
    </a-tooltip>
    <a-tooltip placement="top" v-else :title="msgError" color="red">
      {{ residentId }}
    </a-tooltip>
  </div>
  <div v-else>
    <a-tooltip placement="top" key="black">
      {{ residentId.slice(0, 6) + '-' + residentId.slice(6, 13) }}
    </a-tooltip>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { validResidentId } from "@bankda/jangbuda-common";
import { Message } from '@/configs/enum';
export default defineComponent({
  props: {
    residentId: {
      type: [String],
      required: true
    },
  },
  setup() {
    const msgError = Message.getMessage('COMMON', '701').message;
    return {
      msgError,
      validResidentId
    };
  },
});
</script>
  
  