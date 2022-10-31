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
import DevTextBoxVue from "../../components/DevTextBox.vue";
import { defineComponent, ref, defineAsyncComponent } from "vue";
import notify from "devextreme/ui/notify";
import service from "./listTab.ts";
const TextBoxFrom = defineAsyncComponent(() =>
  import("../base/TextBoxFrom.vue")
);
const allListTab = service.getListTab();
export default defineComponent({
  components: {
    TextBoxFrom,
    DevTextBoxVue,
    DxTabPanel,
    DxSortable,
    DxButton,
    DxValidationSummary,
  },
  setup() {
    const allTab = ref(allListTab);
    const selectedIndex = ref(0);
    const bday = ref("");
    const text1 = ref("text example.....");
    function onFormSubmit(e) {
      console.log("dsdfsfsdf");
      notify(
        {
          message: "You have submitted the form",
          position: {
            my: "center top",
            at: "center top",
          },
        },
        "success",
        3000
      );

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
