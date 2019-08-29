/**
 * type->number
 * 0 一级菜单
 * 1 二级菜单
 * 2 button
 * 3 列表操作
 * ...
 */
const menu = [
  {
    id: 1,
    name: '自定义模块',
    parentId: null,
    resKey: 'custom',
    type: 0,
    path: 'custom',
    icon: 'smile',
  },
  {
    id: 2,
    name: '店铺管理',
    parentId: null,
    resKey: 'store',
    type: 0,
    path: 'store',
    icon: 'shop',
  },
];

export default menu;
