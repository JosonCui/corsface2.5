
/**
 * Created by Ethan on 2018/1/16.
 */
import React from 'react';
import { Modal, Button, Input, Select, Icon, Row, Col, Checkbox, TreeSelect} from 'antd';
import styles from './Rule.less';

const Option = Select.Option;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const AddRuleModule = ({ visiable,
                         dataSource,
                         groupTree,
                         onAddModalCancel,
                         cameraOrgunitChange,
                         targetOrgunitChange,
                         targerNameList,
                         groupChange,
                         nameChange,
                         disposeChange,
                         timeChange,
                         memoChange,
                         targetGroupList,
                          onSubmit }) => {
  function onCancel() {
    onAddModalCancel();
  }
  function onCameraOrgunitChange(value) {
    cameraOrgunitChange(value);
  }
  function onTargetOrgunitChange(value) {
    targetOrgunitChange(value);
  }
  function onGroupChange(value) {
    groupChange(value);
  }
  function onrenderSelectOptions() {
    let op = '';
    if (targetGroupList) {
      op = targetGroupList.map(value => (
        <Option value={value.id} key={value.id}>{value.name}</Option>
      ));
    }
    return op;
  }
  function onrenderTargerNameList() {
    let op = '';
    if (targerNameList) {
      op = targerNameList.map(value => (
        <Option value={value} key={value.id}>{value.name}</Option>
      ));
    }
    return op;
  }
  function onNameChange(value) {
    nameChange(value);
  }
  function onDisposeChange(value) {
    disposeChange(value);
  }
  function onTimeChange(e) {
    timeChange(e.target.value);
  }
  function onMemoChange(e) {
    memoChange(e.target.value);
  }
  function onAddClick() {
    onSubmit();
  }
  function checkBoxIsChecked(value) {
    if (dataSource.alarmTime.indexOf(value - 0) === -1) {
      return false;
    }
    return true;
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
        bodyStyle={{ border: '1px solid #02abe3'}}
        className={styles.modalBody}
      >
        <div className={styles.modalHeader}>
          <span className={styles.modalHeaderTitle}>新建规则</span>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>摄像头所属组织</div>
          <TreeSelect
            treeData={groupTree || []}
            className={styles.input}
            value={`${dataSource.cmOrgunitId}`}
            onChange={onCameraOrgunitChange}
            treeDefaultExpandAll
            placeholder="请选择组织"
          />
        </div>
        <div className={styles.moduleLine} />
        <div className={styles.serchWrap}>
          <div className={styles.text}>目标所属组织</div>
          <TreeSelect
            treeData={groupTree || []}
            className={styles.input}
            value={`${dataSource.poiOrgunitId}`}
            onChange={onTargetOrgunitChange}
            treeDefaultExpandAll
            placeholder="请选择组织"
          />
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>目标所属分组</div>
          <Select
            className={styles.input}
            onChange={onGroupChange}
            value={dataSource.groupId}
          >
            {onrenderSelectOptions()}
          </Select>
        </div>

        <div className={styles.serchWrap}>
          <div className={styles.text}>目标姓名</div>
          <Select
            showSearch
            optionFilterProp="children"
            className={styles.input}
            onChange={onNameChange}
            value={dataSource.targetName}
          >
            {onrenderTargerNameList()}
          </Select>
        </div>
        <div className={styles.moduleLine} />
        <div className={styles.serchWrap}>
          <div className={styles.text}>处理方式</div>
          <Select
            className={styles.input}
            onChange={onDisposeChange}
            value={`${dataSource.configType}`}
          >
            <Option value="0">报警</Option>
            <Option value="1">通过</Option>

          </Select>
        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>执行时间</div>
          <div className={styles.checkboxInput}>
            <Row>
              <Col span={8}>
                <Checkbox value="0" checked={checkBoxIsChecked('0')} onChange={onTimeChange}>每天</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="1" checked={checkBoxIsChecked('1')} onChange={onTimeChange}>星期一</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="2" checked={checkBoxIsChecked('2')} onChange={onTimeChange}>星期二</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="3" checked={checkBoxIsChecked('3')} onChange={onTimeChange}>星期三</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="4" checked={checkBoxIsChecked('4')} onChange={onTimeChange}>星期四</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="5" checked={checkBoxIsChecked('5')} onChange={onTimeChange}>星期五</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="6" checked={checkBoxIsChecked('6')} onChange={onTimeChange}>星期六</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="7" checked={checkBoxIsChecked('7')} onChange={onTimeChange}>星期天</Checkbox>
              </Col>
            </Row>
          </div>

        </div>
        <div className={styles.serchWrap}>
          <div className={styles.text}>备注</div>
          <TextArea
            className={styles.input}
            style={{width: 200}}
            autosize={{ minRows: 2, maxRows: 5 }}
            onChange={onMemoChange}
            value={dataSource.memo}
          />
        </div>
        <Row type="flex" justify="space-between" className={styles.footer}>
          <Button type="primary" className={styles.refreshMatch} onClick={onAddClick}>保存</Button>
          <Button type="primary" ghost className={styles.refreshMatch} onClick={onCancel}>关闭</Button>

        </Row>
      </Modal>
    </div>
  );
};

export default AddRuleModule;

