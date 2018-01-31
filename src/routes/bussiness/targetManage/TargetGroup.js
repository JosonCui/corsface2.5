/**
 * Created by Jason on 2018/1/24.
 */
/**
 * Created by Jason on 2018/1/16.
 */
import React from 'react';
import { connect } from 'dva';
import { Button, Table, Input, Select } from 'antd';

import {GROUP_TYPE, POI_GROUP_PAGE_SIZE} from '../../../utils/config';
import Pagination from '../../../components/common/PaginationView/PaginationView';
import ComfirmModal from '../../../components/common/ConfirmModal/ConfirmModal';
import styles from './Target.less';
import NewGroupModal from './NewGroupModal';

const { Column } = Table;
const Option = Select.Option;

class TargetGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: ''
    };
  }
  onGroupChange = value => {
    const poiGroup = this.props.bussiness.poiGroup;
    const { getGroupsListParams } = poiGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiGroup: {
          ...poiGroup,
          getGroupsListParams: {
            ...getGroupsListParams,
            type: value
          }
        }
      }
    });
  };
  onSearchBtnClick = () => {
    const poiGroup = this.props.bussiness.poiGroup;
    const { getGroupsListParams } = poiGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiGroup: {
          ...poiGroup,
          getGroupsListParams: {
            ...getGroupsListParams,
            pageNo: 1,
            pageSize: POI_GROUP_PAGE_SIZE
          }
        }
      }
    });
    this.props.dispatch({
      type: 'bussiness/getGroupsList'
    });
  };
  onGroupNameChange = e => {
    const poiGroup = this.props.bussiness.poiGroup;
    const { getGroupsListParams } = poiGroup;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiGroup: {
          ...poiGroup,
          getGroupsListParams: {
            ...getGroupsListParams,
            name: e.target.value
          }
        }
      }
    });
  };
  onAddBtnClick = () => {
    const poiGroup = this.props.bussiness.poiGroup;
    this.setState({
      action: 'new'
    });
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiGroup: {
          ...poiGroup,
          addGroupModalVisiable: true
        }
      }
    });
  };
  onEditClick = record => {
    const poiGroup = this.props.bussiness.poiGroup;
    const { addGroupParams } = poiGroup;
    this.setState({
      action: 'edit'
    });
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiGroup: {
          ...poiGroup,
          addGroupParams: {
            ...addGroupParams,
            id: record.id,
            name: record.name,
            type: record.groupType,
            memo: record.memo,
            alarm_threshold: record.alarm_threshold
          },
          addGroupModalVisiable: true
        }
      }
    });
  };
  onDeleteClick = record => {
    const poiGroup = this.props.bussiness.poiGroup;
    this.setState({
      action: 'delete'
    });
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiGroup: {
          ...poiGroup,
          deleteGroup: {
            groupId: record.id
          }
        },
        confirmVisiable: true
      }
    });
  };
  onConfirmSubmit = () => {
    switch (this.state.action) {
      case 'delete':
        this.props.dispatch({
          type: 'bussiness/deleteGroup'
        });
        break;
    }
  };
  onConfirmCancel = () => {
    const poiGroup = this.props.bussiness.poiGroup;
        // TODO
        // 关闭confirm
    switch (this.state.action) {
      case 'delete':
        this.props.dispatch({
          type: 'bussiness/success',
          payload: {
            poiGroup: {
              ...poiGroup,
              deleteGroup: {
                groupId: ''
              }
            },
            confirmVisiable: false
          }
        });
        break;
    }
  };
  onDeleteSelectGroupBtn = () => {
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
  pageTranslate = value => {
    this.props.dispatch({
      type: 'bussiness/poiGroupPageTranslate',
      payload: {
        pageNo: value.pageNo,
        pageSize: value.pageSize
      }
    });
  };
  renderGroupType = () => (GROUP_TYPE.map((value, index) =>
            (<Option value={index} key={index}>{value}</Option>)));
  renderTableGroupType = record => (<span>{GROUP_TYPE[record.groupType]}</span>);
  renderTableOperate = record => (
    <div>
      <span title="编辑分组" onClick={this.onEditClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableEdit}`} />
      <span title="删除分组" onClick={this.onDeleteClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableDelete}`} />
    </div>
    );


  render() {
    const poiGroup = this.props.bussiness.poiGroup;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        const poiGroup = this.props.bussiness.poiGroup;
        this.props.dispatch({
          type: 'bussiness/success',
          payload: {
            poiGroup: {
              ...poiGroup,
              deleteGroup: {
                groupId: selectedRowKeys.toString()
              }
            }
          }
        });
      }
    };
    return (
      <div className={styles.content}>
        <div className={styles.searchBar}>
          <label className={styles.selectInput}>
            <span className={styles.label}>分组名称：</span>
            <Input
              style={{
                width: '6%',
                marginRight: '5px'
              }}
              onChange={this.onGroupNameChange}
                            />

          </label>
          <label className={styles.selectInput}>
            <span className={styles.label}>分组类型：</span>
            <Select
              style={{width: '10%'}}
              value={poiGroup.getGroupsListParams.type}
              onChange={this.onGroupChange}>
              <Option value="">全部</Option>
              { this.renderGroupType()}
            </Select>
          </label>
          <Button type="primary" style={{ marginLeft: '45px' }} onClick={this.onSearchBtnClick}>查询</Button>
        </div>
        <div className={styles.btnBar}>
          <a className={styles.delete} onClick={this.onDeleteSelectGroupBtn}>
            <i className={styles.deleteIcon} />
            <span>删除选中用户</span>
          </a>
          <Button style={{float: 'right', width: '125px'}} type="primary" onClick={this.onAddBtnClick}>
            <i className={styles.addIcon} />
            <span>新建目标</span>
          </Button>
        </div>
        <Table
          dataSource={poiGroup.poiGroupList}
          bordered
          pagination={false}
          rowKey={record => record.id}
          rowSelection={rowSelection}
        >
          <Column
            title="序号"
            dataIndex="id"
            key="id"
                        />
          <Column
            title="分组名称"
            dataIndex="name"
            key="name"
                        />
          <Column
            title="分组类型"
            render={record => this.renderTableGroupType(record)}
                        />
          <Column
            title="人员数量"
            dataIndex="poiCount"
            key="poiCount"
                        />
          <Column
            title="阈值"
            dataIndex="alarm_threshold"
            key="alarm_threshold"
                        />
          <Column
            title="备注"
            dataIndex="memo"
            key="memo"
                        />
          <Column
            title="操作"
            render={record => this.renderTableOperate(record)}
                        />
        </Table>
        <Pagination
          className={styles.pagination}
          page={this.props.bussiness.poiGroup.poiGroupPage}
          pageTranslate={this.pageTranslate ? this.pageTranslate : null}
          />
        <NewGroupModal action={this.state.action}/>
        <ComfirmModal
          visiable={this.props.bussiness.confirmVisiable}
          onSubmit={this.onConfirmSubmit}
          onCancel={this.onConfirmCancel}
          />
      </div>
    );
  }
}

function mapStateToProps({ bussiness }) {
  return { bussiness };
}

export default connect(mapStateToProps)(TargetGroup);
