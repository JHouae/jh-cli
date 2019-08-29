import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Form } from 'antd';
import { kManageAction } from 'conf/app.conf';
import PicturesWall from './PicturesWall';
// import styles from './StoreInfo.less';

const { TextArea } = Input;
const FormItem = Form.Item;

function validate(value) {
  if (value && value !== '') {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: null,
  };
}

const Index = ({ type, showItem, visible, handleOk, handleCancel }) => {
  const [name, setName] = useState(showItem ? showItem.name : '');
  const [years, setYears] = useState(showItem ? showItem.years : '');
  const [logo, setLogo] = useState(showItem ? showItem.logo : '');
  const [imgUrl, setImgUrl] = useState(showItem ? showItem.imgUrl : '');
  const [description, setDescription] = useState(showItem ? showItem.description : '');

  const handleModalOk = () => {
    
    const param = { name, years, logo, imgUrl, description };
    handleOk(param);
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

  return (
    <Modal
      title="店铺信息"
      visible={visible}
      onOk={handleModalOk}
      onCancel={handleCancel}
    >
      <Form layout="horizontal" {...formItemLayout}>
        <FormItem
          label="店铺名称："
          required
          validateStatus={validate(name).validateStatus}
          help={validate(name).errorMsg}
        >
          <Input
            value={name}
            readOnly={type === kManageAction.normal}
            onChange={e => setName(e.target.value)}
          />
        </FormItem>
        <FormItem
          label="店铺年限："
          required
          validateStatus={validate(years).validateStatus}
          help={validate(years).errorMsg}
        >
          <Input
            value={years}
            readOnly={type === kManageAction.normal}
            onChange={e => setYears(e.target.value)}
          />
        </FormItem>
        <FormItem
          label="店铺logo："
          required
          validateStatus={validate(logo).validateStatus}
          help={validate(logo).errorMsg}
        >
          <PicturesWall type={type} showImage={logo} onImageChange={img => setLogo(img)} />
        </FormItem>
        <FormItem
          label="图片地址："
          required
          validateStatus={validate(imgUrl).validateStatus}
          help={validate(imgUrl).errorMsg}
        >
          <PicturesWall type={type} showImage={imgUrl} onImageChange={img => setImgUrl(img)} />
        </FormItem>
        <FormItem
          label="店铺描述："
        >
          <TextArea
            style={{ width: 400 }}
            rows={5}
            value={description}
            readOnly={type === kManageAction.normal}
            onChange={e => setDescription(e.target.value)}
          />
        </FormItem>
      </Form>
    </Modal >
  );
};

Index.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default Index;
