<template>
    <a-modal :mask-closable="false" :visible="statusPupopInfo" title="" centered @cancel="setModalVisible()"
        width="1200px" footer="" :bodyStyle="{ height: '800px' }">
        <div style="overflow: scroll;height: 770px;">
          <Policy1 v-if="contentText == 1"/>
          <Policy2 v-if="contentText == 2"/>
          <Policy3 v-if="contentText == 3"/>
          <Policy4 v-if="contentText == 4"/>
        </div>
    </a-modal>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, watch, computed, defineAsyncComponent } from "vue";
const Policy1 = defineAsyncComponent(() =>
  import("@/components/common/Policy1.vue")
);
const Policy2 = defineAsyncComponent(() =>
  import("@/components/common/Policy2.vue")
);
const Policy3 = defineAsyncComponent(() =>
  import("@/components/common/Policy3.vue")
);
const Policy4 = defineAsyncComponent(() =>
  import("@/components/common/Policy4.vue")
);
export default defineComponent({
    props: {
        statusPupopInfo: {
            default: false,
            type: Boolean,
        },
        keyText: {
            type: Number,
            required: true
        },
    },
    setup(props, { emit }) {
        const contentText = ref<any>()
        watch(() => props.statusPupopInfo, (newValue) => {
            if (newValue && props.keyText) {
                switch (props.keyText) {
                    case 1:
                        contentText.value = '1'
                        break;
                    case 2:
                        contentText.value = '2'
                        break;
                    case 3:
                        contentText.value = '3'
                        break;
                    case 4:
                        contentText.value = '4'
                        break;
                }
            }
        });
        const setModalVisible = () => {
            emit("closePopup", false)
        };
        return {
            setModalVisible, contentText,
            
        }
    }
})
</script>

<style lang="scss">

</style>
