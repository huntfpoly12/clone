<template>
  <a-modal class="form-modal" width="50%" v-model:visible="visible" title="취득신고등록" centered @cancel="$emit('closeModal')" :footer="null">
    <standard-form>
      <div class="form">
        <a-row>
          <a-col></a-col>
          <a-col></a-col>
        </a-row>
        <a-row :gutter="[0, 10]" class="item-group">
          <a-col span="12">
            <a-form-item label="업체명" label-align="right">
              <default-text-box width="200px" v-model:valueInput="formData.name" :required="true" placeholder="한글,영문(대문자) 입력 가능" />
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="대표자명" label-align="right">
              <default-text-box width="200px" v-model:valueInput="formData.presidentName" :required="true" placeholder="한글,영문(대문자) 입력 가능" />
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="사업자등록번호" class="clr" label-align="left">
              <!-- :disabled="!canChangeableBizNumber" -->
              <biz-number-text-box
                v-model:valueInput="formData.bizNumber"
                width="220"
                :required="true"
                messRequired="이항목은 필수 입력사항입니다!"
                nameInput="companyBizNumber"
              />
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="사업장관리번호" label-align="right">
              <default-text-box width="200px" v-model:valueInput="formData.adding" :required="true" placeholder="한글,영문(대문자) 입력 가능" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="[0, 10]" class="item-group">
          <a-col span="12">
            <a-form-item label="성명" label-align="right">
              <default-text-box width="200px" v-model:valueInput="formData.name" :required="true" placeholder="한글,영문(대문자) 입력 가능" />
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="주민등록증" label-align="right">
              <id-number-text-box :required="true" v-model:valueInput="formData.residentId" width="150px"></id-number-text-box>
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="주민등록증" label-align="right">
              <date-time-box width="150px" v-model:valueDate="formData.joinedAt"> </date-time-box>
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="월급여" label-align="right">
              <default-text-box width="200px" v-model:valueInput="formData.totalPay" :required="true" placeholder="한글,영문(대문자) 입력 가능" />
            </a-form-item>
          </a-col>
          <a-col span="24">
            <a-form-item label="대표자여부" label-align="right">
              <switch-basic v-model:valueSwitch="formData.president" textCheck="O" textUnCheck="X" style="width: 80px"></switch-basic>
            </a-form-item>
          </a-col>
          <a-col span="24">
            <div class="item-wrap">
              <span class="item-wrap-title">외국인</span>
              <a-row gutter="7">
                <a-col span="12">
                  <a-form-item label="국적코드" label-align="right">
                    <!-- @textCountry="changeTextCountry"
                    v-if="formData.nationalityNumber"
                    :required="formData.nationalityNumber"
                    :disabled="!formData.nationalityNumber" -->
                    <country-code-select-box style="width: 200px" v-model:valueCountry="formData.nationalityNumber" :hiddenOptionKR="true" />
                    <!-- <country-code-select-box
                      v-else
                      style="width: 200px"
                      v-model:valueCountry="formData.nationalityCode"
                      @textCountry="changeTextCountry"
                      :required="formData.foreigner"
                      :disabled="!formData.foreigner"
                    /> -->
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item label="국적코드" label-align="right">
                    <default-text-box width="200px" v-model:valueInput="formData.totalPay" :required="true" placeholder="한글,영문(대문자) 입력 가능" />
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="[0, 10]" class="item-group">
          <a-col span="24">
            <a-form-item label="4대보험 공제 여부" label-align="right" class="d-flex">
              <span class="check-box-tab1">
                <checkbox-basic label="국민연금" v-model:valueCheckbox="formData.nationalPensionReport"></checkbox-basic>
              </span>
              <span class="check-box-tab1">
                <checkbox-basic label="건강보험" v-model:valueCheckbox="formData.healthInsuranceReport"></checkbox-basic>
              </span>
              <span class="check-box-tab1 mb-4 ml-15">
                <checkbox-basic label="고용보험" v-model:valueCheckbox="formData.employeementInsuranceReport"></checkbox-basic>
              </span>
              <span class="check-box-tab1 mb-4 ml-15">
                <checkbox-basic label="산재보험" v-model:valueCheckbox="formData.employeementInsuranceReport"></checkbox-basic>
              </span>
            </a-form-item>
          </a-col>
          <a-col span="24">
            <div class="item-wrap">
              <span class="item-wrap-title">국민연금</span>
              <a-row gutter="7">
                <a-col span="12">
                  <a-form-item label="취득부호" label-align="right">
                    <checkbox-basic label="산재보험" v-model:valueCheckbox="formData.employeementInsuranceReport"></checkbox-basic>
                    <!-- <div class="zip-code">
                      <default-text-box
                        v-model:valueInput="formData.roadAddress"
                        width="300px"
                        :disabled="true"
                        class="roadAddress"
                        placeholder="도로명주소"
                      />
                      <div style="margin-left: 5px">
                        <post-code-button @dataAddress="funcAddress" text="주소검색" />
                      </div>
                    </div>

                    <default-text-box v-model:valueInput="formData.addressExtend" width="300px" placeholder="상세 주소 입력" /> -->
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item label="" label-align="right">
                    <span class="check-box-tab1 mb-4 ml-15">
                      <checkbox-basic label="취득월 납부 희망여부" v-model:valueCheckbox="formData.acquisitionMonthPayment"></checkbox-basic>
                    </span>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </a-col>
          <a-col span="24">
            <div class="item-wrap">
              <span class="item-wrap-title">국민연금</span>
              <a-row gutter="7">
                <a-col span="12">
                  <a-form-item label="취득부호" label-align="right">
                    <checkbox-basic label="산재보험" v-model:valueCheckbox="formData.employeementInsuranceReport"></checkbox-basic>
                    <!-- <div class="zip-code">
                      <default-text-box
                        v-model:valueInput="formData.roadAddress"
                        width="300px"
                        :disabled="true"
                        class="roadAddress"
                        placeholder="도로명주소"
                      />
                      <div style="margin-left: 5px">
                        <post-code-button @dataAddress="funcAddress" text="주소검색" />
                      </div>
                    </div>

                    <default-text-box v-model:valueInput="formData.addressExtend" width="300px" placeholder="상세 주소 입력" /> -->
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item label="" label-align="right">
                    <span class="check-box-tab1 mb-4 ml-15">
                      <checkbox-basic label="취득월 납부 희망여부" v-model:valueCheckbox="formData.employeementInsuranceReport"></checkbox-basic>
                    </span>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </a-col>
          <a-col span="24">
            <div class="item-wrap">
              <span class="item-wrap-title">국민연금</span>
              <a-row gutter="7">
                <a-col span="12">
                  <a-form-item label="취득부호" label-align="right">
                    <checkbox-basic label="산재보험" v-model:valueCheckbox="formData.employeementInsuranceReport"></checkbox-basic>
                    <!-- <div class="zip-code">
                      <default-text-box
                        v-model:valueInput="formData.roadAddress"
                        width="300px"
                        :disabled="true"
                        class="roadAddress"
                        placeholder="도로명주소"
                      />
                      <div style="margin-left: 5px">
                        <post-code-button @dataAddress="funcAddress" text="주소검색" />
                      </div>
                    </div>

                    <default-text-box v-model:valueInput="formData.addressExtend" width="300px" placeholder="상세 주소 입력" /> -->
                  </a-form-item>
                </a-col>
                <a-col span="6">
                  <a-form-item label="" label-align="right">
                    <span class="check-box-tab1 mb-4 ml-15">
                      <checkbox-basic label="취득월 납부 희망여부" v-model:valueCheckbox="formData.employeementInsuranceReport"></checkbox-basic>
                    </span>
                  </a-form-item>
                </a-col>
                <a-col span="6">
                  <a-form-item label="" label-align="right">
                    <span class="check-box-tab1 mb-4 ml-15">
                      <checkbox-basic label="취득월 납부 희망여부" v-model:valueCheckbox="formData.includeDependents"></checkbox-basic>
                    </span>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
      </div>
      <div>
        <DxDataGrid
          :show-row-lines="true"
          :hoverStateEnabled="true"
          :data-source="dataSource"
          :show-borders="true"
          :allow-column-reordering="move_column"
          key-expr="globalYear"
          :key="globalYear"
          :allow-column-resizing="colomn_resize"
          :column-auto-width="true"
          :focused-row-enabled="true"
        >
          <DxScrolling mode="standard" show-scrollbar="always" />
          <DxColumn caption="일련번호" data-field="workId" width="100" />
        </DxDataGrid>
      </div>
      <button-basic :width="90" id="btn-save" @onClick="onSubmit($event)" style="margin: auto" mode="contained" type="default" text="저장" />
    </standard-form>
  </a-modal>
</template>

<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import queries from '@/graphql/queries/PA/PA8/PA810/index';
import mutations from '@/graphql/mutations/PA/PA8/PA810/index';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { companyId, openTab } from '@/helpers/commonFunction';
import { DeleteOutlined, HistoryOutlined } from '@ant-design/icons-vue';
import { DxDataGrid, DxColumn, DxScrolling, DxMasterDetail } from 'devextreme-vue/data-grid';
import DxButton from 'devextreme-vue/button';
import notification from '@/utils/notification';

export default defineComponent({
  components: {
    DxDataGrid,
    DxColumn,
    DxButton,
    DxScrolling,
    HistoryOutlined,
    DeleteOutlined,
  },
  setup() {
    const store = useStore();
    const globalYear = computed(() => store.state.settings.globalYear);
    const { per_page, move_column, colomn_resize } = store.state.settings;
    const visible = ref(true);
    const formData = reactive({
      name: '',
      bizNumber: '',
      presidentName: '',
      adding: '',
      joinedAt: '',
      residentId: '',
      totalPay: '',
      president: '',
      nationalityNumber: '',
      nationalPensionReport: '',
      healthInsuranceReport: '',
      employeementInsuranceReport: '',
      industrialAccidentInsuranceReport: '',
      acquisitionMonthPayment: '',
      includeDependents: '',
    });
    const actionParam = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
      workId: null,
    });

    // Get DataSource getMajorInsuranceCompanyEmployeeAcquisitions

    const dataSource = ref([]);
    const employeeAcquisitionsParam = reactive({
      companyId: companyId,
      imputedYear: globalYear.value,
    });
    const {} = useQuery(queries.getMajorInsuranceCompanyEmployeeAcquisitions, employeeAcquisitionsParam, () => ({
      fetchPolicy: 'no-cache',
    }));

    /// onSubmit

    const onSubmit = (e: any) => {};
    return {
      globalYear,
      per_page,
      move_column,
      colomn_resize,
      dataSource,
      visible,
      onSubmit,
      formData,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '../styles/index.scss';
</style>