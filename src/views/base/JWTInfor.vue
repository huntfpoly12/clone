<template>
  <div style="padding: 10px; ">
    companyId : {{ jwtObject.companyId }}<br/>
    userType : {{ jwtObject.userType }}<br/>
    isExpired : {{jwtObject.isExpired()}}<br/>
    userId : {{ jwtObject.userId }} <br/>
    ip : {{ jwtObject.ip }} <br/>
    hasReadScreenRole CONTRACT_MANAGE : {{ jwtObject.hasReadScreenRole(AdminScreenRole.CONTRACT_MANAGE) }} <br/>
    hasWriteScreenRole CONTRACT_MANAGE : {{ jwtObject.hasWriteScreenRole(AdminScreenRole.CONTRACT_MANAGE) }}<br/>
    <ul>
      <li v-for="item in infos">
        id : {{ item.id }} - startYearMonth : {{ item.startYearMonth }} - additionalServiceTypes : {{ item.additionalServiceTypes }}
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
    </ul>
    <br/>
  <pre style="height: 600px;"> {{ jwtObject }} </pre>
  </div>

</template>

<script lang="ts">
import { getJwtObject,AdminScreenRole  } from "@bankda/jangbuda-common";
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const token  = sessionStorage.getItem("token")
    const jwtObject = getJwtObject(token!);
    const infos = jwtObject.accounting;
    const info = jwtObject.withholding;
    console.log(info?.startYearMonth); // start year/month (YYYY-MM) (시작년월)
    console.log(info?.additionalServiceTypes); // additional service type array (부가서비스목록)
    console.log(jwtObject.writeAdminScreenRoles);
    return {
      jwtObject,
      AdminScreenRole ,
      infos
    }
   }
});
</script> 
<style lang="scss" scoped>

</style>
