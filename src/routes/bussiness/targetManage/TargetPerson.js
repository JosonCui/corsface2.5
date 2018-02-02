/**
 * Created by Jason on 2018/1/24.
 */
/**
 * Created by Jason on 2018/1/16.
 */
import React from 'react';
import { connect } from 'dva';
import { Button, Table, Input, Select, InputNumber, Tooltip, TreeSelect } from 'antd';

import {POI_PERSON_PAGE_SIZE} from '../../../utils/config';
import Pagination from '../../../components/common/PaginationView/PaginationView';
import ComfirmModal from '../../../components/common/ConfirmModal/ConfirmModal';
import NewPersonModal from './NewPersonModal';
import styles from './Target.less';

const { Column } = Table;
const Option = Select.Option;

class TargetPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: ''
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'bussiness/getPoiList'
    });
    this.props.dispatch({
      type: 'bussiness/getAllGroups'
    });
    this.props.dispatch({
      type: 'bussiness/getGroupTree'
    });
  }
  onNameChange = e => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { getPoiListParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          getPoiListParams: {
            ...getPoiListParams,
            name: e.target.value
          }

        }
      }
    });
  };
  onIdCardChange = e => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { getPoiListParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          getPoiListParams: {
            ...getPoiListParams,
            identityCard: e.target.value
          }

        }
      }
    });
  };
  onSexChange = value => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { getPoiListParams } = poiPerson;
    if (value !== '') {
      value -= 0;
    }
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          getPoiListParams: {
            ...getPoiListParams,
            gender: value
          }

        }
      }
    });
  };
  onOrgunitsChange = id => {
    console.log('nameChange');
    let value = id - 0;
    if (!value) {
      value = '';
    }
    const poiPerson = this.props.bussiness.poiPerson;
    const { getPoiListParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          getPoiListParams: {
            ...getPoiListParams,
            orgunitId: value
          }
        }
      }
    });
  };
  onGroupChange = value => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { getPoiListParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          getPoiListParams: {
            ...getPoiListParams,
            groupId: value
          }

        }
      }
    });
  };
  onalarmThresholdChange = value => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { getPoiListParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          getPoiListParams: {
            ...getPoiListParams,
            threshold: value
          }

        }
      }
    });
  };
  onSearchBtnClick = () => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { getPoiListParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          getPoiListParams: {
            ...getPoiListParams,
            pageNo: 1,
            pageSize: POI_PERSON_PAGE_SIZE
          }
        }
      }
    });
    this.props.dispatch({
      type: 'bussiness/getPoiList'
    });
  };
  onDeleteSelectPersonBtn = () => {
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        confirmVisiable: true
      }
    });
    this.setState({
      action: 'delete'
    });
  };
  onAddBtnClick = () => {
    const poiPerson = this.props.bussiness.poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          addPoiModalVisiable: true
        }
      }
    });
    this.setState({
      action: 'new'
    });
  };
  onCheckClick = record => {
    console.log(record.roleId);
  };
  onEditClick = record => {
    console.log('edit');
    const poiPerson = this.props.bussiness.poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          addPoiParams: {
            personId: record.personId,
            faceCount: 1,
            originCount: 0,
            img_path_1: record.uploadFiles[0],
            originImg_path_1: '',
            name: record.name,
            gender: record.gender === '男' ? '1' : '0',
            threshold: record.alarmThreshold,
            groupId: record.groups ? record.groups[0].id : '',
            orgunitId: record.orgunitList ? record.orgunitList[0].id : '',
            identityCard: record.identityCard,
            impTag: record.impTag,
            memo: record.memo
          },
          addPoiModalVisiable: true,
          imageUrl: record.uploadImgs[0]
        }
      }
    });
    this.setState({
      action: 'edit'
    });
  };
  onDeleteClick = record => {
    const poiPerson = this.props.bussiness.poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        confirmVisiable: true,
        poiPerson: {
          ...poiPerson,
          deletePerson: {
            type: 0,
            personIds: record.personId
          }
        }
      }
    });
    this.setState({
      action: 'delete'
    });
  };
  onConfirmSubmit = () => {
    switch (this.state.action) {
      case 'delete':
        this.props.dispatch({
          type: 'bussiness/deletePoi'
        });
        break;
    }
  };
  onConfirmCancel = () => {
    const poiPerson = this.props.bussiness.poiPerson;
     // TODO
        // 关闭confirm
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          deletePerson: {
            type: 0,
            personIds: ''
          }
        },
        confirmVisiable: false
      }
    });
  };
  renderGroups = () => (this.props.bussiness.poiGroup.allGroups.map(value =>
          (<option value={value.id} key={value.id}>{value.name}</option>)));

  renderTableImg = record => (<div className={styles.tableImgBorder}>
    <img
      style={{width: '100%', height: '100%'}}
      src={record.uploadImgs && record.uploadImgs.length > 0 ? record.uploadImgs[0] : ''} alt=""/>
  </div>);
  renderTableOrgunits = record => {
    const Orgunits = [];
    if (record.orgunitList && record.orgunitList.length > 0) {
      record.orgunitList.map(value => Orgunits.push(value.name));
    }
    return (<Tooltip key={record.id} overlayStyle={{backGroundColor: 'rgba(0,0,0,0.9)'}} title={Orgunits.join(',')}>
      {Orgunits.map(value => <span key={value}>{ value }</span>)}
    </Tooltip >);
  };
  renderTableGroups = record => {
    const groups = [];
    if (record.groups && record.groups.length > 0) {
      record.groups.map(value => groups.push(value.name));
    }
    return (<Tooltip key={record.id} overlayStyle={{backGroundColor: 'rgba(0,0,0,0.9)'}} title={groups.join(',')}>
      {groups.map(value => <span key={value}>{ value }</span>)}
    </Tooltip >);
  };
  renderTableOperate = record => (
    <div>
      <span title="编辑目标" onClick={this.onEditClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableEdit}`} />
      <span title="删除目标" onClick={this.onDeleteClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableDelete}`} />
    </div>
  );

  pageTranslate = value => {
    this.props.dispatch({
      type: 'bussiness/poiPersonPageTranslate',
      payload: {
        pageNo: value.pageNo,
        pageSize: value.pageSize
      }
    });
  };
  render() {
    const { getPoiListParams } = this.props.bussiness.poiPerson;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        const poiPerson = this.props.bussiness.poiPerson;
        const type = 0;// TODO
        this.props.dispatch({
          type: 'bussiness/success',
          payload: {
            poiPerson: {
              ...poiPerson,
              deletePerson: {
                type,
                personIds: selectedRowKeys.toString()
              }
            }
          }
        });
      }
    };
    return (
      <div className={styles.content}>
        <div className={styles.searchBar} >
          <label className={styles.selectInput}>
            <span className={styles.label}>姓名：</span>
            <Input
              style={{
                width: '6%',
                marginRight: '5px'
              }}
              value={getPoiListParams.name}
              onChange={this.onNameChange}
                  />

          </label>
          <label className={styles.selectInput}>
            <span className={styles.label}>身份证号：</span>
            <Input
              style={{
                width: '10%',
                marginRight: '5px'
              }}
              value={getPoiListParams.identityCard}
              onChange={this.onIdCardChange}
                  />

          </label>
          <label className={styles.selectInput}>
            <span className={styles.label}>性别：</span>
            <Select
              style={{
                width: '5%',
                marginRight: '5px'
              }}
              value={`${getPoiListParams.gender}`}
              onChange={this.onSexChange}
            >
              <Option value="">全部</Option>
              <Option value="1">男</Option>
              <Option value="0">女</Option>
            </Select>

          </label>
          <label className={styles.selectInput}>
            <span className={styles.label}>所属组织：</span>
            <TreeSelect
              style={{
                width: '10%',
                marginRight: '5px'
              }}
              allowClear
              treeData={this.props.bussiness && this.props.bussiness.groupTree ?
                            this.props.bussiness.groupTree : []}
              onChange={this.onOrgunitsChange}
              treeDefaultExpandAll
              placeholder="请选择组织"
            />

          </label>
          <label className={styles.selectInput}>
            <span className={styles.label}>所属分组：</span>
            <Select
              style={{
                width: '6%',
                marginRight: '5px'
              }}
              value={getPoiListParams.groupId}
              onChange={this.onGroupChange}
            >
              <option value="">全部</option>
              { this.props.bussiness.poiGroup.allGroups.length > 0 ? this.renderGroups() : null}
            </Select>

          </label>
          <label className={styles.selectInput}>
            <span className={styles.label}>阈值：</span>
            <InputNumber
              min={0}
              max={100}
              style={{
                width: '4%',
                marginRight: '5px'
              }}
              value={getPoiListParams.threshold}
              onChange={this.onalarmThresholdChange}
                  />

          </label>
          <Button type="primary" style={{ marginLeft: '45px' }} onClick={this.onSearchBtnClick}>查询</Button>
        </div>
        <div className={styles.btnBar}>
          <a className={styles.delete} onClick={this.onDeleteSelectPersonBtn}>
            <i className={styles.deleteIcon} />
            <span>删除选中目标</span>
          </a>
          <Button style={{float: 'right', width: '125px'}} type="primary" onClick={this.onAddBtnClick}>
            <i className={styles.addIcon} />
            <span>新建目标</span>
          </Button>
        </div>
        <Table
          dataSource={this.props.bussiness.poiPerson.poiPersonList}
          bordered
          pagination={false}
          rowKey={record => record.personId}
          rowSelection={rowSelection}
        >
          <Column
            title="序号"
            dataIndex="id"
            key="id"
              />
          <Column
            title="照片"
            render={record => this.renderTableImg(record)}
              />
          <Column
            title="姓名"
            dataIndex="name"
            key="name"
              />
          <Column
            title="身份证号"
            dataIndex="identityCard"
            key="identityCard"
              />
          <Column
            title="性别"
            dataIndex="gender"
            key="gender"
              />
          <Column
            title="户籍"
            dataIndex="household_register"
            key="household_register"
              />
          <Column
            title="所属组织"
            render={record => this.renderTableOrgunits(record)}
              />
          <Column
            title="所属分组"
            render={record => this.renderTableGroups(record)}
              />
          <Column
            title="阈值"
            dataIndex="alarmThreshold"
            key="alarmThreshold"
              />
          <Column
            title="操作"
            render={record => this.renderTableOperate(record)}
              />
        </Table>
        <Pagination
          className={styles.pagination}
          page={this.props.bussiness.poiPerson.poiPersonPage}
          pageTranslate={this.pageTranslate ? this.pageTranslate : null}
        />
        <ComfirmModal
          visiable={this.props.bussiness.confirmVisiable}
          onSubmit={this.onConfirmSubmit}
          onCancel={this.onConfirmCancel}
        />
        <NewPersonModal action={this.state.action}/>
      </div>
    );
  }
}

function mapStateToProps({ bussiness }) {
  return { bussiness };
}

export default connect(mapStateToProps)(TargetPerson);
