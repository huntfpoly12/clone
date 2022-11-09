<template>
    <form ref="formTest" action="your-action">
        <table id="customers">
            <tr>
                <th style="width: 25%">Example</th>
                <th style="width: 25%">Props</th>
                <th style="width: 25%">Emit</th>
                <th style="width: 25%">Code Example</th>
            </tr>
            <tr>
                <td>
                    <button-basic :width="120" :text="'단추'" :type="'success'" :mode="'contained'"
                        @onClick="clickButton" /> -
                    <button-basic :width="120" :text="'단추'" :type="'success'" :mode="'outlined'" /> -
                    <button-basic :width="120" :text="'단추'" :type="'success'" :mode="'text'" />

                    <button-basic :width="120" :text="'단추'" :type="'default'" :mode="'contained'" /> -
                    <button-basic :width="120" :text="'단추'" :type="'default'" :mode="'outlined'" /> -
                    <button-basic :width="120" :text="'단추'" :type="'default'" :mode="'text'" />

                    <button-basic :width="120" :text="'단추'" :type="'danger'" :mode="'contained'" /> -
                    <button-basic :width="120" :text="'단추'" :type="'danger'" :mode="'outlined'" /> -
                    <button-basic :width="120" :text="'단추'" :type="'danger'" :mode="'text'" />
                </td>

                <td>
                    <b> text</b> : Text button <br />
                    <b> type </b>: Choose type button : success / default / danger <br />
                    <b> mode </b>: Choose styling mode button : contained / outlined / text
                    <b> width </b>: Set width button
                </td>

                <td>
                    <b>@onClick</b> : Call the function when emit from child components
                </td>

                <td>
                    <span class="mycode">
                        &lt;button-basic :text="'단추'" :type="'success'" :mode="'contained'" @onClick="clickButton" /&gt;
                    </span>
                </td>
            </tr>
            <tr>
                <td>
                    <checkbox-basic v-model:valueCheckbox="valueCheckBox" :disabled="false" :size="'18'" />
                </td>

                <td>
                    <b>v-model:valueCheckbox</b> : Value input : true / false <br>
                    <b>disabled</b> : true / false <br>
                    <b>size</b> : Number size box <br>
                </td>

                <td>
                    Return value checkbox (true / false)
                </td>

                <td>
                    <span class="mycode">
                        &lt;checkbox-basic v-model:valueCheckbox="valueCheckBox" :disabled="false" :size="'20'" / &gt;
                    </span>
                </td>
            </tr>
            <tr>
                <td>
                    <radio-group :arrayValue="arrayRadioCheck" v-model:valueRadioCheck="valueRadioBox"
                        :layoutCustom="'horizontal'" />
                </td>

                <td>
                    <b>arrayValue</b> : Array data <br>
                    <b>v-model:valueRadioCheck</b> : Object emit or default <br>
                    <b>layoutCustom</b> : Layout horizontal and vertical ( horizontal / '' )
                </td>

                <td>
                    Return value row select
                </td>

                <td>
                    <span class="mycode">
                        &lt;radio-group :arrayValue="arrayRadioCheck" v-model:valueRadioCheck="valueRadioBox"
                        :layoutCustom="'horizontal'" /&gt;
                    </span>
                </td>
            </tr>
            <tr>
                <td>
                    <switch-basic v-model:valueSwitch="valueSwitchChange" :textCheck="'포함'" :textUnCheck="'제외'" />
                </td>

                <td>
                    <b>v-model:valueSwitch</b> : Data default ( true / false)<br>
                    <b>textCheck</b> : text when checked<br>
                    <b>v-textUnCheck</b> : text when un-checked
                </td>

                <td>

                </td>

                <td>
                    <span class="mycode">
                        &lt;switch-basic v-model:valueSwitch="valueSwitchChange" :textCheck="'포함'" :textUnCheck="'제외'" /
                        &gt;
                    </span>
                </td>
            </tr>

        </table>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DxValidationSummary from "devextreme-vue/validation-summary";
import DxButton from "devextreme-vue/button";
export default defineComponent({
    components: {
        DxButton,
        DxValidationSummary,
    },
    data() {
        return {
            styles: {
                main: this.$config_styles.Main,
            },
        };
    },
    setup() {
        const clickButton = () => {
        }

        const arrayRadioCheck = ref([{ id: 0, text: 'Low' },
        { id: 1, text: 'Normal' },
        { id: 2, text: 'Urgent' },
        { id: 3, text: 'High' }])

        const valueCheckBox = ref(false)
        const valueRadioBox = ref(arrayRadioCheck.value[2])
        const valueSwitchChange = ref(true)

        return {
            valueSwitchChange,
            valueRadioBox,
            arrayRadioCheck,
            valueCheckBox,
            clickButton
        };
    },
});
</script> 
<style lang="scss" scoped>
#customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

#customers td,
#customers th {
    border: 1px solid #ddd;
    padding: 8px;
}

#customers tr:nth-child(even) {
    background-color: #f2f2f2;
}

#customers tr:hover {
    background-color: #ddd;
}

#customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: v-bind("styles.main");
    color: white;
}

.mycode {
    font-size: 14px;
    width: 100%;
    background-color: #333;
    color: #f7f7f7;
    font-weight: bold;
}
</style>