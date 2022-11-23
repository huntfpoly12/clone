<template>
  <div id="components-modal-demo-position">
    <a-modal
      :mask-closable="false"
      footer=""
      :visible="modalStatus"
      centered
      width="700px"
      @cancel="setModalVisible()"
    >
      <a-col class="modal-email-pa730">
        <div class="dflex custom-flex">
          <img
            src="../../../../../assets/images/email.svg"
            alt=""
            height="45"
            class="modal-mail-430"
          />
          <input
            class="input-email"
            type="text"
            placeholder="abc@example.com"
          />
          <label class="lable-item">로 메일을 발송하시겠습니까? </label>
        </div>
      </a-col>

      <standard-form action="your-action">
        <a-spin :spinning="spinningAdd" size="large">
          <a-row :gutter="24"> </a-row>
          <a-row class="footer">
            <button-basic
              text="아니요"
              type="default"
              mode="outlined"
              @onClick="setModalVisible"
              style="margin-right: 10px"
            />
            <button-basic
              text="네. 발송합니다"
              type="default"
              mode="contained"
              @onClick="createScrenRole"
            />
          </a-row>
        </a-spin>
      </standard-form>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed, reactive } from "vue";
import { useStore } from "vuex";
import { SearchOutlined, WarningOutlined } from "@ant-design/icons-vue";
import { DxDataGrid, DxColumn, DxPaging } from "devextreme-vue/data-grid";
import notification from "../../../../../utils/notification";
import { useQuery, useMutation } from "@vue/apollo-composable";
import queries from "../../../../../graphql/queries/PA/PA7/PA730/index";
import mutations from "../../../../../graphql/mutations/PA/PA7/PA730/index";
import { AdminScreenRole } from "@bankda/jangbuda-common";
import { DxCheckBox } from "devextreme-vue/check-box";
import comfirmClosePopup from "../../../../../utils/comfirmClosePopup";
export default defineComponent({
  props: ["modalStatus"],
  components: {
    SearchOutlined,
    WarningOutlined,
    DxDataGrid,
    DxPaging,
    DxColumn,
    DxCheckBox,
  },
  setup(props, { emit }) {
    // config grid
    const store = useStore();

    const move_column = computed(() => store.state.settings.move_column);
    const colomn_resize = computed(() => store.state.settings.colomn_resize);
    const dataSource = ref(AdminScreenRole.all());
    const spinningAdd = ref<boolean>(false);
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const visible = ref<boolean>(false);
    const triggers = ref(false);
    let isDisable = ref<boolean>(true);
    const wrapperCol = { span: 14 };
    const checkIDName = ref();
    const dataRes = ref({
      id: "",
      name: "",
      type: "m",
      memo: "",
    });
    let objDataDefault = ref({
      ...dataRes.value,
    });
    let readAdminScreenRoles: any = ref([]);
    let writeAdminScreenRoles: any = ref([]);
    const checkId = () => {
      spinningAdd.value = true;
      if (dataRes.value.id != "") {
        triggers.value = true;
        refetchData;
      }
      setTimeout(() => {
        triggers.value = false;
      }, 1000);
    };
    const { refetch: refetchData, result: resList } = useQuery(
      queries.isScreenRoleGroupRegistableId,
      checkIDName,
      () => ({
        enabled: triggers.value,
        fetchPolicy: "no-cache",
      })
    );
    watch(
      () => dataRes.value.id,
      (value) => {
        if (value.length < 5) {
          isDisable.value = true;
        } else {
          isDisable.value = false;
          checkIDName.value = {
            id: dataRes.value.id,
          };
        }
      },
      { deep: true }
    );
    watch(resList, (value) => {
      if (value.isScreenRoleGroupRegistableId == true) {
        notification("success", "사용 가능한 그룹코드입니다");
      } else {
        notification(
          "error",
          `이미 존재하는 그룹코드 입니다. 다른 코드를 입력해주세요`
        );
      }
      spinningAdd.value = false;
    });
    //Creat new group roll
    const {
      mutate: createScreenRole,
      onDone: creactDone,
      onError: creactError,
    } = useMutation(mutations.createScreenRoleGroup);
    creactDone((e) => {
      notification("success", "그룹이 생성되었습니다.");
      emit("closePopupAdd", false);
    });
    creactError((e) => {
      notification("error", e.message);
    });
    const createScrenRole = (e: any) => {
      var res = e.validationGroup.validate();
      if (!res.isValid) {
        res.brokenRules[0].validator.focus();
      } else {
        let dataCall = {
          input: {
            id: dataRes.value.id,
            name: dataRes.value.name,
            type: dataRes.value.type,
            readAdminScreenRoles: readAdminScreenRoles.value,
            writeAdminScreenRoles: writeAdminScreenRoles.value,
            memo: dataRes.value.memo,
          },
        };
        createScreenRole(dataCall);
      }
    };
    const setModalVisible = () => {
      if (
        (JSON.stringify(objDataDefault.value) ===
          JSON.stringify(dataRes.value)) ==
        true
      )
        emit("closePopupAdd", false);
      else comfirmClosePopup(() => emit("closePopupAdd", false));
    };
    const changeValRoles = (data: any, type: string) => {
      let count = 0;
      if (type == "read") {
        if (readAdminScreenRoles.value.length == 0) {
          readAdminScreenRoles.value.push(data);
        } else {
          readAdminScreenRoles.value.map((e: any) => {
            if (e == data) {
              count++;
            }
          });
          if (count > 0) {
            readAdminScreenRoles.value = readAdminScreenRoles.value.filter(
              (obj: any) => {
                return obj !== data;
              }
            );
          } else {
            readAdminScreenRoles.value.push(data);
          }
        }
      }
      if (type == "write") {
        if (writeAdminScreenRoles.value.length == 0) {
          writeAdminScreenRoles.value.push(data);
        } else {
          writeAdminScreenRoles.value.map((e: any) => {
            if (e == data) {
              count++;
            }
          });
          if (count > 0) {
            writeAdminScreenRoles.value = writeAdminScreenRoles.value.filter(
              (obj: any) => {
                return obj !== data;
              }
            );
          } else {
            writeAdminScreenRoles.value.push(data);
          }
        }
      }
    };
    return {
      changeValRoles,
      move_column,
      colomn_resize,
      createScrenRole,
      spinningAdd,
      dataSource,
      checkId,
      wrapperCol,
      dataRes,
      layout,
      visible,
      setModalVisible,
      readAdminScreenRoles,
      writeAdminScreenRoles,
      isDisable,
    };
  },
});
</script>
<style lang="scss" scoped src="../style/popupStyle.scss" />
