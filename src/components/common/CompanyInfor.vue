<template>
  <div class="company-infor-header">
    <p v-if="companyName">{{ companyName }}</p>
   <p v-else>{{ userInfor && userInfor.compactCompany ? userInfor.compactCompany.name : '' }}</p>
  </div>
</template>
<script lang="ts">
import { computed } from "vue";
import { useStore } from 'vuex';
export default {

  setup(props: any, { emit }: any) {
    const store = useStore();
    store.dispatch('auth/getUserInfor');
    const userInfor = computed(() => store.state.auth.userInfor);
    const companyName = sessionStorage.getItem('companyName');
    return {
      userInfor,
      companyName
    };
  },
};
</script>

<style scoped lang="scss">
.company-infor-header{
  p{
    margin: 0px;
    font-weight: bold;
    font-size: 17px;
    color: yellow;
  }
  display: flex;
  align-items: center;
  margin-right: 20px;
  &-label {
    margin-right: 10px;
  }
}
</style>
