/*----------Modules----------*/
import React from 'react';
import {connect} from 'react-redux';

/*----------Components----------*/

import * as actions from 'actions';

/*eslint-disable require-jsdoc*/
export class BarList extends React.Component {
  constructor() {
    super();
  }
  carousel(id) {
    try {
      let {items} = this.props.photos[id];
      let carousel = items.length > 0;
      let pics = items.map((pic, i) => {
        if (i > 9) {
          return (<div/>);
        }
        return (
          <div className={i === 0
            ? 'item active'
            : 'item'}>
            <img src={pic.prefix + '300x200' + pic.suffix}/>
          </div>
        );
      });
      let wrapper = (
        <div
          key={id}
          id={'carousel-' + id}
          className='carousel slide'
          data-ride='carousel'>
          <div className='carousel-inner' role='listbox'>
            {pics}
          </div>

          <a
            className='left carousel-control'
            href={'#carousel-' + id}
            role='button'
            data-slide='prev'>
            <span className='glyphicon glyphicon-chevron-left' aria-hidden='true'/>
            <span className='sr-only'>Previous</span>
          </a>
          <a
            className='right carousel-control'
            href={'#carousel-' + id}
            role='button'
            data-slide='next'>
            <span className='glyphicon glyphicon-chevron-right' aria-hidden='true'/>
            <span className='sr-only'>Next</span>
          </a>
        </div>
      );
      return carousel
        ? wrapper
        : <div/>;
    } catch (e) {
      return;
    }
  }
  listBars() {
    let {bars, photos, dispatch, headcounts, user: {
        auth
      }} = this.props;
    bars.map((bar) => {
      if (headcounts[bar.id] === undefined) {
        let request = {
          url: `/api/headcount${bar.id}`,
          method: 'GET'
        };
        $
          .ajax(request)
          .done((res) => {
            dispatch(actions.storeHeadcounts(bar.id, res.headcount));
          })
          .fail((err) => {
            console.error(err);
          });
      }
    });
    return bars.map((bar, i) => {
      return (
        <div key={`bar-list-${i}`} className='row bar-listing'>
          <div className='col-xs-12 col-sm-4'>
            {this.carousel(bar.id)}
          </div>
          <div className='col-xs-12 col-sm-8'>
            <div className='row'>
              <h4 className='col-xs-6'>
                {bar.name}
              </h4>
              <div
                className='col-xs-6'
                style={{
                  float: 'left'
                }}>
                <a href={auth
                  ? '#'
                : 'auth/twitter'}>
                  <button
                    onClick={auth
                      ? this
                      .toggleMe
                      .bind(this, bar.id)
                    : null}
                    className='attending'>{headcounts[bar.id] + ' Going Tonight'}</button>
                </a>
              </div>
            </div>
            <br/>
            <p>
              {bar
                .location
                .formattedAddress
                .join('\n')}
            </p>
          </div>
        </div>
      );
    });
  }
  renderPhotos(id) {
    /*eslint-disable no-var*/
    if (this.props.photos[id]) {
      var {items, count} = this.props.photos[id];
    } else {
      var count = 0;
    }
    if (count > 0) {
      let {prefix, suffix} = items[0];
      return (<img src={prefix + '300x200' + suffix}/>);
    } else {
      return <div/>;
    }
    /*eslint-enable no-var*/
  }
  toggleMe(foursquareId) {
    let {dispatch, user} = this.props;
    if (!user.auth) {
      $
        .get('/auth/twitter')
        .then(() => {
        });
    }
    let request = {
      url: `/api/headcount${foursquareId}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      dataType: 'json',
      data: JSON.stringify({_id: user._id})
    };
    console.log('POST data: ', request.data);
    $
      .ajax(request)
      .done((res) => {
        console.log('toggleMe res: ', res);
        dispatch(actions.storeHeadcounts(foursquareId, res.headcount));
      });
  }
  render() {
    return (
      <div className='container barlist'>
        {this.listBars()}
      </div>
    );
  }
}

BarList.propTypes = {
  bars: React.PropTypes.array,
  dispatch: React.PropTypes.func,
  photos: React.PropTypes.object,
  headcounts: React.PropTypes.object,
  user: React.PropTypes.object
};

BarList.defaultProps = {
  bars: []
};

export default connect((state) => state)(BarList);
