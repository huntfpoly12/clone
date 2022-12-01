<template>
  <div id="tab2-pa120">
    <div class="header-text-1">공제 / 감면 / 소득세 적용율 {{ employeeId }}</div>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item label="4대보험 공제 여부" label-align="right" class="ins-dedu">
          <checkbox-basic size="18px" label="국민연금" class="check-box-tab1"></checkbox-basic>
          <checkbox-basic size="18px" label="건강보험" class="check-box-tab1"></checkbox-basic>
        </a-form-item>
        <div class="header-text-2">두루누리사회보험 공제</div>
        <a-form-item label="두루누리사회보험 공제 여부" label-align="right" class="durunuri-insurance">
          <switch-basic switch-basic textCheck="Y" textUnCheck="N" class="switch-insurance"></switch-basic>
        </a-form-item>
        <a-form-item label="국민연금 적용율" label-align="right" class="pension">
          <radio-group :arrayValue="radioCheckPersenPension" :valueRadioCheck="1" layoutCustom="horizontal">
          </radio-group>
        </a-form-item>
        <a-form-item label="고용보험 적용율" label-align="right" class="pension">
          <radio-group :arrayValue="radioCheckPersenPension" :valueRadioCheck="1" layoutCustom="horizontal">
          </radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <div class="input-text empl-ins">
          <checkbox-basic size="18px" label="고용보험" width="120px"></checkbox-basic>
          <span>
            <img src="@/assets/images/iconInfo.png" style="width: 14px;" />
            <p>본 항목은 공제 계산을 위한 설정으로 실제 4대보험 신고 여부와는 무관합니다.</p>
          </span>
        </div>
        <div class="header-text-2">중소기업취업 감면</div>
        <a-form-item label="중소기업취업 감면 여부" label-align="right" class="durunuri-insurance">
          <switch-basic switch-basic textCheck="Y" textUnCheck="N" class="switch-insurance"></switch-basic>
        </a-form-item>
        <a-form-item label="감면기간" label-align="right" :label-col="{ style: { width: '85px' } }">
          <a-range-picker v-model:value="rangeDate" :placeholder="['Start', 'End']" />
        </a-form-item>
        <a-form-item label="감면율" label-align="right">
          <radio-group :arrayValue="radioCheckReductioRate" :valueRadioCheck="1" layoutCustom="horizontal">
          </radio-group>
        </a-form-item>
        <a-form-item label="감면입력" label-align="right" class="durunuri-insurance">
          <radio-group :arrayValue="radioCheckReductionInput" :valueRadioCheck="1" layoutCustom="horizontal">
          </radio-group>
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item label="소득세 적용율" label-align="right" class="income-tax-app-rate">
      <radio-group :arrayValue="IncomeTaxAppRate" :valueRadioCheck="1" layoutCustom="horizontal"></radio-group>
    </a-form-item>
    <div class="header-text-3">급여 (기본값)
      <span>
        <img src="@/assets/images/iconInfo.png" style="width: 14px;" />
        <p>급여소득자료 입력시 본 급여 기본값을 불러옵니다</p>
      </span>
    </div>
    <a-row :gutter="16">
      <a-col :span="8">
        <div class="header-text-2">요약</div>
        <div class="summary">
          <div class="text0">소득수당 합계</div>
          <div class="text1">수당 과세 합계 {50000}원</div>
          <div class="text2">수당 비과세 합계 {50000}원</div>
          <div class="text3">공제 합계 {50000}원 </div>
          <div class="text4">차인지급액 {50000}원 </div>
          <div class="text5">
            <span>
              <img src="@/assets/images/iconInfo.png" style="width: 14px; height: 14px;" />
              <p>차인지급액 = 수당 합계 - 공제 합계</p>
            </span>
          </div>
        </div>

      </a-col>
      <a-col :span="8">
        <div class="header-text-2">수당 항목 {50000}원 = 과세 + 비과세</div>
        <a-form-item label="감면입력" label-align="right" class="salary-item">
          <div class="sal-item">
            <text-number-box width="200px"></text-number-box>
            <p>원</p>
          </div>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <div class="header-text-2">공제 항목 ${50000}원</div>
        <a-form-item label="급여항목" label-align="right" class="salary-item">
          <div class="sal-item">
            <text-number-box width="200px"></text-number-box>
            <p>원</p>
          </div>
        </a-form-item>
      </a-col>
    </a-row>
  </div>

</template>
<script lang="ts">
import { defineComponent, ref, computed, reactive } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import {
  radioCheckPersenPension,
  radioCheckReductioRate,
  radioCheckReductionInput,
  IncomeTaxAppRate,
  initFormStateTab2
} from "../../utils/index";
import dayjs from 'dayjs';

export default defineComponent({
  components: {
  },
  props: {
    employeeId: {
      type: String,
      default: 0
    },
    modalStatus: Boolean,
  },
  setup(props, { emit }) {
    const rangeDate = ref([dayjs().subtract(1, 'year'), dayjs()]);
    const formStateTab2 = reactive<any>({
      ...initFormStateTab2,
      reductionItems: {
        reductionStartDate: dayjs().format("YYYY-MM-DD"),
        reductionFinishDate: dayjs().format("YYYY-MM-DD")
      }
    });
    return {
      formStateTab2,
      rangeDate,
      radioCheckPersenPension,
      radioCheckReductioRate,
      radioCheckReductionInput,
      IncomeTaxAppRate
    };
  },
});
</script>
<style lang="scss" scoped >
#tab2-pa120 {
  ::v-deep .ant-form-item-label>label {
    width: 130px;
    padding-left: 10px;
  }

  .input-text {
    display: flex;
    align-items: center;

    span {
      margin-left: 10px;
    }
  }

  .header-text-1 {
    background-color: #558ED5;
    padding: 5px;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .header-text-2 {
    background-color: #C6D9F1;
    padding: 5px;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .header-text-3 {
    background-color: #558ED5;
    padding: 5px;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;

    span {
      display: flex;
      align-items: center;
      font-size: 13px;
      color: white;
      float: right;

      p {
        margin: 5px 0px 3px 10px;
      }
    }
  }

  .ins-dedu {
    display: flex;

    .check-box-tab1 {
      margin-left: 35px;
    }
  }

  .durunuri-insurance {
    ::v-deep .ant-form-item-label>label {
      width: 200px;
      padding-left: 10px;
    }

    .switch-insurance {
      margin-left: 72px;
      width: 100px;
    }
  }

  .empl-ins {
    margin-bottom: 2px;

    span {
      display: flex;
      align-items: center;

      p {
        font-size: 11px;
        margin-left: 5px;
        margin-bottom: 0px;
      }
    }
  }

  .pension {
    ::v-deep .dx-radiobutton {
      margin: 0px 0px 0px 76px;
    }
  }

  .income-tax-app-rate {
    ::v-deep .dx-radiobutton {
      margin: 0px 0px 0px 50px;
    }
  }

  .salary-item {
    .sal-item {
      display: flex;
      align-items: center;

      p {
        margin: 0px;
      }
    }

    ::v-deep .ant-form-item-label>label {
      width: 100px;
      padding-left: 10px;
    }
  }

  .summary {
    font-weight: bold;

    .text1 {
      margin-left: 50px;
    }

    .text2 {
      margin-left: 50px;
    }

    .text5 {
      span {
        display: flex;

        p {
          margin-left: 10px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
