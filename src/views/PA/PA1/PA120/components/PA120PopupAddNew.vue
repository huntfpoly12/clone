<template>
    <div ref="root">
        <a-modal :visible="modalStatus" title="사원등록" centered @cancel="setModalVisible()"
            :mask-closable="false" :width="1028" :footer="null">
                <a-spin :spinning="false" size="large">
                    <div id="cm-110" class="page-content">
                        <a-tabs v-model:activeKey="activeKey" type="card">
                            <a-tab-pane key="1" tab="기본">
                                <div>
                                    <a-form-item label="영업자코드" label-align="right">
                                        <div class="custom-note">
                                            <text-number-box width="200px" :required="true" placeholder="숫자만 입력 가능"/>
                                        </div>
                                    </a-form-item>
                                    <a-form-item label="성명" label-align="right">
                                            <text-number-box width="200px" :required="true" placeholder="한글,영문(대문자) 입력 가능"/>
                                    </a-form-item>
                                    <a-form-item label="내/외국인" label-align="right">
                                    
                                    </a-form-item>
                                    <a-form-item label="외국인 국적" label-align="right">
                                    
                                    </a-form-item>
                                
                                </div>
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="급여">
                            </a-tab-pane>
                            <a-tab-pane key="3" tab="부양가족">
                            </a-tab-pane>
                        </a-tabs>
                
                    </div>
                </a-spin>
        </a-modal>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import comfirmClosePopup from '../../../../../utils/comfirmClosePopup';
export default defineComponent({
    components: {

    },
    props: {
        modalStatus: Boolean,
    },
    setup(props,{emit}) {
        const setModalVisible = () => {
            comfirmClosePopup(() => emit('closePopup', false))
        }
        return {
            setModalVisible,
            activeKey: ref("1"),
        };
    },
});
</script>

