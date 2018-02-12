/**
 * Created by Ethan on 2018/1/15.
 */
import React from 'react';
import { connect } from 'dva';
import { Input, Button, Icon, Row, Col, Select, InputNumber, DatePicker, TreeSelect} from 'antd';
import MayLayout from '../../../components/common/Layout/MayLayout';
import FaceComparisonCard from './FaceComparisonCard';
import DetailsModal from './DetailsModal';
import AddTargetModal from './AddTargetModal';
import Pagination from '../../../components/common/PaginationView/PaginationView';
import styles from './historyPass.less';

const {RangePicker} = DatePicker;
class HistoryPass extends React.Component {
  componentDidMount() {

    this.props.dispatch({
      type: 'basics/historyPassList'
    });
    this.props.dispatch({
      type: 'basics/getGroupTree'
    });
    this.props.dispatch({
      type: 'basics/gitALLCamreaList'
    });
    this.props.dispatch({
      type: 'basics/getAllGroups'
    });
  }

  onNameChange = e => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 10,
            pageNo: 1,
            name: e.target.value
          }
        }
      }
    });
  }
  onGenderChange = value => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 10,
            pageNo: 1,
            gender: value
          }
        }
      }
    });
  }
  onCardChange = e => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 10,
            pageNo: 1,
            idCard: e.target.value
          }
        }
      }
    });
  }
  onCameraChange = value => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 10,
            pageNo: 1,
            srcId: value
          }
        }
      }
    });
  }
  onStartPercentChange = value => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 10,
            pageNo: 1,
            startPercent: value
          }
        }
      }
    });
  }
  onEndPercentChange = value => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 10,
            pageNo: 1,
            endPercent: value
          }
        }
      }
    });
  }
  onTimeChange = (data, dateString) => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 10,
            pageNo: 1,
            startTime: dateString[0],
            endTime: dateString[1]
          }
        }
      }
    });
  }
  onAgeChange = e => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 10,
            pageNo: 1,
            age: e.target.value
          }
        }
      }
    });
  }
  onGlassesChange = value => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 10,
            pageNo: 1,
            isglasses: value
          }
        }
      }
    });
  }
  onMoustacheChange = value => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 10,
            pageNo: 1,
            ismoustache: value
          }
        }
      }
    });
  }
  onHatChange = value => {
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 10,
            pageNo: 1,
            ishat: value
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
    const historyPass = this.props.basics.historyPass;
    const { getPassListParams } = historyPass;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        historyPass: {
          ...historyPass,
          getPassListParams: {
            ...getPassListParams,
            pageSize: 10,
            pageNo: 1,
            cmOrgunitId: value
          }
        }
      }
    });
  };

  onSearchClick = () => {
    this.props.dispatch({
      type: 'basics/historyPassList'
    });
  }
  showPassDetail = value => {
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        detailsModalData: value,
        detailsModal: true
      }
    });
  }
  pageTranslate = value => {
    this.props.dispatch({
      type: 'basics/passListTranslate',
      payload: {
        pageNo: value.pageNo,
        pageSize: value.pageSize
      }
    });
  };

  onCancel = () => {
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        detailsModal: false
      }
    });
  }
  addTargetModal = () => {
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        addTargetModal: true
      }
    });
  }
  addTargetData = () => {
    this.props.dispatch({
      type: 'basics/addFacetrack'
    });
  }
  checkImgs = value => {
    const checkTakeImgs = this.props.basics.checkTakeImgs;
    const originImgs = this.props.basics.originImgs;
    const checkTake = checkTakeImgs || [];

    let imgsName = [];
    imgsName = value.split('fn=');
    if (checkTake.indexOf(imgsName[1]) === -1) {
      checkTake.push(imgsName[1]);
      originImgs.push(value);
    } else {
      const index = checkTake.indexOf(imgsName[1]);
      checkTake.splice(index, 1);
      originImgs.splice(index, 1);
    }
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        checkTakeImgs: checkTake
      }
    });
  }
  toggleClass = value => {
    const checkTakeImgs = this.props.basics.checkTakeImgs;
    const checkTake = checkTakeImgs || [];
    let imgsName = [];
    imgsName = value.split('fn=');
    if (checkTake.indexOf(imgsName[1]) !== -1) {
      return styles.selectImg;
    }
    return styles.notSelectImg;
  }
  messageToggleClass = value => {
    if (this.props.basics.bindFacetrack && this.props.basics.bindFacetrack.personId){
      if (this.props.basics.bindFacetrack.personId.indexOf(value.personId) !== -1){
        return styles.selectesCard;
      } else {
        return styles.messageCard;
      }
    } else {
      return styles.messageCard;
    }
  }

  deleteTakeImgs = () => {
    this.props.dispatch({
      type: 'basics/deleteTakeImgs'
    });
  }
  bindFacetrack = value => {
    const bindFacetrack = this.props.basics.bindFacetrack;
    const detailsModalData = this.props.basics.detailsModalData;
    const { code } = detailsModalData;
    if (bindFacetrack.personId.indexOf(value.personId) === -1){
      this.props.dispatch({
        type: 'basics/success',
        payload: {
          bindFacetrack: {
            facetrackId: code,
            personId: value.personId
          }
        }
      });
    } else {
      this.props.dispatch({
        type: 'basics/success',
        payload: {
          bindFacetrack: {
            ...bindFacetrack,
            personId: ''
          }
        }
      });
    }

  }
  clickBindBtn = () => {
    this.props.dispatch({
      type: 'basics/bindFacetrack'
    });
  }
  onCancelTargetModal = () => {
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        addTargetModal: false
      }
    });
  }

  nameChange = value => {
    const newFacetrack = this.props.basics.newFacetrack;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        newFacetrack: {
          ...newFacetrack,
          name: value
        }
      }
    });
  }
  idcardChange = value => {
    const newFacetrack = this.props.basics.newFacetrack;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        newFacetrack: {
          ...newFacetrack,
          identityCard: value
        }
      }
    });
  }
  groupChange = value => {
    const newFacetrack = this.props.basics.newFacetrack;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        newFacetrack: {
          ...newFacetrack,
          groupId: value
        }
      }
    });
  }
  genderChange = value => {
    const int = value - 0;
    const newFacetrack = this.props.basics.newFacetrack;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        newFacetrack: {
          ...newFacetrack,
          gender: int
        }
      }
    });
  }
  nativeplaceChange = value => {
    const newFacetrack = this.props.basics.newFacetrack;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        newFacetrack: {
          ...newFacetrack,
          household_register: value
        }
      }
    });
  }
  thresholdChange = value => {
    const newFacetrack = this.props.basics.newFacetrack;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        newFacetrack: {
          ...newFacetrack,
          threshold: value
        }
      }
    });
  }
  orgunitChange = id => {
    let value = id - 0;
    if (!value) {
      value = '';
    }
    const newFacetrack = this.props.basics.newFacetrack;
    this.props.dispatch({
      type: 'basics/success',
      payload: {
        newFacetrack: {
          ...newFacetrack,
          orgunitId: value
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
              <Input style={{width: 180}} onChange={this.onNameChange} />
            </Col>

            <Col span={5} className={styles.condition}>
              <span className={styles.label}>身份证号</span>
              <Input style={{width: 180}} onChange={this.onCardChange}/>
            </Col>

            <Col span={5} className={styles.condition}>
              <span className={styles.label}>摄像头</span>
              <Select
                style={{ width: '180px' }}
                onChange={this.onCameraChange}
              >
                <Option value="">全部</Option>
                { this.props.basics && this.props.basics.camreaAll ? this.props.basics.camreaAll.map((value, i) =>
                  <Select.Option
                    key={i}
                    value={`${value.srcId}`}>{value.name}</Select.Option>
                ) : null}

              </Select>
            </Col>
            <Col span={5} className={styles.condition}>
              <span className={styles.label}>所属组织</span>
              <TreeSelect
                allowClear
                treeData={this.props.basics && this.props.basics.groupTree ?
                  this.props.basics.groupTree : []}
                style={{ width: '180px' }}
                onChange={this.onSearchOrgunit}
                treeDefaultExpandAll
                placeholder="请选择组织"
              />

            </Col>
            <Col span={5} className={styles.condition}>
              <span className={styles.label}>报警阈值</span>
              <InputNumber
                style={{width: 70}} defaultValue={0} formatter={value => `${value}%`}
                parser={value => value.replace('%', '')} min={0} max={99} onChange={this.onStartPercentChange}/>
              <span> ~ </span>
              <InputNumber
                style={{width: 70}} defaultValue={100} formatter={value => `${value}%`}
                parser={value => value.replace('%', '')} min={0} max={99} onChange={this.onEndPercentChange}/>
            </Col>


            <Col span={7} className={styles.condition}>
              <span className={styles.label}>日期</span>
              <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"style={{width: 350}} onChange={this.onTimeChange}/>
            </Col>


            <Col span={3} className={styles.condition}>
              <span className={styles.label}>性别</span>
              <Select
                style={{ width: '100px' }}
                onChange={this.onGenderChange}
              >
                <Option value="">全部</Option>
                <Option value="1">男</Option>
                <Option value="0">女</Option>
              </Select>
            </Col>


            <Col span={3} className={styles.condition}>
              <span className={styles.label}>年龄</span>
              <Input style={{width: 80}} onChange={this.onAgeChange}/>
            </Col>
            <Col span={3} className={styles.condition}>
              <span className={styles.label}>眼镜</span>
              <Select
                style={{ width: '80px' }}
                onChange={this.onGlassesChange}
              >
                <Option value="0">全部</Option>
                <Option value="1">有</Option>
                <Option value="2">无</Option>
              </Select>
            </Col>
            <Col span={3} className={styles.condition}>
              <span className={styles.label}>胡子</span>
              <Select
                style={{ width: '80px' }}
                onChange={this.onMoustacheChange}
              >
                <Option value="0">全部</Option>
                <Option value="1">有</Option>
                <Option value="2">无</Option>
              </Select>
            </Col>
            <Col span={3} className={styles.condition}>
              <span className={styles.label}>帽子</span>
              <Select
                style={{ width: '80px' }}
                onChange={this.onHatChange}
              >
                <Option value="0">全部</Option>
                <Option value="1">有</Option>
                <Option value="2">无</Option>
              </Select>
            </Col>
            <Button type="primary" onClick={this.onSearchClick}>查询</Button>
          </Row>
          {this.props.basics && this.props.basics.historyPass && this.props.basics.historyPass.facetrackList ?
            this.props.basics.historyPass.facetrackList.map((value, i) =>
              <FaceComparisonCard
                data={value}
                matchData={value.matchPoiList[0] ? value.matchPoiList[0] : null}
                key={i}
                onClick={this.showPassDetail.bind(this, value)}/>
            ) : null}

        </div>
        <DetailsModal
          visible={this.props.basics.detailsModal}
          data={this.props.basics.detailsModalData ? this.props.basics.detailsModalData : null}
          checkImgs={this.checkImgs}
          deleteTakeImgs={this.deleteTakeImgs}
          bindFacetrack={this.bindFacetrack}
          clickBindBtn={this.clickBindBtn}
          onCancel={this.onCancel}
          addTarget={this.addTargetModal}
          toggleClass={this.toggleClass}
          messageToggleClass={this.messageToggleClass}

        />
        <AddTargetModal
          data={this.props.basics.detailsModalData ? this.props.basics.detailsModalData : null}
          visible={this.props.basics.addTargetModal}
          treeData={this.props.basics && this.props.basics.groupTree ?
            this.props.basics.groupTree : []}
          groupList={this.props.basics && this.props.basics.allGroups ?
            this.props.basics.allGroups : []}
          nameChange={this.nameChange}
          idcardChange={this.idcardChange}
          groupChange={this.groupChange}
          genderChange={this.genderChange}
          nativeplaceChange={this.nativeplaceChange}
          thresholdChange={this.thresholdChange}
          orgunitChange={this.orgunitChange}
          onCancel={this.onCancelTargetModal}
          addTargetData={this.addTargetData}
        />
        <Pagination
          className={styles.pagination}
          page={this.props.basics.historyPass.facetrackPage}
          pageTranslate={this.pageTranslate ? this.pageTranslate : null}
        />
      </MayLayout>
    );
  }
}

function mapStateToProps({ basics }) {
  return { basics };
}

export default connect(mapStateToProps)(HistoryPass);
