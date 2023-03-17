export default [
  {
    title: "Back Office",
    id: "bf-000",
    subMenus: [
      {
        title: "회원관리",
        id: "bf-200",
        subMenus: [
          { title: "회원등록", url: "/dashboard/bf-210", id: "bf-210" },
          { title: "권한그룹관리", url: "/dashboard/bf-220", id: "bf-220" },
        ],
      },
      {
        title: "계약관리",
        id: "bf-300",
        subMenus: [
          { title: "계약정보관리&심사", url: "/dashboard/bf-310",id: "bf-310"},
          { title: "사업자관리", url: "/dashboard/bf-320", id: "bf-320" },
          { title: "서비스관리", url: "/dashboard/bf-330", id: "bf-330" },
          { title: "영업자관리", url: "/dashboard/bf-340", id: "bf-340" },
        ],
      },
      {
        title: "수납관리",
        id: "bf-400",
        subMenus: [
          { title: "요금청구,심사", url: "#", id: "bf-410" },
          { title: "서비스해지", url: "#", id: "bf-420" },
          { title: "미납관리", url: "#", id: "bf-430" },          
        ],
      },
      {
        title: "업무마감",
        id: "bf-500",
        subMenus: [
          { title: "회계업무마감", url: "#", id: "bf-510" },          
          { title: "4대보험업무관리", url: "#", id: "bf-530"},          
        ],
      },
      {
        title: "원천업무",
        id: "bf-600",
        subMenus: [
          { title: "원천마감관리", url: "/dashboard/bf-610", id: "bf-610" },
          { title: "원천세/지방소득세전자신고", url: "/dashboard/bf-620", id: "bf-620" },
          { title: "지급명세서전자신고(연말정산)", url: "/dashboard/bf-630", id: "bf-630" },
          { title: "간이지급명세서전자신고", url: "/dashboard/bf-640", id: "bf-640" }, 
          { title: "일용직근로소득지급명세서전자신고", url: "/dashboard/bf-650", id: "bf-650" },
        ],
      },      
    ],
  },
  {
    title: "사용자업무설정",
    id: "cm-100",
    subMenus: [
      { title: "기초정보설정", url: "/dashboard/cm-110", id: "cm-110" },
      {
          title: "회계설정",
          id: "cm-120",
          subMenus: [
            { title: "통장관리", url: "/dashboard/cm-121", id: "cm-121" },
            { title: "수급자관리", url: "#", id: "cm-124" },
            { title: "회계기타", url: "#", id: "cm-125" },
            { title: "계정코드", url: "#", id: "cm-126" },
          ]
      },
      { title: "원천설정", url: "/dashboard/cm-130", id: "cm-130" },
    ],
  },
  {
    title: "회계관리",
    id: "ac-000",
    subMenus: [
      {
        title: "입력/마감",
        id: "ac-100",
        subMenus: [
          { title: "통장내역", url: "/dashboard/ac-110", id: "ac-110" },
          { title: "전표입력", url: "#", id: "ac-120" },
          { title: "마감", url: "#", id: "ac-130" },
        ],
      },
      {
        title: "W4C",
        id: "ac-200",
        subMenus: [
          { title: "전표/결의", url: "#", id: "ac-210" },
          { title: "예산서", url: "#", id: "ac-220" },
          { title: "결산서", url: "#", id: "ac-230" },
        ],
      },
      {
        title: "예산",
        id: "ac-300",
        subMenus: [          
          { title: "예산서자동작성", url: "#", id: "ac-380" },
        ],
      },
      
      {
        title: "보고서",
        id: "ac-500",
        subMenus: [
          { title: "장부", url: "#", id: "ac-510" },
          { title: "예산서", url: "#", id: "ac-520" },
          { title: "정부보조금명세서", url: "#", id: "ac-530" },
          { title: "예비비사용조서", url: "#", id: "ac-540" },
          { title: "사업비명세서", url: "#", id: "ac-550" },
          { title: "기타비용명세서", url: "#", id: "ac-560" },
          { title: "과목전용조서", url: "#", id: "ac-570" },
          { title: "후원금수입 및 사용결과보고서", url: "#", id: "ac-580" },
          { title: "후원금전용계좌의 입출금명세", url: "#", id: "ac-590" },
        ],
      },
      {
        title: "공통업무",
        id: "ac-600",
        subMenus: [
          { title: "거래처등록", url: "/dashboard/ac-610", id: "ac-610" },
          { title: "후원자관리", url: "#", id: "ac-620" },
          { title: "기부금영수증", url: "#", id: "ac-630" },          
        ],
      },

    ],
  },
  {
    title: "원천관리",
    id: "pa-000",
    subMenus: [
      {
        title: "근로소득관리",
        id: "pa-100",
        subMenus: [
          { title: "근로소득자료입력", url: "/dashboard/pa-110", id: "pa-110" },
          { title: "사원등록", url: "/dashboard/pa-120", id: "pa-120" },
        ],
      },
      {
        title: "세무신고/연말정산 관리",
        id: "pa-200",
        subMenus: [
          { title: "원천징수이행상황신고서", url: "/dashboard/pa-210", id: "pa-210" },
          { title: "근로소득원천징수영수증", url: "/dashboard/pa-220", id: "pa-220" },
          { title: "소득자별근로소득원천징수부", url: "/dashboard/pa-230", id: "pa-230" },
          { title: "연말정산간소화입력", url: "#", id: "pa-240" },
          { title: "의료비지급명세서", url: "#", id: "pa-250" },
          { title: "기부금명세서", url: "#", id: "pa-260" },
          { title: "연말정산현황", url: "#", id: "pa-270" },
        ],
      },
     
      {
        title: "퇴직소득관리",
        id: "pa-400",
        subMenus: [
          { title: "퇴직금 시뮬레이션", url: "/dashboard/pa-410", id: "pa-410" },
          { title: "퇴직소득자료입력", url: "/dashboard/pa-420", id: "pa-420" },
          { title: "퇴직소득원천징수영수증", url: "/dashboard/pa-430", id: "pa-430"},
        ],
      },
      {
        title: "일용직근로소득관리",
        id: "pa-500",
        subMenus: [
          {title: "일용직근로소득자료입력", url: "/dashboard/pa-510", id: "pa-510"},
          {title: "일용직사원등록", url: "/dashboard/pa-520", id: "pa-520" },
          {title: "일용직근로소득원천징수영수증", url: "/dashboard/pa-530", id: "pa-530"},
        ],
      },
      {
        title: "사업소득관리",
        id: "pa-600",
        subMenus: [
          { title: "사업소득자등록", url: "/dashboard/pa-610", id: "pa-610" },
          { title: "사업소득자료입력", url: "/dashboard/pa-620", id: "pa-620" },
          { title: "사업소득원천징수영수증", url: "/dashboard/pa-630", id: "pa-630"},
        ],
      },
      {
        title: "기타소득관리",
        id: "pa-700",
        subMenus: [
          { title: "기타소득자등록", url: "/dashboard/pa-710", id: "pa-710"},
          { title: "기타소득자료입력", url: '/dashboard/pa-720', id: "pa-720"},
          { title: "기타소득원천징수영수증", url: "/dashboard/pa-730", id: "pa-730"},
        ],
      },
      {
        title: "4대보험",
        id: "pa-800",
        subMenus: [
          { title: "취득신고등록", url: "/dashboard/pa-810", id: "pa-810" },
          { title: "상실신고", url: "#", id: "pa-820" },
          { title: "급여변경신고", url: "#", id: "pa-830" },
          { title: "휴직복직신고", url: "#", id: "pa-840" },
          { title: "보수총액신고", url: "#", id: "pa-850" },
          { title: "보험사무대행신고", url: "#", id: "pa-860"},
          { title: "사업장가입신고", url: "#", id: "pa-870" },
          { title: "사업장탈퇴신고", url: "#", id: "pa-880" },         
        ],
      },
    
    ],
  },
];
