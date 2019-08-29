import { kAuthType } from './app.conf';

export function formatter(data, parentPath = '/') {
  return data.map((item) => {
    let { path } = item;
    path = parentPath + item.path;
    const result = {
      ...item,
      path,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`);
    }
    return result;
  });
}

export function formatMenuList(authList) {
  if (!authList) return [];
  const menuData = [];
  const tempAuthList = JSON.parse(JSON.stringify(authList));
  for (let i = 0; i < tempAuthList.length; i++) {
    const item = tempAuthList[i];
    if (parseInt(item.type, 0) === kAuthType.kFirstLevelMenu) {
      const children = [];
      for (let k = 0; k < tempAuthList.length; k++) {
        const menuItem = tempAuthList[k];
        // menuItem是2级菜单且根据parentId查询子菜单
        if (parseInt(menuItem.type, 0) === kAuthType.kSecondLevelMenu && item.id === menuItem.parentId) {
          children.push(menuItem);
        }
      }
      menuData.push({ ...item, children });
    }
  }
  return formatter(menuData);
}
