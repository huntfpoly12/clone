import dayjs from "dayjs";
import filters from "@/helpers/filters";
export const initialState = {
    transitionDate: filters.formatDateToInterger(dayjs()),
    sourceCode: null,
    transitionCode: null,
    transitionAmount: null,
}

export const initialStateDetail = {
    transitionDate: filters.formatDateToInterger(dayjs()),
    sourceCode: null,
    sourceBudgetAmount: 0,
    sourceExpenditureAmount: 0,

    transitionAmount: null,

    transitionCode: null,
    transitionBudgetAmount: 0,
    transitionExpenditureAmount: 0,
    transitionCause: null,
    

}