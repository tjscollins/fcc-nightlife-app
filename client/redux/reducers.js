const reducer = (state = {bars: [], photos: {}, headcounts: {}, user: {}}, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
      let {_id, twitter, auth} = action;
      return {
        ...state,
        user: {
          _id,
          twitter,
          auth,
        },
      };
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
