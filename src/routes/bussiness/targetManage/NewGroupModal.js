/**
 * Created by Jason on 2018/1/30.
 */
import React from 'react';
import { connect } from 'dva';
import { Modal, Input, Select, Button, InputNumber } from 'antd';
import styles from './Target.less';

import { GROUP_TYPE } from '../../../utils/config';

const { TextArea } = Input;
const Option = Select.Option;

class NewGroupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      loading: false,
      imageUrl: ''
    };
  }
  onNameChange = e => {
    const poiGroup = this.props.bussiness.poiGroup;
    const { addGroupParams } = poiGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiGroup: {
          ...poiGroup,
          addGroupParams: {
            ...addGroupParams,
            name: e.target.value
          }
        }
      }
    });
  };
  onGroupChange = value => {
    const poiGroup = this.props.bussiness.poiGroup;
    const { addGroupParams } = poiGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiGroup: {
          ...poiGroup,
          addGroupParams: {
            ...addGroupParams,
            type: value
          }
        }
      }
    });
  };
  onThresholdChange = value => {
    const poiGroup = this.props.bussiness.poiGroup;
    const { addGroupParams } = poiGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiGroup: {
          ...poiGroup,
          addGroupParams: {
            ...addGroupParams,
            alarm_threshold: value
          }
        }
      }
    });
  };
  onMemoChange = e => {
    const poiGroup = this.props.bussiness.poiGroup;
    const { addGroupParams } = poiGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiGroup: {
          ...poiGroup,
          addGroupParams: {
            ...addGroupParams,
            memo: e.target.value
          }
        }
      }
    });
  };

  onSubmit = () => {
    switch (this.props.action) {
      case 'new':
        this.props.dispatch({
          type: 'bussiness/addGroup'
        });
        break;
      case 'edit':
        this.props.dispatch({
          type: 'bussiness/modifyGroup'
        });
        break;
    }
  };
  onCancel = () => {
    const poiGroup = this.props.bussiness.poiGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiGroup: {
          ...poiGroup,
          addGroupParams: {
            id: '',
            type: '',
            name: '',
            memo: ''
          },
          addGroupModalVisiable: false
        }
      }
    });
  };


  renderGroupType = () => (GROUP_TYPE.map((value, index) =>
            (<Option value={index} key={index}>{value}</Option>)));


  render() {
    const {poiGroup} = this.props.bussiness;
    return (<Modal
      title=""
      footer=""
      visible={poiGroup.addGroupModalVisiable}
      closable={false}
      width={400}
      bodyStyle={{ border: '1px solid #02abe3' }}
      className={styles.modalBody}>
      <div className={styles.modalHeader}>
        <span className={styles.modalHeaderTitle}>新建分组</span>
      </div>
      <div className={styles.modalContent} >

        <div className={styles.modalInput}>
          <label className={styles.modalLabel}>分组名称：</label>
          <Input type="text" style={{width: '60%'}} value={poiGroup.addGroupParams.name} onChange={this.onNameChange}/>
        </div>

        <div className={styles.modalInput}>
          <label className={styles.modalLabel}>分组类型：</label>
          <Select style={{width: '60%'}} value={poiGroup.addGroupParams.type} onChange={this.onGroupChange}>
            { this.renderGroupType()}
          </Select>
        </div>
        <div className={styles.modalInput}>
          <label className={styles.modalLabel}>阈值：</label>
          <InputNumber
            style={{width: '60%'}}
            max={100}
            min={0}
            value={poiGroup.addGroupParams.alarm_threshold}
            onChange={this.onThresholdChange}/>
        </div>
        <div className={styles.modalInput}>
          <label className={styles.modalLabel}>备注：</label>
          <TextArea style={{width: '60%'}} value={poiGroup.addGroupParams.memo} onChange={this.onMemoChange}/>
        </div>

        <div className={styles.modalInput}>
          <label className={styles.modalLabel} />
          <Button type="primary" style={{ marginRight: '40px'}} onClick={this.onSubmit}>新增</Button>
          <Button type="primary" ghost onClick={this.onCancel}>关闭</Button>
        </div>
      </div>
    </Modal>);
  }
}

function mapStateToProps({ bussiness }) {
  return { bussiness };
}
export default connect(mapStateToProps)(NewGroupModal);
