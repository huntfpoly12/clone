<template>
    <form ref="formTest" action="your-action">
        <table id="customers">
            <tr>
                <th style="width: 550px">Example</th>
                <th style="width: 550px">Props</th>
                <th>Code Example</th>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">Select Box Common</div>
                    </div>
                    <select-box-common :arrSelect="arraySelectBox" :required="true" :width="150"
                        v-model:valueInput="valueSelectBox" />
                </td>
                <td>
                    <ul>
                        <li>
                            <strong>required:</strong> {type: Boolean,default: false,}
                            (option)
                        </li>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li>
                            <strong>valueInput:</strong> {type: Number}
                        </li>
                        <li><strong>arrSelect:</strong> {type: Array}</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
                &lt;select-box-common :arrSelect="arraySelectBox" :required="true"
                                    v-model:valueInput="valueSelectBox" /&gt;
        </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <b>ElectronicFilingType Common</b>
                    </div>
                    <electronic-filing-type-common />
                </td>
                <td> 
                </td>
                <td>
                    <pre class="mycode"> &lt;electronic-filing-type-common /&gt; </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">
                            Common Select Box
                            <br>
                            Imputed Year Month
                        </div>
                    </div>
                    <imputed-year-month-select-box :dataSelect="arraySelectBox" width="150px" :required="true"
                        type="1" />
                </td>
                <td>
                    <ul>
                        <li>
                            <strong>required:</strong> {type: Boolean,default: false,}
                            (option)
                        </li>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li>
                            <strong>valueInput:</strong> {type: Number}
                        </li>
                        <li><strong>dataSelect:</strong> {type: Array}</li>
                        <li><strong>type:</strong> {type: String} 1 : backgroud -> gray </li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">

                &lt;imputed-year-month-select-box :dataSelect="arraySelectBox" width="150px" 
                :required="true" type="1"/&gt;
        </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">Employ Select </div>
                    </div>
                    <employ-select :arrayValue="arrayEmploySelect" v-model:valueEmploy="valueEmploy" width="350px"
                        :required="true" />
                </td>
                <td>
                    <ul>
                        <li>
                            <strong>required:</strong> {type: Boolean,default: false,}
                            (option)
                        </li>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li><strong>required:</strong> Boolean (option)</li>
                        <li>
                            <strong>valueEmploy:</strong> {type: Number}
                        </li>
                        <li><strong>arrayValue:</strong> {type: Array}</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
                &lt;employ-select :arrayValue="arrayEmploySelect" :required="true" /&gt;
        </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">List country select box</div>
                        <div class="dx-field-value">
                            <country-code-select-box v-model:valueCountry="valueCountry" />
                        </div>
                    </div>
                </td>
                <td>
                    <ul>
                        <li>
                            <strong>required:</strong> {type: Boolean,default: false,}
                            (option)
                        </li>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li><strong>required:</strong> Boolean (option)</li>
                        <li><strong>valueCountry:</strong> {type: String}</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
                &lt;country-code-select-box v-model:valueCountry="valueCountry" /&gt;
        </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">List country select box</div>
                        <div class="dx-field-value">
                            <stay-qualification-select-box v-model:valueStayQualifiction="valueStayQualifiction" />
                        </div>
                    </div>
                </td>
                <td>
                    <ul>
                        <li>
                            <strong>required:</strong> {type: Boolean,default: false,}
                            (option)
                        </li>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li><strong>required:</strong> Boolean (option)</li>
                        <li><strong>valueStayQualifiction:</strong> {type: String}</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
                &lt;stay-qualification-select-box v-model:valueStayQualifiction="valueStayQualifiction" /&gt;
        </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">List tag select box</div>
                        <div class="dx-field-value">
                            <tag-select-box :arrayValue="arrayTagSelectBox"
                                v-model:valueTagSelect="valueTagSelectBox" />
                        </div>
                    </div>
                </td>
                <td>
                    <ul>
                        <li>
                            <strong>required:</strong> {type: Boolean,default: false,}
                            (option)
                        </li>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li><strong>arrayValue:</strong> {type: Array, required: true}</li>
                        <li><strong>valueTagSelect:</strong> {type: Array}</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
                &lt; tag-select-box 
                :arrayValue="arrayTagSelectBox"
                 v-model:valueTagSelect="valueTagSelectBox" /&gt;
              </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">Bank select box</div>
                        <div class="dx-field-value">
                            <bank-select-box width="150px" :required="true"></bank-select-box>
                        </div>
                    </div>
                </td>
                <td>
                    <ul>
                        <li>
                            <strong>label:</strong> label: {type: String,required: true}
                            (required)
                        </li>
                        <li>
                            <strong>required:</strong> {type: Boolean,default: false,}
                            (option)
                        </li>
                        <li>
                            <strong>messRequired:</strong> { type: String, default: "Input is
                            required!",} (option)
                        </li>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>clearButton:</strong> Boolean (option)</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li>
                            <strong>valueInput:</strong> {type: [String, Number],default: "",}
                        </li>
                        <li><strong>readOnly:</strong> Boolean (option)</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
                &lt; bank-select-box width="150px" :required="true" / &gt;
              </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">Biz type select box</div>
                        <div class="dx-field-value">
                            <biz-type-select-box width="150px" :required="true"></biz-type-select-box>
                        </div>
                    </div>
                </td>
                <td>
                    <ul>
                        <li>
                            <strong>label:</strong> label: {type: String,required: true}
                            (required)
                        </li>
                        <li>
                            <strong>required:</strong> {type: Boolean,default: false,}
                            (option)
                        </li>
                        <li>
                            <strong>messRequired:</strong> { type: String, default: "Input is
                            required!",} (option)
                        </li>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>clearButton:</strong> Boolean (option)</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li>
                            <strong>valueInput:</strong> {type: [String, Number],default: "",}
                        </li>
                        <li><strong>readOnly:</strong> Boolean (option)</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
                &lt; biz-type-select-box width="150px" :required="true" / &gt;
              </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">Sale grade select box</div>
                        <div class="dx-field-value">
                            <sale-grade-select-box width="150px" :required="true"></sale-grade-select-box>
                        </div>
                    </div>
                </td>
                <td>
                    <ul>
                        <li>
                            <strong>label:</strong> label: {type: String,required: true}
                            (required)
                        </li>
                        <li>
                            <strong>required:</strong> {type: Boolean,default: false,}
                            (option)
                        </li>
                        <li>
                            <strong>messRequired:</strong> { type: String, default: "Input is
                            required!",} (option)
                        </li>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>clearButton:</strong> Boolean (option)</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li><strong>valueInput:</strong> {type: Number,}</li>
                        <li><strong>readOnly:</strong> Boolean (option)</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
                &lt; sale-grade-select-box width="150px" :required="true" / &gt;
              </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">Sale status select box</div>
                        <div class="dx-field-value">
                            <sale-status-select-box width="150px" :confirmStatus="true"></sale-status-select-box>
                        </div>
                    </div>
                </td>
                <td>
                    <ul>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>placeholder:</strong> String,</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li><strong>valueInput:</strong> {type: Number,}</li>
                        <li><strong>readOnly:</strong> Boolean (option)</li>
                        <li>
                            <strong>confirmStatus:</strong> { type: Boolean,default: false,}
                        </li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
                &lt; sale-status-select-box width="150px" :confirmStatus="true" / &gt;
              </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">List sale select box</div>
                        <div class="dx-field-value">
                            <list-sales-dropdown width="150px" :required="true" :isExample="true"></list-sales-dropdown>
                        </div>
                    </div>
                </td>
                <td>
                    <ul>
                        <li>
                            <strong>label:</strong> label: {type: String,required: true}
                            (required)
                        </li>
                        <li>
                            <strong>required:</strong> {type: Boolean,default: false,}
                            (option)
                        </li>
                        <li>
                            <strong>messRequired:</strong> { type: String, default: "Input is
                            required!",} (option)
                        </li>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>clearButton:</strong> Boolean (option)</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li><strong>valueInput:</strong> {type: Number,}</li>
                        <li><strong>readOnly:</strong> Boolean (option)</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
                &lt; list-sales-dropdown width="150px" :required="true" / &gt;
              </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">List manager select box</div>
                        <div class="dx-field-value">
                            <list-manager-dropdown width="150px" :required="true" :isExample="true"></list-manager-dropdown>
                        </div>
                    </div>
                </td>
                <td>
                    <ul>
                        <li>
                            <strong>label:</strong> label: {type: String,required: true}
                            (required)
                        </li>
                        <li>
                            <strong>required:</strong> {type: Boolean,default: false,}
                            (option)
                        </li>
                        <li>
                            <strong>messRequired:</strong> { type: String, default: "Input is
                            required!",} (option)
                        </li>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>clearButton:</strong> Boolean (option)</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li><strong>valueInput:</strong> {type: Number,}</li>
                        <li><strong>readOnly:</strong> Boolean (option)</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
                &lt; list-manager-dropdown width="150px" :required="true" / &gt;
              </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">List partner select box</div>
                        <div class="dx-field-value">
                            <list-partner width="150px" :required="true" :isExample="true"></list-partner>
                        </div>
                    </div>
                </td>
                <td>
                    <ul>
                        <li>
                            <strong>label:</strong> label: {type: String,required: true}
                            (required)
                        </li>
                        <li>
                            <strong>required:</strong> {type: Boolean,default: false,}
                            (option)
                        </li>
                        <li>
                            <strong>messRequired:</strong> { type: String, default: "Input is
                            required!",} (option)
                        </li>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>clearButton:</strong> Boolean (option)</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li><strong>valueInput:</strong> {type: Number,}</li>
                        <li><strong>readOnly:</strong> Boolean (option)</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
                &lt; list-partner width="150px" :required="true" / &gt;
              </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">
                            Service subscription application status
                        </div>
                        <div class="dx-field-value">
                            <subs-req-status-select-box width="150px" :required="true"></subs-req-status-select-box>
                        </div>
                    </div>
                </td>
                <td>
                    <ul>
                        <li>
                            <strong>label:</strong> label: {type: String,required: true}
                            (required)
                        </li>
                        <li>
                            <strong>required:</strong> {type: Boolean,default: false,}
                            (option)
                        </li>
                        <li>
                            <strong>messRequired:</strong> { type: String, default: "Input is
                            required!",} (option)
                        </li>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>clearButton:</strong> Boolean (option)</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li><strong>valueInput:</strong> {type: Number,}</li>
                        <li><strong>readOnly:</strong> Boolean (option)</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
                &lt; subs-req-status-select-box width="150px" :required="true" / &gt;
              </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">StatusProgress Control</div>
                        <div class="dx-field-value">
                            Value return : {{ saleStatus }}
                            <subs-req-status-process-bar v-model:valueInput="saleStatus"></subs-req-status-process-bar>
                        </div>
                    </div>
                </td>
                <td>
                    <ul>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li><strong>valueInput:</strong> {type: Number,}</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
                &lt; subs-req-status-process-bar / &gt;
              </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">Select Employee Extra income</div>
                        <div class="dx-field-value">
                            <type-code-select-box v-model:valueInput="valueTypeCodeSelectSelectBox" :disabled="false">
                            </type-code-select-box>
                        </div>
                    </div>
                </td>
                <td>
                    <ul>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li><strong>valueInput:</strong> {type: String}</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
                &lt; type-code-select-box v-model:valueInput="valueTypeCodeSelectSelectBox"
                :required="true" &gt; &lt;/ type-code-select-box &gt;
            </pre>
                </td>
            </tr>

            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">Custom Item SelectBox</div>
                        <div class="dx-field-value">
                            <custom-item-select-box width="200px" v-model:valueInput="valTest"></custom-item-select-box>
                        </div>
                    </div>
                </td>
                <td>
                    <ul>
                        <li><strong>arrSelect:</strong> {type: Array}</li>
                        <li>
                            <strong>required:</strong> {type: Boolean,default: false,}
                            (option)
                        </li>
                        <li>
                            <strong>messRequired:</strong> { type: String, default: "Input is
                            required!",} (option)
                        </li>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>clearButton:</strong> Boolean (option)</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li>
                            <strong>valueInput:</strong> {type: [String, Number],default: "",}
                        </li>
                        <li><strong>readOnly:</strong> Boolean (option)</li>
                        <li><strong>Note:</strong> Có thể thêm item select bằng cách nhập tại input rồi ấn enter</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
                &lt; custom-item-select-box v-model:valueInput="valTest"
                :required="true" &gt; &lt;/ custom-item-select-box &gt;
              </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">Dependants Relation select box</div>
                        <div class="dx-field-value">
                            <dependants-relation-select-box width="150px"
                                :required="true"></dependants-relation-select-box>
                        </div>
                    </div>
                </td>
                <td>
                    <ul>
                        <li>
                            <strong>required:</strong> {type: Boolean,default: false,}
                            (option)
                        </li>
                        <li>
                            <strong>messRequired:</strong> { type: String, default: "Input is
                            required!",} (option)
                        </li>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>clearButton:</strong> Boolean (option)</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li><strong>valueInput:</strong> {type: Number,}</li>
                        <li><strong>readOnly:</strong> Boolean (option)</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
        &lt; dependants-relation-select-box width="150px" :required="true" / &gt;
    </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">Basic Deduction select box</div>
                        <div class="dx-field-value">
                            <basic-deduction-select-box width="150px" :required="true"></basic-deduction-select-box>
                        </div>
                    </div>
                </td>
                <td>
                    <ul>
                        <li>
                            <strong>required:</strong> {type: Boolean,default: false,}
                            (option)
                        </li>
                        <li>
                            <strong>messRequired:</strong> { type: String, default: "Input is
                            required!",} (option)
                        </li>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>clearButton:</strong> Boolean (option)</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li><strong>valueInput:</strong> {type: Number,}</li>
                        <li><strong>readOnly:</strong> Boolean (option)</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
        &lt; basic-deduction-select-box width="150px" :required="true" / &gt;
    </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">account code select common</div>
                        <div class="dx-field-value">
                            <account-code-select v-model:valueInput="valueSelectBox" />
                        </div>
                    </div>
                </td>
                <td>
                    <ul>
                        <li>
                            <strong>required:</strong> {type: Boolean,default: false,}
                            (option)
                        </li>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li><strong>required:</strong> Boolean (option)</li>
                        <li><strong>valueInput:</strong> [Number, String]</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
                &lt;account-code-select v-model:valueInput="valueSelectBox" /&gt;
        </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">Funding Source Select common</div>
                        <div class="dx-field-value">
                            <FundingSourceSelect v-model:valueInput="valueSelectBox" />
                        </div>
                    </div>
                </td>
                <td>
                    <ul>
                        <li>
                            <strong>required:</strong> {type: Boolean,default: false,}
                            (option)
                        </li>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li><strong>required:</strong> Boolean (option)</li>
                        <li><strong>valueInput:</strong> [Number, String]</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
                &lt;FundingSourceSelect v-model:valueInput="valueSelectBox" /&gt;
        </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">Customer Select common</div>
                        <div class="dx-field-value">
                            <customer-select v-model:valueInput="valueSelectBox" :isExample="true"/>
                        </div>
                    </div>
                </td>
                <td>
                    <ul>
                        <li>
                            <strong>required:</strong> {type: Boolean,default: false,}
                            (option)
                        </li>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li><strong>required:</strong> Boolean (option)</li>
                        <li><strong>valueInput:</strong> [Number, String]</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
                &lt;customer-select v-model:valueInput="valueSelectBox" /&gt;
        </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="dx-field">
                        <div class="dx-field-label">Select Search Edit</div>
                        <div class="dx-field-value">
                            <SelectSearchEdit v-model:valueInput="vualueSelectSearchEdit" v-model:data="arrSelectSearchEdit" />
                        </div>
                    </div>
                </td>
                <td>
                    <ul>
                        <li>
                            <strong>required:</strong> {type: Boolean,default: false,}
                            (option)
                        </li>
                        <li><strong>messRequired:</strong> {type: String,default: ""} </li>
                        <li><strong>width:</strong> String (option)</li>
                        <li><strong>disabled:</strong> Boolean (option)</li>
                        <li><strong>valueInput:</strong> [Number, String]</li>
                        <li><strong>readOnly:</strong> Boolean (option)</li>
                        <li><strong>placeholder:</strong> {type: String,default: '선택 또는 직접입력'}</li>
                        <li><strong>required:</strong> Boolean (option)</li>
                        <li><strong>displayExpr:</strong> {type: String,default: 'value'}</li>
                        <li><strong>valueExpr:</strong> {type: String,default: 'value'}</li>
                    </ul>
                </td>
                <td>
                    <pre class="mycode">
                &lt;select-search-edit 
                v-model:valueInput="vualueSelectSearchEdit" 
                v-model:data="arrSelectSearchEdit"  /&gt;
        </pre>
                </td>
            </tr>
        </table>
    </form>
</template>

<script>
import { defineComponent, ref } from "vue";
import BasicDeductionSelectBox from "../../components/BasicDeductionSelectBox.vue";
export default defineComponent({
    components: {
        BasicDeductionSelectBox,
    },
    data() {
        return {
            styles: {
                main: this.$config_styles.Main,
            },
        };
    },
    setup() {
        const valueCountry = ref('KR')
        const valueEmploy = ref(456)
        const valueStayQualifiction = ref('C-4')
        const valueTypeCodeSelectSelectBox = ref('940908')
        const arrayTagSelectBox = ref([
            { id: 0, name: "Low" },
            { id: 1, name: "Normal" },
            { id: 2, name: "Urgent" },
            { id: 3, name: "High" },
        ]);
        const arraySelectBox = ref([
            { value: 0, label: "Low" },
            { value: 1, label: "Normal" },
            { value: 2, label: "Urgent" },
            { value: 3, label: "High" },
        ]);
        const arrayEmploySelect = ref([
            { employeeId: 123, name: 'khiem', idCardNumber: '800101-1100123', status: 0, foreigner: true },
            { employeeId: 456, name: 'khiem 1', idCardNumber: '800101-1100123', status: 0, foreigner: false },
            { employeeId: 789, name: 'khiem 3', idCardNumber: '800101-1100123', status: 1, foreigner: true },
        ])
        const valueTagSelectBox = ref([1, 2]);
        const valueSelectBox = ref(1);
        const saleStatus = ref(10);
        const valTest = ref('Nancy');
        // data demo select search edit
        let vualueSelectSearchEdit = ref(null)
        let arrSelectSearchEdit = ref([
            { value: 'keyword 1'},
            { value: 'keyword 2'},
            { value: 'keyword 3'},
            { value: 'keyword 4'},
            { value: 'keyword 5'},
        ])
        return {
            valTest,
            saleStatus,
            valueStayQualifiction,
            arrayTagSelectBox,
            valueTagSelectBox,
            valueCountry,
            valueTypeCodeSelectSelectBox,
            arrayEmploySelect,
            valueEmploy,
            valueSelectBox,
            arraySelectBox,
            vualueSelectSearchEdit,
            arrSelectSearchEdit
        };
    },
});
</script>
<style scoped lang="scss">
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
    display: block;
    padding: 3px 3px 2px;
    font-size: 14px;
    line-height: 20px;
    width: 100%;
    background-color: #333;
    font-family: arial;
    color: #f7f7f7;
    font-weight: bold;
}
</style>
