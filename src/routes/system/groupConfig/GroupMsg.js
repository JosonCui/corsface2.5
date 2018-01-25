/**
 * Created by Jason on 2018/1/12.
 */
import React from 'react';
import { Input, Button, Select } from 'antd';

import ConfirmModal from '../../../components/common/ConfirmModal/ConfirmModal';

import styles from './groupConfig.less';

const Option = Select.Option;

const GroupMsg = ({ dataSource, onNameChange, onMemoChange, onCoordinateChange, onParentIdChange, isBtnDisplay, newSubOrgunit, onModifySubmit, orgunitList, onDelete }) => {
  function nameChange(e) {
    onNameChange(e.target.value);
  }
  function memoChange(e) {
    onMemoChange(e.target.value);
  }
  function coordinateChange(e) {
    onCoordinateChange(e.target.value);
  }
  function parentIdChange(value) {
    onParentIdChange(value - 0);
  }
  function onNewSubOrgunit(id) {
    console.log(id);
    newSubOrgunit(id);
  }
  function onSubmit() {
    onModifySubmit();
  }
  function onDeleteClick(id) {
    onDelete(id);
  }
  console.log(orgunitList);
  return (
    <div className={styles.groupMsgContain}>
      <div className={styles.groupMsgTitle}>组织信息</div>
      <div className={styles.groupMsgContent}>
        <div className={styles.groupMsgForm}>
          <div className={styles.formItem}>
            <label className={styles.label}>组织名称：</label>
            <Input
              type="text" style={{ width: '30%' }} value={dataSource.name}
              onChange={nameChange}/>
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>备注：</label>
            <Input type="text" style={{ width: '30%' }} value={dataSource.memo} onChange={memoChange}/>
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>坐标位置：</label>
            <Input type="text" style={{ width: '30%' }} value={dataSource.coordinate} onChange={coordinateChange}/>
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>所属组织：</label>
            <Select type="text" style={{ width: '30%' }} value={orgunitList !== 0 ? `${dataSource.parentId}` : ''} onChange={parentIdChange}>
              {orgunitList && orgunitList.length > 0 ? orgunitList.map(value => <Option key={value.key} value={`${value.key}`}>{value.title}</Option>) : null}
            </Select>
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}/>
            <div className={styles.ModifyBtns}>
              <Button type="primary" className={styles.btnLeft} onClick={onNewSubOrgunit.bind(this, dataSource.id)}><i
                className={styles.addIcon}/>新增子项目</Button>
            </div>
          </div>
          <div className={styles.formItem}/>

          <div className={styles.formItem}>
            <label className={styles.label}/>
            <div className={styles.ModifyBtns}>
              <Button type="primary" disabled={!isBtnDisplay} className={styles.btnLeft} onClick={onSubmit}>确认修改</Button>
              <Button type="danger" ghost className={styles.btnRight} onClick={onDeleteClick.bind(this, dataSource.id)}>删除此项</Button>
            </div>
          </div>

        </div>
      </div>

    </div>);
};


export default GroupMsg;
