/**
 * Created by Ethan on 2018/1/15.
 */
import React from 'react';
import { connect } from 'dva';
import { Progress } from 'antd';
import styles from './historyPass.less';

class FaceComparisonCard extends React.Component {

  render() {
    return (
      <div>
        <div className={styles.card}>
          <div className={styles.camera}/>
          <div className={styles.textGroup}>
            <p>李寻欢</p>
            <p>41252236523552234</p>
            <p>杀人犯组</p>
            <p>男/青年/有胡子</p>
            <p>打浦桥下行路口</p>
            <p>2017-12-19 18:16:25</p>
          </div>
          <div className={styles.faceTrack}/>
          <Progress percent={30} size="small" width={100}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ basics }) {
  return { basics };
}

export default connect(mapStateToProps)(FaceComparisonCard);
