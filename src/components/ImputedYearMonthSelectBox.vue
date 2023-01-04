<template>
	<DxSelectBox :search-enabled="true" :data-source="dataSelect" @value-changed="onValueChanged" :value="valueInput"
		value-expr="key" display-expr="value" field-template="field" item-template="item" :style="{ width: width }"
		:disabled="disabled" :required="required">
		<template #field="{ data }">
			<div v-if="data" style="padding: 3px 0 3px 10px;" :class="type == '1' ? 'item-type-1' : 'item-type-2'">
				<a-tag color="default">{{ data.value }}</a-tag>
				<DxTextBox style="display: none;" />
			</div>
			<div v-else style="padding: 3px 0px 3px 5px; height: 30px;">
				<span>선택</span>
				<DxTextBox style="display: none;" />
			</div>
		</template>
		<template #item="{ data }">
			<div :class="type == '1' ? 'item-type-1 custom-value' : 'item-type-2 custom-value'"
				style="margin-left:5px;">
				<a-tag color="default">{{ data.value }}</a-tag>
				<DxTextBox :value="data && data.value" :read-only="true" class="product-name" />
			</div>
		</template>
		<DxValidator :name="nameInput">
			<DxRequiredRule v-if="required" :message="messageRequired" />
		</DxValidator>
	</DxSelectBox>
</template>
<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from "vue";
import DxTextBox from "devextreme-vue/text-box";
import DxSelectBox from "devextreme-vue/select-box";
import {
	DxValidator,
	DxRequiredRule,
} from "devextreme-vue/validator";

export default defineComponent({
	props: {
		valueInput: {
			type: String,
		},
		width: {
			type: String,
		},
		disabled: {
			type: Boolean,
			default: false
		},
		required: {
			type: Boolean,
			default: false
		},
		nameInput: {
			type: String,
			default: '',
		},
		messRequired: {
			type: String,
			default: "",
		},
		dataSelect: Array,
		type: {
			type: String,
			default: '1'
			//1: backgroud : gray
			//2: backgroud : black
		}

	},
	components: {
		DxSelectBox,
		DxTextBox,
		DxValidator,
		DxRequiredRule,
	},
	setup(props, { emit }) {
		const app: any = getCurrentInstance()
		const messages = app.appContext.config.globalProperties.$messages;
		const messageRequired = ref(messages.getCommonMessage('102').message);

		if (props.messRequired != "") {
			messageRequired.value = props.messRequired;
		}
		const onValueChanged = (val: any) => { 
			emit('update:valueInput', val.value)
		}

		return { onValueChanged, messageRequired };
	},
});
</script>
<style scoped lang="scss">
::v-deep .dx-texteditor-input {
	padding: 0;
	color: black;
}

::v-deep .product-name {
	display: none;
	margin-top: -5px;
}

.dx-list-item-content {
	display: flex;
}

.dx-texteditor.dx-state-readonly {
	border-style: none;
}

.item-type-1 .ant-tag {
	background-color: gray;
	color: white;
}

.item-type-2 .ant-tag {
	background-color: black;
	color: white;
}

.ant-tag {
	text-align: center;
	align-items: center;
	height: 25px;
	width: 100px;
	margin-right: 0px;
}

.custom-value {
	display: flex;
	align-items: center;
	padding: 3px 4px !important;
}
</style>
