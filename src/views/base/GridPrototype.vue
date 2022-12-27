<template>
  <div class="content">
    <table id="customers" cellspacing="0" cellpadding="0">
      <tbody>
        <!-- Row A -->
        <tr>
          <td>
            <table>
              <tr>
                <td colspan="6" style="width: 30%">① 신고구분</td>
                <td colspan="7" rowspan="2" style="width: 39%">
                  <div class="header-text">
                    []원 천 징 수 이 행 상 황 신 고 서<br />
                    []원 천 징 수 세 액 확 급 신 청 서
                  </div>
                </td>
                <td colspan="3">②귀속연월</td>
                <td colspan="2">년 월</td>
              </tr>
              <tr>
                <td>매월</td>
                <td>반기</td>
                <td>수정</td>
                <td>연말</td>
                <td>소득<br />처분</td>
                <td>환급<br />신청</td>
                <td colspan="3">③지급연월</td>
                <td colspan="2" >년 월</td>
              </tr>
            </table>
            <table>
              <tr>
                <td rowspan="4">
                  원천징수<br />
                  의무자<br />
                </td>
                <td rowspan="2">법인명(상호)</td>
                <td rowspan="2">&nbsp;</td>
                <td rowspan="2">대표자(성명)</td>
                <td rowspan="2">&nbsp;</td>
                <td >일괄납부 여부</td>
                <td style="width: 87px;">여, 부</td>
              </tr>
              <tr>
                <td>사업자단위과세 여부</td>
                <td>여, 부</td>
              </tr>
              <tr>
                <td rowspan="2">
                  사업자(주민)<br />
                  등록번호
                </td>
                <td rowspan="2" style="width: 140px;"></td>
                <td rowspan="2">사업장소재지</td>
                <td rowspan="2" style="width: 140px;"></td>
                <td>전화번호</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>전자우편주소</td>
                <td>@</td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Row B -->
        <tr>
          <td>
            <table cellspacing="0" cellpadding="0">
              <tbody>
                <tr>
                  <td colspan="13">
                    <div class="header-detail-1">
                      <div class="header-left-1">1. 원천징수 내역 및 납부세액</div>
                      <div class="header-right-1">(단위 : 원)</div>
                    </div> 
                  </td>
                </tr>
                <tr>
                  <td rowspan="3"></td>
                  <td colspan="3" rowspan="3">소득자 소득구분</td>
                  <td rowspan="3">코드</td>
                  <td colspan="5">원 천 징 수 명 세</td>
                  <td rowspan="3">
                    ⑨<br />
                    당월 조정<br />
                    환급세액<br />
                  </td>
                  <td colspan="2">납부 세액</td>
                </tr>
                <tr>
                  <td colspan="2">
                    소 득 지 급<br />
                    (과세 미달, 비과세 포함)
                  </td>
                  <td colspan="3">징수세액</td>
                  <td rowspan="2">
                    ⑩<br />
                    소득세 등<br />
                    (가산세 포함)<br />
                  </td>
                  <td rowspan="2">⑪ 농어촌 특별세</td>
                </tr>
                <tr>
                  <td>④인원</td>
                  <td>⑤총지급액</td>
                  <td>⑥소득세 등</td>
                  <td>
                    ⑦농어촌<br />
                    특별세
                  </td>
                  <td>⑧가산세</td>
                </tr>
                <!---------------->
                <tr>
                  <td rowspan="26">
                    개<br />
                    인<br />
                    ⁀<br />
                    거주<br />
                    자ㆍ<br />
                    비거<br />
                    주자<br />
                    ⌣
                  </td>
                  <td rowspan="7">
                    근로<br />
                    소득
                  </td>
                  <td colspan="2">간이세액</td>
                  <td>A01</td>
                  <td>
                      <input-table name="A01C01" v-model:valueInput="data.A01C01" @keyup.enter="openInput"></input-table>
                  </td>
                  <td>
                    <input-table name="A01C02" v-model:valueInput="data.A01C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A01C03" v-model:valueInput="data.A01C03"></input-table>
                  </td>
                  <td>
                    <input-table name="A01C04" v-model:valueInput="data.A01C04"></input-table>
                  </td>
                  <td>
                    <input-table name="A01C05" v-model:valueInput="data.A01C05"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td colspan="2">중도퇴사</td>
                  <td>A02</td>
                  <td>
                    <input-table name="A02C01" v-model:valueInput="data.A02C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A02C02" v-model:valueInput="data.A02C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A02C03" v-model:valueInput="data.A02C03"></input-table>
                  </td>
                  <td>
                    <input-table name="A02C04" v-model:valueInput="data.A02C04"></input-table>
                  </td>
                  <td>
                    <input-table name="A02C05" v-model:valueInput="data.A02C05"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td colspan="2">일용근로</td>
                  <td>A03</td>
                  <td>
                    <input-table name="A03C01" v-model:valueInput="data.A03C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A03C02" v-model:valueInput="data.A03C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A03C03" v-model:valueInput="data.A03C03"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A03C05" v-model:valueInput="data.A03C05"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td rowspan="3">
                    연말<br />
                    정산
                  </td>
                  <td>합계</td>
                  <td>A04</td>
                  <td>
                    <input-table name="A04C01" v-model:valueInput="data.A04C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A04C02" v-model:valueInput="data.A04C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A04C03" v-model:valueInput="data.A04C03"></input-table>
                  </td>
                  <td>
                    <input-table name="A04C04" v-model:valueInput="data.A04C04"></input-table>
                  </td>
                  <td>
                    <input-table name="A04C05" v-model:valueInput="data.A04C05"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td>분납신청</td>
                  <td>A05</td>
                  <td>
                    <input-table name="A05C01" v-model:valueInput="data.A05C01"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A05C03" v-model:valueInput="data.A05C03"></input-table>
                  </td>
                  <td>
                    <input-table name="A05C04" v-model:valueInput="data.A05C04"></input-table>
                  </td>
                  <td>
                    <input-table name="A05C05" v-model:valueInput="data.A05C05"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td>납부금액</td>
                  <td>A06</td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A06C03" v-model:valueInput="data.A06C03"></input-table>
                  </td>
                  <td>
                    <input-table name="A06C04" v-model:valueInput="data.A06C04"></input-table>
                  </td>
                  <td>
                    <input-table name="A06C05" v-model:valueInput="data.A06C05"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td colspan="2">가감계</td>
                  <td>A10</td>
                  <td>
                    <input-table name="A10C01" v-model:valueInput="data.A10C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A10C02" v-model:valueInput="data.A10C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A10C03" v-model:valueInput="data.A10C03"></input-table>
                  </td>
                  <td>
                    <input-table name="A10C04" v-model:valueInput="data.A10C04"></input-table>
                  </td>
                  <td>
                    <input-table name="A10C05" v-model:valueInput="data.A10C05"></input-table>
                  </td>
                  <td>
                    <input-table name="A10C06" v-model:valueInput="data.A10C06"></input-table>
                  </td>
                  <td>
                    <input-table name="A10C07" v-model:valueInput="data.A10C07"></input-table>
                  </td>
                  <td>
                    <input-table name="A10C08" v-model:valueInput="data.A10C08"></input-table>
                  </td>
                </tr>
                <!---------------->
                <tr>
                  <td rowspan="3">
                    퇴직<br />
                    소득
                  </td>
                  <td colspan="2">연금계좌</td>
                  <td>A21</td>
                  <td>
                    <input-table name="A21C01" v-model:valueInput="data.A21C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A21C02" v-model:valueInput="data.A21C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A21C03" v-model:valueInput="data.A21C03"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A21C04" v-model:valueInput="data.A21C04"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A21C07" v-model:valueInput="data.A21C07"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td colspan="2">그 외</td>
                  <td>A22</td>
                  <td>
                    <input-table name="A22C01" v-model:valueInput="data.A22C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A22C02" v-model:valueInput="data.A22C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A22C03" v-model:valueInput="data.A22C03"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A22C05" v-model:valueInput="data.A22C05"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A22C07" v-model:valueInput="data.A22C07"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td colspan="2">가감계</td>
                  <td>A20</td>
                  <td>
                    <input-table name="A20C01" v-model:valueInput="data.A20C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A20C02" v-model:valueInput="data.A20C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A20C03" v-model:valueInput="data.A20C03"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A20C05" v-model:valueInput="data.A20C05"></input-table>
                  </td>
                  <td>
                    <input-table name="A20C06" v-model:valueInput="data.A20C06"></input-table>
                  </td>
                  <td>
                    <input-table name="A20C07" v-model:valueInput="data.A20C07"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td rowspan="3">
                    사업<br />
                    소득
                  </td>
                  <td colspan="2">매월징수</td>
                  <td>A25</td>
                  <td>
                    <input-table name="A25C01" v-model:valueInput="data.A25C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A25C02" v-model:valueInput="data.A25C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A25C03" v-model:valueInput="data.A25C03"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A25C05" v-model:valueInput="data.A25C05"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td colspan="2">연말정산</td>
                  <td>A26</td>
                  <td>
                    <input-table name="A26C01" v-model:valueInput="data.A26C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A26C02" v-model:valueInput="data.A26C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A26C03" v-model:valueInput="data.A26C03"></input-table>
                  </td>
                  <td>
                    <input-table name="A26C04" v-model:valueInput="data.A26C04"></input-table>
                  </td>
                  <td>
                    <input-table name="A26C05" v-model:valueInput="data.A26C05"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td colspan="2">가감계</td>
                  <td>A30</td>
                  <td>
                    <input-table name="A30C01" v-model:valueInput="data.A30C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A30C02" v-model:valueInput="data.A30C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A30C03" v-model:valueInput="data.A30C03"></input-table>
                  </td>
                  <td>
                    <input-table name="A30C04" v-model:valueInput="data.A30C04"></input-table>
                  </td>
                  <td>
                    <input-table name="A30C05" v-model:valueInput="data.A30C05"></input-table>
                  </td>
                  <td>
                    <input-table name="A30C06" v-model:valueInput="data.A30C06"></input-table>
                  </td>
                  <td>
                    <input-table name="A30C07" v-model:valueInput="data.A30C07"></input-table>
                  </td>
                  <td>
                    <input-table name="A30C08" v-model:valueInput="data.A30C08"></input-table>
                  </td>
                </tr>
                <!---------------->
                <tr>
                  <td rowspan="5">
                    기타<br />
                    소득
                  </td>
                  <td colspan="2">연금계좌</td>
                  <td>A41</td>
                  <td>
                    <input-table name="A41C01" v-model:valueInput="data.A41C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A41C02" v-model:valueInput="data.A41C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A41C03" v-model:valueInput="data.A41C03"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A41C05" v-model:valueInput="data.A41C05"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A41C07" v-model:valueInput="data.A41C07"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td rowspan="2">
                    종교인<br />
                    소득
                  </td>
                  <td>매월징수</td>
                  <td>A43</td>
                  <td>
                    <input-table name="A43C01" v-model:valueInput="data.A43C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A43C02" v-model:valueInput="data.A43C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A43C03" v-model:valueInput="data.A43C03"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A43C05" v-model:valueInput="data.A43C05"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A43C07" v-model:valueInput="data.A43C07"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td>연말정산</td>
                  <td>A44</td>
                  <td>
                    <input-table name="A44C01" v-model:valueInput="data.A44C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A44C02" v-model:valueInput="data.A44C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A44C03" v-model:valueInput="data.A44C03"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A44C05" v-model:valueInput="data.A44C05"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A44C07" v-model:valueInput="data.A44C07"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td colspan="2">그 외</td>
                  <td>A42</td>
                  <td>
                    <input-table name="A42C01" v-model:valueInput="data.A42C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A42C02" v-model:valueInput="data.A42C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A42C03" v-model:valueInput="data.A42C03"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A42C05" v-model:valueInput="data.A42C05"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A42C07" v-model:valueInput="data.A42C07"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td colspan="2">가감계</td>
                  <td>A40</td>
                  <td>
                    <input-table name="A40C01" v-model:valueInput="data.A40C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A40C02" v-model:valueInput="data.A40C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A40C03" v-model:valueInput="data.A40C03"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A40C05" v-model:valueInput="data.A40C05"></input-table>
                  </td>
                  <td>
                    <input-table name="A40C06" v-model:valueInput="data.A40C06"></input-table>
                  </td>
                  <td>
                    <input-table name="A40C07" v-model:valueInput="data.A40C07"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                </tr>
                <!---------------->
                <tr>
                  <td rowspan="4">
                    연<br />
                    금<br />
                    소<br />
                    득
                  </td>
                  <td colspan="2">연금계좌</td>
                  <td>A48</td>
                  <td>
                    <input-table name="A48C01"  v-model:valueInput="data.A48C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A48C02" v-model:valueInput="data.A48C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A48C03" v-model:valueInput="data.A48C03"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A48C05" v-model:valueInput="data.A48C05"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td colspan="2">공적연금 매월 (매월)</td>
                  <td>A45</td>
                  <td>
                    <input-table name="A45C01" v-model:valueInput="data.A45C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A45C02" v-model:valueInput="data.A45C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A45C03" v-model:valueInput="data.A45C03"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A45C05" v-model:valueInput="data.A45C05"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td colspan="2">연말정산</td>
                  <td>A46</td>
                  <td>
                    <input-table name="A46C01" v-model:valueInput="data.A46C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A46C02" v-model:valueInput="data.A46C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A46C03" v-model:valueInput="data.A46C03"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A46C05" v-model:valueInput="data.A46C05"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td colspan="2">가감계</td>
                  <td>A47</td>
                  <td>
                    <input-table name="A47C01" v-model:valueInput="data.A47C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A47C02" v-model:valueInput="data.A47C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A47C03" v-model:valueInput="data.A47C03"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A47C05" v-model:valueInput="data.A47C05"></input-table>
                  </td>
                  <td>
                    <input-table name="A47C06" v-model:valueInput="data.A47C06"></input-table>
                  </td>
                  <td>
                    <input-table name="A47C07" v-model:valueInput="data.A47C07"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td colspan="3">이자소득</td>
                  <td>A50</td>
                  <td>
                    <input-table name="A50C01" v-model:valueInput="data.A50C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A50C02" v-model:valueInput="data.A50C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A50C03" v-model:valueInput="data.A50C03"></input-table>
                  </td>
                  <td>
                    <input-table name="A50C04" v-model:valueInput="data.A50C04"></input-table>
                  </td>
                  <td>
                    <input-table name="A50C05" v-model:valueInput="data.A50C05"></input-table>
                  </td>
                  <td>
                    <input-table name="A50C06" v-model:valueInput="data.A50C06"></input-table>
                  </td>
                  <td>
                    <input-table name="A50C07" v-model:valueInput="data.A50C07"></input-table>
                  </td>
                  <td>
                    <input-table name="A50C08" v-model:valueInput="data.A50C08"></input-table>
                  </td>
                </tr>
                <tr>
                  <td colspan="3">배당소득</td>
                  <td>A60</td>
                  <td>
                    <input-table name="A60C01" v-model:valueInput="data.A60C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A60C02" v-model:valueInput="data.A60C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A60C03" v-model:valueInput="data.A60C03"></input-table>
                  </td>
                  <td>
                    <input-table name="A60C04" v-model:valueInput="data.A60C04"></input-table>
                  </td>
                  <td>
                    <input-table name="A60C05" v-model:valueInput="data.A60C05"></input-table>
                  </td>
                  <td>
                    <input-table name="A60C06" v-model:valueInput="data.A60C06"></input-table>
                  </td>
                  <td>
                    <input-table name="A60C07" v-model:valueInput="data.A60C07"></input-table>
                  </td>
                  <td>
                    <input-table name="A60C08" v-model:valueInput="data.A60C08"></input-table>
                  </td>
                </tr>
                <tr>
                  <td colspan="3">저축 등 해지 추징세액 등</td>
                  <td>A69</td>
                  <td>
                    <input-table name="A69C01" v-model:valueInput="data.A69C01"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A69C03" v-model:valueInput="data.A69C03"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A69C05" v-model:valueInput="data.A69C05"></input-table>
                  </td>
                  <td>
                    <input-table name="A69C06" v-model:valueInput="data.A69C06"></input-table>
                  </td>
                  <td>
                    <input-table name="A69C07" v-model:valueInput="data.A69C07"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td colspan="3">비거주자 양도소득</td>
                  <td>A70</td>
                  <td>
                    <input-table name="A70C01" v-model:valueInput="data.A70C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A70C02" v-model:valueInput="data.A70C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A70C03" v-model:valueInput="data.A70C03"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A70C05" v-model:valueInput="data.A70C05"></input-table>
                  </td>
                  <td>
                    <input-table name="A70C06" v-model:valueInput="data.A70C06"></input-table>
                  </td>
                  <td>
                    <input-table name="A70C07" v-model:valueInput="data.A70C07"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td>법인</td>
                  <td colspan="3">내ㆍ외국법인원천</td>
                  <td>A80</td>
                  <td>
                    <input-table name="A80C01" v-model:valueInput="data.A80C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A80C02" v-model:valueInput="data.A80C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A80C03" v-model:valueInput="data.A80C03"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A80C05" v-model:valueInput="data.A80C05"></input-table>
                  </td>
                  <td>
                    <input-table name="A80C06" v-model:valueInput="data.A80C06"></input-table>
                  </td>
                  <td>
                    <input-table name="A80C07" v-model:valueInput="data.A80C07"></input-table>
                  </td>
                  <td class="disable-cell"></td>
                </tr>
                <tr>
                  <td colspan="4">수정신고 세액 (세액)</td>
                  <td>A90</td>
                  <td class="disable-cell"></td>
                  <td class="disable-cell"></td>
                  <td>
                    <input-table name="A90C03" v-model:valueInput="data.A90C03"></input-table>
                  </td>
                  <td>
                    <input-table name="A90C04" v-model:valueInput="data.A90C04"></input-table>
                  </td>
                  <td>
                    <input-table name="A90C05" v-model:valueInput="data.A90C05"></input-table>
                  </td>
                  <td>
                    <input-table name="A90C06" v-model:valueInput="data.A90C06"></input-table>
                  </td>
                  <td>
                    <input-table name="A90C07" v-model:valueInput="data.A90C07"></input-table>
                  </td>
                  <td>
                    <input-table name="A90C08" v-model:valueInput="data.A90C08"></input-table>
                  </td>
                </tr>
                <tr>
                  <td colspan="4">총 합 계</td>
                  <td>A99</td>
                  <td>
                    <input-table name="A99C01" v-model:valueInput="data.A99C01"></input-table>
                  </td>
                  <td>
                    <input-table name="A99C02" v-model:valueInput="data.A99C02"></input-table>
                  </td>
                  <td>
                    <input-table name="A99C03" v-model:valueInput="data.A99C03"></input-table>
                  </td>
                  <td>
                    <input-table name="A99C04" v-model:valueInput="data.A99C04"></input-table>
                  </td>
                  <td>
                    <input-table name="A99C05" v-model:valueInput="data.A99C05"></input-table>
                  </td>
                  <td>
                    <input-table name="A99C06" v-model:valueInput="data.A99C06"></input-table>
                  </td>
                  <td>
                    <input-table name="A99C07" v-model:valueInput="data.A99C07"></input-table>
                  </td>
                  <td>
                    <input-table name="A99C08" v-model:valueInput="data.A99C08"></input-table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <!-- Row c -->
        <tr>
          <td>
            <table cellspacing="0" cellpadding="0">
              <tbody>
                <tr>
                  <td colspan="11">
                    <div class="header-detail-2">
                       <div class="header-left-2">
                        2. 환급세액 조정 
                       </div>
                       <div class="header-right-2">
                        (단위:원)
                       </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="3">전월 미환급 세액의 계산</td>
                  <td colspan="4">당월 발생 환급세액</td>
                  <td rowspan="3">
                    󰊉󰊚 󰊉󰊚<br />
                    조정대상<br />
                    환급세액<br />
                    ( + ⑭ 󰊉󰊗 󰊉󰊘<br />
                    󰊉󰊙)
                  </td>
                  <td rowspan="3">
                    󰊉󰊛<br />
                    당월조정 환<br />
                    급세액계
                  </td>
                  <td rowspan="3">
                    󰊊󰊒<br />
                    차월이월<br />
                    환급세액<br />
                    (󰊉󰊚 󰊉󰊛)
                  </td>
                  <td rowspan="3">
                    󰊊󰊓<br />
                    전월<br />
                    신청액
                  </td>
                </tr>
                <tr>
                  <td rowspan="2">
                    ⑫ 전월<br />
                    미환급세액
                  </td>
                  <td rowspan="2">
                    ⑬ 기환급<br />
                    신청세액
                  </td>
                  <td rowspan="2">
                    ⑭ 차감잔액<br />
                    (⑫ - ⑬)
                  </td>
                  <td rowspan="2">
                    ⑮ 일반<br />
                    환급
                  </td>
                  <td rowspan="2">
                    󰊉󰊘 신탁재산<br />
                    (금융<br />
                    회사 등)
                  </td>
                  <td colspan="2">
                    󰊉󰊙 그 밖의 환급<br />
                    세액
                  </td>
                </tr>
                <tr>
                  <td>
                    금융<br />
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
                    <div class="footer-1">
                      <div class="footer-content-1">
                        <p style="text-indent: 20px;">원천징수의무자는 「소득세법 시행령」 제185조제 항에 따라 위의 내용을 제출<br>
                        하며, 위 내용을 충분히 검토하였고 원천징수의무자가 알고 있는 사실 그대로를<br>
                        정확하게 적었음을 확인합니다.</p>
                      </div>
                 
                      <p class="date-month"> 년 월 일</p> <br />
                      <div class="reporter-sign"><span  class="reporter">신고인</span><span class="sign">(서명 또는 인)</span></div>
                    </div>  
                  </td>
                  <td colspan="2">
                    신고서 부표 등 작성 여부<br />
                    ※ 해당란에 "&#9900;" 표시를 합니다  .
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <table cellspacing="0" cellpadding="0">
                      <tbody>
                        <tr>
                          <td>부표(4∼5쪽)</td>
                          <td>환급 (7쪽∼쪽9)</td>
                          <td>승계명세(10쪽)</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">세무대리인</td>
                </tr>
                <tr>
                  <td>성 명</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>사업자등록번호</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td rowspan="5">
                    <div class="footer-2">
                      <p>세무대리인은 조세전문자격자로서 위 신고서를 성실하고
                      공정하게 작성하였음을 확인 합니다.</p>
                       <div class="tax-agent">
                        <div>세무대리인귀하</div> 
                        <div class="sign">(서명 또는 인 )</div>
                      </div>
                      <p class="dear">세 무 서 장</p>
                    </div>
                  </td>
                  <td>전화번호</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td colspan="2">
                    국세환급금 계좌신고<br />
                    ※ 환급금액 2천만원 미만인 경우에만 적습니다 .
                  </td>
                </tr>
                <tr>
                  <td style="width: 160px;">예입처</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>예금종류</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>계좌번호</td>
                  <td>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import InputTable from "./InputTable.vue";
import {dataTabs} from "./dataTab"
export default defineComponent({
  components: {
    InputTable
  },
  setup() {
    const data = reactive({
        ...dataTabs
      })

    return {
      data
    }
  }
});
</script>

<style lang="scss" scoped src="./styles/GridPrototype.scss">
</style>
