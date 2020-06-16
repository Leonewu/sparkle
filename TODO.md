#

## 初步任务

1. 框架搭建，配置 eslint，babel，webpack，loader，plugin，postcss，创建文件目录，输出 npm 包
2. 实现全量/按需引入
3. 跑通测试用例
4. 生成一份文档

## TODO

- [x] 基本框架搭建
- [x] 全量引入，用 style-loader
- [x] 按需引入，miniCssExtractPlugin，去掉 style-loader，多入口，并测试引入后打包，并且验证引入之后打包的体积
- [x] eslint，git hooks
- [x] stylelint
- [x] babel，验证是否根据 browserlist 正确转码
- [x] devserver
- [x] files-loader, svg
- [x] 单元测试
- [x] 自动生成组件模板，npm run create component
- [x] 文档自动化，支持搜索，组件预览，代码片段展示，bisheng（好像需要手写一部分）,vue-styleguidist(方便，但是不好看，没主题)，vuepress，vuese（嗯...），都没有移动端的预览窗口，最后选择研究一下有赞的做法
- [x] peerDependencies
- [x] 网站 title 和 logo
- [x] postcss，兼容 Android4.0+，IOS10+
- [x] 补全开发接入文档，文档书写规范，demo 书写规范
- [x] markdown-loader
- [x] 优化，site 和 mobile 可以再自动化一点，通过解析文件目录生成 component 配置文件然后交给 router
- [x] 组件库名字，sparkle design？
- [x] css 压缩，去重，cssnano，OptimizeCssAssetsWebpackPlugin，js 压缩，webpack4 自带 terser
- [x] mobile 根据屏幕宽度动态设置 font-size
- [ ] 版本管理 semver 规范
- [ ] ci
- [ ] rollup 导出 es module，并且配置 package.json 的 files 选项， treeshaking
- [ ] ts
- [ ] logo
- [ ] 换肤 通过暴露出 sass 的主题入口，让用户自行覆盖 sass 变量样式
- [ ] 整理一下冗余的 webpack 配置文件，打包清空目录，配一下 alias，替换 vant 前缀，去掉百度统计,引入 scss，json 自动补后缀处理一下，检查一下 babel 有没有配漏的，没有配 polyfill
- [ ] 优化项:iframe 内外可以滚动联动，锚点点击滚动
- [ ] 开发时引入方式的文档，npm link 或者 npm install file:../../ 或者 git ssh
- [ ] demo-block 和 demo-section 用法注明
- [ ] 文档的开篇介绍部分
- [ ] 控制台 sourcemap 找不到
- [ ] 检查一下 windows 会不会因为文件目录分隔符 / 而导致一些问题，如 npm run create 失败
- [ ] css 的 bem 规范，看一下有赞的 bem 解决方案，结合属性规范化 bem
- [ ] 后编译
- [ ] packages 每个包里面维护自己的 package.json，不要放在顶级目录，site，mobile 同理
- [ ] css 不直接在代码中引入
- [ ] 全量引入时，引入 css 样式改成手动，并支持引用 sass 源文件或者编译后的 css
- [x] 支持组件 sfc
- [x] 支持 jsx
- [ ] 支持 tsx
- [ ] 公共的 scss 会重复打包，需要用 js 处理 scss 样式依赖
- [ ] 去掉组件入口，用代码生成，因为只是简单的 import 加上 install 再 export，都是重复的东西
- [ ] 使用 gulp 管理编译的 task，更加清晰一点
- [ ] 沉淀脚手架，支持 react，vue，ts
- [ ] 文档优化，夜间模式？<https://gridjs.io/docs/examples/hello-world，代码可编辑？>

## 遇到的问题

1. output.library 配置，好像没啥作用，只要编译成 umd 规范就好了
2. css-loader 中的 importLoaders 作用： a.css 引入 b.css 的时候，这个时候 a.css 是执行到 css-loader 的，如果不配置 importLoaders(默认值为 0) b.css 就是从 css-loader 开始执行的，就会错过其他 loader，所以要手动设置
3. 构建的过程发现一个工具 mrm, 让你在添加依赖的同时能自动更新工程下的各种配置文件[github mrm](https://github.com/sapegin/mrm)，不过好像也没啥用...
4. 注意 & 是并行执行
5. Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转码，如果要使用需要引入 polyfill
6. 从 babel 7.0 开始， babel-core 整合到 @babel 中，即 @babel/core， 有些旧项目用的是 babel-core，没有升级到 @babel/core （比如 vue-jest@3.0.4），所以需要用 babel-bridge 中转，babel-core:bridge 源码只有一行...
7. vue-test-utils 英文文档比较新一点，最好看英文文档
8. eslint-plugin-vue/recommend 和 prettier 冲突，暂时移除 prettier :rage:
9. 如果要将 scss 和 js 文件分离（即不显示地引入 scss 文件，在编译并且需要时再手动引入），这个时候就要用 gulp 了，webpack 主要用于模块化打包，gulp 更加灵活，antdesign 就是用 gulp + webpack
10. 为什么要将 js 和 scss 完全独立开来，不在 js 中引入 scss 文件？
11. 调试 webpack 或者其他 node_modules，可以用 vscode 本地调试，参数可以用 args，或者 node --inspect-brk node_modules/lib/cli.js + chrome://inspect/#devices

> 1. 要考虑全量引入的时候能保证样式的成功引入，有两种方案：
>
> - 在入口文件引入公共 scss 文件
> - 在每个组件引入公共 scss 文件  
>
> 2. 还要保证按需引入的时候能成功引入样式：
>
> - 每个组件都需要引入公共 scss 文件  
综上所述，要同时保证全量引入和按需引入，只能在每个组件都引入公共 scss 文件。但是，这样就会导致公共代码重复打包。所以，如果要保证全量引入和按需引入能正常的使用公共的 scss 文件并且尽量减少用户的使用成本，还要避免 scss 文件的重复打包，只能通过 js 来管理 scss 的依赖了。这样，无论是组件入口还是主入口，都不引用 scss 文件，在编译时，自己生成 js 文件去管理 scss 依赖才是最佳选择

## 参考

- [有赞 vant-ui](https://github.com/youzan/vant)
- [owl-ui 开发案例](https://github.com/dengwb1991/owl-ui)
- [infoQ-组件库构建方案演进](https://www.infoq.cn/article/VMA6h6uJzDeljkFERurZ)
- [webpack create library](https://www.webpackjs.com/guides/author-libraries/#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA-library)
- [前端 UI 组件库搭建指南](https://zhuanlan.zhihu.com/p/94920464)
<!-- [6个postcss插件推荐](https://juejin.im/post/5c9b3c465188251e1618670a) -->
- [10 awesome postcss plugins to make you a css wizard](https://www.hongkiat.com/blog/postcss-plugins/)
- [别再乱提交代码了，看下大厂 Git 提交规范是怎么做的！](https://mp.weixin.qq.com/s/IMqhv9j_STQRmfeyU9vB1w)
- [prettier-Integrating with Linters](https://prettier.io/docs/en/integrating-with-linters.html)
- [Vue 组件库搭建实践与探索](https://segmentfault.com/a/1190000020754678)
- [shields.io](https://shields.io/)
- [vue-test-utils](https://vue-test-utils.vuejs.org/api/wrapper/)
- [minify benchmarks](https://github.com/babel/minify#benchmarks)
- [2B 场景下的前端组件库换肤设计理念与实践](https://mp.weixin.qq.com/s/zIA01wtk_bu4E-8SoEzLvQ)

## 拓展阅读

- [livecodestream.dev: node-buffers](https://livecodestream.dev/post/2020-06-06-a-complete-introduction-to-node-buffers/)
- [Webpack: write a loader](https://webpack.js.org/contribute/writing-a-loader/)
