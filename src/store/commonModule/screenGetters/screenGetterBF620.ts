const screenGetterPA620 = {
  filterBF620: (state: any) => ({
    ...state.filterBF620,
    companyCode: state.code,
    companyName: state.name,
    // companyCode: state.code,
    // companyCode: state.code,
  }),
};

export default screenGetterPA620;
