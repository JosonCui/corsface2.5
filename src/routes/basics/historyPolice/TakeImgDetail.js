/**
 * Created by Ethan on 2018/2/2.
 */
import React from 'react';
import { connect } from 'dva';
import { Progress, Row, Col, Modal, Button, Input } from 'antd';
import styles from './historyPolice.less';
import testImg from '../../../assets/gyc.jpg';
import sceneImg from '../../../assets/sceneImg.png';
import CaptureImgCard from './CaptureImgCard';
import ComparisonImgCard from './ComparisonImgCard';


const TakeImgDetail = ({visiable, onCancel}) => (

  <div>
    <Modal
      title=""
      footer=""
      visible={visiable}
      onCancel={onCancel}
      closable={false}
      width={910}
      bodyStyle={{height: 576, border: '1px solid #02abe3'}}
      className={styles.modalBody}
    >
      <Row style={{height: '100%', color: '#fff'}}>
        <Col span={7} className={styles.detailsWrap}>
          <div className={styles.modalHeader}>
            <span className={styles.modalHeaderTitle}>抓拍序列</span>
          </div>
          <div className={styles.takeImgList}>
            <img className={styles.imgList} src={testImg} alt=""/>
            <img className={styles.imgList} src={testImg} alt=""/>
            <img className={styles.imgList} src={testImg} alt=""/>
            <img className={styles.imgList} src={testImg} alt=""/>
            <img className={styles.imgList} src={testImg} alt=""/>
            <img className={styles.imgList} src={testImg} alt=""/>
            <img className={styles.imgList} src={testImg} alt=""/>
            <img className={styles.imgList} src={testImg} alt=""/>
            <img className={styles.imgList} src={testImg} alt=""/>
            <img className={styles.imgList} src={testImg} alt=""/>
            <img className={styles.imgList} src={testImg} alt=""/>
          </div>
        </Col>
        <Col span={17} className={styles.detailsWrap}>
          <div className={styles.modalHeader}>
            <span className={styles.modalHeaderTitle}>现场照片</span>
            <span onClick={onCancel} className={styles.modalHeaderClose}>关闭</span>
          </div>
          <div>
            <img className={styles.sceneImg} src={sceneImg} alt=""/>
            <div className={styles.modalInput}>
              <div className={styles.formItem}>
                <span>摄像头名称/位置:</span>
              </div>
              <div className={styles.formItem}>
                <span>人脸特征:</span>
              </div>
              <div className={styles.formItem}>
                <span>抓拍时间:</span>
              </div>
              <div className={styles.formItem}>
                <span>相似度:</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  </div>

);

export default TakeImgDetail;
