<template>
  <div style="display: flex">
    <div class="application" :class="[ valueInput ==  SubscriptionRequestStatus.신청 ? 'active-app' : '']" @click="setStatus(SubscriptionRequestStatus.신청)"></div>
    <div class="under-examination" :class="[ valueInput ==  SubscriptionRequestStatus.심사중 ? 'active-under-eX' : '']" @click="setStatus(SubscriptionRequestStatus.심사중)"></div>
    <div class="approval" :class="[ valueInput ==  SubscriptionRequestStatus.반려 ? 'active-approval' : '']" @click="setStatus(SubscriptionRequestStatus.반려)"></div>
    <div class="application-rejected" :class="[ valueInput ==  SubscriptionRequestStatus.승인 ? 'active-app-rejected' : '']" @click="setStatus(SubscriptionRequestStatus.승인)"></div>
    <div style="width: 50px;font-weight: bold;color: grey;">
        {{getEnumKey(SubscriptionRequestStatus,valueInput)}}
    </div>
  </div>
</template>
  <script lang="ts">
import { defineComponent ,reactive} from "vue";
import {
    SubscriptionRequestStatus,
    getEnumKey,
} from "@bankda/jangbuda-common";

export default defineComponent({
  props: {
    valueInput: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {

  },
  setup(props, { emit }) {
    const setStatus = (status : number)=>{
        if(!props.disabled){
            emit("update:valueInput", status);
        }
    }
    return {
        getEnumKey,
        setStatus,
        SubscriptionRequestStatus
    }
  },
});
</script>
<style scoped>
.application{
    width: 70px;
    height: 20px;
    margin-right: 5px;
    border: 1px solid #FF4D4F;
    cursor: pointer;
    background-color: white;
}

.active-app{
    background-color: #FF4D4F;
}

.under-examination{
    width: 70px;
    height: 20px;
    margin-right: 5px;
    border: 1px solid #1990FF;
    cursor: pointer;
    background-color: white;
}

.active-under-eX{
    background-color: #1990FF;
}

.approval{
    width: 70px;
    height: 20px;
    margin-right: 5px;
    border: 1px solid grey;
    cursor: pointer;
    background-color: white;
}
.active-approval{
    background-color: grey;
}
.application-rejected{
    width: 70px;
    height: 20px;
    margin-right: 5px;
    border: 1px solid #52C41A;
    cursor: pointer;
    background-color: white;
}

.active-app-rejected{
    background-color: #52C41A;  
}

</style>
  