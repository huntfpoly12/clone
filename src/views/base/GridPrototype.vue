<template>
        <div class="content">
            <table id="customers" cellspacing="0" cellpadding="0">
                <tbody>
                    <!-- Row A -->
                    <tr>
                        <td>
                            <table>
                                <tr>
                                    <td colspan="6" style="width:30%">
                                        ① 신고구분 
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
                                        소득<br>처분
                                    </td>
                                    <td>
                                        환급<br>신청
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
                                    <td  rowspan="4">
                                        원천징수<br>
                                        의무자<br>
                                    </td>
                                    <td rowspan="2">
                                        법인명(상호)
                                    </td>
                                    <td rowspan="2">
                                        &nbsp;
                                    </td>
                                    <td rowspan="2">
                                        대표자(성명)
                                    </td>
                                    <td rowspan="2">
                                        &nbsp;
                                    </td>
                                    <td>
                                        일괄납부 여부
                                    </td>
                                    <td>
                                        여, 부
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        사업자단위과세 여부
                                    </td>
                                    <td>
                                        여, 부
                                    </td>
                                </tr>
                                <tr>
                                    <td  rowspan="2">
                                        사업자(주민)<br>
                                        등록번호
                                    </td>
                                    <td rowspan="2">
                                        11
                                    </td>
                                    <td rowspan="2">
                                        사업장소재지 
                                    </td>
                                    <td rowspan="2">
                                        11
                                    </td>
                                    <td>
                                        전화번호
                                    </td>
                                    <td>
                                        &nbsp;
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        전자우편주소
                                    </td>
                                    <td>
                                        @
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
                                    <tr><td colspan="13">1. 원천징수 내역 및 납부세액 (단위 : 원)</td></tr>
                                    <tr>
                                        <td rowspan="3"></td>
                                        <td colspan="3" rowspan="3">소득자 소득구분</td>
                                        <td rowspan="3">코드</td>
                                        <td colspan="5">원 천 징 수 명 세</td>
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
                                        <td rowspan="26">
                                            개<br>
                                            인<br>
                                            ⁀<br>
                                            거주<br>
                                            자ㆍ<br>
                                            비거<br>
                                            주자<br>
                                            ⌣
                                        </td>
                                        <td rowspan="7">
                                            근로<br>
                                            소득
                                        </td>
                                        <td colspan="2">간이세액</td><td>A01</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td class="disable-cell">1</td><td class="disable-cell">1</td>
                                    </tr>
                                    <tr><td colspan="2">중도퇴사</td><td>A02</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td class="disable-cell">1</td><td class="disable-cell">1</td></tr>
                                    <tr><td colspan="2">일용근로</td><td>A03</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td class="disable-cell">1</td><td class="disable-cell">1</td><td class="disable-cell">1</td></tr>
                                    <tr>
                                        <td rowspan="3">
                                            연말<br>
                                            정산
                                        </td>
                                        <td>합계</td><td>A04</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td class="disable-cell">1</td><td class="disable-cell">1</td>
                                    </tr>
                                    <tr><td>분납신청</td><td>A05</td><td>1</td><td class="disable-cell">1</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td class="disable-cell">1</td><td class="disable-cell">1</td></tr>
                                    <tr><td>납부금액</td><td>A06</td><td class="disable-cell">1</td><td class="disable-cell">1</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td class="disable-cell">1</td><td class="disable-cell">1</td></tr>
                                    <tr><td colspan="2">가감계</td><td>A10</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <!---------------->
                                    <tr>
                                        <td rowspan="3">
                                            퇴직<br>
                                            소득
                                        </td>
                                        <td colspan="2">연금계좌</td>
                                        <td>A21</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td class="disable-cell">1</td>
                                    </tr>
                                    <tr><td colspan="2">그 외</td><td>A22</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td class="disable-cell">1</td></tr>
                                    <tr><td colspan="2">가감계</td><td>A20</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td></tr>
                                    <tr>
                                        <td rowspan="3">
                                            사업<br>
                                            소득
                                        </td>
                                        <td colspan="2">매월징수</td><td>A25</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td class="disable-cell">1</td><td class="disable-cell">1</td><td class="disable-cell">1</td>
                                    </tr>
                                    <tr><td colspan="2">연말정산</td><td>A26</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td class="disable-cell">1</td><td class="disable-cell">1</td></tr>
                                    <tr><td colspan="2">가감계</td><td>A30</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <!---------------->
                                    <tr>
                                        <td rowspan="5">
                                            기타<br>
                                            소득
                                        </td>
                                        <td colspan="2">연금계좌</td><td>A41</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td class="disable-cell">1</td></tr>
                                    <tr>
                                        <td rowspan="2">
                                            종교인<br>
                                            소득
                                        </td>
                                        <td>매월징수</td><td>A43</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td class="disable-cell">1</td></tr>
                                    <tr><td>연말정산</td><td>A44</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td class="disable-cell">1</td></tr>
                                    <tr><td colspan="2">그 외</td><td>A42</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td class="disable-cell">1</td></tr>
                                    <tr><td colspan="2">가감계</td><td>A40</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td></tr>
                                    <!---------------->                                  
                                    <tr>
                                        <td rowspan="4">
                                            연<br>
                                            금<br>
                                            소<br>
                                            득
                                        </td>
                                        <td colspan="2">연금계좌</td><td>A48</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td class="disable-cell">1</td><td class="disable-cell">1</td><td class="disable-cell">1</td>
                                    </tr>
                                    <tr><td colspan="2">공적연금 매월 (매월)</td><td>A45</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td class="disable-cell">1</td><td class="disable-cell">1</td><td class="disable-cell">1</td></tr>
                                    <tr><td colspan="2">연말정산</td><td>A46</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td class="disable-cell">1</td><td class="disable-cell">1</td><td class="disable-cell">1</td></tr>
                                    <tr><td colspan="2">가감계</td><td>A47</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td></tr>
                                    <tr><td colspan="3">이자소득</td><td>A50</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td colspan="3">배당소득</td><td>A60</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td colspan="3">저축 등 해지 추징세액 등</td><td>A69</td><td>1</td><td class="disable-cell">1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td></tr>
                                    <tr><td colspan="3">비거주자 양도소득</td><td>A70</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td></tr>
                                    <tr><td>법인</td><td colspan="3">내ㆍ외국법인원천</td><td>A80</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td><td>1</td><td>1</td><td>1</td><td class="disable-cell">1</td></tr>
                                    <tr><td colspan="4">수정신고 세액 (세액)</td><td>A90</td><td class="disable-cell">1</td><td class="disable-cell">1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                    <tr><td colspan="4">총 합 계</td><td>A99</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <!-- Row c -->
                    <tr>
                        <td>
                            <table cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr><td colspan="11">❷ 환급세액 조정 (단위:원) </td></tr>
                                    <tr>
                                        <td colspan="3">전월 미환급 세액의 계산</td>
                                        <td colspan="4">당월 발생 환급세액 </td>
                                        <td rowspan="3">󰊉󰊚
                                            󰊉󰊚<br>
                                            조정대상<br>
                                            환급세액<br>
                                            ( + ⑭ 󰊉󰊗 󰊉󰊘<br>
                                            󰊉󰊙)
                                        </td>
                                        <td rowspan="3">
                                            󰊉󰊛<br>
                                            당월조정 환<br>
                                            급세액계
                                        </td>
                                        <td rowspan="3">
                                            󰊊󰊒<br>
                                            차월이월<br>
                                            환급세액<br>
                                            (󰊉󰊚 󰊉󰊛)
                                        </td>
                                        <td rowspan="3">
                                            󰊊󰊓<br>
                                            전월<br>
                                            신청액
                                        </td>
                                    </tr>
                                    <tr>
                                        <td rowspan="2">  
                                             ⑫ 전월<br>
                                            미환급세액
                                        </td>
                                        <td rowspan="2">
                                            ⑬ 기환급<br>
                                            신청세액
                                        </td>
                                        <td rowspan="2">
                                            ⑭ 차감잔액<br>
                                            (⑫ - ⑬)
                                        </td>
                                        <td rowspan="2">
                                            ⑮ 일반<br>
                                            환급
                                        </td>
                                        <td rowspan="2">
                                            󰊉󰊘 신탁재산<br>
                                            (금융<br>
                                            회사 등)
                                        </td>
                                        <td colspan="2">
                                            󰊉󰊙 그 밖의 환급<br>
                                            세액
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            금융<br>
                                            회사등
                                        </td>
                                        <td>합병 등</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <!-- Row D -->
                    <tr>
                        <td>
                            <table cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td rowspan="5">
                                            원천징수의무자는 「소득세법 시행령」 제185조제 항에 따라 위의 내용을 제출<br>
                                            하며, 위 내용을 충분히 검토하였고 원천징수의무자가 알고 있는 사실 그대로를<br>
                                            정확하게 적었음을 확인합니다. <br>
                                            년 월 일 <br>
                                            신고인                 (서명 또는 인)  
                                        </td>
                                        <td colspan="2">
                                            신고서 부표 등 작성 여부<br>
                                            ※ 해당란에 표시를 합니다 " " .
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <table cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr><td>부표(4∼5쪽)</td><td>환급 (7쪽∼쪽9)</td><td>승계명세(10쪽)</td></tr>
                                                    <tr><td> &nbsp;</td><td> &nbsp;</td><td> &nbsp;</td></tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr><td colspan="2">세무대리인</td></tr>
                                    <tr><td>성 명</td><td> &nbsp;</td></tr>
                                    <tr><td>사업자등록번호</td><td> &nbsp;</td></tr>
                                    <tr>
                                        <td rowspan="5">
                                            세무대리인은 조세전문자격자로서 위 신고서를 성실하고 공정하게 작성하였음을 확인<br>
                                            합니다.
                                            세무대리인 (서명 또는 인 )<br>
                                            세 무 서 장   귀하 
                                        </td>
                                        <td>전화번호</td><td> &nbsp;</td></tr> 
                                    <tr>
                                        <td colspan="2">
                                        국세환급금 계좌신고<br>
                                        ※ 환급금액 2천만원 미만인 경우에만 적습니다 .
                                        </td>
                                    </tr>
                                    <tr><td>예입처</td><td> &nbsp;</td></tr>
                                    <tr><td>예금종류</td><td> &nbsp;</td></tr>
                                    <tr><td>계좌번호</td><td> &nbsp;</td></tr>
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

.disable-cell{
    background-color: gray;
}
</style>
