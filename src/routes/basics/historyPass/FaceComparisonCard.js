/**
 * Created by Ethan on 2018/1/15.
 */
import React from 'react';
import { connect } from 'dva';
import { Progress } from 'antd';
import styles from './historyPass.less';
import testImg from '../../../assets/gyc.jpg';


const FaceComparisonCard = ({data, matchData, onClick }) => (

  <div>
    <div className={styles.card} onClick={onClick}>
      <img src={data.imgs[0]} alt="" className={styles.camera}/>
      <div className={styles.textGroup}>
        <p>{matchData.name}</p>
        <p>{matchData.identityCard}</p>
        <p>{matchData.poigroupData.groupName}</p>
        <p>
          <span>{data.gender}</span>
          <span>{data.isglasses ? '/有眼镜' : ''}</span>
          <span>{data.ismoustache ? '/有胡子' : ''}</span>
          <span>{data.ishat ? '/戴帽子' : ''}</span>
        </p>
        <p>{data.srcName}</p>
        <p>{data.captureTime}</p>
      </div>
      <div className={styles.faceTrack}>
        <img src={matchData.imgs.length > 0 ? matchData.imgs[0] : matchData.uoloadImgs[0]} alt=""/>
        <div className={styles.ku_icon} />
      </div>
      <Progress percent={matchData.score} size="small" strokeWidth={4} styles={{marginTop: '50px'}}/>
    </div>

  </div>

  );

export default FaceComparisonCard;
