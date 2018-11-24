# RbUtility

> 软邦开发团队工具集

## 使用

yarn add rb-utility

## 编译

工具集使用了`moment.js`，在移动端上编译后体积过大

### webpack

需在`plugins`添加以下配置减少`moment.js`的体积

```js
new webpack.ContextReplacementPlugin(
  /moment[\\\/]locale$/,
  /^\.\/(zh-cn|en-gb)$/
);
```
