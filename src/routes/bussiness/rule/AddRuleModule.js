
/**
 * Created by Ethan on 2018/1/16.
 */
import React from 'react';
import { Modal, Button, Input, Select, Icon, Row, Checkbox} from 'antd';
import { connect } from 'dva';
import styles from './Rule.less';

const Option = Select.Option;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const AddRuleModule = ({
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
  function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
  }
  const plainOptions = ['Apple', 'Pear', 'Orange'];
  return (
    <div>
      <Modal
        title=""
        footer=""
        visible={visiable}
        onCancel={onCancel}
        closable={false}
        width={500}
        bodyStyle={{height: 530, border: '1px solid #02abe3'}}
        className={styles.modalBody}
      >
        <div className={styles.modalHeader}>
          <span className={styles.modalHeaderTitle}>新建规则</span>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>摄像头所属组织</div>
          <Input className={styles.input} onChange={onuserLoginNameChange}/>
        </div>
        <div className={styles.line}></div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>目标所属组织</div>
          <Input
            className={styles.input}
            style={{width: 210}}
            addonAfter={<Icon type="folder-add" />}
          />
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>目标所属分组</div>
          <Select
            className={styles.input}
            onChange={onuserRoleIdChange}
          >
            {onrenderSelectOptions()}
          </Select>
        </div>

        <div className={styles.serchWrap}>
          <div className={styles.text}>目标姓名</div>
          <Input className={styles.input} onChange={onuserPwdChange}/>
        </div>
        <div className={styles.line}></div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>处理方式</div>
          <Input className={styles.input} onChange={onuserNameChange}/>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>执行时间</div>
          <CheckboxGroup
            style={{marginLeft: '10px', color: '#fff'}}
            // className={styles.input}
            options={plainOptions}
            defaultValue={['Apple']}
            onChange={onuserEmailChange}/>
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

export default AddRuleModule;

