import React from 'react';
import { Icon } from 'antd';
import { kAppName } from '../../conf/app.conf';
import styles from './index.less';

const Index = props => (
  <div className={styles.header}>
    <div className={styles.logo} key="logo">
      <span>{kAppName}</span>
      <Icon
        className={styles.trigger}
        type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={props.collapseClickHandle}
      />
    </div>
  </div>
);

export default Index;
