<template>
    <div class="year-header">
        <label for="" class="label-year-header">회계•원천 귀속연도</label>
        <caret-left-outlined class="arrow-plus" @click="decrementYear"/>
        <default-text-box width="90px" :disabled="true" :valueInput="currentYear.toString()"/>
        <caret-right-outlined class="arrow-plus"  @click="incrementYear"/>
        <PopupMessageCustom
          :modalStatus="isPopupVisible"
          @closePopup="hidePopup"
          :typeModal="'confirm'"
          :title="Message.getMessage('COMMON', '501').message"
          content=""
          :okText="Message.getMessage('COMMON', '501').yes"
          :cancelText="Message.getMessage('COMMON', '501').no"
          @checkConfirm="confirmPopup"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent , ref, computed} from "vue";
import { useStore } from 'vuex';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons-vue';
import {Message} from "@/configs/enum";
import debounce from "lodash/debounce";
import {ClickYearStatus, FormStatus} from "@/store/settingModule";
import PopupMessageCustom from "@/components/common/PopupMessageCustom.vue";
export default defineComponent({
    computed: {
      Message() {
        return Message
      }
    },
    components: {
        PopupMessageCustom,
        CaretLeftOutlined,
        CaretRightOutlined,
    },
    setup() {
      const store = useStore();
      const currentYear = computed(() => store.getters['settings/currentYear'])
      const newYear = computed(() => store.getters['settings/newYear'])
      const isPopupVisible = computed(() => store.getters['settings/isPopupVisible'])

      const incrementYear = debounce(async () => {
        const nextYear = currentYear.value + 1
        const shouldShowPopup = await store.dispatch('settings/showPopupIfNeeded')
        if (!shouldShowPopup) {
          store.commit('settings/setCurrentYear', nextYear)
        } else {
          store.commit('settings/setNewYear', nextYear)
        }
      }, 300)
      const decrementYear = debounce(async () => {
        const nextYear = currentYear.value - 1
        const shouldShowPopup = await store.dispatch('settings/showPopupIfNeeded')
        if (!shouldShowPopup) {
          store.commit('settings/setCurrentYear', nextYear)
        } else {
          store.commit('settings/setNewYear', nextYear)
        }
      }, 300)
      const hidePopup = () => {
        store.commit('settings/setPopupVisible', false)
        store.commit('settings/setCurrentYear', newYear.value)
        store.commit('settings/setClickYearStatus', ClickYearStatus.none)
        store.commit('settings/setFormStatus', FormStatus.none)
      }

      const confirmPopup = (e: boolean) => {
        if (e) {
          store.commit('settings/setPopupVisible', false)
          store.commit('settings/setClickYearStatus', ClickYearStatus.increasing)
        }
      }

        return {
          currentYear,
          isPopupVisible,
          incrementYear,
          decrementYear,
          hidePopup,
          confirmPopup
        }
    },
});
</script>

<style lang="scss" scoped>
.year-header{
    width: 300px;
    display: flex;
    align-items: center;
}
::v-deep .dx-texteditor-input{
    min-height: 0px;
    text-align: center;
    font-weight: bold;
    color: purple;
    font-size: 20px;
}


.arrow-plus{
    font-size: 30px;
    color: gray;
}

.arrow-plus:hover{
    color:white !important;
}
.label-year-header{
    color: yellow;
}
</style>
