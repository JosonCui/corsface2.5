import React from 'react';
import { connect } from 'dva';
import { Input, Button, Icon, Row, Col, Select, Table, TreeSelect } from 'antd';
import styles from './Rule.less';
import MayLayout from '../../../components/common/Layout/MayLayout';
import AddRuleModule from './AddRuleModule';
import ComfirmModal from '../../../components/common/ConfirmModal/ConfirmModal';
import Pagination from '../../../components/common/PaginationView/PaginationView';


const { Option, OptGroup } = Select;
const { Column } = Table;
class Rule extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'bussiness/getAlarmRuleList'
    });
    this.props.dispatch({
      type: 'bussiness/getGroupTree'
    });
    this.props.dispatch({
      type: 'bussiness/getAllRoles'
    });
  }
  onSearchName = e => {
    const rule = this.props.bussiness.rule;
    const { getRuleParams } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          getRuleParams: {
            ...getRuleParams,
            pageSize: 10,
            pageNo: 1,
            name: e.target.value
          }
        }
      }
    });
  }
  onSearchOrgunit = id => {
    let value = id - 0;
    if (!value) {
      value = '';
    }
    const rule = this.props.bussiness.rule;
    const { getRuleParams } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          getRuleParams: {
            ...getRuleParams,
            pageSize: 10,
            pageNo: 1,
            orgunitId: value
          }
        }
      }
    });
  };
  renderSelectOptions = () => {
    let op = '';
    if (this.props.bussiness && this.props.bussiness.roleList) {
      if (this.props.bussiness.roleList.length > 0) {
        op = this.props.bussiness.roleList.map(value => (
          <Option value={value.id} key={value.id}>{value.name}</Option>
        ));
      }
    }

    return op;
  };
  onSelectGroupChange = value => {
    const rule = this.props.bussiness.rule;
    const { getRuleParams } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          getRuleParams: {
            ...getRuleParams,
            pageSize: 10,
            pageNo: 1,
            groupId: value
          }
        }
      }
    });
  }
  onConfigTyperChange = value => {
    const rule = this.props.bussiness.rule;
    const { getRuleParams } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          getRuleParams: {
            ...getRuleParams,
            pageSize: 10,
            pageNo: 1,
            configType: value
          }
        }
      }
    });
  }
  onSearchClick = () => {
    this.props.dispatch({
      type: 'bussiness/getAlarmRuleList'
    });
  }

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
  onOneDeleteClick = record => {
    const rule = this.props.bussiness.rule;
    const { deleteRule } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        confirmVisiable: true,
        rule: {
          ...rule,
          deleteRule: {
            ...deleteRule,
            id: record.id
          }
        }
      }
    });
  };
  tableOperation = record => (
    <div>
      <span title="编辑角色" className={`${styles.tableBtn} ${styles.tableEdit}`} />
      <span title="删除角色" onClick={this.onOneDeleteClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableDelete}`} />
    </div>
  );
  pageTranslate = value => {
    this.props.dispatch({
      type: 'bussiness/rolesListTranslate',
      payload: {
        pageNo: value.pageNo,
        pageSize: value.pageSize
      }
    });
  };
  onComfirmSubmit = () => {
    this.props.dispatch({
      type: 'bussiness/deleteRule'
    });
  };
  onComfirmCancel = () => {
    const rule = this.props.bussiness.rule;
    const { deleteRule } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        confirmVisiable: false,
        rule: {
          ...rule,
          deleteRule: {
            ...deleteRule,
            id: ''
          }
        }
      }
    });
  };
  render() {
    return (
      <MayLayout location={this.props.location}>
        <div className={styles.title}>
          <span style={{color: '#02abe3'}}>默认规则: 本寺的摄像头</span>
          <div className={styles.line}/>
          <Row className={styles.searchGroup}>
            <Col span={6} className={styles.condition}>
              <span className={styles.label}>摄像头/目标所属组织</span>
              <TreeSelect
                allowClear
                treeData={this.props.bussiness && this.props.bussiness.groupTree ?
                  this.props.bussiness.groupTree : []}
                className={styles.input}
                onChange={this.onSearchOrgunit}
                treeDefaultExpandAll
                placeholder="请选择组织"
              />
            </Col>
            <Col span={5} className={styles.condition}>
              <span className={styles.label}>姓名/身份证号</span>
              <Input
                onChange={this.onSearchName}
                style={{width: 180}}/>
            </Col>
            <Col span={5} className={styles.condition}>
              <span className={styles.label}>目标所属分组</span>
              <Select
                style={{
                  width: '180px'
                }}
                onChange={this.onSelectGroupChange}
              >
                <Option value="">全部</Option>
                {this.renderSelectOptions()}
              </Select>
            </Col>
            <Col span={3} className={styles.condition}>
              <span className={styles.label}>处理方式</span>
              <Select
                style={{
                  width: '100px'
                }}
                onChange={this.onConfigTyperChange}
              >
                <Option value="">全部</Option>
                <Option value="0">报警</Option>
                <Option value="1">通过</Option>
              </Select>
            </Col>


            <Button
              type="primary"
              onClick={this.onSearchClick}
            >查询</Button>
          </Row>
          <div className={styles.btnGroup}>
            <Button
              style={{width: '125px'}} className={styles.delete} type="primary"
              onClick={this.onAddBtnClick}
            >
              <i className={styles.addIcon} />
              <span>新建规则</span>
            </Button>
          </div>
          <div className={styles.list}>
            <Table
              dataSource={this.props.bussiness.rule && this.props.bussiness.rule.ruleTableList ?
                this.props.bussiness.rule.ruleTableList : []}
              pagination={false}
              bordered
              rowKey={record => record.id}
            >
              <Column
                title="序号"
                dataIndex="id"
                key="id"/>
              <Column
                title="摄像头所属组织"
                dataIndex="camera_orgunitName"
                key="camera_orgunitName"/>
              <Column
                title="目标人姓名"
                dataIndex="poiName"
                key="poiName"/>
              <Column
                title="目标人身份证号"
                dataIndex="identity_card"
                key="identity_card"/>
              <Column
                title="目标所属组织"
                dataIndex="poi_orgunitName"
                key="poi_orgunitName"/>
              <Column
                title="目标所属分组"
                dataIndex="groupName"
                key="groupName"/>
              <Column
                title="处理方式"
                dataIndex="config_type"
                render={text => text ? '通过' : '报警'}
                key="config_type"/>
              <Column
                title="执行时间"
                dataIndex="alarm_time"
                key="alarm_time"/>
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
              page={this.props.bussiness.rule.ruleTablePage}
              pageTranslate={this.pageTranslate ? this.pageTranslate : null}
            />
          </div>
        </div>
        <AddRuleModule
          visiable={this.props.bussiness.rule.addRuleModule}
          onAddModalCancel={this.onAddModalCancel}
          onSubmit={this.onAddSubmit}
        />
        <ComfirmModal
          visiable={this.props.bussiness.confirmVisiable}
          onSubmit={this.onComfirmSubmit}
          onCancel={this.onComfirmCancel}
        />
      </MayLayout>
    );
  }
}

function mapStateToProps({ bussiness }) {
  return { bussiness };
}

export default connect(mapStateToProps)(Rule);
