/**
 * Created by Jason on 2018/1/24.
 */
/**
 * Created by Jason on 2018/1/16.
 */
import React from 'react';
import { connect } from 'dva';
import { Button, Table, Input } from 'antd';

import styles from './Target.less';

const { Column } = Table;

class TargetGroup extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
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
              placeholder="请选择角色"
                            />

          </label>
          <label className={styles.selectInput}>
            <span className={styles.label}>分组类型：</span>
            <Input
              style={{
                width: '10%',
                marginRight: '5px'
              }}
              placeholder="请选择角色"
                            />

          </label>
          <Button type="primary" style={{ marginLeft: '45px' }}>查询</Button>
        </div>
        <div className={styles.btnBar}>
          <a className={styles.delete} onClick={this.deleteSelectUserBtn}>
            <i className={styles.deleteIcon} />
            <span>删除选中用户</span>
          </a>
          <Button style={{float: 'right', width: '125px'}} type="primary" onClick={this.onAddBtnClick}>
            <i className={styles.addIcon} />
            <span>新建目标</span>
          </Button>
        </div>
        <Table bordered>
          <Column
            title="用户名"
            dataIndex="loginName"
            key="loginName"
                        />
          <Column
            title="name"
            dataIndex="Name"
            key="login"
                        />
          <Column
            title="ming"
            dataIndex="login"
            key="login"
                        />
        </Table>
      </div>
    );
  }
}

function mapStateToProps({ bussiness }) {
  return { bussiness };
}

export default connect(mapStateToProps)(TargetGroup);
