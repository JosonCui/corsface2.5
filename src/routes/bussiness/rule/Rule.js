import React from 'react';
import { connect } from 'dva';
import { Input, Button, Icon, Row, Col, Select, Table } from 'antd';
import styles from './Rule.less';
import MayLayout from '../../../components/common/Layout/MayLayout';
import AddRuleModule from './AddRuleModule';
import ComfirmModal from '../../../components/common/ConfirmModal/ConfirmModal';
import Pagination from '../../../components/common/PaginationView/PaginationView';


const { Option, OptGroup } = Select;
const { Column } = Table;
class Rule extends React.Component {
  onAddBtnClick = () => {
    this.setState({
      action: 'newRule'
    });
    const rule = this.props.bussiness.rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          addRuleModule: true
        }
      }
    });
  }
  onAddModalCancel = () => {
    const rule = this.props.bussiness.rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          addRuleModule: false
        }
      }
    });
  }
  onAddSubmit = () => {
    switch (this.state.action) {
      case 'newRule':
        this.props.dispatch({
          // type: 'system/addUser'
        });
        break;
      case 'editRule':
        this.props.dispatch({
          // type: 'system/modifyUser'
        });
        break;
      default:
        break;
    }
  }
  tableOperation = record => (
    <div>
      <span title="编辑角色" className={`${styles.tableBtn} ${styles.tableEdit}`} />
      <span title="删除角色" className={`${styles.tableBtn} ${styles.tableDelete}`} />
    </div>
  );
  render() {
    return (
      <MayLayout location={this.props.location}>
        <div className={styles.title}>
          <div className={styles.line}>默认规则: 本寺的摄像头</div>
          <Row className={styles.searchGroup}>
            <Col span={6} className={styles.condition}>
              <span className={styles.label}>摄像头/目标所属组织</span>
              <Input
                className={styles.input}
                style={{width: 200, marginTop: '20px'}}
                placeholder="输入组织名称或关键字"
                // onChange={this.onSearchOrgunit}
                addonAfter={<Icon type="folder-add" />}
              />
            </Col>
            <Col span={3} className={styles.condition}>
              <span className={styles.label}>姓名</span>
              <Input
                // onChange={this.onSearchName}
                style={{width: 130}}/>
            </Col>
            <Col span={4} className={styles.condition}>
              <span className={styles.label}>身份证号</span>
              <Input
                // onChange={this.onSearchName}
                style={{width: 180}}/>
            </Col>
            <Col span={5} className={styles.condition}>
              <span className={styles.label}>目标所属分组</span>
              <Select
                style={{
                  width: '180px'
                }}
                // onChange={this.onSelectUserChange}
              >
                <Option value="">全部</Option>
                {/*{this.renderSelectOptions()}*/}
              </Select>
            </Col>
            <Col span={3} className={styles.condition}>
              <span className={styles.label}>处理方式</span>
              <Select
                style={{
                  width: '100px'
                }}
                // onChange={this.onSelectUserChange}
              >
                <Option value="">全部</Option>
                {/*{this.renderSelectOptions()}*/}
              </Select>
            </Col>


            <Button type="primary"
              // onClick={this.onSearchClick}
            >查询</Button>
          </Row>
          <div className={styles.btnGroup}>
            <Button style={{width: '125px'}} className={styles.delete} type="primary"
                    onClick={this.onAddBtnClick}
            >
              <i className={styles.addIcon} />
              <span>新建规则</span>
            </Button>
          </div>
          <div className={styles.list}>
            <Table
              // dataSource={this.props.system.userCfg && this.props.system.userCfg.userTableList ?
              //   this.props.system.userCfg.userTableList : []}
              pagination={false}
              bordered
              rowKey={record => record.id}
            >
              <Column
                title="序号"
                dataIndex="loginName"
                key="loginName"/>
              <Column
                title="摄像头所属组织"
                dataIndex="name"
                key="name"/>
              <Column
                title="目标人姓名"
                dataIndex="phone"
                key="phone"/>
              <Column
                title="目标人身份证号"
                dataIndex="email"
                key="email"/>
              <Column
                title="目标所属组织"
                dataIndex="roleName"
                key="roleName"/>
              <Column
                title="目标所属分组"
                dataIndex="orgunitName"
                key="orgunitName"/>
              <Column
                title="处理方式"
                dataIndex="orgunitName"
                key="orgunitName"/>
              <Column
                title="执行时间"
                dataIndex="time"
                key="time"/>
              <Column
                title="备注"
                dataIndex="memo"
                key="memo"/>
              <Column
                title="操作"
                render={this.tableOperation}
              />
            </Table>

            {/*<Pagination*/}
            {/*className={styles.pagination}*/}
            {/*page={this.props.system.userCfg.userListPage}*/}
            {/*pageTranslate={this.pageTranslate ? this.pageTranslate : null}*/}
            {/*/>*/}
          </div>
        </div>
        <AddRuleModule
          visiable={this.props.bussiness.rule.addRuleModule}
          onAddModalCancel={this.onAddModalCancel}
          onSubmit={this.onAddSubmit}
        />
        {/*<ComfirmModal*/}
        {/*visiable={this.props.system.confirmVisiable}*/}
        {/*onSubmit={this.onComfirmSubmit}*/}
        {/*onCancel={this.onComfirmCancel}*/}
        {/*/>*/}
      </MayLayout>
    );
  }
}

function mapStateToProps({ bussiness }) {
  return { bussiness };
}

export default connect(mapStateToProps)(Rule);
