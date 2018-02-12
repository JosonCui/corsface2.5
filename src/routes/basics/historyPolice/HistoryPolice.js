/**
 * Created by Ethan on 2018/1/15.
 */
import React from 'react';
import { connect } from 'dva';
import { Input, Button, Icon, Row, Col, Select} from 'antd';
import MayLayout from '../../../components/common/Layout/MayLayout';
import styles from './historyPolice.less';
import FaceCardContent from './FaceCardContent';
import DetailsModal from '../historyPass/DetailsModal';
import AddTargetModal from '../historyPass/AddTargetModal';
import TakeImgDetail from './TakeImgDetail';

class HistoryPolice extends React.Component {
  componentWillMount() {
    this.props.dispatch({
      type: 'basics/getAlarmList'
    });
  }

  showPoliceDetail = () => {
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        detailsModal: true
      }
    });
  }
  showPoliceTakeImg = () => {
    const historyPolice = this.props.basics.historyPolice;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPolice: {
          ...historyPolice,
          takeImgModal: true
        }
      }
    });
  }
  onCancelTakeImgDetail = () => {
    const historyPolice = this.props.basics.historyPolice;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPolice: {
          ...historyPolice,
          takeImgModal: false
        }
      }
    });
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
                // onChange={handleChange}
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
                // onChange={handleChange}
              />
            </Col>

            <Col span={3} className={styles.condition}>
              <span className={styles.label}>年龄段</span>
              <Select
                style={{ width: '100px' }}
                placeholder="请选择角色"
                // onChange={handleChange}
              />
            </Col>
            <Col span={4} className={styles.condition}>
              <span className={styles.label}>胡子</span>
              <Select
                style={{ width: '100px' }}
                placeholder="请选择角色"
                // onChange={handleChange}
              />
            </Col>
            <Col span={4} className={styles.condition}>
              <span className={styles.label}>帽子</span>
              <Select
                style={{ width: '100px' }}
                placeholder="请选择角色"
                // onChange={handleChange}
              />
            </Col>
            <Button type="primary">查询</Button>
          </Row>
          <Row className={styles.wrap}>
            <div style={{height: '35px'}}>
              <div> <Col span={3}>
                <div className={styles.modalHeader}>
                  <span className={styles.modalHeaderTitle}>抓拍照片</span>
                </div>
              </Col>
                <Col span={21}>
                  <div className={styles.modalHeader}>
                    <span className={styles.modalHeaderTitle}>对比照片</span>
                  </div>
                </Col>
              </div>
            </div>

            {/* 遍历渲染 */}
            <div className={styles.cardContent}>
              {[0, 0, 0, 0].map(value => (<FaceCardContent
                onClickCapt={this.showPoliceTakeImg}
                onClickComp={this.showPoliceDetail}
            />))}
            </div>
          </Row>

        </div>
        <DetailsModal/>
        <AddTargetModal/>
        <TakeImgDetail
          visiable={this.props.basics.historyPolice.takeImgModal}
          onCancel={this.onCancelTakeImgDetail}
        />
      </MayLayout>
    );
  }
}

function mapStateToProps({ basics }) {
  return { basics };
}

export default connect(mapStateToProps)(HistoryPolice);
