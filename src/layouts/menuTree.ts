import {AdminScreenRole, WorkScreenRole} from "@bankda/jangbuda-common";

const ALL_ROLE = [...AdminScreenRole.all().map(i => i.enumKey), ...WorkScreenRole.all().map(i => i.enumKey)];
const ROLE_AC000 = [WorkScreenRole.ACCOUNTING_WORK.enumKey]
const ROLE_PA000 = [WorkScreenRole.WITHHOLDING_WORK.enumKey]
const ROLE_BF600 = [AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE.enumKey]
const ROLE_BF500 = [AdminScreenRole.ACCOUNTING_WORK_CLOSING_MANAGE.enumKey]

const ROLE_BF000 =  [
  AdminScreenRole.ROLE_MANAGE.enumKey,
  AdminScreenRole.CONTRACT_MANAGE.enumKey,
  AdminScreenRole.COMPANY_MANAGE.enumKey,
  AdminScreenRole.SERVICE_MANAGE.enumKey,
  AdminScreenRole.SALES_REPRESENTATIVE_MANAGE.enumKey,
  AdminScreenRole.BILLING_MANAGE.enumKey,
  AdminScreenRole.TERMINATION_MANAGE.enumKey,
  AdminScreenRole.UNPAID_MANAGE.enumKey,
  AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE.enumKey,
  AdminScreenRole.ACCOUNTING_WORK_CLOSING_MANAGE.enumKey
]
const ROLE_CM000 = [WorkScreenRole.BASIC_SETTINGS.enumKey, WorkScreenRole.ACCOUNTING_SETTINGS.enumKey, WorkScreenRole.WITHHOLDING_SETTINGS.enumKey]
export default [
  {
    title: "Back Office",
    id: "bf-000",
    subMenus: [
      {
        title: "회원관리",
        id: "bf-200",
        subMenus: [
          {title: "회원등록", url: "/bf-210", id: "bf-210", roles: [AdminScreenRole.USER_MANAGE.enumKey]},
          {title: "권한그룹관리", url: "/bf-220", id: "bf-220", roles: [AdminScreenRole.ROLE_MANAGE.enumKey]},
        ],
        roles: [AdminScreenRole.ROLE_MANAGE.enumKey, AdminScreenRole.ROLE_MANAGE.enumKey]
      },
      {
        title: "계약관리",
        id: "bf-300",
        subMenus: [
          {title: "계약정보관리&심사", url: "/bf-310", id: "bf-310", roles: [AdminScreenRole.CONTRACT_MANAGE.enumKey]},
          {title: "사업자관리", url: "/bf-320", id: "bf-320", roles: [AdminScreenRole.COMPANY_MANAGE.enumKey]},
          {title: "서비스관리", url: "/bf-330", id: "bf-330", roles: [AdminScreenRole.SERVICE_MANAGE.enumKey]},
          {title: "영업자관리", url: "/bf-340", id: "bf-340", roles: [AdminScreenRole.SALES_REPRESENTATIVE_MANAGE.enumKey]},
        ],
        roles: [AdminScreenRole.CONTRACT_MANAGE.enumKey, AdminScreenRole.COMPANY_MANAGE.enumKey, AdminScreenRole.SERVICE_MANAGE.enumKey, AdminScreenRole.SALES_REPRESENTATIVE_MANAGE.enumKey]
      },
      {
        title: "수납관리",
        id: "bf-400",
        subMenus: [
          {title: "요금청구,심사", url: "#", id: "bf-410", roles: [AdminScreenRole.BILLING_MANAGE.enumKey]},
          {title: "서비스해지", url: "#", id: "bf-420", roles: [AdminScreenRole.TERMINATION_MANAGE.enumKey]},
          {title: "미납관리", url: "#", id: "bf-430", roles: [AdminScreenRole.UNPAID_MANAGE.enumKey]},
        ],
        roles: [AdminScreenRole.BILLING_MANAGE.enumKey, AdminScreenRole.TERMINATION_MANAGE.enumKey, AdminScreenRole.UNPAID_MANAGE.enumKey]
      },
      {
        title: "업무마감",
        id: "bf-500",
        subMenus: [
          {title: "회계업무마감관리", url: "/bf-510", id: "bf-510", roles: ROLE_BF500},
          {title: "4대보험업무관리", url: "/bf-530", id: "bf-530", roles: ROLE_BF500},
        ],
        roles: ROLE_BF500
      },
      {
        title: "원천업무",
        id: "bf-600",
        subMenus: [
          {title: "원천마감관리", url: "/bf-610", id: "bf-610", roles: ROLE_BF600},
          {title: "원천세/지방소득세전자신고", url: "/bf-620", id: "bf-620", roles: ROLE_BF600},
          {title: "지급명세서전자신고(연말정산)", url: "/bf-630", id: "bf-630", roles: ROLE_BF600},
          {title: "간이지급명세서전자신고", url: "/bf-640", id: "bf-640", roles: ROLE_BF600},
          {title: "일용직근로소득지급명세서전자신고", url: "/bf-650", id: "bf-650", roles: ROLE_BF600},
        ],
        roles: ROLE_BF600
      },
    ],
    icon: 'dx-icon-card',
    roles: ROLE_BF000
  },
  {
    title: "사용자업무설정",
    id: "cm-100",
    subMenus: [
      {title: "기초정보설정", url: "/cm-110", id: "cm-110", roles: [WorkScreenRole.BASIC_SETTINGS.enumKey]},
      {
        title: "회계설정",
        id: "cm-120",
        subMenus: [
          {title: "통장관리", url: "/cm-121", id: "cm-121", roles: [WorkScreenRole.ACCOUNTING_SETTINGS.enumKey]},
          {title: "수급자관리", url: "#", id: "cm-124", roles: [WorkScreenRole.ACCOUNTING_SETTINGS.enumKey]},
          {title: "회계기타", url: "#", id: "cm-125", roles: [WorkScreenRole.ACCOUNTING_SETTINGS.enumKey]},
          {title: "계정코드", url: "#", id: "cm-126", roles: [WorkScreenRole.ACCOUNTING_SETTINGS.enumKey]},
        ],
        roles: [WorkScreenRole.ACCOUNTING_SETTINGS.enumKey]

      },
      {title: "원천설정", url: "/cm-130", id: "cm-130", roles: [WorkScreenRole.WITHHOLDING_SETTINGS.enumKey]},
    ],
    icon: 'dx-icon-inactivefolder',
    roles: ROLE_CM000
  },
  {
    title: "회계관리",
    id: "ac-000",
    subMenus: [
      {
        title: "입력/마감",
        id: "ac-100",
        subMenus: [
          {title: "통장내역", url: "/ac-110", id: "ac-110", roles: ROLE_AC000},
          {title: "전표입력", url: "/ac-120", id: "ac-120", roles: ROLE_AC000},
          {title: "마감", url: "/ac-130", id: "ac-130", roles: ROLE_AC000},
        ],
        roles: ROLE_AC000
      },
      {
        title: "W4C",
        id: "ac-200",
        subMenus: [
          {title: "전표업로드", url: "/ac-210", id: "ac-210", roles: ROLE_AC000},
          // {title: "예산서", url: "#", id: "ac-220", roles: ROLE_AC000},
          // {title: "결산서", url: "#", id: "ac-230", roles: ROLE_AC000},
        ],
        roles: ROLE_AC000
      },
      // {
      //   title: "예산",
      //   id: "ac-300",
      //   subMenus: [
      //     {title: "예산서자동작성", url: "#", id: "ac-380", roles: ROLE_AC000},
      //   ],
      //   roles: ROLE_AC000
      // },
      {
        title: "보고서",
        id: "ac-500",
        subMenus: [
          {title: "장부", url: "/ac-510", id: "ac-510", roles: ROLE_AC000},
          {title: "예산서", url: "/ac-520", id: "ac-520", roles: ROLE_AC000},
          {title: "정부보조금명세서", url: "/ac-530", id: "ac-530", roles: ROLE_AC000},
          {title: "예비비사용조서", url: "/ac-540", id: "ac-540", roles: ROLE_AC000},
          {title: "사업비명세서", url: "/ac-550", id: "ac-550", roles: ROLE_AC000},
          {title: "기타비용명세서", url: "/ac-560", id: "ac-560", roles: ROLE_AC000},
          {title: "과목전용조서", url: "/ac-570", id: "ac-570", roles: ROLE_AC000},
          {title: "후원금수입 및 사용결과보고서", url: "/ac-580", id: "ac-580", roles: ROLE_AC000},
          {title: "후원금전용계좌의 입출금명세", url: "/ac-590", id: "ac-590", roles: ROLE_AC000},
        ],
        roles: ROLE_AC000
      },
      {
        title: "공통업무",
        id: "ac-600",
        subMenus: [
          {title: "거래처등록", url: "/ac-610", id: "ac-610", roles: ROLE_AC000},
          {title: "후원자관리", url: "/ac-620", id: "ac-620", roles: ROLE_AC000},
          {title: "기부금영수증", url: "/ac-630", id: "ac-630", roles: ROLE_AC000},
        ],
        roles: ROLE_AC000
      },

    ],
    icon: 'dx-icon-columnchooser',
    roles: ROLE_AC000
  },
  {
    title: "원천관리",
    id: "pa-000",
    subMenus: [
      {
        title: "근로소득관리",
        id: "pa-100",
        subMenus: [
          {title: "근로소득자료입력", url: "/pa-110", id: "pa-110", roles: ROLE_PA000},
          {title: "사원등록", url: "/pa-120", id: "pa-120", roles: ROLE_PA000},
        ],
        roles: ROLE_PA000
      },
      {
        title: "세무신고/연말정산 관리",
        id: "pa-200",
        subMenus: [
          {title: "원천징수이행상황신고서", url: "/pa-210", id: "pa-210", roles: ROLE_PA000},
          {title: "근로소득원천징수영수증", url: "/pa-220", id: "pa-220", roles: ROLE_PA000},
          {title: "소득자별근로소득원천징수부", url: "/pa-230", id: "pa-230", roles: ROLE_PA000},
          {title: "연말정산간소화입력", url: "#", id: "pa-240", roles: ROLE_PA000},
          {title: "의료비지급명세서", url: "#", id: "pa-250", roles: ROLE_PA000},
          {title: "기부금명세서", url: "#", id: "pa-260", roles: ROLE_PA000},
          {title: "연말정산현황", url: "#", id: "pa-270", roles: ROLE_PA000},
        ],
        roles: ROLE_PA000
      },

      {
        title: "퇴직소득관리",
        id: "pa-400",
        subMenus: [
          {title: "퇴직금 시뮬레이션", url: "/pa-410", id: "pa-410", roles: ROLE_PA000},
          {title: "퇴직소득자료입력", url: "/pa-420", id: "pa-420", roles: ROLE_PA000},
          {title: "퇴직소득원천징수영수증", url: "/pa-430", id: "pa-430", roles: ROLE_PA000},
        ],
        roles: ROLE_PA000
      },
      {
        title: "일용직근로소득관리",
        id: "pa-500",
        subMenus: [
          {title: "일용직근로소득자료입력", url: "/pa-510", id: "pa-510", roles: ROLE_PA000},
          {title: "일용직사원등록", url: "/pa-520", id: "pa-520", roles: ROLE_PA000},
          {title: "일용직근로소득원천징수영수증", url: "/pa-530", id: "pa-530", roles: ROLE_PA000},
        ],
        roles: ROLE_PA000
      },
      {
        title: "사업소득관리",
        id: "pa-600",
        subMenus: [
          {title: "사업소득자등록", url: "/pa-610", id: "pa-610", roles: ROLE_PA000},
          {title: "사업소득자료입력", url: "/pa-620", id: "pa-620", roles: ROLE_PA000},
          {title: "사업소득원천징수영수증", url: "/pa-630", id: "pa-630", roles: ROLE_PA000},
        ],
        roles: ROLE_PA000
      },
      {
        title: "기타소득관리",
        id: "pa-700",
        subMenus: [
          {title: "기타소득자등록", url: "/pa-710", id: "pa-710", roles: ROLE_PA000},
          {title: "기타소득자료입력", url: '/pa-720', id: "pa-720", roles: ROLE_PA000},
          {title: "기타소득원천징수영수증", url: "/pa-730", id: "pa-730", roles: ROLE_PA000},
        ],
        roles: ROLE_PA000
      },
      {
        title: "4대보험",
        id: "pa-800",
        subMenus: [
          {title: "취득신고등록", url: "/pa-810", id: "pa-810", roles: ROLE_PA000},
          {title: "상실신고", url: "/pa-820", id: "pa-820", roles: ROLE_PA000},
          {title: "급여변경신고", url: "/pa-830", id: "pa-830", roles: ROLE_PA000},
          {title: "휴직복직신고", url: "/pa-840", id: "pa-840", roles: ROLE_PA000},
          {title: "보수총액신고", url: "#", id: "pa-850", roles: ROLE_PA000},
          {title: "보험사무대행신고", url: "/pa-860", id: "pa-860", roles: ROLE_PA000},
          {title: "사업장가입신고", url: "/pa-870", id: "pa-870", roles: ROLE_PA000},
          {title: "사업장탈퇴신고", url: "/pa-880", id: "pa-880", roles: ROLE_PA000},
        ],
        roles: ROLE_PA000
      },

    ],
    icon: 'dx-icon-box',
    roles: ROLE_PA000
  },
];
