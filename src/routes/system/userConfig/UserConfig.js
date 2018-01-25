import React from 'react';
import { connect } from 'dva';
import { Input, Button, Icon, Row, Col, Select, Table, TreeSelect } from 'antd';
import styles from './userConfig.less';
import MayLayout from '../../../components/common/Layout/MayLayout';
import ComfirmModal from '../../../components/common/ConfirmModal/ConfirmModal';
import AddUserModal from './AddUserModal';
import Pagination from '../../../components/common/PaginationView/PaginationView';

const { Option, OptGroup } = Select;
const { TreeNode } = TreeSelect;
const { Column } = Table;
class UserConfig extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'system/getUserList'
    });
    this.props.dispatch({
      type: 'system/getAllRoles'
    });
    this.props.dispatch({
      type: 'system/getGroupTree'
    });
  }
  onSearchClick = () => {
    this.props.dispatch({
      type: 'system/getUserList'
    });
  };
  onSearchName = e => {
    const userCfg = this.props.system.userCfg;
    const { getUserParams } = userCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        userCfg: {
          ...userCfg,
          getUserParams: {
            ...getUserParams,
            pageSize: 10,
            pageNo: 1,
            name: e.target.value
          }
        }
      }
    });
  };
  onSearchOrgunit = id => {
    let value = id - 0;
    if (!value) {
      value = '';
    }
    const userCfg = this.props.system.userCfg;
    const { getUserParams } = userCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        userCfg: {
          ...userCfg,
          getUserParams: {
            ...getUserParams,
            pageSize: 10,
            pageNo: 1,
            orgunitId: value
          }
        }
      }
    });
  };
  onSelectUserChange = e => {
    const userCfg = this.props.system.userCfg;
    const { getUserParams } = userCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        userCfg: {
          ...userCfg,
          getUserParams: {
            ...getUserParams,
            pageSize: 10,
            pageNo: 1,
            roleId: e
          }
        }
      }
    });
  };
  onEditClick = record => {
    this.setState({
      action: 'editUser'
    });
    const userCfg = this.props.system.userCfg;
    const { modifyUser } = userCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        userCfg: {
          ...userCfg,
          addUserModalVisiable: true,
          modifyUser: {
            ...modifyUser,
            id: record.id,
            name: record.name,
            loginName: record.loginName,
            password: '',
            phone: record.phone,
            roleId: record.roleId,
            orgunitId: record.orgunitId,
            email: record.email,
            memo: record.memo
          }

        }
      }
    });
  };
  onOneDeleteClick = record => {
    console.log(record);
    const userCfg = this.props.system.userCfg;
    const { deleteUser } = userCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        confirmVisiable: true,
        userCfg: {
          ...userCfg,
          deleteUser: {
            type: 1,
            ids: record.id
          }
        }
      }
    });
  };
  onComfirmSubmit = () => {
    this.props.dispatch({
      type: 'system/deleteUser'
    });
  };
  onComfirmCancel = () => {
    const userCfg = this.props.system.userCfg;
    const { deleteUser } = userCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        confirmVisiable: false,
        userCfg: {
          ...userCfg,
          deleteUser: {
            ...deleteUser,
            ids: ''
          }
        }
      }
    });
  };
  tableOperation = record => (
    <div>
      <span title="编辑角色" onClick={this.onEditClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableEdit}`} />
      <span title="删除角色" onClick={this.onOneDeleteClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableDelete}`} />
    </div>
  );

  onAddModalCancel = () => {
    const userCfg = this.props.system.userCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        userCfg: {
          ...userCfg,
          addUserModalVisiable: false,
          modifyUser: {
            id: '',
            name: '',
            loginName: '',
            pwd: '',
            phone: '',
            roleId: '',
            orgunitId: '',
            email: '',
            memo: ''
          }
        }
      }
    });
  }
  onAddBtnClick = () => {
    this.setState({
      action: 'newUser'
    });
    const userCfg = this.props.system.userCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        userCfg: {
          ...userCfg,
          addUserModalVisiable: true
        }
      }
    });
  };
  onUserNameChange = value => {
    const userCfg = this.props.system.userCfg;
    const { modifyUser } = userCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        userCfg: {
          ...userCfg,
          modifyUser: {
            ...modifyUser,
            name: value
          }
        }
      }
    });
  };
  onUserLoginNameChange = value => {
    const userCfg = this.props.system.userCfg;
    const { modifyUser } = userCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        userCfg: {
          ...userCfg,
          modifyUser: {
            ...modifyUser,
            loginName: value
          }
        }
      }
    });
  };
  onUserPwdChange = value => {
    const userCfg = this.props.system.userCfg;
    const { modifyUser } = userCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        userCfg: {
          ...userCfg,
          modifyUser: {
            ...modifyUser,
            password: value
          }
        }
      }
    });
  };
  onUserPhoneChange = value => {
    const userCfg = this.props.system.userCfg;
    const { modifyUser } = userCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        userCfg: {
          ...userCfg,
          modifyUser: {
            ...modifyUser,
            phone: value
          }
        }
      }
    });
  };
  onUserRoleIdChange = value => {
    const userCfg = this.props.system.userCfg;
    const { modifyUser } = userCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        userCfg: {
          ...userCfg,
          modifyUser: {
            ...modifyUser,
            roleId: value
          }
        }
      }
    });
  };
  onUserOrgunitIdChange = value => {
    const userCfg = this.props.system.userCfg;
    const { modifyUser } = userCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        userCfg: {
          ...userCfg,
          modifyUser: {
            ...modifyUser,
            orgunitId: value - 0
          }
        }
      }
    });
  };
  onUserEmailChange = value => {
    const userCfg = this.props.system.userCfg;
    const { modifyUser } = userCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        userCfg: {
          ...userCfg,
          modifyUser: {
            ...modifyUser,
            email: value
          }
        }
      }
    });
  };
  onUserMemoChange = value => {
    const userCfg = this.props.system.userCfg;
    const { modifyUser } = userCfg;
    this.props.dispatch({
      type: 'system/success',
      payload: {
        userCfg: {
          ...userCfg,
          modifyUser: {
            ...modifyUser,
            memo: value
          }
        }
      }
    });
  };
  onAddSubmit = () => {
    switch (this.state.action) {
      case 'newUser':
        this.props.dispatch({
          type: 'system/addUser'
        });
        break;
      case 'editUser':
        this.props.dispatch({
          type: 'system/modifyUser'
        });
        break;
      default:
        break;
    }
  };
  // renderOrgunitTreeNode = () => {
  //   let op = '';
  //   if (this.props.system.groupCfg && this.props.system.groupList.groupTree) {
  //     if (this.props.system.groupList.groupTree.length > 0) {
  //       op = this.props.system.groupList.groupTree.map(value => (
  //         <TreeNode value={value.id} key={value.id} title={value.title}>
  //           value
  //         </TreeNode>
  //               ));
  //     }
  //   }
  //
  //   return op;
  // };
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
  renderAddSelectOptions = () => {
    const op = '';
    if (this.props.system.roleCfg && this.props.system.roleCfg.roleList) {
      if (this.props.system.roleCfg.roleList.length > 0) {
        return this.props.system.roleCfg.roleList;
      }
    }

    return [];
  };

  pageTranslate = value => {
    console.log(value);
    this.props.dispatch({
      type: 'system/roleUserTranslate',
      payload: {
        pageNo: value.pageNo,
        pageSize: value.pageSize
      }
    });
  };
  deleteSelectUserBtn = () => {
    this.props.dispatch({
      type: 'system/success',
      payload: {
        confirmVisiable: true
      }
    });
  };

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        const userCfg = this.props.system.userCfg;
        const { deleteUser } = userCfg;
        const type = selectedRowKeys.length > 1 ? 0 : 1;
        this.props.dispatch({
          type: 'system/success',
          payload: {
            userCfg: {
              ...userCfg,
              deleteUser: {
                type,
                ids: selectedRowKeys.toString()
              }
            }
          }
        });
      }
      // onSelect: (record, selected, selectedRows) => {
      //   console.log('onSelect')
      //   console.log(selectedRows)
      // },
      // onSelectAll: (selected, selectedRows, changeRows) => {
      //   console.log('onSelectAll')
      //   console.log(selectedRows)
      // }
    };

    return (
      <MayLayout location={this.props.location}>
        <Row className={styles.searchGroup}>
          <Col span={4} className={styles.condition}>
            <span className={styles.label}>用户名/姓名</span>
            <Input onChange={this.onSearchName} style={{width: 150}}/>
          </Col>
          <Col span={5} className={styles.condition}>
            <span className={styles.label}>所属组织</span>
            <TreeSelect
              allowClear
              treeData={this.props.system.groupCfg && this.props.system.groupCfg.groupTree ?
                      this.props.system.groupCfg.groupTree : []}
              className={styles.input}
              onChange={this.onSearchOrgunit}
              treeDefaultExpandAll
              placeholder="请选择组织"
            />

          </Col>
          <Col span={5} className={styles.condition}>
            <span className={styles.label}>所属角色</span>
            <Select
              style={{
                width: '200px'
              }}
              placeholder="请选择角色"
              onChange={this.onSelectUserChange}
            >
              <Option value="">全部</Option>
              {this.renderSelectOptions()}
            </Select>
          </Col>
          <Button type="primary" onClick={this.onSearchClick}>查询</Button>
        </Row>
        <div className={styles.btnGroup}>
          {/* table有全选按钮,可取消此全选按钮*/}
          {/* <a className={styles.checkAll}>*/}
          {/* <i className={styles.checkIcon}></i>*/}
          {/* <span>全选</span>*/}
          {/* </a>*/}
          <a className={styles.delete} onClick={this.deleteSelectUserBtn}>
            <i className={styles.deleteIcon} />
            <span>删除选中用户</span>
          </a>
          {/* <a className={styles.delete}>*/}
          {/* <i className={styles.deleteIcon} />*/}
          {/* <span>删除全部用户</span>*/}
          {/* </a>*/}
          <Button style={{float: 'right', width: '125px'}} type="primary" onClick={this.onAddBtnClick}>
            <i className={styles.addIcon} />
            <span>新建目标</span>
          </Button>
        </div>
        <div className={styles.list}>
          <Table
            dataSource={this.props.system.userCfg && this.props.system.userCfg.userTableList ?
              this.props.system.userCfg.userTableList : []}
            pagination={false}
            bordered
            rowKey={record => record.id}
            rowSelection={rowSelection}
          >
            <Column
              title="用户名"
              dataIndex="loginName"
              key="loginName"/>
            <Column
              title="姓名"
              dataIndex="name"
              key="name"/>
            <Column
              title="手机号"
              dataIndex="phone"
              key="phone"/>
            <Column
              title="电子邮箱"
              dataIndex="email"
              key="email"/>
            <Column
              title="所属角色"
              dataIndex="roleName"
              key="roleName"/>
            <Column
              title="所属组织"
              dataIndex="orgunitName"
              key="orgunitName"/>
            <Column
              title="备注"
              dataIndex="memo"
              key="memo"/>
            <Column
              title="操作"
              render={this.tableOperation}
            />
          </Table>
          <Pagination
            className={styles.pagination}
            page={this.props.system.userCfg.userListPage}
            pageTranslate={this.pageTranslate ? this.pageTranslate : null}
          />
        </div>

        <AddUserModal
          visiable={this.props.system.userCfg.addUserModalVisiable}
          dataSource={this.props.system.userCfg.modifyUser}
          groupTree={this.props.system.groupCfg && this.props.system.groupCfg.groupTree ?
                  this.props.system.groupCfg.groupTree : []}
          onAddModalCancel={this.onAddModalCancel}
          userNameChange={this.onUserNameChange}
          userLoginNameChange={this.onUserLoginNameChange}
          userPwdChange={this.onUserPwdChange}
          userPhoneChange={this.onUserPhoneChange}
          userRoleIdChange={this.onUserRoleIdChange}
          userOrgunitIdChange={this.onUserOrgunitIdChange}
          userEmailChange={this.onUserEmailChange}
          userMemoChange={this.onUserMemoChange}
          renderSelectOptions={this.renderAddSelectOptions()}
          onSubmit={this.onAddSubmit}
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

export default connect(mapStateToProps)(UserConfig);
