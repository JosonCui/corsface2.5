/**
 * Created by Ethan on 2018/2/1.
 */
import React from 'react';
import { Modal, Row, Col, Button, Input,Select } from 'antd';
import {connect} from 'dva';
import styles from './historyPass.less';
import testImg from '../../../assets/gyc.jpg';
import sceneImg from '../../../assets/sceneImg.png';

class AddTargetModal extends React.Component {

  onCancel = () => {
    const historyPass = this.props.basics.historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          addTargetModal: false
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
          visible={this.props.basics.historyPass.addTargetModal}
          onCancel={this.onCancel}
          closable={false}
          width={970}
          bodyStyle={{height: 576, border: '1px solid #02abe3'}}
          className={styles.modalBody}
        >
          <Row style={{height: '100%'}}>
            <Col span={8} className={styles.wrap}>
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
            <Col span={16} className={styles.wrap}>
              <div className={styles.modalHeader}>
                <span className={styles.modalHeaderTitle}>现场照片</span>
                <span onClick={this.onCancel} className={styles.modalHeaderClose}>关闭</span>
              </div>
              <div>
                <img className={styles.sceneImg} src={sceneImg} alt=""/>
                <div className={styles.modalInput}>
                  <div className={styles.formItem}>
                    <label className={styles.fromlabel}>姓名：</label>
                    <Input type="text" style={{width: '150px'}} size="small"/>
                  </div>
                  <div className={styles.formItem}>
                    <label className={styles.fromlabel}>身份证号：</label>
                    <Input type="text" style={{width: '150px'}} size="small"/>
                  </div>
                  <div className={styles.formItem}>
                    <label className={styles.fromlabel}>所属分组：</label>
                    <Select
                      style={{
                        width: '150px'
                      }}
                      size="small"
                      // onChange={this.onSelectGroupChange}
                    >
                      <Option value="">全部</Option>
                      {/*{this.renderSelectOptions()}*/}

                    </Select>
                  </div>
                </div>
                <div className={styles.modalInput}>
                  <div className={styles.formItem}>
                    <label className={styles.fromlabel}>性别：</label>
                    <Select
                      style={{
                        width: '150px'
                      }}
                      size="small"
                      // onChange={this.onSelectGroupChange}
                    >
                      <Option value="1">男</Option>
                      <Option value="2">女</Option>
                    </Select>
                  </div>
                  <div className={styles.formItem}>
                    <label className={styles.fromlabel}>户籍：</label>
                    <Input type="text" style={{width: '150px'}} size="small"/>
                  </div>
                  <div className={styles.formItem}>
                    <label className={styles.fromlabel}>阈值：</label>
                    <Input type="text" style={{width: '150px'}} size="small"/>
                  </div>
                </div>
                <div>
                  <Button onClick={this.addTarget} style={{marginLeft: '43%'}} type="primary">新增目标</Button>

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

export default connect(mapStateToProps)(AddTargetModal);
