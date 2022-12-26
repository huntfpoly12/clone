<template>
        <div class="content">
            <table id="customers" cellspacing="0" cellpadding="0">
                <tbody>
                    <!-- Row A -->
                    <tr>
                        <td>
                            <table>
                                <tr>
                                    <td colspan="5" style="width:30%">
                                        ①신고구분
                                    </td>
                                    <td colspan="7" rowspan="2"
                                        style="width:30%">
                                        원 천 징 수 이 행 상 황 신 고 서
                                    </td>
                                    <td colspan="3">
                                        ②귀속연월 
                                    </td>
                                    <td colspan="2">
                                        년 월
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        매월
                                    </td>
                                    <td>
                                        반기
                                    </td>
                                    <td>
                                        수정
                                    </td>
                                    <td>
                                        연말
                                    </td>
                                    <td>
                                        소득처분
                                    </td>

                                    <td colspan="3">
                                        ③지급연월
                                    </td>
                                    <td colspan="2">
                                        년 월
                                    </td>
                                </tr>
                            </table>
                            <table>
                                <tr>
                                    <td colspan="2" rowspan="3">
                                        원 천<br>
                                        징 수<br>
                                        의무자<br>
                                    </td>
                                    <td colspan="3">
                                        법인명(상호)
                                    </td>
                                    <td colspan="4">
                                        &nbsp;
                                    </td>
                                    <td colspan="3">
                                        대표자(성명)
                                    </td>
                                    <td colspan="4">
                                        &nbsp;
                                    </td>
                                    <td colspan="3">
                                        일괄납부 여부
                                    </td>
                                    <td colspan="2">
                                        여, 부
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3" rowspan="3">
                                        사업자(주민)<br>
                                        등록번호
                                    </td>
                                    <td colspan="4" rowspan="2">
                                        11
                                    </td>
                                    <td colspan="3" rowspan="2">
                                        사업장<br>
                                        소재지 
                                    </td>
                                    <td colspan="4" rowspan="2">
                                        11
                                    </td>
                                    <td colspan="3" rowspan="2">
                                        전화번호
                                    </td>
                                    <td colspan="2" rowspan="2">
                                        &nbsp;
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>
                    <!-- Row B -->
                    <tr>
                        <td>
                            <table cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr><td colspan="12">1. 원천징수 내역 및 납부세액 (단위 : 원)</td></tr>
                                    <tr>
                                        <td rowspan="3"></td>
                                        <td colspan="2" rowspan="3">구 분</td>
                                        <td rowspan="3">코드</td>
                                        <td colspan="5">원 천 징 수 내 역</td>
                                        <td rowspan="3">
                                            ⑨<br>
                                            당월 조정<br>
                                            환급세액<br>
                                        </td>
                                        <td colspan="2">납부 세액</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            소 득 지 급<br>
                                            (과세 미달, 비과세 포함)
                                        </td>
                                        <td colspan="3">징수세액</td>
                                        <td rowspan="2">
                                            ⑩<br>
                                            소득세 등<br>
                                            (가산세 포함)<br>
                                        </td>
                                        <td rowspan="2">
                                            ⑪
                                            농어촌
                                            특별세
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>④인원</td>
                                        <td>⑤총지급액 </td>
                                        <td>⑥소득세 등</td>
                                        <td>
                                            ⑦농어촌<br>
                                            특별세
                                        </td>
                                        <td>⑧가산세</td>
                                    </tr>
                                    <!---------------->
                                    <tr>
                                        <td rowspan="5">
                                            근<br>
                                            로<br>
                                            소<br>
                                            득
                                        </td>
                                        <td>간이세액 </td><td>A01</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td>
                                    </tr>
                                    <tr><td>중도퇴사</td><td>A02</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td>일용근로</td><td>A03</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td>연말정산</td><td>A04</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td>가감계</td><td>A10</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <!---------------->
                                    <tr><td colspan="2">퇴직소득</td><td>A20</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td rowspan="3">사<br>
                                        업<br>
                                        소<br>
                                        득
                                    </td>
                                    <td>매월징수</td><td>A25</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td>연말정산</td><td>A26</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td>가감계</td><td>A30</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <!---------------->
                                    <tr><td colspan="2">1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td rowspan="3">1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td>1xs</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <!---------------->
                                    <tr><td colspan="2">1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td colspan="2">1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td colspan="2">1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td colspan="2">1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td colspan="2">1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td colspan="2">1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td colspan="2">1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td colspan="2">1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td colspan="2">1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td colspan="2">1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <!-- Row c -->
                    <tr>
                        <td>
                            <table cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr><td colspan="9">12</td></tr>
                                    <tr><td colspan="3">12</td><td colspan="3">12</td><td rowspan="2">12</td><td rowspan="2">12</td><td rowspan="2">12</td></tr>
                                    <tr><td>12</td><td>12</td><td>12</td><td>12</td><td>12</td><td>12</td></tr>
                                    <tr><td>12</td><td>12</td><td>12</td><td>12</td><td>12</td><td>12</td><td>12</td><td>12</td><td>12</td></tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <!-- Row D -->
                    <tr>
                        <td>
                            <table cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr><td rowspan="7">13</td><td colspan="2">13</td></tr>
                                    <tr><td>13</td><td>13</td></tr>
                                    <tr><td>13</td><td>13</td></tr>

                                    <tr><td colspan="2">13</td></tr>
                                    <tr><td>13</td><td>13</td></tr>
                                    <tr><td>13</td><td>13</td></tr>
                                    <tr><td>13</td><td>13</td></tr> 
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  data() {
      return {
          styles: {
              main: this.$config_styles.Main,
          },
      };
  },
});
</script> 

<style lang="scss" scoped>
table {
    width: 100%;
    border-collapse: collapse;
    border-bottom:none;
    border-left:none;
    border-right:none;
    border-top:none;
}
.content{
    text-align: center;
    margin: 5px 400px;
    width: 100%;
}
#customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 900px;
}

#customers td,
#customers th {
    border: 0.5px solid #ddd;
   
}
#customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04AA6D;
    color: white;
}
</style>
