/**
 * Created by Jason on 2018/1/11.
 */

import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './header.less';

class Header extends React.Component {
    render() {
        return (
                    <div className={styles.header}>
                        <div className={styles.logo}></div>
                        <div className={styles.user}>
                            {/* 用户中心需要抽成 有状态组件 TODO */}
                            <span>名字</span>
                        </div>
                    </div>
        );
    }
}

function mapStateToProps({ system }) {
    return { system };
}

export default connect(mapStateToProps)(Header);
