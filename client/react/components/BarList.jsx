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
    let {bars, dispatch} = this.props;
    return bars.map((bar, i) => {
      // let [category] = bar
      //   .categories
      //   .filter((cat) => {
      //     return cat.primary;
      //   });
      // console.log(bar);
      let photos = {};
      $.get(`/api/search/photos${bar.id}`, (data) => {
        photos = JSON.parse(data);
        console.log('callback photos: ', photos);
        // dispatch(actions.)
      });
      // console.log('main call photos: ', photos);
      return (
        <div key={`bar-list-${i}`} className='row'>
          <div className='col-xs-12 col-sm-2'>
            <img />
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
};

BarList.defaultProps = {
  bars: [],
};

export default connect((state) => state)(BarList);
