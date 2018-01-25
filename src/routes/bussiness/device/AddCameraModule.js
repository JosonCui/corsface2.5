
/**
 * Created by Ethan on 2018/1/16.
 */
import React from 'react';
import { Modal, Button, Input, Select, Icon, Row} from 'antd';
import { connect } from 'dva';
import styles from './Device.less';

const Option = Select.Option;
const { TextArea } = Input;
const AddCameraModule = ({
                        visiable,
                        dataSource,
                        onAddModalCancel,
                        userNameChange,
                        userLoginNameChange,
                        userPwdChange,
                        userPhoneChange,
                        userRoleIdChange,
                        userOrgunitIdChange,
                        userEmailChange,
                        userMemoChange,
                        renderSelectOptions,
                        onSubmit }) => {
  function onCancel() {
    onAddModalCancel();
  }
  function onuserNameChange(e) {
    userNameChange(e.target.value);
  }
  function onuserLoginNameChange(e) {
    userLoginNameChange(e.target.value);
  }
  function onuserPwdChange(e) {
    userPwdChange(e.target.value);
  }
  function onuserRoleIdChange(value) {
    userRoleIdChange(value);
  }
  function onuserOrgunitIdChange(e) {
    userOrgunitIdChange(e.target.value);
  }
  function onrenderSelectOptions() {
    // const op = renderSelectOptions.map(value => (
    //   <Option value={value.id}>{ value.name }</Option>
    // ));
    // return op;
  }
  function onuserEmailChange(e) {
    userEmailChange(e.target.value);
  }
  function onuserMemoChange(e) {
    userMemoChange(e.target.value);
  }
  function onAddClick() {
    onSubmit();
  }
  return (
    <div>
      <Modal
        title=""
        footer=""
        visible={visiable}
        onCancel={onCancel}
        closable={false}
        width={500}
        bodyStyle={{height: 600, border: '1px solid #02abe3'}}
        className={styles.modalBody}
      >
        <div className={styles.modalHeader}>
          <span className={styles.modalHeaderTitle}>新建摄像头</span>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>摄像头名称</div>
          <Input className={styles.input} onChange={onuserLoginNameChange}/>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>摄像头品牌</div>
          <Select
            className={styles.input}
            placeholder="请选择品牌"
            onChange={onuserRoleIdChange}
          >
            {onrenderSelectOptions()}
          </Select>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>所属组织</div>
          <Input
            className={styles.input}
            style={{width: 210}}
            addonAfter={<Icon type="folder-add" />}
          />
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>IP地址</div>
          <Input className={styles.input} onChange={onuserPwdChange}/>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>管理摄像头用户名</div>
          <Input className={styles.input} onChange={onuserNameChange}/>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>管理摄像头密码</div>
          <Input type="password" className={styles.input} onChange={onuserEmailChange}/>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>播放流地址</div>
          <Input className={styles.input} onChange={onuserNameChange}/>
          <Button style={{marginLeft: '20px'}} type="primary">测试</Button>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>采集流地址</div>
          <Input className={styles.input} onChange={onuserNameChange}/>
          <Button style={{marginLeft: '20px'}} type="primary">测试</Button>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>备注</div>
          <TextArea
            className={styles.input}
            style={{width: 200}}
            autosize={{ minRows: 2, maxRows: 5 }}
            onChange={onuserMemoChange}
          />

        </div>
        <Row type="flex" justify="space-between" className={styles.footer}>
          <Button type="primary" className={styles.refreshMatch} onClick={onAddClick}>新增</Button>
          <Button type="primary" ghost className={styles.refreshMatch} onClick={onCancel}>关闭</Button>

        </Row>
      </Modal>
    </div>
  );
};

export default AddCameraModule;

