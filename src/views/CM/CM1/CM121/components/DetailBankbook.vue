<template>
  <div>
    <p class="cm-121_detail-infomation">통장정보</p>
    <a-row class="cm-121_detail-infomation-top">
      <a-col span="12">
        <a-form-item label="사업구분" class="form-item-top">
          <default-text-box :required="true" :width="150" :disabled="true"/>
        </a-form-item>
        <a-form-item label="금융기관" class="form-item-top">
          <default-text-box :required="true" :width="150" :disabled="true"/>
        </a-form-item>
        <a-form-item label="통장번호" class="form-item-top red">
          <div class="custom-note d-flex-center">
            <number-box :required="true" :width="150" />
            <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
            <span class="style-note">최초 저장된 이후 수정 불가</span>
          </div>
        </a-form-item>
        <a-form-item label="통장별명" class="form-item-top red">
          <div class="custom-note d-flex-center">
            <default-text-box :required="true" :width="150" />
            <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
            <span class="style-note">중복 등록 불가</span>
          </div>
        </a-form-item>
      </a-col>
      <a-col span="12">
        <a-form-item label="통장구분" class="form-item-top">
          <div class="custom-note d-flex-center">
            <switch-basic :textCheck="'포함'" :textUnCheck="'제외'" />
            <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
            <span class="style-note">최초 저장된 이후 수정 불가</span>
          </div>
        </a-form-item>
        <a-form-item label="통장용도" class="form-item-top">
          <div class="custom-note d-flex-center">
            <select-box-common :required="true" :width="150" />
            <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
            <span class="style-note">관련 계정과목 적용 또는 <br />관련 서식에 기재됩니다.</span>
          </div>
        </a-form-item>
        <a-form-item label="예금주" class="form-item-top red">
          <default-text-box :required="true" :width="150" />
        </a-form-item>
        <a-form-item label="계정과목" class="form-item-top">
          <default-text-box :required="true" :width="150" />
        </a-form-item>
      </a-col>
    </a-row>
  </div>
  <div>
    <div class="cm-121_detail-infomation cm-121_detail-infomation-bottom custom-note d-flex-center">
      <span>스크래핑 (통장내역 자동 조회) 정보</span>
      <div class="pl-5">
        <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
        <span class="style-note">(주의) 아래 데이터는 암호화되어 조회가 불가능합니다. 단, 업데이트는 가능합니다</span>
      </div>
    </div>
    <a-row class="cm-121_detail-infomation-bottom">
      <a-col span="12">
        <a-form-item label="스크래핑 이용 여부" class="form-item-bottom">
          <div class="custom-note d-flex-center">
            <switch-basic :textCheck="'포함'" :textUnCheck="'제외'" />
            <img src="@/assets/images/iconInfo.png" style="width: 14px; margin-left: 5px;" />
            <span class="style-note">이용하지 않는 경우 스크래<br />핑 중지가 되어 통장 불러<br />오기를 할 수 없습니다.</span>
          </div>
        </a-form-item>
        <a-form-item label="사업자등록번호 (법인통장)" class="form-item-bottom red">
          <number-box :required="true" :width="150" />
        </a-form-item>
        <a-form-item label="간편조회 ID" class="form-item-bottom red">
          <default-text-box :required="true" :width="150" />
        </a-form-item>
      </a-col>
      <a-col span="12">
        <a-form-item label="통장 비밀번호 (숫자 4자리)" class="form-item-bottom red">
          <number-box :required="true" :width="150" />
        </a-form-item>
        <a-form-item label="생년월일 (개인통장)" class="form-item-bottom red">
          <number-box :required="true" :width="150" />
        </a-form-item>
        <a-form-item label="간편조회 PW" class="form-item-bottom red">
          <default-text-box :required="true" :width="150" />
        </a-form-item>
      </a-col>
    </a-row>
  </div>
  <div class="cm-121_detail-btn">
    <button-basic text="저장xxxxxxxxx" type="default" mode="contained" @onClick="sunmit"/>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
export default defineComponent({
  props: {
    dataDetailBankbook: {
      type: Object,
      default: {},
    },
  },
  components: {
  },
  setup(props, { emit }) {
    // const dataDetailBankbook = ref(props.dataDetailBankbook)

    const dataDetail = computed(() => props.dataDetailBankbook)
    // watch(dataDetail.value, (value) => {
    //   console.log('valuevaluevaluevalue prop');
    // },{
    //   deep: true,
    //   immediate: true,
    // })
    const sunmit = () => {
      console.log('213123123123', dataDetail);
    }
    return {
      sunmit
    }
  }
});
</script>
