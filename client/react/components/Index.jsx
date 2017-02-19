/*----------Modules----------*/
import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';

/*----------Components----------*/
import BarList from 'BarList';

import {storeBarList} from 'actions';

/*eslint-disable require-jsdoc*/
export class Index extends React.Component {
  constructor() {
    super();
  }
  submit(e) {
    let {dispatch} = this.props;
    e.preventDefault();
    let request = {
      url: `/api/search?query=${this.refs.search.value}`,
      method: 'get',
      success: (res) => dispatch(storeBarList(JSON.parse(res).response.venues)),
      error: (err) => console.log(err),
    };
    // console.log('Search', this.refs.search.value);
    $.ajax(request);
  }
  render() {
    return (
      <div>
        <div className='container title-box'>
          <h1>Plan Your Night</h1>
          <h2>
            <i className='fa fa-map-marker fa-2x' />
            <i className='fa fa-taxi fa-2x' />
            <i className='fa fa-beer fa-2x' />
            <i className='fa fa-glass fa-2x' />
          </h2>
          <h4>See which bars are hoppin' tonight and RSVP ahead of time!</h4>
          <form
            onSubmit={this
              .submit
              .bind(this)}
            className='form-inline'>
            <div className='form-group'>
              <input
                ref='search'
                className='form-control'
                type='text'
                placeholder='Where You At?' />
              <button className='btn btn-default' type='submit'>Go</button>
            </div>
          </form>
        </div>
        <BarList />
      </div>
    );
  }
}

export default connect((state) => {
  return {dispatch: state.dispatch};
})(Index);
