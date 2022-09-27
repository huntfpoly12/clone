import { BaseType } from "./enum";

export class WithholdingAdditionalServiceType extends BaseType {
    /** four major insurance (4대보험) - 1 */
    public static MAJOR_INSURANCE = new WithholdingAdditionalServiceType("4대보험", 1);

    private static _ = WithholdingAdditionalServiceType.closeEnum();

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
     * Returns WithholdingAdditionalServiceType constant from the code (코드로부터 WithholdingAdditionalServiceType 상수를 반환한다)
     * @param v Code (코드)
     * @returns WithholdingAdditionalServiceType
     */
    static fromCode(v: number) {
        const items = WithholdingAdditionalServiceType.all<WithholdingAdditionalServiceType>();
        return items.find((item) => item.code === v);
    }
}