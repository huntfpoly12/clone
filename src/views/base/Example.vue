<template>
  <div style="padding: 10px">
    <DxSortable
      filter=".dx-tab"
      v-model:data="allTab"
      item-orientation="horizontal"
      drag-direction="horizontal"
    >
      <div>

        <DxTabPanel
          v-model:data-source="allTab"
          :defer-rendering="false"
          :show-nav-buttons="true"
          :repaint-changes-only="true"
          v-model:selected-index="selectedIndex"
          item-title-template="title"
          item-template="itemTemplate"
        >
          <template #title="{ data: employee }">
            <div>
              <span>{{ employee.TabName }}</span>
            </div>
          </template>
          <template #itemTemplate="{ data: employee }"> 
            <component v-bind:is="employee.layoutName" />
          </template>
        </DxTabPanel>
      </div>
    </DxSortable>
  </div>
</template>

<script>
import DxSortable from "devextreme-vue/sortable";
import DxTabPanel from "devextreme-vue/tab-panel";
import DxValidationSummary from "devextreme-vue/validation-summary";
import DxButton from "devextreme-vue/button";
import { defineComponent, ref, defineAsyncComponent } from "vue";
import service from "./listTab.ts";
import CountryCodeSelectBox from "../../components/CountryCodeSelectBox.vue";
const JWTInfor = defineAsyncComponent(() =>
  import("../base/JWTInfor.vue")
);
const TextBoxFrom = defineAsyncComponent(() =>
  import("../base/TextBoxFrom.vue")
);
const NumberBoxForm = defineAsyncComponent(() =>
  import("../base/NumberBoxForm.vue")
);
const DateTimeBoxForm = defineAsyncComponent(() =>
  import("../base/DateTimeBoxForm.vue")
);

const ModalMessage = defineAsyncComponent(() =>
  import("../base/PopupMessageMain.vue")
);
const PreviewImage = defineAsyncComponent(() =>
  import("../base/PreviewImage.vue")
);

const ButtonBasic = defineAsyncComponent(() =>
  import("../base/ButtonBasic.vue")
);

const CheckBoxFrom = defineAsyncComponent(() =>
  import("../base/CheckBoxFrom.vue")
);

const SelectBox = defineAsyncComponent(() =>
  import("../base/SelectBox.vue")
);

const TagBox = defineAsyncComponent(() =>
  import("../base/TagBox.vue")
);
const ActionHeader = defineAsyncComponent(() =>
  import("../base/ActionHeader.vue")
);
const GridPrototype = defineAsyncComponent(() =>
  import("../base/GridPrototype.vue")
);
const GridPrototype2 = defineAsyncComponent(() =>
  import("./GridPrototype2.vue")
);
const allListTab = service.getListTab();
export default defineComponent({
  components: {
    TextBoxFrom,
    NumberBoxForm,
    DateTimeBoxForm,
    DxTabPanel,
    DxSortable,
    DxButton,
    DxValidationSummary,
    ModalMessage,
    PreviewImage,
    ButtonBasic,
    SelectBox,
    CheckBoxFrom,
    TagBox,
    ActionHeader,
    GridPrototype,
    GridPrototype2,
    JWTInfor
  },
  setup() {
    const allTab = ref(allListTab);
    const selectedIndex = ref(0);
    const bday = ref("");
    const text1 = ref("text example.....");
    function onFormSubmit(e) {
      e.preventDefault();
    }

    return {
      text1,
      allTab,
      bday,
      selectedIndex,
      onFormSubmit,
    };
  },
});
</script>
