/*global describe it sinon*/

/*----------Modules----------*/
import expect from 'expect';
import React from 'react';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

/*----------Redux----------*/
import {Provider} from 'react-redux';
import configure from 'configureStore';

/*----------Components----------*/
import Index from 'Index';
import {BarList} from 'BarList';

describe('Index', () => {
  it('should exist', () => {
    expect(Index).toExist();
  });

  // it('should render a search form', () => {
  //   let index = TestUtils.renderIntoDocument(
  //     <Provider store={configure({})}>
  //       <Index />
  //     </Provider>
  //   );
  //   let form = TestUtils.findRenderedDOMComponentWithTag(index, 'form');
  //   let searchBox = TestUtils.findRenderedDOMComponentWithTag(index, 'input');
  //   let submitButton = TestUtils.findRenderedDOMComponentWithTag(index, 'button');
  //   expect(form).toExist();
  //   expect(form.children).toExist();
  //   expect(form.children[0].children.length).toBe(2);
  //   expect(searchBox).toExist();
  //   expect(searchBox.children.length).toBe(0);
  //   expect(submitButton).toExist();
  //   expect(submitButton.children.length).toBe(0);
  // });

  // it('should POST search data to /search', () => {
  //   let index = TestUtils.renderIntoDocument(
  //     <Provider store={configure({})}>
  //       <Index />
  //     </Provider>
  //   );
  //   let form = TestUtils.findRenderedDOMComponentWithTag(index, 'form');
  //   let jqueryMock = sinon.mock($).expects('ajax').atLeast(1);
  //   TestUtils.Simulate.submit(form);
  //   jqueryMock.verify();
  // });
  //
  // it('should render a BarList component', () => {
  //   let index = TestUtils.renderIntoDocument(
  //     <Provider store={configure({})}>
  //       <Index />
  //     </Provider>
  //   );
  //   let barList = TestUtils.scryRenderedComponentsWithType(index, BarList);
  //   expect(barList).toExist();
  //   expect(barList).toNotBe(undefined);
  //   expect(barList.length).toBe(1);
  // });
});
