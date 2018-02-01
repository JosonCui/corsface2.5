/**
 * Created by Ethan on 2018/1/15.
 */
import React from 'react';
import { connect } from 'dva';
import { Input, Icon } from 'antd';

import MayLayout from '../../../components/common/Layout/MayLayout';
import AlarmFaceCard from './AlarmFaceCard.js';
import styles from './realMonitor.less';

class RealMonitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    };
  }
  onEmitEmpty = () => {
    this.treeSelect.focus();
    this.setState({ searchValue: ''});
  };
  onCameraSelectChange = e => {
    this.setState({
      searchValue: e.target.value
    });
  };

  render() {
    return (
      <MayLayout location={this.props.location}>
        {/* 右边固定， 左边自适应布局， 故视频播放区和通过人脸区DOM结构反写 */}
        <div className={styles.cameraList}>{/* 外侧需要加 iframe */}
          <div className={styles.cameraSearch}>
            <Input
              className={styles.treeSelect}
              placeholder="输入关键字或编号"
              onChange={this.onCameraSelectChange}
              value={this.state.searchValue}
              prefix={<Icon type="search" className={styles.searchPrefix}/>}
              suffix={this.state.searchValue ? <Icon
                type="close-circle"
                onClick={this.onEmitEmpty}
                className={styles.searchSuffix}
                                            /> : null}
              ref={node => (this.treeSelect = node)}
                            />
          </div>

        </div>

        <div className={styles.contentRight}>
          <div className={styles.faceTitle}>最新通过</div>
          <div className={styles.faceContent}>
            <AlarmFaceCard/>
            <AlarmFaceCard/>
            <AlarmFaceCard/>
            <AlarmFaceCard/>
            <AlarmFaceCard/>
            <AlarmFaceCard/>
            <AlarmFaceCard/>
            <AlarmFaceCard/>
          </div>

        </div>
        <div className={styles.contentLeft}>
          <div className={styles.videoContain}>
            <div className={styles.video}><div className={`${styles.videoList} ${styles.dropVideo}`} /></div>
            <div className={styles.video}><div className={`${styles.videoList} ${styles.dropVideo}`} /></div>
            <div className={styles.video}><div className={`${styles.videoList} ${styles.dropVideo}`} /></div>
            <div className={styles.video}><div className={`${styles.videoList} ${styles.dropVideo}`} /></div>
          </div>
          <div className={styles.alarmList}>
            <div className={styles.alarmListTitle}>最新报警</div>
            <AlarmFaceCard/>
            <AlarmFaceCard/>
            <AlarmFaceCard/>
            <AlarmFaceCard/>
          </div>
        </div>
      </MayLayout>
    );
  }
}

function mapStateToProps({ basics }) {
  return { basics };
}

export default connect(mapStateToProps)(RealMonitor);
