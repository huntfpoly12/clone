<template>
  <span v-if="(disabled || status == 20)">
    <span v-for="item in arrayRadioManager" :key="item.id">
      <button-basic v-if="(status == item.id)" :width="100" :text="item.text" :class="item.class"
        class="buttonModal disabled">
      </button-basic>
    </span>
  </span>
  <a-popover v-else trigger="click" v-model:visible="showModal" color="#e6e6e6">
    <template #content>
      <div class="mytext">
        <div v-if="status == 30 || status == 40">
          <radio-group :arrayValue="userType == 'm' ? arrayRadioManager : arrayRadioUser" v-model:valueRadioCheck="statusBinding"
            :layoutCustom="'horizontal'" />
          <span>으로 변경하시겠습니까?</span>
        </div>
        <div v-else>
          <span>입력마감시 더이상 수정불가합니다. 그래도 변경하시겠습니까?</span>
        </div>
        <div class="mt-20">
          <button-basic class="button-form-modal" :text="'아니오'" :type="'normal'" :mode="'contained'"
            @onClick="setModalVisible" />
          <button-basic class="button-form-modal" :text="'네, 변경합니다.'" :width="140" :type="'default'" :mode="'contained'"
            @onClick="submitChangeStatus" />
        </div>
      </div>
    </template>
    <span v-for="item in arrayRadioManager" :key="item.id">
      <button-basic v-if="(status == item.id)" :width="100" :text="item.text" :class="item.class" class="buttonModal">
      </button-basic>
    </span>
  </a-popover>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from "vue";
import { companyId, userType } from "@/helpers/commonFunction";

export default defineComponent({
  props: {
    index: {
      type: Number,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false
    },
    dataRow: {
      type: Array,
      required: false
    },
    status: {
      type: Number,
      required: false
    },
    preventChange: {
      type: Boolean,
      required: false
    }
  },
  setup(props, { emit }) {
    const statusBinding = ref(props.status);
    const showModal = ref(false)
    const arrayRadioUser = ref([
      { id: 10, text: '입력중', class: 'entering' },
      { id: 20, text: '입력마감', class: 'input' },
    ])
    const arrayRadioManager = ref([
      { id: 10, text: '입력중', class: 'entering' },
      { id: 20, text: '입력마감', class: 'input' },
      { id: 30, text: '조정중', class: 'adjusting' },
      { id: 40, text: '조정마감', class: 'adjusted' },
    ])

    const globalFacilityBizId = computed<number>(() => parseInt(sessionStorage.getItem("globalFacilityBizId") ?? '0'));
    const acYear = ref<number>(parseInt(sessionStorage.getItem("acYear") ?? '0'))
    const query = reactive({
      companyId,
      fiscalYear: acYear.value,// acYear.value
      facilityBusinessId: globalFacilityBizId.value,
      index: props.index
    })

    const setModalVisible = () => {
      showModal.value = false;
    };

    const submitChangeStatus = () => {
      emit('submitChangeStatus', statusBinding.value)
      showModal.value = false;
      if(props.preventChange && statusBinding.value === 40) {
        statusBinding.value = props?.status
      }
    }

    watch(() => props.status, (value) => {
      statusBinding.value = value
    })
    return {
      statusBinding,
      arrayRadioUser,
      arrayRadioManager,
      setModalVisible,
      showModal,
      userType,
      submitChangeStatus,
    }
  },
});
</script>
<style lang="scss" scoped>
.entering {
  background-color: #346CB0 !important;
  box-shadow: rgba(0, 0, 0, 0.384) 0px 0px 10px 4px;
  border: 1px solid #4A7EBB;
}

.input {
  background-color: #376092 !important;
  border: 3px solid #558ED5 !important;
}

.adjusting {
  background-color: #BB3835 !important;
  box-shadow: rgba(0, 0, 0, 0.384) 0px 0px 10px 4px;
  border: 1px solid #BE4B48 !important;
}

.adjusted {
  background-color: #C00000 !important;
  border: 3px solid #953735 !important;
}

.mytext {
  min-width: 300px;
  text-align: center;
  padding: 5px;
}

.button-form-modal {
  margin: 0px 5px;
}

:deep .dx-widget.dx-collection {
  justify-content: center;
}

.buttonModal {
  color: white;
  border: none;
  border-radius: 6px;
}

.disabled {
  cursor: no-drop;
}

:deep .dx-button-text {
  line-height: inherit;
}
</style>

