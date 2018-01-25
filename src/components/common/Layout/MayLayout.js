/**
 * Created by Ethan on 2018/1/10.
 */
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import pathToRegexp from 'path-to-regexp';

import styles from './header.less';
import Header from './Header';

class MayLayout extends React.Component {

  componentWillMount() {
    this.props.dispatch({
      type: 'navigation/getSubModule'
    });
  }

  navItemClass = link => {
    const match = pathToRegexp('/:foo?/:bar?').exec(this.props.location.pathname);
    if (match && match[1]) {
      if (match[1] == link) {
        return `${styles.mask} ${styles.maskActive}`;
      }
      return styles.mask;
    }
  };
  renderNavItem = () => {
    if (this.props.navigation.navItem && this.props.navigation.navItem.length > 0) {
      console.log(this.props.navigation.navItem);
      return this.props.navigation.navItem.map(value =>
        <li className={styles.navItem} key={value.moduleId}>
          <Link className={styles.navLink} to={`/${value.url}`}>
            <div className={this.navItemClass(value.url)}>
              <div className={styles.navIcon} />
              <div className={styles.text}>{ value.moduleName }</div>
            </div>
          </Link>
        </li>
          );
    }
    return false;
  };

  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <div className={styles.maylayoutContainer}>
          <Header />
          <div className={styles.wrap}>
            <ul>
              <li className={styles.navItem}>
                <Link className={styles.navLink} to="/">
                  <div className={this.navItemClass('/')}>
                    <div className={styles.navIcon} />
                    <div className={styles.text}>导航页面</div>
                  </div>
                </Link>
              </li>
              { this.renderNavItem() }
            </ul>
          </div>
          <div className={styles.child}>
            {this.props.children}
          </div>
        </div>
      </LocaleProvider>

    );
  }
}

function mapStateToProps({ navigation }) {
  return { navigation };
}

export default connect(mapStateToProps)(MayLayout);
