/**
 * Created by Jason on 2018/1/24.
 */
/**
 * Created by Jason on 2018/1/16.
 */
import React from 'react';
import { connect } from 'dva';
import { Button, Table, Input, Select, InputNumber } from 'antd';

import styles from './Target.less';

const { Column } = Table;
const Option = Select.Option;

class TargetPerson extends React.Component {

  render() {
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
                  />

          </label>
          <label className={styles.selectInput}>
            <span className={styles.label}>身份证号：</span>
            <Input
              style={{
                width: '10%',
                marginRight: '5px'
              }}
                  />

          </label>
          <label className={styles.selectInput}>
            <span className={styles.label}>性别：</span>
            <Select
              style={{
                width: '5%',
                marginRight: '5px'
              }}
              defaultValue=""
            >
                <Option value="">全部</Option>
                <Option value="0">男</Option>
                <Option value="1">女</Option>
            </Select>

          </label>
          <label className={styles.selectInput}>
            <span className={styles.label}>所属组织：</span>
            <Input
              style={{
                width: '10%',
                marginRight: '5px'
              }}
                  />

          </label>
          <label className={styles.selectInput}>
            <span className={styles.label}>所属分组：</span>
            <Input
              style={{
                width: '6%',
                marginRight: '5px'
              }}
                  />

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

export default connect(mapStateToProps)(TargetPerson);
