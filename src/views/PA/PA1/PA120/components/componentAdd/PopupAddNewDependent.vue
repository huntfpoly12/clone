<template>
    <div>
        <a-modal :visible="modalStatus" title="사원등록" centered @cancel="setModalVisible()"
            :mask-closable="false" :width="1028" :footer="null" :bodyStyle="{padding: '0px', height: '650px' }">
            <div class="page-content">
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="연말관계" label-align="right" class="income-tax-app-rate">
                            <dependants-relation-select-box width="200px"></dependants-relation-select-box>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="소득세 적용율" label-align="right" class="income-tax-app-rate">
                            <radio-group :valueRadioCheck="1" layoutCustom="horizontal"></radio-group>
                        </a-form-item>
                    </a-col>
                </a-row>
            </div>
 
        </a-modal>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
    components: {},
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

