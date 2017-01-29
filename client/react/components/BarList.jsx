/*----------Modules----------*/
import React from 'react';

/*----------Components----------*/


/*eslint-disable require-jsdoc*/
export class BarList extends React.Component {
  constructor() {
    super();
  }
  listBars() {
    let {bars} = this.props;
    return bars.map((bar, i) => {
      return (
        <div key={`bar-list-${i}`} className='row'>
          <div className='col-xs-12 col-sm-2'>
            Img
          </div>
          <div className='col-xs-12 col-sm-10'>
            <h4>
              {bar.name}
            </h4><br />
            <p>
              {bar.text}
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

export default BarList;
