/**
 * Created by Ethan on 2018/1/15.
 */
import React from 'react';
import { connect } from 'dva';
import { Input, Icon, Tree } from 'antd';

import MayLayout from '../../../components/common/Layout/MayLayout';
import VlcView from '../../../components/vlc/VlcView';
import AlarmFaceCard from './AlarmFaceCard';
import styles from './realMonitor.less';

const TreeNode = Tree.TreeNode;
class RealMonitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      expandedKeys: [], // 组织树展开节点集合
      autoExpandParent: true,
      allowedDrop: false,
      toggleSrc: '',
      draggable: true,
      VLC: ['rtmp://live.hkstv.hk.lxdns.com/live/hks', 'rtsp://admin:admin123@192.168.1.18', 'rtsp://admin:cf123456@192.168.1.78', 'rtsp://admin:admin123@192.168.1.14'],
      flag: 1,
      iconClassChange: '',
      vlcClassChange: '',
      screenSize: 1
    };
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'system/getGroupTree'
    });
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  };
    // 组织树Input输入
  onCameraSelectChange = e => {
    const value = e.target.value !== '' ? e.target.value.trim() : null; // 输入数据去空格
    const expandedKeys = this.props.system.groupCfg.dataList.map(item => {
      if (value && item.title.indexOf(value) > -1) {
        return this.getParentKey(item.key, this.props.system.groupCfg.groupTree);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value || '',
      autoExpandParent: true
    });
  };
    // 清空 .treeSelect 值
  onEmitEmpty = () => {
    this.treeSelect.focus();
    this.setState({ searchValue: '', expandedKeys: []});
  };
  onDragState = (e, n) => {
    if (typeof (n.props.eventKey) === 'number') {
      return false;
    }
    this.setState({
      toggleSrc: n.props.eventKey,
      allowedDrop: true
    });
  };

  onDropOnVideo = index => {
    if (this.state.allowedDrop) {
      console.log('////////////////////////');
      const VLC = this.state.VLC;
      VLC[index] = this.state.toggleSrc;
      this.setState({
        DropItem: index,
        VLC,
        allowedDrop: false
      });
      // setTimeout(() => {
      //   this.setState({
      //     allowedDrop: false,
      //     toggleSrc: ''
      //   });
      // }, 100);
    }
  };

  onVlcTogIconClick = flag => {
    if (flag === 1) {
      let changeFlag = flag;
      changeFlag++;
      this.setState({
        flag: changeFlag,
        vlcClassChange: styles.vlcActive,
        iconClassChange: styles.iconActive
      });
    } else {
      let changeFlag = flag;
      changeFlag--;
      this.setState({
        flag: changeFlag,
        vlcClassChange: '',
        iconClassChange: ''

      });
    }
  };
  onScreenTogIconClick = size => {
    size === 1 ? this.setState({screenSize: 4}) : this.setState({screenSize: 1});
  };
  getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.id === key)) {
          parentKey = `${node.id}`;
        } else if (this.getParentKey(key, node.children)) {
          parentKey = this.getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  parentClassName = id => {
    if (this.state.expandedKeys.indexOf(`${id}`) === -1) {
      return styles.treeNode;
    }
    return styles.treeNode_open;
  };
    // 生成树
  renderTreeNode = data => data.map(item => {
    const index = item.title.indexOf(this.state.searchValue);
    const beforeStr = item.title.substr(0, index);
    const afterStr = item.title.substr(index + this.state.searchValue.length);
    const title = index > -1 ? (
      <span>
        {beforeStr}
        <span style={{ color: '#f50' }}>{this.state.searchValue}</span>
        {afterStr}
      </span>
                ) : <span>{item.title}</span>;
    if (item.children) {
      return (
        <TreeNode key={item.id} selectable={false} title={<div><i className={this.parentClassName(item.id)} />{title}{'  '}{ `(${item.children.length})` }</div>}>
          {this.renderTreeNode(item.children)}
        </TreeNode>
      );
    } else if (item.cameras) {
      return (
        <TreeNode
          selectable={false} key={item.id} title={<div>
            <i className={this.parentClassName(item.id)} />{title}{'  '}{ `(${item.cameras.length})` }</div>}>
          {this.renderCameraNode(item.cameras)}
        </TreeNode>
      );
    }
    return <TreeNode key={item.id} title={<div><i className={styles.treeNode} />{title}</div>} />;
  });

  renderCameraNode = data => data.map(item => {
    const index = item.name.indexOf(this.state.searchValue);
    const beforeStr = item.name.substr(0, index);
    const afterStr = item.name.substr(index + this.state.searchValue.length);
    const title = index > -1 ? (
      <span>
        {beforeStr}
        <span style={{ color: '#f50' }}>{this.state.searchValue}</span>
        {afterStr}
      </span>
                ) : <span>{item.name}</span>;
    return <TreeNode key={item.playUrl} title={<div>{title}</div>} />;
  });
  renderVideos = size => {
    const videos = [];
    console.log('.........');
    if (size === 1) {
      return (<div key={0} className={styles.video_one} onMouseEnter={this.onDropOnVideo.bind(this, 0)}>
        <div className={`${styles.videoList} ${styles.dropVideo}`}>
          <VlcView vlcSrc={this.state.VLC[0]} id={1}/>
        </div>
      </div>);
    }
    for (let i = 0; i < size; i++) {
      videos.push(<div key={this.state.VLC[i]} className={styles.video_four} onMouseEnter={this.onDropOnVideo.bind(this, i)}>
        <div className={`${styles.videoList} ${styles.dropVideo}`}>
          <VlcView vlcSrc={this.state.VLC[i]} id={i + 1}/>
        </div>
      </div>);
    }
    return videos;
  };

  render() {
    return (
      <MayLayout location={this.props.location}>
        {/* 右边固定， 左边自适应布局， 故视频播放区和通过人脸区DOM结构反写 */}
        <div className={`${styles.cameraList} ${this.state.vlcClassChange}`}>
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
          <Tree
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            draggable={this.state.draggable}
            autoExpandParent={this.state.autoExpandParent}
            onDragStart={({event, node}) => { this.onDragState(event, node); }}
          >
            {this.renderTreeNode(this.props.system.groupCfg.groupTree)}
          </Tree>

        </div>

        <div className={`${styles.contentRight} ${this.state.flag === 2 ? styles.moveRight : ''}`}>
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
        <div className={`${styles.contentLeft} ${this.state.flag === 2 ? styles.moveRight : ''}`}>
          <div className={styles.videoContain}>
            <div
              className={`${styles.vlcTogIcon} ${this.state.iconClassChange}`}
              onClick={this.onVlcTogIconClick.bind(this, this.state.flag)}
              title="点击切换视频" />
            <div
              className={`${styles.toggleScreenIcon} ${this.state.screenSize === 1 ? styles.one2four : styles.four2one}`}
              onClick={this.onScreenTogIconClick.bind(this, this.state.screenSize)}
            />
            { this.renderVideos(this.state.screenSize)}

            {/* <div className={styles.video} onMouseEnter={this.onDropOnVideo.bind(this, 0)}>*/}
            {/* <div className={`${styles.videoList} ${styles.dropVideo}`}>*/}
            {/* <VlcView vlcSrc={this.state.VLC} id={1}/>*/}
            {/* </div>*/}
            {/* </div>*/}
            {/* <div className={styles.video} onMouseEnter={this.onDropOnVideo.bind(this, 1)}>*/}
            {/* <div className={`${styles.videoList} ${styles.dropVideo}`}>*/}
            {/* <VlcView vlcSrc="rtsp://admin:admin123@192.168.1.18" id={2}/>*/}
            {/* </div>*/}
            {/* </div>*/}
            {/* <div className={styles.video} onMouseEnter={this.onDropOnVideo.bind(this, 2)}>*/}
            {/* <div className={`${styles.videoList} ${styles.dropVideo}`}>*/}
            {/* <VlcView vlcSrc={'rtsp://admin:cf123456@192.168.1.78'} id={3}/>*/}
            {/* </div>*/}
            {/* </div>*/}
            {/* <div className={styles.video} onMouseEnter={this.onDropOnVideo.bind(this, 3)}>*/}
            {/* <div className={`${styles.videoList} ${styles.dropVideo}`} >*/}
            {/* <VlcView vlcSrc={'rtsp://admin:admin123@192.168.1.14'} id={4}/>*/}
            {/* </div>*/}
            {/* </div>*/}

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

function mapStateToProps({ basics, system }) {
  return { basics, system };
}

export default connect(mapStateToProps)(RealMonitor);
