import dayjs from "dayjs"

export const dataDefaultsUtil = {
    terms: false,
    personalInfo: false,
    accountingService: false,
    withholdingService: false,
    nameCompany: "",
    zipcode: "",
    roadAddress: "",
    jibunAddress: "",
    addressExtend: "",
    bcode: "",
    bname: "",
    buildingCode: "",
    buildingName: "",
    roadname: "",
    roadnameCode: "",
    sido: "",
    sigungu: "",
    sigunguCode: "",
    zonecode: "",
    phone: "",
    fax: "",
    licenseFileStorageId: 0,
    bizNumber: "",
    bizType: 1,
    residentId: "",
    namePresident: "",
    birthday: "",
    mobilePhone: "",
    email: "",
    longTermCareInstitutionNumber: "",
    facilityBizType: 1,
    accountingServiceTypes: 1,
    facilityBusinesses: [],
    startYearMonthHolding: parseInt(dayjs().format('YYYYMM')),
    capacityHolding: null,
    withholdingServiceTypes: 1,
    bankType: "",
    accountNumber: "",
    ownerBizNumber: "",
    withdrawDay: "5일",
    salesRepresentativeId: parseInt(''),
    comment: "",
    ownerName: "",
    registrationCardFileStorageId: 0
}

export const plainOptionsUtil = [
    {
        text: "신청합니다",
        id: 1
    }, {
        text: "신청하지않습니다",
        id: 2
    }
]

export const arrayRadioCheckUtil = [
    { id: 1, text: '법인사업자' },
    { id: 2, text: '개인사업자' },
]
export const arrayRadioCheckUtilStep3 = [
    { id: 1, text: '신청합니다' },
    { id: 2, text: '신청하지 않습니다' },
]

export const arrayRadioWithdrawDayUtil = [
    { id: '5일', text: '매월 5일' },
    { id: '12일', text: '매월 12일' },
    { id: '19일', text: '매월 19일' },
]
export const regesterInput1 =`
<p>제&nbsp;1&nbsp;장&nbsp;총칙</p>
<p>제1조&nbsp;(목적)&nbsp;본&nbsp;약관은&nbsp;(주)장부다(이하&nbsp;&apos;회사&apos;)가&nbsp;제공하는&nbsp;웹&nbsp;기반&nbsp;비영리법인&nbsp;시설&nbsp;운영&nbsp;및&nbsp;관리&nbsp;서비스를&nbsp;이용하는&nbsp;이용자(이하&nbsp;&apos;사용자&apos;)와&nbsp;회사&nbsp;간&nbsp;서비스&nbsp;이용에&nbsp;관한&nbsp;기본&nbsp;사항&nbsp;규정을&nbsp;목적으로&nbsp;합니다.</p>
<p>제2조&nbsp;(약관의&nbsp;효력과&nbsp;변경)&nbsp;①&nbsp;본&nbsp;약관은&nbsp;&apos;장부다&apos;&nbsp;홈페이지(<a href="http://www.jangbuda.co.kr/">www.jangbuda.co.kr</a>)에&nbsp;온라인으로&nbsp;이&nbsp;약관을&nbsp;명시하고, &quot;이용약관에&nbsp;동의합니다&quot;에&nbsp;클릭함으로써&nbsp;효력이&nbsp;발생됩니다.&nbsp;②&nbsp;회사는&nbsp;본&nbsp;약관을&nbsp;임의로&nbsp;변경할&nbsp;수&nbsp;있으며,&nbsp;변경된&nbsp;약관은&nbsp;변경된&nbsp;약관&nbsp;적용일&nbsp;전&nbsp;7일간&nbsp;&apos;장부다&apos;&nbsp;홈페이지(<a href="http://www.jangbuda.co.kr/">www.jangbuda.co.kr</a>)&nbsp;또는&nbsp;&apos;장부다&apos;내&nbsp;공지를&nbsp;통해&nbsp;이용자에게&nbsp;공지되고&nbsp;적용&nbsp;일에&nbsp;효력이&nbsp;발생됩니다.&nbsp;③&nbsp;이용자는&nbsp;변경된&nbsp;약관에&nbsp;동의하지&nbsp;않고&nbsp;서비스&nbsp;이용을&nbsp;중단,&nbsp;탈퇴할&nbsp;수&nbsp;있습니다.&nbsp;단,&nbsp;이용자가&nbsp;제2항&nbsp;방법&nbsp;등으로&nbsp;별도&nbsp;고지한&nbsp;바에&nbsp;따라&nbsp;변경된&nbsp;약관&nbsp;적용일로부터&nbsp;15일&nbsp;이내에&nbsp;회사에&nbsp;대해&nbsp;&quot;거부&quot;&nbsp;의사표시를&nbsp;하지&nbsp;아니하는&nbsp;경우에는&nbsp;변경된&nbsp;약관에&nbsp;동의한&nbsp;것으로&nbsp;간주합니다.</p>
<p>제3조&nbsp;(약관&nbsp;외&nbsp;준칙)&nbsp;이&nbsp;약관에&nbsp;명시되지&nbsp;않은&nbsp;사항이&nbsp;관계법령에&nbsp;규정되어&nbsp;있을&nbsp;경우에는&nbsp;관계법령&nbsp;규정에&nbsp;따릅니다.</p>
<p>제4조&nbsp;(용어의&nbsp;정의)&nbsp;①&nbsp;이&nbsp;약관에서&nbsp;사용하는&nbsp;용어의&nbsp;정의는&nbsp;다음과&nbsp;같습니다.</p>
<ol start="1" type="1">
    <li>&quot;&apos;장부다&apos;서비스&nbsp;(이하&nbsp;&apos;서비스&apos;)&quot;&nbsp;라&nbsp;함은&nbsp;비영리법인&nbsp;시설&nbsp;운영&nbsp;및&nbsp;관리와&nbsp;관련된&nbsp;서비스를&nbsp;의미합니다.</li>
    <li>&quot;&apos;장부다&apos;&nbsp;이용자&nbsp;(이하&nbsp;&apos;이용자&apos;)&quot;라&nbsp;함은&nbsp;회사에&nbsp;서비스&nbsp;이용신청을&nbsp;하고&nbsp;계정&nbsp;등록을&nbsp;하여&nbsp;웹을&nbsp;통하여&nbsp;서비스를&nbsp;이용하는&nbsp;모든&nbsp;이용자를&nbsp;의미합니다.</li>
    <li>&quot;&apos;장부다&apos;&nbsp;계정&nbsp;(이하&nbsp;&apos;계정&apos;)&quot;&nbsp;이라&nbsp;함은&nbsp;이용자&nbsp;식별과&nbsp;이용자&nbsp;서비스&nbsp;이용을&nbsp;위하여&nbsp;회사가&nbsp;선정하고&nbsp;부여하는&nbsp;문자&nbsp;또는&nbsp;숫자의&nbsp;조합을&nbsp;말합니다.</li>
    <li>&quot;&apos;장부다&apos;&nbsp;계정정보&nbsp;(이하&nbsp;&apos;계정정보&apos;)&quot;&nbsp;라&nbsp;함은&nbsp;이용자&nbsp;계정,&nbsp;비밀번호,&nbsp;성명,&nbsp;주소,&nbsp;전화번호&nbsp;등을&nbsp;포함한&nbsp;일반정보&nbsp;및&nbsp;사용정보,&nbsp;이용료&nbsp;결제상태&nbsp;등을&nbsp;의미합니다.</li>
    <li>&quot;비밀번호&nbsp;(이하&nbsp;&apos;비밀번호&apos;)&quot;&nbsp;라&nbsp;함은&nbsp;이용자의&nbsp;계정&nbsp;확인&nbsp;및&nbsp;권익보호를&nbsp;위해&nbsp;이용자가&nbsp;선정한&nbsp;문자,&nbsp;숫자의&nbsp;조합을&nbsp;의미합니다.</li>
    <li>이&nbsp;약관에서&nbsp;사용하는&nbsp;용어의&nbsp;정의는&nbsp;제1항에서&nbsp;정하는&nbsp;것을&nbsp;제외하고는&nbsp;관계법령&nbsp;및&nbsp;기타&nbsp;일반적인&nbsp;상관례에&nbsp;의합니다.</li>
</ol>
<p>제&nbsp;2&nbsp;장&nbsp;서비스&nbsp;이용계약</p>
<p>제5조&nbsp;(이용계약)&nbsp;이용계약은&nbsp;이용자가&nbsp;&apos;장부다&apos;&nbsp;홈페이지(<a href="http://www.jangbuda.co.kr/">www.jangbuda.co.kr</a>)상에서&nbsp;&apos;장부다&apos;&nbsp;서비스&nbsp;이용약관에&nbsp;동의한&nbsp;후&nbsp;이용신청(가입&nbsp;등록)함으로써&nbsp;체결됩니다. &apos;장부다&apos;과&nbsp;이용자&nbsp;간의&nbsp;계약조건은&nbsp;다음&nbsp;각&nbsp;호와&nbsp;같습니다.&nbsp;①&nbsp;수임료는&nbsp;월&nbsp;단위&nbsp;선납입니다.&nbsp;초&nbsp;회분&nbsp;월&nbsp;수임료에&nbsp;한하여&nbsp;지정하신&nbsp;자동이체일과&nbsp;관계없이&nbsp;계약일과&nbsp;가장&nbsp;가까운&nbsp;이체일(05일,12일,19일)에&nbsp;청구되며, &ldquo;회사&rdquo;의&nbsp;계좌로&nbsp;초&nbsp;회분&nbsp;월&nbsp;수임료가&nbsp;정상적으로&nbsp;입금된&nbsp;경우에&nbsp;한하여&nbsp;본&nbsp;계약은&nbsp;성립됩니다.&nbsp;②&nbsp;계약기간은&nbsp;1년으로&nbsp;하되&nbsp;계약&nbsp;만료기간&nbsp;1개월&nbsp;전까지&nbsp;별도의&nbsp;통지가&nbsp;없으면&nbsp;동일조건&nbsp;계약으로&nbsp;자동&nbsp;연장됩니다.&nbsp;③&nbsp;월&nbsp;수임료가&nbsp;1개월&nbsp;연체&nbsp;시에는&nbsp;서비스의&nbsp;일부가&nbsp;제한되며, 2개월&nbsp;연체&nbsp;시에는&nbsp;모든&nbsp;서비스가&nbsp;자동으로&nbsp;중단되고, 3개월&nbsp;연체&nbsp;시에는&nbsp;본&nbsp;계약의&nbsp;효력이&nbsp;상실됩니다.&nbsp;④&nbsp;부가서비스로&nbsp;예산서를&nbsp;신청한&nbsp;경우&nbsp;수임료(년&nbsp;1회)는&nbsp;무통장&nbsp;입금&nbsp;또는&nbsp;자동이체&nbsp;선택함을&nbsp;원칙으로&nbsp;합니다.&nbsp;⑤&nbsp;부가서비스인&nbsp;통장불러오기를&nbsp;이용&nbsp;할&nbsp;경우,&nbsp;이용자는&nbsp;고객사명,&nbsp;대표자명,&nbsp;계좌정보를&nbsp;등록하여&nbsp;이용&nbsp;할&nbsp;수&nbsp;있습니다.&nbsp;통장불러오기는&nbsp;장부다과&nbsp;㈜뱅크다의&nbsp;업무체결로&nbsp;㈜뱅크다에서&nbsp;제공하는&nbsp;서비스로,&nbsp;이용자가&nbsp;등록한&nbsp;정보는&nbsp;서비스의&nbsp;이용을&nbsp;위해&nbsp;㈜뱅크다에&nbsp;제공됩니다.&nbsp;⑥&nbsp;장부기장에&nbsp;있어&nbsp;자료입력은&nbsp;이용자&nbsp;입력을&nbsp;원칙으로&nbsp;합니다.&nbsp;⑦&nbsp;폐원&nbsp;및&nbsp;폐업으로&nbsp;확인&nbsp;될&nbsp;시&nbsp;계약의&nbsp;효력은&nbsp;상실되며,&nbsp;재가입&nbsp;시&nbsp;신규원은&nbsp;신규계약서를&nbsp;작성하여야&nbsp;합니다.&nbsp;⑧&nbsp;이용자는&nbsp;본&nbsp;계약&nbsp;의무이행에&nbsp;필요한&nbsp;제반&nbsp;증빙을&nbsp;이용자가&nbsp;이용하여야&nbsp;하는&nbsp;시한&nbsp;이내에&nbsp;제공되어야&nbsp;합니다.&nbsp;만약,&nbsp;이용자가&nbsp;원하는&nbsp;시한&nbsp;내&nbsp;자료&nbsp;미제출,&nbsp;제출자료&nbsp;불비,&nbsp;사실과&nbsp;다른&nbsp;자료의&nbsp;제출&nbsp;등으로&nbsp;인하여&nbsp;야기되는&nbsp;제반&nbsp;문제에&nbsp;대하여는&nbsp;이용자가&nbsp;전적으로&nbsp;책임지며,&nbsp;이로&nbsp;인하여&nbsp;발생되는&nbsp;제반문제에&nbsp;관하여&nbsp;회사는&nbsp;면책됩니다.</p>
<p>제6조&nbsp;(이용신청)&nbsp;①&nbsp;이용자는&nbsp;회사가&nbsp;정한&nbsp;소정의&nbsp;양식에&nbsp;이용자&nbsp;정보를&nbsp;기재함으로써&nbsp;이용신청을&nbsp;합니다.&nbsp;②&nbsp;이용자는&nbsp;제1항&nbsp;이용&nbsp;신청&nbsp;시&nbsp;반드시&nbsp;이용자의&nbsp;실명&nbsp;및&nbsp;실제정보가&nbsp;기재되어야&nbsp;하며,&nbsp;실명&nbsp;및&nbsp;실제정보를&nbsp;기재하지&nbsp;아니한&nbsp;이용자는&nbsp;법적인&nbsp;보호를&nbsp;받을&nbsp;수&nbsp;없습니다.&nbsp;③&nbsp;회사는&nbsp;제1항&nbsp;이용자&nbsp;정보(전화번호, e-mail주소&nbsp;등)를&nbsp;회사의&nbsp;각종&nbsp;마케팅,&nbsp;홍보&nbsp;또는&nbsp;광고를&nbsp;위해&nbsp;활용할&nbsp;수&nbsp;있으나,&nbsp;회사는&nbsp;법률에&nbsp;특별한&nbsp;규정이&nbsp;있는&nbsp;경우를&nbsp;제외하고&nbsp;이용자의&nbsp;별도&nbsp;동의&nbsp;없이&nbsp;이용자&nbsp;정보를&nbsp;제3자에게&nbsp;제공하지&nbsp;아니합니다.</p>
<p>제7조&nbsp;(이용신청에&nbsp;대한&nbsp;승인&nbsp;여부)&nbsp;①&nbsp;회사는&nbsp;회사가&nbsp;이용자에게&nbsp;요구하는&nbsp;정보에&nbsp;대해&nbsp;이용자가&nbsp;실명&nbsp;및&nbsp;실제정보를&nbsp;정확히&nbsp;기재하여&nbsp;이용신청을&nbsp;함과&nbsp;동시에&nbsp;회사의&nbsp;심사를&nbsp;거쳐&nbsp;승인하는&nbsp;것으로&nbsp;합니다.&nbsp;②&nbsp;회사는&nbsp;다음&nbsp;각&nbsp;호에&nbsp;해당하는&nbsp;이용신청에&nbsp;대해서&nbsp;추후&nbsp;확인&nbsp;시에&nbsp;승인을&nbsp;취소&nbsp;또는&nbsp;계약을&nbsp;해지할&nbsp;수&nbsp;있습니다.</p>
<ol start="1" type="1">
    <li>실명을&nbsp;사용하지&nbsp;않거나&nbsp;타인&nbsp;명의를&nbsp;이용&nbsp;또는&nbsp;도용하여&nbsp;신청한&nbsp;경우</li>
    <li>이용요금을&nbsp;납부하지&nbsp;않거나&nbsp;오납하여&nbsp;확인할&nbsp;수&nbsp;없는&nbsp;경우</li>
    <li>이용&nbsp;신청시&nbsp;기재사항을&nbsp;누락&nbsp;또는&nbsp;오기하여&nbsp;신청하는&nbsp;경우</li>
    <li>기타&nbsp;이용자의&nbsp;귀책사유로&nbsp;승인이&nbsp;불가능하다고&nbsp;판단되는&nbsp;경우&nbsp;③&nbsp;회사는&nbsp;다음&nbsp;각&nbsp;호에&nbsp;해당하는&nbsp;경우&nbsp;이용신청에&nbsp;대한&nbsp;승인&nbsp;제한사유가&nbsp;해소될&nbsp;때까지&nbsp;승인을&nbsp;제한할&nbsp;수&nbsp;있습니다.</li>
    <li>서비스&nbsp;설비가&nbsp;부족하여&nbsp;만족스러운&nbsp;서비스를&nbsp;제공할&nbsp;수&nbsp;없다고&nbsp;판단될&nbsp;경우</li>
    <li>서비스&nbsp;상의&nbsp;장애&nbsp;또는&nbsp;서비스&nbsp;이용요금&nbsp;결제수단의&nbsp;장애가&nbsp;발생한&nbsp;경우</li>
</ol>
<p>제8조&nbsp;(계정)&nbsp;①&nbsp;회사는&nbsp;이용자에&nbsp;대하여&nbsp;이용자의&nbsp;정보&nbsp;보호,&nbsp;서비스&nbsp;이용안내&nbsp;등의&nbsp;편의를&nbsp;위해&nbsp;회사가&nbsp;선정한&nbsp;일정한&nbsp;문자와&nbsp;숫자의&nbsp;조합으로&nbsp;계정으로&nbsp;부여합니다.&nbsp;②&nbsp;서비스&nbsp;이용기간에는&nbsp;계정&nbsp;변경이&nbsp;불가능하며,&nbsp;회사는&nbsp;각&nbsp;계정정보를&nbsp;통하여&nbsp;당해&nbsp;이용자의&nbsp;서비스&nbsp;이용가능&nbsp;여부,&nbsp;이용요금&nbsp;청구&nbsp;등&nbsp;이용자&nbsp;관리업무를&nbsp;수행합니다.&nbsp;③&nbsp;이용자&nbsp;본인&nbsp;계정을&nbsp;소홀히&nbsp;관리하여&nbsp;발생하는&nbsp;서비스&nbsp;이용의&nbsp;손해&nbsp;또는&nbsp;제3자에&nbsp;의한&nbsp;부정&nbsp;이용&nbsp;등에&nbsp;대한&nbsp;책임은&nbsp;이용자에게&nbsp;있으며&nbsp;회사는&nbsp;그에&nbsp;대한&nbsp;책임을&nbsp;지지&nbsp;않습니다.&nbsp;계정에&nbsp;대한&nbsp;관리책임은&nbsp;해당&nbsp;이용자에게&nbsp;있습니다.</p>
<p>제9조&nbsp;(비밀번호)&nbsp;①&nbsp;비밀번호는&nbsp;이용자가&nbsp;직접&nbsp;선정하며,&nbsp;이용자가&nbsp;원하는&nbsp;경우에는&nbsp;언제든지&nbsp;변경&nbsp;가능합니다.&nbsp;②&nbsp;이용자가&nbsp;비밀번호를&nbsp;소홀히&nbsp;관리하여&nbsp;발생하는&nbsp;서비스&nbsp;이용&nbsp;손해&nbsp;또는&nbsp;제3자에&nbsp;의한&nbsp;부정이용&nbsp;등에&nbsp;대한&nbsp;책임은&nbsp;이용자에게&nbsp;있으며&nbsp;회사는&nbsp;그에&nbsp;대한&nbsp;책임을&nbsp;지지&nbsp;않습니다.&nbsp;비밀번호에&nbsp;대한&nbsp;관리책임은&nbsp;이용자에게&nbsp;있습니다.</p>
<p>제10조&nbsp;(이용요금)&nbsp;①&nbsp;이용&nbsp;요금은&nbsp;&apos;장부다&apos;&nbsp;서비스의&nbsp;이용료&nbsp;및&nbsp;유지보수비용이며&nbsp;월별로&nbsp;회사가&nbsp;미리&nbsp;책정한&nbsp;요금이며,&nbsp;구체적인&nbsp;기간,&nbsp;시간,&nbsp;액수&nbsp;및&nbsp;납부&nbsp;방법은&nbsp;회사가&nbsp;온라인&nbsp;또는&nbsp;인쇄매체를&nbsp;통하여&nbsp;공지하는&nbsp;내용에&nbsp;따릅니다.&nbsp;②&nbsp;이용요금&nbsp;종류별&nbsp;손해배상&nbsp;또는&nbsp;환불은&nbsp;본&nbsp;약관&nbsp;제5장&nbsp;손해배상&nbsp;및&nbsp;환불&nbsp;규정에&nbsp;의거&nbsp;합니다.&nbsp;③&nbsp;이용요금은&nbsp;행사&nbsp;등의&nbsp;기획으로&nbsp;특정&nbsp;기간&nbsp;내&nbsp;할인을&nbsp;할&nbsp;수&nbsp;있으며,&nbsp;이용자가&nbsp;신제품으로&nbsp;전환&nbsp;시&nbsp;책정된&nbsp;신제품의&nbsp;이용요금에&nbsp;따릅니다.</p>
<p>제&nbsp;3&nbsp;장&nbsp;계약&nbsp;당사자의&nbsp;의무</p>
<p>제11조&nbsp;(회사의&nbsp;의무)&nbsp;①&nbsp;회사는&nbsp;이용자로부터&nbsp;제기되는&nbsp;의견이나&nbsp;불만이&nbsp;정당하다고&nbsp;인정될&nbsp;경우에는&nbsp;즉시&nbsp;처리되어야&nbsp;합니다.&nbsp;단,&nbsp;즉시&nbsp;처리가&nbsp;곤란한&nbsp;경우&nbsp;이용자에게&nbsp;그&nbsp;사유와&nbsp;처리일정을&nbsp;E-mail,&nbsp;전화&nbsp;또는&nbsp;서면으로&nbsp;통보하여야&nbsp;합니다.&nbsp;②&nbsp;회사는&nbsp;개인정보보호를&nbsp;위해&nbsp;개인정보보호법&nbsp;제26조&nbsp;및&nbsp;동법&nbsp;시행령&nbsp;제28조에&nbsp;의거하여&nbsp;다음&nbsp;각&nbsp;호의&nbsp;사항을&nbsp;준수합니다.</p>
<ol start="1" type="1">
    <li>개인정보의&nbsp;처리&nbsp;금지에&nbsp;관한&nbsp;사항&nbsp;㉠.&nbsp;회사는&nbsp;계약&nbsp;종료&nbsp;후에도&nbsp;본&nbsp;약관의&nbsp;업무수행&nbsp;목적&nbsp;범위를&nbsp;넘어&nbsp;이용자의&nbsp;정보를&nbsp;이용하거나&nbsp;이를&nbsp;제3자에게&nbsp;제공&nbsp;또는&nbsp;누설하지&nbsp;아니합니다.&nbsp;㉡.&nbsp;회사는&nbsp;계약이&nbsp;해지&nbsp;또는&nbsp;계약기간이&nbsp;만료된&nbsp;경우&nbsp;위탁업무와&nbsp;관련하여&nbsp;보유하고&nbsp;있는&nbsp;개인정보를&nbsp;개인정보보호법&nbsp;시행령&nbsp;제16조&nbsp;및&nbsp;개인정보의&nbsp;안전성&nbsp;확보조치기준(행정자치부&nbsp;고시&nbsp;제2014-7호)에&nbsp;따라&nbsp;즉시&nbsp;파기하거나&nbsp;이용자에게&nbsp;반납합니다.&nbsp;단,&nbsp;위탁업무&nbsp;중&nbsp;발생된&nbsp;전산자료는&nbsp;해당&nbsp;비영리법인의&nbsp;관할기관의&nbsp;자료보관&nbsp;기준에&nbsp;따라&nbsp;일정&nbsp;시일&nbsp;후&nbsp;일괄&nbsp;파기됩니다.&nbsp;㉢.&ldquo;㉡&rdquo;항에&nbsp;따라&nbsp;이용자의&nbsp;개인정보를&nbsp;파기한&nbsp;경우&nbsp;지체없이&nbsp;이용자에게&nbsp;그&nbsp;결과를&nbsp;통보합니다.</li>
    <li>개인정보의&nbsp;기술적,&nbsp;관리적&nbsp;보호조치&nbsp;및&nbsp;안전성&nbsp;확보에&nbsp;관한&nbsp;사항&nbsp;㉠.&nbsp;회사는&nbsp;개인정보&nbsp;보호법&nbsp;제24조제3항&nbsp;및&nbsp;제29조,&nbsp;동법&nbsp;시행령&nbsp;제21조&nbsp;및&nbsp;제30조,&nbsp;개인정보의&nbsp;안전성&nbsp;확보&nbsp;조치&nbsp;기준(행정자치부&nbsp;고시&nbsp;제2014-7호)에&nbsp;따라&nbsp;IDC(******** Data Center)센터를&nbsp;이용하며,&nbsp;개인정보의&nbsp;안전성&nbsp;확보에&nbsp;필요한&nbsp;관리적,&nbsp;기술적&nbsp;조치를&nbsp;취합니다.</li>
    <li>재위탁&nbsp;제한에&nbsp;관한&nbsp;사항&nbsp;㉠.&nbsp;회사는&nbsp;이용자의&nbsp;사전&nbsp;승낙을&nbsp;얻은&nbsp;경우를&nbsp;제외하고&nbsp;이용자의&nbsp;계약상의&nbsp;권리와&nbsp;의무의&nbsp;전부&nbsp;또는&nbsp;일부를&nbsp;제3자에게&nbsp;양도하거나&nbsp;재위탁&nbsp;하지&nbsp;않습니다.&nbsp;㉡.&nbsp;회사가&nbsp;재위탁받은&nbsp;수탁회사를&nbsp;선임한&nbsp;경우&nbsp;회사는&nbsp;당해&nbsp;재위탁계약서와&nbsp;함께&nbsp;그&nbsp;사실을&nbsp;즉시&nbsp;이용자에게&nbsp;통보&nbsp;합니다.</li>
    <li>회사&nbsp;관리,&nbsp;감독에&nbsp;과한&nbsp;사항&nbsp;㉠.&nbsp;이용자는&nbsp;회사에&nbsp;대하여&nbsp;다음&nbsp;각&nbsp;호의&nbsp;사항을&nbsp;관리하도록&nbsp;요구할&nbsp;수&nbsp;있으며,&nbsp;회사는&nbsp;특별한&nbsp;사유가&nbsp;없는&nbsp;한&nbsp;이에&nbsp;응합니다.</li>
</ol>
<ul type="disc">
    <li>개인정보의&nbsp;처리&nbsp;현황</li>
    <li>개인정보의&nbsp;접근&nbsp;또는&nbsp;접속현황</li>
    <li>개인정보&nbsp;접근&nbsp;또는&nbsp;접속&nbsp;대상자</li>
    <li>목적&nbsp;외&nbsp;이용,&nbsp;제공&nbsp;및&nbsp;재위탁&nbsp;금지&nbsp;준수여부</li>
    <li>암호화&nbsp;등&nbsp;안전성&nbsp;확보조치&nbsp;이행여부</li>
    <li>그&nbsp;밖에&nbsp;개인정보의&nbsp;보호를&nbsp;위하여&nbsp;필요한&nbsp;사항&nbsp;㉡.&nbsp;이용자는&nbsp;회사에&nbsp;대하여&nbsp;㉠항의&nbsp;각호의&nbsp;사항에&nbsp;대한&nbsp;실태를&nbsp;점검하여&nbsp;시정을&nbsp;요구할&nbsp;수&nbsp;있으며,&nbsp;회사는&nbsp;특별한&nbsp;사유가&nbsp;없는&nbsp;한&nbsp;이행하여야&nbsp;합니다.&nbsp;㉢.&nbsp;회사는&nbsp;본&nbsp;업무로&nbsp;인하여&nbsp;정보주체의&nbsp;개인정보가&nbsp;분실,도난,유출,변조&nbsp;또는&nbsp;훼손되지&nbsp;아니하도록&nbsp;1년&nbsp;1회&nbsp;자체&nbsp;교육을&nbsp;시행합니다.&nbsp;㉣.&nbsp;전항에&nbsp;따른&nbsp;교육&nbsp;실시&nbsp;후&nbsp;그&nbsp;근거를&nbsp;유지합니다.</li>
</ul>
<ol start="1" type="1">
    <li>손해배상&nbsp;등&nbsp;책임에&nbsp;관한&nbsp;사항&nbsp;㉠.&nbsp;회사&nbsp;또는&nbsp;회사의&nbsp;수탁자가&nbsp;이&nbsp;계약에&nbsp;의하여&nbsp;위탁&nbsp;또는&nbsp;재위탁&nbsp;받은&nbsp;업무를&nbsp;수행함에&nbsp;있어&nbsp;이&nbsp;계약에&nbsp;따른&nbsp;의무를&nbsp;위반하거나&nbsp;회사&nbsp;또는&nbsp;회사의&nbsp;수탁자의&nbsp;귀책사유로&nbsp;인하여&nbsp;이&nbsp;계약이&nbsp;해지&nbsp;되어&nbsp;이용자&nbsp;또는&nbsp;개인정보&nbsp;주체&nbsp;기타&nbsp;제3자에게&nbsp;손해가&nbsp;발생한&nbsp;경우&nbsp;회사는&nbsp;그&nbsp;손해를&nbsp;배상하여야&nbsp;합니다.&nbsp;㉡.&nbsp;㉠항과&nbsp;관련하여&nbsp;개인정보주체&nbsp;기타&nbsp;제3자에게&nbsp;발생한&nbsp;손해에&nbsp;대하여&nbsp;이용자가&nbsp;전부&nbsp;또는&nbsp;일부를&nbsp;배상한&nbsp;때에는&nbsp;이용자는&nbsp;이를&nbsp;회사에&nbsp;구상할&nbsp;수&nbsp;있습니다.&nbsp;③&nbsp;회사는&nbsp;계속적이고&nbsp;안정적인&nbsp;서비스의&nbsp;제공을&nbsp;위하여&nbsp;설비에&nbsp;장애가&nbsp;생기거나&nbsp;멸실&nbsp;된&nbsp;때에는&nbsp;지체&nbsp;없이&nbsp;이를&nbsp;수리&nbsp;또는&nbsp;복구합니다.&nbsp;단,&nbsp;천재지변,&nbsp;비상사태&nbsp;또는&nbsp;그밖에&nbsp;부득이한&nbsp;사유가&nbsp;있는&nbsp;경우에는&nbsp;그러하지&nbsp;아니합니다.&nbsp;④&nbsp;회사는&nbsp;이용계약의&nbsp;체결,&nbsp;계약사항의&nbsp;변경&nbsp;및&nbsp;해지&nbsp;등&nbsp;이용자와&nbsp;계약관련&nbsp;절차&nbsp;및&nbsp;내용&nbsp;등에&nbsp;있어&nbsp;이용자에게&nbsp;편의를&nbsp;제공하도록&nbsp;노력합니다.</li>
</ol>
<p>제12조&nbsp;(이용자의&nbsp;의무)&nbsp;①&nbsp;이용자는&nbsp;서비스&nbsp;이용신청을&nbsp;함에&nbsp;있어서&nbsp;계정&nbsp;등록&nbsp;시&nbsp;이용자의&nbsp;실명으로&nbsp;모든&nbsp;사항을&nbsp;사실에&nbsp;근거하여&nbsp;작성하여야&nbsp;하며&nbsp;허위정보를&nbsp;제공하지&nbsp;아니합니다.&nbsp;허위정보&nbsp;또는&nbsp;타인의&nbsp;정보로&nbsp;이용신청을&nbsp;하여&nbsp;비실명&nbsp;계정이&nbsp;등록된&nbsp;경우&nbsp;제공자로부터&nbsp;어떠한&nbsp;보호조치도&nbsp;받을&nbsp;수&nbsp;없습니다.&nbsp;②&nbsp;이용자는&nbsp;제공자가&nbsp;서비스&nbsp;이용과&nbsp;관련하여&nbsp;필요한&nbsp;사항을&nbsp;이용자에게&nbsp;알릴&nbsp;수&nbsp;있도록&nbsp;계정&nbsp;등록&nbsp;시&nbsp;연락&nbsp;가능한&nbsp;E-mail&nbsp;주소&nbsp;및&nbsp;전화번호&nbsp;등을&nbsp;제공합니다.&nbsp;③&nbsp;이용자는&nbsp;서비스&nbsp;이용요금을&nbsp;성실하게&nbsp;납부해야&nbsp;합니다.&nbsp;④&nbsp;이용자는&nbsp;계정&nbsp;등의&nbsp;선정&nbsp;시에는&nbsp;다음&nbsp;각&nbsp;호에&nbsp;해당하는&nbsp;내용을&nbsp;이용하지&nbsp;아니합니다.</p>
<ol start="1" type="1">
    <li>제공자가&nbsp;인정하는&nbsp;서비스의&nbsp;공식&nbsp;운영자인&nbsp;관리자&nbsp;아이디를&nbsp;사칭하는&nbsp;내용</li>
    <li>선정적이고&nbsp;음란한&nbsp;내용&nbsp;또는&nbsp;반사회적이고&nbsp;관계법령에&nbsp;저촉되는&nbsp;내용</li>
    <li>기타&nbsp;제3자의&nbsp;상표권,&nbsp;저작권에&nbsp;위배될&nbsp;가능성이&nbsp;있는&nbsp;내용</li>
    <li>비어,&nbsp;속어라고&nbsp;판단되는&nbsp;내용&nbsp;⑤&nbsp;이용자는&nbsp;주소&nbsp;및&nbsp;연락처&nbsp;등&nbsp;이용자&nbsp;정보가&nbsp;변경된&nbsp;경우에는&nbsp;이를&nbsp;회사에게&nbsp;즉시&nbsp;알려야&nbsp;합니다.&nbsp;⑥&nbsp;이용자는&nbsp;본인의&nbsp;계정&nbsp;및&nbsp;비밀번호의&nbsp;관리&nbsp;책임을&nbsp;지며,&nbsp;타인의&nbsp;계정을&nbsp;이용하지&nbsp;않습니다.&nbsp;⑦&nbsp;이용자는&nbsp;타인의&nbsp;신용카드,&nbsp;은행&nbsp;계좌&nbsp;등을&nbsp;무단으로&nbsp;이용&nbsp;또는&nbsp;도용하여&nbsp;서비스&nbsp;이용요금을&nbsp;결제하여서는&nbsp;아니&nbsp;됩니다.&nbsp;⑧&nbsp;이용자는&nbsp;공공의&nbsp;안녕질서&nbsp;또는&nbsp;미풍양속을&nbsp;해하는&nbsp;다음&nbsp;각&nbsp;호의&nbsp;통신을&nbsp;하지&nbsp;않습니다.</li>
    <li>범죄행위를&nbsp;목적으로&nbsp;하거나&nbsp;범죄행위를&nbsp;교사하는&nbsp;내용</li>
    <li>반국가적&nbsp;행위의&nbsp;수행을&nbsp;목적으로&nbsp;하는&nbsp;내용&nbsp;또는&nbsp;선량한&nbsp;풍속,&nbsp;기타&nbsp;사회질서를&nbsp;해하는&nbsp;내용</li>
    <li>타인의&nbsp;명예를&nbsp;손상시키거나&nbsp;권리를&nbsp;침해하는&nbsp;내용&nbsp;또는&nbsp;욕설이나&nbsp;노골적인&nbsp;성&nbsp;묘사를&nbsp;하는&nbsp;내용</li>
    <li>다른&nbsp;이용자를&nbsp;음해하거나&nbsp;인종&nbsp;차별적인&nbsp;내용&nbsp;⑨&nbsp;이용자는&nbsp;회사가&nbsp;제공하는&nbsp;서비스를&nbsp;본래의&nbsp;이용목적&nbsp;이외의&nbsp;용도로&nbsp;사용하거나&nbsp;다음&nbsp;각&nbsp;호에&nbsp;해당하는&nbsp;행위를&nbsp;하지&nbsp;않습니다.</li>
    <li>다른&nbsp;이용자를&nbsp;희롱하거나,&nbsp;위협하거나,&nbsp;특정&nbsp;이용자에게&nbsp;지속적으로&nbsp;고통을&nbsp;주거나,&nbsp;불편을&nbsp;주는&nbsp;행위</li>
    <li>회사가&nbsp;인정하는&nbsp;서비스의&nbsp;공식&nbsp;운영자인&nbsp;관리자를&nbsp;사칭하거나&nbsp;회사의&nbsp;임직원&nbsp;또는&nbsp;직원를&nbsp;사칭하는&nbsp;행위</li>
    <li>회사로부터&nbsp;특별한&nbsp;권리를&nbsp;부여&nbsp;받지&nbsp;않는&nbsp;한, &apos;장부다&apos;&nbsp;클라이언트&nbsp;프로그램을&nbsp;변경하거나&nbsp;&apos;장부다&apos;&nbsp;서버를&nbsp;해킹&nbsp;하거나&nbsp;웹사이트의&nbsp;일부분을&nbsp;임의로&nbsp;변경하는&nbsp;행위</li>
    <li>서비스&nbsp;내&nbsp;또는&nbsp;웹사이트&nbsp;상에서&nbsp;다른&nbsp;회사&nbsp;제품의&nbsp;광고나&nbsp;판촉활동을&nbsp;하는&nbsp;행위</li>
    <li>서비스&nbsp;내&nbsp;또는&nbsp;웹사이트&nbsp;상에서&nbsp;불법복제&nbsp;소프트웨어를&nbsp;밀매하는&nbsp;등&nbsp;기타&nbsp;불법적인&nbsp;목적으로&nbsp;서비스나&nbsp;웹&nbsp;사이트를&nbsp;이용하는&nbsp;행위</li>
    <li>서비스&nbsp;내&nbsp;또는&nbsp;웹사이트&nbsp;상에서&nbsp;사적인&nbsp;정보나&nbsp;밖의&nbsp;실제&nbsp;사회의&nbsp;사생활&nbsp;보호에&nbsp;위배되는&nbsp;정보를&nbsp;주고받는&nbsp;행위</li>
    <li>인종이나&nbsp;성,&nbsp;특정&nbsp;종교,&nbsp;광신&nbsp;등&nbsp;사회적&nbsp;편견에&nbsp;기반&nbsp;한&nbsp;단체나&nbsp;혈맹을&nbsp;결성하는&nbsp;행위</li>
    <li>프로그램&nbsp;상의&nbsp;버그를&nbsp;악용하여&nbsp;서비스를&nbsp;이용하는&nbsp;행위</li>
    <li>저작권자의&nbsp;허가&nbsp;없이&nbsp;저작권&nbsp;문제가&nbsp;발생할&nbsp;소지가&nbsp;있는&nbsp;내용을&nbsp;서비스&nbsp;내&nbsp;또는&nbsp;웹사이트&nbsp;상에&nbsp;배포하는&nbsp;행위&nbsp;⑩&nbsp;이용자는&nbsp;회사의&nbsp;허락&nbsp;없이&nbsp;서비스를&nbsp;이용하여&nbsp;영업/광고활동&nbsp;등을&nbsp;해서는&nbsp;아니&nbsp;되며,&nbsp;회사가&nbsp;허락한&nbsp;내용과&nbsp;범위를&nbsp;벗어난&nbsp;영업/광고활동&nbsp;등을&nbsp;하지&nbsp;않습니다.&nbsp;⑪&nbsp;이용자는&nbsp;제3자의&nbsp;지적재산권을&nbsp;침해하지&nbsp;않습니다.&nbsp;⑫&nbsp;이용자는&nbsp;이&nbsp;약관&nbsp;및&nbsp;관계법령을&nbsp;준수해야&nbsp;하며,&nbsp;기타&nbsp;회사의&nbsp;명예를&nbsp;손상시키거나&nbsp;업무수행에&nbsp;현저한&nbsp;지장을&nbsp;초래하는&nbsp;행위를&nbsp;하지&nbsp;않습니다.&nbsp;⑬&nbsp;이용자는&nbsp;&apos;장부다&apos;&nbsp;홈페이지(<a href="http://www.jangbuda.co.kr/">www.jangbuda.co.kr</a>)상의&nbsp;공지사항을&nbsp;수시로&nbsp;확인하여야&nbsp;합니다.</li>
</ol>
<p>제&nbsp;4&nbsp;장&nbsp;서비스&nbsp;이용&nbsp;및&nbsp;제한,&nbsp;중지</p>
<p>제13조&nbsp;(서비스의&nbsp;내용&nbsp;및&nbsp;변경)&nbsp;①&nbsp;회사는&nbsp;이용자에게&nbsp;&apos;장부다&apos;&nbsp;서비스&nbsp;외&nbsp;관련&nbsp;기타&nbsp;서비스를&nbsp;제공합니다.&nbsp;②&nbsp;회사는&nbsp;새로운&nbsp;내용&nbsp;추가,&nbsp;각종&nbsp;버그&nbsp;패치,&nbsp;기타&nbsp;운영상&nbsp;필요한&nbsp;경우의&nbsp;내용을&nbsp;온라인&nbsp;및&nbsp;오프라인&nbsp;업데이트를&nbsp;통해&nbsp;수시&nbsp;변경할&nbsp;수&nbsp;있습니다.&nbsp;③&nbsp;회사는&nbsp;&apos;장부다&apos;&nbsp;홈페이지(<a href="http://www.jangbuda.co.kr/">www.jangbuda.co.kr</a>)의&nbsp;&quot;공지사항&quot;란을&nbsp;통하여&nbsp;서비스&nbsp;시스템&nbsp;점검에&nbsp;관한&nbsp;사항,&nbsp;약관&nbsp;변경에&nbsp;관한&nbsp;사항,&nbsp;운영에&nbsp;관한&nbsp;사항,&nbsp;이벤트에&nbsp;관한&nbsp;사항,&nbsp;정보&nbsp;업데이트&nbsp;및&nbsp;추가에&nbsp;관한&nbsp;사항&nbsp;등을&nbsp;이용자에게&nbsp;고지하며&nbsp;이용자는&nbsp;수시로&nbsp;&apos;장부다&apos;&nbsp;홈페이지(<a href="http://www.jangbuda.co.kr/">www.jangbuda.co.kr</a>)를&nbsp;방문하여&nbsp;공지사항을&nbsp;확인하여야&nbsp;합니다.&nbsp;공지사항의&nbsp;미확인으로&nbsp;인해&nbsp;발생하는&nbsp;이용자의&nbsp;피해는&nbsp;제공자가&nbsp;책임을&nbsp;지지&nbsp;않습니다.&nbsp;다만,&nbsp;소비자에게&nbsp;중대하고&nbsp;명백한&nbsp;피해가&nbsp;예상되는&nbsp;경우에는&nbsp;회사는&nbsp;별도&nbsp;고지를&nbsp;합니다.</p>
<p>제14조&nbsp;(서비스의&nbsp;제공시간&nbsp;및&nbsp;중지)&nbsp;①&nbsp;서비스는&nbsp;연중무휴, 1일&nbsp;24시간&nbsp;제공함을&nbsp;원칙으로&nbsp;합니다.&nbsp;단,&nbsp;회사는&nbsp;컴퓨터&nbsp;등&nbsp;정보통신설비의&nbsp;보수점검,&nbsp;교체&nbsp;및&nbsp;고장,&nbsp;통신두절,&nbsp;정기점검&nbsp;또는&nbsp;운영상&nbsp;필요에&nbsp;의한&nbsp;목적으로&nbsp;서비스를&nbsp;일시&nbsp;중지&nbsp;할&nbsp;수&nbsp;있습니다.&nbsp;②&nbsp;회사는&nbsp;서비스&nbsp;제공에&nbsp;필요할&nbsp;경우&nbsp;정기점검을&nbsp;실시할&nbsp;수&nbsp;있으며,&nbsp;정기점검&nbsp;시간은&nbsp;홈페이지에&nbsp;공지사항을&nbsp;통해&nbsp;공지합니다.</p>
<p>제15조&nbsp;(서비스&nbsp;이용의&nbsp;제한)&nbsp;①&nbsp;회사는&nbsp;천재지변이나&nbsp;국가&nbsp;비상사태&nbsp;또는&nbsp;운영의&nbsp;심각한&nbsp;변화&nbsp;등&nbsp;불가항력적인&nbsp;경우가&nbsp;발생&nbsp;또는&nbsp;발생이&nbsp;예상될&nbsp;때는&nbsp;서비스의&nbsp;전부&nbsp;또는&nbsp;일부를&nbsp;예고&nbsp;없이&nbsp;제한하거나&nbsp;중지할&nbsp;수&nbsp;있습니다.&nbsp;②&nbsp;이용자가&nbsp;이용자의&nbsp;의무&nbsp;조항을&nbsp;어길&nbsp;경우&nbsp;회사는&nbsp;해당&nbsp;이용자의&nbsp;계정이용에&nbsp;제한을&nbsp;가할&nbsp;수&nbsp;있습니다.&nbsp;③&nbsp;이용자가&nbsp;타인의&nbsp;신용카드,&nbsp;은행&nbsp;계좌&nbsp;등을&nbsp;무단으로&nbsp;이용&nbsp;또는&nbsp;도용하여&nbsp;서비스&nbsp;이용요금을&nbsp;결제하는&nbsp;경우&nbsp;회사는&nbsp;해당&nbsp;이용자의&nbsp;계정이용에&nbsp;제한을&nbsp;가할&nbsp;수&nbsp;있습니다.&nbsp;④&nbsp;서비스를&nbsp;이용하게&nbsp;됨으로써&nbsp;서비스&nbsp;영역에서&nbsp;발생하는&nbsp;이용자&nbsp;사이의&nbsp;문제에&nbsp;대해&nbsp;회사는&nbsp;책임을&nbsp;지지&nbsp;않습니다.&nbsp;⑤&nbsp;이용자의&nbsp;관리&nbsp;소홀로&nbsp;인하여&nbsp;계정&nbsp;및&nbsp;비밀번호의&nbsp;유출로&nbsp;인해&nbsp;이용자에게&nbsp;서비스&nbsp;이용상의&nbsp;손해가&nbsp;발생하거나&nbsp;제3자에&nbsp;의한&nbsp;부정이용&nbsp;등으로&nbsp;이용자의&nbsp;의무조항을&nbsp;위반한&nbsp;경우가&nbsp;발생한&nbsp;경우&nbsp;계정의&nbsp;이용이&nbsp;제한될&nbsp;수&nbsp;있습니다.&nbsp;⑥&nbsp;이용자의&nbsp;모든&nbsp;정보는&nbsp;회사가&nbsp;일체의&nbsp;권리&nbsp;및&nbsp;권한을&nbsp;소유하며,&nbsp;기획이나&nbsp;운영상&nbsp;필요하다고&nbsp;판단될&nbsp;경우&nbsp;당사에서&nbsp;추가,&nbsp;삭제,&nbsp;변경할&nbsp;수&nbsp;있습니다.&nbsp;이에&nbsp;대해&nbsp;이용자는&nbsp;&apos;장부다&apos;&nbsp;홈페이지의&nbsp;고객지원센터를&nbsp;통해&nbsp;이의신청을&nbsp;할&nbsp;수&nbsp;있습니다.&nbsp;⑦&nbsp;서비스&nbsp;이용과&nbsp;관련한&nbsp;상담&nbsp;및&nbsp;문의는&nbsp;전화&nbsp;또는&nbsp;E-mail로&nbsp;접수하여&nbsp;처리합니다.</p>
<p>제16조&nbsp;(서비스의&nbsp;이용중지&nbsp;또는&nbsp;계약의&nbsp;해지)&nbsp;①&nbsp;이용자는&nbsp;이용자의&nbsp;사정으로&nbsp;인하여&nbsp;계약을&nbsp;해지하거나&nbsp;서비스의&nbsp;이용중지를&nbsp;요청할&nbsp;수&nbsp;있습니다.&nbsp;②&nbsp;서비스&nbsp;이용중지를&nbsp;원하는&nbsp;경우에는&nbsp;전화&nbsp;또는&nbsp;E-mail을&nbsp;통하여&nbsp;회사에&nbsp;중지신청을&nbsp;할&nbsp;수&nbsp;있으며,&nbsp;이용자가&nbsp;계약의&nbsp;해지를&nbsp;원하는&nbsp;경우에는&nbsp;&apos;장부다&apos;의&nbsp;계약지사에&nbsp;서비스&nbsp;해지&nbsp;신청을&nbsp;함과&nbsp;동시에&nbsp;서비스&nbsp;계약&nbsp;해지&nbsp;신청서가&nbsp;접수&nbsp;되어야&nbsp;계약을&nbsp;해지할&nbsp;수&nbsp;있습니다.&nbsp;③&nbsp;회사는&nbsp;이용자가&nbsp;제12조&nbsp;이용자의&nbsp;의무를&nbsp;위반한&nbsp;경우&nbsp;및&nbsp;고의&nbsp;또는&nbsp;중대한&nbsp;과실로&nbsp;회사에&nbsp;손해를&nbsp;입힌&nbsp;경우에는&nbsp;사전&nbsp;통보&nbsp;없이&nbsp;이용계약을&nbsp;해지하거나&nbsp;기간을&nbsp;정하여&nbsp;서비스의&nbsp;이용을&nbsp;중지할&nbsp;수&nbsp;있습니다.&nbsp;이&nbsp;경우&nbsp;제공자는&nbsp;&apos;장부다&apos;&nbsp;의&nbsp;클라이언트&nbsp;및&nbsp;&apos;장부다&apos;&nbsp;이용자는&nbsp;고객지원센터를&nbsp;통해&nbsp;이의신청을&nbsp;할&nbsp;수&nbsp;있습니다.</p>
<p>제&nbsp;5&nbsp;장&nbsp;손해배상&nbsp;및&nbsp;환불</p>
<p>제17조&nbsp;(손해배상)&nbsp;①&nbsp;&apos;장부다&apos;&nbsp;의&nbsp;귀책사유로&nbsp;인하여&nbsp;이용자의&nbsp;손해가&nbsp;발생한&nbsp;경우의&nbsp;손해배상&nbsp;책임한도는&nbsp;월&nbsp;수임료의&nbsp;3배&nbsp;이내로&nbsp;합니다.&nbsp;②&nbsp;서비스&nbsp;중지/장애시간은&nbsp;이용자가&nbsp;회사에게&nbsp;통지한&nbsp;후부터&nbsp;계산하되,&nbsp;서비스가&nbsp;불가항력(천재지변&nbsp;등)이나&nbsp;회사의&nbsp;사전고지(회선공사,&nbsp;정기점검&nbsp;등),&nbsp;이용자의&nbsp;고의&nbsp;또는&nbsp;과실로&nbsp;인하여&nbsp;중지되거나&nbsp;장애가&nbsp;발생한&nbsp;경우에는&nbsp;서비스&nbsp;중지/장애시간&nbsp;계산에서&nbsp;제외합니다.&nbsp;③&nbsp;이용자가&nbsp;본&nbsp;약관의&nbsp;의무를&nbsp;위반함으로&nbsp;인하여&nbsp;회사에&nbsp;손해를&nbsp;입힌&nbsp;경우&nbsp;또는&nbsp;이용자가&nbsp;서비스를&nbsp;이용함에&nbsp;있어&nbsp;회사에&nbsp;손해를&nbsp;입힌&nbsp;경우에&nbsp;이용자는&nbsp;회사에&nbsp;대하여&nbsp;그&nbsp;손해를&nbsp;배상하여야&nbsp;합니다.</p>
<p>제18조&nbsp;(환불)&nbsp;①&nbsp;이용자가&nbsp;서비스의&nbsp;중지(또는&nbsp;계약의&nbsp;해지)를&nbsp;요청하는&nbsp;경우에는&nbsp;다음&nbsp;각&nbsp;호의&nbsp;규정에&nbsp;따라&nbsp;환급합니다.</p>
<ol start="1" type="1">
    <li>계약&nbsp;당월&nbsp;수임료는&nbsp;환급이&nbsp;불가능합니다.</li>
    <li>프로그램&nbsp;사용&nbsp;이력이&nbsp;확인된&nbsp;경우는&nbsp;환급이&nbsp;불가능합니다.</li>
    <li>영업자의&nbsp;해지지연에&nbsp;관한&nbsp;것은&nbsp;환급이&nbsp;불가합니다.</li>
    <li>회사는&nbsp;해지&nbsp;신청서가&nbsp;접수된&nbsp;일자이후에&nbsp;대하여만&nbsp;환불이&nbsp;가능하고&nbsp;회사의&nbsp;정산일자에&nbsp;맞추어&nbsp;환급을&nbsp;시행하며,&nbsp;이때&nbsp;송금&nbsp;수수료는&nbsp;회사가&nbsp;부담합니다.</li>
    <li>계약을&nbsp;중도에&nbsp;해지하는&nbsp;경우&nbsp;이용자는&nbsp;계약해지&nbsp;신청서를&nbsp;접수하여야&nbsp;하며,&nbsp;이용자가&nbsp;해지신고를&nbsp;지연한&nbsp;경우와&nbsp;미사용&nbsp;분에&nbsp;대한&nbsp;기&nbsp;납입&nbsp;월&nbsp;수임료는&nbsp;절대적으로&nbsp;환불되지&nbsp;않습니다.</li>
</ol>
<p>제19조&nbsp;(면책)&nbsp;①&nbsp;회사는&nbsp;전시,&nbsp;사변,&nbsp;천재지변,&nbsp;국가비상사태&nbsp;기타&nbsp;불가항력적&nbsp;사유로&nbsp;서비스를&nbsp;제공할&nbsp;수&nbsp;없는&nbsp;경우&nbsp;책임이&nbsp;면제됩니다.&nbsp;②&nbsp;회사는&nbsp;이용자의&nbsp;귀책사유로&nbsp;인한&nbsp;서비스의&nbsp;중지/이용장애에&nbsp;대하여&nbsp;책임을&nbsp;지지&nbsp;않습니다.&nbsp;③&nbsp;회사는&nbsp;기간&nbsp;통신&nbsp;사업자가&nbsp;전기통신서비스를&nbsp;중지하거나&nbsp;정상적으로&nbsp;제공하지&nbsp;아니하여&nbsp;손해가&nbsp;발생한&nbsp;경우에는&nbsp;책임이&nbsp;면제됩니다.&nbsp;④&nbsp;회사는&nbsp;사전에&nbsp;공지된&nbsp;서비스용&nbsp;설비의&nbsp;보수,&nbsp;교체,&nbsp;정기점검,&nbsp;공사&nbsp;등&nbsp;부득이한&nbsp;사유로&nbsp;서비스가&nbsp;중지되거나&nbsp;장애가&nbsp;발생한&nbsp;경우에&nbsp;대해서는&nbsp;책임이&nbsp;면제됩니다.&nbsp;⑤&nbsp;회사는&nbsp;이용자가&nbsp;서비스를&nbsp;이용하여&nbsp;기대하는&nbsp;수익을&nbsp;얻지&nbsp;못한&nbsp;것에&nbsp;대하여&nbsp;책임을&nbsp;지지&nbsp;않으며&nbsp;서비스에&nbsp;대한&nbsp;취사선택&nbsp;또는&nbsp;이용으로&nbsp;발생하는&nbsp;손해&nbsp;등에&nbsp;대해서는&nbsp;책임이&nbsp;면제됩니다.&nbsp;⑥&nbsp;회사에서&nbsp;명백히&nbsp;인지할&nbsp;수&nbsp;없는&nbsp;사유로&nbsp;인한&nbsp;접속지연에&nbsp;대해서&nbsp;책임을&nbsp;지지&nbsp;않습니다.&nbsp;⑦&nbsp;회사는&nbsp;이용자가&nbsp;서비스&nbsp;내&nbsp;또는&nbsp;웹사이트&nbsp;상에&nbsp;게시&nbsp;또는&nbsp;전송한&nbsp;정보,&nbsp;자료,&nbsp;사실의&nbsp;신뢰도,&nbsp;정확성&nbsp;등&nbsp;내용에&nbsp;대해서는&nbsp;책임을&nbsp;지지&nbsp;않습니다.&nbsp;⑧&nbsp;회사는&nbsp;이용자&nbsp;상호간&nbsp;또는&nbsp;이용자와&nbsp;제3자간에&nbsp;서비스를&nbsp;매개로&nbsp;발생한&nbsp;분쟁에&nbsp;대해&nbsp;개입할&nbsp;의무가&nbsp;없으며&nbsp;이로&nbsp;인한&nbsp;손해를&nbsp;배상&nbsp;하지&nbsp;아니합니다.&nbsp;⑨&nbsp;회사가&nbsp;제공하는&nbsp;서비스&nbsp;중&nbsp;무료&nbsp;서비스의&nbsp;경우에는&nbsp;손해&nbsp;배상의&nbsp;대상에서&nbsp;제외됩니다.&nbsp;⑩&nbsp;이용자는&nbsp;자료입력에&nbsp;대한&nbsp;정정요청을&nbsp;회사에게&nbsp;하되&nbsp;정정에&nbsp;대한&nbsp;모든&nbsp;책임은&nbsp;이용자의&nbsp;요구로&nbsp;인한&nbsp;정정일&nbsp;시&nbsp;회사는&nbsp;책임&nbsp;지지&nbsp;않습니다.&nbsp;⑪&nbsp;이용자는&nbsp;한번&nbsp;장부기장이&nbsp;완료되어&nbsp;회계보고를&nbsp;함에&nbsp;있어&nbsp;정정으로&nbsp;인하여&nbsp;해당&nbsp;월&nbsp;지자체&nbsp;보고&nbsp;자료와&nbsp;불일치하여도&nbsp;이용자의&nbsp;정정요청으로&nbsp;인한&nbsp;모든&nbsp;책임은&nbsp;회사에게&nbsp;책임을&nbsp;묻지&nbsp;않습니다.</p>
<p>제20조&nbsp;(재판권&nbsp;및&nbsp;준거법)&nbsp;①&nbsp;서비스&nbsp;이용과&nbsp;관련하여&nbsp;제공자와&nbsp;이용자&nbsp;간&nbsp;발생한&nbsp;분쟁에&nbsp;관한&nbsp;소송은&nbsp;민사소송법상의&nbsp;관할법원에&nbsp;제기합니다.&nbsp;②&nbsp;회사와&nbsp;이용자&nbsp;간&nbsp;제기된&nbsp;소송에는&nbsp;대한민국&nbsp;법을&nbsp;적용합니다.</p>
<p>부칙 이 약관은 2023년 06월 01일부터 적용됩니다.</p>`
export const regesterInput2 = `
㈜장부다&nbsp;개인정보취급방침
회사의&nbsp;개인정보취급방침의&nbsp;기본방향
(주)장부다(이하&nbsp;'회사'라&nbsp;합니다.)는&nbsp;회원께서&nbsp;회원&nbsp;가입&nbsp;시에&nbsp;제공한&nbsp;개인정보와&nbsp;회원의&nbsp;서비스&nbsp;이용에서&nbsp;발생되는&nbsp;모든&nbsp;개인정보를&nbsp;매우&nbsp;중요하게&nbsp;생각하고&nbsp;있습니다.&nbsp;회원의&nbsp;개인정보는&nbsp;오직&nbsp;회사의&nbsp;서비스의&nbsp;제공을&nbsp;위해서만&nbsp;사용하며,&nbsp;개인정보가&nbsp;회원의&nbsp;동의&nbsp;없이&nbsp;유출되어&nbsp;피해를&nbsp;입지&nbsp;않도록,&nbsp;개인정보&nbsp;보호를&nbsp;위해&nbsp;최선을&nbsp;다할&nbsp;것입니다.&nbsp;아래는&nbsp;회원의&nbsp;개인정보보호와&nbsp;관련한&nbsp;회사의&nbsp;개인정보취급방침입니다.
제1조&nbsp;[총칙]
<ol>
    <li>회사는&nbsp;회원의&nbsp;개인정보보호를&nbsp;매우&nbsp;중요시하며,&nbsp;정보통신망이용촉진등에&nbsp;관한&nbsp;법률,&nbsp;정보통신부가&nbsp;제정한&nbsp;개인정보보호지침&nbsp;등&nbsp;관계법령을&nbsp;준수합니다.&nbsp;회사는&nbsp;개인정보취급방침을&nbsp;통하여&nbsp;회원이&nbsp;제공하는&nbsp;개인정보가&nbsp;어떠한&nbsp;용도와&nbsp;방식으로&nbsp;이용되고&nbsp;있으며&nbsp;개인정보보호를&nbsp;위해&nbsp;어떠한&nbsp;조치가&nbsp;취해지고&nbsp;있는지&nbsp;알려드립니다.</li>
    <li>회사는&nbsp;개인정보취급방침을&nbsp;웹사이트&nbsp;페이지에&nbsp;공개함으로써&nbsp;회원이&nbsp;언제나&nbsp;용이하게&nbsp;볼&nbsp;수&nbsp;있도록&nbsp;조치합니다.</li>
    <li>회사의&nbsp;개인정보취급방침은&nbsp;정부의&nbsp;법률&nbsp;및&nbsp;지침에&nbsp;따라&nbsp;변경될&nbsp;수&nbsp;있으며&nbsp;회원은&nbsp;회사의&nbsp;홈페이지(URL :&nbsp;<a>www.jangbuda.com</a>)&nbsp;방문&nbsp;시&nbsp;수시로&nbsp;그&nbsp;내용을&nbsp;확인할&nbsp;수&nbsp;있습니다.</li>
</ol>
제2조&nbsp;[개인정보&nbsp;수집에&nbsp;대한&nbsp;동의]&nbsp;회사는&nbsp;회원이&nbsp;회사의&nbsp;개인정보취급방침&nbsp;또는&nbsp;이용약관의&nbsp;내용에&nbsp;대해&nbsp;"동의합니다"버튼&nbsp;또는&nbsp;"동의하지&nbsp;않습니다"버튼을&nbsp;클릭할&nbsp;수&nbsp;있는&nbsp;절차를&nbsp;마련하며, "동의합니다"버튼을&nbsp;클릭하면&nbsp;개인정보&nbsp;수집에&nbsp;대해&nbsp;동의한&nbsp;것으로&nbsp;봅니다.
제3조&nbsp;[개인정보&nbsp;수집&nbsp;항목]
<ol>
    <li>회사가&nbsp;회원을&nbsp;대상으로&nbsp;각종&nbsp;서비스를&nbsp;제공하기&nbsp;위해&nbsp;수집하는&nbsp;필수&nbsp;회원정보는&nbsp;다음과&nbsp;같습니다.&nbsp;①&nbsp;이용자명&nbsp;②&nbsp;생년월일&nbsp;또는&nbsp;주민등록번호&nbsp;또는&nbsp;사업자번호&nbsp;③&nbsp;로그인&nbsp;ID&nbsp;및&nbsp;비밀번호&nbsp;④&nbsp;금융기관,&nbsp;계좌번호&nbsp;및&nbsp;비밀번호,&nbsp;인터넷뱅킹&nbsp;아이디&nbsp;및&nbsp;비밀번호&nbsp;⑤&nbsp;주소&nbsp;⑥&nbsp;연락처&nbsp;⑦&nbsp;이메일&nbsp;⑧&nbsp;서비스&nbsp;이용기록&nbsp;⑨&nbsp;접속로그</li>
    <li>제1항의&nbsp;필수&nbsp;회원&nbsp;정보&nbsp;항목&nbsp;이외에&nbsp;회원가입&nbsp;시&nbsp;회원이&nbsp;원할&nbsp;경우에&nbsp;추가&nbsp;정보를&nbsp;선택하여&nbsp;제공하실&nbsp;수&nbsp;있도록&nbsp;되어&nbsp;있으며&nbsp;일부&nbsp;서비스에&nbsp;대한&nbsp;신청&nbsp;및&nbsp;접수&nbsp;시에&nbsp;회원이&nbsp;원하는&nbsp;정확한&nbsp;서비스&nbsp;내용을&nbsp;파악하여&nbsp;계약&nbsp;및&nbsp;결재를&nbsp;원활하게&nbsp;하기&nbsp;위하여&nbsp;추가적인&nbsp;정보를&nbsp;요구할&nbsp;수&nbsp;있습니다.</li>
    <li>필수&nbsp;회원정보&nbsp;중&nbsp;e-mail&nbsp;주소는&nbsp;서비스와&nbsp;관련된&nbsp;통지의&nbsp;수단&nbsp;이외에&nbsp;홍보성&nbsp;메일이나&nbsp;정기적ㆍ비정기적&nbsp;정보&nbsp;제공의&nbsp;수단으로&nbsp;사용될&nbsp;수&nbsp;있습니다.&nbsp;단&nbsp;회원이&nbsp;원하지&nbsp;않을&nbsp;경우&nbsp;회사는&nbsp;해당&nbsp;회원을&nbsp;e-mail&nbsp;대량발송의&nbsp;대상으로부터&nbsp;제외합니다.</li>
    <li>회사에&nbsp;광고를&nbsp;게재하는&nbsp;광고주나&nbsp;서비스를&nbsp;제휴하여&nbsp;링크&nbsp;되어있는&nbsp;사이트에서&nbsp;별도로&nbsp;개인정보를&nbsp;수집할&nbsp;경우,&nbsp;개인정보를&nbsp;수집하는&nbsp;행위에&nbsp;대해서는&nbsp;본&nbsp;개인정보취급방침이&nbsp;적용되지&nbsp;않음을&nbsp;알려드립니다.</li>
</ol>
제4조&nbsp;[개인정보의&nbsp;수집목적&nbsp;및&nbsp;이용목적]
<ol>
    <li>회사는&nbsp;다음과&nbsp;같은&nbsp;목적을&nbsp;위하여&nbsp;개인정보를&nbsp;수집합니다.&nbsp;①&nbsp;회사의&nbsp;서비스&nbsp;제공&nbsp;②&nbsp;인터넷&nbsp;금융상담&nbsp;서비스&nbsp;제공&nbsp;③&nbsp;인터넷&nbsp;금융상품&nbsp;중개서비스&nbsp;제공</li>
    <li>회원의&nbsp;개인정보는&nbsp;동조&nbsp;제1항에서&nbsp;밝힌&nbsp;목적&nbsp;이외에는&nbsp;사용하지&nbsp;않습니다.</li>
</ol>
제5조&nbsp;[개인정보의&nbsp;공유&nbsp;및&nbsp;제공]
<ol>
    <li>회사는&nbsp;회원의&nbsp;개인정보를&nbsp;제4조&nbsp;'개인정보의&nbsp;수집목적&nbsp;및&nbsp;이용목적'과&nbsp;무관한&nbsp;제&nbsp;3자에게&nbsp;제공하지&nbsp;않습니다.&nbsp;단,&nbsp;다음&nbsp;각&nbsp;호의&nbsp;1에&nbsp;해당하는&nbsp;경에는&nbsp;예외로&nbsp;합니다.&nbsp;①&nbsp;회사의&nbsp;이용자에&nbsp;대한&nbsp;당해&nbsp;서비스&nbsp;제공에&nbsp;필요한&nbsp;경우&nbsp;②&nbsp;금융실명거래및비밀보장에관한법률,&nbsp;신용정보의이용및보호에관한법률,&nbsp;전기통신기본법,&nbsp;전기통신사업법,&nbsp;지방세법,&nbsp;소비자보호법,&nbsp;한국은행법,&nbsp;형사소송법&nbsp;등&nbsp;관계법령에&nbsp;특별한&nbsp;규정이&nbsp;있는&nbsp;경우&nbsp;③&nbsp;서비스&nbsp;제공에&nbsp;따른&nbsp;요금&nbsp;정산을&nbsp;위하여&nbsp;필요한&nbsp;경우&nbsp;④&nbsp;관계법령이&nbsp;허용하는&nbsp;한도&nbsp;내에서&nbsp;회사의&nbsp;계열회사&nbsp;또는&nbsp;제휴사에&nbsp;제공하는&nbsp;경우&nbsp;⑤&nbsp;통계작성,&nbsp;학술연구&nbsp;또는&nbsp;시장조사를&nbsp;위하여&nbsp;필요한&nbsp;경우로서&nbsp;특정&nbsp;개인을&nbsp;식별할&nbsp;수&nbsp;없는&nbsp;형태로&nbsp;제공하는&nbsp;경우</li>
    <li>회사는&nbsp;제&nbsp;4조&nbsp;'개인정보의&nbsp;수집목적&nbsp;및&nbsp;이용목적'의&nbsp;범위&nbsp;안에서&nbsp;회원에게&nbsp;보다&nbsp;나은&nbsp;서비스를&nbsp;제공하기&nbsp;위하여&nbsp;회원의&nbsp;동의를&nbsp;받아&nbsp;회원의&nbsp;개인정보를&nbsp;제휴사에&nbsp;제공하거나&nbsp;제휴사와&nbsp;공유할&nbsp;수&nbsp;있습니다.</li>
</ol>
제6조&nbsp;[개인정보의&nbsp;열람·정정&nbsp;및&nbsp;관리]
<ol>
    <li>회원은&nbsp;언제든지&nbsp;등록되어&nbsp;있는&nbsp;회원의&nbsp;개인정보를&nbsp;열람하거나&nbsp;정정하실&nbsp;수&nbsp;있습니다.&nbsp;개인정보&nbsp;열람&nbsp;및&nbsp;정정을&nbsp;하고자&nbsp;할&nbsp;경우에는&nbsp;회사의&nbsp;사이트에&nbsp;로그인&nbsp;하신&nbsp;후&nbsp;'회원가입/정보변경'&nbsp;메뉴에서&nbsp;열람&nbsp;또는&nbsp;정정하거나,&nbsp;개인정보&nbsp;관리책임자에게&nbsp;e-mail로&nbsp;연락하시면&nbsp;됩니다.</li>
    <li>회원이&nbsp;사용하시고&nbsp;있는&nbsp;비밀번호는&nbsp;원칙적으로&nbsp;회원&nbsp;본인만이&nbsp;사용하실&nbsp;수&nbsp;있으며,&nbsp;회사의&nbsp;고의&nbsp;또는&nbsp;중대한&nbsp;과실이&nbsp;없는&nbsp;경우에는&nbsp;개인의&nbsp;비밀번호&nbsp;도용&nbsp;또는&nbsp;유출에&nbsp;대하여&nbsp;회사는&nbsp;책임지지&nbsp;않습니다.</li>
</ol>
제7조&nbsp;[개인정보&nbsp;수집,&nbsp;이용,&nbsp;제공에&nbsp;대한&nbsp;동의&nbsp;철회]&nbsp;회원가입&nbsp;등을&nbsp;통해&nbsp;개인정보의&nbsp;수집,&nbsp;이용,&nbsp;제공에&nbsp;대해&nbsp;회원께서&nbsp;동의하신&nbsp;내용을&nbsp;회원은&nbsp;언제든지&nbsp;철회하실&nbsp;수&nbsp;있습니다.&nbsp;동의철회를&nbsp;하고자&nbsp;하시는&nbsp;경우에는&nbsp;홈페이지의&nbsp;'회원가입/정보변경'&nbsp;메뉴에서&nbsp;회원탈퇴를&nbsp;하시거나&nbsp;개인정보&nbsp;관리책임자에게&nbsp;e-mail&nbsp;등으로&nbsp;연락하시면&nbsp;됩니다.
제8조&nbsp;[개인정보의&nbsp;보유&nbsp;및&nbsp;이용기간]
<ol>
    <li>원칙적으로,&nbsp;개인정보&nbsp;수집&nbsp;및&nbsp;이용목적이&nbsp;달성된&nbsp;후에는&nbsp;해당&nbsp;정보를&nbsp;지체&nbsp;없이&nbsp;파기합니다.&nbsp;단,&nbsp;다음의&nbsp;정보에&nbsp;대해서는&nbsp;아래의&nbsp;이유로&nbsp;명시한&nbsp;기간&nbsp;동안&nbsp;보존합니다.&nbsp;①&nbsp;보존&nbsp;항목&nbsp;:&nbsp;이용자명,&nbsp;생년월일&nbsp;또는&nbsp;사업자번호,&nbsp;로그인IDo비밀번호,&nbsp;계좌&nbsp;번호o비밀번호,&nbsp;인터넷뱅킹&nbsp;아이디o비밀번호,&nbsp;연락처,&nbsp;이메일,&nbsp;서비스&nbsp;이용기록,&nbsp;접속로그&nbsp;②&nbsp;보존&nbsp;근거&nbsp;:&nbsp;서비스&nbsp;이용의&nbsp;혼선방지,&nbsp;분쟁해결&nbsp;및&nbsp;수사기관의&nbsp;요청에&nbsp;따른&nbsp;협조,&nbsp;서비스의&nbsp;부정&nbsp;및&nbsp;불량&nbsp;이용&nbsp;방지&nbsp;및&nbsp;부정/불량이용자의&nbsp;재가입&nbsp;방지&nbsp;③&nbsp;보존&nbsp;기간&nbsp;: 1년</li>
    <li>관계법령의&nbsp;규정에&nbsp;의하여&nbsp;보존할&nbsp;필요가&nbsp;있는&nbsp;경우&nbsp;회사는&nbsp;아래와&nbsp;같이&nbsp;관계법령에서&nbsp;정한&nbsp;일정한&nbsp;기간&nbsp;동안&nbsp;회원정보를&nbsp;보관합니다.&nbsp;①&nbsp;보존&nbsp;항목&nbsp;:&nbsp;결제기록&nbsp;②&nbsp;보존&nbsp;근거&nbsp;:&nbsp;전자상거래등에서의&nbsp;소비자보호에&nbsp;관한&nbsp;법률&nbsp;③&nbsp;보존&nbsp;기간&nbsp;: 5년</li>
</ol>
제9조&nbsp;[개인정보보호를&nbsp;위한&nbsp;기술적&nbsp;대책]&nbsp;회사는&nbsp;회원의&nbsp;개인정보를&nbsp;취급함에&nbsp;있어&nbsp;개인정보가&nbsp;분실,&nbsp;도난,&nbsp;누출,&nbsp;변조&nbsp;또는&nbsp;훼손되지&nbsp;않도록&nbsp;안전성&nbsp;확보를&nbsp;위하여&nbsp;다음과&nbsp;같은&nbsp;기술적&nbsp;대책을&nbsp;가지고&nbsp;있습니다.
<ol>
    <li>회원의&nbsp;개인정보는&nbsp;비밀번호에&nbsp;의해&nbsp;보호되며,&nbsp;파일&nbsp;및&nbsp;전송&nbsp;데이터를&nbsp;암호화하거나&nbsp;파일&nbsp;잠금&nbsp;기능을&nbsp;사용</li>
    <li>암호&nbsp;알고리즘을&nbsp;이용하여&nbsp;네트워크&nbsp;상의&nbsp;개인정보를&nbsp;안전하게&nbsp;전송할&nbsp;수&nbsp;있는&nbsp;보안장치를&nbsp;채택</li>
    <li>해킹&nbsp;등에&nbsp;의해&nbsp;회원의&nbsp;개인정보가&nbsp;유출되는&nbsp;것을&nbsp;방지하기&nbsp;위해,&nbsp;외부로부터의&nbsp;침입을&nbsp;차단하는&nbsp;장치를&nbsp;이용</li>
</ol>
제10조&nbsp;[개인정보보호를&nbsp;위한&nbsp;관리적&nbsp;대책]
<ol>
    <li>회사는&nbsp;회원의&nbsp;개인정보를&nbsp;취급할&nbsp;수&nbsp;있는&nbsp;인력을&nbsp;최소한으로&nbsp;한정하고&nbsp;해당&nbsp;인원에게&nbsp;정기적,&nbsp;비정기적&nbsp;보안&nbsp;교육을&nbsp;실시합니다.</li>
    <li>회사는&nbsp;개인정보를&nbsp;처리하는&nbsp;시스템의&nbsp;사용자를&nbsp;지정하여&nbsp;사용자&nbsp;비밀번호를&nbsp;부여하고&nbsp;이를&nbsp;정기적으로&nbsp;갱신합니다.</li>
</ol>
제11조&nbsp;[개인정보의&nbsp;위탁처리]
<ol>
    <li>회사는&nbsp;서비스&nbsp;향상을&nbsp;위해서&nbsp;회원의&nbsp;개인정보를&nbsp;외부에&nbsp;위탁하여&nbsp;처리할&nbsp;수&nbsp;있습니다.&nbsp;이&nbsp;경우에는&nbsp;미리&nbsp;그&nbsp;사실을&nbsp;회원에게&nbsp;고지합니다.</li>
    <li>개인정보의&nbsp;처리를&nbsp;위탁하는&nbsp;경우에는&nbsp;위탁계약&nbsp;등을&nbsp;통하여&nbsp;서비스&nbsp;제공자의&nbsp;개인정보보호&nbsp;관련&nbsp;지시엄수,&nbsp;개인정보에&nbsp;관한&nbsp;비밀유지,&nbsp;제3자&nbsp;제공의&nbsp;금지&nbsp;및&nbsp;사고시의&nbsp;책임부담&nbsp;등을&nbsp;명확히&nbsp;규정하고&nbsp;당해&nbsp;계약내용을&nbsp;서면&nbsp;또는&nbsp;전자적으로&nbsp;보관합니다.</li>
</ol>
제12조&nbsp;[쿠키의&nbsp;사용]&nbsp;회사는&nbsp;회원인증을&nbsp;위하여&nbsp;쿠키(cookie)를&nbsp;사용합니다.&nbsp;쿠키는&nbsp;로그아웃&nbsp;시에&nbsp;자동으로&nbsp;PC에&nbsp;저장되지&nbsp;않고&nbsp;삭제되도록&nbsp;되어있으므로&nbsp;공공장소나&nbsp;타인이&nbsp;사용할&nbsp;수&nbsp;있는&nbsp;PC를&nbsp;사용하실&nbsp;경우에는&nbsp;로그인&nbsp;후&nbsp;서비스&nbsp;이용이&nbsp;끝나시면&nbsp;반드시&nbsp;로그아웃을&nbsp;해&nbsp;주시기&nbsp;바랍니다.&nbsp;단,&nbsp;회원이&nbsp;사용하는&nbsp;브라우저의&nbsp;설정&nbsp;변경에&nbsp;의해&nbsp;쿠키의&nbsp;사용을&nbsp;거부할&nbsp;수&nbsp;있으나&nbsp;이&nbsp;경우&nbsp;사이트&nbsp;이용에&nbsp;여러&nbsp;가지&nbsp;불편이&nbsp;있을&nbsp;수&nbsp;있습니다.
제13조&nbsp;[개인정보&nbsp;관리책임자]&nbsp;회사는&nbsp;개인정보에&nbsp;대한&nbsp;의견수렴&nbsp;및&nbsp;불만처리를&nbsp;담당하는&nbsp;개인정보&nbsp;관리책임자를&nbsp;지정하고&nbsp;있습니다.&nbsp;개인정보&nbsp;관리책임자는&nbsp;다음과&nbsp;같습니다.&nbsp;성&nbsp;명:&nbsp;강헌&nbsp;소속:&nbsp;경영지원/대표이사&nbsp;전화번호: (02)3663-3247 e-mail:&nbsp;<a>hkang@jangbuda.com</a>
제14조&nbsp;[의견수렴&nbsp;및&nbsp;불만처리]&nbsp;회사는&nbsp;개인정보보호와&nbsp;관련하여&nbsp;회원이&nbsp;의견과&nbsp;불만을&nbsp;제기할&nbsp;수&nbsp;있는&nbsp;창구를&nbsp;개설하고&nbsp;있습니다.&nbsp;개인정보보호와&nbsp;관련한&nbsp;불만이&nbsp;있으신&nbsp;분은&nbsp;제13조의&nbsp;개인정보&nbsp;관리책임자에게&nbsp;의견을&nbsp;주시면&nbsp;접수&nbsp;즉시&nbsp;조치하여&nbsp;처리결과를&nbsp;통보해&nbsp;드립니다.
(부칙) I. (시행일) 본 개인정보취급방침은 2023년 06월 01일부터 적용됩니다. II. 기타 상세사항은 고객만족센터((02)3663-3247~8)로 문의 바랍니다.
`
export const regesterInput3 = `
<p>제&nbsp;1조&nbsp;(목적)&nbsp;이&nbsp;약관은&nbsp;(주)장부다(이하&nbsp;&apos;회사&apos;)가&nbsp;제공하는&nbsp;비영리법인&nbsp;시설&nbsp;운영&nbsp;및&nbsp;관리&nbsp;서비스(이하&nbsp;&apos;서비스&apos;)를&nbsp;이용하는&nbsp;이용자(이하&nbsp;&apos;이용자&apos;)와&nbsp;회사&nbsp;간&nbsp;기타서비스&nbsp;이용에&nbsp;관한&nbsp;기본적인&nbsp;사항을&nbsp;규정하는&nbsp;것을&nbsp;목적으로&nbsp;합니다.</p>
<p>제&nbsp;2조&nbsp;(회계서비스의&nbsp;진행)&nbsp;①&nbsp;장부다&nbsp;이용자의&nbsp;회계서비스는&nbsp;이용자에&nbsp;의해&nbsp;업무가&nbsp;진행됩니다.&nbsp;②&nbsp;이용자의&nbsp;실수&nbsp;또는&nbsp;부주의로&nbsp;인해&nbsp;발생되는&nbsp;모든&nbsp;책임은&nbsp;이용자에게&nbsp;있으며,&nbsp;회사에&nbsp;책임&nbsp;또는&nbsp;배상을&nbsp;청구할&nbsp;수&nbsp;없습니다.</p>
<p>제&nbsp;2조&nbsp;(입력대행서비스의&nbsp;진행)&nbsp;①&nbsp;장부다&nbsp;이용자의&nbsp;입력대행서비스는&nbsp;장부다&nbsp;소속&nbsp;직원에&nbsp;의해&nbsp;업무가&nbsp;진행됩니다.&nbsp;②&nbsp;입력대행서비스는&nbsp;기본계약의&nbsp;신청&nbsp;접수가&nbsp;된&nbsp;요청월로부터&nbsp;서비스&nbsp;진행됨을&nbsp;원칙으로&nbsp;하며,&nbsp;기한이&nbsp;지난&nbsp;회계자료의&nbsp;입력대행&nbsp;요청시&nbsp;이용자가&nbsp;유선&nbsp;또는&nbsp;기타의&nbsp;방법으로&nbsp;별도&nbsp;요청&nbsp;후&nbsp;별도&nbsp;대금이&nbsp;청구됩니다.&nbsp;③&nbsp;입력대행서비스는&nbsp;이용자로&nbsp;부터&nbsp;전달받은&nbsp;회계데이터&nbsp;및&nbsp;영수증을&nbsp;바탕으로&nbsp;입력대행서비스가&nbsp;진행됨을&nbsp;원칙으로&nbsp;합니다.&nbsp;④&nbsp;이용자는&nbsp;입력대행서비스에&nbsp;필요한&nbsp;자료를&nbsp;회계보고&nbsp;마감일&nbsp;5영업일&nbsp;전까지&nbsp;빠짐없이&nbsp;적극적으로&nbsp;알려주어야&nbsp;하며,&nbsp;자료가&nbsp;미흡하거나&nbsp;전송&nbsp;또는&nbsp;전달되지&nbsp;않아&nbsp;입력대행을&nbsp;하지&nbsp;못한&nbsp;경우,&nbsp;이에&nbsp;대한&nbsp;모든&nbsp;책임은&nbsp;이용자가&nbsp;가집니다.&nbsp;⑤&nbsp;이용자는&nbsp;입력대행서비스에&nbsp;필요한&nbsp;자료를&nbsp;전산데이터형식(엑셀)으로&nbsp;전송,&nbsp;전달하여&nbsp;회사가&nbsp;확인할&nbsp;수&nbsp;있도록&nbsp;제공해야&nbsp;하며,&nbsp;미&nbsp;전송,&nbsp;미&nbsp;전달&nbsp;및&nbsp;확인이&nbsp;불명확한&nbsp;사항에&nbsp;대한&nbsp;불이익은&nbsp;모두&nbsp;이용자가&nbsp;책임을&nbsp;가집니다.&nbsp;⑥&nbsp;이용자가&nbsp;입력대행서비스&nbsp;등록과&nbsp;동시에&nbsp;수임료를&nbsp;자동이체로&nbsp;선택한&nbsp;경우,&nbsp;가장&nbsp;가까운&nbsp;이체일(05일,12일,19일)에&nbsp;해당금액이&nbsp;청구됩니다.&nbsp;⑦&nbsp;무통장&nbsp;입금&nbsp;시&nbsp;회사&nbsp;홈페이지에&nbsp;개시된&nbsp;회사&nbsp;은행계좌로&nbsp;입금&nbsp;또는&nbsp;자동이체되어야&nbsp;하며,&nbsp;그러지&nbsp;않은&nbsp;경우&nbsp;본&nbsp;계약은&nbsp;성립되지&nbsp;않습니다.&nbsp;⑧&nbsp;위&nbsp;내용으로&nbsp;입력대행서비스가&nbsp;진행되지&nbsp;않아&nbsp;발생되는&nbsp;모든&nbsp;책임은&nbsp;이용자에게&nbsp;있으며,&nbsp;회사에&nbsp;책임&nbsp;또는&nbsp;배상을&nbsp;청구할&nbsp;수&nbsp;없습니다.</p>
<p>제&nbsp;3조&nbsp;(서비스&nbsp;이용&nbsp;중지&nbsp;또는&nbsp;계약의&nbsp;해지)&nbsp;①&nbsp;회계서비스&nbsp;또는&nbsp;입력대행서비스는&nbsp;이용자의&nbsp;사정으로&nbsp;인하여&nbsp;계약을&nbsp;해지하거나&nbsp;서비스의&nbsp;이용중지를&nbsp;요청할&nbsp;수&nbsp;있습니다.</p>
<p>제&nbsp;4조&nbsp;서비스&nbsp;취소(환급)&nbsp;①&nbsp;계약&nbsp;당월&nbsp;수임료&nbsp;입금과&nbsp;회계데이터의&nbsp;전송,&nbsp;전달&nbsp;등의&nbsp;방법에&nbsp;의해&nbsp;업무담당자로부터&nbsp;입력이&nbsp;진행된&nbsp;내역이&nbsp;확인된&nbsp;경우&nbsp;환급이&nbsp;불가능&nbsp;합니다.</p>
<p>부칙 이 약관은 2023년 06월 01일부터 적용됩니다.</p>
`
export const regesterInput4 = `
<p>제&nbsp;1조&nbsp;(목적)&nbsp;이&nbsp;약관은&nbsp;(주)장부다(이하&nbsp;&apos;회사&apos;)가&nbsp;제공하는&nbsp;비영리법인&nbsp;시설&nbsp;운영&nbsp;및&nbsp;관리&nbsp;서비스(이하&nbsp;&apos;서비스&apos;)를&nbsp;이용하는&nbsp;이용자(이하&nbsp;&apos;이용자&apos;)와&nbsp;회사&nbsp;간&nbsp;부가서비스&nbsp;이용에&nbsp;관한&nbsp;기본적인&nbsp;사항을&nbsp;규정하는&nbsp;것을&nbsp;목적으로&nbsp;합니다.</p>
<p>제&nbsp;2조&nbsp;(정보제공&nbsp;동의)&nbsp;급여서비스는&nbsp;회사와&nbsp;㈜뱅크다,&nbsp;경기세무법인(이하&nbsp;&lsquo;세무법인&rsquo;이라&nbsp;함)의&nbsp;업무체결로&nbsp;㈜뱅크다에서&nbsp;제공하는&nbsp;프로그램을&nbsp;이용하여&nbsp;경기세무법인에서&nbsp;국세청에&nbsp;근로소득을&nbsp;신고하는&nbsp;서비스로&nbsp;이용자가&nbsp;제공한&nbsp;정보는&nbsp;서비스&nbsp;이용을&nbsp;위해&nbsp;정보제공에&nbsp;동의한&nbsp;것이며,&nbsp;회사와&nbsp;㈜뱅크다,&nbsp;경기세무법인에&nbsp;제공됩니다.&nbsp;이용자로부터&nbsp;제공받는&nbsp;항목은&nbsp;고객사정보(고객사명,&nbsp;대표자명,&nbsp;시설장명,&nbsp;대표자주민등록번호)와&nbsp;종사자정보(이름,&nbsp;주민등록번호,&nbsp;급여,&nbsp;입사일,&nbsp;퇴사일)입니다.</p>
<p>제&nbsp;3조&nbsp;(급여신고서비스&nbsp;진행)&nbsp;①&nbsp;장부다&nbsp;이용자의&nbsp;홈텍스를&nbsp;통한&nbsp;급여신고업무는&nbsp;세무법인에서&nbsp;진행합니다.&nbsp;②&nbsp;급여신고서비스는&nbsp;신청&nbsp;접수가&nbsp;된&nbsp;날&nbsp;또는&nbsp;요청월로부터&nbsp;서비스&nbsp;진행됨을&nbsp;원칙으로&nbsp;하며,&nbsp;기한이&nbsp;지난&nbsp;신고를&nbsp;이용자가&nbsp;요청할&nbsp;경우&nbsp;가산세는&nbsp;이용자가&nbsp;부담&nbsp;합니다.&nbsp;③&nbsp;급여신고서비스는&nbsp;이용자로&nbsp;부터&nbsp;전달받은&nbsp;인적사항을&nbsp;바탕으로&nbsp;하여&nbsp;급여신고가&nbsp;진행됨을&nbsp;원칙으로&nbsp;합니다.&nbsp;④&nbsp;이용자는&nbsp;급여신고서비스에&nbsp;필요한&nbsp;자료를&nbsp;빠짐없이&nbsp;적극적으로&nbsp;알려주어야&nbsp;하며,&nbsp;자료가&nbsp;미흡하여&nbsp;급여신고를&nbsp;하지&nbsp;못한&nbsp;경우,&nbsp;이에&nbsp;대한&nbsp;모든&nbsp;책임은&nbsp;이용자가&nbsp;가집니다.&nbsp;⑤&nbsp;이용자는&nbsp;교사변동(입/퇴사,&nbsp;급여&nbsp;변경)이&nbsp;있을&nbsp;시,&nbsp;즉시&nbsp;회사&nbsp;또는&nbsp;세무법인에&nbsp;알려주어야&nbsp;할&nbsp;의무가&nbsp;있으며,&nbsp;신고&nbsp;기간이&nbsp;지난&nbsp;이후&nbsp;수정되는&nbsp;사항에&nbsp;대한&nbsp;불이익은&nbsp;모두&nbsp;이용자가&nbsp;책임을&nbsp;가집니다.&nbsp;⑥&nbsp;이용자의&nbsp;교사변동&nbsp;및&nbsp;급여변경이&nbsp;있었음에도&nbsp;불구하고&nbsp;회사&nbsp;또는&nbsp;세무법인에&nbsp;그&nbsp;사실을&nbsp;알리지&nbsp;않았을&nbsp;경우&nbsp;업무의&nbsp;효율을&nbsp;위하여&nbsp;회사는&nbsp;전월과&nbsp;동일하게&nbsp;급여신고를&nbsp;할&nbsp;수&nbsp;있습니다.&nbsp;⑦&nbsp;이용자가&nbsp;급여신고서비스&nbsp;등록과&nbsp;동시에&nbsp;수임료를&nbsp;자동이체로&nbsp;선택한&nbsp;경우,&nbsp;가장&nbsp;가까운&nbsp;이체일(05일,12일,19일)에&nbsp;해당금액이&nbsp;청구됩니다.&nbsp;⑧&nbsp;무통장&nbsp;입금&nbsp;시&nbsp;회사&nbsp;홈페이지에&nbsp;개시된&nbsp;회사&nbsp;은행계좌로&nbsp;입금&nbsp;또는&nbsp;자동이체되어야&nbsp;하며,&nbsp;그러지&nbsp;않은&nbsp;경우&nbsp;본&nbsp;계약은&nbsp;성립되지&nbsp;않습니다.&nbsp;⑨&nbsp;이용자는&nbsp;해당&nbsp;월&nbsp;신고내역의&nbsp;변경내역&nbsp;통보는&nbsp;매월&nbsp;25일까지&nbsp;완료됨을&nbsp;원칙으로&nbsp;합니다.&nbsp;⑩&nbsp;해당월의&nbsp;급여&nbsp;신고는&nbsp;익월&nbsp;10일까지&nbsp;세무법인에서&nbsp;진행됨을&nbsp;원칙으로&nbsp;합니다.&nbsp;⑪&nbsp;위&nbsp;내용으로&nbsp;급여신고가&nbsp;진행되지&nbsp;않아&nbsp;발생되는&nbsp;모든&nbsp;책임은&nbsp;회사가&nbsp;지지&nbsp;않습니다.</p>
<p>제&nbsp;4조&nbsp;(연말정산&nbsp;및&nbsp;간이지급명세서&nbsp;신고서비스&nbsp;진행)&nbsp;①&nbsp;장부다&nbsp;이용자의&nbsp;홈텍스를&nbsp;통한&nbsp;지급조서&nbsp;및&nbsp;간이지급명세서&nbsp;신고&nbsp;업무는&nbsp;세무법인에서&nbsp;진행합니다.&nbsp;②&nbsp;연말정산신고서비스는&nbsp;매년&nbsp;12월까지&nbsp;급여신고가&nbsp;이루어&nbsp;진&nbsp;경우에&nbsp;한하여&nbsp;신고서비스가&nbsp;가능합니다.&nbsp;간이지급명세서신고서비스는&nbsp;각&nbsp;상반기(1~6월),&nbsp;하반기(7~12월)&nbsp;급여신고가&nbsp;이루어&nbsp;진&nbsp;경우에&nbsp;한하여&nbsp;신고서비스가&nbsp;가능합니다.&nbsp;③&nbsp;연말정산신고서비스는&nbsp;매년&nbsp;12월까지&nbsp;서비스&nbsp;수임을&nbsp;한&nbsp;해당년도의&nbsp;원천징수영수증(지급명세서)의&nbsp;제출만을&nbsp;의무로&nbsp;합니다.&nbsp;간이지급명세서신고서비스는&nbsp;상반기(1~6월),&nbsp;하반기(7~12월)&nbsp;서비스&nbsp;수임을&nbsp;한&nbsp;기간의&nbsp;간이지급명세서&nbsp;신고서&nbsp;제출만을&nbsp;의무로&nbsp;합니다.&nbsp;④&nbsp;연말정산신고서비스는&nbsp;매년&nbsp;3월&nbsp;10일까지&nbsp;신고되며,&nbsp;연말정산&nbsp;소득공제자료&nbsp;접수마감은&nbsp;매년&nbsp;1월&nbsp;31일까지로&nbsp;합니다.&nbsp;간이지급명세서신고서비스는&nbsp;상반기(1~6월)는&nbsp;7월31일까지,&nbsp;하반기(7월~12월)는&nbsp;1월31일까지&nbsp;신고됩니다.&nbsp;⑤&nbsp;1월&nbsp;31일까지&nbsp;연말정산&nbsp;소득공제자료&nbsp;미제출로&nbsp;인한&nbsp;불이익은&nbsp;이용자가&nbsp;책임을&nbsp;가집니다.&nbsp;⑥&nbsp;매월&nbsp;&lsquo;급여변동사항&rsquo;&nbsp;및&nbsp;교사변동사항(인적사항)&nbsp;미통보로&nbsp;인하여&nbsp;급여신고서비스가&nbsp;진행되지&nbsp;않은&nbsp;이용자에&nbsp;대해서는&nbsp;연말정산신고서비스를&nbsp;진행하지&nbsp;않을&nbsp;수&nbsp;있으며,&nbsp;이에&nbsp;대한&nbsp;모든&nbsp;책임은&nbsp;이용자가&nbsp;가집니다.&nbsp;⑦&nbsp;위&nbsp;해당사항으로&nbsp;연말정산신고서비스와&nbsp;간이지급명세서&nbsp;신고서비스가&nbsp;되지&nbsp;않아&nbsp;발생되는&nbsp;모든&nbsp;책임은&nbsp;회사가&nbsp;가지지&nbsp;않습니다.</p>
<p>제&nbsp;5조&nbsp;(서비스&nbsp;이용&nbsp;중지&nbsp;또는&nbsp;계약의&nbsp;해지)&nbsp;①&nbsp;급여신고서비스는&nbsp;이용자의&nbsp;사정으로&nbsp;인하여&nbsp;계약을&nbsp;해지하거나&nbsp;서비스의&nbsp;이용중지를&nbsp;요청할&nbsp;수&nbsp;있습니다.&nbsp;②&nbsp;급여신고서비스는&nbsp;세무법인에서&nbsp;업무가&nbsp;진행되므로&nbsp;회계장부와&nbsp;별도&nbsp;해지신청이&nbsp;되어야&nbsp;해지가&nbsp;성립됩니다.</p>
<p>제&nbsp;6조&nbsp;서비스&nbsp;취소(환급)&nbsp;①&nbsp;계약&nbsp;당월&nbsp;수임료&nbsp;입금과&nbsp;신고&nbsp;된&nbsp;내역이&nbsp;확인된&nbsp;경우&nbsp;환급이&nbsp;불가능&nbsp;합니다.</p>
<p>제&nbsp;7조&nbsp;(개인정보보호)&nbsp;①&nbsp;회사는&nbsp;개인정보보호를&nbsp;위해&nbsp;개인정보보호법&nbsp;제26조&nbsp;및&nbsp;동법&nbsp;시행령&nbsp;제28조에&nbsp;의거하여&nbsp;다음&nbsp;각&nbsp;호의&nbsp;사항을&nbsp;준수합니다.</p>
<ol start="1" type="1">
    <li>개인정보의&nbsp;처리&nbsp;금지에&nbsp;관한&nbsp;사항&nbsp;㉠.&nbsp;회사는&nbsp;계약&nbsp;종료&nbsp;후에도&nbsp;본&nbsp;약관의&nbsp;업무수행&nbsp;목적&nbsp;범위를&nbsp;넘어&nbsp;이용자의&nbsp;정보를&nbsp;이용하거나&nbsp;이를&nbsp;제3자에게&nbsp;제공&nbsp;또는&nbsp;누설하지&nbsp;아니합니다.&nbsp;㉡.&nbsp;회사는&nbsp;계약이&nbsp;해지&nbsp;또는&nbsp;계약기간이&nbsp;만료된&nbsp;경우&nbsp;위탁업무와&nbsp;관련하여&nbsp;보유하고&nbsp;있는&nbsp;개인정보를&nbsp;개인정보보호법&nbsp;시행령&nbsp;제16조&nbsp;및&nbsp;개인정보의&nbsp;안전성&nbsp;확보조치기준(행정자치부&nbsp;고시&nbsp;제2014-7호)에&nbsp;따라&nbsp;즉시&nbsp;파기하거나&nbsp;이용자에게&nbsp;반납합니다.&nbsp;단,&nbsp;위탁업무&nbsp;중&nbsp;발생된&nbsp;전산자료는&nbsp;&ldquo;국세기본법&nbsp;85조3항&rdquo;에&nbsp;자료보관&nbsp;기준에&nbsp;따라&nbsp;일정&nbsp;시일&nbsp;후&nbsp;일괄&nbsp;파기됩니다.&nbsp;㉢.&ldquo;나&rdquo;항에&nbsp;따라&nbsp;이용자의&nbsp;개인정보를&nbsp;파기한&nbsp;경우&nbsp;지체없이&nbsp;이용자에게&nbsp;그&nbsp;결과를&nbsp;통보합니다.</li>
    <li>개인정보의&nbsp;기술적,&nbsp;관리적&nbsp;보호조치&nbsp;및&nbsp;안전성&nbsp;확보에&nbsp;관한&nbsp;사항&nbsp;㉠.&nbsp;회사는&nbsp;개인정보&nbsp;보호법&nbsp;제24조제3항&nbsp;및&nbsp;제29조,&nbsp;동법&nbsp;시행령&nbsp;제21조&nbsp;및&nbsp;제30조,&nbsp;개인정보의&nbsp;안전성&nbsp;확보&nbsp;조치&nbsp;기준(행정자치부&nbsp;고시&nbsp;제2014-7호)에&nbsp;따라&nbsp;개인정보의&nbsp;안전성&nbsp;확보에&nbsp;필요한&nbsp;관리적,&nbsp;기술적&nbsp;조치를&nbsp;취합니다.</li>
    <li>재위탁&nbsp;제한에&nbsp;관한&nbsp;사항&nbsp;㉠.&nbsp;회사는&nbsp;이용자의&nbsp;사전&nbsp;승낙을&nbsp;얻은&nbsp;경우를&nbsp;제외하고&nbsp;이용자의&nbsp;계약상의&nbsp;권리와&nbsp;의무의&nbsp;전부&nbsp;또는&nbsp;일부를&nbsp;제3자에게&nbsp;양도하거나&nbsp;재위탁&nbsp;하지&nbsp;않습니다.&nbsp;㉡.&nbsp;회사가&nbsp;재위탁받은&nbsp;수탁회사를&nbsp;선임한&nbsp;경우&nbsp;회사는&nbsp;당해&nbsp;재위탁계약서와&nbsp;함께&nbsp;그&nbsp;사실을&nbsp;즉시&nbsp;이용자에게&nbsp;통보합니다.</li>
    <li>회사&nbsp;관리,&nbsp;감독에&nbsp;과한&nbsp;사항&nbsp;㉠.&nbsp;이용자는&nbsp;회사에&nbsp;대하여&nbsp;다음&nbsp;각&nbsp;호의&nbsp;사항을&nbsp;관리하도록&nbsp;요구할&nbsp;수&nbsp;있으며,&nbsp;회사는&nbsp;특별한&nbsp;사유가&nbsp;없는&nbsp;한&nbsp;이에&nbsp;응합니다.</li>
</ol>
<ul type="disc">
    <li>개인정보의&nbsp;처리&nbsp;현황</li>
    <li>개인정보의&nbsp;접근&nbsp;또는&nbsp;접속현황</li>
    <li>개인정보&nbsp;접근&nbsp;또는&nbsp;접속&nbsp;대상자</li>
    <li>목적&nbsp;외&nbsp;이용,&nbsp;제공&nbsp;및&nbsp;재위탁&nbsp;금지&nbsp;준수여부</li>
    <li>암호화&nbsp;등&nbsp;안전성&nbsp;확보조치&nbsp;이행여부</li>
    <li>그&nbsp;밖에&nbsp;개인정보의&nbsp;보호를&nbsp;위하여&nbsp;필요한&nbsp;사항&nbsp;㉡.&nbsp;이용자는&nbsp;회사에&nbsp;대하여&nbsp;㉠항의&nbsp;각호의&nbsp;사항에&nbsp;대한&nbsp;실태를&nbsp;점검하여&nbsp;시정을&nbsp;요구할&nbsp;수&nbsp;있으며,&nbsp;회사는&nbsp;특별한&nbsp;사유가&nbsp;없는&nbsp;한&nbsp;이행하여야&nbsp;합니다.&nbsp;㉢.&nbsp;회사는&nbsp;본&nbsp;업무로&nbsp;인하여&nbsp;정보주체의&nbsp;개인정보가&nbsp;분실,도난,유출,변조&nbsp;또는&nbsp;훼손되지&nbsp;아니하도록&nbsp;1년&nbsp;1회&nbsp;자체&nbsp;교육을&nbsp;시행합니다.&nbsp;㉣.&nbsp;전항에&nbsp;따른&nbsp;교육&nbsp;실시&nbsp;후&nbsp;그&nbsp;근거를&nbsp;유지합니다.</li>
</ul>
<ol start="1" type="1">
    <li>손해배상&nbsp;등&nbsp;책임에&nbsp;관한&nbsp;사항&nbsp;㉠.&nbsp;회사&nbsp;또는&nbsp;회사의&nbsp;수탁자가&nbsp;이&nbsp;계약에&nbsp;의하여&nbsp;위탁&nbsp;또는&nbsp;재위탁&nbsp;받은&nbsp;업무를&nbsp;수행함에&nbsp;있어&nbsp;이&nbsp;계약에&nbsp;따른&nbsp;의무를&nbsp;위반하거나&nbsp;회사&nbsp;또는&nbsp;회사의&nbsp;수탁자의&nbsp;귀책사유로&nbsp;인하여&nbsp;이&nbsp;계약이&nbsp;해지&nbsp;되어&nbsp;이용자&nbsp;또는&nbsp;개인정보주체&nbsp;기타&nbsp;제3자에게&nbsp;손해가&nbsp;발생한&nbsp;경우&nbsp;회사는&nbsp;그&nbsp;손해를&nbsp;배상하여야&nbsp;합니다.&nbsp;㉡.&nbsp;㉠항과&nbsp;관련하여&nbsp;개인정보주체&nbsp;기타&nbsp;제3자에게&nbsp;발생한&nbsp;손해에&nbsp;대하여&nbsp;이용자가&nbsp;전부&nbsp;또는&nbsp;일부를&nbsp;배상한&nbsp;때에는&nbsp;이용자는&nbsp;이를&nbsp;회사에&nbsp;구상할&nbsp;수&nbsp;있습니다.</li>
</ol>
<p>부칙 이 약관은 2023년 06월 01일부터 적용됩니다.</p>
`