import { Enumify } from "enumify";

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

export class EnumUserType extends BaseType {
    public static 매니저 = new EnumUserType('매니저', 'm', 'black');
    public static 영업자회원 = new EnumUserType('매니저', 'r', 'grey');
    public static 고객 = new EnumUserType('매니저', 'c', 'blue');
    public static 파트너회원 = new EnumUserType('매니저', 'p', 'gold');
    static _ = this.closeEnum();

    private constructor(
        n: string,
        private readonly c: "r" | "m" | "p" | "c",
        private readonly v: "black" | "grey" | "blue" | "gold",

    ) {
        super(n);
    }
}
