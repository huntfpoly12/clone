<template>
    <a-modal :visible="modalStatus" footer="" :mask-closable="false" title="" okText="저장하고 나가기" cancelText="그냥 나가기"
        @cancel="setModalVisible" width="576px" :closable="false">
        <div class="content-confirm">
            <div class="text-icon">
             
                    <img src="@/assets/images/icon_delete.png" alt="">
                
                <p>본 원천징수이행상황신고서(원천징수세액환급신청서, 기납부세액명세서 포함)를 삭제하시겠습니까? 원천징수세액환급신청서와 기납부세액명세서가 있는 경우 함께 삭제됩니다. 그래도 삭제를 원하는 경우 아래에 “삭제”라고 입력하신 후 [삭제] 버튼을 누르세요.</p>
            </div>
            <div class="input-confirm">
                 <default-text-box width="100px" :required="true" placeholder="삭제" v-model:valueInput="textComfirm" />
            </div>
           <a-row style="margin-top: 20px;">
                <a-col :span="24" :offset="6">
                    <button-basic text="아니오" type="default" mode="outlined" @onClick="setModalVisible()"
                        :width="120" style="margin-right: 10px;" />
                    <button-basic text="네. 삭제합니다" type="default" mode="contained"
                        @onClick="deleteReport()" :width="150" />
                </a-col>
            </a-row>
        </div>

    </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive } from "vue";
import { useMutation } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA2/PA210/index";
import notification from "@/utils/notification"
import { companyId } from "@/helpers/commonFunction";
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

      const {
              mutate: actionDeleteReport,
              onDone: doneUpdate,
              onError: errUpdate
          } = useMutation(mutations.deleteTaxWithholdingStatusReport);
      doneUpdate(() => {
        notification('success', `보고서가 삭제되었습니다!`)
        setModalVisible()
      })
      errUpdate((error) => {
          notification('error', error.message)
      })
      const deleteReport = () => {
        if (textComfirm.value === '삭제') {
          actionDeleteReport({
                            companyId: companyId,
                            imputedYear: props.imputedYear,
                            reportId: props.reportId
                            })
        } else {
          setModalVisible()
        }
      }
      return {
        textComfirm,
        setModalVisible, 
        deleteReport
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
