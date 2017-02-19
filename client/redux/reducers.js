const reducer = (state = {bars: [], photos: {}}, action) => {
  switch(action.type) {
    case 'STORE_BAR_LIST':
      return {
        ...state,
        bars: action.list,
      };
    case 'STORE_PHOTOS':
      return {
        ...state,
        photos: {
          ...state.photos,
          [action.id]: action.photos,
        },
      };
    default:
      return state;
  }
};

module.exports = {
  reducer,
};
