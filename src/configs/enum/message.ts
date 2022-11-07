import { BaseType } from "./userType";

  
export class Message extends BaseType {
    
    // 공유 메시지
    /**
    * use {object} to insert the string at the position you want to replace
    * for dev will use like this
    * $messages.getCommonMessage('xxxxxx','001') --> return  계좌번호,계좌비밀 xxxxxx 번호,사업자등록번호
    */
    private static COMMON = new Message({
      // SAVE Button Click 
        '101': {"저장되었습니다.", "iconInfo"}, // Save successful!
        '102': {"저장실패! {object}는 필수입력 사항입니다.", "iconError"}, // {object} is required field.
        '103': {"저장실패! {object}는 최소 {minCount}자 이상입니다.", "iconError"}, // {object} more then {minCount} characters.
        '104': {"저장실패! {object}가 정해진 글자수를 초과하였습니다.", "iconError"}, // {object} exceeds the maximum number of characters.
        '105': {"저장실패! {object}가 올바른 형식이 아닙니다.", "iconError"}, // {object} has incorrect format.
      // SEARCH Button Click
        '201': {"조회되었습니다.", "iconInfo"}, // Search successful!
    });

    /** 여기에 각 화면에 대한 메시지 추가 
     *  스크린(340)에 대한 예. 다음과 같이 선언합니다.
     *  예를 들어 "001"은 오류 코드입니다. 오류 코드는 선택적 숫자입니다.
     *  따옴표로 묶인 값은 표시하려는 메시지입니다.
     * for dev will use like this
     * $messages.getMessage('BF340','001') --> return  계좌번호,계좌비밀번호,사업자등록번호
     */
  
    //회원관리
    public static BF210 = new Message({
        '001': {"사용 가능한 ID입니다", "iconInfo"}, // ID available
        '002': {"이미 사용중인 ID입니다", "iconError"}, // ID is already in use.
        '003': "<확인>을 누르면 비밀번호 설정 링크가 포함된 이메일이 발송됩니다. 계속 진행하시겠습니까?"
    });
    
    //권한그룹관리
    public static BF220 = new Message({
        '001': {"대상회원을 1개 이상 선택하세요", "iconError"}, // Check more then 1 checkboxs
        '002': {"사용 가능한 그룹코드입니다", "iconInfo"}, // Group code available
        '003': {"이미 사용중인 그룹코드입니다", "iconError"}, // Group code is already in use.
        '004': {"사용 가능한 그룹명입니다", "iconInfo"}, // Group name available
        '005': {"이미 사용중인 그룹명입니다", "iconError"}, // Group name is already in use.
    });
  
    //영업자관리
    public static BF340 = new Message({
        '001': {"영업자명이 이미 사용중입니다.", "iconError"}, // Sales Representitive Name is already in use.
        '002': "해지(또는 숨김)하면 본 영업자와 연계된 모든 사업자는 본사로 이관됩니다. 해지(또는 숨김)하려면 <확인>을 입력한 후 완료를 누르세요.",
    });

    private static _ = Message.closeEnum();

    private constructor(
       i: object
    ) {
        super(i);
    }
 
    
    /**
     * Returns Common Message
     * @param obj is the string that you want to add to the message
     * @param codeMess message code
     * @returns String message
     */
    public static getCommonMessage(obj: string , codeMess : string) {
        const items = Message.COMMON;
        let item : any = items.name;
        let resMess : any  = item[codeMess];
        return item[codeMess] ? resMess.replaceAll('{object}', obj) : '';
    }

    /**
     * Returns Message
     * @param c screen code
     * @param codeMess message code
     * @returns String message
     */
    public static getMessage(c: string, codeMess : string) {
        const items = Message.all();
        let item : any = items.find((item) =>item.enumKey === c )?.name;
        let resMess : any  = item[codeMess];
        return resMess;
    }
}