#

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
|----- |------ common.scss
|----- |------ common.css
|----- button
|----- |------ index.js(组件入口)
|----- |------ index.scss(组件scss源文件，貌似不需要)
|----- |------ style(管理less和css依赖的js文件目录)
|----- |------ |------ css.js(管理css依赖，用于按需加载引入)
|----- |------ |------ scss.js(管理scss依赖，用于主题定制并且按需加载)
```

## 简单版方案

简单版是开发组件的时候，在组件内引入 scss 文件，之后都交给 webpack 处理

```
lib
|----- index.js(有css的入口文件)
|----- button(组件按需加载引入路径)
|------|----- index.js(组件入口)
|------|----- index.css(组件的css)
```
