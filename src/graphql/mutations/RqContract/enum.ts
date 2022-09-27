import { Enumify } from "enumify";
import { $enum } from "ts-enum-util";

/**
 * Returns the value of the enum as an array (enum의 Value를 배열로 반환한다).
 * @param enumObj Enum Type
 * @returns Enum Key Array
 */
export function enum2Array<T extends Record<Extract<keyof T, string>, number | string>>(enumObj: T): T[Extract<keyof T, string>][] {
  return $enum(enumObj).getValues();
}

/**
 * Returns enum as an entry array (enum을 entry 배열로 반환한다).
 * - Tuples (enum key, enum value)
 * @param enumObj Enum Type
 * @returns Enum Entry Array
 */
export function enum2Entries<T extends Record<Extract<keyof T, string>, number | string>>(enumObj: T): (readonly [Extract<keyof T, string>, T[Extract<keyof T, string>]])[] {
  return $enum(enumObj).getEntries();
}

/**
 * Return enum to value / key map (enum을 value / key Map으로 반환한다).
 * @param enumObj Enum Type
 * @returns Enum value / key Map
 */
export function enum2KeysByValueMap<T extends Record<Extract<keyof T, string>, number | string>>(enumObj: T): Map<number | string, string> {
  const r: Map<number | string, string> = new Map();
  $enum(enumObj).getEntries().map(e => r.set(e[1], e[0]));
  return r;
}

/**
 * Returns the enum key corresponding to value (value에 해당하는 enum key를 반환한다).
 * @param enumObj Enum Type
 * @param value Enum Value
 * @returns Enum Key
 */
export function getEnumKey<T extends Record<Extract<keyof T, string>, number | string>>(enumObj: T, value: number | string): string | undefined {
  return $enum(enumObj).getEntries().find(e => e[1] === value)?.[0];
}

/**
 * Returns the enum value corresponding to the key (key에 해당하는 enum value를 반환한다).
 * @param enumObj Enum Type
 * @param key Enum Key
 * @returns Enum Value
 */
export function getEnumValue<T extends Record<Extract<keyof T, string>, number | string>>(enumObj: T, key: string): string | number | undefined {
  return $enum(enumObj).getValueOrDefault(key);
}

/**
 * Service subscription application status (서비스가입신청 상태).
 */
export enum SubscriptionRequestStatus {
  /** Application (신청) - 10 */
  신청 = 10,
  /** Under examination (심사중) - 20 */
  심사중 = 20,
  /** Approval (승인) - 30 */
  승인 = 30,
  /** Application rejected (반려) - 99 */
  반려 = 99,
}

/**
 * Sales Representative Grade (영업자 등급)
 * - Use enum2Entries function for select box expression
 */
export enum SalesRepresentativeGrade {
  /** branch (지사) - 1 */
  지사 = 1,
  /** agency (대리점) - 2 */
  대리점 = 2,
}

/**
 * Sales Representative Status (영업자 상태)
 * - Use enum2Entries function for select box expression
 */
export enum SalesRepresentativeStatus {
  /** normal (정상) - 1 */
  정상 = 1,
  /** termination (해지) - 2 */
  해지 = 2,
  /** hidden (숨김) - 3 */
  숨김 = 3,
}

/**
 * Enumify-based constant abstract class (Enumify 기반 상수 추상클래스)
 */
export abstract class BaseType extends Enumify {
  protected constructor(
    private readonly n: string,
    private readonly d?: string
  ) {
    super();
  }

  /**
   * Name (이름).
   */
  public get name() {
    return this.n;
  }

  /**
   * Description (설명).
   */
  public get description() {
    return this.d;
  }

  /**
   * Deprecated : 상수전체 목록 반환.
   * @deprecated Use all method
   * @param enumifys 
   * @returns 
   */
  static toBaseTypes(enumifys: Enumify[]) {
    const r: BaseType[] = [];
    for (let enumify of enumifys) {
      r.push(<BaseType>enumify);
    }
    return r;
  }

  /**
   * Deprecated : 값에 해당하는 상수를 반환한다.
   * @deprecated
   * @param value 
   * @returns 
   */
  static of<T extends BaseType>(value: string): T | undefined {
    const e = super.enumValueOf(value);
    return e ? e as T : e;
  }

  /**
   * Returns a complete list of constants (상수전체 목록을 반환한다).
   * @returns a complete list of constants (상수전체 목록)
   */
  static all<T extends BaseType>(): T[] {
    return this.enumValues.map((value) => <T>value);
  }
}

/**
 * Type of Company (사업자 유형).
 * - CORPORATE : Corporate business entity (법인사업자) - 1
 * - PERSONAL : Personal business entity (개인사업자) - 2
 */
export class BizType extends BaseType {
  /** Corporate business entity (법인사업자) - 1 */
  public static CORPORATE = new BizType("법인사업자", 1);
  /** Personal business entity (개인사업자) - 2 */
  public static PERSONAL = new BizType("개인사업자", 2);

  private static _ = BizType.closeEnum();

  private constructor(
    n: string,
    private readonly v: number
  ) {
    super(n);
  }

  /**
   * Code (코드)
   * - Used for GraphQL integration (GraphQL 연동에 사용됨)
   */
  public get code() {
    return this.v;
  }

  /**
   * Returns BizType constant from the code (코드로부터 BizType 상수를 반환한다)
   * @param v Code (코드)
   * @returns BizType
   */
  static fromCode(v: number) {
    const items = BizType.all<BizType>();
    return items.find((item) => item.code === v);
  }
}

/**
 * Work process status (업무 프로세스 상태)
 * - WAITING_FOR_INPUT : waiting for input (입력대기) - 1 
 * - ENTERING : entering (입력중) - 10
 * - INPUT_CLOSING : input closing (입력마감) - 20
 * - ADJUSTING : adjusting (조정중) - 30
 * - ADJUSTED_CLOSING : adjusted closing (조정마감) - 40
 */
 export class ProcessStatus extends BaseType {
  /** waiting for input (입력대기) - 1 / grey */
  public static WAITING_FOR_INPUT = new ProcessStatus("입력대기", 1, "grey");
  /** entering (입력중) - 10 / blue */
  public static ENTERING = new ProcessStatus("입력중", 10, "blue");
  /** input closing (입력마감) - 20 / red */
  public static INPUT_CLOSING = new ProcessStatus("입력마감", 20, "blue");
  /** adjusting (조정중) - 30 / blue */
  public static ADJUSTING = new ProcessStatus("조정중", 30, "red");
  /** adjusted closing (조정마감) - 40 / red */
  public static ADJUSTED_CLOSING = new ProcessStatus("조정마감", 40, "red");

  private static _ = ProcessStatus.closeEnum();

  private constructor(
    n: string,
    private readonly v: number,
    private readonly c: "grey" | "red" | "blue"
  ) {
    super(n);
  }

  /**
   * Code (코드)
   * - Used for GraphQL integration (GraphQL 연동에 사용됨)
   */
  public get code() {
    return this.v;
  }

  /**
   * Color (색깔)
   * - Used for front-end font color 
   */
  public get color() {
    return this.c;
  }

  /**
   * Returns ProcessStatus constant from the code (코드로부터 ProcessStatus 상수를 반환한다)
   * @param v Code (코드)
   * @returns ProcessStatus
   */
  static fromCode(v: number) {
    const items = ProcessStatus.all<ProcessStatus>();
    return items.find((item) => item.code === v);
  }
}

/**
 * Deprecated : 사용자 상태 유형
 * @deprecated
 */
export class UserStatus extends BaseType {
  /** 등록 */
  public static REGISTER = new UserStatus("등록");
  /** 정상 */
  public static ACTIVE = new UserStatus("정상");
  /** 휴면 */
  public static SUSPEND = new UserStatus("휴면");
  /** 탈퇴 */
  public static DELETE = new UserStatus("탈퇴");

  private static _ = UserStatus.closeEnum();
}

/**
 * Deprecated : 사용자 이벤트 유형
 * @deprecated
 */
export class UserEventType extends BaseType {
  /** 등록 */
  public static REGISTER = new UserEventType("등록");
  /** 정상 */
  public static ACTIVE = new UserEventType("정상");
  /** 업데이트 */
  public static UPDATE = new UserEventType("업데이트");
  /** 권한추가 */
  public static ADD_ROLE = new UserEventType("권한추가");
  /** 권한삭제 */
  public static DEL_ROLE = new UserEventType("권한삭제");
  /** 시설사업추가 */
  public static ADD_FAC_BIZ = new UserEventType("시설사업추가");
  /** 시설사업삭제 */
  public static DEL_FAC_BIZ = new UserEventType("시설사업삭제");
  /** 휴면 */
  public static SUSPEND = new UserEventType("휴면");
  /** 탈퇴 */
  public static DELETE = new UserEventType("탈퇴");

  private static _ = UserEventType.closeEnum();
}

/**
 * Deprecated : 토큰 이벤트 유형
 * @deprecated
 */
export class AuthTokenEventType extends BaseType {
  /** 토큰생성 */
  public static CREATE = new AuthTokenEventType("토큰생성");
  /** 토큰업데이트 */
  public static UPDATE = new AuthTokenEventType("토큰업데이트");
  /** 토큰만료 */
  public static EXPIRE = new AuthTokenEventType("토큰만료");
  /** 토큰삭제 */
  public static DELETE = new AuthTokenEventType("토큰삭제");

  private static _ = AuthTokenEventType.closeEnum();
}

/**
 * Deprecated : 권한그룹 이벤트 유형
 * @deprecated
 */
export class RoleGroupEventType extends BaseType {
  /** 권한그룹생성 */
  public static CREATE = new RoleGroupEventType("권한그룹생성");
  /** 권한그룹업데이트 */
  public static UPDATE = new RoleGroupEventType("권한그룹업데이트");

  private static _ = RoleGroupEventType.closeEnum();
}


/**
 * Deprecated : 계약상태 정보
 * @deprecated
 */
export class ContractStatus extends BaseType {
  /** 등록 */
  public static REGISTER = new ContractStatus("등록");
  /** 검토 */
  public static EXAMINE = new ContractStatus("검토");
  /** 활성화 */
  public static ACTIVE = new ContractStatus("활성화");
  /** 휴면 */
  public static SUSPEND = new ContractStatus("휴면");
  /** 탈퇴 */
  public static DELETE = new ContractStatus("탈퇴");

  private static _ = ContractStatus.closeEnum();
}

/**
 * Deprecated : 계약이벤트 유형
 * @deprecated
 */
export class ContractEventType extends BaseType {
  /** 등록 */
  public static REGISTER = new ContractEventType("등록");
  /** 검토 */
  public static EXAMINE = new ContractEventType("검토");
  /** 활성화 */
  public static ACTIVE = new ContractEventType("활성화");
  /** 휴면 */
  public static SUSPEND = new ContractEventType("휴면");
  /** 탈퇴 */
  public static DELETE = new ContractEventType("탈퇴");

  private static _ = ContractEventType.closeEnum();
}

/**
 * Deprecated : 소통 유형
 * @deprecated
 */
export class CommunicationType extends BaseType {
  /** 공지 */
  public static NOTICE = new CommunicationType("공지");
  /** 알림 */
  public static ALARM = new CommunicationType("알림");
  /** 문의 */
  public static QUESTION = new CommunicationType("문의");

  private static _ = CommunicationType.closeEnum();
}
