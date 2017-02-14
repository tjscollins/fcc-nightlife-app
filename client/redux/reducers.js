export const reducer = (state = {bars: []}, action) => {
  switch(action.type) {
    case 'STORE_BAR_LIST':
      return {
        ...state,
        bars: action.list,
      };
    default:
      return state;
  }
};
