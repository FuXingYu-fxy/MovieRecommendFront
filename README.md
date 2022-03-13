# BUG 清单
* Naive-ui, `menu`组件, 如果存在嵌套路由，将父路由渲染为`router-link`时, 点击不会匹配空路由, **空路由即默认路由**见 `@/hooks/index.ts`中的`traverseRoute`函数
