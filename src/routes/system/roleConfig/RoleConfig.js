/**
 * Created by Ethan on 2018/1/10.
 */
import React from 'react';
import { connect } from 'dva';
import { Select, Button, Table } from 'antd';

import {ROLE_CONFIG_PAGE_SIZE} from '../../../utils/config';
import MayLayout from '../../../components/common/Layout/MayLayout';
import ComfirmModal from '../../../components/common/ConfirmModal/ConfirmModal';
import Pagination from '../../../components/common/PaginationView/PaginationView';
import AddRoleModal from './AddRoleModal';
import styles from './roleConfig.less';

const Option = Select.Option;
const { Column } = Table;

class RoleConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: ''
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'system/getRoleList'
    });
  }
  onSearchClick = () => {
    this.props.dispatch({
      type: 'system/getRoleList'
    });
  };
  onSelectRoleChange = value => {
    const roleCfg = this.props.system.roleCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        roleCfg: {
          ...roleCfg,
          getRoleParams: {
            pageSize: ROLE_CONFIG_PAGE_SIZE,
            pageNo: 1,
            roleId: value
          }
        }
      }
    });
  };
  onAddBtnClick = () => {
    this.setState({
      action: 'newRole'
    });
    const roleCfg = this.props.system.roleCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        roleCfg: {
          ...roleCfg,
          addRoleModalVisiable: true
        }
      }
    });
  };
  onAddModalCancel = () => {
    const roleCfg = this.props.system.roleCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        roleCfg: {
          ...roleCfg,
          addRoleModalVisiable: false,
          modifyRole: {
            id: '',
            name: '',
            memo: ''
          }
        }
      }
    });
  };
  onRoleNameChange = val => {
    const roleCfg = this.props.system.roleCfg;
    const { modifyRole } = roleCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        roleCfg: {
          ...roleCfg,
          modifyRole: {
            ...modifyRole,
            name: val
          }
        }
      }
    });
  };
  onRoleModuleIdChange = val => {
    const roleCfg = this.props.system.roleCfg;
    const { modifyRole } = roleCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        roleCfg: {
          ...roleCfg,
          modifyRole: {
            ...modifyRole,
            moduleId: val
          }
        }
      }
    });
  };

  onRoleMemoChange = val => {
    const roleCfg = this.props.system.roleCfg;
    const { modifyRole } = roleCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        roleCfg: {
          ...roleCfg,
          modifyRole: {
            ...modifyRole,
            memo: val
          }
        }
      }
    });
  };
  onAddRoleSubmit = () => {
    switch (this.state.action) {
      case 'newRole':
        this.props.dispatch({
          type: 'system/addRole'
        });
        break;
      case 'editRole':
        this.props.dispatch({
          type: 'system/modifyRole'
        });
        break;
      default:
        break;
    }
  };
  onCheckClick = record => {
    console.log(record.roleId);
  };
  onEditClick = record => {
    this.setState({
      action: 'editRole'
    });
    const roleCfg = this.props.system.roleCfg;
    const { modifyRole } = roleCfg;
    console.log(record.roleId);
    this.props.dispatch({
      type: 'system/success',
      payload: {
        roleCfg: {
          ...roleCfg,
          addRoleModalVisiable: true,
          modifyRole: {
            ...modifyRole,
            id: record.roleId,
            name: record.roleName,
            memo: record.memo,
            moduleId: record.initModuleId
          }

        }
      }

    });
  };
  onDeleteClick = record => {
    const roleCfg = this.props.system.roleCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        confirmVisiable: true,
        roleCfg: {
          ...roleCfg,
          deleteRole: {
            id: record.roleId
          }
        }
      }
    });
  };

  onComfirmSubmit = () => {
    this.props.dispatch({
      type: 'system/deleteRole'
    });
  };
  onComfirmCancel = () => {
    const roleCfg = this.props.system.roleCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        confirmVisiable: false,
        roleCfg: {
          ...roleCfg,
          deleteRole: {
            id: ''
          }
        }
      }
    });
  };

  pageTranslate = value => {
    this.props.dispatch({
      type: 'system/rolePageTranslate',
      payload: {
        pageNo: value.pageNo,
        pageSize: value.pageSize
      }
    });
  };
  tableOperation = record => (
    <div>
      <span title="查看角色" onClick={this.onCheckClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableCheck}`} />
      <span title="编辑角色" onClick={this.onEditClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableEdit}`} />
      <span title="删除角色" onClick={this.onDeleteClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableDelete}`} />
    </div>
    );
  renderSelectOptions = () => {
    let op = '';
    if (this.props.system.roleCfg && this.props.system.roleCfg.roleList) {
      if (this.props.system.roleCfg.roleList.length > 0) {
        op = this.props.system.roleCfg.roleList.map(value => (
          <Option value={value.id} key={value.id}>{value.name}</Option>
                ));
      }
    }
    return op;
  };

  render() {
    return (
      <MayLayout location={this.props.location}>
        <div className={styles.content}>
          <div className={styles.searchBar}>
            <label className={styles.selectInput}>
              <span className={styles.label}>选择角色：</span>
              <Select
                style={{
                  width: '10%',
                  marginRight: '45px'
                }}
                placeholder="请选择角色"
                onChange={this.onSelectRoleChange}
                                >
                <Option value="">全部</Option>
                {this.renderSelectOptions()}
              </Select>
            </label>
            <Button type="primary" onClick={this.onSearchClick}>查询</Button>
          </div>
          <div className={`${styles.newRoleWapper} ${styles.clearfix}`}>
            <Button type="primary" className={styles.newRoleBtn} onClick={this.onAddBtnClick}><i className={styles.addIcon} />新增角色</Button>
          </div>
          <div>
            <Table
              dataSource={this.props.system.roleCfg && this.props.system.roleCfg.roleTableList ?
                      this.props.system.roleCfg.roleTableList : []}
              pagination={false}
              bordered
              rowKey={record => record.roleId}
            >
              <Column
                title="角色名称"
                dataIndex="roleName"
                key="roleName"/>
              {/* <Column*/}
              {/* title=""*/}
              {/* dataIndex="userCount"*/}
              {/* key="userCount"/>*/}
              <Column
                title="用户数"
                dataIndex="userCount"
                key="userCount"/>
              <Column
                title="备注"
                dataIndex="memo"
                key="memo"/>
              <Column
                title="操作"
                render={this.tableOperation}
                />
            </Table>
          </div>
          <Pagination
            className={styles.pagination}
            page={this.props.system.roleCfg.roleListPage}
            pageTranslate={this.pageTranslate ? this.pageTranslate : null}/>

        </div>
        <AddRoleModal
          visiable={this.props.system.roleCfg.addRoleModalVisiable}
          onAddModalCancel={this.onAddModalCancel}
          dataSource={this.props.system.roleCfg.modifyRole}
          roleNameChange={this.onRoleNameChange}
          roleMemoChange={this.onRoleMemoChange}
          moduleIdChange={this.onRoleModuleIdChange}
          subModules={this.props.system.roleCfg.subModules}
          onSubmit={this.onAddRoleSubmit}
        />
        <ComfirmModal
          visiable={this.props.system.confirmVisiable}
          onSubmit={this.onComfirmSubmit}
          onCancel={this.onComfirmCancel}
          />
      </MayLayout>
    );
  }
}

function mapStateToProps({ system }) {
  return { system };
}

export default connect(mapStateToProps)(RoleConfig);

