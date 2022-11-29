<template>
    <div>
        <a-modal :visible="modalStatus" title="사원등록" centered @cancel="setModalVisible()"
            :mask-closable="false" :width="750" :footer="null" :bodyStyle="{padding: '0px', height: '478px' }">
            <div class="page-content" id="add-new-dependent-pa-120">
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="연말관계" label-align="right" >
                            <dependants-relation-select-box width="200px"></dependants-relation-select-box>
                        </a-form-item>
                        <a-form-item label="성명" label-align="right" >
                            <default-text-box placeholder="한글,영문(대문자) 입력 가능" width="200px" :required="true"></default-text-box>
                        </a-form-item>
                        <a-form-item label="연말관계" label-align="right" >
                            <switch-basic textCheck="내국인" textUnCheck="외국인" />
                        </a-form-item>
                        <a-form-item label="주민(외국인)번호" label-align="right" >
                            <id-number-text-box :required="true"  width="150px"></id-number-text-box>
                        </a-form-item>
                        <a-form-item label="나이" label-align="right" >
                            <default-text-box  width="200px" :readOnly="true"></default-text-box>
                        </a-form-item>
                        <a-form-item label="기본공제" label-align="right" >
                            <basic-deduction-select-box width="200px"/>
                        </a-form-item>
                        <a-form-item label="부녀자" label-align="right" >
                            <switch-basic textCheck="X" textUnCheck="O" />
                        </a-form-item>
                        <a-form-item label="한부모" label-align="right" >
                            <switch-basic textCheck="X" textUnCheck="O" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="경로우대" label-align="right" >
                            <switch-basic textCheck="X" textUnCheck="O" />
                        </a-form-item>
                        <a-form-item label="장애인" label-align="right" >
                            <disabled-type-radio-group ></disabled-type-radio-group>
                        </a-form-item>
                        <a-form-item label="출산입양" label-align="right" >
                            <maternity-adoption-radio-box ></maternity-adoption-radio-box>
                        </a-form-item>
                        <a-form-item label="자녀세액공제" label-align="right" >
                            <switch-basic textCheck="X" textUnCheck="O" />
                        </a-form-item>
                        <a-form-item label="위탁관계" label-align="right" >
                            <default-text-box placeholder="최대 20자" width="200px" :maxCharacter="20"></default-text-box>
                        </a-form-item>
                        <a-form-item label="세대주여부" label-align="right" >
                            <switch-basic textCheck="X" textUnCheck="O" />
                        </a-form-item>
                    </a-col>
                </a-row>
           
            </div>
            <a-row style="margin-top: 40px">
                <a-col :span="8" :offset="8" style="text-align: center;">
                    <button-basic text="저장" type="default" mode="contained" :width="90"
                    />
                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import BasicDeductionSelectBox from "../../../../../../components/BasicDeductionSelectBox.vue";
import DisabledTypeRadioGroup from "../../../../../../components/DisabledTypeRadioGroup.vue";
import MaternityAdoptionRadioBox from "../../../../../../components/MaternityAdoptionRadioBox.vue";

export default defineComponent({
    components: {BasicDeductionSelectBox, DisabledTypeRadioGroup, MaternityAdoptionRadioBox},
    props:{
        modalStatus: Boolean,
    },
    setup(props,{emit}) {
        const employeeId = ref('');

        const setModalVisible = () => {
            emit('closePopup', false);
        }
        const setEmployeeId = (val : any) => {
            console.log(val);
            
            employeeId.value = val;
        }
        return {
            setModalVisible,
        };
    },
});
</script>
<style lang="scss" scoped>
#add-new-dependent-pa-120 {
  ::v-deep .ant-form-item-label>label {
    width: 135px;
    padding-left: 10px;
  }

  .input-text {
    display: flex;
    align-items: center;

    span {
      margin-left: 10px;
    }
  }

  ::v-deep .red {
    label {
      color: red;
    }
  }

  .zip-code{
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
  .roadAddress{
    margin-bottom: 5px;
  }
}
</style>
