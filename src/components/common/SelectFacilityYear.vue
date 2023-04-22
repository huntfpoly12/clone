<template>
    <a-modal title="시설사업 및 귀속연도 선택" v-model:visible="modalStatus" :mask-closable="false" class="confirm-md" footer="" :width="550"
        @cancel="cancelModal">
        회계업무 시설사업 / 귀속연도 선택
        <a-row>
            <a-col :span="12">
                <warning-outlined :style="{ fontSize: '70px', color: '#faad14', paddingTop: '20px' }" />
            </a-col>
            <a-col :span="12" class="centent-wrap">{{ accounting }}
              <DxSelectBox  :width="'170px'" :data-source="accounting" 
                  v-model:value="facilityBiz"  :display-expr="'additionalServiceTypes'" :value-expr="'facilityBusinessId'" 
                :height="$config_styles.HeightInput"  placeholder="사업유형 선택">
              </DxSelectBox>
            </a-col>
            <div style="text-align: center; width: 100%;">
               
                <a-button type="primary" style="margin-left: 10px" >확인</a-button>
            </div>
        </a-row>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent} from 'vue'
import { WarningOutlined } from "@ant-design/icons-vue";
import { getJwtObject } from '@bankda/jangbuda-common';
import DxSelectBox from "devextreme-vue/select-box";
export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        WarningOutlined,
        DxSelectBox
    },
    setup(props, { emit }) {
      const token  = sessionStorage.getItem("token")
      let jwtObject = getJwtObject(token!);
      let infos = jwtObject.accounting;
      let accounting = infos?.map(item => {
        console.log(item.additionalServiceTypes);
        
        return {
          facilityBusinessId: item.id,
          startYearMonth: item.startYearMonth,
          
        }
      })
      let info = jwtObject.withholding;
      const cancelModal = () => {
            emit("closePopup", false)
        }
      return {
        accounting,
        cancelModal
      }
    },
})
</script>

<style lang="scss" >
.ant-modal-confirm-body svg {
    font-size: 50px;
}

.noIcon {
    text-align: center;
}
</style>
