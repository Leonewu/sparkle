
#

## 目标

1. 同时支持按需引入（不重要）/后编译（重要，rem 需要后编译？）
2. 单元测试
3. travis ci
4. 全局样式，不用 scoped，module，方便外部覆盖
5. 版本管理 semver 规范
6. 兼容性 Android4.0+， IOS10+
7. 使用 rem，类名遵循 BEM
8. eslint，babel，styleLint， commit lint
9. 制定文档模板，文档生成 vuepress?
10. ts，vue3.0?
11. 构建工具 rollup 或者 webpack?先选择 webpack
12. css 压缩（OptimizeCssAssetsWebpackPlugin），cssnano

- [x] 基本框架搭建
- [] css压缩,去重，cssnano，OptimizeCssAssetsWebpackPlugin
- [] eslint, prettier, stylelint，git hooks
- [] babel
- [] devserver
- [] files-loader
- [] 按需加载，miniCssExtractPlugin,去掉 style-loader，多入口
- [] 单元测试
- [] 后编译
- [] 命令生成模板
- [] 全局 rem 设置
- [] 文档自动化
- [] ci
- [] rollup, ts, vue3.0?

## 初步任务

1. 框架搭建，vue-cli，配置 eslint，babel，webpack，创建文件目录，输出 npm 包
2. 成功引入，并实现按需加载或者后编译
3. 跑通测试用例
4. 生成一份文档

## 其他问题

1. 依赖没有加上 vue，等本地起服务再加
2. output.library 配置，好像没啥作用，我们只要编译成 umd 规范就好了
3. css-loader 中的 importLoaders 作用： a.css 引入 b.css 的时候，这个时候 a.css 是执行到 css-loader 的，如果不配置 importLoaders(默认值为0) b.css 就是从 css-loader 开始执行的，就会错过其他 loader，所以要手动设置

## 参考

[有赞vant-ui](https://github.com/youzan/vant)
[owl-ui 开发案例](https://github.com/dengwb1991/owl-ui)
[infoQ-组件库构建方案演进](https://www.infoq.cn/article/VMA6h6uJzDeljkFERurZ)
[webpack create library](https://www.webpackjs.com/guides/author-libraries/#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA-library)
[前端UI组件库搭建指南](https://zhuanlan.zhihu.com/p/94920464)
<!-- [6个postcss插件推荐](https://juejin.im/post/5c9b3c465188251e1618670a) -->
[10 awesome postcss plugins to make you a css wizard](https://www.hongkiat.com/blog/postcss-plugins/)
[别再乱提交代码了，看下大厂 Git 提交规范是怎么做的！](https://mp.weixin.qq.com/s/IMqhv9j_STQRmfeyU9vB1w)
