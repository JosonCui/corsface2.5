/**
 * Created by Ethan on 2018/1/15.
 */
import React from 'react';
import { connect } from 'dva';
import { Progress } from 'antd';
import styles from './historyPass.less';
import testImg from '../../../assets/gyc.jpg';


const FaceComparisonCard = ({ onClick }) => (
  <div>
    <div className={styles.card} onClick={onClick}>
      <img src={testImg} alt="" className={styles.camera}/>
      <div className={styles.textGroup}>
        <p>李寻欢</p>
        <p>41252236523552234</p>
        <p>杀人犯组</p>
        <p>男/青年/有胡子</p>
        <p>打浦桥下行路口</p>
        <p>2017-12-19 18:16:25</p>
      </div>
      <img src={testImg} alt="" className={styles.faceTrack}/>
      <Progress percent={30} size="small" strokeWidth={4} styles={{marginTop: '50px'}}/>
    </div>

  </div>

  );

export default FaceComparisonCard;
