<template>
  <a-modal
    :visible="true"
    @cancel="$emit('cancel')"
    :mask-closable="false"
    class="confirm-md"
    footer=""
    :width="420"
  >
    <standard-form action="" name="request-file-620">
      <div>
        <div class="eamil-input">
          <span
            >선택된 내역들의 전자신고파일 제작요청하시겠습니까?<br />
            결과를 이메일로 받으시려면 이메일 주소를 입력하세요.</span
          >
          <mail-text-box
            width="250px"
            :required="true"
            placeholder="abc@example.com"
            v-model:valueInput="dataRequestFile.emailInput.receiverAddress"
            class="mt-10"
          ></mail-text-box>
        </div>
      </div>
      <div class="text-align-center mt-20">
        <button-basic
          class="button-form-modal"
          :text="'아니요'"
          :type="'default'"
          :mode="'outlined'"
          @onClick="$emit('cancel')"
        />
        <button-basic
          class="button-form-modal"
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
import { defineComponent, ref, watch } from "vue";
import mutations from "@/graphql/mutations/BF/BF6/BF620/index";
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
    const filterRequest: any = ref({});

    //----------------- query send request file tab 1--------------------------------

    const {
      mutate: creationWithholdingTaxTab1,
      onDone: onDoneTab1,
      onError: onErrorTab1,
    } = useMutation(
      mutations.requestCreationWithholdingTaxElectronicFilingFile
    );

    // --------------query send request file tab 2--------------------------------

    const {
      mutate: creationLocalTab2,
      onDone: onDoneTab2,
      onError: onErrorTab2,
    } = useMutation(
      mutations.requestCreationLocalIncomeTaxElectronicFilingFile
    );

    //-------------------on Submit request --------------------------------

    const onSubmit = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        filterRequest.value.imputedYear =
          props.requestFileData.filter.imputedYear;
        filterRequest.value.imputedMonth =
          props.requestFileData.filter.imputedMonth;
        filterRequest.value.paymentYear =
          props.requestFileData.filter.paymentYear;
        filterRequest.value.paymentMonth =
          props.requestFileData.filter.paymentMonth;
        switch (props.tabName) {
          case "tab1":
            filterRequest.value.withholdingTaxType =
              props.requestFileData.filter.withholdingTaxType;
            dataRequestFile.value.filter = filterRequest.value;
            makeDataClean(dataRequestFile.value);
            dataRequestFile.value.filter.productionStatuses = dataRequestFile
              .value.filter.beforeProduction
              ? null
              : dataRequestFile.value.filter.productionStatuses;
            creationWithholdingTaxTab1(dataRequestFile.value);
            break;
          case "tab2":
            filterRequest.value.reportType =
              props.requestFileData.filter.reportType;
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
      emit("cancel", false);
    });
    onErrorTab1((e: any) => {
      //notification('error', e.message);
    });
    // onDone tab 2
    onDoneTab2(() => {
      notification("success", messageCreate);
      emit("cancel", false);
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
