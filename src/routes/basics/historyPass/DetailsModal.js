/**
 * Created by Ethan on 2018/2/1.
 */
import React from 'react';
import { Modal, Row, Col, Button } from 'antd';
import styles from './historyPass.less';
import testImg from '../../../assets/gyc.jpg';

const DetailsModal = ({ data,
                        visible,
                        onCancel,
                        addTarget,
                        checkImgs,
                        deleteTakeImgs,
                        bindFacetrack,
                        clickBindBtn,
                        toggleClass,
                        messageToggleClass
}) => {

  function onCheckImgs(value) {
    checkImgs(value);
  }

  function onDeleteTakeImgs() {
    deleteTakeImgs()
  }

  function onBindFacetrack(value) {
    bindFacetrack(value)
  }
  function onclickBindBtn() {
    clickBindBtn()
  }
  function ontoggleClass(value) {
    return toggleClass(value)
  }
  function onMessageToggleClass(value) {
    return messageToggleClass(value)
  }
  return (
    <div>
      <Modal
        title=""
        footer=""
        visible={visible}
        onCancel={onCancel}
        closable={false}
        width={1290}
        bodyStyle={{height: 576, border: '1px solid #02abe3'}}
        className={styles.modalBody}
      >
        <Row style={{height: '100%'}}>
          <Col span={5} className={styles.wrap}>
            <div className={styles.modalHeader}>
              <span className={styles.modalHeaderTitle}>抓拍序列</span>
            </div>
            <div className={styles.content}>
              {data && data.imgs && data.imgs.length > 0 ? data.imgs.map((value, i) =>
                <div className={ontoggleClass(value)} key={value} onClick={onCheckImgs.bind(this, value)}>
                  <img src={value} alt=""/>
                </div>
              ) : null}
            </div>
            <div className={styles.imgList}>
              <p>{data && data.srcName}</p>
              <p>{data && data.captureTime}</p>
            </div>
            <div>
              <Button style={{marginLeft: '33%'}} onClick={onDeleteTakeImgs} type="primary">删除选中</Button>
              <div className={styles.reminderFont} >选中不清晰图片可将其删除</div>
            </div>
          </Col>
          <Col span={7} className={styles.wrap}>
            <div className={styles.modalHeader}>
              <span className={styles.modalHeaderTitle}>目标信息</span>
            </div>
            <div className={styles.content}>
              {data && data.matchPoiList && data.matchPoiList.length > 0 ? data.matchPoiList.map((value) =>
                <div key={value.id} className={onMessageToggleClass(value)} onClick={onBindFacetrack.bind(this, value)}>
                  <img style={{float: 'left'}} src={value.imgs.length > 0 ? value.imgs[0] : value.uoloadImgs[0]} alt=""/>
                  <div className={styles.textGroup}>
                    <p>{value.name}</p>
                    <p>{value.identityCard}</p>
                    <p>{value.gender}</p>
                    <p>
                      {value && value.poiOrgunitList && value.poiOrgunitList.length > 0 ? value.poiOrgunitList.map((item) =>
                        <span key={item}>{item.name}-</span>
                      ): '无组织-'}
                      <span>{value.poigroupData.groupName}</span>
                    </p>
                    <p style={{color: '#ff9b3a'}}>{value.score}%</p>
                  </div>
                </div>
              ) : null}

            </div>

          </Col>
          <Col span={12} className={styles.wrap}>
            <div className={styles.modalHeader}>
              <span className={styles.modalHeaderTitle}>现场照片</span>
              <span onClick={onCancel} className={styles.modalHeaderClose}>关闭</span>
            </div>
            <div>
              <div className={styles.sceneImg} >
                <img src={data ? data.snapImg : ''} alt=""/>
              </div>
              <div className={styles.relevance}>
                <Button style={{marginLeft: '33%'}} onClick={onclickBindBtn} type="primary">关联目标</Button>
                <div className={styles.reminderFont} >将抓拍序列和目标照片关联,可提高识别率</div>
              </div>
              <div className={styles.addNew}>
                <Button onClick={addTarget} style={{marginLeft: '33%'}} type="primary">新增目标</Button>
                <div className={styles.reminderFont} >将抓拍序列作为人脸图片进行新增目标</div>
              </div>
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default DetailsModal;
