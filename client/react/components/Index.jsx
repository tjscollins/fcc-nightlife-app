/*----------Modules----------*/
import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';

/*----------Components----------*/
import BarList from 'BarList';

import * as actions from 'actions';

import {storeBarList, storePhotos} from 'actions';

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
    };
    $
      .ajax(request)
      .fail((err) => {
        throw err;
      })
      .done((res) => dispatch(storeBarList(JSON.parse(res).response.venues)))
      .then((res) => {
        let bars = JSON
          .parse(res)
          .response
          .venues;
        bars.forEach((bar, i) => {
          $.get(`/api/search/photos${bar.id}`, (data) => {
            let {photos} = JSON
              .parse(data)
              .response;
            dispatch(storePhotos(bar.id, photos));
          });
        });
      }, (err) => {
        throw err;
      });
  }
  render() {
    let {dispatch, user: {auth}} = this.props;
    if(auth === undefined) console.log($
      .get('/api/me').then((arg) => {
        console.log('/api/me response', arg);
        if(arg._id !== undefined) dispatch(actions.loginUser(arg));
      }));
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

Index.propTypes = {
  dispatch: React.PropTypes.func,
  user: React.PropTypes.object,
};

export default connect((state) => state)(Index);
