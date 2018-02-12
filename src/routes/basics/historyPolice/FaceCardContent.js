/**
 * Created by Ethan on 2018/1/15.
 */
import React from 'react';
import { connect } from 'dva';
import { Progress, Row, Col } from 'antd';
import styles from './historyPolice.less';
import testImg from '../../../assets/gyc.jpg';
import CaptureImgCard from './CaptureImgCard';
import ComparisonImgCard from './ComparisonImgCard';


const FaceCardContent = ({onClickCapt, onClickComp}) => (
  <div>
    <Col span={3}>
      <CaptureImgCard onClick={onClickCapt}/>
    </Col>
    <Col span={21}>
      <ComparisonImgCard onClick={onClickComp}/>
    </Col>
  </div>
  );

export default FaceCardContent;
