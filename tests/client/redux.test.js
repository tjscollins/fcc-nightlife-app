/*global describe it*/
const expect = require('expect');
const actions = require('actions');
const df = require('deep-freeze-strict');
const {reducer} = require('reducers');

describe('redux', () => {
  describe('actions', () => {
    it('should generate STORE_BAR_LIST action', () => {
      let action = {
        type: 'STORE_BAR_LIST',
        list: 'list',
      };
      expect(actions.storeBarList('list')).toEqual(action);
    });

    it('should generate STORE_PHOTOS action', () => {
      let action = {
        type: 'STORE_PHOTOS',
        id: 'id',
        photos: 'photos',
      };
      expect(actions.storePhotos('id', 'photos')).toEqual(action);
    });
  });

  describe('reducers', () => {
    it('should STORE_BAR_LIST', () => {
      let action = {
        type: 'STORE_BAR_LIST',
        list: [1, 2, 3],
      };
      let initialState = {
        bars: [],
      };
      let finalState = {
        bars: [1, 2, 3],
      };
      expect(reducer(df(initialState), df(action))).toEqual(finalState);
    });

    it('should STORE_PHOTOS', () => {
      let action = {
        type: 'STORE_PHOTOS',
        id: '123',
        photos: {a: 1, b: 2},
      };
      let initialState = {
        photos: {},
      };
      let finalState = {
        photos: {
          '123': {a: 1, b: 2},
        },
      };
      expect(reducer(df(initialState), df(action))).toEqual(finalState);
    });
  });
});
