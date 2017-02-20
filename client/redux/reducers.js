const reducer = (state = {bars: [], photos: {}, headcounts: {}}, action) => {
  switch(action.type) {
    case 'STORE_HEADCOUNTS':
      return {
        ...state,
        headcounts: {
          ...state.headcounts,
          [action.foursquareId]: action.count,
        },
      };
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
