<template>
  <div style="padding: 10px; ">
    companyId : {{ jwtObject.companyId }}<br/>
    userType : {{ jwtObject.userType }}<br/>
    isExpired : {{jwtObject.isExpired()}}<br/>
    time Expired : {{dayjs(jwtObject.expiredTime).format('YYYY-MM-DDTHH:mm:ssZ[Z]')}} --- <a-tag color="#f50">{{ timeRemaining }}</a-tag><br/>
    userId : {{ jwtObject.userId }} <br/>
    ip : {{ jwtObject.ip }} <br/>
    managerGrade : {{ jwtObject.managerGrade }} <br/>
    hasReadScreenRole CONTRACT_MANAGE : {{ jwtObject.hasReadScreenRole(AdminScreenRole.CONTRACT_MANAGE) }} <br/>
    hasWriteScreenRole CONTRACT_MANAGE : {{ jwtObject.hasWriteScreenRole(AdminScreenRole.CONTRACT_MANAGE) }}<br/>
    <a-row>
      <a-col span="12">
        <div style="padding: 5px; height: 600px; border: 1px solid; overflow: scroll;">
        accounting :
        <ul>
        <li v-for="item in infos">
          facilityBusinessId : {{ item.id }} - startYearMonth : {{ item.startYearMonth }} - additionalServiceTypes : {{ item.additionalServiceTypes }}
        </li>
        </ul>
        <br/>
        withholding :
        <ul>
        <li >
          startYearMonth : {{ info?.startYearMonth }}
        </li>
        <li >
          additionalServiceTypes : {{ info?.additionalServiceTypes }}
        </li>
        </ul>
        <br/>
        readAdminScreenRoles : 
        <ul>
          <li v-for="item in jwtObject.readAdminScreenRoles">
            {{ item.name }} - {{ item.enumKey }}
          </li>
        </ul>
        <br/>
        writeAdminScreenRoles:
        <ul>
          <li v-for="item in jwtObject.writeAdminScreenRoles">
            {{ item.name }} - {{ item.enumKey }}
          </li>
        </ul> <br/>
        readWotkScreenRoles:
        <ul>
          <li v-for="item in jwtObject.readWotkScreenRoles">
            {{ item.name }} - {{ item.enumKey }}
          </li>
        </ul> <br/>
        writeWorkScreenRoles:
        <ul>
          <li v-for="item in jwtObject.writeWorkScreenRoles">
            {{ item.name }} - {{ item.enumKey }}
          </li>
        </ul> <br/>
        </div>
        
      </a-col>
      <a-col span="12">
        <pre style="height: 600px; border: 1px solid;"> {{ jwtObject }} </pre>
      </a-col>
    </a-row>
  </div>

</template>

<script lang="ts">
import { getJwtObject,AdminScreenRole  } from "@bankda/jangbuda-common";
import { computed, defineComponent, onMounted, ref } from "vue";
import dayjs from "dayjs";

export default defineComponent({
  setup() {
    const token  = ref(sessionStorage.getItem("token"))
    const now = ref(dayjs().valueOf())
    const infos = ref();
    const info = ref();
    let jwtObject = getJwtObject(token.value!);
    const timeRemaining = computed(() => {
      jwtObject = getJwtObject(token.value!);
      let expirationTime = jwtObject.expiredTime
      infos.value = jwtObject.accounting;
      info.value = jwtObject.withholding;

      const remaining = expirationTime - now.value;
      const hoursRemaining = Math.floor(remaining / (1000 * 60 * 60));
      const minutesRemaining = Math.floor((remaining / (1000 * 60)) % 60);
      const secondsRemaining = Math.floor((remaining / 1000) % 60);
      return `${hoursRemaining} 시간 ${minutesRemaining} 분 ${secondsRemaining} 초`;
    });

    const intervalId = setInterval(() => {
      now.value = dayjs().valueOf();
    }, 1000);
    onMounted(() => {
      now.value = dayjs().valueOf();
    });
    return {
      jwtObject,
      AdminScreenRole ,
      infos,
      info,
      dayjs,
      timeRemaining
    }
   }
});
</script> 
<style lang="scss" scoped>

</style>
