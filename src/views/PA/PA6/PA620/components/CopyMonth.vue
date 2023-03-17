<template>
    <a-modal :visible="modalStatus" @cancel="setModalVisible" :mask-closable="false" class="confirm-md" footer=""
        :width="500">
          <a-form-item label="귀속/지급연월" label-align="right" class="mt-40">
            <div class="d-flex-center">
              <DxButton :text="'귀 ' + processKeyPA620.imputedYear + '-' + $filters.formatMonth(month1)"
              :style="{cursor: 'context-menu',color: 'white', backgroundColor: 'gray' , height: $config_styles.HeightInput}" class="btn-date mr-2"  />
                <div class="d-flex-center">
                <month-picker-box-custom text="지" v-model:valueDate="month2" bgColor="black"></month-picker-box-custom>
                </div>
            </div>
          </a-form-item>
          <a-form-item label="지급일" label-align="right">
              <number-box :max="31" :min="1" width="150px" class="mr-5" v-model:valueInput="paymentDayPA620" :isFormat="true"/>
            </a-form-item>
            
          <div class="text-align-center mt-30">
            <button-basic class="button-form-modal" text="새로 입력" :width="140" type="default" mode="contained"
                @onClick="onSubmit" />
            <button-basic class="button-form-modal" text="과거 내역 복사" :width="140" type="default" mode="contained"
                @onClick="openModalCopy" />
          </div>
    </a-modal>

    <a-modal :visible="modalCopy" @cancel="setModalVisibleCopy" :mask-closable="false" class="confirm-md" footer=""
        :width="600">
        <div class="mt-30 d-flex-center">
            <span>과거내역</span>
            <DxSelectBox :width="200" :data-source="arrDataPoint" placeholder="선택" item-template="item-data"
                field-template="field-data" @value-changed="updateValue" :disabled="false">
                <template #field-data="{ data }">
                    <span v-if="data" style="padding: 4px">
                        귀 {{ data.imputedYear }}-{{ $filters.formatMonth(data.imputedMonth) }}
                        지 {{ data.paymentYear }}-{{ $filters.formatMonth(data.paymentMonth) }}
                        <DxTextBox style="display: none;" />
                    </span>
                    <span v-else style="padding: 4px">
                        <span>선택</span>
                        <DxTextBox style="display: none;" />
                    </span>
                </template>
                <template #item-data="{ data }">
                    <span>
                        귀 {{ data.imputedYear }}-{{ $filters.formatMonth(data.imputedMonth) }}
                        지 {{ data.paymentYear }}-{{ $filters.formatMonth(data.paymentMonth) }}
                    </span>
                </template>
            </DxSelectBox>
            <span>로 부터 복사하여 새로 입력합니다.</span>
        </div>

        <div class="text-align-center mt-30">
            <button-basic class="button-form-modal" text="아니요" :width="140" type="default" mode="outlined"
                @onClick="setModalVisibleCopy" />
            <button-basic class="button-form-modal" text="네" :width="140" type="default" mode="contained"
                @onClick="actionCopy" />
        </div>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, computed } from 'vue'
import { companyId } from "@/helpers/commonFunction"
import notification from "@/utils/notification";
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";
import { useMutation, useQuery } from "@vue/apollo-composable";
import mutations from "@/graphql/mutations/PA/PA6/PA620/index"
import queries from "@/graphql/queries/PA/PA6/PA620/index"
import { useStore } from 'vuex'
import dayjs from "dayjs";
import { Message } from '@/configs/enum';
import DxButton from "devextreme-vue/button";

export default defineComponent({
    props: {
        modalStatus: {
            type: Boolean,
        },
        monthVal: {
            type: Number,
        },
        dateType: {
            type: Number,
            default: 1,
        },
    },
    components: {
        DxSelectBox,
        DxTextBox,
        DxButton
    },
    setup(props, { emit }) {
        const store = useStore()
        const globalYear = computed(() => store.state.settings.globalYear)
        const month1: any = ref<number>()
        const processKeyPA620 = computed(() => store.state.common.processKeyPA620)
        const messageCopyDone= Message.getMessage('COMMON', '106').message;
        const modalCopy = ref(false)
        const paymentDayPA620 = computed({
          get() {
            return store.getters['common/paymentDayPA620'];
          },
          set(value) {
            store.commit('common/paymentDayPA620', value);
          },
        });
        // ----------set month source default because dependent on the set up before--------------
        let month2: any = ref();
        watch(() => [props.monthVal, processKeyPA620.value.paymentYear], ([val]) => {
            month1.value = val;
            let yearMonth = `${processKeyPA620.value.paymentYear}${processKeyPA620.value.imputedMonth }`;
            if(props.dateType == 2 && val) {
                yearMonth = val==12?`${globalYear.value+1}1`:`${globalYear.value}${val + 1}`;
            }
            if(props.dateType == 1) {
                yearMonth = `${globalYear.value}${val}`;
            }
            month2.value = yearMonth;
        });
        //-------------------------action copy data--------------------------------
        const {
            mutate,
            onError,
            onDone,
          } = useMutation(mutations.copyIncomeBusinesses);
        const openModalCopy = () => {
            modalCopy.value = true
          }
          // get date to copy
          const updateValue = (value: any) => {
            dataApiCopy.value = {
                imputedYear: value.value.imputedYear,
                imputedMonth: value.value.imputedMonth,
                paymentYear: value.value.paymentYear,
                paymentMonth: value.value.paymentMonth,
              }
            };
        const dataApiCopy: any = ref({}); // datasource to copy the data
        const actionCopy = async() => {
            if (dataApiCopy.value.imputedYear) {
                await commitDate();
                let param = {
                  companyId: companyId,
                  source: dataApiCopy.value,
                  target: processKeyPA620.value,
                }
                mutate(param)
              } else {
                notification('error', '날짜를 선택하세요.')
              }
            }
            onError(res => {
            notification('error', res.message)
        })
        onDone(() => {
          setModalVisible();
          setModalVisibleCopy();
          notification('success', messageCopyDone);
          emit('loadingTable')
        })
        //-------------------------get date source copy--------------------------------
        const arrDataPoint: any = ref({}) // arr date of date source
        const originData: any = ref({
          companyId: companyId,
          filter: {
              startImputedYearMonth: parseInt(`${globalYear.value}01`),
              finishImputedYearMonth: parseInt(`${globalYear.value}12`),
          }
        })
        const {
            onResult: onResult,
            refetch
        } = useQuery(queries.findIncomeProcessBusinessStatViews, originData, () => ({
            fetchPolicy: "no-cache",
        }));
        onResult((value: any) => {
          arrDataPoint.value = value.data.findIncomeProcessBusinessStatViews
        })
        watch(globalYear, (newVal, oldVal) => {
          originData.value.filter.startImputedYearMonth = parseInt(`${newVal}01`);
          originData.value.filter.finishImputedYearMonth = parseInt(`${newVal}12`);
          refetch()
        });
        // ---------------------fn modal --------------------
        const setModalVisible = () => {
            emit("closePopup", false)
        };
        const setModalVisibleCopy = () => {
            modalCopy.value = false
        };
        //----------------emit date and set to store------------------
        const commitDate = async() => {
            const dateCustom = {
                imputedYear: globalYear.value,
                imputedMonth: month1.value,
                paymentYear: parseInt(month2.value.toString().slice(0,4)),
                paymentMonth: parseInt(month2.value.toString().slice(4,6)),
            }
            store.commit('common/processKeyPA620', dateCustom);
            emit("dataAddIncomeProcess", dateCustom)
        }
        //------------------fn submit add new------------------------
        const onSubmit = () => {
            commitDate();
            emit("closePopup", false);
        };
        return {
            modalCopy,
            paymentDayPA620,
            month1, month2,
            openModalCopy,
            setModalVisible,
            setModalVisibleCopy,
            onSubmit,
            arrDataPoint,
            updateValue,
            actionCopy,
            processKeyPA620,
        }
    },
})
</script>

<style lang="scss" scoped>

.mt-30 {
    margin-top: 30px;
}

.text-align-center {
    text-align: center;
}

.button-form-modal {
    margin: 0px 5px;
}

:deep label {
    width: 100px;
}

:deep div.month-custom-1 {
    background-color: #A6A6A6;
    padding: 4px 10px;
    border-radius: 5px;
    margin-right: 10px;
    color: white;
    width: fit-content;
    .dp__input {
        color: white;
        padding: 0px;
        border: none;
        background-color: #A6A6A6;
    }
    .dp__icon {
        display: none;
    }
}

:deep .month-custom-2 {
    background-color: black;
    padding-left: 10px;
    border-radius: 5px;
    margin-right: 10px;
    color: white;

    .dp__input {
        color: white;
        padding: 0px;
        border: none;
        background-color: black;
        font-size: 14px;
    }

    .dp__icon {
        display: none;
    }
}
:deep .btn-date {
      div.dx-button-content {
        padding: 0px 10px 0px;
      }
    }
</style>
