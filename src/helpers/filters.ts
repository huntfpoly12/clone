const filters = {
    formatCurrency(input: number) {
        if (isNaN(input)) {
            return "-";
        }
        return input.toLocaleString('ko-KR');
    }
}
export default filters;