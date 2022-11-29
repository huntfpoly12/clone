<template>
    <div>
        <a-modal :visible="modalStatus" title="사원등록" centered @cancel="setModalVisible()"
            :mask-closable="false" :width="1028" :footer="null" :bodyStyle="{padding: '0px', height: '650px' }">
          
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

