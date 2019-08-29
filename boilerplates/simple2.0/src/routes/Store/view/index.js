import React, { Component } from 'react';
import { Table, Input, Button, Divider } from 'antd';
import { connect } from 'dva';
import { kManageAction } from 'conf/app.conf';
import StoreInfo from '../components/StoreInfo';
import styles from './index.less';

import data from '../model/mock';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '店铺名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '店铺年限',
        dataIndex: 'years',
        key: 'years',
      },
      {
        title: '店铺logo',
        dataIndex: 'logo',
        key: 'logo',
        render: text => <img src={text} alt="" style={{ height: 100, width: 'auto' }} />,
      },
      {
        title: '图片地址',
        dataIndex: 'imgUrl',
        key: 'imgUrl',
        render: text => <img src={text} alt="" style={{ height: 100, width: 'auto' }} />,
      },
      {
        title: '店铺描述',
        dataIndex: 'description',
        key: 'description',
        width: '20%',
        render: text => <div style={{ height: 100, width: 'auto', overflow: 'hidden' }}>{text}</div>,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                this.setState({ storeInfoModal: true, showItem: record, showItemType: kManageAction.normal });
              }}
            >查看
            </a>
            <Divider type="vertical" />
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                this.setState({ storeInfoModal: true, showItem: record, showItemType: kManageAction.edit });
              }}
            >编辑
            </a>
            <Divider type="vertical" />
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                this.deleteShop([record.id]);
              }}
            >删除
            </a>
          </span>
        ),
      },
    ];
  }
  state = {
    filterName: '',
    showItem: null,
    showItemType: kManageAction.normal,
    selectedRowKeys: [],
    storeInfoModal: false,
  }
  componentDidMount() {
    this.fetchData(1, this.props.pageSize);
  }
  onSelectChange = (selectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  storeModalHandleOk = (param) => {
    const { showItemType, showItem } = this.state;
    if (showItemType === kManageAction.edit) {
      this.props.dispatch({
        type: 'store/updateShop',
        payload: { ...param, id: showItem.id },
      });
    } else if (showItemType === kManageAction.add) {
      this.props.dispatch({
        type: 'store/addShop',
        payload: param,
      });
    }
  }
  fetchData = (pageNow, pageSize) => {
    const param = {
      name: this.state.filterName,
      pageNow,
      pageSize,
    };
    this.props.dispatch({
      type: 'store/customShopList',
      payload: param,
    });
  }
  addShopClick = () => {
    this.setState({ storeInfoModal: true, showItem: null, showItemType: kManageAction.add });
  }
  batchDelete = () => {
    this.deleteShop(this.state.selectedRowKeys);
  }
  deleteShop(ids) {
    this.props.dispatch({
      type: 'store/deleteShop',
      payload: ids,
    });
  }
  render() {
    const { selectedRowKeys, filterName } = this.state;
    const { shopList, pageNow, pageSize, totalCount } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: pageNow,
      pageSize,
      total: totalCount,
      showTotal: total => `共${total}条`,
      onChange: (page, size) => this.fetchData(page, size),
      onShowSizeChange: (current, size) => this.fetchData(current, size),
    };
    return (
      <div className={styles.container}>
        <div className={styles.filterContainer}>
          <div className={styles.filterItem}><span>店铺名称：</span><Input value={filterName} onChange={e => this.setState({ filterName: e.target.value })} /></div>
        </div>
        <div className={styles.actionContainer}>
          <div className={styles.actionItem}><Button type="primary" onClick={() => this.fetchData(1, pageSize)}>查询</Button></div>
          <div className={styles.actionItem}><Button type="primary" onClick={() => this.addShopClick()}>新增</Button></div>
          <div className={styles.actionItem}><Button type="primary" onClick={() => this.batchDelete()}>批量删除</Button></div>
        </div>
        <Table
          rowKey="id"
          dataSource={shopList}
          columns={this.columns}
          size="middile"
          rowSelection={rowSelection}
          pagination={paginationProps}
        />
        {
          this.state.storeInfoModal && (
            <StoreInfo
              type={this.state.showItemType}
              showItem={this.state.showItem}
              visible={this.state.storeInfoModal}
              handleOk={() => this.storeModalHandleOk()}
              handleCancel={() => this.setState({ storeInfoModal: false })}
            />
          )
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    shopList: state.store.shopList,
    pageNow: state.store.pageNow,
    pageSize: state.store.pageSize,
    totalCount: state.store.totalCount,
  };
}

export default connect(mapStateToProps)(IndexPage);
