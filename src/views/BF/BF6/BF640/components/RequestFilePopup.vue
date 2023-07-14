<template>
  <a-modal
    :visible="true"
    @cancel="$emit('cancel', false)"
    :mask-closable="false"
    class="confirm-md"
    footer=""
    :width="420"
  >
    <standard-form action="" name="request-file-620">
      <div>
        <div class="eamil-input">
          <span>선택된 내역들의 전자신고파일 제작요청하시겠습니까?<br/>
            결과를 이메일로 받으시려면 이메일 주소를 입력하세요.</span>
          <mail-text-box
            width="250px"
            :required="true"
            placeholder="abc@example.com"
            v-model:valueInput="dataRequestFile.emailInput.receiverAddress"
            class="mt-10"
          ></mail-text-box>
        </div>
      </div>
      <div class="text-center mt-20">
        <button-basic
          class="mr-5"
          :text="'아니요'"
          :type="'default'"
          :mode="'outlined'"
          @onClick="$emit('cancel', false)"
        />
        <button-basic
          class="ml-5"
          :text="'네. 제작요청합니다'"
          :width="160"
          :type="'default'"
          :mode="'contained'"
          @onClick="onSubmit"
        />
      </div>
    </standard-form>
  </a-modal>
</template>
<script lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { defineComponent, ref } from "vue";
import mutations from "@/graphql/mutations/BF/BF6/BF640/index";
import notification from "@/utils/notification";
import { makeDataClean } from "@/helpers/commonFunction";
import { Message } from "@/configs/enum";

export default defineComponent({
  props: {
    requestFileData: {
      type: Object,
      default: {},
    },
    tabName: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const dataRequestFile = ref(props.requestFileData);
    const messageCreate = Message.getCommonMessage("106").message;
    const filterRequest:any = ref({});

    //----------------- query send request file tab 1--------------------------------

    const {
      mutate: creationWithholdingTaxTab1,
      onDone: onDoneTab1,
      onError: onErrorTab1,
    } = useMutation(
      mutations.requestCreationIncomeWageSimplifiedPaymentStatementElectronicFilingFile
    );

    // --------------query send request file tab 2--------------------------------

    const {
      mutate: creationLocalTab2,
      onDone: onDoneTab2,
      onError: onErrorTab2,
    } = useMutation(
      mutations.requestCreationIncomeBusinessSimplifiedPaymentStatementElectronicFilingFile
    );

    //-------------------on Submit request --------------------------------

    const onSubmit = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        filterRequest.value.paymentYear = props.requestFileData.filter.paymentYear;
        switch (props.tabName) {
          case "tab1":
            filterRequest.value.paymentHalfYear = props.requestFileData.filter.paymentHalfYear;
            dataRequestFile.value.filter = filterRequest.value;
            makeDataClean(dataRequestFile.value);
            dataRequestFile.value.filter.productionStatuses = dataRequestFile
            .value.filter.beforeProduction
            ? null
            : dataRequestFile.value.filter.productionStatuses;
            creationWithholdingTaxTab1(dataRequestFile.value);
            break;
            case "tab2":
            filterRequest.value.paymentMonth = props.requestFileData.filter.paymentMonth;
            dataRequestFile.value.filter = filterRequest.value;
            makeDataClean(dataRequestFile.value);
            dataRequestFile.value.filter.productionStatuses = dataRequestFile
              .value.filter.beforeProduction
              ? null
              : dataRequestFile.value.filter.productionStatuses;
            creationLocalTab2(dataRequestFile.value);
            break;
          default:
            break;
        }
      }
    };

    // onDone tab 1
    onDoneTab1(() => {
      notification("success", messageCreate);
      emit("cancel", true);
    });
    onErrorTab1((e: any) => {
      //notification('error', e.message);
    });
    // onDone tab 2
    onDoneTab2(() => {
      notification("success", messageCreate);
      emit("cancel", true);
    });
    onErrorTab2((e: any) => {
      //notification('error', e.message);
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
  width: 100%;
  margin-top: 20px;

  span {
    padding-right: 10px;
  }
}
</style>
