/*----------Modules----------*/
import React from 'react';
import {connect} from 'react-redux';

/*----------Components----------*/


/*eslint-disable require-jsdoc*/
export class BarList extends React.Component {
  constructor() {
    super();
  }
  listBars() {
    let {bars, photos, dispatch} = this.props;
    return bars.map((bar, i) => {
      return (
        <div key={`bar-list-${i}`} className='row bar-listing'>
          <div className='col-xs-12 col-sm-4'>
            {this.renderPhotos(bar.id)}
          </div>
          <div className='col-xs-12 col-sm-8'>
            <div className='row'>
              <h4 className='col-xs-6'>
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
    /*eslint-disable no-var*/
    if(this.props.photos[id]) {
      var {items, count} = this.props.photos[id];
    } else {
      var count = 0;
    }
    if (count > 0) {
      let {prefix, suffix} = items[0];
      return (
        <img src={prefix + '300x200' + suffix} />
      );
    } else {
      return <div />;
    }
    /*eslint-enable no-var*/
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
};

BarList.defaultProps = {
  bars: [],
};

export default connect((state) => state)(BarList);
