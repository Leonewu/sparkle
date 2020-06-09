# 打包方案

- [ ] 生成 js 主文件入口
- [ ] 生成 scss 主文件入口
- [ ] 生成 css/less 依赖管理目录
- [ ] 生成公共样式 style 目录
- [ ] 打包出更符合 babel-plugin-import 的目录

## 为什么要这样做

- 为了满足全量加载打包的时候必须打包出入口 js 文件，由于 css 文件会十分庞大，如果用 style-loader 处理，会导致 js 文件很庞大(ps：这里可以用 miniCssExtarctPlugin.loader 代替 style-loader 处理，将入口 css 提取出单独的文件)，所以最好是打包出单独的 css 入口文件

- 更加自动化一点，只要做好规范，js 入口文件和 css 入口文件的代码都是有规律的，可以通过解析目录生成文件
- 开发环境生成的入口 js 文件会引入 scss 样式，打包组件库的时候入口 js 文件不会引入样式，也就是说有两个入口文件，一个用于开发，一个用于打包组件库
- 那么，公共的 scss 文件如何让 webpack 打包呢，难道每个组件的 scss 都去引入公共的 scss 文件

- 公共 scss 冗余了，每个组件都会依赖公共 scss，为了兼顾按需加载，如果每个组件都引用的话，每个组件打包出来的 scss 就会包含公共 scss 模块，造成打包出来的 css 文件大还存在冗余，这是最需要改善的地方

## 最终方案打包出来的目录

```
lib
|----- index.js(无css的入口文件)
|----- index.css(压缩后的css入口文件)
|----- index.scss(sass入口源文件，主题定制需要引入这个文件)
|----- starity-ui.js(引入css的入口文件，用style-loader处理，用于script标签引入)
|----- starity-ui.min.js(引入css并且压缩后的入口文件，用style-loader处理，用于script标签引入)
|----- style(放置公共的scss和css依赖，button/style/*.js的依赖都放在这里面)
|----- |------ common.scss(源文件)
|----- |------ common.css(已经压缩)
|----- button
|----- |------ index.js(组件入口)
|----- |------ index.scss(组件scss源文件，貌似不需要)
|----- |------ style(管理less和css依赖的js文件目录)
|----- |------ |------ css.js(管理css依赖，用于按需加载引入)
|----- |------ |------ scss.js(管理scss依赖，用于主题定制并且按需加载)
```

源码中，不显式引入样式文件

## 简单版方案

简单版是开发组件的时候，在组件内引入 scss 文件，之后都交给 webpack 处理  
webpack 的思路很简单，就是递归依赖，但是对于按需加载这种需求，仅仅使用 webpack 是满足不了的，会出现许多冗余的 css，解决办法就是不引入 css，用户引入 css 的时候通过 babel-plugin-import 自动引入，这样就用不了 webpack 了

```
lib
|----- index.js(有css的入口文件)
|----- button(组件按需加载引入路径)
|------|----- index.js(组件入口)
|------|----- index.css(组件的css)
```

## 实现思路

### 自己手写编译过程

fs-extra + babel.transform + sass.transform + vue-template-compiler ，有点麻烦，特别是 vue 文件的处理，能不用就不用

### 手写 webpack plugin，结合 webpack 处理

1. webpack 的基本概念就是 entry 和 module，如果使用 webpack 编译，那肯定要在 entry 加入 css denpendencies（css.js 和 scss.js），这是比较符合 webpack 的做法
2. 背景: webpack 的 entry 不支持文本字符串，只支持路径写法，所以只能生成文件再添加 entry
3. 通过 compiler.hooks.entryOption （或者其他钩子），在开始编译前生成 css denpendencies（css.js 和 scss.js），添加到 entry 中，交给 webpack 编译，编译完成后，将文件删除  
很明显不可取，这样用不用 webpack plugin 都一样，另外如果编译时间长，那文件目录会一直存在这些 css denpendencies 文件，太恶心了

### 使用 gulp

比起手写，可以使用 gulp 的插件，如 babel，scss 等，缺点就是要装一堆插件，vue 周边插件比较少，其他跟手写并没有太大的区别

## vue-loader

vue-loader 首先将 vue 文件转成

```
import { render, staticRenderFns } from "./App.vue?vue&type=template&id=7ba5bd90&"
import script from "./App.vue?vue&type=script&lang=js&"
export * from "./App.vue?vue&type=script&lang=js&"
import style0 from "./App.vue?vue&type=style&index=0&lang=css&"


/* normalize component */
import normalizer from "!../node_modules/vue-loader/lib/runtime/componentNormalizer.js"
var component = normalizer(
  script,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (module.hot) {
  var api = require("/home/leone/leone/demo/node_modules/vue-hot-reload-api/dist/index.js")
  api.install(require('vue'))
  if (api.compatible) {
    module.hot.accept()
    if (!api.isRecorded('7ba5bd90')) {
      api.createRecord('7ba5bd90', component.options)
    } else {
      api.reload('7ba5bd90', component.options)
    }
    module.hot.accept("./App.vue?vue&type=template&id=7ba5bd90&", function () {
      api.rerender('7ba5bd90', {
        render: render,
        staticRenderFns: staticRenderFns
      })
    })
  }
}
component.options.__file = "src/App.vue"
export default component.exports
```

然后交给 webpack 去引入，然后又进来 vue-loader 去解析

## 参考

[编写一个webpack插件](https://webpack.docschina.org/contribute/writing-a-plugin/#compiler-%E5%92%8C-compilation)
[webpack-plugin-get-chunk-entries](https://github.com/johuder33/webpack-plugin-get-chunk-entries)
[React组件库打包总结](https://juejin.im/post/5ebcf12df265da7bc55df460#heading-24)
[vue-loader&vue-template-compiler详解](https://zhuanlan.zhihu.com/p/114239056)
