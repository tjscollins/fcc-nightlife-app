const storeBarList = (list) => {
  return {type: 'STORE_BAR_LIST', list};
};

const storePhotos = (id, photos) => {
  return {type: 'STORE_PHOTOS', id, photos};
};

module.exports = {
  storeBarList,
  storePhotos,
};
