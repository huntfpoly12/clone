import {AdminScreenRole, WorkScreenRole} from "@bankda/jangbuda-common";

const ALL_ROLE = [...AdminScreenRole.all().map(i => i.enumKey), ...WorkScreenRole.all().map(i => i.enumKey)];
export default [
  {
    title: "Back Office",
    id: "bf-000",
    subMenus: [
      {
        title: "회원관리",
        id: "bf-200",
        subMenus: [
          {title: "회원등록", url: "/dashboard/bf-210", id: "bf-210", roles: ALL_ROLE},
          {title: "권한그룹관리", url: "/dashboard/bf-220", id: "bf-220", roles: ALL_ROLE},
        ],
        roles: ALL_ROLE
      },
      {
        title: "계약관리",
        id: "bf-300",
        subMenus: [
          {title: "계약정보관리&심사", url: "/dashboard/bf-310", id: "bf-310", roles: ALL_ROLE},
          {title: "사업자관리", url: "/dashboard/bf-320", id: "bf-320", roles: ALL_ROLE},
          {title: "서비스관리", url: "/dashboard/bf-330", id: "bf-330", roles: ALL_ROLE},
          {title: "영업자관리", url: "/dashboard/bf-340", id: "bf-340", roles: ALL_ROLE},
        ],
        roles: ALL_ROLE
      },
      {
        title: "수납관리",
        id: "bf-400",
        subMenus: [
          {title: "요금청구,심사", url: "#", id: "bf-410", roles: ALL_ROLE},
          {title: "서비스해지", url: "#", id: "bf-420", roles: ALL_ROLE},
          {title: "미납관리", url: "#", id: "bf-430", roles: ALL_ROLE},
        ],
        roles: ALL_ROLE
      },
      {
        title: "업무마감",
        id: "bf-500",
        subMenus: [
          {title: "회계업무마감", url: "#", id: "bf-510", roles: ALL_ROLE},
          {title: "4대보험업무관리", url: "#", id: "bf-530", roles: ALL_ROLE},
        ],
        roles: ALL_ROLE
      },
      {
        title: "원천업무",
        id: "bf-600",
        subMenus: [
          {title: "원천마감관리", url: "/dashboard/bf-610", id: "bf-610", roles: ALL_ROLE},
          {title: "원천세/지방소득세전자신고", url: "/dashboard/bf-620", id: "bf-620", roles: ALL_ROLE},
          {title: "지급명세서전자신고(연말정산)", url: "/dashboard/bf-630", id: "bf-630", roles: ALL_ROLE},
          {title: "간이지급명세서전자신고", url: "/dashboard/bf-640", id: "bf-640", roles: ALL_ROLE},
          {title: "일용직근로소득지급명세서전자신고", url: "/dashboard/bf-650", id: "bf-650", roles: ALL_ROLE},
        ],
        roles: ALL_ROLE
      },
    ],
  },
  {
    title: "사용자업무설정",
    id: "cm-100",
    subMenus: [
      {title: "기초정보설정", url: "/dashboard/cm-110", id: "cm-110", roles: ALL_ROLE},
      {
        title: "회계설정",
        id: "cm-120",
        subMenus: [
          {title: "통장관리", url: "/dashboard/cm-121", id: "cm-121", roles: ALL_ROLE},
          {title: "수급자관리", url: "#", id: "cm-124", roles: ALL_ROLE},
          {title: "회계기타", url: "#", id: "cm-125", roles: ALL_ROLE},
          {title: "계정코드", url: "#", id: "cm-126", roles: ALL_ROLE},
        ],
        roles: ALL_ROLE

      },
      {title: "원천설정", url: "/dashboard/cm-130", id: "cm-130", roles: ALL_ROLE},
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
          {title: "통장내역", url: "/dashboard/ac-110", id: "ac-110", roles: ALL_ROLE},
          {title: "전표입력", url: "/dashboard/ac-120", id: "ac-120", roles: ALL_ROLE},
          {title: "마감", url: "/dashboard/ac-130", id: "ac-130", roles: ALL_ROLE},
        ],
        roles: [...AdminScreenRole.all(),...WorkScreenRole.all()]
      },
      {
        title: "W4C",
        id: "ac-200",
        subMenus: [
          {title: "전표/결의", url: "#", id: "ac-210", roles: ALL_ROLE},
          {title: "예산서", url: "#", id: "ac-220", roles: ALL_ROLE},
          {title: "결산서", url: "#", id: "ac-230", roles: ALL_ROLE},
        ],
        roles: [...AdminScreenRole.all(),...WorkScreenRole.all()]
      },
      {
        title: "예산",
        id: "ac-300",
        subMenus: [
          {title: "예산서자동작성", url: "#", id: "ac-380", roles: ALL_ROLE},
        ],
        roles: [...AdminScreenRole.all(),...WorkScreenRole.all()]
      },
      {
        title: "보고서",
        id: "ac-500",
        subMenus: [
          {title: "장부", url: "/dashboard/ac-510", id: "ac-510", roles: ALL_ROLE},
          {title: "예산서", url: "/dashboard/ac-520", id: "ac-520", roles: ALL_ROLE},
          {title: "정부보조금명세서", url: "/dashboard/ac-530", id: "ac-530", roles: ALL_ROLE},
          {title: "예비비사용조서", url: "/dashboard/ac-540", id: "ac-540", roles: ALL_ROLE},
          {title: "사업비명세서", url: "/dashboard/ac-550", id: "ac-550", roles: ALL_ROLE},
          {title: "기타비용명세서", url: "/dashboard/ac-560", id: "ac-560", roles: ALL_ROLE},
          {title: "과목전용조서", url: "/dashboard/ac-570", id: "ac-570", roles: ALL_ROLE},
          {title: "후원금수입 및 사용결과보고서", url: "/dashboard/ac-580", id: "ac-580", roles: ALL_ROLE},
          {title: "후원금전용계좌의 입출금명세", url: "/dashboard/ac-590", id: "ac-590", roles: ALL_ROLE},
        ],
        roles: [...AdminScreenRole.all(),...WorkScreenRole.all()]
      },
      {
        title: "공통업무",
        id: "ac-600",
        subMenus: [
          {title: "거래처등록", url: "/dashboard/ac-610", id: "ac-610", roles: ALL_ROLE},
          {title: "후원자관리", url: "#", id: "ac-620", roles: ALL_ROLE},
          {title: "기부금영수증", url: "/dashboard/ac-630", id: "ac-630", roles: ALL_ROLE},
        ],
        roles: [...AdminScreenRole.all(),...WorkScreenRole.all()]
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
          {title: "근로소득자료입력", url: "/dashboard/pa-110", id: "pa-110", roles: ALL_ROLE},
          {title: "사원등록", url: "/dashboard/pa-120", id: "pa-120", roles: ALL_ROLE},
        ],
        roles: [...AdminScreenRole.all(),...WorkScreenRole.all()]
      },
      {
        title: "세무신고/연말정산 관리",
        id: "pa-200",
        subMenus: [
          {title: "원천징수이행상황신고서", url: "/dashboard/pa-210", id: "pa-210", roles: ALL_ROLE},
          {title: "근로소득원천징수영수증", url: "/dashboard/pa-220", id: "pa-220", roles: ALL_ROLE},
          {title: "소득자별근로소득원천징수부", url: "/dashboard/pa-230", id: "pa-230", roles: ALL_ROLE},
          {title: "연말정산간소화입력", url: "#", id: "pa-240", roles: ALL_ROLE},
          {title: "의료비지급명세서", url: "#", id: "pa-250", roles: ALL_ROLE},
          {title: "기부금명세서", url: "#", id: "pa-260", roles: ALL_ROLE},
          {title: "연말정산현황", url: "#", id: "pa-270", roles: ALL_ROLE},
        ],
        roles: [...AdminScreenRole.all(),...WorkScreenRole.all()]
      },

      {
        title: "퇴직소득관리",
        id: "pa-400",
        subMenus: [
          {title: "퇴직금 시뮬레이션", url: "/dashboard/pa-410", id: "pa-410", roles: ALL_ROLE},
          {title: "퇴직소득자료입력", url: "/dashboard/pa-420", id: "pa-420", roles: ALL_ROLE},
          {title: "퇴직소득원천징수영수증", url: "/dashboard/pa-430", id: "pa-430", roles: ALL_ROLE},
        ],
        roles: [...AdminScreenRole.all(),...WorkScreenRole.all()]
      },
      {
        title: "일용직근로소득관리",
        id: "pa-500",
        subMenus: [
          {title: "일용직근로소득자료입력", url: "/dashboard/pa-510", id: "pa-510", roles: ALL_ROLE},
          {title: "일용직사원등록", url: "/dashboard/pa-520", id: "pa-520", roles: ALL_ROLE},
          {title: "일용직근로소득원천징수영수증", url: "/dashboard/pa-530", id: "pa-530", roles: ALL_ROLE},
        ],
        roles: [...AdminScreenRole.all(),...WorkScreenRole.all()]
      },
      {
        title: "사업소득관리",
        id: "pa-600",
        subMenus: [
          {title: "사업소득자등록", url: "/dashboard/pa-610", id: "pa-610", roles: ALL_ROLE},
          {title: "사업소득자료입력", url: "/dashboard/pa-620", id: "pa-620", roles: ALL_ROLE},
          {title: "사업소득원천징수영수증", url: "/dashboard/pa-630", id: "pa-630", roles: ALL_ROLE},
        ],
        roles: [...AdminScreenRole.all(),...WorkScreenRole.all()]
      },
      {
        title: "기타소득관리",
        id: "pa-700",
        subMenus: [
          {title: "기타소득자등록", url: "/dashboard/pa-710", id: "pa-710", roles: ALL_ROLE},
          {title: "기타소득자료입력", url: '/dashboard/pa-720', id: "pa-720", roles: ALL_ROLE},
          {title: "기타소득원천징수영수증", url: "/dashboard/pa-730", id: "pa-730", roles: ALL_ROLE},
        ],
        roles: [...AdminScreenRole.all(),...WorkScreenRole.all()]
      },
      {
        title: "4대보험",
        id: "pa-800",
        subMenus: [
          {title: "취득신고등록", url: "/dashboard/pa-810", id: "pa-810", roles: ALL_ROLE},
          {title: "상실신고", url: "/dashboard/pa-820", id: "pa-820", roles: ALL_ROLE},
          {title: "급여변경신고", url: "/dashboard/pa-830", id: "pa-830", roles: ALL_ROLE},
          {title: "휴직복직신고", url: "/dashboard/pa-840", id: "pa-840", roles: ALL_ROLE},
          {title: "보수총액신고", url: "#", id: "pa-850", roles: ALL_ROLE},
          {title: "보험사무대행신고", url: "/dashboard/pa-860", id: "pa-860", roles: ALL_ROLE},
          {title: "사업장가입신고", url: "/dashboard/pa-870", id: "pa-870", roles: ALL_ROLE},
          {title: "사업장탈퇴신고", url: "/dashboard/pa-880", id: "pa-880", roles: ALL_ROLE},
        ],
        roles: [...AdminScreenRole.all(),...WorkScreenRole.all()]
      },

    ],
  },
];
