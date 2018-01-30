/**
 * Created by Jason on 2018/1/16.
 */
import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';

import styles from './Target.less';
import MayLayout from '../../../components/common/Layout/MayLayout';
import TargetPerson from './TargetPerson';
import TargetGroup from './TargetGroup';

const TabPane = Tabs.TabPane;

class Target extends React.Component {
  initState = () => {
    const poiPerson = this.props.bussiness.poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          getPoiListParams: {
            pageSize: 10,
            pageNo: 1,
            name: '',
            gender: '',
            identityCard: '',
            orgunitId: '',
            groupId: '',
            threshold: ''
          },
          poiPersonList: [],
          poiPersonPage: {}
        }
      }
    });
  };
  onTabsClick = v => {
    this.initState();
    switch (v) {
      case 'person':
        this.props.dispatch({
          type: 'bussiness/getPoiList'
        });
        break;
      case 'group':
        console.log('group');
        break;
    }
  };
  render() {
    return (
      <MayLayout location={this.props.location}>
        <div className={styles.container}>
          <Tabs type="card" onTabClick={this.onTabsClick}>
            <TabPane tab="目标人员配置" key="person" style={{ height: '100%' }}>
              <TargetPerson />
            </TabPane>
            <TabPane tab="目标分组配置" key="group" style={{ height: '100%' }}>
              <TargetGroup />
            </TabPane>
          </Tabs>
        </div>
      </MayLayout>
    );
  }
}

function mapStateToProps({ bussiness }) {
  return { bussiness };
}

export default connect(mapStateToProps)(Target);
