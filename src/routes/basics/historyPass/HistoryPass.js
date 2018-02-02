/**
 * Created by Ethan on 2018/1/15.
 */
import React from 'react';
import { connect } from 'dva';
import { Input, Button, Icon, Row, Col, Select, Table } from 'antd';
import MayLayout from '../../../components/common/Layout/MayLayout';
import FaceComparisonCard from './FaceComparisonCard';
import PassDetailsModal from './PassDetailsModal';
import AddTargetModal from './AddTargetModal';
import styles from './historyPass.less';



function handleChange(value) {
  console.log(value);
}
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: text => <a href="#">{text}</a>
}, {
  title: 'Age',
  dataIndex: 'age'
}, {
  title: 'Address',
  dataIndex: 'address'
}];
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park'
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park'
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park'
}, {
  key: '4',
  name: 'Disabled User',
  age: 99,
  address: 'Sidney No. 1 Lake Park'
}];
class HistoryPass extends React.Component {

  showPassDetail = () => {
    const historyPass = this.props.basics.historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          passDetailsModal: true
        }
      }
    })
  }

  render() {
    return (
      <MayLayout location={this.props.location}>
        <div>
          <Row className={styles.searchGroup}>
            <Col span={4} className={styles.condition}>
              <span className={styles.label}>姓名</span>
              <Input style={{width: 200}}/>
            </Col>
            <Col span={3} className={styles.condition}>
              <span className={styles.label}>性别</span>
              <Select
                style={{ width: '100px' }}
                placeholder="请选择角色"
                onChange={handleChange}
              />
            </Col>
            <Col span={4} className={styles.condition}>
              <span className={styles.label}>身份证号</span>
              <Input style={{width: 200}}/>
            </Col>
            <Col span={4} className={styles.condition}>
              <span className={styles.label}>摄像头</span>
              <Input style={{width: 200}}/>
            </Col>

            <Col span={3} className={styles.condition}>
              <span className={styles.label}>报警阈值</span>
              <Input style={{width: 100}}/>
            </Col>

            <Col span={4} className={styles.condition}>
              <span className={styles.label}>所属组织</span>
              <Input
                style={{width: 200, marginTop: '9px'}}
                placeholder="输入组织名称或关键字"
                addonAfter={<Icon type="folder-add" />}
              />
            </Col>

            <Col span={4} className={styles.condition}>
              <span className={styles.label}>日期</span>
              <Input style={{width: 200}}/>
            </Col>

            <Col span={4} className={styles.condition}>
              <span className={styles.label}>眼镜</span>
              <Select
                style={{ width: '100px' }}
                placeholder="请选择角色"
                onChange={handleChange}
              />
            </Col>

            <Col span={3} className={styles.condition}>
              <span className={styles.label}>年龄段</span>
              <Select
                style={{ width: '100px' }}
                placeholder="请选择角色"
                onChange={handleChange}
              />
            </Col>
            <Col span={4} className={styles.condition}>
              <span className={styles.label}>胡子</span>
              <Select
                style={{ width: '100px' }}
                placeholder="请选择角色"
                onChange={handleChange}
              />
            </Col>
            <Col span={4} className={styles.condition}>
              <span className={styles.label}>帽子</span>
              <Select
                style={{ width: '100px' }}
                placeholder="请选择角色"
                onChange={handleChange}
              />
            </Col>
            <Button type="primary">查询</Button>
          </Row>
          <FaceComparisonCard
            onClick={this.showPassDetail}
          />

        </div>
        <PassDetailsModal/>
        <AddTargetModal/>
      </MayLayout>
    );
  }
}

function mapStateToProps({ basics }) {
  return { basics };
}

export default connect(mapStateToProps)(HistoryPass);
