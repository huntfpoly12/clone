<template>
  <a-modal :visible="true" @cancel="$emit('cancel')" :mask-closable="false" class="confirm-md" footer="" :width="644">
    <standard-form action="" name="request-file-620">
      <div>
        <div class="eamil-input">
          <span>선택된 내역들의 전자신고파일 제작요청하고, 결과를</span>
          <mail-text-box width="250px" :required="true" placeholder="abc@example.com"
            v-model:valueInput="dataRequestFile.emailInput.receiverAddress"></mail-text-box>
        </div>
        <div>
          <span>로 메일을 발송하시겠습니까?</span>
        </div>
      </div>
      <div class="text-align-center mt-10">
        <button-basic class="button-form-modal" :text="'아니요'" :type="'default'" :mode="'outlined'"
          @onClick="$emit('cancel')" />
        <button-basic class="button-form-modal" :text="'네. 발송합니다'" :width="140" :type="'default'" :mode="'contained'"
          @onClick="onSubmit" />
      </div>
    </standard-form>
  </a-modal>
</template>
<script lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { defineComponent, ref } from 'vue';
import mutations from '@/graphql/mutations/BF/BF6/BF620/index';
import notification from '@/utils/notification';
import { makeDataClean } from '@/helpers/commonFunction';
import { Message } from '@/configs/enum';

export default defineComponent({
  props: {
    requestFileData: {
      type: Object,
      default: {},
    },
    tabName: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const dataRequestFile = ref(props.requestFileData);
    const messageCreate = Message.getCommonMessage('106').message;
    //----------------- query send request file tab 1--------------------------------

    const {
      mutate: creationWithholdingTaxTab1,
      onDone: onDoneTab1,
      onError: onErrorTab1,
    } = useMutation(mutations.requestCreationWithholdingTaxElectronicFilingFile);

    // --------------query send request file tab 2--------------------------------

    const { mutate: creationLocalTab2, onDone: onDoneTab2, onError: onErrorTab2 } = useMutation(mutations.requestCreationLocalIncomeTaxElectronicFilingFile);

    //-------------------on Submit request --------------------------------

    const onSubmit = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        switch (props.tabName) {
          case 'tab1':
            makeDataClean(dataRequestFile.value);
            dataRequestFile.value.filter.productionStatuses = dataRequestFile.value.filter.beforeProduction ? null : dataRequestFile.value.filter.productionStatuses;
            creationWithholdingTaxTab1(dataRequestFile.value);
            break;
          case 'tab2':
            makeDataClean(dataRequestFile.value);
            dataRequestFile.value.filter.productionStatuses = dataRequestFile.value.filter.beforeProduction ? null : dataRequestFile.value.filter.productionStatuses;
            creationLocalTab2(dataRequestFile.value);
            break;
          default:
            break;
        }
      }
    };

    // onDone tab 1
    onDoneTab1(() => {
      notification('success', messageCreate);
      emit('cancel', false);
    });
    onErrorTab1((e: any) => {
      notification('error', e.message);
    });
    // onDone tab 2
    onDoneTab2(() => {
      notification('success', messageCreate);
      emit('cancel', false);
    });
    onErrorTab2((e: any) => {
      notification('error', e.message);
    });

    return {
      dataRequestFile,
      onSubmit,
    };
  },
});
</script>
<style lang="scss" scoped>
.eamil-input {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;

  span {
    padding-right: 10px;
  }
}

.mt-50 {
  margin-top: 50px;
}

.text-align-center {
  text-align: center;
}

.button-form-modal {
  margin: 0px 5px;
}
</style>
