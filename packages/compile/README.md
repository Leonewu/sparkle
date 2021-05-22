# 打包方案

## 方案对比

- element-ui 方案：webpack
- nutui 方案：webpack
- vant 方案：手写打包
- antd 方案：手写打包，gulp
- element-plus 方案：rollup

webpack 的缺点很明显：会打包出 webpack 的 require 运行时  
手写的成本会比较高：但是你能知道具体的某个打包阶段发生的事情，更加地自由，而且可以用 js 去管理 css 和 scss 依赖，这样可以绝对地减少 css 的冗余。一般来说，组件库需要打包出 css 和 scss 文件，如果 a 组件引入了 b 组件，那么 a 组件编译出来的 css 文件是肯定会包含 b 组件的 css 文件的，如果项目中同时引用了 a 和 b，这时候就出现了 css 样式重复了  
rollup 是两者折中的一个方案，不用手写编译那么麻烦，也没有 webpack 运行时代码，除了 css 样式可能存在着一丁点的冗余，没有其他问题  
因此，手写编译才是最终的解决方案

## 最终方案

### 编译

- 定义好目录规范，方便目录解析
- 组件不引入样式文件 (因为始终都是要分出来的，所以干脆就不引入)
- 生成 js 主文件入口 (index.js) 和 css 主文件入口
- 生成 scss 和 css 主文件入口 (index.scss,index.css)
- 生成 css/scss 依赖管理目录 (css.js,scss.js)
- 生成每个组件的 js 和 css/scss 样式文件
- css 统一使用 px，需要 rem 的话由外部去 px2rem 转换

#### 为什么不要在组件内引入样式文件

为了主题定制，如果组件内引入样式，编译出来的组件文件中就包含了样式代码，那就无法时间主题定制。  
所以，就算在组件内引入样式代码，编译的时候也需要 extract 出来

## 为什么要这样做

- 为了满足全量加载打包的时候必须打包出入口 js 文件，由于 css 文件会十分庞大，如果用 style-loader 处理，会导致 js 文件很庞大(ps：这里可以用 miniCssExtarctPlugin.loader 代替 style-loader 处理，将入口 css 提取出单独的文件)，所以最好是打包出单独的 css 入口文件

- 更加自动化一点，只要做好规范，js 入口文件和 css 入口文件的代码都是有规律的，可以通过解析目录生成文件
- 开发环境生成的入口 js 文件会引入 scss 样式，打包组件库的时候入口 js 文件不会引入样式，也就是说有两个入口文件，一个用于开发，一个用于打包组件库
- 那么，公共的 scss 文件如何让 webpack 打包呢，难道每个组件的 scss 都去引入公共的 scss 文件

- 公共 scss 冗余了，每个组件都会依赖公共 scss，为了兼顾按需加载，如果每个组件都引用的话，每个组件打包出来的 scss 就会包含公共 scss 模块，造成打包出来的 css 文件大还存在冗余

- 主题定制。假设一个场景，用户需求是按需加载 + 主题定制，如果在每个组件入口都引入了 css 文件，那么用户将无法实现主题定制，因为引入的是已经编译好了的 css，无法通过修改 sass/less 变量去实现主题定制；如果每个组件入口引入 sass/less 文件，用户能够实现主题定制，也能够实现按需加载，前提是用户需要装 sass/less loader。但是如果用户不需要主题定制，那他也需要装 sass/less loader，造成了额外的使用成本。所以，最好的方法是让用户自己引入样式文件（sass/less/css），这样不管他需不需要主题定制，都可以零成本地去实现

## 增加的开发成本

- 自己要分析组件间的依赖关系，包括 css/scss 依赖，生成 css/scss 依赖管理文件

## 最终方案打包出来的目录

打包产物有es（基于 esModule 规范的 es5 代码目录），lib（基于 commonJs 规范的 es5 代码目录），umd文件

```
lib(基于 commonjs 规范的 es5 代码)
|----- index.js(无css的入口文件)
|----- index.css(压缩后的css入口文件)
|----- index.scss(sass入口源文件，主题定制需要引入这个文件)
|----- style(放置公共的scss和css依赖，button/style/*.js的依赖都放在这里面)
|----- |------ common.scss(源文件)
|----- |------ common.css(已经压缩)
|----- button
|----- |------ index.js(组件入口)
|----- |------ index.scss(组件scss源文件)
|----- |------ index.css(组件css源文件)
|----- |------ style(管理less和css依赖的js文件目录)
|----- |------ |------ css.js(管理css依赖，用于按需加载引入)
|----- |------ |------ scss.js(管理scss依赖，用于主题定制并且按需加载)
```

## vue-loader & vueLoaderPlugin

### vueLoaderPlugin 的准备工作

- 获取项目 webpack 配置的 rules 项，然后复制 rules，添加上对 ?vue&lang=xx...query 参数的文件的路径解析
- 为 vue文件配置一个公共的 loader(lib/pitcher.js)
- 将 [pitcher, ...clonedRules, ...rules] 作为 webapack 新的 rules

### 大致的解析路线

1. vueLoaderPlugin(plugin-webpack4.js) 生成 sfc block 规则，规则对应的 loader 为 pitch-loader(vue-loader/lib/picher.js)
2. 开始编译，根据用户配置的 rules，会首先执行到 vue-loader/index.js，将 sfc 转换成带 query 的 import，并且返回给 webpack 处理
3. 由于上面的 vue-loader 是最左边的 loader， 所以返回的 code 会被 webpack 当成 js 代码块处理，webpack 开始解析代码块
4. 此时代码块的 import 是带有 query 的，所以会进入到第一步配置的 pitcher-loader(vue-loader/lib/pitcher.js)
5. pitcher(vue-loader/lib/pitcher.js) 中定义了 pitch，并且在 pitch 返回了字符串，所以执行到 pitch 后，会跳过后面的 loader，这样就防止了再次调用了 vue-loader。另外，pitcher 中利用 loaderUtils 生成内联 loader，剔除了 pitcher 自身，并且加上了 -! 前缀，表示禁用所有已配置的 preLoader 和 loader，接着将带有内联 loader 的 import 语句返回给 webpack
6. webpack 解析这个代码块，根据内联的规则，开始执行 vue-loader
7. vue-loader/index.js 调用 select.js 的 selectBlock()方法， 间接调用 loaderContext.callback() 传给其他 loader 解析
8. loader 解析结束，最终的输出被引入，然后通过 /lib/runtime/componentNormalizer.js 输出一个对象

### 代码转换过程  

转换前：

```
import App from "./App.vue"
```

第一次调用 vue-loader 转换后：

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

可以看到带上了 query  
调用 pitch-loader 转换后：

template block 输出为

```
export * from "-!../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"aa9ab318-vue-loader-template\"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib/index.js??vue-loader-options!./App.vue?vue&type=template&id=7ba5bd90&"
```

script block 输出为

```
import mod from "-!../node_modules/cache-loader/dist/cjs.js??ref--12-0!../node_modules/babel-loader/lib/index.js!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib/index.js??vue-loader-options!./App.vue?vue&type=script&lang=js&";

export default mod; export * from "-!../node_modules/cache-loader/dist/cjs.js??ref--12-0!../node_modules/babel-loader/lib/index.js!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib/index.js??vue-loader-options!./App.vue?vue&type=script&lang=js&"
```

一个 vue 文件编译会被编译成一个对象，根据 vue-loader/index.js 生成的代码块中，可以看到调用了 /vue-loader/lib/runtime/componentNormalizer.js 中的 normallize 方法，可以看到这个方法并没有很复杂，最终编译出来的文件大概是这样的

```
// 这里的 vueProps 指的是 vue 文件的配置，如 name, data, computed, methods
import ...
export default {
  ...vueProps,
  render,
  staticRenderFns,
  _compiled: true,
  __file: 'src/App.vue',
  beforeCreate, // 仅在 hot-reload 用到
  beforeDestroy // 仅在 hot-reload 用到
}
```

### 附录

> webpack 文档中对于 loader 顺序的解释（Complex Usage）  
>
> - The last loader, called first, will be passed the contents of the raw resource.  
> - The first loader, called last, is expected to return JavaScript and an optional source map.  
> - The loaders in between will be executed with the result(s) of the previous loader in the chain.
>
> webpack 通过为内联 import 语句添加前缀，可以覆盖 配置 中的所有 loader, preLoader 和 postLoader
>
> - 使用 ! 前缀，将禁用所有已配置的 normal loader(普通 loader)  
> `import Styles from '!style-loader!css-loader?modules!./styles.css';`
> - 使用 !! 前缀，将禁用所有已配置的 loader（preLoader, loader, postLoader）
> `import Styles from '!!style-loader!css-loader?modules!./styles.css';`
> - 使用 -! 前缀，将禁用所有已配置的 preLoader 和 loader，但是不禁用 postLoaders  
> `import Styles from '-!style-loader!css-loader?modules!./styles.css';`

## 参考

- [编写一个webpack插件](https://webpack.docschina.org/contribute/writing-a-plugin/#compiler-%E5%92%8C-compilation)
- [webpack-plugin-get-chunk-entries](https://github.com/johuder33/webpack-plugin-get-chunk-entries)
- [vue-loader&vue-template-compiler详解](https://zhuanlan.zhihu.com/p/114239056)
- [vue-loader工作原理](https://cloud.tencent.com/developer/article/1591476)
- [Vue Beyond Vue Loader VueConf CN 2019](https://www.youtube.com/watch?v=reNHZrUGquM)
- [Webpack: write a loader](https://webpack.js.org/contribute/writing-a-loader/)
- [从vue-loader源码分析CSS Scoped的实现](https://juejin.im/post/5d8627355188253f3a70c22c)
- [@vue/component-compiler-utils](https://github.com/vuejs/component-compiler-utils)
- [Node.js: fs-extra](https://github.com/jprichardson/node-fs-extra)
- [@babel/core](https://babeljs.io/docs/en/babel-core)
- [Sass: JavaScript API](https://sass-lang.com/documentation/js-api)
