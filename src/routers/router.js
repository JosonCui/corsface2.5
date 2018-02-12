import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from '../routes/IndexPage/IndexPage';
import NavigationPage from '../routes/navigation/IndexPage';

import UserCfg from '../routes/system/userConfig/UserConfig';
import RoleCfg from '../routes/system/roleConfig/RoleConfig';
import GroupCfg from '../routes/system/groupConfig/GroupConfig';
import PowerCfg from '../routes/system/powerConfig/PowerConfig';

import RealMonitor from '../routes/basics/realMonitor/RealMonitor';
import HistoryPass from '../routes/basics/historyPass/HistoryPass';
import HistoryPolice from '../routes/basics/historyPolice/HistoryPolice';
import RealPolice from '../routes/basics/realPolice/RealPolice';

import Device from '../routes/bussiness/device/Device';
import Target from '../routes/bussiness/targetManage/Target';
import Rule from '../routes/bussiness/rule/Rule';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <div style={{height: '100%'}}>
        <Route exact path="/" component={IndexPage}/>
        <Route exact path="/nav" component={NavigationPage}/>

        {/* 系统管理 */}
        <Route exact path="/userCfg" component={UserCfg}/>
        <Route exact path="/roleCfg" component={RoleCfg}/>
        <Route exact path="/groupCfg" component={GroupCfg}/>
        <Route exact path="/powerCfg" component={PowerCfg}/>
        {/* 基础功能 TODO*/}
        <Route exact path="/realMonitoring" component={RealMonitor}/>
        <Route exact path="/historyPass" component={HistoryPass}/>
        <Route exact path="/historyPolice" component={HistoryPolice}/>
        <Route exact path="/realPolice" component={RealPolice}/>
        {/* 扩展功能 TODO*/}
        <Route exact path="/imgRetrieve" component={HistoryPass}/>
        <Route exact path="/faceCollection" component={HistoryPass}/>
        <Route exact path="/statistics" component={HistoryPolice}/>
        {/* 业务配置 */}
        <Route exact path="/device" component={Device}/>
        <Route exact path="/target" component={Target}/>
        <Route exact path="/rule" component={Rule}/>
        {/* 个人中心 TODO*/}
        <Route exact path="/personalEdit" component={HistoryPass}/>
        <Route exact path="/logRecord" component={HistoryPolice}/>
      </div>

    </Router>
  );
}

export default RouterConfig;
