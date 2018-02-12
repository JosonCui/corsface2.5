
/**
 * Created by Ethan on 2018/1/16.
 */
import React from 'react';
import { Modal, Button, Input, Select, Icon, Row} from 'antd';
import styles from './roleConfig.less';

const { TextArea } = Input;
const Option = Select.Option;


const AddRoleModal = ({
  visiable, onAddModalCancel, dataSource, roleNameChange, roleMemoChange, onSubmit, subModules,
        moduleIdChange}) => {
  function onCancel() {
    onAddModalCancel();
  }
  function onRoleNameChange(e) {
    roleNameChange(e.target.value);
  }
  function onModuleIdChange(value) {
    moduleIdChange(value);
  }
  function onRoleMemoChange(e) {
    roleMemoChange(e.target.value);
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
        bodyStyle={{ height: 266, border: '1px solid #02abe3' }}
        className={styles.modalBody}
    >
        <div className={styles.modalHeader}>
          <span className={styles.modalHeaderTitle}>新建角色</span>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>*角色名称</div>
          <Input className={styles.input} value={dataSource.name} onChange={onRoleNameChange}/>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>*默认模块</div>
          <Select className={styles.input} value={dataSource.moduleId} onChange={onModuleIdChange}>
            {subModules.map(value =>
              <Option value={value.moduleId} key={value.moduleId}>{value.moduleName}</Option>)}
          </Select>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>备注</div>
          <TextArea
            className={styles.input}
            style={{ width: 200 }}
            autosize={{ minRows: 2, maxRows: 5 }}
            value={dataSource.memo}
            onChange={onRoleMemoChange}
          />
        </div>
        <Row type="flex" justify="space-between" className={styles.footer}>
          <Button type="primary" className={styles.refreshMatch} onClick={onAddClick}>新增</Button>
          <Button type="primary" ghost className={styles.refreshMatch} onClick={onCancel}>关闭</Button>
        </Row>
      </Modal>
    </div>);
};


export default AddRoleModal;

