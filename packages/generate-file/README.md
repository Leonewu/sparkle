#

- 编译时，生成文件入口
- [ ] 生成 js 主文件入口
- [ ] 生成 scss 主文件入口

## 为什么要这样做和取代方案

- 为了满足全量加载打包的时候必须打包出入口 js 文件，由于 css 文件会十分庞大，如果用 style-loader 处理，会导致 js 文件很庞大(ps：这里可以用 miniCssExtarctPlugin.loader 代替 style-loader 处理，将入口 css 提取出单独的文件)，所以最好是打包出单独的 css 入口文件

- 更加自动化一点，只要做好规范，js 入口文件和 css 入口文件的代码都是有规律的，可以通过解析目录生成文件
- 开发环境生成的入口 js 文件会引入 scss 样式，打包组件库的时候入口 js 文件不会引入样式，也就是说有两个入口文件，一个用于开发，一个用于打包组件库
- 那么，公共的 scss 文件如何让 webpack 打包呢，难道每个组件的 scss 都去引入公共的 scss 文件

## 打包出来的目录

```
lib
|----- index.js(无css的入口文件)
|----- index.css(压缩后的css入口文件)
|----- index.scss(sass入口源文件)
|----- starity-ui.js(引入css的入口文件，用style-loader处理，用于 script 标签引入)
|----- starity-ui.min.js(引入css并且压缩后的入口文件，用style-loader处理，用于 script 标签引入)
|----- style
```

### 方案1

- src/index.js 为全量加载的文件入口，里面引入了所有的scss
