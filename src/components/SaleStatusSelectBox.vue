<template>
  <div>
    <a-select :style="{ width: width, height: $config_styles.HeightInput }" v-model:value="data" :disabled="disabled"
      option-label-prop="children" @select="selectedValue(data)" :placeholder="placeholder">
      <a-select-option v-for="saleStatus in saleGrade" :key="saleStatus.value" :label="saleStatus.label"
        :style="{ width: width }">
        <a-tag :color="getColorTag(saleStatus.label)">{{ saleStatus.label }}</a-tag>
      </a-select-option>
    </a-select>
    <a-modal v-if="confirmStatus" v-model:visible="visibleConfirm" :mask-closable="false" class="confirm-md" :width="521" @cancel="confirmClose(data)" :footer="null" >
      <a-row>
        <a-col :span="4">
          <warning-outlined :style="{ fontSize: '70px', color: '#faad14', paddingTop: '20px' }" />
        </a-col>
        <a-col :span="20">
          <h3><b>해지(숨김) 확인</b></h3>
          <p>해지(또는 숨김)하면 본 영업자와 연계된 모든 사업자는 본사로 이관됩니다.
          해지(또는 숨김)하려면 “확인”을 입력한 후 완료를
          누르세요</p>
        </a-col>
        <div class="confirm-input">
          <default-text-box v-model:valueInput="confirm" placeholder="확인" width="200px" />
          <button-basic @onClick="confirmClose(data)" style="margin-left: 10px" mode="outlined" type="default" text="취소"/>
          <button-basic @onClick="handleOkConfirm(data)" style="margin-left: 5px" mode="contained" type="default" text="완료" :disabled="okButton"/>
        </div>
      </a-row>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import DxSelectBox from "devextreme-vue/select-box";
import { WarningOutlined } from "@ant-design/icons-vue";
import {
  SalesRepresentativeStatus,
  enum2Entries,
} from "@bankda/jangbuda-common";

const saleGrade = enum2Entries(SalesRepresentativeStatus).map((value) => ({
  value: value[1],
  label: value[0],
}));

export default defineComponent({
  props: {
    width: String,
    disabled: Boolean,
    valueInput: {
      type: [Number, String],
    },
    placeholder: String,
    readOnly: Boolean,
    confirmStatus: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    DxSelectBox,
    WarningOutlined,
  },
  setup(props, { emit }) {
    let data = ref(props.valueInput);
    let oldData  = ref(props.valueInput);
    const okButton = ref<boolean>(true);
    const visibleConfirm = ref<boolean>(false);
    let confirm = ref<string>("");
    const selectedValue = (val: any) => {
      if ((val == 2 || val == 3) && props.confirmStatus == true) {
        visibleConfirm.value = true;
       
      } else {
        emit("update:valueInput", val);
      }
    };
    watch(
      () => props.valueInput,
      (newValue,oldValue) => {
        data.value = newValue;
        if(newValue != 1){
          oldData.value = newValue;
        }
      }
    );

    // confirm popup
    const handleOkConfirm = (val: any) => {
      if (confirm.value == "확인") {
        visibleConfirm.value = false;
        emit("update:valueInput", val);
      } else {
        data.value = 1;
        visibleConfirm.value = false;
      }
      confirm.value = '';
    };

    const confirmClose = (val: any) => {
      data.value = oldData.value;
    };

    watch(()=> confirm.value,(newValue)=>{
      okButton.value = newValue == "확인" ? false : true;
    });
    
    const getColorTag = (data: string) => {
      if (data === "정상") {
        return "#108ee9";
      } else if (data === "해지") {
        return "#cd201f";
      } else if (data === "숨김") {
        return "grey";
      }
    };
    return {
      selectedValue,
      saleGrade,
      visibleConfirm,
      confirm,
      okButton,
      getColorTag,
      handleOkConfirm,
      confirmClose,
      data,
      oldData
    };
  },
});
</script>
<style scoped>
.confirm-input{
  text-align: center;
   width: 100%; 
   margin-left: 100px;
   display: flex;
}
</style>
  