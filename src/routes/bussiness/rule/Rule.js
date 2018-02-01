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
  constructor(props) {
    super(props);
    this.state = {
      orgunitId: null,
      groupId: ''
    };
  }
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
          addRuleModule: false,
          modifyRule: {
            cmOrgunitId: '',
            poiOrgunitId: '',
            configType: '',
            alarmTime: [],
            personId: '',
            memo: '',
            targetName: '',
            groupId: ''
          }
        }
      }
    });
  }
  onAddSubmit = () => {
    switch (this.state.action) {
      case 'newRule':
        this.props.dispatch({
          type: 'bussiness/addAlarmRule'
        });
        break;
      case 'editRule':
        this.props.dispatch({
          type: 'bussiness/modifyAlarmRule'
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
  onEditClick = record => {
    console.log(record)
    this.setState({
      action: 'editRule'
    });
    const rule = this.props.bussiness.rule;
    const { modifyRule } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          addRuleModule: true,
          modifyRule: {
            ...modifyRule,
            id: record.id,
            cmOrgunitId: record.camera_orgunitId,
            poiOrgunitId: record.poi_orgunitId,
            configType: record.config_type,
            alarmTime: record.alarm_time_int,
            personId: '',
            groupId: record.groupName ? record.groupName : '',
            memo: record.memo ? record.memo : '',
            targetName: record.poiName
          }
        }
      }
    });
  }
  tableOperation = record => (
    <div>
      <span title="编辑角色" onClick={this.onEditClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableEdit}`} />
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

  cameraOrgunitChange = value => {
    const rule = this.props.bussiness.rule;
    const { modifyRule } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          modifyRule: {
            ...modifyRule,
            cmOrgunitId: value
          }
        }
      }
    });
  }
  targetOrgunitChange = value => {
    if (value === '') {
      this.setState({
        orgunitId: ''
      });
    } else {
      this.setState({
        orgunitId: value
      });
    }
    setTimeout(() => {
      if (this.state.orgunitId) {
        // 请求分组人员;
        this.props.dispatch({
          type: 'bussiness/getPoiByOrgIdAndGroupId',
          payload: {
            orgunitId: this.state.orgunitId,
            groupId: this.state.groupId
          }
        });
      }
    }, 300);
    const rule = this.props.bussiness.rule;
    const { modifyRule } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          modifyRule: {
            ...modifyRule,
            poiOrgunitId: value
          }
        }
      }
    });
  }
  groupChange = value => {
    if (value === '') {
      this.setState({
        groupId: null
      });
    } else {
      this.setState({
        groupId: value
      });
    }
    setTimeout(() => {
      if (this.state.orgunitId && this.state.groupId) {
        // 请求分组人员;
        this.props.dispatch({
          type: 'bussiness/getPoiByOrgIdAndGroupId',
          payload: {
            orgunitId: this.state.orgunitId,
            groupId: this.state.groupId
          }
        });
      }
    }, 300);
    const rule = this.props.bussiness.rule;
    const { modifyRule } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          modifyRule: {
            ...modifyRule,
            groupId: value
          }
        }
      }
    });
  }
  nameChange = value => {
    const rule = this.props.bussiness.rule;
    const { modifyRule } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          modifyRule: {
            ...modifyRule,
            personId: value.personId,
            targetName: value.name
          }
        }
      }
    });
  }
  disposeChange = value => {
    const rule = this.props.bussiness.rule;
    const { modifyRule } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          modifyRule: {
            ...modifyRule,
            configType: value - 0
          }
        }
      }
    });
  }
  timeChange = value => {
    const rule = this.props.bussiness.rule;
    const { modifyRule } = rule;
    const alarmTime = modifyRule.alarmTime || [];

    if (alarmTime.indexOf(value - 0) === -1){
      alarmTime.push(value - 0);
    } else {
      const index = alarmTime.indexOf(value - 0);
      alarmTime.splice(index, 1);
    }
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          modifyRule: {
            ...modifyRule,
            alarmTime
          }
        }
      }
    });
  }
  memoChange = value => {
    const rule = this.props.bussiness.rule;
    const { modifyRule } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          modifyRule: {
            ...modifyRule,
            memo: value
          }
        }
      }
    });
  }

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
          dataSource={this.props.bussiness.rule.modifyRule}
          groupTree={this.props.bussiness && this.props.bussiness.groupTree ?
            this.props.bussiness.groupTree : []}
          targetGroupList={this.props.bussiness && this.props.bussiness.roleList ?
            this.props.bussiness.roleList : []}
          targerNameList={this.props.bussiness && this.props.bussiness.rule.targetNameList ?
            this.props.bussiness.rule.targetNameList : []}
          onAddModalCancel={this.onAddModalCancel}
          cameraOrgunitChange={this.cameraOrgunitChange}
          targetOrgunitChange={this.targetOrgunitChange}
          groupChange={this.groupChange}
          nameChange={this.nameChange}
          disposeChange={this.disposeChange}
          timeChange={this.timeChange}
          memoChange={this.memoChange}
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
