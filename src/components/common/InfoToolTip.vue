<template>
  <a-tooltip :placement="placement">
    <template #title>
      <slot/>
    </template>
    <div :style="{'cursor': 'pointer','margin-left': '10px'}" class="d-flex-center">
      <img src="@/assets/images/iconInfo.png" style="width: 16px" />
    </div>
  </a-tooltip>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { ref, watch, getCurrentInstance, computed } from "vue";
import queries from "@/graphql/queries/AC/AC6/AC610/index";
import { useQuery } from "@vue/apollo-composable";
import { companyId } from "@/helpers/commonFunction";
import DxSelectBox from "devextreme-vue/select-box";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
export default {
    props: {
      placement: {
        type: String,
        default: "top",
      }
    },

};
</script>

<style lang="scss">
.ant-tooltip {
  max-width: 300px !important;
}
</style>
