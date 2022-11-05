import { Enumify } from "enumify";

export abstract class BaseType extends Enumify {
    protected constructor(
        private n: string | object ,
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
     * Returns a complete list of constants (상수전체 목록을 반환한다).
     * @returns a complete list of constants (상수전체 목록)
     */
    static all<T extends BaseType>(): T[] {
        return this.enumValues.map((value) => <T>value);
    }
}

export class EnumUserType extends BaseType {
    public static 매니저 = new EnumUserType('매니저', 'm', 'black');
    public static 영업자회원 = new EnumUserType('영업자회원', 'r', 'grey');
    public static 고객 = new EnumUserType('고객', 'c', 'blue');
    public static 파트너회원 = new EnumUserType('파트너회원', 'p', 'gold');
    static _ = this.closeEnum();

    private constructor(
        n: string,
        private readonly c: "r" | "m" | "p" | "c",
        private readonly v: "black" | "grey" | "blue" | "gold",

    ) {
        super(n);
    }
}
