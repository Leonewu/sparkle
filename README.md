
#

![vue](https://img.shields.io/badge/vue-2.x-4fc08d.svg?colorA=2c3e50&style=flat-square)

## 想法

1. 同时支持按需引入（不重要）/后编译（重要)
2. 单元测试
3. travis ci
4. 全局样式，不用 scoped，module，方便外部覆盖
5. 版本管理 semver 规范
6. 兼容 Android4.0+， IOS10+
7. 使用 rem，类名遵循 BEM
8. eslint，babel，styleLint， commit lint
9. 制定文档模板，文档生成 vuepress?
10. ts，vue3.0?
11. 构建工具 rollup 或者 webpack?先选择 webpack
12. css 压缩（OptimizeCssAssetsWebpackPlugin），cssnano
13. 全局公共 css 打包，配合 babel-plugin-component 可以自动引入公共css
14. 对于可能公用的第三方依赖包，如何管理？

-[x] 基本框架搭建
-[] css压缩,去重，cssnano，OptimizeCssAssetsWebpackPlugin
-[x] eslint,git hooks
-[] prettier 和 eslint-plugin-vue 的 recommended 存在无法覆盖的冲突比较多，暂时先移除
-[x] stylint (lint-staged scss,css)
-[x] babel，验证是否根据 browserlist 正确转码
-[] devserver,sourceMap
-[] files-loader,svg
-[x] 按需加载，miniCssExtractPlugin,去掉 style-loader，多入口,并测试引入后打包，并且验证引入之后打包的体积
-[] 单元测试
-[] 后编译，直接引入 src 目录下的源码，并验证
-[] 命令生成模板
-[] 可选支持 rem，不转 px 就 ok 了
-[] 文档自动化，支持搜索,组件预览,代码片段展示,bisheng（好像需要手写一部分）,vue-styleguidist(方便，但是不好看，没主题)，vuepress（考虑中）,vuese（嗯...）,都没有移动端的预览窗口，最后选择研究一下有赞的做法
-[] ci
-[] rollup 导出 es module，并且配置 package.json 的 files 选项， treeshaking
-[] ts
-[x] peerDependencies ^开头
-[] logo
-[] 换肤 通过暴露出 sass 的主题入口，让用户自行覆盖 sass 变量样式
-[] 整理一下冗余的 webpack 配置文件，打包清空目录，配一下 alias，替换 vant 前缀，去掉百度统计,引入 scss，json 自动补后缀处理一下，检查一下 babel 有没有配漏的
-[] 优化，site 和 mobile 可以再想想优化，还可以再自动化一点，通过解析文件目录生成 component 配置文件然后解析交给 router
-[] 优化，iframe 内外可以滚动联动，锚点点击滚动

## 初步任务

1. 框架搭建，配置 eslint，babel，webpack，创建文件目录，输出 npm 包
2. 成功引入，并实现按需加载或者后编译
3. 跑通测试用例
4. 生成一份文档

## 其他问题

1. 依赖没有加上 vue，等本地起服务再加
2. output.library 配置，好像没啥作用，我们只要编译成 umd 规范就好了
3. css-loader 中的 importLoaders 作用： a.css 引入 b.css 的时候，这个时候 a.css 是执行到 css-loader 的，如果不配置 importLoaders(默认值为0) b.css 就是从 css-loader 开始执行的，就会错过其他 loader，所以要手动设置
4. 构建的过程发现一个工具 mrm, 让你在添加依赖的同时能自动更新工程下的各种配置文件[github mrm](https://github.com/sapegin/mrm)
5. 注意 & 是并行执行哦

## 使用说明

1. 按需加载配置
`npm install -D babel-plugin-component`

```
"plugins":[
  [
    "component",
    {
      "libraryName": "xiao-ui",
      "styleLibrary": {
        "name": "style",
        "base": false,
        "path": "[module].css"
       }
    }
  ]
]
```

使用

```
import { Button } from 'xiao-ui'
Vue.use(Button)
// 或者 Vue.component(Button.name, Button)
```

如果全量引入，必须去掉按需引入的配置，没有去掉会报错

```
import XiaoUI from 'xiao-ui'
Vue.use(XiaoUI)
```

## 参考

- [有赞vant-ui](https://github.com/youzan/vant)
- [owl-ui 开发案例](https://github.com/dengwb1991/owl-ui)
- [infoQ-组件库构建方案演进](https://www.infoq.cn/article/VMA6h6uJzDeljkFERurZ)
- [webpack create library](https://www.webpackjs.com/guides/author-libraries/#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA-library)
- [前端UI组件库搭建指南](https://zhuanlan.zhihu.com/p/94920464)
<!-- [6个postcss插件推荐](https://juejin.im/post/5c9b3c465188251e1618670a) -->
- [10 awesome postcss plugins to make you a css wizard](https://www.hongkiat.com/blog/postcss-plugins/)
- [别再乱提交代码了，看下大厂 Git 提交规范是怎么做的！](https://mp.weixin.qq.com/s/IMqhv9j_STQRmfeyU9vB1w)
- [prettier-Integrating with Linters](https://prettier.io/docs/en/integrating-with-linters.html)
- [Vue组件库搭建实践与探索](https://segmentfault.com/a/1190000020754678)
