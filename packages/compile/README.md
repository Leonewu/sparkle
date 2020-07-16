# 打包方案

- 生成 js 主文件入口 (index.js)
- 生成 scss 和 css 主文件入口 (index.scss,index.css)
- 生成 css/scss 依赖管理目录 (css.js,scss.js)

## 为什么要这样做

- 为了满足全量加载打包的时候必须打包出入口 js 文件，由于 css 文件会十分庞大，如果用 style-loader 处理，会导致 js 文件很庞大(ps：这里可以用 miniCssExtarctPlugin.loader 代替 style-loader 处理，将入口 css 提取出单独的文件)，所以最好是打包出单独的 css 入口文件

- 更加自动化一点，只要做好规范，js 入口文件和 css 入口文件的代码都是有规律的，可以通过解析目录生成文件
- 开发环境生成的入口 js 文件会引入 scss 样式，打包组件库的时候入口 js 文件不会引入样式，也就是说有两个入口文件，一个用于开发，一个用于打包组件库
- 那么，公共的 scss 文件如何让 webpack 打包呢，难道每个组件的 scss 都去引入公共的 scss 文件

- 公共 scss 冗余了，每个组件都会依赖公共 scss，为了兼顾按需加载，如果每个组件都引用的话，每个组件打包出来的 scss 就会包含公共 scss 模块，造成打包出来的 css 文件大还存在冗余

- 主题定制。假设一个场景，用户需求是按需加载 + 主题定制，如果在每个组件入口都引入了 css 文件，那么用户将无法实现主题定制，因为引入的是已经编译好了的 css，无法通过修改 sass/less 变量去实现主题定制；如果每个组件入口引入 sass/less 文件，用户能够实现主题定制，也能够实现按需加载，前提是用户需要装 sass/less loader。但是如果用户不需要主题定制，那他也需要装 sass/less loader，造成了额外的使用成本。所以，最好的方法是让用户自己引入样式文件（sass/less/css），这样不管他需不需要主题定制，都可以零成本地去实现

## 增加的开发成本

- 自己要组建内部依赖关系，通过依赖关系，管理模块之间的样式依赖

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

### 手写 webpack plugin，结合 webpack 处理

1. webpack 的基本概念就是 entry 和 module，如果使用 webpack 编译，那肯定要在 entry 加入 css denpendencies（css.js 和 scss.js），这是比较符合 webpack 的做法
2. 背景: webpack 的 entry 不支持文本字符串，只支持路径写法，所以只能生成文件再添加 entry
3. 通过 compiler.hooks.entryOption （或者其他钩子），在开始编译前生成 css denpendencies（css.js 和 scss.js），添加到 entry 中，交给 webpack 编译，编译完成后，将文件删除  
很明显不可取，这样用不用 webpack plugin 都一样，另外如果编译时间长，那文件目录会一直存在这些 css denpendencies 文件，太恶心了

### 使用 gulp

比起手写，可以使用 gulp 的插件，如 babel，scss 等，缺点就是要装一堆插件，试了一遍，解析 vue 文件甚至比用 fs 还麻烦

### 用 fs 手写

fs-extra + babel.transform + sass.transform + vue-template-compiler ，有点麻烦，特别是 vue 文件的处理，能不用就不用

## vue-loader & vueLoaderPlugin

### vueLoaderPlugin 的准备工作

- 获取项目 webpack 配置的 rules 项，然后复制 rules，添加上对 ?vue&lang=xx...query 参数的文件的路径解析
- 为 vue文件配置一个公共的 loader(lib/pitchr.js)
- 将 [pitcher, ...clonedRules, ...rules] 作为 webapck 新的 rules

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
