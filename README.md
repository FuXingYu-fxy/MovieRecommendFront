# BUG 清单
* Naive-ui, `menu`组件, 如果存在嵌套路由，将父路由渲染为`router-link`时, 点击不会匹配空路由, **空路由即默认路由**见 `@/hooks/index.ts`中的`traverseRoute`函数
* `src/store/modules/permission.ts` 里访问 routes 存在暂存性死区, 应该是存在循环导入导致的, 但是找不出在哪里循环导入了, 报错: Cannot access 'routes' before initialization. 而且在`src/main.ts`中`store`比`router`先导入, 但是根据输出显示, 最先导入的是`router`。现在严重怀疑`vite`自动导入的机制
