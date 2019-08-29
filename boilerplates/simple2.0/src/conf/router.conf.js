import { createElement } from 'react';
import dynamic from 'dva/dynamic';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

const getRouterData = (app) => {
  const dynamicWrapper = (models, component) => dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });

  const routerConfig = {
    '/': {
      component: dynamicWrapper(
        ['routes/BasicLayout/model/basicLayoutModel'],
        () => import(/* webpackChunkName: "basicLayout" */'../routes/BasicLayout/view/index'),
      ),
    },
    '/custom': {
      component: dynamicWrapper(
        [],
        () => import(/* webpackChunkName: "basicLayout" */'../routes/CustomModule/view'),
      ),
    },
    '/store': {
      component: dynamicWrapper(
        ['routes/Store/model/index'],
        () => import(/* webpackChunkName: "basicLayout" */'../routes/Store/view'),
      ),
    },
  };

  const routerData = {};
  Object.keys(routerConfig).forEach((path) => {
    let router = routerConfig[path];
    router = {
      ...router,
      name: router.name,
    };
    routerData[path] = router;
  });
  return routerData;
};

export default getRouterData;
