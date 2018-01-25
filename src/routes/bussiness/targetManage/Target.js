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

  render() {
    return (
      <MayLayout location={this.props.location}>
        <div className={styles.container}>
          <Tabs type="card">
            <TabPane tab="目标人员配置" key="1" style={{ height: '100%' }}>
              <TargetPerson />
            </TabPane>
            <TabPane tab="目标分组配置" key="2" style={{ height: '100%' }}>
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
