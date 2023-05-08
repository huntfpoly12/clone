<template>
   <action-header/>
   <div class="content-pa410">
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <PA410Page1 v-if="current == 0" ref="step1Pa410"/>
      <PA410Page2 v-if="current == 1" ref="step2Pa410"/>
      <PA410Page3 v-if="current == 2"/>
    </div>
    <div class="steps-action">
      <a-button v-if="current > 0"  @click="prev"> &lt; 이 전</a-button>
      <a-button v-if="current == 0" type="primary" @click="next" style="margin-left: 8px">다 음  ></a-button>
      <a-button v-if="current == 1" type="primary" @click="nextStep2" style="margin-left: 8px">퇴직금 계산 ></a-button>
      <a-button v-if="current == steps.length - 1" type="primary" @click="firstStep" style="margin-left: 8px" >처음으로</a-button>
    </div>
  </div>
  <!-- <component v-bind:is="currentPage"/> -->
</template>
<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from 'vuex';
import { companyId } from '@/helpers/commonFunction';
import PA410Page1 from "./components/PA410Page1.vue";
import PA410Page2 from "./components/PA410Page2.vue";
import PA410Page3 from "./components/PA410Page3.vue";
export default defineComponent({
  components: {
    PA410Page1,
    PA410Page2,
    PA410Page3
  },
  computed: {
    
  },
  setup() {
    const step1Pa410 = ref()
    const step2Pa410 = ref()
    const store = useStore();
    const current = computed(() => store.state.common.currentStepPA410);
    const globalYear = computed(() => parseInt(sessionStorage.getItem("paYear")?? '0'));
    store.dispatch('common/getListEmployee', {
                  companyId: companyId,
                  imputedYear: globalYear,
      })
    const next = () => {
      store.dispatch('common/setNextStep')
      step1Pa410.value.nextPage()
    };
    const nextStep2 = () => {
      step2Pa410.value.calculateIncomeRetirement()
      //current.value++;
    };
    const prev = () => {
      store.dispatch('common/setPrvStep')
    };
    const firstStep = () => {
      store.dispatch('common/setResetStep')
    };
    return {
      store,
      current,
      next,
      nextStep2,
      firstStep,
      step1Pa410,
      step2Pa410,
      prev,
      steps: [
        {
          title: 'First',
          content: 'First-content',
        },
        {
          title: 'Second',
          content: 'Second-content',
        },
        {
          title: 'Last',
          content: 'Last-content',
        },
      ],
    };
  },
});
</script>
<style lang="scss" scoped>
.content-pa410{
  margin: 10px 120px;
  .steps-action{
    text-align: center;
  }
}
</style>














































































































<style lang="scss" scoped src="./style/style.scss" />
