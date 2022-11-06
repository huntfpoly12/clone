import { BaseType } from "./userType";

  
export class Message extends BaseType {
    
    // 공유 메시지
    /**
    * use {object} to insert the string at the position you want to replace
    * for dev will use like this
    * $messages.getCommonMessage('xxxxxx','001') --> return  계좌번호,계좌비밀 xxxxxx 번호,사업자등록번호
    */
    private static COMMON = new Message({
        '001': "계좌번호,계좌비밀 {object} 번호,사업자등록번호",
        '002': "{object} 계좌번호,계좌비밀번호,생년월일(YYMMDD0000000)",
    });

    /** 여기에 각 화면에 대한 메시지 추가 
     *  스크린(340)에 대한 예. 다음과 같이 선언합니다.
     *  예를 들어 "001"은 오류 코드입니다. 오류 코드는 선택적 숫자입니다.
     *  따옴표로 묶인 값은 표시하려는 메시지입니다.
     * for dev will use like this
     * $messages.getMessage('BF340','001') --> return  계좌번호,계좌비밀번호,사업자등록번호
     */
    public static BF310 = new Message({
        '001': "계좌번호,계좌비밀번호,사업자등록번호",
        '002': "계좌번호,계좌비밀번호,생년월일(YYMMDD0000000)",
    });

    public static BF320 = new Message({
        '001': "계좌번호,계좌비밀번호,사업자등록번호",
        '002': "계좌번호,계좌비밀번호,생년월일(YYMMDD0000000)",
    });

    public static BF340 = new Message({
        '001': "계좌번호,계좌비밀번호,사업자등록번호",
        '002': "계좌번호,계좌비밀번호,생년월일(YYMMDD0000000)",
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