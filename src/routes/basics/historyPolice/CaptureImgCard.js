/**
 * Created by Ethan on 2018/2/2.
 */
import React from 'react';
import { connect } from 'dva';
import { Progress, Row, Col } from 'antd';
import styles from './historyPolice.less';
import testImg from '../../../assets/gyc.jpg';


const CaptureImgCard = ({ onClick }) => (
  <div className={styles.takeImgWrap} >
    <div className={styles.takeImgCad} onClick={onClick}>
      <img src={testImg} alt="" className={styles.takeCamera}/>
      <p>李寻欢</p>
      <p>41252236523552234</p>
      <p>杀人犯组</p>
    </div>
  </div>
  );
export default CaptureImgCard;
