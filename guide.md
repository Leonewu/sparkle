# 项目指南

## 脚本

- `npm run create [component]`: 创建组件，生成模板
- `npm run dev`: 启动开发环境服务
- `npm run build`: 打包脚本，全量打包
- `npm run build:components`: 打包脚本，每个组件都会打包出对应的`js`文件和`css`文件
- `npm run build:site`: 打包脚本，文档网站打包

## 文件目录

`tree -I 'node_modules|site|mobile'`

```
.
├── README.md
├── guide.md
├── lib (组件打包出来的目录)
│   ├── index.js (全局引入的 js 文件)
│   ├── xxx.js (组件的 js 文件)
│   └── style
│       ├── xxx.css (组件分离出来的 css 文件)
├── package.json
├── packages (webpack 使用到的包)
│   ├── create-component (创建模板)
│   └── markdown-loader (解析 md 的 loader)
├── script (webpack 相关脚本)
│   ├── build
│   │   ├── components.js (获取组件列表脚本)
│   │   ├── webpack.components.config.js (按需加载打包脚本)
│   │   ├── webpack.docs.config.js (开发环境启动脚本)
│   │   └── webpack.total.config.js (全量打包脚本)
│   ├── config (公共 webpack 配置)
│   │   └── webpack.config.js
├── site-dist (文档网站打包目录)
├── src
│   ├── common
│   │   └── base.scss (公共css，css全局变量)
│   ├── components (组件目录)
│   └── utils (工具函数)
├── test (测试)
├── site (文档网站)
└── mobile (移动端展示)
```
