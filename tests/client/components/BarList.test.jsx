/*global describe it*/

/*----------Modules----------*/
import expect from 'expect';
import React from 'react';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

/*----------Redux----------*/
// import {Provider} from 'react-redux';
// import {configure} from 'configureStore';

/*----------Components----------*/
import {BarList} from 'BarList';

describe('BarList', () => {
  it('should exist', () => {
    expect(BarList).toExist();
  });

  it('render a list of bars', ()=>{
    let bars = [
      {
        name: 'Godfather\'s Beach Bar',
        text: 'Best sunset bar on island',
      },
      {
        name: 'Naked Fish',
        text: 'Used to have good food...',
      },
    ];
    let barList = TestUtils.renderIntoDocument(<BarList bars={bars} />);
    let rows = TestUtils.scryRenderedDOMComponentsWithClass(barList, 'row');
    expect(rows.length).toBe(2);
  });
});
