/**
 * Created by Ethan on 2018/2/5.
 */
import React from 'react';
import { connect } from 'dva';
import { Progress } from 'antd';
import styles from './realPolice.less';
import testImg from '../../../assets/gyc.jpg';


const RealPoliceCard = ({ onClick }) => (
  <div>
    <div className={styles.card} onClick={onClick}>
      <div className={styles.left}>
        <img src={testImg} alt="" className={styles.camera}/>
        <div className={styles.textGroup}>
          <p>李寻欢</p>
          <p>男/青年/有胡子</p>
          <p>2017-12-19 18:16:25</p>
        </div>
      </div>
      <div className={styles.right}>
        <img src={testImg} alt="" className={styles.faceTrack}/>
        <div className={styles.ku_icon} />
        <div className={styles.textGroup}>
          <p>李寻欢</p>
          <p>杀人犯组</p>
          <p>444444415525525225</p>
        </div>
      </div>

      <Progress percent={30} size="small" strokeWidth={4} styles={{marginTop: '50px'}}/>
    </div>

  </div>

);

export default RealPoliceCard;
