const loginUser = (user) => {
  let {_id, twitter} = user;
  return {type: 'LOGIN_USER', _id, twitter, auth: true};
};

const storeBarList = (list) => {
  return {type: 'STORE_BAR_LIST', list};
};

const storePhotos = (id, photos) => {
  return {type: 'STORE_PHOTOS', id, photos};
};

const storeHeadcounts = (foursquareId, count) => {
  return {type: 'STORE_HEADCOUNTS', foursquareId, count};
};

module.exports = {
  storeBarList,
  storeHeadcounts,
  storePhotos,
};
