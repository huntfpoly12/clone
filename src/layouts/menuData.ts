import useCheckPermission from "@/helpers/useCheckPermission";
import { AdminScreenRole, getJwtObject, WorkScreenRole } from "@bankda/jangbuda-common";
const ROLE_BF600 = [AdminScreenRole.WITHHOLDING_WORK_CLOSING_MANAGE.enumKey]
const ROLE_AC000 = [WorkScreenRole.ACCOUNTING_WORK.enumKey]
const ROLE_PA000 = [WorkScreenRole.WITHHOLDING_WORK.enumKey]
const ROLE_BF500 = [AdminScreenRole.ACCOUNTING_WORK_CLOSING_MANAGE.enumKey]
const token = sessionStorage.getItem("token");
const jwtObject = token ? getJwtObject(token) : null;
let menuData = [
  { name: "회원등록", url: "/bf-210", id: "bf-210", roles: [AdminScreenRole.USER_MANAGE.enumKey] },
  { name: "권한그룹관리", url: "/bf-220", id: "bf-220", roles: [AdminScreenRole.ROLE_MANAGE.enumKey] },

  { name: "계약정보관리&심사 ", url: "/bf-310", id: "bf-310", roles: [AdminScreenRole.CONTRACT_MANAGE.enumKey] },
  { name: "사업자관리", url: "/bf-320", id: "bf-320", roles: [AdminScreenRole.COMPANY_MANAGE.enumKey] },
  { name: "서비스관리", url: "/bf-330", id: "bf-330", roles: [AdminScreenRole.SERVICE_MANAGE.enumKey] },
  { name: "영업자관리", url: "/bf-340", id: "bf-340", roles: [AdminScreenRole.SALES_REPRESENTATIVE_MANAGE.enumKey] },

  { name: "CMS 관리", url: "#", id: "bf-251", roles: [AdminScreenRole.BILLING_MANAGE.enumKey] },
  { name: "청구 관리", url: "#", id: "bf-252", roles: [AdminScreenRole.TERMINATION_MANAGE.enumKey] },
  { name: "입금 관리", url: "#", id: "bf-253", roles: [AdminScreenRole.UNPAID_MANAGE.enumKey] },
  { name: "입금 현황", url: "#", id: "bf-254", roles: [AdminScreenRole.BILLING_MANAGE.enumKey] },
  { name: "환급 관리", url: "#", id: "bf-255", roles: [AdminScreenRole.TERMINATION_MANAGE.enumKey] },
  { name: "해지 관리", url: "#", id: "bf-260", roles: [AdminScreenRole.UNPAID_MANAGE.enumKey] },

  { name: "회계업무마감", url: "/bf-510", id: "bf-510", roles: ROLE_BF500 },
  { name: "4대보험업무관리", url: "/bf-530", id: "bf-530", roles: ROLE_BF500 },

  { name: "원천업무마감", url: "/bf-610", id: "bf-610", roles: ROLE_BF600 },
  { name: "원천세/지방소득세전자신고", url: "/bf-620", id: "bf-620", roles: ROLE_BF600, },
  { name: "지급명세서전자신고(연말정산)", url: "/bf-630", id: "bf-630", roles: ROLE_BF600, },
  { name: "간이지급명세서전자신고", url: "/bf-640", id: "bf-640", roles: ROLE_BF600 },
  { name: "일용직근로소득지급명세서전자신고", url: "/bf-650", id: "bf-650", roles: ROLE_BF600, },

  { name: "기초정보설정", url: "/cm-110", id: "cm-110", roles: [WorkScreenRole.BASIC_SETTINGS.enumKey] },
  { name: "통장관리", url: "/cm-121", id: "cm-121", roles: [WorkScreenRole.ACCOUNTING_SETTINGS.enumKey] },
  { name: "수급자관리", url: "#", id: "cm-124", roles: [WorkScreenRole.ACCOUNTING_SETTINGS.enumKey] },
  { name: "회계기타", url: "#", id: "cm-125", roles: [WorkScreenRole.ACCOUNTING_SETTINGS.enumKey] },
  { name: "계정코드", url: "#", id: "cm-126", roles: [WorkScreenRole.ACCOUNTING_SETTINGS.enumKey] },

  { name: "원천설정", url: "/cm-130", id: "cm-130", roles: [WorkScreenRole.WITHHOLDING_SETTINGS.enumKey] },

  { name: "통장내역", url: "/ac-110", id: "ac-110", roles: ROLE_AC000 },
  { name: "전표입력", url: "/ac-120", id: "ac-120", roles: ROLE_AC000 },
  { name: "마감", url: "/ac-130", id: "ac-130", roles: ROLE_AC000 },

  { name: "전표업로드", url: "/ac-210", id: "ac-210", roles: ROLE_AC000 },

  { name: "장부", url: "/ac-510", id: "ac-510", roles: ROLE_AC000 },
  { name: "예산서", url: "/ac-520", id: "ac-520", roles: ROLE_AC000 },
  { name: "정부보조금명세서", url: "/ac-530", id: "ac-530", roles: ROLE_AC000 },
  { name: "예비비사용조서", url: "/ac-540", id: "ac-540", roles: ROLE_AC000 },
  { name: "사업비명세서", url: "/ac-550", id: "ac-550", roles: ROLE_AC000 },
  { name: "기타비용명세서", url: "/ac-560", id: "ac-560", roles: ROLE_AC000 },
  { name: "과목전용조서", url: "/ac-570", id: "ac-570", roles: ROLE_AC000 },
  { name: "후원금수입 및 사용결과보고서", url: "/ac-580", id: "ac-580", roles: ROLE_AC000 },
  { name: "후원금전용계좌의 입출금명세", url: "/ac-590", id: "ac-590", roles: ROLE_AC000 },

  { name: "거래처등록", url: "/ac-610", id: "ac-610", roles: ROLE_AC000 },
  { name: "후원자 관리", url: "/ac-620", id: "ac-620", roles: ROLE_AC000 },
  { name: "기부금영수증", url: "/ac-630", id: "ac-630", roles: ROLE_AC000 },

  { name: "근로소득자료입력", url: "/pa-110", id: "pa-110", roles: ROLE_PA000 },
  { name: "사원등록", url: "/pa-120", id: "pa-120", roles: ROLE_PA000 },

  { name: "원천징수이행상황신고서", url: "/pa-210", id: "pa-210", roles: ROLE_PA000 },
  { name: "근로소득원천징수영수증", url: "/pa-220", id: "pa-220", roles: ROLE_PA000 },
  { name: "소득자별근로소득원천징수부", url: "/pa-230", id: "pa-230", roles: ROLE_PA000, },
  { name: "연말정산간소화입력", url: "#", id: "pa-240", roles: ROLE_PA000 },
  { name: "의료비지급명세서", url: "#", id: "pa-250", roles: ROLE_PA000 },
  { name: "기부금명세서", url: "#", id: "pa-260", roles: ROLE_PA000 },
  { name: "연말정산현황", url: "#", id: "pa-270", roles: ROLE_PA000 },

  { name: "퇴직금시뮬레이션", url: "/pa-410", id: "pa-410", roles: ROLE_PA000 },
  { name: "퇴직소득자료입력", url: "/pa-420", id: "pa-420", roles: ROLE_PA000 },
  { name: "퇴직소득원천징수영수증", url: "/pa-430", id: "pa-430", roles: ROLE_PA000 },

  { name: "일용직근로소득자료입력", url: "/pa-510", id: "pa-510", roles: ROLE_PA000 },
  { name: "일용직사원등록", url: "/pa-520", id: "pa-520", roles: ROLE_PA000 },
  { name: "일용직근로소득원천징수영수증", url: "/pa-530", id: "pa-530", roles: ROLE_PA000, },

  { name: "사업소득자등록", url: "/pa-610", id: "pa-610", roles: ROLE_PA000 },
  { name: "사업소득자료입력", url: "/pa-620", id: "pa-620", roles: ROLE_PA000 },
  { name: "거주자의 사업소득원천징수영수증", url: "/pa-630", id: "pa-630", roles: ROLE_PA000 },

  { name: "기타소득자등록", url: "/pa-710", id: "pa-710", roles: ROLE_PA000 },
  { name: "기타소득자료입력", url: "/pa-720", id: "pa-720", roles: ROLE_PA000 },
  { name: "기타소득원천징수영수증", url: "/pa-730", id: "pa-730", roles: ROLE_PA000 },

  { name: "취득신고", url: "/pa-810", id: "pa-810", roles: ROLE_PA000 },
  { name: "상실신고", url: "/pa-820", id: "pa-820", roles: ROLE_PA000 },
  { name: "급여변경신고", url: "/pa-830", id: "pa-830", roles: ROLE_PA000 },
  { name: "휴직복직신고", url: "/pa-840", id: "pa-840", roles: ROLE_PA000 },
  { name: "보수총액신고", url: "#", id: "pa-850", roles: ROLE_PA000 },
  { name: "보험사무대행신고", url: "/pa-860", id: "pa-860", roles: ROLE_PA000 },
  { name: "사업장가입신고", url: "/pa-870", id: "pa-870", roles: ROLE_PA000 },
  { name: "사업장탈퇴신고", url: "/pa-880", id: "pa-880", roles: ROLE_PA000 },

  { name: "소통판", url: "/communication-board", id: "communication-board", roles: ROLE_BF500 },
  { name: "소통판", url: "/announcement-manager", id: "announcement-manager", roles: ROLE_BF500 },
  { name: "소통판", url: "/announcement", id: "announcement", roles: ROLE_PA000 },
];
menuData = menuData.filter(i => {
  if (i.roles.length === 0) return false
  return useCheckPermission(i.roles).read
})

export default menuData;
