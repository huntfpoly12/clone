<template>
    <div class="year-header">
        <label for="" class="label-year-header">회계•원천 귀속연도</label>
        <caret-left-outlined class="arrow-plus" @click="decrementYear"/>
        <default-text-box width="90px" :disabled="true" :valueInput="currentYear.toString()"/>
        <caret-right-outlined class="arrow-plus"  @click="incrementYear"/>
        <!-- không dùng popup chung trong component này vì nhiều màn cần check logic confirm khác nhau -->
        <!-- <PopupMessageCustom
          :modalStatus="isPopupVisible"
          @closePopup="hidePopup"
          :typeModal="'confirm'"
          :title="Message.getMessage('COMMON', '501').message"
          content=""
          :okText="Message.getMessage('COMMON', '501').yes"
          :cancelText="Message.getMessage('COMMON', '501').no"
          @checkConfirm="confirmPopup"
        /> -->
    </div>
</template>
<script lang="ts">
import { defineComponent , computed} from "vue";
import { useStore } from 'vuex';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons-vue';
//import {Message} from "@/configs/enum";
import debounce from "lodash/debounce";

//import PopupMessageCustom from "@/components/common/PopupMessageCustom.vue";
import {ClickYearStatus, FormStatus} from "@/store/settingModule/types";
export default defineComponent({
    // computed: {
    //   Message() {
    //     return Message
    //   }
    // },
    components: {
        //PopupMessageCustom,
        CaretLeftOutlined,
        CaretRightOutlined,
    },
    setup() {
      const store = useStore();
      const currentYear = computed(() => store.getters['settings/currentYear'])
      //const newYear = computed(() => store.getters['settings/newYear'])
      const isPopupVisible = computed(() => store.getters['settings/isPopupVisible'])

      const incrementYear = debounce(async () => {
        const nextYear = currentYear.value + 1
        // Kiểm tra xem form có được thay đổi hay không
        const checkFormStatus = await store.dispatch('settings/checkFormStatus')
        // Nếu form không được thay đổi thì thay đổi năm
        if (checkFormStatus) {
          // Nếu form được thay đổi thì hiển thị popup và lưu năm mới vào store (state: newYear)
          store.commit('settings/setNewYear', nextYear)
          store.commit('settings/setCurrentYear', currentYear.value)
          store.commit('settings/setClickYearStatus', ClickYearStatus.increasing)
        }else{
          store.commit('settings/setCurrentYear', nextYear)
        }
      }, 300)
      // Tương tự như trên
      const decrementYear = debounce(async () => {
        const nextYear = currentYear.value - 1
        const checkFormStatus = await store.dispatch('settings/checkFormStatus')
        if (checkFormStatus) {
          store.commit('settings/setNewYear', nextYear)
          store.commit('settings/setCurrentYear', currentYear.value)
          store.commit('settings/setClickYearStatus', ClickYearStatus.decreasing)
        } else {
          store.commit('settings/setCurrentYear', nextYear)
        }
      }, 300)

      // PHẦN NÀY VIẾT RA Action ĐỂ CÁC MÀN CÓ THỂ GỌI VỀ RESET
      // Hàm này được gọi khi người dùng click vào nút "Hủy" trên popup
      // và sẽ reset lại trạng thái của state
      // const hidePopup = () => {
      //   store.commit('settings/setPopupVisible', false)
      //   store.commit('settings/setCurrentYear', newYear.value)
      //   store.commit('settings/setClickYearStatus', ClickYearStatus.none)
      //   store.commit('settings/setFormStatus', FormStatus.none)
      // }

      //  PHẦN  NÀY CŨNG VIẾT RA ACTION ĐỂ CÁC MÀN CÓ THỂ GỌI NẾU CẦN
      // Hàm này được gọi khi người dùng click vào nút "Đồng ý" trên popup
      // const confirmPopup = (e: boolean) => {
      //   if (e) {
      //     store.commit('settings/setPopupVisible', false)
      //     store.commit('settings/setClickYearStatus', ClickYearStatus.increasing)
      //   }
      // }

      // KHI VIẾT COMPONENT CHÚ Ý TỐI ƯU CÀI ĐẶT NHẤT ĐỂ KHÔNG ẢNH HƯỞNG TỚI LOGIC CỦA CÁC MÀN KHÁC
      // CÁC MÀN KHÁC KHI XỬ DỤNG CHỈ QUAN TÂM ĐẾN STATE VÀ TRẠNG THÁI ĐƯỢC SET VÀ TRẢ VỀ. 

        return {
          currentYear,
          isPopupVisible,
          incrementYear,
          decrementYear,
          //hidePopup,
         // confirmPopup
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
