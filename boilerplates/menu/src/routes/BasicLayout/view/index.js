import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Layout } from 'antd';

import Header from '../../../components/Header';
import SlideMenu from '../../../components/SlideMenu';

import styles from './index.less';

const { Content } = Layout;


class IndexPage extends Component {
  state = {
    collapsed: false,
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) { // eslint-disable-line

  }

  render() {
    const { routerData, location, menuList } = this.props;
    const { collapsed } = this.state;
    return (
      <div>
        <Layout>
          <Header
            collapsed={collapsed}
            collapseClickHandle={() => this.setState({ collapsed: !collapsed })}
          />

          <Layout>
            {
              menuList && menuList.length > 0
                ? <SlideMenu
                  menuData={menuList}
                  location={location}
                  collapsed={collapsed}
                /> : null
            }
            <Content className={styles.content}>
              <Switch>
                {
                  Object.keys(routerData).filter(i => i !== '/').map(item => <Route path={item} component={routerData[item].component} key={item} />)
                }
                <Redirect exact path="/" to="/custom" />
              </Switch>
            </Content>
          </Layout>

        </Layout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    menuList: state.basicLayoutModel.menuList,
  };
}

export default connect(mapStateToProps)(IndexPage);
