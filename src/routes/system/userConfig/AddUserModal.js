
/**
 * Created by Ethan on 2018/1/16.
 */
import React from 'react';
import { Modal, Button, Input, Select, Row, TreeSelect} from 'antd';
import styles from './userConfig.less';

const Option = Select.Option;
const { TextArea } = Input;
const AddUserModal = ({
                        visiable,
                        dataSource,
                        groupTree,
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
  function onorgunitIdChange(value) {
    userOrgunitIdChange(value);
  }
  function onuserPhoneChange(e) {
      userPhoneChange(e.target.value);
  }
  function onrenderSelectOptions() {
    const op = renderSelectOptions.map(value => (
      <Option value={value.id} key={value.id}>{ value.name }</Option>
    ));
    return op;
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
        width={432}
        bodyStyle={{height: 517, border: '1px solid #02abe3'}}
        className={styles.modalBody}
      >
        <div className={styles.modalHeader}>
          <span className={styles.modalHeaderTitle}>新建目标</span>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>*用户名</div>
          <Input className={styles.input} onChange={onuserLoginNameChange} value={dataSource.loginName}/>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>*密码</div>
          <Input type="password" className={styles.input} onChange={onuserPwdChange} value={dataSource.password}/>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>*姓名</div>
          <Input className={styles.input} onChange={onuserNameChange} value={dataSource.name}/>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>*手机号</div>
          <Input className={styles.input} onChange={onuserPhoneChange} value={dataSource.phone}/>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>*所属角色</div>
          <Select
            className={styles.input}
            placeholder="请选择角色"
            value={dataSource.roleId}
            onChange={onuserRoleIdChange}
          >
            {onrenderSelectOptions()}
          </Select>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>*所属组织</div>
          <TreeSelect
            treeData={groupTree || []}
            className={styles.input}
            value={`${dataSource.orgunitId}`}
            onChange={onorgunitIdChange}
            treeDefaultExpandAll
            placeholder="请选择组织"
          />
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>电子邮箱</div>
          <Input className={styles.input} onChange={onuserEmailChange} value={dataSource.email}/>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>备注</div>
          <TextArea
            className={styles.input}
            style={{width: 200}}
            autosize={{ minRows: 2, maxRows: 5 }}
            value={dataSource.memo}
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

export default AddUserModal;

