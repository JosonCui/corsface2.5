/**
 * Created by Ethan on 2018/1/15.
 */
import React from 'react';
import { connect } from 'dva';
import MayLayout from '../../../components/common/Layout/MayLayout';
import styles from './historyPolice.less';

class HistoryPolice extends React.Component {

  render() {
    return (
      <MayLayout location={this.props.location}>
        <div>HistoryPolice</div>
      </MayLayout>
    );
  }
}

function mapStateToProps({ basics }) {
  return { basics };
}

export default connect(mapStateToProps)(HistoryPolice);
