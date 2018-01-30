
import React from 'react';
import { connect } from 'dva';
import { Input, Button, Icon, Row, Col, Select, Table, TreeSelect } from 'antd';
import styles from './Device.less';
import MayLayout from '../../../components/common/Layout/MayLayout';
import AddCameraModule from './AddCameraModule';
import ComfirmModal from '../../../components/common/ConfirmModal/ConfirmModal';
import Pagination from '../../../components/common/PaginationView/PaginationView';


const { Option, OptGroup } = Select;
const { Column } = Table;
const { TreeNode } = TreeSelect;
class Device extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'bussiness/getCameraList'
    });
    this.props.dispatch({
      type: 'bussiness/getGroupTree'
    });
  }
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
          addCameraModule: false,
          modifyCamera: {
            name: '',
            modelType: '',
            categoryId: 1,
            orgunit_id: '',
            ipAddress: '',
            playUrl: '',
            cjdUrl: '',
            cameraUsername: '',
            cameraPassword: '',
            memo: '',
            cjdUuid: '',
            cjdSubid: '',
            config: ''
          }
        }
      }
    });
  }
  onAddSubmit = () => {
    switch (this.state.action) {
      case 'newDevice':
        this.props.dispatch({
          type: 'bussiness/addCamera'
        });
        break;
      case 'editDevice':
        this.props.dispatch({
          type: 'bussiness/modifyCamrea'
        });
        break;
      default:
        break;
    }
  }
  onSearchId = e => {
    const device = this.props.bussiness.device;
    const { getCameraParams } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          getCameraParams: {
            ...getCameraParams,
            pageSize: 10,
            pageNo: 1,
            id: e.target.value
          }
        }
      }
    });
  }
  onSearchName = e => {
    const device = this.props.bussiness.device;
    const { getCameraParams } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          getCameraParams: {
            ...getCameraParams,
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
    const device = this.props.bussiness.device;
    const { getCameraParams } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          getCameraParams: {
            ...getCameraParams,
            pageSize: 10,
            pageNo: 1,
            orgunitId: value
          }
        }
      }
    });
  };
  onSearchIpAds = e => {
    const device = this.props.bussiness.device;
    const { getCameraParams } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          getCameraParams: {
            ...getCameraParams,
            pageSize: 10,
            pageNo: 1,
            ip_address: e.target.value
          }
        }
      }
    });
  }
  onSearchClick = () => {
    this.props.dispatch({
      type: 'bussiness/getCameraList'
    });
  }
  onEditClick = record => {
    this.setState({
      action: 'editDevice'
    });
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          addCameraModule: true,
          modifyCamera: {
            ...modifyCamera,
            srcId: record.srcId,
            name: record.name,
            modelType: record.modelType,
            categoryId: 1,
            orgunit_id: record.orgunitId,
            ipAddress: record.ipAddress,
            playUrl: record.playUrl,
            cjdUrl: record.cjdUrl,
            cameraUsername: record.cameraUsername,
            cameraPassword: record.cameraPassword,
            memo: record.memo,
            cjdUuid: record.cjdUuid,
            cjdSubid: record.cjdSubid,
            config: record.defaultConfig
          }
        }
      }
    });
  }
  onOneDeleteClick = record => {
    const device = this.props.bussiness.device;
    const { deleteCamrea } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        confirmVisiable: true,
        device: {
          ...device,
          deleteCamrea: {
            srcId: record.srcId
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
  pageTranslate = value => {
    this.props.dispatch({
      type: 'bussiness/cameraListTranslate',
      payload: {
        pageNo: value.pageNo,
        pageSize: value.pageSize
      }
    });
  };
  cameraNameChange = value => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            name: value
          }
        }
      }
    });
  }
  brandChange = value => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            modelType: value
          }
        }
      }
    });
  }
  ipChange = value => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            ipAddress: value
          }
        }
      }
    });
  }
  manageCameraNameChange = value => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            cameraUsername: value
          }
        }
      }
    });
  }
  manageCameraPswChange = value => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            cameraPassword: value
          }
        }
      }
    });
  }
  playURLChange = value => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            playUrl: value
          }
        }
      }
    });
  }
  cjdURLChange = value => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            cjdUrl: value
          }
        }
      }
    });
  }
  cjdUuIdChange = value => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            cjdUuid: value
          }
        }
      }
    });
  }
  cjdSubIdChange = value => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            cjdSubid: value
          }
        }
      }
    });
  }
  configChange = value => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            config: value
          }
        }
      }
    });
  }
  orgunitIdChange = value => {
    const device = this.props.bussiness.device;
    const { modifyCamera } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        device: {
          ...device,
          modifyCamera: {
            ...modifyCamera,
            orgunit_id: value
          }
        }
      }
    });
  }
  onComfirmSubmit = () => {
    this.props.dispatch({
      type: 'bussiness/deleteCamrea'
    });
  };
  onComfirmCancel = () => {
    const device = this.props.bussiness.device;
    const { deleteCamrea } = device;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        confirmVisiable: false,
        device: {
          ...device,
          deleteCamrea: {
            srcId: ''
          }
        }
      }
    });
  };
  render() {
    return (
      <MayLayout location={this.props.location}>
        <Row className={styles.searchGroup}>
          <Col span={4} className={styles.condition}>
            <span className={styles.label}>摄像头编号</span>
            <Input
              onChange={this.onSearchId}
              style={{width: 180}}/>
          </Col>
          <Col span={4} className={styles.condition}>
            <span className={styles.label}>摄像头名称</span>
            <Input
              onChange={this.onSearchName}
              style={{width: 180}}/>
          </Col>
          <Col span={5} className={styles.condition}>
            <span className={styles.label}>所属组织</span>
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
          <Col span={4} className={styles.condition}>
            <span className={styles.label}>ip地址</span>
            <Input
              onChange={this.onSearchIpAds}
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
                  onClick={this.onSearchClick}
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
            dataSource={this.props.bussiness.device && this.props.bussiness.device.cameraTableList ?
              this.props.bussiness.device.cameraTableList : []}
            pagination={false}
            bordered
            rowKey={record => record.id}
          >
            <Column
              title="摄像头编号"
              dataIndex="id"
              key="id"/>
            <Column
              title="摄像头名称"
              dataIndex="name"
              key="name"/>
            <Column
              title="所属组织"
              dataIndex="orgunitName"
              key="orgunitName"/>
            <Column
              title="播放流地址"
              dataIndex="playUrl"
              key="playUrl"/>
            <Column
              title="采集流地址"
              dataIndex="cjdUrl"
              key="cjdUrl"/>
            <Column
              title="IP地址"
              dataIndex="ipAddress"
              key="ipAddress"/>
            <Column
              title="状态"
              dataIndex="flag"
              key="flag"/>
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
            dataSource={this.props.bussiness.device.modifyCamera}
            groupTree={this.props.bussiness && this.props.bussiness.groupTree ?
              this.props.bussiness.groupTree : []}
            onAddModalCancel={this.onAddModalCancel}
            cameraNameChange={this.cameraNameChange}
            brandChange={this.brandChange}
            ipChange={this.ipChange}
            manageCameraNameChange={this.manageCameraNameChange}
            manageCameraPswChange={this.manageCameraPswChange}
            playURLChange={this.playURLChange}
            cjdURLChange={this.cjdURLChange}
            cjdUuIdChange={this.cjdUuIdChange}
            cjdSubIdChange={this.cjdSubIdChange}
            configChange={this.configChange}
            orgunitIdChange={this.orgunitIdChange}
            onSubmit={this.onAddSubmit}
          />
          <Pagination
            className={styles.pagination}
            page={this.props.bussiness.device.cameraTablePage}
            pageTranslate={this.pageTranslate ? this.pageTranslate : null}
          />
        </div>
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

export default connect(mapStateToProps)(Device);
