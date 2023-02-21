<template>
  <div class="grid grid-cols-10">
    <div class="row-span-4 header">
      <p class="header">피부양자</p>
    </div>
    <div class="row-span-2 header">
      <p class="header header">성명</p>
    </div>
    <div class="row-span-2 header">
      <p class="header">성명</p>
    </div>
    <div class="col-span-2 header">장애인, 극가유공자 부호</div>
    <div class="col-span-3 header">외국인</div>
    <div class="col-span-2 header">관계</div>
    <div>종별부호</div>
    <div>등록일</div>
    <div>등록국적일</div>
    <div>체류자격</div>
    <div>체류기간</div>
    <div>관계 코드</div>
    <div>내용</div>
    <div>(2)</div>
    <div>(3)</div>
    <div>(4)</div>
    <div></div>
    <div>(5)</div>
    <div>(6)</div>
    <div>(7)</div>
    <div>(8)</div>
    <div>(9)</div>
    <div>{{ data.name }}</div>
    <div>{{ data.residentId }}</div>
    <div></div>
    <div>{{ data.nationalityNumber }}</div>
    <div>{{ data.stayQualification }}</div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>
<script lang="ts">
import { ref, watch, defineComponent } from "vue";

export default defineComponent({
  props: {
    data: {
      default: {
        name: "",
        residentId: "",
        joinedAt: "",
        totalPay: "",
        president: "",
        nationalityNumber: "",
        nationalityCode: "",
        stayQualification: "",
      },
    },
  },
  setup(props) {
    const data = ref({
      name: "",
      residentId: "",
      joinedAt: "",
      totalPay: "",
      president: "",
      nationalityNumber: "",
      nationalityCode: "",
      stayQualification: "",
    });
    watch(props, (newData) => {
      data.value =  newData.data
    });

    return {
      props,
    };
  },
});
</script>
<style scoped lang="scss">
.grid {
  display: grid;
  gap: 2px;
  min-height: 120px;
  text-align: center;
  .header {
    height: 100%;
    color: white;
    font-size: 13px;
    font-weight: bold;
    background-color: rgb(91, 128, 185);
  }
  div {
    background-color: rgb(233, 236, 243);
    min-height: 30px;
  }
}
.grid-cols-10 {
  grid-template-columns: repeat(10, minmax(0, 1fr));
}
.row-span-2 {
  grid-row: span 2 / span 2;
}
.row-span-4 {
  grid-row: span 4 / span 4;
}
.col-span-2 {
  grid-column: span 2 / span 2;
}
.col-span-3 {
  grid-column: span 3 / span 3;
}
.col-span-4 {
  grid-column: span 4 / span 4;
}

.justify-items-center {
  justify-items: center;
}
.items-center {
  align-items: center;
}
</style>
