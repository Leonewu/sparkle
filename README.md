# 项目介绍

![vue](https://img.shields.io/badge/vue-2.x-4fc08d.svg?colorA=2c3e50&style=flat-square)
![node](https://img.shields.io/badge/node-%3E=12.16.3-4fc08d.svg?colorA=2c3e50&style=flat-square)

## 使用

### 引入

- 全量引入

```
import XiaoUI from 'xiao-ui'
Vue.use(XiaoUI)
```

- 按需引入，首先安装 babel 插件 `npm install -D babel-plugin-import`，配置 babel

```
"plugins": [
  [
    "import",
    {
      "libraryName": "xiao-ui",
      "libraryDirectory": "lib",
      "style": "css"
    }
  ]
]
```

```
import { Button } from 'xiao-ui'
Vue.use(Button)
// 或者
// Vue.component(Button.name, Button)
```

注意：不能同时使用全局引入和按需引入

## 开发

`npm run create` 会自动创建组件开发目录，如 `npm run create button`

## 脚本

- `npm run create [component]`: 创建组件，生成模板
- `npm run dev`: 启动开发环境服务
- `npm run build`: 打包组件库，全量打包
- `npm run build:components`: 打包组件库，每个组件都会打包出对应的`js`文件和`css`文件
- `npm run build:site`: 打包文档网站
- `npm test`: 运行测试用例，此时 NODE_ENV 为 test

## 项目目录

`tree -I 'node_modules'`

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

## 组件目录

```
.
├── README.md （组件文档）
├── __test__
│   └── index.spec.js
├── button.scss
├── button.vue
├── demo （组件 demo）
│   └── index.vue
└── index.js
```
