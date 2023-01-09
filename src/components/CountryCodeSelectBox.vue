<template> 
	<DxSelectBox :search-enabled="true" :data-source="dataSelect" @value-changed="onValueChanged" :value="valueCountry"
		value-expr="key" display-expr="value" field-template="field" item-template="item" :style="{ width: width }"
		:disabled="disabled" :required="required">
		<template #field="{ data }">
			<div v-if="data" class="select-content" style="padding: 3px 0px;">
				<a-tag color="default">{{ data.key }}</a-tag>
				<div>
					<DxTextBox :value="data && data.value" :read-only="true" class="product-name" />
					{{ data.value }}
				</div>
			</div>
			<div v-else class="select-content" style="padding: 3px 0px; height: 30px;">
				<div>
					<span>선택</span>
					<DxTextBox style="display: none;" />
				</div>
			</div>
		</template>
		<template #item="{ data }">
			<div class="custom-value">
				<a-tag color="default">{{ data.key }}</a-tag>
				<div>
					<DxTextBox :value="data && data.value" :read-only="true" class="product-name" />
					{{ data.value }}
				</div>
			</div>
		</template>
		<DxValidator :name="nameInput">
			<DxRequiredRule v-if="required" :message="messageRequired" />
		</DxValidator>
	</DxSelectBox>
</template>
<script lang="ts">
import { defineComponent, ref, getCurrentInstance, watch } from "vue";
import DxTextBox from "devextreme-vue/text-box";
import DxSelectBox from "devextreme-vue/select-box";
import {
	DxValidator,
	DxRequiredRule,
} from "devextreme-vue/validator";
import { CountryCode, enum2KeysByValueMap, getEnumValue } from "@trandung1291/common-tsv";

export default defineComponent({
	props: {
		valueCountry: {
			type: String,
			default: 'KR',
		},
		width: {
			type: String,
			default: '200px'
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
		hiddenOptionKR: {
			type: Boolean,
			default: false
		},
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
		let dataSelect = ref(Array());

		if (props.hiddenOptionKR) {
			enum2KeysByValueMap(CountryCode).forEach((codeCountry, nameCountry) => {
				if (codeCountry != "KR") {
					dataSelect.value.push({ key: codeCountry, value: nameCountry });
				}
			});
		} else {
			enum2KeysByValueMap(CountryCode).forEach((codeCountry, nameCountry) => {
				dataSelect.value.push({ key: codeCountry, value: nameCountry });
			});
		}


		//============ WATCH =================================
		watch(() => props.hiddenOptionKR, (newVal) => {
			dataSelect.value = []
			if (newVal) { 
				enum2KeysByValueMap(CountryCode).forEach((codeCountry, nameCountry) => {
					if (codeCountry != "KR") {
						dataSelect.value.push({ key: codeCountry, value: nameCountry });
					}
				});
				emit('update:valueCountry', 'GH')
			} else { 
				enum2KeysByValueMap(CountryCode).forEach((codeCountry, nameCountry) => {
					dataSelect.value.push({ key: codeCountry, value: nameCountry });
				});
				emit('update:valueCountry', 'KR')
			}
		}, { deep: true })

		const onValueChanged = (val: any) => {
			emit('textCountry', getEnumValue(CountryCode, val.value))
			emit('update:valueCountry', val.value)
		}
		return { dataSelect, onValueChanged, messageRequired };
	},
});
</script>
<style scoped>
::v-deep .dx-texteditor-input {
	padding: 0;
	color: black;
}

::v-deep .product-name {
	display: none;
	margin-top: -5px;
}

.select-content {
	display: flex;
	align-items: center;
	margin-left: 5px;
}

.dx-list-item-content {
	display: flex;
}

.dx-texteditor.dx-state-readonly {
	border-style: none;
}

.ant-tag {
	text-align: center;
	align-items: center;
	width: 35px;
	height: 25px;
}

.custom-value {
	display: flex;
	align-items: center;
	padding: 3px 4px !important;
}
</style>
