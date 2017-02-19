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
  listBars() {
    let {bars, photos, dispatch} = this.props;
    return bars.map((bar, i) => {
      // console.log(bar);
      // console.log('main call photos: ', photos);
      return (
        <div key={`bar-list-${i}`} className='row'>
          <div className='col-xs-12 col-sm-2'>
            {this.renderPhotos(bar.id)}
          </div>
          <div className='col-xs-12 col-sm-10'>
            <div className='row'>
              <h4 className='col-xs-3'>
                {bar.name}
              </h4>
              <p className='col-xs-6' style={{float: 'left'}}>
                Going
              </p>
            </div>
            <br />
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
    let {items, count} = this.props.photos[id];
    let {prefix, suffix} = items[0];
    // for (let photo of items) {
    //   console.log('photo of items, ', photo);
    // }
    console.log(items[0]);
    return (
      // <div />
      <img src={prefix + '200x200' + suffix} />
    );
  }
  render() {
    return (
      <div className='container'>
        {this.listBars()}
      </div>
    );
  }
}

BarList.propTypes = {
  bars: React.PropTypes.array,
  dispatch: React.PropTypes.func,
  photos: React.PropTypes.object,
};

BarList.defaultProps = {
  bars: [],
};

export default connect((state) => state)(BarList);
