/**
 * Created by Ethan on 2018/2/1.
 */
import React from 'react';
import { Modal, Row, Col, Button } from 'antd';
import {connect} from 'dva';
import styles from './historyPass.less';
import testImg from '../../../assets/gyc.jpg';
import sceneImg from '../../../assets/sceneImg.png';

class PassDetailsModal extends React.Component {

  onCancel = () => {
    const historyPass = this.props.basics.historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          passDetailsModal: false
        }
      }
    });
  }
  addTarget = () => {
    const historyPass = this.props.basics.historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          addTargetModal: true
        }
      }
    });
  }
  render() {
    return (
      <div>
        <Modal
          title=""
          footer=""
          visible={this.props.basics.historyPass.passDetailsModal}
          onCancel={this.onCancel}
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
              <div className={styles.imgList}>
                <p>李寻欢</p>
                <p>41252236523552234</p>
              </div>
              <div>
                <Button style={{marginLeft: '33%'}} type="primary">删除选中</Button>
                <div className={styles.reminderFont} >选中不清晰图片可将其删除</div>
              </div>
            </Col>
            <Col span={7} className={styles.wrap}>
              <div className={styles.modalHeader}>
                <span className={styles.modalHeaderTitle}>目标信息</span>
              </div>
              <div className={styles.content}>
                <div className={styles.messageCard}>
                  <img style={{float: 'left'}} src={testImg} alt=""/>
                  <div className={styles.textGroup}>
                    <p>李寻欢</p>
                    <p>41252236523552234</p>
                    <p>男/青年/有胡子</p>
                    <p>打浦桥下行路口</p>
                    <p>86.5%</p>
                  </div>
                </div>
              </div>

            </Col>
            <Col span={12} className={styles.wrap}>
              <div className={styles.modalHeader}>
                <span className={styles.modalHeaderTitle}>现场照片</span>
                <span onClick={this.onCancel} className={styles.modalHeaderClose}>关闭</span>
              </div>
              <div>
                <img className={styles.sceneImg} src={sceneImg} alt=""/>
                <div className={styles.relevance}>
                  <Button style={{marginLeft: '33%'}} type="primary">关联目标</Button>
                  <div className={styles.reminderFont} >将抓拍序列和目标照片关联,可提高识别率</div>
                </div>
                <div className={styles.addNew}>
                  <Button onClick={this.addTarget} style={{marginLeft: '33%'}} type="primary">新增目标</Button>
                  <div className={styles.reminderFont} >将抓拍序列作为人脸图片进行新增目标</div>
                </div>
              </div>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ basics }) {
  return { basics };
}

export default connect(mapStateToProps)(PassDetailsModal);
