
import { post } from '../../../utils/request';

const api = {
  customShopList: '/customShop/list',
  addShop: '/customShop/add',
  updateShop: '/customShop/update',
  deleteShop: '/customShop/del',
};

function customShopList(params) {
  return post(api.customShopList, params);
}
function addShop(params) {
  return post(api.addShop, params);
}
function updateShop(params) {
  return post(api.updateShop, params);
}
function deleteShop(params) {
  return post(api.deleteShop, params);
}

export {
  customShopList,
  addShop,
  updateShop,
  deleteShop,
};
