import { $enum } from "ts-enum-util";


export function enum2Array<T extends Record<Extract<keyof T, string>, number | string>>(enumObj: T): T[Extract<keyof T, string>][] {
    return $enum(enumObj).getValues();
}

export function enum2Entries<T extends Record<Extract<keyof T, string>, number | string>>(enumObj: T): (readonly [Extract<keyof T, string>, T[Extract<keyof T, string>]])[] {
    return $enum(enumObj).getEntries();
}


export function enum2KeysByValueMap<T extends Record<Extract<keyof T, string>, number | string>>(enumObj: T): Map<number | string, string> {
    const r: Map<number | string, string> = new Map();
    $enum(enumObj).getEntries().map(e => r.set(e[1], e[0]));
    return r;
}


export function getEnumKey<T extends Record<Extract<keyof T, string>, number | string>>(enumObj: T, value: number | string): string | undefined {
    return $enum(enumObj).getEntries().find(e => e[1] === value)?.[0];
}


export function getEnumValue<T extends Record<Extract<keyof T, string>, number | string>>(enumObj: T, key: string): string | number | undefined {
    return $enum(enumObj).getValueOrDefault(key);
}

export enum IncomeTypeCode610 {
    '저술가' = '940100',
    '화가곤 련' = '940200',
    '주극가' = '940301',
    '배우' = '940302',
    '모델' = '940303',
    '가수' = '940304',
    '성악가' = '940305',
    '연예 보조' = '940500',
    '자문 - 고문' = '940600',
    '바둑기사' = '940901',
    '곷곷이교사' = '940902',
    '호원강사' = '940903',
    '직업운동가' = '940904',
    '몽사료수취자' = '940905',
    '조험 설계' = '940906',
    '음료배달' = '940907',
    '방판. 외판' = '940908',
    '기타자영업' = '940909',
    '다단계판매' = '940910',
    '기타모집수당' = '940911',
    '간병인' = '940912',
    '대리운전' = '940913',
    '캐디' = '940914',
    '목욕관리사' = '940915',
    '행사도우미' = '940916',
    '심부름용역' = '940917',
    '퀵서비스' = '940918',
    '물줌배갈' = '940919',
    '병의원' = '851101',
}

export enum IncomeTypeCode710 {
    "필요경비 없는 기타소득" = "60",
    "주식매수선택권 행사이익" = "61",
    "그 밖에 필요경비 있는 기타소득 (64/68/69/71~77/79 제외)" = "62",
    "연금,공제부금해지소득"= "63",
    "서화, 골동품 양도 소득 (필요경비 80(90)%)" = "64",
    "직무발명보상금 (비과세한도 초과분)" = "65",
    "비과세 기타소득" = "68",
    "분리과세 기타소득" = "69",
    "상금 및 부상 (필요경비 80%)" = "71",
    "광업권 등 (필요경비 60%)" = "72",
    "지역권 등 (필요경비 60%)" = "73",
    "주택입주지체상금 (필요경비 80%)" = "74",
    "원고료 등 (필요경비 60%)" = "75",
    "강연료 등 (필요경비 60%)" = "76",
    "종교인소득" = "77",
    "사례금" = "78",
    "자문료 등 (필요경비 60%)" = "79",
    "통신판매 대여 소득 (필요경비 60%)" = "80",
    "국ㆍ공채의 이자와 할인액" = "111",
    "내국법인 회사채의 이자와 할인액" = "112",
    "국내에서 받는 예금의 이자" = "113",
    "신용계ㆍ신용부금으로 인한 이익" = "114",
    "외국법인 국내지점 등의 회사채의 이자와 할인액" = "115",
    "외국법인 회사채의 이자와 할인액" = "116",
    "국외에서 받는 예금의 이자" = "117",
    "환매조건부 매매차익" = "118",
    "저축성보험의 보험차익(10년미만 등)" = "119",
    "저축성보험의 보험차익(계약기간 10년이상)" = "120",
    "직장공제회 초과반환금" = "121",
    "비영업대금의 이익" = "122",
    "채권대차거래에 따른 이자상당액" = "123",
    "환매조건부채권매매거래에 따른 이자상당액" = "124",
    "그 밖에 금전사용에 따른 대가로서의 성격이 있는 것" = "125",
    "이자소득을 발생시키는 상품과 결합된 파생상품의 이익" = "126",
    "외국법인의 이자소득으로 상기 이외에대금의 이자 및 신탁의 이익(법법§93 1호)" = "127",
    "내국법인 배당ㆍ분배금, 건설이자의 배당" = "151",
    "법인으로 보는 단체로부터 받는 배당ㆍ분배금" = "152",
    "의제배당" = "153",
    "「법인세법」에 따라 배당으로 처분된 금액" = "154",
    "집합투자기구로부터의 이익" = "155",
    "외국법인 배당ㆍ분배금, 건설이자의 배당, 이와 유사한 성질의 배당" = "156",
    "「국제조세조정에 관한 법률」제17조에 따라 배당받은 것으로간주된 금액" = "157",
    "「국제조세조정에 관한 법률」제9조 및 제14조에 따라 배당으로 처분된 금액" = "158",
    "출자공동사업자의 손익분배비율에 해당하는 금액	 " = "159",
    "주가연계증권" = "160",
    "기타 파생결합증권" = "161",
    "주식대차거래에 따른 배당상당액" = "162",
    "그 밖에 수익분배의 성격이 있는 것" = "163",
    "배당소득을 발생시키는 상품과 결합된 파생상품의 이익" = "164",
    "상장지수증권(소득세법 시행령§26의3①3, ETN)" = "165",
  }