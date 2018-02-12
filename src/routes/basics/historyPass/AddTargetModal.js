/**
 * Created by Ethan on 2018/2/1.
 */
import React from 'react';
import { Modal, Row, Col, Button, Input, Select, InputNumber, TreeSelect } from 'antd';
import {connect} from 'dva';
import styles from './historyPass.less';

const AddTargetModal = ({
                          data,
                          visible,
                          treeData,
                          onCancel,
                          addTargetData,
                          nameChange,
                          idcardChange,
                          groupChange,
                          genderChange,
                          nativeplaceChange,
                          thresholdChange,
                          orgunitChange,
                          groupList
                      }) => {
  function onNameChange(e) {
    nameChange(e.target.value);
  }
  function onIdcardChange(e) {
    idcardChange(e.target.value);
  }
  function onGroupChange(value) {
    groupChange(value);
  }
  function onGenderChange(value) {
    genderChange(value);
  }
  function onNativeplaceChange(e) {
    nativeplaceChange(e.target.value);
  }
  function onThresholdChange(value) {
    thresholdChange(value);
  }
  function onOrgunitChange(value) {
    orgunitChange(value);
  }
  function onrenderSelectOptions() {
    let op = '';
    if (groupList) {
      op = groupList.map(value => (
        <Option value={value.id} key={value.id}>{value.name}</Option>
      ));
    }
    return op;
  }
  function onAddTargetData() {
    addTargetData()
  }

  return (
    <div>
      <Modal
        title=""
        footer=""
        visible={visible}
        onCancel={onCancel}
        closable={false}
        width={910}
        bodyStyle={{height: 576, border: '1px solid #02abe3'}}
        className={styles.modalBody}
      >
        <Row style={{height: '100%'}}>
          <Col span={7} className={styles.wrap}>
            <div className={styles.modalHeader}>
              <span className={styles.modalHeaderTitle}>抓拍序列</span>
            </div>
            <div className={styles.contentTwo}>
              {data && data.imgs && data.imgs.length > 0 ? data.imgs.map((value, i) =>
                <div key={value}>
                  <img className={styles.imgList} src={value} alt=""/>
                </div>
              ) : null}
            </div>
          </Col>
          <Col span={17} className={styles.wrap}>
            <div className={styles.modalHeader}>
              <span className={styles.modalHeaderTitle}>现场照片</span>
              <span onClick={onCancel} className={styles.modalHeaderClose}>关闭</span>
            </div>
            <div>
              <div className={styles.sceneImg}>
                <img src={data ? data.snapImg : ''} alt=""/>
              </div>
              <div className={styles.modalInput}>
                <div className={styles.formItem}>
                  <label className={styles.fromlabel}>*姓名：</label>
                  <Input type="text" style={{width: '150px'}} onChange={onNameChange} size="small"/>
                </div>
                <div className={styles.formItem}>
                  <label className={styles.fromlabel}>身份证号：</label>
                  <Input type="text" style={{width: '150px'}} onChange={onIdcardChange} size="small"/>
                </div>
                <div className={styles.formItem}>
                  <label className={styles.fromlabel}>*所属分组：</label>
                  <Select
                    style={{ width: '150px' }}
                    size="small"
                    onChange={onGroupChange}
                  >
                    <Option value="">全部</Option>
                     {onrenderSelectOptions()}

                  </Select>
                </div>

              </div>
              <div className={styles.modalInput}>
                <div className={styles.formItem}>
                  <label className={styles.fromlabel}>*性别：</label>
                  <Select
                    style={{
                      width: '150px'
                    }}
                    size="small"
                    onChange={onGenderChange}
                  >
                    <Option value="1">男</Option>
                    <Option value="2">女</Option>
                  </Select>
                </div>
                {/* <div className={styles.formItem}>*/}
                {/* <label className={styles.fromlabel}>户籍：</label>*/}
                {/* <Input type="text" style={{width: '150px'}} size="small" onChange={onNativeplaceChange}/>*/}
                {/* </div>*/}
                <div className={styles.formItem}>
                  <label className={styles.fromlabel}>所属组织：</label>
                  <TreeSelect
                    allowClear
                    treeData={treeData}
                    style={{ width: '150px' }}
                    onChange={onOrgunitChange}
                    treeDefaultExpandAll
                    placeholder="请选择组织"
                    size="small"
                  />
                </div>
                <div className={styles.formItem}>
                  <label className={styles.fromlabel}>*阈值：</label>
                  <InputNumber
                    style={{width: 80}} defaultValue={0} formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')} min={0} max={99} onChange={onThresholdChange}/>
                </div>
              </div>
              <div>
                <Button onClick={onAddTargetData} style={{marginLeft: '43%'}} type="primary">新增目标</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Modal>

    </div>
  );
};

export default AddTargetModal;

