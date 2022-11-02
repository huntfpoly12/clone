<template>
    <div id="components-modal-demo-position">
        <a-modal :visible="modalStatus" :mask-closable="false" title="서비스관리 " centered okText="저장하고 나가기"
            cancelText="그냥 나가기" @cancel="setModalVisible()" width="1200px">
            <template #footer>
                <a-button @click="setModalVisible">그냥 나가기</a-button>
                <a-button key="submit" type="primary" :loading="loading || loadingUpdate"
                    @click="updateServiceContract">
                    저장하고 나가기</a-button>
            </template>
            <a-spin tip="Loading..." :spinning="loading || loadingUpdate">
                <a-collapse v-model:activeKey="activeKey" accordion>
                    <a-collapse-panel key="1" header="이용서비스" class="-scrollpopup">
                        <a-form :label-col="labelCol" style="height: 500px;overflow-y: scroll;">
                            <div>
                                <a-row>
                                    <a-col :span="10">
                                        <a-form-item label="총이용료" style="font-weight: bold">
                                            <p class="input-disble">
                                                {{ $filters.formatCurrency(totalPrice) }}
                                            </p>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="8"></a-col>
                                    <a-col :span="10">
                                        <a-form-item label="회계서비스 이용료" style="padding-left: 50px">
                                            <p class="input-disble">
                                                {{ $filters.formatCurrency(totalPriceAccountingService) }}
                                            </p>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="14"></a-col>
                                    <a-col :span="10">
                                        <a-form-item label="원천서비스 이용료" style="padding-left: 50px">
                                            <p class="input-disble">
                                                {{ $filters.formatCurrency(totalWithholdingService) }}
                                            </p>
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="14"></a-col>
                                </a-row>
                                <hr />
                                <a-row>
                                    <a-col :span="12">
                                        <a-form-item label="회계서비스" style="font-weight: bold">
                                            <a-checkbox v-model:checked="formState.usedAccountingCount">회계서비스 신청
                                            </a-checkbox>
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <div>
                                    <div>
                                        <a-card title="⁙ 운영사업" :bordered="false" style="width: 100%"
                                            :headStyle="{ padding: '5px', color: 'red' }" bodyStyle="padding: 0px 0px">
                                        </a-card>
                                    </div>
                                    <DxDataGrid id="grid-container" :show-borders="true"
                                        :data-source="formState.accountingfacilityBusinesses"
                                        key-expr="facilityBusinessId" :allow-column-reordering="true"
                                        :allow-column-resizing="true" :column-auto-width="true">
                                        <DxEditing :allow-updating="true" :allow-adding="true" :allow-deleting="true"
                                            mode="cell" />
                                        <DxSelection mode="single" />
                                        <DxPaging :enabled="false" />
                                        <DxColumn data-field="No" :allow-editing="false" caption="#"
                                            cell-template="indexCell" />
                                        <template #indexCell="{ data }">
                                            <div>{{ data.rowIndex }}</div>
                                        </template>
                                        <DxColumn data-field="name" caption="사업명 (중복불가)" />
                                        <DxColumn data-field="facilityBizType" caption="사업분류" />
                                        <DxColumn data-field="startYearMonth" caption="서비스시작년월" data-type="date"
                                            :format="'yyyy-MM-dd'" />
                                        <DxColumn data-field="capacity" caption="정원수 (명)" />
                                        <DxToolbar>
                                            <DxItem name="addRowButton" />
                                        </DxToolbar>
                                        <DxMasterDetail :enabled="true" template="detailTemplate" />
                                        <template #detailTemplate="{ data }">
                                            <a-row :gutter="24">
                                                <a-col :span="10">
                                                    <a-form-item label="회계서비스 이용료:" style=" font-weight: bold">
                                                        <p class="input-disble" :id="'price-' + data.data.name">
                                                            {{
                                                                    $filters.formatCurrency(getTotalAmount(data))
                                                            }}
                                                        </p>
                                                    </a-form-item>

                                                    <div class="custom-money">
                                                        <DxCheckBox :value="true" text="기본이용료" class="custom-checkbox"
                                                            :disabled="true" />
                                                        <DxNumberBox :format="'#,###'" :min="0" :value="data.data.price"
                                                            @keyDown="changeValueInput($event.component, 0, data.data)" />
                                                    </div>

                                                    <!-- ---------------------OPTION---------------- -->
                                                    <div class="custom-money">
                                                        <DxCheckBox :value="checkOption(data.data.options, 1)"
                                                            text="입력대행" class="custom-checkbox"
                                                            @value-changed="changeChecked($event.value, 1, data.data)" />
                                                        <DxNumberBox :format="'#,###'" :min="0"
                                                            :value="getPriceOption(data.data.options, 1)"
                                                            :disabled="disableInput(data.data.options, 1)"
                                                            @keyDown="changeValueInput($event.component, 1, data.data)" />
                                                    </div>

                                                    <div class="custom-money">
                                                        <DxCheckBox :value="checkOption(data.data.options, 2)"
                                                            text="계좌통합" class="custom-checkbox"
                                                            @value-changed="changeChecked($event.value, 2, data.data)" />
                                                        <DxNumberBox :format="'#,###'" :min="0"
                                                            :value="getPriceOption(data.data.options, 2)"
                                                            :disabled="disableInput(data.data.options, 2)"
                                                            @keyDown="changeValueInput($event.component, 2, data.data)" />
                                                    </div>

                                                    <div class="custom-money">
                                                        <DxCheckBox :value="checkOption(data.data.options, 3)"
                                                            text="W4C" class="custom-checkbox"
                                                            @value-changed="changeChecked($event.value, 3, data.data)" />
                                                        <DxNumberBox :min="0" :format="'#,###'"
                                                            :value="getPriceOption(data.data.options, 3)"
                                                            :disabled="disableInput(data.data.options, 3)"
                                                            @keyDown="changeValueInput($event.component, 3, data.data)" />
                                                    </div>
                                                    <!-- ---------------------/OPTION---------------- -->

                                                </a-col>
                                                <a-col :span="14">

                                                    <div class="custom-money" style="padding-left: 0px">
                                                        <div style="width: auto;padding-right: 10px;">장기요양기관등록번호 :</div>
                                                        <DxNumberBox :format="'#,###'" :min="0" />
                                                    </div>

                                                    <div style="display: flex">
                                                        <div>
                                                            <imgUpload :title="titleModal"
                                                                @update-img="getImgUrl($event, data)" :customrow="1" />
                                                        </div>
                                                        <a-col>
                                                            <div v-if="imageValue" class="img-preview">
                                                                <a-image :src="imageValue" style="height: 100px;" />
                                                            </div>
                                                            <div v-else class="img-preview">
                                                                <img src="../../../../../assets/images/imgdefault.jpg"
                                                                    style="height: 200px;" />
                                                            </div>
                                                            <div v-if="fileName">
                                                                <span>{{ fileName }}</span>
                                                                <delete-outlined @click="removeImg"
                                                                    style="color: red; cursor: pointer" />
                                                            </div>
                                                        </a-col>
                                                    </div>
                                                </a-col>
                                            </a-row>
                                        </template>
                                    </DxDataGrid>
                                </div>

                                <hr />
                                <a-row>
                                    <a-col>
                                        <a-form-item label="원천서비스" style="font-weight: bold">
                                            <a-checkbox v-model:checked="formState.usedWithholding">원천서비스</a-checkbox>
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <div>
                                    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
                                        <a-form-item label="서비스 시작년월" style="width: 300px">
                                            <CustomDatepicker :valueDate="formState.withholdingStartYearMonth"
                                                date-format="MM/DD/YYYY" />
                                        </a-form-item>
                                        <a-form-item label="직 원 수 ">
                                            <a-input-number type="number" min="0"
                                                v-model:value="formState.withholdingCapacity" style="width: 150px" />
                                        </a-form-item>
                                        <a-form-item label="원천서비스 이용료:" style="font-weight: bold; width: 565px">
                                            <p class="input-disble">
                                                {{ $filters.formatCurrency(totalWithholdingService) }}
                                            </p>
                                        </a-form-item>
                                    </a-form>
                                </div>
                                <a-row>
                                    <a-col span="4"></a-col>
                                </a-row>
                                <a-row>
                                    <a-coll :span="10"></a-coll>
                                    <a-col :span="14">
                                        <div style="display: flex; padding-left: 120px">
                                            <a-checkbox v-model:checked="formState.checkBoxBasicFee"
                                                @change="handleInputTexService()" style="width: 180px">기본이용료
                                            </a-checkbox>
                                            <DxNumberBox v-model="formState.usedServiceInfoWithholdingPrice"
                                                :format="'#,##0'" :disabled="formState.disableNumber5" />
                                        </div>
                                    </a-col>
                                    <a-coll :span="8"></a-coll>
                                    <a-col :span="14">
                                        <div
                                            style="display: flex; padding-left: 120px; margin-top: 5px; margin-bottom: 10px;">
                                            <a-checkbox v-model:checked="formState.checkBoxMajorInsurance"
                                                @change="handleInputTexService()" style="width: 180px">4대보험</a-checkbox>
                                            <DxNumberBox v-model="formState.fourMajorInsurance" :format="'#,##0'"
                                                :disabled="formState.disableNumber6" />
                                        </div>
                                    </a-col>
                                </a-row>
                            </div>
                        </a-form>

                    </a-collapse-panel>
                    <a-collapse-panel key="2" header="담당매니저/ 영업자">
                        <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
                            <a-form-item label="담당매니저">
                                <div style="width: 200px">
                                    <ListManagerDropdown v-model:selected="formState.manageUserId" />
                                </div>
                            </a-form-item>
                            <a-form-item label="영업자">
                                <div style="width: 200px">
                                    <ListSalesDropdown v-model:selected="formState.compactSalesRepresentativeId" />
                                </div>
                            </a-form-item>
                        </a-form>
                    </a-collapse-panel>
                    <a-collapse-panel key="3" header="메모"
                        :extra="formStateMomes.length > 0 ? formStateMomes.length : ''"
                        :style="{ position: 'relative' }">
                        <a-table bordered="false" :data-source="formStateMomes" :pagination="false">
                            <template #bodyCell="{ text, index }">
                                <div>
                                    <div class="title-note">
                                        <div>
                                            {{ text.ownerName }} 수정
                                            {{ formarDate(text.updatedAt) }} 게시
                                            {{ formarDate(text.createdAt) }}
                                        </div>
                                        <div v-if="index == 0">
                                            <PlusSquareOutlined :style="{ fontSize: '25px' }" @click="handleAdd" />
                                        </div>
                                    </div>
                                    <div>
                                        <a-textarea placeholder="전달사항입력" allow-clear v-model:value="text.memo" />
                                    </div>
                                    <a-space :size="8" style="margin-top: 7px">
                                        <save-outlined :style="{ fontSize: '20px' }"
                                            @click="handleAddMemo(text.memo, text.memoId)" />
                                        <DeleteOutlined :style="{ fontSize: '20px' }"
                                            @click="handleDeleteMemo(text.memoId)" />
                                    </a-space>
                                </div>
                            </template>
                        </a-table>
                    </a-collapse-panel>
                </a-collapse>
            </a-spin>
        </a-modal>
    </div>
</template>
  
<script lang="ts" src="../main/popup.ts">
</script>
<style src="../style/stylePopup.scss" scoped >

</style>