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
    let {bars} = this.props;
    return bars.map((bar, i) => {
      let [category] = bar
        .categories
        .filter((cat) => {
          return cat.primary;
        });
      console.log(category);
      let iconURL = category ? category.icon.prefix + category.name + category.icon.suffix : '';
      return (
        <div key={`bar-list-${i}`} className='row'>
          <div className='col-xs-12 col-sm-2'>
            <img src={iconURL}/>
          </div>
          <div className='col-xs-12 col-sm-10'>
            <div className='row'>
              <h4 className='col-xs-6'>
                {bar.name}
              </h4>
              <p className='col-xs-3' style={{float: 'left'}}>
                # Going Tonight
              </p>
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
  render() {
    return (
      <div className='container'>
        {this.listBars()}
      </div>
    );
  }
}

BarList.propTypes = {
  bars: React.PropTypes.array
};

BarList.defaultProps = {
  bars: []
};

export default connect((state) => state)(BarList);
