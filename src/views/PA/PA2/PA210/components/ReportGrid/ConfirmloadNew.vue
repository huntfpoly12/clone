<template>
    <a-modal :visible="modalStatus" footer="" :mask-closable="false" title="" okText="저장하고 나가기" cancelText="그냥 나가기"
        @cancel="setModalVisible" width="420px" :closable="false">
        <div class="content-confirm">
            <div class="text-icon">
             <p>본 원천징수이행상황신고서의 내용을 새로 불러옵니다. 이후 저장시 본 내용이 저장됩니다. 그래도 진행하시겠습니까?</p>
            </div>
           <a-row style="margin-top: 20px;">
                <a-col :span="24" :offset="3">
                    <button-basic text="아니오" type="default" mode="outlined" @onClick="setModalVisible()"
                        :width="120" style="margin-right: 10px;" />
                    <button-basic text="네. 새로 불러옵니다" type="default" mode="contained"
                        @onClick="loadNewReport()" :width="170" />
                </a-col>
            </a-row>
        </div>

    </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
    components: {
    
    },
    props: {
      modalStatus: Boolean,
      imputedYear: Number,
      reportId: Number
    },
    setup(props, { emit }) {
      const textComfirm =  ref('')
      const setModalVisible = () => {
          emit("closePopup", true)
      }
      const loadNewReport = () => {
        emit("loadNewAction", true)
        setModalVisible()
      }
      return {
        textComfirm,
        setModalVisible, 
        loadNewReport
      }
    }
})
</script>
<style scoped lang="scss" >
.content-confirm{
    .text-icon{
        display: flex;
        img{
            margin: 20px 5px 22px 5px;
            width: 40px;
            height: 46px;
        }
    }
    .input-confirm{
            margin-left: 200px;
    }
}
</style>
