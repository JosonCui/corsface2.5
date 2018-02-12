/**
 * Created by Ethan on 2018/2/2.
 */
import React from 'react';
import { connect } from 'dva';
import { Progress, Row, Col } from 'antd';
import styles from './historyPolice.less';
import testImg from '../../../assets/gyc.jpg';


const ComparisonImgCard = ({ onClick }) => (
  <div className={styles.comparisonWrap} >
    <div className={styles.card} onClick={onClick}>
      <img src={testImg} alt="" className={styles.camera}/>
      <div className={styles.textGroup}>
        <p>李寻欢</p>
        <p>41252236523552234</p>
        <p>杀人犯组</p>
        <Progress percent={30} size="small" strokeWidth={4} styles={{marginTop: '50px'}}/>
      </div>
    </div>
  </div>
);
export default ComparisonImgCard;
