import React from 'react';
import { connect } from 'dva';
import { Input, Button, Icon, Row, Col, Select, Table } from 'antd';
import styles from './Device.less';
import MayLayout from '../../../components/common/Layout/MayLayout';
import AddCameraModule from './AddCameraModule';
import ComfirmModal from '../../../components/common/ConfirmModal/ConfirmModal';
import Pagination from '../../../components/common/PaginationView/PaginationView';


const { Option, OptGroup } = Select;
const { Column } = Table;
class Device extends React.Component {
  onAddBtnClick = () => {
    this.setState({
      action: 'newDevice'
    });
    const device = this.props.bussiness.device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          addCameraModule: true
        }
      }
    });
  }
  onAddModalCancel = () => {
    const device = this.props.bussiness.device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          addCameraModule: false
        }
      }
    });
  }
  onAddSubmit = () => {
    switch (this.state.action) {
      case 'newDevice':
        this.props.dispatch({
          // type: 'system/addUser'
        });
        break;
      case 'editDevice':
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
        <Row className={styles.searchGroup}>
          <Col span={4} className={styles.condition}>
            <span className={styles.label}>摄像头编号</span>
            <Input
              // onChange={this.onSearchName}
              style={{width: 180}}/>
          </Col>
          <Col span={4} className={styles.condition}>
            <span className={styles.label}>摄像头名称</span>
            <Input
              // onChange={this.onSearchName}
              style={{width: 180}}/>
          </Col>
          <Col span={4} className={styles.condition}>
            <span className={styles.label}>所属组织</span>
            <Input
              className={styles.input}
              style={{width: 200, marginTop: '20px'}}
              placeholder="输入组织名称或关键字"
              // onChange={this.onSearchOrgunit}
              addonAfter={<Icon type="folder-add" />}
            />
          </Col>
          <Col span={4} className={styles.condition}>
            <span className={styles.label}>ip地址</span>
            <Input
              // onChange={this.onSearchName}
              style={{width: 200}}/>
          </Col>
          <Col span={3} className={styles.condition}>
            <span className={styles.label}>摄像头状态</span>
            <Select
              style={{
                width: '80px'
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
            <span>新建摄像头</span>
          </Button>
          <Button type="primary" className={styles.delete}>
            <i className={styles.importIcon} />
            导入
          </Button>
          <Button type="primary" className={styles.delete}>
            <i className={styles.exportIcon} />
            导出
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
              title="摄像头编号"
              dataIndex="loginName"
              key="loginName"/>
            <Column
              title="摄像头名称"
              dataIndex="name"
              key="name"/>
            <Column
              title="所属组织"
              dataIndex="phone"
              key="phone"/>
            <Column
              title="播放流地址"
              dataIndex="email"
              key="email"/>
            <Column
              title="采集流地址"
              dataIndex="roleName"
              key="roleName"/>
            <Column
              title="IP地址"
              dataIndex="orgunitName"
              key="orgunitName"/>
            <Column
              title="状态"
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
          <AddCameraModule
            visiable={this.props.bussiness.device.addCameraModule}
            onAddModalCancel={this.onAddModalCancel}
            onSubmit={this.onAddSubmit}
          />
          {/*<Pagination*/}
            {/*className={styles.pagination}*/}
            {/*page={this.props.system.userCfg.userListPage}*/}
            {/*pageTranslate={this.pageTranslate ? this.pageTranslate : null}*/}
          {/*/>*/}
        </div>
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

export default connect(mapStateToProps)(Device);
